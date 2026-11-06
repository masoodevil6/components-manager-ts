// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import {runComponentScenario} from "../../src/framework/module_performance/core/ComponentScenario";
import {jsonTreePerformanceScenarios} from "../../src/framework/module_ui/module_components/lists/componentJsonTree/performance";

describe("JSON Tree performance scenarios", () => {
    it.each(jsonTreePerformanceScenarios)("runs and cleans up $id", async (scenario) => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const progress: number[] = [];
        try {
            const result = await runComponentScenario(scenario, host, 100, 2, (done) => progress.push(done));
            expect(progress).toEqual([1, 2]);
            expect(result).toMatchObject({scenarioId: scenario.id, iterations: 2, inputNodes: 302, maxNodes: 2000, maxDepth: 32});
            expect(result.visibleNodes).toBeGreaterThan(0);
            expect(result.domElements).toBeGreaterThan(result.visibleNodes);
            expect(result.operationP95Ms).toBeGreaterThanOrEqual(result.operationMedianMs);
            expect(host.childElementCount).toBe(0);
        } finally { host.remove(); }
    });
});
