# AI Guide: Reactive

> **Audience:** همه AIهایی که با سیستم رندر واکنشی Framework کار می‌کنند.
>
> **Purpose:** مرجع کامل ساخت و مدیریت المان‌های DOM واکنشی با `ClReactiveElement`.
>
> **Level:** پایه — قبل از کار با Component خوانده شود.
>
> **Status:** Official

---

## 1. Definition

**Reactive** سیستم ساخت و مدیریت المان‌های DOM در Framework است. هر المان با تغییر Observableهای متصل به آن به‌صورت خودکار به‌روز می‌شود. این سیستم مستقیم روی real DOM کار می‌کند و Virtual DOM ندارد.

کلاس اصلی: `ClReactiveElement` در `module_core/module_reactive/class/ClReactiveElement.ts`.

از طریق دروازه عمومی ماژول `core_reactive` با نام `App` در دسترس است:

```typescript
import * as CoreReactive from "@/core_reactive";

const button = CoreReactive.App.button({ children: "کلیک" });
```

> برای تعریف رسمی اصطلاحات به [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 2. Responsibilities

- ساخت المان‌های HTML و SVG با API اعلانی
- اتصال Observableها به attributeها، classها، styleها و children
- مدیریت رویدادهای DOM با تزریق `event.request`
- ارائه Observableهای داخلی برای stateهای `hover`, `focus`, `active`
- اتصال المان به CoreEvent Step system با `unique` و `emit`

---

## 3. Concepts

### 3.1 ساختار کلاس

| فیلد | نوع | توضیح |
|:---|:---|:---|
| `tagName` | `string` | نام تگ المان |
| `element` | `HTMLElement \| SVGElement` | نود DOM واقعی |
| `hover` | `CoreObservable.App<boolean>` | Observable داخلی — state hover |
| `focus` | `CoreObservable.App<boolean>` | Observable داخلی — state focus |
| `active` | `CoreObservable.App<boolean>` | Observable داخلی — state active |
| `static version` | `string` | نسخه — `"1.0.0-beta"` |

### 3.2 Options

ساختار `Options` که به سازنده و factory methodها پاس داده می‌شود:

| گزینه | نوع | توضیح |
|:---|:---|:---|
| `props` | `any` | propertyهای ثابت المان (مثل `value`, `checked`) |
| `propsBind` | `any` | propertyهای واکنشی (Observable) |
| `children` | `any` | محتوای المان — متن، المان، Observable یا آرایه |
| `className` | `string \| string[]` | classهای ثابت |
| `classBind` | `any` | classهای واکنشی (Observable یا آرایه Observable) |
| `styles` | `StyleMap` | styleهای ثابت |
| `stylesCustom` | `string` | CSS سفارشی (تگ `<style>`) |
| `stylesBind` | `any` | styleهای واکنشی |
| `attrs` | `AttrMap` | attributeهای ثابت |
| `attrsBind` | `Record<string, TObservableValue>` | attributeهای واکنشی |
| `on` | `EventMap` | event listenerها |
| `unique` | `TStepRef` | اتصال المان به CoreEvent Step |
| `emit` | `TEmitHandler` | Request Handler این المان |

### 3.3 Observableهای داخلی State

هر `ClReactiveElement` سه Observable داخلی دارد که به‌صورت خودکار با رویدادهای DOM همگام می‌شوند:

- **`hover`** — `mouseenter` → `true`, `mouseleave` → `false`
- **`focus`** — `focus` → `true`, `blur` → `false`
- **`active`** — `mousedown` → `true`, `mouseup`/`mouseleave` → `false`

### 3.4 اتصال به CoreEvent

با گزینه‌های `unique` و `emit`، یک المان به Step system متصل می‌شود. در سازنده، اگر هر دو موجود باشند، `CoreEvent.App.registerEmit(unique, emit)` فراخوانی می‌شود. با `remove()` المان، `CoreEvent.App.dispose(unique)` پاک‌سازی انجام می‌شود.

---

## 4. Architecture

```
ClReactiveElement
├── Constructor(tagName, options, namespace)
│       ├── ساخت element (HTML یا SVG)
│       ├── راه‌اندازی hover/focus/active Observables
│       ├── ثبت emit handler (اگر unique + emit)
│       └── _applyOptions()
│
├── Option Application
│       ├── _setChildren(children)        — محتوا (شامل Observable reactive)
│       ├── _applyProps(props)             — propertyهای ثابت
│       ├── _applyPropsBind(propsBind)     — propertyهای واکنشی
│       ├── _applyAttrs(attrs)             — attributeهای ثابت
│       ├── _applyAttrsBind(attrsBind)     — attributeهای واکنشی
│       ├── _applyClassName(className)     — classهای ثابت
│       ├── _applyClassBind(classBind)     — classهای واکنشی
│       ├── _applyStyles(styles)           — styleهای ثابت
│       ├── _applyStylesBind(stylesBind)   — styleهای واکنشی
│       └── _setEvents()                   — event listenerها
│
├── Instance Methods
│       ├── getElement(): HTMLElement
│       ├── getReactiveElement(): ClReactiveElement
│       ├── on(event, handler) / off(event, handler)
│       ├── focusFn() / blurFn()
│       └── remove()
│
└── Static Factory Methods
        ├── HTML: div, span, button, input, form, a, label, ...
        ├── SVG:  svg, svgPath, svgCircle, svgRect, svgText, ...
        ├── create(tagName, options)
        ├── component(name, options)
        └── part(el, options)
```

### 4.1 Reactive Children

وقتی یک Observable در `children` قرار می‌گیرد، سیستم با Comment nodeهای `obs-start` و `obs-end` یک محدوده ایجاد می‌کند. با هر تغییر Observable، فقط محدوده بین این commentها پاک و دوباره رندر می‌شود. این کار از re-render کل المان جلوگیری می‌کند.

---

## 5. Rules

> تعریف رسمی سطوح MUST / MUST NOT / SHOULD / SHOULD NOT / MAY در [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) آمده است.

### MUST

**R-RENDER-02:** برای attributeهای واکنشی **باید** از `attrsBind` استفاده شود، نه `attrs`. `attrs` فقط یک snapshot ثابت می‌سازد و تغییرات Observable را دنبال نمی‌کند.

```typescript
// ✅ Correct — reactive
CoreReactive.App.div({
    attrsBind: { "data-state": stateObservable },
})

// ❌ Incorrect — static snapshot
CoreReactive.App.div({
    attrs: { "data-state": stateObservable.get() },
})
```

### MUST NOT

**R-RENDER-01:** DOM مستقیماً دستکاری نشود — از API `ClReactiveElement` استفاده شود.

```typescript
// ❌ Incorrect — direct DOM manipulation
const el = document.createElement("div");
el.textContent = "سلام";
el.setAttribute("data-id", "123");

// ✅ Correct — use ReactiveElement API
const el = CoreReactive.App.div({
    children: "سلام",
    attrs: { "data-id": "123" },
});
```

### SHOULD

**R-RENDER-03:** برای محتوای واکنشی، Observable مستقیماً در `children` پاس داده شود. سیستم به‌صورت خودکار subscribe کرده و محدوده را به‌روز می‌کند.

```typescript
// ✅ Recommended — Observable direct in children
const label = new CoreObservable.App("در حال بارگذاری...");
const el = CoreReactive.App.div({
    children: label,  // با تغییر label، محتوا به‌روز می‌شود
});
```

### MAY

**R-RENDER-04:** از Observableهای داخلی `hover`, `focus`, `active` برای استایل‌های واکنشی استفاده شود.

```typescript
// ✅ Allowed — use built-in state Observables
const button = CoreReactive.App.button({
    children: "کلیک",
    classBind: [
        button.hover.mapBoolean("is-hover", "", scope),
        button.active.mapBoolean("is-active", "", scope),
    ],
});
```

---

## 6. Lifecycle

```
new ClReactiveElement(tagName, options, namespace)
    │
    ├── ساخت element (document.createElement یا createElementNS)
    │
    ├── راه‌اندازی state Observables
    │       ├── hover  ← mouseenter / mouseleave
    │       ├── focus  ← focus / blur
    │       └── active ← mousedown / mouseup / mouseleave
    │
    ├── ثبت emit handler (اگر unique + emit)
    │       └── CoreEvent.App.registerEmit(unique, emit)
    │
    ├── _applyOptions()
    │       ├── children → _setChildren
    │       ├── props / propsBind
    │       ├── attrs / attrsBind
    │       ├── className / classBind
    │       ├── styles / stylesBind
    │       └── on → _setEvents
    │
    └── remove()
            ├── element.remove()
            └── CoreEvent.App.dispose(unique)  (اگر unique + emit)
```

---

## 7. API / Contract

### 7.1 Constructor

```typescript
new ClReactiveElement(tagName: string, options?: Options, namespace?: EnElementNamespace)
```

`namespace` پیش‌فرض `EnElementNamespace.HTML` است. برای المان‌های SVG باید `EnElementNamespace.SVG` پاس داده شود (factory methodهای `svg*` این کار را خودکار انجام می‌دهند).

### 7.2 Instance Methods

#### `getElement(): HTMLElement`

نود DOM واقعی را برمی‌گرداند.

#### `getReactiveElement(): ClReactiveElement`

خود شیء `ClReactiveElement` را برمی‌گرداند — برای chaining.

#### `on(event: string, handler: (e: Event) => void): ClReactiveElement`

یک event listener اضافه می‌کند و `this` را برمی‌گرداند (chainable). اگر المان در state `disabled` باشد، رویدادها (به جز `mouseenter`/`mouseleave`) مسدود می‌شوند.

#### `off(event: string, handler?: EventListener): ClReactiveElement`

event listener را حذف می‌کند.

#### `focusFn(options?: FocusOptions): ClReactiveElement`

روی المان `focus` را فراخوانی می‌کند.

#### `blurFn(): ClReactiveElement`

روی المان `blur` را فراخوانی می‌کند.

#### `remove(): void`

المان را از DOM حذف می‌کند و emit handler ثبت‌شده را از `CoreEvent.App` پاک می‌کند (جلوگیری از memory leak).

### 7.3 Static Factory Methods

#### HTML Elements

```typescript
CoreReactive.App.div(o?)
CoreReactive.App.span(o?)
CoreReactive.App.button(o?)
CoreReactive.App.input(o?)
CoreReactive.App.form(o?)
CoreReactive.App.a(o?)
CoreReactive.App.label(o?)
CoreReactive.App.select(o?)
CoreReactive.App.option(o?)
CoreReactive.App.img(o?)
CoreReactive.App.ul(o?)
CoreReactive.App.li(o?)
CoreReactive.App.h1(o?) / h2(o?) / h3(o?)
CoreReactive.App.p(o?)
CoreReactive.App.section(o?)
// و سایر المان‌های HTML
```

#### SVG Elements

```typescript
CoreReactive.App.svg(o?)
CoreReactive.App.svgPath(o?)
CoreReactive.App.svgCircle(o?)
CoreReactive.App.svgRect(o?)
CoreReactive.App.svgText(o?)
CoreReactive.App.svgLine(o?)
CoreReactive.App.svgG(o?)
CoreReactive.App.svgDefs(o?)
CoreReactive.App.svgFilter(o?)
// و سایر المان‌های SVG
```

#### Generic

```typescript
CoreReactive.App.create(tagName, options?)     // المان دلخواه
CoreReactive.App.component(name, options?)      // <component-{name}>
CoreReactive.App.part(el?, options?)            // المان بخش (پیش‌فرض section)
```

### 7.4 Event Handler با TEventHelper

در گزینه `on`، هر handler دو پارامتر دریافت می‌کند: `(e: Event, event?: TEventHelper)`. `event.request(map)` امکان ارسال Request به CoreEvent system را فراهم می‌کند:

```typescript
CoreReactive.App.button({
    children: "ذخیره",
    on: {
        click: (e, event) => {
            event.request(CoreEvent.requestMap([
                [Steps.save, { id: 1 }],
            ]));
        },
    },
});
```

---

## 8. Examples

### 8.1 المان ساده

```typescript
const card = CoreReactive.App.div({
    className: "card",
    children: "محتوای کارت",
    attrs: { "data-role": "card" },
});
```

### 8.2 attribute واکنشی با attrsBind

```typescript
const state = new CoreObservable.App("idle");

const el = CoreReactive.App.div({
    attrsBind: { "data-state": state },
});

// state.set("loading") → data-state="loading"
// state.set("error")   → data-state="error"
```

### 8.3 class واکنشی با classBind

```typescript
const isActive = new CoreObservable.App(false);

const button = CoreReactive.App.button({
    children: "دکمه",
    classBind: [
        isActive.mapBoolean("btn-active", "btn-inactive", scope),
    ],
});
```

### 8.4 محتوای واکنشی با Observable در children

```typescript
const status = new CoreObservable.App("آماده");

const el = CoreReactive.App.div({
    children: status,  // با تغییر status، محتوا به‌روز می‌شود
});

status.set("در حال اجرا...");  // DOM خودکار به‌روز می‌شود
```

### 8.5 children تابعی

```typescript
const el = CoreReactive.App.div({
    children: (self) => [
        CoreReactive.App.span({ children: "عنوان" }),
        CoreReactive.App.p({ children: "توضیحات" }),
    ],
});
```

### 8.6 استفاده از state Observableهای داخلی

```typescript
const button = CoreReactive.App.button({
    children: "هاور کنید",
    classBind: [
        button.hover.mapBoolean("hovered", "", scope),
    ],
});
// وقتی موس روی دکمه می‌رود → class "hovered" اضافه می‌شود
```

### 8.7 اتصال به CoreEvent با unique و emit

```typescript
const Steps = CoreEvent.Step({
    children: {
        toggle: {},
    },
});

const toggleButton = CoreReactive.App.button({
    children: "تغییر وضعیت",
    unique: Steps.toggle,
    emit: (request) => {
        // این handler با CoreEvent.App.request فراخوانی می‌شود
        return { toggled: true };
    },
    on: {
        click: (e, event) => {
            const responses = event.request(
                CoreEvent.requestMap([[Steps.toggle, {}]])
            );
        },
    },
});
```

### 8.8 SVG

```typescript
const icon = CoreReactive.App.svg({
    attrs: { viewBox: "0 0 24 24", width: "24", height: "24" },
    children: [
        CoreReactive.App.svgPath({
            attrs: { d: "M12 2L2 22h20L12 2z", fill: "currentColor" },
        }),
    ],
});
```

---

## 9. Anti-Patterns

### ❌ استفاده از `attrs` برای attribute واکنشی

```typescript
// ❌ Incorrect — static snapshot، تغییرات دنبال نمی‌شود
const el = CoreReactive.App.div({
    attrs: { "data-state": stateObs.get() },
});
```

```typescript
// ✅ Correct — attrsBind به Observable subscribe می‌کند
const el = CoreReactive.App.div({
    attrsBind: { "data-state": stateObs },
});
```

### ❌ دستکاری مستقیم DOM

```typescript
// ❌ Incorrect — bypasses ReactiveElement API
const el = CoreReactive.App.div({});
el.element.setAttribute("data-id", "123");
el.element.style.color = "red";
el.element.textContent = "متن";
```

```typescript
// ✅ Correct — use options
const el = CoreReactive.App.div({
    attrs: { "data-id": "123" },
    styles: { color: "red" },
    children: "متن",
});
```

### ❌ استفاده از `get()` در children به‌جای Observable مستقیم

```typescript
// ❌ Incorrect — reactivity شکسته می‌شود
const el = CoreReactive.App.div({
    children: `تعداد: ${countObs.get()}`,
});
```

```typescript
// ✅ Correct — Observable مستقیم یا computed
const el = CoreReactive.App.div({
    children: CoreObservable.App.computed(
        (c) => `تعداد: ${c}`,
        [countObs],
        scope
    ),
});
```

### ❌ فراموش کردن `remove()` برای المان متصل به CoreEvent

```typescript
// ❌ Incorrect — emit handler در رجیستری باقی می‌ماند
const el = CoreReactive.App.button({
    unique: Steps.action,
    emit: handler,
});
// بعداً: el.element.remove() → emit handler نشسته باقی می‌ماند → memory leak
```

```typescript
// ✅ Correct — remove() هم DOM و هم emit handler را پاک می‌کند
el.remove();
```

---

## 10. Dependencies

| وابستگی | جهت | توضیح |
|:---|:---|:---|
| `ClObservable` | Reactive → Observable | `attrsBind`, `classBind`, `stylesBind`, `children` همگی Observable مصرف می‌کنند |
| `CoreEvent` | Reactive → Event | `unique` و `emit` برای اتصال به Step system و `on` handlerها برای `event.request` |
| `Util` | Reactive → Util | `ClStyleValue` برای styleهای سفارشی در `stylesBind` |

---

## 11. AI Instructions

1. قبل از استفاده از Reactive، [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) بخش Render Rules را بخوان.
2. برای attributeهای واکنشی همیشه `attrsBind` استفاده کن — نه `attrs`.
3. DOM را مستقیماً دستکاری نکن — از API `ClReactiveElement` استفاده کن.
4. برای محتوای واکنشی، Observable را مستقیم در `children` قرار بده.
5. برای المان‌های متصل به CoreEvent (`unique` + `emit`)، همیشه `remove()` را فراخوانی کن.
6. از factory methodهای static (`div`, `span`, `svgPath`, ...) به‌جای `new ClReactiveElement` استفاده کن.
7. برای SVG، factory methodهای `svg*` استفاده کن — namespace خودکار تنظیم می‌شود.
8. state Observableهای `hover`, `focus`, `active` را برای استایل‌های تعاملی به‌کار ببر.

---

## 12. Related Guides

- [AI_GUIDE_OBSERVABLE.md](./AI_GUIDE_OBSERVABLE.md) — سیستم Observable
- [AI_GUIDE_SCOPE.md](./AI_GUIDE_SCOPE.md) — مدیریت چرخه حیات اشتراک‌ها
- [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) — سیستم رویدادها و Step
- [AI_GUIDE_WORKFLOW.md](./AI_GUIDE_WORKFLOW.md) — جریان اجرای Event
- [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework

---

## 13. Source References

| مفهوم | فایل سورس | خط |
|:---|:---|:---|
| کلاس `ClReactiveElement` | `src/framework/module_core/module_reactive/class/ClReactiveElement.ts` | 37-649 |
| نوع `Options` | همان فایل | 14-28 |
| state Observables (`hover`, `focus`, `active`) | همان فایل | 51-85 |
| `_applyAttrsBind` | همان فایل | 310-336 |
| `_setChildren` (reactive children) | همان فایل | 339-436 |
| `_setEvents` (با `event.request`) | همان فایل | 439-469 |
| `remove()` (با `CoreEvent.App.dispose`) | همان فایل | 555-562 |
| Factory methods (HTML) | همان فایل | 608-627 |
| Factory methods (SVG) | همان فایل | 631-648 |
| خروجی ماژول (`App`) | `src/framework/module_core/module_reactive/index.ts` | 1 |
