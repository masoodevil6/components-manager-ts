import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


export const InputListSelector = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputListSelector.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentInputListSelector.PropsType,
    UIComponents.Lists.ComponentInputListSelector.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentInputListSelector.Definition,
    UIComponents.Lists.ComponentInputListSelector.Component,
);
