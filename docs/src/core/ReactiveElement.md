# ReactiveElement - راهنمای جامع

## مقدمه

`ReactiveElement` یک کلاس قدرتمند برای ایجاد المان‌های DOM واکنشی است که به صورت خودکار با تغییر Observableها به‌روزرسانی می‌شود. این کلاس پایه اصلی برای ساخت UI واکنشی در این معماری است.

---

## نسخه

```typescript
static version: string = "1.0.0-beta";
```

---

## ساختار کلاس

### ویژگی‌های عمومی

```typescript
tagName: string;              // نام تگ HTML
element: HTMLElement;        // المان DOM واقعی
```

### ویژگی‌های خصوصی

```typescript
private _options: Options;                           // تنظیمات المان
private _eventListeners: EventListenerRecord[] = []; // لیست لیسنرهای رویداد
private _states: Set<string> = new Set();            // وضعیت‌های المان (مثل disabled)
private _children: any[] = [];                       // المان‌های فرزند
private _hoverHandlers: Record<string, any> = {};    // هندلرهای hover
private _bindings: (() => void)[] = [];              // لیست unsubscribeها
```

### Observableهای داخلی

```typescript
hover: Observable<boolean>;  // وضعیت hover المان
focus: Observable<boolean>;  // وضعیت focus المان
active: Observable<boolean>; // وضعیت active المان
```

---

## Type Definitions

### Options

```typescript
type Options = {
    children?: any;                                    // فرزندان المان
    className?: ClassValue;                           // کلاس‌های CSS
    classBind?: any;                                  // کلاس‌های واکنشی
    styles?: StyleMap;                                 // استایل‌های ثابت
    stylesCustom?: string;                             // CSS سفارشی
    stylesBind?: any;                                  // استایل‌های واکنشی
    attrs?: AttrMap;                                   // ویژگی‌های ثابت
    attrsBind?: Record<string, Observable<any>>;      // ویژگی‌های واکنشی
    on?: EventMap;                                     // رویدادها
};
```

### ClassValue

```typescript
type ClassValue = string | string[];
```

### StyleMap

```typescript
type StyleMap = Record<string, string>;
```

### AttrMap

```typescript
type AttrMap = Record<string, string | boolean | null | undefined>;
```

### EventMap

```typescript
type EventMap = Record<string, (e: Event) => void>;
```

---

## Constructor

```typescript
constructor(tagName: string, options: Options = {})
```

**پارامترها:**
- `tagName`: نام تگ HTML (مثلاً "div", "button", "input")
- `options`: تنظیمات المان (اختیاری)

**عملکرد:**
1. ایجاد المان DOM با `document.createElement(tagName)`
2. تنظیم Observableهای داخلی (hover, focus, active)
3. اتصال لیسنرهای رویداد برای Observableها
4. اعمال تنظیمات از طریق `_applyOptions()`

---

## متدهای اصلی

### ایجاد المان

#### Static create

```typescript
static create(tagName: string, options?: Options): ReactiveElement
```

ایجاد یک ReactiveElement جدید.

---

#### Static component

```typescript
static component(componentName: string, options?: Options): ReactiveElement
```

ایجاد المان با پیشوند `component-`.

---

#### Static part

```typescript
static part(el: string = "section", options?: Options): ReactiveElement
```

ایجاد المان بخش (section).

---

#### Static helpers

```typescript
static div(options?: Options): ReactiveElement
static button(options?: Options): ReactiveElement
static span(options?: Options): ReactiveElement
static input(options?: Options): ReactiveElement
static label(options?: Options): ReactiveElement
// ... و غیره
```

شورت‌کات‌ها برای تگ‌های رایج HTML.

---

### مدیریت فرزندان

#### _setChildren

```typescript
private _setChildren(children: any): void
```

**عملکرد:**
- پاک کردن فرزندان قبلی
- پشتیبانی از انواع مختلف فرزندان:
  - `ReactiveElement`
  - `HTMLElement`
  - `Observable` (با به‌روزرسانی خودکار)
  - `string` (HTML یا متن ساده)
  - `Array` (از هر نوع بالا)
  - `function` (با اجرا و استفاده از خروجی)

**نکته مهم برای Observable:**
- از comment nodes برای محدود کردن محدوده استفاده می‌کند
- فقط محدوده خود observable را پاک می‌کند
- از `subscribe` برای به‌روزرسانی خودکار استفاده می‌کند

---

### مدیریت کلاس‌ها

#### _applyClassName

```typescript
private _applyClassName(className?: ClassValue): void
```

اعمال کلاس‌های ثابت:
- اگر `string`: مستقیماً به `className` نسبت داده می‌شود
- اگر `Array[]`: با space join می‌شود

---

#### _applyClassBind

```typescript
private _applyClassBind(classBind: Observable<any>[]): void
```

اعمال کلاس‌های واکنشی:
- قبول آرایه‌ای از Observableها
- هر Observable می‌تواند `string` یا `Array<string>` برگرداند
- کلاس‌های قبلی را حذف و کلاس‌های جدید را اضافه می‌کند
- از `subscribe` برای به‌روزرسانی خودکار استفاده می‌کند

**مثال:**
```typescript
classBind: [
    prop_show.mapBoolean("show", "d-none"),
    prop_isActive.mapBoolean("active", "inactive")
]
```

---

### مدیریت استایل‌ها

#### _applyStyles

```typescript
private _applyStyles(styles?: StyleMap): void
```

اعمال استایل‌های ثابت به `element.style`.

---

#### _applyStylesBind

```typescript
private _applyStylesBind(stylesBind: Record<string, Observable<any>> | Observable<Record<string, any>>): void
```

اعمال استایل‌های واکنشی:

**حالت 1: Record<string, Observable>**
```typescript
stylesBind: {
    color: prop_color,
    backgroundColor: prop_bgColor
}
```

**حالت 2: Observable<Record>**
```typescript
stylesBind: prop_stylesObject
```

**پشتیبانی از CSS Custom Properties:**
```typescript
// اگر key با -- شروع شود، از setProperty استفاده می‌کند
stylesBind: {
    "--primary-color": prop_primaryColor
}
```

---

#### _applyCustomStyle

```typescript
private _applyCustomStyle(css?: string): void
```

اضافه کردن CSS سفارشی به عنوان `<style>` در ابتدای المان.

---

### مدیریت ویژگی‌ها (Attributes)

#### _applyAttrs

```typescript
private _applyAttrs(attrs?: AttrMap): void
```

اعمال ویژگی‌های ثابت:
- اگر مقدار `false` یا `null` باشد، set نمی‌شود
- مقادیر به `String` تبدیل می‌شوند

---

#### _applyAttrsBind

```typescript
private _applyAttrsBind(attrsBind?: Record<string, Observable<any>>): void
```

اعمال ویژگی‌های واکنشی:
- با تغییر Observable، ویژگی به‌روزرسانی می‌شود
- اگر مقدار `false` یا `null` شود، ویژگی حذف می‌شود

**مثال:**
```typescript
attrsBind: {
    disabled: prop_isDisable,
    readonly: prop_isReadOnly
}
```

---

### مدیریت رویدادها (Events)

#### _setEvents

```typescript
private _setEvents(): void
```

تنظیم رویدادها از `options.on`:
- لیسنرهای قبلی را حذف می‌کند
- لیسنرهای جدید را اضافه می‌کند
- اگر المان disabled باشد، رویدادها را بلاک می‌کند (به جز mouseenter/mouseleave)

---

#### on

```typescript
on(event: string, handler: (e: Event) => void): ReactiveElement
```

اضافه کردن لیسنر رویداد جدید.

---

#### off

```typescript
off(event: string, handler: EventListener | null = null): ReactiveElement
```

حذف لیسنر رویداد.

---

#### _addEvent

```typescript
private _addEvent(event: string, handler: (e: Event) => void): ReactiveElement
```

اضافه کردن لیسنر با wrapper برای disabled state.

---

#### _removeEvent

```typescript
private _removeEvent(event: string, handler: EventListener | null = null): ReactiveElement
```

حذف لیسنر.

---

### متدهای کمکی

#### _bindObservable

```typescript
private _bindObservable<T>(observable: Observable<T>, callback: (v: T) => void): void
```

اتصال Observable به callback:
- مقدار فعلی را اعمال می‌کند
- subscribe می‌کند و unsubscribe را در `_bindings` ذخیره می‌کند

---

#### _applyOptions

```typescript
private _applyOptions(): void
```

اعمال تمام تنظیمات به ترتیب:
1. children
2. attrs و attrsBind
3. className و classBind
4. styles، stylesCustom و stylesBind
5. on (رویدادها)

---

### متدهای عمومی

#### getReactiveElement

```typescript
getReactiveElement(): ReactiveElement
```

بازگشت خود ReactiveElement.

---

#### getElement

```typescript
getElement(): HTMLElement
```

بازگشت المان DOM واقعی.

---

#### remove

```typescript
remove(): void
```

حذف المان از DOM.

---

## Observableهای داخلی

### hover

```typescript
hover: Observable<boolean>
```

- `true` وقتی mouse روی المان است
- `false` وقتی mouse از المان خارج می‌شود

**لیسنرها:**
- `mouseenter` → `true`
- `mouseleave` → `false`

---

### focus

```typescript
focus: Observable<boolean>
```

- `true` وقتی المان focus دارد
- `false` وقتی focus از دست می‌رود

**لیسنرها:**
- `focus` → `true` (با capture: true)
- `blur` → `false` (با capture: true)

---

### active

```typescript
active: Observable<boolean>
```

- `true` وقتی mouse button فشرده شده
- `false` وقتی mouse button رها شده یا mouse خارج می‌شود

**لیسنرها:**
- `mousedown` → `true`
- `mouseup` → `false`
- `mouseleave` → `false`

---

## مثال‌های کاربردی

### مثال 1: ایجاد المان ساده

```typescript
const div = new ReactiveElement("div", {
    className: "container",
    styles: {
        padding: "20px",
        backgroundColor: "#f0f0f0"
    }
});

document.body.appendChild(div.getElement());
```

---

### مثال 2: استفاده از Observable برای استایل

```typescript
const color = new Observable("red");

const div = new ReactiveElement("div", {
    stylesBind: {
        color: color
    }
});

// تغییر رنگ به صورت خودکار
color.set("blue"); // استایل به‌روزرسانی می‌شود
```

---

### مثال 3: کلاس‌های واکنشی

```typescript
const isVisible = new Observable(true);
const isActive = new Observable(false);

const button = new ReactiveElement("button", {
    classBind: [
        isVisible.mapBoolean("visible", "hidden"),
        isActive.mapBoolean("active", "inactive")
    ]
});
```

---

### مثال 4: فرزندان واکنشی

```typescript
const items = new Observable(["Item 1", "Item 2"]);

const list = new ReactiveElement("ul", {
    children: items.mapArray(item => 
        new ReactiveElement("li", {
            children: item
        })
    )
});

// اضافه کردن آیتم جدید
items.set([...items.get(), "Item 3"]); // لیست به‌روزرسانی می‌شود
```

---

### مثال 5: رویدادها

```typescript
const button = new ReactiveElement("button", {
    children: "Click me",
    on: {
        click: (e) => {
            console.log("Button clicked!");
        },
        mouseenter: (e) => {
            console.log("Mouse entered");
        }
    }
});
```

---

### مثال 6: ترکیب با Observableهای داخلی

```typescript
const button = new ReactiveElement("button", {
    children: "Hover me",
    stylesBind: {
        backgroundColor: button.hover.map(h => h ? "lightblue" : "white")
    }
});
```

---

### مثال 7: CSS Custom Properties

```typescript
const primaryColor = new Observable("#007bff");

const container = new ReactiveElement("div", {
    stylesBind: {
        "--primary-color": primaryColor
    },
    children: `
        <style>
            .child {
                color: var(--primary-color);
            }
        </style>
        <div class="child">Text with dynamic color</div>
    `
});
```

---

### مثال 8: استفاده از Static Helpers

```typescript
// به جای new ReactiveElement("div", {...})
const div = ReactiveElement.div({
    className: "container",
    children: "Hello World"
});

const button = ReactiveElement.button({
    children: "Click me",
    on: {
        click: () => console.log("Clicked")
    }
});
```

---

### مثال 9: فرزندان تابعی

```typescript
const count = new Observable(0);

const counter = new ReactiveElement("div", {
    children: (self) => [
        ReactiveElement.button({
            children: "-",
            on: {
                click: () => count.set(count.get() - 1)
            }
        }),
        ReactiveElement.span({
            children: count
        }),
        ReactiveElement.button({
            children: "+",
            on: {
                click: () => count.set(count.get() + 1)
            }
        })
    ]
});
```

---

### مثال 10: HTML Template

```typescript
const card = new ReactiveElement("div", {
    className: "container",
    children: `
        <div class="card">
            <h2>Title</h2>
            <p>Description</p>
        </div>
    `
});
```

---

## نکات مهم

### 1. مدیریت حافظه

- تمام subscribeها در `_bindings` ذخیره می‌شوند
- برای جلوگیری از memory leak، باید unsubscribe کنید
- در ComponentBase، Scope این کار را انجام می‌دهد

---

### 2. ترتیب اعمال تنظیمات

در `_applyOptions` تنظیمات به این ترتیب اعمال می‌شوند:
1. children
2. attrs و attrsBind
3. className و classBind
4. styles، stylesCustom و stylesBind
5. on (رویدادها)

این ترتیب مهم است چون:
- children باید قبل از attrs اعمال شود
- attrs باید قبل از className اعمال شود
- رویدادها آخر اعمال می‌شوند تا همه چیز آماده باشد

---

### 3. Disabled State

- اگر المان در state `disabled` باشد، تمام رویدادها به جز mouseenter/mouseleave بلاک می‌شوند
- این برای کامپوننت‌های input مفید است

---

### 4. Observable در children

- Observable در children با comment nodes محدود می‌شود
- فقط محدوده خود observable را پاک می‌کند (نه کل المان)
- این برای لیست‌های واکنشی بسیار مفید است

---

### 5. CSS Custom Properties

- استایل‌هایی که با `--` شروع می‌شوند با `setProperty` اعمال می‌شوند
- این برای CSS Variables مفید است

---

### 6. Type Safety

- تمام typeها تعریف شده‌اند
- TypeScript می‌تواند خطاها را قبل از runtime تشخیص دهد

---

## مقایسه با React

| ویژگی | ReactiveElement | React |
|-------|----------------|-------|
| Virtual DOM | ندارد (مستقیم DOM) | دارد |
| Re-render | فقط بخش تغییر کرده | کل component |
| Bundle Size | کوچک | بزرگتر |
| Learning Curve | ساده | پیچیده‌تر |
| Performance | سریع برای موارد ساده | بهینه برای برنامه‌های بزرگ |

---

## بهترین شیوه‌ها

### 1. استفاده از Observable

همیشه از Observable برای مقادیر واکنشی استفاده کنید:

```typescript
// ✅ خوب
const color = new Observable("red");
stylesBind: { color: color }

// ❌ بد
stylesBind: { color: "red" } // ثابت، واکنشی نیست
```

---

### 2. استفاده از map برای تبدیل

از `map` برای تبدیل مقادیر استفاده کنید:

```typescript
const isActive = new Observable(true);
classBind: [
    isActive.mapBoolean("active", "inactive")
]
```

---

### 3. مدیریت حافظه

در ComponentBase، Scope مدیریت حافظه را انجام می‌دهد. اگر مستقیماً استفاده می‌کنید، حواستان به unsubscribe باشد:

```typescript
const unsub = observable.subscribe(value => {
    // ...
});

// وقتی دیگر نیاز ندارید
unsub();
```

---

### 4. استفاده از Static Helpers

برای خوانایی بیشتر، از static helpers استفاده کنید:

```typescript
// ✅ خوب
const div = ReactiveElement.div({...});

// ❌ بد
const div = new ReactiveElement("div", {...});
```

---

### 5. ترکیب با ComponentBase

ReactiveElement معمولاً در ComponentBase استفاده می‌شود:

```typescript
override renderContentComponent() {
    return this.executeSchemaPart(ComponentConfigs.schemas.Main.name);
}
```

---

## خلاصه

ReactiveElement یک کلاس قدرتمند برای:
- ✅ ایجاد المان‌های DOM واکنشی
- ✅ اتصال Observable به استایل‌ها، کلاس‌ها، ویژگی‌ها و فرزندان
- ✅ مدیریت رویدادها
- ✅ Observableهای داخلی (hover, focus, active)
- ✅ پشتیبانی از HTML template
- ✅ Type Safety با TypeScript

این کلاس پایه اصلی برای ساخت کامپوننت‌های واکنشی در این معماری است.
