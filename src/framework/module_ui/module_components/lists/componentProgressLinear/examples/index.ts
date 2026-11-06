import type {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import {Keys} from "../../../../module_categories/languages";
import {ComponentProgressLinear} from "../ComponentProgressLinear";
const k = Keys.category.components.charts.progressLinear;
const example = (id: string, name: any, config: any): ComponentExample => ({id, name, description: k.description, render: () => new ComponentProgressLinear(config).getElement() as HTMLElement});
export const Examples = {
    DETERMINATE: example("progress_linear_determinate", k.determinate, {prop_title: "Uploading", prop_value: 65}),
    INDETERMINATE: example("progress_linear_indeterminate", k.indeterminate, {prop_title: "Loading", prop_statusText: "Please wait"}),
    ERROR: example("progress_linear_error", k.error, {prop_title: "Upload failed", prop_status: "error", prop_value: 45}),
    REACTIVE: {
        id: "progress_linear_reactive", name: k.reactive, description: k.description,
        render: () => {
            const value = new CoreObservable.App(0);
            const progress = new ComponentProgressLinear({prop_title: "Processing", prop_value: value});
            return CoreReactive.App.div({children: [
                progress.getElement(),
                CoreReactive.App.create("button", {attrs: {type: "button"}, className: ["btn", "btn-secondary", "mt-2"], children: ["Advance"], on: {click: () => value.set((value.get() + 25) % 125)}}),
            ]}).getElement();
        },
    },
    RTL: example("progress_linear_rtl", k.rtl, {prop_title: "پیشرفت", prop_value: 70, styles: {direction: "rtl"}}),
} satisfies Record<string, ComponentExample>;
