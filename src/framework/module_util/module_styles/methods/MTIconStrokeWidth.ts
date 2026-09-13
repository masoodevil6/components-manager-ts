import * as UtilConsts        from "@/util_consts";
///------------------------------
import {TCSizes}              from "../types/const/TCSizes";
import {MTBorderWidth}        from "./MTBorderWidth";

// ── Cache برای CSS variable resolution ─────────────────────────────────
// مقادیر --iconSize* و --borderWidth* در طول عمر صفحه ثابت‌اند
// و فقط در تغییر theme یا size global عوض می‌شوند.
// cache کردن این resolution از تکرار getComputedStyle در hot path جلوگیری می‌کند.
interface IconMetrics {
    targetStrokePx: number;
    renderSize:     number;
}

const metricsCache = new Map<TCSizes, IconMetrics>();

function resolveIconMetrics(size: TCSizes): IconMetrics {
    const cached = metricsCache.get(size);
    if (cached) return cached;

    // 1. targetStrokePx — از --borderWidth${size}
    let targetStrokePx = 2;
    const borderWidth  = MTBorderWidth(size);

    if (typeof borderWidth === "string") {
        const cssVar   = borderWidth.match(/var\((--[^)]+)\)/)?.[1] ?? borderWidth;
        const cssValue = getComputedStyle(document.documentElement)
            .getPropertyValue(cssVar)
            .trim();
        const value    = parseFloat(cssValue);

        if (Number.isFinite(value)) targetStrokePx = value;
    } else {
        targetStrokePx = borderWidth as number;
    }

    // 2. renderSize — از --iconSize${size}
    let renderSize     = 24;
    const iconSizeVar  = `--iconSize${size}`;
    const cssValue     = getComputedStyle(document.documentElement)
        .getPropertyValue(iconSizeVar)
        .trim();
    const value        = parseFloat(cssValue);

    if (Number.isFinite(value)) renderSize = value;

    const metrics = {targetStrokePx, renderSize};
    metricsCache.set(size, metrics);
    return metrics;
}

/** بازنشانی cache — برای تغییر theme یا size global */
export function invalidateIconStrokeCache(): void {
    metricsCache.clear();
}

/**
 * MTIconStrokeWidth — محاسبه stroke-width برای SVG آیکون
 *
 * فرمول (Sub-linear normalization):
 *   strokeWidth = targetStrokePx × √(viewBoxMax / renderSize)
 *   on-screen  = strokeWidth × renderSize / viewBoxMax
 *              = targetStrokePx × √(renderSize / viewBoxMax)
 *
 * این فرمول عمداً ضخامت stroke روی صفحه را ثابت نگه نمی‌دارد.
 * بلکه برای viewBoxهای بزرگ‌تر، stroke را sub-linear کاهش می‌دهد
 * تا جزئیات ریز آیکون‌های پیچیده merge نشوند.
 *
 * مثال:
 *   viewBox 24×24,   render 24px  → on-screen 2.0px  (مرجع)
 *   viewBox 358×358,  render 24px  → on-screen 0.52px (جزئیات حفظ می‌شوند)
 *   viewBox 700×250,  render 250px → on-screen 1.2px  (آیکون بزرگ)
 */
export const MTIconStrokeWidth = (
    size: TCSizes | number = UtilConsts.Sizes.M,
    viewBoxX = 24,
    viewBoxY = 24,
): number => {

    // 1. resolve metrics (از cache یا DOM)
    let targetStrokePx: number;
    let renderSize:     number;

    if (typeof size === "number") {
        targetStrokePx = 2;
        renderSize     = size;
    } else {
        const metrics  = resolveIconMetrics(size);
        targetStrokePx = metrics.targetStrokePx;
        renderSize     = metrics.renderSize;
    }

    // 2. pure calculation — sub-linear stroke normalization
    const viewBoxMax = Math.max(viewBoxX, viewBoxY);

    return targetStrokePx * Math.pow(viewBoxMax / renderSize, 0.5);
};