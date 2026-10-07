import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import {Keys} from "../../../module_categories/languages";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import type {ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum RadioBoxDirection {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

export interface RadioOptionItem {
    id: string | number;
    name: string;
    body?: any;
}

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: Keys.category.components.inputRadioBox.props.name.name, description: Keys.category.components.inputRadioBox.props.name.description}),
    prop_title: Define_ComponentProp<string>({prop: "prop_title", default: "", name: Keys.category.components.inputRadioBox.props.title.name, description: Keys.category.components.inputRadioBox.props.title.description}),
    prop_options: Define_ComponentProp<RadioOptionItem[]>({prop: "prop_options", default: [], name: Keys.category.components.inputRadioBox.props.options.name, description: Keys.category.components.inputRadioBox.props.options.description}),
    prop_itemSelected: Define_ComponentProp<string | number | null>({prop: "prop_itemSelected", default: null, name: Keys.category.components.inputRadioBox.props.itemSelected.name, description: Keys.category.components.inputRadioBox.props.itemSelected.description}),
    prop_direction: Define_ComponentProp<RadioBoxDirection>({prop: "prop_direction", default: RadioBoxDirection.VERTICAL, name: Keys.category.components.inputRadioBox.props.direction.name, description: Keys.category.components.inputRadioBox.props.direction.description}),
    prop_firstCallback: Define_ComponentProp<boolean>({prop: "prop_firstCallback", default: false, name: Keys.category.components.inputRadioBox.props.firstCallback.name, description: Keys.category.components.inputRadioBox.props.firstCallback.description}),
    prop_borderIconClass: Define_ComponentProp<string[]>({prop: "prop_borderIconClass", default: [], name: Keys.category.components.inputRadioBox.props.borderIconClass.name, description: Keys.category.components.inputRadioBox.props.borderIconClass.description}),
    prop_borderIconStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_borderIconStyles", default: {}, name: Keys.category.components.inputRadioBox.props.borderIconStyles.name, description: Keys.category.components.inputRadioBox.props.borderIconStyles.description}),
    prop_borderIconColor_selected: Define_ComponentProp<string | null>({prop: "prop_borderIconColor_selected", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.inputRadioBox.props.borderIconColorSelected.name, description: Keys.category.components.inputRadioBox.props.borderIconColorSelected.description}),
    prop_borderIconColor_unSelected: Define_ComponentProp<string | null>({prop: "prop_borderIconColor_unSelected", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3), name: Keys.category.components.inputRadioBox.props.borderIconColorUnSelected.name, description: Keys.category.components.inputRadioBox.props.borderIconColorUnSelected.description}),
    prop_borderIconColor_disable: Define_ComponentProp<string | null>({prop: "prop_borderIconColor_disable", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.inputRadioBox.props.borderIconColorDisable.name, description: Keys.category.components.inputRadioBox.props.borderIconColorDisable.description}),
    prop_borderIconWidth: Define_ComponentProp<UtilConst.Sizes | number>({prop: "prop_borderIconWidth", default: UtilConst.Sizes.M, name: Keys.category.components.inputRadioBox.props.borderIconWidth.name, description: Keys.category.components.inputRadioBox.props.borderIconWidth.description}),
    prop_borderIconRadius: Define_ComponentProp<UtilConst.Sizes | number>({prop: "prop_borderIconRadius", default: 999, name: Keys.category.components.inputRadioBox.props.borderIconRadius.name, description: Keys.category.components.inputRadioBox.props.borderIconRadius.description}),
    prop_borderIconOpacity: Define_ComponentProp<number | null>({prop: "prop_borderIconOpacity", default: 100, name: Keys.category.components.inputRadioBox.props.borderIconOpacity.name, description: Keys.category.components.inputRadioBox.props.borderIconOpacity.description}),
    prop_borderIconBackground_selected: Define_ComponentProp<string | null>({prop: "prop_borderIconBackground_selected", default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.inputRadioBox.props.borderIconBackgroundSelected.name, description: Keys.category.components.inputRadioBox.props.borderIconBackgroundSelected.description}),
    prop_borderIconBackground_unSelected: Define_ComponentProp<string | null>({prop: "prop_borderIconBackground_unSelected", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_2), name: Keys.category.components.inputRadioBox.props.borderIconBackgroundUnSelected.name, description: Keys.category.components.inputRadioBox.props.borderIconBackgroundUnSelected.description}),
    prop_borderIconBackground_disable: Define_ComponentProp<string | null>({prop: "prop_borderIconBackground_disable", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_2), name: Keys.category.components.inputRadioBox.props.borderIconBackgroundDisable.name, description: Keys.category.components.inputRadioBox.props.borderIconBackgroundDisable.description}),
    prop_icon: Define_ComponentProp<UiIcons.TIconInstance | null>({prop: "prop_icon", default: null, name: Keys.category.components.inputRadioBox.props.icon.name, description: Keys.category.components.inputRadioBox.props.icon.description}),
    prop_iconClass: Define_ComponentProp<string[]>({prop: "prop_iconClass", default: [], name: Keys.category.components.inputRadioBox.props.iconClass.name, description: Keys.category.components.inputRadioBox.props.iconClass.description}),
    prop_iconStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_iconStyles", default: {}, name: Keys.category.components.inputRadioBox.props.iconStyles.name, description: Keys.category.components.inputRadioBox.props.iconStyles.description}),
    prop_titleShow: Define_ComponentProp<boolean>({prop: "prop_titleShow", default: true, name: Keys.category.components.inputRadioBox.props.titleShow.name, description: Keys.category.components.inputRadioBox.props.titleShow.description}),
    prop_titleClass: Define_ComponentProp<string[]>({prop: "prop_titleClass", default: [], name: Keys.category.components.inputRadioBox.props.titleClass.name, description: Keys.category.components.inputRadioBox.props.titleClass.description}),
    prop_titleStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_titleStyles", default: {}, name: Keys.category.components.inputRadioBox.props.titleStyles.name, description: Keys.category.components.inputRadioBox.props.titleStyles.description}),
    prop_titleColor_selected: Define_ComponentProp<string | null>({prop: "prop_titleColor_selected", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), name: Keys.category.components.inputRadioBox.props.titleColorSelected.name, description: Keys.category.components.inputRadioBox.props.titleColorSelected.description}),
    prop_titleColor_unSelected: Define_ComponentProp<string | null>({prop: "prop_titleColor_unSelected", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5), name: Keys.category.components.inputRadioBox.props.titleColorUnSelected.name, description: Keys.category.components.inputRadioBox.props.titleColorUnSelected.description}),
    prop_titleColor_disable: Define_ComponentProp<string | null>({prop: "prop_titleColor_disable", default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_2), name: Keys.category.components.inputRadioBox.props.titleColorDisable.name, description: Keys.category.components.inputRadioBox.props.titleColorDisable.description}),
    prop_isAbsoluteRule: Define_ComponentProp<boolean>({prop: "prop_isAbsoluteRule", default: true, name: Keys.category.components.inputRadioBox.props.isAbsoluteRule.name, description: Keys.category.components.inputRadioBox.props.isAbsoluteRule.description}),
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({prop: "prop_listRules", default: [], name: Keys.category.components.inputRadioBox.props.listRules.name, description: Keys.category.components.inputRadioBox.props.listRules.description}),
    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({prop: "prop_msgRules", default: null, name: Keys.category.components.inputRadioBox.props.msgRules.name, description: Keys.category.components.inputRadioBox.props.msgRules.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: Keys.category.components.inputRadioBox.props.isDisable.name, description: Keys.category.components.inputRadioBox.props.isDisable.description}),
    ...ComponentLabelTrait.props,
} satisfies CoreComponents.ComponentProps;

export type PropsType = Omit<ExtractPropsType<typeof Props>, "prop_itemSelected"> & {
    prop_itemSelected: string | number | null | CoreObservable.App<string | number | null>;
} & ComponentLabelPropsType;
export type PropsConfigType = Omit<ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>, "prop_itemSelected"> & {
    prop_itemSelected?: string | number | null | CoreObservable.App<string | number | null>;
};
