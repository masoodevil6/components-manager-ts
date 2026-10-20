import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {JsonValue} from "./Types";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    NODE_TOGGLE: {
        name: "fn_onNodeToggle",
        description: Keys.category.components.jsonTree.methods.nodeToggle.description,
        args: {DATA: Props.prop_data},
        dataArgs: {PATH: "$" as string, EXPANDED: false as boolean, VALUE: null as JsonValue | null},
    },
    SEARCH_CHANGE: {
        name: "fn_onSearchChange",
        description: Keys.category.components.jsonTree.methods.searchChange.description,
        dataArgs: {QUERY: "" as string},
    },
    EXPAND_ALL: {
        name: "fn_onExpandAll",
        description: Keys.category.components.jsonTree.methods.expandAll.description,
        dataArgs: {COUNT: 0 as number},
    },
    COLLAPSE_ALL: {
        name: "fn_onCollapseAll",
        description: Keys.category.components.jsonTree.methods.collapseAll.description,
        dataArgs: {COUNT: 0 as number},
    },
    COPY: {
        name: "fn_onCopy",
        description: Keys.category.components.jsonTree.methods.copy.description,
        args: {DATA: Props.prop_data},
        dataArgs: {SUCCESS: false as boolean, PATH: "$" as string, VALUE: null as JsonValue | null},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;
