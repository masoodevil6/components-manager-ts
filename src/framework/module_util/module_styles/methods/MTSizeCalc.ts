
///------------------------------
import {TCOperation as Operation }     from "../types/const/TCOperation";
import {TVSizeUnit  as SizeUnit }      from "../types/var/TVSizeUnit";
import { TVSizeCalc as SizeCalc}       from "../types/var/TVSizeCalc";


type CalcSizeParts = Operation | SizeUnit
export const MTSizeCalc = (...parts : CalcSizeParts[]) : SizeCalc => {
    let partStr = ""
    if (parts){
        for (let i = 0; i < parts.length; i++) {
            const itemPart = parts[i];
            if (itemPart){
                partStr += ` ${itemPart} `
            }
        }
    }
    return `calc(${partStr})` as  SizeCalc
}