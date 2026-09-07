import { describe, it, expect, afterAll } from "vitest";
import "./setup";
import { ClHomePage as HomePage } from "@/ui_pages/pages/home/ClHomePage";
import { ClIconPage as IconPage } from "@/ui_pages/pages/icons/ClIconPage";
import * as Perf from "@/performance";
import { saveReportChunk } from "./reportCollector";

// Test Policy — safety limits متعلق به consumer است، نه به Module
const PAGE_SAFETY_LIMIT_MS = 2000;

const UPDATE_BASELINE = !!process.env.PERF_UPDATE_BASELINE;
const baseline = Perf.FileBaselineProvider.load();
const newBaselines: Record<string, { medianMs: number }> = {};

afterAll(() => {
    Perf.reportToConsole();
    saveReportChunk("pages", Perf.PerformanceRegistry.query());
    if (UPDATE_BASELINE) {
        Perf.FileBaselineProvider.save({ ...baseline?.entries, ...newBaselines });
    }
});

describe("Page Performance", () => {

    it("HomePage — benchmark", () => {
        const report = Perf.benchmarkPage("HomePage", new HomePage());

        if (UPDATE_BASELINE) newBaselines["HomePage"] = { medianMs: report.benchmark.median };

        expect(report.benchmark.median).toBeLessThan(PAGE_SAFETY_LIMIT_MS);

        const regression = Perf.checkRegression("HomePage", report.benchmark.median, baseline, 100);
        if (regression) expect(regression.status).toBe("PASS");
    });

    it("IconPage — benchmark", () => {
        const report = Perf.benchmarkPage("IconPage", new IconPage());

        if (UPDATE_BASELINE) newBaselines["IconPage"] = { medianMs: report.benchmark.median };

        expect(report.benchmark.median).toBeLessThan(PAGE_SAFETY_LIMIT_MS);

        const regression = Perf.checkRegression("IconPage", report.benchmark.median, baseline, 30);
        if (regression) expect(regression.status).toBe("PASS");
    });
});
