// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentTooltip hover", () => {
    it("shows selector-position when hovering its ComponentIcon", () => {
        const tooltip = UiCategory.UI.Positions.Tooltip({prop_tooltipDescription: "Tooltip content"}, {});
        const root = tooltip.getElement() as HTMLElement;
        document.body.appendChild(root);

        const selector = root.querySelector('[data-part-name="part-selector"]') as HTMLElement;
        const icon = selector.querySelector("component-icon");
        const position = selector.querySelector('[data-part-name="part-selector-position"]') as HTMLElement;
        expect(icon).not.toBeNull();
        expect(position).not.toBeNull();
        expect(position.querySelector(".d-none")).not.toBeNull();

        position.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));
        expect(position.querySelector(".d-none")).not.toBeNull();

        icon?.dispatchEvent(new MouseEvent("mouseover", {bubbles: true}));
        expect(position.querySelector(".d-none")).toBeNull();

        icon?.dispatchEvent(new MouseEvent("mouseout", {bubbles: true, relatedTarget: document.body}));
        expect(position.querySelector(".d-none")).not.toBeNull();

        tooltip.dispose();
    });
});
