import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * RecyclerView Totality — callable + .info (Plan 15.1.0)
 *
 * استفاده:
 *   const rv = UiCategory.UI.Contents.RecyclerView(config, methods, identity);
 *   rv.set("prop_formDirection", "horizontal");
 *   rv.getElement();
 *   UiCategory.UI.Contents.RecyclerView.info  // → ComponentDefinition
 */
export const RecyclerView = CreateCategoryComponent<
    UIComponents.Lists.ComponentRecyclerView.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentRecyclerView.PropsType,
    UIComponents.Lists.ComponentRecyclerView.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentRecyclerView.Definition,
    UIComponents.Lists.ComponentRecyclerView.Component,
);
