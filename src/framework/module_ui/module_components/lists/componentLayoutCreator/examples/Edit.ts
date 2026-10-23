import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutCreatorMode} from "../Props";

export const Edit: ComponentExample = {
    id: "layout_creator_edit",
    name: Keys.category.components.basic.layoutCreator.examples.edit.name,
    description: Keys.category.components.basic.layoutCreator.examples.edit.description,
    render(): HTMLElement {
        return UiCategory.UI.Basic.LayoutCreator({
            prop_mode: LayoutCreatorMode.EDIT,
        }).getElement() as HTMLElement;
    },
};
