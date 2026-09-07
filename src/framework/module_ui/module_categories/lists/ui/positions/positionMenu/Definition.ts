import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * PositionMenu Totality — callable + .info
 *
 * استفاده:
 *   const positionMenu = UiCategory.UI.Positions.PositionMenu(config, methods, identity);
 *   positionMenu.set("prop_menuIsOpen", ...);   // ← set روی instance
 *   positionMenu.getElement();                    // ← HTMLElement برای DOM
 *   UiCategory.UI.Positions.PositionMenu.info  // → ComponentDefinition
 */
export const PositionMenu = CreateCategoryComponent<
    UIComponents.Lists.ComponentPositionMenu.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentPositionMenu.PropsType,
    UIComponents.Lists.ComponentPositionMenu.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentPositionMenu.Definition,
    UIComponents.Lists.ComponentPositionMenu.Component,
);
