import type { MetricValue, MetricUnit, MetricCategory, MetricStatus } from "./types";

/**
 * PerformanceMetric — abstraction برای یک metric قابل اندازه‌گیری
 *
 * هر Metric یک name، category، unit، و تابع اندازه‌گیری دارد.
 * توسعه‌پذیر: Metric جدید = implement این interface.
 * هیچ enum مرکزی وجود ندارد — name رشته آزاد است.
 */
export interface PerformanceMetric {
    name:     string;
    unit:     MetricUnit;
    category: MetricCategory;
    measure:  (...args: any[]) => MetricResult;
}

/**
 * MetricResult — خروجی measure
 *
 * value اختیاری است — اگر status !== "measured"،
 * value وجود ندارد (undefined).
 * این تضمین می‌کند که هیچ‌کس اشتباهاً
 * `componentCount = 0` را به معنی «هیچ Componentی وجود ندارد» تفسیر نکند.
 */
export interface MetricResult {
    value?:  number;
    status:  MetricStatus;
}

/**
 * createMetric — factory برای ساخت Metric
 */
export function createMetric(
    name:     string,
    unit:     MetricUnit,
    category: MetricCategory,
    measure:  (...args: any[]) => MetricResult,
): PerformanceMetric {
    return { name, unit, category, measure };
}

/**
 * measured — helper برای ساخت MetricResult با status "measured"
 */
export function measured(value: number): MetricResult {
    return { value, status: "measured" };
}

/**
 * unsupported — helper برای ساخت MetricResult با status "unsupported"
 *
 * value ندارد — undefined است.
 * unsupported ≠ zero.
 */
export function unsupported(): MetricResult {
    return { status: "unsupported" };
}

/**
 * unavailable — helper برای ساخت MetricResult با status "unavailable"
 *
 * metric وجود دارد ولی environment فعلی داده نمی‌دهد.
 * مثلاً Memory در browser بدون performance.memory.
 */
export function unavailable(): MetricResult {
    return { status: "unavailable" };
}

/**
 * toMetricValue — تبدیل Metric به MetricValue
 *
 * value فقط در صورت status === "measured" ست می‌شود.
 */
export function toMetricValue(metric: PerformanceMetric, ...args: any[]): MetricValue {
    const result = metric.measure(...args);
    return {
        name:     metric.name,
        value:    result.status === "measured" ? result.value : undefined,
        unit:     metric.unit,
        category: metric.category,
        status:   result.status,
    };
}
