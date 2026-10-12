import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "effective_default",
    name: Keys.category.components.effective.examples.default.name,
    description: Keys.category.components.effective.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Effects.Effective({
            prop_content: "A bordered panel with a fade transition.",
            prop_borderClass: ["shadow-sm", "position-relative", "p-3"],
            prop_borderColor: "var(--primaryColor1)",
            prop_contentBackgroundColor: "var(--shanColor1)",
        }).getElement() as HTMLElement;
    },
};
