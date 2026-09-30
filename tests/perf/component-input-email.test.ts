// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";
import * as UtilValidators from "@/util_validators";

afterEach(() => { document.body.innerHTML = ""; });

describe("ComponentInputEmail", () => {
    it("renders label, icon, email input and forwards value/focus/blur", () => {
        const change = vi.fn();
        const focus = vi.fn();
        const blur = vi.fn();
        const email = UiCategory.UI.Inputs.InputEmail({
            prop_name: "email",
            prop_value: "initial@example.com",
            prop_labelTitle: "Email",
        }, {INPUT_CHANGE: change, INPUT_FOCUS: focus, INPUT_BLUR: blur});
        const root = email.getElement() as HTMLElement;
        document.body.appendChild(root);

        const form = root.querySelector('[data-part-name="part-input-email-form"]') as HTMLElement;
        expect(form).not.toBeNull();
        expect(form.children).toHaveLength(2);
        expect(form.children[0].tagName.toLowerCase()).toBe("component-icon");
        expect(form.children[1].tagName.toLowerCase()).toBe("component-input-simple");
        expect(root.querySelectorAll("input")).toHaveLength(1);

        const input = root.querySelector("input") as HTMLInputElement;
        expect(input.type).toBe("email");
        expect(input.name).toBe("email[value]");
        expect(input.value).toBe("initial@example.com");

        input.focus();
        expect(focus).toHaveBeenCalledTimes(1);
        input.value = "next@example.com";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        expect(email.get("prop_value")).toBe("next@example.com");
        expect(change).toHaveBeenCalledTimes(1);
        input.blur();
        expect(blur).toHaveBeenCalledTimes(1);

        const clear = root.querySelector(".component-input-simple-clear") as HTMLElement;
        clear.click();
        expect(email.get("prop_value")).toBe("");
        expect(change).toHaveBeenCalledTimes(2);
        email.dispose();
    });

    it("omits the icon when both icon props are null and validates with the email rule", () => {
        const email = UiCategory.UI.Inputs.InputEmail({
            prop_icon: null,
            prop_iconEmail: null,
            prop_hasRules: true,
            prop_listRules: [],
        });
        const root = email.getElement() as HTMLElement;
        const form = root.querySelector('[data-part-name="part-input-email-form"]') as HTMLElement;
        expect(form.children).toHaveLength(1);
        expect(form.children[0].tagName.toLowerCase()).toBe("component-input-simple");
        expect(root.querySelector('[data-part-name="part-input-email-validate"]')).toBeNull();
        email.dispose();

        const validatedEmail = UiCategory.UI.Inputs.InputEmail({
            prop_hasRules: true,
            prop_listRules: [new UtilValidators.validates.NotEmpty({En: "Required", Fa: "الزامی"}, {En: "Required", Fa: "الزامی"})],
        });
        expect((validatedEmail.getElement() as HTMLElement).querySelector('[data-part-name="part-input-email-validate"]')).not.toBeNull();
        validatedEmail.dispose();
    });
});
