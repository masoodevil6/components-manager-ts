import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "component_iframe_default",
    name: Keys.category.components.fetch.iframe.examples.default.name,
    description: Keys.category.components.fetch.iframe.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Fetch.Iframe({
        prop_url: "https://example.com/",
        prop_width: "100%",
        prop_heightAuto: true,
        prop_componentBorderStructureStyles: {minHeight: "320px"},
    }).getElement() as HTMLElement,
};
