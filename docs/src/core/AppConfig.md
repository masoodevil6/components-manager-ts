# AppConfig - راهنمای جامع

## مقدمه

`AppConfig` یک کلاس استاتیک برای مدیریت تنظیمات سراسری برنامه است. این کلاس امکان ذخیره، بازیابی، subscribe به تغییرات و مدیریت رنگ‌ها را فراهم می‌کند.

---

## ویژگی‌های استاتیک

### _state

```typescript
static _state = {
    directionRtl:      false,
    language:          "en",
    sizeNameSmall:     SIZES.S,
    sizeName:          SIZES.M,
    sizeNameLarge:     SIZES.L,
    stdHeight:         25,
}
```

وضعیت سراسری برنامه:
- `directionRtl`: جهت متن (راست‌چین یا چپ‌چین)
- `language`: زبان فعلی
- `sizeNameSmall`: اندازه کوچک
- `sizeName`: اندازه متوسط
- `sizeNameLarge`: اندازه بزرگ
- `stdHeight`: ارتفاع استاندارد

---

### _subscribers

```typescript
static _subscribers = new Map()
```

Map برای نگهداری subscribers برای هر key.

---

## متدهای اصلی

### get

```typescript
static get<K extends keyof typeof AppConfig._state>(key: K, defaultValue: typeof AppConfig._state[K] = null as any)
```

بازیابی مقدار یک تنظیم:
- مقدار فعلی را برمی‌گرداند
- اگر مقدار null باشد، defaultValue را برمی‌گرداند

**پارامترها:**
- `key`: نام تنظیم (type-safe)
- `defaultValue`: (اختیاری) مقدار پیش‌فرض

**مثال:**
```typescript
const language = AppConfig.get("language");
const direction = AppConfig.get("directionRtl", false);
```

---

### set

```typescript
static set<K extends keyof typeof AppConfig._state>(key: K, value: typeof AppConfig._state[K])
```

تغییر مقدار یک تنظیم:
- اگر مقدار جدید با قبلی یکی باشد، کاری نمی‌کند
- مقدار را تغییر می‌دهد
- subscribers را اطلاع می‌دهد

**پارامترها:**
- `key`: نام تنظیم (type-safe)
- `value`: مقدار جدید

**مثال:**
```typescript
AppConfig.set("language", "fa");
AppConfig.set("directionRtl", true);
```

---

### subscribe

```typescript
static subscribe(key: keyof typeof AppConfig._state, callback: (value: any) => void)
```

اشتراک در تغییرات یک تنظیم:
- با تغییر مقدار، callback اجرا می‌شود
- تابع unsubscribe را برمی‌گرداند

**پارامترها:**
- `key`: نام تنظیم
- `callback`: تابعی که با هر تغییر اجرا می‌شود

**مثال:**
```typescript
const unsub = AppConfig.subscribe("language", (value) => {
    console.log("Language changed:", value);
});

// برای unsubscribe
unsub();
```

---

### _notify

```typescript
static _notify(key: keyof typeof AppConfig._state, value: any)
```

اطلاع‌رسانی به subscribers یک key:
- تمام callbackهای ثبت شده برای آن key را اجرا می‌کند

---

### observable

```typescript
static observable<K extends keyof typeof AppConfig._state>(key: K)
```

ایجاد Observable از یک تنظیم:
- یک Observable جدید با مقدار فعلی برمی‌گرداند
- با تغییر تنظیم، Observable به‌روزرسانی می‌شود

**پارامترها:**
- `key`: نام تنظیم

**مثال:**
```typescript
const languageObs = AppConfig.observable("language");
languageObs.subscribe(value => {
    console.log("Language:", value);
});
```

---

### color

```typescript
static color = {
    get(name: string),
    set(name: string, value: string)
}
```

مدیریت رنگ‌های CSS Custom Properties.

#### color.get

```typescript
static color.get(name: string)
```

بازیابی مقدار یک CSS variable.

**مثال:**
```typescript
const primaryColor = AppConfig.color.get("primary-color");
```

#### color.set

```typescript
static color.set(name: string, value: string)
```

تغییر مقدار یک CSS variable.

**مثال:**
```typescript
AppConfig.color.set("primary-color", "#ff0000");
```

---

## مثال‌های کاربردی

### مثال 1: دریافت تنظیمات

```typescript
const language = AppConfig.get("language");
const direction = AppConfig.get("directionRtl");
const size = AppConfig.get("sizeName");
```

---

### مثال 2: تغییر تنظیمات

```typescript
AppConfig.set("language", "fa");
AppConfig.set("directionRtl", true);
AppConfig.set("sizeName", SIZES.L);
```

---

### مثال 3: subscribe به تغییرات

```typescript
const unsub = AppConfig.subscribe("language", (value) => {
    console.log("Language changed to:", value);
    // به‌روزرسانی UI
});

// وقتی دیگر نیاز ندارید
unsub();
```

---

### مثال 4: استفاده از Observable

```typescript
const languageObs = AppConfig.observable("language");

// در ReactiveElement
const element = new ReactiveElement("div", {
    children: languageObs
});
```

---

### مثال 5: مدیریت رنگ‌ها

```typescript
// دریافت رنگ
const primary = AppConfig.color.get("primary-color");

// تغییر رنگ
AppConfig.color.set("primary-color", "#007bff");

// در CSS
// :root {
//     --primary-color: #007bff;
// }
```

---

### مثال 6: ترکیب با Observable

```typescript
const language = AppConfig.observable("language");
const direction = AppConfig.observable("directionRtl");

// استفاده در کامپوننت
const title = language.map(lang => {
    return lang === "fa" ? "عنوان" : "Title";
});
```

---

### مثال 7: تغییر زبان و جهت

```typescript
// تغییر به فارسی
AppConfig.set("language", "fa");
AppConfig.set("directionRtl", true);

// تغییر به انگلیسی
AppConfig.set("language", "en");
AppConfig.set("directionRtl", false);
```

---

### مثال 8: استفاده از defaultValue

```typescript
const customValue = AppConfig.get("customKey", "default");
```

---

### مثال 9: چندین subscriber

```typescript
AppConfig.subscribe("language", (value) => {
    console.log("Subscriber 1:", value);
});

AppConfig.subscribe("language", (value) => {
    console.log("Subscriber 2:", value);
});

// هر دو با تغییر اجرا می‌شوند
AppConfig.set("language", "fa");
```

---

### مثال 10: تغییر رنگ داینامیک

```typescript
const themeColor = AppConfig.observable("theme-color");

// در ReactiveElement
const button = new ReactiveElement("button", {
    stylesBind: {
        backgroundColor: themeColor
    }
});

// تغییر رنگ
AppConfig.color.set("theme-color", "#ff0000");
```

---

## نکات مهم

### 1. Type Safety

- همه متدها type-safe هستند
- TypeScript خطاها را قبل از runtime تشخیص می‌دهد

---

### 2. Singleton Pattern

- AppConfig یک کلاس استاتیک است
- فقط یک instance وجود دارد

---

### 3. Subscribe/Unsubscribe

- همیشه unsubscribe کنید وقتی دیگر نیاز ندارید
- این جلوگیری از memory leak است

---

### 4. Observable Integration

- `observable` برای یکپارچگی با سیستم Observable استفاده می‌شود
- مناسب برای ReactiveElement و ComponentBase

---

### 5. CSS Variables

- `color` برای مدیریت CSS Custom Properties استفاده می‌شود
- تغییرات فوراً در UI اعمال می‌شود

---

### 6. State Comparison

- `set` مقدار جدید را با قبلی مقایسه می‌کند
- اگر یکی باشند، کاری نمی‌کند (بهینه‌سازی)

---

## بهترین شیوه‌ها

### 1. استفاده از Observable در کامپوننت‌ها

```typescript
// ✅ خوب
const language = AppConfig.observable("language");

// ❌ بد
const language = AppConfig.get("language"); // واکنشی نیست
```

---

### 2. unsubscribe در cleanup

```typescript
// ✅ خوب
const unsub = AppConfig.subscribe("key", fn);
// در cleanup
unsub();

// ❌ بد
AppConfig.subscribe("key", fn); // فراموش کردن unsubscribe
```

---

### 3. استفاده از color برای تم

```typescript
// ✅ خوب
AppConfig.color.set("primary-color", "#007bff");

// ❌ بد
document.documentElement.style.setProperty("--primary-color", "#007bff");
```

---

### 4. Type-safe access

```typescript
// ✅ خوب
const language = AppConfig.get("language");

// ❌ بد
const language = AppConfig.get("language" as any);
```

---

### 5. استفاده در Language class

```typescript
// در Language.ts
static async setLanguage(lang: string) {
    AppConfig.set("language", lang);
    const meta = this.languages.find(l => l.code === lang);
    if (meta) {
        AppConfig.set("directionRtl", meta.rtl);
    }
}
```

---

## خلاصه

AppConfig یک کلاس قدرتمند برای:
- ✅ مدیریت تنظیمات سراسری
- ✅ Type-safe state management
- ✅ Subscribe به تغییرات
- ✅ Observable integration
- ✅ مدیریت CSS Variables
- ✅ Singleton pattern

این کلاس پایه اصلی مدیریت تنظیمات در این معماری است.
