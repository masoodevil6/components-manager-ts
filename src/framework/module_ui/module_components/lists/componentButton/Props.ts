import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentButton
 */

/**
 * ButtonSemantic — نوع معنایی دکمه (بازیابی prop_typeLegacy)
 * کلید رنگ‌های semantic: SUBMIT→primary، BACK→secondary، CANCEL→error، CUSTOM→propهای سفارشی
 */
export enum ButtonSemantic {
    CUSTOM =    "custom",
    SUBMIT =    "submit",
    CANCEL =    "cancel",
    BACK =      "back"
}

/**
 * ButtonVariants — نوع نمایشی دکمه
 */
export enum ButtonVariants {
    PRIMARY =   "primary",
    SECONDARY = "secondary",
    GHOST =     "ghost",
    ICON =      "icon",
}

/**
 * ButtonAction — رفتار HTML دکمه
 */
export enum ButtonAction {
    SUBMIT =    "submit",
    BUTTON =    "button",
}


/**
 * IconDescriptor — توصیف‌گر data-only برای آیکون دکمه (Plan 9.1.1)
 *
 * مطابق اصل "Props فقط Metadata" — به‌جای widget instance (IconsType قدیمی)،
 * یک descriptor نگه می‌شود که Component در زمان render به widget تبدیلش می‌کند.
 *
 * name — کلید definition آیکون در UiIcons.Src (مثل "FileReload")
 */
export type IconDescriptor = {
    name:  string;
};


/**
 * Props اختصاصی ComponentButton (Plan 9.1.1 — بازیابی کامل ۲۴ prop Legacy)
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    /// --- موجود (حفظ) ---

    prop_btnType: Define_ComponentProp<ButtonAction>({
        prop:         "prop_btnType",
        default:      ButtonAction.BUTTON ,
        name:         Keys.category.components.button.props.btnType.name,
        description:  Keys.category.components.button.props.btnType.description,
    }),

    prop_btnVariant: Define_ComponentProp<ButtonVariants>({
        prop:         "prop_btnVariant",
        default:      ButtonVariants.PRIMARY ,
        name:         Keys.category.components.button.props.btnVariant.name,
        description:  Keys.category.components.button.props.btnVariant.description,
    }),

    prop_btnTitle: Define_ComponentProp<string>({
        prop:         "prop_btnTitle",
        default:      "" ,
        name:         Keys.category.components.button.props.btnTitle.name,
        description:  Keys.category.components.button.props.btnTitle.description,
    }),

    prop_btnClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnClass",
        default:      [] ,
        name:         Keys.category.components.button.props.btnClass.name,
        description:  Keys.category.components.button.props.btnClass.description,
    }),

    prop_btnStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_btnStyles",
        default:      {} ,
        name:         Keys.category.components.button.props.btnStyles.name,
        description:  Keys.category.components.button.props.btnStyles.description,
    }),

    prop_btnDisabled: Define_ComponentProp<boolean>({
        prop:         "prop_btnDisabled",
        default:      false,
        name:         Keys.category.components.button.props.btnDisabled.name,
        description:  Keys.category.components.button.props.btnDisabled.description,
    }),

    prop_btnSemantic: Define_ComponentProp<ButtonSemantic>({
        prop:         "prop_btnSemantic",
        default:      ButtonSemantic.SUBMIT ,
        name:         Keys.category.components.button.props.btnSemantic.name,
        description:  Keys.category.components.button.props.btnSemantic.description,
    }),

    prop_btnWidth: Define_ComponentProp<string | null>({
        prop:         "prop_btnWidth",
        default:      null ,
        name:         Keys.category.components.button.props.btnWidth.name,
        description:  Keys.category.components.button.props.btnWidth.description,
    }),

    prop_btnHeight: Define_ComponentProp<string | null>({
        prop:         "prop_btnHeight",
        default:      null ,
        name:         Keys.category.components.button.props.btnHeight.name,
        description:  Keys.category.components.button.props.btnHeight.description,
    }),

    prop_btnBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderColor",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderColor.name,
        description:  Keys.category.components.button.props.btnBorderColor.description,
    }),

    prop_btnBorderWidth: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderWidth",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderWidth.name,
        description:  Keys.category.components.button.props.btnBorderWidth.description,
    }),

    prop_btnBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_btnBackgroundColor",
        default:      null ,
        name:         Keys.category.components.button.props.btnBackgroundColor.name,
        description:  Keys.category.components.button.props.btnBackgroundColor.description,
    }),

    prop_btnBackgroundColor_hover: Define_ComponentProp<string | null>({
        prop:         "prop_btnBackgroundColor_hover",
        default:      null ,
        name:         Keys.category.components.button.props.btnBackgroundColorHover.name,
        description:  Keys.category.components.button.props.btnBackgroundColorHover.description,
    }),

    prop_btnTitleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_btnTitleStyles",
        default:      {} ,
        name:         Keys.category.components.button.props.btnTitleStyles.name,
        description:  Keys.category.components.button.props.btnTitleStyles.description,
    }),

    prop_btnTitleClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnTitleClass",
        default:      [],
        name:         Keys.category.components.button.props.btnTitleClass.name,
        description:  Keys.category.components.button.props.btnTitleClass.description,
    }),

    prop_btnTitleColor: Define_ComponentProp<string | null>({
        prop:         "prop_btnTitleColor",
        default:      null ,
        name:         Keys.category.components.button.props.btnTitleColor.name,
        description:  Keys.category.components.button.props.btnTitleColor.description,
    }),

    prop_btnTitleColor_hover: Define_ComponentProp<string | null>({
        prop:         "prop_btnTitleColor_hover",
        default:      null,
        name:         Keys.category.components.button.props.btnTitleColorHover.name,
        description:  Keys.category.components.button.props.btnTitleColorHover.description,
    }),

    prop_btnIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_btnIcon",
        default:      null ,
        name:         Keys.category.components.button.props.btnIcon.name,
        description:  Keys.category.components.button.props.btnIcon.description,
    }),

    prop_btnIconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_btnIconStyles",
        default:      {},
        name:         Keys.category.components.button.props.btnIconStyles.name,
        description:  Keys.category.components.button.props.btnIconStyles.description,
    }),

    prop_btnIconClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnIconClass",
        default:      [] ,
        name:         Keys.category.components.button.props.btnIconClass.name,
        description:  Keys.category.components.button.props.btnIconClass.description,
    }),

    prop_btnBorderRadius: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderRadius",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderRadius.name,
        description:  Keys.category.components.button.props.btnBorderRadius.description,
    }),

    prop_btnBorderRadiusStartTop: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderRadiusStartTop",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderRadiusStartTop.name,
        description:  Keys.category.components.button.props.btnBorderRadiusStartTop.description,
    }),

    prop_btnBorderRadiusStartBottom: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderRadiusStartBottom",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderRadiusStartBottom.name,
        description:  Keys.category.components.button.props.btnBorderRadiusStartBottom.description,
    }),

    prop_btnBorderRadiusEndTop: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderRadiusEndTop",
        default:      null ,
        name:         Keys.category.components.button.props.btnBorderRadiusEndTop.name,
        description:  Keys.category.components.button.props.btnBorderRadiusEndTop.description,
    }),

    prop_btnBorderRadiusEndBottom: Define_ComponentProp<string | null>({
        prop:         "prop_btnBorderRadiusEndBottom",
        default:      null,
        name:         Keys.category.components.button.props.btnBorderRadiusEndBottom.name,
        description:  Keys.category.components.button.props.btnBorderRadiusEndBottom.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentButton — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 *
 * معماری renderComponent در زمان پردازش config، هر دو حالت را می‌پذیرد
 * (if Observable → store directly in _COMPONENT_PROPS_BIND)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;