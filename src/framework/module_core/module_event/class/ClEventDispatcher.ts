import {ClRequest}          from "./ClRequest";
import {ClResponse}         from "./ClResponse";
import type {TRequestMap}   from "../types/TRequestMap";
import type {TResponseMap}  from "../types/TResponseMap";
import type {TEmitHandler}  from "../types/TEmitHandler";
///------------------------------

/**
 * هر شناسه Step — هم کلاس ClStep و هم Proxy تایپ‌شده خروجی factory Step
 * (Dispatcher فقط به identity نیاز دارد — نه به ساختار کامل کلاس)
 */
type TStepRef = { readonly identity: symbol; readonly unique: string };

/**
 * رکورد Trace — metadata حداقلی برای Event Trace آینده (بخش ۱۹ پلن 4.3)
 * در این Phase فقط جمع‌آوری می‌شود؛ Monitor UI ساخته نمی‌شود (بخش ۲۵ پلن)
 */
export type TTraceRecord = {
    requestId: string;
    dispatchId: string;
    source?: TStepRef;
    target: TStepRef;
    status: "success" | "error";
    timestamp: number;
};

/**
 * Dispatcher — رجیستری Stepها و emit handlerها + مسیریابی Request → Response
 *
 * (بخش ۴-۵ پلن 4.3) — تفکیک Request منطقی از Dispatch داخلی:
 *   Request #100  (یک event.request)
 *      ├── Dispatch #100.1 → Target A
 *      └── Dispatch #100.2 → Target B
 *
 * ترتیب اجرا: ترتیب تعریف در requestMap (deterministic — بند ۱۷ پلن)
 */
export class ClEventDispatcher {

    /** رجیستری همه Stepهای ساخته‌شده (کلید: identity) */
    private registry: Map<symbol, TStepRef> = new Map();

    /** رجیستری emit handlerهای المان‌های متصل (کلید: identity) */
    private emits: Map<symbol, TEmitHandler> = new Map();

    /**
     * بافر Trace — آخرین رکوردهای dispatch (بخش ۱۹ پلن)
     * محدود به سقف مشخص برای جلوگیری از رشد بی‌رویه حافظه
     */
    private _trace: TTraceRecord[] = [];
    private static TRACE_LIMIT: number = 100;

    /**
     * Hook مانیتورینگ — اختیاری (بند ۲۰ پلن: Logging اجباری نیست)
     * آینده: CoreEvent.monitor(...) — فعلاً فقط تزریق تابع از بیرون
     */
    private _monitor: ((record: TTraceRecord) => void) | null = null;

    /** ثبت Step در رجیستری (خودکار در factory Step) */
    register(step: TStepRef): void {
        const isNew = !this.registry.has(step.identity);
        this.registry.set(step.identity, step);
        if (isNew) {
            ClEventDispatcher._createdCount++;
        }
    }

    /**
     * ثبت emit handler یک المان متصل (Phase 7 — بخش ۳.۱ پلن اصلی)
     * کلید: identity مربوط به Step متصل با unique
     */
    registerEmit(step: TStepRef, handler: TEmitHandler): void {
        this.register(step);
        this.emits.set(step.identity, handler);
    }

    /**
     * اجرای requestMap (بند ۵، ۱۶، ۱۷، ۱۸ پلن 4.3):
     *  - یک Request منطقی واحد با requestId واحد
     *  - به ازای هر [Step, payload] یک Dispatch با dispatchId مستقل
     *  - Response کامل: target/source/dispatchId/status/timestamp
     *  - خطای emit → Response با status: "error" (بدون crash کل Runtime)
     *  - Step بدون handler → Response پیش‌فرض success خالی (بخش ۱۱ Clarification)
     */
    request(map: TRequestMap, source?: TStepRef): TResponseMap {

        // یک Request منطقی واحد برای کل فراخوانی (بند ۵ پلن)
        const requestId = `${Date.now().toString(36)}-${ClEventDispatcher._newRequestId()}`;

        const responses: TResponseMap = new Map();

        map.forEach(([step, payload]) => {

            // Dispatch مستقل این Target — هم‌خانواده با Request والد
            const request  = new ClRequest(step, payload, requestId, source);
            const handler  = this.emits.get(step.identity);

            let response: ClResponse;

            if (handler) {
                try {
                    const value = handler(request);
                    response = new ClResponse(step, requestId, value, {
                        dispatchId: request.dispatchId,
                        source,
                        status: "success"
                    });
                } catch (error) {
                    // بند ۱۸ پلن: خطای emit نباید Runtime را crash کند
                    response = new ClResponse(step, requestId, null, {
                        dispatchId: request.dispatchId,
                        source,
                        status: "error",
                        error
                    });
                }
            } else {
                response = new ClResponse(step, requestId, null, {
                    dispatchId: request.dispatchId,
                    source,
                    status: "success"
                });
            }

            this._pushTrace({
                requestId,
                dispatchId: request.dispatchId,
                source,
                target: step,
                status: response.status,
                timestamp: response.timestamp
            });

            responses.set(step, response);
        });

        return responses;
    }

    /** اتصال Monitor از بیرون (بند ۲۰ پلن — آینده: CoreEvent.monitor) */
    monitor(callback: (record: TTraceRecord) => void): void {
        this._monitor = callback;
    }

    /** خواندن Trace فعلی (برای Monitor UI آینده) */
    getTrace(): readonly TTraceRecord[] {
        return this._trace;
    }

    /** ثبت رکورد trace با سقف مشخص + فراخوانی Monitor در صورت اتصال */
    private _pushTrace(record: TTraceRecord): void {

        this._trace.push(record);

        if (this._trace.length > ClEventDispatcher.TRACE_LIMIT) {
            this._trace.shift();
        }

        if (this._monitor) {
            this._monitor(record);
        }
    }

    /** آزادسازی Step و emit handler آن از رجیستری‌ها (جلوگیری از memory leak) */
    dispose(step: TStepRef): void {
        this.emits.delete(step.identity);
        this.registry.delete(step.identity);
        ClEventDispatcher._disposedCount++;
    }

    /** شمارنده مرکزی requestId — استاتیک تا در همه Dispatcherها یکتا باشد */
    private static _requestCounter: number = 0;
    private static _newRequestId(): number {
        return ClEventDispatcher._requestCounter++;
    }

    /* ---------------------------------------------
       Plan 8.2.9 — Inspector accessorها (خواندنی)
       Inspector از این accessorها استفاده می‌کند —
       به internals دسترسی ندارد.
    --------------------------------------------- */

    /** لیست همه Stepهای ثبت‌شده در رجیستری — برای inspect و find */
    getRegistry(): readonly TStepRef[] {
        return Array.from(this.registry.values());
    }

    /** تعداد emit handlerهای ثبت‌شده — برای stats */
    getEmitCount(): number {
        return this.emits.size;
    }

    /** بررسی وجود emit handler برای یک Step — برای inspect */
    hasEmit(step: TStepRef): boolean {
        return this.emits.has(step.identity);
    }

    /** ظرفیت بافر trace — برای stats */
    getTraceCapacity(): number {
        return ClEventDispatcher.TRACE_LIMIT;
    }

    /** تعداد کل Stepهای ساخته‌شده از ابتدا — برای stats (lifecycle) */
    getCreatedCount(): number {
        return ClEventDispatcher._createdCount;
    }

    /** تعداد کل Stepهای disposeشده از ابتدا — برای stats (lifecycle) */
    getDisposedCount(): number {
        return ClEventDispatcher._disposedCount;
    }

    /** شمارش dispatchهای success/error از trace — برای stats */
    getDispatchStats(): { success: number; errors: number } {
        let success = 0;
        let errors  = 0;
        for (const record of this._trace) {
            if (record.status === "success") success++;
            else errors++;
        }
        return { success, errors };
    }

    /** شمارنده‌های lifecycle استاتیک — در register و dispose آپدیت می‌شوند */
    private static _createdCount: number   = 0;
    private static _disposedCount: number  = 0;
}