import * as UICategories    from "@/ui_categories"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Icon Totality — callable + .info
 *
 * استفاده:
 *   const icon = UiCategory.UI.Simples.Icon(config, methods, identity);
 *   icon.set("prop_icon", ...);     // ← set روی instance
 *   icon.getElement();               // ← HTMLElement برای DOM
 *   UiCategory.UI.Simples.Icon.info  // → ComponentDefinition
 *
 * Type Safety:
 *   config  — Partial<StructurePropsType & IconPropsType> (autocomplete دارد)
 *   methods — MethodsConfigType (autocomplete دارد برای CLICK/HOVER/BLUR + event/dataArgs/componentArgs)
 *
 * نکته: TThis در MethodsConfigType در اینجا any است چون ComponentIcon در این فایل
 * قابل import نیست (circular dependency). autocomplete برای this در constructor
 * ComponentIcon با MethodsConfigType<ComponentIcon> فعال است.
 */
export const Icon = UICategories.CreateCategoryComponent<
    UIComponents.Lists.ComponentIcon.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentIcon.PropsType,
    UIComponents.Lists.ComponentIcon.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentIcon.Definition,
    UIComponents.Lists.ComponentIcon.Component,
);
