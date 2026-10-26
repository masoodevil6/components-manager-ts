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
 * ComponentListSelectedScrollerBase â€” ØªØ±Ú©ÛŒØ¨ config Ù¾Ø§ÛŒÙ‡ Ùˆ Ø§Ø®ØªØµØ§ØµÛŒ
 */
export class ComponentListSelectedScrollerBase<TWorkflow extends CoreComponents.ComponentWorkflow<any> = CoreComponents.ComponentWorkflow> extends CoreComponents.App<
    PropsType & Record<string, any>,
    SchemasType,
    any,
    MethodsType,
    TWorkflow> {

    protected _COMPONENT_STEP: TWorkflow | null = null;

    constructor(
        componentName: string = "list-selected-scroller",
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
