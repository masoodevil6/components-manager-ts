
export const MTGetListStyles = function (   data?: string | Record<string, string | number> | null): string {
    if (!data)
        return "";

    if (typeof data === "string")
        return data;

    return Object.entries(data)
        .map(([key, value]) => `${key}:${value};`)
        .join("");
}