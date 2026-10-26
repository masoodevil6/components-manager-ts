import * as CoreComponents from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Props, PropsType} from "./Props";
import {Schemas, SchemasType} from "./Schemas";
import {Methods, MethodsType} from "./Methods";
import {Definition} from "./Definition";

export class ComponentIframeBase extends CoreComponents.App<PropsType & Record<string, any>, SchemasType, any, MethodsType, CoreComponents.ComponentWorkflow> {
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

    constructor(identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super("iframe", null);
        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT = identity?.emit ?? null;
    }
}
