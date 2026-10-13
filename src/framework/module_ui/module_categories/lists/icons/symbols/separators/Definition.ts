import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const Horizontal: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SeparatorHorizontal.Definition);
export const Vertical: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.SeparatorVertical.Definition);
export const Definition: TCategoryIconDefinition = {
    id: "Separators",
    name: Keys.category.icons.symbolsSeparators.name,
    description: Keys.category.icons.symbolsSeparators.description,
    icons: [Horizontal, Vertical],
};
