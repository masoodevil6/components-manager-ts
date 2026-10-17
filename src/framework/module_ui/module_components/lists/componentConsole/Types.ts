export type ConsoleLevel = "log" | "info" | "warn" | "error" | "debug";

export type ConsoleValue = {
    type: string;
    preview: string;
    value?: unknown;
    entries?: Array<{key: string; value: ConsoleValue}>;
    stack?: string;
};

export type ConsoleEntry = {
    id: string;
    level: ConsoleLevel;
    line?: number | string;
    timestamp: number;
    values: ConsoleValue[];
};

const MAX_DEPTH = 5;
const MAX_PROPERTIES = 50;

/** Convert values into bounded, serializable data for the console inspector. */
export function serializeConsoleValue(value: unknown, depth = 0, seen = new WeakSet<object>()): ConsoleValue {
    if (value === null) return {type: "null", preview: "null"};
    if (value === undefined) return {type: "undefined", preview: "undefined"};
    if (typeof value === "string") return {type: "string", preview: JSON.stringify(value), value};
    if (typeof value === "number" || typeof value === "boolean") return {type: typeof value, preview: String(value), value};
    if (typeof value === "bigint") return {type: "bigint", preview: `${value.toString()}n`, value: value.toString()};
    if (typeof value === "symbol") return {type: "symbol", preview: String(value)};
    if (typeof value === "function") return {type: "function", preview: `[Function${value.name ? `: ${value.name}` : ""}]`};

    const objectValue = value as object;
    if (seen.has(objectValue)) return {type: "circular", preview: "[Circular]"};
    if (depth >= MAX_DEPTH) return {type: "truncated", preview: Array.isArray(value) ? `Array(${value.length})` : "Object {…}"};
    seen.add(objectValue);

    if (value instanceof Error) {
        return {
            type: "error",
            preview: `${value.name || "Error"}: ${value.message}`,
            value: value.message,
            stack: value.stack || "",
            entries: Object.keys(value).slice(0, MAX_PROPERTIES).map((key) => ({
                key,
                value: serializeConsoleValue((value as any)[key], depth + 1, seen),
            })),
        };
    }

    if (Array.isArray(value)) {
        return {
            type: "array",
            preview: `Array(${value.length})`,
            entries: value.slice(0, MAX_PROPERTIES).map((item, index) => ({
                key: String(index),
                value: serializeConsoleValue(item, depth + 1, seen),
            })),
        };
    }

    const keys = Object.keys(value as Record<string, unknown>).slice(0, MAX_PROPERTIES);
    let label = "Object";
    try {
        label = (value as any)?.constructor?.name || label;
    } catch { /* A hostile getter must not break logging. */ }
    return {
        type: "object",
        preview: `${label} {${keys.slice(0, 3).join(", ")}${keys.length > 3 ? ", …" : ""}}`,
        entries: keys.map((key) => {
            try {
                return {key, value: serializeConsoleValue((value as any)[key], depth + 1, seen)};
            } catch (error) {
                return {key, value: {type: "unavailable", preview: `[Getter threw: ${String(error)}]`}};
            }
        }),
    };
}

export function normalizeConsoleEntry(input: unknown, index = 0): ConsoleEntry | null {
    if (!input || typeof input !== "object") return null;
    const value = input as Record<string, any>;
    const levels: ConsoleLevel[] = ["log", "info", "warn", "error", "debug"];
    const level = levels.includes(value.level) ? value.level as ConsoleLevel : "log";
    const line = typeof value.line === "number" || typeof value.line === "string"
        ? value.line
        : typeof value.lineNumber === "number" || typeof value.lineNumber === "string"
            ? value.lineNumber
            : index + 1;
    const timestamp = typeof value.timestamp === "number" ? value.timestamp : Date.now();
    const rawValues = Array.isArray(value.values) ? value.values : Array.isArray(value.args) ? value.args : [value.message ?? input];
    return {
        id: typeof value.id === "string" ? value.id : `console-${timestamp}-${index}`,
        level,
        line,
        timestamp,
        values: rawValues.map((item: unknown) => isConsoleValue(item) ? item : serializeConsoleValue(item)),
    };
}

function isConsoleValue(value: unknown): value is ConsoleValue {
    return !!value && typeof value === "object" && typeof (value as ConsoleValue).type === "string" && typeof (value as ConsoleValue).preview === "string";
}
