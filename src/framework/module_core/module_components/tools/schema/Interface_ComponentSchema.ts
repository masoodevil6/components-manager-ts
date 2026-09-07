
import * as CoreObservable                                      from "@/core_observable";
// --------------------------------
import {Interface_ComponentProp as PropInterface }              from "../../tools/prop/Interface_ComponentProp";
import * as UtilBrands                                          from "@/util_brands";

export interface Interface_ComponentSchema<TSchema , TPropTypes> {
    part:              TSchema ,
    props?:            PropInterface<TPropTypes[keyof TPropTypes]>[] ,
    name?:             UtilBrands.TranslationKey  ,
    description?:      UtilBrands.TranslationKey ,
}

