import type {TRequestMap}   from "./TRequestMap";
import type {TResponseMap}  from "./TResponseMap";
import type {TStepRef}      from "./TStepInstance";
///------------------------------

/**
 * helper تزریق‌شده به پارامتر دوم on handler ها (بخش ۶.۲ پلن اصلی)
 * مصرف: on: { click: (e, event) => event.request(map) }
 *
 * (بند ۴-۵ پلن 4.3) — source: Step آغازگر Request (اختیاری)
 * برای ردیابی Request → Dispatch در trace آینده
 */
export type TEventHelper = {
    request: (map: TRequestMap, source?: TStepRef) => TResponseMap;
};