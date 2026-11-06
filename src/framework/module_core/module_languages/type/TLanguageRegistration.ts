import type {TranslationKey} from "@/util_brands";
import type {TLanguageDefinition as LanguageDefinition} from "../../contract/language/types/TLanguageDefinition";

export type TTranslationKeyDefinitions = Record<string, string>;

export type TDefinedTranslationKeys<T extends TTranslationKeyDefinitions> = {
    readonly [K in keyof T]: TranslationKey;
};

export type TTranslationLocale = string | LanguageDefinition;

export type TTranslationPack = {
    id: string;
    locale: TTranslationLocale;
    entries: readonly (readonly [TranslationKey, string])[];
    /** Explicitly permits replacing an existing translation for the same locale and key. */
    override?: boolean;
};

export type TTranslationKeyMetadata = {
    id: string;
    namespace: string;
    name: string;
};

export type TTranslationKeyDefinition = TTranslationKeyMetadata & {
    key: TranslationKey;
};

/** A localized value in a consumer-defined language catalog. */
export type TTranslationCatalogText = {
    /** Pass a standard Framework.Lang.Locale reference, such as Locale.FA_IR. */
    locale: LanguageDefinition;
    value: string;
};

export type TTranslationCatalogEntry = {
    /** A key path relative to the catalog id, for example "payment.card.invalidNumber". */
    key: string;
    translations: readonly TTranslationCatalogText[];
    /** Explicitly permits replacing an existing value for the same key and locale. */
    override?: boolean;
};

/** Recursive consumer-defined grouping for translation catalog entries. */
export type TTranslationCategory = {
    id: string;
    title: readonly TTranslationCatalogText[];
    entries?: readonly TTranslationCatalogEntry[];
    children?: readonly TTranslationCategory[];
};

export type TTranslationCatalogDefinition = {
    /** Stable namespace used to make entry keys globally unique. */
    id: string;
    categories: readonly TTranslationCategory[];
};

/** Return value of registerCatalog; keys map catalog-relative paths to framework key references. */
export type TRegisteredTranslationCatalog = {
    id: string;
    categories: readonly TTranslationCategory[];
    keys: Readonly<Record<string, TranslationKey>>;
};
