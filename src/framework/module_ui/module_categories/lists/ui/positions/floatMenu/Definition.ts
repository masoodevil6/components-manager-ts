import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * FloatMenu Totality — callable + .info
 *
 * استفاده:
 *   const floatMenu = UiCategory.UI.Positions.FloatMenu(config, methods, identity);
 *   floatMenu.set("prop_floatIsShow", ...);   // ← set روی instance
 *   floatMenu.getElement();                    // ← HTMLElement برای DOM
 *   UiCategory.UI.Positions.FloatMenu.info  // → ComponentDefinition
 */
export const FloatMenu = CreateCategoryComponent<
    UIComponents.Lists.ComponentFloatMenu.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentFloatMenu.PropsType,
    UIComponents.Lists.ComponentFloatMenu.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentFloatMenu.Definition,
    UIComponents.Lists.ComponentFloatMenu.Component,
);
