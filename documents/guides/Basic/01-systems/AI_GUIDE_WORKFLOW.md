# AI Guide: Workflow

> **Audience:** همه AIهایی که با سیستم رویدادهای داخلی Framework کار می‌کنند.
>
> **Purpose:** مرجع مفهومی جریان اجرای Event — از تعریف requestMap تا تولید Response.
>
> **Level:** پایه — بعد از [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) خوانده شود.
>
> **Status:** Official

---

## 1. Definition

**Workflow** مفهوم جریان اجرای یک Request در سیستم CoreEvent است. یک Workflow از تعریف `requestMap` شروع می‌شود، با `App.request` اجرا می‌گردد، به ازای هر target یک Dispatch مستقل می‌سازد، و در نهایت Responseها را جمع‌آوری می‌کند.

این Guide مفهومی است و جزئیات API (Step، Request، Response، Dispatcher) را تکرار نمی‌کند — برای آن‌ها به [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) مراجعه کنید.

> برای تعریف رسمی اصطلاحات به [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 2. Responsibilities

- توضیح ساختار `requestMap` و نحوه تعریف آن
- توضیح تفکیک Request منطقی از Dispatch داخلی
- توضیح چرخه حیات Request/Response
- توضیح ترتیب اجرای deterministic
- توضیح مدیریت خطا در سطح emit
- توضیح سیستم Trace برای دیباگ

---

## 3. Concepts

### 3.1 requestMap

`requestMap` ساختار داده ورودی Workflow است. یک آرایه دوتایی از `[Step, payload]` است:

```typescript
type TRequestMapEntry = readonly [TStepRef, Record<string, any>];
type TRequestMap = readonly TRequestMapEntry[];
```

استفاده از آرایه دوتایی به‌جای کلید آبجکت ضروری است زیرا `Symbol` (هویت Step) در کلید آبجکت JavaScript به `String` تبدیل می‌شود و هویت واقعی از دست می‌رود.

```typescript
// ✅ Correct — آرایه دوتایی
const map = CoreEvent.requestMap([
    [Steps.user.login, { username: "admin" }],
    [Steps.notification.show, { message: "سلام" }],
]);

// ❌ Incorrect — Symbol در کلید آبجکت از بین می‌رود
const map = { [Steps.user.login]: { username: "admin" } };
```

### 3.2 Request منطقی vs Dispatch

| مفهوم | شناسه | توضیح |
|:---|:---|:---|
| **Request منطقی** | `requestId` | یک فراخوانی `App.request(map)` — واحد |
| **Dispatch** | `dispatchId` | اجرای یک `[Step, payload]` از requestMap — مستقل |

یک Request منطقی می‌تواند چندین Dispatch داشته باشد:

```
Request #100  (یک App.request)
   ├── Dispatch #100.1 → Target A (Steps.user.login)
   └── Dispatch #100.2 → Target B (Steps.notification.show)
```

هر Dispatch یک `ClRequest` مستقل با `dispatchId` یکتا می‌سازد، اما همه آن‌ها `requestId` والد را به اشتراک می‌گذارند. این تفکیک امکان ردیابی هر Dispatch به‌صورت مستقل در Trace را فراهم می‌کند.

### 3.3 ترتیب اجرای Deterministic

ترتیب اجرای Dispatchها **دeterministic** است — به ترتیب تعریف در `requestMap` اجرا می‌شوند. این رفتار در `ClEventDispatcher.request` با `map.forEach` تضمین می‌شود.

```typescript
// ترتیب اجرا: 1) login  2) show  3) log
const map = CoreEvent.requestMap([
    [Steps.user.login, {}],       // اول
    [Steps.notification.show, {}], // دوم
    [Steps.audit.log, {}],         // سوم
]);
```

### 3.4 ساختار درخت Step

Stepها ساختار درختی دارند. هر Step می‌تواند `children` داشته باشد و مسیر `unique` به‌صورت `parent.child` ساخته می‌شود:

```
User (root)
├── profile
│   ├── update    → unique: "user.profile.update"
│   └── fetch     → unique: "user.profile.fetch"
└── settings
    ├── save      → unique: "user.settings.save"
    └── reset     → unique: "user.settings.reset"
```

دسترسی به فرزندان از طریق Proxy type-safe است — کلید ناموجود خطای واضح می‌دهد (نه `undefined` خاموش).

### 3.5 Trace

Dispatcher رکوردهای Trace را برای دیباگ جمع‌آوری می‌کند. هر رکورد:

```typescript
type TTraceRecord = {
    requestId: string;      // شناسه Request منطقی والد
    dispatchId: string;     // شناسه Dispatch این Target
    source?: TStepRef;      // Step آغازگر (اختیاری)
    target: TStepRef;       // Step هدف
    status: "success" | "error";
    timestamp: number;
};
```

بافر Trace محدود به `TRACE_LIMIT = 100` رکورد است. رکوردهای قدیمی با `shift` حذف می‌شوند. اگر Monitor متصل باشد، هر رکورد جدید به callback پاس داده می‌شود.

---

## 4. Architecture

### 4.1 جریان اجرای کامل

```
┌─────────────────────────────────────────────┐
│  1. تعریف requestMap                        │
│     requestMap([[stepA, payloadA],           │
│                 [stepB, payloadB]])          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  2. App.request(map, source?)               │
│     ├── تولید requestId واحد                 │
│     └── برای هر [step, payload]:             │
│         ├── ساخت ClRequest (dispatchId)      │
│         ├── جستجوی emit handler              │
│         ├── اجرای handler در try/catch       │
│         │   ├── موفقیت → Response(success)   │
│         │   └── خطا   → Response(error)      │
│         ├── ثبت Trace record                 │
│         └── ذخیره در TResponseMap            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  3. خروجی: TResponseMap                     │
│     Map<Step, Response>                     │
│     ├── responses.get(stepA) → Response     │
│     └── responses.get(stepB) → Response     │
└─────────────────────────────────────────────┘
```

### 4.2 مدل مفهومی Request → Dispatch

```
event.request(map, source?)
         │
         ├── requestId: "lx2k-0"  (واحد برای کل فراخوانی)
         │
         ├── [stepA, payloadA]
         │     ├── ClRequest { requestId: "lx2k-0", dispatchId: "lx2k-0.0", target: stepA, ... }
         │     ├── emit handler execution
         │     ├── Trace record
         │     └── ClResponse { requestId: "lx2k-0", dispatchId: "lx2k-0.0", target: stepA, status: "success" }
         │
         └── [stepB, payloadB]
               ├── ClRequest { requestId: "lx2k-0", dispatchId: "lx2k-0.1", target: stepB, ... }
               ├── emit handler execution
               ├── Trace record
               └── ClResponse { requestId: "lx2k-0", dispatchId: "lx2k-0.1", target: stepB, status: "success" }
```

---

## 5. Rules

> تعریف رسمی سطوح MUST / MUST NOT / SHOULD / SHOULD NOT / MAY در [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) آمده است.
> قوانین API در [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) بخش ۵ آمده است.

### MUST

**R-WF-01:** ترتیب entryهای `requestMap` **باید** معنادار باشد — اجرا به همین ترتیب انجام می‌شود. اگر وابستگی بین targetها وجود دارد، ترتیب را طوری تنظیم کن که target وابسته بعد از target وابستگی‌دهنده اجرا شود.

### SHOULD

**R-WF-02:** در `App.request(map, source?)`، پارامتر `source` **باید** برای ردیابی در Trace تنظیم شود. این کار امکان دیباگ بهتر را فراهم می‌کند.

```typescript
// ✅ Recommended — source برای trace
const responses = CoreEvent.App.request(map, Steps.user);

// ⚠️ Works but loses trace source
const responses = CoreEvent.App.request(map);
```

### SHOULD NOT

**R-WF-03:** نباید به ترتیب اجرای همگمان (synchronous) برای منطق async تکیه کرد. Runtime فعلی sync است؛ اگر emit handler یک Promise برگرداند، بدون `await` 처리 می‌شود. Contract آماده async است اما فعلاً sync اجرا می‌شود.

### MAY

**R-WF-04:** از `App.monitor(callback)` برای مشاهده زنده رکوردهای Trace استفاده شود. این کار برای logging و دیباگ مفید است.

---

## 6. Lifecycle

### 6.1 چرخه حیات کامل Workflow

```
1. تعریف Stepها (یک‌بار در زمان راه‌اندازی)
   └── CoreEvent.Step({ children: { ... } })
       └── ثبت خودکار در App.registry

2. اتصال المان‌ها به Stepها (در زمان رندر)
   └── ClReactiveElement({ unique: step, emit: handler })
       └── App.registerEmit(step, handler)

3. تعریف requestMap (در زمان رویداد)
   └── CoreEvent.requestMap([[step, payload], ...])

4. اجرای Workflow
   └── App.request(map, source?)
       ├── تولید requestId
       ├── برای هر entry:
       │     ├── ساخت ClRequest (dispatchId)
       │     ├── جستجوی emit handler
       │     ├── اجرای handler (try/catch)
       │     ├── ساخت ClResponse
       │     ├── ثبت Trace
       │     └── ذخیره در TResponseMap
       └── return TResponseMap

5. مصرف Responseها
   └── responses.get(step) → ClResponse
       ├── بررسی status
       ├── استخراج value
       └── بررسی error (در صورت وجود)

6. پاک‌سازی (در زمان remove المان)
   └── element.remove()
       └── App.dispose(step)  — حذف از registry و emits
```

### 6.2 حالت‌های Response

| وضعیت | شرط | نتیجه |
|:---|:---|:---|
| `success` با value | handler موجود، اجرای موفق | `value` = خروجی handler |
| `success` خالی | handler **نبود** | `value` = `null`, `status` = `"success"` |
| `error` | handler موجود، اجرای خطا داد | `value` = `null`, `status` = `"error"`, `error` = شیء خطا |

> **نکته مهم:** Step بدون handler خطا تولید نمی‌کند — Response پیش‌فرض `success` خالی برمی‌گردد. این رفتار ایمن است و امکان تعریف Stepهای بدون handler (مثلاً برای logging یا no-op) را فراهم می‌کند.

---

## 7. API / Contract

این بخش APIهای کلیدی Workflow را خلاصه می‌کند. برای جزئیات کامل به [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) بخش ۷ مراجعه کنید.

### `requestMap(entries): TRequestMap`

```typescript
export const requestMap = (entries: readonly TRequestMapEntry[]) => entries;
```

Helper ساخت requestMap. `entries` آرایه‌ای از `[TStepRef, Record<string, any>]` است.

### `App.request(map, source?): TResponseMap`

```typescript
request(map: TRequestMap, source?: TStepRef): TResponseMap
```

اجرای Workflow. خروجی `Map<TStepRef, ClResponse>` است.

### `TResponseMap`

```typescript
type TResponseMap = Map<{readonly identity: symbol; readonly unique: string}, any>;
```

کلید: Step (با `identity`). مقدار: `ClResponse`.

---

## 8. Examples

### 8.1 Workflow تک‌هدف

```typescript
import * as CoreEvent from "@/core_event";

const Steps = CoreEvent.Step({
    children: {
        counter: {
            children: {
                increment: {},
                decrement: {},
            },
        },
    },
});

// اتصال المان به Step
const counterEl = CoreReactive.App.div({
    unique: Steps.counter.increment,
    emit: (request) => {
        const by = request.payload.by ?? 1;
        return { newCount: currentCount + by };
    },
});

// اجرای Workflow
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [Steps.counter.increment, { by: 5 }],
    ]),
    Steps.counter  // source برای trace
);

const res = responses.get(Steps.counter.increment);
console.log(res.status);  // "success"
console.log(res.value);   // { newCount: ... }
```

### 8.2 Workflow چندهدف با ترتیب deterministic

```typescript
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        // 1) ابتدا داده‌ها را بارگذاری کن
        [Steps.data.fetch, { id: 42 }],
        // 2) سپس notification نمایش بده
        [Steps.notification.show, { message: "داده بارگذاری شد" }],
        // 3) در نهایت audit log ثبت کن
        [Steps.audit.log, { action: "fetch", target: 42 }],
    ]),
    Steps.data  // source
);

// ترتیب اجرا تضمین‌شده: fetch → show → log
```

### 8.3 مدیریت خطا در Workflow

```typescript
const Steps = CoreEvent.Step({
    children: {
        api: {
            children: {
                save: {},
            },
        },
    },
});

// emit handler که خطا می‌دهد
const saveEl = CoreReactive.App.button({
    unique: Steps.api.save,
    emit: (request) => {
        throw new Error("اتصال شبکه قطع است");
    },
});

const responses = CoreEvent.App.request(
    CoreEvent.requestMap([[Steps.api.save, { data: "test" }]])
);

const res = responses.get(Steps.api.save);
console.log(res.status);  // "error"
console.log(res.error);   // Error: اتصال شبکه قطع است
console.log(res.value);   // null

// Runtime crash نکرده — بقیه Workflow (در صورت وجود) ادامه می‌یابد
```

### 8.4 Step بدون handler (no-op)

```typescript
const Steps = CoreEvent.Step({
    children: {
        analytics: {
            children: {
                track: {},  // بدون emit handler
            },
        },
    },
});

const responses = CoreEvent.App.request(
    CoreEvent.requestMap([[Steps.analytics.track, { event: "page_view" }]])
);

const res = responses.get(Steps.analytics.track);
console.log(res.status);  // "success"
console.log(res.value);   // null
// خطا نیست — فقط handler ثبت نشده
```

### 8.5 دیباگ با Trace

```typescript
// اتصال Monitor برای مشاهده زنده
CoreEvent.App.monitor((record) => {
    console.log(
        `[${new Date(record.timestamp).toISOString()}]`,
        `Request: ${record.requestId}`,
        `Dispatch: ${record.dispatchId}`,
        `${record.source?.unique ?? "—"} → ${record.target.unique}`,
        `status: ${record.status}`
    );
});

// اجرای Workflow
CoreEvent.App.request(
    CoreEvent.requestMap([
        [Steps.user.login, { username: "admin" }],
        [Steps.notification.show, { message: "خوش آمدید" }],
    ]),
    Steps.user
);

// خروجی Monitor:
// [timestamp] Request: lx2k-0 Dispatch: lx2k-0.0 user → user.login status: success
// [timestamp] Request: lx2k-0 Dispatch: lx2k-0.1 user → notification.show status: success
```

### 8.6 استفاده در event handler با event.request

```typescript
CoreReactive.App.button({
    children: "ثبت",
    on: {
        click: (e, event) => {
            const responses = event.request(
                CoreEvent.requestMap([
                    [Steps.form.validate, { fields: formData }],
                    [Steps.form.submit, { data: formData }],
                ]),
                Steps.form
            );

            const validation = responses.get(Steps.form.validate);
            if (validation.status === "error") {
                showError(validation.error);
                return;
            }

            const submit = responses.get(Steps.form.submit);
            if (submit.status === "success") {
                showSuccess(submit.value);
            }
        },
    },
});
```

---

## 9. Anti-Patterns

### ❌ تکیه بر ترتیب نامنظم در requestMap

```typescript
// ❌ Incorrect — ترتیب نامناسب، وابستگی نقض می‌شود
const map = CoreEvent.requestMap([
    [Steps.notification.show, { message: "ذخیره شد" }],  // قبل از save!
    [Steps.data.save, { data }],                          // بعد از show
]);
```

```typescript
// ✅ Correct — ترتیب منطقی
const map = CoreEvent.requestMap([
    [Steps.data.save, { data }],                          // اول save
    [Steps.notification.show, { message: "ذخیره شد" }],  // بعد show
]);
```

### ❌ عدم بررسی status در Response

```typescript
// ❌ Incorrect — فرض موفقیت بدون بررسی
const responses = CoreEvent.App.request(map);
const value = responses.get(Steps.action).value;
// اگر status: "error" باشد، value = null → خطای منطقی
```

```typescript
// ✅ Correct — بررسی status
const responses = CoreEvent.App.request(map);
const res = responses.get(Steps.action);
if (res.status === "error") {
    handleError(res.error);
    return;
}
const value = res.value;
```

### ❌ تکیه بر async در Runtime فعلی

```typescript
// ❌ Incorrect — Promise بدون await برگردانده می‌شود
emit: async (request) => {
    return await api.save(request.payload);  // Promise، نه value واقعی
}
// res.value = Promise object، نه نتیجه واقعی
```

```typescript
// ✅ Correct — sync handler در Runtime فعلی
emit: (request) => {
    return syncSave(request.payload);  // مقدار واقعی
}
```

### ❌ عدم تنظیم source در request

```typescript
// ❌ Incorrect — Trace بدون source، دیباگ سخت‌تر
CoreEvent.App.request(map);
```

```typescript
// ✅ Correct — source برای ردیابی
CoreEvent.App.request(map, Steps.user);
```

---

## 10. Dependencies

| وابستگی | جهت | توضیح |
|:---|:---|:---|
| `ClEventDispatcher` | Workflow → Dispatcher | `App.request` موتور اجرای Workflow است |
| `ClStep` | Workflow → Step | Stepها targetهای requestMap هستند |
| `ClRequest` / `ClResponse` | Workflow → Request/Response | بسته‌بندی داده در هر Dispatch |
| `ClReactiveElement` | Reactive → Workflow | `event.request` در `on` handlerها Workflow را اجرا می‌کند |

---

## 11. AI Instructions

1. قبل از مطالعه این Guide، [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) را بخوان — این Guide مفهومی است و API را تکرار نمی‌کند.
2. ترتیب entryهای `requestMap` معنادار است — ترتیب اجرا به همین ترتیب است.
3. همیشه `source` را در `App.request(map, source)` تنظیم کن برای ردیابی بهتر در Trace.
4. همیشه `status` هر Response را بررسی کن — `error` به‌معنای crash نیست، اما باید مدیریت شود.
5. Step بدون handler خطا نیست — `success` خالی برمی‌گردد. این رفتار ایمن است.
6. برای دیباگ از `App.monitor(callback)` یا `App.getTrace()` استفاده کن.
7. در Runtime فعلی، emit handlerها sync اجرا می‌شوند — به async تکیه نکن.
8. برای پاک‌سازی، المان‌های متصل را با `remove()` حذف کن — این کار `App.dispose` را هم فراخوانی می‌کند.

---

## 12. Related Guides

- [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) — مرجع کامل API سیستم Event
- [AI_GUIDE_REACTIVE.md](./AI_GUIDE_REACTIVE.md) — اتصال المان‌ها به Step system
- [AI_GUIDE_OBSERVABLE.md](./AI_GUIDE_OBSERVABLE.md) — سیستم Observable
- [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework

---

## 13. Source References

| مفهوم | فایل سورس | خط |
|:---|:---|:---|
| `requestMap` helper | `src/framework/module_core/module_event/index.ts` | 30 |
| `App.request` (اجرای Workflow) | `src/framework/module_core/module_event/class/ClEventDispatcher.ts` | 80-133 |
| تولید requestId | همان فایل | 83 |
| حلقه forEach روی requestMap | همان فایل | 87-130 |
| مدیریت خطای emit | همان فایل | 103-111 |
| Response پیش‌فرض (بدون handler) | همان فایل | 112-118 |
| ثبت Trace | همان فایل | 120-127 |
| `TRequestMap` / `TRequestMapEntry` | `src/framework/module_core/module_event/types/TRequestMap.ts` | 6 |
| `TResponseMap` | `src/framework/module_core/module_event/types/TResponseMap.ts` | 5 |
| `ClRequest` (requestId / dispatchId) | `src/framework/module_core/module_event/class/ClRequest.ts` | 13-47 |
| `ClResponse` (status / value / error) | `src/framework/module_core/module_event/class/ClResponse.ts` | 18-53 |
| `ClStep` (درخت children) | `src/framework/module_core/module_event/class/ClStep.ts` | 10-56 |
| `TTraceRecord` | `src/framework/module_core/module_event/class/ClEventDispatcher.ts` | 18-25 |
| `TRACE_LIMIT` | همان فایل | 50 |
| `_pushTrace` | همان فایل | 146-157 |
