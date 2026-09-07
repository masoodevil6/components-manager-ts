import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonVariants} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentButton
 *
 * نمایش یک Button ساده (primary) بدون behavior.
 */
export const DefaultExample: ComponentExample = {

    id:          "button_default",

    name:        Keys.category.components.button.examples.default.name,

    description: Keys.category.components.button.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle:   "Click Me",
            prop_btnVariant: ButtonVariants.PRIMARY,
        },
        {},
    ).getElement() as HTMLElement,

};
