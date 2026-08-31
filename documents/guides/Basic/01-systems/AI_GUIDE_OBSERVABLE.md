# AI Guide: Observable

> **Audience:** همه AIهایی که با سیستم واکنشی Framework کار می‌کنند.
>
> **Purpose:** مرجع کامل الگوی Observable — ساخت، تبدیل، ترکیب و مصرف مقادیر واکنشی.
>
> **Level:** پایه — قبل از کار با Reactive یا Component خوانده شود.
>
> **Status:** Official

---

## 1. Definition

**Observable** واحد پایه‌ای واکنشی (reactive) در Framework است. یک مقدار را نگه‌داری می‌کند و هنگام تغییر، تمام اشتراک‌گذاران (subscribers) را به‌صورت همگمان (synchronous) مطلع می‌کند.

کلاس اصلی: `ClObservable<T>` در `module_core/module_observable/class/ClObservable.ts`.

از طریق دروازه عمومی ماژول `core_observable` با نام `App` در دسترس است:

```typescript
import * as CoreObservable from "@/core_observable";

const count = new CoreObservable.App(0);
```

> برای تعریف رسمی اصطلاحات به [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 2. Responsibilities

- نگه‌داری یک مقدار (`_value`) و انتشار تغییرات آن به subscribers
- ارائه ابزارهای تبدیل واکنشی: `map`, `mapBoolean`, `mapList`, `mapArray`
- ارائه ابزارهای ترکیب واکنشی: `computed`, `conditionSwitch`, `conditionWhen`
- ارائه ابزارهای رندر لیستی واکنشی: `for`, `forObject`
- شناسایی نوع با `isObservable` و پرچم `__isObservable`

---

## 3. Concepts

### 3.1 ساختار داخلی

| فیلد | نوع | توضیح |
|:---|:---|:---|
| `_value` | `T` | مقدار فعلی Observable |
| `_subscribers` | `Set<Subscriber<T>>` | مجموعه توابع اشتراک‌گذار |
| `__isObservable` | `boolean` | پرچم شناسایی — همیشه `true` |
| `_isDispose` | `boolean` | وضعیت dispose داخلی |

### 3.2 نوع ObservableValue

نوع `TObservableValue<T>` (صادرشده به‌عنوان `ObservableValue`) نشان می‌دهد که یک پارامتر می‌تواند هم مقدار خام و هم Observable باشد:

```typescript
export type TObservableValue<T> = T | CoreObservable.App<T>;
```

این نوع در `attrsBind` و سایر APIهای واکنشی استفاده می‌شود.

### 3.3 Subscriber

هر subscriber یک تابع `(value: T) => void` است. هنگام `set`، اگر مقدار جدید با مقدار فعلی متفاوت باشد، `_notify` تمام subscribers را فراخوانی می‌کند.

### 3.4 Derived Observable

یک Observable مشتق (derived) از یک یا چند Observable منبع ساخته می‌شود و با تغییر منبع به‌روز می‌شود. متدهای `map`, `computed`, `conditionWhen` و `for` همگی Observable مشتق تولید می‌کنند.

---

## 4. Architecture

```
ClObservable<T>
├── Instance API
│   ├── get(): T
│   ├── set(value: T): void
│   ├── subscribe(fn, scope?): () => void
│   ├── map(fn, scope?): ClObservable<U>
│   ├── mapBoolean(trueVal, falseVal, scope?): ClObservable<U>
│   ├── mapList(mapping, scope?): ClObservable<U>
│   ├── mapArray(mapper, scope?): ClObservable<U[]>
│   └── update(fn, observables): void
│
├── Static API
│   ├── isObservable(obj): boolean
│   ├── computed(fn, observables[], scope?): ClObservable<T>
│   ├── conditionSwitch(obs, map, scope?): ClObservable<T>
│   ├── conditionWhen(obs, condition, onTrue, onFalse?, scope?): ClObservable<T>
│   ├── for(source, mapper, context?, scope?): ClObservable<T[]>
│   └── forObject(source, mapper, context?, scope?): ClObservable<T[]>
│
└── Internal
    ├── _notify(): void          — فراخوانی subscribers
    ├── _bindToScope(unsub, scope) — اتصال unsubscribe به Scope
    ├── _mapValue(value, mapping)  — منطق mapList
    └── _unwrapObservable(val)     — باز کردن Observable داخل mapping
```

خروجی ماژول `core_observable`:

```typescript
export {Scope, Observable as App} from "./class"
export type {ObservableValue as TObservableValue} from "./types"
```

---

## 5. Rules

> تعریف رسمی سطوح MUST / MUST NOT / SHOULD / SHOULD NOT / MAY در [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) آمده است.

### MUST NOT

**R-OBS-01:** در contextهای واکنشی (render, computed, bind) از `observable.get()` مستقیم استفاده نشود. این کار reactivity را می‌شکند زیرا تغییرات بعدی Observable به context منتقل نمی‌شود.

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

### MUST

**R-OBS-03:** هر subscription که در یک Component ایجاد می‌شود **باید** به Scope آن Component متصل شود. بدون Scope، subscription هرگز پاک نمی‌شود و memory leak ایجاد می‌کند.

```typescript
// ✅ Correct — scope bound
const derived = CoreObservable.App.computed(fn, [obs], this.getScope());

// ❌ Incorrect — memory leak
const derived = CoreObservable.App.computed(fn, [obs]);
```

### SHOULD

**R-OBS-02:** به‌جای `get()` از توابع واکنشی استفاده شود:

| به‌جای | استفاده کنید |
|:---|:---|
| `obs.get()` در render | `obs` مستقیم در `children` یا `attrsBind` |
| `transform(obs.get())` | `Observable.computed(fn, [obs], scope)` |
| `obs.get() ? a : b` | `Observable.conditionWhen(obs, cond, onTrue, onFalse, scope)` |
| `obs.get().map(fn)` | `obs.mapArray(fn, scope)` |
| `switch(obs.get())` | `Observable.conditionSwitch(obs, map, scope)` |

### MAY

**R-OBS-04:** از `get()` برای دسترسی imperative خارج از contextهای واکنشی مجاز است. مثال: خواندن مقدار در event handler یا متد `executeMethod`.

```typescript
// ✅ Allowed — imperative access outside reactive context
onSubmit() {
    const currentValue = this.getObservable("title").get();
    api.submit(currentValue);
}
```

---

## 6. Lifecycle

```
new ClObservable(initialValue)
    │
    ├── subscribe(fn, scope?) → unsubscribe function
    │       └── scope.track(unsubscribe)  (اگر scope داده شده)
    │
    ├── set(newValue)
    │       ├── اگر newValue === _value → return (بدون notify)
    │       └── در غیر این صورت → _notify() → فراخوانی همه subscribers
    │
    └── (Derived) map/computed/conditionWhen/for
            ├── subscribe به منبع
            ├── اتصال unsubscribe به scope
            └── با تغییر منبع → derived.set(newValue)
```

---

## 7. API / Contract

### 7.1 Instance Methods

#### `get(): T`

مقدار فعلی را برمی‌گرداند. **فقط** برای دسترسی imperative.

#### `set(value: T): void`

مقدار جدید را تنظیم می‌کند. اگر مقدار جدید با مقدار فعلی یکسان باشد (`===`)، هیچ کاری انجام نمی‌دهد. در غیر این صورت `_notify` را فراخوانی می‌کند.

#### `subscribe(fn: Subscriber<T>, scope?: Scope): () => void`

تابع `fn` را به subscribers اضافه می‌کند. اگر `scope` داده شده باشد، تابع unsubscribe را در `scope.track` ثبت می‌کند. تابع unsubscribe را برمی‌گرداند.

#### `map<U>(fn: (value: T) => U, scope?: Scope): ClObservable<U>`

یک Observable مشتق می‌سازد که با هر تغییر منبع، `fn` روی مقدار جدید اعمال شده و نتیجه در derived تنظیم می‌شود.

#### `mapBoolean<U>(trueValue: U, falseValue: U, scope?: Scope): ClObservable<U>`

مقدار boolean را به `trueValue` یا `falseValue` نگاشت می‌کند.

#### `mapList<U>(mapping: Mapping<T, U>, scope?: Scope): ClObservable<U>`

نگاشت با شیء یا تابع. اگر `mapping` یک شیء باشد، مقدار Observable به‌عنوان کلید استفاده می‌شود و در صورت نبود، `default` به‌کار می‌رود.

#### `mapArray<U, R>(mapper: (item: R, index: number) => U, scope?: Scope): ClObservable<U[]>`

هر آیتم آرایه را با `mapper` تبدیل می‌کند و Observable جدید از آرایه نتایج می‌سازد.

#### `update<TMap>(fn, observables): void`

مقدار فعلی را با تابع `fn` به‌روز می‌کند. مقادیر Observableهای اضافی نیز در دسترس `fn` قرار می‌گیرد.

### 7.2 Static Methods

#### `static isObservable(obj: any): obj is ClObservable<any>`

با بررسی `__isObservable` تشخیص می‌دهد که آیا `obj` یک Observable است یا خیر.

#### `static computed<T>(fn, observables: ObservableValue[], scope?): ClObservable<T>`

محاسبه واکنشی از چند Observable. `fn` با مقادیر فعلی تمام observables فراخوانی می‌شود. هر observable در آرای می‌تواند هم Observable و هم مقدار خام باشد.

```typescript
const fullName = CoreObservable.App.computed(
    (first, last) => `${first} ${last}`,
    [firstNameObs, lastNameObs],
    scope
);
```

#### `static conditionSwitch<TKey, TResult>(observable, map: ChooseMap, scope?): ClObservable<TResult | null>`

switch-case واکنشی. `map` شامل کلیدهای مطابق با مقدار Observable و تابع `else` اختیاری است.

```typescript
const icon = CoreObservable.App.conditionSwitch(
    statusObs,
    {
        active: () => "icon-active",
        idle:  () => "icon-idle",
        else:  () => "icon-default",
    },
    scope
);
```

#### `static conditionWhen<TResult>(observables, condition, onTrue, onFalse?, scope?): ClObservable<TResult | null>`

شرط واکنشی. `observables` می‌تواند یک Observable یا آرایه‌ای از Observableها باشد. `condition` با مقادیر فعلی فراخوانی می‌شود؛ اگر `true` باشد `onTrue` و در غیر این صورت `onFalse` (یا `null`) اجرا می‌شود.

```typescript
const isVisible = CoreObservable.App.conditionWhen(
    [isLoadingObs, hasErrorObs],
    (loading, error) => !loading && !error,
    () => contentElement,
    () => errorElement,
    scope
);
```

#### `static for<T, TResult>(source, mapper, context?, scope?): ClObservable<TResult[]>`

رندر لیستی واکنشی. `source` یک Observable از آرایه است. `mapper` برای هر آیتم با `index` و `context` فراخوانی می‌شود. `context` یک Record از Observableهای اضافی است که تغییر آن‌ها نیز re-rendertrigger می‌کند.

```typescript
const items = CoreObservable.App.for(
    listObs,
    (item, index, ctx) => CoreReactive.App.li({ children: `${ctx.prefix}${item}` }),
    { prefix: prefixObs },
    scope
);
```

#### `static forObject<TObject, TResult>(source, mapper, context?, scope?): ClObservable<TResult[]>`

مانند `for` اما برای اشیاء. `mapper` با `key`, `value`, `index`, `context` فراخوانی می‌شود.

---

## 8. Examples

### 8.1 ساخت و استفاده پایه

```typescript
import * as CoreObservable from "@/core_observable";

const count = new CoreObservable.App(0);

const unsub = count.subscribe(v => console.log("count:", v));
count.set(1);  // خروجی: count: 1
count.set(1);  // هیچ خروجی — مقدار یکسان
count.set(5);  // خروجی: count: 5

unsub();
count.set(10); // هیچ خروجی — unsubscribe شده
```

### 8.2 map — تبدیل واکنشی

```typescript
const price = new CoreObservable.App(100);
const display = price.map(v => `${v} تومان`, scope);

// display.get() → "100 تومان"
price.set(200);
// display.get() → "200 تومان"
```

### 8.3 mapBoolean — نگاشت بولی

```typescript
const isOpen = new CoreObservable.App(false);
const label = isOpen.mapBoolean("بستن", "باز کردن", scope);

// label.get() → "باز کردن"
isOpen.set(true);
// label.get() → "بستن"
```

### 8.4 computed — ترکیب چند Observable

```typescript
const width  = new CoreObservable.App(100);
const height = new CoreObservable.App(200);

const area = CoreObservable.App.computed(
    (w, h) => w * h,
    [width, height],
    scope
);

// area.get() → 20000
width.set(50);
// area.get() → 10000
```

### 8.5 conditionWhen — شرط واکنشی

```typescript
const isReady = new CoreObservable.App(false);

const badge = CoreObservable.App.conditionWhen(
    isReady,
    (ready) => ready,
    () => "آماده",
    () => "در حال بارگذاری...",
    scope
);
```

### 8.6 for — رندر لیستی واکنشی

```typescript
const users = new CoreObservable.App([
    { id: 1, name: "علی" },
    { id: 2, name: "سارا" },
]);

const userElements = CoreObservable.App.for(
    users,
    (user, index) => CoreReactive.App.div({
        children: `${index + 1}. ${user.name}`,
    }),
    {},
    scope
);
```

---

## 9. Anti-Patterns

### ❌ استفاده از `get()` در context واکنشی

```typescript
// ❌ Incorrect — reactivity شکسته می‌شود
renderMain() {
    return CoreReactive.App.div({
        children: `تعداد: ${this.getObservable("count").get()}`,
    });
}
```

```typescript
// ✅ Correct — Observable مستقیم در children
renderMain() {
    return CoreReactive.App.div({
        children: CoreObservable.App.computed(
            (count) => `تعداد: ${count}`,
            [this.getObservable("count")],
            this.getScope()
        ),
    });
}
```

### ❌ ساخت subscription بدون Scope

```typescript
// ❌ Incorrect — memory leak
const derived = source.map(v => v * 2);
```

```typescript
// ✅ Correct — scope bound
const derived = source.map(v => v * 2, this.getScope());
```

### ❌ استفاده از `set` با مقدار غیر یکسان به‌جای بررسی دستی

```typescript
// ❌ Incorrect — بررسی دستی اضافی
if (obs.get() !== newValue) {
    obs.set(newValue);
}
```

```typescript
// ✅ Correct — set خودکار بررسی می‌کند
obs.set(newValue);
```

---

## 10. Dependencies

| وابستگی | جهت | توضیح |
|:---|:---|:---|
| `ClScope` | Observable → Scope | `subscribe` و متدهای derived از `scope.track` برای مدیریت lifecycle استفاده می‌کنند |
| `ClReactiveElement` | Reactive → Observable | `attrsBind`, `classBind`, `stylesBind`, `children` همگی Observable مصرف می‌کنند |

---

## 11. AI Instructions

1. قبل از استفاده از Observable، [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) بخش Observable Rules را بخوان.
2. همیشه Scope را به متدهای `subscribe`, `map`, `computed`, `conditionWhen`, `for` پاس بده.
3. در contextهای واکنشی از `get()` استفاده نکن — از `computed` یا Observable مستقیم استفاده کن.
4. برای ترکیب چند Observable از `computed` استفاده کن، نه از چند `map` تو در تو.
5. برای شرط‌های بولی از `conditionWhen` و برای switch-case از `conditionSwitch` استفاده کن.
6. برای رندر لیستی از `for` یا `forObject` استفاده کن.
7. نوع `TObservableValue<T>` را در APIهایی که هم مقدار خام و هم Observable می‌پذیرند به‌کار ببر.

---

## 12. Related Guides

- [AI_GUIDE_SCOPE.md](./AI_GUIDE_SCOPE.md) — مدیریت چرخه حیات اشتراک‌ها
- [AI_GUIDE_REACTIVE.md](./AI_GUIDE_REACTIVE.md) — سیستم رندر واکنشی
- [AI_GUIDE_EVENT.md](./AI_GUIDE_EVENT.md) — سیستم رویدادها
- [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework

---

## 13. Source References

| مفهوم | فایل سورس | خط |
|:---|:---|:---|
| کلاس `ClObservable` | `src/framework/module_core/module_observable/class/ClObservable.ts` | 16-409 |
| `isObservable` | همان فایل | 23-25 |
| `get` / `set` | همان فایل | 34-42 |
| `subscribe` | همان فایل | 83-93 |
| `map` / `mapBoolean` / `mapList` / `mapArray` | همان فایل | 95-142 |
| `computed` (static) | همان فایل | 144-176 |
| `conditionSwitch` (static) | همان فایل | 180-206 |
| `conditionWhen` (static) | همان فایل | 210-246 |
| `for` (static) | همان فایل | 249-305 |
| `forObject` (static) | همان فایل | 310-372 |
| `_notify` / `_bindToScope` | همان فایل | 396-408 |
| نوع `TObservableValue` | `src/framework/module_core/module_observable/types/TObservableValue.ts` | 3-4 |
| خروجی ماژول (`App`) | `src/framework/module_core/module_observable/index.ts` | 1-2 |
