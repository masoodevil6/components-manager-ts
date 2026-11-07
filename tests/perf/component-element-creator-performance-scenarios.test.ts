// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {runComponentScenario} from "../../src/framework/module_performance/core/ComponentScenario";
import {elementCreatorPerformanceScenarios} from "../../src/framework/module_ui/module_components/lists/componentElementCreator/performance";

afterEach(() => {
    document.body.replaceChildren();
    document.getElementById("component-loading-styles")?.remove();
});

describe("ComponentElementCreator performance scenarios", () => {
    it.each(elementCreatorPerformanceScenarios)("runs and cleans up $id", async (scenario) => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const previousCancelAnimationFrame = (globalThis as any).cancelAnimationFrame;
        (globalThis as any).cancelAnimationFrame = (handle: number) => clearTimeout(handle);

        try {
            const result = await runComponentScenario(scenario, host, 5, 2);
            expect(result).toMatchObject({scenarioId: scenario.id, iterations: 2, inputNodes: 5, maxNodes: null, maxDepth: null, truncated: null});
            expect(result.visibleNodes).toBeGreaterThanOrEqual(5);
            expect(result.domElements).toBeGreaterThan(result.visibleNodes ?? 0);
            expect(host.childElementCount).toBe(0);
        } finally {
            host.remove();
            if (previousCancelAnimationFrame === undefined) delete (globalThis as any).cancelAnimationFrame;
            else (globalThis as any).cancelAnimationFrame = previousCancelAnimationFrame;
        }
    });
});
