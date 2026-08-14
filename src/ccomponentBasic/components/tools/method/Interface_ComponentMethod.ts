import * as CoreComponent from "@/core_components";
import * as CoreObservable from "@/core_observable";

export interface Interface_ComponentMethod<TPropTypes> {
    args?:             Record<string, CoreComponent.Tools.Prop.Interface<TPropTypes[keyof TPropTypes]>> ;
    title?:            CoreObservable.Observable<string> ,
    description?:      CoreObservable.Observable<string> ,
    destination?:      CoreComponent.Tools.Method.Callback<any , any> // (...args: any[]) => void;
}