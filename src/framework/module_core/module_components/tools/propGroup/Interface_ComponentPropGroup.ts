import * as UtilBrands from "@/util_brands";

export interface Interface_ComponentPropGroup {
    name:           UtilBrands.TranslationKey ;  /// Defaults to an empty string when omitted. 
    description?:   UtilBrands.TranslationKey ;  /// Defaults to an empty string when omitted.
    col?:           number;                      /// Defaults to 2 columns when omitted.
}
