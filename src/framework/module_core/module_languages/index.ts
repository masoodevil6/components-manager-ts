//----------------------------
// example
//----------------------------
//Translate.App("welcome");

export {ClLanguageApp as App} from "./class/ClLanguageApp"

export {CreateTranslationKey} from "@/util_brands"

export type {LanguagesDefinition as TLanguagesDefinition ,} from "./type/const";

export {En as FallbackLanguage} from "./definition"

import {ClLanguageApp as LanguageApp} from "./class/ClLanguageApp";
import * as LanguageDefinitions from "./definition";
import type {
    TranslationKeyDefinitions,
    DefinedTranslationKeys,
    TranslationPack,
    TranslationLocale,
    TranslationKeyDefinition,
    TranslationCatalogDefinition,
    RegisteredTranslationCatalog,
} from "./type";
import type {TLanguageDefinition as LanguageDefinition} from "../contract/language/types/TLanguageDefinition";
import type {TranslationKey} from "@/util_brands";

export type {
    TranslationCatalogText,
    TranslationCatalogEntry,
    TranslationCategory,
    TranslationCatalogDefinition,
    RegisteredTranslationCatalog,
} from "./type";

export const Locale = Object.freeze({
    EN_US: LanguageDefinitions.En,
    FA_IR: LanguageDefinitions.Fa,
    En: LanguageDefinitions.En,
    Fa: LanguageDefinitions.Fa,
});

export const defineKeys = <const T extends TranslationKeyDefinitions>(
    namespace: string,
    definitions: T
): DefinedTranslationKeys<T> => LanguageApp.defineKeys(namespace, definitions);

export const registerLocale = (locale: LanguageDefinition) => LanguageApp.registerLocale(locale);

export const listLocales = () => LanguageApp.listLocales();

export const registerPack = (pack: TranslationPack) => LanguageApp.registerPack(pack);

export const registerPacks = (packs: readonly TranslationPack[]) => LanguageApp.registerPacks(packs);

export const registerCatalog = (catalog: TranslationCatalogDefinition): RegisteredTranslationCatalog => LanguageApp.registerCatalog(catalog);

export const unregisterNamespace = (namespace: string): number => LanguageApp.unregisterNamespace(namespace);

export const listCatalogs = (): RegisteredTranslationCatalog[] => LanguageApp.listCatalogs();

export const getCatalog = (id: string): RegisteredTranslationCatalog | null => LanguageApp.getCatalog(id);

export const getPack = (locale: TranslationLocale) => LanguageApp.getPack(locale);

export const getTranslations = (key: TranslationKey) => LanguageApp.getTranslations(key);

export const listKeys = () => LanguageApp.listKeys();

export const listKeyDefinitions = (): TranslationKeyDefinition[] => LanguageApp.listKeyDefinitions();

export const getKeyMetadata = (key: TranslationKey) => LanguageApp.getKeyMetadata(key);

export const setLocale = (locale: TranslationLocale) => LanguageApp.setLocale(locale);

export const t = (key: TranslationKey, params: Record<string, unknown> = {}) => LanguageApp.t(key, params);


