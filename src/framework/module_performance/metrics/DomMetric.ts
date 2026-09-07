import { createMetric, measured, type PerformanceMetric } from "../core/PerformanceMetric";

/**
 * DomMetric — تعداد elementهای DOM ساخته‌شده
 *
 * `querySelectorAll("*").length` — تعداد elementها (نه text nodeها).
 */
export const DomMetric: PerformanceMetric = createMetric(
    "domElementCount",
    "count",
    "structure",
    (element: HTMLElement) => measured(element.querySelectorAll("*").length),
);
