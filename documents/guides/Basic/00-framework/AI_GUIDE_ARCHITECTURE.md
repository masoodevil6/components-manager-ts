# AI Guide: Architecture

> **Audience:** AIهایی که نیاز به درک عمیق ساختار لایه‌ها دارند.
>
> **Purpose:** توضیح دقیق هر لایه، ساختار داخلی، و نحوه ارتباط بین آن‌ها.
>
> **Level:** پیشرفته
>
> **Status:** Official

---

## 1. Definition

این Guide معماری سه‌لایه Framework را توضیح می‌دهد: Core، UI Definition، Implementation. هر لایه مسئولیت‌ها، ساختار داخلی و نقش مشخصی دارد.

---

## 2. Layer 1: Core

**مسیر:** `src/framework/module_core/`

### ۲.۱. مسئولیت

- ارائه کلاس پایه (`ClComponentBase`)
- ارائه ابزارهای تعریف (`Define_*`)
- مدیریت وضعیت واکنشی (`ClObservable`, `ClScope`)
- ساخت DOM واکنشی (`ClReactiveElement`)
- سیستم رویداد (`ClEventDispatcher`, `ClStep`, `ClRequest`, `ClResponse`)
- تنظیمات، زبان، مسیریابی

### ۲.۲. ماژول module_components

```
module_components/
├── basic/
│   ├── abstract/
│   │   └── AbComponentConnector.ts    # کلاس انتزاعی پایه
│   ├── class/
│   │   └── ClComponentBase.ts         # ⭐ کلاس پایه همه کامپوننت‌ها
│   ├── methods/
│   │   └── MtSetValue.ts              # متد کمکی
│   └── types/
│       ├── TPartAttrDefault.ts        # { "data-part-name": string, id: string }
│       ├── TExtractName.ts            # استخراج نام از Record
│       ├── TExtractNameAndValue.ts    # استخراج نام+مقدار
│       └── ...
├── tools/
│   ├── prop/
│   │   ├── Define_ComponentProp.ts       # ابزار تعریف Props
│   │   ├── Interface_ComponentProp.ts    # { prop, default, value?, hasMultiTemplate?, title?, description? }
│   │   └── Type_ComponentProp.ts
│   ├── schema/
│   │   ├── Define_ComponentSchema.ts     # ابزار تعریف Schema
│   │   ├── Interface_ComponentSchema.ts  # { part, method?, props?, title?, description? }
│   │   └── Type_ComponentSchema.ts
│   ├── method/
│   │   ├── Define_ComponentMethod.ts     # ابزار تعریف Methods
│   │   ├── Interface_ComponentMethod.ts  # { args?, title?, description?, destination? }
│   │   ├── Callback_ComponentMethod.ts   # (event, dataArgs, componentArgs) => void
│   │   └── Type_ComponentMethod.ts
│   └── template/
│       ├── Define_ComponentTemplate.ts   # ابزار تعریف Templates
│       ├── Interface_ComponentTemplate.ts# { reference, html?, attrs?, value?, title?, description? }
│       └── Type_ComponentTemplate.ts
└── index.ts                              # export { ClComponentBase as App }
```

### ۲.۳. سلسله‌مراتب ارث‌بری

```
AbComponentConnector (abstract)
    │   renderManagerComponent()  → throw (must override)
    │   renderContentComponent()  → fallback DOM
    │   renderExampleComponent()  → static example
    ▲
    │ extends
    │
ClComponentBase<TProp, TSchemas, TTemplate, TMethods>
    │   renderComponent()           → main render entry
    │   connectedCallback()         → subscribe directionRtl
    │   createComponentElement()    → build DOM from Schema
    │   executeSchemaPart()         → render a specific part
    │   set/get/getObservable()     → prop access
    │   getScope()                  → render scope
    │   executeMethod()             → invoke callback
    ▲
    │ extends
    │
ComponentXxx (Implementation)
```

### ۲.۴. ماژولهای دیگر Core

| ماژول | کلاس‌های کلیدی | نقش |
|:---|:---|:---|
| `module_observable` | `ClObservable`, `ClScope` | State management + lifecycle |
| `module_reactive` | `ClReactiveElement` | DOM construction + binding |
| `module_event` | `ClEventDispatcher`, `ClStep`, `ClRequest`, `ClResponse` | Event workflow system |
| `module_configs` | `ClConfigApp`, `ClConfigState` | Framework configuration |
| `module_languages` | `ClLanguageApp` | i18n |
| `module_route` | `ClRouter`, `ClTemplateEngine` | Routing |

> برای جزئیات هر سیستم به [01-systems/](../01-systems/) مراجعه کنید.

---

## 3. Layer 2: UI Definition

**مسیر:** `src/framework/module_ui/`

### ۳.۱. مسئولیت

- تعریف قرارداد کامپوننت‌های UI (`ComponentDefinition`: id, name, version, category)
- دسته‌بندی درختی کامپوننت‌ها و آیکون‌ها (`module_categories`)
- تعریف آیکون‌ها (`module_icons`)
- تعریف صفحات (`module_pages`)

### ۳.۲. ساختار module_components در UI

```
module_ui/module_components/
├── basic/
│   └── types/
│       └── TComponentDefinition.ts    # { id, name, version, category }
└── lists/
    └── basic/
        ├── component/
        │   ├── Component.ts
        │   └── Definition.ts          # { id: "component", name: "component", version: "v1.0.0", category: ... }
        └── componentStructure/
            ├── ComponentStructure.ts
            └── Definition.ts
```

### ۳.۳. نقش

این لایه **کامپوننت نمی‌سازد** — بلکه **قرارداد** تعریف می‌کند. هر `Definition` شامل:

```typescript
export const Definition: ComponentDefinition = {
    id:       "component",
    name:     "component",
    version:  "v1.0.0",
    category: UiCategory.Lists.UI.Basic.Definition
}
```

---

## 4. Layer 3: Implementation

**مسیر:** `last/tools/components/`

### ۴.۱. مسئولیت

- پیاده‌سازی کامپوننت‌های واقعی و قابل استفاده
- ارث‌بری از `ClComponentBase`
- تعریف Props, Enums, Configs, Types, Base Class, Concrete Class

### ۴.۲. ساختار

```
last/tools/components/
├── ComponentButton.ts                 # دکمه
├── ComponentInput*.ts                 # انواع ورودی
├── ComponentTable.ts                  # جدول
├── ComponentWindow.ts                 # پنجره
├── ComponentIcon.ts                   # آیکون
├── ... (۳۰+ کامپوننت)
├── simples/                           # نسخه‌های ساده
│   ├── ComponentButtonSimple.ts
│   └── ComponentInputSimple.ts
├── inputs/                            # ورودی‌های پیشرفته
│   └── ComponentInput.ts
├── Content/                           # کامپوننت‌های محتوا
│   └── ComponentRecyclerView.ts
├── Positions/                         # کامپوننت‌های موقعیت
│   ├── ComponentFloatMenu.ts
│   └── ComponentPositionMenu.ts
└── index.ts                           # اکسپورت همه
```

### ۴.۳. الگوی ثابت هر کامپوننت

```
۱. Props (const + as const)
۲. Enums (مقادیر ممکن)
۳. Configs (keys + schemas + templates + methods)
۴. Type extraction (GOG_ExtractName*)
۵. Base Class (abstract, extends ClComponentBase)
۶. Concrete Class (extends Base, constructor calls renderComponent)
```

> برای جزئیات ساخت کامپوننت به [02-component/](../02-component/) مراجعه کنید.

---

## 5. Inter-Layer Communication

### ۵.۱. جریان ارث‌بری

```
ClComponentBase (Core)
    ▲
    │ extends
    │
ComponentXxxBase (Implementation - abstract)
    ▲
    │ extends
    │
ComponentXxx (Implementation - concrete)
```

### ۵.۲. جریان رندر

```
مصرف‌کننده
    │
    │ 1. new ComponentXxx(config, methods, events)
    │ 2. constructor → super.renderComponent(config, methods, events)
    ▼
ClComponentBase.renderComponent()
    │
    ├── connectedCallback()                    # subscribe directionRtl
    ├── #getReadyUserConfigAndDefaultConfig()  # merge config + defaults + templates → _COMPONENT_PROPS_BIND
    ├── #getReadyComponentMethods()            # bind callbacks → _COMPONENT_METHODS.destination
    └── createComponentElement()               # dispose old scope → new scope → executeSchemaPart(root)
            │
            ▼
        executeSchemaPart(partName)
            │
            ├── if method defined → call method(attrsDefault, data, extra)
            └── else → renderManagerComponent(partName, attrsDefault, data, extra)
                    │
                    ▼
                CoreReactive.App (DOM element)
                    │
                    ▼
                _COMPONENT_CONTENT
```

### ۵.۳. جریان داده Props

```
User config (Record<string, any>)
    │
    │ #getReadyUserConfigAndDefaultConfig
    ▼
For each prop in _COMPONENT_PATTERN:
    │
    ├── if in user config → use user value
    ├── else if in _COMPONENT_TEMPLATES (reference.prop matches) → use template value
    └── else → use default
    │
    │ if Observable → store directly
    │ else → wrap in new Observable
    ▼
_COMPONENT_PROPS_BIND[propName] = Observable
```

---

## 6. Rules

### MUST

- Core به Implementation وابسته **نباشد** → [R-ARCH-03](./AI_GUIDE_RULES.md#r-arch-03-dependency-direction)
- هر لایه فقط به لایه پایین‌تر وابسته باشد

### MUST NOT

- Implementation مستقیم به `ClObservable` یا `ClReactiveElement` دسترسی پیدا کند — باید از طریق `ClComponentBase` API استفاده کند

> برای لیست کامل قوانین به [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) مراجعه کنید.

---

## 7. Dependencies

### ۷.۱. وابستگی‌های Core

```
module_components → module_observable, module_reactive, module_configs
module_reactive   → module_observable, module_event
module_event      → (standalone)
module_observable → (standalone)
```

### ۷.۲. Import Aliases

```typescript
import * as CoreObservable   from "@/core_observable";   // module_observable
import * as CoreReactive     from "@/core_reactive";      // module_reactive
import * as CoreConfigs      from "@/core_configs";        // module_configs
import * as CoreEvent        from "@/core_event";          // module_event
```

---

## 8. AI Instructions

1. قبل از تغییر در Core، تأیید کن که تغییر در Implementation قابل حل نیست.
2. ساختار ماژول‌ها را تغییر نده — فقط محتوای داخلی ماژول‌ها.
3. وابستگی جدید به Core اضافه نکن مگر با بررسی دقیق.
4. برای درک یک ماژول خاص، Guide مربوطه در [01-systems/](../01-systems/) را بخوان.

---

## 9. Related Guides

- [AI_GUIDE_OVERVIEW.md](./AI_GUIDE_OVERVIEW.md) — نمای کلی
- [AI_GUIDE_TERMINOLOGY.md](./AI_GUIDE_TERMINOLOGY.md) — اصطلاحات
- [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) — قوانین
- [../01-systems/](../01-systems/) — Guideهای سیستم‌های داخلی
- [../02-component/](../02-component/) — Guideهای ساختار کامپوننت

---

## Source References

| مفهوم | فایل سورس |
|:---|:---|
| ClComponentBase | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| AbComponentConnector | `src/framework/module_core/module_components/basic/abstract/AbComponentConnector.ts` |
| Module index | `src/framework/module_core/index.ts` |
| UI Definition | `src/framework/module_ui/module_components/lists/basic/component/Definition.ts` |
| Implementation نمونه | `last/tools/components/ComponentButton.ts` |
