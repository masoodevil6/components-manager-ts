import * as Observable              from "@/core_observable";
///------------------------------
import {ITemplate as Template}      from "../interfaces/ITemplate";
import type {RouteRenderMode} from "./RouteRenderMode";

export type TRouteRenderOptions = {
    /** Transition used when this route replaces an already rendered page. */
    renderMode?: RouteRenderMode;
    renderDuration?: number;
};

export type TTemplateRouteData = TRouteRenderOptions & {
    template: new () => Template;
    data?: any;
    headerTitle: Observable.App<string>;
};

/** A route rendered through a controller-backed UI host instead of a page class. */
export type TControllerRouteData = TRouteRenderOptions & {
    controller: unknown;
    widgetProps?: Record<string, unknown>;
    data?: any;
    headerTitle: Observable.App<string>;
    onLoad?: (pageElement: HTMLElement) => void;
    /** Reuse the mounted page shell across routes with the same key. */
    reuseKey?: string;
    onReuse?: (pageElement: HTMLElement, context: {
        path: string;
        query: Record<string, string>;
        direction: "forward" | "backward";
    }) => void;
};

export type TControllerRouteRenderer = (
    route: TControllerRouteData,
    query: Record<string, string>,
) => HTMLElement;

export type TRouteData =
    | TTemplateRouteData
    | TControllerRouteData
    | {redirectTo: string};
