import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * ErrorIsEmpty Totality — callable + .info
 *
 * استفاده:
 *   const errorIsEmpty = UiCategory.UI.Contents.ErrorIsEmpty(config, methods, identity);
 *   errorIsEmpty.set("prop_title", ...);
 *   errorIsEmpty.getElement();
 *   UiCategory.UI.Contents.ErrorIsEmpty.info  // → ComponentDefinition
 */
export const ErrorIsEmpty = CreateCategoryComponent<
    UIComponents.Lists.ComponentErrorIsEmpty.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentErrorIsEmpty.PropsType,
    UIComponents.Lists.ComponentErrorIsEmpty.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentErrorIsEmpty.Definition,
    UIComponents.Lists.ComponentErrorIsEmpty.Component,
);
