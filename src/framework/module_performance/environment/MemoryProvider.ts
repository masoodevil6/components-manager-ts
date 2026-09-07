/**
 * MemoryProvider — abstraction برای دسترسی به memory
 *
 * Node.js و Browser هر کدام provider مخصوص خود را دارند.
 * این dependency را از Metric جدا می‌کند تا ماژول در هر دو محیط کار کند.
 */
export interface MemoryProvider {
    getHeapUsedMB(): number | undefined;
}

/**
 * NodeMemoryProvider — استفاده از process.memoryUsage()
 */
class NodeMemoryProvider implements MemoryProvider {
    getHeapUsedMB(): number | undefined {
        return process.memoryUsage().heapUsed / 1048576;
    }
}

/**
 * BrowserMemoryProvider — استفاده از performance.memory (Chrome فقط)
 */
class BrowserMemoryProvider implements MemoryProvider {
    getHeapUsedMB(): number | undefined {
        const perf = performance as any;
        if (perf.memory) {
            return perf.memory.usedJSHeapSize / 1048576;
        }
        return undefined;
    }
}

/**
 * detectEnvironment — تشخیص Node vs Browser
 */
function detectEnvironment(): "node" | "browser" | "unknown" {
    if (typeof process !== "undefined" && process.memoryUsage) return "node";
    if (typeof performance !== "undefined" && (performance as any).memory) return "browser";
    return "unknown";
}

let _provider: MemoryProvider | null | undefined;

export function getMemoryProvider(): MemoryProvider | null {
    if (_provider !== undefined) return _provider;

    const env = detectEnvironment();
    _provider = env === "node"
        ? new NodeMemoryProvider()
        : env === "browser"
            ? new BrowserMemoryProvider()
            : null;

    return _provider;
}
