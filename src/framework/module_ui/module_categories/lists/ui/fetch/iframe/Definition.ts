import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import {Keys} from "../../../../languages";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const Iframe = CreateCategoryComponent<
    UIComponents.Lists.ComponentIframe.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentIframe.PropsType,
    UIComponents.Lists.ComponentIframe.MethodsConfigType<UIComponents.Lists.ComponentIframe.Component>
>(UIComponents.Lists.ComponentIframe.Definition, UIComponents.Lists.ComponentIframe.Component);

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "iframe",
    name: Keys.category.components.fetch.iframe.name,
    description: Keys.category.components.fetch.iframe.description,
    components: [Iframe as any],
};
