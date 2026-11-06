# ورودی‌های متمرکز کامپوننت

کتابخانه علاوه بر ورودی کامل `component-manager`، برای هر کامپوننت یک ورودی مستقل از مسیر `component-manager/components/<slug>` می‌سازد. فهرست اصلی کامپوننت‌ها از رجیستری `src/framework/module_ui/module_components/lists/index.ts` خوانده می‌شود؛ بنابراین برای افزودن یک ورودی نیازی به نوشتن wrapper یا تنظیمات Vite و Rollup جداگانه نیست.

فهرست پایلوت فعلی در `config/focused-components.json` نگهداری می‌شود. generator کلاس، `Definition` و فایل‌های type هر عضو انتخاب‌شده را از رجیستری استخراج می‌کند و ورودی‌های build را در `src/generated/focused` می‌سازد. این پوشه خروجی تولیدشده است و وارد Git نمی‌شود. حالت پیش‌فرض `selected` است تا اندازه‌ی پایلوت و زمان تولید declarationها کنترل‌شده بماند.

برای استفاده در برنامه:

```ts
import {Table} from "component-manager/components/table";

const table = Table({prop_data: []});
document.body.appendChild(table.getElement());
```

مسیرهای قدیمی `component-manager/button`، `component-manager/progress-linear` و `component-manager/json-tree` همچنان پشتیبانی می‌شوند.

برای بازتولید خروجی و مقایسه:

```sh
npm run build
npm run build --prefix inside-project/consumer
npm run perf:consumer
```

Consumer برای Button، ProgressLinear، JsonTree، Table و InputListSelector صفحه‌های هم‌ظاهر Framework و focused دارد. اندازه‌گیری، گراف اولیه‌ی JavaScript را از فایل‌های production ساخته‌شده دنبال می‌کند و HTML و CSS را جدا می‌گذارد. نتایج به محیط build و نسخه‌ی ابزارها وابسته‌اند؛ زمان اجرا، paint و تعاملات در این عدد نیستند.

در build فعلی، ورودی کامل برای همه‌ی صفحات مصرف‌کننده حدود ۲٬۹۶۴ KiB خام و ۶۲۴ KiB gzip است. گراف focused به این مقادیر رسید:

| کامپوننت | خام | gzip | کاهش gzip نسبت به ورودی کامل |
| --- | ---: | ---: | ---: |
| Button | 888 KiB | 122 KiB | 80.5٪ |
| ProgressLinear | 872 KiB | 119 KiB | 81.0٪ |
| JsonTree | 994 KiB | 145 KiB | 76.8٪ |
| Table | 1٬096 KiB | 163 KiB | 73.9٪ |
| InputListSelector | 1٬074 KiB | 158 KiB | 74.7٪ |

بخش مشترک Trait هنوز سهم قابل‌توجهی از گراف focused دارد. هنگام گسترش پایلوت، اگر ورودی تازه به barrel دسته‌بندی‌ها یا `Examples` وصل شود، این صفحه‌ها و اندازه‌گیری دوباره آن را آشکار می‌کنند؛ کلاس‌های وابسته‌ی هر کامپوننت باید از مسیر مستقیم import شوند تا تنها وابستگی‌های واقعی وارد خروجی شوند.
