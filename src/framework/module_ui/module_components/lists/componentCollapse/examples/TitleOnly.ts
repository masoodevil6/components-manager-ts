import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys} from "../../../../module_categories/languages";

export const TitleOnlyExample: ComponentExample = {
    id: "collapse_title_only",
    name: Keys.category.components.collapse.examples.titleOnly.name,
    description: Keys.category.components.collapse.examples.titleOnly.description,
    render: (): HTMLElement => UiCategory.UI.Contents.Collapse({
        prop_collapseTitle: "More information",
        prop_collapseBody: CoreReactive.App.div({
            children: ["This header uses only its title and the open/close arrow."],
        }),
    }).getElement() as HTMLElement,
};
