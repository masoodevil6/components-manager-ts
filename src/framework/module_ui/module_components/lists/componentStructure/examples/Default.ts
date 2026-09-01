import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentStructure
 *
 * ساختار پایه بدون محتوا — فقط border + padding.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Basic.ComponentStructure)
 *   - چه propهایی پاس می‌شود (classList, prop_show, prop_structureClass)
 *   - content خالی است (ساختار بدون فرزند)
 */
export const DefaultExample: ComponentExample = {

    id:          "structure_default",

    name:        Keys.category.components.basic.examples.default.name,

    description: Keys.category.components.basic.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Basic.ComponentStructure(
        {
            classList:           ["p-3", "border", "rounded"],
            prop_show:           true,
            prop_structureClass: ["bg-light"],
        },
        {},
    ).getElement() as HTMLElement,

};
