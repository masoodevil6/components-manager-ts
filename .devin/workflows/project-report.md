---
description: گزارش وضعیت پروژه — ماژول‌ها، کارهای انجام‌شده و هدف آینده
globs: "**/*"
---

# گزارش پروژه Components Master

## ماژول‌های موجود

### لایه هسته (Core) — ۷ ماژول
- **Observable** — مدیریت وضعیت واکنشی ✅
- **Reactive** — موتور ساخت DOM و SVG ✅
- **Languages** — سیستم چندزبانه (فارسی/انگلیسی) ✅
- **Route** — مسیریابی بین صفحات ✅
- **Configs** — تنظیمات سراسری فریم‌ورک ✅
- **Event** — سیستم رویداد با Step/Request/Response/Trace ✅
- **Components** — کلاس پایه کامپوننت (Schema/Prop/Method/Template) 🔴 مراحل اولیه

### لایه رابط کاربری (UI) — ۴ ماژول
- **Icons** — ۱۲۰+ آیکون واکنش‌گرا با i18n ✅
- **Categories** — دسته‌بندی درختی ۱۱ دسته اصلی 🔄 در حال توسعه
- **Components** — فقط یک نمونه اولیه exists 🔴 مراحل اولیه
- **Pages** — Home، Icons، Tests 🔄 در حال توسعه

### لایه ابزارها (Util) — ۹ ماژول
- **Brands، Validators، Dates، Files، Styles، Convertor، Consts، Tools، Excel** ✅

---

## چه کارهایی انجام شد

1. ساخت زیرساخت کامل هسته (Observable، Reactive، Languages، Route، Configs)
2. ساخت سیستم رویداد با Symbol identity و Trace
3. مهاجرت ۱۲۰+ آیکون به ساختار ماژولار
4. دسته‌بندی درختی آیکون‌ها در ۱۱ دسته
5. پشتیبانی چندزبانه برای تمام آیکون‌ها
6. ساخت صفحه نمایش آیکون‌ها
7. ساخت کلاس پایه کامپوننت (ClComponentBase) با الگوی Schema/Prop/Method/Template
8. ساخت ابزارهای تعریف کامپوننت (DefineProp، DefineSchema، DefineMethod، DefineTemplate)
9. تولید ۹ مستند فنی
10. سیستم Bootstrap برای جلوگیری از وابستگی دایره‌ای

---

## هدف آینده: توسعه ماژول کامپوننت

### وضعیت فعلی
کلاس پایه `ClComponentBase` (۳۳۵ خط) ساخته شده. ابزارهای تعریف آماده‌اند. اما فقط یک کامپوننت نمونه وجود دارد و `ComponentStructure.ts` خالی است.

### چه چیزی نیاز است
- **کامپوننت‌های پایه**: Button، TextInput، Label، Box
- **کامپوننت‌های لیستی**: Table، List، Tree
- **کامپوننت‌های تعاملی**: Modal، Tab، Menu
- تعریف دسته‌بندی کامپوننت‌ها در `module_categories`
- ساخت صفحه تست کامپوننت‌ها

### چرا مهم است
بدون کامپوننت‌های آماده، هر صفحه با کد خام Reactive ساخته می‌شود — کند و تکراری. با کامپوننت‌های قابل استفاده مجدد، ساخت صفحات سریع و یکنواخت خواهد بود.
