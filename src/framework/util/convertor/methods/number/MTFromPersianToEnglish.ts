export const MTFromPersianToEnglish = function (str: string | number, isInt = false): string | number {
    if (typeof str !== "string")
        return str;

    const value = str.replace(
        /[۰-۹]/g,
        d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()
    );

    return isInt
        ? parseInt(value)
        : value;
}