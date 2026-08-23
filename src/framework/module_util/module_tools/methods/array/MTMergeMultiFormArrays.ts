
///------------------------------
import {TFormArray as FormArray}    from "../../types/TFormArray"

export const MTMergeMultiFormArrays = function (...arrays: FormArray[][]): FormArray[] {
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