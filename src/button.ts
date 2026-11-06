/** Focused public entry point for consumers that only need the Button component. */
import {CreateCategoryComponent} from "./framework/module_ui/module_categories/basic/methods";
import {ComponentButton} from "./framework/module_ui/module_components/lists/componentButton/ComponentButton";
import {Definition} from "./framework/module_ui/module_components/lists/componentButton/Definition";
import type {PropsType as StructurePropsType} from "./framework/module_ui/module_components/lists/componentStructure/Props";
import type {PropsType as ButtonPropsType} from "./framework/module_ui/module_components/lists/componentButton/Props";
import type {MethodsConfigType} from "./framework/module_ui/module_components/lists/componentButton/Methods";
import type {ComponentDefinition} from "./framework/module_core/module_components";

export type ButtonIdentity = {unique?: any; emit?: any; events?: Record<string, any> | null};
export type ButtonFactory = ((
    config?: Partial<StructurePropsType & ButtonPropsType>,
    methods?: MethodsConfigType<ComponentButton>,
    identity?: ButtonIdentity,
) => ComponentButton) & {info: ComponentDefinition};

export const Button: ButtonFactory = CreateCategoryComponent<
    ComponentButton,
    StructurePropsType & ButtonPropsType,
    MethodsConfigType<ComponentButton>
>(Definition, ComponentButton) as ButtonFactory;
