
export const MTGetListClass = function ( data?: string | string[] | null): string {
    if (Array.isArray(data))
        return data.join(" ");

    return data ?? "";
}