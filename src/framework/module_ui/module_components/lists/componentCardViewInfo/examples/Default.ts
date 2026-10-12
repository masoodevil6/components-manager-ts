import {ComponentExample} from "@/core_components";
import {ComponentCardViewInfo} from "../ComponentCardViewInfo";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "card_view_default",
    name: Keys.category.components.cardViewInfo.examples.default.name,
    description: Keys.category.components.cardViewInfo.examples.default.description,
    render(): HTMLElement {
        return new ComponentCardViewInfo({
            classList: ["col-12", "col-md-6"],
            prop_title: "Card title",
            prop_content: "A simple card with a title and body content.",
        }).getElement() as HTMLElement;
    },
};
