import {DefineProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages/keys/components/charts";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const k = Keys.category.components.charts.progressLinear;
export type ProgressStatus = "running" | "success" | "error";
export const Props = {
    prop_value: DefineProp<number | null>({prop: "prop_value", default: null, name: k.value, description: k.description}),
    prop_min: DefineProp<number>({prop: "prop_min", default: 0, name: k.min, description: k.description}),
    prop_max: DefineProp<number>({prop: "prop_max", default: 100, name: k.max, description: k.description}),
    prop_title: DefineProp<string>({prop: "prop_title", default: "", name: k.title, description: k.description}),
    prop_accessibleLabel: DefineProp<string>({prop: "prop_accessibleLabel", default: "Progress", name: k.accessibleLabel, description: k.description}),
    prop_statusText: DefineProp<string>({prop: "prop_statusText", default: "", name: k.statusText, description: k.description}),
    prop_status: DefineProp<ProgressStatus>({prop: "prop_status", default: "running", name: k.status, description: k.description}),
    prop_showValue: DefineProp<boolean>({prop: "prop_showValue", default: true, name: k.showValue, description: k.description}),
    prop_trackColor: DefineProp<string | null>({prop: "prop_trackColor", default: null, name: k.trackColor, description: k.description}),
    prop_fillColor: DefineProp<string | null>({prop: "prop_fillColor", default: null, name: k.fillColor, description: k.description}),
    prop_progressClass: DefineProp<string[]>({prop: "prop_progressClass", default: [], name: k.progressClass, description: k.description}),
    prop_progressStyles: DefineProp<Record<string, string>>({prop: "prop_progressStyles", default: {}, name: k.progressStyles, description: k.description}),
};
export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
