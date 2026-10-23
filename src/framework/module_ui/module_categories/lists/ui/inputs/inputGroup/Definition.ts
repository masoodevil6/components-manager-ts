import { CreateCategoryComponent } from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const InputGroup = CreateCategoryComponent<
  UIComponents.Lists.ComponentInputGroup.Component,
  UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentInputGroup.PropsType,
  UIComponents.Lists.ComponentInputGroup.MethodsConfigType<UIComponents.Lists.ComponentInputGroup.Component>
>(
  UIComponents.Lists.ComponentInputGroup.Definition,
  UIComponents.Lists.ComponentInputGroup.Component,
);
