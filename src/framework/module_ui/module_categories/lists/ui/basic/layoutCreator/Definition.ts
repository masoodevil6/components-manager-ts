import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const LayoutCreator = CreateCategoryComponent<
    UIComponents.Lists.ComponentLayoutCreator.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentLayoutCreator.PropsConfigType,
    Record<string, any>
>(
    UIComponents.Lists.ComponentLayoutCreator.Definition,
    UIComponents.Lists.ComponentLayoutCreator.Component,
);
