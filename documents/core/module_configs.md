# ماژول تنظیمات (Configs Module)

این ماژول مرکز مدیریت تمامی تنظیمات سیستم (Global Settings) است. وظیفه آن نگهداری و مدیریت متمرکزِ وضعیت‌ها (States) مانند زبان، جهت صفحه (RTL/LTR)، تم‌ها، اندازه‌ها و غیره است. این ماژول از مدل **Singleton Registry** استفاده می‌کند تا اطمینان حاصل شود که تمام اجزای سیستم از یک نسخه واحد از تنظیمات استفاده می‌کنند.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، دو بخش اصلی برای توسعه‌دهندگان در دسترس است:

### ۱. `App` (در اصل `ClConfigApp`)
کلاس مدیریت مرکزی برای تعریف و دریافت وضعیت‌های تنظیمات.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `static state(definition)` | بازگرداندن یک نمونه از `ConfigState` برای یک تعریف مشخص (Definition). اگر وجود نداشته باشد، آن را می‌سازد. |

### ۲. `Settings` (شیء تنظیمات پیش‌فرض)
یک مجموعه‌ی آماده از تنظیمات واکنش‌گرا (Reactive Settings) که اکثر پروژه‌ها به آن‌ها نیاز دارند:

| نام تنظیم | نوع وضعیت | توضیحات |
| :--- | :--- | :--- |
| `Language` | `ConfigState<Language>` | مدیریت زبان فعلی سیستم. |
| `DirectionRtl` | `ConfigState<boolean>` | مدیریت جهت نمایش (RTL/LTR). |
| `SizeName` | `ConfigState<string>` | مدیریت اندازه استاندارد اجزا (مثلاً small, medium, large). |
| `FontName` | `ConfigState<string>` | مدیریت فونت پیش‌فرض سیستم. |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده از تنظیمات موجود در `Settings`
```typescript
import { App } from "@/framework/core/configs";

// تغییر زبان به صورت واکنش‌گرا
App.Settings.Language.set(newLanguageDefinition);

// گوش دادن به تغییرات جهت صفحه (RTL/LTR)
App.Settings.DirectionRtl.subscribe(isRtl => {
    console.log("Direction changed to:", isRtl ? "RTL" : "LTR");
});
```

### ۲. تعریف یک تنظیم جدید (Custom Config State)
اگر نیاز دارید تنظیم خاصی را که در `Settings` پیش‌فرض نیست اضافه کنید:

```typescript
import { App } from "@/framework/core/configs";

// فرض می‌کنیم ما یک تعریف برای 'Theme' داریم
const themeSetting = App.state({
    name: "theme",
    default: "light"
});

// تغییر مقدار
themeSetting.set("dark");

// استفاده در کد
console.log(themeSetting.get()); // "dark"
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Registry Pattern:** کلاس `ClConfigApp` از یک `Map` داخلی (`_states`) برای ذخیره و مدیریت تمام `ConfigState`‌ها استفاده می‌کند تا از ایجاد نمونه‌های تکراری جلوگیری کند.
* **Reactive Integration:** هر تنظیم در این ماژول، در واقع یک `Observable` است (از طریق `ConfigState`)، یعنی تغییر یک تنظیم به صورت خودکار باعث به‌روزرسانی تمامی اجزای UI می‌شود که به آن تنظیم وابسته هستند.
* **Type Safety:** با استفاده از `IConfigState<T>`، سیستم تضمین می‌کند که هر تنظیم همواره تایپ درستی را حفظ می‌کند و در هنگام کار با مقادیر (مانند `set` یا `get`) خطای منطقی رخ نمی‌دهد.

---
*مستندات توسط Mindbase تولید شده است.*