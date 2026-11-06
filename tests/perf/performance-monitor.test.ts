// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import {MonitoringScenarios, runMonitoringScenario} from "../../src/framework/module_performance/core/Monitoring";
import {ClPerformancePage} from "../../src/framework/module_ui/module_pages/pages/performance/ClPerformancePage";

afterEach(() => { document.body.innerHTML = ""; localStorage.clear(); vi.restoreAllMocks(); });

describe("performance monitoring", () => {
    it("registers scenarios, measures iterations, and cleans up warmup and measured instances", () => {
        const dispose = vi.fn();
        const create = vi.fn(() => { const node = document.createElement("div"); node.append(document.createElement("span")); return {element: node, dispose}; });
        const scenario = {id: "test-registration", title: "Test", description: "test", create};
        const unregister = MonitoringScenarios.register(scenario);
        try {
            expect(MonitoringScenarios.list()).toContain(scenario);
            const host = document.createElement("div");
            const result = runMonitoringScenario(scenario, host, 3, 2);
            expect(create).toHaveBeenCalledTimes(5);
            expect(dispose).toHaveBeenCalledTimes(5);
            expect(host.childElementCount).toBe(0);
            expect(result).toMatchObject({scenarioId: scenario.id, iterations: 3, domNodes: 2});
            expect(result.medianCreateMs).toBeGreaterThanOrEqual(0);
            expect(result.p95CreateMs).toBeGreaterThanOrEqual(result.medianCreateMs);
        } finally { unregister(); }
        expect(MonitoringScenarios.list()).not.toContain(scenario);
    });

    it("removes a mounted element even if disposal fails", () => {
        const host = document.createElement("div");
        const scenario = {id: "failure", title: "Failure", description: "", create: () => ({element: document.createElement("div"), dispose: () => { throw new Error("dispose failed"); }})};
        expect(() => runMonitoringScenario(scenario, host, 1, 0)).toThrow("dispose failed");
        expect(host.childElementCount).toBe(0);
    });

    it("runs the baseline scenario and saves a result locally", () => {
        const root = new ClPerformancePage().render(); document.body.append(root);
        const buttons = [...root.querySelectorAll("button")];
        buttons.find((button) => button.textContent === "Run scenario")!.click();
        expect(root.textContent).toContain("Create — median / p95");
        buttons.find((button) => button.textContent === "Save as baseline")!.click();
        expect(localStorage.getItem("framework.performance.baselines.v1")).toContain("browser-dom-baseline");
        buttons.find((button) => button.textContent === "Run scenario")!.click();
        expect(root.textContent).toContain("Create median vs baseline");
    });
});
