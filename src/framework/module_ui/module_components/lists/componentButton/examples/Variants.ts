import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonSemantic, ButtonVariants} from "../Props";
import * as CoreReactive from "@/core_reactive";
// --------------------------------


/**
 * Variants Example برای ComponentButton
 *
 * نمایش سه Button با variantهای مختلف (primary, secondary, ghost).
 */
export const VariantsExample: ComponentExample = {

    id:          "button_variants",

    name:        Keys.category.components.button.examples.variants.name,

    description: Keys.category.components.button.examples.variants.description,

    render: (): HTMLElement => {
        return CoreReactive.App.div({
                styles: {
                    "display":            "flex",
                    "gap":                 "8px",
                    "flexWrap":            "wrap",
                },
                children: [
                    UiCategory.UI.Simples.Button(
                        {
                            prop_btnTitle:   "PRIMARY",
                            prop_btnVariant: ButtonVariants.PRIMARY,
                        },
                        {},
                    ).getElement() ,
                    UiCategory.UI.Simples.Button(
                        {
                            prop_btnTitle:   "SECONDARY",
                            prop_btnSemantic: ButtonSemantic.BACK,
                        },
                        {},
                    ).getElement() ,
                    UiCategory.UI.Simples.Button(
                        {
                            prop_btnTitle:   "GHOST",
                            prop_btnSemantic: ButtonSemantic.CANCEL,
                        },
                        {},
                    ).getElement() ,
                    UiCategory.UI.Simples.Button(
                        {
                            prop_btnTitle:   "ICON",
                            prop_btnSemantic: ButtonSemantic.CUSTOM,
                        },
                        {},
                    ).getElement()
                ],
            }).getElement();
    },

};
