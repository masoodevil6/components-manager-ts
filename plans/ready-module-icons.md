# Plan توسعه ماژول Icons در Framework

## هدف

تکمیل ماژول `Icons` به‌صورت یک سیستم SVG Reactive و ماژولار که:

* Iconها از طریق `Definition` تعریف شوند.
* یک Builder مرکزی به نام `MtCreateIcon` ساخت SVG نهایی را انجام دهد.
* پارامترهای Icon بتوانند ثابت یا Reactive باشند.
* مقدار ثابت بدون تبدیل مصنوعی به Observable استفاده شود.
* تغییر Observableها بتواند مستقیماً SVG را به‌روزرسانی کند.
* `IconDefinition` وابستگی مستقیمی به Config، Language یا Observable نداشته باشد.
* ماژول Icons از `core_reactive` فقط به‌عنوان Dependency عمومی استفاده کند.
* ساختار با Public API فعلی Framework سازگار باشد.

---

# 1. ساختار پیشنهادی ماژول

```text
module_icons/
│
├── definitions/
│   ├── icon_account/
│   │   ├── Definition.ts
│   │   └── index.ts
│   │
│   ├── icon_zoom_in/
│   │   ├── Definition.ts
│   │   └── index.ts
│   │
│   └── ...
│
├── enums/
│   ├── EIconVariant.ts
│   └── index.ts
│
├── interface/
│   ├── IIconOptions.ts
│   ├── IIconRenderContext.ts
│   ├── IIconDefinition.ts
│   └── index.ts
│
├── methods/
│   ├── MtCreateIcon.ts
│   └── index.ts
│
├── types/
│   ├── TIcon.ts
│   └── index.ts
│
└── index.ts
```

نام پوشه‌ها و فایل‌ها می‌تواند با استاندارد فعلی پروژه هماهنگ شود، اما مسئولیت‌ها باید حفظ شوند.

---

# 2. مفهوم `TReactiveValue`

این Type متعلق به ماژول `core_reactive` است و نباید دوباره داخل ماژول Icons تعریف شود.

مفهوم:

```ts
TReactiveValue<T> = T | Observable<T>
```

معنای آن:

```text
مقدار ثابت
یا
مقدار Reactive
```

مثال:

```ts
const color: TReactiveValue<string> = "#ff0000";
```

یا:

```ts
const color: TReactiveValue<string> =
    CoreConfig.Settings.PrimaryColor.observable();
```

نباید مقدار ثابت به‌صورت مصنوعی تبدیل به Observable شود.

این کار اشتباه است:

```ts
Observable("#ff0000")
```

فقط به این دلیل که تمام مقادیر یک شکل داشته باشند.

اصل معماری:

> Reactive بودن ویژگی منبع داده است، نه چیزی که باید به تمام مقادیر تحمیل شود.

---

# 3. `IIconOptions`

این Interface مربوط به Public API Icon است.

کاربر هنگام ساخت Icon از آن استفاده می‌کند.

نمونه:

```ts
import * as CoreReactive from "@/core_reactive";
import { IconVariant } from "../enums";

export interface IIconOptions {

    size?:
        CoreReactive.TReactiveValue<string>;

    primaryColor?:
        CoreReactive.TReactiveValue<string>;

    secondaryColor?:
        CoreReactive.TReactiveValue<string>;

    strokeWidth?:
        CoreReactive.TReactiveValue<number>;

    variant?:
        CoreReactive.TReactiveValue<IconVariant>;

}
```

مثال استفاده:

```ts
IconAccount({
    size: "L",
    primaryColor: "#ff0000",
    strokeWidth: 10
});
```

یا:

```ts
IconAccount({
    primaryColor:
        CoreConfig.Settings.PrimaryColor.observable()
});
```

هر دو باید معتبر باشند.

---

# 4. `IIconRenderContext`

این Interface قرارداد داخلی بین:

```text
MtCreateIcon
        ↓
IIconDefinition.render()
```

است.

Definition نباید مستقیماً `Options` را دریافت کند.

چون `MtCreateIcon` ممکن است:

* مقدار پیش‌فرض اعمال کند.
* Config را وارد کند.
* مقدار Size را به محاسبات Reactive متصل کند.
* پارامترها را Resolve کند.

نمونه:

```ts
import * as CoreReactive from "@/core_reactive";
import { IconVariant } from "../enums";

export interface IIconRenderContext {

    sizeName:
        CoreReactive.TReactiveValue<string>;

    primaryColor:
        CoreReactive.TReactiveValue<string>;

    secondaryColor:
        CoreReactive.TReactiveValue<string>;

    strokeWidth:
        CoreReactive.TReactiveValue<number>;

    variant:
        CoreReactive.TReactiveValue<IconVariant>;

}
```

در صورت نیاز، اگر Definition واقعاً به `iconSize` نیاز دارد، می‌توان آن را نیز به Context اضافه کرد:

```ts
iconSize: CoreReactive.TReactiveValue<number>;
```

اما باید تصمیم مشخصی گرفته شود:

* اگر Definition باید با Size واقعی کار کند، `iconSize` داده شود.
* اگر فقط Root SVG به Size نیاز دارد، Context باید فقط `sizeName` داشته باشد.

پارامترهای بدون استفاده نباید صرفاً برای زیبایی معماری نگه داشته شوند.

---

# 5. `IIconDefinition`

هر Icon باید با یک Definition تعریف شود.

Definition مسئول ساخت کل SVG نیست.

Definition فقط مسئول ساخت محتوای داخلی SVG است.

Root SVG توسط `MtCreateIcon` ساخته می‌شود.

نمونه:

```ts
import * as CoreReactive from "@/core_reactive";
import * as UtilBrands from "@/util_brands";
import { IconRenderContext } from "./index";

export interface IIconDefinition {

    /**
     * کلید ترجمه مربوط به Icon.
     */
    label:
        UtilBrands.TranslationKey;

    /**
     * محدوده SVG.
     */
    viewBox:
        string;

    /**
     * ساخت محتوای داخلی SVG.
     */
    render(
        context: IconRenderContext
    ): CoreReactive.TReactiveElement;

}
```

نکته:

`CoreReactive.TReactiveElement` باید با Type واقعی خروجی Elementهای Reactive در Framework جایگزین شود.

از این استفاده نشود:

```ts
render(...): CoreReactive.App
```

چون `App` یک API یا Namespace است و Type خروجی واقعی Element نیست.

---

# 6. مسئولیت `MtCreateIcon`

`MtCreateIcon` مرکز اتصال تمام بخش‌ها است.

جریان:

```text
IIconDefinition
        +
IIconOptions
        +
Default Config
        ↓
MtCreateIcon
        ↓
IIconRenderContext
        ↓
definition.render()
        ↓
SVG Root
        ↓
Reactive SVG
```

نمونه اولیه:

```ts
export function MtCreateIcon(
    definition: IconDefinition,
    options: IconOptions = {}
): UtilBrands.Icons {
```

---

# 7. Resolve کردن Size

Size می‌تواند از کاربر دریافت شود:

```ts
options.size
```

یا اگر کاربر مقدار نداد:

```ts
CoreConfig.Settings.SizeName.observable()
```

بنابراین:

```ts
const sizeName =
    options.size ??
    CoreConfig.Settings.SizeName.observable();
```

نباید این کار انجام شود:

```ts
new Observable(options.size)
```

چون:

1. ممکن است `options.size` از قبل Observable باشد.
2. باعث ایجاد ساختارهای نامفهوم مثل `Observable<Observable<T>>` می‌شود.
3. مقدار ثابت را بی‌دلیل Reactive می‌کند.

---

# 8. محاسبه اندازه واقعی Icon

اندازه واقعی SVG می‌تواند با Computed ساخته شود:

```ts
const iconSize =
    CoreObservable.App.computed(
        value => UtilStyle.Css_IconSize(value),
        [sizeName],
        new CoreObservable.Scope()
    );
```

اگر `sizeName` Reactive باشد:

```text
Config
   ↓
Observable
   ↓
Computed iconSize
   ↓
SVG width / height
```

و با تغییر Config، اندازه SVG تغییر کند.

اگر `sizeName` مقدار ثابت باشد، سیستم Reactive باید مطابق قابلیت‌های Framework رفتار کند.

---

# 9. Resolve کردن رنگ‌ها

رنگ اولیه:

```ts
const primaryColor =
    options.primaryColor ??
    UtilStyle.Css_Color(
        UtilConst.ColorMain.PRIMARY,
        UtilConst.ColorGrad.GRADE_1
    );
```

رنگ ثانویه:

```ts
const secondaryColor =
    options.secondaryColor ??
    UtilStyle.Css_Color(
        UtilConst.ColorMain.SECONDARY,
        UtilConst.ColorGrad.GRADE_1
    );
```

این مقادیر ممکن است:

```text
string
```

یا:

```text
Observable<string>
```

باشند.

نباید آن‌ها بدون نیاز تبدیل به Observable شوند.

---

# 10. Resolve کردن Stroke Width

Type صحیح:

```ts
CoreReactive.TReactiveValue<number>
```

نه:

```ts
CoreReactive.TReactiveValue<string>
```

مقدار:

```ts
const strokeWidth =
    options.strokeWidth ?? 10;
```

اگر در آینده Stroke Width باید بر اساس Size محاسبه شود، می‌توان از Computed استفاده کرد.

اما فعلاً فقط در صورت وجود نیاز واقعی این وابستگی ساخته شود.

Computed بدون مصرف، فقط یک موجودیت اضافی دیگر برای نگهداری است.

---

# 11. Resolve کردن Variant

مقدار پیش‌فرض:

```ts
const variant =
    options.variant ??
    IconVariant.DEFAULT;
```

`variant` می‌تواند ثابت یا Reactive باشد.

Definition باید بتواند Variant را دریافت کند.

---

# 12. ساخت `IIconRenderContext`

پس:

```ts
const context: IconRenderContext = {

    sizeName,

    primaryColor,

    secondaryColor,

    strokeWidth,

    variant

};
```

و:

```ts
const content =
    definition.render(context);
```

---

# 13. ساخت SVG Root

`MtCreateIcon` مسئول ساخت SVG اصلی است.

نمونه:

```ts
return CoreReactive.App.svg({

    attrs: {

        xmlns:
            "http://www.w3.org/2000/svg",

        role:
            "img",

        viewBox:
            definition.viewBox,

        fill:
            "none"

    },

    attrsBind: {

        width:
            iconSize,

        height:
            iconSize,

        "aria-label":
            CoreLanguage.App.translate(
                definition.label
            )

    },

    children:
        content

}) as UtilBrands.Icons;
```

Definition نباید دوباره SVG Root ایجاد کند.

---

# 14. Translation

هر Icon دارای:

```ts
definition.label
```

است.

مثلاً:

```ts
label:
    Translation.Icon.Account.Name
```

ترجمه باید از سیستم Language مرکزی انجام شود.

اگر سیستم Language قابلیت تغییر زبان در Runtime دارد و SVG باید همراه آن تغییر کند، `aria-label` و در صورت وجود `title` نیز باید Reactive باشند.

بنابراین بررسی شود که:

```ts
CoreLanguage.App.translate(...)
```

مقدار ثابت برمی‌گرداند یا مقدار Reactive.

اگر فقط مقدار ثابت برمی‌گرداند، برای پشتیبانی از تغییر Runtime زبان باید یک API Reactive مناسب در Language طراحی شود.

مثلاً مفهومی شبیه:

```ts
CoreLanguage.App.translateReactive(key)
```

اما API جدید فقط در صورت نیاز واقعی اضافه شود.

---

# 15. مثال Definition یک Icon

مثلاً Account:

```ts
export const DefinitionAccount: IconDefinition = {

    label:
        Translation.Icon.Account.Name,

    viewBox:
        "0 0 300 300",

    render(context) {

        return CoreReactive.App.fragment([

            CoreReactive.App.circle({
                attrsBind: {
                    fill:
                        context.secondaryColor
                },

                attrs: {
                    opacity: "0.6",
                    cx: "151.75",
                    cy: "150.25",
                    r: "140"
                }
            }),

            CoreReactive.App.circle({
                attrs: {
                    fill: "none",
                    cx: "151.75",
                    cy: "150.25",
                    r: "140"
                },

                attrsBind: {
                    stroke:
                        context.primaryColor,

                    "stroke-width":
                        context.strokeWidth
                }
            })

        ]);

    }

};
```

ساختار دقیق API مربوط به `CoreReactive.App` باید با پیاده‌سازی واقعی Framework هماهنگ شود.

هدف مهم این است که:

```ts
context.primaryColor
```

مستقیماً به Binding داده شود.

نه اینکه ابتدا با:

```ts
.get()
```

به مقدار ثابت تبدیل شود.

مثلاً این کار برای پارامتر Reactive اشتباه است:

```ts
fill:
    context.primaryColor.get()
```

چون اتصال Reactive را قطع می‌کند.

---

# 16. اصل مهم درباره Definition

Definition نباید این موارد را Import کند:

```text
CoreConfig
CoreLanguage
CoreObservable
```

مگر در شرایط بسیار خاص.

Definition باید فقط:

```text
IIconRenderContext
CoreReactive
TranslationKey
```

و ابزارهای لازم برای ساخت ساختار داخلی خودش را بشناسد.

وابستگی‌ها:

```text
Config
Language
Options
Defaults
       ↓
  MtCreateIcon
       ↓
IIconRenderContext
       ↓
IconDefinition
```

نه:

```text
IconDefinition
   ├── Config
   ├── Language
   ├── Options
   └── Observable
```

این جداسازی برای جلوگیری از coupling مهم است.

---

# 17. Public API

در `index.ts` ماژول Icons باید APIهای لازم Re-export شوند.

مثلاً:

```ts
export { IconVariant } from "./enums";

export type {
    IconOptions,
    IconDefinition,
    IconRenderContext
} from "./interface";

export {
    MtCreateIcon
} from "./methods";
```

برای Typeها از:

```ts
export type
```

استفاده شود.

برای Function، Class، Enum و Value از:

```ts
export
```

استفاده شود.

---

# 18. اصول Import

داخل خود ماژول Icons:

```text
Internal Import
```

استفاده شود.

مثلاً:

```ts
import { IconVariant } from "../enums";
```

و نه:

```ts
import * as Icons from "@/module_icons";
```

برای جلوگیری از وابستگی حلقوی ناشی از Public API.

بین ماژول‌ها:

```ts
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
```

از Public API استفاده شود.

اصل:

```text
داخل یک ماژول
    ↓
Import داخلی

بین دو ماژول
    ↓
Import از Public API
```

---

# 19. تست‌های لازم

پیاده‌سازی باید این موارد را بررسی کند:

### مقدار ثابت

```ts
IconAccount({
    primaryColor: "#ff0000",
    strokeWidth: 5
});
```

باید درست render شود.

### مقدار Reactive

```ts
IconAccount({
    primaryColor:
        someObservable
});
```

با تغییر `someObservable` باید رنگ SVG تغییر کند.

### Size پیش‌فرض

```ts
IconAccount();
```

باید از:

```ts
CoreConfig.Settings.SizeName.observable()
```

استفاده کند.

با تغییر Config باید Width و Height تغییر کنند.

### Size سفارشی ثابت

```ts
IconAccount({
    size: "L"
});
```

نباید به تغییر Config وابسته باشد.

### Size سفارشی Reactive

```ts
IconAccount({
    size: someObservable
});
```

باید با تغییر Observable، اندازه SVG تغییر کند.

### عدم ایجاد Nested Observable

نباید هیچ مسیر عادی باعث ایجاد این شود:

```ts
Observable<Observable<T>>
```

---

# نتیجه نهایی معماری

```text
                    Core Reactive
                         │
                   TReactiveValue<T>
                         │
          ┌──────────────┴──────────────┐
          │                             │
     IIconOptions                IIconRenderContext
          │                             ▲
          │                             │
          └────────── MtCreateIcon ─────┘
                         │
                 ┌───────┴────────┐
                 │                │
              Config           Defaults
                 │
                 ▼
            Observable
                         │
                         ▼
                   IconDefinition
                         │
                         ▼
                  Reactive SVG
                         │
                         ▼
                       DOM
```

قانون اصلی سیستم:

```text
مقدار ثابت
    ↓
همان مقدار ثابت باقی می‌ماند

مقدار Observable
    ↓
همان Observable باقی می‌ماند

TReactiveValue
    ↓
قرارداد پذیرش هر دو
```

هدف این است که ماژول Icon بتواند Reactive باشد، بدون اینکه تمام داده‌های جهان را صرفاً برای رضایت TypeScript به Observable تبدیل کند.
