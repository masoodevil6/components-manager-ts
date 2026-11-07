import * as ComponentInput from "../componentInput/runtime";
import * as ComponentInputDescription from "../componentInputDescription";
import * as ComponentInputCheckBox from "../componentInputCheckBox/runtime";
import * as ComponentInputRadioBox from "../componentInputRadioBox/runtime";
import * as ComponentInputListSelector from "../componentInputListSelector/runtime";

export {ComponentInput, ComponentInputDescription, ComponentInputCheckBox, ComponentInputRadioBox, ComponentInputListSelector};

export const CUSTOM_FORM_LAYOUT_ALLOWED_COMPONENTS = Object.freeze([
    ComponentInput.Component,
    ComponentInputDescription.Component,
    ComponentInputCheckBox.Component,
    ComponentInputRadioBox.Component,
    ComponentInputListSelector.Component,
] as const);
