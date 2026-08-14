import * as CoreComponent from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";

export interface Interface_ComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    method?:           (attrsDefault: CoreComponent.Others.Types.Type_PartAttrDefault , data: Record<string, CoreObservable.Observable<any>> , extra: Record<string, any>) => CoreReactive.ReactiveElement,
    props?:            CoreComponent.Tools.Prop.Interface<TPropTypes[keyof TPropTypes]>[] ,
    title?:            CoreObservable.Observable<string> ,
    description?:      CoreObservable.Observable<string> ,
}