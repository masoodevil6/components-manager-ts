import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Labeled: ComponentExample = {
    id: "collapse_line_labeled",
    name: Keys.category.components.collapseLine.examples.labeled.name,
    description: Keys.category.components.collapseLine.examples.labeled.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.CollapseLine({
            prop_collapseLineTitle: "Account details",
            prop_lineBackground: "#cbd5e1",
            prop_collapseLineStyles: {marginBlock: "1rem"},
        }).getElement() as HTMLElement;
    },
};
