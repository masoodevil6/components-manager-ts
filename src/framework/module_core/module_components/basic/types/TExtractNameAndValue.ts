import * as CoreComponent from "@/core_components"

export type TExtractNameAndValue<T extends Record<PropertyKey, { readonly name: PropertyKey; readonly value: any }>> = {
    [k in keyof T as T[k]["name"]]: T[k]["value"] extends CoreComponent.Basic.Types.TypeOf<infer U> ? U : never
}