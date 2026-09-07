import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
import {TooltipDirectionTypes} from "../Props";
// --------------------------------


/**
 * Clickable Example برای ComponentLabel (Plan 13.1.0)
 *
 * Label با callback واقعی CLICK — معادل legacy example:
 * console.log("clicked", dataArgs, componentArgs)
 */
export const ClickableExample: ComponentExample = {

    id:          "label_clickable",

    name:        Keys.category.components.label.examples.clickable.name,

    description: Keys.category.components.label.examples.clickable.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Label(
        {
            prop_labelTitle: "Clickable Label",

            /// --- Tooltip (ترکیب CLICK + tooltip) ---
            prop_labelTooltipIcon:        UiIcons.Src.SymbolExclumationWarning.Definition,
            prop_labelTooltipDescription: "Click the label to trigger the CLICK callback",
            prop_labelTooltipDirection:   TooltipDirectionTypes.BOTTOM,
        },
        {
            CLICK: function (event: Event, dataArgs: any, componentArgs: any) {
                // dataArgs.IS_DISABLE ← boolean | componentArgs.FOR ← string | null
                console.log("clicked", dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};