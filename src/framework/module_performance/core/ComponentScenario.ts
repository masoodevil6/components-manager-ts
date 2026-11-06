export interface ComponentScenarioInstance {
    element: HTMLElement;
    run(): void;
    validate(): void;
    dispose(): void;
    countVisibleNodes?(): number;
    isTruncated?(): boolean;
}

export interface ComponentScenario {
    id: string;
    componentId: string;
    title: string;
    prepare(size: number): {create(): ComponentScenarioInstance; inputNodes: number; maxNodes: number; maxDepth: number};
}

export interface ComponentScenarioResult {
    scenarioId: string;
    iterations: number;
    createMedianMs: number;
    createP95Ms: number;
    operationMedianMs: number;
    operationP95Ms: number;
    disposeMedianMs: number;
    domElements: number;
    visibleNodes: number | null;
    inputNodes: number;
    maxNodes: number;
    maxDepth: number;
    truncated: boolean | null;
}

const median = (values: number[]) => { const sorted = [...values].sort((a, b) => a - b); const m = Math.floor(sorted.length / 2); return sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2; };

/** Synchronous JavaScript timings only; layout and browser paint are not included. */
export async function runComponentScenario(scenario: ComponentScenario, host: HTMLElement, size: number, iterations: number, onProgress: (done: number, total: number) => void = () => {}, signal?: AbortSignal): Promise<ComponentScenarioResult> {
    if (!Number.isInteger(iterations) || iterations < 1 || iterations > 30) throw new Error("Iterations must be between 1 and 30.");
    const prepared = scenario.prepare(size);
    const created: number[] = [], operations: number[] = [], disposed: number[] = [];
    let domElements = 0, visibleNodes: number | null = null, truncated: boolean | null = null;
    const warmup = 2;
    for (let i = 0; i < iterations + warmup; i++) {
        if (signal?.aborted) throw new DOMException("Measurement cancelled", "AbortError");
        let instance: ComponentScenarioInstance | undefined;
        let createTime = 0, operationTime = 0, disposeTime = 0;
        try {
            let start = performance.now();
            instance = prepared.create();
            createTime = performance.now() - start;
            host.appendChild(instance.element);
            start = performance.now();
            instance.run();
            operationTime = performance.now() - start;
            instance.validate();
            domElements = 1 + instance.element.querySelectorAll("*").length;
            visibleNodes = instance.countVisibleNodes?.() ?? null;
            truncated = instance.isTruncated?.() ?? null;
        } finally {
            const start = performance.now();
            try { instance?.dispose(); } finally { instance?.element.remove(); }
            disposeTime = performance.now() - start;
        }
        if (i >= warmup) { created.push(createTime); operations.push(operationTime); disposed.push(disposeTime); onProgress(i - warmup + 1, iterations); }
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
    const sorted = [...operations].sort((a, b) => a - b);
    const sortedCreated = [...created].sort((a, b) => a - b);
    return {scenarioId: scenario.id, iterations, createMedianMs: median(created), createP95Ms: sortedCreated[Math.ceil(sortedCreated.length * .95) - 1], operationMedianMs: median(operations), operationP95Ms: sorted[Math.ceil(sorted.length * .95) - 1], disposeMedianMs: median(disposed), domElements, visibleNodes, inputNodes: prepared.inputNodes, maxNodes: prepared.maxNodes, maxDepth: prepared.maxDepth, truncated};
}
