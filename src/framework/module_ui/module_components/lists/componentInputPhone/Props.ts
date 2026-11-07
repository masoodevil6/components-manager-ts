import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import {Keys as KeysInput} from "../../../module_categories/languages/keys/components/input";
import {Keys as KeysInputPhone} from "../../../module_categories/languages/keys/components/inputPhone";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export interface PhoneOption {
    id: string | number;
    name: string | number;
    code: string | number;
    countryId?: string | number;
}

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: KeysInput.category.components.input.props.name.name, description: KeysInput.category.components.input.props.name.description}),
    prop_value: Define_ComponentProp<string | null>({prop: "prop_value", default: "", name: KeysInput.category.components.input.props.value.name, description: KeysInput.category.components.input.props.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: KeysInput.category.components.input.props.isDisable.name, description: KeysInput.category.components.input.props.isDisable.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: KeysInput.category.components.input.props.title.name, description: KeysInput.category.components.input.props.title.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: KeysInput.category.components.input.props.backgroundColorForm.name, description: KeysInput.category.components.input.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes | null>({prop: "prop_formBorderRadius", default: null, name: KeysInput.category.components.input.props.formBorderRadius.name, description: KeysInput.category.components.input.props.formBorderRadius.description}),
    prop_colorIcon: Define_ComponentProp<string | null>({prop: "prop_colorIcon", default: null, name: KeysInput.category.components.input.props.colorIcon.name, description: KeysInput.category.components.input.props.colorIcon.description}),
    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({prop: "prop_icon", default: UiIcons.Src.UserPhone.Definition, name: KeysInput.category.components.input.props.icon.name, description: KeysInput.category.components.input.props.icon.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: KeysInput.category.components.input.props.inputClass.name, description: KeysInput.category.components.input.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: KeysInput.category.components.input.props.inputStyles.name, description: KeysInput.category.components.input.props.inputStyles.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: KeysInput.category.components.input.props.placeholder.name, description: KeysInput.category.components.input.props.placeholder.description}),
    prop_countryHas: Define_ComponentProp<boolean>({prop: "prop_countryHas", default: true, name: KeysInputPhone.category.components.inputPhone.props.countryHas.name, description: KeysInputPhone.category.components.inputPhone.props.countryHas.description}),
    prop_countryWidth: Define_ComponentProp<number>({prop: "prop_countryWidth", default: 80, name: KeysInputPhone.category.components.inputPhone.props.countryWidth.name, description: KeysInputPhone.category.components.inputPhone.props.countryWidth.description}),
    prop_countryValue: Define_ComponentProp<string | number | null>({prop: "prop_countryValue", default: 1, name: KeysInputPhone.category.components.inputPhone.props.countryValue.name, description: KeysInputPhone.category.components.inputPhone.props.countryValue.description}),
    prop_countryOptions: Define_ComponentProp<PhoneOption[]>({prop: "prop_countryOptions", default: [], name: KeysInputPhone.category.components.inputPhone.props.countryOptions.name, description: KeysInputPhone.category.components.inputPhone.props.countryOptions.description}),
    prop_cityHas: Define_ComponentProp<boolean>({prop: "prop_cityHas", default: true, name: KeysInputPhone.category.components.inputPhone.props.cityHas.name, description: KeysInputPhone.category.components.inputPhone.props.cityHas.description}),
    prop_cityWidth: Define_ComponentProp<number>({prop: "prop_cityWidth", default: 80, name: KeysInputPhone.category.components.inputPhone.props.cityWidth.name, description: KeysInputPhone.category.components.inputPhone.props.cityWidth.description}),
    prop_cityValue: Define_ComponentProp<string | number | null>({prop: "prop_cityValue", default: 101, name: KeysInputPhone.category.components.inputPhone.props.cityValue.name, description: KeysInputPhone.category.components.inputPhone.props.cityValue.description}),
    prop_cityOptions: Define_ComponentProp<PhoneOption[]>({prop: "prop_cityOptions", default: [], name: KeysInputPhone.category.components.inputPhone.props.cityOptions.name, description: KeysInputPhone.category.components.inputPhone.props.cityOptions.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: false, name: KeysInput.category.components.input.props.hasRules.name, description: KeysInput.category.components.input.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: false, name: KeysInput.category.components.input.props.isAbsoluteRule.name, description: KeysInput.category.components.input.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: KeysInput.category.components.input.props.listRules.name, description: KeysInput.category.components.input.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: KeysInput.category.components.input.props.msgRules.name, description: KeysInput.category.components.input.props.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;
