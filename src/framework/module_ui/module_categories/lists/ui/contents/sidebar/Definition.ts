import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Sidebar Totality — callable + .info
 *
 * استفاده:
 *   const sidebar = UiCategory.UI.Contents.Sidebar(config, methods, identity);
 *   sidebar.set("prop_sidebarIsOpen", true);
 *   sidebar.getElement();
 *   UiCategory.UI.Contents.Sidebar.info  // → ComponentDefinition
 */
export const Sidebar = CreateCategoryComponent<
    UIComponents.Lists.ComponentSidebar.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentSidebar.PropsType,
    UIComponents.Lists.ComponentSidebar.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentSidebar.Definition,
    UIComponents.Lists.ComponentSidebar.Component,
);
