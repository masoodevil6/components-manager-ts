# ماژول آیکون‌ها (Icons Module)

این ماژول یک سیستم برای رندر کردن آیکون‌های SVG به صورت واکنش‌گرا (Reactive) است. آیکون‌ها از طریق الگوی **Definition** تعریف می‌شوند و می‌توانند پروپ‌های ثابت یا Observable دریافت کنند.

## 🚀 دسترسی عمومی (Public API)

برای دسترسی به این ماژول از طریق `Framework.UI.Icon` استفاده کنید:

```typescript
import * as Framework from "@/framework";

const Icon = Framework.UI.Icon;
```

### خروجی‌های اصلی (Exports)
| نام | نوع | توضیحات |
| :--- | :--- | :--- |
| `IconVariant` | Enum | انواع مختلف آیکون (`DEFAULT`, `SMALL`, `LARGE`) |
| `IIconDefinition` | Interface | ساختار استاندارد برای تعریف یک آیکون جدید |
| `IIconOptions` | Interface | پارامترهای قابل تنظیم برای آیکون |
| `CreateIcon` | Function | تابع اصلی برای ساخت و رندر آیکون (نام داخلی: `MtCreateIcon`) |
| `Src` | Namespace | دسترسی به تمام آیکون‌های ثبت‌شده در ماژول (مثل `Src.FileSearch`) |

---

## 📁 ساختار پوشه‌ها (Folder Structure)

```
module_icons/
├── basic/           # هسته ماژول
│   ├── enums/       # EnIconVariant (با نام IconVariant خروجی می‌شود)
│   ├── interface/   # IIconDefinition, IIconOptions, IIconRenderContext
│   └── methods/     # MtCreateIcon (با نام CreateIcon خروجی می‌شود)
├── languages/       # کلیدها و ترجمه‌ها
│   ├── Keys.ts      # کلیدهای ترجمه (Keys.icons.<name>.name / .description)
│   ├── Fa.ts        # ترجمه فارسی
│   └── En.ts        # ترجمه انگلیسی
└── src/             # تعریف تمام آیکون‌ها (هر آیکون یک پوشه مجزا)
    ├── index.ts     # ثبت و خروجی گرفتن از تمام آیکون‌ها
    └── <iconName>/  # پوشه هر آیکون
        ├── Definition.ts   # تعریف آیکون
        └── index.ts        # export {Definition} from "./Definition"
```

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده از یک آیکون با تنظیمات ثابت
```typescript
import * as Framework from "@/framework";

const myIcon = Framework.UI.Icon.CreateIcon(
    Framework.UI.Icon.Src.FileSearch.Definition,
    {
        primaryColor: "#ff0000",
        strokeWidth: 5,
        size: "L"
    }
);

document.body.appendChild(myIcon.getElement());
```

### ۲. استفاده از آیکون با پارامترهای واکنش‌گرا (Reactive)
```typescript
import * as Framework from "@/framework";
import { Core } from "@/framework";

// یک Observable برای تغییر رنگ
const color = new Core.App.Observable("#ff0000");

const myIcon = Framework.UI.Icon.CreateIcon(
    Framework.UI.Icon.Src.FileSearch.Definition,
    {
        primaryColor: color, // رنگ به صورت خودکار به SVG بایند می‌شود
        strokeWidth: 2
    }
);

document.body.appendChild(myIcon.getElement());

// تغییر رنگ آیکون بدون رندر مجدد
color.set("#00ff00");
```

---

## 🛠 ساختار داخلی (Internal Architecture)

### اینترفیس `IIconDefinition`
هر آیکون باید یک `IIconDefinition` داشته باشد. یک `Definition` فقط مسئول ساخت محتوای داخلی SVG است (نه Root اصلی).

| فیلد | نوع | اجباری | توضیحات |
| :--- | :--- | :--- | :--- |
| `title` | `TranslationKey` | ✅ | کلید ترجمه نام آیکون |
| `description` | `TranslationKey` | ❌ | کلید ترجمه توضیحات آیکون |
| `viewBoxX` | `number` | ✅ | عرض viewBox (به صورت عدد) |
| `viewBoxY` | `number` | ✅ | ارتفاع viewBox (به صورت عدد) |
| `render(context)` | `CoreReactive.App[]` | ✅ | ساخت محتوای داخلی SVG |

### اینترفیس `IIconRenderContext`
Context ای که به متد `render` هر Definition داده می‌شود:

| فیلد | نوع | توضیحات |
| :--- | :--- | :--- |
| `sizeName` | Observable | اندازه آیکون |
| `primaryColor` | Observable | رنگ اصلی آیکون |
| `secondaryColor` | Observable | رنگ ثانویه آیکون |
| `strokeWidth` | Observable | ضخامت خط (به صورت خودکار متناسب با viewBox مقیاس‌بندی می‌شود) |
| `variant` | `IconVariant` | نوع آیکون (`DEFAULT`, `SMALL`, `LARGE`) |
| `scope` | `Scope` | اسکوپ مدیریت Observable های آیکون |

### تعریف یک آیکون جدید (Definition)
```typescript
import * as CoreReactive from "@/core_reactive";
import * as UtilBrands   from "@/util_brands";

export const Definition: IIconDefinition = {
    title:       "Icons.File.Search.Name"        as UtilBrands.TranslationKey, // کلید ترجمه نام
    description: "Icons.File.Search.Description" as UtilBrands.TranslationKey, // کلید ترجمه توضیحات
    viewBoxX: 24, // عرض viewBox
    viewBoxY: 24, // ارتفاع viewBox
    render(context) {
        // context شامل sizeName, primaryColor, secondaryColor, strokeWidth, variant, scope است
        return [
            CoreReactive.App.circle({
                attrsBind: { fill: context.secondaryColor },
                attrs: { cx: "11", cy: "11", r: "8" }
            }),
            CoreReactive.App.circle({
                attrsBind: {
                    stroke: context.primaryColor,
                    "stroke-width": context.strokeWidth
                },
                attrs: { cx: "11", cy: "11", r: "8" }
            })
        ];
    }
};
```

> **نکته:** متدهای قابل استفاده برای ساخت اشکال: `svg` ،`svgPath` ،`svgCircle` ،`svgLine` ،`svgRect` ،`svgPolygon` و `fragment` از `CoreReactive.App`.

### مسئولیت `CreateIcon` (MtCreateIcon)
این تابع مرکز همه چیز است:
1.  **ایجاد Scope:** یک `CoreObservable.Scope` اختصاصی برای آیکون می‌سازد.
2.  **Merge کردن پارامترها:** ترکیب `options` کاربر با مقادیر پیش‌فرض از `CoreConfig` و `UtilStyle` (اندازه، رنگ اصلی، رنگ ثانویه).
3.  **محاسبه strokeWidth:** اگر کاربر `strokeWidth` نداده باشد، از `Css_BorderWidth(sizeName)` محاسبه و سپس به صورت خودکار با توجه به `viewBoxX` و `viewBoxY` مقیاس‌بندی می‌شود (`Css_IconStrokeWidth`).
4.  **ایجاد Context:** ساخت `IIconRenderContext` و دادن آن به `definition.render`.
5.  **ساخت SVG Root:** ایجاد المان `<svg>` نهایی با اتصال Reactive مقادیر `viewBox` ،`width` ،`height` و `aria-label` (ترجمه `title`).

---

## 🗂 دسته‌بندی آیکون‌ها (Categories)

آیکون‌های این ماژول در ماژول `module_categories` (مسیر `lists/icons`) به صورت سلسله‌مراتبی دسته‌بندی شده‌اند. هر دسته دارای کلیدهای ترجمه (`name` و `description`) و لیست `children` (آیکون‌ها یا زیر دسته‌ها) است:

| دسته اصلی | زیر دسته‌ها | توضیحات |
| :--- | :--- | :--- |
| `status` | `boolean` ،`visit` ،`light` ،`locked` ،`pin` ،`resize` | آیکون‌های چند وضعیتی |
| `symbols` | `arrows` (basic ،chevron ،double) ،`exclumation` | آیکون‌های نمادین |
| `calc` | `symbol` | آیکون‌های ماشین حساب |
| `inputs` | `time` ،`tools` ،`qr` ،`select` ،`text` ،`number` | آیکون‌های ورودی |
| `files` | `actions` ،`category` ،`logo` ،`status` ،`tag` ،`type` ،`toolbars` (export ،header ،pin ،window ،zoom) | آیکون‌های مربوط به فایل |
| `webCodes` | سری 100 تا 500 | آیکون‌های کد وضعیت وب |
| `payments` | `types` ،`actions` ،`cash` ،`leverage` ،`input` ،`rate` | آیکون‌های پرداخت |
| `loadings` | `circle` ،`horizontal` ،`vertical` | آیکون‌های لودینگ |
| `users` | `account` ،`emails` ،`phone` ،`password` | آیکون‌های کاربران |

> **نکته:** یک آیکون می‌تواند همزمان در چند دسته ثبت شود (مثل `inputTitle` که هم در `inputs/text` و هم در `files/toolbars/header` قرار دارد).

---

## 📋 لیست کامل آیکون‌های موجود (Icon Registry)

تمام آیکون‌های ثبت‌شده در `src/index.ts` به همراه نام Export، ترجمه فارسی و توضیحات:

### 🏹 فلش‌ها (Arrows)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `arrowUp` | `ArrowUp` | فلش رو به بالا | فلش کامل رو به بالا برای ارسال، آپلود یا حرکت به سمت بالا |
| `arrowDown` | `ArrowDown` | فلش رو به پایین | فلش کامل رو به پایین برای دانلود یا حرکت به سمت پایین |
| `arrowLeft` | `ArrowLeft` | بازگشت به چپ | فلش پرشده با خط برای بازگشت یا انتقال به سمت چپ |
| `arrowRight` | `ArrowRight` | بازگشت به راست | فلش پرشده با خط برای بازگشت یا انتقال به سمت راست |
| `arrowChevronDown` | `ArrowChevronDown` | فلش پایین | فلش پیکانی رو به پایین برای باز شدن یا حرکت به پایین |
| `arrowChevronLeft` | `ArrowChevronLeft` | فلش چپ | فلش پیکانی رو به چپ برای حرکت یا هدایت به چپ |
| `arrowChevronRight` | `ArrowChevronRight` | فلش راست | فلش پیکانی رو به راست برای حرکت یا هدایت به راست |
| `arrowChevronUp` | `ArrowChevronUp` | فلش بالا | فلش پیکانی رو به بالا برای بسته شدن یا حرکت به بالا |
| `arrowDoubleLeft` | `ArrowDoubleLeft` | انتخاب همه به چپ | دو فلش رو به چپ برای انتقال همه موارد به سمت چپ |
| `arrowDoubleRight` | `ArrowDoubleRight` | انتخاب همه به راست | دو فلش رو به راست برای انتقال همه موارد به سمت راست |
| `arrowDoubleUp` | `ArrowDoubleUp` | جمع کردن همه به بالا | دو فلش رو به بالا برای جمع کردن همه موارد به سمت بالا |
| `arrowDoubleDown` | `ArrowDoubleDown` | باز کردن همه به پایین | دو فلش رو به پایین برای باز کردن همه موارد به سمت پایین |

### 🔄 وضعیت‌ها (Status)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `statusIsTrue` | `StatusIsTrue` | درست | علامت تیک برای نمایش وضعیت درست یا تأیید شده |
| `statusIsFalse` | `StatusIsFalse` | غلط | علامت ضربدر برای نمایش وضعیت غلط یا رد شده |
| `statusVisit` | `StatusVisit` | مشاهده شده | چشم خط‌خورده برای نمایش وضعیت دیده‌نشده یا پنهان کردن محتوا |
| `statusUnVisit` | `StatusUnVisit` | قابل مشاهده | چشم باز برای نمایش وضعیت قابل مشاهده بودن محتوا |
| `statusMoon` | `StatusMoon` | ماه | ماه برای حالت شب یا تم تاریک |
| `statusSun` | `StatusSun` | خورشید | خورشید برای حالت روز یا تم روشن |
| `statusPinOpen` | `StatusPinOpen` | پین باز | پین و سنجاق باز |
| `statusPinClose` | `StatusPinClose` | پین بسته | پین و سنجاق بسته |
| `statusPin2Open` | `StatusPin2Open` | پین باز ۲ | پین و سنجاق باز مدل دوم |
| `statusLockedClose` | `StatusLockedClose` | قفل بسته | قفل بسته و حالت قفل بودن |
| `statusLockedOpen` | `StatusLockedOpen` | قفل باز | قفل باز و حالت بازشدن |

### 🧮 ماشین حساب (Calc)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `calcPlus` | `CalcPlus` | بعلاوه | علامت بعلاوه در ماشین حساب |
| `calcMinus` | `CalcMinus` | منها | علامت منها در ماشین حساب |
| `calcCross` | `CalcCross` | ضربدر | علامت ضربدر در ماشین حساب |
| `calcDivide` | `CalcDivide` | تقسیم | علامت تقسیم در ماشین حساب |

### ⌨️ ورودی‌ها (Inputs)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `inputClock` | `InputClock` | ساعت | آیکون ساعت مربوط به زمان |
| `inputCalender` | `InputCalender` | تقویم | آیکون تقویم مربوط به زمان |
| `inputQrCode` | `InputQrCode` | کد QR | کد QR برای ورودی و خواندن اطلاعات |
| `inputSelectColumn` | `InputSelectColumn` | انتخاب ستون | انتخاب ستون از میان چند ستون داده |
| `inputSelectOption` | `InputSelectOption` | انتخاب گزینه | کادر انتخاب (select) با فلش پایین برای انتخاب گزینه |
| `inputTitle` | `InputTitle` | عنوان | ورودی عنوان متن با نشانگرهای تراز (همچنین در `files/toolbars/header` ثبت شده) |
| `inputNumber` | `InputNumber` | عدد | ورودی عدد (number) |

### 📄 فایل‌ها (Files)
| نام پوشه | نام Export | نام فارسی | توضیحات | دسته |
| :--- | :--- | :--- | :--- | :--- |
| `filesZoom` | `FilesZoom` | زوم | مفهوم کلی زوم | `toolbars/zoom` |
| `filesZoomIn` | `FilesZoomIn` | بزرگ‌نمایی | ورود به حالت تمام صفحه یا زوم کردن | `toolbars/zoom` |
| `filesZoomOut` | `FilesZoomOut` | کوچک‌نمایی | خروج از حالت بزرگ‌نمایی | `toolbars/zoom` |
| `filesZoomRefresh` | `FilesZoomRefresh` | بازنشانی زوم | بازنشانی زوم به حالت پیش‌فرض | `toolbars/zoom` |
| `filesPrint` | `FilesPrint` | چاپ | پرینتر برای چاپ اسناد و گزارش‌ها | `toolbars/export` |
| `filesExcel` | `FilesExcel` | اکسل | خروجی گرفتن داده‌ها به فرمت Excel | `toolbars/export` |
| `filesEdit` | `FilesEdit` | ویرایش | مداد برای ویرایش اطلاعات | `actions` |
| `filesDelete` | `FilesDelete` | حذف | سطل زباله برای حذف اطلاعات | `actions` |
| `fileAttachment` | `FileAttachment` | پیوست | گیره کاغذ و پیوست کردن فایل | `actions` |
| `fileMenu` | `FileMenu` | منوی همبرگری | منوی همبرگری و فهرست | `toolbars/header` |
| `fileSetting` | `FileSetting` | تنظیمات | چرخ‌دنده و تنظیمات | `toolbars/header` |
| `fileSearch` | `FileSearch` | جستجو | ذره‌بین و جستجو در فایل‌ها | `toolbars/header` |
| `fileFilter` | `FileFilter` | فیلتر | قیف و فیلتر کردن اطلاعات | `toolbars/header` |
| `fileReload` | `FileReload` | بارگذاری مجدد | فلش چرخشی و نوسازی محتوا | `toolbars/header` |
| `fileEmpty` | `FileEmpty` | خالی | دایره با ضربدر و عدم وجود اطلاعات | `toolbars/header` |
| `fileClearBroom` | `FileClearBroom` | جاروی پاک‌سازی | جارو برای پاک‌سازی و پاک کردن اطلاعات | `toolbars/header` و `inputs/tools` |
| `fileWindowClose` | `FileWindowClose` | بستن پنجره | بستن و خروج از پنجره | `toolbars/window` |
| `fileWindowMinimize` | `FileWindowMinimize` | کوچک کردن پنجره | کوچک کردن و مینیمایز پنجره | `toolbars/window` |
| `fileWindowResizeMax` | `FileWindowResizeMax` | بزرگ‌نمایی پنجره | بزرگ‌نمایی و ماکسیمایز پنجره | `toolbars/window` |
| `fileWindowResizeMin` | `FileWindowResizeMin` | کوچک‌نمایی پنجره | کوچک‌نمایی و مینیمایز پنجره | `toolbars/window` |
| `fileApplication` | `FileApplication` | اپلیکیشن | برنامه و اپلیکیشن با لوگوی AI | `logo` |
| `fileCategory` | `FileCategory` | دسته‌بندی | دسته‌بندی و طبقه‌بندی اطلاعات | `category` |
| `fileType` | `FileType` | نوع فایل | اسناد روی‌هم‌چیده برای نمایش نوع و گونه فایل | `type` |
| `fileTypeNote` | `FileTypeNote` | یادداشت | برگه یادداشت با فنر و لیست موارد | `type` |
| `fileTage` | `FileTage` | برچسب | برچسب و تگ‌گذاری اطلاعات | `tag` |
| `fileStatusComplete` | `FileStatusComplete` | انجام شده | تیک برای وضعیت انجام‌شده و تکمیل | `status` |

### 🌐 کدهای وب (WebCodes)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `webCode100` | `WebCode100` | ادامه (100) | ادامه پردازش درخواست توسط سرور |
| `webCode101` | `WebCode101` | تغییر پروتکل (101) | توافق سرور بر تغییر پروتکل ارتباطی |
| `webCode200` | `WebCode200` | موفق (200) | موفقیت آمیز بودن درخواست |
| `webCode201` | `WebCode201` | ایجاد شد (201) | ایجاد موفق یک منبع جدید |
| `webCode204` | `WebCode204` | بدون محتوا (204) | موفقیت درخواست بدون محتوای پاسخ |
| `webCode301` | `WebCode301` | انتقال دائم (301) | انتقال دائم آدرس به مقصد جدید |
| `webCode304` | `WebCode304` | بدون تغییر (304) | استفاده از نسخه کش شده و بدون تغییر منبع |
| `webCode400` | `WebCode400` | درخواست نامعتبر (400) | نامعتبر بودن ساختار درخواست ارسالی |
| `webCode401` | `WebCode401` | خطای 401 | عدم دسترسی یا احراز هویت ناموفق |
| `webCode403` | `WebCode403` | دسترسی ممنوع (403) | ممنوع بودن دسترسی به منبع درخواستی |
| `webCode404` | `WebCode404` | خطای 404 | پیدا نشدن صفحه یا منبع درخواستی |
| `webCode405` | `WebCode405` | متد مجاز نیست (405) | مجاز نبودن روش ارسال درخواست |
| `webCode408` | `WebCode408` | پایان زمان درخواست (408) | نرسیدن کامل درخواست در زمان تعیین شده |
| `webCode410` | `WebCode410` | حذف شده (410) | حذف دائمی و در دسترس نبودن منبع |
| `webCode429` | `WebCode429` | درخواست زیاد (429) | ارسال بیش از حد درخواست در بازه زمانی کوتاه |
| `webCode500` | `WebCode500` | خطای 500 | خطای داخلی سرور |
| `webCode502` | `WebCode502` | خطای دروازه (502) | دریافت پاسخ نامعتبر از سرور میانی (Bad Gateway) |
| `webCode503` | `WebCode503` | سرویس در دسترس نیست (503) | در دسترس نبودن موقت سرور |
| `webCode504` | `WebCode504` | خطای 504 | پایان زمان انتظار سرور (Gateway Timeout) |

### 💳 پرداخت‌ها (Payments)
| نام پوشه | نام Export | نام فارسی | توضیحات | دسته |
| :--- | :--- | :--- | :--- | :--- |
| `paymentCash` | `PaymentCash` | نقدی | اسکناس و سکه برای پرداخت نقدی | `types` |
| `paymentRial` | `PaymentRial` | ریال | پرداخت به پول ملی ایران | `types` |
| `paymentTether` | `PaymentTether` | تتر | رمزارز تتر (Tether) برای پرداخت دیجیتال | `types` |
| `paymentDerham` | `PaymentDerham` | درهم | سکه درهم برای پرداخت با ارز امارات | `types` |
| `paymentAmount` | `PaymentAmount` | مبلغ پرداخت | مبلغ و مقدار مالی پرداخت | `cash` |
| `paymentCashCurrency` | `PaymentCashCurrency` | ارز نقدی | اسکناس و پول نقد | `cash` |
| `paymentCoinCurrency` | `PaymentCoinCurrency` | سکه ارزی | سکه و ارز سکه‌ای | `cash` |
| `paymentWalletAdd` | `PaymentWalletAdd` | افزودن به کیف پول | افزودن وجه به کیف پول | `actions` |
| `paymentWithDrawal` | `PaymentWithDrawal` | برداشت | برداشت وجه از حساب | `actions` |
| `paymentDeposit` | `PaymentDeposit` | واریز | واریز وجه به حساب | `actions` |
| `paymentTransaction` | `PaymentTransaction` | تراکنش | انتقال و تراکنش مالی | `actions` |
| `paymentLeverage` | `PaymentLeverage` | اهرم معاملاتی | اهرم و لوریج معاملاتی | `leverage` |
| `paymentLeverage2` | `PaymentLeverage2` | اهرم معاملاتی ۲ | اهرم و لوریج معاملاتی مدل دوم | `leverage` |
| `paymentWallet1` | `PaymentWallet1` | کیف پول ۱ | کیف پول مدل اول | `input` |
| `paymentWallet2` | `PaymentWallet2` | کیف پول ۲ | کیف پول مدل دوم | `input` |
| `paymentCardNumber` | `PaymentCardNumber` | شماره کارت | شماره کارت بانکی | `input` |
| `paymentRate` | `PaymentRate` | نرخ | نرخ و سنجش ارزش در پرداخت‌ها | `rate` |

### ⏳ لودینگ‌ها (Loadings)
| نام پوشه | نام Export | نام فارسی | توضیحات | دسته |
| :--- | :--- | :--- | :--- | :--- |
| `loading` | `Loading` | لودینگ | چرخش دو قوس دایره‌ای | `circle` |
| `loadingOrbit` | `LoadingOrbit` | لودینگ مداری | حرکت مداری دو بیضی متقاطع | `circle` |
| `loadingPulse` | `LoadingPulse` | لودینگ نبضی | انیمیشن نبضی دو دایره متغیر | `circle` |
| `loadingDotsHorizontal` | `LoadingDotsHorizontal` | لودینگ نقطه‌ای افقی | سه نقطه متحرک افقی | `horizontal` |
| `loadingBarsHorizontal` | `LoadingBarsHorizontal` | لودینگ میله‌ای افقی | چهار میله عمودی متغیر در چینش افقی | `horizontal` |
| `loadingDotsVertical` | `LoadingDotsVertical` | لودینگ نقطه‌ای عمودی | سه نقطه متحرک عمودی | `vertical` |
| `loadingBarsVertical` | `LoadingBarsVertical` | لودینگ میله‌ای عمودی | چهار میله افقی متغیر در چینش عمودی | `vertical` |

### 👤 کاربران (Users)
| نام پوشه | نام Export | نام فارسی | توضیحات | دسته |
| :--- | :--- | :--- | :--- | :--- |
| `userAccount` | `UserAccount` | حساب کاربری | حساب کاربری نشان‌دهنده یک کاربر | `account` |
| `userAccountAdd` | `UserAccountAdd` | افزودن حساب کاربری | افزودن حساب کاربری جدید | `account` |
| `userAccountGroupAdd` | `UserAccountGroupAdd` | افزودن گروه کاربری | افزودن گروه کاربری با چند کاربر | `account` |
| `userAccountReference` | `UserAccountReference` | ارجاع حساب کاربری | ارجاع و معرفی حساب کاربری | `account` |
| `userAccountReffrence` | `UserAccountReffrence` | ارجاع حساب کاربری مقصد | ارجاع و انتقال حساب کاربری به مقصد | `account` |
| `userEmail1` | `UserEmail1` | ایمیل کاربری ۱ | ایمیل و پست الکترونیکی ساده | `emails` |
| `userEmail2` | `UserEmail2` | ایمیل کاربری ۲ | ایمیل و پست الکترونیکی پوشه‌ای | `emails` |
| `userPhone` | `UserPhone` | تلفن کاربری | تلفن و تماس کاربری | `phone` |
| `userPassword` | `UserPassword` | رمز عبور | قفل و رمز عبور کاربر | `password` |
| `userChangePassword` | `UserChangePassword` | تغییر رمز عبور | تغییر رمز عبور کاربر | `password` |

### ⚠️ نمادها (Symbols)
| نام پوشه | نام Export | نام فارسی | توضیحات |
| :--- | :--- | :--- | :--- |
| `symbolExclumationSquare` | `SymbolExclumationSquare` | علامت تعجب مربعی | علامت تعجب درون مربع |
| `symbolExclumationWarning` | `SymbolExclumationWarning` | علامت هشدار | هشدار و اخطار مثلثی |

---

## ⚠️ نکات مهم

- **پوشه‌های ثبت‌نشده:** پوشه‌های ،`webCode` در `src` موجود هستند اما در `index.ts` ثبت نشده‌اند (Legacy — در انتظار حذف یا تکمیل مهاجرت).
- **افزودن آیکون جدید:** برای اضافه کردن آیکون جدید، پوشه آیکون را در `src` بسازید، آن را در `src/index.ts` ثبت کنید، کلیدهای ترجمه را در `languages/Keys.ts` و ترجمه‌ها را در `Fa.ts` و `En.ts` اضافه کنید و در نهایت آن را در دسته‌بندی مربوطه در ماژول `module_categories` (مسیر `lists/icons`) و صفحه نمایش آیکون‌ها (`module_pages` → `ClIconPage`) ثبت کنید.

---
*مستندات توسط Mindbase تولید شده است.*