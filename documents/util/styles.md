# ماژول Styles (مدیریت استایل‌ها)

این ماژول برای مدیریت پیشرفته‌ی استایل‌های CSS و کلاس‌های مربوط به UI طراحی شده است. برخلاف تعریف دستی کلاس‌ها، این ماژول از طریق `Constants` و `Methods` کنترل دقیق بر روی مقادیر رنگ، اندازه، پدینگ و سایر ویژگی‌های بصری فراهم می‌کند تا از تداخل (Conflict) جلوگیری شود.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما به گروه‌های زیر دسترسی دارید:

| نام گروه‌بندی | توضیحات |
| :--- | :--- |
| `Css_Color` | مدیریت رنگ‌ها (مانند `Css_Color.BorderRadius`) |
| `Css_SizeUnit` | مدیریت واحدهای اندازه‌گیری (مانند `px`, `rem`) |
| `Css_Transform` | متدهای مربوط به تبدیل‌های CSS |
| `Css_FontSize` | مدیریت دقیق اندازه فونت‌ها |

## 💡 مثال استفاده
```typescript
import { Styles } from "@/framework/module_util/module_styles";

// استفاده از مقادیر ثابت برای تعیین رنگ یا اندازه در استایل‌ها
const myStyle = {
    color: Styles.Css_Color.primary,
    fontSize: Styles.Css_FontSize.medium
};

// یا استفاده از متدها برای محاسبه مقادیر (SizeCalc)
const dynamicWidth = Styles.Css_SizeCalc.fromPx(100);
```

## 📂 ساختار زیرمجموعه‌ها
- **Methods:** شامل توابع کمکی برای تولید رشته‌های CSS و مدیریت کلاس‌ها.
- **Types:** تعریف تایپ‌های مربوط به انواع مقادیر استایل (مانند `TColor`, `TSize` و غیره).
- **Class:** مدیریت کلاس‌های پایه برای استایل‌دهی.