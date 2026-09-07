import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {DirectionTypes, ShowTypes} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentFloatMenu
 *
 * نمایش یک FloatMenu ساده با selector و float panel.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Positions.FloatMenu)
 *   - چه propهایی پاس می‌شود (prop_selectorContent, prop_floatContent, ...)
 *   - چه خروجی بصری‌ای تولید می‌شود
 */
export const DefaultExample: ComponentExample = {

    id:          "float_menu_default",

    name:        Keys.category.components.floatMenu.examples.default.name,

    description: Keys.category.components.floatMenu.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Positions.FloatMenu(
        {
            prop_selectorContent:    "Selector",
            prop_selectorClass:      ["text-center"],
            prop_floatContent:       "Float Content",
            prop_selectorShowType:   ShowTypes.HOVER,
            prop_floatDirectionType: DirectionTypes.TOP,
            prop_floatArrowWidth:    10,
            prop_floatMinWidth:      "230px",
        },
        {},
    ).getElement() as HTMLElement,

};
