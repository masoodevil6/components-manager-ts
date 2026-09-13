import * as CoreComponents   from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import {TooltipDirectionTypes} from "../componentTooltip/Props";
import type {ValidatorRule}  from "@/util_validators";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentInputCheckBox
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * شامل:
 *   - prop_value, prop_isDisable, prop_name (از FormInput_Value قدیم)
 *   - prop_labelTitle, prop_labelTooltipDescription (از FormInput_Label قدیم)
 *   - propهای borderIcon (colors, backgrounds, width, radius, opacity)
 *   - propهای icon (icon, iconClass, iconStyles)
 *   - propهای title (title, titleShow, titleClass, titleStyles, titleColor states)
 */
export const Props = {

    /// --- FormInput Value ---
    prop_value: Define_ComponentProp<any>({
        prop:         "prop_value",
        default:      false,
        name:         Keys.category.components.inputCheckBox.props.value.name,
        description:  Keys.category.components.inputCheckBox.props.value.description,
    }),

    prop_isDisable: Define_ComponentProp<boolean>({
        prop:         "prop_isDisable",
        default:      false,
        name:         Keys.category.components.inputCheckBox.props.isDisable.name,
        description:  Keys.category.components.inputCheckBox.props.isDisable.description,
    }),

    prop_name: Define_ComponentProp<string>({
        prop:         "prop_name",
        default:      "",
        name:         Keys.category.components.inputCheckBox.props.name.name,
        description:  Keys.category.components.inputCheckBox.props.name.description,
    }),

    /// --- FormInput Label (full label props from ComponentLabel) ---
    prop_labelShow: Define_ComponentProp<boolean>({
        prop:         "prop_labelShow",
        default:      true,
        name:         Keys.category.components.inputCheckBox.props.labelShow.name,
        description:  Keys.category.components.inputCheckBox.props.labelShow.description,
    }),

    prop_labelBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.labelBackground.name,
        description:  Keys.category.components.inputCheckBox.props.labelBackground.description,
    }),

    prop_labelRadius: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_labelRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.inputCheckBox.props.labelRadius.name,
        description:  Keys.category.components.inputCheckBox.props.labelRadius.description,
    }),

    prop_labelMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_labelMinWidth",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.labelMinWidth.name,
        description:  Keys.category.components.inputCheckBox.props.labelMinWidth.description,
    }),

    prop_labelTitle: Define_ComponentProp<string | null>({
        prop:         "prop_labelTitle",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.labelTitle.name,
        description:  Keys.category.components.inputCheckBox.props.labelTitle.description,
    }),

    prop_labelFor: Define_ComponentProp<string | null>({
        prop:         "prop_labelFor",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.labelFor.name,
        description:  Keys.category.components.inputCheckBox.props.labelFor.description,
    }),

    prop_labelStyle: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_labelStyle",
        default:      {},
        name:         Keys.category.components.inputCheckBox.props.labelStyle.name,
        description:  Keys.category.components.inputCheckBox.props.labelStyle.description,
    }),

    prop_labelClass: Define_ComponentProp<string[]>({
        prop:         "prop_labelClass",
        default:      [],
        name:         Keys.category.components.inputCheckBox.props.labelClass.name,
        description:  Keys.category.components.inputCheckBox.props.labelClass.description,
    }),

    prop_labelColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.labelColor.name,
        description:  Keys.category.components.inputCheckBox.props.labelColor.description,
    }),

    prop_labelTooltipIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_labelTooltipIcon",
        default:      UiIcons.Src.SymbolExclumationSquare.Definition,
        name:         Keys.category.components.inputCheckBox.props.labelTooltipIcon.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipIcon.description,
    }),

    prop_labelTooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipDescription",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.labelTooltipDescription.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipDescription.description,
    }),

    prop_labelTooltipBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.labelTooltipBackground.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipBackground.description,
    }),

    prop_labelTooltipColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.labelTooltipColor.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipColor.description,
    }),

    prop_labelTooltipPosition: Define_ComponentProp<ReturnType<typeof UtilStyle.Css_SizeUnit>>({
        prop:         "prop_labelTooltipPosition",
        default:      UtilStyle.Css_SizeUnit(2.5, UtilConst.Units.PERCENT),
        name:         Keys.category.components.inputCheckBox.props.labelTooltipPosition.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipPosition.description,
    }),

    prop_labelTooltipDirection: Define_ComponentProp<TooltipDirectionTypes>({
        prop:         "prop_labelTooltipDirection",
        default:      TooltipDirectionTypes.BOTTOM,
        name:         Keys.category.components.inputCheckBox.props.labelTooltipDirection.name,
        description:  Keys.category.components.inputCheckBox.props.labelTooltipDirection.description,
    }),

    /// --- BorderIcon ---
    prop_borderIconClass: Define_ComponentProp<string[]>({
        prop:         "prop_borderIconClass",
        default:      [],
        name:         Keys.category.components.inputCheckBox.props.borderIconClass.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconClass.description,
    }),

    prop_borderIconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_borderIconStyles",
        default:      {},
        name:         Keys.category.components.inputCheckBox.props.borderIconStyles.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconStyles.description,
    }),

    prop_borderIconColor_selected: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconColor_selected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.borderIconColor_selected.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconColor_selected.description,
    }),

    prop_borderIconColor_unSelected: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconColor_unSelected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
        name:         Keys.category.components.inputCheckBox.props.borderIconColor_unSelected.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconColor_unSelected.description,
    }),

    prop_borderIconColor_disable: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconColor_disable",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.borderIconColor_disable.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconColor_disable.description,
    }),

    prop_borderIconWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_borderIconWidth",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.inputCheckBox.props.borderIconWidth.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconWidth.description,
    }),

    prop_borderIconRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_borderIconRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.inputCheckBox.props.borderIconRadius.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconRadius.description,
    }),

    prop_borderIconOpacity: Define_ComponentProp<number | null>({
        prop:         "prop_borderIconOpacity",
        default:      100,
        name:         Keys.category.components.inputCheckBox.props.borderIconOpacity.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconOpacity.description,
    }),

    prop_borderIconBackground_selected: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconBackground_selected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.borderIconBackground_selected.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconBackground_selected.description,
    }),

    prop_borderIconBackground_unSelected: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconBackground_unSelected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_2),
        name:         Keys.category.components.inputCheckBox.props.borderIconBackground_unSelected.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconBackground_unSelected.description,
    }),

    prop_borderIconBackground_disable: Define_ComponentProp<string | null>({
        prop:         "prop_borderIconBackground_disable",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_2),
        name:         Keys.category.components.inputCheckBox.props.borderIconBackground_disable.name,
        description:  Keys.category.components.inputCheckBox.props.borderIconBackground_disable.description,
    }),

    /// --- Icon ---
    prop_icon: Define_ComponentProp<UiIcons.TIconInstance | null>({
        prop:         "prop_icon",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.icon.name,
        description:  Keys.category.components.inputCheckBox.props.icon.description,
    }),

    prop_iconClass: Define_ComponentProp<string[]>({
        prop:         "prop_iconClass",
        default:      [],
        name:         Keys.category.components.inputCheckBox.props.iconClass.name,
        description:  Keys.category.components.inputCheckBox.props.iconClass.description,
    }),

    prop_iconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_iconStyles",
        default:      {},
        name:         Keys.category.components.inputCheckBox.props.iconStyles.name,
        description:  Keys.category.components.inputCheckBox.props.iconStyles.description,
    }),

    /// --- Title ---
    prop_title: Define_ComponentProp<string>({
        prop:         "prop_title",
        default:      "",
        name:         Keys.category.components.inputCheckBox.props.title.name,
        description:  Keys.category.components.inputCheckBox.props.title.description,
    }),

    prop_titleShow: Define_ComponentProp<boolean>({
        prop:         "prop_titleShow",
        default:      true,
        name:         Keys.category.components.inputCheckBox.props.titleShow.name,
        description:  Keys.category.components.inputCheckBox.props.titleShow.description,
    }),

    prop_titleClass: Define_ComponentProp<string[]>({
        prop:         "prop_titleClass",
        default:      [],
        name:         Keys.category.components.inputCheckBox.props.titleClass.name,
        description:  Keys.category.components.inputCheckBox.props.titleClass.description,
    }),

    prop_titleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_titleStyles",
        default:      {},
        name:         Keys.category.components.inputCheckBox.props.titleStyles.name,
        description:  Keys.category.components.inputCheckBox.props.titleStyles.description,
    }),

    prop_titleColor_selected: Define_ComponentProp<string | null>({
        prop:         "prop_titleColor_selected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.inputCheckBox.props.titleColor_selected.name,
        description:  Keys.category.components.inputCheckBox.props.titleColor_selected.description,
    }),

    prop_titleColor_unSelected: Define_ComponentProp<string | null>({
        prop:         "prop_titleColor_unSelected",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5),
        name:         Keys.category.components.inputCheckBox.props.titleColor_unSelected.name,
        description:  Keys.category.components.inputCheckBox.props.titleColor_unSelected.description,
    }),

    prop_titleColor_disable: Define_ComponentProp<string | null>({
        prop:         "prop_titleColor_disable",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_2),
        name:         Keys.category.components.inputCheckBox.props.titleColor_disable.name,
        description:  Keys.category.components.inputCheckBox.props.titleColor_disable.description,
    }),

    /// --- Validate (optional) ---
    prop_listRules: Define_ComponentProp<ValidatorRule[]>({
        prop:         "prop_listRules",
        default:      [],
        name:         Keys.category.components.inputCheckBox.props.listRules.name,
        description:  Keys.category.components.inputCheckBox.props.listRules.description,
    }),

    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({
        prop:         "prop_msgRules",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.msgRules.name,
        description:  Keys.category.components.inputCheckBox.props.msgRules.description,
    }),

    prop_validateSize: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_validateSize",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.inputCheckBox.props.validateSize.name,
        description:  Keys.category.components.inputCheckBox.props.validateSize.description,
    }),

    prop_iconSuccess: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_iconSuccess",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.iconSuccess.name,
        description:  Keys.category.components.inputCheckBox.props.iconSuccess.description,
    }),

    prop_iconError: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_iconError",
        default:      null,
        name:         Keys.category.components.inputCheckBox.props.iconError.name,
        description:  Keys.category.components.inputCheckBox.props.iconError.description,
    }),

} satisfies CoreComponents.ComponentProps;


export type PropsType = ExtractPropsType<typeof Props>;


export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
