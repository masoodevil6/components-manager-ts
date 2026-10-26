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
 * ComponentValidateBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ (Plan 15.1.0)
 *
 * Ø§Ø±Ø« Ø§Ø² CoreComponents.App (ClComponentBase) â€” Ù†Ù‡ ComponentStructure.
 * ComponentValidate Ø®ÙˆØ¯Ø´ ÛŒÚ© Component Ù…Ø³ØªÙ‚Ù„ Ø§Ø³Øª.
 *
 * Û· prop Ù¾Ø§ÛŒÙ‡ ComponentStructure Ø§Ø² ComponentStructureTrait.props Ø¯Ø± _COMPONENT_PATTERN
 * Ø«Ø¨Øª Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯ ØªØ§ Ú©Ø§Ø±Ø¨Ø± Ø¨ØªÙˆØ§Ù†Ø¯ Ø¢Ù†â€ŒÙ‡Ø§ Ø±Ø§ set Ú©Ù†Ø¯.
 *
 * Plan 11.2 â€” Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø§Ø² ComponentStructureTrait.schemas
 * Ø¯Ø± _COMPONENT_SCHEMA spread Ù…ÛŒâ€ŒØ´ÙˆÙ†Ø¯ ØªØ§ Ù„Ø§ÛŒÙ‡ <component-validate> + <section> Ø±Ù†Ø¯Ø± Ø´ÙˆÙ†Ø¯.
 *
 * Plan 8.2.7 / 9.1 â€” SubEvent + Event Scope Ownership:
 *   Ù‡Ø± ComponentValidate Ù…Ø§Ù„Ú© Step Instance Ø®ÙˆØ¯Ø´ Ø§Ø³Øª.
 */
export class ComponentValidateBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {

    /**
     * Step Node â€” Ø¯Ø±Ø®Øª Workflow Ø¯Ø§Ø®Ù„ÛŒ ComponentValidate
     */
    protected _COMPONENT_STEP: TWorkflow | null = null;


    /**
     * constructor (Plan 8.2.7)
     *
     * @param componentName â€” Ù†Ø§Ù… Component (default: "validate")
     * @param elId          â€” Ø´Ù†Ø§Ø³Ù‡ Ø§Ù„Ù…Ø§Ù† (default: null)
     * @param identity      â€” Ø¨ÛŒØ±ÙˆÙ†ÛŒ { unique?, emit?, events? }
     * @param step          â€” Ø¯Ø§Ø®Ù„ÛŒ (Workflow Ø®Ø§Øµ Ø§ÛŒÙ† Component)
     */
    constructor(
        componentName: string = "validate",
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

    // Û· prop Ù¾Ø§ÛŒÙ‡ (Ø§Ø² Trait) + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentValidate
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);

    // Plan 11.2 â€” Schema Ù¾Ø§ÛŒÙ‡ (Ø§Ø² Trait) + schemaÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);

    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({
        ...Methods,
    } as any);

}
