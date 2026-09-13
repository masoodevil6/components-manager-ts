import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Window Totality — callable + .info
 *
 * استفاده:
 *   const window = UiCategory.UI.Contents.Window(config, methods, identity);
 *   window.set("prop_title", ...);
 *   window.getElement();
 *   UiCategory.UI.Contents.Window.info  // → ComponentDefinition
 */
export const Window = CreateCategoryComponent<
    UIComponents.Lists.ComponentWindow.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentWindow.PropsType,
    UIComponents.Lists.ComponentWindow.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentWindow.Definition,
    UIComponents.Lists.ComponentWindow.Component,
);
