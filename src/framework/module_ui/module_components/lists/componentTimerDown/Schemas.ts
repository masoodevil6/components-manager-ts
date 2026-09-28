import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    FORM: { part: "part-timer-down-form", props: [Props.prop_backgroundColor_body], name: Keys.category.components.timerDown.schemas.form.name, description: Keys.category.components.timerDown.schemas.form.description },
    TOOLTIP: { part: "part-timer-down-tooltip", props: [Props.prop_tooltipIcon, Props.prop_description, Props.prop_backgroundColor_body], name: Keys.category.components.timerDown.schemas.tooltip.name, description: Keys.category.components.timerDown.schemas.tooltip.description },
    TIMER: { part: "part-timer-down-timer", props: [Props.prop_backgroundColor_timer, Props.prop_backgroundColor_timerEffect, Props.prop_color_timer, Props.prop_show_options], name: Keys.category.components.timerDown.schemas.timer.name, description: Keys.category.components.timerDown.schemas.timer.description },
    TEXT: { part: "part-timer-down-text", props: [Props.prop_color_description, Props.prop_lang_on_progress_duration, Props.prop_lang_on_end_duration, Props.prop_show_options], name: Keys.category.components.timerDown.schemas.text.name, description: Keys.category.components.timerDown.schemas.text.description },
    TEXT_BUTTON: { part: "part-timer-down-text-button", props: [Props.prop_lang_btn_resend], name: Keys.category.components.timerDown.schemas.textButton.name, description: Keys.category.components.timerDown.schemas.textButton.description },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
