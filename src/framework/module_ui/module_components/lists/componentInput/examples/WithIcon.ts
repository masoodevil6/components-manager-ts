import {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";
import * as UiCategory from "@/ui_categories";

export const WithIconExample: ComponentExample = {
    id: "input_with_icon",
    name: Keys.category.components.input.examples.withIcon.name,
    description: Keys.category.components.input.examples.withIcon.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.Input({
        prop_name: "search",
        prop_labelTitle: "Search",
        prop_placeholder: "Search...",
        prop_icon: UiIcons.Src.FileSearch.Definition,
    }, {}).getElement() as HTMLElement,
};
