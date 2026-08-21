import * as CoreComponent from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";

export interface Interface_ComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    method?:           (attrsDefault: CoreComponent.Others.Types.Type_PartAttrDefault , data: Record<string, CoreObservable.ClObservable<any>> , extra: Record<string, any>) => CoreReactive.ReactiveElement,
    props?:            CoreComponent.Tools.Prop.Interface<TPropTypes[keyof TPropTypes]>[] ,
    title?:            CoreObservable.ClObservable<string> ,
    description?:      CoreObservable.ClObservable<string> ,
}