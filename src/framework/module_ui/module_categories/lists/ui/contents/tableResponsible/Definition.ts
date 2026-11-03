import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const TableResponsible = CreateCategoryComponent<
    UIComponents.Lists.ComponentTableResponsible.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentTableResponsible.PropsType,
    UIComponents.Lists.ComponentTableResponsible.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentTableResponsible.Definition,
    UIComponents.Lists.ComponentTableResponsible.Component,
);
