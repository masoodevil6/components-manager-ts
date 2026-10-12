import {CreateCategoryComponent} from "../../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const CodeMirror = CreateCategoryComponent<
    UIComponents.Lists.ComponentCodeMirror.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCodeMirror.PropsType,
    UIComponents.Lists.ComponentCodeMirror.MethodsConfigType<UIComponents.Lists.ComponentCodeMirror.Component>
>(
    UIComponents.Lists.ComponentCodeMirror.Definition,
    UIComponents.Lists.ComponentCodeMirror.Component,
);
