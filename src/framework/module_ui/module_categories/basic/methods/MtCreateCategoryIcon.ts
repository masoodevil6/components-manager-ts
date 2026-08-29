import * as UtilBrands               from "@/util_brands"
import * as UiIcons                  from "@/ui_icons";
// ------------------
import {TCategoryIconTotality}       from "../types/TCategoryIconTotality";


export function MtCreateCategoryIcon(
    definition: UiIcons.IIconDefinition
): TCategoryIconTotality {
    return Object.assign(
        (options?: UiIcons.IIconOptions) => UiIcons.CreateIcon(definition, options),
        { info: definition }
    );
}
