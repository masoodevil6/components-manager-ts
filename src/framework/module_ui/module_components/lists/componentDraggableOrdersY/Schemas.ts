import * as CoreComponents from "@/core_components";
import {Props} from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
import {Keys} from "../../../module_categories/languages";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    MAIN: {
        part:  "part-main",
        props: [Props.prop_draggableItems, Props.prop_draggableOrders],
        name:  Keys.category.components.draggableOrdersY.schemas.main.name,
        description: Keys.category.components.draggableOrdersY.schemas.main.description,
    },

    MAIN_LIST_ITEM: {
        part:  "part-main-list-item",
        props: [],
        name:  Keys.category.components.draggableOrdersY.schemas.mainListItem.name,
        description: Keys.category.components.draggableOrdersY.schemas.mainListItem.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
