// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {ComponentTableResponsible} from "../../src/framework/module_ui/module_components/lists/componentTableResponsible/ComponentTableResponsible";
import {TableResponsibleViewMode} from "../../src/framework/module_ui/module_components/lists/componentTableResponsible/Props";

vi.mock("@/ui_categories", () => ({UI: {}, Icons: {}}));

const mounted: ComponentTableResponsible[] = [];

afterEach(() => {
    mounted.splice(0).forEach((component) => component.dispose());
    document.body.innerHTML = "";
});

describe("ComponentTableResponsible", () => {
    it("renders every mobile record through ComponentCardRowInfo and composes named row workflows", () => {
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.CARDS,
            prop_header: [
                {id: "name", content: "Name", inCards: true},
                {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
                {id: "hidden", content: "Hidden", inCards: false},
            ],
            prop_order: ["name", "email", "hidden"],
            prop_data: [
                {id: "p-1", name: "Ava", email: "ava@example.com", hidden: "table only"},
                {id: "p-2", name: "Noah", email: "noah@example.com", hidden: "also table only"},
            ],
            prop_rowKey: "id",
        } as any);
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.textContent).toContain("Ava");
        expect(root.textContent).toContain("noah@example.com");
        expect(root.textContent).not.toContain("table only");
        const cardWorkflow = CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .find(([name]) => name === "cards")?.[1];
        expect(cardWorkflow).toBeDefined();
        expect(CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(cardWorkflow!)
            .map(([name]) => name)).toEqual(["row-p-1", "row-p-2"]);

        component.set("prop_data", [{id: "p-3", name: "Mia", email: "mia@example.com"}] as any);
        expect(root.textContent).toContain("Mia");
        expect(root.textContent).not.toContain("Ava");
        expect(CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(cardWorkflow!)
            .map(([name]) => name)).toEqual(["row-p-3"]);
    });

    it("renders the forced table view independently of viewport width", () => {
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.TABLE,
            prop_doColSelector: false,
            prop_header: [{id: "name", content: "Name"}, {id: "score", content: "Score"}],
            prop_order: ["name", "score"],
            prop_data: [{name: "Mia", score: 7}],
        } as any);
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.textContent).toContain("Mia");
        expect(root.textContent).toContain("7");
        expect(root.querySelector("table")).not.toBeNull();
        const childNames = CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name);
        expect(childNames).toContain("table");
        expect(childNames).not.toContain("cards");
    });

    it("passes the selected record and configured value to a mobile row-action callback", () => {
        const onAction = vi.fn();
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.CARDS,
            prop_header: [{id: "name", content: "Name", inCards: true}],
            prop_data: [{id: "row-42", name: "Taylor", email: "taylor@example.com"}],
            prop_rowKey: "id",
            prop_rowOptions: [{id: "email", title: "Send email", action: "send-email", valueKey: "email"}],
        } as any, {CLICK_ROW_OPTION: onAction});
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        const border = root.querySelector<HTMLElement>('[data-part-name="part-card-row-info"] [data-part-name="part-border"]');
        const size = CoreConfig.Settings.SizeName.observable().get();
        expect(border?.style.paddingTop).toBe(UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Margin(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Margin(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ));
        const actionButton = [...root.querySelectorAll<HTMLButtonElement>("button")]
            .find((button) => button.title === "Send email");
        expect(actionButton).toBeDefined();
        actionButton?.click();

        expect(onAction).toHaveBeenCalledTimes(1);
        expect(onAction.mock.calls[0]?.[1]).toMatchObject({
            rowIndex: 0,
            row: {id: "row-42", email: "taylor@example.com"},
            option: {id: "email", action: "send-email", valueKey: "email"},
            value: "taylor@example.com",
        });
    });

    it("forwards desktop row actions with the unwrapped value from the selected record", () => {
        const onAction = vi.fn();
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.TABLE,
            prop_doColSelector: false,
            prop_header: [{id: "email", content: "Email"}],
            prop_data: [{id: "row-9", email: {content: "casey@example.com"}}],
            prop_rowOptions: [{id: "email", title: "Send email", action: "send-email", valueKey: "email"}],
        } as any, {CLICK_ROW_OPTION: onAction});
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        root.querySelector<HTMLElement>('[title="Send email"]')?.click();

        expect(onAction).toHaveBeenCalledTimes(1);
        expect(onAction.mock.calls[0]?.[1]).toMatchObject({
            rowIndex: 0,
            row: {id: "row-9", email: {content: "casey@example.com"}},
            option: {action: "send-email", valueKey: "email"},
            value: "casey@example.com",
        });
    });

    it("switches AUTO presentation at the configured breakpoint and removes the inactive workflow child", () => {
        window.innerWidth = 600;
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.AUTO,
            prop_mobileBreakpoint: 700,
            prop_doColSelector: false,
            prop_header: [{id: "name", content: "Name", inCards: true}],
            prop_data: [{id: "one", name: "Responsive row"}],
            prop_rowKey: "id",
        } as any);
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.querySelector("table")).toBeNull();
        expect(CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name)).toContain("cards");

        window.innerWidth = 900;
        window.dispatchEvent(new Event("resize"));
        expect(root.querySelector("table")).not.toBeNull();
        const childNames = CoreComponents.Tools.Workflow.Get_ComponentWorkflowChildren(component.getComponentWorkflow())
            .map(([name]) => name);
        expect(childNames).toContain("table");
        expect(childNames).not.toContain("cards");
    });

    it("switches between table and card views repeatedly when rows contain icons and actions", () => {
        window.innerWidth = 900;
        const component = new ComponentTableResponsible({
            prop_viewMode: TableResponsibleViewMode.AUTO,
            prop_mobileBreakpoint: 700,
            prop_doColSelector: false,
            prop_header: [
                {id: "name", content: "Name", inCards: true},
                {id: "email", content: "Email", icon: UiIcons.Src.UserEmail1.Definition, inCards: true},
            ],
            prop_data: [
                {id: "one", name: "Responsive row", email: "row@example.com", accountId: "AC-001"},
                {id: "two", name: "Second row", email: "second@example.com", accountId: "AC-002"},
            ],
            prop_rowKey: "id",
            prop_rowOptions: [
                {id: "open", title: "Open account", action: "open-account", valueKey: "accountId", icon: UiIcons.Src.FilesEdit.Definition},
                {id: "email", title: "Send email", action: "send-email", valueKey: "email", icon: UiIcons.Src.UserEmail1.Definition},
            ],
        } as any);
        mounted.push(component);
        const root = component.getElement();
        document.body.appendChild(root);

        expect(root.querySelector("table")).not.toBeNull();
        window.innerWidth = 600;
        window.dispatchEvent(new Event("resize"));
        expect(root.querySelector("table")).toBeNull();
        expect(root.textContent).toContain("row@example.com");
        expect(root.textContent).toContain("second@example.com");

        window.innerWidth = 900;
        window.dispatchEvent(new Event("resize"));
        expect(root.querySelector("table")).not.toBeNull();
        window.innerWidth = 600;
        expect(() => window.dispatchEvent(new Event("resize"))).not.toThrow();
        expect(root.querySelector("table")).toBeNull();
    });
});
