# ComponentBase - راهنمای جامع

## مقدمه

`ComponentBase` کلاس پایه برای تمام کامپوننت‌ها در این معماری است. این کلاس سیستم Schema-based rendering، مدیریت Props، Methods و Templates را پیاده‌سازی می‌کند.

همچنین شامل Type utilities و interfaceهای تعریف کامپوننت است.

---

## Type Utilities

### GOG_TypeOf

```typescript
export type GOG_TypeOf<T> = T;
```

Type helper برای استخراج type.

---

### GOG_ValueOf

```typescript
export type GOG_ValueOf<T> = T[keyof T]
```

استخراج type مقادیر یک object.

---

### GOG_SetValue

```typescript
export function GOG_SetValue<T>(value: T): GOG_TypeOf<T>
```

Helper function برای تعریف مقدار با type inference.

**مثال:**
```typescript
const value = GOG_SetValue<string[]([]);
```

---

### GOG_ExtractNameValue

```typescript
export type GOG_ExtractNameValue<T extends Record<PropertyKey, { readonly name: PropertyKey; readonly value: any }>> = {
    [k in keyof T as T[k]["name"]]: T[k]["value"] extends GOG_TypeOf<infer U> ? U : never
}
```

استخراج type از object با property `name` و `value`.

**مثال:**
```typescript
const configs = {
    prop1: { name: "prop1", value: "string" },
    prop2: { name: "prop2", value: 123 }
}
type PropsType = GOG_ExtractNameValue<typeof configs>;
// { prop1: string, prop2: number }
```

---

### GOG_ExtractName

```typescript
export type GOG_ExtractName<T extends Record<PropertyKey, { readonly name: PropertyKey }>> = {
    [k in keyof T] : T[k]["name"]
}
```

استخراج نام‌ها از object با property `name`.

---

### ComponentConfigBasicType

```typescript
export type ComponentConfigBasicType = {
    selector?: string | null;
    append?: boolean;
    classList?: string[];
    styles?: Record<string, string>;
}
```

Type پایه برای تنظیمات کامپوننت.

---

## Component Pattern

### IComponentProp

```typescript
export interface IComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:             null;
    hasMultiTemplate?: boolean;
    title?:            Observable<string>;
    description?:      Observable<string>;
}
```

Interface برای تعریف یک prop در Pattern.

**ویژگی‌ها:**
- `prop`: نام prop
- `default`: مقدار پیش‌فرض
- `value`: مقدار فعلی (اختیاری)
- `hasMultiTemplate`: آیا از چند قالب استفاده می‌کند؟
- `title`: عنوان برای مستندات
- `description`: توضیحات برای مستندات

---

### defineComponentPatterns

```typescript
export function defineComponentPatterns<TPropTypes>(patterns: { [K in ComponentPropKeys<TPropTypes>]: IComponentProp<TPropTypes[K]> }): { [K in ComponentPropKeys<TPropTypes>]: IComponentProp<TPropTypes[K]> }
```

تابع helper برای تعریف Pattern کامپوننت.

**مثال:**
```typescript
const pattern = defineComponentPatterns<PropsType>({
    prop_title: {
        prop: "prop_title",
        default: "Default Title",
        title: Language.translate("component.title")
    }
});
```

---

## Component Schema

### IComponentSchema

```typescript
export interface IComponentSchema<TSchema, TPropTypes> {
    part:              TSchema;
    method?:           (attrsDefault: ComponentAttrsDefault, data: Record<string, Observable<any>>, extra: Record<string, any>) => ReactiveElement;
    props?:            IComponentProp<TPropTypes[keyof TPropTypes]>[];
    title?:            Observable<string>;
    description?:      Observable<string>;
}
```

Interface برای تعریف یک بخش (part) از کامپوننت.

**ویژگی‌ها:**
- `part`: نام بخش
- `method`: متد رندر (اختیاری)
- `props`: props مرتبط با این بخش
- `title`: عنوان برای مستندات
- `description`: توضیحات برای مستندات

---

### defineComponentSchema

```typescript
export function defineComponentSchema<TSchema, TPropTypes>(props: { [K in ComponentSchemaKeys<TSchema>]: IComponentSchema<TSchema[K], TPropTypes> }): { [K in ComponentSchemaKeys<TSchema>]: IComponentSchema<TSchema[K], TPropTypes> }
```

تابع helper برای تعریف Schema کامپوننت.

**مثال:**
```typescript
const schema = defineComponentSchema<SchemaType, PropsType>({
    Main: {
        part: "part-main",
        props: [pattern.prop_title]
    }
});
```

---

## Component Methods

### ComponentMethodType

```typescript
export interface ComponentMethodType<TPropTypes> {
    args?:             Record<string, IComponentProp<TPropTypes[keyof TPropTypes]>>;
    title?:            Observable<string>;
    description?:      Observable<string>;
    destination?:      ComponentCallBackType<any, any>;
}
```

Interface برای تعریف یک method کامپوننت.

**ویژگی‌ها:**
- `args`: آرگومان‌های method
- `title`: عنوان برای مستندات
- `description`: توضیحات برای مستندات
- `destination`: تابع callback

---

### ComponentCallBackType

```typescript
export type ComponentCallBackType<TComponentArgs, TDataArgs> = (
    event:            Event,
    dataArgs:         TDataArgs | null,
    componentArgs:    TComponentArgs | null,
) => void;
```

Type برای callback function.

---

### defineComponentMethods

```typescript
export function defineComponentMethods<TMethod, TPropTypes>(methods: { [K in ComponentMethodKeys<TMethod>]: ComponentMethodType<TPropTypes> }): { [K in ComponentMethodKeys<TMethod>]: ComponentMethodType<TPropTypes> }
```

تابع helper برای تعریف Methods کامپوننت.

**مثال:**
```typescript
const methods = defineComponentMethods<MethodsType, PropsType>({
    CLICK: {
        args: {
            VALUE: pattern.prop_value
        },
        destination: (event, dataArgs, componentArgs) => {
            console.log("Clicked", componentArgs.VALUE);
        }
    }
});
```

---

## Component Template

### ComponentTemplateType

```typescript
export type ComponentTemplateType<TPropTypes> = {
    reference:         IComponentProp<TPropTypes[keyof TPropTypes]>;
    html?:             string;
    attrs?:            Record<string, string>;
    value?:            any;
    title?:            Observable<string>;
    description?:      Observable<string>;
}
```

Type برای تعریف یک template.

**ویژگی‌ها:**
- `reference`: prop مرجع
- `html`: HTML template
- `attrs`: attributes
- `value`: مقدار
- `title`: عنوان برای مستندات
- `description`: توضیحات برای مستندات

---

### defineComponentTemplate

```typescript
export function defineComponentTemplate<TTemplatesTypes, TPropTypes>(templates: { [K in ComponentTemplateKeys<TTemplatesTypes>]: ComponentTemplateType<TPropTypes> }): { [K in ComponentTemplateKeys<TTemplatesTypes>]: ComponentTemplateType<TPropTypes> }
```

تابع helper برای تعریف Templates کامپوننت.

---

## ComponentBase Class

کلاس پایه برای تمام کامپوننت‌ها.

### Generics

```typescript
export class ComponentBase<
    TProp extends Record<string, any>,
    TSchemas,
    TTemplate,
    TMethods extends Record<string, ComponentCallBackType<any, any>>
>
```

- `TProp`: Type برای Props
- `TSchemas`: Type برای Schemas
- `TTemplate`: Type برای Templates
- `TMethods`: Type برای Methods

---

### ویژگی‌های خصوصی

```typescript
private _renderScope = new Scope();
_COMPONENT_PATTERN!: { [K in ComponentPropKeys<TProp>]?: IComponentProp<TProp[K]> }
_COMPONENT_SCHEMA!: { [K in ComponentSchemaKeys<TSchemas>]: IComponentSchema<TSchemas[K], TProp> }
_COMPONENT_METHODS!: { [K in ComponentMethodKeys<TMethods>]: ComponentMethodType<TProp> }
_COMPONENT_TEMPLATES!: { [K in ComponentTemplateKeys<TTemplate>]?: ComponentTemplateType<TProp> }
_COMPONENT_PROPS_BIND: Record<string, Observable<any>> = {};
_COMPONENT_CONFIG!: Record<string, any>;
_COMPONENT_RANDOM_ID: number = 0;
_COMPONENT_ID: string | null = null;
_COMPONENT_NAME: string;
_COMPONENT_CONTENT!: ReactiveElement;
_unsubscribeDirection: any;
```

---

### Constructor

```typescript
constructor(componentName: string, elId: string | null)
```

ایجاد کامپوننت با نام و ID.

**پارامترها:**
- `componentName`: نام کامپوننت
- `elId`: ID المان (اختیاری)

---

### renderComponent

```typescript
renderComponent(config: TProp, methods: TMethods, events = null)
```

رندر کردن کامپوننت:
- اجرای connectedCallback
- آماده‌سازی config و methods
- ایجاد المان DOM
- اتصال events

**پارامترها:**
- `config`: تنظیمات کامپوننت
- `methods`: متدهای callback
- `events`: رویدادهای اضافی (اختیاری)

---

### connectedCallback

```typescript
connectedCallback()
```

Callback هنگام اتصال کامپوننت:
- تنظیم direction RTL از AppConfig
- subscribe به تغییرات direction

---

### createComponentElement

```typescript
private createComponentElement()
```

ایجاد المان DOM کامپوننت:
- dispose scope قبلی
- ایجاد scope جدید
- اجرای Schema برای Component
- اتصال به selector اگر مشخص شده باشد

---

### executeSchemaPart

```typescript
executeSchemaPart(partName: string, extra: any = null)
```

اجرای یک بخش از Schema:
- پیدا کردن part در schema
- استخراج props مرتبط
- اجرای method یا renderManagerComponent
- بازگشت ReactiveElement

**پارامترها:**
- `partName`: نام بخش
- `extra`: داده اضافی (اختیاری)

---

### getSchemaPropsInPart

```typescript
getSchemaPropsInPart(props: IComponentProp<any>[])
```

استخراج Observableهای props یک بخش.

---

### getReactiveElement

```typescript
getReactiveElement()
```

بازگشت ReactiveElement کامپوننت.

---

### getElement

```typescript
getElement()
```

بازگشت HTMLElement کامپوننت.

---

### set

```typescript
set(propName: string, propValue: any)
```

تغییر مقدار یک prop.

---

### get

```typescript
get(propName: string)
```

دریافت مقدار یک prop.

---

### getObservable

```typescript
getObservable(propName: string)
```

دریافت Observable یک prop.

---

### getScope

```typescript
getScope(): Scope
```

بازگشت render scope.

---

### getPartId

```typescript
getPartId(partName: string): string
```

ایجاد ID برای یک بخش.

---

### executeMethod

```typescript
executeMethod(methodName: string, event: Event, dataArgs: Record<string, any> | null = null)
```

اجرای یک method کامپوننت.

---

## مثال‌های کاربردی

### مثال 1: تعریف Props

```typescript
export const ComponentProps = {
    prop_title: "prop_title",
    prop_value: "prop_value"
} as const;

const ComponentConfigs = {
    keys: {
        prop_title: {
            name: ComponentProps.prop_title,
            value: GOG_SetValue("Default Title")
        },
        prop_value: {
            name: ComponentProps.prop_value,
            value: GOG_SetValue(0)
        }
    }
}
```

---

### مثال 2: تعریف Schema

```typescript
const ComponentConfigs = {
    schemas: {
        Main: {
            name: "part-main"
        },
        Content: {
            name: "part-content"
        }
    }
}
```

---

### مثال 3: تعریف Methods

```typescript
const ComponentConfigs = {
    methods: {
        CLICK: {
            name: "fn_onClick",
            dataArgs: {},
            componentArgs: {
                VALUE: { name: "VALUE" }
            }
        }
    }
}
```

---

### مثال 4: استخراج Typeها

```typescript
export type ComponentPropsType = GOG_ExtractNameValue<typeof ComponentConfigs.keys>
export type ComponentSchemaType = GOG_ExtractName<typeof ComponentConfigs.schemas>
export type ComponentMethodsType = {
    [ComponentConfigs.methods.CLICK.name]: ComponentCallBackType<...>
}
```

---

### مثال 5: کلاس Base

```typescript
export abstract class ComponentBase extends ComponentBase<
    ComponentPropsType,
    ComponentSchemaType,
    ComponentTemplateType,
    ComponentMethodsType
> {
    _COMPONENT_PATTERN = defineComponentPatterns<ComponentPropsType>({
        prop_title: {
            prop: ComponentProps.prop_title,
            default: "Default Title"
        }
    })

    _COMPONENT_SCHEMA = defineComponentSchema<ComponentSchemaType, ComponentPropsType>({
        Main: {
            part: "part-main",
            props: [this._COMPONENT_PATTERN.prop_title]
        }
    })

    _COMPONENT_METHODS = defineComponentMethods<ComponentMethodsType, ComponentPropsType>({
        fn_onClick: {
            args: {
                VALUE: this._COMPONENT_PATTERN.prop_value
            }
        }
    })
}
```

---

### مثال 6: کلاس Concrete

```typescript
export class Component extends ComponentBase {
    constructor(
        config: ComponentPropsType,
        methods: ComponentMethodsType,
        events = null
    ) {
        super("my-component", null);
        super.renderComponent(config, methods, events);
    }

    override renderContentComponent() {
        return this.executeSchemaPart(ComponentConfigs.schemas.Main.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra) {
        switch (partName) {
            case ComponentConfigs.schemas.Main.name:
                return this.template_render_main(attrsDefault, data, extra);
        }
    }
}
```

---

### مثال 7: استفاده از executeSchemaPart

```typescript
const mainPart = this.executeSchemaPart(ComponentConfigs.schemas.Main.name, {
    extraData: "value"
});
```

---

### مثال 8: استفاده از executeMethod

```typescript
this.executeMethod(ComponentConfigs.methods.CLICK.name, event, {
    customData: "value"
});
```

---

### مثال 9: دسترسی به Props

```typescript
const title = this.get(ComponentProps.prop_title);
this.set(ComponentProps.prop_value, 10);
const valueObservable = this.getObservable(ComponentProps.prop_value);
```

---

### مثال 10: استفاده از Scope

```typescript
const scope = this.getScope();
scope.track(() => {
    // cleanup
});
```

---

## نکات مهم

### 1. Type Safety

- همیشه از TypeScript Generics استفاده کنید
- Typeها را از Configs استخراج کنید

---

### 2. Schema-based Rendering

- هر بخش باید یک Schema داشته باشد
- از executeSchemaPart برای رندر استفاده کنید

---

### 3. Method Execution

- متدها از طریق executeMethod اجرا می‌شوند
- آرگومان‌ها به صورت خودکار استخراج می‌شوند

---

### 4. Props Binding

- همه props به Observable تبدیل می‌شوند
- از get/set برای دسترسی استفاده کنید

---

### 5. Scope Management

- renderScope برای مدیریت حافظه استفاده می‌شود
- با رندر مجدد، scope قبلی dispose می‌شود

---

## بهترین شیوه‌ها

### 1. نام‌گذاری

```typescript
// ✅ خوب
prop_title, prop_value, fn_onClick

// ❌ بد
title, value, onClick
```

---

### 2. استفاده از Type Extraction

```typescript
// ✅ خوب
export type PropsType = GOG_ExtractNameValue<typeof configs.keys>

// ❌ بد
export type PropsType = any
```

---

### 3. تعریف Pattern

```typescript
// ✅ خوب
_COMPONENT_PATTERN = defineComponentPatterns<PropsType>({
    prop_title: {
        prop: "prop_title",
        default: "Default"
    }
})

// ❌ بد
_COMPONENT_PATTERN = {
    prop_title: {
        prop: "prop_title",
        default: "Default"
    }
}
```

---

## خلاصه

ComponentBase یک کلاس قدرتمند برای:
- ✅ Schema-based rendering
- ✅ Type-safe component definition
- ✅ Props management with Observable
- ✅ Methods execution
- ✅ Templates support
- ✅ Scope management

این کلاس پایه اصلی تمام کامپوننت‌ها در این معماری است.
