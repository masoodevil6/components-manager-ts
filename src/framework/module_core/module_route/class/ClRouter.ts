import type {TRouteData as RouteData, TControllerRouteData, TControllerRouteRenderer, TRouteNavigationContext, TRouterOptions} from "../types/TRouteData";
import type {TRouter as Router} from "../types/TRouter";
import {RouteRenderMode} from "../types/RouteRenderMode";

export const ROUTER_NAVIGATE_EVENT = "framework:route:navigate";
const ROUTER_HISTORY_INDEX_KEY = "__componentExpRouterIndex";
type RenderableRoute = Exclude<RouteData, {redirectTo: string}>;
type Match = {route: RouteData; pathParams: Record<string, string>};
type HistoryAction = "push" | "replace" | "pop" | "current";

export class ClRouter {
    root: HTMLElement;
    routes: Router;
    controllerRenderer?: TControllerRouteRenderer;
    options: TRouterOptions;

    #historyIndex = 0;
    #hasRenderedPage = false;
    #transitionDirection: "forward" | "backward" = "forward";
    #activeReuseKey: string | null = null;
    #activePageElement: HTMLElement | null = null;
    #activeRoute: RenderableRoute | null = null;
    #activeContext: TRouteNavigationContext | null = null;
    #titleUnsubscribe: (() => void) | null = null;
    #navigationVersion = 0;
    #destroyed = false;

    #handlePopState = (event: PopStateEvent): void => {
        const nextIndex = this.#readHistoryIndex(event.state);
        const targetIndex = nextIndex ?? Math.max(0, this.#historyIndex - 1);
        const direction = targetIndex <= this.#historyIndex ? "backward" : "forward";
        this.#transitionDirection = direction;
        this.#navigateTo(`${location.pathname}${location.search}${location.hash}`, "pop", targetIndex, direction);
    };

    #handleNavigate = (event: Event): void => {
        const path = (event as CustomEvent<{path?: unknown}>).detail?.path;
        if (typeof path === "string" && path.trim()) this.navigate(path);
    };

    #handleInternalLinkClick = (event: MouseEvent): void => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!(event.target instanceof Element)) return;
        const anchor = event.target.closest("a[href]");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

        const target = new URL(anchor.href, window.location.href);
        if (target.origin !== window.location.origin) return;
        if (target.pathname === window.location.pathname && target.search === window.location.search && target.hash === window.location.hash) return;
        if (!this.#getRoute(target.pathname) && !this.options.notFound) return;
        event.preventDefault();
        this.navigate(`${target.pathname}${target.search}${target.hash}`);
    };

    constructor(root: HTMLElement, routes: Router, controllerRenderer?: TControllerRouteRenderer, options: TRouterOptions = {}) {
        this.root = root;
        this.routes = routes;
        this.controllerRenderer = controllerRenderer;
        this.options = options;
        this.#initializeHistoryIndex();
        window.addEventListener("popstate", this.#handlePopState);
        window.addEventListener(ROUTER_NAVIGATE_EVENT, this.#handleNavigate);
        document.addEventListener("click", this.#handleInternalLinkClick);
    }

    /** Removes listeners and disposes the currently mounted route. */
    destroy(): void {
        if (this.#destroyed) return;
        this.#destroyed = true;
        this.#navigationVersion++;
        window.removeEventListener("popstate", this.#handlePopState);
        window.removeEventListener(ROUTER_NAVIGATE_EVENT, this.#handleNavigate);
        document.removeEventListener("click", this.#handleInternalLinkClick);
        this.#leaveActiveRoute();
    }

    /** Adds a same-origin entry to browser history and renders it without reloading. */
    navigate(path: string): void {
        const target = new URL(path, window.location.href);
        if (target.origin !== window.location.origin) {
            window.location.assign(target.href);
            return;
        }
        const pathname = target.pathname;
        if (!this.#getRoute(pathname) && !this.options.notFound) {
            window.location.assign(target.href);
            return;
        }
        this.#transitionDirection = "forward";
        this.#navigateTo(`${pathname}${target.search}${target.hash}`, "push", this.#historyIndex + 1, "forward");
    }

    /** Resolves and renders the current browser location. Safe to call after registering routes. */
    resolve(): void {
        this.#navigateTo(`${location.pathname}${location.search}${location.hash}`, "current", this.#historyIndex, this.#transitionDirection);
    }

    #navigateTo(urlText: string, action: HistoryAction, targetIndex: number, direction: "forward" | "backward", redirectDepth = 0): void {
        if (this.#destroyed) return;
        const requestVersion = ++this.#navigationVersion;
        if (redirectDepth > 16) {
            this.#reportError(new Error("[ClRouter] Redirect limit exceeded."), this.#currentContext(urlText, direction));
            return;
        }

        const target = new URL(urlText, window.location.href);
        const match = this.#getMatch(target.pathname);
        if (!match) {
            this.#commitLocation(target, action, targetIndex);
            this.#renderNotFound(target.pathname, direction);
            return;
        }

        if ("redirectTo" in match.route) {
            const redirect = new URL(match.route.redirectTo, target.href);
            this.#navigateTo(`${redirect.pathname}${redirect.search}${redirect.hash}`, "replace", targetIndex, direction, redirectDepth + 1);
            return;
        }

        const route = match.route;
        const context: TRouteNavigationContext = {
            path: target.pathname,
            pathParams: match.pathParams,
            query: this.#getQuery(target.search),
            fromPath: this.#activeContext?.path ?? null,
            direction,
        };
        this.#runGuards(route, context, (result) => {
            if (requestVersion !== this.#navigationVersion || this.#destroyed) return;
            if (result === false) {
                if (action === "pop") this.#restoreHistoryPosition(targetIndex);
                return;
            }
            const redirectTo = typeof result === "string" ? result : result && typeof result === "object" ? result.redirectTo : null;
            if (redirectTo) {
                const redirect = new URL(redirectTo, target.href);
                this.#navigateTo(`${redirect.pathname}${redirect.search}${redirect.hash}`, "replace", targetIndex, direction, redirectDepth + 1);
                return;
            }
            this.#commitLocation(target, action, targetIndex);
            this.#renderRoute(route, context);
        }, (error) => {
            if (requestVersion !== this.#navigationVersion || this.#destroyed) return;
            if (action === "pop") this.#restoreHistoryPosition(targetIndex);
            this.#reportError(error, context, route);
        });
    }

    #runGuards(
        route: RenderableRoute,
        context: TRouteNavigationContext,
        done: (result: void | boolean | string | {redirectTo: string}) => void,
        failed: (error: unknown) => void,
    ): void {
        const routeGuard = route.beforeEnter;
        const first = this.options.beforeEach?.(context);
        const afterFirst = (firstResult: void | boolean | string | {redirectTo: string}): void => {
            if (firstResult === false || typeof firstResult === "string" || (firstResult && typeof firstResult === "object")) {
                done(firstResult);
                return;
            }
            if (!routeGuard) {
                done(undefined);
                return;
            }
            try {
                const routeResult = routeGuard(context);
                if (this.#isPromise(routeResult)) routeResult.then(done, failed);
                else done(routeResult);
            } catch (error) {
                failed(error);
            }
        };
        try {
            if (this.#isPromise(first)) first.then(afterFirst, failed);
            else afterFirst(first);
        } catch (error) {
            failed(error);
        }
    }

    #renderRoute(route: RenderableRoute, context: TRouteNavigationContext): void {
        const navigationVersion = this.#navigationVersion;
        const controllerRoute = "controller" in route ? route : null;
        if (controllerRoute?.reuseKey && controllerRoute.reuseKey === this.#activeReuseKey && this.#activePageElement) {
            try {
                const update = controllerRoute.onReuse?.(this.#activePageElement, context);
                if (this.#isPromise(update)) {
                    update.then(() => {
                        if (navigationVersion === this.#navigationVersion) this.#completeReuse(controllerRoute, context);
                    }, (error) => {
                        if (navigationVersion === this.#navigationVersion) this.#reportError(error, context, controllerRoute);
                    });
                } else this.#completeReuse(controllerRoute, context);
            } catch (error) {
                this.#reportError(error, context, controllerRoute);
            }
            return;
        }

        this.#leaveActiveRoute();
        try {
            const rendered = controllerRoute
                ? {element: this.#renderControllerRoute(controllerRoute, context.query), onLoad: null}
                : this.#renderTemplateRoute(route, context.query);
            const pageElement = rendered.element;
            this.root.replaceChildren(pageElement);
            this.#activePageElement = pageElement;
            this.#activeReuseKey = controllerRoute?.reuseKey ?? null;
            this.#activeRoute = route;
            this.#activeContext = context;
            if (controllerRoute) controllerRoute.onLoad?.(pageElement);
            else rendered.onLoad?.();
            this.#setTitlePage(route);
            this.#animatePage(pageElement, route, context.direction);
            this.#hasRenderedPage = true;
            this.options.afterEach?.(context);
        } catch (error) {
            this.#reportError(error, context, route);
        }
    }

    #completeReuse(route: TControllerRouteData, context: TRouteNavigationContext): void {
        if (this.#destroyed || !this.#activePageElement) return;
        this.#activeRoute = route;
        this.#activeContext = context;
        route.onLoad?.(this.#activePageElement);
        this.#setTitlePage(route);
        this.options.afterEach?.(context);
    }

    #renderTemplateRoute(route: RenderableRoute, query: Record<string, string>): {element: HTMLElement; onLoad: (() => void) | null} {
        if (!("template" in route)) throw new Error("[ClRouter] Route must provide either a template or a controller.");
        const pageInstance = new route.template();
        const element = pageInstance.render(query, route.data);
        if (!(element instanceof HTMLElement)) throw new TypeError("[ClRouter] A route template must render an HTMLElement.");
        return {element, onLoad: () => pageInstance.onLoad(element)};
    }

    #renderControllerRoute(route: TControllerRouteData, query: Record<string, string>): HTMLElement {
        if (!this.controllerRenderer) throw new Error("A controller route requires a controller renderer when creating the router.");
        const element = this.controllerRenderer(route, query);
        if (!(element instanceof HTMLElement)) throw new TypeError("[ClRouter] The controller renderer must return an HTMLElement.");
        return element;
    }

    #renderNotFound(path: string, direction: "forward" | "backward"): void {
        this.#leaveActiveRoute();
        try {
            const element = this.options.notFound?.(path);
            this.root.replaceChildren(...(element instanceof HTMLElement ? [element] : []));
            this.#hasRenderedPage = true;
            this.#activeContext = {path, pathParams: {}, query: {}, fromPath: null, direction};
        } catch (error) {
            this.#reportError(error, {path, pathParams: {}, query: {}, fromPath: null, direction});
        }
    }

    #setTitlePage(route: RenderableRoute): void {
        this.#titleUnsubscribe?.();
        this.#titleUnsubscribe = null;
        const title = route.headerTitle;
        if (!title) return;
        document.title = title.get();
        this.#titleUnsubscribe = title.subscribe((value) => { document.title = value; });
    }

    #leaveActiveRoute(): void {
        this.#titleUnsubscribe?.();
        this.#titleUnsubscribe = null;
        if (this.#activeRoute && this.#activePageElement) {
            try { this.#activeRoute.onUnload?.(this.#activePageElement); }
            catch (error) {
                if (this.#activeContext) this.#reportError(error, this.#activeContext, this.#activeRoute);
            }
        }
        this.#activeReuseKey = null;
        this.#activePageElement = null;
        this.#activeRoute = null;
        this.#activeContext = null;
    }

    #reportError(error: unknown, context: TRouteNavigationContext, route?: RenderableRoute): void {
        try { route?.onError?.(error, context); }
        catch (nestedError) { console.error("[ClRouter] Route error handler failed.", nestedError); }
        try { this.options.onError?.(error, context); }
        catch (nestedError) { console.error("[ClRouter] Global error handler failed.", nestedError); }
        if (!route?.onError && !this.options.onError) console.error("[ClRouter] Navigation failed.", error);
    }

    #commitLocation(target: URL, action: HistoryAction, targetIndex: number): void {
        const state = this.#asHistoryState(history.state);
        const nextState = {...state, [ROUTER_HISTORY_INDEX_KEY]: targetIndex};
        const address = `${target.pathname}${target.search}${target.hash}`;
        if (action === "push") history.pushState(nextState, "", address);
        else if (action === "replace") history.replaceState(nextState, "", address);
        else if (action === "pop" && this.#readHistoryIndex(history.state) === null) history.replaceState(nextState, "", address);
        this.#historyIndex = targetIndex;
    }

    #restoreHistoryPosition(attemptedIndex: number): void {
        const delta = this.#historyIndex - attemptedIndex;
        if (delta !== 0) history.go(delta);
    }

    #getMatch(path: string): Match | null {
        const exact = this.routes[path];
        if (exact) return {route: exact, pathParams: {}};
        const actualParts = path.split("/").filter(Boolean);
        for (const [pattern, route] of Object.entries(this.routes)) {
            const patternParts = pattern.split("/").filter(Boolean);
            if (patternParts.length !== actualParts.length) continue;
            const params: Record<string, string> = {};
            let matches = true;
            for (let index = 0; index < patternParts.length; index++) {
                const expected = patternParts[index];
                if (expected.startsWith(":")) {
                    try { params[expected.slice(1)] = decodeURIComponent(actualParts[index]); }
                    catch { params[expected.slice(1)] = actualParts[index]; }
                } else if (expected !== actualParts[index]) {
                    matches = false;
                    break;
                }
            }
            if (matches) return {route, pathParams: params};
        }
        return null;
    }

    #getRoute(path: string): RouteData | undefined {
        return this.#getMatch(path)?.route;
    }

    #getQuery(search: string): Record<string, string> {
        const query: Record<string, string> = {};
        new URLSearchParams(search).forEach((value, key) => { query[key] = value; });
        return query;
    }

    #currentContext(path: string, direction: "forward" | "backward"): TRouteNavigationContext {
        const target = new URL(path, window.location.href);
        return {
            path: target.pathname,
            pathParams: this.#getMatch(target.pathname)?.pathParams ?? {},
            query: this.#getQuery(target.search),
            fromPath: this.#activeContext?.path ?? null,
            direction,
        };
    }

    #initializeHistoryIndex(): void {
        const currentState = this.#asHistoryState(history.state);
        const index = this.#readHistoryIndex(currentState);
        if (index !== null) {
            this.#historyIndex = index;
            return;
        }
        this.#historyIndex = 0;
        history.replaceState({...currentState, [ROUTER_HISTORY_INDEX_KEY]: this.#historyIndex}, "", location.href);
    }

    #asHistoryState(state: unknown): Record<string, unknown> {
        return state !== null && typeof state === "object" ? state as Record<string, unknown> : {};
    }

    #readHistoryIndex(state: unknown): number | null {
        const index = this.#asHistoryState(state)[ROUTER_HISTORY_INDEX_KEY];
        return typeof index === "number" && Number.isInteger(index) ? index : null;
    }

    #animatePage(pageElement: HTMLElement, route: RenderableRoute, direction: "forward" | "backward"): void {
        const mode = route.renderMode ?? RouteRenderMode.NONE;
        const duration = Number.isFinite(route.renderDuration) ? Math.max(0, Number(route.renderDuration)) : 280;
        if (!this.#hasRenderedPage || mode === RouteRenderMode.NONE || duration === 0 || typeof pageElement.animate !== "function") return;
        if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const directionSign = (getComputedStyle(this.root).direction === "rtl" ? -1 : 1) * (direction === "forward" ? 1 : -1);
        const start: Keyframe = {opacity: 0};
        const end: Keyframe = {opacity: 1};
        if (mode === RouteRenderMode.SLIDE) {
            start.transform = `translateX(${directionSign * 24}px)`;
            end.transform = "translateX(0)";
        } else if (mode === RouteRenderMode.SCALE) {
            start.transform = "scale(0.98)";
            end.transform = "scale(1)";
        }
        pageElement.animate([start, end], {duration, easing: "ease-in-out", fill: "both"});
    }

    #isPromise<T>(value: T | Promise<T>): value is Promise<T> {
        return !!value && typeof (value as Promise<T>).then === "function";
    }
}
