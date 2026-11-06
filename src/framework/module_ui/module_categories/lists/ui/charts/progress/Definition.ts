import type {TCategoryComponentDefinition} from "@/ui_categories";
import type {TObservableValue} from "@/core_observable";
import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const ProgressLinear = CreateCategoryComponent<
    UIComponents.Lists.ComponentProgressLinear.Component,
    Omit<UIComponents.Lists.ComponentStructure.PropsType, "prop_show"> & {prop_show: TObservableValue<boolean>} & UIComponents.Lists.ComponentProgressLinear.PropsConfigType,
    UIComponents.Lists.ComponentProgressLinear.MethodsConfigType<any>
>(UIComponents.Lists.ComponentProgressLinear.Definition, UIComponents.Lists.ComponentProgressLinear.Component);

export const Definition: TCategoryComponentDefinition = {
    id: "progress",
    name: Keys.category.components.charts.progress.name,
    description: Keys.category.components.charts.progress.description,
    components: [ProgressLinear],
};
