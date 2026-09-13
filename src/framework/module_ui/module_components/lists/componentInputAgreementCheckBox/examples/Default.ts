import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentInputAgreementCheckBox
 *
 * نمایش یک AgreementCheckBox با چند آیتم و قابلیت "select all".
 */
export const DefaultExample: ComponentExample = {

    id:          "input_agreement_check_box_default",

    name:        Keys.category.components.inputAgreementCheckBox.examples.default.name,

    description: Keys.category.components.inputAgreementCheckBox.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Inputs.InputAgreementCheckBox(
        {
            prop_labelTitle:             "Input Agreement CheckBox",
            prop_labelTooltipDescription: "this is for [Input Agreement checkBox]",
            prop_checkBoxAllTitle:        null,
            prop_name:                   "agreement-checkbox",
            prop_checkBoxOrderStatus:    true,
            prop_checkBoxList: [
                { id: 1, title: "item A" },
                { id: 2, title: "item B", isPin: true },
                { id: 3, title: "item C" },
                { id: 4, title: "item D" },
            ],
            prop_value:         [1, 2, 3, 4],
            prop_checkBoxOrder: [3],
        },
        {
            CLICK_ALL: function (event, dataArgs, componentArgs) {
                console.log("checkbox All", dataArgs, componentArgs);
            },
            CLICK_ITEM: function (event, dataArgs, componentArgs) {
                console.log("checkbox Item", dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
