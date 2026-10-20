import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputDescriptionSimple = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputDescriptionSimple.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputDescriptionSimple.PropsType,
    UIComponents.Lists.ComponentInputDescriptionSimple.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputDescriptionSimple.Definition, UIComponents.Lists.ComponentInputDescriptionSimple.Component);
