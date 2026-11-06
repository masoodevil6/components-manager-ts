// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import {calculateGauge} from "../../src/framework/module_ui/module_components/lists/componentChartMetricGauge/Model";

const bands = [{id: "low", label: "Low", from: 0, to: 5}, {id: "high", label: "High", from: 5, to: 10}];
describe("metric gauge", () => {
    it("validates ranges, boundaries, gaps, and out-of-scale values", () => {
        expect(calculateGauge(5, 0, 10, bands).band?.id).toBe("high");
        expect(calculateGauge(10, 0, 10, bands).band?.id).toBe("high");
        expect(calculateGauge(15, 0, 10, bands)).toMatchObject({value: 15, outside: true, position: 1, band: null});
        expect(calculateGauge(4, 0, 10, [{id: "x", label: "X", from: 5, to: 10}]).band).toBeNull();
        expect(calculateGauge(1, 0, 10, [bands[1], bands[0]]).kind).toBe("invalid");
        expect(calculateGauge(Infinity, 0, 10, bands).kind).toBe("unavailable");
        expect(calculateGauge(2, null, null, []).kind).toBe("unconfigured");
        expect(calculateGauge(2, 10, 10, bands).kind).toBe("invalid");
    });
    it("updates the SVG and readable result from an observable", () => {
        const value = new CoreObservable.App<number | null>(2);
        const gauge = UiCategory.UI.Charts.Monitor.Gauge({prop_title: "Load", prop_value: value, prop_unit: "ms", prop_min: 0, prop_max: 10, prop_bands: bands});
        const root = gauge.getElement();
        expect(root.textContent).toContain("2 ms");
        expect(root.textContent).toContain("Low");
        expect(root.querySelectorAll("svg rect")).toHaveLength(3);
        const legend = root.querySelector("[data-gauge-legend]")!;
        expect(legend.querySelector("component-table")).not.toBeNull();
        expect(legend.querySelectorAll("tbody tr")).toHaveLength(2);
        expect(legend.textContent).toContain("0–5 ms");
        value.set(7);
        expect(root.textContent).toContain("7 ms");
        expect(root.querySelector("[data-gauge-assessment]")?.textContent).toContain("High");
        value.set(null);
        expect(root.querySelectorAll("svg rect")).toHaveLength(0);
        expect((legend as HTMLElement).style.display).toBe("none");
        gauge.dispose();
    });
});
