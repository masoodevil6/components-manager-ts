import * as CoreComponent from "@/core_components"

export type Type_ExtractNameAndValue<T extends Record<PropertyKey, { readonly name: PropertyKey; readonly value: any }>> = {
    [k in keyof T as T[k]["name"]]: T[k]["value"] extends CoreComponent.Others.Types.Type_TypeOf<infer U> ? U : never
}