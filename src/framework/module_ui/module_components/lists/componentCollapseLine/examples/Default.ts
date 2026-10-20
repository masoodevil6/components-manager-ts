import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "collapse_line_default",
    name: Keys.category.components.collapseLine.examples.default.name,
    description: Keys.category.components.collapseLine.examples.default.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.CollapseLine({
            prop_collapseLineStyles: {marginBlock: "1rem"},
        }).getElement() as HTMLElement;
    },
};
