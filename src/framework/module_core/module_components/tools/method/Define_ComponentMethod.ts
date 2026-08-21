import * as CoreComponent from "@/core_components";

export function Define_ComponentMethod<TMethod , TPropTypes>(methods: { [K in CoreComponent.Tools.Method.Type<TMethod>]: CoreComponent.Tools.Method.Interface<TPropTypes> } ) : { [K in CoreComponent.Tools.Method.Type<TMethod>]: CoreComponent.Tools.Method.Interface<TPropTypes> } {
    return methods;
}