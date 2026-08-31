# AI Guide: Component Creation — راهنمای کامل ساخت Component جدید

> **Audience:** همه AIهایی (چت، کدنویس، تحلیل‌گر) که می‌خواهند Component جدید بسازند.
>
> **Purpose:** تعیین دقیق و مو به مو تمام فایل‌ها، typeها، الگوها و قوانینی که برای ساخت یک Component جدید نیاز است.
>
> **Level:** پایه — پیش‌نیاز مطالعه `Basic/00-framework/AI_GUIDE_RULES.md`.
>
> **Status:** Official — **به‌روزرسانی‌شده با پلن 6.1 (قرارداد سه‌آرگومانی ComponentBase)**

---

## ۰. خلاصه اجرایی

برای ساخت یک Component جدید (مثلاً `ComponentButton`) نیاز به این فایل‌ها هست:

```
src/framework/module_ui/module_components/lists/componentButton/
│
├── Definition.ts              ← شناسنامه Component
├── ComponentButton.ts         ← کلاس نهایی (extends ComponentBase + render اختصاصی)
│
├── examples/
│   ├── Default.ts             ← Example پیش‌فرض
│   └── index.ts               ← Registry Examples
│
└── index.ts                   ← Public API
```

و در نهایت ثبت در `ComponentManager`.

> **تغییر مهم (پلن 6.1):** فایل‌های `Props.ts` / `Schemas.ts` / `Methods.ts` / `Step.ts` / `ComponentButtonBase.ts` از الگوی اجباری خارج شدند. Component جدید مستقیماً از `ComponentBase` (Core) ارث می‌برد و با constructor سه‌آرگومانی `(props, methods, identity)` ساخته می‌شود.

---

## ۱. اصول معماری

### ۱.۱. اصل طلایی

```
Component  = "How does it behave?"    (runtime — state + render + composition)
Props      = "What inputs?"           (declarative — آرگومان اول constructor)
Methods    = "What API?"              (declarative — آرگومان دوم constructor)
Identity   = "How to connect?"        (runtime — آرگومان سوم: unique + emit + events)
Definition = "What is this?"          (metadata — id + name + version)
Example    = "How to present it?"     (data — props + methods + identity)
Schema     = "Scenario metadata"      (Metadata — نقشی در Rendering ندارد)
```

### ۱.۲. مرزها

| مجاز | ممنوع |
|:---|:---|
| `Component → ComponentBase` (Core) | هر Base Component جدید در UI |
| `Component → CoreReactive` (برای render) | `Component → renderComponent` (API Legacy) |
| `Component → CoreObservable` (برای State) | `Schema → CoreReactive` (render در Schema ممنوع) |
| `ExampleRenderer → Component` (برای instantiate) | `Component → ExampleRenderer` |
| `Component → CoreEvent` (برای Step داخلی اختیاری) | `Component → ComponentManager` |

### ۱.۳. لایه‌ها

```
Declarative Layer          Runtime Layer
─────────────────          ─────────────
Definition                 ComponentBase (Core — قرارداد واحد)
Props (type فقط)               ↓ extends
Methods (type فقط)          ComponentButton
Examples                        ↓ composition
                            ComponentStructure / ComponentCollapse / ...
```

---

## ۲. قرارداد ComponentBase (پلن 6.1)

### ۲.۱. مکان

```
src/framework/module_core/module_components/basic/class/ComponentBase.ts
```

Base Component در **Core** تعریف شده (نه UI) — چون یک Contract سراسری است و هر ماژولی بدون چرخه وابستگی از آن ارث می‌برد.

### ۲.۲. جنریک‌های سه‌گانه

| جنریک | نقش | توضیح |
|-------|-----|-------|
| `TProp` | پارامترهای Component | ورودی‌های declarative — selector، append، classList، propهای اختصاصی |
| `TSchema` | سناریو و Scope هر بخش | Metadata بخش‌های سناریو — در Rendering نقش ندارد |
| `TMethod` | کال‌بک‌ها و اکشن‌ها | قرارداد API قابل فراخوانی توسط مصرف‌کننده |

### ۲.۳. constructor سه‌آرگومانی

| آرگومان | نوع | محتوا |
|---------|-----|-------|
| **۱** | `props: TProp` | آبجکت propهای کامپوننت (ریشه از `ComponentPropConfig`) |
| **۲** | `methods: TMethod` | آبجکت متدها و کال‌بک‌های کامپوننت (ریشه از `ComponentMethodConfig`) |
| **۳** | `identity?: Partial<ComponentIdentity>` | بخش عمومی اتصال: `unique` + `emit` (جریان CoreEvent) و `events` (handlerهای DOM خود کامپوننت) |

### ۲.۴. API داخل فرزند

| عضو | کاربرد |
|-----|--------|
| `this.prop("key")` | دسترسی type-safe به props |
| `this.bindProp("key")` | نسخه Observable یک prop |
| `this.method("KEY")` | دسترسی type-safe به methods |
| `this.getIdentity()` | identity کامل |
| `this.emitEvent(payload)` | ارسال Event به والد |
| `this.getElement()` | HTMLElement نهایی (Lazy Render) |
| `this.render()` | پیاده‌سازی توسط فرزند (abstract) |

### ۲.۵. تفاوت آرگومان ۲ و ۳

| | آرگومان ۲ (`methods`) | آرگومان ۳ (`identity.events`) |
|---|---|---|
| ماهیت | API Business کامپوننت | handlerهای DOM/Event |
| مالکیت | مصرف‌کننده (صفحه/والد) | والد |
| نمونه | `{ onToggle: (open) => ... }` | `{ click: (e) => ... }` |
| فراخوانی توسط | `this.method("onToggle")` داخل فرزند | تزریق مستقیم به `on: {}` در render |

---

## ۳. فایل ۱ — Definition.ts

### هدف

شناسنامه Component — `id`, `name`, `version`.

### الگو

```typescript
/**
 * Definition — شناسنامه ComponentButton
 * مستقل از Runtime — Component Manager بدون instantiate کردن این را می‌خواند.
 */
export const Definition = {

    id:       "component_button",
    name:     "componentButton",
    version:  "v1.0.0",

};
```

### قوانین

| قانون | سطح |
|:---|:---|
| `id` یکتا باشد — با id Componentهای دیگر تکرار نشود | **MUST** |
| `id` با `component_` شروع شود | **MUST** |
| `version` با `v` شروع شود | **MUST** |
| Definition به Runtime وابسته نباشد | **MUST** |

---

## ۴. فایل ۲ — ComponentButton.ts

### هدف

کلاس نهایی Component — State + Render + Composition. **یک فایل کافی است.**

### الگو

```typescript
import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
// --------------------------------
import {ComponentBase}     from "@/core_components";
import type {
    ComponentPropConfig,
    ComponentSchemaConfig,
    ComponentMethodConfig,
    ComponentIdentity,
}                          from "@/core_components";


/**
 * ComponentButtonProps — Props اختصاصی (آرگومان اول)
 */
export type ComponentButtonProps = ComponentPropConfig & {

    /** btnTitle — متن دکمه */
    btnTitle?: string | CoreObservable.App<string>;

    /** variant — استایل بوت‌استرپ */
    variant?:  string;

    /** Composition Point — محتوای داخل دکمه */
    content?:  () => CoreReactive.App | CoreReactive.App[] | null;

};


/**
 * ComponentButtonSchema — Schema اختصاصی (جنریک دوم — فقط Metadata)
 */
export type ComponentButtonSchema = ComponentSchemaConfig;


/**
 * ComponentButtonMethods — Methods اختصاصی (آرگومان دوم)
 */
export type ComponentButtonMethods = ComponentMethodConfig & {

    onTitleChange?: (title: string) => void;

};


/**
 * ComponentButton — کلاس نهایی
 */
export class ComponentButton<
    TProp   extends ComponentButtonProps   = ComponentButtonProps,
    TSchema extends ComponentButtonSchema  = ComponentButtonSchema,
    TMethod extends ComponentButtonMethods = ComponentButtonMethods
> extends ComponentBase<TProp, TSchema, TMethod> {

    /* State — observable داخلی */
    protected readonly state = {
        title: new CoreObservable.App<string>(""),
    };

    constructor(props: TProp, methods: TMethod, identity?: Partial<ComponentIdentity>) {
        super(props, methods, identity);   // ← قرارداد سه‌آرگومانی

        // مقدار اولیه state از props
        const initial = this.prop("btnTitle");
        if (CoreObservable.App.isObservable(initial)) {
            initial.subscribe((value: string) => this.state.title.set(value));
        }
        else if (typeof initial === "string") {
            this.state.title.set(initial);
        }
    }

    /* render — پیاده‌سازی abstract کلاس پایه */
    protected render(): CoreReactive.App {

        const variant = this.prop("variant") ?? "primary";

        return CoreReactive.App.button({
            className: ["btn", `btn-${variant}`],
            children: [
                this.state.title,
            ],
            on: (this.getIdentity()?.events ?? {}) as Record<string, any>,
        });
    }

    /* Runtime Method — API عمومی */
    setTitle(title: string): void {
        this.state.title.set(title);
    }

}
```

### قوانین

| قانون | سطح |
|:---|:---|
| از `ComponentBase` (Core — `@/core_components`) ارث‌بری کند | **MUST** |
| constructor سه‌آرگومانی `(props, methods, identity?)` داشته باشد | **MUST** |
| فقط `super(props, methods, identity)` صدا بزند — بدون `renderComponent` | **MUST** |
| `render()` را override کند و فقط `CoreReactive.App` برگرداند | **MUST** |
| State به‌صورت class field تعریف شود (`protected readonly state`) | **MUST** |
| rendering از `this.prop()` / `this.bindProp()` استفاده کند | **MUST** |
| فراخوانی Methodها با `this.method("KEY")` باشد | **MUST** |
| DOM handlerها از `identity.events` بیایند | **MUST** |
| State در کلاس Component باشد (نه در Schema) | **MUST** |
| هر Base Component جدید در UI تعریف نشود | **MUST NOT** |
| `renderComponent` / `super("name",...)` (API Legacy) استفاده نشود | **MUST NOT** |

### نکته مهم — Lazy Render

`render()` **هرگز در constructor اجرا نمی‌شود**. اولین فراخوانی `getElement()` رندر را انجام می‌دهد. دلیل: class fieldهای فرزند (مثل `this.state`) بعد از بازگشت `super()` مقداردهی می‌شوند — اگر رندر در constructor پایه اجرا شود، `this.state` هنوز `undefined` است.

---

## ۵. Composition — content

Composition Point الگوی استاندارد برای محتوای داخلی Component:

```typescript
export type ComponentContent =
    () => CoreReactive.App | CoreReactive.App[] | null;
```

### الگو

```typescript
// داخل Component — اجرای content
protected renderContent(): CoreReactive.App[] {
    const content = this.prop("content");
    if (typeof content !== "function") return [];

    const result = content();
    if (!result) return [];

    return Array.isArray(result) ? result : [result];
}
```

### ترکیب Componentها

```typescript
const collapse = new ComponentCollapse(
    {
        content: () => new ComponentButton(
            {btnTitle: "Toggle"},
            {},
            {events: {click: () => collapse.toggle()}},
        ).getElement(),
    },
    {},
);
```

---

## ۶. Examples

### الگو — Default.ts

```typescript
import {ComponentExampleDefinition} from "@/core_components";


/**
 * Default Example برای ComponentButton
 */
export const DefaultExample: ComponentExampleDefinition = {

    id:          "button_default",
    name:        "Default Button",
    description: "Basic button with default styling",

    config: {
        btnTitle: "Submit",
        variant:  "primary",
    },

    methods: {},

};
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر Example شامل `id`, `name`, `config` باشد | **MUST** |
| `config` با PropsType سازگار باشد | **MUST** |
| Example به Component کلاس وابسته نباشد | **MUST NOT** |
| Example خودش render نکند | **MUST NOT** |

---

## ۷. فایل آخر — index.ts

### الگو

```typescript
export {ComponentButton      as Component} from "./ComponentButton"
export type {ComponentButtonProps}         from "./ComponentButton"
export type {ComponentButtonSchema}        from "./ComponentButton"
export type {ComponentButtonMethods}       from "./ComponentButton"
export {Definition}                        from "./Definition"
export {Examples}                          from "./examples"
```

### قوانین

| قانون | سطح |
|:---|:---|
| `Component` alias برای کلاس نهایی | **MUST** |

---

## ۸. ثبت در ComponentManager

### الگو

در فایل دسته (`module_categories/lists/ui/basic/Definition.ts`):

```typescript
import * as UICategories  from "@/ui_categories"
import * as UIComponents  from "@/ui_components"

export const ComponentButtonTotality = UICategories.CreateCategoryComponent(
    {
        id:       "component_button",
        name:     "componentButton",
        version:  "v1.0.0",
    },
    UIComponents.Lists.ComponentButton.Component as any
);
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر Component باید در ComponentManager (از طریق Category) ثبت شود | **MUST** |

---

## ۹. Identity و Step — دو مفهوم جدا

### Identity (بیرونی — آرگومان سوم)

```typescript
identity = {
    unique:  CoreEvent.TStepRef,       // هویت در درخت Workflow والد
    emit:    CoreEvent.TEmitHandler,   // Request Handler از سمت والد
    events:  Record<string, any>,      // Event handler از سمت والد
}
```

### Step (داخلی — اختیاری)

```typescript
ButtonStep = CoreEvent.Step({
    children: {
        click: CoreEvent.Step({
            request:  CoreEvent.Request(),
            response: CoreEvent.Response({ value: "" }),
        }),
    }
});
```

### تفاوت

| مفهوم | جهت | کاربرد |
|:---|:---|:---|
| `identity` | **بیرونی** — والد به این Component | والد جریان خودش را اعمال می‌کند |
| `step` | **داخلی** — این Component به فرزندانش | Component جریان داخلی خودش را کنترل می‌کند |

### مثال

```typescript
// ComponentForm (والد) → ComponentButton (فرزند)
const button = new ComponentButton(
    {btnTitle: "Submit"},                    // props
    {},                                      // methods
    {
        unique: FormStep.submit,             // ← بیرونی: هویت در درخت Form
        events: {click: handler},            // ← handlerهای DOM
    },
);
```

---

## ۱۰. Generic Parameters

`ComponentBase` سه Generic Parameter دارد:

```typescript
class ComponentBase<
    TProp   extends ComponentPropConfig   = ComponentPropConfig,   // ۱. Props
    TSchema extends ComponentSchemaConfig = ComponentSchemaConfig, // ۲. Schema (Metadata)
    TMethod extends ComponentMethodConfig = ComponentMethodConfig  // ۳. Methods
>
```

### استفاده در فرزند

```typescript
export class ComponentButton<
    TProp   extends ComponentButtonProps   = ComponentButtonProps,
    TSchema extends ComponentButtonSchema  = ComponentButtonSchema,
    TMethod extends ComponentButtonMethods = ComponentButtonMethods
> extends ComponentBase<TProp, TSchema, TMethod> { ... }
```

---

## ۱۱. چک‌لیست نهایی

برای ساخت Component جدید، این چک‌لیست را به‌ترتیب اجرا کنید:

### مرحله ۱: Runtime Layer

- [ ] `ComponentButton.ts` — extends ComponentBase + constructor سه‌آرگومانی + render()
- [ ] State به‌صورت class field
- [ ] Composition Point (در صورت نیاز)

### مرحله ۲: Metadata

- [ ] `Definition.ts` — `id`, `name`, `version`
- [ ] `examples/Default.ts` — حداقل یک Example
- [ ] `examples/index.ts` — Registry Examples

### مرحله ۳: Public API

- [ ] `index.ts` — exportهای عمومی

### مرحله ۴: ثبت

- [ ] ثبت در ComponentManager (از طریق Category)

### مرحله ۵: بررسی

- [ ] TypeScript compile بدون خطای جدید
- [ ] constructor دقیقاً سه‌آرگومانی است
- [ ] هیچ `renderComponent` (API Legacy) استفاده نشده
- [ ] Rendering در کلاس Component است
- [ ] State در کلاس Component است
- [ ] render() در constructor اجرا نشده (Lazy Render)

---

## ۱۲. Legacy — API قدیمی (فقط برای درک کد قدیمی)

> ⚠️ **هشدار:** این الگو **منسوخ** است و نباید در کد جدید استفاده شود.

```typescript
// ❌ API قدیمی (LegacySchemaComponent — قبلاً ClComponentBase)
constructor(config, methods, identity) {
    super("button", null, identity, ButtonStep);   // ← قدیمی
    this.renderComponent(config, methods);          // ← قدیمی
}
```

| جنبه | Legacy (`LegacySchemaComponent`) | جدید (`ComponentBase`) |
|------|-------------------------------|------------------------|
| مکان | Core (`basic/class/ClComponentBase.ts`) | Core (`basic/class/ComponentBase.ts`) |
| شروع رندر | فراخوانی دستی `renderComponent()` | Lazy — اولین `getElement()` |
| State | `_COMPONENT_PROPS_BIND` | class field (`this.state`) + `bindProp` |
| امضا | `(name, parent)` + فراخوانی دستی | `(props, methods, identity)` |
| جنریک | چهارگانه (Prop/Schemas/Template/Methods) | سه‌گانه (Prop/Schema/Method) |

---

## ۱۳. Anti-Patterns

### ۱۳.۱. Base Component جدید در UI

```typescript
// ❌ ممنوع — هیچ Base جدیدی در UI تعریف نشود
export class MyButtonBase extends ComponentBase { ... }
```

Base فقط در Core است. Componentهای واقعی مستقیماً از آن ارث می‌برند.

### ۱۳.۲. render در constructor

```typescript
// ❌ ممنوع
constructor(props, methods, identity) {
    super(props, methods, identity);
    this.getElement();   // ← ممنوع — class fieldهای فرزند هنوز آماده نیستند
}
```

### ۱۳.۳. استفاده از API Legacy

```typescript
// ❌ ممنوع در کد جدید
super("button", null, identity, ButtonStep);
this.renderComponent(config, methods);
this._COMPONENT_PROPS_BIND.prop_btnTitle;
```

### ۱۳.۴. State در props

```typescript
// ❌ ممنوع — State متعلق به Component است نه props
export type MyProps = ComponentPropConfig & {
    internalState: boolean;   // ← State باید class field باشد
};
```

### ۱۳.۵. Example که render می‌کند

```typescript
// ❌ ممنوع
export const DefaultExample = {
    id: "button_default",
    render() { ... },  // ← ممنوع — Example فقط data است
};
```

---

## ۱۴. Source References

| فایل | مسیر |
|:---|:---|
| ComponentBase (قرارداد جدید) | `src/framework/module_core/module_components/basic/class/ComponentBase.ts` |
| ComponentPropConfig | `src/framework/module_core/module_components/basic/class/ComponentPropConfig.ts` |
| ComponentSchemaConfig | `src/framework/module_core/module_components/basic/class/ComponentSchemaConfig.ts` |
| ComponentMethodConfig | `src/framework/module_core/module_components/basic/class/ComponentMethodConfig.ts` |
| ComponentIdentity | `src/framework/module_core/module_components/basic/class/ComponentIdentity.ts` |
| LegacySchemaComponent (deprecated) | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| ComponentStructure | `src/framework/module_ui/module_components/lists/componentStructure/ComponentStructure.ts` |
| ComponentButton | `src/framework/module_ui/module_components/lists/componentButton/ComponentButton.ts` |
| ComponentCollapse | `src/framework/module_ui/module_components/lists/componentCollapse/ComponentCollapse.ts` |
| ComponentManager | `src/framework/module_ui/module_components/basic/manager/ComponentManager.ts` |
| ExampleRenderer | `src/framework/module_core/module_components/tools/example/ExampleRenderer.ts` |
| CoreEvent.Step | `src/framework/module_core/module_event/index.ts` |

---

## ۱۵. Related Guides

- [Basic/index.md](./Basic/index.md) — نقشه راه اصلی
- [Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md](./Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) — ساختار Component
- [Basic/00-framework/AI_GUIDE_RULES.md](./Basic/00-framework/AI_GUIDE_RULES.md) — قوانین طلایی

---

*آخرین به‌روزرسانی: ۲۰۲۵ — پلن 6.1 (قرارداد سه‌آرگومانی ComponentBase در Core)*