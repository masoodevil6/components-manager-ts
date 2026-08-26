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
| `IconVariant` | Enum | انواع مختلف آیکون (مثلاً DEFAULT) |
| `IIconOptions` | Interface | پارامترهای قابل تنظیم برای آیکون |
| `IIconRenderContext` | Interface | ساختاری که به `render` آیکون داده می‌شود |
| `IIconDefinition` | Interface | ساختار استاندارد برای تعریف یک آیکون جدید |
| `MtCreateIcon` | Function | تابع اصلی برای ساخت و رندر آیکون |
| `Icon.Definitions` | Object | لیست تمام آیکون‌های تعریف شده (مثل Zoom) |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده از یک آیکون با تنظیمات ثابت
```typescript
import * as Framework from "@/framework";

const myIcon = Framework.UI.Icon.MtCreateIcon(
    Framework.UI.Icon.Definitions.Zoom.DefinitionZoom,
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

const myIcon = Framework.UI.Icon.MtCreateIcon(
    Framework.UI.Icon.Definitions.Zoom.DefinitionZoom,
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

### تعریف یک آیکون جدید (Definition)
هر آیکون باید یک `IIconDefinition` داشته باشد. یک `Definition` فقط مسئول ساخت محتوای داخلی SVG است (نه Root اصلی).

```typescript
import * as CoreReactive from "@/core_reactive";
import * as UtilBrands  from "@/util_brands";

export const DefinitionMyIcon: IIconDefinition = {
    label: "Translation.Icon.My.Name", // کلید ترجمه
    viewBox: "0 0 24 24", // محدوده SVG
    render(context) {
        // context شامل sizeName, primaryColor, secondaryColor, strokeWidth, variant است
        return CoreReactive.App.fragment([
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
        ]);
    }
};
```

### مسئولیت `MtCreateIcon`
این تابع مرکز همه چیز است:
1.  **Merge کردن پارامترها:** ترکیب `options` کاربر با مقادیر پیش‌فرض از `CoreConfig`.
2.  **محاسبه اندازه:** ایجاد یک `computed` برای محاسبه `width` و `height` بر اساس `sizeName`.
3.  **ایجاد Context:** ساخت `IIconRenderContext` و دادن آن به `definition.render`.
4.  **ساخت SVG Root:** ایجاد المان `<svg>` نهایی با `viewBox` از definition و اتصال `width`, `height` و `aria-label` به صورت Reactive.

---
*مستندات توسط Mindbase تولید شده است.*