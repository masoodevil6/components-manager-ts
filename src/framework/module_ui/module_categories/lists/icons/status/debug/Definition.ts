import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const Debug: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.StatusDebug.Definition);

export const Definition: TCategoryIconDefinition = {
    id: "Debug",
    name: Keys.category.icons.status.name,
    description: Keys.category.icons.status.description,
    icons: [Debug],
};
