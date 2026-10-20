import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Collapsible: ComponentExample = {
    id: "collapse_line_collapsible",
    name: Keys.category.components.collapseLine.examples.collapsible.name,
    description: Keys.category.components.collapseLine.examples.collapsible.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.CollapseLine({
            prop_collapseLineCanCollapse: true,
            prop_collapseLineTitle: "Advanced settings",
            prop_collapseLineBody: CoreReactive.App.p({children: ["This content opens and closes from the divider control."]}),
            prop_collapseLineStyles: {marginBlock: "1rem"},
        }, {
            CLICK: (_event, _dataArgs, componentArgs) => {
                console.info("CollapseLine open:", componentArgs?.IS_OPEN);
            },
        }).getElement() as HTMLElement;
    },
};
