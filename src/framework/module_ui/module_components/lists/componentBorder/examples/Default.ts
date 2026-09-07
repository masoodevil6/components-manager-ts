import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {BorderTypes} from "../Props";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
// --------------------------------


/**
 * Default Example برای ComponentBorder
 *
 * نمایش یک Border ساده با تنظیمات پیش‌فرض.
 */
export const DefaultExample: ComponentExample = {

    id:          "border_default",

    name:        Keys.category.components.border.examples.default.name,

    description: Keys.category.components.border.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Border(
        {
            prop_content:    "Border Content",
            prop_borderType: BorderTypes.SOLID,
            prop_contentBackgroundColor_hover: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4)
        },
        {},
    ).getElement() as HTMLElement,

};
