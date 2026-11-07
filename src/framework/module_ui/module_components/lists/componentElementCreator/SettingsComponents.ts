import * as ComponentWindow from "../componentWindow/runtime";
import * as ComponentWindowConfirm from "../componentWindowConfirm/runtime";
import * as ComponentCollapse from "../componentCollapse/runtime";
import * as ComponentButton from "../componentButton/runtime";
import * as ComponentInputCheckBox from "../componentInputCheckBox/runtime";
import * as ComponentInputColor from "../componentInputColor/runtime";
import * as ComponentInputSelectOption from "../componentInputSelectOption/runtime";
import * as ComponentCodeMirror from "../componentCodeMirror/runtime";
import * as ComponentTabs from "../componentTabs/runtime";
import * as ComponentStyles from "../componentStyles/runtime";
import * as ComponentPageSetting from "../componentPageSetting/runtime";
import {ButtonSemantic, ButtonVariants} from "../componentButton/Props";

export const ElementCreatorSettingsComponents = {
    ComponentWindow,
    ComponentWindowConfirm,
    ComponentCollapse,
    ComponentButton,
    ComponentInputCheckBox,
    ComponentInputColor,
    ComponentInputSelectOption,
    ComponentCodeMirror,
    ComponentTabs,
    ComponentStyles,
    ComponentPageSetting,
    ButtonSemantic,
    ButtonVariants,
};

export type ElementCreatorSettingsComponentsType = typeof ElementCreatorSettingsComponents;
