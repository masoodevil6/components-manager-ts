import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {ComponentElementCreator} from "../ComponentElementCreator";
import {ElementCreatorMode} from "../Props";

export const Setting: ComponentExample = {
    id: "element_creator_setting",
    name: Keys.category.components.basic.elementCreator.examples.setting.name,
    description: Keys.category.components.basic.elementCreator.examples.setting.description,
    render: (): HTMLElement => {
        const elementCreator = new ComponentElementCreator({
            prop_mode: ElementCreatorMode.SETTING_EDIT,
            prop_component: UiCategory.UI.Inputs.Input,
            prop_componentProperties: {
                prop_name: "elementCreatorSettingInput",
                prop_value: "",
                prop_labelTitle: "Input component",
                prop_placeholder: "Type something",
            },
        });
        const button = UiCategory.UI.Simples.Button({
            prop_btnTitle: "Open component settings",
        }, {
            CLICK: (event: Event) => elementCreator.call_openSettings(event),
        });
        const root = document.createElement("div");
        root.appendChild(button.getElement() as HTMLElement);
        root.appendChild(elementCreator.getElement());
        return root;
    },
};
