import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Effective = CreateCategoryComponent<
    UIComponents.Lists.ComponentEffective.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentEffective.PropsType,
    UIComponents.Lists.ComponentEffective.MethodsConfigType<UIComponents.Lists.ComponentEffective.Component>
>(
    UIComponents.Lists.ComponentEffective.Definition,
    UIComponents.Lists.ComponentEffective.Component,
);
