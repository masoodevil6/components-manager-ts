import type { BenchmarkResult } from "../core/types";

/**
 * BenchmarkConfig — تنظیمات benchmark
 */
export interface BenchmarkConfig {
    warmup:     number;
    iterations: number;
}

export const DEFAULT_CONFIG: BenchmarkConfig = {
    warmup:     5,
    iterations: 30,
};

function percentile(sorted: number[], p: number): number {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

function median(sorted: number[]): number {
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
}

/**
 * benchmark — اجرای N iteration و جمع‌آوری آمار
 *
 * فلو:
 *   ۱. Warmup: N iteration اول دور ریخته می‌شود (JIT + cache)
 *   ۲. Measurement: N iteration واقعی با performance.now()
 *   ۳. Sort + median + P95 + min + max
 *
 * این تابع فقط BenchmarkResult برمی‌گرداند.
 * Metric جمع‌آوری نمی‌کند. Report نمی‌سازد. Registry را update نمی‌کند.
 * آن مسئولیت ReportBuilder و مصرف‌کننده است.
 */
export function benchmark(
    target: string,
    fn:     () => void,
    config: BenchmarkConfig = DEFAULT_CONFIG,
): BenchmarkResult {
    if (config.iterations <= 0) {
        throw new Error(`Benchmark iterations must be greater than zero (got ${config.iterations}).`);
    }
    if (config.warmup < 0) {
        throw new Error(`Benchmark warmup must not be negative (got ${config.warmup}).`);
    }

    for (let i = 0; i < config.warmup; i++) fn();

    const samples: number[] = [];
    for (let i = 0; i < config.iterations; i++) {
        const start = performance.now();
        fn();
        const end = performance.now();
        samples.push(end - start);
    }

    const sorted = [...samples].sort((a, b) => a - b);

    return {
        target,
        median:  median(sorted),
        p95:     percentile(sorted, 95),
        min:     sorted[0],
        max:     sorted[sorted.length - 1],
        samples: config.iterations,
    };
}
