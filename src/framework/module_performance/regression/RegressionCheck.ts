import type { BaselineFile, RegressionResult } from "../core/types";

export const DEFAULT_TOLERANCE = 20;   // %

/**
 * checkRegression — مقایسه با baseline (relative regression)
 *
 * این فقط relative regression را بررسی می‌کند.
 * Safety limit (absolute maximum) متعلق به consumer/test policy است،
 * نه به Regression Engine.
 *
 * Vitest Test Policy:
 *   expect(report.benchmark.median).toBeLessThan(PAGE_SAFETY_LIMIT_MS);
 */
export function checkRegression(
    name:       string,
    currentMs:  number,
    baseline:   BaselineFile | null,
    tolerance:  number = DEFAULT_TOLERANCE,
): RegressionResult | null {
    if (!baseline || !baseline.entries[name]) return null;

    const baselineMs = baseline.entries[name].medianMs;
    if (baselineMs <= 0) return null;  // baseline نامعتبر — تقسیم بر صفر یا Infinity جلوگیری می‌شود

    const changePercent = ((currentMs - baselineMs) / baselineMs) * 100;

    return {
        baselineMs,
        currentMs,
        changePercent,
        tolerance,
        status: changePercent > tolerance ? "FAIL" : "PASS",
    };
}
