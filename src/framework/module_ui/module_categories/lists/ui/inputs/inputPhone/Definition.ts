import * as UICategories from "@/ui_categories";
import * as UIComponents from "../../../../../module_components/lists";

export const InputPhone = UICategories.CreateCategoryComponent<
    UIComponents.ComponentInputPhone.Component,
    UIComponents.ComponentStructure.PropsType & UIComponents.ComponentInputPhone.PropsType,
    UIComponents.ComponentInputPhone.MethodsConfigType<any>
>(UIComponents.ComponentInputPhone.Definition, UIComponents.ComponentInputPhone.Component);
