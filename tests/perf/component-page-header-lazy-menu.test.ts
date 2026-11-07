// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import {ComponentPageHeader} from "../../src/framework/module_ui/module_components/lists/componentPageHeader/ComponentPageHeader";

const mounted: ComponentPageHeader[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.replaceChildren();
});

describe("ComponentPageHeader optional options menu loading", () => {
    it("does not load menu support until options are supplied and preserves selection", async () => {
        const selectOption = vi.fn();
        const component = new ComponentPageHeader({prop_pageTitle: "Dashboard"}, {SELECT_OPTION: selectOption} as any);
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect((component as any)._MENU_MORE_RUNTIME).toBeNull();
        expect((component as any)._OPTIONS_MENU).toBeNull();

        component.set("prop_menuItems", [{id: "refresh", title: "Refresh", action: "refresh"}]);
        await vi.waitFor(() => expect((component as any)._OPTIONS_MENU).not.toBeNull());

        const refresh = root.querySelector<HTMLButtonElement>('[role="menuitem"]');
        expect(refresh?.textContent).toContain("Refresh");
        refresh?.click();
        expect(selectOption).toHaveBeenCalledTimes(1);
        expect(selectOption.mock.calls[0]?.[1]).toMatchObject({NAME: "refresh", ITEM: {id: "refresh"}});

        component.set("prop_menuItems", []);
        await vi.waitFor(() => expect((component as any)._OPTIONS_MENU).toBeNull());
        expect(root.querySelector('[role="menuitem"]')).toBeNull();
    });
});
