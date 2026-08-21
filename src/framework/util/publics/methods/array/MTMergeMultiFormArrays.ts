import * as UtilPublics from "@/util_publics"

export const MTMergeMultiFormArrays = function (...arrays: UtilPublics.Types.FormArray[][]): UtilPublics.Types.FormArray[] {
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