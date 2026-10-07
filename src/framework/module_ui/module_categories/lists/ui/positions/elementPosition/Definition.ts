import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents from "@/ui_components";

export const ElementPosition = CreateCategoryComponent<
    UIComponents.Lists.ComponentElementPosition.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentElementPosition.PropsType,
    UIComponents.Lists.ComponentElementPosition.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentElementPosition.Definition,
    UIComponents.Lists.ComponentElementPosition.Component,
);
