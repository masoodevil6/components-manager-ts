import {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_password_default",
    name: Keys.category.components.input.examples.default.name,
    description: Keys.category.components.input.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPassword({prop_name: "password", prop_labelTitle: "Password", prop_placeholder: "Enter password", prop_icon: UiIcons.Src.UserPassword.Definition}, {}).getElement() as HTMLElement,
};
