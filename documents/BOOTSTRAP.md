# راه‌اندازی سیستم (Bootstrapping)

برای اینکه پروژه شما بدون خطای وابستگی چرخه‌ای (Circular Dependency) و با ترتیب صحیح بارگذاری اجرا شود، ما یک سیستم **Bootstrap** در پوشه `src/framework/bootstrap` ایجاد کرده‌ایم.

## 📦 فایل‌های Bootstrap
*   **`bootstrap/Language.ts`**: مسئول مقداردهی اولیه و راه‌اندازی سیستم زبان‌ها قبل از اجرای اپلیکیشن.

## 🚀 نحوه استفاده
این فایل باید در نقطه ورود پروژه (`src/app.ts`) و قبل از راه‌اندازی روتینگ (Router) فراخوانی شود.

### مثال (در `src/app.ts`):
```typescript
import "./files/styles/bootstrap.css";
import "./files/styles/main.css";

// ایمپورت و اجرای Bootstrap سیستم زبان
import { Boot_Language } from "@/framework/bootstrap/Language";
Boot_Language();

// ایمپورت فریم‌ورک و راه‌اندازی روتینگ
import * as framework from "@/framework";
const router = new framework.Route.App(
    document.getElementById("app"),
    framework.UI.Pages.CT_PageMap
);
```

## ⚠️ نکات مهم
*   **ترتیب اجرا:** حتماً باید `Boot_Language()` قبل از ساخت `framework.Route.App` صدا زده شود. اگر این ترتیب رعایت نشود، کامپوننت‌های Home و سایر صفحات در هنگام استفاده از `translate()` دچار خطای `ReferenceError` یا `TypeError` می‌شوند.
*   **Circular Dependency:** بدون استفاده از Bootstrap، ماژول‌های `core_languages` و `ui_categories` در یک وابستگی دایره‌ای گرفتار می‌شوند که باعث کرش شدن پروژه در زمان اجرا می‌شود.

---
*مستندات توسط Mindbase تولید شده است.*