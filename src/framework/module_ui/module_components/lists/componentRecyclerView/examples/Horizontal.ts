import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Horizontal Example برای ComponentRecyclerView
 *
 * نمایش یک RecyclerView با جهت افقی (flex-row).
 */
export const HorizontalExample: ComponentExample = {

    id:          "recycler_view_horizontal",

    name:        Keys.category.components.recyclerView.examples.horizontal.name,

    description: Keys.category.components.recyclerView.examples.horizontal.description,

    render: (): HTMLElement => UiCategory.UI.Contents.RecyclerView(
        {
            prop_formDirection:   "horizontal",
            prop_formComponents: [
                CoreReactive.App.section({
                    className: ["border-end", "border-dark", "px-2"],
                    children: ["Item 1"],
                }),
                CoreReactive.App.section({
                    className: ["border-end", "border-dark", "px-2"],
                    children: ["Item 2"],
                }),
                CoreReactive.App.section({
                    className: ["border-end", "border-dark", "px-2"],
                    children: ["Item 3"],
                }),
            ],
        },
        {},
    ).getElement() as HTMLElement,

};
