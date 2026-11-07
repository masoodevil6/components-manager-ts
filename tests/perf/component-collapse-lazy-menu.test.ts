// @vitest-environment jsdom
import {afterEach, describe, expect, it} from "vitest";
import {ComponentCollapse} from "../../src/framework/module_ui/module_components/lists/componentCollapse/ComponentCollapse";

const mounted: ComponentCollapse[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.replaceChildren();
});

describe("ComponentCollapse optional header menu loading", () => {
    it("does not load menu support when the menu has no entries", () => {
        const component = new ComponentCollapse({prop_collapseMenuItems: []} as any);
        mounted.push(component);

        expect((component as any)._MENU_MORE_RUNTIME).toBeNull();
        expect((component as any)._MENU_MORE_RUNTIME_PROMISE).toBeNull();
        expect((component as any)._HEADER_MENU).toBeNull();
    });

    it("loads the menu on demand and keeps item selection working", async () => {
        const selected: unknown[] = [];
        const component = new ComponentCollapse({
            prop_collapseMenuItems: [{id: "details", title: "Details", action: "details"}],
        } as any, {
            SELECT_MENU_ITEM: (_event, dataArgs) => selected.push(dataArgs?.ITEM),
        } as any);
        mounted.push(component);
        document.body.appendChild(component.getElement() as HTMLElement);

        for (let attempt = 0; attempt < 100 && !(component as any)._HEADER_MENU; attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }

        const item = component.getElement().querySelector<HTMLButtonElement>('[role="menuitem"]');
        expect((component as any)._MENU_MORE_RUNTIME).not.toBeNull();
        expect(item?.textContent).toContain("Details");
        item?.click();
        expect(selected).toHaveLength(1);
        expect(selected[0]).toMatchObject({id: "details", action: "details"});
    });
});
