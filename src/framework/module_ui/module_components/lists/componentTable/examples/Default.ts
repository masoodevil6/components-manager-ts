import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentTable
 *
 * نمایش یک جدول ساده با داده‌های نمونه.
 */
export const DefaultExample: ComponentExample = {

    id:          "table_default",

    name:        Keys.category.components.table.examples.default.name,

    description: Keys.category.components.table.examples.default.description,

    render: (): HTMLElement => UiCategory.UI.Contents.Table(
        {
            prop_header: [
                { id: "col1", content: "Column 1" },
                { id: "col2", content: "Column 2" },
                { id: "col3", content: "Column 3" },
            ],
            prop_order: ["col1", "col2", "col3"],
            prop_data: [
                { col1: "R1C1", col2: "R1C2", col3: "R1C3" },
                { col1: "R2C1", col2: "R2C2", col3: "R2C3" },
            ],
            prop_hasColNumber: true,
            prop_hasColSelector: true,
            prop_doColSelector: true,
        },
        {
            SELECT_COL: function (event, dataArgs, componentArgs) {
                console.log("[TableExample] col selected", dataArgs, componentArgs);
            },
            CLICK_OPTION_CARD: function (event, dataArgs, componentArgs) {
                console.log("[TableExample] option clicked", dataArgs, componentArgs);
            },
            CALLBACK_COL_SELECTOR: function (event, dataArgs, componentArgs) {
                console.log("[TableExample] col selector callback", dataArgs, componentArgs);
            },
        },
    ).getElement() as HTMLElement,

};
