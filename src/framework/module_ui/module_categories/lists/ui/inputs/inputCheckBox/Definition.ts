import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


export const InputCheckBox = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputCheckBox.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentInputCheckBox.PropsType,
    UIComponents.Lists.ComponentInputCheckBox.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentInputCheckBox.Definition,
    UIComponents.Lists.ComponentInputCheckBox.Component,
);
