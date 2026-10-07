import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const Circle: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.ShapeCircle.Definition);
export const Definition: TCategoryIconDefinition = {
    id: "Shapes",
    name: Keys.category.icons.symbolsShapes.name,
    description: Keys.category.icons.symbolsShapes.description,
    icons: [Circle],
};
