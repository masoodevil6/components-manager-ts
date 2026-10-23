import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "component_styles_default",
    name: Keys.category.components.basic.styles.examples.default.name,
    description: Keys.category.components.basic.styles.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Basic.Styles().getElement() as HTMLElement;
    },
};
