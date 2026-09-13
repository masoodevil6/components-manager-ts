import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * WindowConfirm Totality — callable + .info
 *
 * استفاده:
 *   const confirm = UiCategory.UI.Contents.WindowConfirm(config, methods, identity);
 *   confirm.set("prop_message", ...);
 *   confirm.getElement();
 *   UiCategory.UI.Contents.WindowConfirm.info  // → ComponentDefinition
 */
export const WindowConfirm = CreateCategoryComponent<
    UIComponents.Lists.ComponentWindowConfirm.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentWindowConfirm.PropsType,
    UIComponents.Lists.ComponentWindowConfirm.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentWindowConfirm.Definition,
    UIComponents.Lists.ComponentWindowConfirm.Component,
);
