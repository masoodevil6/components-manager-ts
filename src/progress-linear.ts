/** Focused public entry point for consumers that only need ProgressLinear. */
import {CreateCategoryComponent} from "./framework/module_ui/module_categories/basic/methods";
import {ComponentProgressLinear} from "./framework/module_ui/module_components/lists/componentProgressLinear/ComponentProgressLinear";
import {Definition} from "./framework/module_ui/module_components/lists/componentProgressLinear/Definition";
import type {ObservableValue as TObservableValue} from "./framework/module_core/module_observable/types";
import type {PropsType as StructurePropsType} from "./framework/module_ui/module_components/lists/componentStructure/Props";
import type {PropsConfigType as ProgressPropsType, ProgressStatus} from "./framework/module_ui/module_components/lists/componentProgressLinear/Props";
import type {MethodsConfigType} from "./framework/module_ui/module_components/lists/componentProgressLinear/Methods";
import type {ComponentDefinition} from "./framework/module_core/module_components";

export type ProgressLinearIdentity = {unique?: any; emit?: any; events?: Record<string, any> | null};
export type ProgressLinearConfig = Partial<Omit<StructurePropsType, "prop_show"> & {prop_show: TObservableValue<boolean>} & ProgressPropsType>;
export type ProgressLinearFactory = ((
    config?: ProgressLinearConfig,
    methods?: MethodsConfigType<ComponentProgressLinear>,
    identity?: ProgressLinearIdentity,
) => ComponentProgressLinear) & {info: ComponentDefinition};

export const ProgressLinear: ProgressLinearFactory = CreateCategoryComponent<
    ComponentProgressLinear,
    Omit<StructurePropsType, "prop_show"> & {prop_show: TObservableValue<boolean>} & ProgressPropsType,
    MethodsConfigType<ComponentProgressLinear>
>(Definition, ComponentProgressLinear) as ProgressLinearFactory;

export type {ProgressStatus};
