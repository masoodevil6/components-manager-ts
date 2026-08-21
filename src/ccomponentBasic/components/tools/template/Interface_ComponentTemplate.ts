import * as CoreComponent from "@/core_components";
import * as CoreObservable from "@/core_observable";

export interface Interface_ComponentTemplate<TPropTypes>{
    reference:         CoreComponent.Tools.Prop.Interface<TPropTypes[keyof TPropTypes]>;
    html?:             string;
    attrs?:            Record<string, string>;
    value?:            any;
    title?:            CoreObservable.ClObservable<string> ,
    description?:      CoreObservable.ClObservable<string> ,
};