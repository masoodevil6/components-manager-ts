# AI Guide: Framework Overview

> **Audience:** همه AIهایی (چت، کدنویس، تحلیل‌گر) که با Framework کار می‌کنند.
>
> **Purpose:** ارائه تصویر کلی از معماری، لایه‌ها و جریان داده‌ها.
>
> **Level:** متوسط — نقطه شروع برای درک Framework.
>
> **Status:** Official

---

## 1. Definition

این پروژه یک **فریم‌ورک کامپوننت‌های UI مبتنی بر TypeScript** با معماری **واکنشی (Reactive)** و **Schema-based** است. کامپوننت‌ها بر اساس تعریف ساختاری (Schema) رندر می‌شوند و از سیستم Observable برای مدیریت وضعیت استفاده می‌کنند.

---

## 2. Responsibilities

این Framework مسئول موارد زیر است:

- تعریف قرارداد ساخت کامپوننت (Props, Schema, Methods, Templates)
- رندرینگ واکنشی DOM بر اساس Schema
- مدیریت وضعیت با Observable + Scope
- سیستم رویداد داخلی (Event/Step/Request/Response)
- سیستم چندزبانه (i18n)
- دسته‌بندی درختی کامپوننت‌ها و آیکون‌ها

---

## 3. Concepts

### ۳.۱. Schema-based Rendering

به‌جای نوشتن مستقیم HTML یا JSX، کامپوننت بخش‌های (Parts) خود را در Schema تعریف می‌کند و موتور رندر (`ClComponentBase.createComponentElement`) بر اساس آن DOM را می‌سازد.

### ۳.۲. Reactive System

تغییرات وضعیت از طریق Observable منتشر می‌شوند و المانهای Reactive به‌صورت خودکار به‌روز می‌شوند. نیازی به re-render دستی نیست.

### ۳.۳. Component Lifecycle

هر کامپوننت چرخه حیات مشخصی دارد: `constructor` → `renderComponent` → `connectedCallback` → آماده‌سازی Props → آماده‌سازی Methods → ثبت `emit` در `CoreEvent.App.registerEmit` → `createComponentElement` → ثبت Events.

> **Note (Plan 8.1.4):** `renderComponent` حالا `emit` را در `CoreEvent.App.registerEmit` ثبت می‌کند. `emit.bind(this)` باعث می‌شود `this` در emit به Component instance اشاره کند. emit فقط با request صدا زده می‌شود (خودبه‌خود با کلیک صدا زده نمی‌شود).

> برای تعریف دقیق اصطلاحات به [AI_GUIDE_TERMINOLOGY.md](./AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 4. Architecture

سیستم از سه لایه اصلی تشکیل شده است:

```
┌─────────────────────────────────────────────────────────────┐
│  لایه ۳: Implementation (پیاده‌سازی واقعی)                   │
│  مسیر: last/tools/components/                                │
│  مثال: ComponentButton.ts, ComponentInput.ts                 │
│  نقش: کامپوننت‌های آماده و قابل استفاده                       │
├─────────────────────────────────────────────────────────────┤
│  لایه ۲: UI Definition (تعریف رابط کاربری)                   │
│  مسیر: src/framework/module_ui/module_components/            │
│  نقش: تعریف ساختار کلی و دسته‌بندی کامپوننت‌ها در سطح UI      │
├─────────────────────────────────────────────────────────────┤
│  لایه ۱: Core (هسته)                                         │
│  مسیر: src/framework/module_core/                            │
│  نقش: کلاس پایه، ابزارهای تعریف، سیستمهای Observable/Reactive │
└─────────────────────────────────────────────────────────────┘
```

### جریان وابستگی

```
Core (ClComponentBase + Observable + Reactive + Event)
        ▲
        │ extends (ارث‌بری)
        │
UI Definition (قرارداد: id, name, version, category)
        ▲
        │ reference
        │
Implementation (ComponentButton, ComponentInput, ...)
        ▲
        │ instantiate + renderComponent(config, methods)
        │
   مصرف‌کننده (صفحات، اپلیکیشن)
```

> **قانون:** وابستگی همیشه از بالا به پایین است. Core به Implementation وابسته **نیست**. → [R-ARCH-03](./AI_GUIDE_RULES.md#r-arch-03-dependency-direction)

---

## 5. Rules

### MUST

- هر Component از `ClComponentBase` (alias: `CoreComponents.App`) ارث‌بری کند → [R-ARCH-01](./AI_GUIDE_RULES.md#r-arch-01-component-inheritance)
- چهار بخش `_COMPONENT_*` تعریف شوند → [R-ARCH-02](./AI_GUIDE_RULES.md#r-arch-02-four-component-sections)
- ۷ prop پایه از `ComponentStructureTrait.props` در `_COMPONENT_PATTERN` spread شوند (Plan 8.1.4)
- Scope قبل از re-render dispose شود → [R-SCOPE-01](./AI_GUIDE_RULES.md#r-scope-01-dispose-before-re-render)

### MUST NOT

- Core به Implementation وابسته شود → [R-ARCH-03](./AI_GUIDE_RULES.md#r-arch-03-dependency-direction)
- در context واکنشی از `observable.get()` مستقیم استفاده شود → [R-OBS-01](./AI_GUIDE_RULES.md#r-obs-01-no-direct-get-in-reactive-context)
- DOM مستقیم دستکاری شود (به‌جای Schema) → [R-RENDER-01](./AI_GUIDE_RULES.md#r-render-01-schema-based-rendering)

> برای لیست کامل قوانین به [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) مراجعه کنید.

---

## 6. Core Modules

لایه Core شامل ماژولهای زیر است:

| ماژول | مسیر | نقش |
|:---|:---|:---|
| `module_components` | `module_core/module_components/` | کلاس پایه + ابزارهای تعریف کامپوننت |
| `module_observable` | `module_core/module_observable/` | مدیریت وضعیت واکنشی (ClObservable + ClScope) |
| `module_reactive` | `module_core/module_reactive/` | ساخت و مدیریت DOM واکنشی (ClReactiveElement) |
| `module_event` | `module_core/module_event/` | سیستم رویداد (ClEventDispatcher + Step/Request/Response) |
| `module_configs` | `module_core/module_configs/` | تنظیمات فریم‌ورک |
| `module_languages` | `module_core/module_languages/` | سیستم چندزبانه |
| `module_route` | `module_core/module_route/` | مسیریابی |

---

## 7. Quick Reference

| مورد | مسیر |
|:---|:---|
| کلاس پایه | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| ابزار تعریف Prop | `src/framework/module_core/module_components/tools/prop/Define_ComponentProp.ts` |
| ابزار تعریف Schema | `src/framework/module_core/module_components/tools/schema/Define_ComponentSchema.ts` |
| ابزار تعریف Method | `src/framework/module_core/module_components/tools/method/Define_ComponentMethod.ts` |
| ابزار تعریف Template | `src/framework/module_core/module_components/tools/template/Define_ComponentTemplate.ts` |
| Observable | `src/framework/module_core/module_observable/class/ClObservable.ts` |
| Scope | `src/framework/module_core/module_observable/class/ClScope.ts` |
| Reactive Element | `src/framework/module_core/module_reactive/class/ClReactiveElement.ts` |
| Event Dispatcher | `src/framework/module_core/module_event/class/ClEventDispatcher.ts` |
| کامپوننت‌های واقعی | `last/tools/components/` |

---

## 8. AI Instructions

1. قبل از هر کاری، [AI_GUIDE_TERMINOLOGY.md](./AI_GUIDE_TERMINOLOGY.md) را بخوان.
2. قبل از تغییر کد، [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) را بررسی کن.
3. برای درک عمیق معماری، [AI_GUIDE_ARCHITECTURE.md](./AI_GUIDE_ARCHITECTURE.md) را بخوان.
4. برای درک سیستمهای داخلی، Guideهای [01-systems/](../01-systems/) را بررسی کن.
5. برای ساخت کامپوننت جدید، Guideهای [02-component/](../02-component/) را بخوان.
6. برای درک کامپوننت موجود، Guideهای [03-implementation/](../03-implementation/) را بررسی کن.

---

## 9. Related Guides

- [AI_GUIDE_TERMINOLOGY.md](./AI_GUIDE_TERMINOLOGY.md) — دیکشنری رسمی اصطلاحات
- [AI_GUIDE_RULES.md](./AI_GUIDE_RULES.md) — قوانین غیرقابل نقض
- [AI_GUIDE_ARCHITECTURE.md](./AI_GUIDE_ARCHITECTURE.md) — معماری دقیق لایه‌ها

---

## Source References

| مفهوم | فایل سورس |
|:---|:---|
| کلاس پایه | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| ساختار ماژولها | `src/framework/module_core/index.ts` |
| کامپوننت نمونه | `last/tools/components/ComponentButton.ts` |

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.1.4*
