import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Tooltip Totality — callable + .info
 *
 * استفاده:
 *   const tooltip = UiCategory.UI.Positions.Tooltip(config, methods, identity);
 *   tooltip.set("prop_tooltipDescription", ...);   // ← set روی instance
 *   tooltip.getElement();                           // ← HTMLElement برای DOM
 *   UiCategory.UI.Positions.Tooltip.info            // → ComponentDefinition
 */
export const Tooltip = CreateCategoryComponent<
    UIComponents.Lists.ComponentTooltip.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentTooltip.PropsType,
    UIComponents.Lists.ComponentTooltip.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentTooltip.Definition,
    UIComponents.Lists.ComponentTooltip.Component,
);
