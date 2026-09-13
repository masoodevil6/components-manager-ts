import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                  from "../../../module_categories/languages";
import * as UtilConst          from "@/util_consts";
import * as UtilStyle          from "@/util_styles";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * ComponentSidebar — Props
 *
 * تمام prop‌های اختصاصی ComponentSidebar با Define_ComponentProp<T>
 * این Props به prop‌های پایه ComponentStructure اضافه می‌شوند.
 */
export enum SidebarDirection {
    RTL = "right_to_left",
    LTR = "left_to_right",
    TTB = "top_to_bottom",
    BTT = "bottom_to_top",
}


export const Props = {

    prop_blurBackground: Define_ComponentProp<string | null>({
        prop:         "prop_blurBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_4),
        name:         Keys.category.components.sidebar.props.blurBackground.name,
        description:  Keys.category.components.sidebar.props.blurBackground.description,
    }),

    prop_blurHas: Define_ComponentProp<boolean>({
        prop:         "prop_blurHas",
        default:      true,
        name:         Keys.category.components.sidebar.props.blurHas.name,
        description:  Keys.category.components.sidebar.props.blurHas.description,
    }),

    prop_sidebarBackground: Define_ComponentProp<string | null>({
        prop:         "prop_sidebarBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.sidebar.props.sidebarBackground.name,
        description:  Keys.category.components.sidebar.props.sidebarBackground.description,
    }),

    prop_sidebarBorderRadius: Define_ComponentProp<UtilConst.Sizes | number | null>({
        prop:         "prop_sidebarBorderRadius",
        default:      null,
        name:         Keys.category.components.sidebar.props.sidebarBorderRadius.name,
        description:  Keys.category.components.sidebar.props.sidebarBorderRadius.description,
    }),

    prop_sidebarWidth: Define_ComponentProp<number | null>({
        prop:         "prop_sidebarWidth",
        default:      120,
        name:         Keys.category.components.sidebar.props.sidebarWidth.name,
        description:  Keys.category.components.sidebar.props.sidebarWidth.description,
    }),

    prop_sidebarDirection: Define_ComponentProp<SidebarDirection>({
        prop:         "prop_sidebarDirection",
        default:      SidebarDirection.LTR,
        name:         Keys.category.components.sidebar.props.sidebarDirection.name,
        description:  Keys.category.components.sidebar.props.sidebarDirection.description,
    }),

    prop_sidebarIsOpen: Define_ComponentProp<boolean>({
        prop:         "prop_sidebarIsOpen",
        default:      true,
        name:         Keys.category.components.sidebar.props.sidebarIsOpen.name,
        description:  Keys.category.components.sidebar.props.sidebarIsOpen.description,
    }),

    prop_sidebarDuration: Define_ComponentProp<number>({
        prop:         "prop_sidebarDuration",
        default:      500,
        name:         Keys.category.components.sidebar.props.sidebarDuration.name,
        description:  Keys.category.components.sidebar.props.sidebarDuration.description,
    }),

    prop_sidebarContent: Define_ComponentProp<any>({
        prop:         "prop_sidebarContent",
        default:      "",
        name:         Keys.category.components.sidebar.props.sidebarContent.name,
        description:  Keys.category.components.sidebar.props.sidebarContent.description,
    }),

    prop_sidebarPositionStart: Define_ComponentProp<string | number | null>({
        prop:         "prop_sidebarPositionStart",
        default:      null,
        name:         Keys.category.components.sidebar.props.sidebarPositionStart.name,
        description:  Keys.category.components.sidebar.props.sidebarPositionStart.description,
    }),

    prop_sidebarPositionEnd: Define_ComponentProp<string | number | null>({
        prop:         "prop_sidebarPositionEnd",
        default:      null,
        name:         Keys.category.components.sidebar.props.sidebarPositionEnd.name,
        description:  Keys.category.components.sidebar.props.sidebarPositionEnd.description,
    }),

    prop_sidebarMargin: Define_ComponentProp<string | null>({
        prop:         "prop_sidebarMargin",
        default:      null,
        name:         Keys.category.components.sidebar.props.sidebarMargin.name,
        description:  Keys.category.components.sidebar.props.sidebarMargin.description,
    }),

    prop_sidebarOpacity: Define_ComponentProp<number | null>({
        prop:         "prop_sidebarOpacity",
        default:      null,
        name:         Keys.category.components.sidebar.props.sidebarOpacity.name,
        description:  Keys.category.components.sidebar.props.sidebarOpacity.description,
    }),

    prop_sidebarBtnOpenHas: Define_ComponentProp<boolean>({
        prop:         "prop_sidebarBtnOpenHas",
        default:      true,
        name:         Keys.category.components.sidebar.props.sidebarBtnOpenHas.name,
        description:  Keys.category.components.sidebar.props.sidebarBtnOpenHas.description,
    }),

    prop_sidebarBtnOpenSize: Define_ComponentProp<number | null>({
        prop:         "prop_sidebarBtnOpenSize",
        default:      25,
        name:         Keys.category.components.sidebar.props.sidebarBtnOpenSize.name,
        description:  Keys.category.components.sidebar.props.sidebarBtnOpenSize.description,
    }),

    prop_sidebarBtnColor: Define_ComponentProp<string | null>({
        prop:         "prop_sidebarBtnColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.sidebar.props.sidebarBtnColor.name,
        description:  Keys.category.components.sidebar.props.sidebarBtnColor.description,
    }),

} as const;


/**
 * نوع propهای ComponentSidebar — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config props برای مصرف‌کننده (Category callable)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
