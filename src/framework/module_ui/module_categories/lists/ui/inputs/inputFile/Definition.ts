import * as UICategories from "@/ui_categories";
import * as UIComponents from "../../../../../module_components/lists";

export const InputFile = UICategories.CreateCategoryComponent<
    UIComponents.ComponentInputFile.Component,
    UIComponents.ComponentStructure.PropsType & UIComponents.ComponentInputFile.PropsType,
    UIComponents.ComponentInputFile.MethodsConfigType<any>
>(UIComponents.ComponentInputFile.Definition, UIComponents.ComponentInputFile.Component) as any;
