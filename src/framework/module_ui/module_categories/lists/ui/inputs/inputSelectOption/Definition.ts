import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputSelectOption = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputSelectOption.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputSelectOption.PropsType,
    UIComponents.Lists.ComponentInputSelectOption.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputSelectOption.Definition, UIComponents.Lists.ComponentInputSelectOption.Component);
