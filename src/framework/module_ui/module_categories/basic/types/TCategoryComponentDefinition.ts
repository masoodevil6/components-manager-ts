import * as UtilBrands from "@/util_brands";
// ------------------
import {TCategoryComponentTotality} from "./TCategoryComponentTotality";

export type TCategoryComponentDefinition = {
    id: string;

    name:              UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;

    children?:         TCategoryComponentDefinition[];
    components?:       TCategoryComponentTotality[];
}