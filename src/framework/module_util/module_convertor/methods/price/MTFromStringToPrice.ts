export const MTFromStringToPrice = function (value: string | number): string | null {
    if (typeof value !== "string" && typeof value !== "number")
        return null;

    let val = String(value)
        .replace(/,/g, "")
        .replace(/[^\d.]/g, "")
        .replace(/(\..*)\./g, "$1");

    let [intPart, decimalPart] = val.split(".");

    intPart = intPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
    );

    return decimalPart !== undefined
        ? `${intPart}.${decimalPart}`
        : intPart;
}