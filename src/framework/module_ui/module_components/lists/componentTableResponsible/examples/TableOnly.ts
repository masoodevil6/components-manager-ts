import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {TableResponsibleViewMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const TableOnly: ComponentExample = {
    id: "table_responsible_table_only",
    name: Keys.category.components.tableResponsible.examples.tableOnly.name,
    description: Keys.category.components.tableResponsible.examples.tableOnly.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.TableResponsible({
            prop_viewMode: TableResponsibleViewMode.TABLE,
            prop_header: [
                {id: "code", content: "Code"},
                {id: "product", content: "Product"},
                {id: "stock", content: "Stock"},
            ],
            prop_order: ["code", "product", "stock"],
            prop_data: [
                {code: "P-104", product: "Desk lamp", stock: 18},
                {code: "P-205", product: "Notebook", stock: 42},
            ],
            prop_doColSelector: true,
        } as any).getElement() as HTMLElement;
    },
};
