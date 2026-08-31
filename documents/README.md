# مستندات پروژه (Project Documentation)

این فایل نقش نقشه راه و ایندکس اصلی برای تمامی مستندات فنی پروژه را ایفا می‌کند. تمامی بخش‌ها بر اساس ساختار ماژول‌های هسته (`core`)، رابط کاربری (`ui`) و ابزارهای کمکی (`util`) سازمان‌دهی شده‌اند.

## 🌳 نمودار درختی ماژول‌ها

```
src/
│
├── 📁 files/                              # فایل‌های استاتیک پروژه
│   ├── fonts/IRANSans/                    #   فونت اختصاصی (IRANSans)
│   └── styles/                            #   استایل‌های سراسری
│
├── 📁 framework/                          # فریم‌ورک اصلی (هسته و UI)
│   │
│   ├── 📁 bootstrap/                      # راه‌اندازی و اتصال ماژول‌ها
│   │
│   ├── 📁 module_core/                    # ⭐ ماژول‌های هسته (Core)
│   │   ├── contract/                      #   قراردادهای مشترک هسته
│   │   │   └── language/                  #     ساختار زبان (definition, types)
│   │   ├── module_components/             #   موتور کامپوننت‌ها (کلاس پایه, schema, template)
│   │   ├── module_configs/                #   تنظیمات فریم‌ورک (class, interface, states)
│   │   ├── module_languages/              #   مدیریت چند زبانه (class, definition)
│   │   ├── module_observable/             #   الگوی Observer (انتشار/اشتراک رویداد)
│   │   ├── module_event/                  #   کنترل سیستم ایونت ها به شکل workflow
│   │   ├── module_reactive/               #   موتور Reactive و متدهای ساخت DOM
│   │   └── module_route/                  #   مسیریابی (Router)
│   │
│   ├── 📁 module_ui/                      # ⭐ ماژول‌های رابط کاربری (UI)
│   │   ├── module_categories/             #   دسته‌بندی کامپوننت‌ها و آیکون‌ها
│   │   │   └── lists/icons/               #     تعریف درختی دسته‌ها (files, inputs, payments, ...)
│   │   ├── module_components/             #   کامپوننت‌های آماده UI
│   │   ├── module_icons/                  #   آیکون‌ها (کلاس‌های CtIcon + i18n)
│   │   │   ├── basic/                     #     هسته رسم آیکون (MtCreateIcon)
│   │   │   ├── languages/                 #     ترجمه‌ها (Fa, En)
│   │   │   └── src/                       #     ۱۲۰+ آیکون ثبت‌شده
│   │   └── module_pages/                  #   صفحات (IconPage, Home, ...)
│   │
│   └── 📁 module_util/                    # ابزارهای کمکی (Keys, Validator, ...)
│
└── 📁 ccomponentBasic/                    # کامپوننت‌های پایه (legacy در حال مهاجرت)
    └── components/
        ├── basic/                         #   انواع و ثابت‌های پایه
        ├── lists/                         #   کامپوننت‌های لیستی
        ├── others/                        #   کلاس‌های abstract و متدها
        └── tools/                         #   ابزارهای prop, schema, template
```

## 📑 فهرست مستندات

### ۱. هسته اصلی (Core Modules)
این بخش شامل مستندات مربوط به زیرساخت، مدیریت وضعیت و منطق اصلی سیستم است.

| ماژول | مستندات | شرح |
|---|---|---|
| `module_components` | [Module Components](./core/module_components.md) | موتور ساخت و مدیریت کامپوننت‌ها |
| `module_configs` | [Module Configs](./core/module_configs.md) | تنظیمات و پیکربندی فریم‌ورک |
| `module_languages` | [Module Languages](./core/module_languages.md) | سیستم چند زبانه (i18n) |
| `module_observable` | [Module Observable](./core/module_observable.md) | مدیریت رویدادها با الگوی Observer |
| `module_reactive` | [Module Reactive](./core/module_reactive.md) | موتور Reactive و رندر DOM |
| `module_route` | [Module Route](./core/module_route.md) | مسیریابی بین صفحات |

### ۲. رابط کاربری (UI Modules)
این بخش شامل راهنمای استفاده از اجزای بصری و دسته‌بندی کامپوننت‌ها است.

| ماژول | مستندات | شرح |
|---|---|---|
| `module_categories` | [Module Categories](./ui/module_categories.md) | دسته‌بندی درختی کامپوننت‌ها و آیکون‌ها |
| `module_components` | [Module Components](./ui/module_components.md) | کامپوننت‌های آماده رابط کاربری |
| `module_icons` | [Module Icons](./ui/module_icons.md) | سیستم آیکون‌ها با پشتیبانی i18n |

### ۳. ابزارهای کمکی (Utility Modules)

| ماژول | مستندات | شرح |
|---|---|---|
| `module_util` | [Module Util](./util/module_util.md) | توابع و کلاس‌های کمکی مشترک |

---
*ساخته شده توسط Mindbase سیستم مستندسازی خودکار.*