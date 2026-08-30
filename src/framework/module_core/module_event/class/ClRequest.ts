///------------------------------

/**
 * Request — بسته‌بندی payload با requestId و target
 * (بخش ۴-۵ پلن 4.3)
 *
 * دو مفهوم تفکیک‌شده:
 *  - requestId : شناسه Request منطقی واحد (یک event.request → یک requestId)
 *  - dispatchId: شناسه Dispatch به یک Target مشخص (هر Target یک dispatchId)
 *
 * source: Step آغازگر Request (برای trace آینده — بخش ۱۹ پلن)
 */
export class ClRequest {

    readonly requestId: string;
    readonly dispatchId: string;
    readonly target?: {readonly identity: symbol; readonly unique: string};
    readonly source?: {readonly identity: symbol; readonly unique: string};
    readonly payload: Record<string, any>;

    /**
     * @param target   Step هدف این Dispatch
     * @param payload  داده Request
     * @param requestId شناسه Request منطقی والد (در حالت واحد: تولید خودکار)
     * @param source   Step آغازگر (اختیاری — برای trace)
     */
    constructor(
        target?: {readonly identity: symbol; readonly unique: string},
        payload: Record<string, any> = {},
        requestId?: string,
        source?: {readonly identity: symbol; readonly unique: string}
    ) {

        this.target    = target;
        this.payload   = payload;
        this.source    = source;

        // شناسه Request منطقی — اگر از بیرون داده نشده باشد، جدید تولید می‌شود
        this.requestId = requestId ?? `${Date.now().toString(36)}-${ClRequest._counter++}`;

        // شناسه Dispatch این Target — همیشه جدید (بخش ۴ پلن: Request #100 → Dispatch #101,#102)
        this.dispatchId = `${this.requestId}.${ClRequest._dispatchCounter++}`;
    }

    private static _counter: number = 0;
    private static _dispatchCounter: number = 0;
}