import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentWebCode
 *
 * نمایش یک پیام web code 404 با آیکون و دکمه retry.
 * icon و btnRetryIcon از مقادیر پیش‌فرض Props استفاده می‌کنند.
 */
export const DefaultExample: ComponentExample = {

    id:          "web_code_default",

    name:        Keys.category.components.webCode.examples.default.name,

    description: Keys.category.components.webCode.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.WebCode(
        {
            classList: ["col-md-3", "col-12", "border", "p-2", "position-relative"],
            prop_btnRetryHas: true,
        },
        {
            RETRY_CLICK: function(event, dataArgs, componentArgs) {
                console.log("[WebCodeExample]", "Retry clicked");
            },
        },
    ).getElement() as HTMLElement,

};
