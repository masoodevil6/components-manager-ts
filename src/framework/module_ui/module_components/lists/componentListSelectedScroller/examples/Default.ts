import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
import {ListTypes}     from "../Props";
// --------------------------------


/**
 * Default Example برای ComponentListSelectedScroller
 *
 * نمایش یک لیست اسکرول‌شونده با چند آیتم انتخاب‌شده.
 */
export const DefaultExample: ComponentExample = {

    id:          "list_selected_scroller_default",

    name:        Keys.category.components.listSelectedScroller.examples.default.name,

    description: Keys.category.components.listSelectedScroller.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.ListSelectedScroller(
        {
            prop_list: [
                { id: 1,  title: "Item 1" },
                { id: 2,  title: "Item 2" },
                { id: 3,  title: "Item 3" },
                { id: 4,  title: "Item 4" },
                { id: 5,  title: "Item 5" },
                { id: 6,  title: "Item 6" },
                { id: 7,  title: "Item 7" },
                { id: 8,  title: "Item 8" },
                { id: 9,  title: "Item 9" },
                { id: 10, title: "Item 10" },
                { id: 11, title: "Item 11" },
                { id: 12, title: "Item 12" },
            ],
            prop_value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            prop_listType: ListTypes.ACTIVE,
        } as any,
        {
            DELETE_ITEM: function (event, dataArgs, componentArgs) {
                console.log("[ListSelectedScrollerExample] delete item", dataArgs);
            },
        } as any,
    ).getElement() as HTMLElement,

};
