// --------------------------------
import {TTypeOf as TypeOf}  from "../../basic/types/TTypeOf";

export function MtSetValue<T>(value: T): TypeOf<T>{
    return value as any
}
