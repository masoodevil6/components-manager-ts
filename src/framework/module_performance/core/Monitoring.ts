export interface MonitoringScenario {
    id: string;
    title: string;
    description: string;
    create(): {element: HTMLElement; dispose?: () => void};
}

export interface MonitoringResult {
    scenarioId: string;
    iterations: number;
    medianCreateMs: number;
    p95CreateMs: number;
    medianMountMs: number;
    medianDisposeMs: number;
    domNodes: number;
    recordedAt: string;
}

const scenarios = new Map<string, MonitoringScenario>();

export const MonitoringScenarios = {
    register(scenario: MonitoringScenario): () => void {
        if (!scenario.id || scenarios.has(scenario.id)) throw new Error(`Duplicate or empty scenario id: ${scenario.id}`);
        scenarios.set(scenario.id, scenario);
        return () => { if (scenarios.get(scenario.id) === scenario) scenarios.delete(scenario.id); };
    },
    list(): MonitoringScenario[] { return [...scenarios.values()]; },
};

function percentile(values: number[], fraction: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    if (fraction === 0.5 && sorted.length % 2 === 0) return (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)];
}

/** Measures synchronous creation, DOM insertion and cleanup separately; does not measure paint. */
export function runMonitoringScenario(scenario: MonitoringScenario, host: HTMLElement, iterations = 10, warmup = 2): MonitoringResult {
    if (!Number.isInteger(iterations) || iterations < 1 || iterations > 100 || !Number.isInteger(warmup) || warmup < 0 || warmup > 20) {
        throw new Error("Iterations must be 1–100 and warmup must be 0–20.");
    }
    const create: number[] = [], mount: number[] = [], dispose: number[] = [];
    let domNodes = 0;
    for (let i = 0; i < warmup + iterations; i++) {
        let instance: ReturnType<MonitoringScenario["create"]> | undefined;
        let created = 0, mounted = 0, cleaned = 0, count = 0;
        try {
            const start = performance.now();
            instance = scenario.create();
            created = performance.now() - start;
            if (!(instance.element instanceof HTMLElement)) throw new Error("Scenario must return an HTMLElement.");
            const mountStart = performance.now();
            host.appendChild(instance.element);
            mounted = performance.now() - mountStart;
            count = 1 + instance.element.querySelectorAll("*").length;
        } finally {
            const cleanupStart = performance.now();
            try { instance?.dispose?.(); } finally { instance?.element?.remove(); }
            cleaned = performance.now() - cleanupStart;
        }
        if (i >= warmup) { create.push(created); mount.push(mounted); dispose.push(cleaned); domNodes = count; }
    }
    return {scenarioId: scenario.id, iterations, medianCreateMs: percentile(create, 0.5), p95CreateMs: percentile(create, 0.95), medianMountMs: percentile(mount, 0.5), medianDisposeMs: percentile(dispose, 0.5), domNodes, recordedAt: new Date().toISOString()};
}

MonitoringScenarios.register({
    id: "browser-dom-baseline",
    title: "Browser DOM baseline",
    description: "Creates a plain section with 100 text nodes; a reference scenario, not a framework component.",
    create: () => {
        const element = document.createElement("section");
        for (let i = 0; i < 100; i++) { const child = document.createElement("span"); child.textContent = `Item ${i + 1}`; element.appendChild(child); }
        return {element};
    },
});
