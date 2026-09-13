import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import {Keys} from "../../../module_categories/languages";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";

export type DraggableItem = {
    id: string | number;
    body: CoreReactive.App;
    isPin?: boolean;
};

export const Props = {
    prop_draggableOrderStatus: Define_ComponentProp<boolean>({
        prop:        "prop_draggableOrderStatus",
        default:     true,
        name:        Keys.category.components.draggableOrdersY.props.draggableOrderStatus.name,
        description: Keys.category.components.draggableOrdersY.props.draggableOrderStatus.description,
    }),

    prop_draggablePinStatus: Define_ComponentProp<boolean>({
        prop:        "prop_draggablePinStatus",
        default:     true,
        name:        Keys.category.components.draggableOrdersY.props.draggablePinStatus.name,
        description: Keys.category.components.draggableOrdersY.props.draggablePinStatus.description,
    }),

    prop_draggableItems: Define_ComponentProp<DraggableItem[]>({
        prop:        "prop_draggableItems",
        default:     [],
        name:        Keys.category.components.draggableOrdersY.props.draggableItems.name,
        description: Keys.category.components.draggableOrdersY.props.draggableItems.description,
    }),

    prop_draggableOrders: Define_ComponentProp<Array<string | number>>({
        prop:        "prop_draggableOrders",
        default:     [],
        name:        Keys.category.components.draggableOrdersY.props.draggableOrders.name,
        description: Keys.category.components.draggableOrdersY.props.draggableOrders.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
