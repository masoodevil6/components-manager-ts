import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * MouseScroller Totality — callable + .info
 *
 * استفاده:
 *   const scroller = UiCategory.UI.Contents.MouseScroller(config, methods, identity);
 *   scroller.set("prop_zoom", 1.5);
 *   scroller.getElement();
 *   UiCategory.UI.Contents.MouseScroller.info  // → ComponentDefinition
 */
export const MouseScroller = CreateCategoryComponent<
    UIComponents.Lists.ComponentMouseScroller.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentMouseScroller.PropsType,
    UIComponents.Lists.ComponentMouseScroller.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentMouseScroller.Definition,
    UIComponents.Lists.ComponentMouseScroller.Component,
);
