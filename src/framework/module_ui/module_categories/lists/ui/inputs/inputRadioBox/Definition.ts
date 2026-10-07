import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputRadioBox = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputRadioBox.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputRadioBox.PropsType,
    UIComponents.Lists.ComponentInputRadioBox.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputRadioBox.Definition, UIComponents.Lists.ComponentInputRadioBox.Component);
