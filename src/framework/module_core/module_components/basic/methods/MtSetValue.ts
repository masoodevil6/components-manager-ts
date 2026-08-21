import * as CoreComponent from "@/core_components"

export function MtSetValue<T>(value: T): CoreComponent.Basic.Types.TypeOf<T>{
    return value as any
}
