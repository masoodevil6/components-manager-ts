import {ComponentExample} from "@/core_components";
import * as CoreReactive   from "@/core_reactive";
import * as UtilConst      from "@/util_consts";
import * as UtilStyle      from "@/util_styles";
// --------------------------------
import * as UiCategory      from "@/ui_categories";
import {Keys}              from "../../../../module_categories/languages";
import {MouseScrollerColorMode} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentMouseScroller
 *
 * نمایش یک MouseScroller با محتوای نمونه و ابزارهای zoom.
 */
export const DefaultExample: ComponentExample = {

    id:          "mouse_scroller_default",

    name:        Keys.category.components.mouseScroller.examples.default.name,
    description: Keys.category.components.mouseScroller.examples.default.description,

    render: (): HTMLElement => {
        const content = CoreReactive.App.div({
            styles: {
                width: "800px",
                height: "600px",
                background: UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_5),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                fontSize: "24px",
                color: "#fff",
            },
            children: [
                CoreReactive.App.b({ children: "MouseScroller Demo" }),
                CoreReactive.App.div({
                    styles: { fontSize: "16px", opacity: "0.8" },
                    children: "Scroll to zoom · Drag to pan",
                }),
                CoreReactive.App.div({
                    styles: {
                        width: "400px",
                        height: "300px",
                        background: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_2),
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    children: "Zoomable Box",
                }),
            ],
        });

        const scroller = UiCategory.UI.Contents.MouseScroller(
            {
                prop_content: content,
                prop_zoom:           1.0,
                prop_zoomMin:        0.4,
                prop_zoomMax:        3.0,
                prop_toolsZoomHas:   true,
                prop_toolsColorModeHas: true,
                prop_colorMode:      MouseScrollerColorMode.LIGHT,
                prop_sideBarHas:         true,
                prop_sideBarContent:     "Sidebar",
                prop_sideBarWidth:       120,
                prop_sideBarTopHas:      true,
                prop_sideBarTopContent:  "Top",
                prop_sideBarBottomHas:   true,
                prop_sideBarBottomContent: "Bottom",
                prop_structureStyles: {
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    overflow: "hidden",
                },
            } as any,
            {} as any,
        );
        return scroller.getElement() as HTMLElement;
    },

};
