import * as CoreObservable from "@/core_observable";

export interface Interface_ComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:            null;
    hasMultiTemplate?: boolean;
    title?:            CoreObservable.Observable<string> ,
    description?:      CoreObservable.Observable<string> ,
}