# AI Guide: Component Props

> **Audience:** همه AIهایی که props کامپوننت تعریف یا مصرف می‌کنند.
>
> **Purpose:** بررسی عمیق `_COMPONENT_PATTERN`، اینترفیس prop، نحوه resolution مقادیر و API دسترسی.
>
> **Level:** پایه — پیش‌نیاز مطالعه `./AI_GUIDE_COMPONENT_STRUCTURE.md`.
>
> **Status:** Official

---

## 1. Definition

`_COMPONENT_PATTERN` بخش تعریف ورودی‌های کامپوننت (props) است. هر prop با یک `Interface_ComponentProp` تعریف می‌شود که شامل نام، مقدار پیش‌فرض و متادیتای اختیاری است. در زمان رندر، مقادیر props در `_COMPONENT_PROPS_BIND` به‌صورت Observable ذخیره می‌شوند.

---

## 2. Responsibilities

- تعریف همه ورودی‌های قابل قبول کامپوننت.
- ارائه مقدار پیش‌فرض برای هر prop.
- فراهم کردن متادیتای نمایشی (`title`, `description`) برای ابزارهای документ‌سازی.
- تبدیل مقادیر raw به Observable در زمان رندر.

---

## 3. Concepts

### 3.1. Interface_ComponentProp

تعریف اینترفیس در `tools/prop/Interface_ComponentProp.ts` (lines 4-11):

```typescript
export interface Interface_ComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:            null;
    hasMultiTemplate?: boolean;
    title?:            CoreObservable.App<string>;
    description?:      CoreObservable.App<string>;
}
```

| فیلد | تایپ | الزامی | توضیح |
|:---|:---|:---|:---|
| `prop` | `string` | بله | نام property — باید با کلید در `TProp` مطابقت داشته باشد |
| `default` | `TPropTypes` | بله | مقدار پیش‌فرض در صورت نبود در config و templates |
| `value` | `null` | خیر | مقدار فعلی — توسط موتور رندر set می‌شود، دستی set نکنید |
| `hasMultiTemplate` | `boolean` | خیر | نشانگر اینکه این prop از چند template پشتیبانی می‌کند |
| `title` | `Observable<string>` | خیر | عنوان نمایشی برای ابزارهای مستندسازی |
| `description` | `Observable<string>` | خیر | توضیحات نمایشی |

### 3.2. Define_ComponentProp

تابع helper برای تعریف type-safe pattern در `tools/prop/Define_ComponentProp.ts` (lines 7-9):

```typescript
export function Define_ComponentProp<TPropTypes>(
    patterns: { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> }
): { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> } {
    return patterns;
}
```

`Type_ComponentProp<T>` برابر با `keyof T` است — یعنی کلیدهای تایپ `TProp` مستقیماً به‌عنوان کلیدهای pattern استفاده می‌شوند.

### 3.3. _COMPONENT_PROPS_BIND

فیلدی از نوع `Record<string, CoreObservable.App<any>>` (line 35) که Observableهای هر prop را نگه می‌دارد. این فیلد در `#getReadyUserConfigAndDefaultConfig` پر می‌شود و از طریق `set`, `get`, `getObservable` قابل دسترسی است.

---

## 4. Architecture

### 4.1. جریان Resolution مقادیر

متد `#getReadyUserConfigAndDefaultConfig` (lines 114-157) الگوریتم resolution مقادیر props را اجرا می‌کند:

```
برای هر prop در _COMPONENT_PATTERN:
    │
    ├── ۱. آیا prop در user config وجود دارد؟
    │       └── بله → value = config[propName]
    │
    ├── ۲. آیا در _COMPONENT_TEMPLATES وجود دارد؟
    │       └── برای هر template: اگر reference.prop == propName و value دارد → value = template.value
    │
    ├── ۳. هیچ‌کدام؟
    │       └── value = itemProp.default
    │
    └── ۴. wrap در Observable
            ├── اگر value از قبل Observable است → مستقیم ذخیره
            └── در غیر این صورت → new CoreObservable.App(value)
            └── ذخیره در _COMPONENT_PROPS_BIND[propName]
```

کد منبع:

```typescript
#getReadyUserConfigAndDefaultConfig(config: Record<string, any>): PropInterface<TProp>[] {
    const props = this._COMPONENT_PATTERN;
    if (config) {
        Object.keys(props).forEach(key => {
            const itemProp = props[key];
            if (itemProp && itemProp.hasOwnProperty("prop")) {
                const propName = itemProp.prop;

                let exist = false;
                let value = null;
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

                if (!exist && itemProp.hasOwnProperty("default")) {
                    value = itemProp.default;
                }

                itemProp.value = value;
                if (CoreObservable.App.isObservable(value)) {
                    this._COMPONENT_PROPS_BIND[propName] = value;
                } else {
                    this._COMPONENT_PROPS_BIND[propName] = new CoreObservable.App(value);
                }
            }
        })
    }
    return Object.values(props);
}
```

### 4.2. اولویت Resolution

```
User Config  >  Templates  >  Default
```

---

## 5. Rules

### MUST

- **MUST** هر prop دارای فیلد `prop` و `default` باشد — این دو فیلد اجباری هستند.
- **MUST** مقدار `prop` دقیقاً با کلید تایپ `TProp` مطابقت داشته باشد.
- **MUST** برای props که در reactive context استفاده می‌شوند، از `getObservable()` استفاده کنید نه `get()`.
- **MUST** `value` را به‌صورت دستی set نکنید — این فیلد توسط موتور رندر مدیریت می‌شود.

### MUST NOT

- **MUST NOT** از `get()` در contextهای reactive (computed، effect) استفاده کنید — تغییرات را track نمی‌کند. به‌جای آن از `getObservable()` استفاده کنید.
- **MUST NOT** `_COMPONENT_PROPS_BIND` را مستقیماً دستکاری کنید.
- **MUST NOT** prop بدون `default` تعریف کنید — در صورت نبود در config و templates، مقدار `null` می‌شود.

### SHOULD

- **SHOULD** از `as const` برای تایپ `TProp` استفاده کنید تا type inference دقیق‌تر باشد.
- **SHOULD** `title` و `description` را برای props قابل تنظیم توسط کاربر نهایی تعریف کنید.
- **SHOULD** `hasMultiTemplate: true` را برای props که از چندین template پشتیبانی می‌کنند تنظیم کنید.

### SHOULD NOT

- **SHOULD NOT** تعداد props را بیش از حد افزایش دهید — هر prop یک Observable ایجاد می‌کند.

### MAY

- **MAY** یک prop را به‌صورت مستقیم Observable پاس دهید — موتور تشخیص می‌دهد و دوباره wrap نمی‌کند.

> برای قوانین کلی Framework به `../00-framework/AI_GUIDE_RULES.md` مراجعه کنید.

---

## 6. Lifecycle

1. **تعریف** — subclass `_COMPONENT_PATTERN` را با `Define_ComponentProp` مقداردهی می‌کند.
2. **Resolution** — `#getReadyUserConfigAndDefaultConfig(config)` در زمان `renderComponent` اجرا می‌شود.
3. **Binding** — هر prop در `_COMPONENT_PROPS_BIND` به‌صورت Observable ذخیره می‌شود.
4. **دسترسی** — پس از رندر، `set`/`get`/`getObservable` قابل استفاده هستند.
5. **Re-render** — هنگام re-render، Scope dispose می‌شود ولی `_COMPONENT_PROPS_BIND` دوباره ساخته می‌شود.

---

## 7. API / Contract

### 7.1. set (lines 271-275)

```typescript
set(propName: string, propValue: any) {
    if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
        this._COMPONENT_PROPS_BIND[propName].set(propValue);
    }
}
```

مقدار Observable یک prop را به‌روزرسانی می‌کند. اگر prop وجود نداشته باشد، silently نادیده گرفته می‌شود.

### 7.2. get (lines 276-281)

```typescript
get(propName: string) {
    if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
        return this._COMPONENT_PROPS_BIND[propName].get();
    }
    return null;
}
```

مقدار فعلی prop را برمی‌گرداند. **غیر reactive** — در context reactive استفاده نکنید.

### 7.3. getObservable (lines 282-287)

```typescript
getObservable(propName: string) {
    if (this._COMPONENT_PROPS_BIND.hasOwnProperty(propName)) {
        return this._COMPONENT_PROPS_BIND[propName];
    }
    return null;
}
```

Observable یک prop را برمی‌گرداند. **reactive** — در contextهای reactive استفاده کنید.

---

## 8. Examples

### 8.1. تعریف Pattern

```typescript
type MyProps = {
    title: string;
    color: string;
    disabled: boolean;
    directionRtl: boolean;
};

_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    title: {
        prop: "title",
        default: "",
        hasMultiTemplate: true,
        title: Observable.App("عنوان"),
        description: Observable.App("عنوان نمایشی کامپوننت"),
    },
    color: {
        prop: "color",
        default: "#000000",
        title: Observable.App("رنگ"),
    },
    disabled: {
        prop: "disabled",
        default: false,
    },
    directionRtl: {
        prop: "directionRtl",
        default: false,
    },
});
```

### 8.2. پاس config در زمان رندر

```typescript
const comp = new MyComponent("MyComponent", "my-id");
comp.renderComponent(
    { title: "سلام دنیا", color: "#ff0000" },
    methods
);
// disabled → default (false)
// directionRtl → توسط connectedCallback از config سراسری set می‌شود
```

### 8.3. دسترسی به props پس از رندر

```typescript
// غیر reactive — برای خواندن یک‌باره
const currentTitle = comp.get("title");

// reactive — در computed/effect
const titleObs = comp.getObservable("title");
CoreObservable.App.computed((title) => {
    console.log("title changed:", title);
}, [titleObs], comp.getScope());

// به‌روزرسانی
comp.set("title", "عنوان جدید");
```

### 8.4. پاس مستقیم Observable

```typescript
const sharedColor = new Observable.App("#00ff00");
comp.renderComponent(
    { color: sharedColor },
    methods
);
// موتور تشخیص می‌دهد که value از نوع Observable است و دوباره wrap نمی‌کند
// تغییر sharedColor مستقیماً در کامپوننت反映 می‌شود
```

---

## 9. Anti-Patterns

### ❌ Incorrect — استفاده از `get()` در context reactive

```typescript
// get() تغییرات را track نمی‌کند
CoreObservable.App.computed(() => {
    const title = this.get("title");  // ❌ هیچ‌گاه به‌روز نمی‌شود
    return title.toUpperCase();
}, [], this.getScope());
```

### ✅ Correct — استفاده از `getObservable()` در context reactive

```typescript
const titleObs = this.getObservable("title");
CoreObservable.App.computed((title) => {
    return title.toUpperCase();  // ✅ به‌طور خودکار به‌روز می‌شود
}, [titleObs], this.getScope());
```

### ❌ Incorrect — prop بدون default

```typescript
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    title: { prop: "title" },  // ❌ default وجود ندارد
});
```

### ✅ Correct — همیشه default تعریف کنید

```typescript
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    title: { prop: "title", default: "" },  // ✅
});
```

### ❌ Incorrect — دستکاری مستقیم `_COMPONENT_PROPS_BIND`

```typescript
this._COMPONENT_PROPS_BIND["title"] = new Observable.App("wrong");
```

### ✅ Correct — استفاده از `set`

```typescript
this.set("title", "correct");
```

### ❌ Incorrect — set دستی فیلد `value`

```typescript
this._COMPONENT_PATTERN.title.value = "manual";  // ❌ توسط موتور overwrite می‌شود
```

---

## 10. Dependencies

| وابستگی | مسیر | نقش |
|:---|:---|:---|
| `CoreObservable` | `@/core_observable` | Observable، App، isObservable |
| `Interface_ComponentProp` | `tools/prop/Interface_ComponentProp.ts` | اینترفیس prop |
| `Define_ComponentProp` | `tools/prop/Define_ComponentProp.ts` | تابع helper تعریف |
| `Type_ComponentProp` | `tools/prop/Type_ComponentProp.ts` | `keyof TProp` |
| `_COMPONENT_TEMPLATES` | — | منبع fallback برای مقادیر props |

> برای درک Observable به `../01-systems/AI_GUIDE_OBSERVABLE.md` مراجعه کنید.

---

## 11. AI Instructions

- هنگام تعریف props، ابتدا تایپ `TProp` را با همه کلیدها تعریف کنید.
- برای هر کلید در `TProp`، یک entry در `Define_ComponentProp` با `prop` و `default` ایجاد کنید.
- در کد reactive (computed، effect) همیشه از `getObservable()` استفاده کنید.
- در کد غیر reactive (event handler، یک‌باره) از `get()` استفاده کنید.
- اگر prop باید از templates مقدار بگیرد، مطمئن شوید template با `reference.prop` مطابقت دارد (به `./AI_GUIDE_COMPONENT_TEMPLATES.md` مراجعه کنید).

---

## 12. Related Guides

- [AI_GUIDE_COMPONENT_STRUCTURE.md](./AI_GUIDE_COMPONENT_STRUCTURE.md) — نمای کلی ساختار
- [AI_GUIDE_COMPONENT_TEMPLATES.md](./AI_GUIDE_COMPONENT_TEMPLATES.md) — نحوه fallback از templates
- [AI_GUIDE_COMPONENT_SCHEMA.md](./AI_GUIDE_COMPONENT_SCHEMA.md) — نحوه استفاده props در schema parts
- [AI_GUIDE_COMPONENT_METHODS.md](./AI_GUIDE_COMPONENT_METHODS.md) — نحوه استفاده props به‌عنوان method args
- [AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — دیکشنری اصطلاحات
- [AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [AI_GUIDE_OBSERVABLE.md](../01-systems/AI_GUIDE_OBSERVABLE.md) — سیستم Observable

---

## 13. Source References

| فایل | خطوط | توضیح |
|:---|:---|:---|
| `src/framework/module_core/module_components/tools/prop/Interface_ComponentProp.ts` | 4-11 | تعریف اینترفیس |
| `src/framework/module_core/module_components/tools/prop/Define_ComponentProp.ts` | 7-9 | تابع helper |
| `src/framework/module_core/module_components/tools/prop/Type_ComponentProp.ts` | 3 | `keyof TPropTypes` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 27 | تعریف فیلد `_COMPONENT_PATTERN` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 35 | تعریف فیلد `_COMPONENT_PROPS_BIND` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 114-157 | `#getReadyUserConfigAndDefaultConfig` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 271-287 | `set` / `get` / `getObservable` |
