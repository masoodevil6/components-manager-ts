import {Keys} from "./keys";
import * as UtilBrands from "@/util_brands";

export const DictEn: Map<UtilBrands.TranslationKey, string> = new Map([
    [Keys.charLength.title,       "Character Length"],
    [Keys.charLength.description, "Must contain at least {{min}} non-numeric characters"],

    [Keys.isEmail.title,          "Email"],
    [Keys.isEmail.description,    "Must be a valid email address"],

    [Keys.notEmpty.title,         "Not Empty"],
    [Keys.notEmpty.description,   "Must not be empty"],

    [Keys.numLength.title,        "Number Length"],
    [Keys.numLength.description,  "Must be a valid email address"],

    [Keys.textCharUpper.title,     "Uppercase Letter"],
    [Keys.textCharUpper.description, "Must contain at least {{min}} uppercase letter(s)"],

    [Keys.textForbidden.title,     "Forbidden Characters"],
    [Keys.textForbidden.description, "Must only contain allowed characters"],

    [Keys.textLength.title,        "Text Length"],
    [Keys.textLength.description,  "Must be at least {{min}} characters long"],
]);
