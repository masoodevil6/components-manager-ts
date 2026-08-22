# ماژول صفحات (Pages Module)

این ماژول مسئول مدیریت صفحات اصلی اپلیکیشن و تعریف مسیرهای روتینگ (Routing) است. هر صفحه در این ماژول، یک پیاده‌سازی از `ITemplate` است که وظیفه‌ی رندر کردن محتوای کامل یک مسیر را بر عهده دارد.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، دو بخش اصلی برای توسعه‌دهندگان در دسترس است:

### ۱. `Pages` (مجموعه صفحات)
شامل کلاس‌های اصلی هر صفحه که به صورت ساده شده (Simplified) اکسپوز شده‌اند:

| نام صفحه | کلاس اصلی | توضیحات |
| :--- | :--- | :--- |
| `Home` | `ClHomePage` | صفحه اصلی اپلیکیشن. |
| `Icon` | `ClIconPage` | صفحه نمایش مجموعه آیکون‌ها. |
| `Tests` | `ClTestsPage` | صفحه تست‌های سیستم. |

### ۲. `PageMap` (نقشه مسیرها)
این یک شیء ثابت (Constant) است که تمام مسیرهای تعریف شده در اپلیکیشن را به همراه قالب (`template`) و داده‌های اولیه (`data`) نگهداری می‌کند. این نقشه توسط سیستم روتینگ برای شناسایی صفحات استفاده می‌شود.

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده از `PageMap` برای روتینگ
در ساختار اصلی اپلیکیشن، سیستم روتینگ از `PageMap` برای تشخیص صفحه صحیح استفاده می‌کند:

```typescript
import { PageMap } from "@/framework/ui/module_pages";

// مثال: پیدا کردن قالب مربوط به مسیر "/"
const currentRoute = "/";
const pageTemplate = PageMap[currentRoute].template;

console.log(`Loading template for route: ${currentRoute}`);
```

### ۲. استفاده مستقیم از یک صفحه
اگر بخواهید یک صفحه را به صورت دستی رندر کنید (مثلاً در محیط تست):

```typescript
import { Home } from "@/framework/ui/module_pages";

const homePage = new Home();
const element = homePage.render({ message: "خوش آمدید!" });

document.body.appendChild(element);
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Template Implementation:** هر صفحه با پیاده‌سازی متد `render` و `onLoad` از اینترفیس `ITemplate` عمل می‌کند تا هماهنگی کامل با موتور رندرینگ داشته باشد.
* **Mapping Logic:** استفاده از `CtPageMaps` برای نگاشت (Mapping) دقیق بین رشته‌های URL و کلاس‌های مربوط به صفحات، جهت جلوگیری از بروز خطا در زمان روتینگ.
* **Namespace Pattern:** استفاده از فایل‌های `index.ts` در هر پوشه برای اکسپوز کردن کلاس‌ها با نام‌های ساده‌تر (مانند `HomePage` به جای `ClHomePage`) جهت بهبود تجربه توسعه‌دهنده (DX).

---
*مستندات توسط Mindbase تولید شده است.*