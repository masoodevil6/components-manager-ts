import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "component_widget_default",
    name: Keys.category.components.fetch.widget.examples.default.name,
    description: Keys.category.components.fetch.widget.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Fetch.Widget({
        prop_layoutContent: "Widget content is rendered inside ComponentBorder.",
        prop_widgetWidth: "100%",
        prop_widgetHeight: "180px",
        prop_widgetStyles: {"min-height": "120px", padding: "1rem"},
        prop_componentBorderClass: ["shadow-sm", "position-relative"],
    }).getElement() as HTMLElement,
};
