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
 * ComponentPositionMenuBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ
 *
 * Ø§Ø±Ø« Ø§Ø² CoreComponents.App (ClComponentBase) â€” Ù†Ù‡ ComponentStructure.
 * ComponentPositionMenu Ø®ÙˆØ¯Ø´ ÛŒÚ© Component Ù…Ø³ØªÙ‚Ù„ Ø§Ø³Øª.
 * ComponentStructure Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† Ù„Ø§ÛŒÙ‡ Ù¾Ø§ÛŒÙ‡ Ø¯Ø± Schema Ø§ÙˆÙ„ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Û· prop Ù¾Ø§ÛŒÙ‡ ComponentStructure Ø§Ø² ComponentStructureTrait.props Ø¯Ø± _COMPONENT_PATTERN
 * Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯ ØªØ§ Ú©Ø§Ø±Ø¨Ø± Ø¨ØªÙˆØ§Ù†Ø¯ Ø¢Ù†â€ŒÙ‡Ø§ Ø±Ø§ set Ú©Ù†Ø¯.
 *
 * Step Node (Plan 9.1 + 8.2.7):
 *   _COMPONENT_STEP â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ Component (Ø¯Ø§Ø®Ù„ÛŒ)
 *
 * Plan 8.2.7 â€” SubEvent:
 *   Ø§Ú¯Ø± Parent Step (identity.unique) Ùˆ Child Step (step) Ù‡Ø± Ø¯Ùˆ ÙˆØ¬ÙˆØ¯ Ø¯Ø§Ø±Ù†Ø¯ØŒ
 *   Child Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† SubEvent Ø²ÛŒØ± Parent Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 */
export class ComponentPositionMenuBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {
    /**
     * Step Node â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ ComponentPositionMenu
     */
    protected _COMPONENT_STEP: TWorkflow | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName â€” Ù†Ø§Ù… Component (default: "position-menu")
     * @param elId          â€” Ø´Ù†Ø§Ø³Ù‡ Ø§Ù„Ù…Ø§Ù† (default: null)
     * @param identity      â€” Ø¨ÛŒØ±ÙˆÙ†ÛŒ { unique?, emit?, events? }
     * @param step          â€” Ø¯Ø§Ø®Ù„ÛŒ (Workflow Ø®Ø§Øµ Ø§ÛŒÙ† Component)
     */
    constructor(
        componentName: string = "position-menu",
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
        // Guard: identity.unique Ø¨Ø§ÛŒØ¯ ÛŒÚ© Step ÙˆØ§Ù‚Ø¹ÛŒ Ø¨Ø§Ø´Ø¯ (symbol identity Ø¯Ø§Ø´ØªÙ‡ Ø¨Ø§Ø´Ø¯).
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
