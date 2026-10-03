import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: Keys.category.components.inputSize.props.name.name, description: Keys.category.components.inputSize.props.name.description}),
    prop_value: Define_ComponentProp<number | null>({prop: "prop_value", default: null, name: Keys.category.components.inputSize.props.value.name, description: Keys.category.components.inputSize.props.value.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: Keys.category.components.inputSize.props.isDisable.name, description: Keys.category.components.inputSize.props.isDisable.description}),
    prop_title: Define_ComponentProp<string | null>({prop: "prop_title", default: null, name: Keys.category.components.inputSize.props.title.name, description: Keys.category.components.inputSize.props.title.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: Keys.category.components.inputSize.props.backgroundColorForm.name, description: Keys.category.components.inputSize.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_formBorderRadius", default: UtilConst.Sizes.M, name: Keys.category.components.inputSize.props.formBorderRadius.name, description: Keys.category.components.inputSize.props.formBorderRadius.description}),
    prop_colorIcon: Define_ComponentProp<string | null>({prop: "prop_colorIcon", default: null, name: Keys.category.components.inputSize.props.colorIcon.name, description: Keys.category.components.inputSize.props.colorIcon.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: Keys.category.components.inputSize.props.inputClass.name, description: Keys.category.components.inputSize.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: Keys.category.components.inputSize.props.inputStyles.name, description: Keys.category.components.inputSize.props.inputStyles.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: Keys.category.components.inputSize.props.placeholder.name, description: Keys.category.components.inputSize.props.placeholder.description}),
    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({prop: "prop_icon", default: null, name: Keys.category.components.inputSize.props.icon.name, description: Keys.category.components.inputSize.props.icon.description}),
    prop_buttonsWidth: Define_ComponentProp<number>({prop: "prop_buttonsWidth", default: 45, name: Keys.category.components.inputSize.props.buttonsWidth.name, description: Keys.category.components.inputSize.props.buttonsWidth.description}),
    prop_iconIncrement: Define_ComponentProp<UiIcons.IIconDefinition>({prop: "prop_iconIncrement", default: UiIcons.Src.CalcDivide.Definition, name: Keys.category.components.inputSize.props.iconIncrement.name, description: Keys.category.components.inputSize.props.iconIncrement.description}),
    prop_iconDecrement: Define_ComponentProp<UiIcons.IIconDefinition>({prop: "prop_iconDecrement", default: UiIcons.Src.CalcMinus.Definition, name: Keys.category.components.inputSize.props.iconDecrement.name, description: Keys.category.components.inputSize.props.iconDecrement.description}),
    prop_min: Define_ComponentProp<number | null>({prop: "prop_min", default: null, name: Keys.category.components.inputSize.props.min.name, description: Keys.category.components.inputSize.props.min.description}),
    prop_max: Define_ComponentProp<number | null>({prop: "prop_max", default: null, name: Keys.category.components.inputSize.props.max.name, description: Keys.category.components.inputSize.props.max.description}),
    prop_hasRules: Define_ComponentProp<boolean>({prop: "prop_hasRules", default: false, name: Keys.category.components.inputSize.props.hasRules.name, description: Keys.category.components.inputSize.props.hasRules.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: true, name: Keys.category.components.inputSize.props.isAbsoluteRule.name, description: Keys.category.components.inputSize.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: Keys.category.components.inputSize.props.listRules.name, description: Keys.category.components.inputSize.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: Keys.category.components.inputSize.props.msgRules.name, description: Keys.category.components.inputSize.props.msgRules.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props> & ComponentLabelPropsType;
export type PropsConfigType = ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>;
