import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../../module_categories/languages";

export const ClickableExample: ComponentExample = {
    id: "collapse_clickable",
    name: Keys.category.components.collapse.examples.clickable.name,
    description: Keys.category.components.collapse.examples.clickable.description,
    render: (): HTMLElement => UiCategory.UI.Contents.Collapse({
        prop_collapseTitle: "Watch the open state",
        prop_collapseIcon: UiIcons.Src.InputNumber.Definition,
        prop_collapseBody: CoreReactive.App.div({
            children: ["Click the header to open or close this section."],
        }),
    }, {
        CLICK: (_event, _dataArgs, componentArgs) => {
            console.info("Collapse open:", componentArgs?.IS_OPEN);
        },
    }).getElement() as HTMLElement,
};
