import { benchmark, type BenchmarkConfig } from "./BenchmarkEngine";
import { toMetricValue } from "../core/PerformanceMetric";
import { createReport } from "../core/ReportBuilder";
import { PerformanceRegistry } from "../core/PerformanceRegistry";
import { RenderMetric, OnLoadMetric } from "../metrics/RenderMetric";
import { DomMetric } from "../metrics/DomMetric";
import { ComponentMetric } from "../metrics/ComponentMetric";
import { MemoryMetric } from "../metrics/MemoryMetric";
import type { PerfReport, MetricValue } from "../core/types";

/**
 * PageBenchmark — convenience/orchestration API برای benchmark یک صفحه
 *
 * این تابع یک Orchestrator است، نه یک Primitive.
 * لایه‌های زیرین (BenchmarkEngine، Metrics، ReportBuilder، Registry)
 * مستقل از این تابع قابل استفاده هستند.
 *
 * مصرف‌کننده می‌تواند خودش لایه‌ها را ترکیب کند:
 *   const bench = benchmark(name, fn);
 *   const metrics = [...];
 *   const report = createReport(name, bench, metrics);
 *   PerformanceRegistry.register(report);
 *
 * یا از این convenience API استفاده کند:
 *   benchmarkPage(name, template);
 *
 * مصرف‌کننده: Vitest، Performance Page
 *
 * نکته مهم:
 *   Metricهای جمع‌آوری‌شده توسط PageBenchmark، diagnostic single-shot observations هستند
 *   و عمداً از benchmark samples مستقل هستند. اجرای آن‌ها نباید بخشی از BenchmarkResult
 *   تفسیر شود. این یعنی renderهای اضافی برای metric collection، در آمار median/P95
 *   benchmark تأثیر ندارند.
 */
export function benchmarkPage(
    name:     string,
    template: { render: () => HTMLElement; onLoad: (el: HTMLElement) => void },
    config?:  BenchmarkConfig,
): PerfReport {

    // ۱. Benchmark
    const bench = benchmark(name, () => template.render(), config);

    // ۲. Metrics (single-shot)
    const element = template.render();

    const metrics: MetricValue[] = [
        toMetricValue(RenderMetric,    () => template.render()),
        toMetricValue(OnLoadMetric,    element, (el) => template.onLoad(el)),
        toMetricValue(DomMetric,       element),
        toMetricValue(ComponentMetric, element),
        toMetricValue(MemoryMetric,    () => template.render()),
    ];

    // ۳. Report
    const report = createReport(name, bench, metrics);

    // ۴. Registry
    PerformanceRegistry.register(report);
    return report;
}
