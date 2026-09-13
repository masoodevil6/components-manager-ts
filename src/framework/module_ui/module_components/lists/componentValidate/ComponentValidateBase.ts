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
 * ComponentValidateBase — ترکیب config پایه و اختصاصی (Plan 15.1.0)
 *
 * ارث از CoreComponents.App (ClComponentBase) — نه ComponentStructure.
 * ComponentValidate خودش یک Component مستقل است.
 *
 * ۷ prop پایه ComponentStructure از ComponentStructureTrait.props در _COMPONENT_PATTERN
 * ثبت می‌شوند تا کاربر بتواند آن‌ها را set کند.
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait.schemas
 * در _COMPONENT_SCHEMA spread می‌شوند تا لایه <component-validate> + <section> رندر شوند.
 *
 * Plan 8.2.7 / 9.1 — SubEvent + Event Scope Ownership:
 *   هر ComponentValidate مالک Step Instance خودش است.
 */
export class ComponentValidateBase extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType
> {

    /**
     * Step Node — درخت Workflow داخلی ComponentValidate
     */
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName — نام Component (default: "validate")
     * @param elId          — شناسه المان (default: null)
     * @param identity      — بیرونی { unique?, emit?, events? }
     * @param step          — داخلی (Workflow خاص این Component)
     */
    constructor(
        componentName: string = "validate",
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

    // ۷ prop پایه (از Trait) + propهای اختصاصی ComponentValidate
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);

    // Plan 11.2 — Schema پایه (از Trait) + schemaهای اختصاصی
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({
        ...Methods,
    } as any);

}
