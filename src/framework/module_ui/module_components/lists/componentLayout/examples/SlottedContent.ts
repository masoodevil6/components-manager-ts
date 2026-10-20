import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const SlottedContent: ComponentExample = {
    id: "layout_slotted_content",
    name: Keys.category.components.layout.examples.slottedContent.name,
    description: Keys.category.components.layout.examples.slottedContent.description,
    render(): HTMLElement {
        return UiCategory.UI.Basic.Layout({
            prop_layoutClass: ["border", "rounded", "p-3"],
            prop_layoutContent: null,
            content: () => CoreReactive.App.section({
                children: [CoreReactive.App.span({props: {textContent: "Fallback body content"}})],
            }),
        }).getElement() as HTMLElement;
    },
};
