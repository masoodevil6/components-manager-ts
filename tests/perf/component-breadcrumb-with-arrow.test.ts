// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import {ComponentBreadcrumbWithArrow} from "../../src/framework/module_ui/module_components/lists/componentBreadcrumbWithArrow/ComponentBreadcrumbWithArrow";

describe("ComponentBreadcrumbWithArrow", () => {
    const mounted: ComponentBreadcrumbWithArrow[] = [];
    afterEach(() => {
        mounted.splice(0).forEach((component) => component.dispose());
        vi.unstubAllGlobals();
    });

    it("renders wide SVG chevrons with zero-based active state", () => {
        const component = new ComponentBreadcrumbWithArrow({
            prop_breadcrumbs: [{title: "Home"}, {title: "Details"}, {title: "Finish"}],
            prop_stepSelected: 1,
        });
        mounted.push(component);
        const root = component.getElement() as HTMLElement;
        expect(root.querySelectorAll("svg polygon")).toHaveLength(6);
        expect(root.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
        expect(root.querySelectorAll('[role="button"]')).toHaveLength(3);
    });

    it("passes the original step object once for click and keyboard activation", () => {
        const selectedItem = {id: "profile", title: "Profile", metadata: {source: "test"}};
        const onSelect = vi.fn();
        const component = new ComponentBreadcrumbWithArrow({
            prop_breadcrumbs: [selectedItem, {title: "Finish"}],
            prop_stepSelected: 0,
        }, {SELECT_BREADCRUMB: onSelect});
        mounted.push(component);
        const steps = component.getElement().querySelectorAll<SVGGElement>('[role="button"]');

        steps[0].dispatchEvent(new MouseEvent("click", {bubbles: true}));
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][1].ITEM).toBe(selectedItem);

        steps[1].dispatchEvent(new KeyboardEvent("keydown", {key: "Enter", bubbles: true}));
        expect(onSelect).toHaveBeenCalledTimes(2);
        expect(onSelect.mock.calls[1][1].ITEM.title).toBe("Finish");
    });

    it("switches SVG layouts on container resize and disconnects its observer", () => {
        let resize: ((entries: Array<{contentRect: {width: number}}>) => void) | null = null;
        let disconnected = false;
        class MockResizeObserver {
            constructor(callback: typeof resize) { resize = callback; }
            observe() { resize?.([{contentRect: {width: 420}}]); }
            disconnect() { disconnected = true; }
        }
        vi.stubGlobal("ResizeObserver", MockResizeObserver);
        const component = new ComponentBreadcrumbWithArrow({
            prop_breadcrumbs: [{title: "One"}, {title: "Two"}, {title: "Three"}],
        });
        mounted.push(component);
        const svg = component.getElement().querySelector("svg")!;
        expect(svg.querySelectorAll("line")).toHaveLength(1);
        expect(svg.querySelectorAll("circle")).toHaveLength(3);
        expect(svg.querySelectorAll("polygon")).toHaveLength(0);

        resize?.([{contentRect: {width: 900}}]);
        expect(svg.querySelectorAll("polygon")).toHaveLength(6);
        expect(svg.querySelectorAll("line")).toHaveLength(0);

        component.dispose();
        expect(disconnected).toBe(true);
    });
});
