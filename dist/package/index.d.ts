type TBrands<T, B> = T & {
    __brand: B;
};

type DisposeFm = () => void;
declare class ClScope {
    private disposables;
    private children;
    private isDispose;
    track(dispose: DisposeFm): void;
    createChild(): ClScope;
    dispose(): void;
}

type TObservableValue<T> = T | ClObservable<T>;

type Subscriber<T> = (value: T) => void;
type Mapping<T, U> = ((value: T) => U) | {
    [key: string]: U | ClObservable<U> | undefined;
    default?: U | ClObservable<U>;
};
type ChooseMap<TKey extends PropertyKey, TResult> = {
    [K in TKey]?: () => TResult;
} & {
    else?: () => TResult;
};
declare class ClObservable<T> {
    private _value;
    private _subscribers;
    __isObservable: boolean;
    private _isDispose;
    static isObservable(obj: any): obj is ClObservable<any>;
    constructor(value: T);
    get(): T;
    set(value: T): void;
    update<TMap extends Record<string, ClObservable<any>>>(fn: (current: T, observable: ClObservable<T>, values: {
        [K in keyof TMap]: TMap[K] extends ClObservable<infer U> ? U : never;
    }) => T, observables: TMap): void;
    subscribe(fn: Subscriber<T>, scope?: ClScope): () => void;
    map<U>(fn: (value: T) => U, scope?: ClScope): ClObservable<U>;
    mapBoolean<U>(trueValue: U, falseValue: U, scope?: ClScope): ClObservable<U>;
    mapList<U>(mapping: Mapping<T, U>, scope?: ClScope): ClObservable<U>;
    mapArray<U, R>(mapper: (item: R, index: number) => U, scope?: ClScope): ClObservable<U[]>;
    static computed<T>(fn: (...args: any[]) => T, observables: TObservableValue<any>[], scope?: ClScope): ClObservable<T>;
    static conditionSwitch<TKey extends PropertyKey, TResult>(observable: ClObservable<TKey>, map: ChooseMap<TKey, TResult>, scope?: ClScope): ClObservable<TResult | null>;
    static conditionWhen<TResult>(observableOrList: ClObservable<any> | ClObservable<any>[], condition: (...values: any[]) => boolean, onTrue: () => TResult, onFalse?: () => TResult, scope?: ClScope): ClObservable<TResult | null>;
    static for<T, TResult>(source: ClObservable<T[]>, mapper: (item: T, index: number, context: Record<string, any>, consts: Record<string, any>) => TResult, context?: Record<string, ClObservable<any>>, consts?: Record<string, any>, scope?: ClScope): ClObservable<TResult[]>;
    static forObject<TObject extends Record<string, any>, TResult>(source: ClObservable<TObject>, mapper: (key: keyof TObject, value: TObject[keyof TObject], index: number, context: Record<string, any>, consts: Record<string, any>) => TResult, context?: Record<string, ClObservable<any>>, consts?: Record<string, any>, scope?: ClScope): ClObservable<TResult[]>;
    private _mapValue;
    private _bindToScope;
    private _unwrapObservable;
    private _notify;
}

type index$O_TObservableValue<T> = TObservableValue<T>;
declare namespace index$O {
  export { ClObservable as App, ClScope as Scope };
  export type { index$O_TObservableValue as TObservableValue };
}

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
declare class ClRequest {
    readonly requestId: string;
    readonly dispatchId: string;
    readonly target?: {
        readonly identity: symbol;
        readonly unique: string;
    };
    readonly source?: {
        readonly identity: symbol;
        readonly unique: string;
    };
    readonly payload: Record<string, any>;
    /**
     * @param target   Step هدف این Dispatch
     * @param payload  داده Request
     * @param requestId شناسه Request منطقی والد (در حالت واحد: تولید خودکار)
     * @param source   Step آغازگر (اختیاری — برای trace)
     */
    constructor(target?: {
        readonly identity: symbol;
        readonly unique: string;
    }, payload?: Record<string, any>, requestId?: string, source?: {
        readonly identity: symbol;
        readonly unique: string;
    });
    private static _counter;
    private static _dispatchCounter;
}

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
declare class ClResponse {
    readonly requestId: string;
    readonly dispatchId: string;
    readonly source?: {
        readonly identity: symbol;
        readonly unique: string;
    };
    readonly target?: {
        readonly identity: symbol;
        readonly unique: string;
    };
    readonly value: any;
    readonly status: "success" | "error";
    readonly error?: any;
    readonly timestamp: number;
    readonly metadata?: Record<string, any>;
    constructor(target?: {
        readonly identity: symbol;
        readonly unique: string;
    }, requestId?: string, value?: any, options?: {
        dispatchId?: string;
        source?: {
            readonly identity: symbol;
            readonly unique: string;
        };
        status?: "success" | "error";
        error?: any;
        metadata?: Record<string, any>;
    });
}

/**
 * تعریف اعلانی یک Step
 * الگوی مصرف: CoreEvent.Step({ request , response , children })
 * children می‌تواند هم تعریف خام باشد و هم Step ساخته‌شده (فراخوانی تو در تو CoreEvent.Step)
 */
type TStepDefinition = {
    request?: ClRequest;
    response?: ClResponse;
    children?: Record<string, TStepDefinition | {
        readonly identity: symbol;
        readonly unique: string;
    }>;
};

/**
 * Step — واحد هویت در CoreEvent
 * identity: symbol یکتا (هویت واقعی — غیرقابل جعل و clone)
 * unique: مسیر خوانا فقط برای debug/logging (بخش ۲۹ پلن — string identity ممنوع)
 *
 * Plan 8.2.7 — کپسوله‌سازی ساختار داخلی:
 *   children از بیرون قابل mutate نیست — فقط از طریق addChild/removeChild.
 *   دسترسی read-only از طریق getChild.
 *   هیچ لایه‌ای مستقیماً children را دستکاری نمی‌کند.
 */
declare class ClStep {
    readonly identity: symbol;
    readonly unique: string;
    /** ساختار داخلی — private، فقط از طریق API عمومی قابل دسترسی */
    private _children;
    /** parent reference — برای قطع اتصال در disposal */
    private _parent;
    private _parentKey;
    constructor(unique: string);
    /** اتصال رسمی یک Child Step — تنها راه mutate ساختار */
    addChild(key: string, child: ClStep): void;
    /** دسترسی read-only به child — undefined اگر وجود ندارد */
    getChild(key: string): ClStep | undefined;
    /** قطع اتصال یک child — برمی‌گرداند child را یا undefined */
    removeChild(key: string): ClStep | undefined;
    /** لیست همه children — read-only iterator */
    getChildEntries(): ReadonlyArray<readonly [string, ClStep]>;
    /** parent این step — برای disposal از پایین به بالا */
    getParent(): ClStep | null;
    /** کلید این step در parent — برای قطع اتصال */
    getParentKey(): string | null;
    /**
     * جمع‌آوری همه نسل‌ها (بازگشتی) — شامل خود step نمی‌شود
     * مصرف: CoreEvent.dispose(step) برای پاک‌سازی کل subtree از رجیستری
     */
    getAllDescendants(): ClStep[];
    /** پاک‌سازی کل subtree — قطع اتصال همه children */
    clearChildren(): void;
    /**
     * factory درختی — ساخت کل زیردرخت از TStepDefinition
     * خروجی Proxy تایپ‌شده است: دسترسی به child با type-safety (پیوست ب-۲)
     *
     * نکته: children از طریق addChild ساخته می‌شوند — نه mutate مستقیم
     *
     * نکته: اگر یک child قبلاً Step ساخته‌شده باشد (has identity)،
     * مستقیماً استفاده می‌شود — نه دوباره ساخته می‌شود.
     * (هماهنگ با ResolveChild در TStepInstance.ts)
     */
    static create<TDef extends TStepDefinition>(definition: TDef, path?: string): any;
}

/**
 * آرایه دوتایی [Step, payload] — به جای کلید آبجکت
 * (محدودیت String() شدن کلیدهای آبجکت در JavaScript — پیوست ب-۱ پلن)
 * Step: هر شناسه دارای identity (کلاس ClStep یا Proxy خروجی factory Step)
 */
type TRequestMapEntry = readonly [{
    readonly identity: symbol;
    readonly unique: string;
}, Record<string, any>];
type TRequestMap = readonly TRequestMapEntry[];

/**
 * نگاشت خروجی Step → Response (قابل نسبت دادن با requestId)
 * کلید: هر شناسه Step دارای identity
 */
type TResponseMap = Map<{
    readonly identity: symbol;
    readonly unique: string;
}, any>;

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
type TEmitHandler = (request: ClRequest) => any;

/**
 * هر شناسه Step — هم کلاس ClStep و هم Proxy تایپ‌شده خروجی factory Step
 * (Dispatcher فقط به identity نیاز دارد — نه به ساختار کامل کلاس)
 */
type TStepRef$1 = {
    readonly identity: symbol;
    readonly unique: string;
};
/**
 * رکورد Trace — metadata حداقلی برای Event Trace آینده (بخش ۱۹ پلن 4.3)
 * در این Phase فقط جمع‌آوری می‌شود؛ Monitor UI ساخته نمی‌شود (بخش ۲۵ پلن)
 */
type TTraceRecord = {
    requestId: string;
    dispatchId: string;
    source?: TStepRef$1;
    target: TStepRef$1;
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
declare class ClEventDispatcher {
    /** رجیستری همه Stepهای ساخته‌شده (کلید: identity) */
    private registry;
    /** رجیستری emit handlerهای المان‌های متصل (کلید: identity) */
    private emits;
    /**
     * بافر Trace — آخرین رکوردهای dispatch (بخش ۱۹ پلن)
     * محدود به سقف مشخص برای جلوگیری از رشد بی‌رویه حافظه
     */
    private _trace;
    private static TRACE_LIMIT;
    /**
     * Hook مانیتورینگ — اختیاری (بند ۲۰ پلن: Logging اجباری نیست)
     * آینده: CoreEvent.monitor(...) — فعلاً فقط تزریق تابع از بیرون
     */
    private _monitor;
    /** ثبت Step در رجیستری (خودکار در factory Step) */
    register(step: TStepRef$1): void;
    /**
     * ثبت emit handler یک المان متصل (Phase 7 — بخش ۳.۱ پلن اصلی)
     * کلید: identity مربوط به Step متصل با unique
     */
    registerEmit(step: TStepRef$1, handler: TEmitHandler): void;
    /**
     * اجرای requestMap (بند ۵، ۱۶، ۱۷، ۱۸ پلن 4.3):
     *  - یک Request منطقی واحد با requestId واحد
     *  - به ازای هر [Step, payload] یک Dispatch با dispatchId مستقل
     *  - Response کامل: target/source/dispatchId/status/timestamp
     *  - خطای emit → Response با status: "error" (بدون crash کل Runtime)
     *  - Step بدون handler → Response پیش‌فرض success خالی (بخش ۱۱ Clarification)
     */
    request(map: TRequestMap, source?: TStepRef$1): TResponseMap;
    /** اتصال Monitor از بیرون (بند ۲۰ پلن — آینده: CoreEvent.monitor) */
    monitor(callback: (record: TTraceRecord) => void): void;
    /** خواندن Trace فعلی (برای Monitor UI آینده) */
    getTrace(): readonly TTraceRecord[];
    /** ثبت رکورد trace با سقف مشخص + فراخوانی Monitor در صورت اتصال */
    private _pushTrace;
    /** آزادسازی Step و emit handler آن از رجیستری‌ها (جلوگیری از memory leak) */
    dispose(step: TStepRef$1): void;
    /** شمارنده مرکزی requestId — استاتیک تا در همه Dispatcherها یکتا باشد */
    private static _requestCounter;
    private static _newRequestId;
    /** لیست همه Stepهای ثبت‌شده در رجیستری — برای inspect و find */
    getRegistry(): readonly TStepRef$1[];
    /** تعداد emit handlerهای ثبت‌شده — برای stats */
    getEmitCount(): number;
    /** بررسی وجود emit handler برای یک Step — برای inspect */
    hasEmit(step: TStepRef$1): boolean;
    /** ظرفیت بافر trace — برای stats */
    getTraceCapacity(): number;
    /** تعداد کل Stepهای ساخته‌شده از ابتدا — برای stats (lifecycle) */
    getCreatedCount(): number;
    /** تعداد کل Stepهای disposeشده از ابتدا — برای stats (lifecycle) */
    getDisposedCount(): number;
    /** شمارش dispatchهای success/error از trace — برای stats */
    getDispatchStats(): {
        success: number;
        errors: number;
    };
    /** شمارنده‌های lifecycle استاتیک — در register و dispose آپدیت می‌شوند */
    private static _createdCount;
    private static _disposedCount;
}

/**
 * شناسه عمومی Step — کمینه مشترک بین کلاس ClStep و Proxy تایپ‌شده factory
 * مصرف در Options.unique ،TRequestMapEntry ،TResponseMap و API های Dispatcher
 */
type TStepRef = {
    readonly identity: symbol;
    readonly unique: string;
};
/**
 * نمونه تایپ‌شده یک Step در درخت — خروجی factory Step
 * دسترسی به children از طریق Proxy با type-safety کامل:
 * کلید ناموجود در کامپایل خطا می‌دهد (پیوست ب-۲ پلن)
 */
type TStepInstance<TDef extends TStepDefinition = TStepDefinition> = TStepRef & {
    readonly [K in keyof NonNullable<TDef["children"]> & string]: NonNullable<TDef["children"]>[K] extends infer C ? C extends {
        readonly identity: symbol;
    } ? C : C extends TStepDefinition ? TStepInstance<C> : never : never;
};

/**
 * helper تزریق‌شده به پارامتر دوم on handler ها (بخش ۶.۲ پلن اصلی)
 * مصرف: on: { click: (e, event) => event.request(map) }
 *
 * (بند ۴-۵ پلن 4.3) — source: Step آغازگر Request (اختیاری)
 * برای ردیابی Request → Dispatch در trace آینده
 */
type TEventHelper = {
    request: (map: TRequestMap, source?: TStepRef) => TResponseMap;
};

/**
 * کمکی ساخت requestMap — مصرف: CoreEvent.requestMap([[step, payload]])
 * (بخش ۱۲ پلن اصلی — آرایه دوتایی به جای کلید آبجکت)
 */
declare const requestMap: (entries: readonly TRequestMapEntry[]) => readonly TRequestMapEntry[];
/**
 * factory Step — ساخت درختی با Proxy تایپ‌شده (خودکار register در App)
 * مصرف: const User = CoreEvent.Step({ children: { ... } })
 *
 * Plan 8.2.7 — registerAll بازگشتی: همه children هم در رجیستری ثبت می‌شوند
 */
declare const Step: <TDef extends TStepDefinition>(definition: TDef) => TStepInstance<TDef>;
/**
 * SubEvent — رابط رسمی اتصال Child Step به Parent Step (Plan 8.2.7)
 *
 * قرارداد:
 *   - Parent و Child هر دو Step ساخته‌شده هستند
 *   - Child به‌عنوان فرزند با key مشخص به Parent متصل می‌شود
 *   - همه نسل‌های Child در رجیستری App ثبت می‌شوند
 *   - هیچ لایه‌ای مستقیماً children را mutate نمی‌کند — فقط از طریق این API
 *
 * مصرف:
 *   CoreEvent.SubEvent(parentStep, "messages", childStep);
 */
declare const SubEvent: (parent: TStepRef, key: string, child: TStepRef) => void;
/**
 * دسترسی read-only Parent → Child (Plan 8.2.7)
 *
 * مصرف:
 *   const childStep = CoreEvent.getChild(parentStep, "messages");
 */
declare const getChild: (parent: TStepRef, key: string) => TStepRef | null;
/**
 * Disposal بازگشتی — پاک‌سازی کل subtree از رجیستری و emits (Plan 8.2.7)
 *
 * قرارداد:
 *   - همه نسل‌های step (و خود step) از App.registry و App.emits پاک می‌شوند
 *   - ساختار درخت پاک می‌شود (clearChildren)
 *   - اگر step دارای parent است، از parent هم قطع می‌شود
 *
 * مصرف:
 *   CoreEvent.dispose(childStep);
 */
declare const dispose: (step: TStepRef) => void;
/** factory Request — تعریف اعلانی در Step (بدون target در زمان تعریف) */
declare const Request: () => ClRequest;
/** factory Response — تعریف اعلانی در Step */
declare const Response: (value?: any) => ClResponse;
/**
 * نمونه singleton سرسری — مصرف: CoreEvent.App.request(...)
 * (بند ۲۰ پلن 4.3: CoreEvent.monitor برای اتصال Monitor آینده)
 */
declare const App: ClEventDispatcher;
/**
 * درخت Event را در Console نمایش می‌دهد (Snapshot)
 *
 * مصرف:
 *   Framework.Core.Event.inspect()
 *
 * خروجی: درخت سلسله‌مراتبی با console.group — قابل expand در DevTools
 */
declare const inspect: () => void;
/**
 * جریان اخیر Event را در Console نمایش می‌دهد (Flow)
 *
 * مصرف:
 *   Framework.Core.Event.trace()           // آخرین Eventها
 *   Framework.Core.Event.trace("lxyz123.0") // یک Event خاص با dispatchId
 *
 * خروجی: هر Event با SOURCE, TARGET, REQUEST, DISPATCH, RESPONSE, STATUS
 *        به‌صورت console.group — قابل expand در DevTools
 */
declare const trace: (dispatchId?: string) => void;
/**
 * جستجوی Step بر اساس unique (substring match)
 *
 * مصرف:
 *   Framework.Core.Event.find("icon")
 *   Framework.Core.Event.find("messages.message_abc")
 *
 * خروجی: لیست Stepهای منطبق با unique, identity, has emit, parent, children
 */
declare const find: (query: string) => void;
/**
 * آمار سلامت CoreEvent — سلامت‌سنج Event Engine
 *
 * مصرف:
 *   Framework.Core.Event.stats()
 *
 * خروجی: Steps, Handlers, Trace, Dispatch, Lifecycle, Integrity
 */
declare const stats: () => void;
/**
 * فعال/غیرفعال‌کردن live logging در Console
 *
 * مصرف:
 *   Framework.Core.Event.monitor()       // ON
 *   Framework.Core.Event.monitor(false)  // OFF
 *
 * تفاوت با trace():
 *   trace()   — گذشته را می‌بینی
 *   monitor() — از این لحظه به بعد جریان را می‌بینی
 *
 * هر dispatch در Console زنده نمایش داده می‌شود:
 *   [CoreEvent] REQUEST  source → target
 *   [CoreEvent] RESPONSE status, value
 *   [CoreEvent] DISPOSE  step
 */
declare const monitor: (enabled?: boolean) => void;

declare const index$N_App: typeof App;
type index$N_ClEventDispatcher = ClEventDispatcher;
declare const index$N_ClEventDispatcher: typeof ClEventDispatcher;
type index$N_ClRequest = ClRequest;
declare const index$N_ClRequest: typeof ClRequest;
type index$N_ClResponse = ClResponse;
declare const index$N_ClResponse: typeof ClResponse;
type index$N_ClStep = ClStep;
declare const index$N_ClStep: typeof ClStep;
declare const index$N_Request: typeof Request;
declare const index$N_Response: typeof Response;
declare const index$N_Step: typeof Step;
declare const index$N_SubEvent: typeof SubEvent;
type index$N_TEmitHandler = TEmitHandler;
type index$N_TEventHelper = TEventHelper;
type index$N_TRequestMap = TRequestMap;
type index$N_TRequestMapEntry = TRequestMapEntry;
type index$N_TResponseMap = TResponseMap;
type index$N_TStepDefinition = TStepDefinition;
type index$N_TStepInstance<TDef extends TStepDefinition = TStepDefinition> = TStepInstance<TDef>;
type index$N_TStepRef = TStepRef;
type index$N_TTraceRecord = TTraceRecord;
declare const index$N_dispose: typeof dispose;
declare const index$N_find: typeof find;
declare const index$N_getChild: typeof getChild;
declare const index$N_inspect: typeof inspect;
declare const index$N_monitor: typeof monitor;
declare const index$N_requestMap: typeof requestMap;
declare const index$N_stats: typeof stats;
declare const index$N_trace: typeof trace;
declare namespace index$N {
  export { index$N_App as App, index$N_ClEventDispatcher as ClEventDispatcher, index$N_ClRequest as ClRequest, index$N_ClResponse as ClResponse, index$N_ClStep as ClStep, index$N_Request as Request, index$N_Response as Response, index$N_Step as Step, index$N_SubEvent as SubEvent, index$N_dispose as dispose, index$N_find as find, index$N_getChild as getChild, index$N_inspect as inspect, index$N_monitor as monitor, index$N_requestMap as requestMap, index$N_stats as stats, index$N_trace as trace };
  export type { index$N_TEmitHandler as TEmitHandler, index$N_TEventHelper as TEventHelper, index$N_TRequestMap as TRequestMap, index$N_TRequestMapEntry as TRequestMapEntry, index$N_TResponseMap as TResponseMap, index$N_TStepDefinition as TStepDefinition, index$N_TStepInstance as TStepInstance, index$N_TStepRef as TStepRef, index$N_TTraceRecord as TTraceRecord };
}

declare enum EnElementNamespace {
    HTML = "html",
    SVG = "svg"
}

type ClassValue = string | string[];
type StyleMap = Record<string, string>;
type AttrMap = Record<string, string | boolean | null | undefined>;
type TEventHandler = (e: Event, event?: TEventHelper) => void;
type EventMap = Record<string, TEventHandler>;
type Options = {
    props?: any;
    propsBind?: any;
    children?: any;
    className?: ClassValue;
    classBind?: any;
    styles?: StyleMap;
    stylesCustom?: string;
    stylesBind?: any;
    attrs?: AttrMap;
    attrsBind?: Record<string, TObservableValue<any>>;
    on?: EventMap;
    unique?: TStepRef;
    emit?: TEmitHandler;
    existingElement?: HTMLElement | SVGElement;
};
declare class ClReactiveElement {
    static version: string;
    tagName: string;
    element: HTMLElement | SVGElement;
    private _options;
    private _eventListeners;
    private _states;
    private _children;
    private _hoverHandlers;
    private _bindings;
    hover: ClObservable<boolean>;
    focus: ClObservable<boolean>;
    active: ClObservable<boolean>;
    constructor(tagName: string, options?: Options, namespace?: EnElementNamespace);
    private _bindObservable;
    _applyProps(props: any): void;
    _applyPropsBind<T>(propsBind: T): void;
    private _applyClassName;
    private _applyClassBind;
    private _toCssPropertyName;
    private _setStyle;
    private _applyStyles;
    private _applyStylesBind;
    private _applyCustomStyle;
    private _applyAttrs;
    private _applyAttrsBind;
    private _setChildren;
    private _setEvents;
    _addEvent(event: string, handler: (e: Event) => void): this;
    _removeEvent(event: string, handler?: EventListener | null): this;
    on(event: string, handler: (e: Event) => void): this;
    off(event: string, handler?: EventListener | null): this;
    /**
     * خواندن مقدار یک attribute
     * @param name — نام attribute (مثل "role", "data-id")
     * @returns مقدار attribute یا null اگر وجود نداشته باشد
     */
    getAttr(name: string): string | null;
    /**
     * بررسی وجود یک attribute
     * @param name — نام attribute
     * @returns true اگر attribute وجود داشته باشد
     */
    hasAttr(name: string): boolean;
    /**
     * خواندن مقدار یک style property
     * @param key — نام CSS property (مثل "color", "border-width", "--custom")
     * @returns مقدار style یا رشته خالی اگر تنظیم نشده باشد
     *
     * نکته: برای CSS custom properties (--var) از getPropertyValue استفاده می‌شود.
     *       برای regular properties از style[key] خوانده می‌شود.
     */
    getStyle(key: string): string;
    /**
     * بررسی وجود یک style property (تنظیم‌شده و غیر خالی)
     * @param key — نام CSS property
     * @returns true اگر style تنظیم شده و مقدار غیر خالی داشته باشد
     */
    hasStyle(key: string): boolean;
    /**
     * خواندن لیست classهای فعلی
     * @returns آرایه از class names
     */
    getClassName(): string[];
    /**
     * بررسی وجود یک class
     * @param name — نام class
     * @returns true اگر class وجود داشته باشد
     */
    hasClass(name: string): boolean;
    private _applyOptions;
    getReactiveElement(): ClReactiveElement;
    getElement(): HTMLElement;
    remove(): void;
    static create(tagName: string, options?: Options): ClReactiveElement;
    static component(componentName: string, o?: Options): ClReactiveElement;
    static part(el?: string, o?: Options): ClReactiveElement;
    focusFn(options?: FocusOptions): ClReactiveElement;
    blurFn(): ClReactiveElement;
    static div(o?: Options): ClReactiveElement;
    static form(o?: Options): ClReactiveElement;
    static button(o?: Options): ClReactiveElement;
    static b(o?: Options): ClReactiveElement;
    static span(o?: Options): ClReactiveElement;
    static section(o?: Options): ClReactiveElement;
    static a(o?: Options): ClReactiveElement;
    static label(o?: Options): ClReactiveElement;
    static input(o?: Options): ClReactiveElement;
    static h1(o?: Options): ClReactiveElement;
    static h2(o?: Options): ClReactiveElement;
    static h3(o?: Options): ClReactiveElement;
    static p(o?: Options): ClReactiveElement;
    static ul(o?: Options): ClReactiveElement;
    static li(o?: Options): ClReactiveElement;
    static img(o?: Options): ClReactiveElement;
    static i(o?: Options): ClReactiveElement;
    static style(o?: Options): ClReactiveElement;
    static select(o?: Options): ClReactiveElement;
    static option(o?: Options): ClReactiveElement;
    static svg(o?: Options): ClReactiveElement;
    static svgFragment(o?: Options): ClReactiveElement;
    static svgCircle(o?: Options): ClReactiveElement;
    static svgEllipse(o?: Options): ClReactiveElement;
    static svgLine(o?: Options): ClReactiveElement;
    static svgPath(o?: Options): ClReactiveElement;
    static svgRect(o?: Options): ClReactiveElement;
    static svgText(o?: Options): ClReactiveElement;
    static svgDefs(o?: Options): ClReactiveElement;
    static svgFilter(o?: Options): ClReactiveElement;
    static svgFeGaussianBlur(o?: Options): ClReactiveElement;
    static svgFeMerge(o?: Options): ClReactiveElement;
    static svgFeMergeNode(o?: Options): ClReactiveElement;
    static svgG(o?: Options): ClReactiveElement;
    static svgAnimate(o?: Options): ClReactiveElement;
    static svgAnimateTransform(o?: Options): ClReactiveElement;
    static svgAnimateMotion(o?: Options): ClReactiveElement;
    static svgPolygon(o?: Options): ClReactiveElement;
}

declare namespace index$M {
  export {
    ClReactiveElement as App,
    EnElementNamespace as TElementNamespace,
  };
}

type TBrandIcons = TBrands<ReturnType<typeof ClReactiveElement.svg>, "icon">;

type TBrandTranslationKey = TBrands<symbol, "translationKey">;

declare const MTCreateTranslationKey: () => TBrandTranslationKey;

declare namespace index$L {
  export { MTCreateTranslationKey as CreateTranslationKey };
  export type { TBrandIcons as Icons, TBrandTranslationKey as TranslationKey };
}

interface Interface_ComponentProp<TPropTypes> {
    prop: string;
    default: TPropTypes;
    value?: null;
    hasMultiTemplate?: boolean;
    name?: TBrandTranslationKey;
    description?: TBrandTranslationKey;
}

interface Interface_ComponentSchema<TSchema, TPropTypes> {
    part: TSchema;
    props?: Interface_ComponentProp<TPropTypes[keyof TPropTypes]>[];
    name?: TBrandTranslationKey;
    description?: TBrandTranslationKey;
}

type TPartAttrDefault = {
    "data-part-name": string;
    id: string;
};

declare abstract class AbComponentConnector {
    renderManagerComponent(partName: string, attrsDefault: TPartAttrDefault, data: any, extra: any): ClReactiveElement;
    renderContentComponent(attrsDefault: TPartAttrDefault, data: Record<string, ClObservable<any>>, extra: any): ClReactiveElement;
    static renderExampleComponent(extraData: any): HTMLElement;
    renderEmptyContent(attrsDefault: TPartAttrDefault): ClReactiveElement;
}

/**
 * Callback Type برای Component Method
 *
 * @param TComponentArgs — type مربوط به componentArgs (propهای مرتبط)
 * @param TDataArgs      — type مربوط به dataArgs (runtime data)
 * @param TThis          — type مربوط به this (Component instance) — default: any
 *
 * نکته: `this: TThis` فقط در function callback کار می‌کند، نه arrow function.
 * Arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.
 */
type Callback_ComponentMethod<TComponentArgs, TDataArgs, TThis = any> = (this: TThis, event: Event, dataArgs: TDataArgs | null, componentArgs: TComponentArgs | null) => void;

interface Interface_ComponentMethod<TPropTypes> {
    args?: Record<string, Interface_ComponentProp<TPropTypes[keyof TPropTypes]>>;
    title?: ClObservable<string>;
    description?: ClObservable<string>;
    destination?: Callback_ComponentMethod<any, any>;
}

type Type_ComponentMethod<TMethod> = keyof TMethod;

type Type_ComponentProp<TPropTypes> = keyof TPropTypes;

type Type_ComponentSchema<TSchema> = keyof TSchema;

interface Interface_ComponentTemplate<TPropTypes> {
    reference: Interface_ComponentProp<TPropTypes[keyof TPropTypes]>;
    html?: string;
    attrs?: Record<string, string>;
    value?: any;
    title?: ClObservable<string>;
    description?: ClObservable<string>;
}

type Type_ComponentTemplate<TSchema> = keyof TSchema;

declare class ClComponentBase<TProp extends Record<string, any>, TSchemas, TTemplate, TMethods extends Record<string, Callback_ComponentMethod<any, any>>> extends AbComponentConnector {
    #private;
    protected _renderScope: ClScope;
    protected _COMPONENT_PATTERN: {
        [K in Type_ComponentProp<TProp>]?: Interface_ComponentProp<TProp[K]>;
    };
    protected _COMPONENT_SCHEMA: {
        [K in Type_ComponentSchema<TSchemas>]: Interface_ComponentSchema<TSchemas[K], TProp>;
    };
    protected _COMPONENT_METHODS: {
        [K in Type_ComponentMethod<TMethods>]: Interface_ComponentMethod<TProp>;
    };
    protected _COMPONENT_TEMPLATES: {
        [K in Type_ComponentTemplate<TTemplate>]?: Interface_ComponentTemplate<TProp>;
    };
    _COMPONENT_PROPS_BIND: Record<string, ClObservable<any>>;
    _COMPONENT_CONFIG: Record<string, any>;
    _COMPONENT_RANDOM_ID: number;
    _COMPONENT_ID: string | null;
    _COMPONENT_NAME: string;
    _COMPONENT_CONTENT: ClReactiveElement;
    _unsubscribeDirection: any;
    _COMPONENT_UNIQUE: TStepRef | null;
    _COMPONENT_EMIT: TEmitHandler | null;
    constructor(componentName: string, elId: string | null);
    renderComponent(config: TProp, methods: TMethods, events?: any, unique?: TStepRef | null, emit?: TEmitHandler | null): void;
    connectedCallback(): void;
    protected createComponentElement(): void;
    executeSchemaPart(partName: string, extra?: any): any;
    getSchemaPropsInPart(props: Interface_ComponentProp<any>[]): Record<string, ClObservable<any>>;
    getReactiveElement(): ClReactiveElement;
    getElement(): ClReactiveElement | HTMLElement;
    set(propName: string, propValue: any): void;
    get(propName: string): any;
    getObservable(propName: string): ClObservable<any>;
    getScope(): ClScope;
    getPartId(partName: string): string;
    executeMethod(methodName: string, event: Event, dataArgs?: Record<string, any> | null): any;
}

type TTypeOf<T> = T;

declare function MtSetValue<T>(value: T): TTypeOf<T>;

declare enum CsSizes {
    DEFAULT = "default",
    XS = "XSmall",
    S = "Small",
    M = "Medium",
    L = "Large",
    XL = "XLarge",
    XXL = "XXLarge"
}

declare enum CsUnits {
    PERCENT = "%",
    PEXEL = "px",
    POINT = "pt"
}

declare enum CsOperation {
    ADD = "+",
    MINUS = "-",
    MUL = "*",
    DIV = "/"
}

declare enum CsColorMain {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
    SUCCESS = "success",
    SHADOW = "shadow",
    DARK = "dark",
    SHAN = "shan"
}

declare enum CsColorGrad {
    GRADE_1 = 1,
    GRADE_2 = 2,
    GRADE_3 = 3,
    GRADE_4 = 4,
    GRADE_5 = 5
}

declare enum CsZIndex {
    basic = 1,
    menu_main = 2,
    icon_attach = 3,
    tools_blur = 10,
    tools = 11,
    tools_btn = 12,
    tools_position = 13,
    new_page = 21,
    notify = 80,
    blur_popup = 90,
    popup = 91,
    SELECTOR = 100
}

declare enum CsFileMimeTypes {
    PNG = "image/png",
    JPG = "image/jpeg",
    JPEG = "image/jpeg",
    GIF = "image/gif",
    WEBP = "image/webp",
    SVG = "image/svg+xml",
    ICO = "image/x-icon",
    BMP = "image/bmp",
    TIFF = "image/tiff",
    PDF = "application/pdf",
    JSON = "application/json",
    XML = "application/xml",
    TXT = "text/plain",
    CSV = "text/csv",
    HTML = "text/html",
    CSS = "text/css",
    JS = "text/javascript",
    TS = "text/typescript",
    ZIP = "application/zip",
    RAR = "application/vnd.rar",
    GZIP = "application/gzip"
}

declare const CsFileExtensionTypes: Record<string, CsFileMimeTypes>;

declare namespace index$K {
  export {
    CsColorGrad as ColorGrad,
    CsColorMain as ColorMain,
    CsFileExtensionTypes as FileExtensionTypes,
    CsFileMimeTypes as FileMimeTypes,
    CsOperation as Operation,
    CsSizes as Sizes,
    CsUnits as Units,
    CsZIndex as ZIndex,
  };
}

type TCSizes = typeof CsSizes[keyof typeof CsSizes];

type TCZIndex = typeof CsZIndex[keyof typeof CsZIndex];

type TCOperation = typeof CsOperation[keyof typeof CsOperation];

type TCUnits = typeof CsUnits[keyof typeof CsUnits];

type TCColorMain = typeof CsColorMain[keyof typeof CsColorMain];

type TCColorGrad = typeof CsColorGrad[keyof typeof CsColorGrad];

type TVColor = `var(--${TCColorMain}Color${TCColorGrad})`;

type TVFontSize = `var(--fontSize${TCUnits})`;

type TVIconSize = `var(--iconSize${TCSizes})`;

type TVHeight = `var(--height${TCUnits})`;

type TVSizeUnit = `${number}${TCUnits}`;

type TVSizeCalc = `calc(${string})`;

type TVTransform = `translate(${TVSizeUnit} , ${TVSizeUnit})`;

type TVBorderRadius = `var(--borderRadius${TCUnits})`;

type TVBorderWidth = `var(--borderWidth${TCUnits})`;

type TVMargin = `var(--margin${TCUnits})`;

type TVPadding = `var(--padding${TCUnits})`;

declare class ClStyleValue {
    value: any;
    important: boolean;
    constructor(value: any, important?: boolean);
    static important(value: any): ClStyleValue;
}

declare function MTStyleImportant(value: string | number): ClStyleValue;

declare const MTZIndex: (zIndex?: TCZIndex) => number;

declare const MTColor: (color?: TCColorMain, grade?: TCColorGrad) => TVColor;

declare const MTFontSize: (size?: TCSizes) => TVFontSize;

declare const MTHeight: (size?: TCSizes) => TVHeight;

declare const MTSizeUnit: (number: number, unit?: TCUnits) => TVSizeUnit;

type CalcSizeParts = TCOperation | TVSizeUnit;
declare const MTSizeCalc: (...parts: CalcSizeParts[]) => TVSizeCalc;

declare const MTTransform: (transitionX: TVSizeUnit, transitionY: TVSizeUnit) => TVTransform;

declare const MTMargin: (size?: TCSizes) => TVMargin;

declare const MTPadding: (size?: TCSizes) => TVPadding;

declare const MTBorderRadius: (size?: TCSizes) => TVBorderRadius;

declare const MTBorderWidth: (size?: TCSizes | TVSizeUnit) => TVBorderWidth | TVSizeUnit;

declare const MTIconSize: (size?: TCSizes | number | TVIconSize) => TVIconSize | TVSizeUnit;

/**
 * MTIconStrokeWidth — محاسبه stroke-width برای SVG آیکون
 *
 * فرمول (Sub-linear normalization):
 *   strokeWidth = targetStrokePx × √(viewBoxMax / renderSize)
 *   on-screen  = strokeWidth × renderSize / viewBoxMax
 *              = targetStrokePx × √(renderSize / viewBoxMax)
 *
 * این فرمول عمداً ضخامت stroke روی صفحه را ثابت نگه نمی‌دارد.
 * بلکه برای viewBoxهای بزرگ‌تر، stroke را sub-linear کاهش می‌دهد
 * تا جزئیات ریز آیکون‌های پیچیده merge نشوند.
 *
 * مثال:
 *   viewBox 24×24,   render 24px  → on-screen 2.0px  (مرجع)
 *   viewBox 358×358,  render 24px  → on-screen 0.52px (جزئیات حفظ می‌شوند)
 *   viewBox 700×250,  render 250px → on-screen 1.2px  (آیکون بزرگ)
 */
declare const MTIconStrokeWidth: (size?: TCSizes | number, viewBoxX?: number, viewBoxY?: number) => number;

type TSizeExp = TCSizes | TVSizeUnit;

type index$J_ClStyleValue = ClStyleValue;
declare const index$J_ClStyleValue: typeof ClStyleValue;
type index$J_TSizeExp = TSizeExp;
declare namespace index$J {
  export { index$J_ClStyleValue as ClStyleValue, MTBorderRadius as Css_BorderRadius, MTBorderWidth as Css_BorderWidth, MTColor as Css_Color, MTFontSize as Css_FontSize, MTHeight as Css_Height, MTIconSize as Css_IconSize, MTIconStrokeWidth as Css_IconStrokeWidth, MTMargin as Css_Margin, MTPadding as Css_Padding, MTSizeCalc as Css_SizeCalc, MTSizeUnit as Css_SizeUnit, MTTransform as Css_Transform, MTZIndex as Css_ZIndex, MTStyleImportant as Style_Important };
  export type { TVColor as TColor, index$J_TSizeExp as TSizeExp };
}

type TValidatorResult = [
    boolean,
    string
];

type ValidatorDescription = string | TBrandTranslationKey | Record<string, string>;
declare abstract class AbstractValidatorRule<TParams = void> {
    readonly title: ValidatorDescription;
    readonly description: ValidatorDescription;
    readonly params: TParams;
    constructor(title: ValidatorDescription, description: ValidatorDescription, params: TParams);
    abstract validate(input: string): TValidatorResult;
    getTitle(): string;
    protected getDescription(): string;
}

declare class ClValidator {
    static validate(input: string, rules: AbstractValidatorRule[]): TValidatorResult[];
}

type ValidatorCharLengthParams = {
    min: number;
};
declare class ClValidateCharLength extends AbstractValidatorRule<ValidatorCharLengthParams> {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription, min?: number);
    validate(input: string): TValidatorResult;
}

declare class ClValidateIsEmail extends AbstractValidatorRule {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription);
    validate(input: string): TValidatorResult;
}

declare class ClValidateNotEmpty extends AbstractValidatorRule {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription);
    validate(input: string): TValidatorResult;
}

declare class ClValidateNumLength extends AbstractValidatorRule {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription);
    validate(input: string): TValidatorResult;
}

type ValidatorTextCharUpperParams = {
    min: number;
};
declare class ClValidateTextCharUpper extends AbstractValidatorRule<ValidatorTextCharUpperParams> {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription, min?: number);
    validate(input: string): TValidatorResult;
}

type ValidatorTextForbiddenParams = {
    chars: string[];
};
declare class ClValidateTextForbidden extends AbstractValidatorRule<ValidatorTextForbiddenParams> {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription, chars?: string[]);
    validate(input: string): TValidatorResult;
}

type ValidatorTextLengthParams = {
    min: number;
};
declare class ClValidateTextLength extends AbstractValidatorRule<ValidatorTextLengthParams> {
    constructor(title?: ValidatorDescription, description?: ValidatorDescription, min?: number);
    validate(input: string): TValidatorResult;
}

declare namespace index$I {
  export {
    ClValidateCharLength as CharLength,
    ClValidateIsEmail as IsEmail,
    ClValidateNotEmpty as NotEmpty,
    ClValidateNumLength as NumLength,
    ClValidateTextCharUpper as TextCharUpper,
    ClValidateTextForbidden as TextForbidden,
    ClValidateTextLength as TextLength,
  };
}

declare const Keys: {
    readonly charLength: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly isEmail: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly notEmpty: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly numLength: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly textCharUpper: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly textForbidden: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
    readonly textLength: {
        readonly title: TBrandTranslationKey;
        readonly description: TBrandTranslationKey;
    };
};

declare const DictEn: Map<TBrandTranslationKey, string>;

declare const DictFa: Map<TBrandTranslationKey, string>;

declare const index$H_DictEn: typeof DictEn;
declare const index$H_DictFa: typeof DictFa;
declare const index$H_Keys: typeof Keys;
declare namespace index$H {
  export {
    index$H_DictEn as DictEn,
    index$H_DictFa as DictFa,
    index$H_Keys as Keys,
  };
}

type index$G_ValidatorDescription = ValidatorDescription;
declare namespace index$G {
  export { ClValidator as App, AbstractValidatorRule as ValidatorRule, index$H as language, index$I as validates };
  export type { index$G_ValidatorDescription as ValidatorDescription, TValidatorResult as ValidatorResult };
}

/**
 * مشابه TCategoryIconTotality اما برای Components
 *
 * یک callable که component را instantiate می‌کند
 * + `.info` که Definition کامپوننت را نگه می‌دارد
 *
 * نکته: callable برمی‌گرداند Component instance (نه HTMLElement)
 *   — consumer می‌تواند set/get/executeMethod را صدا بزند
 *   — برای افزودن به DOM: instance.getElement()
 *
 * نمونه استفاده:
 *   const Button = CreateCategoryComponent(ButtonDefinition, ComponentButtonClass);
 *   const btn = Button({ prop_btnTitle: "test" }, methods, { unique, emit, events });
 *   btn.set("prop_btnTitle", "new title");   // ← set روی instance
 *   btn.getElement();                         // ← HTMLElement برای DOM
 *   Button.info;                              // ← Definition
 *
 * Generic Parameters:
 *   TInstance — type instance کامپوننت (set/get/executeMethod/getElement)
 *   TConfig   — type config کامپوننت (propها)
 *   TMethods  — type methods کامپوننت
 */
type TCategoryComponentTotality<TInstance, TConfig extends Record<string, any> = Record<string, any>, TMethods extends Record<string, any> = Record<string, any>> = ((config?: Partial<TConfig>, methods?: TMethods, identity?: {
    unique?: any;
    emit?: any;
    events?: Record<string, any> | null;
}) => TInstance) & {
    info: Type_ComponentDefinition;
};

type TCategoryComponentDefinition = {
    id: string;
    name: TBrandTranslationKey;
    description?: TBrandTranslationKey;
    children?: TCategoryComponentDefinition[];
    components?: TCategoryComponentTotality<InstanceType<ComponentConstructor>>[];
};

type Type_ComponentDefinition = {
    id: string;
    name: string;
    version: string;
    category?: TCategoryComponentDefinition;
};

/**
 * Identity یک Component Instance
 *
 * شامل سه فیلد مربوط به Runtime Identity:
 *   unique — هویت یکتای Instance در درخت Workflow (CoreEvent.TStepRef)
 *   emit   — Request Handler متصل به المان (CoreEvent.TEmitHandler)
 *   events — Event handlerهای متصل به Component
 *
 * این Type به‌عنوان Generic Parameter چهارم ComponentStructure استفاده می‌شود.
 * فرزندها می‌توانند type اختصاصی داشته باشند (مثلاً ButtonIdentity).
 *
 * @example
 *   class ComponentButton extends ComponentStructure<
 *       ButtonPropsType,
 *       ButtonSchemasType,
 *       ButtonMethodsType,
 *       ButtonIdentity   // ← اختصاصی
 *   > { ... }
 *
 * @example
 *   const component = new ComponentButton(
 *       config,
 *       methods,
 *       {
 *           unique: stepRef,
 *           emit:   handler,
 *           events: { click: onClick },
 *       },
 *   );
 */
interface Interface_ComponentIdentity {
    /** هویت یکتای Instance در درخت Workflow */
    unique: TStepRef | null;
    /** Request Handler متصل به المان */
    emit: TEmitHandler | null;
    /** Event handlerهای متصل به Component */
    events: Record<string, any> | null;
}

type TExtractName<T extends Record<PropertyKey, {
    readonly name: PropertyKey;
}>> = {
    [k in keyof T]: T[k]["name"];
};

type TExtractNameAndValue<T extends Record<PropertyKey, {
    readonly name: PropertyKey;
    readonly value: any;
}>> = {
    [k in keyof T as T[k]["name"]]: T[k]["value"] extends TTypeOf<infer U> ? U : never;
};

type TValueOf<T> = T[keyof T];

declare function Define_ComponentProp<TPropTypes>(patterns: {
    [K in Type_ComponentProp<TPropTypes>]: Interface_ComponentProp<TPropTypes[K]>;
}): {
    [K in Type_ComponentProp<TPropTypes>]: Interface_ComponentProp<TPropTypes[K]>;
};
declare function Define_ComponentProp<T>(entry: Interface_ComponentProp<T>): Interface_ComponentProp<T>;

declare function Define_ComponentSchema<TSchema, TPropTypes>(props: {
    [K in Type_ComponentSchema<TSchema>]: Interface_ComponentSchema<TSchema[K], TPropTypes>;
}): {
    [K in Type_ComponentSchema<TSchema>]: Interface_ComponentSchema<TSchema[K], TPropTypes>;
};

declare function Define_ComponentTemplate<TTemplatesTypes, TPropTypes>(templates: {
    [K in Type_ComponentTemplate<TTemplatesTypes>]: Interface_ComponentTemplate<TPropTypes>;
}): {
    [K in Type_ComponentTemplate<TTemplatesTypes>]: Interface_ComponentTemplate<TPropTypes>;
};

/**
 * Define_ComponentMethod
 *
 * یک کپی مستقل از methods می‌سازد — هر entry به‌صورت shallow clone شده
 * تا نمونه‌های مختلف Componentها destination مستقل داشته باشند.
 *
 * مشکل قبلی (Plan 8.2.5):
 *   `_COMPONENT_METHODS = DefineMethod({...Methods})` فقط یک shallow copy سطح بالا
 *   ایجاد می‌کرد، اما entryهای داخلی (CLICK, HOVER, ...) by reference به اشتراک
 *   گذاشته می‌شدند. وقتی #getReadyComponentMethods روی یک نمونه destination را set
 *   می‌کرد، همه نمونه‌ها تحت تاثیر قرار می‌گرفتند — آخرین نمونه همه را overwrite می‌کرد.
 *
 * راه‌حل: هر entry داخلی هم clone شود تا هر نمونه مستقل باشد.
 */
declare function Define_ComponentMethod<TMethod, TPropTypes>(methods: {
    [K in Type_ComponentMethod<TMethod>]: Interface_ComponentMethod<TPropTypes>;
}): {
    [K in Type_ComponentMethod<TMethod>]: Interface_ComponentMethod<TPropTypes>;
};

/**
 * Component Example — Factory Function برای نمایش یک Component
 *
 * Example فقط metadata + render callable است.
 * render() مستقیم HTMLElement برمی‌گرداند — بدون نیاز به ExampleRenderer یا Component Constructor.
 *
 * Example به Component وابسته است (چون render() آن Component را می‌سازد).
 * این وابستگی عمدی است — Example بدون Component معنی ندارد.
 *
 * @example
 *   export const DefaultExample: ComponentExample = {
 *       id:          "icon_default",
 *       name:        Keys.category.components.icon.examples.default.name,
 *       description: Keys.category.components.icon.examples.default.description,
 *
 *       render: () => UiCategory.UI.Simples.Icon(
 *           {
 *               prop_icon:      UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition, { size: 24 }),
 *               prop_iconTitle: "Arrow Up",
 *           },
 *           {},
 *       ).getElement(),
 *   };
 *
 *   // استفاده:
 *   const el = DefaultExample.render();   // → HTMLElement
 *   document.body.appendChild(el);
 */
interface Interface_ComponentExample {
    /** شناسه یکتای Example (مثلاً "icon_default") */
    id: string;
    /** کلید ترجمه برای نام نمایشی Example */
    name: TBrandTranslationKey;
    /** کلید ترجمه برای توضیحات Example */
    description?: TBrandTranslationKey;
    /**
     * Factory Function — ساخت و render Component
     *
     * مستقیم HTMLElement برمی‌گرداند.
     * هر بار صدا زده شدن، یک Instance جدید می‌سازد.
     *
     * @returns HTMLElement نتیجه render
     */
    render: () => HTMLElement;
}

/**
 * Component Manager — ثبت، کشف و مدیریت Componentها بدون instantiate کردن
 *
 * مسئولیت:
 *   - ثبت Component Definition (Metadata)
 *   - ثبت Examples هر Component
 *   - کشف Componentها بر اساس id / name / category
 *   - دسترسی به Props / Schemas / Methods / Examples بدون اجرای Runtime
 *
 * Component Manager خودش Component را render نمی‌کند.
 * برای render از ExampleRenderer استفاده می‌کند.
 *
 * @example
 *   ComponentManager.register({
 *       definition: ButtonDefinition,
 *       props:      ButtonProps,
 *       schemas:    ButtonSchemas,
 *       methods:    ButtonMethods,
 *       examples:   ButtonExamples,
 *       constructor: ComponentButton,
 *   });
 *
 *   ComponentManager.get("component_button");           // → RegistryEntry
 *   ComponentManager.getExamples("component_button");   // → Example[]
 *   ComponentManager.list();                            // → RegistryEntry[]
 */
declare const ComponentManager: {
    /** Registry داخلی — Map از id به RegistryEntry */
    _registry: Map<string, ComponentRegistryEntry>;
    /**
     * ثبت یک Component در Registry
     *
     * @param entry - شامل Definition, Props, Schemas, Methods, Examples, Constructor
     */
    register(entry: ComponentRegistryEntry): void;
    /**
     * دریافت Registry Entry بر اساس Component id
     *
     * @param id - شناسه Component (مثلاً "component_button")
     * @returns RegistryEntry یا undefined
     */
    get(id: string): ComponentRegistryEntry | undefined;
    /**
     * بررسی وجود Component در Registry
     */
    has(id: string): boolean;
    /**
     * لیست تمام Componentهای ثبت‌شده
     */
    list(): ComponentRegistryEntry[];
    /**
     * دریافت Examples یک Component
     *
     * @param id - شناسه Component
     * @returns آرایه Example Definitions یا []
     */
    getExamples(id: string): Interface_ComponentExample[];
    /**
     * دریافت یک Example خاص از یک Component
     *
     * @param id          - شناسه Component
     * @param exampleId   - شناسه Example
     * @returns Example Definition یا undefined
     */
    getExample(id: string, exampleId: string): Interface_ComponentExample | undefined;
    /**
     * پاک کردن Registry (برای تست)
     */
    clear(): void;
    /**
     * تعداد Componentهای ثبت‌شده
     */
    readonly size: number;
};
/**
 * Registry Entry — تمام Metadata یک Component
 *
 * این Entry بدون instantiate کردن Component قابل خواندن است.
 * Component Manager از این Entry برای نمایش اطلاعات Component استفاده می‌کند.
 */
interface ComponentRegistryEntry {
    /** شناسنامه Component — id, name, version, category */
    definition: Type_ComponentDefinition;
    /** Props تعریفی Component (declarative — بدون Runtime) */
    props?: Record<string, any>;
    /** Schemas تعریفی Component (declarative — part + props) */
    schemas?: Record<string, any>;
    /** Methods تعریفی Component (declarative) */
    methods?: Record<string, any>;
    /** Examples تعریفی Component (declarative — بدون Runtime) */
    examples?: Record<string, Interface_ComponentExample>;
    /** Constructor کلاس Component (برای instantiate مستقیم در آینده) */
    constructor?: ComponentConstructor;
}
/**
 * Contract برای Component Constructor
 *
 * Component باید این امضا را داشته باشد:
 *   new Component(config, methods, identity?)
 *
 * که identity شامل { unique?, emit?, events? } است.
 *
 * Note (Plan 8.1.5): این type قبلاً در ExampleRenderer تعریف می‌شد.
 * با حذف ExampleRenderer، اینجا به‌عنوان type مستقل تعریف می‌شود
 * تا ComponentManager بتواند constructor را نگه دارد.
 */
interface ComponentConstructor {
    new (config: Record<string, any>, methods: Record<string, any>, identity?: {
        unique?: any;
        emit?: any;
        events?: Record<string, any> | null;
    }): {
        getElement(): HTMLElement;
    };
}

declare namespace index$F {
  export {
    AbComponentConnector as ComponentConnector,
  };
}

declare namespace index$E {
  export type { TExtractName as ExtractName, TExtractNameAndValue as ExtractNameAndValue, TPartAttrDefault as PartAttrDefault, TTypeOf as TypeOf, TValueOf as ValueOf };
}

declare namespace index$D {
  export {
    MtSetValue as SetValue,
  };
}

declare const index$C_ComponentManager: typeof ComponentManager;
type index$C_ComponentRegistryEntry = ComponentRegistryEntry;
declare namespace index$C {
  export { index$C_ComponentManager as ComponentManager };
  export type { index$C_ComponentRegistryEntry as ComponentRegistryEntry };
}

declare namespace index$B {
  export {
    index$F as Abstract,
    index$C as Manager,
    index$D as Methods,
    index$E as Types,
  };
}

declare namespace index$A {
  export { Define_ComponentProp as Define };
  export type { Interface_ComponentProp as Interface, Type_ComponentProp as Type };
}

declare namespace index$z {
  export { Define_ComponentSchema as Define };
  export type { Interface_ComponentSchema as Interface, Type_ComponentSchema as Type };
}

declare namespace index$y {
  export { Define_ComponentTemplate as Define };
  export type { Interface_ComponentTemplate as Interface, Type_ComponentTemplate as Type };
}

declare namespace index$x {
  export { Define_ComponentMethod as Define };
  export type { Callback_ComponentMethod as Callback, Interface_ComponentMethod as Interface, Type_ComponentMethod as Type };
}

declare namespace index$w {
  export type { Interface_ComponentExample as ComponentExample };
}

declare namespace index$v {
  export type { Type_ComponentDefinition as Type };
}

declare namespace index$u {
  export type { Interface_ComponentIdentity as Interface };
}

declare namespace index$t {
  export {
    index$v as Definition,
    index$w as Example,
    index$u as Identity,
    index$x as Method,
    index$A as Prop,
    index$z as Schema,
    index$y as Template,
  };
}

type ComponentProps = Record<string, Interface_ComponentProp<any>>;
type ComponentSchemas = Record<string, Interface_ComponentSchema<any, any>>;

type index$s_ComponentConstructor = ComponentConstructor;
declare const index$s_ComponentManager: typeof ComponentManager;
type index$s_ComponentProps = ComponentProps;
type index$s_ComponentRegistryEntry = ComponentRegistryEntry;
type index$s_ComponentSchemas = ComponentSchemas;
declare namespace index$s {
  export { ClComponentBase as App, index$B as Basic, AbComponentConnector as ComponentConnector, index$s_ComponentManager as ComponentManager, Define_ComponentMethod as DefineMethod, Define_ComponentProp as DefineProp, Define_ComponentSchema as DefineSchema, Define_ComponentTemplate as DefineTemplate, MtSetValue as SetValue, index$t as Tools };
  export type { index$s_ComponentConstructor as ComponentConstructor, Type_ComponentDefinition as ComponentDefinition, Interface_ComponentExample as ComponentExample, Interface_ComponentIdentity as ComponentIdentity, Interface_ComponentProp as ComponentPropEntry, index$s_ComponentProps as ComponentProps, index$s_ComponentRegistryEntry as ComponentRegistryEntry, Interface_ComponentSchema as ComponentSchemaEntry, index$s_ComponentSchemas as ComponentSchemas, TExtractName as ExtractName, TExtractNameAndValue as ExtractNameAndValue, Callback_ComponentMethod as MethodCallback, Interface_ComponentMethod as MethodInterface, Type_ComponentMethod as MethodType, TPartAttrDefault as PartAttrDefault, Interface_ComponentProp as PropInterface, Type_ComponentProp as PropType, Interface_ComponentSchema as SchemaInterface, Type_ComponentSchema as SchemaType, Interface_ComponentTemplate as TemplateInterface, Type_ComponentTemplate as TemplateType, TTypeOf as TypeOf, TValueOf as ValueOf };
}

type TLanguageDefinition = {
    code: string;
    name: string;
    directionRtl: boolean;
};

declare namespace index$r {
  export type { TLanguageDefinition as LanguageDefinition };
}

declare const DefFa$1: TLanguageDefinition;

declare const DefEn$1: TLanguageDefinition;

declare namespace index$q {
  export {
    DefEn$1 as En,
    DefFa$1 as Fa,
  };
}

declare namespace index$p {
  export {
    index$q as Definition,
    index$r as Types,
  };
}

declare namespace index$o {
  export {
    index$N as Event,
    index$p as Language,
  };
}

interface IConfigState<T> {
    observable(): ClObservable<T>;
    get(): T;
    set(value: T): void;
}

declare class ClConfigState<T> implements IConfigState<T> {
    protected _state: ClObservable<T>;
    constructor(value: T);
    observable(): ClObservable<T>;
    get(): T;
    set(value: T): void;
}

type TConfigStateDefinition<T> = {
    name: string;
    default: T;
};

declare class ClConfigApp {
    private static _states;
    static state<T>(definition: TConfigStateDefinition<T>): ClConfigState<T>;
}

declare const StateConfigDirectionRtl: TConfigStateDefinition<boolean>;

declare const StateConfigFontName: TConfigStateDefinition<string>;

declare const StateConfigLanguage: TConfigStateDefinition<TLanguageDefinition>;

declare const MTToKebabCase: (str: string) => string;

declare const MTToNumber: (str: string) => string;

declare namespace index$n {
  export {
    MTToKebabCase as ToKebabCase,
    MTToNumber as ToNumber,
  };
}

declare const MTFromEnglishToPersian: (str: string | number, isInt?: boolean) => string | number;

declare const MTFromPersianToEnglish: (str: string | number, isInt?: boolean) => string | number;

declare namespace index$m {
  export {
    MTFromEnglishToPersian as FromEnglishToPersian,
    MTFromPersianToEnglish as FromPersianToEnglish,
  };
}

declare const MTFromPriceToString: (input: string | number) => number | null;

declare const MTFromStringToPrice: (value: string | number) => string | null;

declare namespace index$l {
  export {
    MTFromPriceToString as FromPriceToString,
    MTFromStringToPrice as FromStringToPrice,
  };
}

type TSerializeItem = {
    name: string;
    value: string;
    type?: string;
};

declare const MTToSerializeArray: (formElement: HTMLFormElement | null) => TSerializeItem[];

declare namespace index$k {
  export {
    MTToSerializeArray as ToSerializeArray,
  };
}

declare const MTToCustomSerialize: (obj: Record<string, unknown>) => string;

declare const MTToUnCustomSerialize: (input: string) => Record<string, string>;

declare namespace index$j {
  export {
    MTToCustomSerialize as ToCustomSerialize,
    MTToUnCustomSerialize as ToUnCustomSerialize,
  };
}

declare namespace index$i {
  export {
    index$k as Array,
    index$m as Number,
    index$j as Object,
    index$l as Price,
    index$n as String,
  };
}

declare const MTTimeUnixThisTime: (withTomorrow?: boolean) => number;

declare const MTTimeUnixThisYear: (isSamci?: boolean) => number;

declare namespace index$h {
  export {
    MTTimeUnixThisTime as ThisTime,
    MTTimeUnixThisYear as ThisYear,
  };
}

declare namespace index$g {
  export {
    index$h as TimeUnix,
  };
}

type TFileInfo = {
    file: File;
    size: number;
    type: string;
    name: string;
    mime: string;
    extension: string;
};

declare const MTGetInfo: (file: File, newFileName?: string | null) => TFileInfo;

declare const MTGetExtension: (filename: string) => string;

declare const MTGetIMimeType: (filename: string) => string;

declare namespace index$f {
  export {
    MTGetExtension as GetExtension,
    MTGetIMimeType as GetIMimeType,
    MTGetInfo as GetInfo,
  };
}

type TFormArray = {
    name: string;
    value: unknown;
};

declare const MTMergeMultiFormArrays: (...arrays: TFormArray[][]) => TFormArray[];

declare namespace index$e {
  export {
    MTMergeMultiFormArrays as MergeMultiFormArrays,
  };
}

declare const MTGetJsonParse: <T>(json: string) => T | null;

declare const MTGetJsonScript: <T>(scriptJsonId: string) => T | null;

declare namespace index$d {
  export {
    MTGetJsonParse as GetJsonParse,
    MTGetJsonScript as GetJsonScript,
  };
}

declare const MTGetListClass: (data?: string | string[] | null) => string;

declare const MTGetListStyles: (data?: string | Record<string, string | number> | null) => string;

declare namespace index$c {
  export {
    MTGetListClass as GetListClass,
    MTGetListStyles as GetListStyles,
  };
}

declare const MTReplaceInTextWithPattern: (template: string, params?: Record<string, unknown>, pattern?: RegExp) => string;

declare namespace index$b {
  export {
    MTReplaceInTextWithPattern as TextWithPattern,
  };
}

declare const MTCopyText: (text: string) => Promise<void>;

declare namespace index$a {
  export {
    MTCopyText as Text,
  };
}

declare namespace index$9 {
  export {
    index$e as Array,
    index$c as Attrs,
    index$a as Copy,
    index$d as Json,
    index$b as Replace,
  };
}

declare const StateConfigSizeName: TConfigStateDefinition<undefined>;

declare namespace index$8 {
  export {
    StateConfigDirectionRtl as DirectionRtl,
    StateConfigFontName as FontName,
    StateConfigLanguage as Language,
    StateConfigSizeName as SizeName,
  };
}

declare const Settings: {
    DirectionRtl: ClConfigState<boolean>;
    Language: ClConfigState<TLanguageDefinition>;
    SizeName: ClConfigState<Util.Styles.TCSizes>;
    FontName: ClConfigState<string>;
};

declare const index$7_Settings: typeof Settings;
declare namespace index$7 {
  export {
    ClConfigApp as App,
    index$7_Settings as Settings,
    index$8 as States,
  };
}

type TLanguageDictionary = Map<TBrandTranslationKey, string>;
type TLanguageDirectory = Record<string, TLanguageDictionary>;
declare class ClLanguageApp {
    private static _directory;
    private static _fallback;
    static initialize(directory: TLanguageDirectory, fallback: TLanguageDefinition): void;
    static registerDictionary(directory: TLanguageDirectory): void;
    static setLanguage(language: TLanguageDefinition): void;
    static translate(key: TBrandTranslationKey, params?: Record<string, unknown>): ClObservable<string>;
    private static _template;
}

declare const DefFa: TLanguageDefinition;

declare const DefEn: TLanguageDefinition;

declare namespace Definition {
  export {
    DefEn as En,
    DefFa as Fa,
  };
}

type TCLanguagesDefinition = typeof Definition[keyof typeof Definition];

declare namespace index$6 {
  export { ClLanguageApp as App, MTCreateTranslationKey as CreateTranslationKey, DefEn as FallbackLanguage };
  export type { TCLanguagesDefinition as TLanguagesDefinition };
}

interface ITemplate {
    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement;
    onLoad(pageElement: HTMLElement): void;
}

type TRouteData = {
    template: new () => ITemplate;
    data?: any;
    headerTitle: ClObservable<string>;
};

type TRouter = Record<string, TRouteData>;

declare class ClRouter {
    #private;
    root: HTMLElement;
    routes: TRouter;
    constructor(root: HTMLElement, routes: TRouter);
    navigate(path: string): void;
    resolve(): void;
}

type index$5_ITemplate = ITemplate;
type index$5_TRouter = TRouter;
declare namespace index$5 {
  export { ClRouter as App };
  export type { index$5_ITemplate as ITemplate, index$5_TRouter as TRouter };
}

/**
 * ClTestsPage — صفحه تست Componentها
 *
 * این صفحه به‌صورت خودکار تمام Componentهای ثبت‌شده در ComponentManager را
 * کشف می‌کند و Exampleهای آن‌ها را نمایش می‌دهد.
 *
 * هر Component جدید که در ComponentManager ثبت شود و Example داشته باشد،
 * خودش در این صفحه ظاهر می‌شود — بدون نیاز به کد دستی.
 *
 * جریان:
 *   ComponentManager.list()
 *       → برای هر entry: ComponentManager.getExamples(id)
 *       → برای هر example: example.render()  →  HTMLElement
 *       → نمایش در section اختصاصی آن Component
 */
declare class ClTestsPage implements ITemplate {
    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement;
    onLoad(pageElement: HTMLElement): void;
}

declare namespace index$4 {
  export {
    ClTestsPage as TestsPage,
  };
}

declare class ClHomePage implements ITemplate {
    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement;
    onLoad(pageElement: HTMLElement): void;
}

declare namespace index$3 {
  export {
    ClHomePage as HomePage,
  };
}

declare class ClIconPage implements ITemplate {
    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement;
    onLoad(pageElement: HTMLElement): void;
}

declare namespace index$2 {
  export {
    ClIconPage as IconPage,
  };
}

declare const CtPageMaps: TRouter;

declare namespace index$1 {
  export {
    index$3 as Home,
    index$2 as Icon,
    CtPageMaps as PageMap,
    index$4 as Tests,
  };
}

declare namespace index {
  export {
    index$L as Brand,
    index$s as ComponentBase,
    index$7 as Config,
    index$K as Consts,
    index$i as Convertor,
    index$o as Core,
    index$g as Dates,
    index$f as Files,
    index$6 as Language,
    index$O as Observable,
    index$1 as Pages,
    index$M as Reactive,
    index$5 as Route,
    index$J as Styles,
    index$9 as Tools,
    index$G as Validators,
  };
}

export { ComponentManager, index as componentManager };
export type { ComponentConstructor, ComponentRegistryEntry };
