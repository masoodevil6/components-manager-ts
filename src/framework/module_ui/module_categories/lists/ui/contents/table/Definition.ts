import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Table Totality — callable + .info
 *
 * استفاده:
 *   const table = UiCategory.UI.Contents.Table(config, methods, identity);
 *   table.set("prop_data", [...]);
 *   table.getElement();
 *   UiCategory.UI.Contents.Table.info  // → ComponentDefinition
 */
export const Table = CreateCategoryComponent<
    UIComponents.Lists.ComponentTable.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentTable.PropsType,
    UIComponents.Lists.ComponentTable.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentTable.Definition,
    UIComponents.Lists.ComponentTable.Component,
);
