# CoreEvent Console Inspector & Flow Monitor

> **Plan 8.2.9** — Observability Layer برای CoreEvent
>
> **هدف:** مشاهده درخت Event، جریان dispatch، سلامت Engine و live stream — همه از تب Console مرورگر.

---

## ۱. مقدمه

بعد از Plan 8.2.7 (SubEvent Hierarchical Step) و 8.2.8 (Per-Message Event Scope)، CoreEvent یک درخت سلسله‌مراتبی از Stepها دارد با routing پیچیده و lifecycle پویا. Console Inspector اجازه می‌دهد این سیستم را بدون ساخت UI جدا مشاهده و دیباگ کنید.

### ۱.۱ این صرفاً Debug نیست

این **Observability Layer** است — بدون اینکه Event Engine با ابزارهای debugging قاتی شود. اگر routing یا disposal خراب شود، به‌جای حدس‌زدن از روی `console.log`های پراکنده، درخت و جریان واقعی Event قابل مشاهده است.

### ۱.۲ دسترسی

همه توابع Inspector روی `window.Framework.Core.Event` موجود هستند — نیازی به import یا setup جدا نیست.

```javascript
// در Console مرورگر:
Framework.Core.Event.inspect()
```

---

## ۲. پنج سؤال، پنج API

| سؤال | API | خروجی |
|:---|:---|:---|
| الان چه Eventهایی وجود دارند؟ | `inspect()` | Tree Snapshot |
| چه اتفاقی افتاد؟ | `trace()` / `trace(id)` | Event Flow |
| این Event دقیقاً کجاست؟ | `find(query)` | Identity Search |
| Event Engine سالم است؟ | `stats()` | Health State |
| همین الان چه اتفاقی می‌افتد؟ | `monitor()` / `monitor(false)` | Live Stream |

---

## ۳. API Reference

### ۳.۱ `inspect()` — Tree Snapshot

درخت Event را در Console نمایش می‌دهد — ساختار سلسله‌مراتبی همه Stepها.

```javascript
Framework.Core.Event.inspect()
```

خروجی (با `console.group` — قابل expand در DevTools):

```text
▼ [CoreEvent] Tree — 8 steps, 3 emits
  ├── ▸ messages
  │   └── ▸ messages
  │       ├── ▸ message_abc123
  │       │   ├── ▸ body [emit: ✓]
  │       │   └── ▸ icon
  │       │       └── ▸ close [emit: ✓]
  │       └── ▸ message_def456
  │           ├── ▸ body [emit: ✓]
  │           └── ▸ icon
  │               └── ▸ close [emit: ✓]
  └── ▸ OtherStep
      └── ▸ child
```

**نکات:**
- هر `▸` یک `console.group` است — کاربر می‌تواند باز کند و Step object واقعی را ببیند.
- فقط rootهای بدون parent (`getParent() === null`) نمایش داده می‌شوند — بقیه به‌صورت بازگشتی زیر آن‌ها.
- `[emit: ✓]` نشان می‌دهد این Step دارای emit handler ثبت‌شده است.

---

### ۳.۲ `trace()` — Event Flow (گذشته)

جریان اخیر Event را در Console نمایش می‌دهد.

```javascript
// آخرین Eventها
Framework.Core.Event.trace()

// یک Event خاص با dispatchId
Framework.Core.Event.trace("lxyz123.0")
```

خروجی برای یک Event:

```text
▼ [CoreEvent] Trace — last 5 of 100
  │
  ├── ▼ Event lxyz123.0 — SUCCESS ✓
  │     ├─ ▼ SOURCE
  │     │     ▸ { identity: Symbol(...), unique: "messages.message_abc.icon.close" }
  │     ├─ ▼ TARGET
  │     │     ▸ { identity: Symbol(...), unique: "messages.message_abc.body" }
  │     ├─ timestamp: 2026-09-01T12:34:56.789Z
  │     └─ status: success
  │
  └── ▼ Event lxyz122.0 — ERROR ✗
        ├─ ▼ SOURCE
        │     (none)
        ├─ ▼ TARGET
        │     ▸ { identity: Symbol(...), unique: "messages.message_def.body" }
        ├─ timestamp: 2026-09-01T12:34:55.123Z
        └─ status: error
```

**نکات:**
- `trace()` بدون آرگومان — آخرین Eventها (تا سقف ۱۰۰).
- `trace(dispatchId)` — یک Event خاص. اگر پیدا نشود، پیام مناسب.
- هر بخش یک `console.group` است — objectها قابل expand در DevTools.

---

### ۳.۳ `find(query)` — Identity Search

جستجوی Step بر اساس `unique` (substring match).

```javascript
Framework.Core.Event.find("icon")
Framework.Core.Event.find("messages.message_abc")
```

خروجی:

```text
▼ [CoreEvent] Found 2 step(s) matching "icon"
  │
  ├── ▼ messages.message_abc123.icon
  │     unique:   "messages.message_abc123.icon"
  │     identity: Symbol(messages.message_abc123.icon)
  │     has emit: ✗
  │     parent:   messages.message_abc123
  │     parentKey: icon
  │     children: [close]
  │
  └── ▼ messages.message_def456.icon
        unique:   "messages.message_def456.icon"
        identity: Symbol(messages.message_def456.icon)
        has emit: ✗
        parent:   messages.message_def456
        parentKey: icon
        children: [close]
```

---

### ۳.۴ `stats()` — Health State

آمار سلامت CoreEvent — سلامت‌سنج Event Engine.

```javascript
Framework.Core.Event.stats()
```

خروجی:

```text
▼ [CoreEvent] Stats
  │
  ├─ ▼ Steps
  │     total:       12
  │     roots:        2
  │     children:    10
  │
  ├─ ▼ Handlers
  │     emits:        5
  │
  ├─ ▼ Trace
  │     recorded:    23
  │     capacity:   100
  │
  ├─ ▼ Dispatch
  │     success:     21
  │     errors:       2
  │
  ├─ ▼ Lifecycle
  │     created:     18
  │     disposed:      6
  │
  └─ ▼ Integrity
        roots:        2  (طبیعی — parent === null)
        orphans:      0  (سالم)
```

**بخش‌ها:**

| بخش | توضیح |
|:---|:---|
| **Steps** | total = کل Stepها در رجیستری، roots = بدون parent، children = total - roots |
| **Handlers** | emits = تعداد emit handlerهای ثبت‌شده |
| **Trace** | recorded = رکوردهای فعلی، capacity = سقف (۱۰۰) |
| **Dispatch** | success/errors = شمارش از Trace |
| **Lifecycle** | created = کل Stepهای ساخته‌شده از ابتدا، disposed = کل disposeشده‌ها |
| **Integrity** | roots = طبیعی (parent === null)، orphans = مشکل (relationship خراب) |

---

### ۳.۵ `monitor()` — Live Stream

فعال/غیرفعال‌کردن live logging در Console.

```javascript
// فعال‌کردن
Framework.Core.Event.monitor()
// → [CoreEvent] monitor ON — live logging enabled

// خاموش‌کردن
Framework.Core.Event.monitor(false)
// → [CoreEvent] monitor OFF — live logging disabled
```

بعد از فعال‌شدن، هر dispatch در Console زنده نمایش داده می‌شود:

```text
▼ [CoreEvent] SUCCESS ✓ — lxyz123.0
  source: ▸ { identity: Symbol(...), unique: "messages.message_abc.icon.close" }
  target: ▸ { identity: Symbol(...), unique: "messages.message_abc.body" }
  timestamp: 2026-09-01T12:34:56.789Z
```

و disposal هم نمایش داده می‌شود:

```text
▼ [CoreEvent] DISPOSE — messages.message_abc
  step: ▸ ClStep { identity: Symbol(...), unique: "messages.message_abc" }
```

**تفاوت با `trace()`:**
- `trace()` — گذشته را می‌بینی (آخرین ۱۰۰ رکورد).
- `monitor()` — از این لحظه به بعد جریان را می‌بینی (زنده).

---

## ۴. Root vs Orphan

### ۴.۱ Root

```text
Root Step
  parent === null        ← طبیعی — این ریشه درخت است
  registered === true    ← در registry موجود
```

Rootها **طبیعی** هستند. هر درخت یک یا چند root دارد.

### ۴.۲ Orphan

```text
Orphan Step
  parent !== null              ← parent دارد
  ولی
  parent.getChild(parentKey) !== step   ← parent آن را نمی‌شناسد
```

Orphan **مشکل** است — یعنی `dispose` یا `removeChild` درست کار نکرده.

### ۴.۳ تشخیص در `stats()`

```text
Integrity
  roots:     2  ← طبیعی — parent === null
  orphans:   0  ← سالم اگر 0، مشکل اگر > 0
```

اگر `orphans > 0` باشد، یعنی memory leak یا lifecycle bug وجود دارد.

---

## ۵. معماری

### ۵.۱ جداسازی Model از Inspector

```
CoreEvent
   │
   ├── Event Model (ClStep, ClEventDispatcher, ClRequest, ClResponse)
   │       ← بدون تغییر — نمی‌داند Inspector وجود دارد
   │
   └── Event Inspector (در index.ts)
           ├── inspect()    → Tree Snapshot
           ├── trace()      → Event Flow
           ├── find()       → Identity Search
           ├── stats()      → Health State
           └── monitor()    → Live Stream
```

**`ClStep` تغییر نمی‌کند.** Inspector مسئول projection است — از API عمومی (`getRegistry`, `hasEmit`, `getTrace`, `getChildEntries`) استفاده می‌کند.

### ۵.۲ اصول

- **Inspector یک Projection است** — نه بخشی از Event Model.
- **Inspector فقط خواندنی است** — هیچ mutation روی Event Tree انجام نمی‌دهد.
- **Inspector از API عمومی استفاده می‌کند** — به internals دسترسی ندارد.
- **Inspector در production هم موجود است** — ولی سبک (lightweight).
- **خروجی از `console.group` استفاده می‌کند** — نه plain string — تا Chrome DevTools بتواند objectها را expand کند.

### ۵.۳ مرزها

```
┌─────────────────────────────────────────────────────────┐
│  Browser Console                                        │
│                                                         │
│  Framework.Core.Event.inspect()                         │
│  Framework.Core.Event.trace()                           │
│  Framework.Core.Event.trace("lxyz123.0")                │
│  Framework.Core.Event.find("messages")                  │
│  Framework.Core.Event.stats()                           │
│  Framework.Core.Event.monitor()                         │
│  Framework.Core.Event.monitor(false)                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Event Inspector (projection — خواندنی)                 │
│                                                         │
│  inspectTree()  → ساخت درخت از registry                 │
│  formatTrace()  → فرمت‌بندی trace با console.group      │
│  findStep()     → جستجو در registry                     │
│  computeStats() → محاسبه آمار از registry + trace       │
│  monitorToggle()→ فعال/غیرفعال live logging             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ClEventDispatcher (accessorهای خواندنی)                │
│                                                         │
│  getRegistry()    → readonly TStepRef[]                 │
│  getEmitCount()   → number                              │
│  hasEmit(step)    → boolean                             │
│  getTrace()       → readonly TTraceRecord[]             │
│  monitor(cb)      → void                                │
│  getCreatedCount()  → number                            │
│  getDisposedCount() → number                            │
│  getDispatchStats() → { success, errors }               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ۶. سناریوهای استفاده

### سناریو ۱ — بررسی ساختار بعد از load صفحه

```javascript
Framework.Core.Event.inspect()
```

```text
▼ [CoreEvent] Tree — 8 steps, 3 emits
  └── ▸ messages
      └── ▸ messages
          ├── ▸ message_abc123
          │   ├── ▸ body [emit: ✓]
          │   └── ▸ icon
          │       └── ▸ close [emit: ✓]
          └── ▸ message_def456
              ├── ▸ body [emit: ✓]
              └── ▸ icon
                  └── ▸ close [emit: ✓]
```

### سناریو ۲ — بعد از کلیک close روی پیام اول

```javascript
Framework.Core.Event.trace()
```

```text
▼ [CoreEvent] Trace — last 1 of 100
  └── ▼ Event lxyz123.0 — SUCCESS ✓
        ├─ ▼ SOURCE
        │     ▸ { unique: "messages.message_abc.icon.close" }
        ├─ ▼ TARGET
        │     ▸ { unique: "messages.message_abc.body" }
        ├─ timestamp: 2026-09-01T12:34:56.789Z
        └─ status: success
```

### سناریو ۳ — live monitoring

```javascript
Framework.Core.Event.monitor()
// → [CoreEvent] monitor ON

// کلیک روی close icon...
// → ▼ [CoreEvent] SUCCESS ✓ — lxyz123.0
//     source: ▸ { unique: "messages.message_abc.icon.close" }
//     target: ▸ { unique: "messages.message_abc.body" }
//     ...

// → ▼ [CoreEvent] DISPOSE — messages.message_abc
//     step: ▸ ClStep { ... }

Framework.Core.Event.monitor(false)
// → [CoreEvent] monitor OFF
```

### سناریو ۴ — سلامت‌سنجی

```javascript
Framework.Core.Event.stats()
```

```text
▼ [CoreEvent] Stats
  ├─ Steps:     total=12  roots=2  children=10
  ├─ Handlers:  emits=5
  ├─ Trace:     recorded=23/100
  ├─ Dispatch:  success=21  errors=2
  ├─ Lifecycle: created=18  disposed=6
  └─ Integrity: roots=2 (طبیعی)  orphans=0 (سالم)
```

### سناریو ۵ — جستجوی یک Step

```javascript
Framework.Core.Event.find("icon")
```

```text
▼ [CoreEvent] Found 2 step(s) matching "icon"
  ├── ▼ messages.message_abc123.icon
  │     has emit: ✗
  │     parent:   messages.message_abc123
  │     children: [close]
  └── ▼ messages.message_def456.icon
        has emit: ✗
        parent:   messages.message_def456
        children: [close]
```

### سناریو ۶ — تشخیص memory leak

اگر بعد از dispose یک Component، `stats()` نشان دهد:

```text
Integrity
  roots:     2  (طبیعی)
  orphans:   3  (⚠ مشکل — relationship خراب)
```

یعنی `dispose` درست کار نکرده — Stepها از رجیستری پاک شده‌اند ولی parent-child relationship هنوز خراب است.

---

## ۷. فایل‌های مرتبط

| فایل | نقش |
|:---|:---|
| `module_event/index.ts` | Inspector functions (`inspect`, `trace`, `find`, `stats`, `monitor`) |
| `module_event/class/ClEventDispatcher.ts` | accessorهای خواندنی (`getRegistry`, `hasEmit`, `getCreatedCount`, ...) |
| `module_event/class/ClStep.ts` | API عمومی (`getChildEntries`, `getParent`, `getParentKey`) |
| `plans/8.2.9.console-inspector.md` | Plan اصلی |

---

## ۸. Plan مرتبط

- **Plan 8.2.7** — SubEvent Hierarchical Step (پیش‌نیاز)
- **Plan 8.2.8** — Per-Message Event Scope (پیش‌نیاز)
- **Plan 8.2.9** — Console Inspector & Flow Monitor (این مستند)

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.2.9*
