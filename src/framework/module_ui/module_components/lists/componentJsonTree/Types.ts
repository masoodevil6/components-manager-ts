export type JsonPrimitive = string | number | boolean | null | Date;
export type JsonValue = JsonPrimitive | JsonValue[] | {[key: string]: JsonValue};

export const isJsonBranch = (value: JsonValue | undefined): value is JsonValue[] | {[key: string]: JsonValue} =>
    value !== null && typeof value === "object" && !(value instanceof Date);

export const getJsonChildren = (value: JsonValue): Array<[string, JsonValue]> => {
    if (Array.isArray(value)) return value.map((child, index) => [String(index), child]);
    if (value !== null && typeof value === "object" && !(value instanceof Date)) return Object.entries(value);
    return [];
};

export const stringifyJson = (value: JsonValue): string => JSON.stringify(value, null, 2);

export const isIsoDateTimeString = (value: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return false;
    return !Number.isNaN(Date.parse(value));
};
