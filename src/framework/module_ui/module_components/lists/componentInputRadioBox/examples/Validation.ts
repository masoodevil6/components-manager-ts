import {ComponentExample} from "@/core_components";
import * as UtilValidators from "@/util_validators";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const ValidationExample: ComponentExample = {
    id: "input_radio_box_validation",
    name: Keys.category.components.inputRadioBox.examples.validation.name,
    description: Keys.category.components.inputRadioBox.examples.validation.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputRadioBox({
        classList: ["col-12", "p-2"],
        styles: {},
        prop_labelShow: true,
        prop_labelTitle: "Plan",
        prop_title: "Plan selection",
        prop_options: [{id: "starter", name: "Starter"}, {id: "team", name: "Team"}],
        prop_listRules: [new UtilValidators.validates.NotEmpty({En: "Required", Fa: "الزامی"}, {En: "Choose a plan", Fa: "یک طرح انتخاب کنید"})],
        prop_msgRules: {"Required": "Please choose a plan"},
        prop_isAbsoluteRule: false,
    }, {}).getElement() as HTMLElement,
};
