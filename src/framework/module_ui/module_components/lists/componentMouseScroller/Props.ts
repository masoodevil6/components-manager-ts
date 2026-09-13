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
 * ComponentMouseScroller — Props
 *
 * تعریف پراپرتی‌های اختصاصی کامپوننت MouseScroller
 * base props از ComponentStructureTrait
 */

export enum MouseScrollerColorMode {
    LIGHT=     "light",
    DARK=      "dark",
}

export const Props = {

    /// ---- Border ----
    prop_borderBackgroundColor_light: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundColor_light",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_5),
        name:         Keys.category.components.mouseScroller.props.borderBackgroundColor_light.name,
        description:  Keys.category.components.mouseScroller.props.borderBackgroundColor_light.description,
    }),

    prop_borderBackgroundColor_dark: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundColor_dark",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_3),
        name:         Keys.category.components.mouseScroller.props.borderBackgroundColor_dark.name,
        description:  Keys.category.components.mouseScroller.props.borderBackgroundColor_dark.description,
    }),

    prop_borderWidth: Define_ComponentProp<string | number | null>({
        prop:         "prop_borderWidth",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.mouseScroller.props.borderWidth.name,
        description:  Keys.category.components.mouseScroller.props.borderWidth.description,
    }),

    prop_borderRadius: Define_ComponentProp<string | number | null>({
        prop:         "prop_borderRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.mouseScroller.props.borderRadius.name,
        description:  Keys.category.components.mouseScroller.props.borderRadius.description,
    }),

    prop_borderColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.mouseScroller.props.borderColor.name,
        description:  Keys.category.components.mouseScroller.props.borderColor.description,
    }),


    /// ---- Tools ----
    prop_toolsZoomHas: Define_ComponentProp<boolean>({
        prop:         "prop_toolsZoomHas",
        default:      true,
        name:         Keys.category.components.mouseScroller.props.toolsZoomHas.name,
        description:  Keys.category.components.mouseScroller.props.toolsZoomHas.description,
    }),

    prop_toolsColorModeHas: Define_ComponentProp<boolean>({
        prop:         "prop_toolsColorModeHas",
        default:      true,
        name:         Keys.category.components.mouseScroller.props.toolsColorModeHas.name,
        description:  Keys.category.components.mouseScroller.props.toolsColorModeHas.description,
    }),

    prop_toolsOpacity: Define_ComponentProp<number | null>({
        prop:         "prop_toolsOpacity",
        default:      40,
        name:         Keys.category.components.mouseScroller.props.toolsOpacity.name,
        description:  Keys.category.components.mouseScroller.props.toolsOpacity.description,
    }),

    prop_colorMode: Define_ComponentProp<MouseScrollerColorMode>({
        prop:         "prop_colorMode",
        default:      MouseScrollerColorMode.LIGHT,
        name:         Keys.category.components.mouseScroller.props.colorMode.name,
        description:  Keys.category.components.mouseScroller.props.colorMode.description,
    }),


    /// ---- Sidebars Margin ----
    prop_sideBarsMargin: Define_ComponentProp<number | null>({
        prop:         "prop_sideBarsMargin",
        default:      5,
        name:         Keys.category.components.mouseScroller.props.sideBarsMargin.name,
        description:  Keys.category.components.mouseScroller.props.sideBarsMargin.description,
    }),


    /// ---- Sidebar (Left/Right) ----
    prop_sideBarHas: Define_ComponentProp<boolean>({
        prop:         "prop_sideBarHas",
        default:      false,
        name:         Keys.category.components.mouseScroller.props.sideBarHas.name,
        description:  Keys.category.components.mouseScroller.props.sideBarHas.description,
    }),

    prop_sideBarWidth: Define_ComponentProp<number | null>({
        prop:         "prop_sideBarWidth",
        default:      40,
        name:         Keys.category.components.mouseScroller.props.sideBarWidth.name,
        description:  Keys.category.components.mouseScroller.props.sideBarWidth.description,
    }),

    prop_sideBarBtnOpenHas: Define_ComponentProp<boolean>({
        prop:         "prop_sideBarBtnOpenHas",
        default:      true,
        name:         Keys.category.components.mouseScroller.props.sideBarBtnOpenHas.name,
        description:  Keys.category.components.mouseScroller.props.sideBarBtnOpenHas.description,
    }),

    prop_sideBarContent: Define_ComponentProp<any>({
        prop:         "prop_sideBarContent",
        default:      null,
        name:         Keys.category.components.mouseScroller.props.sideBarContent.name,
        description:  Keys.category.components.mouseScroller.props.sideBarContent.description,
    }),


    /// ---- Sidebar Top ----
    prop_sideBarTopHas: Define_ComponentProp<boolean>({
        prop:         "prop_sideBarTopHas",
        default:      false,
        name:         Keys.category.components.mouseScroller.props.sideBarTopHas.name,
        description:  Keys.category.components.mouseScroller.props.sideBarTopHas.description,
    }),

    prop_sideBarTopWidth: Define_ComponentProp<number | null>({
        prop:         "prop_sideBarTopWidth",
        default:      40,
        name:         Keys.category.components.mouseScroller.props.sideBarTopWidth.name,
        description:  Keys.category.components.mouseScroller.props.sideBarTopWidth.description,
    }),

    prop_sideBarTopContent: Define_ComponentProp<any>({
        prop:         "prop_sideBarTopContent",
        default:      null,
        name:         Keys.category.components.mouseScroller.props.sideBarTopContent.name,
        description:  Keys.category.components.mouseScroller.props.sideBarTopContent.description,
    }),


    /// ---- Sidebar Bottom ----
    prop_sideBarBottomHas: Define_ComponentProp<boolean>({
        prop:         "prop_sideBarBottomHas",
        default:      false,
        name:         Keys.category.components.mouseScroller.props.sideBarBottomHas.name,
        description:  Keys.category.components.mouseScroller.props.sideBarBottomHas.description,
    }),

    prop_sideBarBottomWidth: Define_ComponentProp<number | null>({
        prop:         "prop_sideBarBottomWidth",
        default:      40,
        name:         Keys.category.components.mouseScroller.props.sideBarBottomWidth.name,
        description:  Keys.category.components.mouseScroller.props.sideBarBottomWidth.description,
    }),

    prop_sideBarBottomContent: Define_ComponentProp<any>({
        prop:         "prop_sideBarBottomContent",
        default:      null,
        name:         Keys.category.components.mouseScroller.props.sideBarBottomContent.name,
        description:  Keys.category.components.mouseScroller.props.sideBarBottomContent.description,
    }),


    /// ---- Zoom ----
    prop_zoom: Define_ComponentProp<number>({
        prop:         "prop_zoom",
        default:      1.0,
        name:         Keys.category.components.mouseScroller.props.zoom.name,
        description:  Keys.category.components.mouseScroller.props.zoom.description,
    }),

    prop_zoomMin: Define_ComponentProp<number>({
        prop:         "prop_zoomMin",
        default:      0.4,
        name:         Keys.category.components.mouseScroller.props.zoomMin.name,
        description:  Keys.category.components.mouseScroller.props.zoomMin.description,
    }),

    prop_zoomMax: Define_ComponentProp<number>({
        prop:         "prop_zoomMax",
        default:      3.0,
        name:         Keys.category.components.mouseScroller.props.zoomMax.name,
        description:  Keys.category.components.mouseScroller.props.zoomMax.description,
    }),

    prop_zoomStep: Define_ComponentProp<number>({
        prop:         "prop_zoomStep",
        default:      1.0015,
        name:         Keys.category.components.mouseScroller.props.zoomStep.name,
        description:  Keys.category.components.mouseScroller.props.zoomStep.description,
    }),


    /// ---- Scroll ----
    prop_scrollLeft: Define_ComponentProp<number>({
        prop:         "prop_scrollLeft",
        default:      0,
        name:         Keys.category.components.mouseScroller.props.scrollLeft.name,
        description:  Keys.category.components.mouseScroller.props.scrollLeft.description,
    }),

    prop_scrollTop: Define_ComponentProp<number>({
        prop:         "prop_scrollTop",
        default:      0,
        name:         Keys.category.components.mouseScroller.props.scrollTop.name,
        description:  Keys.category.components.mouseScroller.props.scrollTop.description,
    }),


    /// ---- Content ----
    prop_content: Define_ComponentProp<any>({
        prop:         "prop_content",
        default:      "",
        name:         Keys.category.components.mouseScroller.props.content.name,
        description:  Keys.category.components.mouseScroller.props.content.description,
    }),

} as const;


export type PropsType      = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
