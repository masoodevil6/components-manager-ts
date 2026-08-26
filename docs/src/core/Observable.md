# Observable - راهنمای جامع

## مقدمه

`Observable` یک کلاس برای مدیریت وضعیت واکنشی است که تغییرات را به صورت خودکار به UI منتقل می‌کند. این کلاس پایه اصلی سیستم واکنشی در این معماری است.

همچنین `Scope` برای مدیریت حافظه و cleanup استفاده می‌شود.

---

## Type Definitions

### Subscriber

```typescript
type Subscriber<T> = (value: T) => void;
```

تابعی که با تغییر مقدار Observable اجرا می‌شود.

---

### Mapping

```typescript
type Mapping<T, U> = ((value: T) => U) | { [key: string]: U | Observable<U>; default?: U | Observable<U> };
```

نوع mapping برای تبدیل مقادیر:
- می‌تواند یک function باشد
- یا یک object با key-value mapping

---

### DisposeFm

```typescript
type DisposeFm = () => void;
```

تابعی برای cleanup و unsubscribe.

---

## Scope Class

کلاس `Scope` برای مدیریت حافظه و cleanup استفاده می‌شود.

### ویژگی‌های خصوصی

```typescript
private disposables: (() => void)[] = [];  // لیست توابع cleanup
private children: Scope[] = [];            // اسکوپ‌های فرزند
private isDispose = false;                 // وضعیت dispose
```

---

### track

```typescript
track(dispose: DisposeFm): void
```

ثبت یک تابع cleanup در scope:
- اگر scope قبلاً dispose شده، تابع را فوراً اجرا می‌کند
- در غیر این صورت، در لیست disposables ذخیره می‌کند

**مثال:**
```typescript
scope.track(() => {
    // cleanup code
});
```

---

### createChild

```typescript
createChild(): Scope
```

ایجاد یک scope فرزند:
- scope فرزند به scope والد اضافه می‌شود
- وقتی scope والد dispose شود، همه فرزندان هم dispose می‌شوند

**مثال:**
```typescript
const childScope = parentScope.createChild();
```

---

### dispose

```typescript
dispose(): void
```

Cleanup همه منابع:
- ابتدا همه scopeهای فرزند را dispose می‌کند
- سپس همه disposables را اجرا می‌کند
- از خطاها با try-catch محافظت می‌کند

**مثال:**
```typescript
scope.dispose();
```

---

## Observable Class

### ویژگی‌های خصوصی

```typescript
private _value: T;                      // مقدار فعلی
private _subscribers: Set<Subscriber<T>>; // لیست subscribers
__isObservable = true;                  // فلاگ برای تشخیص Observable
private _isDispose = false;            // وضعیت dispose
```

---

### Static isObservable

```typescript
static isObservable(obj: any): obj is Observable<any>
```

بررسی اینکه آیا یک object Observable است یا نه.

**مثال:**
```typescript
if (Observable.isObservable(value)) {
    // value is Observable
}
```

---

### Constructor

```typescript
constructor(value: T)
```

ایجاد Observable با مقدار اولیه.

**پارامترها:**
- `value`: مقدار اولیه

**مثال:**
```typescript
const count = new Observable(0);
const name = new Observable("John");
```

---

### get

```typescript
get(): T
```

بازگشت مقدار فعلی.

**مثال:**
```typescript
const value = observable.get();
```

---

### set

```typescript
set(value: T): void
```

تغییر مقدار و اطلاع‌رسانی به subscribers:
- اگر مقدار جدید با قبلی یکی باشد، کاری نمی‌کند
- در غیر این صورت، مقدار را تغییر می‌دهد و subscribers را صدا می‌زند

**مثال:**
```typescript
observable.set(10);
```

---

### subscribe

```typescript
subscribe(fn: Subscriber<T>, scope?: Scope): () => void
```

اشتراک در تغییرات:
- تابع subscriber را اضافه می‌کند
- تابع unsubscribe را برمی‌گرداند
- اگر scope داده شود، unsubscribe را در scope track می‌کند

**پارامترها:**
- `fn`: تابعی که با هر تغییر اجرا می‌شود
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال:**
```typescript
const unsub = observable.subscribe(value => {
    console.log("Value changed:", value);
});

// برای unsubscribe
unsub();

// یا با scope
observable.subscribe(value => {
    console.log("Value changed:", value);
}, scope);
```

---

### map

```typescript
map<U>(fn: (value: T) => U, scope?: Scope): Observable<U>
```

تبدیل مقدار Observable به نوع دیگر:
- یک Observable جدید برمی‌گرداند
- با تغییر مقدار اصلی، مقدار تبدیل شده هم تغییر می‌کند

**پارامترها:**
- `fn`: تابع تبدیل
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال:**
```typescript
const count = new Observable(5);
const doubled = count.map(c => c * 2);

console.log(doubled.get()); // 10
count.set(10);
console.log(doubled.get()); // 20
```

---

### mapBoolean

```typescript
mapBoolean<U>(trueValue: U, falseValue: U, scope?: Scope): Observable<U>
```

تبدیل boolean به دو مقدار مختلف:
- اگر مقدار true باشد، trueValue را برمی‌گرداند
- اگر مقدار false باشد، falseValue را برمی‌گرداند

**پارامترها:**
- `trueValue`: مقدار برای حالت true
- `falseValue`: مقدار برای حالت false
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال:**
```typescript
const isVisible = new Observable(true);
const className = isVisible.mapBoolean("visible", "hidden");

console.log(className.get()); // "visible"
isVisible.set(false);
console.log(className.get()); // "hidden"
```

---

### mapList

```typescript
mapList<U>(mapping: Mapping<T, U>, scope?: Scope): Observable<U>
```

تبدیل مقدار بر اساس mapping object یا function:
- اگر mapping function باشد، آن را اجرا می‌کند
- اگر mapping object باشد، مقدار را به عنوان key استفاده می‌کند

**پارامترها:**
- `mapping`: function یا object برای mapping
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال 1 (function):**
```typescript
const status = new Observable("loading");
const message = status.mapList(s => {
    if (s === "loading") return "Please wait...";
    if (s === "success") return "Done!";
    return "Error";
});
```

**مثال 2 (object):**
```typescript
const status = new Observable("loading");
const message = status.mapList({
    loading: "Please wait...",
    success: "Done!",
    error: "Error",
    default: "Unknown"
});
```

---

### mapArray

```typescript
mapArray<U, R>(mapper: (item: R, index: number) => U, scope?: Scope): Observable<U[]>
```

تبدیل هر آیتم آرایه:
- یک Observable جدید با آرایه تبدیل شده برمی‌گرداند
- با تغییر آرایه اصلی، آرایه تبدیل شده هم تغییر می‌کند

**پارامترها:**
- `mapper`: تابع تبدیل برای هر آیتم
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال:**
```typescript
const items = new Observable(["a", "b", "c"]);
const uppercased = items.mapArray(item => item.toUpperCase());

console.log(uppercased.get()); // ["A", "B", "C"]
items.set(["x", "y"]);
console.log(uppercased.get()); // ["X", "Y"]
```

---

### Static computed

```typescript
static computed<T>(fn: (...args: any[]) => T, observables: Observable<any>[], scope?: Scope): Observable<T>
```

ایجاد Observable محاسباتی از چند Observable:
- با تغییر هر کدام از Observableها، مقدار محاسبه می‌شود
- تابع computed با مقادیر فعلی همه Observableها اجرا می‌شود

**پارامترها:**
- `fn`: تابع محاسباتی
- `observables`: لیست Observableها
- `scope`: (اختیاری) scope برای مدیریت حافظه

**مثال:**
```typescript
const width = new Observable(10);
const height = new Observable(20);
const area = Observable.computed(
    (w, h) => w * h,
    [width, height]
);

console.log(area.get()); // 200
width.set(20);
console.log(area.get()); // 400
```

---

## متدهای خصوصی

### _mapValue

```typescript
private _mapValue<U>(value: T, mapping: Mapping<T, U>): U
```

تبدیل مقدار بر اساس mapping.

---

### _bindToScope

```typescript
private _bindToScope(unsub: () => void, scope?: Scope): void
```

اتصال unsubscribe به scope.

---

### _unwrapObservable

```typescript
private _unwrapObservable<U>(val: U | Observable<U>): U
```

استخراج مقدار از Observable اگر لازم باشد.

---

### _notify

```typescript
private _notify(): void
```

اطلاع‌رسانی به همه subscribers.

---

## مثال‌های کاربردی

### مثال 1: Observable ساده

```typescript
const count = new Observable(0);

count.subscribe(value => {
    console.log("Count:", value);
});

count.set(1); // Count: 1
count.set(2); // Count: 2
```

---

### مثال 2: استفاده از Scope

```typescript
const scope = new Scope();
const count = new Observable(0);

count.subscribe(value => {
    console.log("Count:", value);
}, scope);

// وقتی دیگر نیاز ندارید
scope.dispose(); // همه subscribeها cleanup می‌شوند
```

---

### مثال 3: map برای تبدیل

```typescript
const count = new Observable(5);
const doubled = count.map(c => c * 2);
const squared = count.map(c => c * c);

console.log(doubled.get()); // 10
console.log(squared.get()); // 25
```

---

### مثال 4: mapBoolean برای کلاس‌ها

```typescript
const isActive = new Observable(true);
const className = isActive.mapBoolean("active", "inactive");

className.subscribe(cls => {
    element.className = cls;
});
```

---

### مثال 5: mapArray برای لیست‌ها

```typescript
const names = new Observable(["Alice", "Bob"]);
const greetings = names.mapArray(name => `Hello, ${name}!`);

console.log(greetings.get()); // ["Hello, Alice!", "Hello, Bob!"]
```

---

### مثال 6: computed برای مقادیر محاسباتی

```typescript
const firstName = new Observable("John");
const lastName = new Observable("Doe");
const fullName = Observable.computed(
    (first, last) => `${first} ${last}`,
    [firstName, lastName]
);

console.log(fullName.get()); // "John Doe"
firstName.set("Jane");
console.log(fullName.get()); // "Jane Doe"
```

---

### مثال 7: mapList برای status mapping

```typescript
const status = new Observable("loading");
const message = status.mapList({
    loading: "Please wait...",
    success: "Done!",
    error: "Something went wrong",
    default: "Unknown status"
});

console.log(message.get()); // "Please wait..."
status.set("success");
console.log(message.get()); // "Done!"
```

---

### مثال 8: Scope با فرزندان

```typescript
const parentScope = new Scope();
const childScope = parentScope.createChild();

// در childScope
childScope.track(() => console.log("Child cleanup"));

// وقتی parent dispose شود، child هم dispose می‌شود
parentScope.dispose();
```

---

### مثال 9: زنجیره map

```typescript
const count = new Observable(10);
const result = count
    .map(c => c * 2)
    .map(c => c + 10)
    .map(c => c.toString());

console.log(result.get()); // "30"
```

---

### مثال 10: unsubscribe دستی

```typescript
const count = new Observable(0);

const unsub = count.subscribe(value => {
    console.log("Count:", value);
});

count.set(1); // Count: 1

unsub(); // unsubscribe

count.set(2); // چیزی چاپ نمی‌شود
```

---

## نکات مهم

### 1. مدیریت حافظه

- همیشه از Scope برای مدیریت حافظه استفاده کنید
- وقتی component از بین می‌رود، scope را dispose کنید
- این جلوگیری از memory leak است

---

### 2. مقایسه مقدار

- متد `set` مقدار جدید را با قبلی مقایسه می‌کند
- اگر یکی باشند، کاری نمی‌کند (بهینه‌سازی)

---

### 3. Type Safety

- Observable با TypeScript Generics type-safe است
- همیشه type را مشخص کنید

---

### 4. unsubscribe

- subscribe تابع unsubscribe برمی‌گرداند
- اگر scope استفاده نکنید، باید دستی unsubscribe کنید

---

### 5. computed

- computed برای مقادیر وابسته به چند Observable مفید است
- با تغییر هر کدام، مقدار محاسبه می‌شود

---

### 6. mapArray

- mapArray فقط برای آرایه‌هاست
- هر آیتم به صورت جداگانه تبدیل می‌شود

---

### 7. mapBoolean

- mapBoolean برای تبدیل boolean به دو مقدار مفید است
- معمولاً برای کلاس‌های CSS استفاده می‌شود

---

### 8. mapList

- mapList برای mapping object یا function مفید است
- برای status mapping و حالت‌های مختلف استفاده می‌شود

---

## بهترین شیوه‌ها

### 1. استفاده از Scope

```typescript
// ✅ خوب
const scope = new Scope();
observable.subscribe(fn, scope);

// ❌ بد
observable.subscribe(fn); // ممکن است memory leak
```

---

### 2. Type Specification

```typescript
// ✅ خوب
const count: Observable<number> = new Observable(0);

// ❌ بد
const count = new Observable(0); // types inference
```

---

### 3. unsubscribe در cleanup

```typescript
// ✅ خوب
const unsub = observable.subscribe(fn);
// در cleanup
unsub();

// ❌ بد
observable.subscribe(fn); // فراموش کردن unsubscribe
```

---

### 4. استفاده از map برای تبدیل

```typescript
// ✅ خوب
const doubled = count.map(c => c * 2);

// ❌ بد
const doubled = new Observable(count.get() * 2); // واکنشی نیست
```

---

### 5. computed برای مقادیر وابسته

```typescript
// ✅ خوب
const area = Observable.computed((w, h) => w * h, [width, height]);

// ❌ بد
const area = new Observable(width.get() * height.get()); // واکنشی نیست
```

---

## خلاصه

Observable یک کلاس قدرتمند برای:
- ✅ مدیریت وضعیت واکنشی
- ✅ اطلاع‌رسانی به subscribers
- ✅ تبدیل مقادیر با map
- ✅ مقادیر محاسباتی با computed
- ✅ مدیریت حافظه با Scope
- ✅ Type Safety با TypeScript

این کلاس پایه اصلی سیستم واکنشی در این معماری است.
