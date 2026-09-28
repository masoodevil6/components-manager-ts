import {CreateCategoryComponent} from "../../../../basic/methods";
import * as UIComponents from "@/ui_components";

export const TimerDown = CreateCategoryComponent<
    UIComponents.Lists.ComponentTimerDown.Component,
    UIComponents.Lists.ComponentStructure.PropsType & UIComponents.Lists.ComponentTimerDown.PropsType,
    UIComponents.Lists.ComponentTimerDown.MethodsConfigType<any>
>(UIComponents.Lists.ComponentTimerDown.Definition, UIComponents.Lists.ComponentTimerDown.Component);
