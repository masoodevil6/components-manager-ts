import * as UICategories from "@/ui_categories";
import * as UIComponents from "@/ui_components";
import * as CoreReactive from "@/core_reactive";
import {CreateCategoryComponent} from "../../../../basic/methods";

type LayoutConfig = UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentLayout.PropsConfigType & {
        content?: () => CoreReactive.App;
    };

export const Layout = CreateCategoryComponent<
    UIComponents.Lists.ComponentLayout.Component,
    LayoutConfig,
    UIComponents.Lists.ComponentLayout.MethodsConfigType<UIComponents.Lists.ComponentLayout.Component>
>(
    UIComponents.Lists.ComponentLayout.Definition,
    UIComponents.Lists.ComponentLayout.Component,
);
