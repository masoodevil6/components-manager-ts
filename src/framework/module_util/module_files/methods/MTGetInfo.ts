import * as UtilFiles from "@/util_files";

export const MTGetInfo = function (file: File, newFileName: string | null = null): UtilFiles.Types.FileInfo {
    const fileName = newFileName
        ? `${newFileName}.${this.getExtensionFileSelected(file.name)}`
        : file.name;
    return {
        file:      file,
        size:      file.size,
        type:      file.type,
        name:      fileName,
        mime:      UtilFiles.Methods.GetIMimeType(fileName) ,
        extension: UtilFiles.Methods.GetExtension(fileName)
    };
}