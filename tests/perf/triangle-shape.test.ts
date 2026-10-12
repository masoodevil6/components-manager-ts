import {describe, expect, it} from "vitest";
import {Css_Triangle} from "@/util_shapes";

describe("Css_Triangle", () => {
    it("creates border declarations for all four directions", () => {
        const expected: Record<string, {borderWidth: string; borderColor: string}> = {
            up: {
                borderWidth: "0 calc(10px / 2) 20px calc(10px / 2)",
                borderColor: "transparent transparent red transparent",
            },
            right: {
                borderWidth: "calc(20px / 2) 0 calc(20px / 2) 10px",
                borderColor: "transparent transparent transparent red",
            },
            down: {
                borderWidth: "20px calc(10px / 2) 0 calc(10px / 2)",
                borderColor: "red transparent transparent transparent",
            },
            left: {
                borderWidth: "calc(20px / 2) 10px calc(20px / 2) 0",
                borderColor: "transparent red transparent transparent",
            },
        };

        for (const [direction, values] of Object.entries(expected)) {
            expect(Css_Triangle({direction: direction as "up" | "right" | "down" | "left", width: 10, height: 20, color: "red"}))
                .toMatchObject(values);
        }
    });

    it("preserves caller-supplied positioning", () => {
        expect(Css_Triangle({direction: "right", width: "var(--w)", height: "var(--h)", color: "blue", position: {top: "2px", insetInlineStart: "4px"}}))
            .toMatchObject({top: "2px", insetInlineStart: "4px", position: "absolute"});
    });
});
