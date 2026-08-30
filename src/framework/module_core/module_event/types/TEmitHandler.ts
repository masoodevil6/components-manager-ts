import type {ClRequest} from "../class/ClRequest";
///------------------------------

/**
 * Request Handler یک المان متصل (گزینه emit در CoreReactive)
 * «دریافت» Request از CoreEvents و «بازگرداندن» Response — نه انتشار Event
 * (بخش ۱۴ سند Clarification پلن اصلی)
 *
 * (بند ۱۵ پلن 4.3) — Contract آماده async:
 *   sync:  emit: request => ({ value, valid: true })
 *   async: emit: async request => await something()
 *
 * Runtime فعلی sync است؛ Promise بدون await برگردانده می‌شود و
 * در فاز بعدی (در صورت نیاز) با await حل خواهد شد — بدون تغییر Contract
 */
export type TEmitHandler = (request: ClRequest) => any;