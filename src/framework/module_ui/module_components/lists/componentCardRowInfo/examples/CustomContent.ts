import type {ComponentExample} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {ComponentCardRowInfo} from "../ComponentCardRowInfo";
import {Keys} from "../../../../module_categories/languages";

export const CustomContent: ComponentExample = {
    id: "card_row_info_custom_content",
    name: Keys.category.components.cardRowInfo.examples.customContent.name,
    description: Keys.category.components.cardRowInfo.examples.customContent.description,
    render(): HTMLElement {
        return new ComponentCardRowInfo({
            classList: ["col-12", "col-md-6"],
            prop_rows: [
                {id: "email", title: "Email", icon: UiIcons.Src.UserEmail1.Definition, content: "hello@example.com"},
                {id: "profile", title: "Profile", icon: UiIcons.Src.UserAccount.Definition, content: "Profile details are ready to review."},
            ],
        }).getElement();
    },
};
