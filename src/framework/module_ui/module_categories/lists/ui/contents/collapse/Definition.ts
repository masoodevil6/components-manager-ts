import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Collapse Totality — callable + .info (Plan 15.1.0)
 *
 * استفاده:
 *   const collapse = UiCategory.UI.Contents.Collapse(config, methods, identity);
 *   collapse.set("prop_collapseTitle", ...);
 *   collapse.getElement();
 *   UiCategory.UI.Contents.Collapse.info  // → ComponentDefinition
 */
export const Collapse = CreateCategoryComponent<
    UIComponents.Lists.ComponentCollapse.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentCollapse.PropsType,
    UIComponents.Lists.ComponentCollapse.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentCollapse.Definition,
    UIComponents.Lists.ComponentCollapse.Component,
);
