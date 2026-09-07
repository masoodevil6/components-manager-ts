import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Border Totality — callable + .info
 *
 * استفاده:
 *   const border = UiCategory.UI.Contents.Border(config, methods, identity);
 *   border.set("prop_content", ...);   // ← set روی instance
 *   border.getElement();                // ← HTMLElement برای DOM
 *   UiCategory.UI.Contents.Border.info  // → ComponentDefinition
 */
export const Border = CreateCategoryComponent<
    UIComponents.Lists.ComponentBorder.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentBorder.PropsType,
    UIComponents.Lists.ComponentBorder.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentBorder.Definition,
    UIComponents.Lists.ComponentBorder.Component,
);
