import * as Observable              from "@/core_observable";
///------------------------------
import {ITemplate as Template}      from "../interfaces/ITemplate";
import type {RouteRenderMode} from "./RouteRenderMode";

export type TRouteRenderOptions = {
    /** Transition used when this route replaces an already rendered page. */
    renderMode?: RouteRenderMode;
    renderDuration?: number;
};

export type TRouteGuardResult = void | boolean | string | {readonly redirectTo: string};

export type TRouteNavigationContext = {
    path: string;
    pathParams: Record<string, string>;
    query: Record<string, string>;
    fromPath: string | null;
    direction: "forward" | "backward";
};

export type TRouteGuard = (context: TRouteNavigationContext) => TRouteGuardResult | Promise<TRouteGuardResult>;

export type TRouterOptions = {
    notFound?: (path: string) => HTMLElement | null | void;
    onError?: (error: unknown, context: TRouteNavigationContext) => void;
    beforeEach?: TRouteGuard;
    afterEach?: (context: TRouteNavigationContext) => void;
};

export type TRouteLifecycleOptions = {
    beforeEnter?: TRouteGuard;
    onUnload?: (pageElement: HTMLElement) => void;
    onError?: (error: unknown, context: TRouteNavigationContext) => void;
};

export type TTemplateRouteData = TRouteRenderOptions & TRouteLifecycleOptions & {
    template: new () => Template;
    data?: any;
    headerTitle: Observable.App<string>;
};

/** A route rendered through a controller-backed UI host instead of a page class. */
export type TControllerRouteData = TRouteRenderOptions & TRouteLifecycleOptions & {
    controller: unknown;
    widgetProps?: Record<string, unknown>;
    data?: any;
    headerTitle: Observable.App<string>;
    onLoad?: (pageElement: HTMLElement) => void;
    /** Reuse the mounted page shell across routes with the same key. */
    reuseKey?: string;
    onReuse?: (pageElement: HTMLElement, context: TRouteNavigationContext) => void | Promise<void>;
};

export type TControllerRouteRenderer = (
    route: TControllerRouteData,
    query: Record<string, string>,
) => HTMLElement;

export type TRouteData =
    | TTemplateRouteData
    | TControllerRouteData
    | {redirectTo: string};
