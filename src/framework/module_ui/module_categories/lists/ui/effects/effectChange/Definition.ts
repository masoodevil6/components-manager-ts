import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const EffectChange = CreateCategoryComponent<
    UIComponents.Lists.ComponentEffectChange.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentEffectChange.PropsType,
    UIComponents.Lists.ComponentEffectChange.MethodsConfigType<UIComponents.Lists.ComponentEffectChange.Component>
>(
    UIComponents.Lists.ComponentEffectChange.Definition,
    UIComponents.Lists.ComponentEffectChange.Component,
);
