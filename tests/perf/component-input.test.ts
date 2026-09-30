// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentInput", () => {
    it("composes ComponentInputSimple and forwards input events and value", () => {
        const change = vi.fn();
        const focus = vi.fn();
        const blur = vi.fn();
        const inputComponent = UiCategory.UI.Inputs.Input({
            prop_name: "email",
            prop_value: "initial",
            prop_labelTitle: "Email",
            prop_type: "email" as any,
            prop_placeholder: "name@example.com",
            prop_icon: UiIcons.Src.FileApplication.Definition,
            prop_btnAddStatus: true,
            prop_btnAddTitle: "Add",
            prop_btnAddWidth: 96,
        }, {INPUT_CHANGE: change, INPUT_FOCUS: focus, INPUT_BLUR: blur});
        const root = inputComponent.getElement() as HTMLElement;
        document.body.appendChild(root);

        expect(root.querySelector("component-label")).not.toBeNull();
        expect(root.querySelector("label")).toBeNull();
        const forms = root.querySelectorAll('[data-part-name="part-input-form"]');
        expect(forms).toHaveLength(1);
        expect(forms[0].querySelector("component-icon")).not.toBeNull();
        expect(forms[0].querySelector("component-input-simple")).not.toBeNull();
        expect(forms[0].querySelector("button")).not.toBeNull();
        expect((forms[0] as HTMLElement).style.display).toBe("flex");
        expect((forms[0] as HTMLElement).style.flexDirection).toBe("row");
        expect((forms[0] as HTMLElement).style.width).toBe("");
        const iconElement = forms[0].querySelector("component-icon") as HTMLElement;
        const inputComponentElement = forms[0].querySelector("component-input-simple") as HTMLElement;
        const addButton = forms[0].querySelector("button") as HTMLButtonElement;
        expect(iconElement.style.width).toContain("var(--paddingMedium)");
        expect(iconElement.style.width).toContain("var(--heightMedium)");
        expect(iconElement.style.height).toContain("var(--paddingMedium)");
        expect(iconElement.style.height).toContain("var(--heightMedium)");
        expect(inputComponentElement.style.width).toContain("96px");
        expect(inputComponentElement.style.width).toContain("var(--heightMedium)");
        expect(inputComponentElement.style.width).toContain("var(--paddingMedium)");
        expect(inputComponentElement.style.width).not.toContain("+ )");
        expect(addButton.style.width).toBe("96px");
        expect(addButton.style.height).toContain("var(--paddingMedium)");
        expect(addButton.style.height).toContain("var(--heightMedium)");
        const input = root.querySelector("input") as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.name).toBe("email[value]");
        expect(input.type).toBe("email");
        expect(input.value).toBe("initial");
        expect(root.querySelectorAll("input")).toHaveLength(1);

        (root.querySelector("label") as HTMLElement).click();
        expect(document.activeElement).toBe(input);

        input.focus();
        expect(focus).toHaveBeenCalledTimes(1);
        input.value = "person@example.com";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        expect(inputComponent.get("prop_value")).toBe("person@example.com");
        expect(change).toHaveBeenCalledTimes(1);
        input.blur();
        expect(blur).toHaveBeenCalledTimes(1);

        const inputIcon = root.querySelector("component-icon");
        input.blur();
        (inputIcon?.querySelector("i") as HTMLElement).click();
        expect(document.activeElement).toBe(input);

        inputComponent.dispose();
    });

    it("shows the add action only when enabled and forwards its click", () => {
        const click = vi.fn();
        const inputComponent = UiCategory.UI.Inputs.Input({
            prop_btnAddStatus: true,
            prop_btnAddTitle: "Add",
            prop_btnAddWidth: 96,
            prop_value: "ready",
        }, {CLICK_BUTTON: click});
        const root = inputComponent.getElement() as HTMLElement;
        document.body.appendChild(root);
        const button = root.querySelector("button");
        expect(button).not.toBeNull();
        button?.click();
        expect(click).toHaveBeenCalledTimes(1);
        inputComponent.dispose();

        const disabledInput = UiCategory.UI.Inputs.Input({prop_btnAddStatus: true, prop_isDisable: true});
        const disabledRoot = disabledInput.getElement() as HTMLElement;
        document.body.appendChild(disabledRoot);
        expect(disabledRoot.querySelector("button")).toBeNull();
        disabledInput.dispose();
    });
});
