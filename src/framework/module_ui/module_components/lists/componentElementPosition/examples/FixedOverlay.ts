import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const FixedOverlayExample: ComponentExample = {
    id: "element_position_fixed_overlay",
    name: Keys.category.components.elementPosition.examples.fixedOverlay.name,
    description: Keys.category.components.elementPosition.examples.fixedOverlay.description,
    render: (): HTMLElement => UiCategory.UI.Positions.ElementPosition({
        prop_positionType: "fix" as any,
        prop_positionTop: "1rem",
        prop_positionEnd: "1rem",
        prop_positionZIndex: 1000,
        prop_content: "Fixed overlay",
    }).getElement() as HTMLElement,
};
