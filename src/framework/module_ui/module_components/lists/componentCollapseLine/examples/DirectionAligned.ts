import {ComponentExample} from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DirectionAligned: ComponentExample = {
    id: "collapse_line_direction_aligned",
    name: Keys.category.components.collapseLine.examples.directionAligned.name,
    description: Keys.category.components.collapseLine.examples.directionAligned.description,
    render(): HTMLElement {
        return UiCategory.UI.Contents.CollapseLine({
            prop_isCenter: false,
            prop_collapseLineCanCollapse: true,
            prop_collapseLineTitle: "Advanced settings",
            prop_collapseLineBody: CoreReactive.App.p({children: ["This section follows the active text direction."]}),
            prop_collapseLineStyles: {marginBlock: "1rem"},
        }).getElement() as HTMLElement;
    },
};
