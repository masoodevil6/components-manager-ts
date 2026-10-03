import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const Workflow = CreateCategoryComponent<
    UIComponents.Lists.ComponentWorkflow.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentWorkflow.PropsType,
    Record<string, never>
>(
    UIComponents.Lists.ComponentWorkflow.Definition,
    UIComponents.Lists.ComponentWorkflow.Component,
);
