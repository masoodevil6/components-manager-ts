// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {ComponentCardRowInfo} from "../../src/framework/module_ui/module_components/lists/componentCardRowInfo/ComponentCardRowInfo";

vi.mock("@/ui_categories", () => ({
    CreateCategoryComponent: () => () => null,
    CreateCategoryIcon: () => () => null,
    UI: {},
    Icons: {},
}));

const mounted: ComponentCardRowInfo[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.innerHTML = "";
});

describe("ComponentCardRowInfo", () => {
    it("renders ComponentMenuMore entries and forwards the selected item", async () => {
        const selectOption = vi.fn();
        const component = new ComponentCardRowInfo({
            prop_rows: [
                {id: "card-content", icon: UiIcons.Src.SymbolExclumationSquare.Definition, content: "Card content"},
            ],
            prop_options: [
                {id: "edit", title: "Edit", icon: UiIcons.Src.FilesEdit.Definition, action: "edit"},
            ],
        }, {SELECT_OPTION: selectOption});
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);
        await vi.waitFor(() => {
            expect((component as any)._MENU_MORE_RUNTIME).not.toBeNull();
        });
        await vi.waitFor(() => {
            expect(root.querySelector('[data-part-name="part-menu-more"]')).not.toBeNull();
        });

        expect(root.textContent).toContain("Card content");
        expect(root.querySelector('[data-part-name="part-card-row-info-rows-item"][data-row-id="card-content"]'))
            .not.toBeNull();
        const menuRoot = root.querySelector<HTMLElement>('[data-part-name="part-menu-more"]');
        expect(menuRoot).not.toBeNull();
        const menuComponent = menuRoot?.closest<HTMLElement>('[data-part-name="part-component"]');
        const menuWrapper = root.querySelector<HTMLElement>('[data-part-name="part-card-row-info-menu-wrapper"]');
        const sizeName = CoreConfig.Settings.SizeName.observable().get();
        expect(menuWrapper?.style.opacity).toBe("0.45");
        expect(menuWrapper?.style.margin).toBe(UtilStyle.Css_Margin(sizeName));
        expect(menuWrapper?.style.borderRadius).toBe(UtilStyle.Css_BorderRadius(sizeName));
        expect(menuWrapper?.style.width).toBe("fit-content");
        expect(menuComponent?.style.width).toBe("fit-content");
        expect(menuRoot?.querySelector<HTMLElement>('[data-part-name="part-border"]')?.style.borderTopLeftRadius)
            .toBe(UtilStyle.Css_BorderRadius(sizeName));
        const cardBorder = root.querySelector<HTMLElement>('[data-part-name="part-border"]');
        const cardMargin = UtilStyle.Css_Margin(sizeName);
        expect(cardBorder?.style.margin).toBe(cardMargin);
        expect(cardBorder?.style.width).toBe(UtilStyle.Css_SizeCalc(
            "100%" as any,
            UtilConst.Operation.MINUS,
            cardMargin as any,
            UtilConst.Operation.MINUS,
            cardMargin as any,
        ));
        root.querySelector('[data-part-name="part-card-row-info"]')
            ?.dispatchEvent(new MouseEvent("mouseenter"));
        expect(menuWrapper?.style.opacity).toBe("1");
        const editItem = [...root.querySelectorAll<HTMLButtonElement>("button")]
            .find((button) => button.textContent?.trim() === "Edit");
        expect(editItem).toBeDefined();
        editItem?.click();
        expect(selectOption).toHaveBeenCalledTimes(1);
        expect(selectOption.mock.calls[0]?.[1]?.ITEM).toMatchObject({id: "edit", action: "edit"});
    });

    it("renders rows vertically with icon and text slots", () => {
        const component = new ComponentCardRowInfo({
            prop_rows: [
                {id: "first", icon: UiIcons.Src.UserEmail1.Definition, content: "First row"},
                {id: 2, icon: UiIcons.Src.FileApplication.Definition, content: "Second row"},
            ],
        });
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        const rows = root.querySelector<HTMLElement>('[data-part-name="part-card-row-info-rows"]');
        expect(rows?.style.flexDirection).toBe("column");
        const sizeName = CoreConfig.Settings.SizeName.observable().get();
        const rowsMargin = UtilStyle.Css_Margin(sizeName);
        expect(rows?.style.margin).toBe(rowsMargin);
        expect(rows?.style.width).toBe(UtilStyle.Css_SizeCalc(
            "100%" as any,
            UtilConst.Operation.MINUS,
            rowsMargin as any,
            UtilConst.Operation.MINUS,
            rowsMargin as any,
        ));
        const rowItems = rows?.querySelectorAll<HTMLElement>('[data-part-name="part-card-row-info-rows-item"]');
        expect(rowItems?.length).toBe(2);
        rowItems?.forEach((row, index) => {
            expect(row.style.paddingBottom).toBe(UtilStyle.Css_Padding(sizeName));
            if (index === rowItems.length - 1) {
                expect(row.style.borderBottomStyle).not.toBe("solid");
            } else {
                expect(row.style.borderBottomColor).toBe(UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5));
                expect(row.style.borderBottomWidth).toBe(UtilStyle.Css_BorderWidth(sizeName));
                expect(row.style.borderBottomStyle).toBe("solid");
            }
        });
        expect(rows?.querySelector('[data-row-id="first"] svg')).not.toBeNull();
        expect(rows?.querySelector('[data-row-id="2"] [data-part-name="part-card-row-info-row-content"]')?.textContent)
            .toBe("Second row");

        component.set("prop_rows", [
            {id: "updated", icon: UiIcons.Src.FileApplication.Definition, content: "Updated row"},
        ]);
        expect(rows?.querySelectorAll('[data-part-name="part-card-row-info-rows-item"]').length).toBe(1);
        const updatedRow = rows?.querySelector<HTMLElement>('[data-row-id="updated"]');
        expect(updatedRow?.style.borderBottomStyle).not.toBe("solid");
        expect(rows?.querySelector('[data-row-id="updated"] [data-part-name="part-card-row-info-row-content"]')?.textContent)
            .toBe("Updated row");
    });

    it("keeps icon and title columns aligned and updates the title width", () => {
        const component = new ComponentCardRowInfo({
            prop_titleWidth: "9rem",
            prop_rows: [{id: "no-icon", title: "Email", content: "hello@example.com"}],
        });
        mounted.push(component);
        const row = component.getElement().querySelector<HTMLElement>('[data-row-id="no-icon"]')!;
        const icon = row.querySelector<HTMLElement>('[data-part-name="part-card-row-info-row-icon"]')!;
        const title = row.querySelector<HTMLElement>('[data-part-name="part-card-row-info-row-title"]')!;
        const content = row.querySelector<HTMLElement>('[data-part-name="part-card-row-info-row-content"]')!;
        const size = CoreConfig.Settings.SizeName.observable().get();
        expect([...row.children]).toEqual([icon, title, content]);
        expect(icon.style.width).toBe(UtilStyle.Css_IconSize(size));
        expect(icon.style.height).toBe(UtilStyle.Css_IconSize(size));
        expect(icon.style.marginInlineEnd).toBe(UtilStyle.Css_Margin(size));
        expect(icon.querySelector("svg")).toBeNull();
        expect(title.tagName).toBe("B");
        expect(title.textContent).toBe("Email");
        expect(title.style.width).toBe("9rem");
        expect(title.style.marginInlineEnd).toBe(UtilStyle.Css_Margin(size));
        expect(title.style.lineHeight).toBe(UtilStyle.Css_Height(size));
        expect(content.tagName).toBe("SPAN");
        expect(content.style.flexGrow).toBe("1");
        expect(content.style.lineHeight).toBe(UtilStyle.Css_Height(size));
        component.set("prop_titleWidth", "10rem");
        expect(title.style.width).toBe("10rem");
    });

    it("omits the menu when options are empty", () => {
        const component = new ComponentCardRowInfo({
            prop_rows: [{id: "empty-menu", icon: UiIcons.Src.FileApplication.Definition, content: "No actions"}],
        });
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.textContent).toContain("No actions");
        expect(root.querySelector('[data-part-name="part-menu-more"]')).toBeNull();
        expect((component as any)._MENU_MORE_RUNTIME_PROMISE).toBeNull();
        expect((component as any)._MENU_MORE_RUNTIME).toBeNull();
        const childNames = CoreComponents.Tools.Workflow
            .Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name);
        expect(childNames).not.toContain("optionsMenu");
    });

    it("adds and removes the menu when options change", async () => {
        const component = new ComponentCardRowInfo({
            prop_rows: [{id: "dynamic", icon: UiIcons.Src.FileApplication.Definition, content: "Dynamic actions"}],
        });
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.querySelector('[data-part-name="part-menu-more"]')).toBeNull();
        component.set("prop_options", [{id: "edit", title: "Edit", action: "edit"}]);
        await vi.waitFor(() => {
            expect((component as any)._MENU_MORE_RUNTIME).not.toBeNull();
        });
        await vi.waitFor(() => {
            expect(root.querySelector('[data-part-name="part-menu-more"]')).not.toBeNull();
        });
        expect(CoreComponents.Tools.Workflow
            .Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name)).toContain("optionsMenu");

        component.set("prop_options", []);
        expect(root.querySelector('[data-part-name="part-menu-more"]')).toBeNull();
        expect(CoreComponents.Tools.Workflow
            .Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name)).not.toContain("optionsMenu");
    });
});
