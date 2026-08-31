# AI Guide: ComponentButton
> **Audience:** توسعه‌دهندگان AI و مهندسان فرانت‌اند که با فریمورک کامپوننت TypeScript کار می‌کنند
> **Purpose:** راهنمای پیاده‌سازی و استفاده از کامپوننت دکمه (Button) با پشتیبانی از variants و types
> **Level:** متوسط
> **Status:** Official
---

## 1. Definition

`ComponentButton` یک کامپوننت دکمه است که امکان ساخت دکمه‌های با ظاهر و رفتار متفاوت را فراهم می‌کند. این کامپوننت از طریق **Variants** (PRIMARY، SECONDARY، GHOST، ICON) و **Types** (CUSTOM، SUBMIT، CANCEL، BACK) کنترل می‌شود و شامل بخش‌های مستقل برای عنوان (Title) و آیکن (Icon) است.

این کامپوننت از کلاس پایه `ComponentBase` ارث‌بری می‌کند و از Props و Configs مشترک فریمورک استفاده می‌نماید. برای آشنایی با ساختار کلی کامپوننت‌ها به [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) مراجعه کنید.

> **نکته:** یک نسخه ساده‌تر این کامپوننت با نام `ComponentButtonSimple` در پوشه `simples/` وجود دارد که برای موارد سبک‌تر مناسب است.

## 2. Responsibilities

- رندر کردن یک عنصر دکمه با ساختار HTML قابل مدیریت
- پشتیبانی از چهار نوع ظاهری (Variant): `PRIMARY`، `SECONDARY`، `GHOST`، `ICON`
- پشتیبانی از چهار نوع عملکردی (Type): `CUSTOM`، `SUBMIT`، `CANCEL`، `BACK`
- مدیریت استایل‌های مستقل برای بدنه، عنوان و آیکن دکمه
- مدیریت رویداد کلیک از طریق متد `fn_onClickButton`
- پشتیبانی از استایل‌های hover برای رنگ پس‌زمینه و رنگ عنوان

## 3. Structure

ساختار کلاسی این کامپوننت از الگوی **Base → Concrete** پیروی می‌کند:

```
ComponentBase (کلاس پایه فریمورک)
  └── ComponentButtonBase (کلاس انتزاعی - تعریف Pattern، Schema، Template، Methods)
        └── ComponentButton (کلاس concreete - پیاده‌سازی رندر و قالب)
```

### الگوی Constructor

کلاس concreete `ComponentButton` از الگوی استاندارد فریمورک استفاده می‌کند:

```typescript
export class ComponentButton extends ComponentButtonBase {

    constructor(
        config: ComponentButtonPropsType,
        methods: ComponentButtonMethodsType,
        events = null
    ) {
        super("button", null);
        super.renderComponent(config, methods, events);
    }

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentButtonConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentButtonConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentButtonConfigs.schemas.FORM_BUTTON.name:
                return this.template_render_formButton(attrsDefault, data, extra);
            case ComponentButtonConfigs.schemas.FORM_BUTTON_TITLE.name:
                return this.template_render_formBtnTitle(attrsDefault, data, extra);
            case ComponentButtonConfigs.schemas.FORM_BUTTON_ICON.name:
                return this.template_render_formBtnIcon(attrsDefault, data, extra);
        }
    }
}
```

> **قوانین کلی ساختار کامپوننت** در [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md) توضیح داده شده است.

## 4. Props

کامپوننت `ComponentButton` از Props پایه `GOG_ComponentBasicProps_Component` و `GOG_ComponentBasicProps_Component_Structure` ارث‌بری می‌کند و Props اختصاصی زیر را اضافه می‌نماید:

```typescript
export const ComponentButtonProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,

    prop_type:                            "prop_type",
    prop_btnType:                         "prop_btnType",
    prop_btnClass:                        "prop_btnClass",
    prop_btnStyles:                       "prop_btnStyles",
    prop_btnWidth:                        "prop_btnWidth",
    prop_btnHeight:                       "prop_btnHeight",
    prop_btnBorderColor:                  "prop_btnBorderColor",
    prop_btnBorderWidth:                  "prop_btnBorderWidth",
    prop_btnBackgroundColor:              "prop_btnBackgroundColor",
    prop_btnBackgroundColor_hover:        "prop_btnBackgroundColor_hover",

    prop_btnTitle:                        "prop_btnTitle",
    prop_btnTitleStyles:                  "prop_btnTitleStyles",
    prop_btnTitleClass:                   "prop_btnTitleClass",
    prop_btnTitleColor:                   "prop_btnTitleColor",
    prop_btnTitleColor_hover:             "prop_btnTitleColor_hover",

    prop_btnIcon:                         "prop_btnIcon",
    prop_btnIconStyles:                   "prop_btnIconStyles",
    prop_btnIconClass:                    "prop_btnIconClass",
    prop_btnBorderRadius:                 "prop_btnBorderRadius",
    prop_btnBorderRadiusStartTop:         "prop_btnBorderRadiusStartTop",
    prop_btnBorderRadiusStartBottom:      "prop_btnBorderRadiusStartBottom",
    prop_btnBorderRadiusEndTop:           "prop_btnBorderRadiusEndTop",
    prop_btnBorderRadiusEndBottom:        "prop_btnBorderRadiusEndBottom",
    prop_variant:                         "prop_variant",
} as const;
```

### جدول Props اختصاصی

| Prop | نوع | مقدار پیش‌فرض | توضیح |
|------|------|---------------|-------|
| `prop_type` | `ComponentButton_Types` | `SUBMIT` | نوع عملکردی دکمه |
| `prop_btnType` | `ComponentButton_ButtonTypes` | `BUTTON` | نوع HTML دکمه (submit/button) |
| `prop_btnClass` | `string[]` | `["w-100"]` | کلاس‌های CSS دکمه |
| `prop_btnStyles` | `Record<string, string>` | `{}` | استایل‌های inline دکمه |
| `prop_btnWidth` | `SizeUnit \| SizeCalc \| null` | `null` | عرض دکمه |
| `prop_btnHeight` | `SizeUnit \| SizeCalc \| null` | `null` | ارتفاع دکمه |
| `prop_btnBorderColor` | `Color \| null` | `null` | رنگ حاشیه |
| `prop_btnBorderWidth` | `SIZES \| null` | `null` | ضخامت حاشیه |
| `prop_btnBackgroundColor` | `Color \| null` | `null` | رنگ پس‌زمینه |
| `prop_btnBackgroundColor_hover` | `Color \| null` | `null` | رنگ پس‌زمینه در حالت hover |
| `prop_btnTitle` | `string` | `""` | متن عنوان دکمه |
| `prop_btnTitleStyles` | `Record<string, string>` | `{}` | استایل‌های عنوان |
| `prop_btnTitleClass` | `string[]` | `[]` | کلاس‌های عنوان |
| `prop_btnTitleColor` | `Color \| null` | `null` | رنگ عنوان |
| `prop_btnTitleColor_hover` | `Color \| null` | `null` | رنگ عنوان در حالت hover |
| `prop_btnIcon` | `IconsType \| null` | `null` | آیکن دکمه |
| `prop_btnIconStyles` | `Record<string, string>` | `{}` | استایل‌های آیکن |
| `prop_btnIconClass` | `string[]` | `["w-100"]` | کلاس‌های آیکن |
| `prop_btnBorderRadius` | `SizesType \| null` | `SIZES.M` | شعاع حاشیه |
| `prop_btnBorderRadiusStartTop` | `SizesType \| null` | `null` | شعاع گوشه بالا-ابتدا |
| `prop_btnBorderRadiusStartBottom` | `SizesType \| null` | `null` | شعاع گوشه پایین-ابتدا |
| `prop_btnBorderRadiusEndTop` | `SizesType \| null` | `null` | شعاع گوشه بالا-انتها |
| `prop_btnBorderRadiusEndBottom` | `SizesType \| null` | `null` | شعاع گوشه پایین-انتها |
| `prop_variant` | `ComponentButton_Variants` | `SECONDARY` | نوع ظاهری دکمه |

## 5. Schema (Parts)

کامپوننت `ComponentButton` شامل بخش‌های (Parts) زیر در Configs است:

```typescript
schemas: {
    ...GOG_ComponentBasicConfigs_Component_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_parts,
    FORM: {
        name: "part-form"
    },
    FORM_BUTTON: {
        name: "part-form-button"
    },
    FORM_BUTTON_TITLE: {
        name: "part-form-button_title"
    },
    FORM_BUTTON_ICON: {
        name: "part-form-button_icon"
    },
}
```

### بخش‌های Schema و Props مرتبط

| بخش (Part) | نام | Props مرتبط |
|------------|-----|-------------|
| **FORM** | `part-form` | کانتینر اصلی (بدون prop مستقیم) |
| **FORM_BUTTON** | `part-form-button` | `prop_type`, `prop_btnType`, `prop_btnClass`, `prop_btnStyles`, `prop_btnWidth`, `prop_btnHeight`, `prop_btnBackgroundColor`, `prop_btnBackgroundColor_hover`, `prop_btnBorderRadius`, `prop_btnBorderColor`, `prop_btnBorderWidth`, `prop_btnIcon` |
| **FORM_BUTTON_TITLE** | `part-form-button_title` | `prop_type`, `prop_btnTitle`, `prop_btnTitleStyles`, `prop_btnTitleClass`, `prop_btnTitleColor`, `prop_btnTitleColor_hover` |
| **FORM_BUTTON_ICON** | `part-form-button_icon` | `prop_btnIcon`, `prop_btnIconStyles`, `prop_btnIconClass` |

## 6. Methods

کامپوننت `ComponentButton` یک متد رویدادی دارد:

```typescript
methods: {
    CLICK: {
        name: "fn_onClickButton",
        dataArgs: {},
        componentArgs: {}
    },
}
```

| متد | نام تابع | dataArgs | توضیح |
|-----|----------|----------|-------|
| `CLICK` | `fn_onClickButton` | `{}` | هنگام کلیک روی دکمه فراخوانی می‌شود |

### نوع‌های Type مرتبط با متدها

```typescript
export type ComponentButton_Methods_CLICK_ComponentArgs = GOG_ExtractName<typeof ComponentButtonConfigs.methods.CLICK.componentArgs>
export type ComponentButton_Methods_CLICK_DataArgs = GOG_ExtractNameValue<typeof ComponentButtonConfigs.methods.CLICK.dataArgs>

export type ComponentButtonMethodsType = {
    [ComponentButtonConfigs.methods.CLICK.name]: ComponentCallBackType<ComponentButton_Methods_CLICK_ComponentArgs, ComponentButton_Methods_CLICK_DataArgs>
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

کامپوننت دارای یک قالب `BODY` است که به `prop_btnTitle` ارجاع می‌دهد.

## 8. Usage Examples

### مثال ۱: دکمه ساده با عنوان

```typescript
import { ComponentButton, ComponentButtonPropsType, ComponentButtonMethodsType } from "./ComponentButton";

const button = new ComponentButton(
    <ComponentButtonPropsType>{
        classList: ["col-md-3", "col-12", "border", "p-2"],
        prop_btnTitle: "ذخیره",
        prop_type: "submit",
        prop_variant: "primary",
    },
    <ComponentButtonMethodsType>{
        fn_onClickButton: function (event, dataArgs, componentArgs) {
            console.log("دکمه کلیک شد");
        }
    }
).getElement();
```

### مثال ۲: دکمه با استایل سفارشی و شعاع حاشیه

این مثال از کد `renderExampleComponent` واقعی کامپوننت استخراج شده است:

```typescript
static override renderExampleComponent(): HTMLElement {
    return new ComponentButton(
        <ComponentButtonPropsType>{
            classList: ["col-md-3", "col-12", "border", "p-2"],
            prop_btnTitle: "asd",
            prop_type: "submit",
            prop_btnBorderRadius: SIZES.DEFAULT,
            prop_btnBorderRadiusStartTop: SIZES.M,
            prop_btnBorderRadiusEndTop: SIZES.XXL,
            prop_btnBorderRadiusStartBottom: SIZES.XXL,
            prop_btnBorderRadiusEndBottom: SIZES.M,
            prop_btnIcon: "icon-name",
        },
        <ComponentButtonMethodsType>{
            fn_onClickButton: function (event, dataArgs, componentArgs) {
                alert("asd");
            }
        }
    ).getElement();
}
```

### مثال ۳: استفاده از Variant های مختلف

```typescript
// دکمه اصلی (Primary)
const primaryBtn = new ComponentButton(
    <ComponentButtonPropsType>{
        prop_btnTitle: "تایید",
        prop_variant: "primary",
        prop_type: "submit",
    },
    <ComponentButtonMethodsType>{
        fn_onClickButton: (event, dataArgs, componentArgs) => { /* ... */ }
    }
).getElement();

// دکمه شفاف (Ghost)
const ghostBtn = new ComponentButton(
    <ComponentButtonPropsType>{
        prop_btnTitle: "انصراف",
        prop_variant: "ghost",
        prop_type: "cancel",
    },
    <ComponentButtonMethodsType>{
        fn_onClickButton: (event, dataArgs, componentArgs) => { /* ... */ }
    }
).getElement();

// دکمه فقط آیکن (Icon)
const iconBtn = new ComponentButton(
    <ComponentButtonPropsType>{
        prop_btnIcon: "icon-edit",
        prop_variant: "icon",
        prop_type: "custom",
    },
    <ComponentButtonMethodsType>{
        fn_onClickButton: (event, dataArgs, componentArgs) => { /* ... */ }
    }
).getElement();
```

## 9. Anti-Patterns

- **استفاده مستقیم از `ComponentButtonBase`:** این کلاس انتزاعی (abstract) است و نباید مستقیماً instantiate شود. همیشه از `ComponentButton` استفاده کنید.
- **تنظیم نکردن `prop_variant`:** اگر `prop_variant` تنظیم نشود، مقدار پیش‌فرض `SECONDARY` استفاده می‌شود که ممکن است با طراحی شما هم‌خوانی نداشته باشد.
- **فراموش کردن متد `fn_onClickButton`:** اگر متد کلیک در `methods` ارسال نشود، دکمه بدون رفتار خواهد بود.
- **استفاده همزمان از `prop_btnBorderRadius` و `prop_btnBorderRadiusStartTop/...`:** اگر همزمان شعاع کلی و شعاع گوشه‌های فردی تنظیم شوند، ممکن است تداخل ایجاد شود.
- **دستکاری مستقیم DOM:** برای تغییر استایل‌ها از Props استفاده کنید، نه از دستکاری مستقیم DOM.

## 10. AI Instructions

هنگام تولید یا ویرایش کد مربوط به `ComponentButton`:

1. **همیشه** از کلاس `ComponentButton` (نه `ComponentButtonBase`) برای ساخت نمونه استفاده کنید.
2. **الگوی Constructor** را رعایت کنید: `super("button", null)` سپس `super.renderComponent(config, methods, events)`.
3. **Props** را با نوع `ComponentButtonPropsType` تایپ کنید.
4. **Methods** را با نوع `ComponentButtonMethodsType` تایپ کنید.
5. برای تغییر ظاهر دکمه از `prop_variant` استفاده کنید، نه از استایل‌های hardcoded.
6. برای دکمه‌های ساده‌تر، استفاده از `ComponentButtonSimple` را در نظر بگیرید.
7. **Enums** را به‌جای رشته‌های خام استفاده کنید: `ComponentButton_Types.SUBMIT` به‌جای `"submit"`.
8. عنوان و آیکن دکمه از طریق Props مستقل (`prop_btnTitle*` و `prop_btnIcon*`) کنترل می‌شوند — آن‌ها را جداگانه مدیریت کنید.
9. برای قوانین کلی نام‌گذاری و ساختار به [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

## 11. Related Guides

- [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md)
- [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md)
- [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md)
- [AI Guide: ComponentInput](../input/GUIDE.md) — از `ComponentButton` به‌عنوان زیرکامپوننت استفاده می‌کند
- [AI Guide: ComponentSelectOption](../select/GUIDE.md) — از `ComponentButton` برای دکمه افزودن استفاده می‌کند

## 12. Source References

| فایل | مسیر | توضیح |
|------|------|-------|
| ComponentButton.ts | `last/tools/components/ComponentButton.ts` | فایل اصلی کامپوننت (Props، Configs، کلاس‌ها) |
| ComponentButtonSimple.ts | `last/tools/components/simples/ComponentButtonSimple.ts` | نسخه ساده‌تر دکمه |
| SetupComponent.ts | `last/core/component/SetupComponent.ts` | تعریف Props و Configs پایه |
| ComponentBase.ts | `last/core/ComponentBase.ts` | کلاس پایه فریمورک |
