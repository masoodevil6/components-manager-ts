import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const Menu     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileMenu.Definition);
export const Setting   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileSetting.Definition);
export const Search    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileSearch.Definition);
export const Filter    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileFilter.Definition);
export const Reload    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileReload.Definition);
export const Empty     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileEmpty.Definition);
export const ClearBroom : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileClearBroom.Definition);
export const Title     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputTitle.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Header" ,
    name:            Keys.category.icons.filesToolbarsHeader.name ,
    description:     Keys.category.icons.filesToolbarsHeader.description ,
   icons:          [
       Menu, Setting, Search, Filter, Reload, Empty, ClearBroom, Title
   ]
}
