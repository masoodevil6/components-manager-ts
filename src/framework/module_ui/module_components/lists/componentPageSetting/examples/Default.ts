import type {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "component_page_setting_default",
    name: Keys.category.components.basic.pageSetting.examples.default.name,
    description: Keys.category.components.basic.pageSetting.examples.default.description,
    render: (): HTMLElement => {
        return UiCategory.UI.Pages.Page({
            prop_isFullHeight: true,
            prop_header: "Current page",
            prop_navigation: "Settings / Preview",
            prop_content: "The settings panel starts closed. Open it with the arrow at the page edge.",
            prop_setting: CoreReactive.App.div({
                styles: {padding: "24px"},
                children: [
                    CoreReactive.App.h3({children: "Page settings"}),
                    CoreReactive.App.p({children: "The settings area takes its own space beside the current page."}),
                ],
            }),
        }).getElement() as HTMLElement;
    },
};
