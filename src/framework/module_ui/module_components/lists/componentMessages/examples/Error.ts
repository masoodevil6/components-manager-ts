import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {MessageTypes}   from "../Props";
// --------------------------------


/**
 * Error Example برای ComponentMessages
 *
 * نمایش لیست پیام‌های error.
 */
export const ErrorExample: ComponentExample = {

    id:          "messages_error",

    name:        Keys.category.components.messages.examples.error.name,

    description: Keys.category.components.messages.examples.error.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Messages(
        {
            prop_type:     MessageTypes.ERROR,
            prop_messages: ["Connection failed", "Invalid credentials"],
        },
        {
            CLOSE_MESSAGE: function(event, dataArgs, componentArgs) {
                console.log("[ErrorExample] message closed", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
