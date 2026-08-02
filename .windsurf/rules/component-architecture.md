---
description: Component framework architecture and patterns
globs: ["**/ComponentBase.ts", "**/core/**/*.ts", "**/tools/**/*.ts"]
---

# Component Architecture Standards

## Component Structure
همه کامپوننت‌ها باید از `ComponentBase` ارث‌بری کنند و ساختار زیر را داشته باشند:

```typescript
class MyComponent extends ComponentBase<
    TProp,
    TSchema,
    TTemplate,
    TMethods
> {
    _COMPONENT_PATTERN = { ... }
    _COMPONENT_SCHEMA = { ... }
    _COMPONENT_METHODS = { ... }
    _COMPONENT_TEMPLATES = { ... }
}
```

## ComponentBase Core Parameters

ComponentBase چهار پارامتر اصلی دارد که همه کامپوننت‌ها باید آن‌ها را تعریف کنند:

### 1. _COMPONENT_PATTERN
**نوع:** `{ [K in ComponentPropKeys<TProp>]?: IComponentProp<TProp[K]> }`

**هدف:** تعریف propertyهای ورودی کامپوننت (props)

**ویژگی‌ها:**
- تعریف propها با نام، مقدار پیش‌فرض، و metadata
- پشتیبانی از multi-template با `hasMultiTemplate`
- امکان bind کردن مستقیم به Observable

**فیلدهای هر prop:**
- `prop`: نام property (string)
- `default`: مقدار پیش‌فرض
- `hasMultiTemplate`: آیا چند template دارد (boolean)
- `title`: عنوان نمایشی (Observable<string>)
- `description`: توضیحات (Observable<string>)

**مثال:**
```typescript
_COMPONENT_PATTERN = defineComponentPatterns({
    title: {
        prop: "title",
        default: "",
        hasMultiTemplate: true,
        title: new Observable("Title"),
        description: new Observable("Component title")
    },
    color: {
        prop: "color",
        default: COLORS.PRIMARY,
        title: new Observable("Color"),
        description: new Observable("Component color theme")
    }
});
```

---

### 2. _COMPONENT_SCHEMA
**نوع:** `{ [K in ComponentSchemaKeys<TSchema>]: IComponentSchema<TSchema[K], TProp[K]> }`

**هدف:** تعریف ساختار visual کامپوننت (parts)

**ویژگی‌ها:**
- هر schema یک "part" از UI را تعریف می‌کند
- مشخص می‌کند کدام props در هر part استفاده شوند
- امکان override کردن method render برای هر part

**فیلدهای هر schema:**
- `part`: نام part (string)
- `props`: آرایه‌ای از propها که این part استفاده می‌کند
- `method`: (optional) تابع render سفارشی
- `title`: عنوان نمایشی (Observable<string>)
- `description`: توضیحات (Observable<string>)

**Parts استاندارد:**
- `Component`: container اصلی کامپوننت
- `Structure`: ساختار داخلی (flex/grid)
- `Border`: بخش border
- `Custom Parts`: هر part سفارشی دیگر

**مثال:**
```typescript
_COMPONENT_SCHEMA = defineComponentSchema({
    Component: {
        part: GOG_ComponentBasicConfigs_Component_parts.Component.name,
        props: [
            this._COMPONENT_PATTERN[MyComponentConfigs.keys.prop_width.name],
            this._COMPONENT_PATTERN[MyComponentConfigs.keys.prop_height.name]
        ],
        title: new Observable("Main Component"),
        description: new Observable("Main component container")
    },
    Border: {
        part: MyComponentConfigs.schemas.Border.name,
        method: this.template_render_border.bind(this),
        props: [
            this._COMPONENT_PATTERN[MyComponentConfigs.keys.prop_borderColor.name]
        ]
    }
});
```

---

### 3. _COMPONENT_METHODS
**نوع:** `{ [K in ComponentMethodKeys<TMethods>]: ComponentMethodType<TProp> }`

**هدف:** تعریف callback methods که کاربر می‌تواند attach کند

**ویژگی‌ها:**
- تعریف event handlers قابل سفارشی‌سازی
- امکان pass کردن args به callback
- destination توسط کاربر در renderComponent تنظیم می‌شود

**فیلدهای هر method:**
- `args`: (optional) آرگومان‌هایی که به callback پاس داده می‌شوند
- `destination`: (optional) callback function که توسط کاربر set می‌شود
- `title`: عنوان نمایشی (Observable<string>)
- `description`: توضیحات (Observable<string>)

**signature callback:**
```typescript
(event: Event, dataArgs: TDataArgs | null, componentArgs: TComponentArgs | null) => void
```

**مثال:**
```typescript
_COMPONENT_METHODS = defineComponentMethods({
    onClick: {
        args: {
            itemId: this._COMPONENT_PATTERN.itemId,
            itemData: this._COMPONENT_PATTERN.itemData
        },
        title: new Observable("Click Handler"),
        description: new Observable("Handles item click")
    },
    onDelete: {
        args: { id: this._COMPONENT_PATTERN.id },
        title: new Observable("Delete Handler")
    }
});
```

**استفاده:**
```typescript
component.renderComponent(config, {
    onClick: (event, dataArgs, componentArgs) => {
        console.log("Clicked:", componentArgs.itemId);
    }
});
```

---

### 4. _COMPONENT_TEMPLATES
**نوع:** `{ [K in ComponentTemplateKeys<TTemplate>]?: ComponentTemplateType<TProp> }`

**هدف:** تعریف templateهای مختلف برای نمایش محتوا

**ویژگی‌ها:**
- امکان تعریف چندین template با reference به یک prop
- هر template می‌تواند HTML و attrs سفارشی داشته باشد
- پشتیبانی از value ثابت برای template

**فیلدهای هر template:**
- `reference`: reference به prop (IComponentProp)
- `html`: (optional) HTML content
- `attrs`: (optional) attributes اضافی
- `value`: (optional) مقدار ثابت برای این template
- `title`: عنوان نمایشی (Observable<string>)
- `description`: توضیحات (Observable<string>)

**مثال:**
```typescript
_COMPONENT_TEMPLATES = defineComponentTemplate({
    Primary: {
        reference: this._COMPONENT_PATTERN.buttonStyle,
        value: BUTTON_STYLES.PRIMARY,
        title: new Observable("Primary Style")
    },
    Secondary: {
        reference: this._COMPONENT_PATTERN.buttonStyle,
        value: BUTTON_STYLES.SECONDARY,
        title: new Observable("Secondary Style")
    }
});
```

---

## Component Patterns (Props)
تعریف propها با استفاده از `defineComponentPatterns`:

```typescript
_COMPONENT_PATTERN = defineComponentPatterns({
    title: {
        prop: "title",
        default: "",
        hasMultiTemplate: true,
        title: new Observable("Title"),
        description: new Observable("Component title")
    }
});
```

## Component Schema
تعریف schema با استفاده از `defineComponentSchema`:

```typescript
_COMPONENT_SCHEMA = defineComponentSchema({
    Component: {
        part: GOG_ComponentBasicConfigs_Component_parts.Component.name,
        props: [...],
        title: new Observable("Main Component"),
        description: new Observable("Main component container")
    }
});
```

## Component Methods
تعریف methodها با استفاده از `defineComponentMethods`:

```typescript
_COMPONENT_METHODS = defineComponentMethods({
    onClick: {
        args: { buttonId: this._COMPONENT_PATTERN.buttonId },
        title: new Observable("Click Handler"),
        description: new Observable("Handles button click")
    }
});
```

## Observable Pattern
- استفاده از `Observable` برای state management
- استفاده از `Scope` برای lifecycle management
- dispose کردن scopes در زمان مناسب
- **قانون: به هیچ عنوان از `observable.get()` به صورت مستقیم استفاده نشود.** به جای آن از متدهای کمکی `Observable.ts` مانند `Observable.computed`، `Observable.map`، `Observable.for`، `Observable.conditionWhen` و `Observable.conditionSwitch` استفاده شود تا خاصیت Observable بودن حفظ شود.

```typescript
private _renderScope = new Scope();

private createComponentElement() {
    this._renderScope.dispose();
    this._renderScope = new Scope();
    // ...
}
```

## ReactiveElement
- استفاده از `ReactiveElement` برای DOM manipulation
- استفاده از `getElement()` و `getReactiveElement()` برای دسترسی به element
- **قانون: هر متد schema فقط می‌تواند از یک `ReactiveElement` یا component استفاده کند.** این قانون برای قابل توسعه و نگهداری بودن کد ضروری است. اگر به بیش از یک element نیاز است، باید به متدهای جداگانه شکسته شود.

## Naming Conventions
- `_COMPONENT_` prefix برای internal properties
- `_` prefix برای private methods و properties
- `GOG_` prefix برای framework types و utilities

## Constructor Pattern
```typescript
constructor(componentName: string, elId: string | null) {
    super();
    this._COMPONENT_NAME = componentName;
    this._COMPONENT_ID = elId;
    this._COMPONENT_RANDOM_ID = Math.floor(Math.random() * 10000);
}
```
