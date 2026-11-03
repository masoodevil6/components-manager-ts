import {describe, expect, it} from "vitest";
import {ValidateStandardStyles} from "@/util_options_std";

describe("standardized layout styles", () => {
    it("accepts and normalizes the componentLayoutCreator example styles", () => {
        expect(ValidateStandardStyles({
            minHeight: "5rem",
            display: "flex",
            alignItems: "center",
        })).toEqual({
            minHeight: "5rem",
            display: "flex",
            alignItems: "center",
        });
    });

    it("accepts standard properties in kebab-case and returns React style names", () => {
        expect(ValidateStandardStyles({"min-height": "5rem", "align-items": "center"})).toEqual({
            minHeight: "5rem",
            alignItems: "center",
        });
    });

    it("rejects unregistered properties and non-standard layout values", () => {
        expect(() => ValidateStandardStyles({unknownProperty: "value"})).toThrow(/not a standardized style property/);
        expect(() => ValidateStandardStyles({display: "unsupported-display"})).toThrow(/unsupported value/);
    });
});
