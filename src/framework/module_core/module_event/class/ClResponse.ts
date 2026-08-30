///------------------------------

/**
 * Response — خروجی emit handler با شناسه‌های قابل نسبت دادن (بخش ۶-۸ پلن 4.3)
 *
 * مدل مفهومی (بخش ۶ پلن):
 *   Response
 *   ├── requestId  : شناسه Request منطقی والد
 *   ├── dispatchId : شناسه Dispatch این Target
 *   ├── source     : Step آغازگر Request (اختیاری)
 *   ├── target     : Step هدف این Response
 *   ├── value      : خروجی emit handler
 *   ├── status     : "success" | "error" (بخش ۱۸ پلن)
 *   ├── error      : در صورت خطا (بخش ۱۸ پلن)
 *   ├── timestamp  : زمان تولید (برای trace آینده — بخش ۱۹ پلن)
 *   └── metadata   : داده الحاقی (اختیاری — برای Monitor آینده)
 */
export class ClResponse {

    readonly requestId: string;
    readonly dispatchId: string;
    readonly source?: {readonly identity: symbol; readonly unique: string};
    readonly target?: {readonly identity: symbol; readonly unique: string};
    readonly value: any;
    readonly status: "success" | "error";
    readonly error?: any;
    readonly timestamp: number;
    readonly metadata?: Record<string, any>;

    constructor(
        target?: {readonly identity: symbol; readonly unique: string},
        requestId: string = "",
        value: any = null,
        options: {
            dispatchId?: string;
            source?: {readonly identity: symbol; readonly unique: string};
            status?: "success" | "error";
            error?: any;
            metadata?: Record<string, any>;
        } = {}
    ) {

        this.target     = target;
        this.requestId  = requestId;
        this.value      = value;
        this.dispatchId = options.dispatchId ?? "";
        this.source     = options.source;
        this.status     = options.status ?? "success";
        this.error      = options.error;
        this.timestamp  = Date.now();
        this.metadata   = options.metadata;
    }
}