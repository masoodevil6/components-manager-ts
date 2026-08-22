# ماژول استایل‌ها (Styles Module)

این ماژول قلب تپنده مدیریت بصری در سیستم است. وظیفه آن فراهم کردن مقادیر ثابت و متدهای کمکی برای مدیریت ویژگی‌های CSS (مانند رنگ، اندازه، حاشیه و ...) است تا تضمین شود تمامی اجزای رابط کاربری دارای یکپارچگی بصری هستند و از مقادیر Hard-coded استفاده نمی‌کنند.

## 🚀 دسترسی عمومی (Public API)
شما از طریق گروه‌بندی‌های زیر به ثوابت مربوط به استایل‌ها دسترسی دارید:

| گروه | توضیحات | مثال‌ها/کاربردها |
| :--- | :--- | :--- |
| **`Css_Color`** | مدیریت رنگ‌های استاندارد سیستم. | `Primary`, `Secondary`, `Error` |
| **`Css_FontSize`** | کنترل اندازه‌های فونت برای تایپوگرافی. | `Small`, `Medium`, `Large` |
| **`Css_ZIndex`** | مدیریت سلسله مراتب نمایش عناصر (Stacking). | `Modal`, `Tooltip`, `Header` |
| **`Css_Margin` / `Padding`** | مدیریت فواصل داخلی و خارجی اجزا. | `Space-X`, `Space-Y` |
| **`Css_BorderRadius`** | کنترل میزان گردی لبه‌های اجزا. | `Rounded`, `Circle` |
| **`Css_Height`** | مدیریت ارتفاع‌های استاندارد. | `Auto`, `Fixed` |
| **`Css_SizeUnit`** | واحدهای اندازه‌گیری (مانند `px`, `%`). | `Percent`, `Pixel` |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده از رنگ‌ها و اندازه فونت در استایل‌دهی
به جای وارد کردن دستی کد رنگ، از مقادیر استاندارد ماژول استفاده کنید:

```typescript
import { Css_Color, Css_FontSize } from "@/framework/util/module_styles";

const elementStyle = {
    color: Css_Color.Primary,
    fontSize: `${Css_FontSize.Medium}px`
};
```

### ۲. مدیریت لایه‌بندی با `ZIndex`
برای جلوگیری از تداخل اجزا در صفحه، همیشه از مقادیر تعریف شده استفاده کنید:

```typescript
import { Css_ZIndex } from "@/framework/util/module_styles";

const modalStyle = {
    zIndex: Css_ZIndex.Modal // تضمین می‌کند که مودال همیشه روی بقیه قرار دارد
};
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Design System Driven:** این ماژول در واقع پیاده‌سازی کد شده‌ی **System Design** پروژه است. هر تغییری در اینجا، به طور خودکار کل ظاهر اپلیکیشن را تغییر می‌دهد.
* **Unit Consistency:** با استفاده از `Css_SizeUnit` و گروه‌های مشابه، تضمین می‌شود که تمام اندازه‌ها در سراسر سیستم بر پایه یک واحد استاندارد (مثلاً Pixel یا Percent) هستند.
* **Semantic Styling:** به جای استفاده از نام‌های فنی مثل `blue-500` (مانند Tailwind)، ما از نام‌های معنایی مانند `Css_Color.Primary` استفاده می‌کنیم که با منطق بیزنس و برند سازگارتر است.

---
*مستندات توسط Mindbase تولید شده است.*