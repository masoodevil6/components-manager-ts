# فرآیند انتقال آیکون‌ها به معماری جدید (Icon Migration Process)

این مستند فرآیند استاندارد انتقال آیکون‌ها از ساختار قدیمی (Legacy) به معماری واکنش‌گرا و ماژولار جدید را توضیح می‌دهد.

## سناریوی نمونه: انتقال مجموعه Zoom
منبع: `last/tools/icons/` → `src/framework/module_ui/module_icons/src/`

## ساختار ماژول آیکون‌ها (Architecture)
```
module_icons/
├── src/                      # تعریف‌های اصلی آیکون‌ها
│   ├── zoom/                 # پوشه دسته‌بندی (Category)
│   │   ├── Definition.ts     # کلاس اصلی آیکون
│   │   └── index.ts          # اکسپورت آیکون
│   └── index.ts              # ثبت کلی آیکون‌ها
├── languages/                # کلیدهای زبان و ترجمه‌ها
│   └── Keys.ts               # تعریف TranslationKeyها
└── basic/                    # لایه رندرینگ پایه
    └── interface/            # اینترفیس‌های Context و Options
```

## مراحل پیاده‌سازی (Implementation Steps)

### ۱. استخراج ویژگی‌های گرافیکی (SVG Properties)
از فایل‌های قدیمی (Legacy)، مقادیر `viewBox` و `path` را استخراج کنید.

**مثال از `IconZoomIn.ts`:**
```typescript
path: "M17.5 17.5L22 22M11 7a4 4 0 10-8 0 4 4 0 008 0zm0 0v8", 
viewBox: "0 0 24 24"
```

### ۲. ساخت فایل Definition.ts
در مسیر `module_icons/src/<category>/Definition.ts`، کلاس آیکون را طبق استاندارد `IconDefinition` ایجاد کنید.

**نمونه کد:**
```typescript
import { IconDefinition, IIconRenderContext } from "../../../../basic/interface";

export class IconZoomIn extends IconDefinition {
    // تعیین دسته‌بندی
    category = "zoom";

    // تعریف گرافیک SVG
    render(context: IIconRenderContext): ReactElement {
        return this.template_render_svg({
            viewBox: "0 0 24 24",
            children: [
                this.template_render_path({
                    path: "M17.5 17.5L22 22M11 7a4 4 0 10-8 0 4 4 0 008 0zm0 0v8",
                    attrsBind: { stroke: context.primaryColor }
                })
            ]
        });
    }
}
```

### ۳. ساخت فایل index.ts
برای اینکه آیکون توسط سیستم شناخته شود، باید در همان پوشه اکسپوز شود.

```typescript
export * from "./Definition";
```

### ۴. ثبت در ماژول اصلی (Registration)
فایل `src/index.ts` را به‌روزرسانی کنید تا آیکون‌های جدید را ثبت کند.

```typescript
export * as Zoom from "./zoom";
// ... سایر دسته‌بندی‌ها
```

### ۵. تعریف کلیدهای زبان (Language Keys)
کلیدهای ترجمه را در `languages/Keys.ts` تعریف کنید تا سیستم چندزبانی بتواند نام‌های آیکون‌ها را ترجمه کند.

```typescript
import { CreateTranslationKey } from "@/core_brands";

export const IconKeys = {
    zoom: {
        in:  CreateTranslationKey("Icons.keys.zoom.in", "Zoom In"),
        out: CreateTranslationKey("Icons.keys.zoom.out", "Zoom Out"),
        refresh: CreateTranslationKey("Icons.keys.zoom.refresh", "Zoom Refresh")
    }
}
```

### ۶. به‌روزرسانی دسته‌بندی (Categories Update)
برای اینکه آیکون‌های جدید در سیستم دسته‌بندی (UI Categories) نمایش داده شوند، باید فایل Definition مربوط به آن دسته را به‌روزرسانی کنید.

**مسیر:** `src/framework/module_ui/module_categories/lists/icons/<category>/Definition.ts`

**نمونه کد:**
```typescript
import * as UiIcons from "@/ui_icons";
// ... imports

export const Definition : TCategoryIconDefinition = {
    id: "zoom",
    name: CoreLanguage.App.translate(Keys.category.icons.zoom.name),
    description: CoreLanguage.App.translate(Keys.category.icons.zoom.name),
    icons: [
        // افزودن آیکون‌های جدید به این لیست
        UiIcons.Src.ZoomIn.Definition,
        UiIcons.Src.ZoomOut.Definition,
        UiIcons.Src.ZoomRefresh.Definition
    ]
}
```

**نکته:** مسیر ایمپورت (`UiIcons.Src.ZoomIn.Definition`) دقیقاً مطابق با ساختار `index.ts` در ماژول آیکون‌ها است.

---

## نکات مهم (Important Notes)

* **خودکارسازی با attrsBind:** در سیستم جدید، ویژگی‌های SVG (مثل `stroke` یا `fill`) می‌توانند هم مقدار خام باشند (رشته) و هم Observable. موتور Reactive به صورت خودکار تشخیص می‌دهد و واکنش‌گرا عمل می‌کند.
* **جابجایی CreateTranslationKey:** اگر با خطای `TDZ` مواجه شدید، مطمئن شوید که `CreateTranslationKey` از `@/util_brands` ایمپورت شده باشد، نه از `@/core_languages`.
* **پیوستگی زنجیره:** همیشه بعد از ایجاد فایل‌های جدید، فایل `index.ts` مربوطه را ویرایش کنید تا ساختار ماژولی حفظ شود.