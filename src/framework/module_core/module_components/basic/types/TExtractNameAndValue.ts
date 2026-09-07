// --------------------------------
import {TTypeOf as TypeOf}  from "./TTypeOf";

export type TExtractNameAndValue<T extends Record<PropertyKey, { readonly name: PropertyKey; readonly value: any }>> = {
    [k in keyof T as T[k]["name"]]: T[k]["value"] extends TypeOf<infer U> ? U : never
}