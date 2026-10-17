import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    ROOT: {
        part: "part-root",
        props: [Props.prop_title, Props.prop_canRun, Props.prop_run],
        name: Keys.category.components.codeMirror.schemas.root.name,
        description: Keys.category.components.codeMirror.schemas.root.description,
    },
    EDITOR: {
        part: "part-editor",
        props: [
            Props.prop_value,
            Props.prop_language,
            Props.prop_isReadOnly,
            Props.prop_placeholder,
            Props.prop_lineWrapping,
            Props.prop_editorHeight,
            Props.prop_numbersBackgroundColor,
            Props.prop_numbersColor,
            Props.prop_numberActiveBackgroundColor,
            Props.prop_lineActiveBackgroundColor,
            Props.prop_themeLightBackgroundColor,
            Props.prop_themeDarkBackgroundColor,
        ],
        name: Keys.category.components.codeMirror.schemas.editor.name,
        description: Keys.category.components.codeMirror.schemas.editor.description,
    },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
