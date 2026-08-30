// دروازه عمومی ماژول core_event (بخش ۲.۱۰ پلن اصلی)
import {ClEventDispatcher}    from "./class";
import {ClStep}               from "./class";
import {ClRequest}            from "./class";
import {ClResponse}           from "./class";
///------------------------------
import type {TStepDefinition}   from "./types";
import type {TRequestMapEntry}  from "./types";
import type {TStepInstance}     from "./types";

/// کلاس‌ها و تایپ‌ها
export {ClRequest}            from "./class";
export {ClResponse}           from "./class";
export {ClStep}               from "./class";
export {ClEventDispatcher}    from "./class";
export type {TTraceRecord}     from "./class";
export type {TStepDefinition}  from "./types";
export type {TRequestMap}      from "./types";
export type {TRequestMapEntry} from "./types";
export type {TResponseMap}     from "./types";
export type {TEmitHandler}     from "./types";
export type {TEventHelper}     from "./types";
export type {TStepInstance}    from "./types";
export type {TStepRef}         from "./types";

/**
 * کمکی ساخت requestMap — مصرف: CoreEvent.requestMap([[step, payload]])
 * (بخش ۱۲ پلن اصلی — آرایه دوتایی به جای کلید آبجکت)
 */
export const requestMap = (entries: readonly TRequestMapEntry[]) => entries;

/**
 * factory Step — ساخت درختی با Proxy تایپ‌شده (خودکار register در App)
 * مصرف: const User = CoreEvent.Step({ children: { ... } })
 */
export const Step = <TDef extends TStepDefinition>(definition: TDef): TStepInstance<TDef> => {
    const instance = ClStep.create(definition);
    App.register(instance);
    return instance;
};

/** factory Request — تعریف اعلانی در Step (بدون target در زمان تعریف) */
export const Request = () => new ClRequest();

/** factory Response — تعریف اعلانی در Step */
export const Response = (value: any = null) => new ClResponse({} as any, "", value);

/**
 * نمونه singleton سرسری — مصرف: CoreEvent.App.request(...)
 * (بند ۲۰ پلن 4.3: CoreEvent.monitor برای اتصال Monitor آینده)
 */
export const App: ClEventDispatcher = new ClEventDispatcher();