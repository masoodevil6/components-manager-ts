import {TComponentPropEntry} from "./TComponentPropEntry";
// --------------------------------


/**
 * نوع الگوی Props کامپوننت — یک Record از prop entryها
 *
 * این type برای تعریف Props.ts هر کامپوننت استفاده می‌شود.
 * کلیدها نام propها هستند و مقدارها TComponentPropEntry است.
 *
 * توسعه‌پذیر: فرزند می‌تواند propهای اختصاصی خود را اضافه کند
 * و type به صورت خودکار از کلیدها استخراج می‌شود.
 *
 * @example
 *   const Props: TComponentProps = {
 *       selector: { prop: "selector", default: null, name: ..., description: ... },
 *       append:   { prop: "append",   default: false, name: ..., description: ... },
 *   }
 *
 *   // استخراج type propها برای TProp:
 *   type PropsType = {
 *       [K in keyof typeof Props]: typeof Props[K]["default"]
 *   }
 */
export type TComponentProps = Record<string, TComponentPropEntry<any>>;
