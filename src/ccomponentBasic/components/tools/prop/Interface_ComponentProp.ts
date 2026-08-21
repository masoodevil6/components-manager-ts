import * as CoreObservable from "@/core_observable";

export interface Interface_ComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:            null;
    hasMultiTemplate?: boolean;
    title?:            CoreObservable.ClObservable<string> ,
    description?:      CoreObservable.ClObservable<string> ,
}