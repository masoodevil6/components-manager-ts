import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputSize = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputSize.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputSize.PropsType,
    UIComponents.Lists.ComponentInputSize.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputSize.Definition, UIComponents.Lists.ComponentInputSize.Component);
