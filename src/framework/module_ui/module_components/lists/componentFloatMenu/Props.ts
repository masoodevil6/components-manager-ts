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
 * Enums اختصاصی ComponentFloatMenu
 */

/**
 * DirectionTypes — جهت نمایش float panel نسبت به selector
 */
export enum DirectionTypes {
    TOP    = "top",
    RIGHT  = "right",
    BOTTOM = "bottom",
    LEFT   = "left",
}

/**
 * ShowTypes — نوع trigger نمایش float panel
 */
export enum ShowTypes {
    HOVER = "hover",
    CLICK = "click",
}


/**
 * Props اختصاصی ComponentFloatMenu (۲۰ prop — بازیابی کامل Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    /// --- Selector ---

    prop_selectorContent: Define_ComponentProp<string | any>({
        prop:         "prop_selectorContent",
        default:      "",
        name:         Keys.category.components.floatMenu.props.selectorContent.name,
        description:  Keys.category.components.floatMenu.props.selectorContent.description,
    }),

    prop_selectorClass: Define_ComponentProp<string[]>({
        prop:         "prop_selectorClass",
        default:      [],
        name:         Keys.category.components.floatMenu.props.selectorClass.name,
        description:  Keys.category.components.floatMenu.props.selectorClass.description,
    }),

    prop_selectorStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_selectorStyles",
        default:      {},
        name:         Keys.category.components.floatMenu.props.selectorStyles.name,
        description:  Keys.category.components.floatMenu.props.selectorStyles.description,
    }),

    prop_selectorShowType: Define_ComponentProp<ShowTypes>({
        prop:         "prop_selectorShowType",
        default:      ShowTypes.CLICK,
        name:         Keys.category.components.floatMenu.props.selectorShowType.name,
        description:  Keys.category.components.floatMenu.props.selectorShowType.description,
    }),

    /// --- Float ---

    prop_floatClass: Define_ComponentProp<string[]>({
        prop:         "prop_floatClass",
        default:      ["mt-2"],
        name:         Keys.category.components.floatMenu.props.floatClass.name,
        description:  Keys.category.components.floatMenu.props.floatClass.description,
    }),

    prop_floatStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_floatStyles",
        default:      {},
        name:         Keys.category.components.floatMenu.props.floatStyles.name,
        description:  Keys.category.components.floatMenu.props.floatStyles.description,
    }),

    prop_floatContent: Define_ComponentProp<string | any>({
        prop:         "prop_floatContent",
        default:      "",
        name:         Keys.category.components.floatMenu.props.floatContent.name,
        description:  Keys.category.components.floatMenu.props.floatContent.description,
    }),

    prop_floatDirectionType: Define_ComponentProp<DirectionTypes>({
        prop:         "prop_floatDirectionType",
        default:      DirectionTypes.TOP,
        name:         Keys.category.components.floatMenu.props.floatDirectionType.name,
        description:  Keys.category.components.floatMenu.props.floatDirectionType.description,
    }),

    prop_floatArrowWidth: Define_ComponentProp<number>({
        prop:         "prop_floatArrowWidth",
        default:      10,
        name:         Keys.category.components.floatMenu.props.floatArrowWidth.name,
        description:  Keys.category.components.floatMenu.props.floatArrowWidth.description,
    }),

    prop_floatDistance: Define_ComponentProp<number>({
        prop:         "prop_floatDistance",
        default:      10,
        name:         Keys.category.components.floatMenu.props.floatDistance.name,
        description:  Keys.category.components.floatMenu.props.floatDistance.description,
    }),

    /// --- Float Border ---

    prop_floatBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_floatBorderWidth",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.floatMenu.props.floatBorderWidth.name,
        description:  Keys.category.components.floatMenu.props.floatBorderWidth.description,
    }),

    prop_floatBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_floatBorderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.floatMenu.props.floatBorderColor.name,
        description:  Keys.category.components.floatMenu.props.floatBorderColor.description,
    }),

    prop_floatBorderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_floatBorderRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.floatMenu.props.floatBorderRadius.name,
        description:  Keys.category.components.floatMenu.props.floatBorderRadius.description,
    }),

    /// --- Float Size ---

    prop_floatWidth: Define_ComponentProp<string | null>({
        prop:         "prop_floatWidth",
        default:      null,
        name:         Keys.category.components.floatMenu.props.floatWidth.name,
        description:  Keys.category.components.floatMenu.props.floatWidth.description,
    }),

    prop_floatMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_floatMinWidth",
        default:      null,
        name:         Keys.category.components.floatMenu.props.floatMinWidth.name,
        description:  Keys.category.components.floatMenu.props.floatMinWidth.description,
    }),

    prop_floatPosition: Define_ComponentProp<string | null>({
        prop:         "prop_floatPosition",
        default:      null,
        name:         Keys.category.components.floatMenu.props.floatPosition.name,
        description:  Keys.category.components.floatMenu.props.floatPosition.description,
    }),

    prop_floatArrowPosition: Define_ComponentProp<string | null>({
        prop:         "prop_floatArrowPosition",
        default:      UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
        name:         Keys.category.components.floatMenu.props.floatArrowPosition.name,
        description:  Keys.category.components.floatMenu.props.floatArrowPosition.description,
    }),

    /// --- Float Colors ---

    prop_floatBackground: Define_ComponentProp<string | null>({
        prop:         "prop_floatBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.floatMenu.props.floatBackground.name,
        description:  Keys.category.components.floatMenu.props.floatBackground.description,
    }),

    prop_floatColor: Define_ComponentProp<string | null>({
        prop:         "prop_floatColor",
        default:      null,
        name:         Keys.category.components.floatMenu.props.floatColor.name,
        description:  Keys.category.components.floatMenu.props.floatColor.description,
    }),

    /// --- State ---

    prop_floatShowControlWithSelf: Define_ComponentProp<boolean>({
        prop:         "prop_floatShowControlWithSelf",
        default:      false,
        name:         Keys.category.components.floatMenu.props.floatShowControlWithSelf.name,
        description:  Keys.category.components.floatMenu.props.floatShowControlWithSelf.description,
    }),

    prop_floatIsShow: Define_ComponentProp<boolean>({
        prop:         "prop_floatIsShow",
        default:      false,
        name:         Keys.category.components.floatMenu.props.floatIsShow.name,
        description:  Keys.category.components.floatMenu.props.floatIsShow.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentFloatMenu — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
