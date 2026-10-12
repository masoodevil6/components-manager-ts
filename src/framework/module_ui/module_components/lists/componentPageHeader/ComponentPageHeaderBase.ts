import * as CoreComponents from "@/core_components";
import * as CoreEvent from "@/core_event";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Definition} from "./Definition";
import {Props, type PropsType} from "./Props";
import {Schemas, type SchemasType} from "./Schemas";
import {Methods, type MethodsType} from "./Methods";

export class ComponentPageHeaderBase extends CoreComponents.App<PropsType & Record<string, any>, SchemasType, any, MethodsType> {
    protected _COMPONENT_STEP: CoreEvent.TStepInstance<any> | null = null;

    constructor(identity?: {unique?: CoreEvent.TStepRef | null; emit?: CoreEvent.TEmitHandler | null}, step?: CoreEvent.TStepInstance<any>) {
        super("pageHeader", null);
        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT = identity?.emit ?? null;
        this._COMPONENT_STEP = step ?? null;
        if (step && identity?.unique && typeof (identity.unique as any).identity === "symbol") CoreEvent.SubEvent(identity.unique, "pageHeader", step);
    }

    protected disposeStep(): void {
        if (!this._COMPONENT_STEP) return;
        CoreEvent.dispose(this._COMPONENT_STEP);
        this._COMPONENT_STEP = null;
    }

    protected _COMPONENT_DEFINITION = Definition;
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({...ComponentStructureTrait.props, ...Props} as any);
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({...ComponentStructureTrait.schemas, ...Schemas} as any);
    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({...Methods} as any);
}
