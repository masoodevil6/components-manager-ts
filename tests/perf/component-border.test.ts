// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentBorder", () => {
    it("uses the medium utility border width on each enabled side", () => {
        const border = UiCategory.UI.Contents.Border({}, {});
        const root = border.getElement() as HTMLElement;
        document.body.appendChild(root);

        const partBorder = root.querySelector('[data-part-name="part-border"]') as HTMLElement;
        for (const side of ["top", "right", "bottom", "left"]) {
            expect(partBorder.style.getPropertyValue(`border-${side}-width`)).toBe("var(--borderWidthMedium)");
            expect(partBorder.style.getPropertyPriority(`border-${side}-width`)).toBe("important");
        }

        border.dispose();
    });
});
