import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputAcl=CreateCategoryComponent<
    UIComponents.Lists.ComponentInputAcl.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentInputAcl.PropsType,
    UIComponents.Lists.ComponentInputAcl.MethodsConfigType<any>
>(UIComponents.Lists.ComponentInputAcl.Definition,UIComponents.Lists.ComponentInputAcl.Component);
