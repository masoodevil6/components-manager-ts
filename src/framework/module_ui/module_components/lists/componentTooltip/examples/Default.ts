import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {TooltipDirectionTypes} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentTooltip (Plan 14.1.0)
 *
 * Tooltip با description و direction BOTTOM.
 */
export const DefaultExample: ComponentExample = {

    id:          "tooltip_default",

    name:        Keys.category.components.tooltip.examples.default.name,

    description: Keys.category.components.tooltip.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Positions.Tooltip(
        {
            prop_tooltipDescription: "This is a description tooltip",
            prop_tooltipDirection:   TooltipDirectionTypes.BOTTOM,
        },
        {},
    ).getElement() as HTMLElement,

};
