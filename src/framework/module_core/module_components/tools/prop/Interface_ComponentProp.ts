import * as CoreObservable from "@/core_observable";
import * as UtilBrands         from "@/util_brands";
// --------------------------------

export interface Interface_ComponentProp<TPropTypes> {
    prop:              string;
    default:           TPropTypes;
    value?:            null;
    hasMultiTemplate?: boolean;
    name?:             UtilBrands.TranslationKey , //CoreObservable.App<string> ,
    description?:      UtilBrands.TranslationKey , //CoreObservable.App<string> ,
}
