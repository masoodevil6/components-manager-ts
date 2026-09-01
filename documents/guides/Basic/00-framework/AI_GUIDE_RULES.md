# AI Guide: Framework Rules

> **Audience:** همه AIهایی که با Framework کار می‌کنند.
>
> **Purpose:** مرجع اصلی قوانین غیرقابل نقض و توصیه‌شده Framework.
>
> **Level:** پایه — قبل از هر تغییر در کد خوانده شود.
>
> **Status:** Official

---

## 1. Definition

این فایل مرجع رسمی قوانین Framework است. هر قانون با سطح شدت مشخص شده است. تعریف رسمی سطوح:

| سطح | معنی |
|:---|:---|
| **MUST** | الزام قطعی — نقض = خطای معماری |
| **MUST NOT** | رفتار ممنوع — نقض = bug یا architecture violation |
| **SHOULD** | رفتار توصیه‌شده — نقض = نیاز به دلیل مستند |
| **SHOULD NOT** | رفتاری که معمولاً نباید انجام شود |
| **MAY** | رفتار مجاز ولی اختیاری |

---

## 2. Architecture Rules

### R-ARCH-01: Component Inheritance

**MUST** هر Component از `ClComponentBase` (alias: `CoreComponents.App`) ارث‌بری کند.

```typescript
// ✅ Correct
class MyComponent extends ClComponentBase<TProp, TSchema, TTemplate, TMethods> { ... }

// ❌ Incorrect
class MyComponent extends SomeOtherBase { ... }
```

> **Note (Plan 8.1.4):** Componentها از `CoreComponents.App` (یعنی `ClComponentBase`) ارث می‌برند، **نه** از `ComponentStructure`. `ComponentStructureTrait` در پوشه `traits/` قرار دارد و ۷ prop پایه آن در `_COMPONENT_PATTERN` کامپوننت‌ها spread می‌شود. متد `renderContent` این Trait برای ساخت `ComponentStructure` به‌عنوان فرزند استفاده می‌شود.

**Source:** `ClComponentBase.ts` — تمام زیرساخت رندر در این کلاس است.

---

### R-ARCH-02: Four Component Sections

**MUST** هر Component چهار بخش `_COMPONENT_*` را تعریف کند:

```typescript
_COMPONENT_PATTERN    // Props
_COMPONENT_SCHEMA     // Parts
_COMPONENT_METHODS    // Callbacks
_COMPONENT_TEMPLATES  // Variants
```

**MUST** حتی اگر بخشی خالی است، تعریف شود (حداقل با `{}`).

**Source:** `ClComponentBase.ts` lines 27-33 — این فیلدها با `!` (definite assignment assertion) تعریف شده‌اند.

---

### R-ARCH-03: Dependency Direction

**MUST NOT** Core به Implementation وابسته شود.

**MAY** Implementation به Core وابسته شود.

```
Core ← Implementation    ✅
Core → Implementation    ❌
```

**Source:** `ClComponentBase.ts` فقط به `core_observable`, `core_reactive`, `core_configs` وابسته است — نه به `last/tools/`.

---

### R-ARCH-04: Define_* Functions

**SHOULD** برای تعریف بخشهای کامپوننت از `Define_*` استفاده شود.

```typescript
// ✅ Recommended
_COMPONENT_PATTERN = Define_ComponentProp<MyProps>({ ... });

// ⚠️ Works but loses type inference
_COMPONENT_PATTERN = { ... } as any;
```

**Source:** `Define_ComponentProp.ts`, `Define_ComponentSchema.ts`, etc.

---

## 3. Observable Rules

### R-OBS-01: No Direct get() in Reactive Context

**MUST NOT** در contextهای واکنشی (computed, render, bind) از `observable.get()` مستقیم استفاده شود.

```typescript
// ❌ Incorrect — breaks reactivity
const value = myObservable.get();
const result = transform(value);

// ✅ Correct — preserves reactivity
const result = CoreObservable.App.computed(
    (val) => transform(val),
    [myObservable],
    scope
);
```

**Source:** `ClObservable.ts` — `computed` به تغییرات subscribe می‌کند؛ `get()` فقط مقدار فعلی را برمی‌گرداند.

**CONFLICT NOTE:** در `ClComponentBase.ts` متدهای `set` و `get` وجود دارند که از `_COMPONENT_PROPS_BIND[propName].get()` استفاده می‌کنند. این متدها برای دسترسی imperative خارج از context واکنشی مجاز هستند. قانون R-OBS-01 فقط برای contextهای واکنشی (render, computed, bind) اعمال می‌شود.

---

### R-OBS-02: Use Reactive Helpers

**SHOULD** به‌جای `get()` از توابع واکنشی استفاده شود:

| به‌جای | استفاده کنید |
|:---|:---|
| `obs.get()` در render | `obs` مستقیم در `children` یا `attrsBind` |
| `transform(obs.get())` | `Observable.computed(fn, [obs], scope)` |
| `obs.get() ? a : b` | `Observable.conditionWhen(obs, cond, onTrue, onFalse, scope)` |
| `obs.get().map(fn)` | `obs.mapArray(fn, scope)` |

---

### R-OBS-03: Scope Binding

**MUST** هر subscription که در یک Component ایجاد می‌شود به Scope آن Component متصل شود.

```typescript
// ✅ Correct
const derived = CoreObservable.App.computed(fn, [obs], this.getScope());

// ❌ Incorrect — memory leak
const derived = CoreObservable.App.computed(fn, [obs]);
```

**Source:** `ClScope.ts` — `track` متد dispose را ثبت می‌کند.

---

## 4. Scope Rules

### R-SCOPE-01: Dispose Before Re-render

**MUST** قبل از هر رندر جدید، Scope قبلی dispose شود.

```typescript
// ✅ Correct — pattern from ClComponentBase
private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new CoreObservable.Scope();
    // ... render
}
```

**Source:** `ClComponentBase.ts` lines 183-185.

---

### R-SCOPE-02: Scope Hierarchy

**MAY** Scopeهای فرزند با `createChild` ساخته شوند.

**MUST** dispose یک Scope والد، همه فرزندان را dispose کند.

**Source:** `ClScope.ts` lines 23-42 — `dispose` ابتدا children را dispose می‌کند.

---

## 5. Render Rules

### R-RENDER-01: Schema-based Rendering

**MUST** رندر کامپوننت از طریق Schema انجام شود — نه با دستکاری مستقیم DOM.

```typescript
// ✅ Correct — define in Schema
_COMPONENT_SCHEMA = Define_ComponentSchema({
    Main: {
        part: "part-main",
        method: this.renderMain.bind(this),
        props: [...],
    },
});

// ❌ Incorrect — direct DOM manipulation
constructor() {
    document.createElement("div");
}
```

**Source:** `ClComponentBase.createComponentElement()` — اولین Schema به‌عنوان root رندر می‌شود.

---

### R-RENDER-02: attrsBind vs attrs

**MUST** برای attributeهای واکنشی از `attrsBind` استفاده شود، نه `attrs`.

```typescript
// ✅ Correct — reactive
CoreReactive.App.div({
    attrsBind: { "data-state": stateObservable },
})

// ❌ Incorrect — static snapshot
CoreReactive.App.div({
    attrs: { "data-state": stateObservable.get() },
})
```

**Source:** `ClReactiveElement.ts` — `attrsBind` به Observable subscribe می‌کند.

---

### R-RENDER-03: renderComponent Call

**MUST** کلاس Concrete در constructor متد `renderComponent` را فراخوانی کند.

```typescript
// ✅ Correct
constructor(config, methods, events?) {
    super("my-component", null);
    super.renderComponent(config, methods, events);
}
```

**Source:** الگوی ثابت در همه کامپوننت‌های `last/tools/components/`.

---

## 6. Method Rules

### R-METH-01: Method Name Matching

**MUST** نام متد در `_COMPONENT_METHODS` (semantic key) با کلید در شیء methods پاس‌داده‌شده به `renderComponent` یکسان باشد.

```typescript
// Definition — semantic key (Public API)
_COMPONENT_METHODS = Define_ComponentMethod({
    CLICK: { args: { ... } },       // semantic key → Public API
});

// Usage — key must match semantic key "CLICK"
component.renderComponent(config, {
    CLICK: (event, dataArgs, componentArgs) => { ... },
});
```

> **Note (Plan 8.1.4):**
> - **Semantic keys** (مثل `CLICK`, `HOVER`) متعلق به **Public API** هستند — مصرف‌کننده با این کلیدها متصل می‌شود.
> - **Runtime name** (مثل `fn_onClickIcon`) متعلق به **implementation** است — نام داخلی تابع.
> - `#getReadyComponentMethods` حالا **semantic key lookup مستقیم** انجام می‌دهد (double loop حذف شده است).
> - `Callback_ComponentMethod` امضا: `(this: TThis, event, dataArgs, componentArgs) => void` — `TThis` پیش‌فرض `any` است.

**Source:** `ClComponentBase.#getReadyComponentMethods` — تطبیق مستقیم با semantic key.

---

### R-METH-02: executeMethod for Internal Calls

**SHOULD** برای فراخوانی داخلی callback از `executeMethod` استفاده شود.

```typescript
// ✅ Recommended
this.executeMethod("onClick", event, dataArgs);

// ⚠️ Direct access — bypasses args resolution
this._COMPONENT_METHODS.onClick.destination?.call(this, event, null, null);
```

> **Note (Plan 8.1.4):** `Callback_ComponentMethod` امضا: `(this: TThis, event, dataArgs, componentArgs) => void`. پارامتر `this` با پیش‌فرض `any` به callback اجازه می‌دهد به Component instance دسترسی داشته باشد. `MethodsConfigType<TThis>` تایپ کل شیء methods را با `TThis` مشخص می‌کند.

**Source:** `ClComponentBase.executeMethod` — componentArgs را به‌صورت خودکار از `_COMPONENT_PROPS_BIND` استخراج می‌کند.

---

## 6.5. Emit Rules (Plan 8.1.4)

### R-EMIT-01: emit Auto-Bind

**MUST** `emit` فقط با `request` صدا زده شود — خودبه‌خود با کلیک صدا زده نمی‌شود.

`ClComponentBase.renderComponent` حالا `emit` را در `CoreEvent.App.registerEmit` ثبت می‌کند. `emit.bind(this)` باعث می‌شود `this` در emit به **Component instance** اشاره کند.

```typescript
// ✅ Correct — emit با function تعریف شود
emit = function(event, data) { ... }

// ❌ Incorrect — arrow function با .call() کار نمی‌کند
emit = (event, data) => { ... }   // this قابل bind نیست
```

### R-EMIT-02: Bind Precedence

**MUST NOT** اگر مصرف‌کننده `.bind(parentInstance)` کرده باشد، bind دوم (`emit.bind(this)` در renderComponent) **تاثیری ندارد** — bind اول اولویت دارد.

```typescript
// مصرف‌کننده:
const boundEmit = myEmit.bind(parentInstance);
component.renderComponent(config, methods, { emit: boundEmit });
// → renderComponent از emit.bind(this) استفاده می‌کند ولی تاثیری ندارد
// → this در emit همچنان parentInstance است
```

**Source:** `ClComponentBase.renderComponent` — `CoreEvent.App.registerEmit(emit.bind(this))`.

---

## 7. Prop Rules

### R-PROP-01: Default Value

**MUST** هر prop در `_COMPONENT_PATTERN` فیلد `default` داشته باشد.

```typescript
// ✅ Correct
_COMPONENT_PATTERN = Define_ComponentProp({
    title: { prop: "title", default: "" },
});

// ❌ Incorrect — no default
_COMPONENT_PATTERN = Define_ComponentProp({
    title: { prop: "title" },
});
```

**Source:** `ClComponentBase.#getReadyUserConfigAndDefaultConfig` — اگر prop در config کاربر نبود و template هم نداشت، از `default` استفاده می‌شود.

---

### R-PROP-02: as const for Props Definition

**SHOULD** تعریف Props const با `as const` باشد.

```typescript
// ✅ Recommended
export const MyProps = {
    prop_title: "prop_title",
    prop_color: "prop_color",
} as const;
```

**Source:** الگوی ثابت در همه کامپوننت‌های موجود.

---

## 8. Template Rules

### R-TPL-01: Reference to Existing Prop

**MUST** `reference` در Template به prop موجود در `_COMPONENT_PATTERN` ارجاع دهد.

```typescript
// ✅ Correct
_COMPONENT_TEMPLATES = Define_ComponentTemplate({
    Primary: {
        reference: this._COMPONENT_PATTERN.variant,  // must exist
        value: "primary",
    },
});
```

**Source:** `ClComponentBase.#getReadyUserConfigAndDefaultConfig` — `reference.prop` با `propName` تطبیق داده می‌شود.

---

## 9. Conflicts

### CONFLICT-01: get() in ClComponentBase

**وضعیت:** `ClComponentBase` متدهای `get(propName)` و `set(propName, value)` دارد که داخلیاً از `.get()` و `.set()` روی Observable استفاده می‌کنند.

**تصمیم:** این متدها برای دسترسی imperative مجاز هستند. قانون R-OBS-01 فقط در contextهای واکنشی (render, computed, bind) اعمال می‌شود.

**Source Code تغییر نکرد.**

---

### CONFLICT-02: get() in executeMethod args resolution

**وضعیت:** `#executeMethod_getMethodData_getArgs` از `.get()` برای استخراج مقادیر args استفاده می‌کند.

**تصمیم:** این فراخوانی imperative است (در زمان اجرای event، نه در render). مجاز است.

**Source Code تغییر نکرد.**

---

## 10. AI Instructions

1. قبل از تغییر Component، [AI_GUIDE_COMPONENT_STRUCTURE.md](../02-component/AI_GUIDE_COMPONENT_STRUCTURE.md) را بخوان.
2. System Guideهای مرتبط ([OBSERVABLE](../01-systems/AI_GUIDE_OBSERVABLE.md), [SCOPE](../01-systems/AI_GUIDE_SCOPE.md)) را بررسی کن.
3. Implementation فعلی را قبل از تغییر بررسی کن.
4. Dependency direction را بررسی کن — Core نباید به Implementation وابسته شود.
5. از Abstractionهای موجود Framework استفاده کن.
6. بدون نیاز، Abstraction جدید ایجاد نکن.
7. برای حل مشکل Implementation، Core را تغییر نده.
8. هیچ APIای را صرفاً بر اساس حدس ایجاد نکن — با Source Code بررسی کن.
9. هر قانون جدید MUST با Source Code واقعی تأیید شود.
10. اگر Documentation با Source Code تضاد دارد، `CONFLICT` ثبت کن و Source Code را تغییر نده.

---

## Related Guides

- [AI_GUIDE_TERMINOLOGY.md](./AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [AI_GUIDE_OVERVIEW.md](./AI_GUIDE_OVERVIEW.md) — نمای کلی
- [AI_GUIDE_ARCHITECTURE.md](./AI_GUIDE_ARCHITECTURE.md) — معماری لایه‌ها

---

## Source References

| قانون | فایل سورس | خط |
|:---|:---|:---|
| R-ARCH-01 | `ClComponentBase.ts` | 18-23 |
| R-ARCH-02 | `ClComponentBase.ts` | 27-33 |
| R-ARCH-03 | `ClComponentBase.ts` | 1-3 (imports) |
| R-OBS-01 | `ClObservable.ts` | 144-176 (computed) |
| R-OBS-03 | `ClScope.ts` | 9-15 (track) |
| R-SCOPE-01 | `ClComponentBase.ts` | 183-185 |
| R-RENDER-01 | `ClComponentBase.ts` | 183-205 |
| R-RENDER-02 | `ClReactiveElement.ts` | 14-28 (Options) |
| R-METH-01 | `ClComponentBase.ts` | 163-173 |
| R-PROP-01 | `ClComponentBase.ts` | 114-157 |

---

*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.1.4*
