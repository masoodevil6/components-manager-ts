// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ComponentSelectCustomSimple", () => {
    it("opens, searches, selects an option, and synchronizes the form value", () => {
        const change = vi.fn();
        const searchChange = vi.fn();
        const opened = vi.fn();
        const closed = vi.fn();
        const select = UiCategory.UI.Simples.SelectCustomSimple({
            prop_selectName: "fruit",
            prop_selectPlaceholder: "Choose a fruit",
            prop_selectOptions: [
                {id: 1, prefix: "A", name: "Apple"},
                {id: 2, prefix: "B", name: "Banana"},
            ],
        }, {SELECT_CHANGE: change, SELECT_SEARCH: searchChange, SELECT_OPEN: opened, SELECT_CLOSE: closed});
        const root = select.getElement() as HTMLElement;
        document.body.appendChild(root);

        expect(root.querySelector('input[type="hidden"]')).not.toBeNull();
        const header = root.querySelector('[data-part-name="part-select-custom-simple-header"]') as HTMLElement;
        header.click();

        const search = root.querySelector('input[type="text"]') as HTMLInputElement;
        expect(search).not.toBeNull();
        search.value = "ban";
        search.dispatchEvent(new Event("input", {bubbles: true}));
        expect(searchChange).toHaveBeenCalledTimes(1);
        expect(root.textContent).not.toContain("Apple");

        const option = Array.from(root.querySelectorAll('[data-part-name="part-select-custom-simple-option"]'))
            .find((element) => element.textContent?.includes("Banana")) as HTMLElement;
        expect(option).toBeDefined();
        option.click();

        expect(select.get("prop_selectValue")).toBe(2);
        expect((root.querySelector('input[type="hidden"]') as HTMLInputElement).value).toBe("2");
        expect(change).toHaveBeenCalledTimes(1);
        expect(opened).toHaveBeenCalledTimes(1);
        expect(closed).toHaveBeenCalledTimes(1);
        select.dispose();
    });

    it("does not create a submitted value or open when disabled", () => {
        const select = UiCategory.UI.Simples.SelectCustomSimple({
            prop_selectDisable: true,
            prop_selectName: "fruit",
            prop_selectOptions: [{id: 1, prefix: "A", name: "Apple"}],
        });
        const root = select.getElement() as HTMLElement;
        document.body.appendChild(root);
        expect(root.querySelector('input[type="hidden"]')).toBeNull();
        (root.querySelector('[data-part-name="part-select-custom-simple-header"]') as HTMLElement).click();
        expect(root.querySelector('input[type="text"]')).toBeNull();
        select.dispose();
    });

    it("closes on Escape and outside click", () => {
        const closed = vi.fn();
        const select = UiCategory.UI.Simples.SelectCustomSimple({
            prop_selectOptions: [{id: 1, prefix: "A", name: "Apple"}],
        }, {SELECT_CLOSE: closed});
        const root = select.getElement() as HTMLElement;
        document.body.appendChild(root);
        const header = root.querySelector('[data-part-name="part-select-custom-simple-header"]') as HTMLElement;

        header.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter", bubbles: true}));
        document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", bubbles: true}));
        header.click();
        document.body.dispatchEvent(new MouseEvent("click", {bubbles: true}));

        expect(closed).toHaveBeenCalledTimes(2);
        select.dispose();
    });
});
