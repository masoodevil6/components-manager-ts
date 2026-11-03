
///------------------------------
import {TRouteData as RouteData}     from "../types/TRouteData";
import {TRouter    as Router }       from "../types/TRouter";
import type {TControllerRouteData, TControllerRouteRenderer} from "../types/TRouteData";
import {RouteRenderMode} from "../types/RouteRenderMode";

export const ROUTER_NAVIGATE_EVENT = "framework:route:navigate";
const ROUTER_HISTORY_INDEX_KEY = "__componentExpRouterIndex";

export class ClRouter {
    root:    HTMLElement
    routes:  Router
    controllerRenderer?: TControllerRouteRenderer
    #historyIndex = 0;
    #hasRenderedPage = false;
    #transitionDirection: "forward" | "backward" = "forward";
    #activeReuseKey: string | null = null;
    #activePageElement: HTMLElement | null = null;

    #handlePopState = (event: PopStateEvent): void => {
        const nextIndex = this.#readHistoryIndex(event.state);
        this.#transitionDirection = nextIndex !== null && nextIndex < this.#historyIndex ? "backward" : "forward";
        if (nextIndex !== null) this.#historyIndex = nextIndex;
        this.resolve();
    };
    #handleNavigate = (event: Event): void => {
        const path = (event as CustomEvent<{path?: unknown}>).detail?.path;
        if (typeof path === "string" && path.trim()) {
            this.#transitionDirection = "forward";
            this.navigate(path);
        }
    };

    constructor(root: HTMLElement, routes: Router, controllerRenderer?: TControllerRouteRenderer){
        this.root = root
        this.routes = routes
        this.controllerRenderer = controllerRenderer
        this.#initializeHistoryIndex();
        window.addEventListener("popstate", this.#handlePopState)
        window.addEventListener(ROUTER_NAVIGATE_EVENT, this.#handleNavigate)
        document.addEventListener("click", this.#handleInternalLinkClick);
    }

    destroy(): void {
        window.removeEventListener("popstate", this.#handlePopState)
        window.removeEventListener(ROUTER_NAVIGATE_EVENT, this.#handleNavigate)
        document.removeEventListener("click", this.#handleInternalLinkClick)
    }

    navigate(path: string){
        const target = new URL(path, window.location.href)
        if (target.origin !== window.location.origin || !this.#getRoute(target.pathname)) {
            window.location.assign(target.href)
            return
        }

        this.#historyIndex++;
        const currentState = this.#asHistoryState(history.state);
        history.pushState({...currentState, [ROUTER_HISTORY_INDEX_KEY]: this.#historyIndex}, "", `${target.pathname}${target.search}${target.hash}`)
        this.#transitionDirection = "forward";
        this.resolve()
    }

    #handleInternalLinkClick = (event: MouseEvent): void => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!(event.target instanceof Element)) return;

        const anchor = event.target.closest("a[href]");
        if (!(anchor instanceof HTMLAnchorElement)) return;
        if (anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

        const target = new URL(anchor.href, window.location.href);
        if (target.origin !== window.location.origin) return;
        if (target.pathname === window.location.pathname && target.search === window.location.search) return;
        if (!this.#getRoute(target.pathname)) return;

        event.preventDefault();
        this.navigate(`${target.pathname}${target.search}${target.hash}`);
    };

    resolve(){
        const path = location.pathname
        const route = this.#getRoute(path)
        if(!route) return

        if ("redirectTo" in route) {
            if (route.redirectTo !== path) {
                history.replaceState(this.#asHistoryState(history.state), "", route.redirectTo)
                this.resolve()
            }
            return
        }

        this.#renderPage(route);
    }

    #matchRoute(path: string): RouteData | undefined {
        const pathParts = path.split("/").filter(Boolean);
        for (const [pattern, route] of Object.entries(this.routes)) {
            const patternParts = pattern.split("/").filter(Boolean);
            if (patternParts.length !== pathParts.length) continue;
            if (patternParts.every((part, index) => part.startsWith(":") || part === pathParts[index])) return route;
        }
        return undefined;
    }

    #getRoute(path: string): RouteData | undefined {
        return this.routes[path] ?? this.#matchRoute(path);
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







    #setTitlePage(route: RouteData){
        if ("redirectTo" in route) return
        if(route.headerTitle){
            const headerTitle = document.querySelector("head title") as HTMLElement
            headerTitle.textContent = route.headerTitle.get()
        }
    }

    #getParamsQuery(){
        const urlParams = new URLSearchParams(window.location.search)
        const query: Record<string,string> = {}
        urlParams.forEach((value, key) => query[key] = value)
        return query;
    }

    #renderPage(route: RouteData){
        if ("redirectTo" in route) return

        if ("controller" in route && route.reuseKey && route.reuseKey === this.#activeReuseKey && this.#activePageElement) {
            route.onReuse?.(this.#activePageElement, {
                path: location.pathname,
                query: this.#getParamsQuery(),
                direction: this.#transitionDirection,
            });
            route.onLoad?.(this.#activePageElement);
            this.#setTitlePage(route);
            return;
        }

        this.root.innerHTML = ""
        this.#activeReuseKey = null;
        this.#activePageElement = null;

        if ("controller" in route) {
            const pageElement = this.renderControllerRoute(route, this.#getParamsQuery());
            this.root.appendChild(pageElement);
            route.onLoad?.(pageElement);
            this.#setTitlePage(route);
            this.#animatePage(pageElement, route);
            this.#activeReuseKey = route.reuseKey ?? null;
            this.#activePageElement = route.reuseKey ? pageElement : null;
            this.#hasRenderedPage = true;
            return;
        }

        const pageInstance = new route.template()

        const pageElement = pageInstance.render(this.#getParamsQuery() , route.data)
        this.root.appendChild(pageElement)

        pageInstance.onLoad(pageElement)


        this.#setTitlePage(route);
        this.#animatePage(pageElement, route);
        this.#hasRenderedPage = true;
    }

    #animatePage(pageElement: HTMLElement, route: Exclude<RouteData, {redirectTo: string}>): void {
        const mode = route.renderMode ?? RouteRenderMode.NONE;
        const duration = Number.isFinite(route.renderDuration) ? Math.max(0, Number(route.renderDuration)) : 280;
        if (!this.#hasRenderedPage || mode === RouteRenderMode.NONE || duration === 0 || typeof pageElement.animate !== "function") return;
        if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const directionSign = (getComputedStyle(this.root).direction === "rtl" ? -1 : 1) * (this.#transitionDirection === "forward" ? 1 : -1);
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

    private renderControllerRoute(route: TControllerRouteData, query: Record<string, string>): HTMLElement {
        if (!this.controllerRenderer) {
            throw new Error("A controller route requires a controller renderer when creating the router.");
        }
        return this.controllerRenderer(route, query);
    }
}
