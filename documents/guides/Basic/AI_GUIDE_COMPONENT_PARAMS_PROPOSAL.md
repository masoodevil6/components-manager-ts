# گزارش پیشنهادی: پیاده‌سازی چهار پارامتر اصلی کامپوننت‌ها

> `TProp` , `TSchemas` , `TTemplate` , `TMethods`

---

## ۱. مقدمه — چرا این چهار پارامتر؟

در ساختار قدیمی (`last/tools/components/ComponentButton.ts`)، هر کامپوننت چهار نوع عمومی (Generic) داشت که کل چهارچوب کامپوننت را کنترل می‌کردند:

```typescript
export class ComponentButtonBase extends ComponentBase<
    ComponentButtonPropsType,      // TProp
    ComponentButtonSchemaType,     // TSchemas
    ComponentButtonTemplatesType,  // TTemplate
    ComponentButtonMethodsType     // TMethods
>
```

این چهار پارامتر باعث می‌شد:
- **Type Safety کامل** — هر prop، schema، template، method با کلیدهای مشخص و type-checked
- **Auto-complete در IDE** — توسعه‌دهنده نام propها و methodها را با autocomplete می‌بیند
- **کنترل ساختار** — هیچ prop یا method خارج از این چهارچوب قابل استفاده نبود

---

## ۲. وضعیت فعلی در فریم‌ورک جدید

### ۲.۱. `ClComponentBase` (پایه)

```typescript
export class ClComponentBase<
    TProp extends Record<string, any>,
    TSchemas,
    TTemplate,
    TMethods extends Record<string, MethodCallback<any, any>>
> extends ComponentConnector {

    _COMPONENT_PATTERN:   { [K in PropType<TProp>]?:      PropInterface<TProp[K]> }
    _COMPONENT_SCHEMA:    { [K in SchemaType<TSchemas>]:  SchemaInterface<TSchemas[K], TProp> }
    _COMPONENT_METHODS:   { [K in MethodType<TMethods>]:  MethodInterface<TProp> }
    _COMPONENT_TEMPLATES: { [K in TemplateType<TTemplate>]?: TemplateInterface<TProp> }
}
```

✅ چهار پارامتر وجود دارند و fieldهای `_COMPONENT_*` هم از آن‌ها type می‌گیرند.

### ۲.۲. `ComponentStructure` (میانی)

```typescript
export class ComponentStructure<
    TProp extends Record<string, any>,
    TSchemas,
    TTemplate,
    TMethods extends Record<string, any>
> extends CoreComponents.App<TProp, TSchemas, TTemplate, TMethods>
```

✅ چهار پارامتر پاس داده می‌شوند اما **هیچ استفاده واقعی از آن‌ها نمی‌شود** — فقط forward می‌شوند.

### ۲.۳. مشکل اصلی

در ساختار قدیمی، هر کامپوننت یک **Configs** داشت که چهارچوب کامل را تعریف می‌کرد:

```typescript
// ساختار قدیمی ComponentButton
const ComponentButtonConfigs = {
    keys:      { ...baseKeys,      prop_btnTitle: { name: "prop_btnTitle", value: SetValue("") } },
    schemas:   { ...baseSchemas,   FORM_BUTTON: { name: "part-form-button" } },
    templates: { BODY: { name: "body" } },
    methods:   { CLICK: { name: "fn_onClickButton", dataArgs: {}, componentArgs: {} } },
} as const

// Typeهای مشتق‌شده
type ComponentButtonPropsType     = ExtractNameValue<typeof Configs.keys>
type ComponentButtonSchemaType    = ExtractName<typeof Configs.schemas>
type ComponentButtonTemplatesType = ExtractName<typeof Configs.templates>
type ComponentButtonMethodsType   = { [Configs.methods.CLICK.name]: Callback<...> }
```

در فریم‌ورک جدید این لایه **Configs** وجود ندارد.

---

## ۳. ساختار پیشنهادی

### ۳.۱. الگو: جدا کردن Configs از Class

به جای یک Configs بزرگ، چهار tool (`Define_ComponentProp`, `Define_ComponentSchema`, `Define_ComponentTemplate`, `Define_ComponentMethod`) وجود دارند. باید یک **Setup** بسازیم که این چهار tool را با هم ترکیب کند و typeهای نهایی را استخراج کند.

### ۳.۲. پیشنهاد: تابع `SetupComponent`

```typescript
// src/framework/module_core/module_components/basic/methods/MtSetupComponent.ts

export function SetupComponent<
    TProps extends Record<string, PropInterface<any>>,
    TSchemas extends Record<string, SchemaInterface<any, any>>,
    TTemplates extends Record<string, TemplateInterface<any>>,
    TMethods extends Record<string, MethodInterface<any>>
>(config: {
    props?:     TProps,
    schemas?:   TSchemas,
    templates?: TTemplates,
    methods?:   TMethods,
}) {
    return {
        props:     config.props     ?? {},
        schemas:   config.schemas   ?? {},
        templates: config.templates ?? {},
        methods:   config.methods   ?? {},
    }
}
```

### ۳.۳. پیشنهاد: Typeهای کمکی برای استخراج

```typescript
// استخراج TProp از props
type ExtractProp<TSetup> = {
    [K in keyof TSetup["props"]]: TSetup["props"][K]["default"]
}

// استخراج TSchemas از schemas
type ExtractSchemas<TSetup> = {
    [K in keyof TSetup["schemas"]]: TSetup["schemas"][K]["part"]
}

// استخراج TTemplate از templates
type ExtractTemplate<TSetup> = keyof TSetup["templates"]

// استخراج TMethods از methods
type ExtractMethods<TSetup> = {
    [K in keyof TSetup["methods"]]: Callback_ComponentMethod<any, any>
}
```

---

## ۴. نمونه استفاده (ComponentButton در ساختار جدید)

### ۴.۱. تعریف Setup

```typescript
// ComponentButton/Setup.ts

import * as CoreComponents from "@/core_components"
import { ComponentStructure } from "@/ui_components/lists/componentStructure/ComponentStructure"

// --- Props ---
const ButtonProps = {
    ...ComponentStructure.getBasePattern(),
    prop_btnTitle:  { prop: "prop_btnTitle",  default: "" },
    prop_btnType:   { prop: "prop_btnType",   default: "button" },
    prop_btnClass:  { prop: "prop_btnClass",  default: ["w-100"] },
    prop_variant:   { prop: "prop_variant",   default: "secondary" },
    // ...
} as const

// --- Schemas ---
const ButtonSchemas = {
    ...ComponentStructure.getBaseSchema(),
    FORM:           { part: "part-form" },
    FORM_BUTTON:    { part: "part-form-button", props: [{ prop: "prop_btnTitle" }] },
    FORM_BTN_TITLE: { part: "part-form-button_title" },
    FORM_BTN_ICON:  { part: "part-form-button_icon" },
} as const

// --- Methods ---
const ButtonMethods = {
    fn_onClickButton: {
        args: {},
    },
} as const

// --- Setup ---
export const ButtonSetup = CoreComponents.SetupComponent({
    props:   ButtonProps,
    schemas: ButtonSchemas,
    methods: ButtonMethods,
})

// --- Typeهای استخراج‌شده ---
export type ButtonPropType     = CoreComponents.ExtractProp<typeof ButtonSetup>
export type ButtonSchemaType   = CoreComponents.ExtractSchemas<typeof ButtonSetup>
export type ButtonTemplateType = CoreComponents.ExtractTemplate<typeof ButtonSetup>
export type ButtonMethodType   = CoreComponents.ExtractMethods<typeof ButtonSetup>
```

### ۴.۲. تعریف Class

```typescript
// ComponentButton/ComponentButton.ts

import { ComponentStructure } from "@/ui_components/lists/componentStructure/ComponentStructure"
import { ButtonSetup, ButtonPropType, ButtonSchemaType, ButtonTemplateType, ButtonMethodType } from "./Setup"

export class ComponentButton extends ComponentStructure<
    ButtonPropType,
    ButtonSchemaType,
    ButtonTemplateType,
    ButtonMethodType
> {

    _COMPONENT_PATTERN = CoreComponents.DefineProp<ButtonPropType>({
        ...ButtonSetup.props,
    })

    _COMPONENT_SCHEMA = CoreComponents.DefineSchema<ButtonSchemaType, ButtonPropType>({
        ...ButtonSetup.schemas,
    })

    _COMPONENT_METHODS = CoreComponents.DefineMethod<ButtonMethodType, ButtonPropType>({
        ...ButtonSetup.methods,
    })

    constructor(
        config:  ButtonPropType,
        methods: ButtonMethodType,
        events?: any,
        unique?: any,
        emit?:   any,
    ) {
        super("button", null)
        this.renderComponent(config, methods, events, unique, emit)
    }

    override renderContentComponent() {
        return this.executeSchemaPart("part-form")
    }

    override renderManagerComponent(partName, attrsDefault, data, extra) {
        switch (partName) {
            case "part-form":          return this.template_render_form(attrsDefault, data, extra)
            case "part-form-button":   return this.template_render_formButton(attrsDefault, data, extra)
            case "part-form-button_title": return this.template_render_formBtnTitle(attrsDefault, data, extra)
            case "part-form-button_icon":  return this.template_render_formBtnIcon(attrsDefault, data, extra)
        }
        return super.renderManagerComponent(partName, attrsDefault, data, extra)
    }

    private template_render_formButton(attrsDefault, data, extra) {
        // ... پیاده‌سازی template
    }
}
```

---

## ۵. مقایسه ساختار قدیم و جدید

| مفهوم | قدیم | جدید |
|-------|------|------|
| **تعریف props** | `ComponentButtonConfigs.keys` + `GOG_SetValue` | `ButtonProps` با `PropInterface` مستقیم |
| **تعریف schemas** | `ComponentButtonConfigs.schemas` | `ButtonSchemas` با `SchemaInterface` مستقیم |
| **تعریف methods** | `ComponentButtonConfigs.methods` | `ButtonMethods` با `MethodInterface` مستقیم |
| **تعریف templates** | `ComponentButtonConfigs.templates` | `ButtonTemplates` با `TemplateInterface` مستقیم |
| **استخراج type** | `GOG_ExtractName` / `GOG_ExtractNameValue` | `ExtractProp` / `ExtractSchemas` / ... |
| **Pattern** | `defineComponentPatterns<T>(...)` | `CoreComponents.DefineProp<T>(...)` |
| **Schema** | `defineComponentSchema<T>(...)` | `CoreComponents.DefineSchema<T>(...)` |
| **Method** | `defineComponentMethods<T>(...)` | `CoreComponents.DefineMethod<T>(...)` |
| **Base props** | `GOG_ComponentBasicProps_Component` | `ComponentStructure.getBasePattern()` |
| **Base schemas** | `GOG_ComponentBasicConfigs_Component_parts` | `ComponentStructure.getBaseSchema()` |

---

## ۶. کارهای مورد نیاز

### ۶.۱. در `module_core/module_components`

- [ ] اضافه‌کردن `MtSetupComponent.ts` در `basic/methods/`
- [ ] اضافه‌کردن typeهای `ExtractProp`, `ExtractSchemas`, `ExtractTemplate`, `ExtractMethods` در `basic/types/`
- [ ] به‌روزرسانی `index.ts` برای export این موارد

### ۶.۲. در `module_ui/module_components`

- [ ] انتقال `ComponentButton` از `last/` به ساختار جدید با الگوی پیشنهادی
- [ ] ساخت پوشه `componentButton/` با `Setup.ts`, `ComponentButton.ts`, `Definition.ts`, `index.ts`
- [ ] ثبت در `categories/lists/ui/basic/` از طریق `CreateCategoryComponent`

### ۶.۳. در `module_ui/module_categories`

- [ ] افزودن `ComponentButton` به `categories/lists/ui/basic/Definition.ts` در آرایه `components`

---

## ۷. مزایای این ساختار

1. **Type Safety کامل** — هر prop، schema، method با کلید مشخص و type-checked
2. **Auto-complete** — IDE نام همه propها و methodها را نشان می‌دهد
3. **جدا شدن Setup از Class** — تعریف چهارچوب (Setup) جدا از پیاده‌سازی (Class)
4. **قابلیت compose** — `ComponentStructure.getBasePattern()` با spread ترکیب می‌شود
5. **کنترل متمرکز** — هر کامپوننت دقیقاً می‌داند چه propها و methodهایی دارد
6. **سازگار با category** — قابل ثبت در `CreateCategoryComponent` و instantiate از طریق `UiCategory.UI.Basic.ComponentButton(...)`
