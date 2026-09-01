import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentIcon
 *
 * نمایش یک Icon ساده (ArrowUp) بدون behavior.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Simples.Icon)
 *   - چه propهایی پاس می‌شود (prop_icon, prop_iconTitle)
 *   - چه خروجی بصری‌ای تولید می‌شود
 */
export const DefaultExample: ComponentExample = {

    id:          "icon_default",

    name:        Keys.category.components.icon.examples.default.name,

    description: Keys.category.components.icon.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Icon(
        {
            prop_icon:      UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition, { size: 24 }),
            prop_iconTitle: "Arrow Up",
        },
        {},
    ).getElement() as HTMLElement,

};
