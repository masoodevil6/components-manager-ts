import * as CoreComponents from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props} from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";

export const Schemas = {
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,
    OTP_STRUCTURE: { part: "part-input-otp-structure", props: [], name: Keys.category.components.inputOtp.schemas.otpStructure.name, description: Keys.category.components.inputOtp.schemas.otpStructure.description },
    VALUE: { part: "part-input-otp-value", props: [], name: Keys.category.components.inputOtp.schemas.value.name, description: Keys.category.components.inputOtp.schemas.value.description },
    ELEMENTS: { part: "part-input-otp-elements", props: [], name: Keys.category.components.inputOtp.schemas.elements.name, description: Keys.category.components.inputOtp.schemas.elements.description },
    LABEL: { part: "part-input-otp-label", props: [Props.prop_name, Props.prop_input, Props.prop_langs], name: Keys.category.components.inputOtp.schemas.label.name, description: Keys.category.components.inputOtp.schemas.label.description },
    INPUTS: { part: "part-input-otp-inputs", props: [Props.prop_name, Props.prop_length], name: Keys.category.components.inputOtp.schemas.inputs.name, description: Keys.category.components.inputOtp.schemas.inputs.description },
    TIMER_DOWN: { part: "part-input-otp-timer-down", props: [Props.prop_langs], name: Keys.category.components.inputOtp.schemas.timerDown.name, description: Keys.category.components.inputOtp.schemas.timerDown.description },
} satisfies CoreComponents.ComponentSchemas;

export type SchemasType = ExtractSchemasType<typeof Schemas>;
