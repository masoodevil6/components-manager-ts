import {CategoriesLanguageEn , CategoriesLanguageFa} from "@/ui_categories";
import * as UtilValidators from "@/util_validators";
import {TranslationKey} from "@/util_brands";
import * as Core from "@/core"
import * as CoreLanguage from "@/core_languages"



export const En = new Map<TranslationKey, string>([
    ...CategoriesLanguageEn,
    ...UtilValidators.language.DictEn,
]);

export const Fa = new Map<TranslationKey, string>([
    ...CategoriesLanguageFa,
    ...UtilValidators.language.DictFa,
]);

export const Directory = {
    Fa,
    En
};

CoreLanguage.App.initialize(
    Directory,
    Core.Language.Definition.En
);
