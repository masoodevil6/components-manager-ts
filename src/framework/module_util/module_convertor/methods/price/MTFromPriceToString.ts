export const MTFromPriceToString = function (input: string | number): number | null {
     const cleaned = String(input).replace(/,/g, "");

        if (!/^\d+(\.\d+)?$/.test(cleaned))
            return null;

        return Number(cleaned);
}