import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type InputOtpLanguages = {
    _title_otp_description?: string;
    _tooltip_otp_description?: string | null;
};

export const Props = {
    prop_name: Define_ComponentProp<string>({
        prop: "prop_name",
        default: "otp",
        name: Keys.category.components.inputOtp.props.name.name,
        description: Keys.category.components.inputOtp.props.name.description,
    }),
    prop_input: Define_ComponentProp<string | null>({
        prop: "prop_input",
        default: null,
        name: Keys.category.components.inputOtp.props.input.name,
        description: Keys.category.components.inputOtp.props.input.description,
    }),
    prop_langs: Define_ComponentProp<InputOtpLanguages>({
        prop: "prop_langs",
        default: {
            _title_otp_description: "کد برای شماره/ایمیل زیر ارسال شد",
            _tooltip_otp_description: null,
        },
        name: Keys.category.components.inputOtp.props.langs.name,
        description: Keys.category.components.inputOtp.props.langs.description,
    }),
    prop_length: Define_ComponentProp<number>({
        prop: "prop_length",
        default: 6,
        name: Keys.category.components.inputOtp.props.length.name,
        description: Keys.category.components.inputOtp.props.length.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
