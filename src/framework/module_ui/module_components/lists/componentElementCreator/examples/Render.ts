import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ElementCreatorMode} from "../Props";

export const Render: ComponentExample = {
    id: "element_creator_render",
    name: Keys.category.components.basic.elementCreator.examples.render.name,
    description: Keys.category.components.basic.elementCreator.examples.render.description,
    render: (): HTMLElement => UiCategory.UI.Basic.ElementCreator({
        prop_mode: ElementCreatorMode.RENDER,
        prop_component: UiCategory.UI.Inputs.Input,
        prop_componentProperties: {
            prop_name: "elementCreatorInput",
            prop_value: "",
            prop_labelTitle: "Input component",
            prop_placeholder: "Type something",
        },
    }).getElement() as HTMLElement,
};
