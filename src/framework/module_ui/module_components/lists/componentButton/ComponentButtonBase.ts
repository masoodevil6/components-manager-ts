import * as CoreComponents   from "@/core_components";
import * as CoreEvent        from "@/core_event";
// --------------------------------
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
// --------------------------------
import {Props,     PropsType}     from "./Props";
import {Schemas,   SchemasType}   from "./Schemas";
import {Methods,   MethodsType}   from "./Methods";
import {Definition}               from "./Definition";


/**
 * ComponentButtonBase — ترکیب config پایه و اختصاصی
 *
 * ارث از CoreComponents.App (ClComponentBase) — نه ComponentStructure.
 * ComponentButton خودش یک Component مستقل است.
 * ComponentStructure به‌عنوان فرزند در renderContentComponent استفاده می‌شود.
 *
 * ۷ prop پایه ComponentStructure از ComponentStructureTrait.props در _COMPONENT_PATTERN
 * ثبت می‌شوند تا کاربر بتواند آن‌ها را set کند — سپس در renderContentComponent
 * به ComponentStructure.create() forward می‌شوند.
 *
 * Step Node (Plan 9.1 + 8.2.7):
 *   _COMPONENT_STEP — درخت Workflow داخلی Component (داخلی)
 *
 * Plan 8.2.7 — SubEvent:
 *   اگر Parent Step (identity.unique) و Child Step (step) هر دو وجود دارند،
 *   Child به‌عنوان SubEvent زیر Parent ثبت می‌شود.
 *
 * Plan 9.1 — Event Scope Ownership:
 *   هر ComponentButton مالک Step Instance خودش است.
 *   disposal یک Component فقط باید Event resources متعلق به همان Component را آزاد کند.
 */
export class ComponentButtonBase extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType
> {

    /**
     * Step Node — درخت Workflow داخلی ComponentButton
     */
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName — نام Component (default: "button")
     * @param elId          — شناسه المان (default: null)
     * @param identity      — بیرونی { unique?, emit?, events? }
     * @param step          — داخلی (Workflow خاص این Component)
     */
    constructor(
        componentName: string = "button",
        elId: string | null   = null,
        identity?: {
            unique?: CoreEvent.TStepRef | null;
            emit?:   CoreEvent.TEmitHandler | null;
            events?: Record<string, any> | null;
        },
        step?: CoreEvent.TStepInstance<any>,
    ) {
        super(componentName, elId);

        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;

        this._COMPONENT_STEP   = step ?? null;

        // Plan 8.2.7 — SubEvent
        // Guard: identity.unique باید یک Step واقعی باشد (symbol identity داشته باشد).
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }


    /**
     * Disposal — پاک‌سازی کل subtree از رجیستری CoreEvent (Plan 8.2.7 / 9.1)
     */
    disposeStep(): void {
        if (this._COMPONENT_STEP) {
            CoreEvent.dispose(this._COMPONENT_STEP);
            this._COMPONENT_STEP = null;
        }
    }

    protected _COMPONENT_DEFINITION = Definition;

    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);

    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({
        ...Methods,
    } as any);

}
