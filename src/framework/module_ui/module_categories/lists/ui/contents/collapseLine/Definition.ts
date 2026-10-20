import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const CollapseLine = CreateCategoryComponent<
    UIComponents.Lists.ComponentCollapseLine.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCollapseLine.PropsType,
    UIComponents.Lists.ComponentCollapseLine.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentCollapseLine.Definition,
    UIComponents.Lists.ComponentCollapseLine.Component,
);
