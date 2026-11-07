// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {ComponentMenuMore} from "../../src/framework/module_ui/module_components/lists/componentMenuMore/ComponentMenuMore";

const mounted: ComponentMenuMore[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.replaceChildren();
});

describe("ComponentMenuMore submenu loading", () => {
    it("does not load FloatMenu support for leaf-only menus", () => {
        const component = new ComponentMenuMore({
            prop_items: [{id: "leaf", title: "Leaf action"}],
        } as any);
        mounted.push(component);

        expect((component as any)._SUBMENU_RUNTIME).toBeNull();
        expect((component as any)._SUBMENU_RUNTIME_PROMISE).toBeNull();
        expect((component as any)._FLOAT_MENUS).toHaveLength(0);
    });

    it("loads and opens a nested FloatMenu when the submenu is requested", async () => {
        const component = new ComponentMenuMore({
            prop_items: [{
                id: "parent",
                title: "Parent",
                openOn: "click",
                children: [{id: "child", title: "Child"}],
            }],
        } as any);
        mounted.push(component);
        document.body.appendChild(component.getElement());

        expect((component as any)._SUBMENU_RUNTIME).toBeNull();
        component.getElement().querySelector<HTMLButtonElement>('[role="menuitem"]')?.click();

        for (let attempt = 0; attempt < 100 && (
            (component as any)._FLOAT_MENUS.length === 0
            || !(component as any)._FLOAT_MENUS[0]?._IS_SHOW
        ); attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        const floatMenus = (component as any)._FLOAT_MENUS;
        expect(floatMenus).toHaveLength(1);
        expect(floatMenus[0]._IS_SHOW).toBe(true);
    });

    it("preserves hover-to-open behavior for lazy nested menus", async () => {
        const component = new ComponentMenuMore({
            prop_items: [{
                id: "hover-parent",
                title: "Hover parent",
                children: [{id: "hover-child", title: "Hover child"}],
            }],
        } as any);
        mounted.push(component);
        document.body.appendChild(component.getElement());

        component.getElement().querySelector<HTMLElement>('[role="none"]')
            ?.dispatchEvent(new MouseEvent("mouseenter"));

        for (let attempt = 0; attempt < 100 && (
            (component as any)._FLOAT_MENUS.length === 0
            || !(component as any)._FLOAT_MENUS[0]?._IS_SHOW
        ); attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        const floatMenus = (component as any)._FLOAT_MENUS;
        expect(floatMenus).toHaveLength(1);
        expect(floatMenus[0]._IS_SHOW).toBe(true);
    });
});
