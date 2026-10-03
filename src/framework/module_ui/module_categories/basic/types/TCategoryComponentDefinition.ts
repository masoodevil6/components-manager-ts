import * as UtilBrands from "@/util_brands";
import type {ComponentConstructor} from "@/core_components";
// ------------------
import {TCategoryComponentTotality} from "./TCategoryComponentTotality";

export type TCategoryComponentDefinition = {
    id: string;

    name:              UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;

    children?:         TCategoryComponentDefinition[];
    components?:       TCategoryComponentTotality<InstanceType<ComponentConstructor>>[];
}