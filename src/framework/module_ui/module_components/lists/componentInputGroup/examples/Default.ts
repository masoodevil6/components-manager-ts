import type { ComponentExample } from "@/core_components";
import * as UiCategory from "@/ui_categories";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import { Keys } from "../../../../module_categories/languages";
import { LayoutColumn } from "../../componentLayout/Props";
import { InputGroupItemType } from "../Props";

export const Default: ComponentExample = {
  id: "input_group_default",
  name: Keys.category.components.inputGroup.examples.default.name,
  description: Keys.category.components.inputGroup.examples.default.description,
  render(): HTMLElement {
    const nameLabel = UiCategory.UI.Simples.Label({
      prop_labelTitle: "Name",
      prop_labelBackground: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
      prop_labelColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
      prop_labelClass: ["d-block"],
    });
    const firstName = UiCategory.UI.Simples.InputSimple({
      prop_inputName: "firstName",
      prop_inputPlaceholder: "First name",
    });
    const lastName = UiCategory.UI.Simples.InputSimple({
      prop_inputName: "lastName",
      prop_inputPlaceholder: "Last name",
    });

    return UiCategory.UI.Inputs.InputGroup(
      {
        prop_name: "contactInfo",
        prop_labelTitle: "Contact info",
        prop_labelBackground: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        prop_labelColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        prop_inputs: [
          { type: InputGroupItemType.LABEL, input: nameLabel, width: LayoutColumn.COL_2 },
          { type: InputGroupItemType.INPUT, input: firstName, width: LayoutColumn.COL_5 },
          { type: InputGroupItemType.INPUT, input: lastName, width: LayoutColumn.COL_5 },
        ],
      },
      {
        INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {
          console.log("InputGroup prop_value:", componentArgs.VALUE);
        },
      },
    ).getElement() as HTMLElement;
  },
};
