import * as FrameworkLang from "./Lang";
import {ClRouter} from "./module_core/module_route/class/ClRouter";
import type {TControllerRouteRenderer, TRouterOptions} from "./module_core/module_route/types/TRouteData";
import type {TRouter} from "./module_core/module_route/types/TRouter";
import type {
    DefinedTranslationKeys,
    TranslationCatalogDefinition,
    TranslationPack,
    TranslationKeyDefinitions,
} from "./module_core/module_languages/type";
import type {TranslationKey} from "./module_util/module_brands";
import {ControllerManager} from "./module_ui/module_controller/registry/ControllerManager";
import type {
    ControllerCategoryDefinition,
    ControllerCategoryReference,
    ControllerCategoryRegistration,
    ControllerDefinition,
    ControllerRegistryEntry,
} from "./module_ui/module_controller/registry/Types";
import {PageManager, STANDARD_PAGE_LAYOUT} from "./module_ui/module_pages/registry/PageManager";
import type {
    ConsumerPageDefinition,
    ConsumerPageLayoutDefinition,
    ConsumerPageRegistryEntry,
    ConsumerPageSlotSource,
} from "./module_ui/module_pages/registry/Types";

export type ConsumerMountOptions = {
    root: HTMLElement | string;
    routes?: TRouter;
    controllerRenderer: TControllerRouteRenderer;
    routerOptions?: TRouterOptions;
};

export type ConsumerApplicationOptions = {
    id: string;
};

const activeConsumerIds = new Set<string>();

export interface ConsumerApplication {
    readonly id: string;
    readonly language: {
        readonly Locale: typeof FrameworkLang.Locale;
        defineKeys<const T extends TranslationKeyDefinitions>(namespace: string, definitions: T): DefinedTranslationKeys<T>;
        registerLocale(locale: Parameters<typeof FrameworkLang.registerLocale>[0]): ReturnType<typeof FrameworkLang.registerLocale>;
        registerCatalog(catalog: TranslationCatalogDefinition): ReturnType<typeof FrameworkLang.registerCatalog>;
        registerPack(pack: TranslationPack): void;
        registerPacks(packs: readonly TranslationPack[]): void;
        t(key: TranslationKey, params?: Record<string, unknown>): string;
        setLocale(locale: Parameters<typeof FrameworkLang.setLocale>[0]): void;
        listLocales: typeof FrameworkLang.listLocales;
    };
    readonly controllers: {
        registerCategories(definition: {namespace: string; categories: readonly ControllerCategoryDefinition[]}): ControllerCategoryRegistration;
        register<TParams = unknown>(definition: Omit<ControllerDefinition<TParams>, "id"> & {id: string}): ControllerRegistryEntry<TParams>;
        registerMany(definitions: readonly (Omit<ControllerDefinition<any>, "id"> & {id: string})[]): ControllerRegistryEntry[];
        get(id: string): ControllerRegistryEntry | undefined;
        has(id: string): boolean;
        list(): ControllerRegistryEntry[];
        listCategories(): ControllerCategoryReference[];
        listByCategory(category: ControllerCategoryReference, includeDescendants?: boolean): ControllerRegistryEntry[];
        listWorkflowNodes(id: string): ReturnType<typeof ControllerManager.listWorkflowNodes>;
        create(id: string, params?: unknown): ReturnType<typeof ControllerManager.create>;
    };
    readonly pages: {
        readonly standardLayout: typeof STANDARD_PAGE_LAYOUT;
        registerLayout(definition: Omit<ConsumerPageLayoutDefinition, "id" | "extends" | "slots"> & {
            id: string;
            extends?: string;
            slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
        }): ConsumerPageLayoutDefinition;
        registerLayouts(definitions: readonly (Omit<ConsumerPageLayoutDefinition, "id" | "extends" | "slots"> & {
            id: string;
            extends?: string;
            slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
        })[]): ConsumerPageLayoutDefinition[];
        register(definition: Omit<ConsumerPageDefinition, "id" | "layout" | "slots" | "controllers"> & {
            id: string;
            layout?: string;
            slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
            controllers?: ConsumerPageDefinition["controllers"];
        }): ConsumerPageRegistryEntry;
        registerMany(definitions: readonly (Omit<ConsumerPageDefinition, "id" | "layout" | "slots" | "controllers"> & {
            id: string;
            layout?: string;
            slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
            controllers?: ConsumerPageDefinition["controllers"];
        })[]): ConsumerPageRegistryEntry[];
        get(id: string): ConsumerPageRegistryEntry | undefined;
        has(id: string): boolean;
        list(): ConsumerPageRegistryEntry[];
        createRoutes(baseRoutes?: TRouter): TRouter;
    };
    mount(options: ConsumerMountOptions): ClRouter;
    navigate(path: string): void;
    dispose(): void;
}

const assertAppId = (value: unknown): string => {
    const id = typeof value === "string" ? value.trim() : "";
    if (!/^[A-Za-z][A-Za-z0-9._-]*$/.test(id)) {
        throw new Error("[Framework.Consumer] id must start with a letter and use letters, digits, dot, underscore, or hyphen.");
    }
    return id;
};

const prefixLocalId = (scope: string, section: string, value: string): string => {
    const id = String(value ?? "").trim();
    if (!id) throw new Error(`[Framework.Consumer] ${section} id cannot be empty.`);
    return id.startsWith(`${scope}.`) ? id : `${scope}.${section}.${id}`;
};

const prefixSlotSource = (scope: string, source: ConsumerPageSlotSource): ConsumerPageSlotSource => {
    if (source === null) return null;
    if (typeof source === "function") {
        return ((context) => prefixSlotSource(scope, source(context))) as ConsumerPageSlotSource;
    }
    const binding = typeof source === "string" ? {id: source} : source;
    return {...binding, id: prefixLocalId(scope, "controllers", binding.id)};
};

/** Creates an isolated consumer facade over the framework's shared registries. */
export const create = (options: ConsumerApplicationOptions): ConsumerApplication => {
    const id = assertAppId(options?.id);
    if (activeConsumerIds.has(id)) throw new Error(`[Framework.Consumer] Application id '${id}' is already active.`);
    activeConsumerIds.add(id);
    const appNamespace = id;
    const controllerNamespace = `${id}.controllers`;
    const pageNamespace = `${id}.pages`;
    const categoryNamespaces = new Set<string>();
    const registeredControllerIds = new Set<string>();
    let mountedRouter: ClRouter | null = null;
    let disposed = false;

    const assertActive = () => {
        if (disposed) throw new Error(`[Framework.Consumer] Application '${id}' has been disposed.`);
    };
    const controllerId = (value: string) => prefixLocalId(id, "controllers", value);
    const pageId = (value: string) => prefixLocalId(id, "pages", value);
    const layoutId = (value: string) => prefixLocalId(id, "layouts", value);

    const language: ConsumerApplication["language"] = {
        Locale: FrameworkLang.Locale,
        defineKeys: (namespace, definitions) => {
            assertActive();
            const local = String(namespace ?? "").trim();
            if (!local) throw new Error("[Framework.Consumer] language namespace cannot be empty.");
            const fullNamespace = local === id || local.startsWith(`${id}.`) ? local : `${id}.${local}`;
            return FrameworkLang.defineKeys(fullNamespace, definitions);
        },
        registerLocale: (locale) => {
            assertActive();
            return FrameworkLang.registerLocale(locale);
        },
        registerCatalog: (catalog) => {
            assertActive();
            const catalogId = catalog?.id?.trim();
            if (!catalogId) throw new Error("[Framework.Consumer] catalog id cannot be empty.");
            return FrameworkLang.registerCatalog({...catalog, id: catalogId.startsWith(`${id}.`) ? catalogId : `${id}.${catalogId}`});
        },
        registerPack: (pack) => language.registerPacks([pack]),
        registerPacks: (packs) => {
            assertActive();
            if (!Array.isArray(packs)) throw new Error("[Framework.Consumer] packs must be an array.");
            const staged = packs.map((pack) => {
                const packId = String(pack?.id ?? "").trim();
                if (!packId) throw new Error("[Framework.Consumer] pack id cannot be empty.");
                for (const [key] of pack.entries ?? []) {
                    const metadata = FrameworkLang.getKeyMetadata(key);
                    if (!metadata || !(metadata.namespace === id || metadata.namespace.startsWith(`${id}.`))) {
                        throw new Error(`[Framework.Consumer] pack '${packId}' may only provide keys defined by application '${id}'.`);
                    }
                }
                return {...pack, id: packId.startsWith(`${id}.`) ? packId : `${id}.packs.${packId}`};
            });
            FrameworkLang.registerPacks(staged);
        },
        t: (key, params) => FrameworkLang.t(key, params),
        setLocale: (locale) => FrameworkLang.setLocale(locale),
        listLocales: () => FrameworkLang.listLocales(),
    };

    const controllers: ConsumerApplication["controllers"] = {
        registerCategories: ({namespace, categories}) => {
            assertActive();
            const localNamespace = String(namespace ?? "").trim();
            if (!localNamespace) throw new Error("[Framework.Consumer] controller category namespace cannot be empty.");
            const fullNamespace = `${controllerNamespace}.${localNamespace}`;
            const registration = ControllerManager.registerCategories({namespace: fullNamespace, categories});
            categoryNamespaces.add(fullNamespace);
            return registration;
        },
        register: (definition) => {
            assertActive();
            const entry = ControllerManager.register({...definition, id: controllerId(definition.id)});
            registeredControllerIds.add(entry.id);
            return entry;
        },
        registerMany: (definitions) => {
            assertActive();
            const entries = ControllerManager.registerMany(definitions.map((definition) => ({...definition, id: controllerId(definition.id)})));
            entries.forEach((entry) => registeredControllerIds.add(entry.id));
            return entries;
        },
        get: (id) => ControllerManager.get(controllerId(id)),
        has: (id) => ControllerManager.has(controllerId(id)),
        list: () => ControllerManager.list().filter((entry) => entry.id.startsWith(`${controllerNamespace}.`)),
        listCategories: () => ControllerManager.listCategories().filter((category) => category.namespace.startsWith(`${controllerNamespace}.`)),
        listByCategory: (category, includeDescendants = true) => ControllerManager.listByCategory(category, includeDescendants),
        listWorkflowNodes: (id) => ControllerManager.listWorkflowNodes(controllerId(id)),
        create: (id, params) => ControllerManager.create(controllerId(id), params),
    };

    const normalizeLayoutDefinition = (definition: ConsumerPageLayoutDefinition): ConsumerPageLayoutDefinition => ({
        ...definition,
        id: layoutId(definition.id),
        ...(definition.extends ? {extends: layoutId(definition.extends)} : {}),
        ...(definition.slots ? {slots: Object.fromEntries(Object.entries(definition.slots).map(([name, source]) => [name, prefixSlotSource(id, source)]))} : {}),
    });
    const normalizePageDefinition = (definition: ConsumerPageDefinition): ConsumerPageDefinition => {
        const slots = definition.slots
            ? Object.fromEntries(Object.entries(definition.slots).map(([name, source]) => [name, prefixSlotSource(id, source)]))
            : undefined;
        const controllers = definition.controllers ? {
            ...definition.controllers,
            content: prefixSlotSource(id, definition.controllers.content) as NonNullable<ConsumerPageDefinition["controllers"]>["content"],
            ...(definition.controllers.sidebar !== undefined
                ? {sidebar: prefixSlotSource(id, definition.controllers.sidebar) as NonNullable<ConsumerPageDefinition["controllers"]>["sidebar"]}
                : {}),
        } : undefined;
        return {
            ...definition,
            id: pageId(definition.id),
            ...(definition.layout ? {layout: layoutId(definition.layout)} : {}),
            ...(slots ? {slots} : {}),
            ...(controllers ? {controllers} : {}),
        };
    };

    const pages: ConsumerApplication["pages"] = {
        standardLayout: STANDARD_PAGE_LAYOUT,
        registerLayout: (definition) => {
            assertActive();
            return PageManager.registerLayout(normalizeLayoutDefinition(definition));
        },
        registerLayouts: (definitions) => {
            assertActive();
            return PageManager.registerLayouts(definitions.map(normalizeLayoutDefinition));
        },
        register: (definition) => {
            assertActive();
            return PageManager.register(normalizePageDefinition(definition));
        },
        registerMany: (definitions) => {
            assertActive();
            return PageManager.registerMany(definitions.map(normalizePageDefinition));
        },
        get: (id) => PageManager.get(pageId(id)),
        has: (id) => PageManager.has(pageId(id)),
        list: () => PageManager.list().filter((page) => page.id.startsWith(`${pageNamespace}.`)),
        createRoutes: (baseRoutes = {}) => {
            assertActive();
            return PageManager.createRoutes(baseRoutes, {namespace: pageNamespace, scopeId: `${id}:runtime`});
        },
    };

    const app: ConsumerApplication = {
        id,
        language,
        controllers,
        pages,
        mount: (mountOptions) => {
            assertActive();
            mountedRouter?.destroy();
            const root = typeof mountOptions.root === "string"
                ? document.querySelector<HTMLElement>(mountOptions.root)
                : mountOptions.root;
            if (!root) throw new Error(`[Framework.Consumer] mount root '${String(mountOptions.root)}' was not found.`);
            if (typeof mountOptions.controllerRenderer !== "function") {
                throw new Error("[Framework.Consumer] mount requires a controllerRenderer, usually Ui.Fetch.Widget.");
            }
            mountedRouter = new ClRouter(root, pages.createRoutes(mountOptions.routes ?? {}), mountOptions.controllerRenderer, mountOptions.routerOptions);
            mountedRouter.resolve();
            return mountedRouter;
        },
        navigate: (path) => {
            assertActive();
            if (!mountedRouter) throw new Error(`[Framework.Consumer] Application '${id}' must be mounted before navigating.`);
            mountedRouter.navigate(path);
        },
        dispose: () => {
            if (disposed) return;
            mountedRouter?.destroy();
            mountedRouter = null;
            PageManager.unregisterNamespace(id);
            for (const registeredId of registeredControllerIds) ControllerManager.unregister(registeredId);
            for (const namespace of categoryNamespaces) ControllerManager.unregisterCategories(namespace);
            FrameworkLang.unregisterNamespace(appNamespace);
            disposed = true;
            activeConsumerIds.delete(id);
        },
    };

    return app;
};
