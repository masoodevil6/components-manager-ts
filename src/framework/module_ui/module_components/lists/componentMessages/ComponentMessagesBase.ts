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
 * ComponentMessagesBase — ترکیب config پایه و اختصاصی
 *
 * ارث از CoreComponents.App (ClComponentBase) — نه ComponentStructure.
 * ComponentMessages خودش یک Component مستقل است.
 * ComponentStructure به‌عنوان فرزند در renderContentComponent استفاده می‌شود.
 *
 * ۷ prop پایه ComponentStructure از ComponentStructureTrait.props در _COMPONENT_PATTERN
 * ثبت می‌شوند تا کاربر بتواند آن‌ها را set کند — سپس در renderContentComponent
 * به ComponentStructure.create() forward می‌شوند.
 *
 * Step Node (Plan 8.2.2 + 8.2.7):
 *   _COMPONENT_STEP — درخت Workflow داخلی Component (داخلی)
 *   در constructor از طریق super پاس داده می‌شود.
 *   در متدهای render به reactiveElementها متصل می‌شود.
 *
 *   تفاوت با identity:
 *     identity = بیرونی — والد به این Component
 *     step     = داخلی — این Component به فرزندانش
 *
 * Plan 8.2.7 — SubEvent:
 *   اگر Parent Step (identity.unique) و Child Step (step) هر دو وجود دارند،
 *   Child به‌عنوان SubEvent زیر Parent ثبت می‌شود — از طریق CoreEvent.SubEvent API.
 *   هیچ mutate مستقیمی روی children انجام نمی‌شود.
 *   هر Instance Step خودش را دارد (factory) — identity یکتا، تداخل ندارد.
 */
export class ComponentMessagesBase extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType
> {

    /**
     * Step Node — درخت Workflow داخلی ComponentMessages
     * فرزند در constructor از طریق super پاس می‌دهد.
     * در متدهای render به reactiveElementها متصل می‌شود.
     */
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;


    /**
     * constructor
     *
     * @param componentName — نام Component (default: "messages")
     * @param elId          — شناسه المان (default: null)
     * @param identity      — بیرونی { unique?, emit?, events? } — والد به این Component
     * @param step          — داخلی (Workflow خاص این Component) — این Component به فرزندهایش
     */
    constructor(
        componentName: string = "messages",
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

        // Plan 8.2.7 — SubEvent: اتصال رسمی Child Step به Parent Step
        // اگر Parent Step (identity.unique) و Child Step (step) هر دو هستن،
        // Child به‌عنوان SubEvent زیر Parent ثبت می‌شود — از طریق API عمومی
        //
        // Guard: identity.unique باید یک Step واقعی باشد (symbol identity داشته باشد).
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }

    /**
     * Disposal — پاک‌سازی کل subtree از رجیستری CoreEvent (Plan 8.2.7)
     * وقتی Component از DOM حذف می‌شود، باید Step داخلی هم dispose شود.
     * این متد باید از متد destroy/remove کامپوننت صدا زده شود.
     */
    disposeStep(): void {
        if (this._COMPONENT_STEP) {
            CoreEvent.dispose(this._COMPONENT_STEP);
            this._COMPONENT_STEP = null;
        }
    }


    protected _COMPONENT_DEFINITION = Definition;

    // ۷ prop پایه (از Trait) + ۷ prop اختصاصی ComponentMessages
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
