import {Keys} from "../../../module_categories/languages";
import {Props} from "./Props";
import type {ConsoleEntry, ConsoleLevel} from "./Types";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";

export const Methods = {
    CLEAR: {
        name: "fn_onClear",
        description: Keys.category.components.console.methods.clear.description,
        args: {ENTRIES: Props.prop_entries},
        dataArgs: {COUNT: 0 as number},
    },
    ENTRY: {
        name: "fn_onEntry",
        description: Keys.category.components.console.methods.entry.description,
        args: {ENTRIES: Props.prop_entries},
        dataArgs: {ENTRY: {} as ConsoleEntry, LEVEL: "log" as ConsoleLevel},
    },
    FILTER_CHANGE: {
        name: "fn_onFilterChange",
        description: Keys.category.components.console.methods.filterChange.description,
        dataArgs: {LEVEL: "all" as ConsoleLevel | "all"},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;
