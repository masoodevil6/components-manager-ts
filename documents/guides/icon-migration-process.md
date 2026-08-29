# فرآیند انتقال آیکون‌ها به معماری جدید (Icon Migration Process)

این مستند فرآیند استاندارد انتقال آیکون‌ها از ساختار قدیمی (Legacy) به معماری واکنش‌گرا و ماژولار جدید را توضیح می‌دهد.

> **مرجع الگو (Reference Pattern):** آیکون `paymentWallet1`
> مسیر: `src/framework/module_ui/module_icons/src/paymentWallet1/Definition.ts`
> این آیکون تمام قابلیت‌های سیستم را پوشش می‌دهد: `viewBox` سفارشی، مسیرهای چندگانه (`svgPath`) و استفاده از هر دو رنگ `primaryColor` و `secondaryColor`.

## سناریوی نمونه: انتقال مجموعه Payments → Input
منبع: `last/tools/icons/IconWallet.ts` → `src/framework/module_ui/module_icons/src/paymentWallet1/`
دسته‌بندی: `payments → input`

---

## ساختار ماژول آیکون‌ها (Architecture)

```
module_icons/
├── src/                          # تعریف‌های اصلی آیکون‌ها
│   ├── paymentWallet1/           # پوشه هر آیکون
│   │   ├── Definition.ts         # تعریف اصلی آیکون (const Definition)
│   │   └── index.ts              # اکسپورت آیکون
│   ├── paymentWallet2/
│   ├── paymentCardNumber/
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

module_categories/
├── lists/icons/                  # دسته‌بندی‌های آیکون‌ها
│   ├── payments/                 # دسته والد
│   │   ├── Definition.ts         # تعریف والد با children
│   │   ├── index.ts              # اکسپورت والد + زیردسته‌ها
│   │   ├── input/                # زیردسته
│   │   │   ├── Definition.ts     # تعریف زیردسته با icons
│   │   │   └── index.ts          # اکسپورت زیردسته + آیکون‌ها
│   │   ├── cash/
│   │   └── leverage/
│   └── ...
├── languages/                    # کلیدهای زبان دسته‌بندی‌ها
│   ├── Keys.ts                   # تعریف کلیدهای ترجمه دسته‌ها
│   ├── Fa.ts                     # ترجمه فارسی دسته‌ها
│   └── En.ts                     # ترجمه انگلیسی دسته‌ها
```

---

## قرارداد اصلی آیکون (IconDefinition)

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

**مثال از `IconWallet.ts` قدیمی:**
```typescript
viewBox: "0 0 346 244"
// path ها:
// d="M229.73,181.71c-15.74,0-28.5-12.76-28.5-28.5v-4..."
// d="M225.21,54.36l-21.09-37.72c-5.1-9.8-17.17-13.61..."
// d="M295.98,125.21h-67.8c-11.05,0-20,8.95-20,20v10.88..."
```

**نکته:** مقادیر `viewBox` باید به دو عدد `viewBoxX` و `viewBoxY` تفکیک شوند. مثلاً `viewBox: "0 0 346 244"` یعنی `viewBoxX: 346` و `viewBoxY: 244`.

**نکته مهم:** در فایل‌های قدیمی، رنگ‌ها به صورت `${primaryColor}` و `${secondaryColor}` در رشته‌های قالبی (template literal) استفاده می‌شدند. در سیستم جدید، این رنگ‌ها از `context` گرفته می‌شوند و در `attrsBind` قرار می‌گیرند.

### ۲. ساخت فایل Definition.ts (الگوی رسمی)
در مسیر `module_icons/src/<iconName>/Definition.ts`، آیکون را به صورت یک **ثابت** (نه کلاس) تعریف کنید.

**نمونه کامل — بر اساس `paymentWallet1/Definition.ts`:**

```typescript
import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.paymentWallet1.name,
    description: Keys.icons.paymentWallet1.description,

    viewBoxX:    346,
    viewBoxY:    244,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M229.73,181.71c-15.74,0-28.5-12.76-28.5-28.5v-4c0-15.74,12.76-28.5,28.5-28.5h41.5V82.65 c0-13.25-10.75-24-24-24h-207c-13.25,0-24,10.75-24,24v132c0,13.25,10.75,24,24,24h207c13.25,0,24-10.75,24-24v-32.94H229.73z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M225.21,54.36l-21.09-37.72c-5.1-9.8-17.17-13.61-26.97-8.52l-88.9,46.22L225.21,54.36z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M295.98,125.21h-67.8c-11.05,0-20,8.95-20,20v10.88c0,11.05,8.95,20,20,20h67.8c5.52,0,10-4.48,10-10v-30.88 C305.98,129.69,301.5,125.21,295.98,125.21z M234.65,169.23c-10.26,0-18.58-8.32-18.58-18.58s8.32-18.58,18.58-18.58 s18.58,8.32,18.58,18.58S244.91,169.23,234.65,169.23z",
                    fill:          context.primaryColor,
                    stroke:        context.secondaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
```

**نکات کلیدی این الگو:**
*   آیکون یک **`const Definition`** از نوع `IconDefinition` است — **کلاس تعریف نکنید**.
*   خروجی `render` یک **آرایه** از عناصر `CoreReactive.App` است.
*   ویژگی‌های ثابت (مثل `fill: "none"`، `opacity`) در `attrs` و ویژگی‌های واکنش‌گرا (رنگ، ضخامت) در `attrsBind` قرار می‌گیرند.
*   **استثنای مهم:** ویژگی `d` (مسیر SVG) در `attrsBind` قرار می‌گیرد.
*   کلید `attrsBind` هر دو نوع مقدار را می‌پذیرد: رشته خام یا `Observable` (موتور Reactive به صورت خودکار تشخیص می‌دهد).
*   **تبدیل رنگ‌ها:** در فایل قدیمی `fill="${primaryColor}"` → در فایل جدید `fill: context.primaryColor` در `attrsBind`.

### ۳. ساخت فایل index.ts آیکون
در همان پوشه آیکون، فایل `index.ts` را با محتوای زیر بسازید:

```typescript
export {Definition} from "./Definition"
```

### ۴. ثبت در ایندکس اصلی آیکون‌ها (Icon Registration)
فایل `module_icons/src/index.ts` را به‌روزرسانی کنید — یک خط `export` برای هر آیکون جدید اضافه کنید:

```typescript
export * as PaymentWallet1        from "./paymentWallet1";
export * as PaymentWallet2        from "./paymentWallet2";
export * as PaymentCardNumber     from "./paymentCardNumber";
```

**نکته نام‌گذاری:** نام namespace باید **PascalCase** با حرف اول بزرگ باشد (مثل `PaymentWallet1`، `StatusLockedClose`، `FileMenu`). این نام در مراحل بعدی برای دسترسی به آیکون استفاده می‌شود: `UiIcons.Src.<Namespace>.Definition`

### ۵. تعریف کلیدهای زبان آیکون (Icon Language Keys)

**الف) تعریف کلیدها در `module_icons/languages/Keys.ts`:**

```typescript
paymentWallet1: {
    name:        CreateTranslationKey() ,
    description: CreateTranslationKey() ,
},
paymentWallet2: {
    name:        CreateTranslationKey() ,
    description: CreateTranslationKey() ,
},
paymentCardNumber: {
    name:        CreateTranslationKey() ,
    description: CreateTranslationKey() ,
},
```

> **دقت:** `CreateTranslationKey` از `@/util_brands` ایمپورت شده باشد، نه از `@/core_languages`.

**ب) افزودن ترجمه‌ها در `module_icons/languages/Fa.ts`:**

```typescript
[
    Keys.icons.paymentWallet1.name,
    "کیف پول ۱"
],
[
    Keys.icons.paymentWallet1.description,
    "آیکون کیف پول مدل اول"
],
[
    Keys.icons.paymentWallet2.name,
    "کیف پول ۲"
],
[
    Keys.icons.paymentWallet2.description,
    "آیکون کیف پول مدل دوم"
],
[
    Keys.icons.paymentCardNumber.name,
    "شماره کارت"
],
[
    Keys.icons.paymentCardNumber.description,
    "آیکون شماره کارت بانکی"
],
```

**ج) افزودن ترجمه‌ها در `module_icons/languages/En.ts`:**

```typescript
[
    Keys.icons.paymentWallet1.name,
    "Wallet 1"
],
[
    Keys.icons.paymentWallet1.description,
    "Icon for wallet variant 1"
],
[
    Keys.icons.paymentWallet2.name,
    "Wallet 2"
],
[
    Keys.icons.paymentWallet2.description,
    "Icon for wallet variant 2"
],
[
    Keys.icons.paymentCardNumber.name,
    "Card Number"
],
[
    Keys.icons.paymentCardNumber.description,
    "Icon for bank card number"
],
```

> **نکته ساختار ترجمه‌ها:** هر ترجمه یک آرایه دو عنصری `[key, value]` درون `Map` است. کلید از `Keys.icons.<iconName>.name` یا `.description` گرفته می‌شود.

### ۶. ساخت دسته‌بندی زیر (Leaf Category)

اگر آیکون‌ها در یک زیردسته جدید قرار می‌گیرند (مثلاً `payments → input`)، یک پوشه جدید در `module_categories/lists/icons/<parent>/<subcategory>/` بسازید.

**الف) فایل `Definition.ts` زیردسته:**

مسیر: `module_categories/lists/icons/payments/input/Definition.ts`

```typescript
import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../basic/methods";
import {Keys}                              from "../../../../languages";


export const PaymentWallet1    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet1.Definition);
export const PaymentWallet2    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentWallet2.Definition);
export const PaymentCardNumber : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.PaymentCardNumber.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Input" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.paymentsInput.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.paymentsInput.name ) ,
    icons:          [
        PaymentWallet1, PaymentWallet2, PaymentCardNumber
    ]
}
```

**نکات کلیدی:**
*   هر آیکون با `CreateCategoryIcon(UiIcons.Src.<Namespace>.Definition)` به یک `TCategoryIconTotality` تبدیل می‌شود.
*   زنجیره دسترسی دقیقاً مطابق با `index.ts` ماژول آیکون: `UiIcons` → `Src` → `<Namespace>` → `Definition`
*   `id` دسته‌بندی یک رشته با حرف اول بزرگ (مثل `"Input"`، `"Header"`، `"Locked"`).
*   دسته‌های **برگه‌ای** (Leaf) از کلید `icons` استفاده می‌کنند.
*   دسته‌های **والد** (Parent) از کلید `children` استفاده می‌کنند.
*   **تعداد سطوح `../` در ایمپورت‌ها** بستگی به عمق پوشه دارد:
    - عمق ۱ (مثل `status/`): `../../../`
    - عمق ۲ (مثل `payments/input/`): `../../../../`
    - عمق ۳ (مثل `files/toolbars/header/`): `../../../../../`

**ب) فایل `index.ts` زیردسته:**

```typescript
export {Definition, PaymentWallet1, PaymentWallet2, PaymentCardNumber} from "./Definition";
```

### ۷. ثبت زیردسته در دسته والد (Parent Category)

**الف) به‌روزرسانی `Definition.ts` والد:**

مسیر: `module_categories/lists/icons/payments/Definition.ts`

```typescript
import * as CoreLanguage                   from "@/core_languages"
// ------------------------------
import {Definition as TypeDefinition}      from "./types";
import {Definition as ActionsDefinition}   from "./actions";
import {Definition as CashDefinition}      from "./cash";
import {Definition as LeverageDefinition}  from "./leverage";
import {Definition as InputDefinition}    from "./input";          // ← جدید
import {TCategoryIconDefinition}           from "../../../basic/types/TCategoryIconDefinition";
import {Keys}                              from "../../../languages";

export const Definition : TCategoryIconDefinition = {
    id:              "Payment" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.payments.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.payments.name ) ,
    children:        [
        TypeDefinition ,
        ActionsDefinition ,
        CashDefinition ,
        LeverageDefinition ,
        InputDefinition ,                                    // ← جدید
    ]
}
```

**ب) به‌روزرسانی `index.ts` والد:**

```typescript
export {Definition}    from "./Definition";
///--------------------------------------------
export * as Types      from "./types";
export * as Actions    from "./actions";
export * as Cash       from "./cash";
export * as Leverage   from "./leverage";
export * as Input     from "./input";                       // ← جدید
```

### ۸. تعریف کلیدهای زبان دسته‌بندی (Category Language Keys)

**الف) تعریف کلیدها در `module_categories/languages/Keys.ts`:**

```typescript
/// Payments -> Input
paymentsInput: {
    name:        CreateTranslationKey() ,
    description: CreateTranslationKey() ,
},
```

**ب) ترجمه فارسی در `module_categories/languages/Fa.ts`:**

```typescript
/// Payments -> Input
[
    Keys.category.icons.paymentsInput.name,
    "ایکون های ورودی پرداخت"
],
[
    Keys.category.icons.paymentsInput.description,
    "لیستی از ایکون های کیف پول و شماره کارت"
],
```

**ج) ترجمه انگلیسی در `module_categories/languages/En.ts`:**

```typescript
/// Payments -> Input
[
    Keys.category.icons.paymentsInput.name,
    "Payment Input Icons"
],
[
    Keys.category.icons.paymentsInput.description,
    "A list of wallet and card number icons"
],
```

> **نکته نام‌گذاری کلید دسته:** کلید دسته‌بندی از ترکیب نام والد + نام زیردسته با حرف اول بزرگ تشکیل می‌شود (مثل `paymentsInput`، `filesToolbarsHeader`، `statusLocked`).

### ۹. افزودن به صفحه نمایش (ClIconPage)

برای نمایش آیکون‌ها در صفحه `ClIconPage.ts`، یک بلوک `div` جدید در بخش دسته والد اضافه کنید:

مسیر: `src/framework/module_ui/module_pages/pages/icons/ClIconPage.ts`

```typescript
CoreReactive.App.div({
    className:["col-3" , "row" , "p-0" , "m-0"] ,
    children:[
        CoreReactive.App.div({
            className:["border"] ,
            children:[
                UiCategories.Icons.Payments.Input.PaymentWallet1() ,
                UiCategories.Icons.Payments.Input.PaymentWallet2() ,
                UiCategories.Icons.Payments.Input.PaymentCardNumber() ,
            ]
        }),
    ]
}),
```

**زنجیره دسترسی در ClIconPage:**
```
UiCategories.Icons.<Parent>.<Subcategory>.<IconName>()
```
مثال:
- `UiCategories.Icons.Payments.Input.PaymentWallet1()`
- `UiCategories.Icons.Status.Locked.StatusLockedClose()`
- `UiCategories.Icons.Files.Toolbars.Header.FileMenu()`

---

## چک‌لیست کامل (Checklist)

برای انتقال یک آیکون جدید، تمام مراحل زیر را به ترتیب انجام دهید:

### آیکون
- [ ] **۱.** استخراج `viewBox` و عناصر SVG از فایل قدیمی `last/tools/icons/Icon*.ts`
- [ ] **۲.** ساخت `module_icons/src/<iconName>/Definition.ts` — تبدیل رنگ‌های `${primaryColor}` به `context.primaryColor` و قرار دادن در `attrsBind`
- [ ] **۳.** ساخت `module_icons/src/<iconName>/index.ts` — `export {Definition} from "./Definition"`
- [ ] **۴.** ثبت در `module_icons/src/index.ts` — `export * as <Namespace> from "./<iconName>"`
- [ ] **۵.** کلید زبان در `module_icons/languages/Keys.ts` — `<iconName>: { name, description }`
- [ ] **۶.** ترجمه فارسی در `module_icons/languages/Fa.ts`
- [ ] **۷.** ترجمه انگلیسی در `module_icons/languages/En.ts`

### دسته‌بندی (اگر زیردسته جدید است)
- [ ] **۸.** ساخت `module_categories/lists/icons/<parent>/<subcategory>/Definition.ts` — با `CreateCategoryIcon` و `TCategoryIconTotality`
- [ ] **۹.** ساخت `module_categories/lists/icons/<parent>/<subcategory>/index.ts`
- [ ] **۱۰.** ثبت در `Definition.ts` والد — import + افزودن به `children`
- [ ] **۱۱.** ثبت در `index.ts` والد — `export * as <Subcategory> from "./<subcategory>"`
- [ ] **۱۲.** کلید زبان دسته در `module_categories/languages/Keys.ts`
- [ ] **۱۳.** ترجمه فارسی دسته در `module_categories/languages/Fa.ts`
- [ ] **۱۴.** ترجمه انگلیسی دسته در `module_categories/languages/En.ts`

### نمایش
- [ ] **۱۵.** افزودن بلوک نمایش در `ClIconPage.ts` — `UiCategories.Icons.<Parent>.<Subcategory>.<IconName>()`

---

## SVG Builders موجود

سیستم Reactive ابزارهای آماده ساخت اشکال SVG را ارائه می‌دهد:

| متد | کاربرد | مثال |
| :--- | :--- | :--- |
| `svgPath` | مسیرهای SVG | `CoreReactive.App.svgPath({attrs: {d: "...", fill: "none"}, attrsBind: {stroke: context.primaryColor}})` |
| `svgCircle` | دایره | `CoreReactive.App.svgCircle({attrs: {cx: "12", cy: "12", r: "10"}, attrsBind: {fill: context.secondaryColor}})` |
| `svgRect` | مستطیل | `CoreReactive.App.svgRect({attrs: {x: "5", y: "10", width: "14", height: "10", rx: "2"}, attrsBind: {fill: context.secondaryColor}})` |
| `svgLine` | خط | `CoreReactive.App.svgLine({attrs: {x1: "3", y1: "6", x2: "21", y2: "6"}, attrsBind: {stroke: context.primaryColor}})` |
| `svgPolygon` | چندضلعی | `CoreReactive.App.svgPolygon({attrs: {points: "266.73,182.23 272.47,182.23"}, attrsBind: {fill: context.primaryColor}})` |

---

## جدول مرجع نام‌گذاری (Naming Conventions)

| عنصر | الگو | مثال |
| :--- | :--- | :--- |
| پوشه آیکون | `camelCase` | `paymentWallet1`، `statusLockedClose` |
| Namespace در `src/index.ts` | `PascalCase` | `PaymentWallet1`، `StatusLockedClose` |
| کلید در `Keys.ts` (آیکون) | همان نام پوشه | `paymentWallet1: { name, description }` |
| کلید در `Keys.ts` (دسته) | `parent + subcategory` | `paymentsInput`، `filesToolbarsHeader` |
| `id` دسته‌بندی | `PascalCase` | `"Input"`، `"Header"`، `"Locked"` |
| دسترسی در ClIconPage | `Parent.Subcategory.IconName()` | `Payments.Input.PaymentWallet1()` |

---

## نکات مهم (Important Notes)

*   **خودکارسازی attrsBind:** در سیستم جدید، ویژگی‌های SVG (مثل `stroke` یا `fill`) می‌توانند هم مقدار خام باشند (رشته) و هم `Observable`. موتور Reactive به صورت خودکار تشخیص می‌دهد و واکنش‌گرا عمل می‌کند.
*   **جابجایی CreateTranslationKey:** اگر با خطای `TDZ` (Cannot access before initialization) مواجه شدید، مطمئن شوید که `CreateTranslationKey` از `@/util_brands` ایمپورت شده باشد، نه از `@/core_languages`. این جابجایی وابستگی چرخه‌ای (Circular Dependency) بین ماژول‌ها را می‌شکند.
*   **پیوستگی زنجیره:** همیشه بعد از ایجاد فایل‌های جدید، فایل `index.ts` مربوطه را ویرایش کنید تا ساختار ماژولی حفظ شود.
*   **الگوی صحیح را از نمونه‌های موجود بگیرید:** قبل از ساخت آیکون جدید، فایل `paymentWallet1/Definition.ts` (با Path و fill/stroke) یا `statusLockedClose/Definition.ts` (با svgRect + svgPath) را مرور کنید.
*   **حذف پوشه‌های قدیمی:** اگر نام آیکون را تغییر می‌دهید (مثل `fileHamber` → `fileMenu`)، پوشه قدیمی را حذف کنید تا خطای lint برطرف شود.
*   **دسته برگه‌ای vs والد:** دسته‌های برگه‌ای (Leaf) از کلید `icons` با آرایه‌ای از `TCategoryIconTotality` استفاده می‌کنند. دسته‌های والد (Parent) از کلید `children` با آرایه‌ای از `TCategoryIconDefinition` استفاده می‌کنند.
*   **عمق ایمپورت‌ها:** تعداد `../` در مسیر ایمپورت به عمق پوشه بستگی دارد. هر سطح یک `../` اضافه می‌کند. الگوی ایمپورت پایه: `../../../../basic/...` برای عمق ۲.