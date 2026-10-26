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
 * ComponentMessagesBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ
 *
 * Ø§Ø±Ø« Ø§Ø² CoreComponents.App (ClComponentBase) â€” Ù†Ù‡ ComponentStructure.
 * ComponentMessages Ø®ÙˆØ¯Ø´ ÛŒÚ© Component Ù…Ø³ØªÙ‚Ù„ Ø§Ø³Øª.
 * ComponentStructure Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† ÙØ±Ø²Ù†Ø¯ Ø¯Ø± renderContentComponent Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Û· prop Ù¾Ø§ÛŒÙ‡ ComponentStructure Ø§Ø² ComponentStructureTrait.props Ø¯Ø± _COMPONENT_PATTERN
 * Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯ ØªØ§ Ú©Ø§Ø±Ø¨Ø± Ø¨ØªÙˆØ§Ù†Ø¯ Ø¢Ù†â€ŒÙ‡Ø§ Ø±Ø§ set Ú©Ù†Ø¯ â€” Ø³Ù¾Ø³ Ø¯Ø± renderContentComponent
 * Ø¨Ù‡ ComponentStructure.create() forward Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯.
 *
 * Step Node (Plan 8.2.2 + 8.2.7):
 *   _COMPONENT_STEP â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ Component (Ø¯Ø§Ø®Ù„ÛŒ)
 *   Ø¯Ø± constructor Ø§Ø² Ø·Ø±ÛŒÙ‚ super Ù¾Ø§Ø³ Ø¯Ø§Ø¯Ù‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *   Ø¯Ø± Ù…ØªØ¯Ù‡Ø§ÛŒ render Ø¨Ù‡ reactiveElementÙ‡Ø§ Ù…ØªØµÙ„ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 *   ØªÙØ§ÙˆØª Ø¨Ø§ identity:
 *     identity = Ø¨ÛŒØ±ÙˆÙ†ÛŒ â€” ÙˆØ§Ù„Ø¯ Ø¨Ù‡ Ø§ÛŒÙ† Component
 *     step     = Ø¯Ø§Ø®Ù„ÛŒ â€” Ø§ÛŒÙ† Component Ø¨Ù‡ ÙØ±Ø²Ù†Ø¯Ø§Ù†Ø´
 *
 * Plan 8.2.7 â€” SubEvent:
 *   Ø§Ú¯Ø± Parent Step (identity.unique) Ùˆ Child Step (step) Ù‡Ø± Ø¯Ùˆ ÙˆØ¬ÙˆØ¯ Ø¯Ø§Ø±Ù†Ø¯ØŒ
 *   Child Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† SubEvent Ø²ÛŒØ± Parent Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆØ¯ â€” Ø§Ø² Ø·Ø±ÛŒÙ‚ CoreEvent.SubEvent API.
 *   Ù‡ÛŒÚ† mutate Ù…Ø³ØªÙ‚ÛŒÙ…ÛŒ Ø±ÙˆÛŒ children Ø§Ù†Ø¬Ø§Ù… Ù†Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *   Ù‡Ø± Instance Step Ø®ÙˆØ¯Ø´ Ø±Ø§ Ø¯Ø§Ø±Ø¯ (factory) â€” identity ÛŒÚ©ØªØ§ØŒ ØªØ¯Ø§Ø®Ù„ Ù†Ø¯Ø§Ø±Ø¯.
 */
export class ComponentMessagesBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {

    /**
     * Step Node â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ ComponentMessages
     * ÙØ±Ø²Ù†Ø¯ Ø¯Ø± constructor Ø§Ø² Ø·Ø±ÛŒÙ‚ super Ù¾Ø§Ø³ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯.
     * Ø¯Ø± Ù…ØªØ¯Ù‡Ø§ÛŒ render Ø¨Ù‡ reactiveElementÙ‡Ø§ Ù…ØªØµÙ„ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
     */
    protected _COMPONENT_STEP: TWorkflow | null = null;


    /**
     * constructor
     *
     * @param componentName â€” Ù†Ø§Ù… Component (default: "messages")
     * @param elId          â€” Ø´Ù†Ø§Ø³Ù‡ Ø§Ù„Ù…Ø§Ù† (default: null)
     * @param identity      â€” Ø¨ÛŒØ±ÙˆÙ†ÛŒ { unique?, emit?, events? } â€” ÙˆØ§Ù„Ø¯ Ø¨Ù‡ Ø§ÛŒÙ† Component
     * @param step          â€” Ø¯Ø§Ø®Ù„ÛŒ (Workflow Ø®Ø§Øµ Ø§ÛŒÙ† Component) â€” Ø§ÛŒÙ† Component Ø¨Ù‡ ÙØ±Ø²Ù†Ø¯Ù‡Ø§ÛŒØ´
     */
    constructor(
        componentName: string = "messages",
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

        // Plan 8.2.7 â€” SubEvent: Ø§ØªØµØ§Ù„ Ø±Ø³Ù…ÛŒ Child Step Ø¨Ù‡ Parent Step
        // Ø§Ú¯Ø± Parent Step (identity.unique) Ùˆ Child Step (step) Ù‡Ø± Ø¯Ùˆ Ù‡Ø³ØªÙ†ØŒ
        // Child Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† SubEvent Ø²ÛŒØ± Parent Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆØ¯ â€” Ø§Ø² Ø·Ø±ÛŒÙ‚ API Ø¹Ù…ÙˆÙ…ÛŒ
        //
        // Guard: identity.unique Ø¨Ø§ÛŒØ¯ ÛŒÚ© Step ÙˆØ§Ù‚Ø¹ÛŒ Ø¨Ø§Ø´Ø¯ (symbol identity Ø¯Ø§Ø´ØªÙ‡ Ø¨Ø§Ø´Ø¯).
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, componentName, step);
        }
    }

    /**
     * Disposal â€” Ù¾Ø§Ú©â€ŒØ³Ø§Ø²ÛŒ Ú©Ù„ subtree Ø§Ø² Ø±Ø¬ÛŒØ³ØªØ±ÛŒ CoreEvent (Plan 8.2.7)
     * ÙˆÙ‚ØªÛŒ Component Ø§Ø² DOM Ø­Ø°Ù Ù…ÛŒâ€ŒØ´ÙˆØ¯ØŒ Ø¨Ø§ÛŒØ¯ Step Ø¯Ø§Ø®Ù„ÛŒ Ù‡Ù… dispose Ø´ÙˆØ¯.
     * Ø§ÛŒÙ† Ù…ØªØ¯ Ø¨Ø§ÛŒØ¯ Ø§Ø² Ù…ØªØ¯ destroy/remove Ú©Ø§Ù…Ù¾ÙˆÙ†Ù†Øª ØµØ¯Ø§ Ø²Ø¯Ù‡ Ø´ÙˆØ¯.
     */
    disposeStep(): void {
        if (this._COMPONENT_STEP) {
            CoreEvent.dispose(this._COMPONENT_STEP);
            this._COMPONENT_STEP = null;
        }
    }


    protected _COMPONENT_DEFINITION = Definition;

    // Û· prop Ù¾Ø§ÛŒÙ‡ (Ø§Ø² Trait) + Û· prop Ø§Ø®ØªØµØ§ØµÛŒ ComponentMessages
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
