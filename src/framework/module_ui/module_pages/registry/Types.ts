import type {TranslationKey} from "@/util_brands";
import type {RouteRenderMode, TRouter} from "@/core_route";

export interface ConsumerPageContext {
    readonly pageId: string;
    readonly path: string;
    readonly pathParams: Readonly<Record<string, string>>;
    readonly query: Readonly<Record<string, string>>;
    readonly titleKey?: TranslationKey;
    readonly hasIconBack?: boolean;
    readonly pageNav?: readonly unknown[];
    readonly asideWidth?: string | number;
    readonly headerOptionsList?: readonly unknown[];
    readonly headerMethods?: Record<string, (...args: any[]) => any>;
}

export type ConsumerPageControllerParams = Record<string, unknown> | ((context: ConsumerPageContext) => unknown);

export interface ConsumerPageControllerBinding {
    readonly id: string;
    readonly params?: ConsumerPageControllerParams;
}

export type ConsumerPageSlotSource =
    | string
    | ConsumerPageControllerBinding
    | null
    | ((context: ConsumerPageContext) => string | ConsumerPageControllerBinding | null);

export type ConsumerPageSlots = Readonly<Record<string, unknown>>;

export interface ConsumerPageLayoutInstance {
    /** A component instance or other value understood by ComponentWidget. */
    readonly component: unknown;
    /** Update the already-mounted layout instance when route slots change. */
    update?(context: ConsumerPageContext, slots: ConsumerPageSlots): void | Promise<void>;
    /** Release subscriptions, workflow nodes, and other resources owned by this layout. */
    dispose?(): void;
}

export type ConsumerPageLayoutRenderer = (
    context: ConsumerPageContext,
    slots: ConsumerPageSlots,
) => ConsumerPageLayoutInstance;

export interface ConsumerPageLayoutDefinition {
    /** Stable layout id, preferably prefixed with the consumer namespace. */
    readonly id: string;
    /** Optional parent layout whose defaults this layout inherits. */
    readonly extends?: string;
    /** Controller-backed default values for named slots; `null` intentionally clears a slot. */
    readonly slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
    /** Slots that must resolve to content after layout and page overrides are applied. */
    readonly requiredSlots?: readonly string[];
    /** Custom layout factory. Without it, the framework's flexible componentPage layout is used. */
    readonly render?: ConsumerPageLayoutRenderer;
    /** Keep the same mounted layout instance across routes that use this renderer. */
    readonly reuse?: boolean;
}

export interface ConsumerPageControllers {
    /** Legacy pageFormat binding. New pages should use the general `slots` map. */
    readonly content: string | ConsumerPageControllerBinding;
    /** Legacy pageFormat binding. New pages should use the general `slots` map. */
    readonly sidebar?: string | ConsumerPageControllerBinding;
}

export type ConsumerPageGuardResult =
    | void
    | boolean
    | string
    | {readonly redirectTo: string};

export interface ConsumerPageDefinition {
    /** Stable, globally unique page id, preferably prefixed with the consumer namespace. */
    readonly id: string;
    /** Router path, for example `/account/:accountId`. */
    readonly path: string;
    readonly titleKey?: TranslationKey;
    /** Optional registered layout. Omitted pages use the standard componentPage layout. */
    readonly layout?: string;
    /** Any number of named component slots; page entries override inherited layout slots. */
    readonly slots?: Readonly<Record<string, ConsumerPageSlotSource>>;
    /** Backward-compatible aliases for the standard content and sidebar slots. */
    readonly controllers?: ConsumerPageControllers;
    readonly hasIconBack?: boolean;
    readonly pageNav?: readonly unknown[];
    readonly asideWidth?: string | number;
    readonly headerOptionsList?: readonly unknown[];
    readonly headerMethods?: Record<string, (...args: any[]) => any>;
    readonly beforeEnter?: (context: ConsumerPageContext) => ConsumerPageGuardResult | Promise<ConsumerPageGuardResult>;
    readonly onError?: (error: unknown, context: ConsumerPageContext) => void;
    readonly renderMode?: RouteRenderMode;
    readonly renderDuration?: number;
}

export interface ConsumerPageRegistryEntry extends Omit<ConsumerPageDefinition, "slots"> {
    readonly slots: Readonly<Record<string, ConsumerPageSlotSource>>;
    readonly layout: string;
}

export interface ConsumerPageLayoutRegistryEntry extends ConsumerPageLayoutDefinition {
    readonly id: string;
}

export type ConsumerPageRouteMap = TRouter;
