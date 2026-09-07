import { describe, it, expect, afterAll } from "vitest";
import "./setup";
import * as CoreComponents from "@/core_components";
import * as Perf from "@/performance";
import { saveReportChunk } from "./reportCollector";

// Test Policy — component safety limit
const COMPONENT_SAFETY_LIMIT_MS = 500;

const UPDATE_BASELINE = !!process.env.PERF_UPDATE_BASELINE;
const baseline = Perf.FileBaselineProvider.load();
const newBaselines: Record<string, { medianMs: number }> = {};

afterAll(() => {
    saveReportChunk("components", Perf.PerformanceRegistry.query());
    if (UPDATE_BASELINE) {
        Perf.FileBaselineProvider.save({ ...baseline?.entries, ...newBaselines });
    }
});

const entries = CoreComponents.ComponentManager.list().sort((a, b) =>
    a.definition.id.localeCompare(b.definition.id)
);

describe("Component Examples Performance", () => {

    for (const entry of entries) {
        const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);
        if (examples.length === 0) continue;

        for (const example of examples) {
            const testName = `${entry.definition.name}/${example.id}`;

            it(`${testName} — benchmark`, () => {
                const report = Perf.benchmarkComponent(testName, () => example.render());

                if (UPDATE_BASELINE) newBaselines[testName] = { medianMs: report.benchmark.median };

                expect(report.benchmark.median).toBeLessThan(COMPONENT_SAFETY_LIMIT_MS);

                const regression = Perf.checkRegression(testName, report.benchmark.median, baseline, 50);
                if (regression) expect(regression.status).toBe("PASS");
            });
        }
    }
});
