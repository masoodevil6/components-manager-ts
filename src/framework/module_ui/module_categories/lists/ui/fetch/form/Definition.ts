import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import {Keys} from "../../../../languages";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const Form = CreateCategoryComponent<
    UIComponents.Lists.ComponentForm.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentForm.PropsType,
    UIComponents.Lists.ComponentForm.MethodsConfigType<UIComponents.Lists.ComponentForm.Component>
>(UIComponents.Lists.ComponentForm.Definition, UIComponents.Lists.ComponentForm.Component);

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "form",
    name: Keys.category.components.fetch.form.name,
    description: Keys.category.components.fetch.form.description,
    components: [Form as any],
};
