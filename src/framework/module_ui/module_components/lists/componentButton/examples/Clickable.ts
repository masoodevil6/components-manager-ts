import {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonSemantic, ButtonVariants} from "../Props";
// --------------------------------


/**
 * Clickable Example برای ComponentButton
 *
 * نمایش یک Button قابل کلیک با CLICK callback واقعی.
 */
export const ClickableExample: ComponentExample = {

    id:          "button_clickable",

    name:        Keys.category.components.button.examples.clickable.name,

    description: Keys.category.components.button.examples.clickable.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle:   "Submit",
            prop_btnVariant:  ButtonVariants.PRIMARY,
            prop_btnClass:   ["w-100"],
            //prop_btnIcon:     UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition, { size: 24 }),
            prop_btnIcon:     UiIcons.Src.ArrowUp.Definition ,
        },
        {
            CLICK: function (event, dataArgs, componentArgs) {
                console.log("[ClickableExample] button clicked", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
