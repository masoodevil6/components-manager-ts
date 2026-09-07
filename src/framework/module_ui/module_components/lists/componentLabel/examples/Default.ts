import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";
import * as UtilConst   from "@/util_consts";
import * as UtilStyle   from "@/util_styles";
import {Keys}           from "../../../../module_categories/languages";
import {TooltipDirectionTypes} from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentLabel (Plan 13.1.0)
 *
 * Label با عنوان، اتصال به input نمونه (for-accessibility) و tooltip.
 * input نمونه با id مطابق prop_labelFor — در غیر این صورت for بی‌اثر است.
 */
export const DefaultExample: ComponentExample = {

    id:          "label_default",

    name:        Keys.category.components.label.examples.default.name,

    description: Keys.category.components.label.examples.default.description,

    render: (): HTMLElement => {
        const root = document.createElement("div");
        root.className = "form-group";

        const input = document.createElement("input");
        input.id  = "label-example-input";
        input.className = "form-control";

        const label = UiCategory.UI.Simples.Label(
            {
                prop_labelTitle:              "Email",
                prop_labelFor:                "label-example-input",

                /// --- Tooltip (همه اپشن‌ها برای تست کامل) ---
                prop_labelTooltipIcon:         UiIcons.Src.StatusIsTrue.Definition,
                prop_labelTooltipDescription:  "More information about this field",
                prop_labelTooltipBackground:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                prop_labelTooltipColor:        UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_2),
                prop_labelTooltipPosition:     UtilStyle.Css_SizeUnit(5, UtilConst.Units.PERCENT),
                prop_labelTooltipDirection:    TooltipDirectionTypes.TOP,
            },
            {},
        ).getElement() as HTMLElement;

        root.append(label, input);
        return root;
    },

};