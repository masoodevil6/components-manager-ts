// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";

afterEach(() => { document.body.innerHTML = ""; });

describe("ComponentInputSize", () => {
    it("renders one numeric input with bounds and applies increment/decrement", () => {
        const value = new CoreObservable.App(2);
        const changed = vi.fn();
        const component = UiCategory.UI.Inputs.InputSize({prop_value: value, prop_min: 1, prop_max: 3}, {INPUT_CHANGE: changed});
        const root = component.getElement() as HTMLElement;
        document.body.appendChild(root);

        const input = root.querySelector<HTMLInputElement>('input[type="number"]');
        const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button"));
        expect(root.querySelectorAll("input")).toHaveLength(1);
        expect(input?.min).toBe("1");
        expect(input?.max).toBe("3");
        expect(buttons).toHaveLength(2);

        buttons[0].click();
        expect(value.get()).toBe(1);
        buttons[0].click();
        expect(value.get()).toBe(1);
        buttons[1].click();
        expect(value.get()).toBe(2);
        expect(changed).toHaveBeenCalledTimes(2);

        component.dispose();
        value.set(3);
        expect(input?.isConnected).toBe(false);
    });

    it("clamps typed values and preserves the value for invalid bounds", () => {
        const component = UiCategory.UI.Inputs.InputSize({prop_value: 2, prop_min: 1, prop_max: 3});
        const input = (component.getElement() as HTMLElement).querySelector<HTMLInputElement>("input")!;
        input.value = "9";
        input.dispatchEvent(new Event("input", {bubbles: true}));
        expect(component.get("prop_value")).toBe(3);

        component.set("prop_min", 5);
        component.set("prop_max", 2);
        const button = (component.getElement() as HTMLElement).querySelector<HTMLButtonElement>("button")!;
        button.click();
        expect(component.get("prop_value")).toBe(3);
        component.dispose();
    });
});
