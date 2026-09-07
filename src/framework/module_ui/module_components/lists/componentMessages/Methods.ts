import {Props as MessagesProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentMessages
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLOSE_MESSAGE", event, params) استفاده می‌کند.
 *
 * سه مسئولیت:
 *   1. تعریف semantic method keys (CLOSE_MESSAGE) — Public API
 *   2. نگهداری runtime method name (fn_onCloseMessage) — implementation
 *   3. تعریف metadata مربوط به Component/Data Args — source of truth
 *
 * Plan 8.1.4:
 *   - semantic keys متعلق به Public API هستند
 *   - runtime name متعلق به implementation است
 *   - args و dataArgs در اینجا تعریف می‌شوند و type‌ها از آنجا استخراج می‌شوند
 */
export const Methods = {

    CLOSE_MESSAGE: {
        name:        "fn_onCloseMessage",
        description: "Callback when a message is closed",

        // componentArgs — prop reference‌ها
        // در زمان اجرا resolve می‌شوند به مقادیر فعلی props
        args: {
            TYPE:     MessagesProps.prop_type,
            MESSAGES: MessagesProps.prop_messages,
        },

        // dataArgs — type تعریف‌شده برای داده‌های runtime
        // هر پیام دارای id (یکتا)، index و text است
        dataArgs: {
            MESSAGE_ID:    "" as string,
            MESSAGE_INDEX: 0 as number,
            MESSAGE_TEXT:  "" as string,
            MESSAGE_TYPE:  "" as string,
        } as const,
    },

} as const;


/**
 * نوع methodهای ComponentMessages — برای استفاده در TMethods (داخلی Component)
 */
export type MethodsType = ExtractMethodsType<typeof Methods>;


/**
 * Component Args type برای هر method
 * از args (prop reference) استخراج می‌شود
 *
 * مثال: MethodsComponentArgs["CLOSE_MESSAGE"] = { TYPE: MessageTypes, MESSAGES: string[] }
 */
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;


/**
 * Data Args type برای هر method
 * از dataArgs تعریف‌شده در Methods استخراج می‌شود
 *
 * مثال: MethodsDataArgs["CLOSE_MESSAGE"] = { MESSAGE_INDEX: number, MESSAGE_TEXT: string, MESSAGE_TYPE: string }
 */
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;


/**
 * نوع config methods برای مصرف‌کننده (Category callable)
 *
 * کلیدهای Public (semantic) از keyof typeof Methods استخراج می‌شوند.
 * هر method callback با type‌های کامل برای autocomplete:
 *   - event: Event
 *   - dataArgs: MethodsDataArgs[K] | null
 *   - componentArgs: MethodsComponentArgs[K] | null
 *   - this: TThis (Component instance)
 *
 * استفاده:
 *   UiCategory.UI.Simples.Messages(
 *       { prop_type: "warning", prop_messages: [...] },
 *       {
 *           CLOSE_MESSAGE: function(event, dataArgs, componentArgs) {
 *               // autocomplete:
 *               //   componentArgs?.TYPE     ← MessageTypes
 *               //   componentArgs?.MESSAGES ← (string | MessageItem)[]
 *               //   dataArgs?.MESSAGE_ID    ← string
 *               //   dataArgs?.MESSAGE_INDEX ← number
 *               //   dataArgs?.MESSAGE_TEXT  ← string
 *               //   dataArgs?.MESSAGE_TYPE  ← string
 *               //   this                    ← ComponentMessages (fn.call(this, ...))
 *           },
 *       },
 *       { unique, emit, events },
 *   );
 *
 * نکته: برای استفاده از `this` به‌عنوان Component instance، از `function` استفاده شود.
 * Arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;
