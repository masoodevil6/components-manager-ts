import {CategoriesLanguageEn} from "@/ui_categories";
import {CategoriesLanguageFa} from "@/ui_categories";
import { CategoriesLanguageKeys} from "@/ui_categories"
import {TranslationKey} from "@/util_brands"


export const En = new Map([
    ...CategoriesLanguageEn
]);

export const Fa = new Map<TranslationKey, string>([
    ...CategoriesLanguageFa,
]);

export const Keys ={
    ...CategoriesLanguageKeys
};


