
import * as UtilConsts                  from "@/util_consts";
///------------------------------
import {MTGetExtension as GetExtension} from "../methods/MTGetExtension";

export const MTGetIMimeType = function (filename: string): string {

    const extension = GetExtension(filename);

    return UtilConsts.FileExtensionTypes[extension] ?? "";
}