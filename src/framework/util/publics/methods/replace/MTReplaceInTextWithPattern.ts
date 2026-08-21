export const MTReplaceInTextWithPattern = function (
    template: string,
    params: Record<string, unknown> = {},
    pattern: RegExp = /{{(.*?)}}/g
): string {

    return template.replace(
        pattern,
        (match: string, key: string) => {

            const name = key.trim();
            const value = params[name];

            return value == null
                ? match
                : String(value);
        }
    );
};