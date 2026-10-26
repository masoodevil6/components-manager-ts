import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutCreatorMode} from "../Props";

export const AllowedComponents: ComponentExample = {
    id: "layout_creator_allowed_components",
    name: Keys.category.components.basic.layoutCreator.examples.allowedComponents.name,
    description: Keys.category.components.basic.layoutCreator.examples.allowedComponents.description,
    render: (context) => {
        return UiCategory.UI.Basic.LayoutCreator({
            prop_mode: LayoutCreatorMode.EDIT,
            prop_components: [
                UiCategory.UI.Inputs.Input,
                UiCategory.UI.Simples.Button,
            ],
        }, {}, {unique: context?.pageWorkflow as any}).getElement() as HTMLElement;
    },
};
