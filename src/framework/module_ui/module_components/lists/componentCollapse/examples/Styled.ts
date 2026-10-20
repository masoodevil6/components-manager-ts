import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys} from "../../../../module_categories/languages";

export const StyledExample: ComponentExample = {
    id: "collapse_styled",
    name: Keys.category.components.collapse.examples.styled.name,
    description: Keys.category.components.collapse.examples.styled.description,
    render: (): HTMLElement => UiCategory.UI.Contents.Collapse({
        prop_collapseTitle: "Custom appearance",
        prop_collapseBorderBackground: "#8b5cf6",
        prop_collapseTitleColor: "#5b21b6",
        prop_bodyBackgroundColor: "#f5f3ff",
        prop_collapseBodyStyles: {padding: "1rem"},
        prop_collapseBody: CoreReactive.App.div({
            children: ["Border, title, and body colors can be customized independently."],
        }),
    }).getElement() as HTMLElement,
};
