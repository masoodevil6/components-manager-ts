import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const FixedHeight: ComponentExample = {
    id: "component_iframe_fixed_height",
    name: Keys.category.components.fetch.iframe.examples.fixedHeight.name,
    description: Keys.category.components.fetch.iframe.examples.fixedHeight.description,
    render: (): HTMLElement => UiCategory.UI.Fetch.Iframe({
        prop_url: "https://example.com/",
        prop_width: "100%",
        prop_height: 360,
        prop_heightAuto: false,
        prop_widgetWidth: "100%",
        prop_widgetHeight: "360px",
        prop_iframeClass: ["d-block"],
        prop_iframeStyles: {width: "100%"},
        prop_componentBorderStyles: {overflow: "hidden"},
    }).getElement() as HTMLElement,
};
