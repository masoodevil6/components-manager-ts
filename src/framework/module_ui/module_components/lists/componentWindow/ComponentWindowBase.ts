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
 * ComponentWindowBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ
 *
 * Ø§Ø±Ø« Ø§Ø² CoreComponents.App (ClComponentBase) â€” Ù†Ù‡ ComponentStructure.
 * ComponentWindow Ø®ÙˆØ¯Ø´ ÛŒÚ© Component Ù…Ø³ØªÙ‚Ù„ Ø§Ø³Øª.
 *
 * Û· prop Ù¾Ø§ÛŒÙ‡ ComponentStructure Ø§Ø² ComponentStructureTrait.props Ø¯Ø± _COMPONENT_PATTERN
 * Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯ ØªØ§ Ú©Ø§Ø±Ø¨Ø± Ø¨ØªÙˆØ§Ù†Ø¯ Ø¢Ù†â€ŒÙ‡Ø§ Ø±Ø§ set Ú©Ù†Ø¯.
 *
 * Plan 11.2 â€” Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø§Ø² ComponentStructureTrait.schemas
 * Ø¯Ø± _COMPONENT_SCHEMA spread Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯.
 *
 * Plan 8.2.7 / 9.1 â€” SubEvent + Event Scope Ownership:
 *   Ù‡Ø± ComponentWindow Ù…Ø§Ù„Ú© Step Instance Ø®ÙˆØ¯Ø´ Ø§Ø³Øª.
 */
export class ComponentWindowBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {

    /**
     * Step Node â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ ComponentWindow
     */
    protected _COMPONENT_STEP: TWorkflow | null = null;


    /**
     * constructor (Plan 8.2.7)
     */
    constructor(
        componentName: string = "window",
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

        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }


    /**
     * Disposal â€” Ù¾Ø§Ú©â€ŒØ³Ø§Ø²ÛŒ Ú©Ù„ subtree Ø§Ø² Ø±Ø¬ÛŒØ³ØªØ±ÛŒ CoreEvent
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
