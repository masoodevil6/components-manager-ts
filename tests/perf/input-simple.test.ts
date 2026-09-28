// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentInputSimple", () => {
    it("updates value and fires change, focus, blur, and clear callbacks", () => {
        const change = vi.fn();
        const focus = vi.fn();
        const blur = vi.fn();
        const inputSimple = UiCategory.UI.Simples.InputSimple({
            prop_inputName: "email",
            prop_inputType: "email" as any,
            prop_inputPlaceholder: "name@example.com",
            prop_inputValue: "initial",
        }, {INPUT_CHANGE: change, INPUT_FOCUS: focus, INPUT_BLUR: blur});
        const root = inputSimple.getElement() as HTMLElement;
        document.body.appendChild(root);

        const input = root.querySelector("input") as HTMLInputElement;
        const border = root.querySelector('[data-part-name="part-border"]') as HTMLElement;
        expect(input.name).toBe("email[value]");
        expect(input.value).toBe("initial");
        expect(input.placeholder).toBe("name@example.com");

        input.focus();
        expect(focus).toHaveBeenCalledTimes(1);
        expect(border.style.borderColor).toBe("var(--secondaryColor1)");

        input.value = "user@example.com";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        expect(inputSimple.get("prop_inputValue")).toBe("user@example.com");
        expect(change).toHaveBeenCalledTimes(1);

        input.blur();
        expect(blur).toHaveBeenCalledTimes(1);

        const clearButton = root.querySelector(".component-input-simple-clear");
        expect(clearButton).not.toBeNull();
        clearButton?.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        expect(input.value).toBe("");
        expect(inputSimple.get("prop_inputValue")).toBeNull();
        expect(change).toHaveBeenCalledTimes(2);

        inputSimple.dispose();
    });

    it("hides the clear control while disabled", () => {
        const inputSimple = UiCategory.UI.Simples.InputSimple({prop_inputDisable: true});
        const root = inputSimple.getElement() as HTMLElement;
        document.body.appendChild(root);
        expect((root.querySelector(".component-input-simple-clear") as HTMLElement).style.display).toBe("none");
        expect((root.querySelector("input") as HTMLInputElement).disabled).toBe(true);
        inputSimple.dispose();
    });
});
