import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputJson = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputJson.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputJson.PropsType,
    UIComponents.Lists.ComponentInputJson.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputJson.Definition, UIComponents.Lists.ComponentInputJson.Component);
