import { createMetric, measured, type PerformanceMetric } from "../core/PerformanceMetric";

/**
 * RenderMetric — زمان اجرای render()
 *
 * می‌سنجد: هزینه JavaScript اجرای render یک ITemplate
 * نمی‌سنجد: layout, paint, composite
 */
export const RenderMetric: PerformanceMetric = createMetric(
    "renderExecutionMs",
    "ms",
    "execution",
    (fn: () => HTMLElement) => {
        const start = performance.now();
        fn();
        const end = performance.now();
        return measured(end - start);
    },
);

/**
 * OnLoadMetric — زمان اجرای onLoad()
 *
 * مرحله مستقل از render. ممکن است render سریع باشد ولی onLoad کند.
 */
export const OnLoadMetric: PerformanceMetric = createMetric(
    "onLoadExecutionMs",
    "ms",
    "execution",
    (element: HTMLElement, fn: (el: HTMLElement) => void) => {
        const start = performance.now();
        fn(element);
        const end = performance.now();
        return measured(end - start);
    },
);
