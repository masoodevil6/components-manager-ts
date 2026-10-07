import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "element_position_default",
    name: Keys.category.components.elementPosition.examples.default.name,
    description: Keys.category.components.elementPosition.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Positions.ElementPosition({
        prop_positionClass: ["position-relative"],
        prop_positionTop: "2rem",
        prop_positionStart: "1rem",
        prop_content: "Positioned element",
    }).getElement() as HTMLElement,
};
