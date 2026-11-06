import {ROUTER_NAVIGATE_EVENT} from "./class/ClRouter";

/** Navigate to an application route without reloading the document. */
export const Navigate = (destination: string): void => {
    const target = new URL(destination, window.location.href);
    if (target.origin !== window.location.origin) {
        window.location.assign(target.href);
        return;
    }

    window.dispatchEvent(new CustomEvent(ROUTER_NAVIGATE_EVENT, {
        detail: {path: `${target.pathname}${target.search}${target.hash}`},
    }));
};

export {ClRouter as App, ROUTER_NAVIGATE_EVENT} from "./class/ClRouter";
export type {ITemplate}  from "./interfaces/ITemplate";
export type {TRouter}    from "./types/TRouter";
export type {
    TRouteData as RouteData,
    TTemplateRouteData as TemplateRouteData,
    TControllerRouteData as ControllerRouteData,
    TControllerRouteRenderer as ControllerRouteRenderer,
} from "./types/TRouteData";
export type {
    TRouteGuard as RouteGuard,
    TRouteGuardResult as RouteGuardResult,
    TRouteNavigationContext as RouteNavigationContext,
    TRouteLifecycleOptions as RouteLifecycleOptions,
    TRouterOptions as RouterOptions,
} from "./types/TRouteData";
export {RouteRenderMode} from "./types/RouteRenderMode";
