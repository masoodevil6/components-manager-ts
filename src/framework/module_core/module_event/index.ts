// دروازه عمومی ماژول core_event (بخش ۲.۱۰ پلن اصلی)
import {ClEventDispatcher}    from "./class";
import {ClStep}               from "./class";
import {ClRequest}            from "./class";
import {ClResponse}           from "./class";
///------------------------------
import type {TStepDefinition}   from "./types";
import type {TRequestMapEntry}  from "./types";
import type {TStepInstance}     from "./types";
import type {TStepRef}          from "./types";
import type {TTraceRecord}      from "./class";

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
 * ثبت بازگشتی یک Step و همه نسل‌هایش در رجیستری App
 * مصرف داخلی — در factory Step و SubEvent
 */
function registerAll(step: ClStep): void {
    App.register(step);
    for (const [, child] of step.getChildEntries()) {
        registerAll(child);
    }
}

/**
 * factory Step — ساخت درختی با Proxy تایپ‌شده (خودکار register در App)
 * مصرف: const User = CoreEvent.Step({ children: { ... } })
 *
 * Plan 8.2.7 — registerAll بازگشتی: همه children هم در رجیستری ثبت می‌شوند
 */
export const Step = <TDef extends TStepDefinition>(definition: TDef): TStepInstance<TDef> => {
    const instance = ClStep.create(definition);
    registerAll(instance);
    return instance;
};

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
export const SubEvent = (
    parent: TStepRef,
    key:    string,
    child:  TStepRef,
): void => {
    const parentStep = parent as ClStep;
    const childStep  = child  as ClStep;

    // اتصال رسمی از طریق API عمومی ClStep
    parentStep.addChild(key, childStep);

    // ثبت همه نسل‌های child در رجیستری (child خودش قبلاً ثبت شده، ولی children شاید جدید باشند)
    registerAll(childStep);
};

/**
 * دسترسی read-only Parent → Child (Plan 8.2.7)
 *
 * مصرف:
 *   const childStep = CoreEvent.getChild(parentStep, "messages");
 */
export const getChild = (parent: TStepRef, key: string): TStepRef | null => {
    const child = (parent as ClStep).getChild(key);
    return child ?? null;
};

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
export const dispose = (step: TStepRef): void => {
    const stepInstance = step as ClStep;

    // Plan 8.2.9 — notify monitor if active
    if (_monitorActive) {
        console.group(`[CoreEvent] DISPOSE — ${stepInstance.unique || "(root)"}`);
        console.log("step:", stepInstance);
        console.groupEnd();
    }

    // ۱. جمع‌آوری همه نسل‌ها
    const descendants = stepInstance.getAllDescendants();

    // ۲. disposal هر نسل از App (رجیستری + emits)
    for (const descendant of descendants) {
        App.dispose(descendant);
    }

    // ۳. disposal خود step از App
    App.dispose(stepInstance);

    // ۴. قطع اتصال از parent (اگر دارد)
    const parent = stepInstance.getParent();
    const parentKey = stepInstance.getParentKey();
    if (parent && parentKey) {
        parent.removeChild(parentKey);
    }

    // ۵. پاک‌سازی ساختار درخت
    stepInstance.clearChildren();
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


/* ═══════════════════════════════════════════════════════════════
   Plan 8.2.9 — CoreEvent Console Inspector & Flow Monitor
   ═══════════════════════════════════════════════════════════════

   Observability Layer برای CoreEvent — projection خواندنی.
   Inspector از API عمومی استفاده می‌کند — به internals دسترسی ندارد.
   خروجی از console.group استفاده می‌کند — قابل expand در Chrome DevTools.

   پنج سؤال:
     ۱. الان چه Eventهایی وجود دارند؟  → inspect()
     ۲. چه اتفاقی افتاد؟               → trace() / trace(id)
     ۳. این Event دقیقاً کجاست؟         → find(query)
     ۴. Event Engine سالم است؟         → stats()
     ۵. همین الان چه اتفاقی می‌افتد؟    → monitor() / monitor(false)
   ═══════════════════════════════════════════════════════════════ */

/** وضعیت live monitor — توسط monitor() و monitor(false) کنترل می‌شود */
let _monitorActive = false;


/* ─────────────────────────────────────────────
   inspect() — Tree Snapshot
   ───────────────────────────────────────────── */

/**
 * درخت Event را در Console نمایش می‌دهد (Snapshot)
 *
 * مصرف:
 *   Framework.Core.Event.inspect()
 *
 * خروجی: درخت سلسله‌مراتبی با console.group — قابل expand در DevTools
 */
export const inspect = (): void => {

    const registry = App.getRegistry() as ClStep[];
    const emitCount = App.getEmitCount();

    if (registry.length === 0) {
        console.log("[CoreEvent] Tree empty — no steps registered");
        return;
    }

    // پیدا کردن rootها (parent === null)
    const roots = registry.filter(s => s.getParent() === null);

    console.group(`[CoreEvent] Tree — ${registry.length} steps, ${emitCount} emits`);
    for (const root of roots) {
        _inspectStep(root, "", true);
    }
    console.groupEnd();
};

/** بازگشتی — چاپ یک Step و زیردرختش با کاراکترهای درختی */
function _inspectStep(step: ClStep, prefix: string, isLast: boolean): void {

    const branch = isLast ? "└── " : "├── ";
    const hasEmit = App.hasEmit(step);
    const emitMark = hasEmit ? " [emit: ✓]" : "";
    const label = `${branch}${step.unique || "(root)"}${emitMark}`;

    const children = step.getChildEntries();
    const childCount = children.length;

    console.group(label);
    console.log("step:", step);

    if (childCount === 0) {
        console.groupEnd();
        return;
    }

    const childPrefix = prefix + (isLast ? "    " : "│   ");
    children.forEach(([key, child], i) => {
        const childIsLast = i === childCount - 1;
        _inspectStep(child, childPrefix, childIsLast);
    });

    console.groupEnd();
}


/* ─────────────────────────────────────────────
   trace() — Event Flow (گذشته)
   ───────────────────────────────────────────── */

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
export const trace = (dispatchId?: string): void => {

    const traceRecords = App.getTrace();

    if (traceRecords.length === 0) {
        console.log("[CoreEvent] Trace empty — no events recorded");
        return;
    }

    // فیلتر بر اساس dispatchId اگر داده شده
    const records = dispatchId
        ? traceRecords.filter(r => r.dispatchId === dispatchId)
        : traceRecords;

    if (records.length === 0) {
        console.log(`[CoreEvent] No trace record with dispatchId "${dispatchId}"`);
        return;
    }

    const header = dispatchId
        ? `[CoreEvent] Trace — ${records.length} record(s) for "${dispatchId}"`
        : `[CoreEvent] Trace — last ${records.length} of ${App.getTraceCapacity()}`;

    console.group(header);
    for (const record of records) {
        _formatTraceRecord(record);
    }
    console.groupEnd();
};

/** فرمت‌بندی یک Trace Record با console.group */
function _formatTraceRecord(record: TTraceRecord): void {

    const statusIcon = record.status === "success" ? "✓" : "✗";
    const header = `Event ${record.dispatchId} — ${record.status.toUpperCase()} ${statusIcon}`;

    console.group(header);

    // SOURCE
    console.group("SOURCE");
    if (record.source) {
        console.log("step:", record.source);
        console.log("unique:", record.source.unique);
    } else {
        console.log("(none)");
    }
    console.groupEnd();

    // TARGET
    console.group("TARGET");
    console.log("step:", record.target);
    console.log("unique:", record.target.unique);
    console.groupEnd();

    // TIMESTAMP
    console.log("timestamp:", new Date(record.timestamp).toISOString());

    // STATUS
    console.log("status:", record.status);

    console.groupEnd();
}


/* ─────────────────────────────────────────────
   find(query) — Identity Search
   ───────────────────────────────────────────── */

/**
 * جستجوی Step بر اساس unique (substring match)
 *
 * مصرف:
 *   Framework.Core.Event.find("icon")
 *   Framework.Core.Event.find("messages.message_abc")
 *
 * خروجی: لیست Stepهای منطبق با unique, identity, has emit, parent, children
 */
export const find = (query: string): void => {

    const registry = App.getRegistry() as ClStep[];

    const matches = registry.filter(s =>
        s.unique && s.unique.includes(query)
    );

    if (matches.length === 0) {
        console.log(`[CoreEvent] No steps matching "${query}"`);
        return;
    }

    console.group(`[CoreEvent] Found ${matches.length} step(s) matching "${query}"`);

    for (const step of matches) {
        const hasEmit = App.hasEmit(step);
        const parent = step.getParent();
        const parentKey = step.getParentKey();
        const children = step.getChildEntries().map(([k]) => k);

        console.group(step.unique || "(root)");
        console.log("step:", step);
        console.log("unique:", step.unique);
        console.log("identity:", step.identity);
        console.log("has emit:", hasEmit ? "✓" : "✗");
        console.log("parent:", parent ? parent.unique : "(root — no parent)");
        console.log("parentKey:", parentKey ?? "(none)");
        console.log("children:", children.length ? children : "(none)");
        console.groupEnd();
    }

    console.groupEnd();
};


/* ─────────────────────────────────────────────
   stats() — Health State
   ───────────────────────────────────────────── */

/**
 * آمار سلامت CoreEvent — سلامت‌سنج Event Engine
 *
 * مصرف:
 *   Framework.Core.Event.stats()
 *
 * خروجی: Steps, Handlers, Trace, Dispatch, Lifecycle, Integrity
 */
export const stats = (): void => {

    const registry = App.getRegistry() as ClStep[];
    const emitCount = App.getEmitCount();
    const traceRecords = App.getTrace();
    const dispatchStats = App.getDispatchStats();
    const createdCount = App.getCreatedCount();
    const disposedCount = App.getDisposedCount();

    // محاسبه roots و orphans
    let roots = 0;
    let orphans = 0;

    for (const step of registry) {
        const parent = step.getParent();
        if (parent === null) {
            roots++;
        } else {
            // بررسی integrity — آیا parent این step را می‌شناسد؟
            const parentKey = step.getParentKey();
            if (parentKey) {
                const childInParent = parent.getChild(parentKey);
                if (childInParent !== step) {
                    orphans++;
                }
            } else {
                orphans++;
            }
        }
    }

    const children = registry.length - roots;

    console.group("[CoreEvent] Stats");

    console.group("Steps");
    console.log("total:", registry.length);
    console.log("roots:", roots);
    console.log("children:", children);
    console.groupEnd();

    console.group("Handlers");
    console.log("emits:", emitCount);
    console.groupEnd();

    console.group("Trace");
    console.log("recorded:", traceRecords.length);
    console.log("capacity:", App.getTraceCapacity());
    console.groupEnd();

    console.group("Dispatch");
    console.log("success:", dispatchStats.success);
    console.log("errors:", dispatchStats.errors);
    console.groupEnd();

    console.group("Lifecycle");
    console.log("created:", createdCount);
    console.log("disposed:", disposedCount);
    console.groupEnd();

    console.group("Integrity");
    console.log("roots:", roots, "(طبیعی — parent === null)");
    console.log("orphans:", orphans, orphans > 0 ? "(⚠ مشکل — relationship خراب)" : "(سالم)");
    console.groupEnd();

    console.groupEnd();
};


/* ─────────────────────────────────────────────
   monitor() — Live Stream
   ───────────────────────────────────────────── */

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
export const monitor = (enabled: boolean = true): void => {

    _monitorActive = enabled;

    if (enabled) {
        App.monitor((record) => {
            if (!_monitorActive) return;

            const statusIcon = record.status === "success" ? "✓" : "✗";

            console.group(`[CoreEvent] ${record.status.toUpperCase()} ${statusIcon} — ${record.dispatchId}`);
            console.log("source:", record.source ?? "(none)");
            console.log("target:", record.target);
            console.log("timestamp:", new Date(record.timestamp).toISOString());
            console.groupEnd();
        });
        console.log("[CoreEvent] monitor ON — live logging enabled");
    } else {
        // detach callback
        App.monitor(() => {});
        console.log("[CoreEvent] monitor OFF — live logging disabled");
    }
};
