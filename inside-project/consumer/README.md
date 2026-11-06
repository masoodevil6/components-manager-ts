# مصرف‌کنندهٔ آزمایشی

این برنامه سناریوهای پایه، Button، ProgressLinear و JSON Tree را دارد. برای ProgressLinear و JSON Tree می‌توان خروجی اصلی `component-manager` را با ورودی مستقل `component-manager/progress-linear` یا `component-manager/json-tree` مقایسه کرد. هر مقایسه همان کامپوننت را با همان ظاهر و داده اجرا می‌کند؛ برای ساخت خروجی‌ها در ریشه `npm run build` را اجرا کنید.

```ts
import {Button} from "component-manager/button";

const button = Button({prop_btnTitle: "Save"});
document.body.appendChild(button.getElement());
```

از ریشهٔ مخزن `npm run dev` را اجرا کنید. اگر `consumer` در تنظیم `internalProjects` فایل `package.json` ریشه فعال باشد، سرور آن همراه پروژهٔ اصلی اجرا و هنگام توقف فرمان متوقف می‌شود. برای اجرای جداگانه نیز می‌توانید `npm run dev --prefix inside-project/consumer` را اجرا کنید.

در صفحهٔ Performance از سایدبار مسیر Internal projects → Consumer → سناریوی موردنظر را انتخاب کنید. انتخاب با رفرش حفظ می‌شود. اگر سرور مصرف‌کننده اجرا نباشد یا سناریو آماده نشود، اندازه‌گیری خطا نشان می‌دهد.

برای ساخت خروجی production از `npm run build --prefix inside-project/consumer` استفاده کنید. فایل‌های مشترک بین ورودی‌ها در خروجی build جدا هستند و باید هنگام محاسبهٔ حجم هر سناریو لحاظ شوند. سرور توسعه خروجی کتابخانه را خودکار بازسازی نمی‌کند.
