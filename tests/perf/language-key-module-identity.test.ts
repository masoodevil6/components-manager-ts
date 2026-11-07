import {describe, expect, it} from "vitest";
import {Keys} from "@/framework/module_ui/module_categories/languages/Keys";
import {En} from "@/framework/module_ui/module_categories/languages/En";
import {Fa} from "@/framework/module_ui/module_categories/languages/Fa";
import {Keys as BasicKeys} from "@/framework/module_ui/module_categories/languages/keys/components/basic";

describe("component language key modules", () => {
    it("preserves public key identity and existing translations", () => {
        const key = BasicKeys.category.components.basic.name;

        expect(key).toBe(Keys.category.components.basic.name);
        expect(En.has(key)).toBe(true);
        expect(Fa.has(key)).toBe(true);
    });
});
