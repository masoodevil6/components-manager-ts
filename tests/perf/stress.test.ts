import { describe, it, expect, afterAll } from "vitest";
import "./setup";
import { ClTestsPage as TestsPage } from "@/ui_pages/pages/tests/ClTestsPage";
import * as Perf from "@/performance";
import { saveReportChunk } from "./reportCollector";

// Test Policy — stress safety limit
const STRESS_SAFETY_LIMIT_MS = 5000;

const UPDATE_BASELINE = !!process.env.PERF_UPDATE_BASELINE;
const baseline = Perf.FileBaselineProvider.load();
const newBaselines: Record<string, { medianMs: number }> = {};

afterAll(() => {
    saveReportChunk("stress", Perf.PerformanceRegistry.query());
    if (UPDATE_BASELINE) {
        Perf.FileBaselineProvider.save({ ...baseline?.entries, ...newBaselines });
    }
});

describe("Stress — TestsPage", () => {

    it("TestsPage — benchmark", () => {
        const report = Perf.benchmarkPage("TestsPage", new TestsPage());

        if (UPDATE_BASELINE) newBaselines["TestsPage"] = { medianMs: report.benchmark.median };

        expect(report.benchmark.median).toBeLessThan(STRESS_SAFETY_LIMIT_MS);

        const regression = Perf.checkRegression("TestsPage", report.benchmark.median, baseline, 30);
        if (regression) expect(regression.status).toBe("PASS");
    });

    it("TestsPage — has componentPositionMenu", () => {
        const element = new TestsPage().render();
        const headers = Array.from(element.querySelectorAll("h5")) as HTMLElement[];
        expect(headers.some(h => h.textContent?.includes("componentPositionMenu"))).toBe(true);
    });
});
