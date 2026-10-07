import {Keys} from "../../../module_categories/languages";
import type {ExtractMethodsType, ExtractMethodsComponentArgs, ExtractMethodsDataArgs, ExtractMethodsConfigType} from "../../tools/type/TypeHelpers";

export const Methods = {
    CHANGE_FILES: {name: "fn_onChangeFiles", description: Keys.category.components.inputFile.methods.changeFiles.description, args: {}, dataArgs: {FILES: [] as File[], VALID_FILES: [] as File[], INVALID_FILES: [] as import("./Props").FileItemError[]}},
    DELETE_FILE: {name: "fn_deleteFile", description: Keys.category.components.inputFile.methods.deleteFile.description, args: {}, dataArgs: {FILE_NAME: "" as string}},
} as const;

export type MethodsType = ExtractMethodsType<typeof Methods>;
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;
export type MethodsConfigType<TThis = any> = ExtractMethodsConfigType<typeof Methods, TThis>;

