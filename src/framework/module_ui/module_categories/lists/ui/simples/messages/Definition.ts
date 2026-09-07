import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Messages Totality — callable + .info
 *
 * استفاده:
 *   const msgs = UiCategory.UI.Simples.Messages(config, methods, identity);
 *   msgs.set("prop_type", "error");        // ← set روی instance
 *   msgs.getElement();                       // ← HTMLElement برای DOM
 *   UiCategory.UI.Simples.Messages.info      // → ComponentDefinition
 *
 * Type Safety:
 *   config  — Partial<StructurePropsType & MessagesPropsType> (autocomplete دارد)
 *   methods — MethodsConfigType (autocomplete دارد برای CLOSE_MESSAGE + event/dataArgs/componentArgs)
 */
export const Messages = CreateCategoryComponent<
    UIComponents.Lists.ComponentMessages.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentMessages.PropsType,
    UIComponents.Lists.ComponentMessages.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentMessages.Definition,
    UIComponents.Lists.ComponentMessages.Component,
);
