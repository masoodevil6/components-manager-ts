import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Label Totality — callable + .info (Plan 13.1.0)
 *
 * استفاده:
 *   const label = UiCategory.UI.Simples.Label(config, methods, identity);
 *   label.set("prop_labelTitle", ...);
 *   label.getElement();
 *   UiCategory.UI.Simples.Label.info  // → ComponentDefinition
 */
export const Label = CreateCategoryComponent<
    UIComponents.Lists.ComponentLabel.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentLabel.PropsType,
    UIComponents.Lists.ComponentLabel.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentLabel.Definition,
    UIComponents.Lists.ComponentLabel.Component,
);