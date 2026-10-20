import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    FORM: {part: "part-form", props: [], name: Keys.category.components.fetch.form.schemas.form.name, description: Keys.category.components.fetch.form.schemas.form.description},
    BORDER: {part: "part-form-border", props: [
        Props.prop_borderClass, Props.prop_borderStyles,
        Props.prop_componentBorderSelector, Props.prop_componentBorderAppend,
        Props.prop_componentBorderClassList, Props.prop_componentBorderElementStyles, Props.prop_componentBorderShow,
        Props.prop_componentBorderStructureClass, Props.prop_componentBorderStructureStyles,
        Props.prop_componentBorderContentSize, Props.prop_componentBorderContentColor, Props.prop_componentBorderContentColorHover,
        Props.prop_componentBorderContentBackgroundColor, Props.prop_componentBorderContentBackgroundColorHover,
        Props.prop_componentBorderColor, Props.prop_componentBorderColorHover, Props.prop_componentBorderClass,
        Props.prop_componentBorderStyles, Props.prop_componentBorderType, Props.prop_componentBorderOpacity,
        Props.prop_componentBorderArrowType, Props.prop_componentBorderArrowWidth, Props.prop_componentBorderArrowPosition,
        Props.prop_componentBorderMinWidth, Props.prop_componentBorderWidth,
        Props.prop_componentBorderTopLeftRadiusHas, Props.prop_componentBorderTopRightRadiusHas,
        Props.prop_componentBorderBottomLeftRadiusHas, Props.prop_componentBorderBottomRightRadiusHas,
        Props.prop_componentBorderTopHas, Props.prop_componentBorderRightHas,
        Props.prop_componentBorderBottomHas, Props.prop_componentBorderLeftHas,
    ], name: Keys.category.components.fetch.form.schemas.border.name, description: Keys.category.components.fetch.form.schemas.border.description},
    BODY: {part: "part-form-body", props: [
        Props.prop_forms, Props.prop_formClass, Props.prop_formStyles, Props.prop_formsMinHeight,
        Props.prop_btnformClass, Props.prop_btnformStyles, Props.prop_btnSubmit,
        Props.prop_btnSubmitBackground, Props.prop_btnSubmitBackgroundHover, Props.prop_btnSubmitColor,
        Props.prop_url, Props.prop_data, Props.prop_showErrorStepper, Props.prop_runFetch, Props.prop_controller,
    ], name: Keys.category.components.fetch.form.schemas.body.name, description: Keys.category.components.fetch.form.schemas.body.description},
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
