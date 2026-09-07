import type { Measurement } from "./types";

/**
 * measure — یک observation (single-shot)
 *
 * یک تابع را یک بار اجرا می‌کند و زمان آن را اندازه می‌گیرد.
 * این Building Block پایه است. BenchmarkEngine این را N بار تکرار می‌کند.
 *
 * @param target — نام هدف
 * @param metric — نام metric
 * @param fn — تابعی که قرار است اجرا شود
 * @returns Measurement
 */
export function measure(
    target: string,
    metric: string,
    fn:     () => void,
): Measurement {
    const start = performance.now();
    fn();
    const end = performance.now();
    return { target, metric, value: end - start, unit: "ms" };
}
