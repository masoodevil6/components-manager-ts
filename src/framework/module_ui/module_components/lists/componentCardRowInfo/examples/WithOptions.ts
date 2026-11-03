import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {ComponentCardRowInfo} from "../ComponentCardRowInfo";
import {Keys} from "../../../../module_categories/languages";

export const WithOptions: ComponentExample = {
    id: "card_row_info_with_options",
    name: Keys.category.components.cardRowInfo.examples.withOptions.name,
    description: Keys.category.components.cardRowInfo.examples.withOptions.description,
    render(): HTMLElement {
        return new ComponentCardRowInfo({
            classList: ["col-12", "col-md-6"],
            prop_rows: [
                {id: "description", title: "Description", icon: UiIcons.Src.SymbolExclumationSquare.Definition, content: "The options are provided by ComponentMenuMore."},
                {id: "email", title: "Email", icon: UiIcons.Src.UserEmail1.Definition, content: "hello@example.com"},
                {id: "profile", title: "Profile", icon: UiIcons.Src.UserAccount.Definition, content: "Profile details are ready to review."},
            ],
            prop_options: [
                {id: "edit", title: "Edit", icon: UiIcons.Src.FilesEdit.Definition, action: "edit"},
                {id: "copy", title: "Copy", icon: UiIcons.Src.FileCopy.Definition, action: "copy"},
                {id: "more", title: "More", children: [
                    {id: "details", title: "View details", action: "details"},
                ]},
            ],
        }, {
            SELECT_OPTION: (_event, dataArgs) => console.log("CardRowInfo selected", dataArgs?.ITEM),
        }).getElement();
    },
};
