import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputDescription = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputDescription.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputDescription.PropsType,
    UIComponents.Lists.ComponentInputDescription.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputDescription.Definition, UIComponents.Lists.ComponentInputDescription.Component);
