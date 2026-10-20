import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {PropsConfigType as ComponentFormPropsConfigType} from "../componentForm/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum CustomFormMode {
    EDIT = "EDIT",
    RUN = "RUN",
}

export enum CustomFormFieldType {
    INPUT = "INPUT",
    TEXTAREA = "TEXTAREA",
    CHECKBOX = "CHECKBOX",
    RADIO = "RADIO",
    SELECT = "SELECT",
}

export type CustomFormOption = {label: string; value: string | number};

export type CustomFormField = {
    id: string;
    name: string;
    label: string;
    type: CustomFormFieldType;
    value?: unknown;
    placeholder?: string | null;
    required?: boolean;
    options?: CustomFormOption[];
    props?: Record<string, unknown>;
};

export type CustomFormGroup = {
    id: string;
    title: string;
    bodyIsOpen?: boolean;
    columns?: 1 | 2 | 3 | 4;
    fields: CustomFormField[];
};

export type CustomFormFormOptions = Partial<Pick<ComponentFormPropsConfigType,
    | "prop_url"
    | "prop_data"
    | "prop_controller"
    | "prop_showErrorStepper"
    | "prop_runFetch"
    | "prop_btnSubmit"
    | "prop_btnSubmitBackground"
    | "prop_btnSubmitBackgroundHover"
    | "prop_btnSubmitColor"
    | "prop_formClass"
    | "prop_formStyles"
    | "prop_formsMinHeight"
    | "prop_btnformClass"
    | "prop_btnformStyles"
>>;

const translation = Keys.category.components.fetch.form.customForm;

export const Props = {
    prop_customFormMode: Define_ComponentProp<CustomFormMode>({
        prop: "prop_customFormMode",
        default: CustomFormMode.EDIT,
        name: translation.props.mode.name,
        description: translation.props.mode.description,
    }),
    prop_customFormGroups: Define_ComponentProp<CustomFormGroup[]>({
        prop: "prop_customFormGroups",
        default: [],
        name: translation.props.groups.name,
        description: translation.props.groups.description,
    }),
    prop_customFormValues: Define_ComponentProp<Record<string, unknown>>({
        prop: "prop_customFormValues",
        default: {},
        name: translation.props.values.name,
        description: translation.props.values.description,
    }),
    prop_customFormFormOptions: Define_ComponentProp<CustomFormFormOptions>({
        prop: "prop_customFormFormOptions",
        default: {prop_runFetch: false},
        name: translation.props.formOptions.name,
        description: translation.props.formOptions.description,
    }),
    prop_customFormLayoutClass: Define_ComponentProp<string[]>({
        prop: "prop_customFormLayoutClass",
        default: [],
        name: translation.props.layoutClass.name,
        description: translation.props.layoutClass.description,
    }),
    prop_customFormLayoutStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_customFormLayoutStyles",
        default: {},
        name: translation.props.layoutStyles.name,
        description: translation.props.layoutStyles.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
