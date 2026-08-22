import * as UtilTools from "@/util_tools"

export const MTMergeMultiFormArrays = function (...arrays: UtilTools.Types.FormArray[][]): UtilTools.Types.FormArray[] {
    const map = new Map<string, unknown>();

    for (const array of arrays) {
        for (const item of array) {
            map.set(item.name, item.value);
        }
    }

    return Array.from(
        map,
        ([name, value]) => ({ name, value })
    );
}