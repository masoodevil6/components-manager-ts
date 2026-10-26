import type * as CoreReactive from "@/core_reactive";
import type {ElementCreatorMode} from "./Props";
import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
import type {LayoutColumn} from "../componentLayout/Props";

export const Methods = {
    CLICK_SETTINGS: {
        name: "fn_clickSettings",
        description: "Callback when the settings option is clicked",
        args: {},
        dataArgs: {} as const,
    },
    CLICK_DELETE: {
        name: "fn_clickDelete",
        description: "Callback after the delete action is confirmed",
        args: {},
        dataArgs: {} as const,
    },
    COLUMN_CHANGE: {
        name: "fn_onColumnChange",
        description: "Callback when a layout column option is selected",
        args: {},
        dataArgs: {COLUMN: null as LayoutColumn | null},
    },
    SETTINGS_APPLY: {
        name: "fn_onSettingsApply",
        description: "Callback after the reference component settings are applied",
        args: {},
        dataArgs: {
            COMPONENT: null as Function | null,
            PROPERTIES: {} as Record<string, any>,
        },
    },
    SETTINGS_OPEN: {
        name: "fn_onSettingsOpen",
        description: "Callback with the settings content when opening component settings",
        args: {},
        dataArgs: {
            CONTENT: null as CoreReactive.App | null,
            MODE: "SETTING_CREATE" as ElementCreatorMode,
        },
    },
    SETTINGS_CLOSE: {
        name: "fn_onSettingsClose",
        description: "Callback when component settings are canceled or applied",
        args: {},
        dataArgs: {},
    },
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;
