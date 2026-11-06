/** Focused public entry point for consumers that only need JsonTree. */
import {CreateCategoryComponent} from "./framework/module_ui/module_categories/basic/methods";
import {ComponentJsonTree} from "./framework/module_ui/module_components/lists/componentJsonTree/ComponentJsonTree";
import {Definition} from "./framework/module_ui/module_components/lists/componentJsonTree/Definition";
import type {PropsType as StructurePropsType} from "./framework/module_ui/module_components/lists/componentStructure/Props";
import type {PropsConfigType as JsonTreePropsType} from "./framework/module_ui/module_components/lists/componentJsonTree/Props";
import type {JsonValue} from "./framework/module_ui/module_components/lists/componentJsonTree/Types";
import type {MethodsConfigType} from "./framework/module_ui/module_components/lists/componentJsonTree/Methods";
import type {ComponentDefinition} from "./framework/module_core/module_components";

export type JsonTreeIdentity = {unique?: any; emit?: any; events?: Record<string, any> | null};
export type JsonTreeConfig = Partial<StructurePropsType & JsonTreePropsType>;
export type JsonTreeFactory = ((
    config?: JsonTreeConfig,
    methods?: MethodsConfigType<ComponentJsonTree>,
    identity?: JsonTreeIdentity,
) => ComponentJsonTree) & {info: ComponentDefinition};

export const JsonTree: JsonTreeFactory = CreateCategoryComponent<
    ComponentJsonTree,
    StructurePropsType & JsonTreePropsType,
    MethodsConfigType<ComponentJsonTree>
>(Definition, ComponentJsonTree) as JsonTreeFactory;

export type {JsonValue};
