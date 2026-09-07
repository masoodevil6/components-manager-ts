# ماژول Components (پایه و ابزارهای کامپوننت)

این ماژول شامل زیرساخت‌های لازم برای تعریف، ساخت و مدیریت چرخه حیات کامپوننت‌ها در سطح هسته است. این بخش به عنوان یک لایه واسط بین منطق خالص (`core`) و نمایش (`ui`) عمل می‌کند.

## 🚀 دسترسی عمومی (Public API)
این بخش شامل مقادیر اکسپوز شده در `public.ts` مربوط به ماژول `components` است:

### `ComponentBase` / `BaseClass`
کلاس پایه ای که تمام کامپوننت‌های اصلی از آن ارث‌بری می‌کنند که مدیریت خودکار ویژگی‌ها، استایل‌ها و چرخه حیات را انجام می‌دهد.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `renderComponent(config, methods, events)` | فرآیند اصلی رندرینگ بر اساس Schema و Props. همچنین `emit` را به‌صورت خودکار در `CoreEvent.App.registerEmit` ثبت می‌کند (با `emit.bind(this)` که `this` به Component instance اشاره می‌کند). |
| `renderManagerComponent()` | مدیریت بخش‌های مختلف (Parts) یک کامپوننت پیچیده. |
| `bindProps(props)` | پیوند دادن خودکار ویژگی‌ها به المان DOM. |
| `lifecycle Hooks` | متدهایی مانند `onMount`, `onUnmount` برای مدیریت چرخه حیات. |

### `Methods` (مدیریت متدهای کامپوننت)

فایل `Methods.ts` مسئول آماده‌سازی و اتصال متدهای کامپوننت است. ساختار کلیدی آن:

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

### `ComponentStructureTrait` (ساختار پایه کامپوننت)

الگوی ارث‌بری و ساختار پایه کامپوننت‌ها:

- کامپوننت‌ها از **`CoreComponents.App`** (`ClComponentBase`) ارث‌بری می‌کنند، نه از `ComponentStructure`.
- `ComponentStructureTrait` در پوشه **`traits/`** قرار دارد.
- **۷ prop پایه** از `ComponentStructureTrait.props` در `_COMPONENT_PATTERN` به‌صورت spread قرار می‌گیرند (`...ComponentStructureTrait.props`).
- متد **`renderContent`** (متد Trait) مسئول ساخت `ComponentStructure` به‌عنوان فرزند است.
- **(Plan 8.2.10)** `renderContent` نام کامپوننت را از `component._COMPONENT_NAME` می‌خواند و به `ComponentStructure.create(componentName, ...)` پاس می‌دهد — خروجی `<component-{name}>` با نام درست.
- **(Plan 8.2.10)** `ComponentStructure.create(componentName, config, methods?, identity?)` — `componentName` به‌عنوان پارامتر اول (identity) اجباری است.

### `emit` (auto-bind در `renderComponent`)

هنگام فراخوانی `renderComponent`، `emit` به‌صورت خودکار در `CoreEvent.App.registerEmit` ثبت می‌شود:

- `emit.bind(this)` → `this` در emit به **Component instance** اشاره می‌کند.
- اگر مصرف‌کننده قبلاً `.bind(parentInstance)` کرده باشد، bind دوم **تاثیری ندارد** (bind اول اولویت دارد).
- **arrow function** با `.call()` کار نمی‌کند — باید از `function` استفاده شود.
- emit **فقط با `request`** صدا زده می‌شود (خودبه‌خود با کلیک صدا زده نمی‌شود).

### `Define_ComponentProp` (Plan 9.1.3 — Enum Type Narrowing)

Helper function برای تعریف prop entryها با حفظ نوع Generic `<T>` در return type.

| متد/ویژگی | توضیحات |
| :--- | :--- |
| `Define_ComponentProp<T>(entry)` | Identity function — ورودی `ComponentPropEntry<T>` را بدون تغییر برمی‌گرداند، اما نوع `T` در return type حفظ می‌شود (نه literal). |
| Overload 1 (Whole-object) | `Define_ComponentProp<TPropTypes>({ ...patterns } as any)` — برای استفاده در Base با `as any`. |
| Overload 2 (Per-entry) | `Define_ComponentProp<T>(entry: ComponentPropEntry<T>): ComponentPropEntry<T>` — برای استفاده در Props.ts. |

**Export:** `CoreComponents.DefineProp` (alias برای `Define_ComponentProp`)

**مشکل حل‌شده:** الگوی قدیمی `satisfies TComponentPropEntry<T>` باعث literal narrowing می‌شد (مثلاً `ButtonSemantic.SUBMIT` به‌جای `ButtonSemantic`). `Define_ComponentProp<T>` این مشکل را با حفظ نوع `T` در return type حل می‌کند.

### `TypeHelpers` (Plan 9.1.3 — Type Extraction)

فایل `TypeHelpers.ts` در `module_ui/module_components/tools/type/` helperهای استخراج نوع فراهم می‌کند:

| Helper | توضیحات |
| :--- | :--- |
| `ExtractPropsType<TProps>` | استخراج نوع `default` از هر prop entry — `TProps[K]["default"]`. |
| `ExtractPropsConfigType<TProps>` | استخراج نوع config قابل‌قبول constructor (Partial). |
| `ExtractMethodsType<TMethods>` | استخراج نوع methodهای داخلی Component. |
| `ExtractMethodsComponentArgs<TMethods>` | استخراج نوع componentArgs از `args` (prop referenceها). |
| `ExtractMethodsDataArgs<TMethods>` | استخراج نوع dataArgs از `dataArgs`. |
| `ExtractMethodsConfigType<TMethods, TThis>` | استخراج نوع config methods برای مصرف‌کننده با `this: TThis`. |

**نکته:** این helperها با خروجی `Define_ComponentProp<T>` به‌درستی کار می‌کنند — نوع `T` (نه literal) استخراج می‌شود.

## 🛠 ساختار داخلی (Internal Architecture)

* **Abstraction Layer:** جداسازی کامل بین "منطق یک کامپوننت" و "نحوه رندر شدن آن".
* **Tooling Integration:** استفاده از ابزارهای کمکی برای تولید خودکار `Schema`ها و `Pattern`های مربوط به هر نوع کامپوننت.
* **Hierarchy Management:** مدیریت صحیح سلسله‌مراتب اجزا (Parent-Child) تا تغییر در یک بخش، اثرات ناخواسته بر سایر بخش‌ها نداشته باشد.

---
*مستندات توسط Mindbase تولید شده است.*
*آخرین به‌روزرسانی: ۲۰۲۶-۰۹-۰۵ — Plan 9.1.3 (Define_ComponentProp + TypeHelpers)*