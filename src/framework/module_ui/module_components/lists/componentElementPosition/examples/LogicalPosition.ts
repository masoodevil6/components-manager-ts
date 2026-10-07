import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const LogicalPositionExample: ComponentExample = {
    id: "element_position_logical",
    name: Keys.category.components.elementPosition.examples.logical.name,
    description: Keys.category.components.elementPosition.examples.logical.description,
    render: (): HTMLElement => UiCategory.UI.Positions.ElementPosition({
        prop_positionType: "relative" as any,
        prop_positionEnd: "1rem",
        prop_content: "Logical end positioning follows the configured text direction",
    }).getElement() as HTMLElement,
};
