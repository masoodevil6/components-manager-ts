# ماژول روتینگ (Routing Module)

این ماژول مسئول مدیریت پیمایش (Navigation) در اپلیکیشن است. وظیفه آن همگام‌سازی وضعیت URL مرورگر با محتوای نمایش داده شده در صفحه و مدیریت چرخه حیات صفحات (Pages) بر اساس مسیرهای تعریف شده است.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`App`** به کلاس اصلی دسترسی دارید:

### `App` (در اصل `ClRouter`)
کلاس مدیریت مرکزی روتینگ و ناوبری.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `constructor(root, routes)` | ایجاد یک روتِر جدید با تعیین المان اصلی (Root) و نقشه مسیرها (Routes). |
| `navigate(path)` | تغییر مسیر اپلیکیشن به یک آدرس جدید بدون رفرش شدن صفحه. |
| `resolve()` | تحلیل مسیر فعلی (`location.pathname`) و رندر کردن صفحه مربوطه. |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. راه‌اندازی روتِر در اپلیکیشن
در نقطه شروع اپلیکیشن (مثلاً در `app.ts`)، باید روتِر را با نقشه صفحات خودی مقداردهی کنید:

```typescript
import { App as Router } from "@/framework/core/route";
import { PageMap } from "@/framework/ui/module_pages";

// فرض کنید المان اصلی ما یک div با id="app" است
const rootElement = document.getElementById("app")!;

// راه‌اندازی روتِر با استفاده از نقشه صفحات تعریف شده
const router = new Router(rootElement, PageMap);
```

### ۲. پیمایش برنامه‌نویسی شده (Programmatic Navigation)
برای انتقال کاربر به یک صفحه دیگر (مثلاً بعد از کلیک روی یک دکمه یا انجام یک عملیات):

```typescript
// انتقال به صفحه پروفایل
router.navigate("/profile");

// انتقال به صفحه لیست محصولات
router.navigate("/products");
```

### ۳. مدیریت پارامترهای URL (Query Params)
سیستم به‌طور خودکار پارامترهای موجود در URL را استخراج کرده و در متد `render` صفحات در اختیار آن‌ها قرار می‌دهد:

```typescript
// اگر آدرس این باشد: /search?query=react
// در داخل کلاس صفحه، پارامترها به صورت زیر در دسترس هستند:
// query = { query: "react" }
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **History API Integration:** استفاده از `history.pushState` برای مدیریت پیمایش بدون رفرش شدن صفحه (Single Page Application - SPA).
* **Popstate Listener:** گوش دادن به رویداد `popstate` مرورگر برای مدیریت دکمه‌های "Back" و "Forward" کاربر.
* **Automatic Page Lifecycle:** پس از شناسایی مسیر، سیستم به‌طور خودکار یک نمونه از کلاس صفحه مربوطه می‌سازد، متد `render` را فراخوانی می‌کند و در نهایت متد `onLoad` را برای آماده‌سازی نهایی اجرا می‌نماید.
* **Title Management:** مدیریت خودکار عنوان صفحه (`<title>`) بر اساس اطلاعات ارائه شده در `headerTitle` هر مسیر.

---
*مستندات توسط Mindbase تولید شده است.*