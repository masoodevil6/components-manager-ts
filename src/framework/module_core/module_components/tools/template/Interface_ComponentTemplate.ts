import * as CoreObservable                              from "@/core_observable";
// --------------------------------
import {Interface_ComponentProp as PropInterface }      from "../../tools/prop/Interface_ComponentProp";

export interface Interface_ComponentTemplate<TPropTypes>{
    reference:         PropInterface<TPropTypes[keyof TPropTypes]>;
    html?:             string;
    attrs?:            Record<string, string>;
    value?:            any;
    title?:            CoreObservable.App<string> ,
    description?:      CoreObservable.App<string> ,
};