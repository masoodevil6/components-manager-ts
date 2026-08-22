# ماژول Observable (مدیریت وضعیت واکنشی)

این ماژول قلب تپنده سیستم مدیریت داده در پروژه است. وظیفه آن نگهداری مقدار (Value) و ایجاد یک جریان داده‌ی واکنش‌گرا (Reactive Data Flow) از طریق ثبت مشترکان (Subscribers) است. این لایه اجازه می‌دهد تا تغییرات در وضعیت، به صورت خودکار و هوشمند به سایر بخش‌های سیستم منتقل شود.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`App`** به کلاس اصلی دسترسی دارید:

### `App` (در اصل `ClObservable`)
کلاس اصلی برای مدیریت هر نوع داده‌ای که نیاز به واکنش‌گرا بودن دارد.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `static isObservable(obj)` | بررسی اینکه آیا یک شیء از نوع `Observable` است یا خیر. |
| `get()` | بازگرداندن مقدار فعلی موجود در Observable. |
| `set(value)` | تغییر مقدار و اعلان خودکار به تمام مشترکان (Subscribers). |
| `update(fn, observables)` | تغییر مقدار بر اساس یک تابع، با دسترسی به مقادیر سایر Observableهای مرتبط. |
| `subscribe(fn, scope)` | ثبت یک تابع برای گوش دادن به تغییرات (با قابلیت مدیریت چرخه حیات از طریق `scope`). |
| `map(fn, scope)` | ایجاد یک Observable جدید که خروجی آن تابعِ نگاشت شده از این Observable است. |

### متدهای استاتیک پیشرفته (Advanced Static Methods)

| متد | توضیحات |
| :--- | :--- |
| `static computed(...)` | ایجاد یک Observable وابسته که با تغییر هر یک از ورودی‌ها، خود را بازمحاسبه می‌کند. |
| `static conditionSwitch(...)` | انتخاب یک خروجی بر اساس مقدار فعلی (مانند Switch-Case در برنامه‌نویسی). |
| `static conditionWhen(...)` | بازگشت یک مقدار بر اساس برقرار بودن یا نبودن یک شرط خاص روی مقادیر ورودی. |
| `static for(...)` | تبدیل یک آرایه واکنشی به لیستی از مقادیر نگاشت شده (Mapping) با پشتیبانی از Context. |
| `static forObject(...)` | مشابه `for` اما برای کار بر روی کلید و مقدار در یک Object واکنشی. |

---

## 💡 مثال‌های کاربردی (Usage Examples)

### ۱. استفاده پایه از `set` و `get`
```typescript
import { App } from "@/framework/core/observable";

const count = new App<number>(0);

// ثبت یک شنیده برای مانیتور کردن تغییرات
const unsub = count.subscribe(v => console.log(`Value: ${v}`));

count.set(10); // خروجی: Value: 10
unsub();      // قطع اشتراک
```

### ۲. استفاده از `computed` برای مقادیر وابسته
یکی از کاربردی‌ترین بخش‌ها، ایجاد وابستگی‌های هوشمند است:
```typescript
import { App } from "@/framework/core/observable";

const price = new App<number>(100);
const tax = new App<number>(0.1);

// محاسبه خودکار قیمت نهایی (Price + Tax)
const total = App.computed(
    ([p, t]) => p + (p * t), 
    [price, tax]
);

console.log(total.get()); // 110
price.set(200);
console.log(total.get()); // 220
```

### ۳. استفاده از `conditionSwitch` برای مدیریت حالت‌ها (States)
این متد مانند یک سوئیچ عمل می‌کند و بسیار برای مدیریت وضعیت‌های UI (مثل Loading, Error, Success) عالی است:
```typescript
import { App } from "@/framework/core/observable";

const status = new App<string>("idle");

const message$ = App.conditionSwitch(status, {
    "idle": () => "در حال انتظار...",
    "loading": () => "در حال بارگذاری...",
    "success": () => "عملیات موفق!",
    "else": () => "خطای ناشناخته"
});

status.set("loading");
message$.subscribe(m => console.log(m)); // خروجی: در حال بارگذاری...
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Reactive Pipeline:** تمام متدهای نگاشت (`map`, `mapList` و غیره) از یک خط لوله واکنش‌گرا پیروی می‌کنند که تغییرات را به صورت زنجیره‌ای منتقل می‌کند.
* **Automatic Cleanup (Scope Integration):** با استفاده از پارامتر `scope` در تمامی متدها، سیستم اجازه می‌دهد تا اشتراک‌های (Subscriptions) ایجاد شده با نابود شدن یک کامپوننت، به طور خودکار پاکسازی شوند (`unsubscribing`).
* **Complexity Management:** استفاده از `_unwrapObservable` برای مدیریت هوشمند مقادیر که ممکن است خودشان `Observable` باشند یا مقدار خام.

---
*مستندات توسط Mindbase تولید شده است.*