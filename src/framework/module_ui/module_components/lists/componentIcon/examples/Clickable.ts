import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Clickable Example برای ComponentIcon
 *
 * نمایش یک Icon قابل کلیک (ArrowDown) با CLICK callback واقعی.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Simples.Icon)
 *   - چه propهایی پاس می‌شود (prop_icon, prop_iconTitle, prop_iconClass)
 *   - چه Methodهایی فراخوانی می‌شود (CLICK با Function Callback)
 *   - امضای callback چگونه است (event, dataArgs, componentArgs)
 *
 * Note (Plan 8.1.4): برای دسترسی به `this` به‌عنوان Component instance،
 * از `function` استفاده شود — نه arrow function.
 */
export const ClickableExample: ComponentExample = {

    id:          "icon_clickable",

    name:        Keys.category.components.icon.examples.clickable.name,

    description: Keys.category.components.icon.examples.clickable.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Icon(
        {
            prop_icon:      UiIcons.CreateIcon(UiIcons.Src.ArrowDown.Definition, { size: 32 }),
            prop_iconTitle: "Click me",
            prop_iconClass: ["cursor-pointer"],
        },
        {
            CLICK: function (event, dataArgs, componentArgs) {
                console.log("[ClickableExample] icon clicked", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
