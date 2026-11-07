// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import {ComponentInputListSelector} from "../../src/framework/module_ui/module_components/lists/componentInputListSelector/ComponentInputListSelector";
import {ComponentPositionMenu} from "../../src/framework/module_ui/module_components/lists/componentPositionMenu/ComponentPositionMenu";
import {ComponentFloatMenu} from "../../src/framework/module_ui/module_components/lists/componentFloatMenu/ComponentFloatMenu";
import {ComponentButton} from "../../src/framework/module_ui/module_components/lists/componentButton/ComponentButton";
import {ComponentBorder} from "../../src/framework/module_ui/module_components/lists/componentBorder/ComponentBorder";
import {ComponentTable} from "../../src/framework/module_ui/module_components/lists/componentTable/ComponentTable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";

const categories = vi.hoisted(() => ({
    InputListSelector: null as any,
    PositionMenu: null as any,
    FloatMenu: null as any,
    Button: null as any,
    Border: null as any,
}));

vi.mock("@/ui_categories", () => {
    const asFactory = (key: keyof typeof categories) => (config: any, methods?: any) => new categories[key](config, methods);
    return {
        UI: {
            Inputs: {InputListSelector: asFactory("InputListSelector")},
            Positions: {
                PositionMenu: asFactory("PositionMenu"),
                FloatMenu: asFactory("FloatMenu"),
            },
            Simples: {Button: asFactory("Button")},
            Contents: {Border: asFactory("Border")},
        },
    };
});

Object.assign(categories, {
    InputListSelector: ComponentInputListSelector,
    PositionMenu: ComponentPositionMenu,
    FloatMenu: ComponentFloatMenu,
    Button: ComponentButton,
    Border: ComponentBorder,
});

const mounted: ComponentTable[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.innerHTML = "";
    vi.restoreAllMocks();
});

describe("ComponentTable column selector workflow", () => {
    it("keeps the portalled column menu open and its child workflow stable across clicks", async () => {
        const openSelector = vi.spyOn(ComponentInputListSelector.prototype as any, "fn_onClickIcon");
        const table = new ComponentTable({
            prop_header: [{id: "name", content: "Name"}, {id: "email", content: "Email"}],
            prop_order: ["name", "email"],
            prop_data: [{name: "Ava", email: "ava@example.com"}],
            prop_hasColSelector: true,
        } as any);
        mounted.push(table);

        const root = table.getElement() as HTMLElement;
        document.body.appendChild(root);
        const selector = [...(table as any)._workflowChildComponents.values()]
            .map((entry: any) => entry.component)
            .find((component: unknown) => component instanceof ComponentInputListSelector);
        const positionMenu = [...(selector as any)._workflowChildComponents.values()]
            .map((entry: any) => entry.component)
            .find((component: unknown) => component instanceof ComponentPositionMenu);
        const selectorIcon = root.querySelector<HTMLElement>("component-input-list-selector component-icon i");

        expect(positionMenu).toBeDefined();
        expect(selectorIcon).not.toBeNull();
        const iconSlot = root.querySelector<HTMLElement>('[data-part-name="part-main-form-float-menu"]');
        expect(iconSlot?.style.flexShrink).toBe("0");
        const menuElement = positionMenu.getElement() as HTMLElement;
        const iconSize = UtilStyle.Css_IconSize(CoreConfig.Settings.SizeName.observable().get());
        expect(menuElement.style.width).toBe(iconSize);
        expect(menuElement.style.height).toBe(iconSize);
        expect((positionMenu as any)._FLOAT_MENU_RUNTIME).toBeNull();
        expect((positionMenu as any)._FLOAT_MENU_INSTANCE).toBeNull();
        selectorIcon!.click();

        for (let attempt = 0; attempt < 100 && !((positionMenu as any)._FLOAT_MENU_INSTANCE?._IS_SHOW); attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(true);

        const floatMenu = (positionMenu as any)._FLOAT_MENU_INSTANCE as ComponentFloatMenu;
        expect(floatMenu.get("prop_floatUsePortal")).toBe(true);
        await new Promise((resolve) => setTimeout(resolve, 50));
        // jsdom does not consistently flush nested animation frames; invoke the
        // same positioning pass directly after the click has opened the menu.
        (floatMenu as any).adjustPopupToViewport();
        const popup = (floatMenu as any)._PORTALLED_POPUP as HTMLElement | null;
        expect(popup).not.toBeNull();
        expect(popup!.parentElement).toBe(document.body);
        expect(popup!.style.overflowY).toBe("visible");
        expect(popup!.querySelector("[data-float-menu-scroll-content]")).not.toBeNull();
        const scrollRegion = popup!.querySelector<HTMLElement>("[data-float-menu-scroll-region]")!;
        const buttons = popup!.querySelector<HTMLElement>('[data-part-name="part-formFloatMenu-body-buttons"]')!;
        expect(scrollRegion.style.overflowY).toBe("auto");
        expect(scrollRegion.contains(buttons)).toBe(false);
        vi.spyOn(popup!, "getBoundingClientRect").mockReturnValue({height: 400} as DOMRect);
        vi.spyOn(scrollRegion, "getBoundingClientRect").mockReturnValue({height: 300} as DOMRect);
        (floatMenu as any).constrainPortalContentHeight(popup, 250);
        expect(scrollRegion.style.maxHeight).toBe("150px");
        expect(popup!.querySelector<HTMLElement>("[data-float-menu-scroll-content]")!.style.overflowY).toBe("visible");

        popup!.dispatchEvent(new MouseEvent("click", {bubbles: true}));
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(true);
        selectorIcon!.click();
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(false);
        selectorIcon!.click();
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(true);
        expect(openSelector).toHaveBeenCalled();

        const cancel = popup!.querySelector<HTMLButtonElement>('button[type="button"]');
        const confirm = popup!.querySelector<HTMLButtonElement>('button[type="submit"]');
        expect(cancel).not.toBeNull();
        expect(confirm).not.toBeNull();
        cancel!.click();
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(false);
        expect(floatMenu.get("prop_floatIsShow")).toBe(false);

        selectorIcon!.click();
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(true);
        confirm!.click();
        expect((positionMenu as any).get("prop_menuIsOpen")).toBe(false);
        expect(floatMenu.get("prop_floatIsShow")).toBe(false);
    });
});
