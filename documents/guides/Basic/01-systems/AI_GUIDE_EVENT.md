# AI Guide: Event

> **Audience:** همه AIهایی که با سیستم رویدادهای داخلی Framework کار می‌کنند.
>
> **Purpose:** مرجع کامل سیستم CoreEvent — Step، Request، Response، Dispatcher و اتصال المان‌ها.
>
> **Level:** پایه — قبل از کار با Component یا Workflow خوانده شود.
>
> **Status:** Official

---

## 1. Definition

**Event** (CoreEvent) سیستم رویدادهای داخلی Framework برای ارتباط بین Stepها و المان‌هاست. این سیستم مبتنی بر الگوی Request/Response است (نه Event Emitter ساده) و شامل رجیستری Stepها، emit handlerها و مسیریابی Request به Response می‌شود.

ماژول اصلی: `module_core/module_event` در `src/framework/module_core/module_event/`.

از طریق دروژه عمومی `core_event` در دسترس است:

```typescript
import * as CoreEvent from "@/core_event";

const Steps = CoreEvent.Step({ children: { ... } });
const responses = CoreEvent.App.request(map, source?);
```

> برای تعریف رسمی اصطلاحات به [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 2. Responsibilities

- ثبت و مدیریت رجیستری Stepها (`registry`)
- ثبت و مدیریت emit handlerهای المان‌های متصل (`emits`)
- مسیریابی Request → Response با ترتیب deterministic
- مدیریت خطای emit بدون crash کردن Runtime
- جمع‌آوری Trace رکوردها برای دیباگ
- پاک‌سازی رجیستری برای جلوگیری از memory leak

---

## 3. Concepts

### 3.1 Step

**Step** واحد هویت در سیستم Event است. هر Step دارای:

| فیلد | نوع | توضیح |
|:---|:---|:---|
| `identity` | `symbol` | هویت یکتا و غیرقابل جعل |
| `unique` | `string` | مسیر خوانا برای debug/logging |

> **Plan 8.2.7:** `children` از بیرون قابل mutate نیست — encapsulated است.
> فقط از طریق API عمومی (`addChild`, `removeChild`, `getChild`, `getChildEntries`) قابل دسترسی است.

Stepها با factory `CoreEvent.Step(definition)` ساخته می‌شوند و به‌صورت خودکار در `App.register` ثبت می‌گردند. ساختار درختی با `children` امکان دسترسی نوع‌ایمن (type-safe) به فرزندان را از طریق Proxy فراهم می‌کند.

#### SubEvent (Plan 8.2.7)

`SubEvent` رابط رسمی اتصال Child Step به Parent Step است:

```typescript
CoreEvent.SubEvent(parentStep, "messages", childStep);
```

قرارداد:
- Parent و Child هر دو Step ساخته‌شده هستند.
- Child به‌عنوان فرزند با `key` مشخص به Parent متصل می‌شود.
- همه نسل‌های Child در رجیستری App ثبت می‌شوند.
- هیچ لایه‌ای مستقیماً `children` را mutate نمی‌کند — فقط از طریق این API.

#### Disposal بازگشتی (Plan 8.2.7)

`CoreEvent.dispose(step)` کل subtree را پاک می‌کند:

1. همه نسل‌ها از App (رجیستری + emits) پاک می‌شوند.
2. خود step از App پاک می‌شود.
3. اگر step دارای parent است، از parent قطع می‌شود.
4. ساختار درخت پاک می‌شود (`clearChildren`).

#### ClStep API عمومی (Plan 8.2.7)

| متد | توضیح |
|:---|:---|
| `addChild(key, child)` | اتصال رسمی یک Child Step |
| `getChild(key)` | دسترسی read-only به child |
| `removeChild(key)` | قطع اتصال یک child |
| `getChildEntries()` | لیست همه children |
| `getParent()` | parent این step |
| `getParentKey()` | کلید این step در parent |
| `getAllDescendants()` | جمع‌آوری همه نسل‌ها (بازگشتی) |
| `clearChildren()` | پاک‌سازی کل subtree |

### 3.2 TStepRef

نوع کمینه مشترک بین `ClStep` و Proxy خروجی factory:

```typescript
type TStepRef = {
    readonly identity: symbol;
    readonly unique: string;
};
```

Dispatcher فقط به `identity` نیاز دارد — نه به ساختار کامل کلاس.

### 3.3 Request و Dispatch

| مفهوم | توضیح |
|:---|:---|
| **Request منطقی** | یک فراخوانی `App.request(map)` — دارای یک `requestId` واحد |
| **Dispatch** | اجرای یک [Step, payload] از requestMap — دارای `dispatchId` مستقل |

یک Request منطقی می‌تواند چندین Dispatch داشته باشد:

```
Request #100  (یک event.request)
   ├── Dispatch #100.1 → Target A
   └── Dispatch #100.2 → Target B
```

### 3.4 Response

هر Dispatch یک Response تولید می‌کند:

| فیلد | نوع | توضیح |
|:---|:---|:---|
| `requestId` | `string` | شناسه Request منطقی والد |
| `dispatchId` | `string` | شناسه Dispatch این Target |
| `source` | `TStepRef?` | Step آغازگر Request (اختیاری) |
| `target` | `TStepRef?` | Step هدف این Response |
| `value` | `any` | خروجی emit handler |
| `status` | `"success" \| "error"` | وضعیت اجرا |
| `error` | `any?` | در صورت خطا |
| `timestamp` | `number` | زمان تولید |
| `metadata` | `Record?` | داده الحاقی اختیاری |

### 3.5 Trace

Dispatcher رکوردهای Trace را برای دیباگ جمع‌آوری می‌کند. هر رکورد شامل `requestId`, `dispatchId`, `source`, `target`, `status`, `timestamp` است. سقف Trace برابر `TRACE_LIMIT = 100` است و رکوردهای قدیمی با `shift` حذف می‌شوند.

### 3.6 requestMap

`requestMap` یک helper ساده است که آرایه دوتایی `[Step, payload]` را به‌عنوان آرایه برمی‌گرداند. استفاده از آرایه دوتایی به‌جای کلید آبجکت، مشکل `String()` شدن کلیدها در JavaScript را حل می‌کند (Symbolها با کلید آبجکت از دست می‌روند).

```typescript
export const requestMap = (entries: readonly TRequestMapEntry[]) => entries;
```

---

## 4. Architecture

```
module_event
├── ClEventDispatcher (singleton: App)
│       ├── registry: Map<symbol, TStepRef>       — رجیستری Stepها
│       ├── emits: Map<symbol, TEmitHandler>       — رجیستری emit handlerها
│       ├── _trace: TTraceRecord[]                 — بافر Trace
│       ├── _monitor: ((record) => void) | null    — hook مانیتورینگ
│       │
│       ├── register(step)                         — ثبت Step
│       ├── registerEmit(step, handler)            — ثبت emit handler
│       ├── request(map, source?) → TResponseMap   — اجرای requestMap
│       ├── monitor(callback)                      — اتصال Monitor
│       ├── getTrace() → TTraceRecord[]            — خواندن Trace
│       └── dispose(step)                          — پاک‌سازی رجیستری
│
├── ClStep
│       ├── identity: symbol
│       ├── unique: string
│       ├── (children: encapsulated — Plan 8.2.7)
│       ├── addChild(key, child)                   — اتصال رسمی Child (Plan 8.2.7)
│       ├── getChild(key)                          — دسترسی read-only
│       ├── removeChild(key)                       — قطع اتصال
│       ├── getChildEntries()                      — لیست children
│       ├── getParent() / getParentKey()           — parent linkage
│       ├── getAllDescendants()                    — جمع‌آوری نسل‌ها
│       ├── clearChildren()                        — پاک‌سازی subtree
│       └── static create(definition, path?)       — ساخت درختی با Proxy
│
├── ClRequest
│       ├── requestId: string                      — شناسه Request منطقی
│       ├── dispatchId: string                     — شناسه Dispatch
│       ├── target: TStepRef?                      — Step هدف
│       ├── source: TStepRef?                      — Step آغازگر
│       └── payload: Record<string, any>           — داده Request
│
├── ClResponse
│       ├── requestId, dispatchId, source, target
│       ├── value, status, error, timestamp, metadata
│       └── constructor(target, requestId, value, options?)
│
└── Factories & Helpers (index.ts)
        ├── Step(definition) → TStepInstance       — factory + auto-register
        ├── Request() → ClRequest                  — factory
        ├── Response(value?) → ClResponse          — factory
        ├── requestMap(entries) → entries           — helper
        ├── SubEvent(parent, key, child)           — اتصال Child به Parent (Plan 8.2.7)
        ├── getChild(parent, key)                  — دسترسی read-only (Plan 8.2.7)
        ├── dispose(step)                          — disposal بازگشتی (Plan 8.2.7)
        ├── inspect()                              — Tree Snapshot در Console (Plan 8.2.9)
        ├── trace() / trace(id)                    — Event Flow در Console (Plan 8.2.9)
        ├── find(query)                            — Identity Search (Plan 8.2.9)
        ├── stats()                                — Health State (Plan 8.2.9)
        └── monitor() / monitor(false)             — Live Stream toggle (Plan 8.2.9)
```

---

## 5. Rules

> تعریف رسمی سطوح MUST / MUST NOT / SHOULD / SHOULD NOT / MAY در [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) آمده است.

### MUST

**R-EVT-01:** Stepها **باید** با factory `CoreEvent.Step(definition)` ساخته شوند — نه با `new ClStep`. factory به‌صورت خودکار Step را در `App.register` ثبت می‌کند.

```typescript
// ✅ Correct — auto-register
const Steps = CoreEvent.Step({
    children: { save: {}, load: {} },
});

// ❌ Incorrect — بدون ثبت در رجیستری
const step = new ClStep("myStep");
```

**R-EVT-02:** برای ارسال Request **باید** از `requestMap` helper استفاده شود — نه از کلید آبجکت.

```typescript
// ✅ Correct — آرایه دوتایی
const map = CoreEvent.requestMap([
    [Steps.save, { id: 1 }],
    [Steps.load, { limit: 10 }],
]);

// ❌ Incorrect — کلید آبجکت Symbol را از دست می‌دهد
const map = { [Steps.save]: { id: 1 } };
```

### MUST NOT

**R-EVT-03:** emit handler مستقیماً در `emits` Map ثبت نشود — از `registerEmit` یا گزینه‌های `unique`/`emit` در `ClReactiveElement` استفاده شود.

### SHOULD

**R-EVT-04:** برای event handlerها در `ClReactiveElement`، از `event.request(map)` (تزریق‌شده در پارامتر دوم) استفاده شود — نه از `CoreEvent.App.request` مستقیم.

```typescript
// ✅ Recommended — helper تزریق‌شده
on: {
    click: (e, event) => {
        event.request(CoreEvent.requestMap([[Steps.save, payload]]));
    },
}
```

### MAY

**R-EVT-05:** از `App.monitor(callback)` برای اتصال یک تابع مانیتورینگ به Trace استفاده شود. هر رکورد Trace جدید به callback پاس داده می‌شود.

**R-EVT-06:** از `App.getTrace()` برای خواندن بافر Trace فعلی استفاده شود.

---

## 6. Lifecycle

### 6.1 Step Lifecycle

```
CoreEvent.Step(definition)
    │
    ├── ClStep.create(definition, path)
    │       ├── ساخت ClStep با Symbol(unique)
    │       ├── ساخت بازگشتی children
    │       └── ساخت Proxy (دسترسی type-safe به children)
    │
    ├── App.register(instance)
    │       └── registry.set(identity, step)
    │
    └── (در صورت اتصال به المان)
            ├── ClReactiveElement با unique + emit
            │       └── App.registerEmit(unique, emit)
            │
            └── element.remove()
                    └── App.dispose(unique)  — پاک‌سازی رجیستری
```

### 6.2 Request/Response Lifecycle

```
App.request(map, source?)
    │
    ├── تولید requestId واحد (Date + counter)
    │
    ├── برای هر [step, payload] در map:
    │       ├── ساخت ClRequest (target, payload, requestId, source)
    │       │       └── dispatchId مستقل تولید می‌شود
    │       ├── جستجوی emit handler در emits Map
    │       ├── اگر handler موجود:
    │       │       ├── اجرای handler(request) در try/catch
    │       │       ├── موفقیت → Response با status: "success"
    │       │       └── خطا → Response با status: "error" (بدون crash)
    │       ├── اگر handler نبود:
    │       │       └── Response پیش‌فرض success خالی
    │       ├── ثبت Trace record
    │       └── ذخیره Response در TResponseMap
    │
    └── return TResponseMap (Map<Step, Response>)
```

---

## 7. API / Contract

### 7.1 Factory: `Step(definition)`

```typescript
export const Step = <TDef extends TStepDefinition>(definition: TDef): TStepInstance<TDef>
```

یک درخت Step با Proxy type-safe می‌سازد و در `App` ثبت می‌کند. `definition` شامل `children` (اختیاری) است.

```typescript
const User = CoreEvent.Step({
    children: {
        profile: {
            children: {
                update: {},
                fetch: {},
            },
        },
        settings: {},
    },
});

// دسترسی type-safe:
User.profile.update  // ✅ ClStep
User.profile.invalid // ❌ خطای runtime: کلید موجود نیست
```

### 7.2 Factory: `Request()` و `Response(value?)`

```typescript
export const Request = () => new ClRequest();
export const Response = (value: any = null) => new ClResponse({} as any, "", value);
```

برای تعریف اعلانی در `TStepDefinition` استفاده می‌شوند.

### 7.3 Helper: `requestMap(entries)`

```typescript
export const requestMap = (entries: readonly TRequestMapEntry[]) => entries;
```

آرایه دوتایی `[Step, payload]` را به‌عنوان `TRequestMap` برمی‌گرداند.

### 7.4 `App.request(map, source?): TResponseMap`

اجرای requestMap. یک `requestId` واحد تولید می‌کند، به ازای هر entry یک Dispatch مستقل می‌سازد، و `TResponseMap` (Map<Step, Response>) برمی‌گرداند.

### 7.5 `App.register(step): void`

ثبت Step در رجیستری. به‌صورت خودکار در factory `Step` فراخوانی می‌شود.

### 7.6 `App.registerEmit(step, handler): void`

ثبت emit handler برای یک المان متصل. ابتدا Step را در رجیستری ثبت می‌کند و سپس handler را در `emits` Map ذخیره می‌کند.

### 7.7 `App.dispose(step): void` (Plan 8.2.7 — بازگشتی)

حذف Step و کل subtree آن از رجیستری‌ها. **Disposal بازگشتی**:

1. همه نسل‌ها از App (رجیستری + emits) پاک می‌شوند.
2. خود step از App پاک می‌شود.
3. اگر step دارای parent است، از parent قطع می‌شود.
4. ساختار درخت پاک می‌شود (`clearChildren`).

برای جلوگیری از memory leak در زمان `remove()` المان.

### 7.8 `SubEvent(parent, key, child): void` (Plan 8.2.7)

رابط رسمی اتصال Child Step به Parent Step. تنها راه mutate ساختار درخت Step.

```typescript
CoreEvent.SubEvent(parentStep, "messages", childStep);
```

### 7.9 `getChild(parent, key): TStepRef | null` (Plan 8.2.7)

دسترسی read-only به child یک Step.

### 7.10 `App.monitor(callback): void`

اتصال یک تابع مانیتورینگ. هر رکورد Trace جدید به callback پاس داده می‌شود.

### 7.11 `App.getTrace(): readonly TTraceRecord[]`

خواندن بافر Trace فعلی.

### 7.12 Console Inspector (Plan 8.2.9)

| تابع | توضیح |
|:---|:---|
| `inspect()` | درخت Event را در Console نمایش می‌دهد (Tree Snapshot) |
| `trace()` | جریان اخیر Event را در Console نمایش می‌دهد |
| `trace(dispatchId)` | یک Event خاص با dispatchId مشخص را نمایش می‌دهد |
| `find(query)` | جستجوی Step بر اساس `unique` (substring match) |
| `stats()` | آمار سلامت CoreEvent — Steps, Handlers, Trace, Dispatch, Lifecycle, Integrity |
| `monitor()` | فعال‌کردن live logging در Console |
| `monitor(false)` | خاموش‌کردن live logging |

> **دسترسی در Console مرورگر:** `Framework.Core.Event.inspect()` و سایر توابع.
> مستندات کامل: [../../inspectors/event-inspector.md](../../inspectors/event-inspector.md)

### 7.13 TEmitHandler

```typescript
export type TEmitHandler = (request: ClRequest) => any;
```

تابع handler که Request دریافت و Response تولید می‌کند. خروجی آن در `Response.value` قرار می‌گیرد.

### 7.14 TEventHelper

```typescript
export type TEventHelper = {
    request: (map: TRequestMap, source?: TStepRef) => TResponseMap;
};
```

به پارامتر دوم handlerهای `on` در `ClReactiveElement` تزریق می‌شود.

---

## 8. Examples

### 8.1 تعریف درخت Step

```typescript
import * as CoreEvent from "@/core_event";

const Steps = CoreEvent.Step({
    children: {
        user: {
            children: {
                login: {},
                logout: {},
                fetch: {},
            },
        },
        notification: {
            children: {
                show: {},
                clear: {},
            },
        },
    },
});

// دسترسی:
// Steps.user.login    → ClStep (identity: Symbol("user.login"))
// Steps.user.logout   → ClStep (identity: Symbol("user.logout"))
// Steps.notification.show → ClStep
```

### 8.2 ارسال Request

```typescript
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [Steps.user.login, { username: "admin", password: "123" }],
    ]),
    Steps.user  // source — برای trace
);

const loginResponse = responses.get(Steps.user.login);
if (loginResponse.status === "success") {
    console.log("ورود موفق:", loginResponse.value);
} else {
    console.error("خطا:", loginResponse.error);
}
```

### 8.3 ارسال چندگانه (multi-target)

```typescript
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [Steps.user.fetch, { id: 1 }],
        [Steps.notification.show, { message: "خوش آمدید" }],
    ])
);

// هر دو به ترتیب اجرا می‌شوند (deterministic)
// responses.get(Steps.user.fetch)       → Response
// responses.get(Steps.notification.show) → Response
```

### 8.4 اتصال المان به Step با emit

```typescript
const toggleButton = CoreReactive.App.button({
    children: "تغییر",
    unique: Steps.notification.show,
    emit: (request) => {
        // این handler با request به Steps.notification.show فراخوانی می‌شود
        const message = request.payload.message;
        showNotification(message);
        return { shown: true };
    },
});

// ارسال Request از جای دیگر:
CoreEvent.App.request(
    CoreEvent.requestMap([
        [Steps.notification.show, { message: "پیام جدید" }],
    ])
);
```

### 8.5 استفاده از event.request در ReactiveElement

```typescript
CoreReactive.App.button({
    children: "ذخیره",
    on: {
        click: (e, event) => {
            const responses = event.request(
                CoreEvent.requestMap([
                    [Steps.user.login, { username: "admin", password: "123" }],
                ]),
                Steps.user  // source
            );
        },
    },
});
```

### 8.6 خواندن Trace

```typescript
const trace = CoreEvent.App.getTrace();
trace.forEach(record => {
    console.log(
        `[${record.timestamp}] ${record.source?.unique ?? "—"} → ${record.target.unique}`,
        `status: ${record.status}`
    );
});
```

### 8.7 اتصال Monitor

```typescript
CoreEvent.App.monitor((record) => {
    if (record.status === "error") {
        console.error("Dispatch خطا:", record.target.unique, record);
    }
});
```

---

## 9. Anti-Patterns

### ❌ ساخت Step با `new ClStep` به‌جای factory

```typescript
// ❌ Incorrect — ثبت خودکار در رجیستری انجام نمی‌شود
const step = new ClStep("myStep");
// App.request با این step کار نمی‌کند — در رجیستری نیست
```

```typescript
// ✅ Correct — factory خودکار ثبت می‌کند
const Steps = CoreEvent.Step({ children: { myStep: {} } });
```

### ❌ استفاده از کلید آبجکت به‌جای requestMap

```typescript
// ❌ Incorrect — Symbol در کلید آبجکت به String تبدیل می‌شود
const map = {
    [Steps.save]: { id: 1 },
};
// map["Symbol(save)"] → کار نمی‌کند
```

```typescript
// ✅ Correct — آرایه دوتایی
const map = CoreEvent.requestMap([
    [Steps.save, { id: 1 }],
]);
```

### ❌ فراموش کردن dispose المان متصل

```typescript
// ❌ Incorrect — emit handler در رجیستری باقی می‌ماند
const el = CoreReactive.App.button({
    unique: Steps.action,
    emit: handler,
});
// بعداً فقط el.element.remove() → leak
```

```typescript
// ✅ Correct — remove() هم DOM و هم emit handler را پاک می‌کند
el.remove();
// یا دستی:
CoreEvent.App.dispose(Steps.action);
```

### ❌ دسترسی به child ناموجود Step

```typescript
// ❌ Incorrect — خطای runtime با پیام واضح
const Steps = CoreEvent.Step({ children: { save: {} } });
Steps.load;  // Error: Step "" کلید/فرزندی با نام "load" ندارد
```

```typescript
// ✅ Correct — کلید موجود
Steps.save;  // ✅ ClStep
```

### ❌ mutate مستقیم children (Plan 8.2.7)

```typescript
// ❌ Incorrect — children encapsulated است
step.children["newChild"] = childStep;  // ممنوع
delete step.children["oldChild"];       // ممنوع
```

```typescript
// ✅ Correct — از API رسمی SubEvent استفاده کن
CoreEvent.SubEvent(parentStep, "newChild", childStep);
CoreEvent.removeChild(parentStep, "oldChild");
```

### ❌ dispose غیربازگشتی (Plan 8.2.7)

```typescript
// ❌ Incorrect — فقط root پاک می‌شود، children leak می‌کنند
CoreEvent.App.dispose(rootStep);  // قدیمی — فقط خود step
// children در رجیستری باقی می‌مانند
```

```typescript
// ✅ Correct — dispose بازگشتی کل subtree را پاک می‌کند
CoreEvent.dispose(rootStep);  // Plan 8.2.7 — کل subtree
```

---

## 10. Dependencies

| وابستگی | جهت | توضیح |
|:---|:---|:---|
| `ClReactiveElement` | Reactive → Event | `unique` و `emit` برای اتصال المان به Step system؛ `on` handlerها از `event.request` استفاده می‌کنند |
| `ClObservable` | مستقل | Event مستقل از Observable عمل می‌کند |

---

## 11. AI Instructions

1. قبل از استفاده از Event، [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) بخش Event/Step/Request/Response را بخوان.
2. Stepها همیشه با `CoreEvent.Step(definition)` ساخته شوند — نه با `new ClStep`.
3. برای ارسال Request همیشه از `requestMap([[step, payload], ...])` استفاده کن.
4. emit handlerها از طریق `ClReactiveElement` (گزینه‌های `unique`/`emit`) یا `App.registerEmit` ثبت شوند.
5. المان‌های متصل به Step را با `remove()` پاک کن — نه فقط `element.remove()`.
6. برای دیباگ از `App.getTrace()` یا `App.monitor(callback)` استفاده کن.
7. خطای emit به‌صورت خودکار مدیریت می‌شود — Runtime crash نمی‌کند. اما `status: "error"` را در Response بررسی کن.
8. برای جزئیات جریان اجرا به [AI_GUIDE_WORKFLOW.md](./AI_GUIDE_WORKFLOW.md) مراجعه کن.
9. **(Plan 8.2.7)** برای اتصال Child Step به Parent، از `CoreEvent.SubEvent(parent, key, child)` استفاده کن — نه mutate مستقیم `children`.
10. **(Plan 8.2.7)** برای dispose، از `CoreEvent.dispose(step)` استفاده کن — بازگشتی کل subtree را پاک می‌کند.
11. **(Plan 8.2.9)** برای دیباگ در Console مرورگر، از `Framework.Core.Event.inspect()` / `trace()` / `find()` / `stats()` / `monitor()` استفاده کن.

---

## 12. Related Guides

- [AI_GUIDE_WORKFLOW.md](./AI_GUIDE_WORKFLOW.md) — جریان اجرای Event و Request/Response lifecycle
- [AI_GUIDE_REACTIVE.md](./AI_GUIDE_REACTIVE.md) — سیستم رندر واکنشی و اتصال به Event
- [AI_GUIDE_OBSERVABLE.md](./AI_GUIDE_OBSERVABLE.md) — سیستم Observable
- [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [../../inspectors/event-inspector.md](../../inspectors/event-inspector.md) — Console Inspector & Flow Monitor (Plan 8.2.9)

---

## 13. Source References

| مفهوم | فایل سورس | خط |
|:---|:---|:---|
| `ClEventDispatcher` | `src/framework/module_core/module_event/class/ClEventDispatcher.ts` | 37-170 |
| `TStepRef` | همان فایل | 12 |
| `TTraceRecord` | همان فایل | 18-25 |
| `registry` / `emits` / `_trace` | همان فایل | 40-50 |
| `register` | همان فایل | 59-61 |
| `registerEmit` | همان فایل | 67-70 |
| `request` | همان فایل | 80-133 |
| `monitor` / `getTrace` / `_pushTrace` | همان فایل | 136-157 |
| `dispose` | همان فایل | 160-163 |
| `ClStep` | `src/framework/module_core/module_event/class/ClStep.ts` | 10-56 |
| `ClRequest` | `src/framework/module_core/module_event/class/ClRequest.ts` | 13-47 |
| `ClResponse` | `src/framework/module_core/module_event/class/ClResponse.ts` | 18-53 |
| Factories (`Step`, `Request`, `Response`, `requestMap`, `App`) | `src/framework/module_core/module_event/index.ts` | 1-52 |
| `TStepDefinition` | `src/framework/module_core/module_event/types/TStepDefinition.ts` | 10-13 |
| `TStepInstance` / `TStepRef` | `src/framework/module_core/module_event/types/TStepInstance.ts` | 8-37 |
| `TRequestMap` / `TRequestMapEntry` | `src/framework/module_core/module_event/types/TRequestMap.ts` | 6 |
| `TResponseMap` | `src/framework/module_core/module_event/types/TResponseMap.ts` | 5 |
| `TEmitHandler` | `src/framework/module_core/module_event/types/TEmitHandler.ts` | 16 |
| `TEventHelper` | `src/framework/module_core/module_event/types/TEventHelper.ts` | 13-14 |
| `SubEvent` / `getChild` / `dispose` (Plan 8.2.7) | `src/framework/module_core/module_event/index.ts` | — |
| `ClStep` API (`addChild`, `removeChild`, `getParent`, ...) | `src/framework/module_core/module_event/class/ClStep.ts` | — |
| Inspector (`inspect`, `trace`, `find`, `stats`, `monitor`) (Plan 8.2.9) | `src/framework/module_core/module_event/index.ts` | — |

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.2.7 (SubEvent) + Plan 8.2.9 (Console Inspector)*
