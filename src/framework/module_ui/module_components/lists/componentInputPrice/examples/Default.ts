import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";
import * as UtilValidators from "@/util_validators";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_price_default",
    name: Keys.category.components.inputPrice.examples.default.name,
    description: Keys.category.components.inputPrice.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Inputs.InputPrice({
        prop_labelTitle: "Price",
        prop_name: "price",
        prop_value: "1250",
        prop_placeholder: "Enter amount",
        prop_icon: UiIcons.Src.PaymentAmount.Definition,
        prop_hasRules: true,
        prop_listRules: [new UtilValidators.validates.NotEmpty(
            {En: "Required", Fa: "الزامی"},
            {En: "Price is required", Fa: "وارد کردن قیمت الزامی است"},
        )],
    }, {}).getElement() as HTMLElement,
};
