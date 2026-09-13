import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentInputCheckBox
 */
export const DefaultExample: ComponentExample = {

    id:          "input_check_box_default",

    name:        Keys.category.components.inputCheckBox.examples.default.name,

    description: Keys.category.components.inputCheckBox.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Inputs.InputCheckBox(
        {
            classList: ["col-12", "border", "p-2"],
            styles: {},

            prop_value: true,
            prop_title: "Item CheckBox",

            prop_labelShow: true,
            prop_labelTitle: "Input checkBox",
            prop_labelTooltipDescription: "this is for checkBox",
        },
        {
            CLICK: function (event, dataArgs, componentArgs) {
                console.log("checkbox", dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
