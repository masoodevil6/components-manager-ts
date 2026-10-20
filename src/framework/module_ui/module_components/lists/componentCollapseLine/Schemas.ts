import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.collapseLine;

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-root",
        props: [Props.prop_collapseLineClass, Props.prop_collapseLineStyles],
        name: translation.schemas.root.name,
        description: translation.schemas.root.description,
    },
    DIVIDER: {
        part: "part-divider",
        props: [Props.prop_isCenter, Props.prop_lineBackground, Props.prop_collapseLineThickness],
        name: translation.schemas.divider.name,
        description: translation.schemas.divider.description,
    },
    LINE_START: {
        part: "part-line-start",
        props: [Props.prop_isCenter, Props.prop_lineBackground, Props.prop_collapseLineThickness],
        name: translation.schemas.lineStart.name,
        description: translation.schemas.lineStart.description,
    },
    TITLE: {
        part: "part-title",
        props: [Props.prop_collapseLineTitle, Props.prop_collapseLineTitleClass, Props.prop_collapseLineTitleStyles],
        name: translation.schemas.title.name,
        description: translation.schemas.title.description,
    },
    TOGGLE: {
        part: "part-toggle",
        props: [
            Props.prop_collapseLineCanCollapse,
            Props.prop_collapseLineBody,
            Props.prop_collapseLineBodyIsOpen,
            Props.prop_collapseLineTitle,
            Props.prop_collapseLineTitleClass,
            Props.prop_collapseLineTitleStyles,
        ],
        name: translation.schemas.toggle.name,
        description: translation.schemas.toggle.description,
    },
    ARROW: {
        part: "part-arrow",
        props: [Props.prop_collapseLineBodyIsOpen, Props.prop_lineBackground, Props.prop_collapseLineArrowClass, Props.prop_collapseLineArrowStyles],
        name: translation.schemas.arrow.name,
        description: translation.schemas.arrow.description,
    },
    LINE_END: {
        part: "part-line-end",
        props: [Props.prop_isCenter, Props.prop_lineBackground, Props.prop_collapseLineThickness],
        name: translation.schemas.lineEnd.name,
        description: translation.schemas.lineEnd.description,
    },
    BODY: {
        part: "part-body",
        props: [Props.prop_collapseLineBody, Props.prop_collapseLineBodyIsOpen, Props.prop_collapseLineCanCollapse, Props.prop_collapseLineBodyClass, Props.prop_collapseLineBodyStyles],
        name: translation.schemas.body.name,
        description: translation.schemas.body.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
