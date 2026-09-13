import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * WebCode Totality — callable + .info
 *
 * استفاده:
 *   const webCode = UiCategory.UI.Contents.WebCode(config, methods, identity);
 *   webCode.set("prop_icon", ...);
 *   webCode.getElement();
 *   UiCategory.UI.Contents.WebCode.info  // → ComponentDefinition
 */
export const WebCode = CreateCategoryComponent<
    UIComponents.Lists.ComponentWebCode.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentWebCode.PropsType,
    UIComponents.Lists.ComponentWebCode.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentWebCode.Definition,
    UIComponents.Lists.ComponentWebCode.Component,
);
