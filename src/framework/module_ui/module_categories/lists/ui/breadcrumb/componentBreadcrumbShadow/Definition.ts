import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const BreadcrumbShadow = CreateCategoryComponent<
    UIComponents.Lists.ComponentBreadcrumbShadow.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentBreadcrumbShadow.PropsType,
    UIComponents.Lists.ComponentBreadcrumbShadow.MethodsConfigType<UIComponents.Lists.ComponentBreadcrumbShadow.Component>
>(UIComponents.Lists.ComponentBreadcrumbShadow.Definition, UIComponents.Lists.ComponentBreadcrumbShadow.Component);
