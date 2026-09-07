import { benchmark, type BenchmarkConfig } from "./BenchmarkEngine";
import { toMetricValue } from "../core/PerformanceMetric";
import { createReport } from "../core/ReportBuilder";
import { PerformanceRegistry } from "../core/PerformanceRegistry";
import { DomMetric } from "../metrics/DomMetric";
import { MemoryMetric } from "../metrics/MemoryMetric";
import type { PerfReport, MetricValue } from "../core/types";

/**
 * ComponentBenchmark — convenience/orchestration API برای benchmark یک Component example
 *
 * مصرف‌کننده: Vitest، Performance Page
 */
export function benchmarkComponent(
    name:      string,
    renderFn:  () => HTMLElement,
    config?:   BenchmarkConfig,
): PerfReport {

    const bench = benchmark(name, renderFn, config);

    const element = renderFn();

    const metrics: MetricValue[] = [
        toMetricValue(DomMetric,    element),
        toMetricValue(MemoryMetric, renderFn),
    ];

    const report = createReport(name, bench, metrics);

    PerformanceRegistry.register(report);
    return report;
}
