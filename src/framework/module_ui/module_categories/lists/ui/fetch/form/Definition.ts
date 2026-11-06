import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import {Keys} from "../../../../languages";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const Form = CreateCategoryComponent<
    UIComponents.Lists.ComponentForm.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentForm.PropsType,
    UIComponents.Lists.ComponentForm.MethodsConfigType<UIComponents.Lists.ComponentForm.Component>
>(UIComponents.Lists.ComponentForm.Definition, UIComponents.Lists.ComponentForm.Component);

export const CustomForm = CreateCategoryComponent<
    UIComponents.Lists.ComponentCustomForm.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentCustomForm.PropsType,
    UIComponents.Lists.ComponentCustomForm.MethodsConfigType<UIComponents.Lists.ComponentCustomForm.Component>
>(UIComponents.Lists.ComponentCustomForm.Definition, UIComponents.Lists.ComponentCustomForm.Component);

export const Widget = CreateCategoryComponent<
    UIComponents.Lists.ComponentWidget.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentWidget.PropsType,
    UIComponents.Lists.ComponentWidget.MethodsConfigType<UIComponents.Lists.ComponentWidget.Component>
>(UIComponents.Lists.ComponentWidget.Definition, UIComponents.Lists.ComponentWidget.Component);

export const Iframe = CreateCategoryComponent<
    UIComponents.Lists.ComponentIframe.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentIframe.PropsType,
    UIComponents.Lists.ComponentIframe.MethodsConfigType<UIComponents.Lists.ComponentIframe.Component>
>(UIComponents.Lists.ComponentIframe.Definition, UIComponents.Lists.ComponentIframe.Component);

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "form",
    name: Keys.category.components.fetch.form.name,
    description: Keys.category.components.fetch.form.description,
    components: [Form as any, CustomForm as any, Widget as any, Iframe as any],
};
