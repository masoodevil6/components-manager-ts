# ماژول کامپوننت‌ها (Components Module)

این ماژول، زیربنای ساختاری تمامی اجزای رابط کاربری (UI) در سیستم است. وظیفه آن فراهم کردن یک کلاس پایه (`ComponentBase`) است که با استفاده از رویکرد **Declarative**، مدیریت پیچیدگی‌های مربوط به ویژگی‌ها (Props)، اسکیماهای رندرینگ (Schemas)، قالب‌ها (Templates) و متدها را به صورت خودکار و واکنش‌گرا انجام می‌دهد.

## 🚀 دسترسی عمومی (Public API)
بر اساس فایل `public.ts` در این ماژول، شما از طریق نام مستعار **`App`** به کلاس اصلی دسترسی دارید:

### `App` (در اصل `ClComponentBase`)
کلاس پایه برای تمامی کامپوننت‌های سیستم.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `constructor(name, elId)` | ایجاد یک نمونه از کامپوننت با نام و شناسه مشخص. |
| `renderComponent(config, methods, events)` | آماده‌سازی کامل (Initialization) شامل Bind کردن پروپ‌ها، متدها و رویدادها. همچنین `emit` را به‌صورت خودکار در `CoreEvent.App.registerEmit` ثبت می‌کند (با `emit.bind(this)` که `this` به Component instance اشاره می‌کند). |
| `set(propName, value)` | تغییر مقدار یک ویژگی (Prop) به صورت واکنش‌گرا. |
| `get(propName)` | بازگرداندن مقدار فعلی یک ویژگی. |
| `getObservable(propName)` | دریافت مستقیم شیء `Observable` مربوط به یک ویژگی برای استفاده در لایه‌های بالاتر. |
| `executeSchemaPart(partName, extra)` | اجرای دستی رندرینگ برای یک بخش (Part) خاص از اسکیما. |
| `getElement()` | بازگرداندن المان DOM اصلیِ ساخته شده توسط کامپوننت. |
| `getReactiveElement()` | بازگرداندن نسخه واکنش‌گرا (Reactive) از محتوای کامپوننت. |

---

## 💡 الگوی پیاده‌سازی (Implementation Pattern)

برای ساخت یک کامپوننت استاندارد، شما باید چهار رکن اصلی را تعریف کنید:

1. **Props (ویژگی‌ها):** تایپ‌های داده‌ای که کامپوننت با آن‌ها کار می‌کند.
2. **Pattern (الگوی پروپ‌ها):** تعریف مقادیر پیش‌فرض و عناوین هر ویژگی برای مدیریت بهتر در سیستم.
3. **Schema (ساختار رندرینگ):** نقشه راهی که مشخص می‌کند کدام بخش‌های DOM (Parts) قرار است رندر شوند.
4. **Templates & Methods:** قالب‌ها و توابع منطقی مرتبط با کامپوننت.

### مثال عملی: ساخت یک کامپوننت متن واکنش‌گرا

```typescript
import { App } from "@/framework/ui/module_components";

// ۱. تعریف ویژگی‌ها
type MyProps = { label: string; color: string };

// ۲. تعریف الگوی پروپ‌ها (Pattern)
const MyPattern = {
    [App.Tools.Prop.Type<MyProps>.label]: {
        prop: "label",
        default: "Hello"
    },
    [App.Tools.Prop.Type<MyProps>.color]: {
        prop: "color",
        default: "#000"
    }
};

// ۳. تعریف اسکیما (Schema)
const MySchema = {
    [App.Tools.Schema.Type<any>.part_container]: {
        part: "container",
        props: [{ prop: "color" }]
    }
};

// ۴. پیاده‌سازی کلاس
export class MyComponent extends App<MyProps, any, any, any> {
    constructor(config: MyProps) {
        super("my-component");
        super.renderComponent(config, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: any, data: any) {
        if (partName === "container") {
            return this.template_render_container(attrsDefault, data);
        }
        return Core.Reactive.ReactiveElement.part("span", { attrs: attrsDefault });
    }

    private template_render_container(attrs: any, data: any) {
        return Core.Reactive.ReactiveElement.part("div", {
            attrs,
            styles: { color: data.color }
        });
    }
}
```

---

## 🛠 ساختار داخلی (Internal Architecture)

* **Declarative Lifecycle:** با استفاده از متد `renderComponent` در مرحله ساخت، سیستم به‌طور خودکار تمامی پروپ‌ها را به `Observable` تبدیل کرده و آن‌ها را به چرخه حیات کامپوننت متصل می‌کند.
* **Schema-Driven DOM:** برخلاف روش‌های سنتی، رندرینگ بر اساس یک نقشه (Schema) انجام می‌شود که اجازه می‌دهد هر بخش از کامپوننت (`Part`) به‌صورت مستقل مدیریت شود.
* **Reactive Prop Binding:** از طریق `_COMPONENT_PROPS_BIND` ، تمامی تغییرات در مقادیر پروپ‌ها مستقیماً و بدون نیاز به رندر مجدد کل کامپوننت، باعث آپدیت شدن المان‌های مربوطه در DOM می‌شود.
* **Automatic Cleanup:** با استفاده از `_renderScope` (یک نسخه از Scope)، تمام اشتراک‌های (Subscriptions) ایجاد شده توسط پروپ‌ها یا متدها، هنگام حذف شدن کامپوننت به‌درستی پاکسازی می‌شوند تا از نشتی حافظه جلوگیری شود.

---

## 🔧 Methods API (Plan 8.1.4)

فایل `Methods.ts` مسئول آماده‌سازی و اتصال متدهای کامپوننت است. ساختار کلیدی:

| تایپ/ویژگی | توضیحات |
| :--- | :--- |
| `args` | آرگومان‌های ورودی متدهای کامپوننت (semantic-level). |
| `dataArgs` | آرگومان‌های داده‌ای مرتبط با متدها. |
| `MethodsComponentArgs` | تایپ آرگومان‌های کامپوننت برای متدها. |
| `MethodsDataArgs` | تایپ آرگومان‌های داده برای متدها. |
| `MethodsConfigType<TThis>` | تایپ پیکربندی متدها با پشتیبانی از `TThis` برای type-safe `this`. |
| `Callback_ComponentMethod` | کال‌بک متد کامپوننت با امضای `this: TThis` (default `any`). |

**تفکیک Semantic Key vs Runtime Name:**
- **Semantic keys** (مانند `CLICK`, `HOVER`) متعلق به **Public API** هستند — مصرف‌کننده با این کلیدها متد تعریف می‌کند.
- **Runtime name** (مانند `fn_onClickIcon`) متعلق به **implementation** است — در داخل کامپوننت برای اتصال به DOM استفاده می‌شود.
- `#getReadyComponentMethods` با **lookup مستقیم** semantic key متد متناظر را پیدا می‌کند (double loop حذف شده است).

---

## 🏗️ ComponentStructureTrait (Plan 8.1.4)

الگوی ارث‌بری و ساختار پایه کامپوننت‌ها:

- کامپوننت‌ها از **`CoreComponents.App`** (`ClComponentBase`) ارث‌بری می‌کنند، نه از `ComponentStructure`.
- `ComponentStructureTrait` در پوشه **`traits/`** قرار دارد.
- **۷ prop پایه** از `ComponentStructureTrait.props` در `_COMPONENT_PATTERN` به‌صورت spread قرار می‌گیرند (`...ComponentStructureTrait.props`).
- متد **`renderContent`** (متد Trait) مسئول ساخت `ComponentStructure` به‌عنوان فرزند است.

---

## 📡 Emit Auto-Bind (Plan 8.1.4)

هنگام فراخوانی `renderComponent`، `emit` به‌صورت خودکار در `CoreEvent.App.registerEmit` ثبت می‌شود:

- **`emit.bind(this)`** → `this` در emit به **Component instance** اشاره می‌کند (نه HTMLElement).
- اگر مصرف‌کننده قبلاً `.bind(parentInstance)` کرده باشد، bind دوم **تاثیری ندارد** (bind اول اولویت دارد).
- **arrow function** با `.call()` کار نمی‌کند — برای emit باید از `function` استفاده شود.
- emit **فقط با `request`** صدا زده می‌شود — خودبه‌خود با کلیک یا رویداد DOM صدا زده نمی‌شود.

---
*مستندات توسط Mindbase تولید شده است.*
*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۱ — Plan 8.1.4*