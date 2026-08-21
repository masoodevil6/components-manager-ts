import * as CoreComponent from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";

export interface Interface_ComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    method?:           (attrsDefault: CoreComponent.Basic.Types.PartAttrDefault , data: Record<string, CoreObservable.Class.Observable<any>> , extra: Record<string, any>) => CoreReactive.ReactiveElement,
    props?:            CoreComponent.Tools.Prop.Interface<TPropTypes[keyof TPropTypes]>[] ,
    title?:            CoreObservable.Class.Observable<string> ,
    description?:      CoreObservable.Class.Observable<string> ,
}