import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as Component from "..";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id:   "draggable_orders_y_default",
    name: Keys.category.components.draggableOrdersY.examples.default.name,
    description: Keys.category.components.draggableOrdersY.examples.default.description,
    render: (): HTMLElement => new Component.Component(
        {
            prop_draggableItems: [
                { id: 1, body: CoreReactive.App.section({ children: ["Item 1"] }) },
                { id: 2, body: CoreReactive.App.section({ children: ["Item 2"] }), isPin: true },
                { id: 3, body: CoreReactive.App.section({ children: ["Item 3"] }) },
            ],
            prop_draggableOrders: [3],
        } as any,
        {},
    ).getElement() as HTMLElement,
};
