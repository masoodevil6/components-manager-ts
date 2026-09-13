import { CreateCategoryComponent } from "../../../../basic/methods"
import * as UIComponents    from "@/ui_components"
// --------------------------------


export const InputAgreementCheckBox = CreateCategoryComponent<
    UIComponents.Lists.ComponentInputAgreementCheckBox.Component,
    UIComponents.Lists.ComponentStructure.PropsType &
    UIComponents.Lists.ComponentInputAgreementCheckBox.PropsType,
    UIComponents.Lists.ComponentInputAgreementCheckBox.MethodsConfigType<any>
>(
    UIComponents.Lists.ComponentInputAgreementCheckBox.Definition,
    UIComponents.Lists.ComponentInputAgreementCheckBox.Component,
);
