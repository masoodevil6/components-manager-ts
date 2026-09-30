// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";
import * as UiIcons from "@/ui_icons";

afterEach(() => { document.body.innerHTML = ""; });

describe("ComponentInputPassword", () => {
    it("renders the expected composition and forwards password input events", () => {
        const change = vi.fn();
        const focus = vi.fn();
        const blur = vi.fn();
        const password = UiCategory.UI.Inputs.InputPassword({
            prop_name: "password",
            prop_value: "initial-secret",
            prop_labelTitle: "Password",
            prop_icon: UiIcons.Src.UserPassword.Definition,
        }, {INPUT_CHANGE: change, INPUT_FOCUS: focus, INPUT_BLUR: blur});
        const root = password.getElement() as HTMLElement;
        document.body.appendChild(root);

        const form = root.querySelector('[data-part-name="part-input-password-form"]') as HTMLElement;
        expect(form).not.toBeNull();
        expect(form.children).toHaveLength(3);
        expect(form.children[0].tagName.toLowerCase()).toBe("component-icon");
        expect(form.children[1].tagName.toLowerCase()).toBe("component-input-simple");
        expect(form.children[2].tagName.toLowerCase()).toBe("component-icon");
        expect(root.querySelectorAll("input")).toHaveLength(1);

        const input = root.querySelector("input") as HTMLInputElement;
        expect(input.type).toBe("password");
        expect(input.name).toBe("password[value]");
        expect(input.value).toBe("initial-secret");

        input.focus();
        expect(focus).toHaveBeenCalledTimes(1);
        input.value = "new-secret";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        expect(password.get("prop_value")).toBe("new-secret");
        expect(change).toHaveBeenCalledTimes(1);
        input.blur();
        expect(blur).toHaveBeenCalledTimes(1);

        const visibility = form.children[2].querySelector("i") as HTMLElement;
        visibility.click();
        expect(input.type).toBe("text");
        expect(input.value).toBe("new-secret");

        password.dispose();
    });

    it("omits optional leading icon and hides validation when there are no rules", () => {
        const password = UiCategory.UI.Inputs.InputPassword({prop_labelTitle: "Password", prop_hasRules: true, prop_listRules: []});
        const root = password.getElement() as HTMLElement;
        const form = root.querySelector('[data-part-name="part-input-password-form"]') as HTMLElement;
        expect(form.children).toHaveLength(2);
        expect(root.querySelector('[data-part-name="part-input-password-validate"]')).toBeNull();
        password.dispose();
    });
});
