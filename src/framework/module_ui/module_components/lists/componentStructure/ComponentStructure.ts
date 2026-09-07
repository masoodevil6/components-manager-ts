import * as CoreReactive     from "@/core_reactive";
import * as CoreObservable   from "@/core_observable";
import * as CoreConfigs      from "@/core_configs";
// --------------------------------
import {ComponentStructureBase}  from "./ComponentStructureBase";
import {Schemas}                 from "./Schemas";
// --------------------------------
import {PropsType}           from "./Props";
import {SchemasType}         from "./Schemas";
import {MethodsType}         from "./Methods";
import {ComponentIdentity}   from "@/core_components";
// --------------------------------
import {PartAttrDefault}     from "@/core_components";


/**
 * ComponentStructure — کلاس نهایی (Concrete)
 *
 * مسئولیت: پیاده‌سازی render برای Base Runtime مشترک تمام UI Componentها
 *   - renderComponentSchema  → لایه خارجی <component-{name}> با RTL + classList + styles
 *   - renderStructureSchema  → لایه داخلی <section> با show/hide + structureClass + structureStyles
 *   - renderContentComponent → content تزریق‌شده (از _CONTENT_RENDERER یا super)
 *   - renderManagerComponent → routing بر اساس partName
 *   - static create()        → API راحت برای ساخت Component
 *
 * اصل معماری (پلن ۵.۸):
 *   Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 *   Rendering در خود ComponentStructure قرار دارد (دسترسی مستقیم به this).
 *   SchemaHandler جداگانه وجود ندارد — جلوی تبدیل شدن آن به renderManagerComponent جدید را می‌گیرد.
 *
 * جریان رندر:
 *   executeSchemaPart("part-component")
 *       → no handler, no method → renderManagerComponent(...)  [fallback]
 *       → ComponentStructure.renderManagerComponent() override
 *       → partName === "part-component" → this.renderComponentSchema(attrsDefault, data)
 *           → children: [this.executeSchemaPart("part-component-structure")]
 *               → renderManagerComponent() override
 *               → partName === "part-component-structure" → this.renderStructureSchema(attrsDefault, data)
 *                   → children: [this.renderContentComponent()]
 *                       → ComponentButton.renderContentComponent() override
 *                       → this.renderForm()  (مستقیم، بدون executeSchemaPart)
 *
 * الگوی ارث‌بری:
 *   CoreComponents.App (ClComponentBase)
 *       ▲
 *       │ extends
 *       │
 *   ComponentStructureBase (abstract — config + identity)
 *       ▲
 *       │ extends
 *       │
 *   ComponentStructure (concrete — render + create)
 *
 * کامپوننت‌های فرزند (مثل ComponentButton):
 *   ComponentButtonBase extends ComponentStructure  →  اضافه‌کردن config اختصاصی
 *   ComponentButton      extends ComponentButtonBase →  override renderContentComponent + render اختصاصی
 */
export class ComponentStructure<
    TProp extends Record<string, any>      = PropsType,
    TSchemas                               = SchemasType,
    TMethods extends Record<string, any>   = MethodsType,
    TIdentity extends ComponentIdentity    = ComponentIdentity
> extends ComponentStructureBase<
    TProp,
    TSchemas,
    TMethods,
    TIdentity
> {


    /* ---------------------------------------------
       Rendering — COMPONENT (لایه خارجی)
       <component-{name}> با RTL + classList + styles
       children: STRUCTURE
    --------------------------------------------- */
    protected renderComponentSchema(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {

        const rtl =
            CoreConfigs.Settings.DirectionRtl.observable();

        const classList =
            data?.classList ??
            new CoreObservable.App([]);

        const styles =
            data?.styles ??
            new CoreObservable.App({});

        return CoreReactive.App.component(
            this._COMPONENT_NAME,
            {
                attrs: {
                    ...attrsDefault,
                },
                classBind: [
                    classList,
                ],
                stylesBind: {
                    direction: rtl.mapBoolean("rtl", "ltr"),
                    styles:    styles,
                },
                children: [
                    this.executeSchemaPart(
                        Schemas.STRUCTURE.part
                    ),
                ],
            }
        );
    }


    /* ---------------------------------------------
       Rendering — STRUCTURE (لایه داخلی)
       <section> با show/hide + structureClass + structureStyles
       children: renderContentComponent()
    --------------------------------------------- */
    protected renderStructureSchema(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {

        const prop_show =
            data?.prop_show ??
            new CoreObservable.App(true);

        const prop_structureClass =
            data?.prop_structureClass ??
            new CoreObservable.App([]);

        const prop_structureStyles =
            data?.prop_structureStyles ??
            new CoreObservable.App({});

        return CoreReactive.App.component(
            "structure",
            {
                classBind: [
                    prop_structureClass,
                    prop_show.mapBoolean("show", "d-none"),
                ],
                attrs: {
                    ...attrsDefault,
                },
                stylesBind: {
                    prop_structureStyles,
                },
                children: [
                    this.renderContentComponent(),
                ],
            }
        );
    }


    /* ---------------------------------------------
       renderContentComponent — override
       اگر _CONTENT_RENDERER set شده باشد، از آن استفاده می‌کند.
       در غیر این صورت به super (متد پایه) برمی‌گرداند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {
        if (this._CONTENT_RENDERER) {
            return this._CONTENT_RENDERER();
        }
        return super.renderContentComponent();
    }


    /* ---------------------------------------------
       Static Factory — create()
       API راحت برای ساخت Component — مثل CoreReactive.App.section({...})

       الگو:
           ComponentStructure.create(
               { classList, prop_show, content: () => ... },
               { CLICK: { name: "fn_onClick" } },
               { unique, emit, events },
           )

       خروجی: CoreReactive.App
       (از API رسمی getReactiveElement() استفاده می‌کند — نه getElement)

       نکته: مصرف‌کنندگان قبلی که HTMLElement نیاز داشتند باید از
       create(...).getElement() استفاده کنند.
    --------------------------------------------- */
    static create(
        componentName: string,
        config:  Record<string, any> & { content?: () => CoreReactive.App },
        methods: Record<string, any> = {},
        identity: { unique?: any; emit?: any; events?: Record<string, any> } = {},
    ): CoreReactive.App {

        const { content, ...props } = config;

        const instance = new ComponentStructure(
            componentName,
            null,
            identity as any,
        );

        if (typeof content === "function") {
            instance._CONTENT_RENDERER = content;
        }

        instance.renderComponent(
            props as any,
            methods as any,
        );

        return instance.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       executeSchemaPart وقتی handler/method ندارد، این متد را صدا می‌زند.
       ComponentStructure آن را override می‌کند و بر اساس partName
       به renderComponentSchema یا renderStructureSchema routing می‌کند.
       فرزندها می‌توانند override کنند و partهای اختصاصی اضافه کنند.
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {

        switch (partName) {
            case Schemas.COMPONENT.part:
                return this.renderComponentSchema(attrsDefault, data);

            case Schemas.STRUCTURE.part:
                return this.renderStructureSchema(attrsDefault, data);

            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


}
