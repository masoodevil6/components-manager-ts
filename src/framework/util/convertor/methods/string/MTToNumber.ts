export const MTToNumber = function (str: string): string {
    const pattern = /^-?\d*(\.\d*)?$/;

    if (!pattern.test(str)) {

        str = str.replace(/[^0-9.-]/g, "");

        str = str.replace(/(?!^)-/g, "");

        const parts = str.split(".");

        if (parts.length > 2) {

            str =
                parts[0] +
                "." +
                parts.slice(1).join("");

        }
    }

    return str;
}