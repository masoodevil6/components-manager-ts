// --------------------------------
import {Interface_ComponentMethod as MethodInterface }   from "../../tools/method/Interface_ComponentMethod";
import {Type_ComponentMethod      as MethodType }        from "../../tools/method/Type_ComponentMethod";


export function Define_ComponentMethod<TMethod , TPropTypes>(methods: { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> } ) : { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> } {
    return methods;
}