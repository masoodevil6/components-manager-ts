# راهنمای جامع معماری کامپوننت‌ها

## مقدمه

این کتابخانه یک سیستم کامپوننت‌های UI مبتنی بر TypeScript با معماری واکنشی (Reactive) است که از الگوی Schema-based rendering برای ساخت کامپوننت‌های قابل تنظیم و قابل استفاده مجدد استفاده می‌کند.

---

## ساختار سلسله‌مراتبی ماژول‌ها (Framework Directory Tree)

```text
src/framework/
├── core/
│   ├── components/         # پایه و ابزارهای کامپوننت
│   ├── configs/            # تنظیمات و تایپ‌های سیستم
│   ├── languages/          # مدیریت چندزبانی
│   ├── observable/         # هسته واکنشی (State Management)
│   └── reactive/           # مدیریت المان‌های واکنشی (DOM)
├── ui/
│   ├── categories/         # دسته‌بندی منطقی اجزا
│   ├── components/         # پیاده‌سازی نهایی کامپوننت‌ها
│   └── icons/              # مجموعه آیکون‌ها و اشکال بصری
└── util/                   # ابزارهای کمکی داخلی فریم‌ورک
```

## راه‌اندازی اولیه (Initialization)

قبل از استفاده از کامپوننت‌ها و سیستم زبان‌ها، حتماً باید سیستم **Bootstrap** اجرا شود تا وابستگی‌های چرخه‌ای (Circular Dependencies) حل شوند و دیکشنری زبان‌ها بارگذاری شود.

```typescript
// src/app.ts
import "./files/styles/bootstrap.css";
import "./files/styles/main.css";

// ✅ ضروری: راه‌اندازی سیستم زبان قبل از سایر عملیات
import { Boot_Language } from "@/framework/bootstrap/Language";
Boot_Language();

import * as framework from "@/framework";
// ادامه کد روتینگ...
```

برای اطلاعات بیشتر در مورد اینکه چرا این مرحله ضروری است و نحوه عملکرد آن، به **[راهنمای Bootstrap](documents/BOOTSTRAP.md)** مراجعه کنید.

---

### ۱. هسته اصلی (Core)

#### ComponentBase
کلاس پایه برای تمام کامپوننت‌ها که شامل ویژگی‌های زیر است:

```typescript
export class ComponentBase<
    TProp extends Record<string, any>,
    TSchemas,
    TTemplate,
    TMethods extends Record<string, ComponentCallBackType<any, any>>
>
```

**ویژگی‌های کلیدی:**
- **Generics Type-Safe**: استفاده از TypeScript Generics برای تایپ‌سیف بودن
- **Reactive Scope**: هر کامپوننت دارای Scope اختصاصی برای مدیریت وضعیت واکنشی
- **Schema-based Rendering**: رندرینگ بر اساس اسکیمای تعریف شده
- **Method Binding**: سیستم اتصال متدها به رویدادها

#### ReactiveElement
سیستم ساخت المان‌های واکنشی که به صورت خودکار با تغییر Observableها به‌روزرسانی می‌شود.

#### Observable
سیستم مدیریت وضعیت واکنشی که تغییرات را به صورت خودکار به UI منتقل می‌کند.

---

## ساختار استاندارد کامپوننت

### ۱. تعریف Props (ویژگی‌ها)

هر کامپوننت با تعریف Props شروع می‌شود:

```typescript
export const ComponentInputCheckBoxProps = {
    ... GOG_ComponentBasicProps_Component,
    ... GOG_ComponentBasicProps_Component_Structure,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Value,
    ... GOG_ComponentBasicProps_Component_Structure_FormInput_Label,
    
    // ویژگی‌های اختصاصی کامپوننت
    prop_borderIconClass: "prop_borderIconClass",
    prop_borderIconStyles: "prop_borderIconStyles",
    prop_icon: "prop_icon",
    // ...
} as const;
```

**نکات مهم:**
- استفاده از `as const` برای Type Inference بهتر
- ارث‌بری از Props پایه (Basic Props)
- نام‌گذاری با پیشوند `prop_`

---

### ۲. تعریف Configs (پیکربندی)

#### Keys (کلیدها)
تعریف کلیدها و مقادیر پیش‌فرض:

```typescript
const ComponentInputCheckBoxConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        
        [ComponentInputCheckBoxProps.prop_borderIconClass]: {
            name: ComponentInputCheckBoxProps.prop_borderIconClass,
            value: GOG_SetValue<string[]>([])
        },
        [ComponentInputCheckBoxProps.prop_icon]: {
            name: ComponentInputCheckBoxProps.prop_icon,
            value: GOG_SetValue<IconsType | null>(ToolsIcons.icon_tik({...}))
        },
        // ...
    }
}
```

#### Schemas (اسکیماهای ساختاری)
تعریف بخش‌های مختلف کامپوننت:

```typescript
schemas: {
    ...GOG_ComponentBasicConfigs_Component_parts,
    ...GOG_ComponentBasicConfigs_Component_Structure_parts,
    
    Main: {
        name: "part-main"
    },
    Main_Icon: {
        name: "part-main-icon"
    },
    Main_Title: {
        name: "part-main-title"
    }
}
```

#### Templates (قالب‌ها)
تعریف قالب‌های قابل استفاده مجدد:

```typescript
templates: {
    TITLE: {
        name: "title"
    },
    TOOLTIP: {
        name: "tooltip"
    }
}
```

#### Methods (متدها)
تعریف متدها و callbackها:

```typescript
methods: {
    CLICK: {
        name: "fn_onClickCheckbox",
        dataArgs: {},
        componentArgs: {
            IS_DISABLE: { name: "IS_DISABLE" },
            VALUE: { name: "VALUE" }
        }
    }
}
```

---

### ۳. استخراج Typeها

```typescript
export type ComponentInputCheckBoxPropsType = GOG_ExtractNameValue<typeof ComponentInputCheckBoxConfigs.keys>
export type ComponentInputCheckBoxSchemaType = GOG_ExtractName<typeof ComponentInputCheckBoxConfigs.schemas>
export type ComponentInputCheckBoxTemplatesType = GOG_ExtractName<typeof ComponentInputCheckBoxConfigs.templates>
export type ComponentInputCheckBoxMethodsType = {
    [ComponentInputCheckBoxConfigs.methods.CLICK.name]: ComponentCallBackType<...>
}
```

---

### ۴. کلاس Base (کلاس پایه انتزاعی)

```typescript
export abstract class ComponentInputCheckBoxBase extends ComponentBase<
    ComponentInputCheckBoxPropsType,
    ComponentInputCheckBoxSchemaType,
    ComponentInputCheckBoxTemplatesType,
    ComponentInputCheckBoxMethodsType
> {
    // تعریف Pattern
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentInputCheckBoxPropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        // تعریف ویژگی‌ها با metadata
        [ComponentInputCheckBoxConfigs.keys.prop_icon.name]: {
            prop: ComponentInputCheckBoxConfigs.keys.prop_icon.name,
            default: ComponentInputCheckBoxConfigs.keys.prop_icon.value,
            title: Language.translate("components.input_check_box.prop.prop_icon.title"),
            description: Language.translate("components.input_check_box.prop.prop_icon.description"),
        }
    })
    
    // تعریف Schema
    _COMPONENT_SCHEMA = defineComponentSchema<...>({...})
    
    // تعریف Templates
    _COMPONENT_TEMPLATES = defineComponentTemplate<...>({...})
    
    // تعریف Methods
    _COMPONENT_METHODS = defineComponentMethods<...>({...})
    
    // Example Component
    static override renderExampleComponent(): HTMLElement {...}
}
```

---

### ۵. کلاس Concrete (کلاس پیاده‌سازی)

```typescript
export class ComponentInputCheckBox extends ComponentInputCheckBoxBase {
    constructor(
        config: ComponentInputCheckBoxPropsType,
        methods: ComponentInputCheckBoxMethodsType,
        events = null
    ) {
        super("input-checkbox", null);
        super.renderComponent(config, methods, events);
    }
    
    override renderContentComponent() {
        return this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main.name)
    }
    
    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case ComponentInputCheckBoxConfigs.schemas.Main.name:
                return this.template_render_main(attrsDefault, data, extra);
            case ComponentInputCheckBoxConfigs.schemas.Main_Icon.name:
                return this.template_render_main_icon(attrsDefault, data, extra);
            // ...
        }
    }
    
    // Template Methods
    private template_render_main(attrsDefault, data, extra): ReactiveElement {...}
    private template_render_main_icon(attrsDefault, data, extra): ReactiveElement {...}
    
    // Helper Methods
    private pr_setChangeValue(event): void {...}
}
```

---

## مفاهیم کلیدی

### ۱. Pattern (الگو)
Pattern تعریف‌کننده ویژگی‌های کامپوننت با metadata است:

```typescript
IComponentProp<TPropTypes> {
    prop: string;              // نام ویژگی
    default: TPropTypes;       // مقدار پیش‌فرض
    value?: null;             // مقدار اختیاری
    hasMultiTemplate?: boolean; // آیا از چند قالب استفاده می‌کند؟
    title?: Observable<string>;    // عنوان برای مستندات
    description?: Observable<string>; // توضیحات برای مستندات
}
```

### ۲. Schema (اسکیمای ساختاری)
Schema تعریف‌کننده بخش‌های مختلف کامپوننت است:

```typescript
IComponentSchema<TSchema, TPropTypes> {
    part: TSchema;                                    // نام بخش
    method?: (attrsDefault, data, extra) => ReactiveElement; // متد رندر
    props?: IComponentProp<TPropTypes[keyof TPropTypes]>[]; // ویژگی‌های مرتبط
    title?: Observable<string>;                      // عنوان
    description?: Observable<string>;                // توضیحات
}
```

### ۳. Method (متد)
Method تعریف‌کننده callbackها و رویدادها است:

```typescript
ComponentMethodType<TPropTypes> {
    args?: Record<string, IComponentProp<TPropTypes[keyof TPropTypes]>>; // آرگومان‌ها
    title?: Observable<string>;    // عنوان
    description?: Observable<string>; // توضیحات
    destination?: ComponentCallBackType<any, any>; // تابع callback
}
```

### ۴. Observable (واکنشی)
سیستم مدیریت وضعیت واکنشی:

```typescript
// ایجاد Observable
const prop_value = new Observable(true);

// دسترسی به مقدار
const current = prop_value.get();

// تغییر مقدار
prop_value.set(false);

// Mapping
const mapped = prop_value.map(v => v ? "selected" : "unselected");

// Computed
const computed = Observable.computed(
    (a, b) => a + b,
    [obsA, obsB],
    scope
);
```

---

## کامپوننت‌های موجود

### کامپوننت‌های پایه
- **ComponentBorder**: بسته‌بندی با حاشیه
- **ComponentIcon**: نمایش آیکون
- **ComponentButton**: دکمه
- **ComponentLabel**: برچسب

### کامپوننت‌های ورودی (Input)
- **ComponentInputCheckBox**: چک‌باکس
- **ComponentInputAgreementCheckBox**: چک‌باکس توافق‌نامه
- **ComponentInputListSelector**: انتخابگر لیست

### کامپوننت‌های لیاوت (Layout)
- **ComponentRecyclerView**: لیست واکنشی
- **ComponentTabs**: تب‌ها
- **ComponentCollapse**: جمع‌شونده
- **ComponentElementPosition**: موقعیت‌دهی المان

### کامپوننت‌های منو (Menu)
- **ComponentFloatMenu**: منوی شناور
- **ComponentPositionMenu**: منوی موقعیتی

### کامپوننت‌های نمایشی (Display)
- **ComponentMessages**: نمایش پیام‌ها
- **ComponentTooltipDescription**: توضیحات tooltip
- **ComponentErrorIsEmpty**: نمایش خطای خالی بودن
- **ComponentListSelectedScroller**: اسکرولر لیست انتخاب شده

### کامپوننت‌های تعاملی (Interactive)
- **ComponentSelector**: انتخابگر
- **ComponentDraggableOrdersY**: مرتب‌سازی کششی

---

## سیستم ویژگی‌های پایه

### Component (کامپوننت پایه)
```typescript
{
    selector: string | null;      // CSS Selector
    append: boolean;              // Append به body
    classList: string[];          // کلاس‌های CSS
    styles: Record<string, any>;  // استایل‌ها
}
```

### Structure (ساختار)
```typescript
{
    prop_show: boolean;           // نمایش/مخفی
    prop_structureClass: string[]; // کلاس ساختار
    prop_structureStyles: Record<string, any>; // استایل ساختار
}
```

### FormInput (ورودی فرم)
```typescript
{
    prop_name: string;            // نام فیلد
    prop_placeholder: string;     // placeholder
}
```

### FormInput Value (مقدار ورودی)
```typescript
{
    prop_value: any;              // مقدار
    prop_isDisable: boolean;      // غیرفعال
}
```

### FormInput Label (برچسب ورودی)
```typescript
{
    prop_labelTitle: string;      // عنوان برچسب
    prop_labelFor: string;        // for attribute
    prop_labelTooltipDescription: string; // توضیحات tooltip
    // ...
}
```

---

## سیستم رنگ و اندازه

### Color (رنگ)
```typescript
Color(COLORS_MAIN.PRIMARY, COLORS_GRAD.GRADE_1)
// COLORS_MAIN: PRIMARY, SECONDARY, SHADOW, SHAN, DARK
// COLORS_GRAD: GRADE_1 تا GRADE_5
```

### Size (اندازه)
```typescript
SIZES.XS, SIZES.S, SIZES.M, SIZES.L, SIZES.XL
```

### Unit (واحد)
```typescript
UNITS.PEXEL, UNITS.PERCENT, UNITS.POINT
SizeUnit(100, UNITS.PERCENT)
```

### SizeCalc (محاسبه اندازه)
```typescript
SizeCalc(
    SizeUnit(100, UNITS.PERCENT),
    OPERATION.MINUS,
    SizeUnit(20, UNITS.PEXEL)
)
```

---

## سیستم چندزبانه

```typescript
Language.translate("components.input_check_box.prop.prop_icon.title")
// کلیدهای ترجمه در فایل‌های langs/ تعریف می‌شوند
```

---

## مثال کامل استفاده

```typescript
// ایجاد کامپوننت
const checkbox = new ComponentInputCheckBox(
    <ComponentInputCheckBoxPropsType>{
        classList: ["col-md-3", "col-12", "border", "p-2"],
        styles: {},
        
        prop_value: true,
        prop_title: "Item CheckBox",
        prop_labelTitle: "Input checkBox",
        prop_labelTooltipDescription: "this is for checkBox"
    },
    <ComponentInputCheckBoxMethodsType>{
        fn_onClickCheckbox: function (event, dataArgs, componentArgs) {
            console.log("checkbox clicked", dataArgs, componentArgs);
        }
    }
);

// دریافت المان HTML
const element = checkbox.getElement();

// یا استفاده از ReactiveElement
const reactiveElement = checkbox.getReactiveElement();
```

---

## بهترین شیوه‌ها

### ۱. نام‌گذاری
- Props با پیشوند `prop_`
- Enums با پسوند `Types`
- Typeها با پسوند `Type`
- متدهای خصوصی با پیشوند `pr_`
- متدهای template با پیشوند `template_render_`

### ۲. ساختار فایل
```
ComponentName.ts
├── Imports
├── Props Definition
├── Configs (keys, schemas, templates, methods)
├── Type Extractions
├── Base Class (abstract)
├── Concrete Class
└── Exports
```

### ۳. استفاده از Observable
- همیشه از Observable برای مقادیر واکنشی استفاده کنید
- از `map` برای تبدیل مقادیر استفاده کنید
- از `computed` برای مقادیر محاسباتی استفاده کنید

### ۴. Schema-based Rendering
- هر بخش (part) باید یک Schema داشته باشد
- از `executeSchemaPart` برای رندر کردن بخش‌ها استفاده کنید
- از `renderManagerComponent` برای مدیریت بخش‌ها استفاده کنید

### ۵. Type Safety
- همیشه از TypeScript Generics استفاده کنید
- Typeها را از Configs استخراج کنید
- از `as const` برای تعاریف ثابت استفاده کنید

---

## نکات پیشرفته

### ۱. Composition (ترکیب)
کامپوننت‌ها می‌توانند کامپوننت‌های دیگر را در خود جای دهند:

```typescript
return new ToolsComponents.ComponentBorder(
    <ComponentBorderPropsType>{
        prop_content: this.executeSchemaPart(ComponentInputCheckBoxConfigs.schemas.Main_Icon.name)
    },
    <ComponentBorderMethodsType>{}
).getReactiveElement();
```

### ۲. Reactive Binding
استفاده از `stylesBind`, `classBind`, `attrsBind` برای اتصال واکنشی:

```typescript
stylesBind: {
    color: prop_value.map(v => v ? "red" : "blue")
},
classBind: [
    prop_show.mapBoolean("show", "d-none")
]
```

### ۳. Extra Data
انتقال داده اضافی به templateها:

```typescript
this.executeSchemaPart(ComponentTabsConfigs.schemas.FORM_TABS_BORDER.name, {
    itemTab,
    tabIndex: i,
    tabLength: tabsList.length
})
```

### ۴. Method Execution
اجرای متدها با پارامترها:

```typescript
const params: ComponentTabs_Methods_CLICK_TAB_DataArgs = {}
this.executeMethod(ComponentTabsConfigs.methods.CLICK_TAB.name, event, params);
```

---

## خلاصه

این معماری کامپوننت‌ها با ویژگی‌های زیر طراحی شده است:

✅ **Type-Safe**: استفاده کامل از TypeScript
✅ **Reactive**: سیستم واکنشی با Observable
✅ **Schema-based**: رندرینگ بر اساس اسکیمای تعریف شده
✅ **Composable**: قابلیت ترکیب کامپوننت‌ها
✅ **Configurable**: کامپوننت‌های قابل تنظیم
✅ **Reusable**: قابلیت استفاده مجدد
✅ **Multi-language**: پشتیبانی از چند زبان
✅ **Themeable**: پشتیبانی از تم و رنگ
✅ **Responsive**: پشتیبانی از سایزهای مختلف

---

## منابع

- `src/core/ComponentBase.ts` - کلاس پایه کامپوننت
- `src/core/ReactiveElement.ts` - سیستم المان واکنشی
- `src/core/Observable.ts` - سیستم Observable
- `src/core/component/SetupComponent.ts` - تنظیمات پایه
- `src/tools/components/` - کامپوننت‌های موجود
- `src/utils/ToolsConsts.ts` - ثابت‌ها و enumها
