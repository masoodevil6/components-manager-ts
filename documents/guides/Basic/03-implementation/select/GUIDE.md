# AI Guide: ComponentSelectOption
> **Audience:** توسعه‌دهندگان AI و مهندسان فرانت‌اند که با فریمورک کامپوننت TypeScript کار می‌کنند
> **Purpose:** راهنمای پیاده‌سازی و استفاده از کامپوننت انتخاب گزینه (Select Option) با dropdown، جستجو و دکمه افزودن
> **Level:** پیشرفته
> **Status:** Official
---

## 1. Definition

`ComponentSelectOption` یک کامپوننت انتخاب گزینه (Select) است که به‌جای استفاده از `<select>` بومی HTML، یک dropdown سفارشی با قابلیت جستجو، آیکن، دکمه افزودن و مدیریت آیتم انتخاب‌شده ارائه می‌دهد. این کامپوننت شامل بخش‌های مستقل برای **فرم**، **مقدار**، **هدر** (شامل عنوان، آیکن، آیکن فلش و دکمه) و **بدنه** (شامل جستجو و لیست گزینه‌ها) است.

این کامپوننت از `ComponentIcon` و `ComponentButton` به‌عنوان زیرکامپوننت استفاده می‌کند و از Props پایه `GOG_ComponentBasicProps_Component` و `GOG_ComponentBasicProps_Component_Structure` ارث‌بری می‌نماید.

برای آشنایی با ساختار کلی کامپوننت‌ها به [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) مراجعه کنید.

## 2. Responsibilities

- رندر کردن یک کامپوننت انتخاب سفارشی با dropdown
- مدیریت آیتم انتخاب‌شده از طریق `prop_itemSelected` (با پشتیبانی از `Observable`)
- نمایش لیست گزینه‌ها با قابلیت جستجوی متن
- پشتیبانی از دکمه افزودن اختیاری در هدر
- پشتیبانی از لیست آیکن‌های قابل کلیک برای هر گزینه (`prop_listIcons`)
- مدیریت موقعیت dropdown از طریق `prop_positionTop/Left/Bottom/Right`
- مدیریت استایل‌های مستقل برای گزینه‌های انتخاب‌شده، hover و انتخاب‌نشده
- مدیریت رویدادهای `SELECT_CHANGE`، `BTN_ADD_CLICK` و `ICON_CLICK`

## 3. Structure

ساختار کلاسی این کامپوننت از الگوی **Base → Concrete** پیروی می‌کند:

```
ComponentBase (کلاس پایه فریمورک)
  └── ComponentSelectOptionBase (کلاس انتزاعی - تعریف Pattern، Schema، Methods)
        └── ComponentSelectOption (کلاس concreete - پیاده‌سازی رندر و قالب)
```

### کامپوننت‌های وارد شده (Imports)

```typescript
import { ComponentIconMethodsType, ComponentIconPropsType } from "./ComponentIcon";
import { ComponentButtonMethodsType, ComponentButtonPropsType, ComponentButton_Types, ComponentButton_ButtonTypes } from "./ComponentButton";
```

### الگوی Constructor

```typescript
export class ComponentSelectOption extends ComponentSelectOptionBase {

    private _DROPDOWN_OPEN = new Observable<boolean>(false);
    private _SEARCH_TEXT = new Observable<string>("");

    constructor(
        config: ComponentSelectOptionPropsType,
        methods: ComponentSelectOptionMethodsType,
        events = null
    ) {
        super("select-option", null);
        super.renderComponent(config, methods, events);
        this.fn_firstCallback();
    }

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentSelectOptionConfigs.schemas.FORM.name)
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentSelectOptionConfigs.schemas.FORM.name:
                return this.template_render_form(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.VALUE.name:
                return this.template_render_value(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER.name:
                return this.template_render_header(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_TITLE.name:
                return this.template_render_header_title(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_ICON.name:
                return this.template_render_header_icon(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_ARROW_ICON.name:
                return this.template_render_header_arrow_icon(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.HEADER_BUTTON.name:
                return this.template_render_header_button(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY.name:
                return this.template_render_body(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY_SEARCHER.name:
                return this.template_render_body_searcher(attrsDefault, data, extra);
            case ComponentSelectOptionConfigs.schemas.BODY_OPTIONS.name:
                return this.template_render_body_options(attrsDefault, data, extra);
        }
        return ReactiveElement.part("section", { attrs: { ...attrsDefault } });
    }
}
```

> **نکته:** این کامپوننت دارای دو `Observable` داخلی است: `_DROPDOWN_OPEN` برای مدیریت وضعیت باز/بسته dropdown و `_SEARCH_TEXT` برای متن جستجو. همچنین در constructor متد `fn_firstCallback()` فراخوانی می‌شود.

> **قوانین کلی ساختار کامپوننت** در [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md) توضیح داده شده است.

## 4. Props

کامپوننت `ComponentSelectOption` از Props پایه `GOG_ComponentBasicProps_Component` و `GOG_ComponentBasicProps_Component_Structure` ارث‌بری می‌کند و Props اختصاصی زیر را اضافه می‌نماید:

```typescript
export const ComponentSelectOptionProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    ///----------------------
    prop_name:                             "prop_name",
    prop_itemSelected:                     "prop_itemSelected",
    prop_title:                            "prop_title",
    prop_options:                          "prop_options",
    prop_placeholder:                      "prop_placeholder",

    prop_icon:                             "prop_icon",
    prop_colorIcon:                        "prop_colorIcon",
    prop_size:                             "prop_size",

    prop_listIcons:                        "prop_listIcons",

    prop_btnAddStatus:                     "prop_btnAddStatus",
    prop_btnAddIcon:                       "prop_btnAddIcon",
    prop_btnAddTitle:                      "prop_btnAddTitle",
    prop_btnAddClass:                      "prop_btnAddClass",

    prop_backgroundColorForm:              "prop_backgroundColorForm",
    prop_titleClass:                       "prop_titleClass",
    prop_titleStyles:                      "prop_titleStyles",

    prop_optionHeight:                     "prop_optionHeight",
    prop_optionWidth:                      "prop_optionWidth",
    prop_optionStyles:                     "prop_optionStyles",

    prop_positionTop:                      "prop_positionTop",
    prop_positionLeft:                     "prop_positionLeft",
    prop_positionBottom:                   "prop_positionBottom",
    prop_positionRight:                    "prop_positionRight",

    prop_optionItemNotSelectedBackground:  "prop_optionItemNotSelectedBackground",
    prop_optionItemHoverBackground:        "prop_optionItemHoverBackground",
    prop_optionItemSelectedBackground:     "prop_optionItemSelectedBackground",
    prop_optionItemSelectedColor:          "prop_optionItemSelectedColor",

    prop_firstCallback:                    "prop_firstCallback",
} as const;
```

### جدول Props اختصاصی

| Prop | نوع | مقدار پیش‌فرض | توضیح |
|------|------|---------------|-------|
| `prop_name` | `string \| null` | `null` | نام فیلد |
| `prop_itemSelected` | `Observable<string \| null> \| string \| null` | `null` | آیتم انتخاب‌شده (پشتیبانی از Observable) |
| `prop_title` | `string \| null` | `null` | عنوان کامپوننت |
| `prop_options` | `any[]` | `[]` | لیست گزینه‌ها |
| `prop_placeholder` | `string \| null` | `null` | متن placeholder |
| `prop_icon` | `IconsType \| null` | `null` | آیکن هدر |
| `prop_colorIcon` | `string` | `""` | رنگ آیکن |
| `prop_size` | `string` | `SIZES.M` | اندازه کلی |
| `prop_listIcons` | `{icon, name, method}[] \| null` | `null` | لیست آیکن‌های قابل کلیک برای هر گزینه |
| `prop_btnAddStatus` | `boolean` | `false` | فعال/غیرفعال بودن دکمه افزودن |
| `prop_btnAddIcon` | `string` | `"+"` | آیکن دکمه افزودن |
| `prop_btnAddTitle` | `string` | `"add item"` | عنوان دکمه افزودن |
| `prop_btnAddClass` | `string[]` | `[]` | کلاس‌های دکمه افزودن |
| `prop_backgroundColorForm` | `string` | `"var(--secondaryColor1)"` | رنگ پس‌زمینه فرم |
| `prop_titleClass` | `string[]` | `["px-2"]` | کلاس‌های عنوان |
| `prop_titleStyles` | `Record<string, string>` | `{}` | استایل‌های عنوان |
| `prop_optionHeight` | `number` | `200` | ارتفاع لیست گزینه‌ها |
| `prop_optionWidth` | `string \| number` | `"100%"` | عرض لیست گزینه‌ها |
| `prop_optionStyles` | `Record<string, string>` | `{}` | استایل‌های گزینه‌ها |
| `prop_positionTop` | `string` | `""` | موقعیت بالا dropdown |
| `prop_positionLeft` | `string` | `""` | موقعیت چپ dropdown |
| `prop_positionBottom` | `string` | `""` | موقعیت پایین dropdown |
| `prop_positionRight` | `string` | `""` | موقعیت راست dropdown |
| `prop_optionItemNotSelectedBackground` | `string` | `""` | پس‌زمینه گزینه انتخاب‌نشده |
| `prop_optionItemHoverBackground` | `string` | `""` | پس‌زمینه گزینه در حالت hover |
| `prop_optionItemSelectedBackground` | `string` | `""` | پس‌زمینه گزینه انتخاب‌شده |
| `prop_optionItemSelectedColor` | `string` | `""` | رنگ متن گزینه انتخاب‌شده |
| `prop_firstCallback` | `boolean` | `false` | آیا callback اولیه اجرا شود |

## 5. Schema (Parts)

کامپوننت `ComponentSelectOption` شامل بخش‌های (Parts) زیر است:

```typescript
schemas: {
    ...GOG_ComponentBasicConfigs_Component_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_parts,
    FORM:              { name: "part_form" },
    VALUE:             { name: "part_value" },
    HEADER:            { name: "part_header" },
    HEADER_TITLE:      { name: "part_header_title" },
    HEADER_ICON:       { name: "part_header_icon" },
    HEADER_ARROW_ICON: { name: "part_header_arrow_icon" },
    HEADER_BUTTON:     { name: "part_header_button" },
    BODY:              { name: "part_body" },
    BODY_SEARCHER:     { name: "part_body_searcher" },
    BODY_OPTIONS:      { name: "part_body_options" },
}
```

### بخش‌های Schema و Props مرتبط

| بخش (Part) | نام | Props مرتبط |
|------------|-----|-------------|
| **FORM** | `part_form` | کانتینر اصلی (بدون prop مستقیم) |
| **VALUE** | `part_value` | `prop_name`, `prop_itemSelected` |
| **HEADER** | `part_header` | `prop_titleClass`, `prop_titleStyles`, `prop_backgroundColorForm`, `prop_size` |
| **HEADER_TITLE** | `part_header_title` | `prop_icon`, `prop_options`, `prop_itemSelected`, `prop_btnAddStatus`, `prop_placeholder`, `prop_size` |
| **HEADER_ICON** | `part_header_icon` | `prop_icon`, `prop_size`, `prop_colorIcon` |
| **HEADER_ARROW_ICON** | `part_header_arrow_icon` | `prop_btnAddStatus` |
| **HEADER_BUTTON** | `part_header_button` | `prop_btnAddStatus`, `prop_btnAddIcon`, `prop_btnAddTitle`, `prop_btnAddClass`, `prop_size` |
| **BODY** | `part_body` | `prop_optionHeight`, `prop_optionWidth`, `prop_optionStyles`, `prop_positionTop`, `prop_positionLeft`, `prop_positionBottom`, `prop_positionRight` |
| **BODY_SEARCHER** | `part_body_searcher` | `prop_colorIcon`, `prop_size` |
| **BODY_OPTIONS** | `part_body_options` | `prop_listIcons`, `prop_firstCallback`, `prop_itemSelected`, `prop_options`, `prop_optionItemNotSelectedBackground`, `prop_optionItemHoverBackground`, `prop_optionItemSelectedBackground`, `prop_optionItemSelectedColor` |

## 6. Methods

کامپوننت `ComponentSelectOption` سه متد رویدادی دارد:

```typescript
methods: {
    SELECT_CHANGE: {
        name: "fn_onSelectChange",
        dataArgs: {
            SELECTED_ID:   { name: "SELECTED_ID" },
            SELECTED_DATA: { name: "SELECTED_DATA" },
        },
        componentArgs: {}
    },
    BTN_ADD_CLICK: {
        name: "fn_onBtnAddClick",
        dataArgs: {
            ITEM_SELECTED: { name: "ITEM_SELECTED" },
        },
        componentArgs: {}
    },
    ICON_CLICK: {
        name: "fn_onIconClick",
        dataArgs: {
            ICON_NAME: { name: "ICON_NAME" },
            ITEM_ID:   { name: "ITEM_ID" },
        },
        componentArgs: {}
    },
}
```

| متد | نام تابع | dataArgs | توضیح |
|-----|----------|----------|-------|
| `SELECT_CHANGE` | `fn_onSelectChange` | `{ SELECTED_ID, SELECTED_DATA }` | هنگام انتخاب یک گزینه |
| `BTN_ADD_CLICK` | `fn_onBtnAddClick` | `{ ITEM_SELECTED }` | هنگام کلیک روی دکمه افزودن |
| `ICON_CLICK` | `fn_onIconClick` | `{ ICON_NAME, ITEM_ID }` | هنگام کلیک روی آیکن یک گزینه |

### نوع‌های Type مرتبط با متدها

```typescript
export type ComponentSelectOption_Methods_SELECT_CHANGE_ComponentArgs = GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.SELECT_CHANGE.componentArgs>
export type ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.SELECT_CHANGE.dataArgs>
export type ComponentSelectOption_Methods_BTN_ADD_CLICK_ComponentArgs = GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.componentArgs>
export type ComponentSelectOption_Methods_BTN_ADD_CLICK_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.dataArgs>
export type ComponentSelectOption_Methods_ICON_CLICK_ComponentArgs = GOG_ExtractName<typeof ComponentSelectOptionConfigs.methods.ICON_CLICK.componentArgs>
export type ComponentSelectOption_Methods_ICON_CLICK_DataArgs = GOG_ExtractNameValue<typeof ComponentSelectOptionConfigs.methods.ICON_CLICK.dataArgs>

export type ComponentSelectOptionMethodsType = {
    [ComponentSelectOptionConfigs.methods.SELECT_CHANGE.name]: ComponentCallBackType<ComponentSelectOption_Methods_SELECT_CHANGE_ComponentArgs, ComponentSelectOption_Methods_SELECT_CHANGE_DataArgs>,
    [ComponentSelectOptionConfigs.methods.BTN_ADD_CLICK.name]: ComponentCallBackType<ComponentSelectOption_Methods_BTN_ADD_CLICK_ComponentArgs, ComponentSelectOption_Methods_BTN_ADD_CLICK_DataArgs>,
    [ComponentSelectOptionConfigs.methods.ICON_CLICK.name]:   ComponentCallBackType<ComponentSelectOption_Methods_ICON_CLICK_ComponentArgs, ComponentSelectOption_Methods_ICON_CLICK_DataArgs>,
}
```

## 7. Templates

این کامپوننت در حال حاضر بخش `templates` خالی دارد:

```typescript
templates: {

}
```

## 8. Usage Examples

### مثال ۱: انتخاب ساده با لیست گزینه‌ها

این مثال از کد `renderExampleComponent` واقعی کامپوننت استخراج شده است:

```typescript
import { ComponentSelectOption, ComponentSelectOptionPropsType, ComponentSelectOptionMethodsType } from "./ComponentSelectOption";

const select = new ComponentSelectOption(
    <ComponentSelectOptionPropsType><unknown>{
        classList:         ["col-md-6", "col-12", "border", "p-2"],
        prop_title:        "Select Option Example",
        prop_name:         "select_option_example",
        prop_placeholder:  "Select an item...",
        prop_size:         SIZES.M,
        prop_itemSelected: "2",
        prop_options: [
            { id: "1", name: "Option One" },
            { id: "2", name: "Option Two" },
            { id: "3", name: "Option Three" },
            { id: "4", name: "Option Four" },
            { id: "5", name: "Option Five" },
        ],
        prop_btnAddStatus: true,
        prop_btnAddTitle:  "Add",
        prop_btnAddIcon:   "+",
        prop_firstCallback: false,
    },
    <ComponentSelectOptionMethodsType>{
        fn_onSelectChange: (event, dataArgs, componentArgs) => {
            console.log("selected", dataArgs.SELECTED_ID, dataArgs.SELECTED_DATA);
        },
        fn_onBtnAddClick: (event, dataArgs, componentArgs) => {
            console.log("btn add click", dataArgs.ITEM_SELECTED);
        },
        fn_onIconClick: (event, dataArgs, componentArgs) => {
            console.log("icon click", dataArgs.ICON_NAME, dataArgs.ITEM_ID);
        },
    }
).getElement() as HTMLElement;
```

### مثال ۲: انتخاب با آیکن‌های قابل کلیک برای هر گزینه

```typescript
const selectWithIcons = new ComponentSelectOption(
    <ComponentSelectOptionPropsType><unknown>{
        prop_title:        "مدیریت کاربران",
        prop_placeholder:  "یک کاربر را انتخاب کنید",
        prop_size:         SIZES.M,
        prop_options: [
            { id: "1", name: "کاربر یک" },
            { id: "2", name: "کاربر دو" },
            { id: "3", name: "کاربر سه" },
        ],
        prop_listIcons: [
            {
                icon: "icon-edit",
                name: "edit",
                method: (event, id) => { console.log("ویرایش:", id); }
            },
            {
                icon: "icon-delete",
                name: "delete",
                method: (event, id) => { console.log("حذف:", id); }
            },
        ],
        prop_optionItemSelectedBackground: "var(--primaryColor1)",
        prop_optionItemSelectedColor: "var(--white)",
        prop_optionItemHoverBackground: "var(--secondaryColor2)",
    },
    <ComponentSelectOptionMethodsType>{
        fn_onSelectChange: (event, dataArgs, componentArgs) => {
            console.log("انتخاب شد:", dataArgs.SELECTED_DATA);
        },
        fn_onBtnAddClick: (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onIconClick: (event, dataArgs, componentArgs) => {
            console.log("آیکن کلیک شد:", dataArgs.ICON_NAME, "آیتم:", dataArgs.ITEM_ID);
        },
    }
).getElement() as HTMLElement;
```

### مثال ۳: انتخاب با موقعیت dropdown سفارشی

```typescript
const selectPositioned = new ComponentSelectOption(
    <ComponentSelectOptionPropsType><unknown>{
        prop_title:        "انتخاب دسته‌بندی",
        prop_placeholder:  "انتخاب کنید...",
        prop_options: [
            { id: "cat1", name: "دسته ۱" },
            { id: "cat2", name: "دسته ۲" },
        ],
        prop_optionHeight: 300,
        prop_optionWidth:  "100%",
        prop_positionTop:  "40px",
        prop_positionLeft: "0px",
    },
    <ComponentSelectOptionMethodsType>{
        fn_onSelectChange: (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onBtnAddClick:  (event, dataArgs, componentArgs) => { /* ... */ },
        fn_onIconClick:    (event, dataArgs, componentArgs) => { /* ... */ },
    }
).getElement() as HTMLElement;
```

## 9. Anti-Patterns

- **استفاده مستقیم از `ComponentSelectOptionBase`:** این کلاس انتزاعی (abstract) است. همیشه از `ComponentSelectOption` استفاده کنید.
- **فراموش کردن متدهای رویدادی:** همیشه سه متد `fn_onSelectChange`، `fn_onBtnAddClick` و `fn_onIconClick` را ارسال کنید، حتی اگر خالی باشند.
- **عدم ارائه `prop_options` با ساختار صحیح:** هر گزینه باید حداقل دارای `id` و `name` باشد.
- **استفاده از `<select>` بومی به‌جای این کامپوننت:** این کامپوننت برای جایگزینی `<select>` بومی طراحی شده و قابلیت‌های بیشتری (جستجو، آیکن، استایل سفارشی) ارائه می‌دهد.
- **دستکاری مستقیم `_DROPDOWN_OPEN` یا `_SEARCH_TEXT`:** این متغیرهای خصوصی (private) هستند و نباید از خارج کلاس تغییر کنند.
- **نادیده گرفتن `prop_firstCallback`:** اگر `true` تنظیم شود، callback اولیه در constructor اجرا می‌شود — مطمئن شوید این رفتار مورد نظر شماست.
- **تنظیم نکردن استایل‌های گزینه‌ها:** برای تجربه کاربری بهتر، `prop_optionItemSelectedBackground` و `prop_optionItemHoverBackground` را تنظیم کنید.

## 10. AI Instructions

هنگام تولید یا ویرایش کد مربوط به `ComponentSelectOption`:

1. **همیشه** از کلاس `ComponentSelectOption` (نه `ComponentSelectOptionBase`) برای ساخت نمونه استفاده کنید.
2. **الگوی Constructor** را رعایت کنید: `super("select-option", null)` سپس `super.renderComponent(config, methods, events)` و سپس `this.fn_firstCallback()`.
3. **Props** را با نوع `ComponentSelectOptionPropsType` تایپ کنید.
4. **Methods** را با نوع `ComponentSelectOptionMethodsType` تایپ کنید و **همه سه متد** را ارائه دهید.
5. ساختار `prop_options` باید آرایه‌ای از اشیاء با حداقل `id` و `name` باشد.
6. `prop_itemSelected` از نوع `Observable<string | null> | string | null` است — برای binding دوطرفه از `Observable` استفاده کنید.
7. `prop_listIcons` آرایه‌ای از اشیاء `{icon, name, method}` است — هر آیکن یک callback مستقل دارد.
8. بخش `renderManagerComponent` شامل ده case است — هنگام افزودن بخش جدید، switch را به‌روز کنید.
9. این کامپوننت از `ComponentIcon` و `ComponentButton` به‌عنوان زیرکامپوننت استفاده می‌کند — تغییر در آن‌ها می‌تواند روی رفتار این کامپوننت تأثیر بگذارد.
10. برای قوانین کلی نام‌گذاری و ساختار به [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

## 11. Related Guides

- [راهنمای ساختار کامپوننت](../../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md)
- [راهنمای قوانین فریمورک](../../00-framework/AI_GUIDE_RULES.md)
- [راهنمای اصطلاحات](../../00-framework/AI_GUIDE_TERMINOLOGY.md)
- [AI Guide: ComponentButton](../button/GUIDE.md) — به‌عنوان زیرکامپوننت دکمه افزودن استفاده می‌شود
- [AI Guide: ComponentInput](../input/GUIDE.md) — کامپوننت ورودی با ساختار مشابه

## 12. Source References

| فایل | مسیر | توضیح |
|------|------|-------|
| ComponentSelectOption.ts | `last/tools/components/ComponentSelectOption.ts` | فایل اصلی کامپوننت (Props، Configs، کلاس‌ها) |
| ComponentIcon.ts | `last/tools/components/ComponentIcon.ts` | زیرکامپوننت آیکن |
| ComponentButton.ts | `last/tools/components/ComponentButton.ts` | زیرکامپوننت دکمه |
| SetupComponent.ts | `last/core/component/SetupComponent.ts` | تعریف Props و Configs پایه |
| ComponentBase.ts | `last/core/ComponentBase.ts` | کلاس پایه فریمورک |
| ReactiveElement.ts | `last/core/ReactiveElement.ts` | سیستم رندر reactive |
| Observable.ts | `last/core/Observable.ts` | سیستم Observable برای binding داده |
