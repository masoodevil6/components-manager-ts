import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {ComponentCardRowInfo} from "../ComponentCardRowInfo";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "card_row_info_default",
    name: Keys.category.components.cardRowInfo.examples.default.name,
    description: Keys.category.components.cardRowInfo.examples.default.description,
    render(): HTMLElement {
        return new ComponentCardRowInfo({
            classList: ["col-12", "col-md-6"],
            prop_rows: [
                {id: "summary", title: "Summary", icon: UiIcons.Src.FileApplication.Definition, content: "A simple content card without an action menu."},
                {id: "email", title: "Email", icon: UiIcons.Src.UserEmail1.Definition, content: "hello@example.com"},
                {id: "profile", title: "Profile", icon: UiIcons.Src.UserAccount.Definition, content: "Profile details are ready to review."},
            ],
        }).getElement();
    },
};
