/** A stable node name and its human-readable title. */
export interface TDictionaryEntry {
    /** Local name used as the workflow child key. */
    readonly name: string;
    /** Human-readable title shown by workflow inspectors. */
    readonly title: string;
}
