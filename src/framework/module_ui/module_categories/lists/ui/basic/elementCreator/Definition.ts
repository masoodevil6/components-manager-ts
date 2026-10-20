import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const ElementCreator = CreateCategoryComponent<
    UIComponents.Lists.ComponentElementCreator.Component,
    UIComponents.Lists.ComponentElementCreator.PropsType,
    UIComponents.Lists.ComponentElementCreator.MethodsConfigType<UIComponents.Lists.ComponentElementCreator.Component>
>(
    UIComponents.Lists.ComponentElementCreator.Definition,
    UIComponents.Lists.ComponentElementCreator.Component,
);
