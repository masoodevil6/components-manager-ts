# ماژول دسته‌بندی‌ها (Categories Module)

این ماژول وظیفه سازمان‌دهی و طبقه‌بندی اجزای رابط کاربری را بر عهده دارد. در واقع، این ماژول مجموعه‌ای از گروه‌های منطقی است که به توسعه‌دهنده کمک می‌کند تا کامپوننت‌های مرتبط با یک حوزه خاص (مانمانند `Inputs` یا `Positions`) را به راح𝙩 پیدا و استفاده کند.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`UI`** به این گروه‌ها دسترسی دارید:

### `UI.Lists` (مجموعه لیست‌های طبقه‌بندی شده)
این بخش شامل چندین زیرگروه برای مدیریت انواع اجزا است:

| گروه | توضیحات |
| :--- | :--- |
| **`Basic`** | اجزای پایه و ساختاری که در همه جا کاربرد دارند. |
| **`Contents`** | اجزایی که هدف اصلی آن‌ها نمایش محتوای متنی یا بصری است. |
| **`Inputs`** | تمامی اجزای تعاملی که برای دریافت ورودی از کاربر طراحی شده‌اند. |
| **`Positions`** | اجزای مربوط به چیدمان و قرارگیری در صفحه (Layout/Positioning). |
| **`Simples`** | اجزای سبک و ساده برای موارد استفاده سریع و کوچک. |

---

## 📚 دسته‌بندی آیکون‌ها (Icon Lists)

یکی از مهم‌ترین بخش‌های این ماژول، دسته‌بندی آیکون‌هاست که در مسیر `lists/icons` قرار دارد. این بخش آیکون‌های ماژول `module_icons` را در ۹ دسته اصلی سازمان‌دهی می‌کند.

### 🌳 نمودار درختی دسته‌بندی

```text
Icons
│
├── 📁 Status (ایکون‌های چند وضعیتی)
│   ├── Boolean       → وضعیت درست/غلط
│   ├── Visit         → وضعیت مشاهده‌پذیری
│   ├── Light         → نور (خورشید/ماه)
│   ├── Pin           → پین و سنجاق
│   ├── Resize        → تغییر اندازه
│   └── Locked        → قفل باز/بسته
│
├── 📁 Symbols (ایکون‌های نمادین)
│   ├── Arrows (ایکون‌های فلش)
│   │   ├── Basic     → فلش‌های ساده
│   │   ├── Chevron   → فلش‌های پیکانی
│   │   └── Double    → فلش‌های دوبل
│   └── Exclumation   → علامت تعجب و هشدار
│
├── 📁 Calc (ایکون‌های ماشین‌حساب)
│   └── Symbol        → عملگرها (جمع/تفریق/ضرب/تقسیم)
│
├── 📁 Inputs (ایکون‌های ورودی)
│   ├── Time          → زمان (ساعت/تقویم)
│   ├── Tools         → ابزارها (جاروی پاک‌سازی)
│   ├── Qr            → کد QR
│   ├── Select        → کادر انتخاب
│   ├── Text          → ورودی متن (عنوان)
│   └── Number        → ورودی عدد
│
├── 📁 Files (ایکون‌های مربوط به فایل)
│   ├── Toolbars (نوار ابزار)
│   │   ├── Zoom      → بزرگ‌نمایی
│   │   ├── Export    → استخراج (چاپ/اکسل)
│   │   ├── Pin       → پین نوار ابزار
│   │   ├── Window    → پنجره (بستن/تغییر اندازه)
│   │   └── Header    → هدر (منو/تنظیمات/جستجو)
│   ├── Actions       → عملیات فایل (ویرایش/حذف/پیوست)
│   ├── Logo          → لوگو (اپلیکیشن)
│   ├── Category      → دسته‌بندی
│   ├── Type          → نوع فایل
│   ├── Tag           → برچسب
│   └── Status        → وضعیت
│
├── 📁 WebCodes (ایکون‌های کد خطای وب)
│   ├── Series 100
│   ├── Series 200
│   ├── Series 300
│   ├── Series 400
│   └── Series 500
│
├── 📁 Payments (ایکون‌های پرداخت)
│   ├── Types         → انواع پرداخت (نقدی/ریال/تتر/درهم)
│   ├── Actions       → عملیات (واریز/برداشت/تراکنش)
│   ├── Cash          → نقدی (مبلغ/ارز/سکه)
│   ├── Leverage      → اهرم معاملاتی
│   ├── Input         → ورودی (کیف پول/شماره کارت)
│   └── Rate          → نرخ
│
├── 📁 Loadings (ایکون‌های لودینگ)
│   ├── Circle        → دایره‌ای
│   ├── Horizontal    → افقی
│   └── Vertical      → عمودی
│
└── 📁 Users (ایکون‌های کاربران)
    ├── Account       → حساب کاربری
    ├── Emails        → ایمیل
    ├── Phone         → تلفن
    └── Password      → رمز عبور
```

### 📋 جزئیات آیکون‌های هر دسته

#### ۱. Status — ایکون‌های چند وضعیتی

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Boolean | `StatusIsTrue` | وضعیت درست | نمایش حالت صحیح/فعال |
| Boolean | `StatusIsFalse` | وضعیت غلط | نمایش حالت نادرست/غیرفعال |
| Visit | `StatusVisit` | قابل مشاهده | نمایش حالت دیده‌شدن (چشم باز) |
| Visit | `StatusUnVisit` | غیر قابل مشاهده | نمایش حالت پنهان (چشم بسته) |
| Light | `StatusLightOn` | نور روشن | حالت روشن (خورشید) |
| Light | `StatusLightOff` | نور خاموش | حالت تاریک (ماه) |
| Pin | `StatusPinOpen` | پین باز | سنجاق در حالت باز |
| Pin | `StatusPinClose` | پین بسته | سنجاق در حالت بسته |
| Pin | `StatusPin2Open` | پین دوم باز | گونه دوم سنجاق باز |
| Resize | `FileWindowResizeMax` | بیشینه کردن | بزرگ‌نمایی پنجره |
| Resize | `FileWindowResizeMin` | کمینه کردن | کوچک‌نمایی پنجره |
| Locked | `StatusLockedClose` | قفل بسته | حالت قفل‌شده |
| Locked | `StatusLockedOpen` | قفل باز | حالت آزاد |

#### ۲. Symbols — ایکون‌های نمادین

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Arrows › Basic | `ArrowUp` | فلش بالا | جهت‌نمای رو به بالا |
| Arrows › Basic | `ArrowDown` | فلش پایین | جهت‌نمای رو به پایین |
| Arrows › Basic | `ArrowRight` | فلش راست | جهت‌نمای رو به راست |
| Arrows › Basic | `ArrowLeft` | فلش چپ | جهت‌نمای رو به چپ |
| Arrows › Chevron | `ArrowChevronUp` | پیکان بالا | پیکان رو به بالا |
| Arrows › Chevron | `ArrowChevronDown` | پیکان پایین | پیکان رو به پایین |
| Arrows › Chevron | `ArrowChevronRight` | پیکان راست | پیکان رو به راست |
| Arrows › Chevron | `ArrowChevronLeft` | پیکان چپ | پیکان رو به چپ |
| Arrows › Double | `ArrowDoubleRight` | دوبل راست | فلش دوبل رو به راست |
| Arrows › Double | `ArrowDoubleLeft` | دوبل چپ | فلش دوبل رو به چپ |
| Arrows › Double | `ArrowDoubleUp` | دوبل بالا | فلش دوبل رو به بالا |
| Arrows › Double | `ArrowDoubleDown` | دوبل پایین | فلش دوبل رو به پایین |
| Exclumation | `SymbolExclumationSquare` | تعجب کادری | علامت تعجب داخل کادر |
| Exclumation | `SymbolExclumationWarning` | هشدار | علامت تعجب مثلثی هشدار |

#### ۳. Calc — ایکون‌های ماشین‌حساب

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Symbol | `CalcPlus` | بعلاوه | عملگر جمع |
| Symbol | `CalcMinus` | منها | عملگر تفریق |
| Symbol | `CalcCross` | ضربدر | عملگر ضرب |
| Symbol | `CalcDivide` | تقسیم | عملگر تقسیم |

#### ۴. Inputs — ایکون‌های ورودی

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Time | `InputClock` | ساعت | انتخاب و نمایش زمان |
| Time | `InputCalender` | تقویم | انتخاب و نمایش تاریخ |
| Tools | `FileClearBroom` | جاروی پاک‌سازی | پاک‌سازی داده‌های ورودی |
| Qr | `InputQrCode` | کد QR | ورودی اسکن کد QR |
| Select | `InputSelectColumn` | انتخاب ستون | انتخاب از میان ستون‌ها |
| Select | `InputSelectOption` | انتخاب گزینه | کادر انتخاب گزینه |
| Text | `InputTitle` | عنوان | ورودی متن عنوان |
| Number | `InputNumber` | عدد | ورودی عددی |

#### ۵. Files — ایکون‌های مربوط به فایل

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Toolbars › Zoom | `FilesZoom` | بزرگ‌نمایی | ذره‌بین جستجوی بزرگ‌نمایی |
| Toolbars › Zoom | `FilesZoomIn` | بزرگ کردن | افزایش بزرگ‌نمایی |
| Toolbars › Zoom | `FilesZoomOut` | کوچک کردن | کاهش بزرگ‌نمایی |
| Toolbars › Zoom | `FilesZoomRefresh` | بازنشانی بزرگ‌نمایی | بازگرداندن بزرگ‌نمایی به حالت اول |
| Toolbars › Export | `FilesPrint` | چاپ | استخراج خروجی چاپی |
| Toolbars › Export | `FilesExcel` | اکسل | خروجی اکسل |
| Toolbars › Pin | `StatusPinOpen` | پین باز | سنجاق در حالت باز |
| Toolbars › Pin | `StatusPinClose` | پین بسته | سنجاق در حالت بسته |
| Toolbars › Pin | `StatusPin2Open` | پین دوم باز | گونه دوم سنجاق باز |
| Toolbars › Window | `FileWindowClose` | بستن پنجره | دکمه ضربدر بستن |
| Toolbars › Window | `FileWindowResizeMax` | بیشینه کردن | بزرگ‌نمایی پنجره |
| Toolbars › Window | `FileWindowResizeMin` | کمینه کردن | کوچک‌نمایی پنجره |
| Toolbars › Window | `FileWindowMinimize` | کوچک‌سازی | کمینه‌سازی به نوار وظیفه |
| Toolbars › Header | `FileMenu` | منو | دکمه منوی همبرگری |
| Toolbars › Header | `FileSetting` | تنظیمات | چرخ‌دنده تنظیمات |
| Toolbars › Header | `FileSearch` | جستجو | ذره‌بین جستجو |
| Toolbars › Header | `FileFilter` | فیلتر | قیف فیلتر داده‌ها |
| Toolbars › Header | `FileReload` | بارگذاری مجدد | بازخوانی داده‌ها |
| Toolbars › Header | `FileEmpty` | خالی | حالت بدون داده |
| Toolbars › Header | `FileClearBroom` | جاروی پاک‌سازی | پاک‌سازی فیلترها |
| Toolbars › Header | `InputTitle` | عنوان | ورودی عنوان هدر |
| Actions | `FilesEdit` | ویرایش | ویرایش فایل/داده |
| Actions | `FilesDelete` | حذف | حذف فایل/داده |
| Actions | `FileAttachment` | پیوست | فایل پیوست (کلیپ) |
| Logo | `FileApplication` | اپلیکیشن | لوگوی برنامه |
| Category | `FileCategory` | دسته‌بندی | طبقه‌بندی اطلاعات |
| Type | `FileType` | نوع فایل | نمایش گونه فایل |
| Type | `FileTypeNote` | یادداشت | فایل یادداشت |
| Tag | `FileTage` | برچسب | تگ‌گذاری اطلاعات |
| Status | `FileStatusComplete` | وضعیت کامل | تکمیل وضعیت |

#### ۶. WebCodes — ایکون‌های کد خطای وب

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| سری ۱۰۰ | `WebCode100` | کد ۱۰۰ | ادامه (Continue) |
| سری ۱۰۰ | `WebCode101` | کد ۱۰۱ | تعویض پروتکل (Switching Protocols) |
| سری ۲۰۰ | `WebCode200` | کد ۲۰۰ | موفق (OK) |
| سری ۲۰۰ | `WebCode201` | کد ۲۰۱ | ایجاد شد (Created) |
| سری ۲۰۰ | `WebCode204` | کد ۲۰۴ | بدون محتوا (No Content) |
| سری ۳۰۰ | `WebCode301` | کد ۳۰۱ | انتقال دائمی (Moved Permanently) |
| سری ۳۰۰ | `WebCode304` | کد ۳۰۴ | بدون تغییر (Not Modified) |
| سری ۴۰۰ | `WebCode401` | کد ۴۰۱ | دسترسی غیرمجاز (Unauthorized) |
| سری ۴۰۰ | `WebCode403` | کد ۴۰۳ | دسترسی ممنوع (Forbidden) |
| سری ۴۰۰ | `WebCode404` | کد ۴۰۴ | یافت نشد (Not Found) |
| سری ۴۰۰ | `WebCode405` | کد ۴۰۵ | متد مجاز نیست (Method Not Allowed) |
| سری ۴۰۰ | `WebCode408` | کد ۴۰۸ | انقضای درخواست (Request Timeout) |
| سری ۴۰۰ | `WebCode410` | کد ۴۱۰ | حذف شده (Gone) |
| سری ۴۰۰ | `WebCode429` | کد ۴۲۹ | درخواست بیش از حد (Too Many Requests) |
| سری ۵۰۰ | `WebCode500` | کد ۵۰۰ | خطای داخلی سرور (Internal Server Error) |
| سری ۵۰۰ | `WebCode502` | کد ۵۰۲ | درگاه نامعتبر (Bad Gateway) |
| سری ۵۰۰ | `WebCode504` | کد ۵۰۴ | انقضای درگاه (Gateway Timeout) |

#### ۷. Payments — ایکون‌های پرداخت

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Types | `PaymentCash` | نقدی | پرداخت نقدی |
| Types | `PaymentRial` | ریال | پرداخت ریالی |
| Types | `PaymentTether` | تتر | پرداخت تتری |
| Types | `PaymentDerham` | درهم | پرداخت درهمی |
| Actions | `PaymentWalletAdd` | افزودن کیف پول | ایجاد کیف پول جدید |
| Actions | `PaymentWithDrawal` | برداشت | برداشت وجه |
| Actions | `PaymentDeposit` | واریز | واریز وجه |
| Actions | `PaymentTransaction` | تراکنش | انجام تراکنش |
| Cash | `PaymentAmount` | مبلغ | نمایش مبلغ نقدی |
| Cash | `PaymentCashCurrency` | ارز اسکنادی | ارز کاغذی |
| Cash | `PaymentCoinCurrency` | سکه | ارز سکه‌ای |
| Leverage | `PaymentLeverage` | اهرم نوع اول | لوریج معاملاتی |
| Leverage | `PaymentLeverage2` | اهرم نوع دوم | گونه دوم لوریج |
| Input | `PaymentWallet1` | کیف پول نوع اول | ورودی کیف پول |
| Input | `PaymentWallet2` | کیف پول نوع دوم | گونه دوم کیف پول |
| Input | `PaymentCardNumber` | شماره کارت | ورودی شماره کارت |
| Rate | `PaymentRate` | نرخ | نرخ و سنجش ارزش |

#### ۸. Loadings — ایکون‌های لودینگ

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Circle | `LoadingOrbit` | مداری | چرخش مداری |
| Circle | `LoadingPulse` | نبضی | انیمیشن ضربانی |
| Circle | `Loading` | لودینگ ساده | چرخش دایره‌ای ساده |
| Horizontal | `LoadingDotsHorizontal` | نقطه‌ای افقی | نقطه‌های افقی متحرک |
| Horizontal | `LoadingBarsHorizontal` | میله‌ای افقی | میله‌های افقی متحرک |
| Vertical | `LoadingDotsVertical` | نقطه‌ای عمودی | نقطه‌های عمودی متحرک |
| Vertical | `LoadingBarsVertical` | میله‌ای عمودی | میله‌های عمودی متحرک |

#### ۹. Users — ایکون‌های کاربران

| زیر دسته | آیکون | نام داخلی | توضیحات |
| :--- | :--- | :--- | :--- |
| Account | `UserAccount` | حساب کاربری | نمایش پروفایل کاربر |
| Account | `UserAccountAdd` | افزودن حساب | ایجاد کاربر جدید |
| Account | `UserAccountGroupAdd` | افزودن گروه | ایجاد گروه کاربری |
| Account | `UserAccountReference` | ارجاع کاربر | ارجاع به کاربر |
| Account | `UserAccountReffrence` | ارجاع کاربر (گونه دوم) | گونه دوم ارجاع |
| Emails | `UserEmail1` | ایمیل نوع اول | ایمیل کاربری |
| Emails | `UserEmail2` | ایمیل نوع دوم | گونه دوم ایمیل |
| Phone | `UserPhone` | تلفن | تلفن و تماس کاربری |
| Password | `UserPassword` | رمز عبور | نمایش رمز عبور |
| Password | `UserChangePassword` | تغییر رمز | تغییر رمز عبور |

> 💡 **نکته:** برخی آیکون‌ها (مانند `StatusPinOpen` یا `FileClearBroom`) در بیش از یک دسته ثبت شده‌اند تا از هر دیدگاه مرتبطی قابل دسترسی باشند. منبع اصلی همه آیکون‌ها، ماژول `module_icons` است و دسته‌بندی‌ها صرفاً نمای منطقی آن هستند.

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. دسترسی به یک کامپوننت از دسته Inputs
اگر بخواهید یک `InputText` را مستقیماً از طریق این طبقه‌بندی فراخوانی کنید:

```typescript
import { UI } from "@/framework/ui";

// استفاده از یک کامپوننت از دسته ورودی‌ها
const myInput = new UI.Lists.Inputs.InputText({
    label: "نام کاربری",
    placeholder: "نام خود را وارد کنید..."
});
```

### ۲. پیمایش در گروه‌های مختلف
این ساختار اجازه می‌دهد تا به صورت بسیار تمیز و سلسله‌مراتبی، اجزای مربوط به یک دسته خاص را مدیریت کنید:

```typescript
// دریافت لیست تمام کامپوننت‌های پایه (Basic) برای نمایش در یک منوی انتخابگر
const availableBasics = UI.Lists.Basic.allComponents; 
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Logical Grouping:** این ماژول فاقد منطق محاسباتی سنگین است و تمرکز اصلی آن بر روی **Namespace Management** برای جلوگیری از آشفتگی در سطح `UI` است.
* **Tree Shaking Friendly:** به دلیل استفاده از ساختار ماژولار، اگر شما فقط از `UI.Lists.Inputs` استفاده کنید، ابزارهای باندل کردن (مانمانند Vite) می‌توانند بقیه گروه‌ها را حذف کنند تا حجم فایل نهایی کاهش یابد.

---
*مستندات توسط Mindbase تولید شده است.*