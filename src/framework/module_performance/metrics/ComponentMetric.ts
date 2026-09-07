import { createMetric, unsupported, type PerformanceMetric } from "../core/PerformanceMetric";

/**
 * ComponentMetric — تعداد نمونه‌های Component ساخته‌شده
 *
 * فعلاً placeholder — status: "unsupported".
 * پیاده‌سازی آینده:
 *   - Instrument کردن ComponentManager با counter
 *   - یا استفاده از data-component-id attribute
 *   - یا hook کردن constructor کلاس پایه
 *   - تغییر به measured(count) — فقط یک خط در ComponentMetric
 */
export const ComponentMetric: PerformanceMetric = createMetric(
    "componentCount",
    "count",
    "structure",
    (_element: HTMLElement) => unsupported(),
);
