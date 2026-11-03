// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentInputDescription", () => {
    it("submits its prop_name directly without a [value] suffix", () => {
        const description = UiCategory.UI.Inputs.InputDescription({
            prop_name: "message",
            prop_value: "Hello",
        });
        const root = description.getElement() as HTMLElement;
        const form = document.createElement("form");
        form.appendChild(root);
        document.body.appendChild(form);

        const textarea = root.querySelector("textarea") as HTMLTextAreaElement;
        expect(textarea.name).toBe("message");
        expect(new FormData(form).get("message")).toBe("Hello");

        description.dispose();
    });
});
