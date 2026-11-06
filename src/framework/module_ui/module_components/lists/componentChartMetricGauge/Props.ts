import {DefineProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";
import type {MetricBand} from "./Model";
const k = Keys.category.components.charts.monitor.gauge;
export const Props = {
    prop_title: DefineProp<string>({prop: "prop_title", default: "", name: k.title, description: k.description}),
    prop_value: DefineProp<number | null>({prop: "prop_value", default: null, name: k.value, description: k.description}),
    prop_unit: DefineProp<string>({prop: "prop_unit", default: "", name: k.unit, description: k.description}),
    prop_min: DefineProp<number | null>({prop: "prop_min", default: null, name: k.min, description: k.description}),
    prop_max: DefineProp<number | null>({prop: "prop_max", default: null, name: k.max, description: k.description}),
    prop_bands: DefineProp<MetricBand[]>({prop: "prop_bands", default: [], name: k.bands, description: k.description}),
    prop_valueText: DefineProp<string | null>({prop: "prop_valueText", default: null, name: k.valueText, description: k.description}),
    prop_unavailableText: DefineProp<string | null>({prop: "prop_unavailableText", default: null, name: k.unavailableText, description: k.description}),
    prop_chartClass: DefineProp<string[]>({prop: "prop_chartClass", default: [], name: k.chartClass, description: k.description}),
    prop_chartStyles: DefineProp<Record<string, string>>({prop: "prop_chartStyles", default: {}, name: k.chartStyles, description: k.description}),
};
export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
