import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {Validate}        from "./validate"
import {InputCheckBox}  from "./inputCheckBox"
import {InputOtp}       from "./inputOtp"
import {InputListSelector}  from "./inputListSelector"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "inputs",
    name:        Keys.category.components.inputs.name,
    description: Keys.category.components.inputs.description,

    components:  [
        Validate,
        InputCheckBox,
        InputOtp,
        InputListSelector,
    ],
}
