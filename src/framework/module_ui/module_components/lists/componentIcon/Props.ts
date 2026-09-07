import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons      from "@/ui_icons";
import * as UtilConst      from "@/util_consts";
import * as UtilStyle      from "@/util_styles";
import {Keys}              from "../../../module_categories/languages";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------



export const Props = {

    prop_icon: Define_ComponentProp<UiIcons.TIconInstance | null>({
        prop:         "prop_icon",
        default:      null ,
        name:         Keys.category.components.icon.props.icon.name,
        description:  Keys.category.components.icon.props.icon.description,
    }),

    prop_iconTitle: Define_ComponentProp<string>({
        prop:         "prop_iconTitle",
        default:      "" ,
        name:         Keys.category.components.icon.props.iconTitle.name,
        description:  Keys.category.components.icon.props.iconTitle.description,
    }),

    // prop_iconColor: {
    //     prop:         "prop_iconColor",
    //     default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY , UtilConst.ColorGrad.GRADE_1) ,
    //     name:         Keys.category.components.icon.props.iconColor.name,
    //     description:  Keys.category.components.icon.props.iconColor.description,
    // } satisfies TComponentPropEntry<UtilStyle.TColor>,


    prop_iconClass: Define_ComponentProp<string[]>({
        prop:         "prop_iconClass",
        default:      [] ,
        name:         Keys.category.components.icon.props.iconClass.name,
        description:  Keys.category.components.icon.props.iconClass.description,
    }),

    prop_iconStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_iconStyles",
        default:      {} ,
        name:         Keys.category.components.icon.props.iconStyles.name,
        description:  Keys.category.components.icon.props.iconStyles.description,
    }),

} satisfies CoreComponents.ComponentProps;



export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 *
 * معماری renderComponent در زمان پردازش config، هر دو حالت را می‌پذیرد
 * (if Observable → store directly in _COMPONENT_PROPS_BIND)
 *
 * این type مشکل TS2740 را حل می‌کند: وقتی Component والد (مثل ComponentButton)
 * propها را به‌صورت Observable از _COMPONENT_PROPS_BIND خودش به Component فرزند
 * (مثل ComponentIcon) forward می‌کند.
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
