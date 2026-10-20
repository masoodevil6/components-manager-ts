import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutColumn} from "../Props";

export const Default: ComponentExample = {
    id: "layout_default",
    name: Keys.category.components.layout.examples.default.name,
    description: Keys.category.components.layout.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Basic.Layout({
            classList: ["w-100"],
            prop_layoutClass: ["border", "rounded", "p-3"],
            prop_layoutStyles: {minHeight: "48px"},
            prop_col: LayoutColumn.COL_6,
            prop_layoutContent: [
                {content: "First column", col: null, class: ["p-2"]},
                {content: "Second column", col: null, class: ["p-2"]},
            ],
        }).getElement() as HTMLElement;
    },
};
