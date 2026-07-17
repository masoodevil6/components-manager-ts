# SetupComponent - راهنمای جامع

## مقدمه

`SetupComponent` شامل تنظیمات پایه و ساختار استاندارد برای تمام کامپوننت‌ها است. این فایل Props، Keys، Parts، Pattern، Schema و Render functions را برای بخش‌های مختلف کامپوننت تعریف می‌کند.

ساختار سلسله‌مراتبی:
- **Component**: کامپوننت پایه
  - **Structure**: ساختار کامپوننت
    - **FormInput**: ورودی فرم
      - **Value**: مقدار ورودی
      - **Label**: برچسب ورودی

---

## Helper Functions

### GOG_ComponentBasicConfigs_checkExecutePart

```typescript
function GOG_ComponentBasicConfigs_checkExecutePart(context: any, partName: string | null, replace: boolean = true)
```

اجرای یک بخش از schema:
- اگر partName null باشد و replace true، renderContentComponent را اجرا می‌کند
- در غیر این صورت، executeSchemaPart را اجرا می‌کند

**پارامترها:**
- `context`: context کامپوننت
- `partName`: نام بخش
- `replace`: آیا با null جایگزین شود؟

---

### GOG_ComponentBasicConfigs_partDoseNotBody

```typescript
export function GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault: ComponentAttrsDefault): ReactiveElement
```

ایجاد یک section خالی وقتی داده‌ای موجود نیست.

---

## بخش Component

### Props

```typescript
export const GOG_ComponentBasicProps_Component = {
    selector:      "selector",
    append:        "append",
    classList:     "classList",
    styles:        "styles"
} as const
```

ویژگی‌های پایه کامپوننت:
- `selector`: CSS Selector برای اتصال به DOM
- `append`: Append یا replace
- `classList`: کلاس‌های CSS
- `styles`: استایل‌ها

---

### Keys

```typescript
export const GOG_ComponentBasicConfigs_Component_keys = {
    selector:      { name: "selector", value: null },
    append:        { name: "append", value: false },
    classList:     { name: "classList", value: [] },
    styles:        { name: "styles", value: {} }
}
```

مقادیر پیش‌فرض برای Props.

---

### Parts

```typescript
export const GOG_ComponentBasicConfigs_Component_parts = {
    Component: { name: "part-component" }
}
```

بخش‌های کامپوننت.

---

### Pattern

```typescript
export function GOG_ComponentBasicConfigs_Component_Pattern(ctx: ComponentBase)
```

تعریف Pattern با metadata برای مستندات.

---

### Schema

```typescript
export function GOG_ComponentBasicConfigs_Component_Schema(ctx: ComponentBase)
```

تعریف Schema برای بخش Component.

---

### Render

```typescript
export function GOG_ComponentBasicConfigs_Component_render(this: ComponentBase, attrsDefault, data, extra): ReactiveElement
```

رندر کردن بخش Component:
- ایجاد المان component- با نام کامپوننت
- اعمال direction RTL/LTR
- اجرای بخش STRUCTURE

---

## بخش Structure

### Props

```typescript
export const GOG_ComponentBasicProps_Component_Structure = {
    prop_show:             "prop_show",
    prop_structureClass:   "prop_structureClass",
    prop_structureStyles:  "prop_structureStyles"
}
```

ویژگی‌های ساختار:
- `prop_show`: نمایش/مخفی
- `prop_structureClass`: کلاس‌های ساختار
- `prop_structureStyles`: استایل‌های ساختار

---

### Render

```typescript
export function GOG_ComponentBasicConfigs_Component_Structure_render(this: ComponentBase, attrsDefault, data, extra): ReactiveElement
```

رندر کردن بخش Structure:
- اعمال classBind برای show/hide
- اجرای بخش FormInput

---

## بخش FormInput

### Props

```typescript
export const GOG_ComponentBasicProps_Component_Structure_FormInput = {}
```

این بخش بدون props اختصاصی است.

---

### Render

```typescript
export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_render(this: ComponentBase, attrsDefault, data, extra): ReactiveElement
```

رندر کردن بخش FormInput:
- اجرای بخش LABEL
- اجرای بخش Value
- اجرای renderContentComponent

---

## بخش Value

### Props

```typescript
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Value = {
    prop_name:      "prop_name",
    prop_value:     "prop_value",
    prop_isDisable: "prop_isDisable"
}
```

ویژگی‌های مقدار ورودی:
- `prop_name`: نام فیلد
- `prop_value`: مقدار
- `prop_isDisable`: غیرفعال

---

### Keys

```typescript
export const GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_keys = {
    prop_name:      { name: "prop_name", value: null },
    prop_value:     { name: "prop_value", value: false },
    prop_isDisable: { name: "prop_isDisable", value: false }
}
```

---

### Render

```typescript
export function GOG_ComponentBasicConfigs_Component_Structure_FormInput_Value_render(attrsDefault, data, extra): ReactiveElement
```

رندر کردن input hidden:
- تبدیل مقدار به string/JSON
- تبدیل boolean به 0/1
- تبدیل number به string

---

## بخش Label

### Props

```typescript
export const GOG_ComponentBasicProps_Component_Structure_FormInput_Label = {
    prop_labelShow:              "prop_labelShow",
    prop_labelBackground:        "prop_labelBackground",
    prop_labelRadius:            "prop_labelRadius",
    prop_labelMinWidth:          "prop_labelMinWidth",
    prop_labelTitle:             "prop_labelTitle",
    prop_labelFor:               "prop_labelFor",
    prop_labelStyle:             "prop_labelStyle",
    prop_labelClass:             "prop_labelClass",
    prop_labelColor:             "prop_labelColor",
    prop_labelTooltipIcon:       "prop_labelTooltipIcon",
    prop_labelTooltipDescription: "prop_labelTooltipDescription",
    prop_labelTooltipBackground: "prop_labelTooltipBackground",
    prop_labelTooltipColor:      "prop_labelTooltipColor",
    prop_labelTooltipPosition:   "prop_labelTooltipPosition",
    prop_labelTooltipDirection:  "prop_labelTooltipDirection"
}
```

ویژگی‌های برچسب:
- نمایش/مخفی
- استایل‌ها (background, radius, color)
- محتوا (title, for)
- tooltip (icon, description, background, color, position, direction)

---

### Enum

```typescript
export enum ComponentLabel_TooltipPositionTypes {
    TOP = "top",
    BOTTOM = "bottom"
}
```

موقعیت tooltip.

---

## مثال‌های کاربردی

### مثال 1: استفاده از Props پایه

```typescript
export const MyComponentProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    prop_custom: "prop_custom"
} as const;
```

---

### مثال 2: استفاده از Keys پایه

```typescript
const MyComponentConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        [MyComponentProps.prop_custom]: {
            name: MyComponentProps.prop_custom,
            value: GOG_SetValue("default")
        }
    }
}
```

---

### مثال 3: استفاده از Pattern

```typescript
export function MyComponent_Pattern(ctx: ComponentBase) {
    return {
        ...GOG_ComponentBasicConfigs_Component_Pattern(ctx),
        [MyComponentProps.prop_custom]: {
            prop: MyComponentProps.prop_custom,
            default: MyComponentConfigs.keys.prop_custom.value,
            title: Language.translate("mycomponent.prop.custom.title")
        }
    }
}
```

---

### مثال 4: استفاده از Schema

```typescript
export function MyComponent_Schema(ctx: ComponentBase) {
    return {
        ...GOG_ComponentBasicConfigs_Component_Schema(ctx),
        CustomPart: {
            part: "part-custom",
            props: [ctx._COMPONENT_PATTERN[MyComponentProps.prop_custom]]
        }
    }
}
```

---

### مثال 5: استفاده از Render

```typescript
export function MyComponent_render(this: ComponentBase, attrsDefault, data, extra) {
    return ReactiveElement.component(this._COMPONENT_NAME, {
        children: [
            GOG_ComponentBasicConfigs_checkExecutePart(this, MyComponentConfigs.schemas.CustomPart.name)
        ]
    })
}
```

---

## نکات مهم

### 1. سلسله‌مراتب

- همیشه از Component شروع کنید
- سپس Structure، FormInput، Value، Label را اضافه کنید
- هر بخش می‌تواند مستقل باشد

---

### 2. نام‌گذاری

- Props با پیشوند `prop_`
- Keys با نام prop
- Parts با نام بخش
- Pattern با `_Pattern`
- Schema با `_Schema`
- Render با `_render`

---

### 3. Type Safety

- همیشه از `as const` استفاده کنید
- از `GOG_SetValue` برای تعریف مقادیر استفاده کنید

---

### 4. Language Integration

- از `Language.translate` برای title و description استفاده کنید
- کلیدهای ترجمه باید در فایل‌های langs تعریف شوند

---

### 5. Reactive Integration

- همه مقادیر در Keys باید با GOG_SetValue تعریف شوند
- در Render، از Observableها استفاده کنید

---

## بهترین شیوه‌ها

### 1. ارث‌بری از Props پایه

```typescript
// ✅ خوب
export const MyProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    prop_custom: "prop_custom"
} as const;

// ❌ بد
export const MyProps = {
    selector: "selector",
    prop_custom: "prop_custom"
}
```

---

### 2. استفاده از checkExecutePart

```typescript
// ✅ خوب
GOG_ComponentBasicConfigs_checkExecutePart(this, MyConfigs.schemas.CustomPart.name)

// ❌ بد
this.executeSchemaPart(MyConfigs.schemas.CustomPart.name)
```

---

### 3. تعریف Pattern با metadata

```typescript
// ✅ خوب
[MyProps.prop_custom]: {
    prop: MyProps.prop_custom,
    default: MyConfigs.keys.prop_custom.value,
    title: Language.translate("...")
}

// ❌ بد
[MyProps.prop_custom]: {
    prop: MyProps.prop_custom,
    default: MyConfigs.keys.prop_custom.value
}
```

---

## خلاصه

SetupComponent شامل:
- ✅ تنظیمات پایه برای تمام کامپوننت‌ها
- ✅ ساختار سلسله‌مراتبی (Component → Structure → FormInput → Value/Label)
- ✅ Props، Keys، Parts، Pattern، Schema، Render
- ✅ Helper functions برای رندر
- ✅ Type-safe تعاریف
- ✅ Language integration
- ✅ Reactive integration

این فایل پایه اصلی برای ساخت کامپوننت‌های جدید است.
