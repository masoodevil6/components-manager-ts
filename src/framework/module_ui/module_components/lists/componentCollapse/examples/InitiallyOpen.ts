import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys} from "../../../../module_categories/languages";

export const InitiallyOpenExample: ComponentExample = {
    id: "collapse_initially_open",
    name: Keys.category.components.collapse.examples.initiallyOpen.name,
    description: Keys.category.components.collapse.examples.initiallyOpen.description,
    render: (): HTMLElement => UiCategory.UI.Contents.Collapse({
        prop_collapseTitle: "Quick start",
        prop_collapseBodyIsOpen: true,
        prop_collapseBody: CoreReactive.App.div({
            children: ["This section is expanded when the page first renders."],
        }),
    }).getElement() as HTMLElement,
};
