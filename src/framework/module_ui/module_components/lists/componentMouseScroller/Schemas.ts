import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys}                    from "../../../module_categories/languages";
import {Props}                  from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * ComponentMouseScroller — Schemas
 *
 * تعریف بخش‌های (parts) کامپوننت MouseScroller
 * base schemas از ComponentStructureTrait
 */
export const Schemas = {

    ...ComponentStructureTrait.schemas,

    /// ---- Border ----
    BORDER: {
        part:         "part-border",
        name:         Keys.category.components.mouseScroller.schemas.border.name,
        description:  Keys.category.components.mouseScroller.schemas.border.description,
        props: [
            Props.prop_toolsOpacity,
            Props.prop_colorMode,
            Props.prop_borderBackgroundColor_light,
            Props.prop_borderBackgroundColor_dark,
            Props.prop_borderWidth,
            Props.prop_borderRadius,
            Props.prop_borderColor,
        ],
    },

    BORDER_CONTENT: {
        part:         "part-border-content",
        name:         Keys.category.components.mouseScroller.schemas.borderContent.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContent.description,
        props: [
            Props.prop_scrollLeft,
            Props.prop_scrollTop,
        ],
    },

    BORDER_CONTENT_VIEW: {
        part:         "part-border-content-view",
        name:         Keys.category.components.mouseScroller.schemas.borderContentView.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentView.description,
        props: [
            Props.prop_content,
            Props.prop_zoom,
            Props.prop_scrollLeft,
            Props.prop_scrollTop,
        ],
    },


    /// ---- Sidebars ----
    BORDER_CONTENT_SIDEBAR: {
        part:         "part-border-content-sidebar",
        name:         Keys.category.components.mouseScroller.schemas.borderContentSidebar.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentSidebar.description,
        props: [
            Props.prop_sideBarHas,
            Props.prop_sideBarWidth,
            Props.prop_sideBarBtnOpenHas,
            Props.prop_sideBarContent,
            Props.prop_sideBarsMargin,
            Props.prop_sideBarTopHas,
            Props.prop_sideBarTopWidth,
            Props.prop_sideBarBottomHas,
            Props.prop_sideBarBottomWidth,
        ],
    },

    BORDER_CONTENT_SIDEBARTOP: {
        part:         "part-border-content-sidebarTop",
        name:         Keys.category.components.mouseScroller.schemas.borderContentSidebarTop.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentSidebarTop.description,
        props: [
            Props.prop_sideBarTopHas,
            Props.prop_sideBarTopWidth,
            Props.prop_sideBarTopContent,
        ],
    },

    BORDER_CONTENT_SIDEBARBOTTOM: {
        part:         "part-border-content-sidebarBottom",
        name:         Keys.category.components.mouseScroller.schemas.borderContentSidebarBottom.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentSidebarBottom.description,
        props: [
            Props.prop_sideBarBottomHas,
            Props.prop_sideBarBottomWidth,
            Props.prop_sideBarBottomContent,
        ],
    },


    /// ---- Position Zoom ----
    BORDER_CONTENT_POSITIONZOOM: {
        part:         "part-border-content-positionZoom",
        name:         Keys.category.components.mouseScroller.schemas.borderContentPositionZoom.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentPositionZoom.description,
        props: [],
    },

    BORDER_CONTENT_POSITIONZOOM_BORDER: {
        part:         "part-border-content-positionZoom_border",
        name:         Keys.category.components.mouseScroller.schemas.borderContentPositionZoomBorder.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentPositionZoomBorder.description,
        props: [
            Props.prop_zoom,
        ],
    },


    /// ---- Tools ----
    BORDER_CONTENT_TOOLS: {
        part:         "part-border-content-methods",
        name:         Keys.category.components.mouseScroller.schemas.borderContentTools.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentTools.description,
        props: [
            Props.prop_sideBarTopHas,
            Props.prop_sideBarTopWidth,
            Props.prop_sideBarBottomHas,
            Props.prop_sideBarBottomWidth,
            Props.prop_sideBarsMargin,
        ],
    },

    BORDER_CONTENT_TOOLS_CONTENT: {
        part:         "part-border-content-methods-content",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContent.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContent.description,
        props: [],
    },


    /// ---- Zooming ----
    BORDER_CONTENT_TOOLS_CONTENT_ZOOMING: {
        part:         "part-border-content-methods-content-zooming",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentZooming.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentZooming.description,
        props: [
            Props.prop_toolsZoomHas,
        ],
    },

    BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN: {
        part:         "part-border-content-methods-content-zooming-in",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingIn.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingIn.description,
        props: [],
    },

    BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH: {
        part:         "part-border-content-methods-content-zooming-refresh",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingRefresh.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingRefresh.description,
        props: [],
    },

    BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT: {
        part:         "part-border-content-methods-content-zooming-out",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingOut.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentZoomingOut.description,
        props: [],
    },


    /// ---- Coloring ----
    BORDER_CONTENT_TOOLS_CONTENT_COLORING: {
        part:         "part-border-content-methods-content-coloring",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoring.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoring.description,
        props: [
            Props.prop_toolsColorModeHas,
        ],
    },

    BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT: {
        part:         "part-border-content-methods-content-coloring-light",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoringLight.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoringLight.description,
        props: [],
    },

    BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK: {
        part:         "part-border-content-methods-content-coloring-dark",
        name:         Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoringDark.name,
        description:  Keys.category.components.mouseScroller.schemas.borderContentToolsContentColoringDark.description,
        props: [],
    },

} as const;


export type SchemasType = ExtractSchemasType<typeof Schemas>;
