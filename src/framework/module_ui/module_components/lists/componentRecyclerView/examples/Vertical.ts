import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Vertical Example برای ComponentRecyclerView
 *
 * نمایش یک RecyclerView با جهت عمودی (flex-column).
 */
export const VerticalExample: ComponentExample = {

    id:          "recycler_view_vertical",

    name:        Keys.category.components.recyclerView.examples.vertical.name,

    description: Keys.category.components.recyclerView.examples.vertical.description,

    render: (): HTMLElement => UiCategory.UI.Contents.RecyclerView(
        {
            prop_formDirection:   "vertical",
            prop_formComponents: [
                CoreReactive.App.section({
                    className: ["border-bottom", "border-dark", "py-2"],
                    children: ["Item 1"],
                }),
                CoreReactive.App.section({
                    className: ["border-bottom", "border-dark", "py-2"],
                    children: ["Item 2"],
                }),
                CoreReactive.App.section({
                    className: ["border-bottom", "border-dark", "py-2"],
                    children: ["Item 3"],
                }),
            ],
        },
        {},
    ).getElement() as HTMLElement,

};
