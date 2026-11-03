import type {TDictionaryLists} from "@/core";

export type TPageV2ComponentFactory = (...args: any[]) => any;

/** A component instance in the page tree. `children` maps component props to child values. */
export interface Interface_PageV2ComponentNode {
    component: TPageV2ComponentFactory;
    props?: Record<string, any>;
    methods?: Record<string, (...args: any[]) => any>;
    children?: Record<string, any>;
}

/** A dictionary reference resolves an item by its stable id and returns the requested field. */
export interface Interface_PageV2DictionaryReference {
    $dictionary: string;
    id: string;
    property?: string;
}

/** Data consumed by a v2 page: reusable lists and a named component tree. */
export interface Interface_PageV2 {
    dictionary: TDictionaryLists;
    components: Record<string, Interface_PageV2ComponentNode>;
}
