# AI Guide: Component Templates

> **Audience:** همه AIهایی که variantهای نمایشی کامپوننت تعریف می‌کنند.
>
> **Purpose:** بررسی عمیق `_COMPONENT_TEMPLATES`، اینترفیس template و نحوه resolution مقادیر props از templates.
>
> **Level:** پایه — پیش‌نیاز مطالعه `./AI_GUIDE_COMPONENT_STRUCTURE.md` و `./AI_GUIDE_COMPONENT_PROPS.md`.
>
> **Status:** Official

---

## 1. Definition

`_COMPONENT_TEMPLATES` بخش تعریف variantهای نمایشی کامپوننت است. هر template به یک prop از طریق فیلد `reference` متصل می‌شود و می‌تواند یک مقدار پیش‌فرض (`value`)، HTML سفارشی (`html`) و attribute‌های اضافی (`attrs`) ارائه دهد. Templates به‌عنوان fallback در زمان resolution مقادیر props عمل می‌کنند — اگر prop در user config وجود نداشته باشد، مقدار از template گرفته می‌شود.

---

## 2. Responsibilities

- تعریف variantهای نمایشی برای کامپوننت.
- ارائه مقادیر پیش‌فرض جایگزین برای props (fallback بعد از user config، قبل از default).
- ارائه HTML و attrs سفارشی برای variantهای خاص.
- نگاشت هر template به یک prop موجود از طریق `reference`.

---

## 3. Concepts

### 3.1. Interface_ComponentTemplate

تعریف اینترفیس در `tools/template/Interface_ComponentTemplate.ts` (lines 5-12):

```typescript
export interface Interface_ComponentTemplate<TPropTypes> {
    reference:         PropInterface<TPropTypes[keyof TPropTypes]>;
    html?:             string;
    attrs?:            Record<string, string>;
    value?:            any;
    title?:            CoreObservable.App<string>;
    description?:      CoreObservable.App<string>;
}
```

| فیلد | تایپ | الزامی | توضیح |
|:---|:---|:---|:---|
| `reference` | `PropInterface` | بله | ارجاع به prop که این template برای آن مقدار ارائه می‌دهد |
| `html` | `string` | خیر | HTML سفارشی برای این variant |
| `attrs` | `Record<string, string>` | خیر | attribute‌های اضافی HTML |
| `value` | `any` | خیر | مقدار جایگزین برای prop — در fallback resolution استفاده می‌شود |
| `title` | `Observable<string>` | خیر | عنوان نمایشی |
| `description` | `Observable<string>` | خیر | توضیحات |

### 3.2. Define_ComponentTemplate

تابع helper در `tools/template/Define_ComponentTemplate.ts` (lines 5-7):

```typescript
export function Define_ComponentTemplate<TTemplatesTypes, TPropTypes>(
    templates: { [K in TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> }
): { [K in TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> } {
    return templates;
}
```

`Type_ComponentTemplate<T>` برابر با `keyof T` است.

### 3.3. نقش Templates در Resolution Props

Templates در متد `#getReadyUserConfigAndDefaultConfig` به‌عنوان منبع دوم (fallback) برای مقادیر props استفاده می‌شوند. اولویت resolution:

```
1. User Config     (بالاترین اولویت)
2. Templates       (fallback — اگر prop در config نبود)
3. Default         (پایین‌ترین اولویت — اگر نه در config و نه در templates بود)
```

---

## 4. Architecture

### 4.1. نحوه Resolution از Templates

کد مرتبط در `#getReadyUserConfigAndDefaultConfig` (lines 128-139):

```typescript
if (config.hasOwnProperty(propName)) {
    value = config[itemProp.prop];
    exist = true;
} else {
    if (this._COMPONENT_TEMPLATES != null) {
        Object.keys(this._COMPONENT_TEMPLATES).forEach(templateName => {
            const data = this._COMPONENT_TEMPLATES[templateName as keyof typeof this._COMPONENT_TEMPLATES];
            if (!data) return;
            const reference = data.reference;
            if (reference?.prop == propName && data.hasOwnProperty("value")) {
                value = data.value;
                exist = true;
            }
        });
    }
}
```

### 4.2. الگوریتم Resolution

```
برای هر prop در _COMPONENT_PATTERN:
    │
    ├── ۱. آیا در user config هست؟
    │       └── بله → استفاده از config[propName]
    │
    ├── ۲. آیا در _COMPONENT_TEMPLATES هست؟
    │       └── برای هر template:
    │           ├── اگر reference.prop == propName
    │           └── و data.hasOwnProperty("value")
    │           └── بله → استفاده از data.value
    │
    └── ۳. هیچ‌کدام؟
            └── استفاده از itemProp.default
```

### 4.3. نکته مهم درباره چندین Template

اگر چندین template به یک prop ارجاع دهند، **آخرین template** که در iteration پیدا شود برنده می‌شود (چون `exist = true` و `value` در هر تطابق overwrite می‌شود). ترتیب iteration بر اساس `Object.keys()` است.

---

## 5. Rules

### MUST

- **MUST** هر template دارای فیلد `reference` باشد — این فیلد اجباری است.
- **MUST** `reference.prop` به یک prop موجود در `_COMPONENT_PATTERN` اشاره کند — در غیر این صورت مقدار template هرگز استفاده نمی‌شود.
- **MUST** برای اینکه template به‌عنوان fallback عمل کند، فیلد `value` باید تعریف شده باشد — بدون `value`، template نادیده گرفته می‌شود.

### MUST NOT

- **MUST NOT** template با `reference.prop` به prop ناموجود تعریف کنید — مقدار template در resolution استفاده نمی‌شود.
- **MUST NOT** به `_COMPONENT_TEMPLATES` به‌عنوان منبع اصلی مقادیر props تکیه کنید — user config همیشه اولویت بالاتر دارد.
- **MUST NOT** `value` و `default` در `reference` را با `default` در `_COMPONENT_PATTERN` اشتباه بگیرید — `reference.default` فقط متادیتا است و در resolution استفاده نمی‌شود.

### SHOULD

- **SHOULD** برای props با `hasMultiTemplate: true`، چندین template با `value`های متفاوت تعریف کنید.
- **SHOULD** نام template‌ها را معنادار انتخاب کنید (مثل `Default`, `Primary`, `Secondary`, `Outline`).
- **SHOULD** `html` و `attrs` را فقط برای variantهایی که نیاز به HTML متفاوت دارند تعریف کنید.

### SHOULD NOT

- **SHOULD NOT** تعداد templates را بیش از حد افزایش دهید — هر template در iteration resolution بررسی می‌شود.

### MAY

- **MAY** `_COMPONENT_TEMPLATES` را خالی `{}` تعریف کنید — در این صورت resolution مستقیماً از config به default می‌رود.
- **MAY** template بدون `value` تعریف کنید — در این صورت فقط `html` و `attrs` آن معنا دارند و در resolution props نادیده گرفته می‌شود.

> برای قوانین کلی Framework به `../00-framework/AI_GUIDE_RULES.md` مراجعه کنید.

---

## 6. Lifecycle

1. **تعریف** — subclass `_COMPONENT_TEMPLATES` را با `Define_ComponentTemplate` مقداردهی می‌کند.
2. **Resolution** — در زمان `renderComponent`، `#getReadyUserConfigAndDefaultConfig` برای هر prop که در config نیست، templates را بررسی می‌کند.
3. **Fallback** — اگر template با `reference.prop == propName` و `value` پیدا شود، مقدار آن استفاده می‌شود.
4. **Default** — اگر هیچ template مناسب نبود، `default` از `_COMPONENT_PATTERN` استفاده می‌شود.
5. **Binding** — مقدار نهایی در `_COMPONENT_PROPS_BIND` به‌صورت Observable ذخیره می‌شود.

---

## 7. API / Contract

### 7.1. Interface_ComponentTemplate

```typescript
interface Interface_ComponentTemplate<TPropTypes> {
    reference:    PropInterface<TPropTypes[keyof TPropTypes]>,  // اجباری
    html?:        string,
    attrs?:       Record<string, string>,
    value?:       any,
    title?:       Observable<string>,
    description?: Observable<string>,
}
```

### 7.2. Define_ComponentTemplate

```typescript
function Define_ComponentTemplate<TTemplatesTypes, TPropTypes>(
    templates: { [K in TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> }
): { [K in TemplateType<TTemplatesTypes>]: TemplateInterface<TPropTypes> }
```

### 7.3. رفتار Resolution

| شرایط | منبع مقدار |
|:---|:---|
| prop در user config | `config[propName]` |
| prop در config نیست، template با `value` هست | `template.value` |
| prop در config نیست، template بدون `value` | `pattern.default` |
| prop در config نیست، template نیست | `pattern.default` |

---

## 8. Examples

### 8.1. تعریف Templates

```typescript
type MyTemplates = {
    Default:  "Default";
    Primary:  "Primary";
    Secondary: "Secondary";
    Outline:  "Outline";
};

type MyProps = {
    variant: string;
    title: string;
    color: string;
};

_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Default: {
        reference: { prop: "variant", default: "default" },
        value: "default",
        title: Observable.App("پیش‌فرض"),
        description: Observable.App("حالت پیش‌فرض کامپوننت"),
    },
    Primary: {
        reference: { prop: "variant", default: "default" },
        value: "primary",
        html: `<button class="btn btn-primary"></button>`,
        attrs: { "data-style": "primary" },
        title: Observable.App("اصلی"),
    },
    Secondary: {
        reference: { prop: "variant", default: "default" },
        value: "secondary",
        attrs: { "data-style": "secondary" },
        title: Observable.App("ثانوی"),
    },
    Outline: {
        reference: { prop: "color", default: "#000000" },
        value: "transparent",
        title: Observable.App("خط دور"),
    },
});
```

### 8.2. نحوه Resolution در عمل

```typescript
// تعریف pattern
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    variant: { prop: "variant", default: "default", hasMultiTemplate: true },
    title:   { prop: "title",   default: "" },
    color:   { prop: "color",   default: "#000000" },
});

// سناریو ۱: user config همه props را پاس می‌دهد
comp.renderComponent(
    { variant: "custom", title: "Hello", color: "#ff0000" },
    methods
);
// variant → "custom" (از config)
// title → "Hello" (از config)
// color → "#ff0000" (از config)

// سناریو ۲: user config فقط title را پاس می‌دهد
comp.renderComponent(
    { title: "Hello" },
    methods
);
// variant → "secondary" (آخرین template با reference.prop == "variant")
//   → چون "Secondary" آخرین template در iteration است و value دارد
// title → "Hello" (از config)
// color → "transparent" (از template "Outline" با reference.prop == "color")

// سناریو ۳: user config خالی
comp.renderComponent(
    {},
    methods
);
// variant → "secondary" (از template)
// title → "" (از default)
// color → "transparent" (از template)
```

### 8.3. Template با Observable Value

```typescript
_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Primary: {
        reference: { prop: "color", default: "#000000" },
        value: new Observable.App("#0066cc"),  // Observable مستقیم
        title: Observable.App("اصلی"),
    },
});

// موتور تشخیص می‌دهد که value از نوع Observable است
// و دوباره wrap نمی‌کند — مستقیم در _COMPONENT_PROPS_BIND ذخیره می‌شود
```

### 8.4. Template بدون Value (فقط HTML/Attrs)

```typescript
_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Custom: {
        reference: { prop: "variant", default: "default" },
        // value تعریف نشده — در resolution props نادیده گرفته می‌شود
        html: `<div class="custom-wrapper"></div>`,
        attrs: { "data-custom": "true" },
    },
});
// این template فقط html و attrs ارائه می‌دهد
// در resolution prop "variant"، این template نادیده گرفته می‌شود
```

---

## 9. Anti-Patterns

### ❌ Incorrect — reference به prop ناموجود

```typescript
_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Default: {
        reference: { prop: "nonExistent", default: "" },  // ❌ در PATTERN نیست
        value: "default",
    },
});
// در resolution، reference.prop == propName هرگز تطابق نمی‌کند
// value این template هرگز استفاده نمی‌شود
```

### ✅ Correct — reference به prop موجود

```typescript
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    variant: { prop: "variant", default: "default" },
});

_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Default: {
        reference: { prop: "variant", default: "default" },  // ✅ در PATTERN هست
        value: "default",
    },
});
```

### ❌ Incorrect — انتظار override کردن config توسط template

```typescript
comp.renderComponent(
    { variant: "custom" },  // user config
    methods
);
// انتظار: variant → "primary" (از template)
// واقعیت: variant → "custom" (config اولویت بالاتر دارد) ❌
```

### ✅ Correct — درک اولویت resolution

```typescript
// اگر می‌خواهید template اعمال شود، prop را در config پاس ندهید
comp.renderComponent(
    {},  // variant در config نیست
    methods
);
// variant → مقدار از template ✅
```

### ❌ Incorrect — template بدون value انتظار fallback دارد

```typescript
_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Default: {
        reference: { prop: "variant", default: "default" },
        // value تعریف نشده ❌
        html: `<button></button>`,
    },
});
// در resolution، data.hasOwnProperty("value") → false
// این template نادیده گرفته می‌شود و default استفاده می‌شود
```

### ✅ Correct — value را برای fallback تعریف کنید

```typescript
_COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
    Default: {
        reference: { prop: "variant", default: "default" },
        value: "default",  // ✅
        html: `<button></button>`,
    },
});
```

---

## 10. Dependencies

| وابستگی | مسیر | نقش |
|:---|:---|:---|
| `CoreObservable` | `@/core_observable` | Observable برای title/description و value |
| `Interface_ComponentTemplate` | `tools/template/Interface_ComponentTemplate.ts` | اینترفیس template |
| `Define_ComponentTemplate` | `tools/template/Define_ComponentTemplate.ts` | تابع helper |
| `Type_ComponentTemplate` | `tools/template/Type_ComponentTemplate.ts` | `keyof T` |
| `Interface_ComponentProp` | `tools/prop/Interface_ComponentProp.ts` | برای فیلد `reference` |
| `_COMPONENT_PATTERN` | — | منبع تعریف props — reference باید به prop موجود اشاره کند |

> برای درک props به `./AI_GUIDE_COMPONENT_PROPS.md` مراجعه کنید.

---

## 11. AI Instructions

- هنگام تعریف templates، ابتدا تایپ `TTemplate` با همه نام variantها تعریف کنید.
- هر template باید `reference` با `prop` به یک prop موجود در `_COMPONENT_PATTERN` داشته باشد.
- برای fallback مقادیر، حتماً `value` را تعریف کنید — بدون `value`، template در resolution نادیده گرفته می‌شود.
- به یاد داشته باشید اولویت: **User Config > Templates > Default**.
- اگر چندین template به یک prop ارجاع دهند، آخرین تطابق در iteration برنده می‌شود — ترتیب تعریف مهم است.
- `value` می‌تواند یک Observable مستقیم باشد — موتور آن را تشخیص داده و دوباره wrap نمی‌کند.
- از `hasMultiTemplate: true` در `_COMPONENT_PATTERN` برای props که چندین template دارند استفاده کنید.
- `html` و `attrs` فقط برای variantهایی که نیاز به HTML متفاوت دارند تعریف شوند.

---

## 12. Related Guides

- [AI_GUIDE_COMPONENT_STRUCTURE.md](./AI_GUIDE_COMPONENT_STRUCTURE.md) — نمای کلی ساختار
- [AI_GUIDE_COMPONENT_PROPS.md](./AI_GUIDE_COMPONENT_PROPS.md) — تعریف props (منبع reference)
- [AI_GUIDE_COMPONENT_SCHEMA.md](./AI_GUIDE_COMPONENT_SCHEMA.md) — تعریف parts
- [AI_GUIDE_COMPONENT_METHODS.md](./AI_GUIDE_COMPONENT_METHODS.md) — تعریف callbacks
- [AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — دیکشنری اصطلاحات
- [AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [AI_GUIDE_OBSERVABLE.md](../01-systems/AI_GUIDE_OBSERVABLE.md) — سیستم Observable

---

## 13. Source References

| فایل | خطوط | توضیح |
|:---|:---|:---|
| `src/framework/module_core/module_components/tools/template/Interface_ComponentTemplate.ts` | 5-12 | تعریف اینترفیس |
| `src/framework/module_core/module_components/tools/template/Define_ComponentTemplate.ts` | 5-7 | تابع helper |
| `src/framework/module_core/module_components/tools/template/Type_ComponentTemplate.ts` | 1 | `keyof TSchema` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 33 | تعریف فیلد `_COMPONENT_TEMPLATES` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 114-157 | `#getReadyUserConfigAndDefaultConfig` (resolution با templates) |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 128-139 | بخش fallback از templates |
| `src/framework/module_core/module_components/tools/prop/Interface_ComponentProp.ts` | 4-11 | اینترفیس prop (برای `reference`) |
