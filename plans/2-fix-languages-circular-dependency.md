# پلن: رفع وابستگی چرخه‌ای `module_languages` ↔ `module_categories`

## ۱. شرح مشکل

خطای رانتایم:
```
Keys.ts:6 Uncaught ReferenceError: Cannot access 'CreateTranslationKey' before initialization
```

### زنجیره وابستگی چرخه‌ای:
```
core_languages/index.ts
 └→ export App from "./class"          (اولین وابستگی index)
     └→ ClLanguageApp.ts → ../directory
         └→ directory/index.ts → {Fa.ts, En.ts, Keys.ts}
             └→ import از "@/ui_categories"     ⚠️ Core → UI (وارونگی لایه)
                 └→ ui_categories/index.ts → ./languages
                     └→ languages/Keys.ts → import CreateTranslationKey از "@/core_languages"  🔁 چرخه
                         └→ CreateTranslationKey()  → TDZ چون ./methods هنوز ارزیابی نشده
```

**علت معماری:** تابع `CreateTranslationKey` (که فقط یک `Symbol()` برند‌دار است) داخل `core_languages/methods` قرار گرفته، در حالی که تایپ `TranslationKey` در `util_brands` (لایه Leaf) زندگی می‌کند. چون ماژول‌های UI برای ساخت کلیدها به آن نیاز دارند، مجبور به ایمپورت از `core_languages` می‌شوند و چرخه ایجاد می‌شود.

---

## ۲. راه‌حل انتخاب‌شده: انتقال `CreateTranslationKey` به `util_brands`

**منطق:** `util` پایین‌ترین لایه است و به هیچ ماژول دیگری وابسته نیست. با جابجایی تابع، جهت وابستگی‌ها سالم می‌شود:

```
قبل:  ui_categories → core_languages → ui_categories  🔁
بعد:  ui_categories → util_brands (Leaf)  ✓   |   core_languages → ui_categories (تجمیع directory)  ✓
```

**مزیت:** API عمومی (`CoreLanguage.App.translate` و `CoreLanguage.TranslationKeys`) دست‌نخورده می‌ماند و `ClHomePage.ts` نیازی به تغییر ندارد.

---

## ۳. مراحل اجرا

### گام ۱ — ایجاد فایل جدید در util_brands
مسیر: `src/framework/module_util/module_brands/methods/MTCreateTranslationKey.ts`
```ts
import {TBrandTranslationKey as TranslationKey} from "../types/TBrandTranslationKey";

export const MTCreateTranslationKey =
    (): TranslationKey =>
        Symbol() as TranslationKey;
```

### گام ۲ — ایجاد index متدها
مسیر: `src/framework/module_util/module_brands/methods/index.ts`
```ts
export {MTCreateTranslationKey as CreateTranslationKey} from "./MTCreateTranslationKey"
```

### گام ۳ — اکسپورت از ماژول brands
فایل: `src/framework/module_util/module_brands/index.ts`
```ts
export type {
    BrandIcons          as Icons ,
    BrandTranslationKey as TranslationKey
} from "./types"

export {CreateTranslationKey} from "./methods"
```
*(خط `export type` موجود حفظ می‌شود؛ فقط خط آخر اضافه می‌شود)*

### گام ۴ — شکستن چرخه در ui_categories (مهم‌ترین تغییر)
فایل: `src/framework/module_ui/module_categories/languages/Keys.ts`
```diff
- import {CreateTranslationKey} from "@/core_languages"
+ import {CreateTranslationKey} from "@/util_brands"
```

### گام ۵ — حفظ سازگاری API در core_languages
فایل: `src/framework/module_core/module_languages/index.ts`
```diff
  export {
      CreateTranslationKey
- } from "./methods"
+ } from "@/util_brands"
```
*(Re-export می‌ماند تا هر جایی از `CoreLanguage.CreateTranslationKey` استفاده کرده، کار کند)*

### گام ۶ — حذف فایل‌های قدیمی
- حذف: `src/framework/module_core/module_languages/methods/MTCreateTranslationKey.ts`
- حذف: `src/framework/module_core/module_languages/methods/index.ts`
- حذف پوشه خالی: `src/framework/module_core/module_languages/methods/`

*(جستجو تأیید کرد فقط `index.ts` ماژول از `./methods` ایمپورت می‌کرد — عملیات امن است)*

### گام ۷ — تست و تأیید
1. اجرای `npm run dev`
2. باز کردن `http://localhost:5173/`
3. تأیید نمایش متن «ایکون ها» در صفحه Home
4. بررسی Console — نباید خطای `TDZ` یا `SyntaxError` باشد

---

## ۴. فایل‌های تغییریافته (خلاصه)

| عملیات | مسیر |
|---|---|
| ➕ ایجاد | `module_util/module_brands/methods/MTCreateTranslationKey.ts` |
| ➕ ایجاد | `module_util/module_brands/methods/index.ts` |
| ✏️ ویرایش | `module_util/module_brands/index.ts` |
| ✏️ ویرایش | `module_ui/module_categories/languages/Keys.ts` |
| ✏️ ویرایش | `module_core/module_languages/index.ts` |
| ❌ حذف | `module_core/module_languages/methods/MTCreateTranslationKey.ts` |
| ❌ حذف | `module_core/module_languages/methods/index.ts` |

**بدون تغییر:** `ClHomePage.ts` — چون API عمومی حفظ می‌شود.

---

## ۵. ملاحظات و ریسک‌ها

1. **جهت وابستگی Core → UI باقی می‌ماند** (`directory/Keys.ts` و `Fa.ts`/`En.ts` از `ui_categories` ایمپورت می‌کنند). این یک نقطه تجمیع (Aggregation) عمدی است و چرخه ندارد، اما در آینده اگر ماژول‌های UI زیاد شوند، پیشنهاد می‌شود به **الگوی Registry** مهاجرت شود (ماژول‌های UI کلیدها/دیکشنری‌های خود را هنگام bootstrap در Core ثبت کنند).

2. **چهار فایل `lists/icon/zoom/*/Definition.ts`** نیز از `@/core_languages` ایمپورت می‌کنند، اما در گراف لود فعلی نیستند (اکسپورت آیکون در `ui_categories/index.ts` کامنت است). بعد از این فیکس ایمپورت آن‌ها هم بی‌خطر است، اما بهتر است در آینده به `@/util_brands` سوئیچ شوند.

3. **بدون ریسک Break Change:** چون `core_languages/index.ts` همچنان `CreateTranslationKey` را Re-export می‌کند.

---

## ۶. گزینه‌های جایگزین (رد شده)

- **ایمپورت مستقیم از فایل** (`from "@/core_languages/methods/..."`): فنیاً کار می‌کند اما معماری Namespace را نقض می‌کند و ریشه مشکل (جای اشتباه تابع) را درمان نمی‌کند.
- **Lazy Aggregation در directory**: نیاز به بازنویسی `_getDictionary` در `ClLanguageApp` دارد و پیچیدگی زمان اجرا را بالا می‌برد.