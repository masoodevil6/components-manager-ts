export type Type_ExtractName<T extends Record<PropertyKey, { readonly name: PropertyKey }>> = {
    [k in keyof T] : T[k]["name"]
}