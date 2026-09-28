import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const SelectCustomSimple = CreateCategoryComponent<
    UIComponents.Lists.ComponentSelectCustomSimple.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentSelectCustomSimple.PropsType,
    UIComponents.Lists.ComponentSelectCustomSimple.MethodsConfigType<any>
>(UIComponents.Lists.ComponentSelectCustomSimple.Definition, UIComponents.Lists.ComponentSelectCustomSimple.Component);
