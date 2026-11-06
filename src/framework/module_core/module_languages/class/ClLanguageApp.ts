import * as Core from "@/core";
import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
import * as UtilBrands  from "@/util_brands";
import type {
    TTranslationKeyDefinitions,
    TDefinedTranslationKeys,
    TTranslationPack,
    TTranslationLocale,
    TTranslationKeyMetadata,
    TTranslationKeyDefinition,
    TTranslationCatalogDefinition,
    TTranslationCatalogText,
    TTranslationCategory,
    TRegisteredTranslationCatalog,
} from "../type/TLanguageRegistration";


type TLanguageDictionary = Map<UtilBrands.TranslationKey, string>;
type TLanguageDirectory = Record<string, TLanguageDictionary>;
type TLanguageDefinition = Core.Language.Types.LanguageDefinition;
type TStagedCatalogEntry = {
    path: string;
    id: string;
    key: UtilBrands.TranslationKey;
    metadata: TTranslationKeyMetadata;
    translations: TTranslationCatalogText[];
    override: boolean;
};

const MAX_TRANSLATION_CATEGORY_DEPTH = 32;

export class ClLanguageApp {

    private static _directory:
        TLanguageDirectory = {};

    private static _fallback:
        TLanguageDefinition;

    private static _locales = new Map<string, TLanguageDefinition>();

    private static _knownKeys = new Set<UtilBrands.TranslationKey>();

    private static _customKeys = new Map<string, UtilBrands.TranslationKey>();

    private static _keyMetadata = new Map<UtilBrands.TranslationKey, TTranslationKeyMetadata>();

    private static _registeredPackIds = new Set<string>();

    private static _packKeys = new Map<string, Set<UtilBrands.TranslationKey>>();

    private static _catalogs = new Map<string, TRegisteredTranslationCatalog>();

    private static _directoryRevision = new CoreObservable.App(0);


    static initialize(
        directory: TLanguageDirectory,
        fallback: TLanguageDefinition
    ): void {

        this._directory = {};

        for (const [code, entries] of Object.entries(directory)) {
            this._directory[code] = new Map(entries);
            for (const key of entries.keys()) {
                this._knownKeys.add(key);
            }
        }

        this._fallback =
            fallback;

        this.registerLocale(fallback);
        this._touchDirectory();
    }


    static registerLocale(
        language: TLanguageDefinition
    ): TLanguageDefinition {

        const code = String(language?.code ?? "").trim();
        const name = String(language?.name ?? "").trim();

        if (!code || !name || typeof language?.directionRtl !== "boolean") {
            throw new Error("[Framework.Lang] A locale requires code, name, and directionRtl.");
        }

        const registered = this._locales.get(code);
        if (registered) {
            if (
                registered.name !== name
                || registered.directionRtl !== language.directionRtl
            ) {
                throw new Error(`[Framework.Lang] Locale '${code}' is already registered with different metadata.`);
            }
            return registered;
        }

        const normalized = Object.freeze({
            code,
            name,
            directionRtl: language.directionRtl,
        });

        this._locales.set(code, normalized);
        return normalized;
    }


    static listLocales(): TLanguageDefinition[] {
        return Array.from(this._locales.values());
    }


    /**
     * Validates and atomically registers a consumer-owned nested language catalog.
     * Locale values must use registered Framework.Lang.Locale references.
     */
    static registerCatalog(
        catalog: TTranslationCatalogDefinition
    ): TRegisteredTranslationCatalog {

        const fail = (path: string, reason: string): never => {
            throw new Error(`[Framework.Lang] Invalid translation catalog at ${path}: ${reason}.`);
        };

        if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
            fail("catalog", "expected an object");
        }

        const catalogId = typeof catalog.id === "string" ? catalog.id.trim() : "";
        if (!catalogId) fail("catalog.id", "expected a non-empty string");
        if (this._catalogs.has(catalogId)) {
            fail("catalog.id", `catalog '${catalogId}' is already registered`);
        }
        if (!Array.isArray(catalog.categories) || catalog.categories.length === 0) {
            fail("catalog.categories", "expected a non-empty array");
        }

        const categoryIds = new Set<string>();
        const entryPaths = new Set<string>();
        const visiting = new WeakSet<object>();
        const stagedEntries: TStagedCatalogEntry[] = [];
        const existingKeyIds = new Map<string, UtilBrands.TranslationKey>();
        for (const [key, metadata] of this._keyMetadata) {
            existingKeyIds.set(metadata.id, key);
        }

        const visitCategory = (
            rawCategory: unknown,
            path: string,
            depth: number
        ): TTranslationCategory => {
            if (!rawCategory || typeof rawCategory !== "object" || Array.isArray(rawCategory)) {
                fail(path, "expected a category object");
            }
            if (depth > MAX_TRANSLATION_CATEGORY_DEPTH) {
                fail(path, `maximum category depth is ${MAX_TRANSLATION_CATEGORY_DEPTH}`);
            }
            if (visiting.has(rawCategory as object)) {
                fail(path, "circular category references are not allowed");
            }
            visiting.add(rawCategory as object);

            const category = rawCategory as Record<string, unknown>;
            const id = typeof category.id === "string" ? category.id.trim() : "";
            if (!id) fail(`${path}.id`, "expected a non-empty string");
            if (categoryIds.has(id)) fail(`${path}.id`, `category id '${id}' is duplicated`);
            categoryIds.add(id);

            const title = this._normalizeCatalogTexts(category.title, `${path}.title`, true, fail);

            let entries: TTranslationCategory["entries"];
            if (category.entries !== undefined) {
                if (!Array.isArray(category.entries)) fail(`${path}.entries`, "expected an array");
                const rawEntries = category.entries as unknown[];
                entries = rawEntries.map((rawEntry, index) => {
                    const entryPath = `${path}.entries[${index}]`;
                    if (!rawEntry || typeof rawEntry !== "object" || Array.isArray(rawEntry)) {
                        fail(entryPath, "expected a translation entry object");
                    }

                    const entry = rawEntry as Record<string, unknown>;
                    const localKey = typeof entry.key === "string" ? entry.key.trim() : "";
                    if (!localKey) fail(`${entryPath}.key`, "expected a non-empty string");
                    if (localKey.split(".").some((part) => !part.trim())) {
                        fail(`${entryPath}.key`, "key path segments must not be empty");
                    }
                    if (entryPaths.has(localKey)) fail(`${entryPath}.key`, `key '${localKey}' is duplicated in this catalog`);
                    entryPaths.add(localKey);

                    const translations = this._normalizeCatalogTexts(
                        entry.translations,
                        `${entryPath}.translations`,
                        false,
                        fail,
                    );
                    const canonicalId = `${catalogId}.${localKey}`;
                    const metadataKey = existingKeyIds.get(canonicalId);
                    let translationKey = this._customKeys.get(canonicalId);
                    if (metadataKey && !translationKey) {
                        fail(`${entryPath}.key`, `key '${canonicalId}' is already owned by another language definition`);
                    }
                    if (!translationKey) translationKey = UtilBrands.CreateTranslationKey();

                    const override = entry.override === true;
                    for (const translation of translations) {
                        const exists = this._directory[translation.locale.code]?.has(translationKey) ?? false;
                        if (exists && !override) {
                            fail(
                                `${entryPath}.translations`,
                                `a value for '${canonicalId}' already exists in '${translation.locale.code}'; set override: true to replace it`,
                            );
                        }
                    }

                    const metadata: TTranslationKeyMetadata = {
                        id: canonicalId,
                        namespace: catalogId,
                        name: localKey.split(".").slice(-1)[0] ?? localKey,
                    };
                    stagedEntries.push({
                        path: localKey,
                        id: canonicalId,
                        key: translationKey,
                        metadata,
                        translations,
                        override,
                    });

                    return Object.freeze({
                        key: localKey,
                        translations: Object.freeze(translations.map((item) => Object.freeze({...item}))),
                        ...(override ? {override: true} : {}),
                    });
                });
            }

            let children: TTranslationCategory["children"];
            if (category.children !== undefined) {
                if (!Array.isArray(category.children)) fail(`${path}.children`, "expected an array");
                const rawChildren = category.children as unknown[];
                children = rawChildren.map((child, index) =>
                    visitCategory(child, `${path}.children[${index}]`, depth + 1),
                );
            }

            visiting.delete(rawCategory as object);
            return Object.freeze({
                id,
                title: Object.freeze(title.map((item) => Object.freeze({...item}))),
                ...(entries ? {entries: Object.freeze(entries)} : {}),
                ...(children ? {children: Object.freeze(children)} : {}),
            });
        };

        const normalizedCategories = catalog.categories.map((category, index) =>
            visitCategory(category, `catalog.categories[${index}]`, 1),
        );

        const keys: Record<string, UtilBrands.TranslationKey> = Object.create(null);
        for (const entry of stagedEntries) keys[entry.path] = entry.key;
        const registration: TRegisteredTranslationCatalog = Object.freeze({
            id: catalogId,
            categories: Object.freeze(normalizedCategories),
            keys: Object.freeze(keys),
        });

        // Commit only after every category, locale, key, and translation has passed validation.
        for (const entry of stagedEntries) {
            if (!this._customKeys.has(entry.id)) this._customKeys.set(entry.id, entry.key);
            if (!this._keyMetadata.has(entry.key)) this._keyMetadata.set(entry.key, Object.freeze({...entry.metadata}));
            this._knownKeys.add(entry.key);

            for (const translation of entry.translations) {
                const code = translation.locale.code;
                if (!this._directory[code]) this._directory[code] = new Map();
                this._directory[code].set(entry.key, translation.value);
            }
        }

        this._catalogs.set(catalogId, registration);
        if (stagedEntries.length) this._touchDirectory();
        return registration;
    }


    static listCatalogs(): TRegisteredTranslationCatalog[] {
        return Array.from(this._catalogs.values());
    }


    static getCatalog(
        id: string
    ): TRegisteredTranslationCatalog | null {
        return this._catalogs.get(String(id ?? "").trim()) ?? null;
    }


    static defineKeys<const T extends TTranslationKeyDefinitions>(
        namespace: string,
        definitions: T
    ): TDefinedTranslationKeys<T> {

        const normalizedNamespace = String(namespace ?? "").trim();
        if (!normalizedNamespace) {
            throw new Error("[Framework.Lang] A non-empty namespace is required when defining translation keys.");
        }

        const result: Record<string, UtilBrands.TranslationKey> = {};
        const idsInCall = new Set<string>();

        for (const [name, path] of Object.entries(definitions)) {
            const normalizedPath = String(path ?? "").trim();
            if (!normalizedPath) {
                throw new Error(`[Framework.Lang] Translation key '${name}' must have a non-empty path.`);
            }

            const id = `${normalizedNamespace}.${normalizedPath}`;
            if (idsInCall.has(id)) {
                throw new Error(`[Framework.Lang] Translation key '${id}' is duplicated in this definition.`);
            }
            idsInCall.add(id);

            let key = this._customKeys.get(id);
            if (!key) {
                key = UtilBrands.CreateTranslationKey();
                this._customKeys.set(id, key);
                this._keyMetadata.set(key, {id, namespace: normalizedNamespace, name});
            }

            this._knownKeys.add(key);
            result[name] = key;
        }

        return Object.freeze(result) as TDefinedTranslationKeys<T>;
    }


    static listKeys(): UtilBrands.TranslationKey[] {
        return Array.from(this._knownKeys);
    }


    static listKeyDefinitions(): TTranslationKeyDefinition[] {
        return Array.from(this._keyMetadata.entries()).map(([key, metadata]) => ({key, ...metadata}));
    }


    static registerKeyMetadata(
        key: UtilBrands.TranslationKey,
        metadata: TTranslationKeyMetadata
    ): void {

        if (typeof key !== "symbol") {
            throw new Error("[Framework.Lang] A translation key reference must be a symbol.");
        }
        if (!metadata?.namespace?.trim() || !metadata?.name?.trim() || !metadata?.id?.trim()) {
            throw new Error("[Framework.Lang] Translation key metadata requires id, namespace, and name.");
        }

        if (!this._keyMetadata.has(key)) {
            this._keyMetadata.set(key, Object.freeze({...metadata}));
        }
        this._knownKeys.add(key);
    }


    static getKeyMetadata(
        key: UtilBrands.TranslationKey
    ): Readonly<TTranslationKeyMetadata> | null {

        return this._keyMetadata.get(key) ?? null;
    }


    static registerPacks(
        packs: readonly TTranslationPack[]
    ): void {

        if (!Array.isArray(packs)) {
            throw new Error("[Framework.Lang] registerPacks expects an array of translation packs.");
        }

        const packIds = new Set<string>();
        const stagedPackKeys = new Map<string, Set<UtilBrands.TranslationKey>>();
        const staged = new Map<string, Map<UtilBrands.TranslationKey, {value: string; override: boolean}>>();

        for (const pack of packs) {
            const id = String(pack?.id ?? "").trim();
            if (!id) {
                throw new Error("[Framework.Lang] Every translation pack requires a non-empty id.");
            }
            if (this._registeredPackIds.has(id) || packIds.has(id)) {
                throw new Error(`[Framework.Lang] Translation pack '${id}' is already registered.`);
            }
            packIds.add(id);

            const locale = this._resolveRegisteredLocale(pack.locale);
            if (!Array.isArray(pack.entries)) {
                throw new Error(`[Framework.Lang] Translation pack '${id}' must provide an entries array.`);
            }

            let localeEntries = staged.get(locale.code);
            if (!localeEntries) {
                localeEntries = new Map();
                staged.set(locale.code, localeEntries);
            }

            const packKeys = new Set<UtilBrands.TranslationKey>();
            for (const entry of pack.entries) {
                if (!Array.isArray(entry) || entry.length !== 2) {
                    throw new Error(`[Framework.Lang] Every entry in pack '${id}' must be a [key, value] pair.`);
                }

                const [key, value] = entry;
                if (typeof key !== "symbol" || !this._knownKeys.has(key as UtilBrands.TranslationKey)) {
                    throw new Error(`[Framework.Lang] Pack '${id}' contains an unknown translation key.`);
                }
                if (typeof value !== "string") {
                    throw new Error(`[Framework.Lang] The value for a key in pack '${id}' must be a string.`);
                }
                const translationKey = key as UtilBrands.TranslationKey;
                if (packKeys.has(translationKey)) {
                    throw new Error(`[Framework.Lang] Pack '${id}' contains the same key more than once.`);
                }
                packKeys.add(translationKey);

                const previouslyStaged = localeEntries.get(translationKey);
                const existsInDirectory = this._directory[locale.code]?.has(translationKey) ?? false;
                if ((previouslyStaged || existsInDirectory) && !pack.override) {
                    throw new Error(`[Framework.Lang] A translation already exists for this key in '${locale.code}'. Set override: true to replace it.`);
                }

                localeEntries.set(translationKey, {value, override: !!pack.override});
            }
            stagedPackKeys.set(id, packKeys);
        }

        for (const [code, entries] of staged) {
            if (!this._directory[code]) this._directory[code] = new Map();
            for (const [key, entry] of entries) {
                this._directory[code].set(key, entry.value);
            }
        }

        for (const id of packIds) {
            this._registeredPackIds.add(id);
            this._packKeys.set(id, stagedPackKeys.get(id) ?? new Set());
        }
        if (packIds.size) this._touchDirectory();
    }


    /** Removes consumer-owned keys, catalogs, and packs when their application scope is disposed. */
    static unregisterNamespace(namespace: string): number {
        const normalizedNamespace = String(namespace ?? "").trim();
        if (!normalizedNamespace) return 0;
        const prefix = `${normalizedNamespace}.`;
        const removedKeys = new Set<UtilBrands.TranslationKey>();

        for (const [key, metadata] of this._keyMetadata) {
            if (metadata.namespace === normalizedNamespace || metadata.namespace.startsWith(prefix)) {
                removedKeys.add(key);
                this._keyMetadata.delete(key);
                this._knownKeys.delete(key);
            }
        }
        for (const [id, key] of this._customKeys) {
            if (id === normalizedNamespace || id.startsWith(prefix)) this._customKeys.delete(id);
            if (removedKeys.has(key)) this._customKeys.delete(id);
        }
        for (const dictionary of Object.values(this._directory)) {
            for (const key of removedKeys) dictionary.delete(key);
        }
        for (const [id, catalog] of this._catalogs) {
            if (id === normalizedNamespace || id.startsWith(prefix)) this._catalogs.delete(id);
        }
        for (const [packId, keys] of this._packKeys) {
            for (const key of removedKeys) keys.delete(key);
            if (keys.size === 0) {
                this._packKeys.delete(packId);
                this._registeredPackIds.delete(packId);
            }
        }

        if (removedKeys.size) this._touchDirectory();
        return removedKeys.size;
    }


    static registerPack(
        pack: TTranslationPack
    ): void {
        this.registerPacks([pack]);
    }


    static getPack(
        locale: TTranslationLocale
    ): Array<readonly [UtilBrands.TranslationKey, string]> {

        const resolved = this._resolveRegisteredLocale(locale);
        return Array.from(this._directory[resolved.code]?.entries() ?? []);
    }


    static getTranslations(
        key: UtilBrands.TranslationKey
    ): Record<string, string> {

        const translations: Record<string, string> = {};
        for (const locale of this._locales.values()) {
            const value = this._directory[locale.code]?.get(key);
            if (value != null) translations[locale.code] = value;
        }
        return translations;
    }


    static registerDictionary(
        directory: TLanguageDirectory
    ): void {

        for (const code in directory) {
            const incoming = directory[code];
            if (!incoming) continue;

            if (!this._directory[code]) {
                this._directory[code] = new Map();
            }

            for (const [key, value] of incoming) {
                this._directory[code].set(key, value);
                this._knownKeys.add(key);
            }
        }

        this._touchDirectory();
    }


    static setLanguage(
        language: TLanguageDefinition
    ): void {

        this.setLocale(language);
    }


    static setLocale(
        locale: TTranslationLocale
    ): void {

        const language = typeof locale === "string"
            ? this._resolveRegisteredLocale(locale)
            : this.registerLocale(locale);

        CoreConfig.App
            .state(
                CoreConfig.States.Language
            )
            .set(language);

        CoreConfig.App
            .state(
                CoreConfig.States.DirectionRtl
            )
            .set(language.directionRtl);
    }


    static translate(
        key:    UtilBrands.TranslationKey,
        params: Record<string, unknown> = {}
    ): CoreObservable.App<string> {

        return CoreObservable.App.computed(
                (lang: TLanguageDefinition) => {

                    const dictionary =
                        this._directory[
                            lang?.code
                            ];

                    const fallback =
                        this._directory[
                            this._fallback?.code
                            ];

                    const text =
                        dictionary?.get(key)
                        ??
                        fallback?.get(key)
                        ??
                        "";

                    return this._template(
                        text,
                        params
                    );
                },
                [
                    CoreConfig.App.state(CoreConfig.States.Language).observable(),
                    this._directoryRevision,
                ]
            );
    }


    static t(
        key: UtilBrands.TranslationKey,
        params: Record<string, unknown> = {}
    ): string {
        return this.translate(key, params).get();
    }


    private static _normalizeCatalogTexts(
        rawTexts: unknown,
        path: string,
        requireNonEmptyValues: boolean,
        fail: (path: string, reason: string) => never,
    ): TTranslationCatalogText[] {

        if (!Array.isArray(rawTexts) || rawTexts.length === 0) {
            fail(path, "expected a non-empty array of localized values");
        }

        const texts = rawTexts as unknown[];
        const seenLocales = new Set<string>();
        return texts.map((rawText, index) => {
            const itemPath = `${path}[${index}]`;
            if (!rawText || typeof rawText !== "object" || Array.isArray(rawText)) {
                fail(itemPath, "expected an object with locale and value");
            }

            const item = rawText as Record<string, unknown>;
            const rawLocale = item.locale;
            if (!rawLocale || typeof rawLocale !== "object" || Array.isArray(rawLocale)) {
                fail(`${itemPath}.locale`, "use a registered Framework.Lang.Locale reference");
            }

            let locale: TLanguageDefinition;
            try {
                locale = this._resolveRegisteredLocale(rawLocale as TLanguageDefinition);
            } catch {
                fail(`${itemPath}.locale`, "locale is not registered; use a registered Framework.Lang.Locale reference");
            }

            const inputLocale = rawLocale as TLanguageDefinition;
            if (
                inputLocale.name !== locale.name
                || inputLocale.directionRtl !== locale.directionRtl
            ) {
                fail(`${itemPath}.locale`, "locale metadata does not match the registered Framework.Lang.Locale reference");
            }

            if (seenLocales.has(locale.code)) {
                fail(`${itemPath}.locale`, `locale '${locale.code}' is repeated`);
            }
            seenLocales.add(locale.code);

            if (typeof item.value !== "string") {
                fail(`${itemPath}.value`, "expected a string");
            }
            if (requireNonEmptyValues && !item.value.trim()) {
                fail(`${itemPath}.value`, "expected a non-empty string");
            }

            return {locale, value: item.value};
        });
    }


    private static _resolveRegisteredLocale(
        locale: TTranslationLocale
    ): TLanguageDefinition {

        const code = typeof locale === "string"
            ? locale
            : String(locale?.code ?? "");
        const registered = this._locales.get(code);

        if (!registered) {
            throw new Error(`[Framework.Lang] Locale '${code || "<empty>"}' has not been registered.`);
        }

        return registered;
    }


    private static _touchDirectory(): void {
        this._directoryRevision.set(this._directoryRevision.get() + 1);
    }


    private static _template(
        text: string,
        params: Record<string, unknown>
    ): string {

        return text.replace(
            /\{\{(.*?)\}\}/g,
            (_, key: string) => {

                const value =
                    params[key.trim()];

                return value == null
                    ? ""
                    : String(value);
            }
        );
    }
}
