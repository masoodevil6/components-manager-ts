import type { PerfReport, BenchmarkResult, MetricValue } from "./types";

/**
 * createReport — ترکیب benchmark + metrics → PerfReport
 *
 * این لایه مسئولیت ساخت Report را دارد.
 * BenchmarkEngine فقط BenchmarkResult می‌دهد.
 * Metrics فقط MetricValue[] می‌دهد.
 * ReportBuilder این دو را ترکیب می‌کند.
 *
 * regression در ابتدا null است — توسط مصرف‌کننده پر می‌شود.
 */
export function createReport(
    target:    string,
    benchmark: BenchmarkResult,
    metrics:   MetricValue[],
): PerfReport {
    return {
        target,
        benchmark,
        metrics,
        regression: null,
    };
}
