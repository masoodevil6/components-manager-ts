import * as CoreReactive   from "@/core_reactive";
import * as UtilBrands     from "@/util_brands";
/// ----------------------------------------
import {IconRenderContext} from "./index"

export interface IIconDefinition {

    title:         UtilBrands.TranslationKey;
    description?:  UtilBrands.TranslationKey;

    viewBoxX:      number;
    viewBoxY:      number;

    render(
        context: IconRenderContext
    ): CoreReactive.App[];

}