import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Tabs Totality — callable + .info (Plan 15.1.0)
 *
 * استفاده:
 *   const tabs = UiCategory.UI.Contents.Tabs(config, methods, identity);
 *   tabs.set("prop_tabSelected", 2);
 *   tabs.getElement();
 *   UiCategory.UI.Contents.Tabs.info  // → ComponentDefinition
 */
export const Tabs = CreateCategoryComponent<
    UIComponents.Lists.ComponentTabs.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentTabs.PropsType,
    UIComponents.Lists.ComponentTabs.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentTabs.Definition,
    UIComponents.Lists.ComponentTabs.Component,
);
