import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Button Totality — callable + .info
 *
 * استفاده:
 *   const button = UiCategory.UI.Simples.Button(config, methods, identity);
 *   button.set("prop_btnTitle", ...);
 *   button.getElement();
 *   UiCategory.UI.Simples.Button.info  // → ComponentDefinition
 */
export const Button = CreateCategoryComponent<
    UIComponents.Lists.ComponentButton.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentButton.PropsType,
    UIComponents.Lists.ComponentButton.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentButton.Definition,
    UIComponents.Lists.ComponentButton.Component,
);
