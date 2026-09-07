import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilStyle        from "@/util_styles";
import * as UtilConst        from "@/util_consts";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentBorder — حفظ نام‌های legacy
 */
export enum ArrowTypes {
    TOP    = "top",
    RIGHT  = "right",
    BOTTOM = "bottom",
    LEFT   = "left",
}

export enum BorderTypes {
    SOLID  = "solid",
    DASHED = "dashed",
}


/**
 * Props اختصاصی ComponentBorder (۲۴ prop — بازیابی کامل Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    /// --- Content ---

    prop_content: Define_ComponentProp<string | any>({
        prop:         "prop_content",
        default:      "",
        name:         Keys.category.components.border.props.content.name,
        description:  Keys.category.components.border.props.content.description,
    }),

    prop_contentSize: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_contentSize",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.border.props.contentSize.name,
        description:  Keys.category.components.border.props.contentSize.description,
    }),

    /// --- Content Colors ---

    prop_contentColor: Define_ComponentProp<string | null>({
        prop:         "prop_contentColor",
        default:      null,
        name:         Keys.category.components.border.props.contentColor.name,
        description:  Keys.category.components.border.props.contentColor.description,
    }),

    prop_contentColor_hover: Define_ComponentProp<string | null>({
        prop:         "prop_contentColor_hover",
        default:      null,
        name:         Keys.category.components.border.props.contentColor_hover.name,
        description:  Keys.category.components.border.props.contentColor_hover.description,
    }),

    prop_contentBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_contentBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.border.props.contentBackgroundColor.name,
        description:  Keys.category.components.border.props.contentBackgroundColor.description,
    }),

    prop_contentBackgroundColor_hover: Define_ComponentProp<string | null>({
        prop:         "prop_contentBackgroundColor_hover",
        default:      null,
        name:         Keys.category.components.border.props.contentBackgroundColor_hover.name,
        description:  Keys.category.components.border.props.contentBackgroundColor_hover.description,
    }),

    /// --- Border Colors ---

    prop_borderColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.border.props.borderColor.name,
        description:  Keys.category.components.border.props.borderColor.description,
    }),

    prop_borderColor_hover: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor_hover",
        default:      null,
        name:         Keys.category.components.border.props.borderColor_hover.name,
        description:  Keys.category.components.border.props.borderColor_hover.description,
    }),

    /// --- Border Class & Styles ---

    prop_borderClass: Define_ComponentProp<string[]>({
        prop:         "prop_borderClass",
        default:      ["shadow-sm", "position-relative", "px-2"],
        name:         Keys.category.components.border.props.borderClass.name,
        description:  Keys.category.components.border.props.borderClass.description,
    }),

    prop_borderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_borderStyles",
        default:      {"display": "flow-root"},
        name:         Keys.category.components.border.props.borderStyles.name,
        description:  Keys.category.components.border.props.borderStyles.description,
    }),

    /// --- Border Type & Opacity ---

    prop_borderType: Define_ComponentProp<BorderTypes>({
        prop:         "prop_borderType",
        default:      BorderTypes.SOLID,
        name:         Keys.category.components.border.props.borderType.name,
        description:  Keys.category.components.border.props.borderType.description,
    }),

    prop_borderOpacity: Define_ComponentProp<number | null>({
        prop:         "prop_borderOpacity",
        default:      100,
        name:         Keys.category.components.border.props.borderOpacity.name,
        description:  Keys.category.components.border.props.borderOpacity.description,
    }),

    /// --- Arrow ---

    prop_borderArrowType: Define_ComponentProp<ArrowTypes | null>({
        prop:         "prop_borderArrowType",
        default:      null,
        name:         Keys.category.components.border.props.borderArrowType.name,
        description:  Keys.category.components.border.props.borderArrowType.description,
    }),

    prop_borderArrowWidth: Define_ComponentProp<number>({
        prop:         "prop_borderArrowWidth",
        default:      10,
        name:         Keys.category.components.border.props.borderArrowWidth.name,
        description:  Keys.category.components.border.props.borderArrowWidth.description,
    }),

    prop_borderArrowPosition: Define_ComponentProp<string | null>({
        prop:         "prop_borderArrowPosition",
        default:      UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
        name:         Keys.category.components.border.props.borderArrowPosition.name,
        description:  Keys.category.components.border.props.borderArrowPosition.description,
    }),

    /// --- Width ---

    prop_minWidth: Define_ComponentProp<string | null>({
        prop:         "prop_minWidth",
        default:      null,
        name:         Keys.category.components.border.props.minWidth.name,
        description:  Keys.category.components.border.props.minWidth.description,
    }),

    prop_width: Define_ComponentProp<string | null>({
        prop:         "prop_width",
        default:      null,
        name:         Keys.category.components.border.props.width.name,
        description:  Keys.category.components.border.props.width.description,
    }),

    /// --- Border Radius Has ---

    prop_borderTopLeftRadiusHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderTopLeftRadiusHas",
        default:      true,
        name:         Keys.category.components.border.props.borderTopLeftRadiusHas.name,
        description:  Keys.category.components.border.props.borderTopLeftRadiusHas.description,
    }),

    prop_borderTopRightRadiusHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderTopRightRadiusHas",
        default:      true,
        name:         Keys.category.components.border.props.borderTopRightRadiusHas.name,
        description:  Keys.category.components.border.props.borderTopRightRadiusHas.description,
    }),

    prop_borderBottomLeftRadiusHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderBottomLeftRadiusHas",
        default:      true,
        name:         Keys.category.components.border.props.borderBottomLeftRadiusHas.name,
        description:  Keys.category.components.border.props.borderBottomLeftRadiusHas.description,
    }),

    prop_borderBottomRightRadiusHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderBottomRightRadiusHas",
        default:      true,
        name:         Keys.category.components.border.props.borderBottomRightRadiusHas.name,
        description:  Keys.category.components.border.props.borderBottomRightRadiusHas.description,
    }),

    /// --- Border Side Has ---

    prop_borderTopHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderTopHas",
        default:      true,
        name:         Keys.category.components.border.props.borderTopHas.name,
        description:  Keys.category.components.border.props.borderTopHas.description,
    }),

    prop_borderRightHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderRightHas",
        default:      true,
        name:         Keys.category.components.border.props.borderRightHas.name,
        description:  Keys.category.components.border.props.borderRightHas.description,
    }),

    prop_borderBottomHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderBottomHas",
        default:      true,
        name:         Keys.category.components.border.props.borderBottomHas.name,
        description:  Keys.category.components.border.props.borderBottomHas.description,
    }),

    prop_borderLeftHas: Define_ComponentProp<boolean>({
        prop:         "prop_borderLeftHas",
        default:      true,
        name:         Keys.category.components.border.props.borderLeftHas.name,
        description:  Keys.category.components.border.props.borderLeftHas.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentBorder — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
