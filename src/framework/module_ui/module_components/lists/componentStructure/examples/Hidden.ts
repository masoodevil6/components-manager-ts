import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {App as ReactiveApp} from "@/core_reactive";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Hidden Example برای ComponentStructure
 *
 * ساختار با prop_show = false — محتوا ساخته می‌شود ولی نمایش داده نمی‌شود.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - prop_show = false چه اثری دارد
 *   - محتوا همچنان تعریف می‌شود ولی section مخفی می‌شود
 *
 * Note: برای نمایش بصری در TestsPage، این Example داخل یک wrapper با
 * توضیح قرار می‌گیرد تا برنامه‌نویس بفهمد چرا چیزی نمی‌بیند.
 */
export const HiddenExample: ComponentExample = {

    id:          "structure_hidden",

    name:        Keys.category.components.basic.examples.hidden.name,

    description: Keys.category.components.basic.examples.hidden.description,

    render: (): HTMLElement => UiCategory.UI.Basic.ComponentStructure(
        {
            classList:           ["p-3", "border", "rounded", "border-warning"],
            prop_show:           false,
            prop_structureClass: ["bg-light"],
            content: () => ReactiveApp.div({
                children: [
                    `<p>این محتوا ساخته شده ولی prop_show = false است → قابل دیدن نیست</p>`,
                ],
            }),
        },
        {},
    ).getElement() as HTMLElement,

};
