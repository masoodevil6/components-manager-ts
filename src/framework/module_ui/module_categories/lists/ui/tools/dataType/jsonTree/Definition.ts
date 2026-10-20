import {CreateCategoryComponent} from "../../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const JsonTree = CreateCategoryComponent<
    UIComponents.Lists.ComponentJsonTree.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentJsonTree.PropsType,
    UIComponents.Lists.ComponentJsonTree.MethodsConfigType<UIComponents.Lists.ComponentJsonTree.Component>
>(
    UIComponents.Lists.ComponentJsonTree.Definition,
    UIComponents.Lists.ComponentJsonTree.Component,
);
