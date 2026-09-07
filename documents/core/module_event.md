# ماژول Event (سیستم رویداد و ارتباط بین‌المانی)

این ماژول قلب سیستم ارتباطی فریم‌ورک است. وظیفه آن تعریف هویت المان‌ها (Step)، مسیریابی درخواست‌ها (Request) به handlerهای متصل، و جمع‌آوری پاسخ‌ها (Response) با قابلیت ردیابی (Trace) است. این لایه اجازه می‌دهد المان‌های UI به صورت تایپ‌شده و امن با یکدیگر ارتباط برقرار کنند — بدون وابستگی مستقیم.

---

## 📁 ساختار ماژول

```
module_event/
├── index.ts                      # دروازه عمومی + factory functions + singleton App
├── class/
│   ├── ClEventDispatcher.ts      # رجیستری Stepها + emit handlerها + مسیریابی Request→Response + Trace
│   ├── ClStep.ts                 # واحد هویت با Symbol + Proxy تایپ‌شده برای children
│   ├── ClRequest.ts              # بسته‌بندی payload با requestId و dispatchId
│   ├── ClResponse.ts             # خروجی emit handler با status/error/timestamp
│   └── index.ts
└── types/
    ├── TStepDefinition.ts        # تعریف اعلانی Step ({request, response, children})
    ├── TStepInstance.ts          # نمونه تایپ‌شده Step + TStepRef
    ├── TRequestMap.ts            # آرایه دوتایی [Step, payload]
    ├── TResponseMap.ts           # Map<Step, Response>
    ├── TEmitHandler.ts           # (request: ClRequest) => any
    ├── TEventHelper.ts           # helper تزریق‌شده به on handlers
    └── index.ts
```

---

## 🚀 دسترسی عمومی (Public API)

بر اساس فایل `index.ts` ماژول، دسترسی از طریق نام مستعار **`CoreEvent`** انجام می‌شود:

### `App` (نمونه Singleton از `ClEventDispatcher`)

نمونه سراسری Dispatcher — نقطه ورود اصلی برای اجرای Request و مدیریت رجیستری.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `register(step)` | ثبت یک Step در رجیستری (خودکار در factory `Step`). |
| `registerEmit(step, handler)` | ثبت emit handler یک المان متصل. `ClComponentBase.renderComponent` این متد را به‌صورت خودکار با `emit.bind(this)` فراخوانی می‌کند تا `this` در emit به Component instance اشاره کند. |
| `request(map, source?)` | اجرای requestMap و بازگرداندن `TResponseMap`. |
| `monitor(callback)` | اتصال تابع مانیتورینگ برای دریافت رکوردهای Trace. |
| `getTrace()` | خواندن بافر Trace فعلی (آخرین ۱۰۰ رکورد). |
| `dispose(step)` | حذف Step و emit handler آن از رجیستری (جلوگیری از memory leak). |
| `getRegistry()` | **(Plan 8.2.9)** لیست همه Stepهای ثبت‌شده — برای Inspector. |
| `getEmitCount()` | **(Plan 8.2.9)** تعداد emit handlerهای ثبت‌شده. |
| `hasEmit(step)` | **(Plan 8.2.9)** بررسی وجود emit handler برای یک Step. |
| `getTraceCapacity()` | **(Plan 8.2.9)** ظرفیت بافر Trace (۱۰۰). |
| `getCreatedCount()` | **(Plan 8.2.9)** تعداد کل Stepهای ساخته‌شده از ابتدا. |
| `getDisposedCount()` | **(Plan 8.2.9)** تعداد کل Stepهای disposeشده از ابتدا. |
| `getDispatchStats()` | **(Plan 8.2.9)** شمارش dispatchهای success/error از Trace. |

### Factory Functions

| تابع | توضیحات |
| :--- | :--- |
| `Step(definition)` | ساخت درخت Step با Proxy تایپ‌شده + ثبت خودکار در `App`. |
| `Request()` | ساخت `ClRequest` خام (برای تعریف اعلانی در Step). |
| `Response(value?)` | ساخت `ClResponse` خام (برای تعریف اعلانی در Step). |
| `requestMap(entries)` | کمکی ساخت آرایه دوتایی `[[step, payload]]`. |

### SubEvent API (Plan 8.2.7)

| تابع | توضیحات |
| :--- | :--- |
| `SubEvent(parent, key, child)` | اتصال رسمی یک Child Step به Parent Step. Child به‌عنوان فرزند با `key` مشخص متصل می‌شود و همه نسل‌هایش در رجیستری ثبت می‌گردند. تنها راه mutate ساختار درخت. |
| `getChild(parent, key)` | دسترسی read-only به child یک Step — `TStepRef \| null`. |
| `dispose(step)` | **Disposal بازگشتی** — کل subtree (همه نسل‌ها + خود step) از رجیستری و emits پاک می‌شود، از parent قطع می‌شود، و ساختار درخت پاک می‌گردد. |

### Console Inspector API (Plan 8.2.9)

| تابع | توضیحات |
| :--- | :--- |
| `inspect()` | درخت Event را در Console نمایش می‌دهد (Tree Snapshot) — با `console.group` قابل expand در DevTools. |
| `trace()` | جریان اخیر Event را در Console نمایش می‌دهد (Event Flow). |
| `trace(dispatchId)` | یک Event خاص با dispatchId مشخص را نمایش می‌دهد. |
| `find(query)` | جستجوی Step بر اساس `unique` (substring match). |
| `stats()` | آمار سلامت CoreEvent — Steps, Handlers, Trace, Dispatch, Lifecycle, Integrity. |
| `monitor()` | فعال‌کردن live logging در Console — هر dispatch زنده نمایش داده می‌شود. |
| `monitor(false)` | خاموش‌کردن live logging. |

> **دسترسی در Console مرورگر:** `Framework.Core.Event.inspect()` و سایر توابع.
> مستندات کامل: [Console Inspector](../inspectors/event-inspector.md)

---

## 🧱 کلاس‌ها

### `ClEventDispatcher`

رجیستری مرکزی — مدیریت Stepها، emit handlerها، مسیریابی Request → Response، و جمع‌آوری Trace.

**مدل مفهومی Request vs Dispatch:**

```
Request #100  (یک event.request)
   ├── Dispatch #100.1 → Target A
   └── Dispatch #100.2 → Target B
```

- هر `event.request` یک **requestId** واحد دارد.
- به ازای هر `[Step, payload]` در requestMap، یک **dispatchId** مستقل تولید می‌شود.
- ترتیب اجرا: ترتیب تعریف در requestMap (deterministic).
- خطای emit → Response با `status: "error"` (بدون crash کل Runtime).
- Step بدون handler → Response پیش‌فرض `status: "success"` خالی.

**Trace:**
- بافر حلقوی با سقف ۱۰۰ رکورد (`TRACE_LIMIT`).
- هر رکورد شامل: `requestId`, `dispatchId`, `source`, `target`, `status`, `timestamp`.
- در صورت اتصال Monitor، هر رکورد به callback تزریق می‌شود.

### `ClStep`

واحد هویت در سیستم Event.

| ویژگی | نوع | توضیحات |
| :--- | :--- | :--- |
| `identity` | `symbol` | هویت یکتا و غیرقابل جعل (Symbol). |
| `unique` | `string` | مسیر خوانا فقط برای debug/logging (مثل `"User.Account"`). |

> **Plan 8.2.7:** `children` از بیرون قابل mutate نیست — فقط از طریق API عمومی `addChild` / `removeChild` / `getChild`.

**API عمومی (Plan 8.2.7 — Encapsulation):**

| متد | توضیحات |
| :--- | :--- |
| `addChild(key, child)` | اتصال رسمی یک Child Step — تنها راه mutate ساختار. |
| `getChild(key)` | دسترسی read-only به child — `ClStep \| undefined`. |
| `removeChild(key)` | قطع اتصال یک child — برمی‌گرداند child را یا `undefined`. |
| `getChildEntries()` | لیست همه children — read-only iterator. |
| `getParent()` | parent این step — برای disposal از پایین به بالا. |
| `getParentKey()` | کلید این step در parent — برای قطع اتصال. |
| `getAllDescendants()` | جمع‌آوری همه نسل‌ها (بازگشتی) — برای disposal. |
| `clearChildren()` | پاک‌سازی کل subtree — قطع اتصال همه children. |

**متد استاتیک:**

| متد | توضیحات |
| :--- | :--- |
| `static create(definition, path?)` | ساخت کل زیردرخت از `TStepDefinition`. خروجی Proxy تایپ‌شده است. اگر یک child قبلاً Step ساخته‌شده باشد (has `identity`)، مستقیماً استفاده می‌شود — نه دوباره ساخته می‌شود. |

**Proxy Type-Safety:**
- دسترسی به child ناموجود در runtime خطای واضح می‌دهد — نه `undefined` خاموش.
- پیام خطا شامل نام Step و لیست فرزندان موجود است.

### `ClRequest`

بسته‌بندی payload با شناسه‌های قابل ردیابی.

| ویژگی | نوع | توضیحات |
| :--- | :--- | :--- |
| `requestId` | `string` | شناسه Request منطقی والد (یکسان برای همه Dispatchهای یک request). |
| `dispatchId` | `string` | شناسه Dispatch این Target (یکتا برای هر Target). |
| `target` | `TStepRef?` | Step هدف این Dispatch. |
| `source` | `TStepRef?` | Step آغازگر Request (برای trace). |
| `payload` | `Record<string, any>` | داده Request. |

### `ClResponse`

خروجی emit handler با metadata کامل.

| ویژگی | نوع | توضیحات |
| :--- | :--- | :--- |
| `requestId` | `string` | شناسه Request منطقی والد. |
| `dispatchId` | `string` | شناسه Dispatch این Target. |
| `source` | `TStepRef?` | Step آغازگر Request. |
| `target` | `TStepRef?` | Step هدف این Response. |
| `value` | `any` | خروجی emit handler. |
| `status` | `"success" \| "error"` | وضعیت اجرا. |
| `error` | `any?` | در صورت خطا. |
| `timestamp` | `number` | زمان تولید (برای trace). |
| `metadata` | `Record<string, any>?` | داده الحاقی (برای Monitor آینده). |

---

## 📐 تایپ‌ها (Types)

### `TStepDefinition`

تعریف اعلانی یک Step — ورودی factory `Step`.

```typescript
type TStepDefinition = {
    request?: ClRequest;
    response?: ClResponse;
    children?: Record<string, TStepDefinition | TStepRef>;
};
```

### `TStepInstance<TDef>`

نمونه تایپ‌شده یک Step — خروجی factory `Step`. دسترسی به children با type-safety کامل (کلید ناموجود در کامپایل خطا می‌دهد).

### `TStepRef`

کمینه مشترک بین `ClStep` و Proxy تایپ‌شده.

```typescript
type TStepRef = {
    readonly identity: symbol;
    readonly unique: string;
};
```

### `TRequestMap` / `TRequestMapEntry`

آرایه دوتایی `[Step, payload]` — به جای کلید آبجکت (محدودیت `String()` شدن کلیدهای آبجکت در JavaScript).

```typescript
type TRequestMapEntry = readonly [TStepRef, Record<string, any>];
type TRequestMap = readonly TRequestMapEntry[];
```

### `TResponseMap`

نگاشت خروجی Step → Response.

```typescript
type TResponseMap = Map<TStepRef, any>;
```

### `TEmitHandler`

Request Handler یک المان متصل — دریافت Request و بازگرداندن Response.

```typescript
type TEmitHandler = (request: ClRequest) => any;
```

> Contract آماده async: `emit: async request => await something()`. Runtime فعلی sync است؛ Promise بدون `await` برگردانده می‌شود و در فاز بعدی با `await` حل خواهد شد — بدون تغییر Contract.

### `TEventHelper`

helper تزریق‌شده به پارامتر دوم `on` handlerها.

```typescript
type TEventHelper = {
    request: (map: TRequestMap, source?: TStepRef) => TResponseMap;
};
```

مصرف: `on: { click: (e, event) => event.request(map) }`

### `TTraceRecord`

رکورد Trace برای مانیتورینگ.

```typescript
type TTraceRecord = {
    requestId: string;
    dispatchId: string;
    source?: TStepRef;
    target: TStepRef;
    status: "success" | "error";
    timestamp: number;
};
```

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. تعریف درخت Step

```typescript
import * as CoreEvent from "@/core_event";

const User = CoreEvent.Step({
    children: {
        Account: {
            children: {
                Simple:  {},
                Add:     {},
                GroupAdd:{},
            }
        },
        Emails: {
            children: {
                Email1: {},
                Email2: {},
            }
        }
    }
});

// دسترسی تایپ‌شده:
User.Account.Simple       // ✅ ClStep با identity یکتا
User.Account.NonExistent  // ❌ خطای runtime: کلید/فرزندی با نام "NonExistent" ندارد
```

### ۲. اجرای Request

```typescript
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [User.Account.Simple,  { action: "info" }],
        [User.Account.Add,     { action: "create", name: "Ali" }],
    ])
);

// خواندن پاسخ هر Target:
const simpleResponse = responses.get(User.Account.Simple);
console.log(simpleResponse.status);  // "success"
console.log(simpleResponse.value);   // خروجی emit handler
console.log(simpleResponse.requestId); // "lxabc123-0" (یکسان برای همه)
console.log(simpleResponse.dispatchId); // "lxabc123-0.0" (یکتا برای هر Target)
```

### ۳. اتصال Emit Handler

```typescript
// ثبت handler برای یک Step (معمولاً در CoreReactive المان متصل)
CoreEvent.App.registerEmit(User.Account.Simple, (request) => {
    console.log("Payload:", request.payload);
    return { id: 1, name: "Ali" };
});

// حالا request به این Step، handler را فراخوانی می‌کند:
const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [User.Account.Simple, { action: "info" }]
    ])
);
```

### ۴. استفاده در on handler المان‌ها

```typescript
// در CoreReactive المان:
CoreReactive.App.button({
    text: "Get Info",
    on: {
        click: (e, event) => {
            const responses = event.request(
                CoreEvent.requestMap([
                    [User.Account.Simple, { action: "info" }]
                ]),
                User  // source — برای trace
            );
        }
    }
});
```

### ۵. مانیتورینگ با Trace

```typescript
// اتصال Monitor:
CoreEvent.App.monitor((record) => {
    console.log(`[${record.timestamp}] ${record.source?.unique ?? "—"} → ${record.target.unique}: ${record.status}`);
});

// اجرای request — هر dispatch یک رکورد trace تولید می‌کند:
CoreEvent.App.request(
    CoreEvent.requestMap([
        [User.Account.Simple,  { action: "info" }],
        [User.Account.Add,     { action: "create" }],
    ]),
    User
);

// خروجی:
// [16934...] User → User.Account.Simple: success
// [16934...] User → User.Account.Add: success

// خواندن بافر کامل:
const trace = CoreEvent.App.getTrace();
console.log(trace.length); // 2
```

### ۶. مدیریت خطا

```typescript
CoreEvent.App.registerEmit(User.Account.Add, () => {
    throw new Error("Database connection failed");
});

const responses = CoreEvent.App.request(
    CoreEvent.requestMap([
        [User.Account.Add, { action: "create" }]
    ])
);

const response = responses.get(User.Account.Add);
console.log(response.status);  // "error"
console.log(response.error);    // Error: Database connection failed
// Runtime ادامه می‌دهد — crash نمی‌شود
```

### ۷. پاکسازی (Dispose)

```typescript
// حذف Step و handler آن از رجیستری:
CoreEvent.App.dispose(User.Account.Simple);
// درخواست بعدی به این Step → Response پیش‌فرض success خالی (بدون handler)
```

---

## 🛠 مفاهیم کلیدی (Key Concepts)

### Symbol Identity
هر Step یک `Symbol` یکتا به عنوان `identity` دارد. این هویت غیرقابل جعل و clone است — برخلاف رشته‌ها که قابل تصادمی و تداخل‌اند. کلید رجیستری و emit handlerها بر اساس `identity` است.

### Request vs Dispatch
یک `event.request` (فراخوانی `App.request`) یک **Request منطقی واحد** با یک `requestId` است. به ازای هر `[Step, payload]` در requestMap، یک **Dispatch مستقل** با `dispatchId` جداگانه تولید می‌شود. این تفکیک امکان ردیابی دقیق در Trace را فراهم می‌کند.

### Proxy Type-Safety
خروجی `Step()` یک Proxy است که دسترسی به children ناموجود را در runtime با خطای واضح متوقف می‌کند — به جای برگرداندن `undefined` خاموش. در سطح تایپ، `TStepInstance` کلیدهای مجاز را استنتاج می‌کند.

### Trace & Monitor
Dispatcher یک بافر حلقوی از آخرین ۱۰۰ رکورد dispatch را نگه می‌دارد. با اتصال یک تابع از طریق `monitor()`، هر رکورد به صورت زنده به callback تزریق می‌شود — پایه‌ای برای Monitor UI آینده.

### SubEvent — رابطه سلسله‌مراتبی (Plan 8.2.7)
`SubEvent` رابط رسمی اتصال Child Step به Parent Step است. قرارداد:
- Parent و Child هر دو Step ساخته‌شده هستند.
- Child به‌عنوان فرزند با `key` مشخص به Parent متصل می‌شود.
- همه نسل‌های Child در رجیستری App ثبت می‌شوند.
- هیچ لایه‌ای مستقیماً `children` را mutate نمی‌کند — فقط از طریق این API.

```typescript
CoreEvent.SubEvent(parentStep, "messages", childStep);
```

### Disposal بازگشتی (Plan 8.2.7)
`CoreEvent.dispose(step)` کل subtree را پاک می‌کند:
1. همه نسل‌ها از App (رجیستری + emits) پاک می‌شوند.
2. خود step از App پاک می‌شود.
3. اگر step دارای parent است، از parent قطع می‌شود.
4. ساختار درخت پاک می‌شود (`clearChildren`).

### Console Inspector (Plan 8.2.9)
Inspector یک **projection خواندنی** از CoreEvent است — نه بخشی از Event Model. از API عمومی استفاده می‌کند و به internals دسترسی ندارد. خروجی از `console.group` استفاده می‌کند تا Chrome DevTools بتواند objectها را expand کند.

پنج سؤال که Inspector جواب می‌دهد:
1. ** الان چه Eventهایی وجود دارند؟** → `inspect()`
2. ** چه اتفاقی افتاد؟** → `trace()` / `trace(id)`
3. ** این Event دقیقاً کجاست؟** → `find(query)`
4. ** Event Engine سالم است؟** → `stats()`
5. ** همین الان چه اتفاقی می‌افتد؟** → `monitor()` / `monitor(false)`

> مستندات کامل Inspector: [Console Inspector](../inspectors/event-inspector.md)

### Async-Ready Contract
`TEmitHandler` خروجی `any` دارد — هم sync و هم async پشتیبانی می‌شود. در فاز فعلی Runtime sync است، اما Contract نیازی به تغییر ندارد برای پشتیبانی async در آینده.

### Emit Auto-Bind (Plan 8.1.4)
`ClComponentBase.renderComponent` هنگام رندر، `emit` را در `CoreEvent.App.registerEmit` ثبت می‌کند. نکات کلیدی:

- **`emit.bind(this)`** → `this` در emit به **Component instance** اشاره می‌کند (نه HTMLElement).
- اگر مصرف‌کننده قبلاً `.bind(parentInstance)` کرده باشد، bind دوم **تاثیری ندارد** (bind اول اولویت دارد).
- **arrow function** با `.call()` کار نمی‌کند — برای emit باید از `function` استفاده شود.
- emit **فقط با `request`** صدا زده می‌شود — خودبه‌خود با کلیک یا رویداد DOM صدا زده نمی‌شود.

---

## 📊 نمودار جریان (Flow Diagram)

```
                    ┌─────────────────────────────────────┐
                    │         ClEventDispatcher           │
                    │  (singleton: CoreEvent.App)         │
                    │                                     │
                    │  registry: Map<symbol, TStepRef>    │
                    │  emits: Map<symbol, TEmitHandler>   │
                    │  _trace: TTraceRecord[] (max 100)   │
                    └──────────┬──────────────────────────┘
                               │
                    request(map, source?)
                               │
                    ┌──────────▼──────────┐
                    │  برای هر [step, payload] در map:
                    │  1. ساخت ClRequest (requestId + dispatchId)
                    │  2. یافتن handler از emits
                    │  3. اجرای handler (try/catch)
                    │  4. ساخت ClResponse (success/error)
                    │  5. ثبت در Trace
                    │  6. افزودن به TResponseMap
                    └──────────┬──────────┘
                               │
                    return TResponseMap
                    (Map<Step, ClResponse>)
```

---
*مستندات بر اساس کدهای ماژول `module_core/module_event` تولید شده است.*
*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.2.9 (Console Inspector)*
