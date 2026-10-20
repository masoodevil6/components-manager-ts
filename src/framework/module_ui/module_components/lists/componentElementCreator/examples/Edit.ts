import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ElementCreatorMode} from "../Props";

export const Edit: ComponentExample = {
    id: "element_creator_edit",
    name: Keys.category.components.basic.elementCreator.examples.edit.name,
    description: Keys.category.components.basic.elementCreator.examples.edit.description,
    render: (): HTMLElement => UiCategory.UI.Basic.ElementCreator({
        prop_mode: ElementCreatorMode.EDIT,
        prop_component: UiCategory.UI.Inputs.Input,
        prop_componentProperties: {
            prop_name: "elementCreatorInput",
            prop_value: "",
            prop_labelTitle: "Input component",
            prop_placeholder: "Type something",
        },
    }).getElement() as HTMLElement,
};
