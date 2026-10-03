import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const Empty: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputColorEmpty.Definition);

export const Definition: TCategoryIconDefinition = {
    id: "Color",
    name: Keys.category.icons.inputsColor.name,
    description: Keys.category.icons.inputsColor.description,
    icons: [Empty],
};
