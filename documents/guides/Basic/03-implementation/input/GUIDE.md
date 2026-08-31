# AI Guide: ComponentInput
> **Audience:** توسعه‌دهندگان AI و مهندسان فرانت‌اند که با فریمورک کامپوننت TypeScript کار می‌کنند
> **Purpose:** راهنمای پیاده‌سازی و استفاده از کامپوننت ورودی فرم (Input) با قابلیت‌های اعتبارسنجی، آیکن و دکمه
> **Level:** پیشرفته
> **Status:** Official
---

## 1. Definition

`ComponentInput` یک کامپوننت ورودی فرم (Form Input) است که از ترکیب چندین زیرکامپوننت تشکیل شده است. این کامپوننت شامل بخش‌های مستقل برای **فرم**، **ورودی**، **آیکن**، **دکمه** و **اعتبارسنجی** است و از Props پایه گسترده‌ای از جمله `FormInput`، `FormInput_Value` و `FormInput_Label` ارث‌بری می‌کند.

این کامپوننت یک **کامپوننت ترکیبی (Composed Component)** است که از کامپوننت‌های `ComponentIcon`، `ComponentButton`، `ComponentValidate`، `ComponentBorder`، `ComponentInputPhone`، `ComponentInputSize` و `ComponentButtonSimple` استفاده می‌کند.

برای آشنایی با ساختار کلی کامپوننت‌ها به [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) مراجعه کنید.

## 2. Responsibilities

- رندر کردن یک فیلد ورودی فرم با ساختار کامل (فرم، ورودی، آیکن، دکمه، اعتبارسنجی)
- پشتیبانی از انواع ورودی: `STRING`، `NUMBER`، `EMAIL`، `PASSWORD`، `TEL`، `URL`، `SEARCH`، `DATE`، `TIME`، `DATETIME_LOCAL`
- مدیریت رویدادهای `CHANGE`، `FOCUS`، `BLUR` و `CLICK_BUTTON`
- ادغام سیستم اعتبارسنجی با قوانین قابل تنظیم (`prop_hasRules`، `prop_listRules`، `prop_msgRules`)
- پشتیبانی از دکمه افزودن اختیاری در کنار فیلد ورودی
- پشتیبانی از آیکن اختیاری در فیلد ورودی
- مدیریت استایل‌های مستقل برای حاشیه، رنگ و اندازه

## 3. Structure

ساختار کلاسی این کامپوننت از الگوی **Base → Concrete** پیروی می‌کند:

```
ComponentBase (کلاس پایه فریمورک)
  └── ComponentInputBase (کلاس انتزاعی - تعریف Pattern، Schema، Template، Methods)
        └── ComponentInput (کلاس concreete - پیاده‌سازی رندر و قالب)
```

### کامپوننت‌های وارد شده (Imports)

این کامپوننت از چندین کامپوننت دیگر استفاده می‌کند:

```typescript
import { ComponentIconMethodsType, ComponentIconPropsType } from "../ComponentIcon";
import { ComponentButtonMethodsType, ComponentButtonPropsType, ComponentButton_Types } from "../ComponentButton";
import { ComponentValidateMethodsType, ComponentValidatePropsType } from "../ComponentValidate";
import { ComponentBorderMethodsType, ComponentBorderPropsType } from "../ComponentBorder";
import { ComponentInputPhone_Methods_INPUT_CHANGE_ComponentArgs } from "../ComponentInputPhone";
import { ComponentInputSize_Methods_INPUT_BLUR_ComponentArgs, ComponentInputSize_Methods_INPUT_FOCUS_ComponentArgs } from "../ComponentInputSize";
import { ComponentInputSimple_Types, ComponentInputSimpleMethodsType, ComponentInputSimplePropsType } from "../simples/ComponentInputSimple";
import { ComponentButtonSimple, ComponentButtonSimpleMethodsType, ComponentButtonSimplePropsType } from "../simples/ComponentButtonSimple";
```

### الگوی Constructor

```typescript
export class ComponentInput extends ComponentInputBase {

    private _ELEMENT_INPUT = null;

    constructor(
        config: ComponentInputPropsType,
        methods: ComponentInputMethodsType,
        events = null
    ) {
        super("input", null);
        super.renderComponent(config, methods, events);
    }

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.ICON.name:
                return this.template_render_icon(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.INPUT.name:
                return this.template_render_input(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.BUTTON.name:
                return this.template_render_button(attrsDefault, data, extra);
            case ComponentInputConfigs.schemas.VALIDATE.name:
                return this.template_render_validate(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }
}
```

> **قوانین کلی ساختار کامپوننت** در [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md) توضیح داده شده است.

## 4. Props

کامپوننت `ComponentInput` از پنج گروه Props پایه ارث‌بری می‌کند:

```typescript
export const ComponentInputProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ...GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    ///----------------------
    prop_title:                            "prop_title",
    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_formBorderRadius:                 "prop_formBorderRadius",
    prop_colorIcon:                        "prop_colorIcon",
    prop_size:                             "prop_size",
    prop_inputClass:                       "prop_inputClass",
    prop_inputStyles:                      "prop_inputStyles",
    prop_inputBorderColor:                 "prop_inputBorderColor",
    prop_inputBorderColorFocus:            "prop_inputBorderColorFocus",
    prop_inputBorderWidth:                 "prop_inputBorderWidth",
    prop_inputBorderRadius:                "prop_inputBorderRadius",
    prop_type:                             "prop_type",
    prop_placeholder:                      "prop_placeholder",
    prop_icon:                             "prop_icon",
    prop_btnAddStatus:                     "prop_btnAddStatus",
    prop_btnAddWidth:                      "prop_btnAddWidth",
    prop_btnAddIcon:                       "prop_btnAddIcon",
    prop_btnAddTitle:                      "prop_btnAddTitle",
    prop_btnAddClass:                      "prop_btnAddClass",
    prop_btnColor:                         "prop_btnColor",
    prop_hasRules:                         "prop_hasRules",
    prop_isAbsoluteRule:                   "prop_isAbsoluteRule",
    prop_listRules:                        "prop_listRules",
    prop_msgRules:                         "prop_msgRules",
} as const;
```

### Enum انواع ورودی

```typescript
export enum ComponentInput_Types {
    STRING  = "string",
    NUMBER  = "number",
    EMAIL   = "email",
    PASSWORD = "password",
    TEL     = "tel",
    URL     = "url",
    SEARCH  = "search",
    DATE    = "date",
    TIME    = "time",
    DATETIME_LOCAL = "datetime-local",
}
```

### جدول Props اختصاصی

| Prop | نوع | مقدار پیش‌فرض | توضیح |
|------|------|---------------|-------|
| `prop_title` | `string \| null` | `null` | عنوان فیلد |
| `prop_backgroundColorForm` | `string` | `"var(--secondaryColor1)"` | رنگ پس‌زمینه فرم |
| `prop_formBorderRadius` | `SIZES` | `SIZES.M` | شعاع حاشیه فرم |
| `prop_colorIcon` | `string` | `""` | رنگ آیکن |
| `prop_size` | `string` | `SIZES.M` | اندازه کلی |
| `prop_inputClass` | `string[]` | `["form-control"]` | کلاس‌های CSS ورودی |
| `prop_inputStyles` | `Record<string, string>` | `{}` | استایل‌های inline ورودی |
| `prop_inputBorderColor` | `string` | `"var(--primaryColor1)"` | رنگ حاشیه ورودی |
| `prop_inputBorderColorFocus` | `string` | `"var(--secondaryColor1)"` | رنگ حاشیه در حالت focus |
| `prop_inputBorderWidth` | `SIZES` | `SIZES.M` | ضخامت حاشیه ورودی |
| `prop_inputBorderRadius` | `SIZES` | `SIZES.M` | شعاع حاشیه ورودی |
| `prop_type` | `ComponentInput_Types` | `STRING` | نوع ورودی HTML |
| `prop_placeholder` | `string \| null` | `null` | متن placeholder |
| `prop_icon` | `IconsType \| null` | `null` | آیکن فیلد |
| `prop_btnAddStatus` | `boolean` | `false` | فعال/غیرفعال بودن دکمه افزودن |
| `prop_btnAddWidth` | `number` | `120` | عرض دکمه افزودن |
| `prop_btnAddIcon` | `string` | `"&plus;"` | آیکن دکمه افزودن |
| `prop_btnAddTitle` | `string` | `"add item"` | عنوان دکمه افزودن |
| `prop_btnAddClass` | `string[]` | `[]` | کلاس‌های دکمه افزودن |
| `prop_btnColor` | `ComponentButton_Types` | `SUBMIT` | نوع رنگ دکمه |
| `prop_hasRules` | `boolean` | `false` | فعال بودن اعتبارسنجی |
| `prop_isAbsoluteRule` | `boolean` | `false` | اعتبارسنجی مطلق |
| `prop_listRules` | `any[]` | `[]` | لیست قوانین اعتبارسنجی |
| `prop_msgRules` | `Record<string, string> \| null` | `null` | پیام‌های خطای اعتبارسنجی |

## 5. Schema (Parts)

کامپوننت `ComponentInput` شامل بخش‌های (Parts) زیر است:

```typescript
schemas: {
    ...GOG_ComponentBasicConfigs_Component_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_value_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_FormInput_Label_parts,
    ///----------------------
    FORM:     { name: "part_form" },
    INPUT:    { name: "part_input" },
    ICON:     { name: "part_icon" },
    BUTTON:   { name: "part_button" },
    VALIDATE: { name: "part_validate" },
}
```

### بخش‌های Schema و Props مرتبط

| بخش (Part) | نام | Props مرتبط |
|------------|-----|-------------|
| **FORM** | `part_form` | `prop_size`, `prop_backgroundColorForm`, `prop_formBorderRadius` |
| **INPUT** | `part_input` | `prop_inputClass`, `prop_inputStyles`, `prop_type`, `prop_name`, `prop_value`, `prop_isDisable`, `prop_placeholder`, `prop_icon`, `prop_btnAddStatus`, `prop_btnAddWidth` |
| **ICON** | `part_icon` | `prop_icon`, `prop_size`, `prop_colorIcon` |
| **BUTTON** | `part_button` | `prop_isDisable`, `prop_btnAddStatus`, `prop_btnAddIcon`, `prop_btnAddTitle`, `prop_btnAddClass`, `prop_btnColor`, `prop_size`, `prop_btnAddWidth` |
| **VALIDATE** | `part_validate` | `prop_hasRules`, `prop_isAbsoluteRule`, `prop_listRules`, `prop_msgRules`, `prop_isDisable`, `prop_title` |

## 6. Methods

کامپوننت `ComponentInput` چهار متد رویدادی دارد:

```typescript
methods: {
    INPUT_CHANGE: {
        name: "fn_onInputChange",
        dataArgs: { VALUE: { name: "value" } },
        componentArgs: {}
    },
    INPUT_FOCUS: {
        name: "fn_onInputFocus",
        dataArgs: { VALUE: { name: "value" } },
        componentArgs: {}
    },
    INPUT_BLUR: {
        name: "fn_onInputBlur",
        dataArgs: { VALUE: { name: "value" } },
        componentArgs: {}
    },
    CLICK_BUTTON: {
        name: "fn_onClickButton",
        dataArgs: { VALUE: { name: "value" } },
        componentArgs: {}
    },
}
```

| متد | نام تابع | dataArgs | توضیح |
|-----|----------|----------|-------|
| `INPUT_CHANGE` | `fn_onInputChange` | `{ VALUE }` | هنگام تغییر مقدار ورودی |
| `INPUT_FOCUS` | `fn_onInputFocus` | `{ VALUE }` | هنگام focus روی ورودی |
| `INPUT_BLUR` | `fn_onInputBlur` | `{ VALUE }` | هنگام blur از ورودی |
| `CLICK_BUTTON` | `fn_onClickButton` | `{ VALUE }` | هنگام کلیک روی دکمه افزودن |

### نوع‌های Type مرتبط با متدها

```typescript
export type ComponentInput_Methods_INPUT_CHANGE_ComponentArgs = GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_CHANGE.componentArgs>
export type ComponentInput_Methods_INPUT_CHANGE_DataArgs = GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_CHANGE.dataArgs>
export type ComponentInput_Methods_INPUT_FOCUS_ComponentArgs = GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_FOCUS.componentArgs>
export type ComponentInput_Methods_INPUT_FOCUS_DataArgs = GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_FOCUS.dataArgs>
export type ComponentInput_Methods_INPUT_BLUR_ComponentArgs = GOG_ExtractName<typeof ComponentInputConfigs.methods.INPUT_BLUR.componentArgs>
export type ComponentInput_Methods_INPUT_BLUR_DataArgs = GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.INPUT_BLUR.dataArgs>
export type ComponentInput_Methods_CLICK_BUTTON_ComponentArgs = GOG_ExtractName<typeof ComponentInputConfigs.methods.CLICK_BUTTON.componentArgs>
export type ComponentInput_Methods_CLICK_BUTTON_DataArgs = GOG_ExtractNameValue<typeof ComponentInputConfigs.methods.CLICK_BUTTON.dataArgs>

export type ComponentInputMethodsType = {
    [ComponentInputConfigs.methods.INPUT_CHANGE.name]: ComponentCallBackType<ComponentInput_Methods_INPUT_CHANGE_ComponentArgs, ComponentInput_Methods_INPUT_CHANGE_DataArgs>,
    [ComponentInputConfigs.methods.INPUT_FOCUS.name]:  ComponentCallBackType<ComponentInput_Methods_INPUT_FOCUS_ComponentArgs, ComponentInput_Methods_INPUT_FOCUS_DataArgs>,
    [ComponentInputConfigs.methods.INPUT_BLUR.name]:   ComponentCallBackType<ComponentInput_Methods_INPUT_BLUR_ComponentArgs, ComponentInput_Methods_INPUT_BLUR_DataArgs>,
    [ComponentInputConfigs.methods.CLICK_BUTTON.name]: ComponentCallBackType<ComponentInput_Methods_CLICK_BUTTON_ComponentArgs, ComponentInput_Methods_CLICK_BUTTON_DataArgs>,
}
```

## 7. Templates

```typescript
templates: {
    BODY: {
        name: "body"
    },
}
```

قالب `BODY` به `prop_placeholder` ارجاع می‌دهد.

## 8. Usage Examples

### مثال ۱: فیلد ورودی ساده

```typescript
import { ComponentInput, ComponentInputPropsType, ComponentInputMethodsType } from "./inputs/ComponentInput";

const input = new ComponentInput(
    <ComponentInputPropsType>{
        prop_title: "نام کاربری",
        prop_type: "string",
        prop_placeholder: "نام کاربری خود را وارد کنید",
        prop_size: SIZES.M,
    },
    <ComponentInputMethodsType>{
        fn_onInputChange: (event, dataArgs, componentArgs) => {
            console.log("مقدار تغییر کرد:", dataArgs.value);
        },
        fn_onInputFocus: (event, dataArgs, componentArgs) => {
            console.log("focus شد");
        },
        fn_onInputBlur: (event, dataArgs, componentArgs) => {
            console.log("blur شد");
        },
        fn_onClickButton: (event, dataArgs, componentArgs) => {
            console.log("دکمه کلیک شد");
        },
    }
).getElement();
```

### مثال ۲: فیلد ایمیل با اعتبارسنجی

این مثال از کد `renderExampleComponent` واقعی کامپوننت استخراج شده است:

```typescript
static override renderExampleComponent(): HTMLElement {
    return new ComponentInput(
        <ComponentInputPropsType>{
            classList: ["col-md-6", "col-12", "border", "p-2"],
            prop_title: "Email",
            prop_type: "email",
            prop_placeholder: "Enter your email",
            prop_icon: "icon-mail",
            prop_hasRules: true,
            prop_listRules: [
                {
                    rule: "_text_length",
                    description: "Minimum 3 characters",
                    params: { min: 3 }
                },
                {
                    rule: "_text_length",
                    description: "Maximum 20 characters",
                    params: { max: 20 }
                },
                {
                    rule: "_is_email",
                    description: "Must be a valid email address"
                },
                {
                    rule: "_text_char_upper",
                    description: "Must contain at least one uppercase letter"
                },
            ],
        },
        <ComponentInputMethodsType>{
            fn_onInputChange: (event, dataArgs, componentArgs) => {
                console.log("ComponentInput [fn_onInputChange]", dataArgs, componentArgs);
            },
            fn_onInputFocus: (event, dataArgs, componentArgs) => {
                console.log("ComponentInput [fn_onInputFocus]", dataArgs, componentArgs);
            },
            fn_onInputBlur: (event, dataArgs, componentArgs) => {
                console.log("ComponentInput [fn_onInputBlur]", dataArgs, componentArgs);
            },
            fn_onClickButton: (event, dataArgs, componentArgs) => {
                console.log("ComponentInput [fn_onClickButton]", dataArgs, componentArgs);
            },
        }
    ).getElement();
}
```

### مثال ۳: فیلد با دکمه افزودن

```typescript
const inputWithButton = new ComponentInput(
    <ComponentInputPropsType>{
        prop_title: "تگ‌ها",
        prop_type: "string",
        prop_placeholder: "تگ جدید را وارد کنید",
        prop_btnAddStatus: true,
        prop_btnAddTitle: "افزودن",
        prop_btnAddIcon: "&plus;",
        prop_btnAddWidth: 100,
    },
    <ComponentInputMethodsType>{
        fn_onInputChange: (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onInputFocus: (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onInputBlur: (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onClickButton: (event, dataArgs, componentArgs) => {
            console.log("افزودن تگ جدید:", dataArgs.value);
        },
    }
).getElement();
```

## 9. Anti-Patterns

- **استفاده مستقیم از `ComponentInputBase`:** این کلاس انتزاعی (abstract) است. همیشه از `ComponentInput` استفاده کنید.
- **فراموش کردن متدهای رویدادی:** همیشه چهار متد `fn_onInputChange`، `fn_onInputFocus`، `fn_onInputBlur` و `fn_onClickButton` را ارسال کنید، حتی اگر خالی باشند.
- **استفاده از رشته خام به‌جای Enum:** به‌جای `"email"` از `ComponentInput_Types.EMAIL` استفاده کنید.
- **تنظیم `prop_hasRules` بدون `prop_listRules`:** اگر اعتبارسنجی فعال است، حتماً قوانین را نیز تعریف کنید.
- **دستکاری مستقیم DOM ورودی:** برای تغییر مقدار از Props و سیستم reactive استفاده کنید.
- **نادیده گرفتن وابستگی‌ها:** این کامپوننت به `ComponentIcon`، `ComponentButton`، `ComponentValidate` و دیگر کامپوننت‌ها وابسته است — مطمئن شوید همه واردات (imports) موجود هستند.

## 10. AI Instructions

هنگام تولید یا ویرایش کد مربوط به `ComponentInput`:

1. **همیشه** از کلاس `ComponentInput` (نه `ComponentInputBase`) برای ساخت نمونه استفاده کنید.
2. **الگوی Constructor** را رعایت کنید: `super("input", null)` سپس `super.renderComponent(config, methods, events)`.
3. **Props** را با نوع `ComponentInputPropsType` تایپ کنید.
4. **Methods** را با نوع `ComponentInputMethodsType` تایپ کنید و **همه چهار متد** را ارائه دهید.
5. برای نوع ورودی از `ComponentInput_Types` enum استفاده کنید.
6. برای فعال‌سازی اعتبارسنجی، `prop_hasRules` را `true` کنید و `prop_listRules` را با قوانین مناسب پر کنید.
7. این کامپوننت **ترکیبی** است — تغییر در زیرکامپوننت‌ها (مثل `ComponentButton` یا `ComponentIcon`) می‌تواند روی رفتار آن تأثیر بگذارد.
8. بخش `renderManagerComponent` شامل پنج case است: `FORM`، `ICON`، `INPUT`، `BUTTON`، `VALIDATE` — هنگام افزودن بخش جدید، switch را به‌روز کنید.
9. برای قوانین کلی نام‌گذاری و ساختار به [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

## 11. Related Guides

- [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md)
- [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md)
- [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md)
- [AI Guide: ComponentButton](../button/GUIDE.md) — به‌عنوان زیرکامپوننت دکمه استفاده می‌شود
- [AI Guide: ComponentSelectOption](../select/GUIDE.md) — کامپوننت انتخاب با ساختار مشابه

## 12. Source References

| فایل | مسیر | توضیح |
|------|------|-------|
| ComponentInput.ts | `last/tools/components/inputs/ComponentInput.ts` | فایل اصلی کامپوننت (Props، Configs، کلاس‌ها) |
| ComponentIcon.ts | `last/tools/components/ComponentIcon.ts` | زیرکامپوننت آیکن |
| ComponentButton.ts | `last/tools/components/ComponentButton.ts` | زیرکامپوننت دکمه |
| ComponentValidate.ts | `last/tools/components/ComponentValidate.ts` | زیرکامپوننت اعتبارسنجی |
| ComponentBorder.ts | `last/tools/components/ComponentBorder.ts` | زیرکامپوننت حاشیه |
| ComponentInputPhone.ts | `last/tools/components/ComponentInputPhone.ts` | زیرکامپوننت ورودی تلفن |
| ComponentInputSize.ts | `last/tools/components/ComponentInputSize.ts` | زیرکامپوننت اندازه ورودی |
| ComponentButtonSimple.ts | `last/tools/components/simples/ComponentButtonSimple.ts` | زیرکامپوننت دکمه ساده |
| SetupComponent.ts | `last/core/component/SetupComponent.ts` | تعریف Props و Configs پایه (FormInput، Value، Label) |
| ComponentBase.ts | `last/core/ComponentBase.ts` | کلاس پایه فریمورک |
