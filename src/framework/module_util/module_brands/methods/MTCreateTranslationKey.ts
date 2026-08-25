import {TBrandTranslationKey as TranslationKey} from "../types/TBrandTranslationKey";

export const MTCreateTranslationKey =
    (): TranslationKey =>
        Symbol() as TranslationKey;