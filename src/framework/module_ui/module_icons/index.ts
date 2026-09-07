// Enums
import {MtCreateIcon} from "./basic/methods/MtCreateIcon";
import * as UtilBrands from "@/util_brands";


export { IconVariant } from "./basic/enums";

// Interfaces (Types)
export type {
    IconDefinition as IIconDefinition,
    IconOptions     as IIconOptions
} from "./basic/interface";



//export type TIconInstance = ReturnType<typeof MtCreateIcon>;

// Methods (Functions)
export { CreateIcon} from "./basic/methods";

export * as Src from "./src"





declare const __mtCreateIcon: unique symbol;

/**
 * TIconInstance — type instance آیکون تولیدشده توسط CreateIcon
 *
 * Plan 13.1.0 — fix: قبلاً برند جداگانه [__mtCreateIcon] داشت که هیچ‌وقت
 * توسط MtCreateIcon ست نمی‌شد؛ در نتیجه خروجی CreateIcon (UtilBrands.Icons)
 * به این type assign نمی‌شد (TS2742 در componentMessages/Button/Icon/Label).
 * اکنون همان برند واحد UtilBrands.Icons حاکم است.
 */
export type TIconInstance = UtilBrands.Icons;