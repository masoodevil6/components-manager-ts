import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import {HttpStatusCode} from "@/util_consts";
import {RouteRenderMode, type ControllerRouteData, type TRouter} from "@/core_route";
import {ControllerManager} from "../../module_controller/registry/ControllerManager";
import {RequestManager} from "../../module_controller/module_requests/class/RequestManager";
import {RequestMethod} from "../../module_controller/module_requests/types/RequestMethod";
import {PAGE_FORMAT_WIDGET_SOURCE} from "../../module_controller/module_requests/module_static/v1/MyPagePageFormatSource";
import type {RequestState} from "../../module_controller/module_requests/types/RequestState";
import type {
    ConsumerPageContext,
    ConsumerPageControllerBinding,
    ConsumerPageControllerParams,
    ConsumerPageDefinition,
    ConsumerPageLayoutDefinition,
    ConsumerPageLayoutInstance,
    ConsumerPageRegistryEntry,
    ConsumerPageSlotSource,
    ConsumerPageSlots,
} from "./Types";

export const STANDARD_PAGE_LAYOUT = "framework.component-page";
const STANDARD_PAGE_SLOTS = new Set(["header", "navigation", "content", "sidebar", "footer", "setting"]);

const pageEntries = new Map<string, ConsumerPageRegistryEntry>();
const pathOwners = new Map<string, string>();
const layoutEntries = new Map<string, ConsumerPageLayoutDefinition>();
let routeMapCounter = 0;

function fail(path: string, reason: string): never {
    throw new Error(`[PageManager] Invalid registration at ${path}: ${reason}.`);
}

function normalizeId(value: unknown, path: string): string {
    const id = typeof value === "string" ? value.trim() : "";
    if (!id) fail(path, "expected a non-empty string");
    if (!/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(id)) fail(path, "use a stable namespaced identifier");
    return id;
}

function normalizePath(value: unknown, path: string): string {
    if (typeof value !== "string") fail(path, "expected a route path string");
    let routePath = value.trim();
    if (!routePath.startsWith("/") || routePath.startsWith("//")) fail(path, "route paths must start with one slash");
    if (routePath.includes("?") || routePath.includes("#")) fail(path, "put query values in controller params, not the route pattern");
    if (routePath.length > 1 && routePath.endsWith("/")) routePath = routePath.slice(0, -1);

    const names = new Set<string>();
    for (const [index, segment] of routePath.split("/").filter(Boolean).entries()) {
        if (segment.startsWith(":")) {
            const name = segment.slice(1);
            if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) fail(`${path}[${index}]`, "invalid route parameter name");
            if (names.has(name)) fail(`${path}[${index}]`, `route parameter '${name}' is duplicated`);
            names.add(name);
        } else if (!/^[A-Za-z0-9._~-]+$/.test(segment)) {
            fail(`${path}[${index}]`, "use URL-safe static path segments or `:parameter` segments");
        }
    }
    return routePath || "/";
}

function pathSignature(path: string): string {
    return path.split("/").map((segment) => segment.startsWith(":") ? ":" : segment).join("/");
}

function normalizeBinding(raw: unknown, path: string): ConsumerPageControllerBinding {
    const binding = typeof raw === "string" ? {id: raw} : raw;
    if (!binding || typeof binding !== "object" || Array.isArray(binding)) fail(path, "expected a controller id or binding object");
    const id = normalizeId((binding as ConsumerPageControllerBinding).id, `${path}.id`);
    if (!ControllerManager.has(id)) fail(`${path}.id`, `controller '${id}' is not registered`);
    const params = (binding as ConsumerPageControllerBinding).params;
    if (params !== undefined && typeof params !== "function" && (!params || typeof params !== "object" || Array.isArray(params))) {
        fail(`${path}.params`, "expected a params object or resolver");
    }
    if (typeof params === "function" && params.length > 1) fail(`${path}.params`, "a params resolver accepts one page context argument");
    return Object.freeze({id, ...(params !== undefined ? {params} : {})});
}

function normalizeSlotSource(raw: unknown, path: string): ConsumerPageSlotSource {
    if (raw === null) return null;
    if (typeof raw === "function") return raw as ConsumerPageSlotSource;
    return normalizeBinding(raw, path);
}

function normalizeSlots(raw: unknown, path: string): Readonly<Record<string, ConsumerPageSlotSource>> {
    if (raw === undefined) return Object.freeze({});
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected a named slot object");
    const slots: Record<string, ConsumerPageSlotSource> = Object.create(null);
    for (const [name, value] of Object.entries(raw)) {
        if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(name)) fail(`${path}.${name}`, "slot names must be stable identifiers");
        slots[name] = normalizeSlotSource(value, `${path}.${name}`);
    }
    return Object.freeze(slots);
}

function normalizeDefinition(raw: unknown, path: string): ConsumerPageRegistryEntry {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected a page definition object");
    const definition = raw as ConsumerPageDefinition;
    const id = normalizeId(definition.id, `${path}.id`);
    const routePath = normalizePath(definition.path, `${path}.path`);
    if (definition.titleKey !== undefined && (typeof definition.titleKey !== "symbol" || !CoreLanguage.App.getKeyMetadata(definition.titleKey))) {
        fail(`${path}.titleKey`, "expected a registered Framework.Lang translation key");
    }
    if (definition.layout !== undefined) normalizeId(definition.layout, `${path}.layout`);
    if (definition.controllers !== undefined && (!definition.controllers || typeof definition.controllers !== "object" || Array.isArray(definition.controllers))) {
        fail(`${path}.controllers`, "expected controller bindings");
    }
    const slots: Record<string, ConsumerPageSlotSource> = {...normalizeSlots(definition.slots, `${path}.slots`)};
    if (definition.controllers) {
        if (slots.content !== undefined || slots.sidebar !== undefined) {
            fail(`${path}.controllers`, "use either legacy controllers or content/sidebar slots, not both");
        }
        slots.content = normalizeBinding(definition.controllers.content, `${path}.controllers.content`);
        if (definition.controllers.sidebar !== undefined) {
            slots.sidebar = normalizeBinding(definition.controllers.sidebar, `${path}.controllers.sidebar`);
        }
    }
    if (!definition.controllers && !Object.prototype.hasOwnProperty.call(slots, "content") && !definition.layout) {
        fail(path, "a standard page requires a content slot");
    }
    if (definition.pageNav !== undefined && !Array.isArray(definition.pageNav)) fail(`${path}.pageNav`, "expected an array");
    if (definition.headerOptionsList !== undefined && !Array.isArray(definition.headerOptionsList)) fail(`${path}.headerOptionsList`, "expected an array");
    if (definition.headerMethods !== undefined && (!definition.headerMethods || typeof definition.headerMethods !== "object" || Array.isArray(definition.headerMethods))) {
        fail(`${path}.headerMethods`, "expected a methods object");
    }
    if (definition.beforeEnter !== undefined && typeof definition.beforeEnter !== "function") fail(`${path}.beforeEnter`, "expected a function");
    if (definition.onError !== undefined && typeof definition.onError !== "function") fail(`${path}.onError`, "expected a function");
    if (definition.renderDuration !== undefined && (!Number.isFinite(definition.renderDuration) || definition.renderDuration < 0)) {
        fail(`${path}.renderDuration`, "expected a non-negative finite number");
    }

    return Object.freeze({
        ...definition,
        id,
        path: routePath,
        layout: definition.layout ?? STANDARD_PAGE_LAYOUT,
        slots: Object.freeze(slots),
        ...(definition.pageNav ? {pageNav: Object.freeze([...definition.pageNav])} : {}),
        ...(definition.headerOptionsList ? {headerOptionsList: Object.freeze([...definition.headerOptionsList])} : {}),
        renderMode: definition.renderMode ?? RouteRenderMode.NONE,
    });
}

function normalizeLayout(raw: unknown, path: string): ConsumerPageLayoutDefinition {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) fail(path, "expected a layout definition object");
    const definition = raw as ConsumerPageLayoutDefinition;
    const id = normalizeId(definition.id, `${path}.id`);
    const slots = normalizeSlots(definition.slots, `${path}.slots`);
    const requiredSlots = definition.requiredSlots ?? [];
    if (!Array.isArray(requiredSlots) || requiredSlots.some((slot) => typeof slot !== "string" || !/^[A-Za-z][A-Za-z0-9_-]*$/.test(slot))) {
        fail(`${path}.requiredSlots`, "expected an array of stable slot names");
    }
    if (definition.render !== undefined && typeof definition.render !== "function") fail(`${path}.render`, "expected a layout renderer");
    if (definition.reuse && typeof definition.render !== "function") fail(`${path}.reuse`, "reused custom layouts require a renderer that returns an update-capable instance");
    const parent = definition.extends === undefined ? undefined : normalizeId(definition.extends, `${path}.extends`);
    return Object.freeze({
        ...definition,
        id,
        ...(parent ? {extends: parent} : {}),
        slots,
        requiredSlots: Object.freeze([...requiredSlots]),
        reuse: definition.reuse === true,
    });
}

function matchPath(pattern: string, actualPath: string): Record<string, string> | null {
    const patternParts = pattern.split("/").filter(Boolean);
    const actualParts = actualPath.split("/").filter(Boolean);
    if (patternParts.length !== actualParts.length) return null;
    const values: Record<string, string> = {};
    for (let index = 0; index < patternParts.length; index++) {
        const expected = patternParts[index];
        const actual = actualParts[index];
        if (expected.startsWith(":")) {
            try { values[expected.slice(1)] = decodeURIComponent(actual); }
            catch { values[expected.slice(1)] = actual; }
        } else if (expected !== actual) return null;
    }
    return values;
}

function createContext(page: ConsumerPageRegistryEntry, pathname: string, search: string): ConsumerPageContext {
    const pathParams = matchPath(page.path, pathname) ?? {};
    const query: Record<string, string> = {};
    new URLSearchParams(search).forEach((value, key) => {query[key] = value;});
    return Object.freeze({
        pageId: page.id,
        path: pathname,
        pathParams: Object.freeze(pathParams),
        query: Object.freeze(query),
        ...(page.titleKey ? {titleKey: page.titleKey} : {}),
        hasIconBack: page.hasIconBack,
        pageNav: page.pageNav,
        asideWidth: page.asideWidth,
        headerOptionsList: page.headerOptionsList,
        headerMethods: page.headerMethods,
    });
}

function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
    return !!value && typeof (value as Promise<T>).then === "function";
}

function layoutChain(layoutId: string, path: string): ConsumerPageLayoutDefinition[] {
    if (layoutId === STANDARD_PAGE_LAYOUT) return [];
    const chain: ConsumerPageLayoutDefinition[] = [];
    const seen = new Set<string>();
    let current: string | undefined = layoutId;
    while (current) {
        if (seen.has(current)) fail(path, `layout inheritance cycle includes '${current}'`);
        seen.add(current);
        const layout = layoutEntries.get(current);
        if (!layout) fail(path, `layout '${current}' is not registered`);
        chain.unshift(layout);
        current = layout.extends;
    }
    return chain;
}

function resolveSlotSources(page: ConsumerPageRegistryEntry, chain: readonly ConsumerPageLayoutDefinition[]): Map<string, ConsumerPageSlotSource> {
    const resolved = new Map<string, ConsumerPageSlotSource>();
    for (const layout of chain) for (const [name, source] of Object.entries(layout.slots ?? {})) resolved.set(name, source);
    for (const [name, source] of Object.entries(page.slots)) resolved.set(name, source);
    return resolved;
}

function resolveRenderer(chain: readonly ConsumerPageLayoutDefinition[]): ConsumerPageLayoutDefinition | null {
    for (let index = chain.length - 1; index >= 0; index--) if (chain[index].render) return chain[index];
    return null;
}

function resolveParams(binding: ConsumerPageControllerBinding, context: ConsumerPageContext): unknown {
    const params: ConsumerPageControllerParams = binding.params;
    return typeof params === "function" ? params(context) : params;
}

function resolveSource(source: ConsumerPageSlotSource, context: ConsumerPageContext, path: string): ConsumerPageControllerBinding | null {
    const value = typeof source === "function" ? source(context) : source;
    if (value === null) return null;
    return normalizeBinding(value, path);
}

async function createStandardLayout(page: ConsumerPageRegistryEntry, context: ConsumerPageContext, slots: ConsumerPageSlots): Promise<ConsumerPageLayoutInstance> {
    const [{Component: ComponentPage}, {Component: ComponentPageHeader}] = await Promise.all([
        import("../../module_components/lists/componentPage"),
        import("../../module_components/lists/componentPageHeader"),
    ]);
    const makeDefaultHeader = (nextContext: ConsumerPageContext) => {
        const title = nextContext.titleKey ? CoreLanguage.App.translate(nextContext.titleKey) : new CoreObservable.App("");
        const header = new ComponentPageHeader({
            prop_workflowChildName: "header",
            prop_pageTitle: title.get(),
            prop_hasIconBack: nextContext.hasIconBack ?? true,
            prop_pageNav: nextContext.pageNav ? [...nextContext.pageNav] : [{name: "home", title: "Home"}],
            prop_optionsList: nextContext.headerOptionsList ? [...nextContext.headerOptionsList] : [],
        } as any, nextContext.headerMethods ?? {});
        const unsubscribe = title.subscribe((value) => header.set("prop_pageTitle", value));
        return {component: header, unsubscribe};
    };
    const hasHeaderOverride = Object.prototype.hasOwnProperty.call(slots, "header");
    let defaultHeader = hasHeaderOverride ? null : makeDefaultHeader(context);
    let currentTitleKey = page.titleKey;
    const component = new ComponentPage({
        prop_workflowChildName: "page",
        prop_header: hasHeaderOverride ? slots.header : defaultHeader?.component,
        prop_navigation: slots.navigation ?? null,
        prop_content: slots.content ?? null,
        prop_aside: slots.sidebar ?? null,
        prop_footer: slots.footer ?? null,
        prop_setting: slots.setting ?? null,
        prop_asideWidth: page.asideWidth ?? "280px",
    } as any);
    return {
        component,
        update: (nextContext: ConsumerPageContext, nextSlots: ConsumerPageSlots) => {
            const nextHasHeaderOverride = Object.prototype.hasOwnProperty.call(nextSlots, "header");
            if (!nextHasHeaderOverride && (!defaultHeader || currentTitleKey !== nextContext.titleKey)) {
                defaultHeader?.unsubscribe();
                defaultHeader?.component.dispose?.();
                defaultHeader = makeDefaultHeader(nextContext);
                currentTitleKey = nextContext.titleKey;
            } else if (!nextHasHeaderOverride && defaultHeader) {
                defaultHeader.component.set("prop_hasIconBack", nextContext.hasIconBack ?? true);
                defaultHeader.component.set("prop_pageNav", nextContext.pageNav ? [...nextContext.pageNav] : [{name: "home", title: "Home"}]);
                defaultHeader.component.set("prop_optionsList", nextContext.headerOptionsList ? [...nextContext.headerOptionsList] : []);
            } else if (nextHasHeaderOverride && defaultHeader) {
                defaultHeader.unsubscribe();
                defaultHeader.component.dispose?.();
                defaultHeader = null;
            }
            component.set("prop_header", nextHasHeaderOverride ? nextSlots.header : defaultHeader?.component ?? null);
            component.set("prop_navigation", nextSlots.navigation ?? null);
            component.set("prop_content", nextSlots.content ?? null);
            component.set("prop_aside", nextSlots.sidebar ?? null);
            component.set("prop_footer", nextSlots.footer ?? null);
            component.set("prop_setting", nextSlots.setting ?? null);
            component.set("prop_asideWidth", nextContext.asideWidth ?? "280px");
        },
        dispose: () => {
            defaultHeader?.unsubscribe();
            defaultHeader?.component.dispose?.();
            component.dispose?.();
        },
    } as ConsumerPageLayoutInstance;
}

type PageRuntime = {instance: ConsumerPageLayoutInstance; rendererId: string};

function createPageRoute(
    page: ConsumerPageRegistryEntry,
    runtimeKeyPrefix: string,
    runtimes: Map<string, PageRuntime>,
    runVersions: Map<string, number>,
): ControllerRouteData {
    const chain = layoutChain(page.layout, `pages.${page.id}.layout`);
    const sources = resolveSlotSources(page, chain);
    const customRenderer = resolveRenderer(chain);
    const reuseLayout = page.layout === STANDARD_PAGE_LAYOUT || customRenderer?.reuse === true;
    const rendererId = customRenderer?.id ?? STANDARD_PAGE_LAYOUT;
    const runtimeKey = `${runtimeKeyPrefix}:${rendererId}${reuseLayout ? "" : `:${page.id}`}`;
    const requiredSlots = new Set<string>([
        ...(page.layout === STANDARD_PAGE_LAYOUT ? ["content"] : []),
        ...chain.flatMap((layout) => [...(layout.requiredSlots ?? [])]),
    ]);

    const run = (pathname?: string, search?: string): RequestState | Promise<RequestState> => {
        const runVersion = (runVersions.get(runtimeKey) ?? 0) + 1;
        runVersions.set(runtimeKey, runVersion);
        const actualPath = pathname ?? (typeof location !== "undefined" ? location.pathname : page.path);
        const actualSearch = search ?? (typeof location !== "undefined" ? location.search : "");
        const context = createContext(page, actualPath, actualSearch);
        const resolvedSlots = new Map<string, ConsumerPageControllerBinding | null>();
        for (const [name, source] of sources) resolvedSlots.set(name, resolveSource(source, context, `pages.${page.id}.slots.${name}`));
        for (const name of requiredSlots) if (!resolvedSlots.has(name) || resolvedSlots.get(name) === null) {
            fail(`pages.${page.id}.slots.${name}`, "required slot has no controller binding");
        }
        if (page.layout === STANDARD_PAGE_LAYOUT) {
            for (const name of resolvedSlots.keys()) if (!STANDARD_PAGE_SLOTS.has(name)) {
                fail(`pages.${page.id}.slots.${name}`, `the standard layout does not define this slot; register a custom layout for '${name}'`);
            }
        }

        const values = [...resolvedSlots.entries()];
        const controllerResults = values.map(([name, binding]) => binding === null
            ? {name, result: null}
            : {name, result: ControllerManager.create(binding.id, resolveParams(binding, context))});
        const finish = (responses: Array<{name: string; response: RequestState | null}>): RequestState | Promise<RequestState> => {
            if (runVersions.get(runtimeKey) !== runVersion) {
                return createPageResponse(page, runtimes.get(runtimeKey)?.instance.component ?? null, context, {});
            }
            const slots: Record<string, unknown> = Object.create(null);
            for (const {name, response} of responses) {
                if (!response) {
                    slots[name] = null;
                    continue;
                }
                const binding = resolvedSlots.get(name)! as ConsumerPageControllerBinding;
                if (!response.status) throw new Error(`[PageManager] Slot controller '${binding.id}' failed: ${response.messages.join(" ")}`);
                const content = response.data?.content;
                if (content == null) throw new Error(`[PageManager] Slot controller '${binding.id}' must return data.content.`);
                if (typeof content?.get === "function" && content.get("prop_workflowChildName") == null) {
                    content.set("prop_workflowChildName", name);
                }
                slots[name] = content;
            }

            let runtime = runtimes.get(runtimeKey);
            if (reuseLayout && runtime) {
                if (typeof runtime.instance.update !== "function") {
                    throw new Error(`[PageManager] Reused layout '${rendererId}' must return an update function.`);
                }
                const updated = runtime.instance.update(context, Object.freeze(slots));
                if (isPromise(updated)) {
                    return updated.then(() => createPageResponse(page, runtime!.instance.component, context, slots));
                }
                return createPageResponse(page, runtime.instance.component, context, slots);
            }

            runtime?.instance.dispose?.();
            let instance: ConsumerPageLayoutInstance;
            if (customRenderer?.render) {
                instance = customRenderer.render(context, Object.freeze(slots));
                if (!instance || typeof instance !== "object" || !("component" in instance) || instance.component == null) {
                    fail(`layouts.${customRenderer.id}.render`, "renderer must return {component, update?, dispose?}");
                }
                if (reuseLayout && typeof instance.update !== "function") {
                    fail(`layouts.${customRenderer.id}.render`, "a reused layout must return an update function");
                }
            } else {
                return createStandardLayout(page, context, slots).then((created) => {
                    runtimes.set(runtimeKey, {instance: created, rendererId});
                    return createPageResponse(page, created.component, context, slots);
                });
            }
            runtimes.set(runtimeKey, {instance, rendererId});
            return createPageResponse(page, instance.component, context, slots);
        };

        if (controllerResults.some(({result}) => isPromise(result as any))) {
            return Promise.all(controllerResults.map(async ({name, result}) => ({name, response: result === null ? null : await result})))
                .then((responses) => finish(responses));
        }
        return finish(controllerResults.map(({name, result}) => ({name, response: result as RequestState | null})));
    };

    const route: ControllerRouteData = {
        controller: () => run(),
        widgetProps: {
            prop_widgetWidth: "100%",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: [],
            prop_componentBorderStyles: {border: "0", borderRadius: "0", boxShadow: "none", padding: "0", margin: "0", background: "transparent"},
        },
        renderMode: page.renderMode,
        renderDuration: page.renderDuration,
        headerTitle: page.titleKey ? CoreLanguage.App.translate(page.titleKey) : new CoreObservable.App(""),
        ...(page.beforeEnter ? {beforeEnter: (context: any) => page.beforeEnter!(createContext(page, context.path, `?${new URLSearchParams(context.query).toString()}`))} : {}),
        ...(page.onError ? {onError: (error: unknown) => page.onError!(error, createContext(page,
            typeof location !== "undefined" ? location.pathname : page.path,
            typeof location !== "undefined" ? location.search : ""))} : {}),
        ...(reuseLayout ? {
            reuseKey: runtimeKey,
        onReuse: async (_element: HTMLElement, context: {path: string; query: Record<string, string>}) => {
            await run(context.path, new URLSearchParams(context.query).toString());
        },
        } : {}),
        onUnload: () => {
            runVersions.set(runtimeKey, (runVersions.get(runtimeKey) ?? 0) + 1);
            runtimes.get(runtimeKey)?.instance.dispose?.();
            runtimes.delete(runtimeKey);
        },
    };
    return route;
}

function createPageResponse(page: ConsumerPageRegistryEntry, component: unknown, context: ConsumerPageContext, slots: Record<string, unknown>): RequestState {
    return new RequestManager({
        state: HttpStatusCode.OK,
        status: true,
        messages: ["Consumer page is ready."],
        data: {
            pageId: page.id,
            pageTitle: page.titleKey ? CoreLanguage.App.t(page.titleKey) : "",
            path: context.path,
            pathParams: context.pathParams,
            query: context.query,
            slots,
            content: component,
        },
        source: null,
        reference: {source: page.id, method: RequestMethod.INTERNAL, respondedAt: new Date()},
    }).get();
}

function createLegacyPageRoute(page: ConsumerPageRegistryEntry): ControllerRouteData {
    const contentBinding = normalizeBinding(page.controllers!.content, `pages.${page.id}.controllers.content`);
    const sidebarBinding = page.controllers!.sidebar ? normalizeBinding(page.controllers!.sidebar, `pages.${page.id}.controllers.sidebar`) : null;
    return {
        controller: () => {
            const context = createContext(page, typeof location !== "undefined" ? location.pathname : page.path, typeof location !== "undefined" ? location.search : "");
            const contentResult = ControllerManager.create(contentBinding.id, resolveParams(contentBinding, context));
            const makePage = (contentResponse: RequestState): RequestState => {
                if (!contentResponse.status) throw new Error(`[PageManager] Content controller '${contentBinding.id}' failed: ${contentResponse.messages.join(" ")}`);
                const content = contentResponse.data?.content;
                if (content == null) throw new Error(`[PageManager] Content controller '${contentBinding.id}' must return data.content.`);
                const sidebar = sidebarBinding ? () => ControllerManager.create(sidebarBinding.id, resolveParams(sidebarBinding, context)) : null;
                return new RequestManager({
                    state: HttpStatusCode.OK,
                    status: true,
                    messages: ["Consumer page is ready."],
                    data: {
                        sessionKey: `consumer-page:${page.id}`,
                        pageTitle: page.titleKey ? CoreLanguage.App.t(page.titleKey) : "",
                        hasIconBack: page.hasIconBack ?? true,
                        pageNav: page.pageNav ? [...page.pageNav] : [{name: "home", title: "Home"}],
                        content,
                        sidebar,
                        asideWidth: page.asideWidth ?? "280px",
                        headerOptionsList: page.headerOptionsList ? [...page.headerOptionsList] : [],
                        headerMethods: page.headerMethods ?? {},
                        workflowNodeNames: {},
                    },
                    source: PAGE_FORMAT_WIDGET_SOURCE,
                    reference: {source: page.id, method: RequestMethod.INTERNAL, respondedAt: new Date()},
                }).get();
            };
            return isPromise(contentResult) ? contentResult.then(makePage) : makePage(contentResult);
        },
        widgetProps: {
            prop_widgetWidth: "100%",
            prop_widgetStyles: {minHeight: "0"},
            prop_componentBorderClass: [],
            prop_componentBorderStyles: {border: "0", borderRadius: "0", boxShadow: "none", padding: "0", margin: "0", background: "transparent"},
        },
        renderMode: page.renderMode,
        renderDuration: page.renderDuration,
        headerTitle: page.titleKey ? CoreLanguage.App.translate(page.titleKey) : new CoreObservable.App(""),
    };
}

function validateLayoutGraph(staged: readonly ConsumerPageLayoutDefinition[]): void {
    const lookup = new Map(layoutEntries);
    for (const layout of staged) lookup.set(layout.id, layout);
    for (const layout of staged) {
        const seen = new Set<string>();
        let current: ConsumerPageLayoutDefinition | undefined = layout;
        while (current) {
            if (seen.has(current.id)) fail(`layouts.${layout.id}`, `layout inheritance cycle includes '${current.id}'`);
            seen.add(current.id);
            if (!current.extends) break;
            current = lookup.get(current.extends);
            if (!current) fail(`layouts.${layout.id}.extends`, `layout '${layout.extends}' is not registered`);
        }
    }
}

export const PageManager = {
    registerLayout(definition: ConsumerPageLayoutDefinition): ConsumerPageLayoutDefinition {
        return this.registerLayouts([definition])[0];
    },

    registerLayouts(definitions: readonly ConsumerPageLayoutDefinition[]): ConsumerPageLayoutDefinition[] {
        if (!Array.isArray(definitions) || definitions.length === 0) fail("layouts", "expected a non-empty array");
        const staged = definitions.map((definition, index) => normalizeLayout(definition, `layouts[${index}]`));
        const ids = new Set<string>();
        for (const layout of staged) {
            if (layout.id === STANDARD_PAGE_LAYOUT) fail(`layouts.${layout.id}`, "this id is reserved by the framework");
            if (layoutEntries.has(layout.id) || ids.has(layout.id)) fail(`layouts.${layout.id}`, "layout is already registered");
            ids.add(layout.id);
        }
        validateLayoutGraph(staged);
        for (const layout of staged) layoutEntries.set(layout.id, layout);
        return [...staged];
    },

    unregisterLayout(id: string): boolean {
        const normalized = String(id ?? "").trim();
        if ([...pageEntries.values()].some((page) => page.layout === normalized)) return false;
        return layoutEntries.delete(normalized);
    },

    listLayouts(): ConsumerPageLayoutDefinition[] {
        return [...layoutEntries.values()];
    },

    register(definition: ConsumerPageDefinition): ConsumerPageRegistryEntry {
        return this.registerMany([definition])[0];
    },

    registerMany(definitions: readonly ConsumerPageDefinition[]): ConsumerPageRegistryEntry[] {
        if (!Array.isArray(definitions) || definitions.length === 0) fail("pages", "expected a non-empty array");
        const staged = definitions.map((definition, index) => normalizeDefinition(definition, `pages[${index}]`));
        const ids = new Set<string>();
        const signatures = new Set<string>();
        for (const page of staged) {
            if (pageEntries.has(page.id) || ids.has(page.id)) fail(`pages.${page.id}.id`, `page '${page.id}' is already registered`);
            ids.add(page.id);
            const signature = pathSignature(page.path);
            if (pathOwners.has(signature) || signatures.has(signature)) fail(`pages.${page.id}.path`, `route pattern '${page.path}' is already registered`);
            signatures.add(signature);
            if (page.layout !== STANDARD_PAGE_LAYOUT && !layoutEntries.has(page.layout!)) fail(`pages.${page.id}.layout`, `layout '${page.layout}' is not registered`);
        }
        for (const page of staged) {
            pageEntries.set(page.id, page);
            pathOwners.set(pathSignature(page.path), page.id);
        }
        return [...staged];
    },

    unregister(id: string): boolean {
        const normalized = String(id ?? "").trim();
        const page = pageEntries.get(normalized);
        if (!page) return false;
        pageEntries.delete(normalized);
        pathOwners.delete(pathSignature(page.path));
        return true;
    },

    unregisterNamespace(namespace: string): string[] {
        const prefix = `${String(namespace ?? "").trim()}.`;
        const removed: string[] = [];
        for (const id of [...pageEntries.keys()]) if (id.startsWith(prefix)) {
            this.unregister(id);
            removed.push(id);
        }
        for (const id of [...layoutEntries.keys()]) if (id.startsWith(prefix)) {
            const referenced = [...pageEntries.values()].some((page) => page.layout === id);
            if (!referenced) layoutEntries.delete(id);
        }
        return removed;
    },

    get(id: string): ConsumerPageRegistryEntry | undefined {
        return pageEntries.get(String(id ?? "").trim());
    },

    has(id: string): boolean {
        return pageEntries.has(String(id ?? "").trim());
    },

    list(): ConsumerPageRegistryEntry[] {
        return [...pageEntries.values()];
    },

    /** Builds routes and can restrict the map to pages owned by a consumer namespace. */
    createRoutes(baseRoutes: TRouter = {}, options: {namespace?: string; scopeId?: string} = {}): TRouter {
        if (!baseRoutes || typeof baseRoutes !== "object" || Array.isArray(baseRoutes)) fail("baseRoutes", "expected a route map");
        const routes: TRouter = {...baseRoutes};
        const routeSignatures = new Set(Object.keys(routes).map(pathSignature));
        const runtimes = new Map<string, PageRuntime>();
        const runVersions = new Map<string, number>();
        const scopeId = options.scopeId ?? `page-runtime-${++routeMapCounter}`;
        const namespacePrefix = options.namespace ? `${options.namespace}.` : null;
        const pages = [...pageEntries.values()].filter((page) => !namespacePrefix || page.id.startsWith(namespacePrefix));
        for (const page of pages) {
            const signature = pathSignature(page.path);
            if (routeSignatures.has(signature)) fail(`routes.${page.path}`, "route already exists in the base route map");
            const legacyPageFormat = !!page.controllers && page.layout === STANDARD_PAGE_LAYOUT && !Object.keys(page.slots).some((slot) => slot !== "content" && slot !== "sidebar");
            routes[page.path] = legacyPageFormat
                ? createLegacyPageRoute(page)
                : createPageRoute(page, scopeId, runtimes, runVersions);
            routeSignatures.add(signature);
        }
        return routes;
    },
};
