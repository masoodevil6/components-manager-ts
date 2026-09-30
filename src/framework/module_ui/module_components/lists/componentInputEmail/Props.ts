import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: Keys.category.components.input.props.name.name, description: Keys.category.components.input.props.name.description}),
    prop_value: Define_ComponentProp<string | null>({prop: "prop_value", default: "", name: Keys.category.components.input.props.value.name, description: Keys.category.components.input.props.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: Keys.category.components.input.props.isDisable.name, description: Keys.category.components.input.props.isDisable.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: Keys.category.components.input.props.title.name, description: Keys.category.components.input.props.title.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: Keys.category.components.input.props.backgroundColorForm.name, description: Keys.category.components.input.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_formBorderRadius", default: UtilConst.Sizes.M, name: Keys.category.components.input.props.formBorderRadius.name, description: Keys.category.components.input.props.formBorderRadius.description}),
    prop_colorIcon: Define_ComponentProp<string | null>({prop: "prop_colorIcon", default: null, name: Keys.category.components.input.props.colorIcon.name, description: Keys.category.components.input.props.colorIcon.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: Keys.category.components.input.props.inputClass.name, description: Keys.category.components.input.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: Keys.category.components.input.props.inputStyles.name, description: Keys.category.components.input.props.inputStyles.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: Keys.category.components.input.props.placeholder.name, description: Keys.category.components.input.props.placeholder.description}),
    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({prop: "prop_icon", default: null, name: Keys.category.components.input.props.icon.name, description: Keys.category.components.input.props.icon.description}),
    prop_iconEmail: Define_ComponentProp<UiIcons.IIconDefinition | null>({prop: "prop_iconEmail", default: UiIcons.Src.UserEmail1.Definition, name: Keys.category.components.input.props.icon.name, description: Keys.category.components.input.props.icon.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: true, name: Keys.category.components.input.props.hasRules.name, description: Keys.category.components.input.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: true, name: Keys.category.components.input.props.isAbsoluteRule.name, description: Keys.category.components.input.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: Keys.category.components.input.props.listRules.name, description: Keys.category.components.input.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: Keys.category.components.input.props.msgRules.name, description: Keys.category.components.input.props.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;
