import * as UIComponents from "@/ui_components";
import {CreateCategoryComponent} from "../../../../basic/methods";

type PageSettingConfig = UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentPageSetting.PropsConfigType;

export const PageSetting = CreateCategoryComponent<
    UIComponents.Lists.ComponentPageSetting.Component,
    PageSettingConfig,
    Record<string, any>
>(
    UIComponents.Lists.ComponentPageSetting.Definition,
    UIComponents.Lists.ComponentPageSetting.Component,
);
