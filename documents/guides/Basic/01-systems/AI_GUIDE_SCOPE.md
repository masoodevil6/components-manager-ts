# AI Guide: Scope

> **Audience:** همه AIهایی که با سیستم واکنشی Framework کار می‌کنند.
>
> **Purpose:** مرجع کامل مدیریت چرخه حیات اشتراک‌ها (subscriptions) و جلوگیری از memory leak.
>
> **Level:** پایه — قبل از کار با Observable یا Component خوانده شود.
>
> **Status:** Official

---

## 1. Definition

**Scope** سازمان چرخه حیات اشتراک‌ها (subscriptions) در Framework است. وظیفه آن ثبت توابع dispose و فراخوانی آن‌ها در زمان مناسب است تا از انباشت subscriptionهای بی‌استفاده و memory leak جلوگیری شود.

کلاس اصلی: `ClScope` در `module_core/module_observable/class/ClScope.ts`.

از طریق دروازه عمومی ماژول `core_observable` با نام `Scope` در دسترس است:

```typescript
import * as CoreObservable from "@/core_observable";

const scope = new CoreObservable.Scope();
```

> برای تعریف رسمی اصطلاحات به [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) مراجعه کنید.

---

## 2. Responsibilities

- ثبت توابع dispose (unsubscribe) برای پاک‌سازی بعدی
- مدیریت سلسله‌مراتبی Scope (parent → children)
- پاک‌سازی امن همه disposables و children با مدیریت خطا
- جلوگیری از memory leak ناشی از subscriptionهای رهاشده

---

## 3. Concepts

### 3.1 ساختار داخلی

| فیلد | نوع | توضیح |
|:---|:---|:---|
| `disposables` | `(() => void)[]` | آرایه توابع dispose ثبت‌شده |
| `children` | `ClScope[]` | Scopeهای فرزند |
| `isDispose` | `boolean` | وضعیت dispose |

### 3.2 Dispose Function

هر تابع dispose یک closure است که یک اشتراک (subscription) را پاک می‌کند. مثلاً خروجی `observable.subscribe(fn)` یک تابع unsubscribe است که در Scope ثبت می‌شود.

### 3.3 Sلسله‌مراتب Scope

Scopeها می‌توانند والد و فرزند داشته باشند. با `createChild` یک Scope فرزند ساخته می‌شود. هنگام `dispose` یک Scope والد، ابتدا همه فرزندان dispose می‌شوند و سپس disposables خود والد.

---

## 4. Architecture

```
ClScope
├── disposables: (() => void)[]
├── children: ClScope[]
├── isDispose: boolean
│
├── track(dispose: () => void)
│       ├── اگر isDispose → فراخوانی فوری dispose
│       └── در غیر این صورت → push به disposables
│
├── createChild(): ClScope
│       └── ساخت Scope جدید → push به children
│
└── dispose()
        ├── اگر isDispose → return (idempotent)
        ├── set isDispose = true
        ├── dispose همه children (به ترتیب)
        ├── children = []
        ├── فراخوانی هر disposable در try/catch
        │       └── خطا → console.warn (بدون crash)
        └── disposables = []
```

---

## 5. Rules

> تعریف رسمی سطوح MUST / MUST NOT / SHOULD / SHOULD NOT / MAY در [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) آمده است.

### MUST

**R-SCOPE-01:** قبل از هر رندر جدید، Scope قبلی **باید** dispose شود. این الگوی ثابت در `ClComponentBase.createComponentElement` است:

```typescript
// ✅ Correct — pattern from ClComponentBase
private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new CoreObservable.Scope();
    // ... render
}
```

**R-OBS-03:** هر subscription که در یک Component ایجاد می‌شود **باید** به Scope آن Component متصل شود.

```typescript
// ✅ Correct — scope bound
const derived = CoreObservable.App.computed(fn, [obs], this.getScope());

// ❌ Incorrect — memory leak
const derived = CoreObservable.App.computed(fn, [obs]);
```

### MUST NOT

**R-SCOPE-03:** بدون اتصال به Scope، subscription ایجاد نشود. این کار باعث memory leak می‌شود زیرا تابع unsubscribe هرگز فراخوانی نمی‌شود.

```typescript
// ❌ Incorrect — subscription بدون scope
const unsub = observable.subscribe(v => { ... });
// unsub هرگز فراخوانی نمی‌شود

// ✅ Correct — با scope
observable.subscribe(v => { ... }, this.getScope());
```

### MAY

**R-SCOPE-02:** Scopeهای فرزند با `createChild` ساخته شوند. dispose یک Scope والد، همه فرزندان را به‌صورت خودکار dispose می‌کند.

```typescript
// ✅ Allowed — child scope
const childScope = this.getScope().createChild();
const derived = obs.map(fn, childScope);
```

---

## 6. Lifecycle

```
new ClScope()
    │
    ├── track(disposeFn)
    │       ├── اگر قبلاً dispose شده → فراخوانی فوری disposeFn
    │       └── در غیر این صورت → ثبت در disposables
    │
    ├── createChild()
    │       └── ساخت ClScope جدید → ثبت در children
    │
    └── dispose()
            ├── بررسی isDispose (idempotent — فراخوانی مجدد بی‌اثر)
            ├── isDispose = true
            ├── dispose همه children (به ترتیب)
            ├── فراخوانی همه disposables (هر کدام در try/catch)
            │       └── خطا → console.warn("Scope dispose error:", e)
            └── پاک‌سازی آرایه‌ها
```

### رفتار خاص: track بعد از dispose

اگر `track` پس از `dispose` فراخوانی شود، تابع dispose **بلافاصله** اجرا می‌شود. این رفتار ایمن است و از ثبت disposal در یک Scope مرده جلوگیری می‌کند.

---

## 7. API / Contract

### `track(dispose: () => void): void`

تابع dispose را ثبت می‌کند. اگر Scope قبلاً dispose شده باشد، تابع را فوراً اجرا می‌کند.

```typescript
const scope = new CoreObservable.Scope();

const unsub = observable.subscribe(v => { ... });
scope.track(unsub);  // ثبت برای پاک‌سازی بعدی
```

### `createChild(): ClScope`

یک Scope فرزند می‌سازد و در `children` ثبت می‌کند. فرزند با dispose والد به‌صورت خودکار dispose می‌شود.

```typescript
const parent = new CoreObservable.Scope();
const child = parent.createChild();

// با parent.dispose() → child هم dispose می‌شود
```

### `dispose(): void`

همه children و سپس همه disposables را پاک می‌کند. idempotent است — فراخوانی مجدد هیچ کاری انجام نمی‌دهد. خطاهای هر disposable با `console.warn` ثبت می‌شود و اجرای بقیه متوقف نمی‌شود.

---

## 8. Examples

### 8.1 الگوی استاندارد در Component

```typescript
import * as CoreObservable from "@/core_observable";

class MyComponent extends ClComponentBase<...> {
    private _renderScope: CoreObservable.Scope;

    constructor(config, methods) {
        super("my-component", null);
        this._renderScope = new CoreObservable.Scope();
        super.renderComponent(config, methods);
    }

    private createComponentElement() {
        // R-SCOPE-01: dispose قبل از رندر جدید
        this._renderScope.dispose();
        this._renderScope = new CoreObservable.Scope();

        // R-OBS-03: همه subscriptionها به scope متصل شوند
        const derived = CoreObservable.App.computed(
            (val) => `مقدار: ${val}`,
            [this.getObservable("data")],
            this._renderScope
        );

        // ... رندر با derived
    }

    getScope(): CoreObservable.Scope {
        return this._renderScope;
    }
}
```

### 8.2 استفاده از child scope

```typescript
const scope = new CoreObservable.Scope();

// بخشی از رندر که lifecycle مستقل دارد
const childScope = scope.createChild();

const list = CoreObservable.App.for(
    itemsObs,
    (item) => renderRow(item),
    {},
    childScope
);

// با scope.dispose() → childScope هم dispose می‌شود
// و subscriptionهای list هم پاک می‌شود
```

### 8.3 track بعد از dispose (رفتار ایمن)

```typescript
const scope = new CoreObservable.Scope();
scope.dispose();

// این فراخوانی ایمن است — تابع فوراً اجرا می‌شود
scope.track(() => {
    console.log("پاک‌سازی فوری — Scope قبلاً dispose شده");
});
// خروجی: پاک‌سازی فوری — Scope قبلاً dispose شده
```

---

## 9. Anti-Patterns

### ❌ عدم dispose قبل از رندر جدید

```typescript
// ❌ Incorrect — subscriptionهای قبلی باقی می‌مانند
private createComponentElement() {
    // بدون dispose scope قبلی
    this._renderScope = new CoreObservable.Scope();
    // ... رندر جدید
    // subscriptionهای رندر قبلی هنوز فعال‌اند → memory leak
}
```

```typescript
// ✅ Correct — dispose قبل از ساخت scope جدید
private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new CoreObservable.Scope();
    // ... رندر جدید
}
```

### ❌ subscription بدون Scope

```typescript
// ❌ Incorrect — memory leak قطعی
const derived = source.map(v => v * 2);
const result = CoreObservable.App.computed(fn, [obs]);
```

```typescript
// ✅ Correct — همیشه scope پاس داده شود
const derived = source.map(v => v * 2, this.getScope());
const result = CoreObservable.App.computed(fn, [obs], this.getScope());
```

### ❌ فراخوانی دستی unsubscribe به‌جای استفاده از Scope

```typescript
// ❌ Incorrect — مدیریت دستی، مستعد خطا
const unsub1 = obs1.subscribe(fn1);
const unsub2 = obs2.subscribe(fn2);
// بعداً:
unsub1();
unsub2();
// اگر فراموش شود → leak
```

```typescript
// ✅ Correct — Scope مدیریت می‌کند
obs1.subscribe(fn1, scope);
obs2.subscribe(fn2, scope);
// بعداً:
scope.dispose();  // همه خودکار پاک می‌شوند
```

---

## 10. Dependencies

| وابستگی | جهت | توضیح |
|:---|:---|:---|
| `ClObservable` | Observable → Scope | `subscribe`, `map`, `computed` و سایر متدها `scope.track` را برای ثبت unsubscribe فراخوانی می‌کنند |
| `ClComponentBase` | Component → Scope | `_renderScope` در Component ذخیره می‌شود و با `getScope()` در دسترس است |

---

## 11. AI Instructions

1. قبل از استفاده از Scope، [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) بخش Scope Rules را بخوان.
2. هر subscription **باید** به یک Scope متصل شود — بدون استثنا.
3. قبل از هر رندر جدید، Scope قبلی را `dispose` کن.
4. برای بخش‌های مستقل رندر، از `createChild` استفاده کن.
5. `dispose` idempotent است — نگران فراخوانی مجدد نباش.
6. خطاهای dispose با `console.warn` ثبت می‌شوند و Runtime را crash نمی‌کنند — اما آن‌ها را بررسی و ریشه‌یابی کن.
7. اگر `track` پس از `dispose` فراخوانی شود، تابع فوراً اجرا می‌شود — این رفتار ایمن است.

---

## 12. Related Guides

- [AI_GUIDE_OBSERVABLE.md](./AI_GUIDE_OBSERVABLE.md) — سیستم Observable و subscription
- [AI_GUIDE_REACTIVE.md](./AI_GUIDE_REACTIVE.md) — سیستم رندر واکنشی
- [../00-framework/AI_GUIDE_TERMINOLOGY.md](../00-framework/AI_GUIDE_TERMINOLOGY.md) — تعریف اصطلاحات
- [../00-framework/AI_GUIDE_RULES.md](../00-framework/AI_GUIDE_RULES.md) — قوانین Framework

---

## 13. Source References

| مفهوم | فایل سورس | خط |
|:---|:---|:---|
| کلاس `ClScope` | `src/framework/module_core/module_observable/class/ClScope.ts` | 4-43 |
| `track` | همان فایل | 9-15 |
| `createChild` | همان فایل | 17-21 |
| `dispose` | همان فایل | 23-42 |
| خروجی ماژول (`Scope`) | `src/framework/module_core/module_observable/index.ts` | 1 |
