import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const DraggableOrdersY = CreateCategoryComponent<
    UIComponents.Lists.ComponentDraggableOrdersY.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentDraggableOrdersY.PropsType,
    UIComponents.Lists.ComponentDraggableOrdersY.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentDraggableOrdersY.Definition,
    UIComponents.Lists.ComponentDraggableOrdersY.Component,
);

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "draggable",
    name: Keys.category.components.tools.draggable.name,
    description: Keys.category.components.tools.draggable.description,
    components: [DraggableOrdersY as any],
};
