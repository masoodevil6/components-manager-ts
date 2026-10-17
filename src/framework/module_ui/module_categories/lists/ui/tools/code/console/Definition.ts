import {CreateCategoryComponent} from "../../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Console = CreateCategoryComponent<
    UIComponents.Lists.ComponentConsole.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentConsole.PropsType,
    UIComponents.Lists.ComponentConsole.MethodsConfigType<UIComponents.Lists.ComponentConsole.Component>
>(
    UIComponents.Lists.ComponentConsole.Definition,
    UIComponents.Lists.ComponentConsole.Component,
);
