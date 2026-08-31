# ماژول کامپوننت‌ها (Components Module)

این ماژول، زیربنای ساختاری تمامی اجزای رابط کاربری (UI) در سیستم است و بر پایه معماری **Declarative** طراحی شده است: هر کامپوننت ابتدا به‌صورت Metadata (بدون اجرای Runtime) تعریف می‌شود، در `ComponentManager` ثبت می‌گردد و سپس Base Runtime مشترک (`ComponentStructure`) وظیفه اجرای آن را بر عهده دارد.

> ⚠️ **نکته مهاجرت:** معماری قدیمی (`ClComponentBase` + فایل `public.ts` با الگوی `App.Tools.Prop`) کاملاً حذف شده است. الگوی جدید بر پایه `ComponentStructure`، فایل‌های تعریفی (`Props`/`Schemas`/`Methods`/`Definition`) و `ComponentManager` است.

---

## 📁 ساختار پوشه‌ها

```bash
src/framework/module_ui/module_components/
├── basic/
│   ├── types/                          # تایپ‌های بنیادین ماژول
│   │   ├── TComponentDefinition.ts     # شناسنامه کامپوننت (id/name/version/category)
│   │   ├── TComponentIdentity.ts       # Runtime Identity (unique/emit/events)
│   │   ├── TComponentPropEntry.ts      # ساختار هر prop entry
│   │   ├── TComponentProps.ts          # Record کلیدهای props
│   │   ├── TComponentSchemaEntry.ts    # ساختار هر schema (part) entry
│   │   ├── TComponentSchemas.ts        # Record کلیدهای schemas
│   │   └── TComponentExampleDefinition.ts  # re-export از Core
│   └── manager/
│       └── ComponentManager.ts         # Registry مرکزی کامپوننت‌ها
└── lists/
    └── componentStructure/             # Base Runtime مشترک
        ├── ComponentStructure.ts       # کلاس پایه Runtime
        ├── Definition.ts               # شناسنامه component_structure
        ├── Props.ts                    # ۷ prop پایه + PropsType
        ├── Schemas.ts                  # ۲ schema پایه + SchemasType
        ├── Methods.ts                  # methods پایه (خالی) + MethodsType
        └── examples/
            ├── Default.ts              # Example پیش‌فرض
            └── index.ts                # Examples Registry
```

---

## 🚀 دسترسی عمومی (Public API)

### ۱) `ComponentStructure` (با نام export شده `Component`)

کلاس پایه Runtime برای **تمامی** کامپوننت‌های UI. از `CoreComponents.App` ارث‌بری می‌کند و دو لایه رندر پایه را پیاده‌سازی می‌کند.

```typescript
class ComponentStructure<
    TProp     extends Record<string, any>    = PropsType,
    TSchemas                                 = SchemasType,
    TMethods  extends Record<string, any>    = MethodsType,
    TIdentity extends ComponentIdentity      = ComponentIdentity
> extends CoreComponents.App<TProp, TSchemas, any, TMethods>
```

| عضو | نوع | توضیحات |
| :--- | :--- | :--- |
| `constructor(componentName, elId?, identity?, step?)` | — | ساخت Instance؛ `identity` (بیرونی: unique/emit/events) و `step` (داخلی: Step Node درخت Workflow فرزندان) |
| `renderComponent(config, methods, events?, unique?, emit?)` | override | در صورت نبود پارامترها، از `_COMPONENT_*` ذخیره‌شده در constructor استفاده می‌کند |
| `renderContentComponent()` | protected | **نقطه اتصال فرزندان** — فرزند این متد را override می‌کند و محتوای اختصاصی خود را رندر می‌کند |
| `renderManagerComponent(partName, ...)` | override | Routing بین `part-component` و `part-component-structure` |

### ۲) `ComponentManager`

Registry مرکزی برای ثبت، کشف و مدیریت کامپوننت‌ها **بدون instantiate کردن**. خودش رندر نمی‌کند (رندر با `ExampleRenderer` در Core انجام می‌شود).

| متد | ورودی | خروجی | شرح |
| :--- | :--- | :--- | :--- |
| `register(entry)` | `ComponentRegistryEntry` | `void` | ثبت کامپوننت (در صورت تکرار، overwrite با warning) |
| `get(id)` | `string` | `RegistryEntry \| undefined` | دریافت Entry با شناسه (مثلاً `"component_button"`) |
| `has(id)` | `string` | `boolean` | بررسی وجود در Registry |
| `list()` | — | `RegistryEntry[]` | لیست تمام کامپوننت‌های ثبت‌شده |
| `getExamples(id)` | `string` | `ComponentExampleDefinition[]` | تمام Exampleهای یک کامپوننت |
| `getExample(id, exampleId)` | `string, string` | `ComponentExampleDefinition \| undefined` | یک Example خاص |
| `clear()` | — | `void` | پاک‌سازی Registry (مناسب تست) |
| `size` | — | `number` | تعداد کامپوننت‌های ثبت‌شده |

### ۳) تایپ‌های بنیادین (`Basic.Types`)

| تایپ | شرح |
| :--- | :--- |
| `ComponentDefinition` | شناسنامه: `id`, `name`, `version`, `category?` (اتصال به `UICategories`) |
| `ComponentIdentity` | Runtime Identity: `unique` (`CoreEvent.TStepRef`), `emit` (`CoreEvent.TEmitHandler`), `events` |
| `ComponentPropEntry<T>` | ساختار یک prop: `prop`, `default`, `name?`, `description?` (کلید ترجمه) |
| `ComponentSchemaEntry` | ساختار یک part: `part`, `props?`, `name?`, `description?` |
| `ComponentExampleDefinition` | تعریف Example (re-export از `CoreComponents`) |

---

## 💡 الگوی پیاده‌سازی (Implementation Pattern)

هر کامپوننت ۵ رکن **Declarative** دارد که همگی بدون اجرای Runtime قابل خواندن هستند:

### ساختار فایل‌های یک کامپوننت فرزند (مثال: Button)

```bash
lists/
└── componentButton/
    ├── ComponentButton.ts    # کلاس Runtime (extends ComponentStructure)
    ├── Definition.ts         # شناسنامه
    ├── Props.ts              # props پایه + اختصاصی
    ├── Schemas.ts            # schemas اختصاصی
    ├── Methods.ts            # methods اختصاصی
    └── examples/             # Exampleهای کامپوننت
```

### گام ۱ — Definition (شناسنامه)

```typescript
import * as UiComponent from "@/ui_components";

export const Definition: UiComponent.Basic.Types.ComponentDefinition = {
    id:      "component_button",
    name:    "componentButton",
    version: "v1.0.0",
};
```

### گام ۲ — Props (ارث‌بری از ۷ prop پایه + اختصاصی)

```typescript
import {Props as StructureProps} from "@/ui_components/lists/componentStructure/Props";

export const Props = {
    ...StructureProps,                          // ۷ prop پایه
    label: {                                    // prop اختصاصی
        prop:         "label",
        default:      "Button",
        name:         Keys.category.components.button.props.label.name,
        description:  Keys.category.components.button.props.label.description,
    },
} satisfies UiComponents.Basic.Types.ComponentProps;

// استخراج خودکار type از کلیدها:
export type PropsType = {
    [K in keyof typeof Props]: typeof Props[K]["default"]
};
```

### گام ۳ — Schemas (فقط «چه چیزی» — نه «چگونه»)

```typescript
import {Schemas as StructureSchemas} from "@/ui_components/lists/componentStructure/Schemas";

export const Schemas = {
    ...StructureSchemas,                        // COMPONENT + STRUCTURE
    CONTENT: {                                  // part اختصاصی
        part:  "part-button-content",
        props: [Props.label],
        name:  Keys.category.components.button.schemas.content.name,
    },
} satisfies UiComponents.Basic.Types.ComponentSchemas;

export type SchemasType = {
    [K in keyof typeof Schemas]: typeof Schemas[K]["part"]
};
```

### گام ۴ — کلاس Runtime

```typescript
export class ComponentButtonBase extends ComponentStructure<PropsType, SchemasType, MethodsType> {

    protected _COMPONENT_DEFINITION = Definition;
    protected _COMPONENT_PATTERN    = CoreComponents.DefineProp({ ...Props } as any);
    protected _COMPONENT_SCHEMA     = CoreComponents.DefineSchema({ ...Schemas } as any);
    protected _COMPONENT_METHODS    = CoreComponents.DefineMethod({ ...Methods } as any);

    // Routing مسیر جزئی اختصاصی:
    override renderManagerComponent(partName, attrsDefault, data, extra) {
        if (partName === Schemas.CONTENT.part) {
            return this.renderContentComponent();
        }
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }

    // نقطه اتصال اصلی — محتوای کامپوننت:
    protected override renderContentComponent(): CoreReactive.App {
        return CoreReactive.App.part("button", { /* ... */ });
    }
}
```

### گام ۵ — ثبت در ComponentManager

```typescript
ComponentManager.register({
    definition:  Definition,
    props:       Props,
    schemas:     Schemas,
    methods:     Methods,
    examples:    Examples,
    constructor: ComponentButton,
});
```

---

## 🔗 اتصال به CoreEvent (Identity)

`ComponentIdentity` کامپوننت را به سیستم Workflow (`module_event`) متصل می‌کند:

| فیلد | جهت | شرح |
| :--- | :--- | :--- |
| `unique` | بیرونی ← والد | هویت یکتای Instance در درخت Workflow والد (`CoreEvent.TStepRef`) |
| `emit` | بیرونی ← والد | Request Handler متصل به المان (`CoreEvent.TEmitHandler`) |
| `events` | بیرونی ← والد | Event handlerهای DOM متصل به کامپوننت |
| `_COMPONENT_STEP` | داخلی ← فرزندان | Step Node درخت Workflow ای که این کامپوننت به فرزندانش پاس می‌دهد |

```typescript
const button = new ComponentButton(
    config,
    methods,
    {
        unique: step.info.content,     // اتصال به Step والد
        emit:   handler,               // دریافت Requestها
        events: { click: onClick },
    },
    ButtonStep,                        // Step داخلی برای فرزندان
);
```

---

## 🎨 جریان رندر (Rendering Flow)

رندر دو لایه پایه + لایه‌های اختصاصی فرزند دارد:

```
executeSchemaPart("part-component")
    → renderManagerComponent (override)
    → partName === "part-component" → renderComponentSchema()
        → <component-{name}> با RTL + classList + styles
        → children: executeSchemaPart("part-component-structure")
            → partName === "part-component-structure" → renderStructureSchema()
                → <section> با show/hide + structureClass + structureStyles
                → children: renderContentComponent()
                    → فرزند override می‌کند (مثلاً renderForm در Button)
```

**اصل معماری (پلن ۵.۸):** Schema فقط تعریف می‌کند Part *چیست* — نه *چگونه* رندر شود. رندر در خود `ComponentStructure` (و فرزندان) انجام می‌شود؛ `SchemaHandler` جداگانه وجود ندارد تا به `renderManagerComponent` قدیمی تبدیل نشود.

---

## 🧪 سیستم Example

هر کامپوننت Exampleهای تعریفی دارد که بدون Runtime قابل خواندن‌اند و توسط `ExampleRenderer` (در Core) رندر می‌شوند:

```typescript
export const DefaultExample: ComponentExampleDefinition = {
    id:          "component_button_example_default",
    name:        "Default Button",
    description: "Default button example",
    config:      { label: "Save", prop_show: true },
    methods:     {},
};

export const Examples = { DEFAULT: DefaultExample };
```

- **دسترسی:** `ComponentManager.getExamples("component_button")`
- **رندر:** `ExampleRenderer.render(ComponentButton, Examples.DEFAULT)`

---

## 🛠 نکات معماری (Internal Notes)

* **جداسازی Metadata از Runtime:** فایل‌های `Definition/Props/Schemas/Methods/Examples` خالص تعریفی هستند و حتی بدون ساخت Instance کامپوننت، توسط `ComponentManager` قابل خواندن‌اند (پایه مستندات خودکار و Page Builder).
* **Type Inference خودکار:** `PropsType`/`SchemasType`/`MethodsType` با mapped type از کلیدهای تعریفی استخراج می‌شوند — فرزند typeهای اختصاصی را تکرار نمی‌کند.
* **i18n داخلی:** همه `name`/`description`ها کلید ترجمه از `module_categories/languages` (Keys) هستند.
* **چرخه حیات Reactive:** وراثت از `CoreComponents.App` تمام مزایای قبلی (Prop Binding به Observable، `_renderScope` و پاک‌سازی خودکار اشتراک‌ها) را حفظ می‌کند.
* **⚠️ فایل `lists/index copy.ts`** یک فایل باقی‌مانده (backup قدیمی) است و به‌زودی حذف خواهد شد — از import آن پرهیز کنید.

---
*مستندات توسط Mindbase تولید شده است — آخرین به‌روزرسانی: همگام با معماری Declarative Component System (پلن ۵.۸)*