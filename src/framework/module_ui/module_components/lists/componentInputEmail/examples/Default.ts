import {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_email_default",
    name: Keys.category.components.input.examples.default.name,
    description: Keys.category.components.input.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputEmail({prop_name: "email", prop_labelTitle: "Email", prop_title: "Email", prop_placeholder: "name@example.com", prop_icon: UiIcons.Src.UserEmail1.Definition}, {}).getElement() as HTMLElement,
};
