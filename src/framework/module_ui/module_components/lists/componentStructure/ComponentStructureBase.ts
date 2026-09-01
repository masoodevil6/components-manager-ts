import * as CoreComponents   from "@/core_components";
import * as CoreReactive     from "@/core_reactive";
import * as CoreEvent        from "@/core_event";
// --------------------------------
import {Props}               from "./Props";
import {Schemas}             from "./Schemas";
import {Methods}             from "./Methods";
import {Definition}          from "./Definition";
// --------------------------------
import {PropsType}           from "./Props";
import {SchemasType}         from "./Schemas";
import {MethodsType}         from "./Methods";
import {ComponentIdentity}   from "@/core_components";


/**
 * ComponentStructureBase — کلاس پایه انتزاعی ComponentStructure
 *
 * این کلاس فقط مسئول تعریف config و identity است:
 *   - _COMPONENT_DEFINITION  → شناسنامه و Metadata
 *   - _COMPONENT_PATTERN     → ۷ prop پایه
 *   - _COMPONENT_SCHEMA      → ۲ schema پایه (declarative)
 *   - _COMPONENT_METHODS     → methodها (خالی — فرزند اضافه می‌کند)
 *   - Identity fields         → _COMPONENT_EVENTS, _CONTENT_RENDERER, _COMPONENT_STEP
 *   - constructor             → setup identity + step
 *   - renderComponent override → fallback به _COMPONENT_* اگر پاس داده نشد
 *
 * پیاده‌سازی render در کلاس Concrete (ComponentStructure) قرار دارد.
 * این جداسازی باعث می‌شود:
 *   - Base قابل ارث‌بری توسط فرزندهایی باشد که فقط config را تغییر می‌دهند
 *   - Concrete مسئولیت render را داشته باشد
 *   - الگو یکسان با ComponentIconBase / ComponentIcon
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
 * فرزندهای واقعی (مثل ComponentButton) از ComponentStructure ارث می‌برند،
 * نه از ComponentStructureBase.
 */
export abstract class ComponentStructureBase<
    TProp extends Record<string, any>      = PropsType,
    TSchemas                               = SchemasType,
    TMethods extends Record<string, any>   = MethodsType,
    TIdentity extends ComponentIdentity    = ComponentIdentity
> extends CoreComponents.App<
    TProp,
    TSchemas,
    any,
    TMethods
> {


    /* ---------------------------------------------
       Identity — Runtime Identity این Instance (بیرونی)
       unique — هویت یکتایی Instance در درخت Workflow والد
       emit   — Request Handler متصل به الان (از سمت والد)
       events — Event handlerهای متصل به Component (از سمت والد)
    --------------------------------------------- */
    protected _COMPONENT_EVENTS: Record<string, any> | null = null;


    /* ---------------------------------------------
       Content Renderer — callback محتوای داخلی
       توسط static factory create() یا callable set می‌شود.
       renderContentComponent() در کلاس Concrete از این استفاده می‌کند.
    --------------------------------------------- */
    protected _CONTENT_RENDERER: (() => CoreReactive.App) | null = null;


    /* ---------------------------------------------
       Step Node — درخت Workflow داخلی Component (داخلی)
       این Step در constructor به ComponentStructure پاس داده می‌شود تا نگه دارد.
       در متدهای schema/render به هر reactiveElement / child Component متصل می‌شود.

       تفاوت با Identity:
         identity  = بیرونی — والد به این Component
         step      = داخلی — این Component به فرزندانش

       فرزند: super("button", null, identity, ButtonStep)
    --------------------------------------------- */
    protected _COMPONENT_STEP: CoreEvent.TStepInstance | null = null;


    /* ---------------------------------------------
       SETUP — constructor
       identity اختیاری — بیرونی { unique?, emit?, events? }
       step     اختیاری — داخلی (Workflow خاص این Component)
       فرزند: super("button", null, identity, ButtonStep)
    --------------------------------------------- */
    constructor(
        componentName: string = "structure",
        elId: string | null   = null,
        identity?: Partial<TIdentity>,
        step?:    CoreEvent.TStepInstance,
    ) {
        super(componentName, elId);

        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;
        this._COMPONENT_EVENTS = identity?.events ?? null;

        this._COMPONENT_STEP   = step ?? null;
    }


    /* ---------------------------------------------
       renderComponent — override
       اگر events/unique/emit پاس داده نشد، از _COMPONENT_* استفاده می‌کند.
       این اجازه می‌دهد Component بدون renderComponent هم identity داشته باشد.
    --------------------------------------------- */
    override renderComponent(
        config:  TProp,
        methods: TMethods,
        events:  Record<string, any> | null = null,
        unique:  any = null,
        emit:    any = null,
    ) {
        super.renderComponent(
            config,
            methods,
            events ?? this._COMPONENT_EVENTS,
            unique ?? this._COMPONENT_UNIQUE,
            emit   ?? this._COMPONENT_EMIT,
        );
    }


    /* ---------------------------------------------
       Config Definitions — چهار بخش _COMPONENT_*
       فرزندها می‌توانند override کنند تا prop/schema/method اختصاصی اضافه کنند.
    --------------------------------------------- */
    protected _COMPONENT_DEFINITION = Definition;

    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<TProp>({
        ...Props,
    } as any);

    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<TSchemas, TProp>({
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<TMethods, TProp>({
        ...Methods,
    } as any);


}
