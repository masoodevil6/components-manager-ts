import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys}           from "../../../../module_categories/languages";
import {SidebarDirection} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentSidebar
 *
 * نمایش یک Sidebar ساده با direction LTR و content نمونه.
 */
export const DefaultExample: ComponentExample = {

    id:          "sidebar_default",

    name:        Keys.category.components.sidebar.examples.default.name,

    description: Keys.category.components.sidebar.examples.default.description,

    render: (): HTMLElement => {
        const sidebar = UiCategory.UI.Contents.Sidebar(
            {
                prop_sidebarDirection: SidebarDirection.LTR,
                prop_sidebarWidth:     200,
                prop_sidebarIsOpen:    true,
                prop_sidebarContent:   CoreReactive.App.div({
                    styles: {
                        padding: "16px",
                        color: "#fff",
                    },
                    children: "Sidebar Content",
                }),
                prop_structureStyles: {
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    overflow: "hidden",
                },
            },
            {},
        );
        return sidebar.getElement() as HTMLElement;
    },

};
