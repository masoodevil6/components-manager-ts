// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {ComponentLabel} from "../../src/framework/module_ui/module_components/lists/componentLabel/ComponentLabel";

const mounted: ComponentLabel[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.replaceChildren();
});

describe("ComponentTooltipTrait lazy runtime", () => {
    it("does not create tooltip support without a description", () => {
        const label = new ComponentLabel({prop_labelTitle: "Name"} as any);
        mounted.push(label);
        document.body.appendChild(label.getElement());

        expect(label.getElement().querySelector("component-tooltip")).toBeNull();
    });

    it("loads and renders the tooltip when a description is supplied", async () => {
        const label = new ComponentLabel({
            prop_labelTitle: "Name",
            prop_labelTooltipDescription: "More information",
        } as any);
        mounted.push(label);
        document.body.appendChild(label.getElement());

        for (let attempt = 0; attempt < 100 && !label.getElement().querySelector("component-tooltip"); attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        expect(label.getElement().querySelector("component-tooltip")).not.toBeNull();
    });
});
