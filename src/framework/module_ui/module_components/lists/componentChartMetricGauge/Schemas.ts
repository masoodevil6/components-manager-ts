import type {ComponentSchemas} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages/keys/components/charts";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
const k = Keys.category.components.charts.monitor.gauge;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {part: "part-chart-metric-gauge", props: Object.values(Props), name: k.root, description: k.description},
    CHART: {part: "part-chart-metric-gauge-chart", props: [Props.prop_value, Props.prop_min, Props.prop_max, Props.prop_bands], name: k.chart, description: k.description},
} satisfies ComponentSchemas;
export type SchemasType = ExtractSchemasType<typeof Schemas>;
