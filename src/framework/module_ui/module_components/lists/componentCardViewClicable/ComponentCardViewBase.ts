import * as CoreComponents from "@/core_components";
import * as CoreEvent from "@/core_event";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props, PropsType} from "./Props";
import {Schemas, SchemasType} from "./Schemas";
import {Methods, MethodsType} from "./Methods";
import {Definition} from "./Definition";

export class ComponentCardViewBase extends CoreComponents.App<
    PropsType & Record<string, any>, SchemasType, any, MethodsType
> {
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;

    constructor(
        step?: CoreEvent.TStepInstance<any>,
        identity?: {unique?: CoreEvent.TStepRef | null; emit?: CoreEvent.TEmitHandler | null},
    ) {
        super("cardViewClicable", null);
        this._COMPONENT_STEP = step ?? null;
        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT = identity?.emit ?? null;
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") {
            CoreEvent.SubEvent(identity.unique as CoreEvent.TStepRef, "cardViewClicable", step);
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
    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({...Methods} as any);
}
