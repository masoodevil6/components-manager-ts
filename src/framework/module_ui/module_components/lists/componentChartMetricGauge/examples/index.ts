import type {ComponentExample} from "@/core_components";
import {Keys} from "../../../../module_categories/languages";
import {ComponentChartMetricGauge} from "../ComponentChartMetricGauge";
import * as UtilStyle from "@/util_styles";
import {ColorGrad, ColorMain} from "@/util_consts";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
const k = Keys.category.components.charts.monitor.gauge;
const bands = [{id: "good", label: "Good", from: 0, to: 500, color: UtilStyle.Css_Color(ColorMain.SUCCESS, ColorGrad.GRADE_1)}, {id: "moderate", label: "Moderate", from: 500, to: 1000, color: UtilStyle.Css_Color(ColorMain.WARNING, ColorGrad.GRADE_1)}, {id: "poor", label: "Needs attention", from: 1000, to: 1500, color: UtilStyle.Css_Color(ColorMain.ERROR, ColorGrad.GRADE_1)}];
const example = (id: string, value: number | null): ComponentExample => ({id, name: k.example, description: k.description, render: () => new ComponentChartMetricGauge({prop_title: "Example", prop_value: value, prop_unit: "ms", prop_min: 0, prop_max: 1500, prop_bands: bands}).getElement()});
export const Examples = {
    GOOD: example("gauge_good", 420),
    BOUNDARY: example("gauge_boundary", 500),
    OUTSIDE: example("gauge_outside", 1800),
    UNAVAILABLE: example("gauge_unavailable", null),
    HIGHER_IS_BETTER: {id: "gauge_higher_is_better", name: k.example, description: k.description, render: () => new ComponentChartMetricGauge({prop_title: "Higher is better", prop_value: 80, prop_unit: "%", prop_min: 0, prop_max: 100, prop_bands: [{id: "low", label: "Needs attention", from: 0, to: 50}, {id: "high", label: "Good", from: 50, to: 100}]}).getElement()},
    GAP: {id: "gauge_gap", name: k.example, description: k.description, render: () => new ComponentChartMetricGauge({prop_title: "No matching band", prop_value: 30, prop_min: 0, prop_max: 100, prop_bands: [{id: "high", label: "High", from: 50, to: 100}]}).getElement()},
    RTL: {id: "gauge_rtl", name: k.example, description: k.description, render: () => new ComponentChartMetricGauge({styles: {direction: "rtl"}, prop_title: "زمان بارگذاری", prop_value: 420, prop_unit: "ms", prop_min: 0, prop_max: 1500, prop_bands: bands}).getElement()},
    REACTIVE: {id: "gauge_reactive", name: k.example, description: k.description, render: () => {
        const value = new CoreObservable.App<number | null>(250);
        const gauge = new ComponentChartMetricGauge({prop_title: "Reactive example", prop_value: value, prop_unit: "ms", prop_min: 0, prop_max: 1500, prop_bands: bands});
        return CoreReactive.App.div({children: [gauge.getElement(), CoreReactive.App.create("button", {attrs: {type: "button"}, className: ["btn", "btn-secondary", "mt-2"], children: ["Change value"], on: {click: () => value.set(((value.get() ?? 0) + 250) % 1750)}})]}).getElement();
    }},
} satisfies Record<string, ComponentExample>;
