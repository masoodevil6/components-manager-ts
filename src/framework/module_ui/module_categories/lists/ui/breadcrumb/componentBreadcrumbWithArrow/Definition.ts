import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const BreadcrumbWithArrow = CreateCategoryComponent<
    UIComponents.Lists.ComponentBreadcrumbWithArrow.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentBreadcrumbWithArrow.PropsType,
    UIComponents.Lists.ComponentBreadcrumbWithArrow.MethodsConfigType<UIComponents.Lists.ComponentBreadcrumbWithArrow.Component>
>(UIComponents.Lists.ComponentBreadcrumbWithArrow.Definition, UIComponents.Lists.ComponentBreadcrumbWithArrow.Component);
