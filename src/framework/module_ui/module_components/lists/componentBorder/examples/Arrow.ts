import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ArrowTypes, BorderTypes} from "../Props";
// --------------------------------


/**
 * Arrow Example برای ComponentBorder
 *
 * نمایش یک Border با فلش رو به بالا.
 */
export const ArrowExample: ComponentExample = {

    id:          "border_arrow",

    name:        Keys.category.components.border.examples.arrow.name,

    description: Keys.category.components.border.examples.arrow.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Border(
        {
            prop_content:          "Arrow Border",
            prop_borderArrowType:  ArrowTypes.TOP,
            prop_borderArrowWidth: 10,
            prop_borderType:       BorderTypes.SOLID,
        },
        {},
    ).getElement() as HTMLElement,

};
