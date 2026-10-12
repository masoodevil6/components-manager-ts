import {ComponentExample} from "@/core_components";
import {ComponentCardViewClicable} from "../ComponentCardViewClicable";
import {Keys} from "../../../../module_categories/languages";

export const Default: ComponentExample = {
    id: "card_view_clicable_default",
    name: Keys.category.components.cardViewClicable.examples.default.name,
    description: Keys.category.components.cardViewClicable.examples.default.description,
    render(): HTMLElement {
        return new ComponentCardViewClicable({
            classList: ["col-12", "col-md-6"],
            prop_title: "Card title",
            prop_content: "A simple card with a title and body content.",
        }, {
            CLICK: () => console.log("Card clicked"),
        }).getElement() as HTMLElement;
    },
};
