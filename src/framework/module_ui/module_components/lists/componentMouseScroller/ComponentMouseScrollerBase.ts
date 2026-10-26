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
 * ComponentMouseScrollerBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ
 *
 * Ø§Ø±Ø« Ø§Ø² CoreComponents.App (ClComponentBase)
 * base props Ùˆ schemas Ø§Ø² ComponentStructureTrait
 *
 * Step Node (Plan 9.1 + 8.2.7):
 *   _COMPONENT_STEP â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ Component (Ø¯Ø§Ø®Ù„ÛŒ)
 */
export class ComponentMouseScrollerBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {

    /**
     * Step Node â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ ComponentMouseScroller
     */
    protected _COMPONENT_STEP: TWorkflow | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName â€” Ù†Ø§Ù… Component (default: "mouse-scroller")
     * @param elId          â€” Ø´Ù†Ø§Ø³Ù‡ Ø§Ù„Ù…Ø§Ù† (default: null)
     * @param identity      â€” Ø¨ÛŒØ±ÙˆÙ†ÛŒ { unique?, emit?, events? }
     * @param step          â€” Ø¯Ø§Ø®Ù„ÛŒ (Workflow Ø®Ø§Øµ Ø§ÛŒÙ† Component)
     */
    constructor(
        componentName: string = "mouse-scroller",
        elId: string | null   = null,
        identity?: {
            unique?: CoreEvent.TStepRef | null;
            emit?:   CoreEvent.TEmitHandler | null;
            events?: Record<string, any> | null;
        },
        step?: TWorkflow,
    ) {
        super(componentName, elId);

        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;

        this._COMPONENT_STEP   = step ?? null;

        // Plan 8.2.7 â€” SubEvent
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }


    /**
     * Disposal â€” Ù¾Ø§Ú©â€ŒØ³Ø§Ø²ÛŒ Ú©Ù„ subtree Ø§Ø² Ø±Ø¬ÛŒØ³ØªØ±ÛŒ CoreEvent (Plan 8.2.7 / 9.1)
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
