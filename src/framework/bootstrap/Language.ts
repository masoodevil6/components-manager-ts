import {CategoriesLanguageEn , CategoriesLanguageFa} from "@/ui_categories";
import {TranslationKey} from "@/util_brands";
import * as Core from "@/core"
import * as CoreLanguage from "@/core_languages"



export const En = new Map<TranslationKey, string>([
    ...CategoriesLanguageEn,
]);

export const Fa = new Map<TranslationKey, string>([
    ...CategoriesLanguageFa,
]);

export const Directory = {
    Fa,
    En
};

CoreLanguage.App.initialize(
    Directory,
    Core.Language.Definition.En
);
