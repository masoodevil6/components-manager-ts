
import * as UtilConsts from "@/util_consts";
import * as UtilFiles from "@/util_files";

export const MTGetIMimeType = function (filename: string): string {

    const extension = UtilFiles.Methods.GetExtension(filename);

    return UtilConsts.FileExtensionTypes[extension] ?? "";
}