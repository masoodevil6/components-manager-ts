# فرآیند انتقال آیکون‌ها به معماری جدید (Icon Migration Process)

این مستند فرآیند استاندارد انتقال آیکون‌ها از ساختار قدیمی (Legacy) به معماری واکنش‌گرا و ماژولار جدید را توضیح می‌دهد.

> **مرجع الگو (Reference Pattern):** آیکون `timeClock`
> مسیر: `src/framework/module_ui/module_icons/src/timeClock/Definition.ts`
> این آیکون تمام قابلیت‌های سیستم را پوشش می‌دهد: `viewBox` سفارشی، اشکال دایره‌ای (`svgCircle`)، مسیرهای چندگانه (`svgPath`) و استفاده از هر دو رنگ `primaryColor` و `secondaryColor`.

## سناریوی نمونه: انتقال مجموعه Zoom
منبع: `last/tools/icons/` → `src/framework/module_ui/module_icons/src/`

---

## ساختار ماژول آیکون‌ها (Architecture)

```
module_icons/
├── src/                          # تعریف‌های اصلی آیکون‌ها
│   ├── timeClock/                # پوشه هر آیکون
│   │   ├── Definition.ts         # تعریف اصلی آیکون (const Definition)
│   │   └── index.ts              # اکسپورت آیکون
│   ├── zoom/                     # آیکون‌های دسته zoom
│   └── index.ts                  # ثبت کلی تمام آیکون‌ها
├── languages/                    # کلیدهای زبان و ترجمه‌ها
│   ├── Keys.ts                   # تعریف TranslationKeyها
│   ├── Fa.ts                     # ترجمه فارسی
│   └── En.ts                     # ترجمه انگلیسی
└── basic/                        # لایه رندرینگ پایه
    └── interface/                # اینترفیس‌های سیستم
        ├── IIconDefinition.ts    # قرارداد اصلی آیکون
        ├── IIconRenderContext.ts # مقادیر واکنش‌گرای ورودی
        └── IIconOptions.ts       # تنظیمات نمایش
```

---

## قرارداد اصلی آیکون (IIconDefinition)

هر آیکون باید یک `const` از نوع `IconDefinition` باشد که این اینترفیس را پیاده‌سازی می‌کند:

```typescript
// basic/interface/IIconDefinition.ts
export interface IIconDefinition {
    title:        UtilBrands.TranslationKey;   // کلید ترجمه نام آیکون
    description?: UtilBrands.TranslationKey;   // کلید ترجمه توضیحات
    viewBoxX:     number;                      // عرض مختصات SVG
    viewBoxY:     number;                      // ارتفاع مختصات SVG
    render(context: IconRenderContext): CoreReactive.App[];  // خروجی گرافیکی
}
```

**مقادیر موجود در Context (همه واکنش‌گرا و از نوع `TObservableValue`):**

| فیلد | نوع | کاربرد |
| :--- | :--- | :--- |
| `scope` | `CoreObservable.Scope?` | مدیریت چرخه حیات اشتراک‌ها |
| `sizeName` | `number \| string` | اندازه آیکون |
| `primaryColor` | `string` | رنگ اصلی (خطوط، fill های اصلی) |
| `secondaryColor` | `string` | رنگ ثانویه (پس‌زمینه‌ها، opacity) |
| `strokeWidth` | `number` | ضخامت خطوط |
| `variant` | `IconVariant` | حالت نمایش |

---

## مراحل پیاده‌سازی (Implementation Steps)

### ۱. استخراج ویژگی‌های گرافیکی (SVG Properties)
از فایل قدیمی (Legacy)، مقادیر `viewBox` و محتوای SVG را استخراج کنید.

**مثال از `IconZoomIn.ts` قدیمی:**
```typescript
path: "M17.5 17.5L22 22M11 7a4 4 0 10-8 0 4 4 0 008 0zm0 0v8",
viewBox: "0 0 24 24"
```

**نکته:** مقادیر `viewBox` باید به دو عدد `viewBoxX` و `viewBoxY` تفکیک شوند. مثلاً `viewBox: "0 0 313 346"` یعنی `viewBoxX: 313` و `viewBoxY: 346`.

### ۲. ساخت فایل Definition.ts (الگوی رسمی)
در مسیر `module_icons/src/<iconName>/Definition.ts`، آیکون را به صورت یک **ثابت** (نه کلاس) تعریف کنید.

**نمونه کامل — بر اساس `timeClock/Definition.ts`:**

```typescript
import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UtilStyle      from "@/util_styles";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    // اتصال به سیستم چندزبانی
    title:       Keys.icons.timeClock.name,
    description: Keys.icons.timeClock.description,

    // ابعاد مختصات SVG (به جای رشته "0 0 313 346")
    viewBoxX:    313,
    viewBoxY:    346,

    render(context) {

        return [

            // شکل دایره‌ای با رنگ ثانویه (پس‌زمینه با شفافیت)
            CoreReactive.App.svgCircle({
                attrs: {
                    cx:      "158.07",
                    cy:      "172.22",
                    r:       "140",
                    opacity: "0.6"
                },
                attrsBind: {
                    fill: context.secondaryColor   // رنگ ثانویه
                }
            }),

            // خط دور دایره با رنگ اصلی
            CoreReactive.App.svgCircle({
                attrs: {
                    cx: "158.07",
                    cy: "172.22",
                    r:  "140",
                    fill: "none"
                },
                attrsBind: {
                    stroke:         context.primaryColor,   // رنگ اصلی
                    "stroke-width": context.strokeWidth     // ضخامت خط
                }
            }),

            // مسیرهای SVG (عصر ساعت، زنگ‌ها و پایه)
            CoreReactive.App.svgPath({
                attrs: {
                    d: "M156.57,172.22h3c2.76,0,5-2.24,5-5V51.72c0-2.76-2.24-5-5-5h-3c-2.76,0-5,2.24-5,5v115.5C151.57,169.98,153.81,172.22,156.57,172.22z"
                },
                attrsBind: {
                    fill: context.primaryColor
                }
            }),

            // ... سایر مسیرها (Minute hand, Bells, Bottom)
        ];
    }
};
```

**نکات کلیدی این الگو:**
*   آیکون یک **`const Definition`** از نوع `IconDefinition` است — **کلاس تعریف نکنید**.
*   خروجی `render` یک **آرایه** از عناصر `CoreReactive.App` است.
*   ویژگی‌های ثابت (مثل مختصات `d`) در `attrs` و ویژگی‌های واکنش‌گرا (رنگ، ضخامت) در `attrsBind` قرار می‌گیرند.
*   کلید `attrsBind` هر دو نوع مقدار را می‌پذیرد: رشته خام یا `Observable` (موتور Reactive به صورت خودکار تشخیص می‌دهد).

### ۳. ساخت فایل index.ts
برای اینکه آیکون توسط سیستم شناخته شود، باید در همان پوشه اکسپوز شود:

```typescript
export * from "./Definition";
```

### ۴. ثبت در ماژول اصلی (Registration)
فایل `src/index.ts` ماژول آیکون‌ها را به‌روزرسانی کنید:

```typescript
export * as TimeClock from "./timeClock";
export * as TimeCalender from "./timeCalender";
// ... سایر آیکون‌ها
```

**نکته نام‌گذاری:** نام namespace باید توصیف‌کننده دسته + نام آیکون باشد (مثل `StatusIsTrue`، `CalcPlus`) تا در مراحل دسته‌بندی، مرجع‌سازی واضح باشد.

### ۵. تعریف کلیدهای زبان (Language Keys)

**الف) تعریف کلیدها در `languages/Keys.ts`:**

```typescript
import {CreateTranslationKey} from "@/util_brands"   // دقت کنید: util_brands نه core_languages!

export const Keys = {
    icons: {
        // ...
        timeClock: {
            name:        CreateTranslationKey(),
            description: CreateTranslationKey(),
        },
    },
}
```

**ب) افزودن ترجمه‌ها در `languages/Fa.ts` و `languages/En.ts`:**

```typescript
// Fa.ts
timeClock: {
    name:        "ساعت",
    description: "ایکون ساعت دیواری",
},

// En.ts
timeClock: {
    name:        "Clock",
    description: "Wall clock icon",
},
```

### ۶. ساخت دسته‌بندی (UI Categories)
برای نمایش آیکون‌ها در سیستم دسته‌بندی، یک پوشه جدید در `module_categories/lists/icons/` بسازید:

**مسیر:** `src/framework/module_ui/module_categories/lists/icons/<category>/Definition.ts`

```typescript
import * as UiIcons from "@/ui_icons";

export const Definition: TCategoryIconDefinition = {
    id:          "time",
    name:        CoreLanguage.App.translate(Keys.category.icons.time.name),
    description: CoreLanguage.App.translate(Keys.category.icons.time.description),
    icons: [
        UiIcons.Src.TimeClock.Definition,      // دقیقاً مطابق با namespace های src/index.ts
        UiIcons.Src.TimeCalender.Definition
    ]
}
```

**نکته:** زنجیره دسترسی دقیقاً مطابق با `index.ts` ماژول آیکون است:
`UiIcons` → `Src` → `<Namespace>` → `Definition`

### ۷. ثبت دسته‌بندی
فایل `lists/icons/index.ts` را به‌روزرسانی کنید:

```typescript
export * as Time from "./time";
```

و کلیدهای زبان دسته را در `module_categories/languages/Keys.ts` و فایل‌های ترجمه مربوطه اضافه کنید.

---

## نکات مهم (Important Notes)

*   **خودکارسازی attrsBind:** در سیستم جدید، ویژگی‌های SVG (مثل `stroke` یا `fill`) می‌توانند هم مقدار خام باشند (رشته) و هم `Observable`. موتور Reactive به صورت خودکار تشخیص می‌دهد و واکنش‌گرا عمل می‌کند.
*   **جابجایی CreateTranslationKey:** اگر با خطای `TDZ` (Cannot access before initialization) مواجه شدید، مطمئن شوید که `CreateTranslationKey` از `@/util_brands` ایمپورت شده باشد، نه از `@/core_languages`. این جابجایی وابستگی چرخه‌ای (Circular Dependency) بین ماژول‌ها را می‌شکند.
*   **پیوستگی زنجیره:** همیشه بعد از ایجاد فایل‌های جدید، فایل `index.ts` مربوطه را ویرایش کنید تا ساختار ماژولی حفظ شود.
*   **الگوی صحیح را از نمونه‌های موجود بگیرید:** قبل از ساخت آیکون جدید، فایل `timeClock/Definition.ts` (پیشرفته با Circle + Path) یا `zoomIn/Definition.ts` (ساده با Path) را مرور کنید.
*   **SVG Builders موجود:** سیستم Reactive ابزارهای آماده ساخت اشکال SVG را ارائه می‌دهد: `svgCircle`، `svgPath` و `svgRect` (به جای ساخت دستی تگ‌ها).