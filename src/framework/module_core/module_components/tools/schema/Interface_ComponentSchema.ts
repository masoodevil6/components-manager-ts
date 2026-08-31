
import * as CoreObservable                                      from "@/core_observable";
import * as CoreReactive                                        from "@/core_reactive";
// --------------------------------
import {TPartAttrDefault        as  PartAttrDefault}            from "../../basic/types/TPartAttrDefault";
import {Interface_ComponentProp as PropInterface }              from "../../tools/prop/Interface_ComponentProp";

export interface Interface_ComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    method?:           (attrsDefault: PartAttrDefault , data: Record<string, CoreObservable.App<any>> , extra: Record<string, any>) => CoreReactive.App,
    props?:            PropInterface<TPropTypes[keyof TPropTypes]>[] ,
    title?:            CoreObservable.App<string> ,
    description?:      CoreObservable.App<string> ,
}
