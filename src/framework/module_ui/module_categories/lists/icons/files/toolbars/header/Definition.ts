import * as CoreLanguage                   from "@/core_languages"
import * as UiIcons                        from "@/ui_icons"
// ------------------------------
import {TCategoryIconDefinition}           from "../../../../../basic/types/TCategoryIconDefinition";
import {TCategoryIconTotality}             from "../../../../../basic/types/TCategoryIconTotality";
import {CreateCategoryIcon}                from "../../../../../basic/methods";
import {Keys}                              from "../../../../../languages";


export const FileMenu     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileMenu.Definition);
export const FileSetting   : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileSetting.Definition);
export const FileSearch    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileSearch.Definition);
export const FileFilter    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileFilter.Definition);
export const FileReload    : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileReload.Definition);
export const FileEmpty     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileEmpty.Definition);
export const FileClearBroom : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.FileClearBroom.Definition);
export const InputTitle     : TCategoryIconTotality = CreateCategoryIcon(UiIcons.Src.InputTitle.Definition);


export const Definition : TCategoryIconDefinition = {
    id:              "Header" ,
    name:            CoreLanguage.App.translate(Keys.category.icons.filesToolbarsHeader.name) ,
    description:     CoreLanguage.App.translate(Keys.category.icons.filesToolbarsHeader.name ) ,
   icons:          [
      FileMenu, FileSetting, FileSearch, FileFilter, FileReload, FileEmpty, FileClearBroom, InputTitle
   ]
}
