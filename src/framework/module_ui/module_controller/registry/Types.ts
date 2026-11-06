import type {TranslationKey} from "@/util_brands";
import type {RequestState} from "../module_requests";

export interface ControllerCategoryDefinition {
    id: string;
    titleKey: TranslationKey;
    descriptionKey?: TranslationKey;
    children?: readonly ControllerCategoryDefinition[];
}

export interface ControllerCategoryReference {
    readonly namespace: string;
    readonly id: string;
    readonly path: readonly string[];
    readonly titleKey: TranslationKey;
    readonly descriptionKey?: TranslationKey;
    readonly children: readonly ControllerCategoryReference[];
}

export interface ControllerCategoryRegistration {
    readonly namespace: string;
    readonly categories: readonly ControllerCategoryReference[];
    get(id: string): ControllerCategoryReference | null;
    list(): ControllerCategoryReference[];
}

export type ControllerWorkflowNodeTitles = Readonly<Record<string, TranslationKey>>;
export type ControllerWorkflowNodeNames = Readonly<Record<string, string>>;
export type ControllerRequestResult = RequestState | Promise<RequestState>;

export interface ControllerFactoryContext<TParams = unknown> {
    readonly params: TParams | undefined;
    /** Stable child names derived from the workflowNodes keys in the registration. */
    readonly workflowNodeNames: ControllerWorkflowNodeNames;
}

export type ControllerFactory<TParams = unknown> = (
    context: ControllerFactoryContext<TParams>,
) => ControllerRequestResult;

export interface ControllerDefinition<TParams = unknown> {
    /** Stable, globally unique identifier, preferably prefixed with the consumer namespace. */
    id: string;
    titleKey: TranslationKey;
    descriptionKey?: TranslationKey;
    category: ControllerCategoryReference;
    /** Keys become stable workflow child names; values localize those names in inspectors. */
    workflowNodes?: ControllerWorkflowNodeTitles;
    factory: ControllerFactory<TParams>;
}

export interface ControllerRegistryEntry<TParams = unknown> extends ControllerDefinition<TParams> {
    readonly workflowNodeNames: ControllerWorkflowNodeNames;
}

export interface ControllerWorkflowNodeEntry {
    readonly id: string;
    readonly controllerId: string;
    readonly name: string;
    readonly titleKey: TranslationKey;
    readonly title: string;
}

