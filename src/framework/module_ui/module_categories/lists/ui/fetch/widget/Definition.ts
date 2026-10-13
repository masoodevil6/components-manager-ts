import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import {Keys} from "../../../../languages";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const Widget = CreateCategoryComponent<
    UIComponents.Lists.ComponentWidget.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentWidget.PropsType,
    UIComponents.Lists.ComponentWidget.MethodsConfigType<UIComponents.Lists.ComponentWidget.Component>
>(UIComponents.Lists.ComponentWidget.Definition, UIComponents.Lists.ComponentWidget.Component);

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "widget",
    name: Keys.category.components.fetch.widget.name,
    description: Keys.category.components.fetch.widget.description,
    components: [Widget as any],
};
