# AI Guide: Terminology

> **Audience:** همه AIهایی که با Framework کار می‌کنند.
>
> **Purpose:** ایجاد Single Source of Truth برای واژگان Framework.
>
> **Level:** پایه — قبل از هر Guide دیگری خوانده شود.
>
> **Status:** Official

---

## 1. Definition

این فایل دیکشنری رسمی اصطلاحات Framework است. هر اصطلاح با ساختار زیر تعریف می‌شود:

- **Definition** — تعریف عمومی
- **In This Framework** — کاربرد مشخص در این پروژه
- **Not** — چیزی که این اصطلاح **نیست** (جلوگیری از سوءتفاهم)
- **Related** — اصطلاحات مرتبط

---

## Component

### Definition

یک واحد مستقل UI با ساختار، رفتار و چرخه حیات مشخص.

### In This Framework

کلاسی که از `ClComponentBase` ارث‌بری می‌کند و چهار بخش `_COMPONENT_PATTERN`، `_COMPONENT_SCHEMA`، `_COMPONENT_METHODS`، `_COMPONENT_TEMPLATES` را تعریف می‌کند. با فراخوانی `renderComponent(config, methods, events)` رندر می‌شود.

### Not

- Web Component یا Custom Element نیست.
- React/Vue Component نیست.
- فقط یک فایل TypeScript نیست — یک قرارداد کامل است.

### Related

`ClComponentBase`, `Pattern`, `Schema`, `Method`, `Template`

---

## ClComponentBase

### Definition

کلاس پایه انتزاعی که زیرساخت رندرینگ، مدیریت Props و چرخه حیات را فراهم می‌کند.

### In This Framework

کلاسی در `module_core/module_components/basic/class/ClComponentBase.ts` که چهار Generic می‌گیرد (`TProp`, `TSchemas`, `TTemplate`, `TMethods`) و از `AbComponentConnector` ارث‌بری می‌کند. متدهای اصلی: `renderComponent`, `connectedCallback`, `createComponentElement`, `executeSchemaPart`, `set`, `get`, `getObservable`, `getScope`, `executeMethod`.

### Not

- یک کامپوننت قابل استفاده مستقیم نیست — باید subclass شود.
- یک Abstract Class نیست (abstract کلمه کلیدی ندارد) اما فیلدهای `_COMPONENT_*` با `!` تعریف شده‌اند و باید در subclass مقداردهی شوند.

### Related

`Component`, `AbComponentConnector`, `Pattern`, `Schema`

---

## AbComponentConnector

### Definition

کلاس انتزاعی پایه‌ی `ClComponentBase` که متدهای رندر پیش‌فرض را تعریف می‌کند.

### In This Framework

کلاسی در `module_core/module_components/basic/abstract/AbComponentConnector.ts` با سه متد: `renderManagerComponent` (باید override شود)، `renderContentComponent` (fallback)، `renderExampleComponent` (static).

### Related

`ClComponentBase`

---

## Pattern

### Definition

تعریف ورودی‌های (Props) یک کامپوننت.

### In This Framework

فیلد `_COMPONENT_PATTERN` در `ClComponentBase` — یک Record از `Interface_ComponentProp` که با `Define_ComponentProp` تعریف می‌شود. هر prop شامل `prop` (نام)، `default` (مقدار پیش‌فرض)، `value` (مقدار فعلی)، `hasMultiTemplate`، `title`، `description` است.

### Not

- Design Pattern به معنای کلی نیست.
- فقط تایپ Props نیست — شامل metadata نیز هست.

### Related

`Component`, `Prop`, `Define_ComponentProp`

---

## Schema

### Definition

تعریف بخش‌های بصری (Parts) یک کامپوننت و نحوه رندر آن‌ها.

### In This Framework

فیلد `_COMPONENT_SCHEMA` در `ClComponentBase` — یک Record از `Interface_ComponentSchema` که با `Define_ComponentSchema` تعریف می‌شود. هر schema یک `part` (نام بخش)، `props` (لیست propهای استفاده شده)، و `method` (تابع رندر سفارشی اختیاری) دارد. اولین schema به‌عنوان root رندر می‌شود.

### Not

- JSON Schema یا database schema نیست.
- فقط ساختار HTML نیست — شامل رفتار رندر نیز هست.

### Related

`Component`, `Part`, `Define_ComponentSchema`

---

## Part

### Definition

یک بخش بصری (visual section) از کامپوننت که در Schema تعریف می‌شود.

### In This Framework

هر entry در `_COMPONENT_SCHEMA` یک Part است. نام Part در فیلد `part` ذخیره می‌شود (مثلاً `"part-main"`, `"part-border"`). موتور رندر در `executeSchemaPart` نام part را جستجو کرده و آن را رندر می‌کند. هر part یک `id` به‌فرمت `__component-{name}__{partName}__{randomId}` می‌گیرد.

### Related

`Schema`, `Component`, `executeSchemaPart`

---

## Method

### Definition

تعریف callbackهایی که مصرف‌کننده می‌تواند به آن‌ها متصل شود.

### In This Framework

فیلد `_COMPONENT_METHODS` در `ClComponentBase` — یک Record از `Interface_ComponentMethod` که با `Define_ComponentMethod` تعریف می‌شود. هر method شامل `args` (آرگومان‌هایی که به callback پاس داده می‌شوند)، `destination` (تابع callback که توسط کاربر set می‌شود)، `title`، `description` است. Callback امضا: `(event, dataArgs, componentArgs) => void`.

### Not

- متد کلاس به معنای OOP نیست — یک قرارداد callback است.
- Event listener مستقیم نیست — از طریق `executeMethod` فراخوانی می‌شود.

### Related

`Component`, `Callback_ComponentMethod`, `Define_ComponentMethod`

---

## Template

### Definition

تعریف حالت‌های مختلف نمایش برای یک Prop.

### In This Framework

فیلد `_COMPONENT_TEMPLATES` در `ClComponentBase` — یک Record از `Interface_ComponentTemplate` که با `Define_ComponentTemplate` تعریف می‌شود. هر template یک `reference` (ارجاع به prop)، `value` (مقدار ثابت)، `html`، `attrs` دارد. هنگام آماده‌سازی props، اگر prop مقدار ندارد، templates بررسی می‌شوند.

### Not

- HTML Template نیست.
- Vue/React Template نیست.

### Related

`Component`, `Pattern`, `Define_ComponentTemplate`

---

## Observable

### Definition

مقداری که تغییرات آن به‌صورت خودکار به اشتراک‌گذاران (subscribers) منتشر می‌شود.

### In This Framework

کلاس `ClObservable<T>` در `module_core/module_observable/class/ClObservable.ts`. متدها: `get`, `set`, `subscribe`, `map`, `mapBoolean`, `mapList`, `mapArray`. متدهای static: `computed`, `conditionSwitch`, `conditionWhen`, `for`, `forObject`. با `__isObservable = true` شناسایی می‌شود. در Componentها از طریق `_COMPONENT_PROPS_BIND` دسترسی دارد.

### Not

- RxJS Observable نیست — ساده‌تر و همگمان (synchronous) است.
- Promise نیست.

### Related

`Scope`, `Reactive`, `computed`

---

## Reactive

### Definition

سیستم ساخت و مدیریت المان‌های DOM که با تغییر Observable به‌روز می‌شوند.

### In This Framework

کلاس `ClReactiveElement` در `module_core/module_reactive/class/ClReactiveElement.ts`. با متدهای static مانند `div`, `span`, `svgPath` المان می‌سازد. هر المان Observableهای داخلی `hover`, `focus`, `active` دارد. از `attrsBind` برای attributeهای واکنشی و `children` برای محتوای واکنشی استفاده می‌کند. در `ClComponentBase` به‌صورت `_COMPONENT_CONTENT` ذخیره می‌شود.

### Not

- React نیست.
- Virtual DOM ندارد — مستقیم روی real DOM کار می‌کند.

### Related

`Observable`, `Component`, `ClReactiveElement`

---

## Scope

### Definition

مدیریت چرخه حیات اشتراک‌ها (subscriptions) برای جلوگیری از memory leak.

### In This Framework

کلاس `ClScope` در `module_core/module_observable/class/ClScope.ts`. متدها: `track` (ثبت dispose function)، `createChild` (ساخت scope فرزند)، `dispose` (پاک کردن همه اشتراک‌ها و scopeهای فرزند). در `ClComponentBase` به‌صورت `_renderScope` ذخیره می‌شود و با `getScope()` قابل دسترسی است. قبل از هر رندر جدید `dispose` می‌شود.

### Not

- Angular Scope نیست.
- JavaScript Scope (lexical) نیست.

### Related

`Observable`, `Component`, `dispose`

---

## Event

### Definition

سیستم رویدادهای داخلی Framework برای ارتباط بین Stepها و المان‌ها.

### In This Framework

ماژول `module_core/module_event` با کلاسهای `ClEventDispatcher`, `ClStep`, `ClRequest`, `ClResponse`. Dispatcher (singleton `App`) Stepها را ثبت می‌کند و `request` را به `response` تبدیل می‌کند. المانهای Reactive با `unique` و `emit` به Stepها متصل می‌شوند. Trace رکوردها برای دیباگ ذخیره می‌شوند.

### Not

- DOM Event نیست — یک سیستم workflow داخلی است.
- Event Emitter ساده نیست — شامل Request/Response و Step است.

### Related

`Workflow`, `Step`, `Request`, `Response`, `Reactive`

---

## Step

### Definition

یک واحد منطقی در سیستم Event که می‌تواند Request دریافت و Response تولید کند.

### In This Framework

کلاس `ClStep` در `module_event`. با factory `Step(definition)` ساخته و در `App.register` ثبت می‌شود. هر Step یک `identity` (symbol) و `unique` (string) دارد. می‌تواند children داشته باشد (درخت Step).

### Related

`Event`, `Request`, `Response`, `Workflow`

---

## Request

### Definition

یک درخواست منطقی از یک Step به یک یا چند Step دیگر.

### In This Framework

کلاس `ClRequest` در `module_event`. با `requestMap([[step, payload], ...])` ساخته و با `App.request(map, source?)` اجرا می‌شود. هر request یک `requestId` دارد و به ازای هر target یک `dispatchId` مستقل می‌گیرد.

### Related

`Event`, `Response`, `Step`, `Workflow`

---

## Response

### Definition

پاسخ یک Step به یک Request.

### In This Framework

کلاس `ClResponse` در `module_event`. شامل `target`, `source`, `dispatchId`, `status` ("success" | "error"), `timestamp`, و `value`. با factory `Response(value)` ساخته می‌شود.

### Related

`Event`, `Request`, `Step`

---

## Workflow

### Definition

جریان اجرای یک Request از طریق Stepها تا تولید Response.

### In This Framework

سیستم Event به‌صورت workflow عمل می‌کند: یک `requestMap` تعریف می‌شود، `App.request` آن را اجرا می‌کند، هر [Step, payload] یک Dispatch مستقل می‌سازد، و Responseها جمع‌آوری می‌شوند. ترتیب اجرا deterministic (ترتیب تعریف در requestMap) است.

### Related

`Event`, `Step`, `Request`, `Response`

---

## Lifecycle

### Definition

چرخه حیات یک Component از ساخت تا رندر تا dispose.

### In This Framework

چرخه حیات Component:
1. `constructor(name, elId)` — مقداردهی اولیه
2. `renderComponent(config, methods, events)` — فرآیند اصلی رندر
3. `connectedCallback()` — راه‌اندازی اشتراکها (directionRtl)
4. `#getReadyUserConfigAndDefaultConfig(config)` — ترکیب config کاربر + پیش‌فرض + templates
5. `#getReadyComponentMethods(methods)` — اتصال callbackها
6. `createComponentElement()` — ساخت DOM از Schema (dispose scope قبلی → scope جدید → executeSchemaPart)
7. ثبت events روی `_COMPONENT_CONTENT`

### Related

`Component`, `Scope`, `renderComponent`

---

## Implementation

### Definition

لایه پیاده‌سازی کامپوننت‌های واقعی و قابل استفاده.

### In This Framework

مسیر `last/tools/components/` — کامپوننت‌های واقعی مانند `ComponentButton`, `ComponentInput`, `ComponentTable`. هر کامپوننت از `ClComponentBase` ارث‌بری می‌کند و الگوی ثابت Props → Enums → Configs → Types → Base Class → Concrete Class را دنبال می‌کند.

### Related

`Component`, `ClComponentBase`, `Core`, `UI Definition`

---

## UI Definition

### Definition

لایه تعریف قراردادهای رابط کاربری و دسته‌بندی کامپوننت‌ها.

### In This Framework

مسیر `src/framework/module_ui/module_components/` — تعریف `ComponentDefinition` (id, name, version, category) و دسته‌بندی درختی. این لایه کامپوننت نمی‌سازد، بلکه قرارداد تعریف می‌کند.

### Related

`Component`, `Implementation`, `Core`

---

## Core

### Definition

لایه هسته Framework — زیرساخت تعریف و رندر کامپوننت.

### In This Framework

مسیر `src/framework/module_core/` — شامل ماژولهای: `module_components` (ClComponentBase + tools), `module_observable` (ClObservable + ClScope), `module_reactive` (ClReactiveElement), `module_event` (ClEventDispatcher + Step/Request/Response), `module_configs`, `module_languages`, `module_route`.

### Not

- به Implementation وابسته **نیست** — این یک قانون غیرقابل نقض است.

### Related

`ClComponentBase`, `Observable`, `Reactive`, `Scope`, `Event`, `Implementation`

---

## Define_* (Define Functions)

### Definition

توابع کمکی برای تعریف بخشهای کامپوننت با Type Inference.

### In This Framework

چهار تابع در `module_core/module_components/tools/`:
- `Define_ComponentProp` — تعریف Pattern (props)
- `Define_ComponentSchema` — تعریف Schema (parts)
- `Define_ComponentMethod` — تعریف Methods (callbacks)
- `Define_ComponentTemplate` — تعریف Templates (variants)

همگی یک شیء می‌گیرند و همان را با تایپسیف برمی‌گردانند. نقش اصلیشان Type Inference از طریق Genericها است.

### Related

`Pattern`, `Schema`, `Method`, `Template`

---

## Related Guides

- [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) — قوانین غیرقابل نقض Framework
- [AI_GUIDE_OVERVIEW.md](./AI_GUIDE_OVERVIEW.md) — نمای کلی
- [AI_GUIDE_ARCHITECTURE.md](./AI_GUIDE_ARCHITECTURE.md) — معماری لایه‌ها

---

## Source References

| اصطلاح | فایل سورس |
|:---|:---|
| `ClComponentBase` | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| `AbComponentConnector` | `src/framework/module_core/module_components/basic/abstract/AbComponentConnector.ts` |
| `Define_ComponentProp` | `src/framework/module_core/module_components/tools/prop/Define_ComponentProp.ts` |
| `Define_ComponentSchema` | `src/framework/module_core/module_components/tools/schema/Define_ComponentSchema.ts` |
| `Define_ComponentMethod` | `src/framework/module_core/module_components/tools/method/Define_ComponentMethod.ts` |
| `Define_ComponentTemplate` | `src/framework/module_core/module_components/tools/template/Define_ComponentTemplate.ts` |
| `ClObservable` | `src/framework/module_core/module_observable/class/ClObservable.ts` |
| `ClScope` | `src/framework/module_core/module_observable/class/ClScope.ts` |
| `ClReactiveElement` | `src/framework/module_core/module_reactive/class/ClReactiveElement.ts` |
| `ClEventDispatcher` | `src/framework/module_core/module_event/class/ClEventDispatcher.ts` |
