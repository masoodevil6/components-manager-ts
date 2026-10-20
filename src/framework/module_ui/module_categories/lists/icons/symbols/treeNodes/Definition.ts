import * as UiIcons from "@/ui_icons";
import {TCategoryIconDefinition} from "../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality} from "../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon} from "../../../../basic/methods";
import {Keys} from "../../../../languages";

export const Expand: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.TreeNodeExpand.Definition);
export const Collapse: TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.TreeNodeCollapse.Definition);

export const Definition: TCategoryIconDefinition = {
    id: "TreeNodes",
    name: Keys.category.icons.symbolsTreeNodes.name,
    description: Keys.category.icons.symbolsTreeNodes.description,
    icons: [Expand, Collapse],
};
