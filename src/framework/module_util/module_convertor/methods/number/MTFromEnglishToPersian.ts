export const MTFromEnglishToPersian = function (str: string | number, isInt = false): string | number {

    const value = String(str);

    const persianNums = "۰۱۲۳۴۵۶۷۸۹";
    const arabicNums = "٠١٢٣٤٥٦٧٨٩";

    const result = value.replace(
        /[۰-۹٠-٩]/g,
        d => {

            const index = persianNums.indexOf(d);

            if (index >= 0)
                return index.toString();

            return arabicNums.indexOf(d).toString();

        }
    );

    return isInt
        ? parseFloat(result)
        : result;
}