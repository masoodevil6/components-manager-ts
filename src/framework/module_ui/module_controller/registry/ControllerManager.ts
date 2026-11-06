import {App as LanguageApp} from "@/core_languages";
import type {TranslationKey} from "@/util_brands";
import type {
    ControllerCategoryDefinition,
    ControllerCategoryReference,
    ControllerCategoryRegistration,
    ControllerDefinition,
    ControllerRegistryEntry,
    ControllerRequestResult,
    ControllerWorkflowNodeEntry,
    ControllerWorkflowNodeNames,
} from "./Types";

const MAX_CATEGORY_DEPTH = 32;

const categoryRegistrations = new Map<string, ControllerCategoryRegistration>();
const categoryReferences = new WeakSet<object>();
const controllerEntries = new Map<string, ControllerRegistryEntry<any>>();

function fail(path: string, reason: string): never {
    throw new Error(`[ControllerManager] Invalid registration at ${path}: ${reason}.`);
}

function normalizeId(value: unknown, path: string): string {
    const id = typeof value === "string" ? value.trim() : "";
    if (!id) fail(path, "expected a non-empty string");
    return id;
}

function assertTranslationKey(value: unknown, path: string): asserts value is TranslationKey {
    if (typeof value !== "symbol" || !LanguageApp.getKeyMetadata(value as TranslationKey)) {
        fail(path, "expected a registered Framework.Lang translation key");
    }
}

function normalizeCategoryTree(
    namespace: string,
    input: readonly ControllerCategoryDefinition[],
): {roots: readonly ControllerCategoryReference[]; flat: ControllerCategoryReference[]} {
    if (!Array.isArray(input) || input.length === 0) fail("categories", "expected a non-empty array");

    const ids = new Set<string>();
    const visiting = new WeakSet<object>();
    const flat: ControllerCategoryReference[] = [];

    const visit = (
        raw: unknown,
        parentPath: readonly string[],
        path: string,
        depth: number,
    ): ControllerCategoryReference => {
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected a category object");
        if (depth > MAX_CATEGORY_DEPTH) fail(path, `maximum category depth is ${MAX_CATEGORY_DEPTH}`);
        if (visiting.has(raw as object)) fail(path, "circular category references are not allowed");
        visiting.add(raw as object);

        const category = raw as ControllerCategoryDefinition;
        const id = normalizeId(category.id, `${path}.id`);
        if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id)) {
            fail(`${path}.id`, "use letters, digits, dot, underscore, or hyphen");
        }
        if (ids.has(id)) fail(`${path}.id`, `category id '${id}' is duplicated in this namespace`);
        ids.add(id);
        assertTranslationKey(category.titleKey, `${path}.titleKey`);
        if (category.descriptionKey !== undefined) {
            assertTranslationKey(category.descriptionKey, `${path}.descriptionKey`);
        }
        if (category.children !== undefined && !Array.isArray(category.children)) {
            fail(`${path}.children`, "expected an array");
        }

        const currentPath = [...parentPath, id];
        const children = (category.children ?? []).map((child, index) =>
            visit(child, currentPath, `${path}.children[${index}]`, depth + 1),
        );
        visiting.delete(raw as object);

        const reference: ControllerCategoryReference = Object.freeze({
            namespace,
            id,
            path: Object.freeze(currentPath),
            titleKey: category.titleKey,
            ...(category.descriptionKey !== undefined ? {descriptionKey: category.descriptionKey} : {}),
            children: Object.freeze(children),
        });
        flat.push(reference);
        categoryReferences.add(reference);
        return reference;
    };

    const roots = input.map((category, index) => visit(category, [], `categories[${index}]`, 1));
    return {roots: Object.freeze(roots), flat};
}

function createCategoryRegistration(
    namespace: string,
    roots: readonly ControllerCategoryReference[],
    flat: readonly ControllerCategoryReference[],
): ControllerCategoryRegistration {
    const byId = new Map(flat.map((category) => [category.id, category]));
    return Object.freeze({
        namespace,
        categories: roots,
        get: (id: string) => byId.get(String(id ?? "").trim()) ?? null,
        list: () => [...flat],
    });
}

function normalizeWorkflowNodes(
    raw: ControllerDefinition["workflowNodes"],
    path: string,
): {titles: Readonly<Record<string, TranslationKey>>; names: ControllerWorkflowNodeNames} {
    if (raw == null) {
        return {titles: Object.freeze({}), names: Object.freeze({})};
    }
    if (typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected an object of workflow node titles");

    const titles: Record<string, TranslationKey> = Object.create(null);
    const names: Record<string, string> = Object.create(null);
    for (const [name, titleKey] of Object.entries(raw)) {
        if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) {
            fail(`${path}.${name}`, "workflow node names must be stable identifier-like keys");
        }
        assertTranslationKey(titleKey, `${path}.${name}`);
        titles[name] = titleKey;
        names[name] = name;
    }
    return {titles: Object.freeze(titles), names: Object.freeze(names)};
}

function validateControllerResponse(value: unknown, id: string): import("../module_requests").RequestState {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError(`[ControllerManager] Controller '${id}' must return a RequestState object.`);
    }
    const response = value as Record<string, unknown>;
    if (typeof response.status !== "boolean" || !Array.isArray(response.messages)) {
        throw new TypeError(`[ControllerManager] Controller '${id}' returned an invalid RequestState status or messages.`);
    }
    if (!response.data || typeof response.data !== "object" || Array.isArray(response.data)) {
        throw new TypeError(`[ControllerManager] Controller '${id}' must return RequestState.data as an object.`);
    }
    if (!response.reference || typeof response.reference !== "object") {
        throw new TypeError(`[ControllerManager] Controller '${id}' must return RequestState.reference.`);
    }
    return value as import("../module_requests").RequestState;
}

function validateFactoryResult(value: ControllerRequestResult, id: string): ControllerRequestResult {
    if (value && typeof (value as Promise<unknown>).then === "function") {
        return Promise.resolve(value).then((response) => validateControllerResponse(response, id));
    }
    return validateControllerResponse(value, id);
}

export const ControllerManager = {
    registerCategories(definition: {
        namespace: string;
        categories: readonly ControllerCategoryDefinition[];
    }): ControllerCategoryRegistration {
        if (!definition || typeof definition !== "object" || Array.isArray(definition)) {
            fail("definition", "expected an object");
        }
        const namespace = normalizeId(definition?.namespace, "namespace");
        if (categoryRegistrations.has(namespace)) fail("namespace", `category namespace '${namespace}' is already registered`);

        const normalized = normalizeCategoryTree(namespace, definition.categories);
        const registration = createCategoryRegistration(namespace, normalized.roots, normalized.flat);
        categoryRegistrations.set(namespace, registration);
        return registration;
    },

    register<TParams = unknown>(definition: ControllerDefinition<TParams>): ControllerRegistryEntry<TParams> {
        return this.registerMany([definition])[0] as ControllerRegistryEntry<TParams>;
    },

    registerMany(definitions: readonly ControllerDefinition<any>[]): ControllerRegistryEntry[] {
        if (!Array.isArray(definitions) || definitions.length === 0) fail("controllers", "expected a non-empty array");

        const staged: ControllerRegistryEntry<any>[] = [];
        const ids = new Set<string>();
        for (const [index, raw] of definitions.entries()) {
            const path = `controllers[${index}]`;
            if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected a controller definition");

            const id = normalizeId(raw.id, `${path}.id`);
            if (!/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(id)) {
                fail(`${path}.id`, "use a stable namespaced identifier");
            }
            if (controllerEntries.has(id) || ids.has(id)) fail(`${path}.id`, `controller '${id}' is already registered`);
            ids.add(id);
            assertTranslationKey(raw.titleKey, `${path}.titleKey`);
            if (raw.descriptionKey !== undefined) assertTranslationKey(raw.descriptionKey, `${path}.descriptionKey`);
            if (!raw.category || typeof raw.category !== "object" || !categoryReferences.has(raw.category)) {
                fail(`${path}.category`, "use a category reference returned by registerCategories");
            }
            if (typeof raw.factory !== "function") fail(`${path}.factory`, "expected a function");

            const workflowNodes = normalizeWorkflowNodes(raw.workflowNodes, `${path}.workflowNodes`);
            staged.push(Object.freeze({
                ...raw,
                id,
                workflowNodes: workflowNodes.titles,
                workflowNodeNames: workflowNodes.names,
            }));
        }

        // Add entries only after the complete batch has passed validation.
        for (const entry of staged) controllerEntries.set(entry.id, entry);
        return [...staged];
    },

    get(id: string): ControllerRegistryEntry | undefined {
        return controllerEntries.get(String(id ?? "").trim());
    },

    unregister(id: string): boolean {
        return controllerEntries.delete(String(id ?? "").trim());
    },

    unregisterCategories(namespace: string): boolean {
        const normalized = String(namespace ?? "").trim();
        const registration = categoryRegistrations.get(normalized);
        if (!registration) return false;
        const remove = (categories: readonly ControllerCategoryReference[]) => {
            for (const category of categories) {
                categoryReferences.delete(category);
                remove(category.children);
            }
        };
        remove(registration.categories);
        categoryRegistrations.delete(normalized);
        return true;
    },

    has(id: string): boolean {
        return controllerEntries.has(String(id ?? "").trim());
    },

    list(): ControllerRegistryEntry[] {
        return [...controllerEntries.values()];
    },

    listCategories(namespace?: string): ControllerCategoryReference[] {
        if (namespace !== undefined) return categoryRegistrations.get(String(namespace).trim())?.list() ?? [];
        return [...categoryRegistrations.values()].flatMap((registration) => registration.list());
    },

    listByCategory(category: ControllerCategoryReference, includeDescendants = true): ControllerRegistryEntry[] {
        if (!categoryReferences.has(category)) {
            throw new TypeError("[ControllerManager] Use a registered controller category reference.");
        }
        return [...controllerEntries.values()].filter((entry) => {
            if (entry.category.namespace !== category.namespace) return false;
            if (entry.category.path.length < category.path.length) return false;
            if (!category.path.every((part, index) => entry.category.path[index] === part)) return false;
            return includeDescendants || entry.category.path.length === category.path.length;
        });
    },

    listWorkflowNodes(controllerId: string): ControllerWorkflowNodeEntry[] {
        const entry = this.get(controllerId);
        if (!entry) return [];
        const workflowNodes = entry.workflowNodes as Readonly<Record<string, TranslationKey>> | undefined;
        return Object.entries(workflowNodes ?? {}).map(([name, titleKey]) => ({
            id: `${entry.id}.${name}`,
            controllerId: entry.id,
            name,
            titleKey,
            title: LanguageApp.t(titleKey),
        }));
    },

    create(id: string, params?: unknown): ControllerRequestResult {
        const entry = this.get(id);
        if (!entry) throw new Error(`[ControllerManager] Controller '${String(id ?? "")}' is not registered.`);
        return validateFactoryResult(entry.factory({
            params,
            workflowNodeNames: entry.workflowNodeNames,
        }), entry.id);
    },
};

