# ماژول زبان‌ها (Languages Module)

این ماژول مسئول مدیریت سیستم چندزبانی (Internationalization - i18n) است. وظیفه آن نگهداری دیکشنری‌های زبان، مدیریت تغییر زبان و فراهم کردن یک سیستم ترجمه واکنش‌گرا (Reactive Translation) برای کل اپلیکیشن است.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`App`** به کلاس اصلی دسترسی دارید:

### `App` (در اصل `ClLanguageApp`)
کلاس مدیریت مرکزی زبان‌ها و ترجمه‌ها.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `static setLanguage(lang)` | تغییر زبان سیستم و به‌روزرسانی خودکار جهت صفحه (RTL/LTR). |
| `static translate(key, params)` | بازگرداندن یک `Observable<string>` که با تغییر زبان، مقدار جدید را ارسال می‌کند. |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. تغییر زبان سیستم
```typescript
import { App } from "@/framework/core/languages";

// فرض کنید یک آبجکت تعریف شده برای زبان‌ها داریم
App.setLanguage(someLanguageDefinition);
```

### ۲. استفاده از ترجمه واکنش‌گرا (Reactive Translation)
یکی از قدرتمندترین ویژگی‌ها این است که خروجی `translate` یک `Observable` است. بنابراین اگر زبان کاربر تغییر کند، بدون نیاز به رندر مجدد دستی، متن‌ها در UI آپدیت می‌شوند:

```typescript
import { App } from "@/framework/core/languages";

// ترجمه یک کلید ساده با قابلیت جایگذاری پارامترها (Template)
const welcomeMessage$ = App.translate("welcome_message", { name: "Ali" });

// استفاده از این در یک کامپوننت UI (مثلاً در یک ReactiveElement)
welcomeMessage$.subscribe(text => {
    console.log("New translated text:", text); 
});
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Circular Dependency Management:** برای جلوگیری از وابستگی‌های چرخه‌ای (Circular Dependency) بین ماژول هسته زبان (`core_languages`) و دسته‌بندی‌های UI (`ui_categories`)، تابع ایجاد کلید ترجمه (`CreateTranslationKey`) به لایه `util_brands` منتقل شده است. این ماژول برای تایپ‌های خود و ساختار دیکشنری از آن استفاده می‌کند.
* **Initialization Requirements (Bootstrap):** این ماژول دارای یک ساختار داخلی برای بارگذاری دیکشنری‌ها است. پیش از استفاده از متد `translate`، حتماً باید:
    ۱. دیکشنری‌ها از طریق متد `initialize()` بارگذاری شوند.
    ۲. یک زبان فعال از طریق متد `setLanguage()` تنظیم شود.
    عدم انجام این مراحل باعث خطای `TypeError: Cannot read properties of undefined` در زمان ترجمه می‌شود. معمولاً این مراحل در فایل `src/framework/bootstrap/Language.ts` مدیریت می‌شوند.
* **Reactive Pipeline:** متد `translate` از طریق زنجیره `map` روی `CoreConfig.Configs.Language` عمل می‌کند تا هر تغییر در زبان، بلافاصله منجر به تولید رشته‌های ترجمه جدید شود.
* **Dictionary Resolver:** استفاده از متد `_getDictionary` برای استخراج داده‌ها از ساختار سلسله‌مراتبی `CoreLanguage.Directory`.
* **Template Engine:** استفاده از متد `_template` برای جایگذاری پارامترها (مانند `{{name}}`) در رشته‌های ترجمه شده.
* **Fallback Mechanism:** اگر کلید مورد نظر در زبان فعلی یافت نشد، سیستم به‌صورت خودکار از زبان پیش‌فرض (Fallback) استفاده کرده و در نهایت اگر هیچکدام یافت نشد، خودِ کلید را نمایش می‌دهد تا از شکست عملیات جلوگیری شود.

---
*مستندات توسط Mindbase تولید شده است.*