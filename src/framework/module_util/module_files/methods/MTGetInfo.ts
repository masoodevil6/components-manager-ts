///------------------------------
import {MTGetIMimeType  as GetIMimeType } from "../methods/MTGetIMimeType";
import { MTGetExtension as GetExtension}  from "../methods/MTGetExtension";
import {TFileInfo       as FileInfo}      from "../types/TFileInfo";

export const MTGetInfo = function (file: File, newFileName: string | null = null): FileInfo {
    const fileName = newFileName
        ? `${newFileName}.${this.getExtensionFileSelected(file.name)}`
        : file.name;
    return {
        file:      file,
        size:      file.size,
        type:      file.type,
        name:      fileName,
        mime:      GetIMimeType(fileName) ,
        extension: GetExtension(fileName)
    };
}