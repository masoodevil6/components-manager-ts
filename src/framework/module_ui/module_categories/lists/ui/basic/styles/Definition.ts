import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";

export const Styles = CreateCategoryComponent<
    UIComponents.Lists.ComponentStyles.Component,
    UIComponents.Lists.ComponentStyles.PropsType,
    Record<string, any>
>(
    UIComponents.Lists.ComponentStyles.Definition,
    UIComponents.Lists.ComponentStyles.Component,
);
