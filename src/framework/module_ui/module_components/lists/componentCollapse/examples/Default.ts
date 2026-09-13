import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons     from "@/ui_icons";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentCollapse
 *
 * نمایش یک Collapse با آیکون، عنوان و بدنه.
 */
export const DefaultExample: ComponentExample = {

    id:          "collapse_default",

    name:        Keys.category.components.collapse.examples.default.name,

    description: Keys.category.components.collapse.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Collapse(
        {
            prop_collapseTitle: "Section Title",
            prop_collapseIcon:  UiIcons.Src.InputNumber.Definition,
            prop_collapseBody:  CoreReactive.App.div({
                children: ["This is the collapse body content."],
            }),
        },
        {},
    ).getElement() as HTMLElement,

};
