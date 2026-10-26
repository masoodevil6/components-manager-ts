import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutCreatorMode} from "../Props";

export const Edit: ComponentExample = {
    id: "layout_creator_edit",
    name: Keys.category.components.basic.layoutCreator.examples.edit.name,
    description: Keys.category.components.basic.layoutCreator.examples.edit.description,
    render: (context) => {
        return UiCategory.UI.Basic.LayoutCreator({
            prop_mode: LayoutCreatorMode.EDIT,
        }, {}, {unique: context?.pageWorkflow as any}).getElement() as HTMLElement;
    },
};
