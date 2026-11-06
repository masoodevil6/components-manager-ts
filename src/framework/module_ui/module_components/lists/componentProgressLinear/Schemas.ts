import type {ComponentSchemas} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
const k = Keys.category.components.charts.progressLinear;
export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {part: "part-progress-linear", props: Object.values(Props), name: k.root, description: k.description},
    HEADER: {part: "part-progress-linear-header", props: [Props.prop_title, Props.prop_statusText, Props.prop_showValue], name: k.header, description: k.description},
    TRACK: {part: "part-progress-linear-track", props: [Props.prop_value, Props.prop_min, Props.prop_max, Props.prop_trackColor], name: k.track, description: k.description},
    FILL: {part: "part-progress-linear-fill", props: [Props.prop_value, Props.prop_min, Props.prop_max, Props.prop_fillColor, Props.prop_status], name: k.fill, description: k.description},
} satisfies ComponentSchemas;
export type SchemasType = ExtractSchemasType<typeof Schemas>;
