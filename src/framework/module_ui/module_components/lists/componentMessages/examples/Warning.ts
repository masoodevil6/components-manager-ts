import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {MessageTypes}   from "../Props";
// --------------------------------


/**
 * Warning Example برای ComponentMessages
 *
 * نمایش لیست پیام‌های warning.
 */
export const WarningExample: ComponentExample = {

    id:          "messages_warning",

    name:        Keys.category.components.messages.examples.warning.name,

    description: Keys.category.components.messages.examples.warning.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Messages(
        {
            prop_type:     MessageTypes.WARNING,
            prop_messages: ["Please review your input", "Low disk space"],
        },
        {
            CLOSE_MESSAGE: function(event, dataArgs, componentArgs) {
                console.log("[WarningExample] message closed", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
