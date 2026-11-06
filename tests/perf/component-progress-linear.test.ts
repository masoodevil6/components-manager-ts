// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";
import * as CoreConfig from "@/core_configs";

describe("linear progress", () => {
    it("renders and reactively clamps a custom range with accessible values", () => {
        const value = new CoreObservable.App<number | null>(15);
        const progress = UiCategory.UI.Charts.ProgressLinear({prop_title: "Upload", prop_min: 10, prop_max: 30, prop_value: value});
        const root = progress.getElement() as HTMLElement;
        const track = root.querySelector('[role="progressbar"]')!;
        expect(track.getAttribute("aria-label")).toBe("Upload");
        expect(track.getAttribute("aria-valuenow")).toBe("15");
        expect(root.textContent).toContain("25%");
        value.set(100);
        expect(track.getAttribute("aria-valuenow")).toBe("30");
        expect(root.textContent).toContain("100%");
        value.set(null);
        expect(track.hasAttribute("aria-valuenow")).toBe(false);
        expect(root.textContent).not.toContain("100%");
        expect(root.querySelector('[data-progress-indeterminate="true"]')).not.toBeNull();
        progress.dispose();
    });
    it("uses an indeterminate state for invalid ranges and reports status", () => {
        const progress = UiCategory.UI.Charts.ProgressLinear({prop_min: 10, prop_max: 10, prop_value: 5, prop_accessibleLabel: "Measuring", prop_statusText: "Failed", prop_status: "error"});
        const root = progress.getElement() as HTMLElement;
        const track = root.querySelector('[role="progressbar"]')!;
        expect(track.getAttribute("aria-label")).toBe("Measuring");
        expect(track.hasAttribute("aria-valuenow")).toBe(false);
        expect(root.querySelector('[role="status"]')?.textContent).toBe("Failed");
        progress.dispose();
    });
    it("does not keep reacting after disposal", () => {
        const value = new CoreObservable.App<number | null>(0);
        const progress = UiCategory.UI.Charts.ProgressLinear({prop_value: value});
        const track = (progress.getElement() as HTMLElement).querySelector('[role="progressbar"]')!;
        progress.dispose();
        value.set(50);
        expect(track.getAttribute("aria-valuenow")).toBe("0");
    });
    it("follows the configured direction for the indeterminate animation", () => {
        const direction = CoreConfig.Settings.DirectionRtl.observable();
        const previous = direction.get();
        try {
            direction.set(false);
            const progress = UiCategory.UI.Charts.ProgressLinear({prop_value: null});
            const fill = (progress.getElement() as HTMLElement).querySelector('[data-progress-indeterminate="true"]') as HTMLElement;
            expect(fill.style.animation).toContain("progress-linear-ltr");
            direction.set(true);
            expect(fill.style.animation).toContain("progress-linear-rtl");
            progress.dispose();
        } finally {
            direction.set(previous);
        }
    });
});
