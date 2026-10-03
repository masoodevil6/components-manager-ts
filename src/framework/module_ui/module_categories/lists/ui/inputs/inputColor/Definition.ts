import * as UICategories from "@/ui_categories";
import * as UIComponents from "../../../../../module_components/lists";

export const InputColor = UICategories.CreateCategoryComponent<
    UIComponents.ComponentInputColor.Component,
    UIComponents.ComponentStructure.PropsType & UIComponents.ComponentInputColor.PropsType,
    UIComponents.ComponentInputColor.MethodsConfigType<any>
>(
    UIComponents.ComponentInputColor.Definition,
    UIComponents.ComponentInputColor.Component,
);
