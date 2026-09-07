# AI Guide: Component Creation — راهنمای کامل ساخت Component جدید

> **Audience:** همه AIهایی (چت، کدنویس، تحلیل‌گر) که می‌خواهند Component جدید بسازند.
>
> **Purpose:** تعیین دقیق و مو به مو تمام فایل‌ها، typeها، الگوها و قوانینی که برای ساخت یک Component جدید نیاز است.
>
> **Level:** پایه — پیش‌نیاز مطالعه `Basic/00-framework/AI_GUIDE_RULES.md`.
>
> **Status:** Official

---

## ۰. خلاصه اجرایی

برای ساخت یک Component جدید (مثلاً `ComponentButton`) نیاز به این فایل‌ها هست:

```
src/framework/module_ui/module_components/lists/componentButton/
│
├── Definition.ts              ← شناسنامه Component
├── Props.ts                   ← تعریف ورودی‌ها (declarative)
├── Schemas.ts                 ← تعریف Partها (declarative)
├── Methods.ts                 ← تعریف Methodها (declarative)
├── Step.ts                    ← درخت Workflow داخلی (CoreEvent.Step)
├── ComponentButtonBase.ts     ← Base کلاس (config + ۴ فیلد protected)
├── ComponentButton.ts         ← کلاس نهایی (constructor + render اختصاصی)
│
├── examples/
│   ├── Default.ts             ← Example پیش‌فرض (با render() callable)
│   ├── Clickable.ts           ← Example با CLICK callback + آیکون
│   ├── Variants.ts            ← Example با چند variant (primary/secondary/ghost)
│   └── index.ts               ← Registry Examples (satisfies Record<string, ComponentExample>)
│
└── index.ts                   ← Public API
```

و در نهایت:
- ثبت در `ComponentManager` (Core)
- ثبت در `Category` (UI Categories)

---

## ۱. اصول معماری

### ۱.۱. اصل طلایی

```
Schema     = "What exists?"           (declarative — part + props)
Component  = "How does it behave?"    (runtime — state + rendering)
Definition = "What is this?"          (metadata — id + name + version)
Example    = "How to present it?"     (factory — render() → HTMLElement)
Step       = "Internal workflow"      (CoreEvent — request + response)
Category   = "How to access it?"      (UI — callable + .info)
```

### ۱.۲. مرزها

| مجاز | ممنوع |
|:---|:---|
| `Component → Schemas` (برای دسترسی به part name) | `Schemas → Component` |
| `Component → Props` (برای دسترسی به prop entry) | `Props → Component` |
| `Component → Step` (برای اتصال reactiveElement) | `Step → Component` |
| `Component → CoreReactive` (برای render) | `Schemas → CoreReactive` (render در Schema ممنوع) |
| `Example → Component` (برای instantiate در render()) | `Component → Example` |
| `Category → Component` (برای ساخت Totality) | `Component → Category` |

### ۱.۳. لایه‌ها

```
Declarative Layer          Runtime Layer              Access Layer
─────────────────          ─────────────              ────────────
Definition (Core)          ComponentButtonBase        Category
Props (Core)                   ↓ extends               ↓ CreateCategoryComponent
Schemas (Core)               ComponentButton           ↓
Methods (Core)                  ↓ extends             UiCategory.UI.Simples.Button(...)
Step (Core)                  ComponentStructure
Examples (Core)                 ↓ extends
                             ClComponentBase (Core)
```

### ۱.۴. محل تعریف Types

**همه Types در `module_core` تعریف شده‌اند** (پلن ۶.۱):

| Type | دسترسی |
|:---|:---|
| `ComponentDefinition` | `CoreComponents.ComponentDefinition` |
| `ComponentPropEntry` | `CoreComponents.ComponentPropEntry` |
| `ComponentProps` | `CoreComponents.ComponentProps` |
| `ComponentSchemaEntry` | `CoreComponents.ComponentSchemaEntry` |
| `ComponentSchemas` | `CoreComponents.ComponentSchemas` |
| `ComponentIdentity` | `CoreComponents.ComponentIdentity` |
| `ComponentExample` | `CoreComponents.ComponentExample` |
| `ComponentManager` | `CoreComponents.ComponentManager` |
| `ComponentRegistryEntry` | `CoreComponents.ComponentRegistryEntry` |

**مهم:** از `UiComponents.Basic.Types.*` استفاده **نکنید** — deprecated است.
از `CoreComponents.*` استفاده کنید.

---

## ۲. فایل ۱ — Definition.ts

### هدف

شناسنامه Component — `id`, `name`, `version`, `category`.

### الگو

```typescript
import * as CoreComponents from "@/core_components"
// --------------------------------


/**
 * Definition — شناسنامه ComponentButton
 * مستقل از Runtime — Component Manager بدون instantiate کردن این را می‌خواند.
 */
export const Definition: CoreComponents.ComponentDefinition = {

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
| Definition را import نکند که به Component کلاس وابسته باشد | **MUST NOT** |
| از `CoreComponents.ComponentDefinition` استفاده شود | **MUST** |

---

## ۳. فایل ۲ — Props.ts

### هدف

تعریف ورودی‌های Component — هر prop شامل `prop`, `default`, `name`, `description`.

### الگو

```typescript
import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentButton
 */
export enum ButtonSemantic {
    CUSTOM =    "custom",
    SUBMIT =    "submit",
    CANCEL =    "cancel",
    BACK =      "back"
}

export enum ButtonVariants {
    PRIMARY =   "primary",
    SECONDARY = "secondary",
    GHOST =     "ghost",
    ICON =      "icon",
}

export enum ButtonAction {
    SUBMIT =    "submit",
    BUTTON =    "button",
}


/**
 * Props اختصاصی ComponentButton (Plan 9.1.1 — بازیابی کامل ۲۴ prop Legacy)
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 *
 * Plan 9.1.3 — Define_ComponentProp<T>:
 *   از helper به‌جای satisfies استفاده می‌شود تا نوع T در return type
 *   حفظ شود و از literal narrowing جلوگیری شود.
 */
export const Props = {

    prop_btnType: Define_ComponentProp<ButtonAction>({
        prop:         "prop_btnType",
        default:      ButtonAction.BUTTON,
        name:         Keys.category.components.button.props.btnType.name,
        description:  Keys.category.components.button.props.btnType.description,
    }),

    prop_btnVariant: Define_ComponentProp<ButtonVariants>({
        prop:         "prop_btnVariant",
        default:      ButtonVariants.PRIMARY,
        name:         Keys.category.components.button.props.btnVariant.name,
        description:  Keys.category.components.button.props.btnVariant.description,
    }),

    prop_btnTitle: Define_ComponentProp<string>({
        prop:         "prop_btnTitle",
        default:      "",
        name:         Keys.category.components.button.props.btnTitle.name,
        description:  Keys.category.components.button.props.btnTitle.description,
    }),

    prop_btnClass: Define_ComponentProp<string[]>({
        prop:         "prop_btnClass",
        default:      [],
        name:         Keys.category.components.button.props.btnClass.name,
        description:  Keys.category.components.button.props.btnClass.description,
    }),

    prop_btnStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_btnStyles",
        default:      {},
        name:         Keys.category.components.button.props.btnStyles.name,
        description:  Keys.category.components.button.props.btnStyles.description,
    }),

    prop_btnDisabled: Define_ComponentProp<boolean>({
        prop:         "prop_btnDisabled",
        default:      false,
        name:         Keys.category.components.button.props.btnDisabled.name,
        description:  Keys.category.components.button.props.btnDisabled.description,
    }),

    prop_btnSemantic: Define_ComponentProp<ButtonSemantic>({
        prop:         "prop_btnSemantic",
        default:      ButtonSemantic.SUBMIT,
        name:         Keys.category.components.button.props.btnSemantic.name,
        description:  Keys.category.components.button.props.btnSemantic.description,
    }),

    prop_btnWidth: Define_ComponentProp<string | null>({
        prop:         "prop_btnWidth",
        default:      null,
        name:         Keys.category.components.button.props.btnWidth.name,
        description:  Keys.category.components.button.props.btnWidth.description,
    }),

    prop_btnHeight: Define_ComponentProp<string | null>({
        prop:         "prop_btnHeight",
        default:      null,
        name:         Keys.category.components.button.props.btnHeight.name,
        description:  Keys.category.components.button.props.btnHeight.description,
    }),

    // ... سایر propهای اختصاصی (borderColor, borderRadius, titleColor, icon, ...)

    prop_btnIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_btnIcon",
        default:      null,
        name:         Keys.category.components.button.props.btnIcon.name,
        description:  Keys.category.components.button.props.btnIcon.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentButton — برای استفاده در TProp
 *
 * Plan 9.1.3 — ExtractPropsType از TypeHelpers:
 *   به‌جای تعریف inline، از helper آماده استفاده می‌شود.
 *   این helper از TProps[K]["default"] استفاده می‌کند که با
 *   Define_ComponentProp<T> به‌درستی نوع T را استخراج می‌کند.
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
```

### نکته — Enums اختصاصی

اگر Component نیاز به enumهای اختصاصی دارد (مثل `ButtonSemantic`, `ButtonVariants`, `ButtonAction`)، آن‌ها را در همان `Props.ts` تعریف کنید — قبل از `Props` const. این الگو از کپسوله کردن نوع‌های اختصاصی Component در یک فایل جلوگیری می‌کند.

### قوانین

| قانون | سطح |
|:---|:---|
| هر prop شامل `prop`, `default`, `name`, `description` باشد | **MUST** |
| `prop` با `prop_` شروع شود (برای propهای اختصاصی) | **SHOULD** |
| `default` type-correct باشد | **MUST** |
| **(Plan 9.1.3)** هر prop با `Define_ComponentProp<T>(...)` تعریف شود — نه `satisfies TComponentPropEntry<T>` | **MUST** |
| **(Plan 9.1.3)** Generic `<T>` صریحاً پاس شود — type inference کافی نیست | **MUST** |
| **(Plan 9.1.3)** اگر `default: null` است، نوع باید `T \| null` باشد | **MUST** |
| **(Plan 9.1.3)** `PropsType` با `ExtractPropsType<typeof Props>` تعریف شود — نه inline | **MUST** |
| **(Plan 9.1.3)** `PropsConfigType` با `ExtractPropsConfigType<typeof Props>` تعریف شود | **MUST** |
| `name` و `description` از `Keys` (سیستم ترجمه) استفاده کنند | **MUST** |
| Props نباید Rendering انجام دهد | **MUST NOT** |
| Props نباید به Runtime وابسته باشد | **MUST NOT** |
| `satisfies CoreComponents.ComponentProps` در آبجکت نهایی استفاده شود | **MUST** |
| از `satisfies TComponentPropEntry<T>` در propهای فردی استفاده **نشود** — **MUST NOT** (Plan 9.1.3) |

### نکته

۷ prop پایه از `ComponentStructure` به‌صورت خودکار ارث می‌رسند:
`selector`, `append`, `classList`, `styles`, `prop_show`, `prop_structureClass`, `prop_structureStyles`.

شما فقط propهای **اختصاصی** Component را تعریف می‌کنید.

---

## ۴. فایل ۳ — Schemas.ts

### هدف

تعریف Partهای Component — فقط `part`, `props`, `name`, `description`.

### الگو

```typescript
import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentButton (Plan 9.1.1 — بازیابی ۴ schema Legacy)
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-button> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentButton قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    BUTTON: {
        part:         "part-button",
        props:        [Props.prop_btnTitle, Props.prop_btnType, Props.prop_btnSemantic, ...],
        name:         Keys.category.components.button.schemas.button.name,
        description:  Keys.category.components.button.schemas.button.description,
    },

    BUTTON_TITLE: {
        part:         "part-button-title",
        props:        [Props.prop_btnTitle, Props.prop_btnSemantic, Props.prop_btnTitleColor, ...],
        name:         Keys.category.components.button.schemas.buttonTitle.name,
        description:  Keys.category.components.button.schemas.buttonTitle.description,
    },

    BUTTON_ICON: {
        part:         "part-button-icon",
        props:        [Props.prop_btnIcon, Props.prop_btnIconStyles, Props.prop_btnIconClass, ...],
        name:         Keys.category.components.button.schemas.buttonIcon.name,
        description:  Keys.category.components.button.schemas.buttonIcon.description,
    },

    WRAPPER: {
        part:         "part-button-wrapper",
        props:        [Props.prop_btnWidth, Props.prop_btnHeight],
        name:         Keys.category.components.button.schemas.wrapper.name,
        description:  Keys.category.components.button.schemas.wrapper.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentButton — برای استفاده در TSchemas
 *
 * Plan 11.2 — ExtractSchemasType از TypeHelpers:
 *   به‌جای تعریف inline، از helper آماده استفاده می‌شود.
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
```

### قوانین

| قانون | سطح |
|:---|:---|
| **(Plan 11.2)** `COMPONENT` و `STRUCTURE` از `ComponentStructureTrait.schemas` به‌عنوان اولین ورودی‌ها اضافه شوند | **MUST** |
| هر schema شامل `part`, `props` باشد | **MUST** |
| `part` با `part-` شروع شود و یکتا باشد | **MUST** |
| `props` به entryهای `Props` اشاره کند (نه string) | **MUST** |
| `name` و `description` از `Keys` استفاده کنند | **SHOULD** |
| **هیچ** `handler`, `method`, `render` در Schema نباشد | **MUST NOT** |
| Schema به CoreReactive وابسته نباشد | **MUST NOT** |
| Schema به Component کلاس وابسته نباشد | **MUST NOT** |
| `satisfies CoreComponents.ComponentSchemas` استفاده شود | **MUST** |
| **(Plan 11.2)** `SchemasType` با `ExtractSchemasType<typeof Schemas>` تعریف شود — نه inline | **MUST** |

### نکته

۲ schema پایه (`COMPONENT`, `STRUCTURE`) از `ComponentStructureTrait.schemas` به‌عنوان اولین ورودی‌ها اضافه می‌شوند.
این باعث می‌شود لایه `<component-{name}>` و `<section>` به‌صورت خودکار رندر شوند.
شما فقط schemaهای **اختصاصی** Component را تعریف می‌کنید.

---

## ۵. فایل ۴ — Methods.ts

### هدف

تعریف قرارداد Methodهای Component — callbackهای قابل تعریف توسط مصرف‌کننده.

`Methods` سه مسئولیت دارد:

1. تعریف semantic method keys (CLICK, HOVER, ...) — **Public API**
2. نگهداری runtime method name (`fn_onClickButton`, ...) — **implementation**
3. تعریف metadata مربوط به Component/Data Args — **source of truth**

### الگو

```typescript
import {Props as ButtonProps} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentButton
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK", event, params) استفاده می‌کند.
 *
 * Plan 8.1.4:
 *   - semantic keys متعلق به Public API هستند (CLICK, HOVER, ...)
 *   - runtime name متعلق به implementation است (fn_onClickButton, ...)
 *   - args و dataArgs در اینجا تعریف می‌شوند و type‌ها از آنجا استخراج می‌شوند
 *
 * Plan 9.1.3:
 *   - type extraction از TypeHelpers استفاده می‌کند — نه inline تعریف
 *   - args به prop entryها اشاره می‌کند که با Define_ComponentProp<T> تعریف شده‌اند
 *   - ExtractMethodsComponentArgs به‌درستی نوع T (نه literal) را استخراج می‌کند
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickButton",
        description: "Callback when button is clicked",

        // componentArgs — prop reference‌ها
        // در زمان اجرا resolve می‌شوند به مقادیر فعلی props
        args: {
            TITLE:    ButtonProps.prop_btnTitle,
            VARIANT:  ButtonProps.prop_btnVariant,
            SEMANTIC: ButtonProps.prop_btnSemantic,
        },

        // dataArgs — type تعریف‌شده برای داده‌های runtime
        dataArgs: {} as const,
    },

    HOVER: {
        name:        "fn_onHoverButton",
        description: "Callback when mouse enters button",

        args: {
            TITLE:    ButtonProps.prop_btnTitle,
            VARIANT:  ButtonProps.prop_btnVariant,
            SEMANTIC: ButtonProps.prop_btnSemantic,
        },

        dataArgs: {} as const,
    },

    BLUR: {
        name:        "fn_onBlurButton",
        description: "Callback when mouse leaves button",

        args: {
            TITLE:    ButtonProps.prop_btnTitle,
            VARIANT:  ButtonProps.prop_btnVariant,
            SEMANTIC: ButtonProps.prop_btnSemantic,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentButton — برای استفاده در TMethods (داخلی Component)
 *
 * Plan 9.1.3 — از ExtractMethodsType در TypeHelpers استفاده می‌شود
 */
export type MethodsType = ExtractMethodsType<typeof Methods>;


/**
 * Component Args type برای هر method
 * از args (prop reference) استخراج می‌شود
 *
 * مثال: MethodsComponentArgs["CLICK"]["SEMANTIC"] = ButtonSemantic (نه ButtonSemantic.SUBMIT)
 */
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;


/**
 * Data Args type برای هر method
 * از dataArgs تعریف‌شده در Methods استخراج می‌شود
 *
 * مثال: MethodsDataArgs["CLICK"] = {}
 */
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;


/**
 * نوع config methods برای مصرف‌کننده (Category callable)
 *
 * کلیدهای Public (semantic) از keyof typeof Methods استخراج می‌شوند.
 * هر method callback با type‌های کامل برای autocomplete:
 *   - event: Event
 *   - dataArgs: MethodsDataArgs[K] | null
 *   - componentArgs: MethodsComponentArgs[K] | null
 *   - this: TThis (Component instance)
 *
 * استفاده:
 *   UiCategory.UI.Simples.Button(
 *       { prop_btnTitle: ... },
 *       {
 *           CLICK: function(event, dataArgs, componentArgs) {
 *               // autocomplete:
 *               //   componentArgs?.TITLE    ← string
 *               //   componentArgs?.VARIANT  ← ButtonVariants (نه literal)
 *               //   componentArgs?.SEMANTIC ← ButtonSemantic (نه literal)
 *               //   dataArgs              ← {}
 *               //   this                  ← ComponentButton (fn.call(this, ...))
 *           },
 *       },
 *       { unique, emit, events },
 *   );
 *
 * نکته: برای استفاده از `this` به‌عنوان Component instance، از `function` استفاده شود.
 * Arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;
```

### قوانین

| قانون | سطح |
|:---|:---|
| `name` با `fn_on` شروع شود | **MUST** |
| semantic keys (CLICK, HOVER, ...) متعلق به Public API باشند | **MUST** |
| runtime `name` متعلق به implementation باشد — نباید به Public API نشت کند | **MUST** |
| `args` به propهای موجود در `Props` اشاره کند | **MUST** |
| `dataArgs` با `as const` تعریف شود | **MUST** |
| **(Plan 9.1.3)** `MethodsType`, `MethodsComponentArgs`, `MethodsDataArgs`, `MethodsConfigType` از `TypeHelpers` استخراج شوند — نه inline | **MUST** |
| `MethodsConfigType<TThis>` با `this: TThis` تعریف شود | **MUST** |
| Methods نباید Rendering انجام دهد | **MUST NOT** |
| Methods نباید به Runtime وابسته باشد | **MUST NOT** |

### تفاوت Methods و Component methods

```
Methods (declarative)     →  API/Event callback قابل تعریف توسط مصرف‌کننده
Component methods (runtime) →  Behavior داخلی Component (renderForm, toggle, ...)
```

این دو نباید یکی شوند.

### تفکیک Semantic Key و Runtime Name

```text
CLICK (public API)
   ↓
Methods.CLICK.name = "fn_onClickButton" (implementation)
   ↓
_COMPONENT_METHODS["CLICK"].destination
   ↓
executeMethod("CLICK", event, dataArgs)
   ↓
fn.call(this, event, dataArgs, componentArgs)
```

مصرف‌کننده فقط `CLICK` را می‌شناسد — `fn_onClickButton` implementation detail است.
تغییر `name` داخلی نباید Public API را بشکند.

---

## ۶. فایل ۵ — Step.ts

### هدف

تعریف درخت Workflow داخلی Component — `CoreEvent.Step`.

### الگو

```typescript
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentButton
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentButton Instance باید Step Instance مستقل داشته باشد.
 *
 *   ComponentButton #1 → createButtonStep() → Step #1
 *   ComponentButton #2 → createButtonStep() → Step #2
 *
 * click / hover / blur:
 *   click    ← Event Engine endpoint (unique روی <button>)
 *   hover    ← DOM → Method API (ساختار Step برای آینده)
 *   blur     ← DOM → Method API (ساختار Step برای آینده)
 */
export function createButtonStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            hover: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            blur: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
```

### قوانین

| قانون | سطح |
|:---|:---|
| Step با `CoreEvent.Step()` ساخته شود | **MUST** |
| هر child Step شامل `request` و `response` باشد | **SHOULD** |
| Step در فایل جدا (نه در Component کلاس) تعریف شود | **MUST** |
| Step به Component کلاس وابسته نباشد | **MUST NOT** |
| **(Plan 9.1)** Step به‌صورت **factory function** تعریف شود (نه ثابت) — هر Instance Step مستقل داشته باشد | **MUST** |
| **(Plan 8.2.7)** `children` مستقیم mutate نشود — از `SubEvent` استفاده شود | **MUST NOT** |
| **(Plan 8.2.8)** Step factory `createMessagesStep()` باشد (نه `createStep`) اگر Component چندین Instance Event Scope دارد | **SHOULD** |

### نکته

اگر Component نیاز به Workflow داخلی ندارد (مثلاً یک Component display-only)،
می‌توانید این فایل نسازید و `step` را در constructor پاس ندهید.

### نکته — Plan 8.2.7 (SubEvent)

اگر Component دارای Parent Step است (یعنی `identity.unique` در constructor پاس داده می‌شود)،
Base کلاس به‌صورت خودکار `CoreEvent.SubEvent(identity.unique, componentName, step)` را صدا می‌زند.

این یعنی:
- Step داخلی Component به‌عنوان فرزند با `componentName` به Parent Step متصل می‌شود.
- همه نسل‌های Step در رجیستری App ثبت می‌شوند.
- `dispose(step)` کل subtree را پاک می‌کند (بازگشتی).

```typescript
// در Base constructor (Plan 8.2.7):
if (step && identity?.unique) {
    CoreEvent.SubEvent(identity.unique, componentName, step);
}
```

### نکته — Plan 8.2.8 (Per-Message Event Scope)

اگر Component دارای فرزندهای dynamic است (مثل `ComponentMessages` که هر پیام یک Scope مستقل دارد)،
Step factory باید یک تابع باشد که هر بار صدا زده می‌شود، یک Step درخت جدید بسازد:

```typescript
// Step.ts — factory function (نه ثابت)
export function createMessagesStep() {
    return CoreEvent.Step({
        children: {
            messages: CoreEvent.Step({
                children: {
                    // message scopes در runtime از طریق SubEvent اضافه می‌شوند
                },
            }),
        },
    });
}
```

> **قانون طلایی (Plan 8.2.8):** State changes ≠ Event identity changes
> Message Identity باید قبل از Render تثبیت شود — نه در render cycle.

---

## ۷. فایل ۶ — ComponentButtonBase.ts

### هدف

Base کلاس — ترکیب Props/Schemas/Methods/Definition پایه با اختصاصی.

### الگو — با ComponentStructureTrait (Plan 8.1.2)

```typescript
import * as CoreComponents   from "@/core_components";
import * as CoreEvent        from "@/core_event";
// --------------------------------
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
// --------------------------------
import {Props,     PropsType}     from "./Props";
import {Schemas,   SchemasType}   from "./Schemas";
import {Methods,   MethodsType}   from "./Methods";
import {Definition}               from "./Definition";


/**
 * ComponentButtonBase — ترکیب config پایه و اختصاصی
 *
 * ارث از CoreComponents.App (ClComponentBase) — نه ComponentStructure.
 * ComponentButton خودش یک Component مستقل است.
 * ComponentStructure به‌عنوان فرزند در renderContentComponent استفاده می‌شود.
 *
 * ۷ prop پایه ComponentStructure از ComponentStructureTrait.props در _COMPONENT_PATTERN
 * ثبت می‌شوند تا کاربر بتواند آن‌ها را set کند — سپس در renderContentComponent
 * به ComponentStructure.create() forward می‌شوند.
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait.schemas
 * در _COMPONENT_SCHEMA spread می‌شوند تا لایه <component-button> + <section> رندر شوند.
 *
 * Plan 8.2.7 / 9.1 — SubEvent + Event Scope Ownership:
 *   هر ComponentButton مالک Step Instance خودش است.
 *   disposal یک Component فقط باید Event resources متعلق به همان Component را آزاد کند.
 */
export class ComponentButtonBase extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType
> {

    /**
     * Step Node — درخت Workflow داخلی ComponentButton
     */
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName — نام Component (default: "button")
     * @param elId          — شناسه المان (default: null)
     * @param identity      — بیرونی { unique?, emit?, events? }
     * @param step          — داخلی (Workflow خاص این Component)
     */
    constructor(
        componentName: string = "button",
        elId: string | null   = null,
        identity?: {
            unique?: CoreEvent.TStepRef | null;
            emit?:   CoreEvent.TEmitHandler | null;
            events?: Record<string, any> | null;
        },
        step?: CoreEvent.TStepInstance<any>,
    ) {
        super(componentName, elId);

        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;

        this._COMPONENT_STEP   = step ?? null;

        // Plan 8.2.7 — SubEvent
        // Guard: identity.unique باید یک Step واقعی باشد (symbol identity داشته باشد).
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }


    /**
     * Disposal — پاک‌سازی کل subtree از رجیستری CoreEvent (Plan 8.2.7 / 9.1)
     */
    disposeStep(): void {
        if (this._COMPONENT_STEP) {
            CoreEvent.dispose(this._COMPONENT_STEP);
            this._COMPONENT_STEP = null;
        }
    }

    protected _COMPONENT_DEFINITION = Definition;

    // ۷ prop پایه (از Trait) + propهای اختصاصی ComponentButton
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);

    // Plan 11.2 — Schema پایه (از Trait) + schemaهای اختصاصی
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({
        ...Methods,
    } as any);

}
```

### نکته — ComponentStructureTrait

`ComponentStructureTrait` یک capability مشترک است که:
- ۷ prop پایه (`classList`, `prop_show`, `prop_structureClass`, ...) را در `props` نگه می‌دارد
- ۲ schema پایه (`COMPONENT`, `STRUCTURE`) را در `schemas` نگه می‌دارد (Plan 11.2)
- متد `renderComponentSchema` برای رندر لایه `<component-{name}>` فراهم می‌کند (Plan 11.2)
- متد `renderStructureSchema` برای رندر لایه `<section>` فراهم می‌کند (Plan 11.2)
- متد `renderContent` برای ساخت ComponentStructure به‌عنوان فرزند فراهم می‌کند
- در `traits/` folder قرار دارد (نه در `componentStructure/`)

این الگو از "MegaComponent" anti-pattern جلوگیری می‌کند — Componentها از Traitها capability می‌گیرند
بدون اینکه از ComponentStructure ارث ببرند.

### قوانین

| قانون | سطح |
|:---|:---|
| از `CoreComponents.App` (ClComponentBase) ارث‌بری کند | **MUST** |
| چهار فیلد `_COMPONENT_*` را override کند | **MUST** |
| `ComponentStructureTrait.props` در `_COMPONENT_PATTERN` spread شود | **MUST** |
| **(Plan 11.2)** `ComponentStructureTrait.schemas` در `_COMPONENT_SCHEMA` spread شود | **MUST** |
| **(Plan 9.1)** `disposeStep()` در Base پیاده‌سازی شود | **MUST** |
| **(Plan 8.2.7)** SubEvent guard: `typeof (identity.unique as any).identity === "symbol"` چک شود | **MUST** |
| Rendering در این کلاس نباشد | **MUST NOT** |
| `renderContentComponent` در این کلاس نباشد | **MUST NOT** |

### الگوی spread

هر چهار فیلد از همین الگو پیروی می‌کنند:

```typescript
// ۷ prop پایه از Trait + propهای اختصاصی
protected _COMPONENT_PATTERN = CoreComponents.DefineProp({
    ...ComponentStructureTrait.props,  // از Trait
    ...CustomProps,                    // اختصاصی
} as any);

// Plan 11.2 — Schema پایه از Trait + schemaهای اختصاصی
protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema({
    ...ComponentStructureTrait.schemas,  // از Trait (COMPONENT + STRUCTURE)
    ...CustomSchemas,                     // اختصاصی
} as any);

protected _COMPONENT_METHODS = CoreComponents.DefineMethod({
    ...CustomMethods,  // اختصاصی (با args, dataArgs)
} as any);
```

---

## ۸. فایل ۷ — ComponentButton.ts

### هدف

کلاس نهایی — constructor + Rendering اختصاصی.

### الگو

```typescript
import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentButtonBase}    from "./ComponentButtonBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {ButtonSemantic, Props}  from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType}      from "../componentStructure/Props";
import {PropsConfigType as ButtonPropsConfigType} from "./Props";
import {createButtonStep}                from "./Step";
// --------------------------------
import * as ComponentIcon from "../componentIcon";


/**
 * ComponentButton — کلاس نهایی (Plan 9.1.1 — بازیابی کامل Behavior Legacy)
 *
 * معماری Composition:
 *   ComponentButton HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderButton (محتوای اختصاصی ComponentButton)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی (prop_btnTitle, ...)
 *   methods — methodهای اختصاصی (CLICK, HOVER, BLUR)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-button> + <section> از Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
 */
export class ComponentButton extends ComponentButtonBase {

    /* ---------------------------------------------
       Hover State — معادل el.hover قدیمی (Plan 9.1.1)
       Observable داخلی کلاس — توسط on: {mouseenter/mouseleave} تغذیه می‌شود
    --------------------------------------------- */
    private readonly _HOVER_STATE = new CoreObservable.App<boolean>(false);


    constructor(
        config?:  Partial<StructurePropsType & ButtonPropsConfigType>,
        methods?: MethodsConfigType<ComponentButton>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        // Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function)
        const step = createButtonStep();

        super("button", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 9.1 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.BUTTON.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.BUTTON.part:
                return this.renderButton(attrsDefault, data, extra);
            case Schemas.BUTTON_TITLE.part:
                return this.renderButtonTitle(attrsDefault, data, extra);
            case Schemas.BUTTON_ICON.part:
                return this.renderButtonIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderButton — رندر Part BUTTON اصلی
       مستقیم، با attrsBind/stylesBind/classBind + computed styles
    --------------------------------------------- */
    protected renderButton(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnTitle   = data?.["prop_btnTitle"]   ?? bind.prop_btnTitle;
        const prop_btnSemantic = data?.["prop_btnSemantic"] ?? bind.prop_btnSemantic;
        const prop_btnVariant = data?.["prop_btnVariant"] ?? bind.prop_btnVariant;
        // ... سایر propهای bind شده

        return CoreReactive.App.button({
            attrs: { ...attrsDefault },
            attrsBind: {
                title:    prop_btnTitle,
                disabled: bind.prop_btnDisabled,
            },
            className: ["btn"],
            styles: {
                "transition":   "background-color 200ms ease, color 200ms ease",
                "display":      "inline-flex",
                "align-items":  "center",
                "cursor":       "pointer",
                "border-style": "solid",
            },
            stylesBind: {
                "width":           bind.prop_btnWidth,
                "height":          this.getStyleBtnHeight(bind.prop_btnHeight),
                "background-color": this.getStyleBtnBackgroundColor(
                    prop_btnSemantic, bind.prop_btnBackgroundColor, bind.prop_btnBackgroundColor_hover
                ),
                // ... سایر style‌های computed
            },
            classBind: [prop_btnVariant, bind.prop_btnClass],
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_btnTitle.get(), valid: true };
            },
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
                mouseenter: (event: Event) => {
                    this._HOVER_STATE.set(true);
                    this.executeMethod("HOVER", event, {});
                },
                mouseleave: (event: Event) => {
                    this._HOVER_STATE.set(false);
                    this.executeMethod("BLUR", event, {});
                },
            },
            children: [
                this.executeSchemaPart(Schemas.BUTTON_TITLE.part, {}),
                this.executeSchemaPart(Schemas.BUTTON_ICON.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderButtonTitle — رندر Part BUTTON_TITLE
    --------------------------------------------- */
    protected renderButtonTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const prop_btnTitle    = data?.["prop_btnTitle"]    ?? bind.prop_btnTitle;
        const prop_btnSemantic = data?.["prop_btnSemantic"] ?? bind.prop_btnSemantic;

        return CoreReactive.App.part("b", {
            attrs: { ...attrsDefault },
            stylesBind: {
                "color": this.getStyleBtnTitleColor(
                    prop_btnSemantic, bind.prop_btnTitleColor, bind.prop_btnTitleColor_hover
                ),
            },
            classBind: [bind.prop_btnTitleClass],
            children: [prop_btnTitle],
        });
    }


    /* ---------------------------------------------
       renderButtonIcon — رندر Part BUTTON_ICON
       رندر شرطی آیکون با conditionWhen
    --------------------------------------------- */
    protected renderButtonIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const prop_btnIcon = data?.["prop_btnIcon"] ?? bind.prop_btnIcon;
        const prop_btnSemantic = data?.["prop_btnSemantic"] ?? bind.prop_btnSemantic;

        return CoreObservable.App.conditionWhen(
            [prop_btnIcon],
            (iconSource) => iconSource != null,
            () => new ComponentIcon.Component({
                prop_icon: UiIcons.CreateIcon(prop_btnIcon, {
                    primaryColor: this.getStyleBtnTitleColor(
                        prop_btnSemantic, bind.prop_btnTitleColor, bind.prop_btnTitleColor_hover
                    ),
                    size: this.getStyleBtnIconSize(bind.prop_btnHeight),
                }),
                prop_iconStyles: bind.prop_btnIconStyles,
                prop_iconClass:  bind.prop_btnIconClass,
            }, {}).getReactiveElement(),
            () => this.renderEmptyContent(attrsDefault),
            this.getScope(),
        );
    }


    /* ---------------------------------------------
       Computed Style Helpers — متدهای کمکی اختصاصی
       هر متد یک CoreObservable.App.computed برمی‌گرداند
    --------------------------------------------- */
    private getStyleBtnHeight(prop_btnHeight) {
        return CoreObservable.App.computed(
            (heightProp, sizeName) => heightProp ?? UtilStyle.Css_Height(sizeName),
            [prop_btnHeight, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    private getStyleBtnBackgroundColor(semantic, bg, bgHover) {
        return CoreObservable.App.computed(
            (semantic, bg, bgHover, hovered) => {
                const normal = ComponentButton.resolveSemantic(
                    semantic as ButtonSemantic, ComponentButton._semanticBackground, bg
                );
                if (!hovered) return normal;
                const hover = ComponentButton.resolveSemantic(
                    semantic as ButtonSemantic, ComponentButton._semanticBackgroundHover, bgHover
                );
                return hover ?? normal;
            },
            [semantic, bg, bgHover, this._HOVER_STATE],
            this.getScope(),
        );
    }

    // ... سایر getStyle* متدها (borderColor, borderRadius, titleColor, iconSize, ...)

    private static resolveSemantic(
        semantic: ButtonSemantic,
        map: Record<ButtonSemantic, string | null>,
        customValue: string | null,
    ): string | null {
        return semantic === ButtonSemantic.CUSTOM ? customValue : map[semantic];
    }

    // Static lookup maps برای semantic colors
    private static readonly _semanticBackground: Record<ButtonSemantic, string | null> = { /* ... */ };
    private static readonly _semanticBackgroundHover: Record<ButtonSemantic, string | null> = { /* ... */ };
    private static readonly _semanticBorder: Record<ButtonSemantic, string | null> = { /* ... */ };
    private static readonly _semanticTitleColor: Record<ButtonSemantic, string | null> = { /* ... */ };
    private static readonly _semanticTitleColorHover: Record<ButtonSemantic, string | null> = { /* ... */ };

}
```

### قوانین

| قانون | سطح |
|:---|:---|
| از `ComponentButtonBase` ارث‌بری کند | **MUST** |
| constructor امضا `(config, methods, identity?)` داشته باشد | **MUST** |
| constructor شامل `super(name, null, identity, step)` باشد | **MUST** |
| constructor شامل `this.renderComponent(config, methods)` باشد | **MUST** |
| **(Plan 9.1)** Step در constructor با factory function ساخته شود — نه در render cycle | **MUST** |
| **(Plan 11.2)** `renderManagerComponent` برای COMPONENT/STRUCTURE از Trait methods استفاده کند | **MUST** |
| **(Plan 11.2)** `renderManagerComponent` برای schemaهای اختصاصی به render methods مربوطه routing کند | **MUST** |
| **(Plan 11.2)** `renderContentComponent` محتوای اختصاصی را با `executeSchemaPart` رندر کند | **MUST** |
| **(Plan 8.2.7)** `dispose()` متد پیاده‌سازی شود — `this.disposeStep()` صدا بزند | **MUST** |
| Rendering اختصاصی در متدهای `protected` باشد | **MUST** |
| Rendering از `this._COMPONENT_PROPS_BIND` استفاده کند | **MUST** |
| Rendering از `this._COMPONENT_STEP` برای اتصال reactiveElement استفاده کند | **SHOULD** |
| Rendering از `this.executeMethod()` برای فراخوانی Methodها استفاده کند | **MUST** |
| **(Plan 9.1.1)** Computed styles با `CoreObservable.App.computed` و `this.getScope()` ساخته شوند | **MUST** |
| **(Plan 9.1.1)** State داخلی (مثل `_HOVER_STATE`) در این کلاس باشد — نه در Schema | **MUST** |
| Helper methods در این کلاس باشند (نه در Schema) | **MUST** |
| `ComponentIdentity` از `@/core_components` import شود | **MUST** |

### چرا constructor امضا `(config, methods, identity?)`؟

این امضا با `CreateCategoryComponent` سازگار است:

```typescript
// CreateCategoryComponent انتظار دارد:
new ComponentClass(config, methods, identity)

// ComponentButton constructor:
new ComponentButton(config, methods, identity)
//                 ↑       ↑        ↑
//                 سازگار با CreateCategoryComponent
```

### جریان رندر (Plan 11.2)

```
new ComponentButton(config, methods, identity)
    ↓
super("button", null, identity, createButtonStep())
    ↓
this.renderComponent(config, methods)
    ↓
createComponentElement()
    → executeSchemaPart(COMPONENT.part)                    ← Plan 11.2: Schema پایه
    → renderManagerComponent(COMPONENT.part)
        → ComponentStructureTrait.renderComponentSchema()  ← <component-button>
            → executeSchemaPart(STRUCTURE.part)
            → renderManagerComponent(STRUCTURE.part)
                → ComponentStructureTrait.renderStructureSchema()  ← <section>
                    → renderContentComponent()              ← content اختصاصی
                        → executeSchemaPart(BUTTON.part)
                        → renderManagerComponent(BUTTON.part)
                            → renderButton()                ← <button>...</button>
                                → executeSchemaPart(BUTTON_TITLE.part)
                                    → renderButtonTitle()   ← <b>title</b>
                                → executeSchemaPart(BUTTON_ICON.part)
                                    → renderButtonIcon()    ← <icon> (شرطی)
```

> **نکته مهم (Plan 11.2):** `renderManagerComponent` برای COMPONENT و STRUCTURE از Trait methods استفاده می‌کند.
> برای schemaهای اختصاصی (BUTTON, BUTTON_TITLE, BUTTON_ICON) به render methods مربوطه routing می‌کند.
>
> ```typescript
> // ✅ درست — Plan 11.2 routing
> case ComponentStructureTrait.schemas.COMPONENT.part:
>     return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
> case Schemas.BUTTON.part:
>     return this.renderButton(attrsDefault, data, extra);
>
> // ❌ غلط — مستقیم بدون routing
> case Schemas.BUTTON.part:
>     return super.renderManagerComponent(partName, attrsDefault, data, extra);
> ```
```

---

## ۹. فایل ۸ — examples/

### هدف

Example Definitions — نحوه استفاده/نمایش Component.

### الگوی جدید (Plan 8.1.5) — Example با `render()` callable

هر Example یک **Factory Function** است که مستقیم `HTMLElement` تولید می‌کند.
این الگو از `ComponentExampleDefinition` (data-only) به `ComponentExample` (با `render()`) تغییر کرده.

مزایا:
- برنامه‌نویس با خواندن Example می‌بیند چه Componentی ساخته می‌شود، چه propهایی پاس می‌شود، چه خروجی بصری‌ای تولید می‌شود
- Example مستقیم `HTMLElement` برمی‌گرداند — بدون نیاز به `ExampleRenderer` یا ابزار واسط
- `ClTestsPage` به‌صورت خودکار تمام Exampleهای ثبت‌شده در `ComponentManager` را کشف و نمایش می‌دهد

### الگو — Default.ts

```typescript
import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonVariants} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentButton
 *
 * نمایش یک Button ساده (primary) بدون behavior.
 */
export const DefaultExample: ComponentExample = {

    id:          "button_default",

    name:        Keys.category.components.button.examples.default.name,

    description: Keys.category.components.button.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle:   "Click Me",
            prop_btnVariant: ButtonVariants.PRIMARY,
        },
        {},
    ).getElement() as HTMLElement,

};
```

### الگو — Clickable.ts

```typescript
import {ComponentExample} from "@/core_components";
import * as UiIcons     from "@/ui_icons";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonSemantic, ButtonVariants} from "../Props";
// --------------------------------


/**
 * Clickable Example برای ComponentButton
 *
 * نمایش یک Button قابل کلیک با CLICK callback واقعی + آیکون.
 */
export const ClickableExample: ComponentExample = {

    id:          "button_clickable",

    name:        Keys.category.components.button.examples.clickable.name,

    description: Keys.category.components.button.examples.clickable.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle:    "Submit",
            prop_btnVariant:   ButtonVariants.PRIMARY,
            prop_btnClass:    ["w-100"],
            prop_btnIcon:      UiIcons.Src.ArrowUp.Definition,
        },
        {
            CLICK: function (event, dataArgs, componentArgs) {
                console.log("[ClickableExample] button clicked", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
```

### الگو — Variants.ts

```typescript
import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ButtonSemantic, ButtonVariants} from "../Props";
import * as CoreReactive from "@/core_reactive";
// --------------------------------


/**
 * Variants Example برای ComponentButton
 *
 * نمایش چند Button با variant/semantic مختلف (primary, secondary, ghost, custom).
 * این Example نشان می‌دهد که می‌توان چند Component را در یک Example ترکیب کرد.
 */
export const VariantsExample: ComponentExample = {

    id:          "button_variants",

    name:        Keys.category.components.button.examples.variants.name,

    description: Keys.category.components.button.examples.variants.description,

    render: (): HTMLElement => {
        return CoreReactive.App.div({
                styles: {
                    "display":     "flex",
                    "gap":          "8px",
                    "flexWrap":     "wrap",
                },
                children: [
                    UiCategory.UI.Simples.Button(
                        { prop_btnTitle: "PRIMARY", prop_btnVariant: ButtonVariants.PRIMARY },
                        {},
                    ).getElement(),
                    UiCategory.UI.Simples.Button(
                        { prop_btnTitle: "SECONDARY", prop_btnSemantic: ButtonSemantic.BACK },
                        {},
                    ).getElement(),
                    UiCategory.UI.Simples.Button(
                        { prop_btnTitle: "GHOST", prop_btnSemantic: ButtonSemantic.CANCEL },
                        {},
                    ).getElement(),
                    UiCategory.UI.Simples.Button(
                        { prop_btnTitle: "ICON", prop_btnSemantic: ButtonSemantic.CUSTOM },
                        {},
                    ).getElement(),
                ],
            }).getElement();
    },

};
```

### الگو — index.ts

```typescript
import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}   from "./Default";
import {ClickableExample} from "./Clickable";
import {VariantsExample}  from "./Variants";


/**
 * Examples Registry برای ComponentButton
 *
 * @example
 *   Examples.DEFAULT.render()                    // → HTMLElement
 *   Examples.CLICKABLE.render()                  // → HTMLElement
 *   Examples.VARIANTS.render()                   // → HTMLElement
 */
export const Examples = {

    DEFAULT:   DefaultExample,
    CLICKABLE: ClickableExample,
    VARIANTS:  VariantsExample,

} satisfies Record<string, ComponentExample>;


export type ComponentButtonExamplesType = typeof Examples;
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر Example شامل `id`, `name`, `description`, `render` باشد | **MUST** |
| `id` یکتا باشد | **MUST** |
| `render()` برمی‌گرداند `HTMLElement` (با `as HTMLElement` cast) | **MUST** |
| `render()` از Category callable (مثلاً `UiCategory.UI.Simples.Button`) استفاده کند | **MUST** |
| `name` و `description` از `Keys` (سیستم ترجمه) استفاده کنند | **MUST** |
| برای callback با `this` به Component instance، از `function` استفاده شود (نه arrow) | **MUST** |
| Example به Component کلاس مستقیم وابسته نباشد — فقط از Category callable استفاده کند | **SHOULD** |
| `satisfies Record<string, ComponentExample>` در index.ts استفاده شود | **MUST** |

### نکته — `as HTMLElement` cast

`getElement()` در `ClComponentBase` خروجی `HTMLElement | ClReactiveElement` دارد (چون محتوای داخلی می‌تواند ReactiveElement باشد).
در Exampleها همیشه HTMLElement واقعی است، پس `as HTMLElement` cast می‌کنیم.

### نکته — کلیدهای زبان

برای هر Example باید کلیدهای زبان در `Keys.ts`, `Fa.ts`, `En.ts` اضافه شود:

```typescript
// Keys.ts — در section examples کامپوننت مربوطه
examples: {
    default: {
        name:        CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    icon: {
        name:        CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
},
```

سپس ترجمه‌ها در `Fa.ts` و `En.ts` اضافه شوند.

---

## ۱۰. فایل ۹ — index.ts

### هدف

Public API Component.

### الگو

```typescript
export {ComponentButton      as Component} from "./ComponentButton"
export {ComponentButtonBase  as Base}      from "./ComponentButtonBase"
export {Props}                            from "./Props"
export type {PropsType}                   from "./Props"
export {Schemas}                          from "./Schemas"
export type {SchemasType}                 from "./Schemas"
export {Methods}                          from "./Methods"
export type {MethodsType}                 from "./Methods"
export type {MethodsConfigType,
             MethodsComponentArgs,
             MethodsDataArgs}             from "./Methods"
export {Definition}                       from "./Definition"
export {createButtonStep}                 from "./Step"
export {Examples}                         from "./examples"
export type {ComponentButtonExamplesType} from "./examples"
```

### قوانین

| قانون | سطح |
|:---|:---|
| `Component` alias برای کلاس نهایی | **MUST** |
| `Base` alias برای Base کلاس | **SHOULD** |
| **(Plan 9.1)** Step factory function (مثل `createButtonStep`) با نام خود export شود — نه `as Step` | **MUST** |
| SchemaHandlers را export نکند | **MUST NOT** (چون وجود ندارد) |

---

## ۱۱. ثبت در ComponentManager

### هدف

ثبت Component در Registry برای کشف توسط GUI و Component Manager.

### الگو

در فایل `index.ts` ماژول والد (مثلاً `lists/index.ts`) یا در فایل bootstrap:

```typescript
import * as CoreComponents from "@/core_components";
// --------------------------------
import {ComponentButton}  from "./componentButton";
import {Definition}       from "./componentButton/Definition";
import {Props}            from "./componentButton/Props";
import {Schemas}          from "./componentButton/Schemas";
import {Methods}          from "./componentButton/Methods";
import {Examples}         from "./componentButton/examples";


// ثبت در Component Manager
CoreComponents.ComponentManager.register({
    definition:  Definition,
    props:       Props,
    schemas:     Schemas,
    methods:     Methods,
    examples:    Examples,
    constructor: ComponentButton,
});
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر Component باید در ComponentManager ثبت شود | **MUST** |
| `definition` الزامی است | **MUST** |
| `examples` برای نمایش در TestsPage الزامی است | **SHOULD** |
| `constructor` برای instantiate مستقیم در آینده (الان اختیاری) | **MAY** |
| `props`, `schemas`, `methods` اختیاری ولی توصیه‌شده | **SHOULD** |
| از `CoreComponents.ComponentManager` استفاده شود | **MUST** |

---

## ۱۲. ثبت در Category

### هدف

ثبت Component در Category System برای دسترسی راحت — مشابه Icon Category.

این مرحله اجازه می‌دهد Component به‌صورت callable در دسترس باشد:
```typescript
const btn = UiCategory.UI.Simples.Button(config, methods, identity)  // → Component instance
btn.set("prop_btnTitle", "new title")                                 // ← set روی instance
btn.getElement()                                                       // ← HTMLElement برای DOM
UiCategory.UI.Simples.Button.info                                      // → ComponentDefinition
```

### نکته مهم — Return Type

Category callable برمی‌گرداند **Component instance** (نه HTMLElement).
این اجازه می‌دهد مصرف‌کننده به `set`, `get`, `executeMethod` دسترسی داشته باشد.
برای افزودن به DOM از `instance.getElement()` استفاده شود.

### ساختار Category

```
module_categories/lists/ui/
├── basic/           ← Componentهای پایه (ComponentStructure)
├── simples/         ← Componentهای ساده (Button, Label, ...)
│   ├── button/
│   │   ├── Definition.ts     ← Button = CreateCategoryComponent(...)
│   │   └── index.ts
│   ├── Definition.ts          ← Category Definition (components: [Button, ...])
│   └── index.ts
├── inputs/          ← Componentهای ورودی (Input, Select, ...)
├── contents/        ← Componentهای محتوایی (Collapse, Tabs, ...)
├── positions/       ← Componentهای موقعیتی (Tooltip, FloatMenu, ...)
└── index.ts
```

### الگو — button/Definition.ts

```typescript
import * as UICategories    from "@/ui_categories"
import * as UIComponents    from "@/ui_components"
import {Keys}               from "../../../../../languages"
// --------------------------------


/**
 * Button Totality — callable + .info
 *
 * استفاده:
 *   const btn = UiCategory.UI.Simples.Button(config, methods, identity);
 *   btn.set("prop_btnTitle", "new title");   // ← set روی instance
 *   btn.getElement();                         // ← HTMLElement برای DOM
 *   UiCategory.UI.Simples.Button.info         // → ComponentDefinition
 *
 * Generic Parameters:
 *   TInstance — Component class (set/get/executeMethod/getElement)
 *   TConfig   — Props type
 *   TMethods  — MethodsConfigType (callback type-safe)
 */
export const Button = UICategories.CreateCategoryComponent<
    UIComponents.Lists.ComponentButton.Component,                    // TInstance
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentButton.PropsType,                    // TConfig
    UIComponents.Lists.ComponentButton.MethodsConfigType<any>        // TMethods
>(
    UIComponents.Lists.ComponentButton.Definition,
    UIComponents.Lists.ComponentButton.Component,
);
```

### الگو — button/index.ts

```typescript
export {Button} from "./Definition";
```

### الگو — simples/Definition.ts (به‌روزرسانی)

```typescript
import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
// --------------------------------
import {Button}          from "./button";

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "simples",
    name:        Keys.category.components.simples.name,
    description: Keys.category.components.simples.description,

    components:  [
        Button,
    ],
};
```

### الگو — simples/index.ts (به‌روزرسانی)

```typescript
export {Definition}    from "./Definition";
export * as Button     from "./button";
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر Component باید در Category ثبت شود | **MUST** |
| `CreateCategoryComponent` از `UICategories` استفاده شود | **MUST** |
| Component در Category مناسب قرار بگیرد (simples/inputs/contents/positions) | **MUST** |
| `Definition.ts` در پوشه جدا برای هر Component | **MUST** |
| `index.ts` فقط `Button` را export کند | **MUST** |

### مقایسه با Icon Category

| جنبه | Icon | Component |
|:---|:---|:---|
| تعریف منبع | `module_icons/src/arrowUp/Definition.ts` | `module_components/lists/componentButton/` |
| Totality | `CreateCategoryIcon(IconDefinition)` | `CreateCategoryComponent<TInstance, TConfig, TMethods>(...)` |
| callable | `(options?) => Icons` | `(config?, methods?, identity?) => Component instance` |
| `.info` | `IconDefinition` | `ComponentDefinition` |
| دسترسی | `UiCategory.Icons.Arrows.Basic.ArrowUp(...)` | `UiCategory.UI.Simples.Button(...)` |
| Return | `Icons` (icon value) | `Component instance` (set/get/executeMethod/getElement) |

---

## ۱۳. Identity و Step — دو مفهوم جدا

### Identity (بیرونی)

```typescript
identity = {
    unique:  CoreEvent.TStepRef,       // هویت در درخت Workflow والد
    emit:    CoreEvent.TEmitHandler,   // Request Handler از سمت والد
    events:  Record<string, any>,      // Event handler از سمت والد
}
```

### emit — auto-bind به Component instance

`ClComponentBase.renderComponent` به‌صورت خودکار `emit` را در `CoreEvent.App` ثبت می‌کند
و `this` را به Component instance متصل می‌کند:

```typescript
// ClComponentBase.renderComponent
if (this._COMPONENT_UNIQUE && this._COMPONENT_EMIT) {
    CoreEvent.App.registerEmit(this._COMPONENT_UNIQUE, this._COMPONENT_EMIT.bind(this));
}
```

این یعنی در `emit`، `this` به **این Component instance** اشاره می‌کند:

```typescript
// داخل Parent Component
const icon = UiCategory.UI.Simples.Icon(
    { ... },
    { CLICK: ... },
    {
        unique: TestStep.icon,
        emit: function(request) {
            // this = Icon instance (auto-bind)
            this.set("prop_show", false);  // ✅ کار می‌کند
            return { value: "icon-response", valid: true };
        },
    },
);
```

### emit در Component Tree — `.bind(this)`

اگر `emit` نیاز دارد به **Parent Component** دسترسی داشته باشد (نه Child)،
مصرف‌کننده می‌تواند `.bind(this)` استفاده کند:

```typescript
// داخل Parent Component (مثلاً ComponentForm)
const submitBtn = UiCategory.UI.Simples.Button(
    { ... },
    { CLICK: ... },
    {
        unique: FormStep.submit,
        emit: function(request) {
            // this = Parent Component (Form) — از .bind(this)
            this.set("prop_formValid", true);  // ✅ set روی Form
            return { value: "submit-response", valid: true };
        }.bind(this),  // ← this = Parent Component (Form)
    },
);
```

**نکته مهم:** `ClComponentBase` هم `emit.bind(this)` انجام می‌دهد،
ولی bind دوم تاثیری ندارد — bind اول (از مصرف‌کننده) باقی می‌ماند.

| حالت | `this` در emit | کاربرد |
|:---|:---|:---|
| `function(request) { ... }` | Component instance (auto-bind) | رفتار داخلی Component |
| `function(request) { ... }.bind(this)` | Parent Component | ارتباط در Component Tree |
| `(request) => { ... }` | lexical scope (arrow) | بدون `.call()` — `this` تغییر نمی‌کند |

### emit فقط با request صدا زده می‌شود

`emit` خودبه‌خود با کلیک یا event صدا زده نمی‌شود — `emit` پاسخ به `request` است.
باید کسی به این Step `request` بفرستد:

```typescript
// در یک Component دیگر (مثلاً Icon)
CLICK: function(event, dataArgs, componentArgs) {
    // ارسال request به Button
    CoreEvent.App.request(
        CoreEvent.requestMap([
            [FormStep.submit, { action: "validate" }],
        ]),
        TestStep.icon,  // source
    );
}
```

### Step (داخلی)

```typescript
ButtonStep = CoreEvent.Step({
    children: {
        click: CoreEvent.Step({ request, response }),
    }
});
```

### Plan 8.2.7 — SubEvent اتصال رسمی

در constructor Base، اگر `identity.unique` و `step` هر دو وجود دارند،
Step داخلی به‌عنوان فرزند با `componentName` به Parent Step متصل می‌شود:

```typescript
// در Base constructor:
if (step && identity?.unique) {
    CoreEvent.SubEvent(identity.unique, componentName, step);
}
```

این یعنی درخت Event به این شکل در می‌آید:

```text
ParentStep (مثلاً FormStep)
  └── button (componentName)     ← SubEvent
        └── click                ← ButtonStep.click
```

### Plan 8.2.7 — Disposal بازگشتی

`CoreEvent.dispose(step)` کل subtree را پاک می‌کند:

```typescript
// در ComponentButton.dispose():
dispose(): void {
    this.disposeStep();  // ← CoreEvent.dispose(this._COMPONENT_STEP) — بازگشتی
}
```

1. همه نسل‌ها (click, ...) از App پاک می‌شوند.
2. خود step از App پاک می‌شود.
3. از parent قطع می‌شود.
4. ساختار درخت پاک می‌شود.

### Plan 8.2.8 — Per-Message Event Scope (برای Componentهای dynamic)

اگر Component دارای فرزندهای dynamic است (مثل `ComponentMessages` که هر پیام یک Scope مستقل دارد)،
الگوی متفاوتی نیاز است:

```typescript
// ۱. Registry — نگاشت Message ID → Event Scope
private _MESSAGE_EVENT_SCOPES = new Map<string, MessageEventScope>();

// ۲. Reconciliation — هماهنگی Registry با state فعلی
private syncMessageEventScopes(messages: MessageItem[]): void {
    // dispose: Scopeهایی که دیگر در current IDs نیستن
    // create: Messageهای جدید که Scope ندارن
    // reuse: Messageهای موجود — هیچ کاری نیاز نیست
}

// ۳. Lookup — گرفتن Scope برای یک Message
private getMessageEventScope(messageId: string): MessageEventScope | undefined {
    return this._MESSAGE_EVENT_SCOPES.get(messageId);
}

// ۴. Disposal — پاک‌سازی Registry محلی + disposal بازگشتی
dispose(): void {
    this.disposeStep();              // ← CoreEvent.dispose بازگشتی
    this._MESSAGE_EVENT_SCOPES.clear();
}
```

> **قانون طلایی (Plan 8.2.8):** State changes ≠ Event identity changes
> - Message موجود → Scope reuse (identity حفظ می‌شود)
> - Message جدید → Scope create
> - Message حذف‌شده → Scope dispose

### تفاوت

| مفهوم | جهت | کاربرد |
|:---|:---|:---|
| `identity` | **بیرونی** — والد به این Component | والد جریان خودش را اعمال می‌کند |
| `step` | **داخلی** — این Component به فرزندانش | Component جریان داخلی خودش را کنترل می‌کند |

### مثال

```typescript
// ComponentForm (والد) → ComponentButton (فرزند)
new ComponentButton(
    config,
    methods,
    {
        unique: FormStep.submit,  // ← بیرونی: هویت در درخت Form
    }
);

// ComponentButton خودش Step داخلی دارد
button._COMPONENT_STEP   // → ButtonStep (click, ...)
button._COMPONENT_UNIQUE // → FormStep.submit (در درخت Form)
```

---

## ۱۴. Generic Parameters

`ComponentStructure` چهار Generic Parameter دارد:

```typescript
class ComponentStructure<
    TProp extends Record<string, any>      = PropsType,       // ۱. Props
    TSchemas                               = SchemasType,      // ۲. Schemas
    TMethods extends Record<string, any>   = MethodsType,     // ۳. Methods
    TIdentity extends ComponentIdentity    = ComponentIdentity // ۴. Identity
>
```

### استفاده در فرزند

```typescript
// ComponentButtonBase
export class ComponentButtonBase extends ComponentStructure<
    ButtonPropsType,       // ← TProp
    ButtonSchemasType,     // ← TSchemas
    ButtonMethodsType      // ← TMethods
> { ... }
```

### Identity اختصاصی (اختیاری)

```typescript
interface ButtonIdentity extends ComponentIdentity {
    unique: ButtonStepRef | null;
    events: ButtonEventHandlers | null;
}

export class ComponentButtonBase extends ComponentStructure<
    ButtonPropsType,
    ButtonSchemasType,
    ButtonMethodsType,
    ButtonIdentity         // ← TIdentity اختصاصی
> { ... }
```

---

## ۱۴.۱. Base/Concrete Split — الگوی رسمی ComponentStructure

`ComponentStructure` از Plan 8.1.5 به دو لایه تقسیم شده — همان الگوی `ComponentIconBase` / `ComponentIcon`:

```
CoreComponents.App (ClComponentBase)
    ▲
    │ extends
    │
ComponentStructureBase (abstract — config + identity + constructor)
    ▲
    │ extends
    │
ComponentStructure (concrete — render implementations + static create())
```

### ComponentStructureBase (abstract)

فقط مسئول تعریف config و identity است:

| بخش | محتوا |
|:---|:---|
| Identity fields | `_COMPONENT_EVENTS`, `_CONTENT_RENDERER`, `_COMPONENT_STEP` |
| Constructor | `(componentName, elId, identity?, step?)` |
| `renderComponent` override | fallback به `_COMPONENT_*` اگر پاس داده نشد |
| `_COMPONENT_DEFINITION` | `Definition` |
| `_COMPONENT_PATTERN` | `DefineProp<PropsType>({...Props})` |
| `_COMPONENT_SCHEMA` | `DefineSchema<SchemasType, PropsType>({...Schemas})` |
| `_COMPONENT_METHODS` | `DefineMethod<MethodsType, PropsType>({...Methods})` |

### ComponentStructure (concrete)

مسئول پیاده‌سازی render:

| متد | محتوا |
|:---|:---|
| `renderComponentSchema` | لایه خارجی `<component-{name}>` با RTL + classList + styles |
| `renderStructureSchema` | لایه داخلی `<section>` با show/hide + structureClass + structureStyles |
| `renderContentComponent` | content تزریق‌شده (از `_CONTENT_RENDERER` یا super) |
| `renderManagerComponent` | routing بر اساس partName |
| `static create()` | API راحت برای ساخت Component |

### تفاوت با ComponentIconBase

| | ComponentIconBase | ComponentStructureBase |
|:---|:---|:---|
| مسئول | فقط config definitions (`_COMPONENT_*`) | config + identity fields + constructor |
| دلیل | ComponentIcon identity را در constructor Concrete مدیریت می‌کند | ComponentStructure Base Runtime است و identity را خودش نگه می‌دارد |

### الگوی ارث‌بری برای فرزندها

فرزندهای واقعی (مثل `ComponentButton`) از `ComponentStructure` (concrete) ارث می‌برند، نه از `ComponentStructureBase`:

```typescript
// ✅ درست — از Concrete ارث می‌برد
export class ComponentButtonBase extends ComponentStructure<
    ButtonPropsType,
    ButtonSchemasType,
    ButtonMethodsType
> { ... }

// ❌ ممنوع — از Base مستقیم ارث نبرید
export class ComponentButtonBase extends ComponentStructureBase<...> { ... }
```

### Export از index.ts

```typescript
export {ComponentStructure     as Component} from "./ComponentStructure"
export {ComponentStructureBase as Base}      from "./ComponentStructureBase"
```

---

## ۱۵. Static Factory — ComponentStructure.create()

`ComponentStructure` یک static factory دارد برای استفاده راحت (مثل `CoreReactive.App.section({...})`).

### Plan 8.2.10 — signature جدید

`componentName` به‌عنوان پارامتر اول (identity) اضافه شده — نه در config:

```typescript
// Plan 8.2.10 — signature جدید:
static create(
    componentName: string,        // ← identity (نام کامپوننت)
    config:  Record<string, any> & { content?: () => CoreReactive.App },
    methods: Record<string, any> = {},
    identity: { unique?, emit?, events? } = {},
): CoreReactive.App
```

### استفاده

```typescript
const { create } = UiComponents.Lists.ComponentStructure.Component;

const el = create(
    "messages",                   // ← componentName (identity) — Plan 8.2.10
    {
        classList:           ["p-3", "border", "rounded", "m-2"],
        prop_show:           true,
        prop_structureClass: ["bg-light"],
        content: () => ReactiveApp.div({
            children: ["Hello"],
        }),
    },
    {},                          // methods (اختیاری)
    {                            // identity (اختیاری)
        unique: TestStep.structure,
        emit:   (request) => { ... },
        events: { click: (e) => { ... } },
    },
);
// → CoreReactive.App (ReactiveElement)
// → <component-messages><section>...</section></component-messages>
```

### چرا componentName به‌عنوان پارامتر اول؟ (Plan 8.2.10)

تفکیک identity از configuration:

```typescript
create(
    componentName,   // ← identity (نام کامپوننت)
    { ... },         // ← configuration (propها و content)
)
```

- `componentName` جزء **identity** است — اجباری
- `classList`, `styles`, `prop_show`, `content` جزء **configuration** هستند

اگر `componentName` در config بود، ممکن است فراموش شود و default `"structure"` استفاده شود —
همان bug قدیمی که همه Componentها `component-structure` نمایش داده می‌شدند.

### قوانین

| قانون | سطح |
|:---|:---|
| `create()` خروجی `CoreReactive.App` می‌دهد | **MUST** |
| **(Plan 8.2.10)** `componentName` به‌عنوان پارامتر اول — اجباری | **MUST** |
| `content` اختیاری است — اگر نباشد، fallback به `renderContentComponent()` | **MAY** |
| `methods` و `identity` اختیاری هستند | **MAY** |

### ComponentStructureTrait.renderContent (Plan 8.2.10)

Trait نام کامپوننت را از `component._COMPONENT_NAME` می‌خواند و به `create()` پاس می‌دهد:

```typescript
// Trait.ts — Plan 8.2.10:
renderContent(component, content) {
    const componentName = component._COMPONENT_NAME;
    return ComponentStructure.create(componentName, { ... });
}
```

این یعنی Component مصرف‌کننده نیازی ندارد نام را دستی پاس دهد — Trait خودش می‌خواند.

### توجه

`create()` فقط برای `ComponentStructure` مستقیم است (یا از طریق Trait).
فرزندها (مثل `ComponentButton`) constructor خودشان دارند و مستقیماً `new` می‌شوند.

### Category callable vs create()

| جنبه | `UiCategory.UI.Basic.ComponentStructure(...)` | `ComponentStructure.create(...)` |
|:---|:---|:---|
| Return | Component instance (set/get/executeMethod) | `CoreReactive.App` (ReactiveElement) |
| کاربرد | وقتی نیاز به set/get بعد از ساخت داری | وقتی فقط نیاز به render داری |
| دسترسی | Category System | static factory |

---

## ۱۶. چک‌لیست نهایی

برای ساخت Component جدید، این چک‌لیست را به‌ترتیب اجرا کنید:

### مرحله ۱: Declarative Layer

- [ ] `Definition.ts` — `id`, `name`, `version`
- [ ] `Props.ts` — propهای اختصاصی با `Define_ComponentProp<T>(...)` + `PropsType` با `ExtractPropsType`
- [ ] `Schemas.ts` — schemaهای اختصاصی + `COMPONENT`/`STRUCTURE` از Trait + `SchemasType` با `ExtractSchemasType`
- [ ] `Methods.ts` — methodهای اختصاصی با `args`, `dataArgs` + `MethodsType`, `MethodsComponentArgs`, `MethodsDataArgs`, `MethodsConfigType<TThis>` (همگی از `TypeHelpers` استخراج شوند)
- [ ] `Step.ts` — درخت Workflow داخلی به‌صورت **factory function** (Plan 9.1)

### مرحله ۲: Runtime Layer

- [ ] `ComponentButtonBase.ts` — extends CoreComponents.App + ComponentStructureTrait.props + ComponentStructureTrait.schemas + ۴ فیلد protected + `disposeStep()`
- [ ] `ComponentButton.ts` — extends ComponentButtonBase + constructor + `renderManagerComponent` routing + `renderContentComponent` + MethodsConfigType<ComponentButton>

### مرحله ۳: Examples (Plan 8.1.5 — الگوی جدید با render())

- [ ] کلیدهای زبان در `Keys.ts` (در `examples` section کامپوننت مربوطه) اضافه شود
- [ ] ترجمه‌ها در `Fa.ts` و `En.ts` اضافه شود
- [ ] `examples/Default.ts` — Example با `render(): () => HTMLElement` (الگوی `ComponentExample`)
- [ ] `examples/Clickable.ts` — Example با CLICK callback + آیکون
- [ ] `examples/Variants.ts` — Example با چند variant (ترکیب چند Component)
- [ ] `examples/index.ts` — Registry Examples با `satisfies Record<string, ComponentExample>`

### مرحله ۴: Public API

- [ ] `index.ts` — exportهای عمومی (شامل `Base` alias اگر Base کلاس دارید)

### مرحله ۵: ثبت در ComponentManager

- [ ] `CoreComponents.ComponentManager.register({...})` — شامل `examples: Examples`

### مرحله ۶: ثبت در Category

- [ ] ایجاد `module_categories/lists/ui/<category>/<name>/Definition.ts`
- [ ] ایجاد `module_categories/lists/ui/<category>/<name>/index.ts`
- [ ] به‌روزرسانی `<category>/Definition.ts` — افزودن Component به `components`
- [ ] به‌روزرسانی `<category>/index.ts` — export Component

### مرحله ۷: بررسی

- [ ] TypeScript compile بدون خطای جدید
- [ ] هیچ `handler` در Schema نیست
- [ ] هیچ `render` در Schema نیست
- [ ] هیچ وابستگی `Schemas → Component` نیست
- [ ] Rendering در کلاس Component است
- [ ] State در کلاس Component است (نه در Schema)
- [ ] Helper methods در کلاس Component است
- [ ] Types از `CoreComponents.*` import شده‌اند (نه `UiComponents.Basic.Types.*`)
- [ ] **(Plan 9.1.3)** propها با `Define_ComponentProp<T>(...)` تعریف شده‌اند (نه `satisfies TComponentPropEntry<T>`)
- [ ] **(Plan 9.1.3)** Generic `<T>` صریحاً به `Define_ComponentProp` پاس شده است
- [ ] **(Plan 9.1.3)** اگر `default: null` است، نوع `T | null` است
- [ ] **(Plan 9.1.3)** `PropsType` با `ExtractPropsType<typeof Props>` تعریف شده است
- [ ] **(Plan 11.2)** `COMPONENT` و `STRUCTURE` از `ComponentStructureTrait.schemas` در `Schemas` اضافه شده‌اند
- [ ] **(Plan 11.2)** `ComponentStructureTrait.schemas` در `_COMPONENT_SCHEMA` spread شده است
- [ ] **(Plan 11.2)** `SchemasType` با `ExtractSchemasType<typeof Schemas>` تعریف شده است
- [ ] **(Plan 9.1)** Step به‌صورت factory function تعریف شده (نه ثابت)
- [ ] **(Plan 9.1)** `createButtonStep()` در constructor صدا زده می‌شود
- [ ] **(Plan 9.1)** `disposeStep()` در Base پیاده‌سازی شده است
- [ ] **(Plan 11.2)** `renderManagerComponent` برای COMPONENT/STRUCTURE از Trait methods استفاده می‌کند
- [ ] **(Plan 11.2)** `renderManagerComponent` برای schemaهای اختصاصی به render methods routing می‌کند
- [ ] **(Plan 9.1.1)** Computed styles با `CoreObservable.App.computed` و `this.getScope()` ساخته شده‌اند
- [ ] **(Plan 9.1.1)** State داخلی (مثل `_HOVER_STATE`) در کلاس Component است (نه در Schema)
- [ ] Component در ComponentManager ثبت شده
- [ ] Component در Category ثبت شده
- [ ] `MethodsConfigType<TThis>` با `this: TThis` تعریف شده
- [ ] `args` و `dataArgs` در `Methods` const تعریف شده‌اند
- [ ] Category callable برمی‌گرداند Component instance (نه HTMLElement)
- [ ] `emit` با `function` تعریف شده (نه arrow) اگر به `this` نیاز دارد
- [ ] Exampleها از `ComponentExample` (با `render()`) استفاده می‌کنند — نه `ComponentExampleDefinition` (منسوخ)
- [ ] Exampleها از Category callable استفاده می‌کنند (مثلاً `UiCategory.UI.Simples.Button`)
- [ ] `render()` در Exampleها `as HTMLElement` cast دارد
- [ ] `name` و `description` در Exampleها از `Keys` استفاده می‌کنند
- [ ] کلیدهای زبان Exampleها در `Keys.ts`, `Fa.ts`, `En.ts` اضافه شده‌اند
- [ ] Component در TestsPage خودکار ظاهر می‌شود (اگر `examples` در registry باشد)

---

## ۱۷. Anti-Patterns

### ۱۷.۱. handler در Schema

```typescript
// ❌ ممنوع
export const Schemas = {
    FORM: {
        part: "part-form",
        handler: { render: (context) => { ... } },  // ← ممنوع
    }
};
```

### ۱۷.۲. render در Schema

```typescript
// ❌ ممنوع
export const Schemas = {
    FORM: {
        part: "part-form",
        render() { return CoreReactive.App.part(...); },  // ← ممنوع
    }
};
```

### ۱۷.۳. وابستگی Schema به Component

```typescript
// ❌ ممنوع
import {ComponentButton} from "./ComponentButton";  // ← ممنوع در Schemas.ts

export const Schemas = {
    FORM: {
        part: ComponentButton.FORM_PART,  // ← ممنوع
    }
};
```

### ۱۷.۴. Rendering در Props

```typescript
// ❌ ممنوع
export const Props = {
    prop_btnTitle: Define_ComponentProp<string>({
        prop: "prop_btnTitle",
        render() { ... },  // ← ممنوع
    }),
};
```

### ۱۷.۴.۱. استفاده از satisfies به‌جای Define_ComponentProp (Plan 9.1.3)

```typescript
// ❌ ممنوع — satisfies باعث literal narrowing می‌شود
prop_btnSemantic: {
    prop:         "prop_btnSemantic",
    default:      ButtonSemantic.SUBMIT,
} satisfies TComponentPropEntry<ButtonSemantic>,

// ✅ درست — Define_ComponentProp<T> نوع T را در return type حفظ می‌کند
prop_btnSemantic: Define_ComponentProp<ButtonSemantic>({
    prop:         "prop_btnSemantic",
    default:      ButtonSemantic.SUBMIT,
}),
```

### ۱۷.۴.۲. فراموش کردن `T | null` برای nullable props (Plan 9.1.3)

```typescript
// ❌ ممنوع — default null اما نوع null ندارد
prop_btnIcon: Define_ComponentProp<UiIcons.IIconDefinition>({
    default:      null,  // ❌ null به IIconDefinition انتساب ندارد
}),

// ✅ درست — نوع باید null را هم شامل شود
prop_btnIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
    default:      null,  // ✅ null به IIconDefinition | null انتساب دارد
}),
```

### ۱۷.۵. State در Schema

```typescript
// ❌ ممنوع
export const Schemas = {
    FORM: {
        part: "part-form",
        state: { opened: false },  // ← ممنوع — State در کلاس Component
    }
};
```

### ۱۷.۶. Example بدون render() (الگوی قدیمی — Plan 8.1.5 منسوخ)

```typescript
// ❌ ممنوع — الگوی قدیمی ComponentExampleDefinition (data-only)
// Plan 8.1.5: Exampleها حالا باید render() callable داشته باشند
export const DefaultExample: ComponentExampleDefinition = {
    id: "button_default",
    config: { prop_btnTitle: "Submit" },  // ❌ ممنوع — config به‌جای render()
    methods: {},
};
```

```typescript
// ✅ درست — الگوی جدید ComponentExample با render()
export const DefaultExample: ComponentExample = {
    id: "button_default",
    name: Keys.category.components.button.examples.default.name,
    description: Keys.category.components.button.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        { prop_btnTitle: "Submit" },
        {},
    ).getElement() as HTMLElement,
};
```

### ۱۷.۷. import Types از UI (deprecated)

```typescript
// ❌ ممنوع — deprecated بعد از پلن ۶.۱
import {ComponentIdentity} from "@/ui_components";
import {ComponentDefinition} from "@/ui_components";

// ✅ درست — از Core
import {ComponentIdentity}    from "@/core_components";
import {ComponentDefinition}  from "@/core_components";
```

### ۱۷.۸. ثبت نشدن در Category

```typescript
// ❌ ممنوع — Component باید در Category ثبت شود
// فقط در ComponentManager ثبت شده، ولی در Category نه
```

### ۱۷.۹. arrow function در emit (اگر به this نیاز است)

```typescript
// ❌ ممنوع — arrow function با .call() نمی‌تواند this را تغییر دهد
emit: (request) => {
    this.set("prop_show", false);  // ❌ this = lexical scope، نه Component
}

// ✅ درست — function معمولی
emit: function(request) {
    this.set("prop_show", false);  // ✅ this = Component instance (auto-bind)
}
```

### ۱۷.۱۰. runtime name در Public API

```typescript
// ❌ ممنوع — runtime name نباید در Public API نشت کند
UiCategory.UI.Simples.Button(
    { ... },
    {
        fn_onClickButton: (event, dataArgs, componentArgs) => { ... },  // ❌ implementation detail
    }
);

// ✅ درست — semantic key
UiCategory.UI.Simples.Button(
    { ... },
    {
        CLICK: function(event, dataArgs, componentArgs) { ... },  // ✅ public API
    }
);
```

### ۱۷.۱۱. فراموش کردن getElement() در children

```typescript
// ❌ ممنوع — Category callable برمی‌گرداند Component instance، نه HTMLElement
const btn = UiCategory.UI.Simples.Button({ ... });
ReactiveApp.section({
    children: [btn],  // ❌ btn یک Component instance است، نه HTMLElement
});

// ✅ درست — getElement() صدا بزن
const btn = UiCategory.UI.Simples.Button({ ... });
ReactiveApp.section({
    children: [btn.getElement()],  // ✅ HTMLElement
});
```

### ۱۷.۱۳. mutate مستقیم children Step (Plan 8.2.7)

```typescript
// ❌ ممنوع — children encapsulated است
step.children["newChild"] = childStep;  // ← ممنوع
delete step.children["oldChild"];       // ← ممنوع
```

```typescript
// ✅ درست — از API رسمی SubEvent استفاده کن
CoreEvent.SubEvent(parentStep, "newChild", childStep);
CoreEvent.removeChild(parentStep, "oldChild");
```

### ۱۷.۱۴. Step در render cycle ساختن (Plan 8.2.7/8.2.8)

```typescript
// ❌ ممنوع — Step باید در constructor ساخته شود، نه در render
override renderContentComponent() {
    const step = CoreEvent.Step({ ... });  // ❌ هر render یک Step جدید!
    return ...;
}
```

```typescript
// ✅ درست — Step در constructor ساخته شود
constructor(config, methods, identity) {
    const step = createButtonStep();       // ✅ یک‌بار
    super("button", null, identity, step);
}
```

### ۱۷.۱۵. routing مستقیم بدون Trait methods (Plan 11.2)

```typescript
// ❌ ممنوع — COMPONENT/STRUCTURE نباید مستقیم رندر شوند
override renderManagerComponent(partName, ...) {
    switch (partName) {
        case ComponentStructureTrait.schemas.COMPONENT.part:
            return super.renderManagerComponent(partName, ...);  // ❌ لایه <component-{name}> ساخته نمی‌شود
        case Schemas.BUTTON.part:
            return this.renderButton(...);  // ❌ اگر BUTTON root است، لایه structure هم نیست
    }
}
```

```typescript
// ✅ درست — Plan 11.2: COMPONENT/STRUCTURE از Trait، اختصاصی از render methods
override renderManagerComponent(partName, ...) {
    switch (partName) {
        case ComponentStructureTrait.schemas.COMPONENT.part:
            return ComponentStructureTrait.renderComponentSchema(this, ...);  // ✅ <component-button>
        case ComponentStructureTrait.schemas.STRUCTURE.part:
            return ComponentStructureTrait.renderStructureSchema(this, ...);  // ✅ <section>
        case Schemas.BUTTON.part:
            return this.renderButton(...);  // ✅ content اختصاصی
    }
}
```

### ۱۷.۱۶. فراموش کردن dispose (Plan 8.2.7)

```typescript
// ❌ ممنوع — Component بدون dispose → memory leak در Event Tree
// Component از DOM حذف می‌شود ولی Stepها در رجیستری باقی می‌مانند
```

```typescript
// ✅ درست — dispose پیاده‌سازی شود
dispose(): void {
    this.disposeStep();  // ← CoreEvent.dispose بازگشتی
}
```

---

## ۱۷.۱۲. استفاده از ComponentExampleDefinition (منسوخ — Plan 8.1.5)

```typescript
// ❌ ممنوع — ComponentExampleDefinition حذف شده در Plan 8.1.5
import {ComponentExampleDefinition} from "@/core_components";

export const DefaultExample: ComponentExampleDefinition = {
    id: "button_default",
    config: { ... },     // ❌ ممنوع — الگوی data-only منسوخ
    methods: { ... },
};

// ✅ درست — ComponentExample با render() callable
import {ComponentExample} from "@/core_components";

export const DefaultExample: ComponentExample = {
    id: "button_default",
    name: Keys.category.components.button.examples.default.name,
    description: Keys.category.components.button.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        { prop_btnTitle: "Submit" },
        {},
    ).getElement() as HTMLElement,
};
```

---

## ۱۸. TestsPage — کشف خودکار Exampleها

`ClTestsPage` به‌صورت خودکار تمام Componentهای ثبت‌شده در `ComponentManager` را کشف می‌کند و Exampleهای آن‌ها را نمایش می‌دهد.

### جریان

```
ComponentManager.list()
    → برای هر entry: ComponentManager.getExamples(id)
    → برای هر example: example.render()  →  HTMLElement
    → نمایش در section اختصاصی آن Component
```

### مزیت

هر Component جدید که در `ComponentManager` ثبت شود و `examples` داشته باشد، **خودش** در TestsPage ظاهر می‌شود — بدون نیاز به کد دستی.

### شرط نمایش

| شرط | توضیح |
|:---|:---|
| Component در `ComponentManager` ثبت شده | `ComponentManager.register({...})` |
| `examples` در registry entry باشد | `examples: Examples` (از `examples/index.ts`) |
| حداقل یک Example داشته باشد | `Examples` خالی نباشد |

### الگو — ثبت با Examples

```typescript
// در lists/index.ts یا فایل bootstrap
CoreComponents.ComponentManager.register({
    definition:  Definition,
    props:       Props,
    schemas:     Schemas,
    methods:     Methods,
    examples:    Examples,        // ← این باعث نمایش در TestsPage می‌شود
    constructor: ComponentButton,
});
```

### مسیر Source

```
src/framework/module_ui/module_pages/pages/tests/ClTestsPage.ts
```

---

## ۱۹. Source References

| فایل | مسیر |
|:---|:---|
| ComponentStructure (Concrete) | `src/framework/module_ui/module_components/lists/componentStructure/ComponentStructure.ts` |
| ComponentStructureBase (Abstract) | `src/framework/module_ui/module_components/lists/componentStructure/ComponentStructureBase.ts` |
| ComponentIconBase (الگوی مشابه) | `src/framework/module_ui/module_components/lists/componentIcon/ComponentIconBase.ts` |
| ComponentIcon (الگوی مشابه) | `src/framework/module_ui/module_components/lists/componentIcon/ComponentIcon.ts` |
| ClComponentBase | `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` |
| AbComponentConnector | `src/framework/module_core/module_components/basic/abstract/AbComponentConnector.ts` |
| ComponentManager | `src/framework/module_core/module_components/basic/manager/ComponentManager.ts` |
| ComponentExample (Interface) | `src/framework/module_core/module_components/tools/example/Interface_ComponentExample.ts` |
| ComponentConstructor (Type) | `src/framework/module_core/module_components/basic/manager/ComponentManager.ts` |
| ComponentIdentity | `src/framework/module_core/module_components/basic/types/TComponentIdentity.ts` |
| ComponentDefinition | `src/framework/module_core/module_components/basic/types/TComponentDefinition.ts` |
| ComponentProps | `src/framework/module_core/module_components/basic/types/TComponentProps.ts` |
| ComponentSchemas | `src/framework/module_core/module_components/basic/types/TComponentSchemas.ts` |
| CoreEvent.Step | `src/framework/module_core/module_event/index.ts` |
| Callback_ComponentMethod | `src/framework/module_core/module_components/tools/method/Callback_ComponentMethod.ts` |
| Interface_ComponentMethod | `src/framework/module_core/module_components/tools/method/Interface_ComponentMethod.ts` |
| Define_ComponentMethod | `src/framework/module_core/module_components/tools/method/Define_ComponentMethod.ts` |
| Define_ComponentProp | `src/framework/module_core/module_components/tools/prop/Define_ComponentProp.ts` |
| Interface_ComponentProp (ComponentPropEntry) | `src/framework/module_core/module_components/tools/prop/Interface_ComponentProp.ts` |
| TypeHelpers (ExtractPropsType, ExtractPropsConfigType, ExtractMethodsType, ...) | `src/framework/module_ui/module_components/tools/type/TypeHelpers.ts` |
| Type Verification Proofs (Plan 9.1.3) | `src/framework/module_ui/module_components/tools/type/__verify__/` |
| CreateCategoryComponent | `src/framework/module_ui/module_categories/basic/methods/MtCreateCategoryComponent.ts` |
| TCategoryComponentTotality | `src/framework/module_ui/module_categories/basic/types/TCategoryComponentTotality.ts` |
| Category UI Lists | `src/framework/module_ui/module_categories/lists/ui/` |
| ComponentStructureTrait | `src/framework/module_ui/module_components/traits/componentStructureTrait/Trait.ts` |
| ClTestsPage (automatic discovery) | `src/framework/module_ui/module_pages/pages/tests/ClTestsPage.ts` |
| SubEvent / getChild / dispose (Plan 8.2.7) | `src/framework/module_core/module_event/index.ts` |
| ClStep API (addChild, removeChild, getParent, ...) (Plan 8.2.7) | `src/framework/module_core/module_event/class/ClStep.ts` |
| Inspector (inspect, trace, find, stats, monitor) (Plan 8.2.9) | `src/framework/module_core/module_event/index.ts` |
| Event Inspector Docs (Plan 8.2.9) | `documents/inspectors/event-inspector.md` |

---

## ۲۰. Related Guides

- [Basic/index.md](./Basic/index.md) — نقشه راه اصلی
- [Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md](./Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) — ساختار Component
- [Basic/00-framework/AI_GUIDE_RULES.md](./Basic/00-framework/AI_GUIDE_RULES.md) — قوانین طلایی
- [Basic/01-systems/AI_GUIDE_EVENT.md](./Basic/01-systems/AI_GUIDE_EVENT.md) — سیستم Event (CoreEvent)
- [inspectors/event-inspector.md](./inspectors/event-inspector.md) — Console Inspector & Flow Monitor (Plan 8.2.9)

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۵ — Plan 11.2 (Schema پایه از Trait) + Plan 9.1 (Step Factory) + Plan 9.1.1 (Behavior Legacy)*

---

## ۲۱. Plan 9.1.3 — Enum Type Narrowing (`Define_ComponentProp<T>`)

### مشکل

الگوی قدیمی `satisfies TComponentPropEntry<T>` باعث می‌شد TypeScript نوع `default` را به‌صورت **literal** استنتاج کند (مثلاً `ButtonSemantic.SUBMIT` به‌جای `ButtonSemantic`). این باعث می‌شد:

- `ExtractPropsType` نوع اشتباه استخراج کند — literal به‌جای enum کامل
- مصرف‌کننده فقط می‌توانست همان مقدار default را پاس دهد، نه هر مقدار از enum
- `ExtractMethodsComponentArgs` هم literal استخراج می‌کرد

### راه‌حل — `Define_ComponentProp<T>`

به‌جای `satisfies TComponentPropEntry<T>`، از helper `Define_ComponentProp<T>(...)` استفاده می‌شود:

```typescript
// ❌ قدیمی — literal narrowing
prop_btnSemantic: {
    prop:         "prop_btnSemantic",
    default:      ButtonSemantic.SUBMIT,
} satisfies TComponentPropEntry<ButtonSemantic>,

// ✅ جدید — type widening via helper
prop_btnSemantic: Define_ComponentProp<ButtonSemantic>({
    prop:         "prop_btnSemantic",
    default:      ButtonSemantic.SUBMIT,
}),
```

`Define_ComponentProp<T>` یک identity function است که نوع `T` را در return type حفظ می‌کند — `default` در خروجی نوع `T` دارد (نه literal).

### Overloadها

`Define_ComponentProp` دو overload دارد:

1. **Whole-object** (قدیمی — برای `as any` در Base):
   ```typescript
   Define_ComponentProp<TPropTypes>({ ...patterns } as any)
   ```

2. **Per-entry** (جدید — برای Props.ts):
   ```typescript
   Define_ComponentProp<T>(entry: ComponentPropEntry<T>): ComponentPropEntry<T>
   ```

Overload 1 اول است تا فراخوانی‌های قدیمی `as any` بدون تغییر کار کنند.

### نکات مهم

- **Generic `<T>` اجباری است** — بدون `<T>`، type preservation کار نمی‌کند. مصرف‌کننده باید همیشه نوع را صریحاً پاس دهد.
- **`default: null`** — اگر default مقدار `null` است، نوع باید `T | null` باشد (مثلاً `Define_ComponentProp<IIconDefinition | null>({ default: null })`).
- **`ExtractPropsType` بدون تغییر** — این helper از `TProps[K]["default"]` استفاده می‌کند و با خروجی `Define_ComponentProp<T>` به‌درستی کار می‌کند.
- **`ExtractMethodsComponentArgs` بدون تغییر** — چون `args` به prop entryها اشاره می‌کند و `default` از نوع `T` است، استخراج درست انجام می‌شود.

### فایل‌های Proof

| فایل | مسیر | هدف |
|:---|:---|:---|
| `DefinePropProof.ts` | `tools/type/__verify__/` | Phase 1C+1D: contract + overload proofs |
| `DefinePropRuntimeProof.ts` | `tools/type/__verify__/` | Phase 1E: runtime identity |
| `ExtractPropsTypeProof.ts` | `tools/type/__verify__/` | Phase 2+3: extraction + regression |
| `ButtonPropsExtractionProof.ts` | `tools/type/__verify__/` | Phase 4: real migrated ButtonProps |
| `MethodsExtractionProof.ts` | `tools/type/__verify__/` | Phase 6: Methods chain |
| `Phase7Invariant.ts` | `tools/type/__verify__/` | Phase 7: public type vs runtime default |
