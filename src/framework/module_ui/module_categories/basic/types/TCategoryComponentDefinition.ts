import * as UtilBrands from "@/util_brands";

export type TCategoryComponentDefinition = {
    id: string;

    name:              UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;

    children?:         TCategoryComponentDefinition[];
}