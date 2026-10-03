// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";
import {ClWorkflowPage} from "../../src/framework/module_ui/module_pages/pages/workflow/ClWorkflowPage";

describe("ComponentWorkflow", () => {
    it("renders only a mouse scroller and forwards reactive canvas props", () => {
        const workflow = UiCategory.UI.Contents.Workflow({prop_content: "Canvas", prop_zoom: 1.5});
        const root = workflow.getElement() as HTMLElement;

        expect(root.tagName.toLowerCase()).toBe("component-workflow");
        expect(root.querySelectorAll("component-mouse-scroller")).toHaveLength(1);
        expect(root.querySelector('[data-part-name="part-mouse-scroller"]')).not.toBeNull();
        expect(root.textContent).toContain("Canvas");
        expect(root.style.width).toBe("calc(100vw - 100px)");
        expect(root.style.height).toBe("calc(100dvh - 100px)");
        expect(root.style.margin).toBe("auto");

        workflow.set("prop_content", "Updated canvas");
        expect(root.textContent).toContain("Updated canvas");
        workflow.dispose();
        workflow.dispose();
    });

    it("keeps scroller state isolated between workflow instances", () => {
        const first = UiCategory.UI.Contents.Workflow();
        const second = UiCategory.UI.Contents.Workflow();
        first.set("prop_zoom", 2);
        expect(second.get("prop_zoom")).toBe(1);
        first.dispose();
        second.dispose();
    });

    it("enables all workflow sidebars by default and allows disabling them", () => {
        const workflow = UiCategory.UI.Contents.Workflow();
        expect(workflow.get("prop_sideBarHas")).toBe(true);
        expect(workflow.get("prop_sideBarTopHas")).toBe(true);
        expect(workflow.get("prop_sideBarBottomHas")).toBe(true);
        expect(workflow.getElement().querySelectorAll("component-sidebar")).toHaveLength(3);
        workflow.dispose();

        const disabled = UiCategory.UI.Contents.Workflow({
            prop_sideBarHas: false,
            prop_sideBarTopHas: false,
            prop_sideBarBottomHas: false,
        });
        expect(disabled.get("prop_sideBarHas")).toBe(false);
        expect(disabled.get("prop_sideBarTopHas")).toBe(false);
        expect(disabled.get("prop_sideBarBottomHas")).toBe(false);
        disabled.dispose();
    });

    it("displays componentWorkflow on the workflow page", () => {
        const page = new ClWorkflowPage().render();
        expect(page.querySelectorAll("component-workflow")).toHaveLength(1);
        expect(page.querySelectorAll("component-mouse-scroller")).toHaveLength(1);
    });
});
