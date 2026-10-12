import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Breadcrumb = CreateCategoryComponent<
    UIComponents.Lists.ComponentBreadcrumb.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentBreadcrumb.PropsType,
    UIComponents.Lists.ComponentBreadcrumb.MethodsConfigType<UIComponents.Lists.ComponentBreadcrumb.Component>
>(UIComponents.Lists.ComponentBreadcrumb.Definition, UIComponents.Lists.ComponentBreadcrumb.Component);
