/**
 * Core Types — Performance Module
 *
 * این فایل قراردادهای پایه‌ای ماژول Performance را تعریف می‌کند.
 * هیچ implementation هنا نیست — فقط types.
 */

// ─── Units ───────────────────────────────────────────────

export type MetricUnit = "ms" | "count" | "MB";

// ─── Categories ──────────────────────────────────────────

export type MetricCategory = "execution" | "structure" | "memory";

// ─── Status ──────────────────────────────────────────────

/**
 * MetricStatus — وضعیت یک metric
 *
 * "measured"    — واقعاً اندازه‌گیری شده
 * "unsupported" — امکان اندازه‌گیری وجود ندارد (مثلاً ComponentMetric فعلاً)
 * "unavailable" — موقتاً در دسترس نیست (مثلاً Memory در browser بدون performance.memory)
 *
 * unsupported ≠ zero. عدد ۰ یعنی «واقعاً صفر».
 */
export type MetricStatus = "measured" | "unsupported" | "unavailable";

// ─── Measurement ─────────────────────────────────────────

/**
 * Measurement — یک observation عمومی (single-shot)
 *
 * یک اندازه‌گیری واحد. نه آمار، نه تکرار.
 * Benchmark این را N بار تکرار می‌کند و آمار می‌گیرد.
 *
 * این قرارداد عمومی است — فقط به duration محدود نیست.
 * بعداً می‌تواند برای Execution، State Change، Event، Workflow هم استفاده شود.
 */
export interface Measurement {
    target: string;
    metric: string;
    value:  number;
    unit:   MetricUnit;
}

// ─── MetricValue ─────────────────────────────────────────

/**
 * MetricValue — مقدار یک metric همراه با metadata
 *
 * value اختیاری است — اگر status !== "measured"،
 * value وجود ندارد (undefined).
 * این تضمین می‌کند که UI یا AI هرگز اشتباهاً
 * `componentCount = 0` را به معنی «هیچ Componentی وجود ندارد» تفسیر نکند.
 */
export interface MetricValue {
    name:     string;
    value?:   number;
    unit:     MetricUnit;
    category: MetricCategory;
    status:   MetricStatus;
}

// ─── BenchmarkResult ─────────────────────────────────────

/**
 * BenchmarkResult — خروجی آماری N iteration
 *
 * میانه و P95 مقاوم به outlier هستند.
 * min و max برای diagnostic نمایش داده می‌شوند.
 */
export interface BenchmarkResult {
    target:  string;
    median:  number;
    p95:     number;
    min:     number;
    max:     number;
    samples: number;
}

// ─── Regression ──────────────────────────────────────────

export interface RegressionResult {
    baselineMs:    number;
    currentMs:     number;
    changePercent: number;
    tolerance:     number;
    status:        "PASS" | "FAIL";
}

// ─── Baseline ────────────────────────────────────────────

export interface BaselineFile {
    version:   string;
    updatedAt: string;
    entries:   Record<string, { medianMs: number }>;
}

// ─── PerfReport ──────────────────────────────────────────

/**
 * PerfReport — گزارش کامل یک benchmark
 *
 * ترکیب benchmark + metrics + regression.
 * توسط ReportBuilder ساخته می‌شود، نه توسط BenchmarkEngine.
 */
export interface PerfReport {
    target:     string;
    benchmark:  BenchmarkResult;
    metrics:    MetricValue[];
    regression: RegressionResult | null;
}

// ─── Scaling ─────────────────────────────────────────────

export interface ScalingPoint {
    count:     number;
    benchmark: BenchmarkResult;
}

export interface ScalingSlope {
    metric:    "median" | "p95" | "max";
    slope:     number;
    intercept: number;
    rSquared:  number;
}

export interface ScalingReport {
    target: string;
    series: ScalingPoint[];
    slopes: ScalingSlope[];
}
