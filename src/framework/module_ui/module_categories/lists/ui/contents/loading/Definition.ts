import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Loading Totality — callable + .info
 *
 * استفاده:
 *   const loading = UiCategory.UI.Contents.Loading(config, methods, identity);
 *   loading.set("prop_show", false);
 *   loading.getElement();
 *   UiCategory.UI.Contents.Loading.info  // → ComponentDefinition
 */
export const Loading = CreateCategoryComponent<
    UIComponents.Lists.ComponentLoading.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentLoading.PropsType,
    UIComponents.Lists.ComponentLoading.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentLoading.Definition,
    UIComponents.Lists.ComponentLoading.Component,
);
