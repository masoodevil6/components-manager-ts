# راهنمای زبان برای مصرف‌کنندگان

این راهنما روش ثبت و استفاده از ترجمه‌های متعلق به برنامهٔ مصرف‌کننده را توضیح می‌دهد. API عمومی زبان از `Framework.Lang` در ورودی اصلی بسته در دسترس است.

```ts
import {Framework} from "component-manager";

const {Lang} = Framework;
```

## مفاهیم اصلی

- **Locale** زبان قابل انتخاب برنامه است و کد، نام و جهت نوشتار را مشخص می‌کند.
- **Catalog** مجموعهٔ ترجمه‌های متعلق به یک برنامه یا قابلیت است. هر کاتالوگ شناسهٔ پایدار خودش را دارد.
- **Category** برای مرتب‌کردن کاتالوگ به شکل درختی است. دسته‌ها می‌توانند زیر‌دسته و ترجمه داشته باشند.
- **Translation key** شناسهٔ نمادینی است که فریم‌ورک برای هر ترجمه می‌سازد. در زمان استفاده، به‌جای رشتهٔ مسیر از این کلید استفاده می‌کنیم.

## localeهای آماده

فریم‌ورک localeهای فارسی و انگلیسی را آماده می‌کند. برای تعیین زبان یا افزودن ترجمه، از خود referenceهای استاندارد استفاده کنید:

```ts
Lang.Locale.FA_IR
Lang.Locale.EN_US
```

برای دیدن localeهای ثبت‌شده:

```ts
const locales = Lang.listLocales();
console.log(locales);
```

برای تغییر زبان فعال برنامه:

```ts
Lang.setLocale(Lang.Locale.FA_IR);
// یا
Lang.setLocale(Lang.Locale.EN_US);
```

`setLocale` جهت RTL/LTR برنامه را نیز بر اساس تعریف locale تنظیم می‌کند.

## افزودن locale جدید

اگر برنامه به زبانی نیاز دارد که هنوز ثبت نشده، ابتدا آن را ثبت کنید. از reference برگشتی در کاتالوگ‌ها استفاده کنید:

```ts
const ES = Lang.registerLocale({
  code: "Es",
  name: "Español",
  directionRtl: false
});

// در catalog، همین reference ثبت‌شده را به کار ببرید:
const spanishText = {locale: ES, value: "Contraseña"};
```

هر locale باید `code` و `name` غیرخالی و مقدار بولی `directionRtl` داشته باشد. اگر کدی قبلاً با مشخصات متفاوت ثبت شده باشد، ثبت با خطا متوقف می‌شود.

## ثبت کاتالوگ ترجمه

کاتالوگ را با یک شناسهٔ پایدار ثبت کنید. مسیر `key` رشته‌ای محلی برای تعریف ترجمه درون همان کاتالوگ است؛ بعد از ثبت، برای خواندن ترجمه از کلید نمادینی استفاده کنید که در `catalog.keys` برگشته است.

```ts
const checkoutCatalog = Lang.registerCatalog({
  id: "shop",
  categories: [
    {
      id: "checkout",
      title: [
        {locale: Lang.Locale.FA_IR, value: "پرداخت"},
        {locale: Lang.Locale.EN_US, value: "Checkout"}
      ],
      children: [
        {
          id: "payment",
          title: [
            {locale: Lang.Locale.FA_IR, value: "پرداخت"},
            {locale: Lang.Locale.EN_US, value: "Payment"}
          ],
          entries: [
            {
              key: "payment.card.invalidNumber",
              translations: [
                {locale: Lang.Locale.FA_IR, value: "شمارهٔ کارت معتبر نیست"},
                {locale: Lang.Locale.EN_US, value: "The card number is invalid"}
              ]
            }
          ]
        }
      ]
    }
  ]
});

const invalidCardKey = checkoutCatalog.keys["payment.card.invalidNumber"];

console.log(Lang.t(invalidCardKey));
Lang.setLocale(Lang.Locale.EN_US);
console.log(Lang.t(invalidCardKey));
```

در این نمونه، `checkout` و `payment` ساختار دسته‌بندی را می‌سازند و `payment.card.invalidNumber` مسیر محلی ترجمه است. مقدار `id` کاتالوگ بخشی از شناسهٔ سراسری کلید می‌شود؛ بنابراین آن را یکتا و در نسخه‌های بعدی ثابت نگه دارید.

## دسته‌بندی چندسطحی

دسته‌ها می‌توانند هر تعداد سطح مورد نیاز داشته باشند؛ محدودیت فعلی عمق ۳۲ سطح است. ترجمه‌ها را می‌توان در هر دسته گذاشت و یک دسته می‌تواند هم‌زمان `entries` و `children` داشته باشد.

```ts
const accountCatalog = Lang.registerCatalog({
  id: "account",
  categories: [
    {
      id: "account",
      title: [
        {locale: Lang.Locale.FA_IR, value: "حساب کاربری"},
        {locale: Lang.Locale.EN_US, value: "Account"}
      ],
      entries: [
        {
          key: "welcome",
          translations: [
            {locale: Lang.Locale.FA_IR, value: "سلام {{name}}"},
            {locale: Lang.Locale.EN_US, value: "Hello {{name}}"}
          ]
        }
      ],
      children: [
        {
          id: "security",
          title: [
            {locale: Lang.Locale.FA_IR, value: "امنیت"},
            {locale: Lang.Locale.EN_US, value: "Security"}
          ],
          children: [
            {
              id: "password",
              title: [
                {locale: Lang.Locale.FA_IR, value: "گذرواژه"},
                {locale: Lang.Locale.EN_US, value: "Password"}
              ],
              entries: [
                {
                  key: "security.password.required",
                  translations: [
                    {locale: Lang.Locale.FA_IR, value: "گذرواژه الزامی است"},
                    {locale: Lang.Locale.EN_US, value: "Password is required"}
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});

const passwordRequiredKey = accountCatalog.keys["security.password.required"];
```

شناسهٔ دسته‌ها باید در کل همان کاتالوگ یکتا باشد. کلیدهای ترجمه نیز باید در کاتالوگ یکتا باشند و بخش‌های خالی نداشته باشند؛ برای نمونه، `security..password` معتبر نیست.

## استفاده از کلید در برنامه

`Lang.t(key)` ترجمهٔ زبان فعال را برمی‌گرداند. اگر ترجمه در زبان فعال وجود نداشته باشد، ترجمهٔ زبان fallback استفاده می‌شود؛ اگر در fallback هم مقداری موجود نباشد، رشتهٔ خالی برمی‌گردد.

```ts
const message = Lang.t(passwordRequiredKey);
```

برای متن‌های دارای پارامتر:

```ts
const welcomeKey = accountCatalog.keys["welcome"];
// متن ترجمه: "سلام {{name}}"

const message = Lang.t(welcomeKey, {name: "سارا"});
```

جای‌نگهدارها با `{{name}}` نوشته می‌شوند. اگر پارامتر متناظر ارائه نشود، مقدار آن جای‌نگهدار خالی می‌شود.

## خواندن کاتالوگ‌های ثبت‌شده

برای نمایش یا بررسی دسته‌بندی‌های ثبت‌شده می‌توانید از این متدها استفاده کنید:

```ts
const allCatalogs = Lang.listCatalogs();
const shopCatalog = Lang.getCatalog("shop");

console.log(allCatalogs);
console.log(shopCatalog?.categories);
```

`getCatalog` در صورت پیدا نکردن شناسه `null` برمی‌گرداند.

## اعتبارسنجی و خطاهای رایج

ثبت کاتالوگ پیش از اعمال تغییرات، کل درخت و ترجمه‌ها را اعتبارسنجی می‌کند. اگر یک بخش نامعتبر باشد، هیچ بخشی از همان کاتالوگ ثبت نمی‌شود.

- شناسهٔ کاتالوگ و دسته‌ها باید رشتهٔ غیرخالی باشند؛ شناسهٔ دسته‌ها در همان کاتالوگ تکراری نباشد.
- هر دسته باید دست‌کم یک عنوان ترجمه‌شده داشته باشد.
- `locale` در عنوان دسته و ترجمه باید reference ثبت‌شده‌ای مانند `Lang.Locale.FA_IR` یا مقدار برگشتی `Lang.registerLocale` باشد؛ کد رشته‌ای مانند `"Fa"` کافی نیست.
- برای هر ترجمه، locale را بیش از یک بار تکرار نکنید.
- مسیر کلید باید غیرخالی باشد و بخش خالی نداشته باشد.
- شناسهٔ کاتالوگ را دوباره ثبت نکنید. هر کاتالوگ در طول اجرای برنامه یک بار ثبت می‌شود.

اگر عمداً لازم است مقدار موجود برای همان کلید و locale جایگزین شود، `override: true` را فقط روی entry مورد نظر بگذارید:

```ts
{
  key: "payment.card.invalidNumber",
  override: true,
  translations: [
    {locale: Lang.Locale.EN_US, value: "Please check the card number"}
  ]
}
```

`override` برای جایگزینی مقدار ترجمه است و امکان ثبت دوبارهٔ همان شناسهٔ کاتالوگ را ایجاد نمی‌کند.

## توصیه‌ها

- شناسهٔ کاتالوگ، شناسهٔ دسته‌ها و مسیر کلیدها را پایدار و معنادار انتخاب کنید.
- کلیدهای برگشتی `catalog.keys` را نگه دارید و در کد برنامه از همان‌ها استفاده کنید؛ مسیر رشته‌ای را مستقیماً به‌عنوان کلید ترجمه مصرف نکنید.
- locale استاندارد را از `Lang.Locale` بگیرید؛ برای locale جدید، یک بار `registerLocale` را اجرا و reference برگشتی را نگه‌داری کنید.
- ترجمه‌ها را برای localeهای مورد پشتیبانی کنار هم تعریف کنید تا پوشش زبان‌ها به‌سادگی بازبینی شود.

برای استفاده از کلیدهای ترجمه در عنوان کنترلرها و دسته‌بندی کنترلرها، به [راهنمای ساخت کنترلر](./controllers.md) مراجعه کنید.

