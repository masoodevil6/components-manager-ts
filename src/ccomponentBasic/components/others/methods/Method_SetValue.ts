import * as CoreComponent from "@/core_components"

export function Method_SetValue<T>(value: T): CoreComponent.Others.Types.Type_TypeOf<T>{
    return value as any
}
