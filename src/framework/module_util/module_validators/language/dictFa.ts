import {Keys} from "./keys";
import * as UtilBrands from "@/util_brands";

export const DictFa: Map<UtilBrands.TranslationKey, string> = new Map([
    [Keys.charLength.title,       "تعداد کاراکتر"],
    [Keys.charLength.description, "باید حداقل {{min}} کاراکتر غیر عددی داشته باشد"],

    [Keys.isEmail.title,          "ایمیل"],
    [Keys.isEmail.description,    "باید یک آدرس ایمیل معتبر باشد"],

    [Keys.notEmpty.title,         "خالی نبودن"],
    [Keys.notEmpty.description,   "نباید خالی باشد"],

    [Keys.numLength.title,        "طول عدد"],
    [Keys.numLength.description,  "باید یک آدرس ایمیل معتبر باشد"],

    [Keys.textCharUpper.title,     "حرف بزرگ"],
    [Keys.textCharUpper.description, "باید حداقل {{min}} حرف بزرگ داشته باشد"],

    [Keys.textForbidden.title,     "کاراکترهای ممنوعه"],
    [Keys.textForbidden.description, "فقط باید شامل کاراکترهای مجاز باشد"],

    [Keys.textLength.title,        "طول متن"],
    [Keys.textLength.description,  "باید حداقل {{min}} کاراکتر باشد"],
]);
