import { PerformanceRegistry } from "../core/PerformanceRegistry";
import type { PerfReport, MetricValue } from "../core/types";

/**
 * ConsoleReporter — خروجی گزارش به console
 *
 * MetricStatus را در خروجی نمایش می‌دهد:
 *   measured    → مقدار عددی
 *   unsupported → "unsupported"
 *   unavailable → "unavailable"
 */
export function reportToConsole(): void {
    const reports = PerformanceRegistry.query();

    console.log("\n========== PERFORMANCE REPORT ==========\n");

    for (const r of reports) {
        console.log(r.target);
        console.log("─".repeat(40));
        console.log(`  Benchmark`);
        console.log(`    median  ${r.benchmark.median.toFixed(2)} ms`);
        console.log(`    p95     ${r.benchmark.p95.toFixed(2)} ms`);
        console.log(`    min     ${r.benchmark.min.toFixed(2)} ms`);
        console.log(`    max     ${r.benchmark.max.toFixed(2)} ms`);
        console.log(`    samples ${r.benchmark.samples}`);
        console.log(`  Metrics`);
        for (const m of r.metrics) {
            const valStr = m.status === "measured"
                ? formatMetricValue(m)
                : m.status;
            console.log(`    ${m.name.padEnd(22)} ${valStr}`);
        }
        if (r.regression) {
            console.log(`  Regression`);
            console.log(`    baseline  ${r.regression.baselineMs.toFixed(2)} ms`);
            console.log(`    current   ${r.regression.currentMs.toFixed(2)} ms`);
            console.log(`    change    ${r.regression.changePercent >= 0 ? "+" : ""}${r.regression.changePercent.toFixed(1)}%`);
            console.log(`    tolerance ${r.regression.tolerance}%`);
            console.log(`    status    ${r.regression.status}`);
        } else {
            console.log(`  Regression`);
            console.log(`    (no baseline — first run)`);
        }
        console.log();
    }

    console.log("=".repeat(40) + "\n");
}

function formatMetricValue(m: MetricValue): string {
    if (m.value === undefined) return "N/A";
    const sign = m.value >= 0 && m.unit === "MB" ? "+" : "";
    return `${sign}${m.value.toFixed(2)} ${m.unit}`;
}
