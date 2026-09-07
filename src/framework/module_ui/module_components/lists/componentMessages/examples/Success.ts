import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {MessageTypes}   from "../Props";
// --------------------------------


/**
 * Success Example برای ComponentMessages
 *
 * نمایش لیست پیام‌های success.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Simples.Messages)
 *   - چه propهایی پاس می‌شود (prop_type, prop_messages)
 *   - چه Methodهایی فراخوانی می‌شود (CLOSE_MESSAGE با Function Callback)
 */
export const SuccessExample: ComponentExample = {

    id:          "messages_success",

    name:        Keys.category.components.messages.examples.success.name,

    description: Keys.category.components.messages.examples.success.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Messages(
        {
            prop_type:     MessageTypes.SUCCESS,
            prop_messages: ["Operation completed", "Data saved"],
        },
        {
            CLOSE_MESSAGE: function(event, dataArgs, componentArgs) {
                console.log("[SuccessExample] message closed", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
