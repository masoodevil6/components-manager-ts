import { createMetric, measured, unsupported, unavailable, type PerformanceMetric } from "../core/PerformanceMetric";
import { getMemoryProvider } from "../environment/MemoryProvider";

/**
 * MemoryMetric — observed heap delta (diagnostic فقط)
 *
 * مقدار، observed heap delta است (after - before).
 * این allocation واقعی نیست — تحت تأثیر GC، JIT، module loading است.
 * ممکن است منفی باشد (GC بین before/after اجرا شده باشد).
 *
 * Environment-aware:
 *   - Node.js: process.memoryUsage().heapUsed
 *   - Browser: performance.memory (اگر موجود باشد)
 *   - provider موجود ولی مقدار undefined: unavailable
 *   - provider اصلاً موجود نیست: unsupported
 *
 * در Regression Gate استفاده نمی‌شود.
 */
export const MemoryMetric: PerformanceMetric = createMetric(
    "memoryHeapDeltaMB",
    "MB",
    "memory",
    (fn: () => void) => {
        const provider = getMemoryProvider();
        if (!provider) return unsupported();

        const before = provider.getHeapUsedMB();
        if (before === undefined) return unavailable();

        fn();
        const after = provider.getHeapUsedMB();
        if (after === undefined) return unavailable();

        return measured(after - before);
    },
);
