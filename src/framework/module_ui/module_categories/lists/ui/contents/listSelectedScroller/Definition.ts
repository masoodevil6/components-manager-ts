import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * ListSelectedScroller Totality — callable + .info
 *
 * استفاده:
 *   const scroller = UiCategory.UI.Contents.ListSelectedScroller(config, methods, identity);
 *   scroller.set("prop_value", [1, 2]);
 *   scroller.getElement();
 *   UiCategory.UI.Contents.ListSelectedScroller.info  // → ComponentDefinition
 */
export const ListSelectedScroller = CreateCategoryComponent<
    UIComponents.Lists.ComponentListSelectedScroller.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentListSelectedScroller.PropsType,
    UIComponents.Lists.ComponentListSelectedScroller.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentListSelectedScroller.Definition,
    UIComponents.Lists.ComponentListSelectedScroller.Component,
);
