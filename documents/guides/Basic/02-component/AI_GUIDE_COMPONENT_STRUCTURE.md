# AI Guide: Component Structure

> **Audience:** همه AIهایی که کامپوننت‌های جدید می‌سازند یا کامپوننت‌های موجود را تغییر می‌دهند.
>
> **Purpose:** ارائه نمای کلی ساختار داخلی کامپوننت، سلسله‌مراتب چهار بخش تعریفی و چرخه حیات رندر.
>
> **Level:** پایه — پیش‌نیاز مطالعه `../00-framework/AI_GUIDE_TERMINOLOGY.md` و `../00-framework/AI_GUIDE_RULES.md`.
>
> **Status:** Official

---

## 1. Definition

هر کامپوننت در این Framework کلاسی است که از `ClComponentBase` (alias: `CoreComponents.App`) ارث‌بری می‌کند و چهار بخش تعریفی `_COMPONENT_*` را مقداردهی می‌کند. این چهار بخش به‌ترتیب ورودی‌ها، بخش‌های بصری، callbackها و variantهای کامپوننت را تعریف می‌کنند.

> **Note (Plan 8.1.4):** Componentها از `CoreComponents.App` (یعنی `ClComponentBase`) ارث می‌برند، **نه** از `ComponentStructure`. `ComponentStructureTrait` در پوشه `traits/` قرار دارد و ۷ prop پایه آن (`ComponentStructureTrait.props`) در `_COMPONENT_PATTERN` کامپوننت‌ها spread می‌شوند. متد `renderContent` این Trait برای ساخت `ComponentStructure` به‌عنوان فرزند استفاده می‌شود.

کلاس پایه در مسیر زیر قرار دارد:

```
src/framework/module_core/module_components/basic/class/ClComponentBase.ts
```

`ClComponentBase` یک Generic Class با چهار پارامتر تایپ است:

```typescript
export class ClComponentBase<
    TProp extends Record<string, any>,
    TSchemas,
    TTemplate,
    TMethods extends Record<string, MethodCallback<any, any>>
> extends ComponentConnector
```

این کلاس از `AbComponentConnector` (alias شده به `ComponentConnector`) ارث‌بری می‌کند که متد انتزاعی `renderManagerComponent` را برای رندر پیش‌فرض فراهم می‌سازد.

> برای تعریف رسمی واژگان به `../00-framework/AI_GUIDE_TERMINOLOGY.md` مراجعه کنید.

---

## 2. Responsibilities

- فراهم کردن زیرساخت رندرینگ برای همه کامپوننت‌ها.
- مدیریت چرخه حیات: ساخت → آماده‌سازی props → آماده‌سازی methods → ساخت عنصر DOM → bind events.
- نگهداری Observableهای هر prop در `_COMPONENT_PROPS_BIND`.
- مدیریت Scope رندر (`_renderScope`) برای پاکسازی منابع هنگام re-render.
- ارائه API یکپارچه برای دسترسی به props (`set`, `get`, `getObservable`) و methods (`executeMethod`).

---

## 3. Concepts

### 3.1. سلسله‌مراتب چهار بخش تعریفی

هر کامپوننت چهار فیلد اصلی با پیشوند `_COMPONENT_` دارد:

```
ClComponentBase
    ├── _COMPONENT_PATTERN    (Props)       — تعریف ورودی‌های کامپوننت
    ├── _COMPONENT_SCHEMA     (Parts)       — تعریف بخش‌های بصری (DOM parts)
    ├── _COMPONENT_METHODS    (Callbacks)   — تعریف رویدادها و عملیات
    └── _COMPONENT_TEMPLATES  (Variants)    — تعریف variantهای نمایشی
```

تعریف تایپی این فیلدها در `ClComponentBase.ts` (lines 27-33):

```typescript
_COMPONENT_PATTERN!   : { [K in PropType<TProp>]?:         PropInterface<TProp[K]> }
_COMPONENT_SCHEMA!    : { [K in SchemaType<TSchemas>]:     SchemaInterface<TSchemas[K], TProp> }
_COMPONENT_METHODS!   : { [K in MethodType<TMethods>]:     MethodInterface<TProp> }
_COMPONENT_TEMPLATES! : { [K in TemplateType<TTemplate>]?: TemplateInterface<TProp> }
```

### 3.2. فیلدهای زیرساختی

علاوه بر چهار بخش اصلی، فیلدهای زیر نیز در کلاس تعریف شده‌اند (lines 25-48):

| فیلد | تایپ | توضیح |
|:---|:---|:---|
| `_renderScope` | `CoreObservable.Scope` (private) | Scope رندر فعلی — هنگام re-render dispose می‌شود |
| `_COMPONENT_PROPS_BIND` | `Record<string, CoreObservable.App<any>>` | Observableهای هر prop |
| `_COMPONENT_CONTENT` | `CoreReactive.App` | عنصر رندر‌شده (ReactiveElement) |
| `_COMPONENT_NAME` | `string` | نام کامپوننت |
| `_COMPONENT_ID` | `string \| null` | شناسه عنصر DOM |
| `_COMPONENT_RANDOM_ID` | `number` | عدد تصادفی برای یکتایی part IDs |
| `_unsubscribeDirection` | `any` | unsubscribe برای direction config |

### 3.3. Generic Parameters

| پارامتر | Constraint | نقش |
|:---|:---|:---|
| `TProp` | `extends Record<string, any>` | تایپ کلیدهای props |
| `TSchemas` | — | تایپ کلیدهای schema parts |
| `TTemplate` | — | تایپ کلیدهای templates |
| `TMethods` | `extends Record<string, MethodCallback<any, any>>` | تایپ کلیدهای methods و signatureهای آنها |

> **Plan 8.1.4:** `Callback_ComponentMethod` حالا `TThis` (با default `any`) دارد
> که در `MethodsConfigType<TThis>` به Component instance متصل می‌شود.

---

## 4. Architecture

### 4.1. نمودار سلسله‌مراتب کلاس

```
AbComponentConnector (abstract)
    └── ClComponentBase<TProp, TSchemas, TTemplate, TMethods>  (alias: CoreComponents.App)
            └── MyComponent (subclass)
```

> **Note (Plan 8.1.4):** `ComponentStructureTrait` (در پوشه `traits/`) یک Trait جداگانه است که Componentها از آن ارث نمی‌برند. این Trait ۷ prop پایه را در `_COMPONENT_PATTERN` spread می‌کند و متد `renderContent` برای ساخت `ComponentStructure` به‌عنوان فرزند فراهم می‌کند.

`AbComponentConnector` متد `renderManagerComponent` را به‌صورت abstract فراهم می‌کند که در صورت نبود `method` در یک schema part، به‌عنوان fallback رندر استفاده می‌شود:

```typescript
// AbComponentConnector.ts (lines 7-9)
renderManagerComponent(partName, attrsDefault, data, extra): CoreReactive.App {
    throw new Error("not override method Manager Component")
}
```

### 4.1.1. الگوی Trait (Plan 8.1.4)

Componentها از `CoreComponents.App` (ClComponentBase) ارث می‌برند، **نه** از `ComponentStructure`. `ComponentStructureTrait` در پوشه `traits/` قرار دارد و capabilityهای ساختار را به‌صورت Trait فراهم می‌کند:

```
AbComponentConnector (abstract)
    └── ClComponentBase  (alias: CoreComponents.App)
            └── ComponentButton (با Trait)
                    ├── extends CoreComponents.App
                    └── spreads ComponentStructureTrait.props into _COMPONENT_PATTERN
```

این الگو از "MegaComponent" anti-pattern جلوگیری می‌کند:
- Componentها capability از Traitها می‌گیرند (نه ارث‌بری عمیق)
- `ComponentStructure` به‌عنوان فرزند توسط متد `renderContent` (متد Trait) ساخته می‌شود
- ۷ prop پایه از `ComponentStructureTrait.props` در `_COMPONENT_PATTERN` spread می‌شوند تا کاربر بتواند set کند

### 4.2. نمودار جریان رندر

```
renderComponent(config, methods, events, unique?, emit?)
    │
    ├── 0. ثبت emit در CoreEvent.App (Plan 8.1.4)
    │       └── if (unique && emit):
    │           CoreEvent.App.registerEmit(unique, emit.bind(this))
    │           ← this در emit به Component instance اشاره می‌کند
    │
    ├── 1. connectedCallback()
    │       └── subscribe to directionRtl config
    │
    ├── 2. #getReadyUserConfigAndDefaultConfig(config)
    │       └── برای هر prop در PATTERN:
    │           ├── وجود در user config? → استفاده از مقدار کاربر
    │           ├── وجود در TEMPLATES? (reference.prop match) → استفاده از مقدار template
    │           └── در غیر این صورت → استفاده از default
    │       └── wrap در Observable → ذخیره در _COMPONENT_PROPS_BIND
    │
    ├── 3. #getReadyComponentMethods(methods)
    │       └── برای هر semantic key در methods:
    │           _COMPONENT_METHODS[semanticKey].destination = fn
    │           ← Plan 8.1.4: double loop حذف، lookup مستقیم
    │
    ├── 4. createComponentElement()
    │       ├── dispose _renderScope قدیمی
    │       ├── ساخت Scope جدید
    │       ├── اولین schema entry → root part
    │       └── executeSchemaPart(rootPartName) → _COMPONENT_CONTENT
    │
    └── 5. bind events (اگر events وجود دارد)
            └── _COMPONENT_CONTENT.on(key, handler)
```

---

## 5. Rules

### MUST

- **MUST** هر کامپوننت از `ClComponentBase` ارث‌بری کند.
- **MUST** چهار بخش `_COMPONENT_PATTERN`, `_COMPONENT_SCHEMA`, `_COMPONENT_METHODS`, `_COMPONENT_TEMPLATES` در subclass مقداردهی شوند (با `!` تعریف شده‌اند).
- **MUST** رندر فقط از طریق `renderComponent(config, methods, events)` آغاز شود — مستقیماً متدهای private را فراخوانی نکنید.
- **MUST** نام کامپوننت و `elId` در constructor پاس شود.

### MUST NOT

- **MUST NOT** متدهای private (با پیشوند `#`) را از خارج کلاس فراخوانی کنید.
- **MUST NOT** `_renderScope` را به‌صورت دستی dispose کنید — `createComponentElement` این کار را انجام می‌دهد.
- **MUST NOT** `_COMPONENT_PROPS_BIND` را مستقیماً دستکاری کنید — از `set`/`get`/`getObservable` استفاده کنید.

### SHOULD

- **SHOULD** اولین entry در `_COMPONENT_SCHEMA` به‌عنوان root part انتخاب شود (منطق `createComponentElement` به این ترتیب وابسته است).
- **SHOULD** `getScope()` برای ثبت computed/observableها استفاده شود تا هنگام re-render به‌صورت خودکار پاکسازی شوند.

### SHOULD NOT

- **SHOULD NOT** logic رندر را در constructor قرار دهید — constructor فقط باید نام و ID را تنظیم کند.

### MAY

- **MAY** `events` به `renderComponent` پاس نشود (پارامتر سوم اختیاری است، پیش‌فرض `null`).

> برای قوانین کامل Framework به `../00-framework/AI_GUIDE_RULES.md` مراجعه کنید.

---

## 6. Lifecycle

چرخه حیات کامپوننت بر اساس کد منبع (`ClComponentBase.ts`):

### 6.1. Constructor (lines 53-67)

```typescript
constructor(componentName: string, elId: string | null) {
    super();
    this._COMPONENT_NAME = componentName;
    this._COMPONENT_ID = elId;
    this._COMPONENT_RANDOM_ID = Math.floor(Math.random() * 10000);
}
```

نام، ID و یک عدد تصادفی برای یکتایی part IDs تنظیم می‌شود. هیچ رندری در این مرحله اتفاق نمی‌افتد.

### 6.2. renderComponent (lines 69-99)

نقطه ورود رندر:

```typescript
renderComponent(config: TProp, methods: TMethods, events = null, unique?: string, emit?: Function) {
    // Plan 8.1.4: ثبت emit در CoreEvent.App
    if (unique && emit) {
        CoreEvent.App.registerEmit(unique, emit.bind(this));
        // ← this در emit به Component instance اشاره می‌کند
        // ← اگر مصرف‌کننده .bind(parentInstance) کرده، bind دوم تاثیری ندارد
    }
    this.connectedCallback();
    this.#getReadyUserConfigAndDefaultConfig(config);
    this.#getReadyComponentMethods(methods);  // semantic key lookup مستقیم (double loop حذف)
    this.createComponentElement();
    if (events) {
        Object.keys(events).forEach(key => {
            this._COMPONENT_CONTENT.on(key, events[key])
        })
    }
}
```

> **Note (Plan 8.1.4):** `emit` فقط با `request` صدا زده می‌شود (خودبه‌خود با کلیک صدا زده نمی‌شود). برای emit حتماً از `function` استفاده کنید — arrow function با `.call()` کار نمی‌کند.

### 6.3. connectedCallback (lines 101-112)

به config `directionRtl` subscribe می‌کند و مقدار آن را در prop `directionRtl` تنظیم می‌کند:

```typescript
connectedCallback() {
    this._unsubscribeDirection =
        CoreObservable.App.computed(
            (dir) => { this.set("directionRtl", dir); },
            [CoreConfigs.App.state(CoreConfigs.States.DirectionRtl).observable()],
            this.getScope());
}
```

### 6.4. createComponentElement (lines 183-205)

Scope قدیمی dispose می‌شود، Scope جدید ساخته می‌شود، اولین schema entry به‌عنوان root انتخاب و رندر می‌گردد:

```typescript
private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new CoreObservable.Scope();

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

---

## 7. API / Contract

### متدهای عمومی `ClComponentBase`

| متد | امضا | توضیح |
|:---|:---|:---|
| `renderComponent` | `(config, methods, events?, unique?, emit?) => void` | نقطه ورود رندر (Plan 8.1.4: ثبت emit) |
| `connectedCallback` | `() => void` | subscribe به directionRtl |
| `executeSchemaPart` | `(partName: string, extra?: any) => CoreReactive.App \| null` | رندر یک schema part |
| `getSchemaPropsInPart` | `(props: PropInterface[]) => Record<string, Observable>` | استخراج Observableهای props یک part |
| `set` | `(propName: string, propValue: any) => void` | تنظیم مقدار prop |
| `get` | `(propName: string) => any` | دریافت مقدار prop |
| `getObservable` | `(propName: string) => Observable \| null` | دریافت Observable یک prop |
| `getScope` | `() => CoreObservable.Scope` | دریافت Scope رندر فعلی |
| `getPartId` | `(partName: string) => string` | ساخت ID یکتا برای یک part |
| `executeMethod` | `(methodName: string, event: Event, dataArgs?) => any \| null` | اجرای یک method |
| `getElement` | `() => HTMLElement \| CoreReactive.App` | دریافت عنصر DOM رندر‌شده |
| `getReactiveElement` | `() => CoreReactive.App` | دریافت ReactiveElement |

---

## 8. Examples

### 8.1. ساخت یک کامپوننت ساده

```typescript
import { ClComponentBase } from "@/core_components";
import { Define_ComponentProp } from "@/core_components";
import { Define_ComponentSchema } from "@/core_components";
import { Define_ComponentMethod } from "@/core_components";
import { Define_ComponentTemplate } from "@/core_components";

type MyProps = {
    title: string;
    color: string;
};

type MySchemas = {
    Component: "Component";
};

type MyTemplates = {
    Default: "Default";
};

type MyMethods = {
    onClick: (event: Event, dataArgs: null, componentArgs: { title: string }) => void;
};

class MyComponent extends ClComponentBase<MyProps, MySchemas, MyTemplates, MyMethods> {

    _COMPONENT_PATTERN = Define_ComponentProp<MyProps>({
        title: { prop: "title", default: "Hello" },
        color: { prop: "color", default: "#000000" },
    });

    _COMPONENT_SCHEMA = Define_ComponentSchema<MySchemas, MyProps>({
        Component: { part: "Component" },
    });

    _COMPONENT_METHODS = Define_ComponentMethod<MyMethods, MyProps>({
        onClick: { args: { title: { prop: "title", default: "" } } },
    });

    _COMPONENT_TEMPLATES = Define_ComponentTemplate<MyTemplates, MyProps>({
        Default: { reference: { prop: "title", default: "" }, value: "Default Title" },
    });
}

// استفاده
const comp = new MyComponent("MyComponent", "my-id");
comp.renderComponent(
    { title: "World", color: "#ff0000" },
    { onClick: (event, dataArgs, componentArgs) => { console.log(componentArgs.title); } },
    { click: () => { console.log("clicked"); } }
);
```

---

## 9. Anti-Patterns

### ❌ Incorrect — فراخوانی متدهای private

```typescript
// متدهای #private از خارج قابل دسترسی نیستند
comp.#getReadyUserConfigAndDefaultConfig(config);  // خطای کامپایل
```

### ✅ Correct — استفاده از API عمومی

```typescript
comp.renderComponent(config, methods, events);
```

### ❌ Incorrect — دستکاری مستقیم `_COMPONENT_PROPS_BIND`

```typescript
comp._COMPONENT_PROPS_BIND["title"] = new Observable.App("wrong");
```

### ✅ Correct — استفاده از `set`

```typescript
comp.set("title", "correct");
```

### ❌ Incorrect — قرار دادن logic رندر در constructor

```typescript
constructor() {
    super("MyComponent", "id");
    this.renderComponent({}, {});  // props هنوز آماده نیستند
}
```

### ✅ Correct — رندر پس از ساخت شیء

```typescript
const comp = new MyComponent("MyComponent", "id");
comp.renderComponent(config, methods);
```

---

## 10. Dependencies

| وابستگی | مسیر | نقش |
|:---|:---|:---|
| `CoreObservable` | `@/core_observable` | Observable، Scope، computed |
| `CoreReactive` | `@/core_reactive` | ReactiveElement، section |
| `CoreConfigs` | `@/core_configs` | state management، DirectionRtl |
| `AbComponentConnector` | `../abstract/AbComponentConnector` | کلاس پایه انتزاعی |
| `TPartAttrDefault` | `../../basic/types/TPartAttrDefault` | تایپ attrs پیش‌فرض part |

> برای درک سیستم Observable به `../01-systems/AI_GUIDE_OBSERVABLE.md` مراجعه کنید.

---

## 11. AI Instructions

- هنگام ساخت کامپوننت جدید، ابتدا چهار تایپ `TProp`, `TSchemas`, `TTemplate`, `TMethods` را تعریف کنید.
- مطمئن شوید همه چهار فیلد `_COMPONENT_*` با استفاده از توابع `Define_*` مقداردهی شده‌اند.
- ترتیب entries در `_COMPONENT_SCHEMA` مهم است — اولین entry به‌عنوان root رندر می‌شود.
- برای راهنمای تفصیلی هر بخش به guideهای مرتبط (بخش 12) مراجعه کنید.
- هرگز متدهای `#private` را در کد تولیدشده فراخوانی نکنید.

---

## 12. Related Guides

- [AI_GUIDE_COMPONENT_PROPS.md](./AI_GUIDE_COMPONENT_PROPS.md) — بررسی عمیق `_COMPONENT_PATTERN`
- [AI_GUIDE_COMPONENT_SCHEMA.md](./AI_GUIDE_COMPONENT_SCHEMA.md) — بررسی عمیق `_COMPONENT_SCHEMA`
- [AI_GUIDE_COMPONENT_METHODS.md](./AI_GUIDE_COMPONENT_METHODS.md) — بررسی عمیق `_COMPONENT_METHODS`
- [AI_GUIDE_COMPONENT_TEMPLATES.md](./AI_GUIDE_COMPONENT_TEMPLATES.md) — بررسی عمیق `_COMPONENT_TEMPLATES`
- [AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — دیکشنری اصطلاحات
- [AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework
- [AI_GUIDE_OBSERVABLE.md](../01-systems/AI_GUIDE_OBSERVABLE.md) — سیستم Observable

---

## 13. Source References

| فایل | خطوط | توضیح |
|:---|:---|:---|
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 18-23 | تعریف Generic Class |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 25-48 | فیلدهای زیرساختی |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 53-67 | constructor |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 69-99 | `renderComponent` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 101-112 | `connectedCallback` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 183-205 | `createComponentElement` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 214-242 | `executeSchemaPart` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 271-287 | `set` / `get` / `getObservable` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 289-295 | `getScope` / `getPartId` |
| `src/framework/module_core/module_components/basic/class/ClComponentBase.ts` | 301-333 | `executeMethod` |
| `src/framework/module_core/module_components/basic/abstract/AbComponentConnector.ts` | 5-27 | کلاس پایه انتزاعی |
| `traits/ComponentStructureTrait.ts` | — | Trait ساختار (۷ prop پایه + renderContent) |

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.1.4*
