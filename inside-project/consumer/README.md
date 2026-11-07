# مصرف‌کنندهٔ آزمایشی

این برنامه سناریوهای پایه، Button، ElementCreator، ProgressLinear، JSON Tree، Table، InputListSelector و CustomForm را دارد. هر جفت سناریوی `Framework entry` و `focused entry` همان کامپوننت را با ظاهر، داده و کنش یکسان اجرا می‌کند. برای ساخت کتابخانه و گزارش اندازه‌ی JavaScript اولیه در ریشه به‌ترتیب `npm run build` و `npm run perf:consumer` را اجرا کنید. گزارش هر صفحه را در بیلد جدا می‌سنجد و برای ElementCreator قطعه‌ی تعویقی تنظیمات را هم گزارش می‌کند؛ HTML و CSS در اندازه‌ها شمرده نمی‌شوند.

```ts
import {Button} from "component-manager/button";

const button = Button({prop_btnTitle: "Save"});
document.body.appendChild(button.getElement());
```

از ریشهٔ مخزن `npm run dev` را اجرا کنید. اگر `consumer` در تنظیم `internalProjects` فایل `package.json` ریشه فعال باشد، سرور آن همراه پروژهٔ اصلی اجرا و هنگام توقف فرمان متوقف می‌شود. برای اجرای جداگانه نیز می‌توانید `npm run dev --prefix inside-project/consumer` را اجرا کنید.

در صفحهٔ Performance از سایدبار مسیر Internal projects → Consumer → سناریوی موردنظر را انتخاب کنید. انتخاب با رفرش حفظ می‌شود. اگر سرور مصرف‌کننده اجرا نباشد یا سناریو آماده نشود، اندازه‌گیری خطا نشان می‌دهد.

برای ساخت خروجی production از `npm run build --prefix inside-project/consumer` استفاده کنید. فایل‌های مشترک بین ورودی‌ها در خروجی build جدا هستند و باید هنگام محاسبهٔ حجم هر سناریو لحاظ شوند. سرور توسعه خروجی کتابخانه را خودکار بازسازی نمی‌کند.
