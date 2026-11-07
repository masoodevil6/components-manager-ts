// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {ComponentLoading} from "../../src/framework/module_ui/module_components/lists/componentLoading/ComponentLoading";

afterEach(() => {
    document.getElementById("component-loading-styles")?.remove();
});

describe("ComponentLoading shared styles", () => {
    it("reuses one keyframe style across instances", () => {
        const loadings = Array.from({length: 12}, () => new ComponentLoading());

        expect(document.querySelectorAll("#component-loading-styles")).toHaveLength(1);
        expect(document.querySelectorAll('style[id^="component-loading-styles-"]')).toHaveLength(0);
        expect(document.getElementById("component-loading-styles")?.textContent).toContain("@keyframes component-loading-ring");

        for (const loading of loadings) loading.dispose();
    });
});
