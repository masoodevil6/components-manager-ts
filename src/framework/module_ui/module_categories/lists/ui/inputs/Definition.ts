import * as UICategories from "@/ui_categories"
import {Keys}            from "../../../languages"
import {Validate}        from "./validate"
import {InputCheckBox}  from "./inputCheckBox"
import {InputRadioBox} from "./inputRadioBox"
import {InputSelectOption} from "./inputSelectOption"
import {InputOtp}       from "./inputOtp"
import {InputListSelector}  from "./inputListSelector"
import {Input}       from "./input"
import {InputGroup} from "./inputGroup"
import {InputDescription} from "./inputDescription"
import {InputJson} from "./inputJson"
import {InputPrice} from "./inputPrice"
import {InputPassword} from "./inputPassword"
import {InputEmail} from "./inputEmail"
import {InputSize} from "./inputSize"
import {InputPhone} from "./inputPhone"
import {InputColor} from "./inputColor"
import {InputFile} from "./inputFile"
import {InputAcl} from "./inputAcl"

export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "inputs",
    name:        Keys.category.components.inputs.name,
    description: Keys.category.components.inputs.description,

    components:  [
        Validate,
        InputCheckBox,
        InputRadioBox,
        InputSelectOption,
        InputOtp,
        InputListSelector,
        Input,
        InputGroup,
        InputDescription,
        InputJson,
        InputPrice,
        InputPassword,
        InputEmail,
        InputSize,
        InputPhone,
        InputColor,
        InputFile,
        InputAcl,

    ],
}
