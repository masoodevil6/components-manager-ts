# ماژول Reactive (مدیریت المان‌های واکنشی)

این ماژول قلب تپنده رابط کاربری در سیستم شماست. وظیفه آن مدیریت چرخه حیات (Lifecycle)، اتصال هوشمند (Binding) از وضعیت به DOM، و ایجاد یک لایه انتزاعی برای عناصر HTML است.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`App`** به کلاس اصلی دسترسی دارید:

### `App` (در اصل `ClReactiveElement`)
کلاس پایه برای تمامی عناصر واکنشی.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `static create(tag, options)` | ساخت یک المان جدید با تنظیمات اولیه. |
| `static div()`, `static button()` ... | متدهای کمکی برای ساخت سریع انواع تگ‌های HTML. |
| `static part(el, o)` | ایجاد یک بخش (Section) مخصوص برای مدیریت رندرینگ جزئی. |
| `on(event, handler)` | اضافه کردن یک شنیده (Listener) به المان با قابلیت مدیریت وضعیت (مانند disabled). |
| `off(event, handler)` | حذف شنیده از المان. |
| `getElement()` | بازگرداندن شیء اصلی `HTMLElement`. |
| `remove()` | حذف کامل المان از DOM و پاکسازی حافظه. |
| `focusFn() / blurFn()` | مدیریت تمرکز (Focus) روی المان به صورت زنجیره‌ای. |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. ساخت یک المان ساده و افزودن رویداد
```typescript
import { App } from "@/framework/core/reactive";

const myButton = App.button({
    className: "btn-primary",
    on: {
        click: (e) => console.log("Button Clicked!")
    }
});

// اضافه کردن به بدنه صفحه
document.body.appendChild(myButton.getElement());
```

### ۲. استفاده از متدهای استاتیک برای ساختار سریع
```typescript
import { App } from "@/framework/core/reactive";

const card = App.div({ className: "card" });
const title = App.h1({ className: "title" });

card.getElement().appendChild(title.getElement());
document.body.appendChild(card.getElement());
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Binding Engine:** به صورت خودکار تغییرات در `Attributes` و `Styles` را از طریق `Observable`ها رصد کرده و بدون رندر مجدد کل المان، فقط ویژگی مربوطه را آپدیت می‌کند.
* **Comment-based Scoping (`obs-start`/`obs-end`):** برای مدیریت محتوای متنی یا فرزندان واکنشی، از کامنت‌های HTML استفاده می‌شود تا محدوده دقیق تغییرات (DOM Node) مشخص باشد و عملکرد (Performance) به شدت بالا برود.
* **Event Wrapper:** تمامی رویدادهای ثبت شده توسط `on()`، با یک Wrapper هوشمند مدیریت می‌شوند که اگر المان در وضعیت `disabled` باشد، از اجرای منطق جلوگیری می‌کند.

---
*مستندات توسط Mindbase تولید شده است.*