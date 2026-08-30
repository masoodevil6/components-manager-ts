/**
 * آرایه دوتایی [Step, payload] — به جای کلید آبجکت
 * (محدودیت String() شدن کلیدهای آبجکت در JavaScript — پیوست ب-۱ پلن)
 * Step: هر شناسه دارای identity (کلاس ClStep یا Proxy خروجی factory Step)
 */
export type TRequestMapEntry = readonly [{readonly identity: symbol; readonly unique: string}, Record<string, any>];
export type TRequestMap = readonly TRequestMapEntry[];