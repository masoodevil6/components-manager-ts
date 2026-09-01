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

تعریف تایپ callback در `tools/method/Callback_ComponentMethod.ts`:

```typescript
export type Callback_ComponentMethod<
    TComponentArgs,
    TDataArgs,
    TThis = any
> = (
    this: TThis,
    event:            Event,
    dataArgs:         TDataArgs | null,
    componentArgs:    TComponentArgs | null,
) => void;
```

| پارامتر | تایپ | توضیح |
|:---|:---|:---|
| `this` | `TThis` (default: `any`) | Component instance — فقط در `function` کار می‌کند، نه arrow |
| `event` | `Event` | شی رویداد DOM |
| `dataArgs` | `TDataArgs \| null` | داده‌های اضافی پاس‌شده به `executeMethod` |
| `componentArgs` | `TComponentArgs \| null` | مقادیر props که به‌صورت خودکار از `_COMPONENT_PROPS_BIND` resolve شده‌اند |

**نکته `TThis = any`:** Default شدن `TThis` به `any` باعث می‌شود مصرف‌کنندگان فعلی که Generic مربوط به `this` را مشخص نمی‌کنند، دچار breaking change نشوند. در Componentهای جدید، مقدار دقیق `TThis` باید به Component instance متصل شود.

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

### 4.1. #getReadyComponentMethods

این متد در زمان `renderComponent` اجرا می‌شود و توابع پاس‌شده توسط مصرف‌کننده را به `destination` متصل می‌کند:

```typescript
// Plan 8.1.4: semantic key → _COMPONENT_METHODS[semanticKey].destination
// double loop حذف شد — lookup مستقیم با semantic key
#getReadyComponentMethods(methods: Record<string, MethodCallback<any , any>>) {
    for (const semanticKey in methods) {
        const fn = methods[semanticKey];
        if (fn != null && typeof fn === "function") {
            const methodMeta = this._COMPONENT_METHODS[semanticKey];
            if (methodMeta) {
                methodMeta.destination = fn;
            }
        }
    }
}
```

الگوریتم: برای هر semantic key در `methods` (پاس‌شده توسط مصرف‌کننده)،
مستقیماً `_COMPONENT_METHODS[semanticKey]` را پیدا کرده و `destination` را set می‌کند.

**Plan 8.1.4:** double loop حذف شد. lookup مستقیم با semantic key (O(n) به‌جای O(n²)).

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

- **MUST** نام کلید در `_COMPONENT_METHODS` (semantic key) با نام کلید در `methods` پاس‌شده به `renderComponent` مطابقت داشته باشد — تطبیق با `===` انجام می‌شود.
- **MUST** `destination` فقط از طریق `renderComponent(methods)` set شود — مستقیماً `destination` را دستکاری نکنید.
- **MUST** هر arg در `args` به یک prop موجود در `_COMPONENT_PATTERN` اشاره کند (`argProp.prop` باید در `_COMPONENT_PROPS_BIND` وجود داشته باشد).
- **MUST** semantic keys (CLICK, HOVER, ...) متعلق به Public API باشند — runtime `name` نباید به Public API نشت کند.
- **MUST** برای استفاده از `this` در callback از `function` استفاده شود — arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.

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

### 8.1. تعریف Methods (Plan 8.1.4)

```typescript
import {Props as MyProps} from "./Props";

export const Methods = {
    CLICK: {
        name:        "fn_onClick",
        description: "Callback when clicked",

        // componentArgs — prop reference‌ها
        args: {
            TITLE:    MyProps.prop_title,
            DISABLED: MyProps.prop_disabled,
        },

        // dataArgs — type تعریف‌شده برای داده‌های runtime
        dataArgs: {} as const,
    },
    FOCUS: {
        name:        "fn_onFocus",
        description: "Callback when focused",
        args: {},     // بدون args — componentArgs خالی خواهد بود
        dataArgs: {} as const,
    },
} as const;

// استخراج typeها
export type MethodsComponentArgs = {
    [K in keyof typeof Methods]: {
        [ArgKey in keyof typeof Methods[K]["args"]]:
            typeof Methods[K]["args"][ArgKey] extends { default: infer T } ? T : any;
    };
};

export type MethodsDataArgs = {
    [K in keyof typeof Methods]: typeof Methods[K]["dataArgs"];
};

export type MethodsConfigType<TThis = any> = {
    [K in keyof typeof Methods]?: (
        this: TThis,
        event: Event,
        dataArgs: MethodsDataArgs[K] | null,
        componentArgs: MethodsComponentArgs[K] | null,
    ) => void;
};
```

### 8.2. پاس Methods در زمان رندر (Category callable)

```typescript
const btn = UiCategory.UI.Simples.Button(
    { prop_title: "دکمه", prop_disabled: false },
    {
        CLICK: function(event, dataArgs, componentArgs) {
            console.log("clicked!", componentArgs?.TITLE);     // "دکمه"
            console.log("disabled?", componentArgs?.DISABLED); // false
            // this = ComponentButton instance (auto-bind)
            this.set("prop_title", "clicked!");
        },
        FOCUS: function(event, dataArgs, componentArgs) {
            console.log("focused!");
        },
    },
    { unique: TestStep.button },
);
```

### 8.3. اجرای Method از داخل Component

```typescript
// در ComponentButton.ts
override renderContentComponent(): CoreReactive.App {
    return ComponentStructureTrait.renderContent(
        this,
        () => CoreReactive.App.button({
            children: [this.get("prop_title")],
            on: {
                click: (event) => {
                    // اجرای method از داخل Component
                    this.executeMethod("CLICK", event, {});
                },
            },
        }),
    );
}
```

### 8.4. اجرای Method با dataArgs

```typescript
// فراخوانی با داده‌های اضافی
this.executeMethod("CLICK", event, { itemId: 42, source: "list" });

// در callback:
{
    CLICK: function(event, dataArgs, componentArgs) {
        console.log(dataArgs?.itemId);       // 42
        console.log(dataArgs?.source);       // "list"
        console.log(componentArgs?.TITLE);   // مقدار prop title
    }
}
```

### 8.5. emit با CoreEvent — ارتباط بین Componentها

```typescript
// در Component A (Icon) — ارسال request به Component B (Structure)
CLICK: function(event, dataArgs, componentArgs) {
    CoreEvent.App.request(
        CoreEvent.requestMap([
            [TestStep.structure, { action: "toggle" }],
        ]),
        TestStep.icon,  // source
    );
}

// در Component B (Structure) — emit handler
{
    unique: TestStep.structure,
    emit: function(request) {
        // this = Structure instance (auto-bind)
        if (request?.payload?.action === "toggle") {
            this.set("classList", ["bg-primary"]);
        }
        return { value: "ok", valid: true };
    },
}
```

---

## 9. Anti-Patterns

### ❌ Incorrect — عدم تطابق نام method (semantic key)

```typescript
// تعریف با semantic key "CLICK"
_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    CLICK: { name: "fn_onClick", args: { TITLE: { prop: "title", default: "" } } },
});

// پاس با نام متفاوت
comp.renderComponent(config, {
    handleClick: (event, dataArgs, componentArgs) => { ... },  // ❌ نام مطابقت ندارد
});
// destination هرگز set نمی‌شود → executeMethod("CLICK") نتیجه null می‌دهد
```

### ✅ Correct — semantic key دقیقاً مطابقت داشته باشد

```typescript
// تعریف با semantic key "CLICK"
_COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
    CLICK: { name: "fn_onClick", args: { TITLE: { prop: "title", default: "" } } },
});

comp.renderComponent(config, {
    CLICK: function(event, dataArgs, componentArgs) { ... },  // ✅
});
```

### ❌ Incorrect — runtime name در Public API

```typescript
// ❌ ممنوع — runtime name نباید در Public API نشت کند
UiCategory.UI.Simples.Button(
    { ... },
    {
        fn_onClick: (event, dataArgs, componentArgs) => { ... },  // ❌ implementation detail
    }
);
```

### ✅ Correct — semantic key در Public API

```typescript
// ✅ درست — semantic key
UiCategory.UI.Simples.Button(
    { ... },
    {
        CLICK: function(event, dataArgs, componentArgs) { ... },  // ✅ public API
    }
);
```

### ❌ Incorrect — arrow function در callback (اگر به this نیاز است)

```typescript
// ❌ ممنوع — arrow function با .call() نمی‌تواند this را تغییر دهد
{
    CLICK: (event, dataArgs, componentArgs) => {
        this.set("prop_title", "new");  // ❌ this = lexical scope
    }
}
```

### ✅ Correct — function معمولی

```typescript
// ✅ درست — function معمولی
{
    CLICK: function(event, dataArgs, componentArgs) {
        this.set("prop_title", "new");  // ✅ this = Component instance (auto-bind)
    }
}
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
