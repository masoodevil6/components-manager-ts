import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


/**
 * Validate Totality — callable + .info (Plan 15.1.0)
 *
 * استفاده:
 *   const validate = UiCategory.UI.Inputs.Validate(config, methods, identity);
 *   validate.set("prop_listRules", [...]);
 *   validate.getElement();
 *   UiCategory.UI.Inputs.Validate.info  // → ComponentDefinition
 */
export const Validate = CreateCategoryComponent<
    UIComponents.Lists.ComponentValidate.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentValidate.PropsType,
    UIComponents.Lists.ComponentValidate.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentValidate.Definition,
    UIComponents.Lists.ComponentValidate.Component,
);
