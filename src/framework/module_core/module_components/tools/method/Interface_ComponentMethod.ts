
import * as CoreObservable                                  from "@/core_observable";
// --------------------------------
import {Interface_ComponentProp   as PropInterface   }      from "../../tools/prop/Interface_ComponentProp";
import {Callback_ComponentMethod  as MethodCallback  }      from "../../tools/method/Callback_ComponentMethod";

export interface Interface_ComponentMethod<TPropTypes> {
    args?:             Record<string, PropInterface<TPropTypes[keyof TPropTypes]>> ;
    title?:            CoreObservable.App<string> ,
    description?:      CoreObservable.App<string> ,
    destination?:      MethodCallback<any , any> // (...args: any[]) => void;
}