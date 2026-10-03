import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    ...ComponentStructureTrait.schemas,
    MOUSE_SCROLLER: {
        part: "part-mouse-scroller",
        titleKey: Keys.category.components.mouseScroller.name,
        descriptionKey: Keys.category.components.mouseScroller.description,
        props: Object.values(Props),
    },
} as const;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
