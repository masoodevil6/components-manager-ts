import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const BodyAlwaysVisible: ComponentExample = {
    id: "collapse_line_body_always_visible",
    name: Keys.category.components.collapseLine.examples.bodyAlwaysVisible.name,
    description: Keys.category.components.collapseLine.examples.bodyAlwaysVisible.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.CollapseLine({
            prop_collapseLineTitle: "Always visible content",
            prop_collapseLineBody: CoreReactive.App.p({children: ["This body stays visible because collapse is disabled."]}),
            prop_collapseLineStyles: {marginBlock: "1rem"},
        }).getElement() as HTMLElement;
    },
};
