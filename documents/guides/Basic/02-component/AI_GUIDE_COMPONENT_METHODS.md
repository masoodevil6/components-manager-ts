# AI Guide: Component Methods

> **Audience:** همه AIهایی که callbackها و رویدادهای کامپوننت تعریف یا اجرا می‌کنند.
>
> **Purpose:** بررسی عمیق `_COMPONENT_METHODS`، اینترفیس method، signature callback و نحوه resolution args.
>
> **Level:** پایه — پیش‌نیاز مطالعه `./AI_GUIDE_COMPONENT_STRUCTURE.md` و `./AI_GUIDE_COMPONENT_PROPS.md`.
>
> **Status:** Official

---

## 1. Definition

`_COMPONENT_METHODS` بخش تعریف callbackها و عملیات کامپوننت است. هر method دارای args اختیاری (که به props کامپوننت متصل می‌شوند) و یک `destination` (تابع اجرایی) است. در زمان رندر، `destination` با توابع پاس‌شده توسط مصرف‌کننده پر می‌شود و از طریق `executeMethod` قابل اجراست.

---

## 2. Responsibilities

- تعریف همه callbackهای قابل قبول کامپوننت.
- نگاشت args هر method به props کامپوننت (`_COMPONENT_PROPS_BIND`).
- اتصال توابع مصرف‌کننده به `destination` در زمان رندر.
- اجرای methodها با resolve خودکار componentArgs.

---

## 3. Concepts

### 3.1. Interface_ComponentMethod

تعریف اینترفیس در `tools/method/Interface_ComponentMethod.ts` (lines 7-12):

```typescript
export interface Interface_ComponentMethod<TPropTypes> {
    args?:             Record<string, PropInterface<TPropTypes[keyof TPropTypes]>>;
    title?:            CoreObservable.App<string>;
    description?:      CoreObservable.App<string>;
    destination?:      MethodCallback<any, any>;
}
```

| فیلد | تایپ | الزامی | توضیح |
|:---|:---|:---|:---|
| `args` | `Record<string, PropInterface>` | خیر | نگاشت نام arg به prop کامپوننت — در زمان اجرا resolve می‌شود |
| `title` | `Observable<string>` | خیر | عنوان نمایشی |
| `description` | `Observable<string>` | خیر | توضیحات |
| `destination` | `MethodCallback<any, any>` | خیر | تابع اجرایی — در زمان رندر توسط مصرف‌کننده set می‌شود |

### 3.2. Callback_ComponentMethod

تعریف تایپ callback در `tools/method/Callback_ComponentMethod.ts` (lines 3-7):

```typescript
export type Callback_ComponentMethod<TComponentArgs, TDataArgs> = (
    event:            Event,
    dataArgs:         TDataArgs | null,
    componentArgs:    TComponentArgs | null,
) => void;
```

| پارامتر | تایپ | توضیح |
|:---|:---|:---|
| `event` | `Event` | شی رویداد DOM |
| `dataArgs` | `TDataArgs \| null` | داده‌های اضافی پاس‌شده به `executeMethod` |
| `componentArgs` | `TComponentArgs \| null` | مقادیر props که به‌صورت خودکار از `_COMPONENT_PROPS_BIND` resolve شده‌اند |

### 3.3. Define_ComponentMethod

تابع helper در `tools/method/Define_ComponentMethod.ts` (lines 6-8):

```typescript
export function Define_ComponentMethod<TMethod, TPropTypes>(
    methods: { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> }
): { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> } {
    return methods;
}
```

`Type_ComponentMethod<T>` برابر با `keyof T` است.

---

## 4. Architecture

### 4.1. #getReadyComponentMethods (lines 163-173)

این متد در زمان `renderComponent` اجرا می‌شود و توابع پاس‌شده توسط مصرف‌کننده را به `destination` متصل می‌کند:

```typescript
#getReadyComponentMethods(methods: Record<string, MethodCallback<any, any>>) {
    for (const keyMethod in this._COMPONENT_METHODS) {
        for (const methodName in methods) {
            const fn = methods[keyMethod];
            if (keyMethod == methodName && fn != null && typeof fn === "function") {
                const itemMethod: MethodInterface<TProp> = this._COMPONENT_METHODS[keyMethod];
                itemMethod.destination = fn;
            }
        }
    }
}
```

الگوریتم: برای هر کلید در `_COMPONENT_METHODS`، کلید متناظر در `methods` (پاس‌شده توسط مصرف‌کننده) را پیدا کرده و `destination` را set می‌کند.

### 4.2. executeMethod (lines 301-307)

نقطه اجرای method:

```typescript
executeMethod(methodName: string, event: Event, dataArgs: Record<string, any> | null = null) {
    const [fn, componentArgs] = this.#executeMethod_getMethodData(methodName);
    if (typeof fn === "function") {
        return fn.call(this, event, dataArgs, componentArgs);
    }
    return null;
}
```

### 4.3. #executeMethod_getMethodData (lines 309-322)

این متد private، method را پیدا کرده و componentArgs را resolve می‌کند:

```typescript
#executeMethod_getMethodData(methodName: string): [Function | null, Record<string, any>] {
    let fn: Function | null = null;
    let argsObject: Record<string, any> = {};
    if (this._COMPONENT_METHODS != null) {
        Object.keys(this._COMPONENT_METHODS).forEach(key => {
            const methodData = this._COMPONENT_METHODS[key];
            if (key === methodName && typeof methodData.destination === "function") {
                fn = methodData.destination;
                argsObject = this.#executeMethod_getMethodData_getArgs(methodData.args || {});
            }
        });
    }
    return [fn, argsObject];
}
```

### 4.4. #executeMethod_getMethodData_getArgs (lines 324-333)

این متد مقادیر props را از `_COMPONENT_PROPS_BIND` استخراج می‌کند:

```typescript
#executeMethod_getMethodData_getArgs(args: Record<string, PropInterface<TProp>>): Record<string, any> {
    const argsExp: Record<string, any> = {};
    Object.keys(args).forEach(keyArg => {
        const argProp = args[keyArg];
        if (argProp != null && this._COMPONENT_PROPS_BIND.hasOwnProperty(argProp.prop)) {
            argsExp[keyArg] = this._COMPONENT_PROPS_BIND[argProp.prop].get();
        }
    });
    return argsExp;
}
```

### 4.5. جریان کامل اجرای Method

```
executeMethod(methodName, event, dataArgs)
    │
    ├── #executeMethod_getMethodData(methodName)
    │   ├── پیدا کردن method در _COMPONENT_METHODS با key == methodName
    │   ├── بررسی destination (آیا function است؟)
    │   └── #executeMethod_getMethodData_getArgs(methodData.args)
    │       └── برای هر arg:
    │           ├── argProp.prop را از _COMPONENT_PROPS_BIND پیدا کن
    │           └── argsExp[keyArg] = observable.get()  (مقدار فعلی، غیر reactive)
    │
    ├── fn.call(this, event, dataArgs, componentArgs)
    │
    └── return نتیجه یا null
```

---

## 5. Rules

### MUST

- **MUST** نام کلید در `_COMPONENT_METHODS` با نام کلید در `methods` پاس‌شده به `renderComponent` مطابقت داشته باشد — تطبیق با `==` انجام می‌شود.
- **MUST** `destination` فقط از طریق `renderComponent(methods)` set شود — مستقیماً `destination` را دستکاری نکنید.
- **MUST** هر arg در `args` به یک prop موجود در `_COMPONENT_PATTERN` اشاره کند (`argProp.prop` باید در `_COMPONENT_PROPS_BIND` وجود داشته باشد).

### MUST NOT

- **MUST NOT** `executeMethod` را قبل از `renderComponent` فراخوانی کنید — `destination` هنوز set نشده است.
- **MUST NOT** `destination` را به‌صورت دستی set کنید — فقط `#getReadyComponentMethods` باید این کار را بکند.
- **MUST NOT** در `args` به propهایی ارجاع دهید که در `_COMPONENT_PATTERN` تعریف نشده‌اند — مقدار `undefined` در componentArgs قرار می‌گیرد.

### SHOULD

- **SHOULD** برای فراخوانی داخلی methodها از `executeMethod` استفاده کنید تا componentArgs به‌صورت خودکار resolve شوند.
- **SHOULD** تایپ `TMethods` را با signature دقیق callback تعریف کنید تا type safety حفظ شود.
- **SHOULD** `args` را فقط برای propهایی تعریف کنید که callback به آنها نیاز دارد.

### SHOULD NOT

- **SHOULD NOT` logic پیچیده را در `destination` قرار دهید — destination باید خلاصه باشد و logic اصلی در متدهای کلاس باشد.

### MAY

- **MAY** `args` را تعریف نکنید — در این صورت `componentArgs` یک شی خالی `{}` خواهد بود.
- **MAY** `dataArgs` را به `executeMethod` پاس ندهید — پیش‌فرض `null` است.

> برای قوانین کلی Framework به `../00-framework/AI_GUIDE_RULES.md` مراجعه کنید.

---

## 6. Lifecycle

1. **تعریف** — subclass `_COMPONENT_METHODS` را با `Define_ComponentMethod` مقداردهی می‌کند (بدون `destination`).
2. **اتصال** — `#getReadyComponentMethods(methods)` در زمان `renderComponent` اجرا می‌شود و `destination` را set می‌کند.
3. **اجرا** — `executeMethod(methodName, event, dataArgs)` در زمان رویداد فراخوانی می‌شود.
4. **Resolution** — `#executeMethod_getMethodData_getArgs` مقادیر props را از `_COMPONENT_PROPS_BIND` می‌خواند.
5. **فراخوانی** — `fn.call(this, event, dataArgs, componentArgs)` اجرا می‌شود.

---

## 7. API / Contract

### 7.1. executeMethod

```typescript
executeMethod(
    methodName: string,
    event: Event,
    dataArgs: Record<string, any> | null = null
): any | null
```

| پارامتر | تایپ | توضیح |
|:---|:---|:---|
| `methodName` | `string` | نام method در `_COMPONENT_METHODS` |
| `event` | `Event` | شی رویداد DOM |
| `dataArgs` | `Record<string, any> \| null` | داده‌های اضافی (اختیاری) |

**خروجی:** نتیجه `destination` یا `null` اگر method پیدا نشود یا `destination` تنظیم نشده باشد.

### 7.2. امضای Callback_ComponentMethod

```typescript
type Callback_ComponentMethod<TComponentArgs, TDataArgs> = (
    event:         Event,
    dataArgs:      TDataArgs | null,
    componentArgs: TComponentArgs | null,
) => void;
```

### 7.3. ساختار args در Interface_ComponentMethod

```typescript
args: Record<string, PropInterface<TPropTypes[keyof TPropTypes]>>
// مثال:
args: {
    title: { prop: "title", default: "" },
    color: { prop: "color", default: "#000000" },
}
// در زمان اجرا تبدیل می‌شود به:
// componentArgs = { title: "value from _COMPONENT_PROPS_BIND", color: "#ff0000" }
```

---

## 8. Examples

### 8.1. تعریف Methods

```typescript
type MyMethods = {
    onClick: (event: Event, dataArgs: null, componentArgs: { title: string; disabled: boolean }) => void;
    onFocus: (event: Event, dataArgs: null, componentArgs: null) => void;
};

_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    onClick: {
        args: {
            title:    { prop: "title",    default: "" },
            disabled: { prop: "disabled", default: false },
        },
        title: Observable.App("کلیک"),
        description: Observable.App("رویداد کلیک کامپوننت"),
    },
    onFocus: {
        // بدون args — componentArgs خالی خواهد بود
        title: Observable.App("فوکوس"),
    },
});
```

### 8.2. پاس Methods در زمان رندر

```typescript
const comp = new MyComponent("MyComponent", "my-id");
comp.renderComponent(
    { title: "دکمه", disabled: false },
    {
        onClick: (event, dataArgs, componentArgs) => {
            console.log("clicked!", componentArgs.title);  // "دکمه"
            console.log("disabled?", componentArgs.disabled);  // false
        },
        onFocus: (event, dataArgs, componentArgs) => {
            console.log("focused!");
        },
    }
);
```

### 8.3. اجرای Method از داخل Schema Method

```typescript
_COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
    Main: {
        part: "Main",
        props: [{ prop: "title", default: "" }],
        method: function(attrsDefault, data, extra) {
            return CoreReactive.App.section({
                attrs: { ...attrsDefault, "class": "main" },
                events: {
                    click: (event) => {
                        // اجرای method از داخل schema
                        this.executeMethod("onClick", event, { source: "main" });
                    },
                },
                children: [data.title],
            });
        },
    },
});
```

### 8.4. اجرای Method با dataArgs

```typescript
// فراخوانی با داده‌های اضافی
this.executeMethod("onClick", event, { itemId: 42, source: "list" });

// در destination:
{
    onClick: (event, dataArgs, componentArgs) => {
        console.log(dataArgs.itemId);       // 42
        console.log(dataArgs.source);       // "list"
        console.log(componentArgs.title);   // مقدار prop title
    }
}
```

---

## 9. Anti-Patterns

### ❌ Incorrect — عدم تطابق نام method

```typescript
// تعریف با نام "onClick"
_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    onClick: { args: { title: { prop: "title", default: "" } } },
});

// پاس با نام متفاوت
comp.renderComponent(config, {
    handleClick: (event, dataArgs, componentArgs) => { ... },  // ❌ نام مطابقت ندارد
});
// destination هرگز set نمی‌شود → executeMethod("onClick") نتیجه null می‌دهد
```

### ✅ Correct — نام دقیقاً مطابقت داشته باشد

```typescript
_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    onClick: { args: { title: { prop: "title", default: "" } } },
});

comp.renderComponent(config, {
    onClick: (event, dataArgs, componentArgs) => { ... },  // ✅
});
```

### ❌ Incorrect — arg به prop ناموجود

```typescript
_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    onClick: {
        args: {
            unknownProp: { prop: "unknownProp", default: "" },  // ❌ در PATTERN نیست
        },
    },
});
// componentArgs.unknownProp هرگز set نمی‌شود
```

### ✅ Correct — arg به prop موجود

```typescript
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
    title: { prop: "title", default: "" },
});

_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    onClick: {
        args: {
            title: { prop: "title", default: "" },  // ✅ در PATTERN هست
        },
    },
});
```

### ❌ Incorrect — set دستی destination

```typescript
this._COMPONENT_METHODS.onClick.destination = (event, dataArgs, componentArgs) => { ... };
// ❌ توسط #getReadyComponentMethods overwrite می‌شود
```

### ✅ Correct — پاس از طریق renderComponent

```typescript
comp.renderComponent(config, {
    onClick: (event, dataArgs, componentArgs) => { ... },  // ✅
});
```

### ❌ Incorrect — فراخوانی executeMethod قبل از renderComponent

```typescript
const comp = new MyComponent("MyComponent", "id");
comp.executeMethod("onClick", event);  // ❌ destination null است
```

### ✅ Correct — ابتدا renderComponent

```typescript
const comp = new MyComponent("MyComponent", "id");
comp.renderComponent(config, methods);
comp.executeMethod("onClick", event);  // ✅
```

---

## 10. Dependencies

| وابستگی | مسیر | نقش |
|:---|:---|:---|
| `CoreObservable` | `@/core_observable` | Observable برای title/description |
| `Interface_ComponentMethod` | `tools/method/Interface_ComponentMethod.ts` | اینترفیس method |
| `Callback_ComponentMethod` | `tools/method/Callback_ComponentMethod.ts` | تایپ callback |
| `Define_ComponentMethod` | `tools/method/Define_ComponentMethod.ts` | تابع helper |
| `Type_ComponentMethod` | `tools/method/Type_ComponentMethod.ts` | `keyof T` |
| `Interface_ComponentProp` | `tools/prop/Interface_ComponentProp.ts` | برای args |
| `_COMPONENT_PROPS_BIND` | — | منبع resolve componentArgs |

> برای درک props به `./AI_GUIDE_COMPONENT_PROPS.md` مراجعه کنید.

---

## 11. AI Instructions

- هنگام تعریف methods، تایپ `TMethods` را با signature دقیق `(event, dataArgs, componentArgs) => void` تعریف کنید.
- نام کلیدها در `_COMPONENT_METHODS` باید دقیقاً با نام کلیدهایی که مصرف‌کننده به `renderComponent` پاس می‌کند مطابقت داشته باشد.
- در `args`، فقط به propهایی ارجاع دهید که در `_COMPONENT_PATTERN` تعریف شده‌اند.
- برای اجرای method از داخل schema method یا event handler، از `this.executeMethod()` استفاده کنید.
- `componentArgs` مقادیر فعلی props را به‌صورت غیر reactive (`get()`) دریافت می‌کند — برای مقادیر reactive از `getObservable()` در callback استفاده کنید.
- `destination` را هرگز به‌صورت دستی set نکنید.

---

## 12. Related Guides

- [AI_GUIDE_COMPONENT_STRUCTURE.md](./AI_GUIDE_COMPONENT_STRUCTURE.md) — نمای کلی ساختار
- [AI_GUIDE_COMPONENT_PROPS.md](./AI_GUIDE_COMPONENT_PROPS.md) — تعریف props (منبع componentArgs)
- [AI_GUIDE_COMPONENT_SCHEMA.md](./AI_GUIDE_COMPONENT_SCHEMA.md) — تعریف parts (محل فراخوانی methods)
- [AI_GUIDE_COMPONENT_TEMPLATES.md](./AI_GUIDE_COMPONENT_TEMPLATES.md) — تعریف variants
- [AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — دیکشنری اصطلاحات
- [AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [AI_GUIDE_OBSERVABLE.md](../01-systems/AI_GUIDE_OBSERVABLE.md) — سیستم Observable

---

## 13. Source References

| فایل | خطوط | توضیح |
|:---|:---|:---|
| `src/framework/module_core/module_components/tools/method/Interface_ComponentMethod.ts` | 7-12 | تعریف اینترفیس |
| `src/framework/module_core/module_components/tools/method/Callback_ComponentMethod.ts` | 3-7 | تایپ callback |
| `src/framework/module_core/module_components/tools/method/Define_ComponentMethod.ts` | 6-8 | تابع helper |
| `src/framework/module_core/module_components/tools/method/Type_ComponentMethod.ts` | 1 | `keyof TMethod` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 31 | تعریف فیلد `_COMPONENT_METHODS` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 163-173 | `#getReadyComponentMethods` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 301-307 | `executeMethod` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 309-322 | `#executeMethod_getMethodData` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 324-333 | `#executeMethod_getMethodData_getArgs` |
