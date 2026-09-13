import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentErrorIsEmpty
 *
 * نمایش یک پیام خطای خالی با آیکون warning، عنوان و دکمه retry.
 * icon و btnIcon از مقادیر پیش‌فرض Props استفاده می‌کنند.
 */
export const DefaultExample: ComponentExample = {

    id:          "error_is_empty_default",

    name:        Keys.category.components.errorIsEmpty.examples.default.name,

    description: Keys.category.components.errorIsEmpty.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.ErrorIsEmpty(
        {
            prop_title:  "Error is empty",
            prop_btnHas: true,
        },
        {
            BTN_CLICK: function(event, dataArgs, componentArgs) {
                console.log("[ErrorIsEmptyExample]", "Retry clicked");
            },
        },
    ).getElement() as HTMLElement,

};
