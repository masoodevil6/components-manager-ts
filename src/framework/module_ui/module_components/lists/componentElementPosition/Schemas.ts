import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    POSITION: {
        part: "part-position",
        props: [
            Props.prop_content, Props.prop_positionClass, Props.prop_positionStyles,
            Props.prop_positionWidth, Props.prop_positionHeight, Props.prop_positionBackgroundColor,
            Props.prop_positionType, Props.prop_positionTop, Props.prop_positionBottom,
            Props.prop_positionLeft, Props.prop_positionRight, Props.prop_positionStart,
            Props.prop_positionEnd, Props.prop_positionTranslate, Props.prop_positionZIndex,
        ],
        name: Keys.category.components.elementPosition.schemas.position.name,
        description: Keys.category.components.elementPosition.schemas.position.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
