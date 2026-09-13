import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons          from "@/ui_icons";
import * as UtilStyle        from "@/util_styles";
import * as UtilConst        from "@/util_consts";
import {Keys}                from "../../../module_categories/languages";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentLoading
 */

/**
 * LoadingType — نوع انیمیشن لودینگ
 */
export enum LoadingType {
    CIRCLE =    "circle",
}


/**
 * Props اختصاصی ComponentLoading
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_type: Define_ComponentProp<LoadingType>({
        prop:         "prop_type",
        default:      LoadingType.CIRCLE,
        name:         Keys.category.components.loading.props.type.name,
        description:  Keys.category.components.loading.props.type.description,
    }),

    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_icon",
        default:      null,
        name:         Keys.category.components.loading.props.icon.name,
        description:  Keys.category.components.loading.props.icon.description,
    }),

    prop_backgroundLoading: Define_ComponentProp<string>({
        prop:         "prop_backgroundLoading",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.loading.props.backgroundLoading.name,
        description:  Keys.category.components.loading.props.backgroundLoading.description,
    }),

    prop_backgroundShadow: Define_ComponentProp<string>({
        prop:         "prop_backgroundShadow",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_4),
        name:         Keys.category.components.loading.props.backgroundShadow.name,
        description:  Keys.category.components.loading.props.backgroundShadow.description,
    }),

    prop_loadingWidth: Define_ComponentProp<number>({
        prop:         "prop_loadingWidth",
        default:      80,
        name:         Keys.category.components.loading.props.loadingWidth.name,
        description:  Keys.category.components.loading.props.loadingWidth.description,
    }),

    prop_loadingHeight: Define_ComponentProp<number>({
        prop:         "prop_loadingHeight",
        default:      80,
        name:         Keys.category.components.loading.props.loadingHeight.name,
        description:  Keys.category.components.loading.props.loadingHeight.description,
    }),

    prop_showCancel: Define_ComponentProp<boolean>({
        prop:         "prop_showCancel",
        default:      false,
        name:         Keys.category.components.loading.props.showCancel.name,
        description:  Keys.category.components.loading.props.showCancel.description,
    }),

    prop_cancelDelay: Define_ComponentProp<number>({
        prop:         "prop_cancelDelay",
        default:      2000,
        name:         Keys.category.components.loading.props.cancelDelay.name,
        description:  Keys.category.components.loading.props.cancelDelay.description,
    }),

} satisfies CoreComponents.ComponentProps;


export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
