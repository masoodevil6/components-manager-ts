export interface SerializeItem {
    name: string;
    value: string;
    type?: string;
}

export class ToolsConverter {

    static serializeArray(
        formElement: HTMLFormElement | null
    ): SerializeItem[] {

        if (!formElement)
            return [];

        const result: SerializeItem[] = [];

        const elements = formElement.elements;

        for (let i = 0; i < elements.length; i++) {

            const field = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

            if (
                !field.name ||
                field.disabled ||
                ["file", "reset", "submit", "button"].includes((field as HTMLInputElement).type)
            ) {
                continue;
            }

            if (field instanceof HTMLSelectElement && field.multiple) {

                for (const option of Array.from(field.options)) {

                    if (option.selected) {

                        result.push({
                            name: field.name,
                            value: option.value,
                            type: "select-multiple"
                        });

                    }
                }

            } else if (

                (!(field instanceof HTMLInputElement) ||
                    !["checkbox", "radio"].includes(field.type)) ||

                (field instanceof HTMLInputElement && field.checked)

            ) {

                result.push({
                    name: field.name,
                    value: field.value,
                    type: (field as HTMLInputElement).type
                });

            }
        }

        return result;
    }

    static convertPriceToString(
        value: string | number
    ): string | null {

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

    static convertStringToPrice(
        input: string | number
    ): number | null {

        const cleaned = String(input).replace(/,/g, "");

        if (!/^\d+(\.\d+)?$/.test(cleaned))
            return null;

        return Number(cleaned);
    }

    static customSerialize(
        obj: Record<string, unknown>
    ): string {

        return Object.entries(obj)
            .map(([key, value]) => `${key}=${value}`)
            .join(";");
    }

    static customUnSerialize(
        input: string
    ): Record<string, string> {

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

    static numPersianToEnglish(
        str: string | number,
        isInt = false
    ): string | number {

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

    static numEnglishToPersian(
        str: string | number,
        isInt = false
    ): string | number {

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

    static toKebabCase(
        str: string
    ): string {

        return str
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
            .toLowerCase();
    }

    static convertStrToNum(
        str: string
    ): string {

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

}