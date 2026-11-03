// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";

vi.mock("@/ui_categories", () => ({
    UI: {},
    CreateCategoryComponent: (_definition: unknown, Component: new (...args: any[]) => any) =>
        (...args: any[]) => new Component(...args),
    CreateCategoryIcon: () => () => null,
}));

import * as CoreReactive from "@/core_reactive";
import {ComponentDraggableOrdersY} from "../../src/framework/module_ui/module_components/lists/componentDraggableOrdersY/ComponentDraggableOrdersY";

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("ComponentDraggableOrdersY", () => {
    it("reorders rows when nested content stops mouse events, while preserving click gestures", () => {
        vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => setTimeout(callback, 0));
        vi.spyOn(console, "debug").mockImplementation(() => {});

        const bodyRenderCount = new Map<string, number>();
        const component = new ComponentDraggableOrdersY({
            prop_draggableItems: ["first", "second", "third"].map((id) => ({
                id,
                body: () => {
                    bodyRenderCount.set(id, (bodyRenderCount.get(id) ?? 0) + 1);
                    return CoreReactive.App.section({
                        on: {mousedown: (event: Event) => event.stopPropagation()},
                        children: [id],
                    });
                },
            })),
            prop_draggableOrders: ["first", "second", "third"],
        } as any);
        const root = component.getElement() as HTMLElement;
        document.body.appendChild(root);

        const rows = [...root.querySelectorAll<HTMLElement>("[data-order]")];
        rows.forEach((row) => {
            const index = ["first", "second", "third"].indexOf(row.dataset.order ?? "");
            vi.spyOn(row, "getBoundingClientRect").mockReturnValue({
                x: 0,
                y: index * 20,
                top: index * 20,
                bottom: index * 20 + 20,
                left: 0,
                right: 100,
                width: 100,
                height: 20,
                toJSON: () => ({}),
            } as DOMRect);
        });

        const firstRow = rows[0];
        const pointerDown = new MouseEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: 10,
            clientY: 10,
        });
        firstRow.dispatchEvent(pointerDown);
        expect(pointerDown.defaultPrevented).toBe(false);

        window.dispatchEvent(new MouseEvent("pointermove", {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: 10,
            clientY: 45,
        }));
        window.dispatchEvent(new MouseEvent("pointerup", {
            bubbles: true,
            cancelable: true,
            button: 0,
            clientX: 10,
            clientY: 45,
        }));

        expect(component.get("prop_draggableOrders")).toEqual(["second", "first", "third"]);
        expect(bodyRenderCount.get("first")).toBeGreaterThan(1);
        (component as any).dispose?.();
    });
});
