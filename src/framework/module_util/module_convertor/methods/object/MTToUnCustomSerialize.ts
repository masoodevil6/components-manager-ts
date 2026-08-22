export const MTToUnCustomSerialize = function (input: string): Record<string, string> {
    const obj: Record<string, string> = {};

    input.split(";").forEach(pair => {

        if (!pair.includes("="))
            return;

        const [key, value] = pair.split("=");

        if (key)
            obj[key] = value ?? "";

    });

    return obj;
}