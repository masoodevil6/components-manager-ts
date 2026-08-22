# نقشه راه مستندسازی پروژه (Documentation Roadmap)

هدف: تبدیل یک کد مهندسی‌شده به یک اکوسیستم مستند و قابل فهم برای توسعه‌دهندگان دیگر.

## ۱. ساختار پیشنهادی پوشه `documents`
این ساختار بر اساس ماژول‌بندی موجود در `src/framework` طراحی شده است.

### الف) بخش معماری (`documents/architecture/`)
- `system-overview.md`: نمای کلی از نحوه تعامل `module_core` و `module_ui`.
- `module-hierarchy.md`: توضیح دقیق سلسله‌مراتب پوشه‌ها (مانند آنچه در `list_files` مشاهده شد).

### ب) بخش API هسته (`documents/api/`)
- `core-api.md`: مستندات مربوط به `module_observable`, `module_reactive`, و `module_configs`.
- `ui-api.md`: راهنمای کار با کامپوننت‌ها و سیستم `Schema`.

### ج) بخش راهنما (`documents/guides/`)
- `getting-started.md`: نحوه نصب و پیکربندی اولیه.
- `creating-components.md`: آموزش ساخت کامپوننت جدید طبق الگوی ۴ مرحله‌ای (Props -> Configs -> Base -> Concrete).

### د) بخش مفاهیم (`documents/concepts/`)
- `reactivity-engine.md`: توضیح مکانیسم تغییرات وضعیت و رندرینگ.
- `schema-driven-ui.md`: توضیح مفهوم رندرینگ مبتنی بر Schema.

## ۲. مراحل اجرایی (Implementation Steps)

| مرحله | هدف | فایل خروجی |
| :--- | :--- | :--- |
| ۱ | بررسی ساختار دقیق ماژول‌ها | `plans/documentation-plan.md` |
| ۲ | نوشتن مستندات معماری کلی | `documents/architecture/system-overview.md` |
| ۳ | نگارش راهنمای توسعه کامپوننت | `documents/guides/creating-components.md` |
| ۴ | تکمیل مستندات API هسته | `documents/api/core-api.md` |
