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
│   ├── Icon.ts                ← Example با آیکون (با render() callable)
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
import {Keys}              from "../../../module_categories/languages";
// --------------------------------


/**
 * Props اختصاصی ComponentButton
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_btnTitle: {
        prop:         "prop_btnTitle",
        default:      "" as string,
        name:         Keys.category.components.button.props.btnTitle.name,
        description:  Keys.category.components.button.props.btnTitle.description,
    },

    prop_btnType: {
        prop:         "prop_btnType",
        default:      "button" as string,
        name:         Keys.category.components.button.props.btnType.name,
        description:  Keys.category.components.button.props.btnType.description,
    },

    prop_btnIcon: {
        prop:         "prop_btnIcon",
        default:      null as string | null,
        name:         Keys.category.components.button.props.btnIcon.name,
        description:  Keys.category.components.button.props.btnIcon.description,
    },

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentButton — برای استفاده در TProp
 */
export type PropsType = {
    [K in keyof typeof Props]: typeof Props[K]["default"]
};
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر prop شامل `prop`, `default`, `name`, `description` باشد | **MUST** |
| `prop` با `prop_` شروع شود (برای propهای اختصاصی) | **SHOULD** |
| `default` type-correct باشد | **MUST** |
| `name` و `description` از `Keys` (سیستم ترجمه) استفاده کنند | **MUST** |
| Props نباید Rendering انجام دهد | **MUST NOT** |
| Props نباید به Runtime وابسته باشد | **MUST NOT** |
| `satisfies CoreComponents.ComponentProps` استفاده شود | **MUST** |

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
// --------------------------------


/**
 * Schemas اختصاصی ComponentButton
 * این Schemas به ۲ schema پایه (COMPONENT, STRUCTURE) اضافه می‌شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentButton قرار دارد.
 */
export const Schemas = {

    FORM: {
        part:         "part-button-form",
        props:        [Props.prop_btnTitle, Props.prop_btnType, Props.prop_btnIcon],
        name:         Keys.category.components.button.schemas.form.name,
        description:  Keys.category.components.button.schemas.form.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentButton — برای استفاده در TSchemas
 */
export type SchemasType = {
    [K in keyof typeof Schemas]: typeof Schemas[K]["part"]
};
```

### قوانین

| قانون | سطح |
|:---|:---|
| هر schema شامل `part`, `props` باشد | **MUST** |
| `part` با `part-` شروع شود و یکتا باشد | **MUST** |
| `props` به entryهای `Props` اشاره کند (نه string) | **MUST** |
| `name` و `description` از `Keys` استفاده کنند | **SHOULD** |
| **هیچ** `handler`, `method`, `render` در Schema نباشد | **MUST NOT** |
| Schema به CoreReactive وابسته نباشد | **MUST NOT** |
| Schema به Component کلاس وابسته نباشد | **MUST NOT** |
| `satisfies CoreComponents.ComponentSchemas` استفاده شود | **MUST** |

### نکته

۲ schema پایه (`COMPONENT`, `STRUCTURE`) از `ComponentStructure` ارث می‌رسند.
شما فقط schemaهای **اخصاصی** Component را تعریف می‌کنید.

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
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickButton",
        description: "Callback when button is clicked",

        // componentArgs — prop reference‌ها
        // در زمان اجرا resolve می‌شوند به مقادیر فعلی props
        args: {
            TITLE: ButtonProps.prop_btnTitle,
            TYPE:  ButtonProps.prop_btnType,
        },

        // dataArgs — type تعریف‌شده برای داده‌های runtime
        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentButton — برای استفاده در TMethods (داخلی Component)
 */
export type MethodsType = {
    [K in keyof typeof Methods]: (event: Event, dataArgs: any, componentArgs: any) => void
};


/**
 * Component Args type برای هر method
 * از args (prop reference) استخراج می‌شود
 *
 * مثال: MethodsComponentArgs["CLICK"] = { TITLE: string, TYPE: string }
 */
export type MethodsComponentArgs = {
    [K in keyof typeof Methods]: {
        [ArgKey in keyof typeof Methods[K]["args"]]:
            typeof Methods[K]["args"][ArgKey] extends {
                default: infer T
            }
                ? T
                : any;
    };
};


/**
 * Data Args type برای هر method
 * از dataArgs تعریف‌شده در Methods استخراج می‌شود
 *
 * مثال: MethodsDataArgs["CLICK"] = {}
 */
export type MethodsDataArgs = {
    [K in keyof typeof Methods]: typeof Methods[K]["dataArgs"];
};


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
 *               //   componentArgs?.TITLE  ← string
 *               //   componentArgs?.TYPE   ← string
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
> = {
    [K in keyof typeof Methods]?: (
        this: TThis,
        event: Event,
        dataArgs: MethodsDataArgs[K] | null,
        componentArgs: MethodsComponentArgs[K] | null,
    ) => void;
};
```

### قوانین

| قانون | سطح |
|:---|:---|
| `name` با `fn_on` شروع شود | **MUST** |
| semantic keys (CLICK, HOVER, ...) متعلق به Public API باشند | **MUST** |
| runtime `name` متعلق به implementation باشد — نباید به Public API نشت کند | **MUST** |
| `args` به propهای موجود در `Props` اشاره کند | **MUST** |
| `dataArgs` با `as const` تعریف شود | **MUST** |
| `MethodsComponentArgs` و `MethodsDataArgs` استخراج شوند | **MUST** |
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
 * Step Node — درخت Workflow داخلی ComponentButton
 *
 * این Step در constructor ComponentButton به ComponentStructure پاس داده می‌شود.
 * در متدهای render به reactiveElementها متصل می‌شود.
 *
 * تفاوت با identity:
 *   identity = بیرونی — والد به این Component
 *   step     = داخلی — این Component به فرزندانش
 */
export const ButtonStep = CoreEvent.Step({
    children: {
        click: CoreEvent.Step({
            request:  CoreEvent.Request(),
            response: CoreEvent.Response({ value: "" }),
        }),
    }
});
```

### قوانین

| قانون | سطح |
|:---|:---|
| Step با `CoreEvent.Step()` ساخته شود | **MUST** |
| هر child Step شامل `request` و `response` باشد | **SHOULD** |
| Step در فایل جدا (نه در Component کلاس) تعریف شود | **MUST** |
| Step به Component کلاس وابسته نباشد | **MUST NOT** |

### نکته

اگر Component نیاز به Workflow داخلی ندارد (مثلاً یک Component display-only)،
می‌توانید این فایل نسازید و `step` را در constructor پاس ندهید.

---

## ۷. فایل ۶ — ComponentButtonBase.ts

### هدف

Base کلاس — ترکیب Props/Schemas/Methods/Definition پایه با اختصاصی.

### الگو — با ComponentStructureTrait (Plan 8.1.2)

```typescript
import * as CoreComponents   from "@/core_components";
// --------------------------------
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
// --------------------------------
import {Props as ButtonProps,     PropsType     as ButtonPropsType}     from "./Props";
import {Schemas as ButtonSchemas, SchemasType   as ButtonSchemasType}   from "./Schemas";
import {Methods as ButtonMethods, MethodsType   as ButtonMethodsType}   from "./Methods";
import {Definition}          from "./Definition";


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
 */
export class ComponentButtonBase extends CoreComponents.App<
    ButtonPropsType & Record<string, any>,
    ButtonSchemasType,
    any,
    ButtonMethodsType
> {

    protected _COMPONENT_DEFINITION = Definition;

    // ۷ prop پایه (از Trait) + propهای اختصاصی ComponentButton
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<ButtonPropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...ButtonProps,
    } as any);

    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<ButtonSchemasType, ButtonPropsType & Record<string, any>>({
        ...ButtonSchemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<ButtonMethodsType, ButtonPropsType & Record<string, any>>({
        ...ButtonMethods,
    } as any);

}
```

### نکته — ComponentStructureTrait

`ComponentStructureTrait` یک capability مشترک است که:
- ۷ prop پایه (`classList`, `prop_show`, `prop_structureClass`, ...) را در `props` نگه می‌دارد
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

protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema({
    ...CustomSchemas,  // اختصاصی
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
// --------------------------------
import {ComponentButtonBase}  from "./ComponentButtonBase";
import {ButtonStep}           from "./Step";
import {Schemas}              from "./Schemas";
// --------------------------------
import {ButtonPropsType}      from "./Props";
import {MethodsConfigType}    from "./Methods";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsType as ButtonPropsType}     from "./Props";


/**
 * ComponentButton — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentButton HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderButton (محتوای اختصاصی ComponentButton)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه (classList, prop_show, ...) + propهای اختصاصی (prop_btnTitle, ...)
 *   methods — methodهای اختصاصی (CLICK, ...) با type-safe callback
 *   identity — { unique?, emit?, events? }
 */
export class ComponentButton extends ComponentButtonBase {

    constructor(
        config?:  Partial<StructurePropsType & ButtonPropsType>,
        methods?: MethodsConfigType<ComponentButton>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        super("button", null);

        // identity را manual set می‌کنیم (ClComponentBase constructor identity نمی‌گیرد)
        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Rendering اختصاصی
       این متد توسط renderStructureSchema صدا زده می‌شود.
    --------------------------------------------- */
    override renderContentComponent(): CoreReactive.App {

        return this.renderForm();
    }


    /* ---------------------------------------------
       renderForm — رندر Part FORM
       مستقیم، بدون executeSchemaPart
    --------------------------------------------- */
    protected renderForm(): CoreReactive.App {

        const prop_btnTitle = this._COMPONENT_PROPS_BIND.prop_btnTitle;
        const prop_btnType  = this._COMPONENT_PROPS_BIND.prop_btnType;

        return CoreReactive.App.button({
            className: ["btn"],
            attrs: {
                type: prop_btnType,
            },
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_btnTitle.get(), valid: true };
            },
            on: {
                click: (e, event) => {
                    this.executeMethod("CLICK", event, { event: e });
                },
            },
            children: [
                prop_btnTitle,
            ],
        });
    }


    /* ---------------------------------------------
       Helper methods — متدهای کمکی اختصاصی
    --------------------------------------------- */
    protected getButtonBackgroundColor(): string {
        // ...
        return "blue";
    }

}
```

### قوانین

| قانون | سطح |
|:---|:---|
| از `ComponentButtonBase` ارث‌بری کند | **MUST** |
| constructor امضا `(config, methods, identity?)` داشته باشد | **MUST** |
| constructor شامل `super(name, null, identity, step)` باشد | **MUST** |
| constructor شامل `this.renderComponent(config, methods)` باشد | **MUST** |
| `renderContentComponent` override شود | **MUST** |
| Rendering اختصاصی در متدهای `protected` باشد | **MUST** |
| Rendering از `this._COMPONENT_PROPS_BIND` استفاده کند | **MUST** |
| Rendering از `this._COMPONENT_STEP` برای اتصال reactiveElement استفاده کند | **SHOULD** |
| Rendering از `this.executeMethod()` برای فراخوانی Methodها استفاده کند | **MUST** |
| State در این کلاس باشد (نه در Schema) | **MUST** |
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

### جریان رندر

```
new ComponentButton(config, methods, identity)
    ↓
super("button", null, identity, ButtonStep)
    ↓
this.renderComponent(config, methods)
    ↓
executeSchemaPart("part-component")
    → renderManagerComponent() override
    → renderComponentSchema()  ← <component-button> با RTL + classList
        → executeSchemaPart("part-component-structure")
            → renderManagerComponent() override
            → renderStructureSchema()  ← <section> با show/hide
                → renderContentComponent() override
                    → renderForm()  ← <button> اختصاصی
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
import {Keys}           from "../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentButton
 *
 * نمایش یک Button ساده با styling پیش‌فرض.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چه Componentی ساخته می‌شود (UiCategory.UI.Simples.Button)
 *   - چه propهایی پاس می‌شود (prop_btnTitle, prop_btnType)
 *   - چه Methodهایی فراخوانی می‌شود (CLICK با Function Callback)
 */
export const DefaultExample: ComponentExample = {

    id:          "button_default",

    name:        Keys.category.components.button.examples.default.name,

    description: Keys.category.components.button.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle: "Submit",
            prop_btnType:  "submit",
        },
        {
            CLICK: function(event, dataArgs, componentArgs) {
                console.log("[DefaultExample] button clicked", event, dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
```

### الگو — Icon.ts

```typescript
import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../module_categories/languages";
// --------------------------------


/**
 * Icon Example برای ComponentButton
 *
 * نمایش یک Button با آیکون.
 */
export const IconExample: ComponentExample = {

    id:          "button_icon",

    name:        Keys.category.components.button.examples.icon.name,

    description: Keys.category.components.button.examples.icon.description,

    render: (): HTMLElement => UiCategory.UI.Simples.Button(
        {
            prop_btnTitle: "Reload",
            prop_btnType:  "button",
            prop_btnIcon:  "icon-reload",
        },
        {},
    ).getElement() as HTMLElement,

};
```

### الگو — index.ts

```typescript
import {ComponentExample} from "@/core_components";
// --------------------------------
import {DefaultExample}  from "./Default";
import {IconExample}    from "./Icon";


/**
 * Examples Registry برای ComponentButton
 *
 * تمام Exampleهای ComponentButton از این نقطه قابل دسترسی هستند.
 * ComponentManager می‌تواند این Registry را بخواند و
 * Exampleها را با example.render() نمایش دهد.
 *
 * @example
 *   Examples.DEFAULT.render()   // → HTMLElement
 *   Examples.ICON.render()      // → HTMLElement
 */
export const Examples = {

    DEFAULT: DefaultExample,
    ICON:    IconExample,

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
export {Props}                             from "./Props"
export type {PropsType}                    from "./Props"
export {Schemas}                           from "./Schemas"
export type {SchemasType}                  from "./Schemas"
export {Methods}                           from "./Methods"
export type {MethodsType}                  from "./Methods"
export type {MethodsConfigType,
             MethodsComponentArgs,
             MethodsDataArgs}              from "./Methods"
export {Definition}                        from "./Definition"
export {ButtonStep   as Step}              from "./Step"
export {Examples}                          from "./examples"
export type {ComponentButtonExamplesType}  from "./examples"
```

### قوانین

| قانون | سطح |
|:---|:---|
| `Component` alias برای کلاس نهایی | **MUST** |
| `Base` alias برای Base کلاس | **SHOULD** |
| `Step` alias برای Step Node | **SHOULD** |
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

`ComponentStructure` یک static factory دارد برای استفاده راحت (مثل `CoreReactive.App.section({...})`):

```typescript
const { create } = UiComponents.Lists.ComponentStructure.Component;

const el = create(
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
```

### قوانین

| قانون | سطح |
|:---|:---|
| `create()` خروجی `CoreReactive.App` می‌دهد | **MUST** |
| `content` اختیاری است — اگر نباشد، fallback به `renderContentComponent()` | **MAY** |
| `methods` و `identity` اختیاری هستند | **MAY** |

### توجه

`create()` فقط برای `ComponentStructure` مستقیم است.
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
- [ ] `Props.ts` — propهای اختصاصی + `PropsType`
- [ ] `Schemas.ts` — schemaهای اختصاصی + `SchemasType`
- [ ] `Methods.ts` — methodهای اختصاصی با `args`, `dataArgs` + `MethodsType`, `MethodsComponentArgs`, `MethodsDataArgs`, `MethodsConfigType<TThis>`
- [ ] `Step.ts` — درخت Workflow داخلی (اگر نیاز است)

### مرحله ۲: Runtime Layer

- [ ] `ComponentButtonBase.ts` — extends CoreComponents.App + ComponentStructureTrait.props + ۴ فیلد protected
- [ ] `ComponentButton.ts` — extends ComponentButtonBase + constructor + renderContentComponent + MethodsConfigType<ComponentButton>

### مرحله ۳: Examples (Plan 8.1.5 — الگوی جدید با render())

- [ ] کلیدهای زبان در `Keys.ts` (در `examples` section کامپوننت مربوطه) اضافه شود
- [ ] ترجمه‌ها در `Fa.ts` و `En.ts` اضافه شود
- [ ] `examples/Default.ts` — Example با `render(): () => HTMLElement` (الگوی `ComponentExample`)
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
    prop_btnTitle: {
        prop: "prop_btnTitle",
        render() { ... },  // ← ممنوع
    }
};
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
| CreateCategoryComponent | `src/framework/module_ui/module_categories/basic/methods/MtCreateCategoryComponent.ts` |
| TCategoryComponentTotality | `src/framework/module_ui/module_categories/basic/types/TCategoryComponentTotality.ts` |
| Category UI Lists | `src/framework/module_ui/module_categories/lists/ui/` |
| ComponentStructureTrait | `src/framework/module_ui/module_components/traits/componentStructureTrait.ts` |
| ClTestsPage (automatic discovery) | `src/framework/module_ui/module_pages/pages/tests/ClTestsPage.ts` |

---

## ۲۰. Related Guides

- [Basic/index.md](./Basic/index.md) — نقشه راه اصلی
- [Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md](./Basic/02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) — ساختار Component
- [Basic/00-framework/AI_GUIDE_RULES.md](./Basic/00-framework/AI_GUIDE_RULES.md) — قوانین طلایی

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۱۵ — Plan 8.1.5 (ComponentExample با render() + حذف ExampleRenderer + Base/Concrete split ComponentStructure + TestsPage automatic discovery)*
