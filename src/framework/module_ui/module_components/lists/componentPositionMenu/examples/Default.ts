import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentPositionMenu
 *
 * نمایش یک PositionMenu ساده با selector، body و دکمه‌های Accept/Reject.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Positions.PositionMenu)
 *   - چه propهایی پاس می‌شود (prop_menuSelector, prop_menuBody, ...)
 *   - چه خروجی بصری‌ای تولید می‌شود
 */
export const DefaultExample: ComponentExample = {

    id:          "position_menu_default",

    name:        Keys.category.components.positionMenu.examples.default.name,

    description: Keys.category.components.positionMenu.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Positions.PositionMenu(
        {
            prop_menuSelector:       "Open Menu",
            prop_menuBody:           "Menu body content goes here...",
            prop_menuBtnAcceptHas:   true,
            prop_menuBtnRejectHas:   true,
            prop_menuBtnAcceptTitle: "Accept",
            prop_menuBtnRejectTitle: "Reject",
        },
        {
            CLICK_OPEN: function(event, dataArgs, componentArgs) {
                console.log("[PositionMenu Example] CLICK_OPEN", componentArgs?.IS_OPEN);
            },
            CLICK_ACCEPT: function(event, dataArgs, componentArgs) {
                console.log("[PositionMenu Example] CLICK_ACCEPT");
                return true;
            },
            CLICK_REJECT: function(event, dataArgs, componentArgs) {
                console.log("[PositionMenu Example] CLICK_REJECT");
            },
        },
    ).getElement() as HTMLElement,

};
