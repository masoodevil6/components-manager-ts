# AI Guide: Component Schema

> **Audience:** همه AIهایی که بخش‌های بصری (parts) کامپوننت تعریف یا رندر می‌کنند.
>
> **Purpose:** بررسی عمیق `_COMPONENT_SCHEMA`، اینترفیس schema، نحوه رندر parts و ساختار TPartAttrDefault.
>
> **Level:** پایه — پیش‌نیاز مطالعه `./AI_GUIDE_COMPONENT_STRUCTURE.md` و `./AI_GUIDE_COMPONENT_PROPS.md`.
>
> **Status:** Official

---

## 1. Definition

`_COMPONENT_SCHEMA` بخش تعریف ساختار بصری کامپوننت است. هر entry در schema یک **Part** نامیده می‌شود و مشخص می‌کند که چه props استفاده می‌کند، با چه روشی رندر می‌شود و چه attribute‌های پیش‌فرضی دارد. اولین entry در schema به‌عنوان **root** کامپوننت رندر می‌شود.

---

## 2. Responsibilities

- تعریف همه بخش‌های بصری (parts) کامپوننت.
- نگاشت هر part به props مورد نیاز آن.
- تعیین روش رندر: متد سفارشی (`method`) یا رندر پیش‌فرض (`renderManagerComponent`).
- تولید attribute‌های پیش‌فرض (`data-part-name`, `id`) برای هر part.

---

## 3. Concepts

### 3.1. Interface_ComponentSchema

تعریف اینترفیس در `tools/schema/Interface_ComponentSchema.ts` (lines 8-14):

```typescript
export interface Interface_ComponentSchema<TSchema, TPropTypes> {
    part:              TSchema,
    method?:           (attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra: Record<string, any>) => CoreReactive.App,
    props?:            PropInterface<TPropTypes[keyof TPropTypes]>[],
    title?:            CoreObservable.App<string>,
    description?:      CoreObservable.App<string>,
}
```

| فیلد | تایپ | الزامی | توضیح |
|:---|:---|:---|:---|
| `part` | `TSchema` | بله | نام part — باید با کلید در `TSchemas` مطابقت داشته باشد |
| `method` | `(attrsDefault, data, extra) => CoreReactive.App` | خیر | متد رندر سفارشی — اگر تعریف شود، به‌جای `renderManagerComponent` استفاده می‌شود |
| `props` | `PropInterface[]` | خیر | لیست props که این part به آنها نیاز دارد |
| `title` | `Observable<string>` | خیر | عنوان نمایشی |
| `description` | `Observable<string>` | خیر | توضیحات |

### 3.2. Define_ComponentSchema

تابع helper در `tools/schema/Define_ComponentSchema.ts` (lines 6-8):

```typescript
export function Define_ComponentSchema<TSchema, TPropTypes>(
    props: { [K in SchemaType<TSchema>]: SchemaInterface<TSchemas[K], TPropTypes> }
): { [K in SchemaType<TSchema>]: SchemaInterface<TSchemas[K], TPropTypes> } {
    return props;
}
```

`Type_ComponentSchema<T>` برابر با `keyof T` است.

### 3.3. TPartAttrDefault

تایپ attribute‌های پیش‌فرض هر part در `basic/types/TPartAttrDefault.ts` (line 1):

```typescript
export type TPartAttrDefault = { "data-part-name": string, id: string }
```

این تایپ در `executeSchemaPart` برای هر part ساخته می‌شود:

```typescript
const attrsDefault: PartAttrDefault = {
    "data-part-name": partName,
    "id": this.getPartId(partName),
}
```

### 3.4. getPartId — فرمت ID یکتا

متد `getPartId` (lines 293-295):

```typescript
getPartId(partName: string): string {
    return `__component-${this._COMPONENT_NAME}__${partName}__${this._COMPONENT_RANDOM_ID}`
}
```

فرمت: `__component-{name}__{partName}__{randomId}`

مثال: `__component-Button__Main__3421`

---

## 4. Architecture

### 4.1. createComponentElement (lines 183-205)

این متد رندر را آغاز می‌کند. اولین entry در `_COMPONENT_SCHEMA` به‌عنوان root انتخاب می‌شود:

```typescript
private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new CoreObservable.Scope();

    // اولین Part تعریف‌شده در Schema به عنوان بخش اصلی (Root) کامپوننت رندر می‌شود
    const firstSchema = Object.values(this._COMPONENT_SCHEMA)[0] as SchemaInterface<any, any> | undefined;
    const rootPartName: string | undefined = firstSchema?.part as string | undefined;
    this._COMPONENT_CONTENT = this.executeSchemaPart(rootPartName as string)!;

    const selector = this.get("selector");
    if (selector) {
        const el = document.querySelector(selector)
        if (el) {
            const append = this.get("append");
            if (append) { el.append(this._COMPONENT_CONTENT.getElement()) }
            else { el.replaceChildren(this._COMPONENT_CONTENT.getElement()) }
        }
    }
}
```

### 4.2. executeSchemaPart (lines 214-242)

این متد یک part را بر اساس نام پیدا کرده و رندر می‌کند:

```typescript
executeSchemaPart(partName: string, extra: any = null) {
    let result = null;

    if (this._COMPONENT_SCHEMA) {
        Object.keys(this._COMPONENT_SCHEMA).forEach(key => {
            const itemPart = this._COMPONENT_SCHEMA[key as keyof typeof this._COMPONENT_SCHEMA];
            if (itemPart && itemPart.hasOwnProperty("part") && itemPart.part == partName) {
                if (itemPart.hasOwnProperty("props")) {
                    const props = itemPart.props;
                    const data = this.getSchemaPropsInPart(props);

                    const attrsDefault: PartAttrDefault = {
                        "data-part-name": partName,
                        "id": this.getPartId(partName),
                    }

                    if (itemPart.hasOwnProperty('method') && typeof itemPart.method == "function") {
                        result = itemPart.method.call(this, attrsDefault, data, extra);
                    } else {
                        result = this.renderManagerComponent(partName, attrsDefault, data, extra);
                    }
                }
            }
        })
    }

    return result;
}
```

### 4.3. جریان تصمیم‌گیری رندر

```
executeSchemaPart(partName)
    │
    ├── پیدا کردن entry در _COMPONENT_SCHEMA با part == partName
    │
    ├── استخراج props → getSchemaPropsInPart → Record<string, Observable>
    │
    ├── ساخت attrsDefault = { "data-part-name": partName, "id": getPartId(partName) }
    │
    ├── آیا method تعریف شده است؟
    │   ├── بله → itemPart.method.call(this, attrsDefault, data, extra)
    │   └── خیر → this.renderManagerComponent(partName, attrsDefault, data, extra)
    │
    └── return result (CoreReactive.App)
```

### 4.4. getSchemaPropsInPart (lines 244-252)

این متد Observableهای props مورد نیاز یک part را از `_COMPONENT_PROPS_BIND` استخراج می‌کند:

```typescript
getSchemaPropsInPart(props: PropInterface<any>[]) {
    let resultExp: Record<string, CoreObservable.App<any>> = {};
    for (const param of props) {
        if (param != null && param.hasOwnProperty("prop")) {
            resultExp[param.prop] = this._COMPONENT_PROPS_BIND[param.prop];
        }
    }
    return resultExp;
}
```

---

## 5. Rules

### MUST

- **MUST** هر entry در schema دارای فیلد `part` باشد.
- **MUST** مقدار `part` با کلید در تایپ `TSchemas` مطابقت داشته باشد.
- **MUST** اولین entry در `_COMPONENT_SCHEMA` به‌عنوان root part انتخاب شود — `createComponentElement` به این ترتیب وابسته است.
- **MUST** اگر `method` تعریف می‌شود، امضای آن دقیقاً `(attrsDefault, data, extra) => CoreReactive.App` باشد.

### MUST NOT

- **MUST NOT** `part` را تکراری تعریف کنید — `executeSchemaPart` اولین تطابق را استفاده می‌کند.
- **MUST NOT** `executeSchemaPart` را قبل از `renderComponent` فراخوانی کنید — `_COMPONENT_PROPS_BIND` هنوز پر نشده است.
- **MUST NOT** props در schema تعریف کنید که در `_COMPONENT_PATTERN` وجود ندارند — `getSchemaPropsInPart` مقدار `undefined` برمی‌گرداند.

### SHOULD

- **SHOULD** از نام‌های استاندارد برای parts استفاده کنید: `Component`, `Structure`, `Main`, `Main_Title`, `Main_Icon`, `Border`.
- **SHOULD** فقط props مورد نیاز هر part را در فیلد `props` لیست کنید — props اضافی performance را کاهش می‌دهند.
- **SHOULD** برای parts پیچیده، `method` سفارشی تعریف کنید تا کنترل دقیق‌تری روی رندر داشته باشید.

### SHOULD NOT

- **SHOULD NOT** همه props را در هر part لیست کنید — فقط props مرتبط با آن part.

### MAY

- **MAY** `method` را تعریف نکنید — در این صورت `renderManagerComponent` به‌عنوان fallback استفاده می‌شود.
- **MAY** `extra` را به `executeSchemaPart` پاس دهید تا داده‌های اضافی به method برسد.
- **MAY** `title` و `description` را برای مستندسازی تعریف کنید.

> برای قوانین کلی Framework به `../00-framework/AI_GUIDE_RULES.md` مراجعه کنید.

---

## 6. Lifecycle

1. **تعریف** — subclass `_COMPONENT_SCHEMA` را با `Define_ComponentSchema` مقداردهی می‌کند.
2. **ساخت عنصر** — `createComponentElement` اولین entry را به‌عنوان root انتخاب می‌کند.
3. **رندر root** — `executeSchemaPart(rootPartName)` فراخوانی می‌شود.
4. **استخراج props** — `getSchemaPropsInPart` Observableهای props را از `_COMPONENT_PROPS_BIND` می‌گیرد.
5. **تصمیم رندر** — اگر `method` وجود دارد، آن فراخوانی می‌شود؛ در غیر این صورت `renderManagerComponent`.
6. **نتیجه** — `CoreReactive.App` در `_COMPONENT_CONTENT` ذخیره می‌شود.
7. **Mount** — اگر `selector` prop وجود دارد، عنصر در DOM mount می‌شود.

---

## 7. API / Contract

### 7.1. executeSchemaPart

```typescript
executeSchemaPart(partName: string, extra: any = null): CoreReactive.App | null
```

| پارامتر | تایپ | توضیح |
|:---|:---|:---|
| `partName` | `string` | نام part برای رندر |
| `extra` | `any` (اختیاری) | داده‌های اضافی پاس‌شده به method |

**خروجی:** `CoreReactive.App` (عنصر رندر‌شده) یا `null` اگر part پیدا نشود.

### 7.2. getSchemaPropsInPart

```typescript
getSchemaPropsInPart(props: PropInterface<any>[]): Record<string, CoreObservable.App<any>>
```

### 7.3. getPartId

```typescript
getPartId(partName: string): string
// خروجی: __component-{name}__{partName}__{randomId}
```

### 7.4. امضای method در schema

```typescript
method: (
    attrsDefault: TPartAttrDefault,   // { "data-part-name": string, "id": string }
    data: Record<string, CoreObservable.App<any>>,  // Observableهای props
    extra: Record<string, any>        // داده‌های اضافی از executeSchemaPart
) => CoreReactive.App
```

---

## 8. Examples

### 8.1. تعریف Schema با Parts استاندارد

```typescript
type MySchemas = {
    Component:  "Component";
    Structure:  "Structure";
    Main:       "Main";
    Main_Title: "Main_Title";
    Main_Icon:  "Main_Icon";
    Border:     "Border";
};

_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Component: {
        part: "Component",
        props: [
            { prop: "selector", default: "" },
            { prop: "append", default: false },
        ],
    },
    Structure: {
        part: "Structure",
        props: [
            { prop: "directionRtl", default: false },
        ],
    },
    Main: {
        part: "Main",
        props: [
            { prop: "title", default: "" },
            { prop: "color", default: "#000000" },
        ],
    },
    Main_Title: {
        part: "Main_Title",
        props: [
            { prop: "title", default: "" },
        ],
    },
    Main_Icon: {
        part: "Main_Icon",
        props: [
            { prop: "icon", default: "" },
        ],
    },
    Border: {
        part: "Border",
        props: [
            { prop: "color", default: "#000000" },
        ],
    },
});
```

### 8.2. تعریف Part با Method سفارشی

```typescript
_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Main: {
        part: "Main",
        props: [
            { prop: "title", default: "" },
            { prop: "color", default: "#000000" },
        ],
        method: function(attrsDefault, data, extra) {
            // this به نمونه کامپوننت bind شده (method.call(this, ...))
            return CoreReactive.App.section({
                attrs: attrsDefault,
                children: [
                    `<div class="main" style="color: ${data.color.get()}">`,
                    data.title,  // Observable مستقیماً قابل استفاده
                    `</div>`,
                ]
            });
        },
    },
});
```

### 8.3. رندر یک Part از داخل Method

```typescript
// داخل method یک part، می‌توان partهای فرعی را رندر کرد
method: function(attrsDefault, data, extra) {
    const titlePart = this.executeSchemaPart("Main_Title");
    const iconPart = this.executeSchemaPart("Main_Icon");

    return CoreReactive.App.section({
        attrs: attrsDefault,
        children: [iconPart, titlePart],
    });
}
```

### 8.4. استفاده از TPartAttrDefault

```typescript
// attrsDefault به‌صورت خودکار ساخته می‌شود:
// {
//   "data-part-name": "Main",
//   "id": "__component-MyComponent__Main__3421"
// }

method: function(attrsDefault, data, extra) {
    return CoreReactive.App.section({
        attrs: {
            ...attrsDefault,
            "class": "my-component-main",
        },
        children: [...],
    });
}
```

---

## 9. Anti-Patterns

### ❌ Incorrect — اولین entry به‌عنوان root نیست

```typescript
// اولین entry "Border" است → به‌عنوان root رندر می‌شود!
_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Border:     { part: "Border", ... },     // ❌ این root می‌شود
    Component:  { part: "Component", ... },
    Main:       { part: "Main", ... },
});
```

### ✅ Correct — root اول قرار دهید

```typescript
_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Component:  { part: "Component", ... },  // ✅ root
    Structure:  { part: "Structure", ... },
    Main:       { part: "Main", ... },
    Border:     { part: "Border", ... },
});
```

### ❌ Incorrect — prop در schema که در PATTERN نیست

```typescript
_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Main: {
        part: "Main",
        props: [
            { prop: "unknownProp", default: "" },  // ❌ در _COMPONENT_PATTERN نیست
        ],
    },
});
// getSchemaPropsInPart مقدار undefined برمی‌گرداند
```

### ✅ Correct — همه props در PATTERN تعریف شوند

```typescript
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    title: { prop: "title", default: "" },
    color: { prop: "color", default: "#000000" },
});

_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Main: {
        part: "Main",
        props: [
            { prop: "title", default: "" },  // ✅ در PATTERN هست
            { prop: "color", default: "#000000" },
        ],
    },
});
```

### ❌ Incorrect — فراخوانی executeSchemaPart قبل از renderComponent

```typescript
const comp = new MyComponent("MyComponent", "id");
comp.executeSchemaPart("Main");  // ❌ _COMPONENT_PROPS_BIND خالی است
```

### ✅ Correct — ابتدا renderComponent

```typescript
const comp = new MyComponent("MyComponent", "id");
comp.renderComponent(config, methods);
// حالا executeSchemaPart قابل استفاده است (داخل methodهای schema)
```

---

## 10. Dependencies

| وابستگی | مسیر | نقش |
|:---|:---|:---|
| `CoreObservable` | `@/core_observable` | Observable برای data props |
| `CoreReactive` | `@/core_reactive` | ReactiveElement، section برای رندر |
| `Interface_ComponentSchema` | `tools/schema/Interface_ComponentSchema.ts` | اینترفیس schema |
| `Define_ComponentSchema` | `tools/schema/Define_ComponentSchema.ts` | تابع helper |
| `Type_ComponentSchema` | `tools/schema/Type_ComponentSchema.ts` | `keyof T` |
| `TPartAttrDefault` | `basic/types/TPartAttrDefault.ts` | تایپ attrs پیش‌فرض |
| `AbComponentConnector` | `basic/abstract/AbComponentConnector.ts` | `renderManagerComponent` fallback |
| `_COMPONENT_PROPS_BIND` | — | منبع Observableهای props |

> برای درک سیستم Reactive به `../01-systems/AI_GUIDE_OBSERVABLE.md` مراجعه کنید.

---

## 11. AI Instructions

- هنگام تعریف schema، ابتدا تایپ `TSchemas` با همه نام parts تعریف کنید.
- اولین entry همیشه باید root part (معمولاً `Component`) باشد.
- برای هر part، فقط props مورد نیاز آن را در فیلد `props` لیست کنید.
- اگر رندر پیچیده است، `method` سفارشی تعریف کنید — در غیر این صورت `renderManagerComponent` کافی است.
- داخل `method`، از `this.executeSchemaPart()` برای رندر partهای فرعی استفاده کنید.
- `attrsDefault` را همیشه در خروجی `section` قرار دهید تا `data-part-name` و `id` حفظ شوند.
- از نام‌های استاندارد parts استفاده کنید: `Component`, `Structure`, `Main`, `Main_Title`, `Main_Icon`, `Border`.

---

## 12. Related Guides

- [AI_GUIDE_COMPONENT_STRUCTURE.md](./AI_GUIDE_COMPONENT_STRUCTURE.md) — نمای کلی ساختار
- [AI_GUIDE_COMPONENT_PROPS.md](./AI_GUIDE_COMPONENT_PROPS.md) — تعریف props
- [AI_GUIDE_COMPONENT_METHODS.md](./AI_GUIDE_COMPONENT_METHODS.md) — تعریف callbacks
- [AI_GUIDE_COMPONENT_TEMPLATES.md](./AI_GUIDE_COMPONENT_TEMPLATES.md) — تعریف variants
- [AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — دیکشنری اصطلاحات
- [AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [AI_GUIDE_OBSERVABLE.md](../01-systems/AI_GUIDE_OBSERVABLE.md) — سیستم Observable

---

## 13. Source References

| فایل | خطوط | توضیح |
|:---|:---|:---|
| `src/framework/module_core/module_components/tools/schema/Interface_ComponentSchema.ts` | 8-14 | تعریف اینترفیس |
| `src/framework/module_core/module_components/tools/schema/Define_ComponentSchema.ts` | 6-8 | تابع helper |
| `src/framework/module_core/module_components/tools/schema/Type_ComponentSchema.ts` | 2 | `keyof TSchema` |
| `src/framework/module_core/module_components/basic/types/TPartAttrDefault.ts` | 1 | تایپ attrs پیش‌فرض |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 29 | تعریف فیلد `_COMPONENT_SCHEMA` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 183-205 | `createComponentElement` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 214-242 | `executeSchemaPart` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 244-252 | `getSchemaPropsInPart` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 293-295 | `getPartId` |
| `src/framework/module_core/module_components/basic/abstract/AbComponentConnector.ts` | 7-9 | `renderManagerComponent` fallback |
