// @vitest-environment jsdom
import {describe, expect, it} from "vitest";
import * as CoreEvent from "@/core_event";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import {ClComponentBase} from "../../src/framework/module_core/module_components/basic/class/ClComponentBase";
import {
    Attach_Current_ComponentWorkflowChild,
    Attach_ComponentWorkflow,
    Capture_ComponentWorkflowComposition,
    Detach_ComponentWorkflow,
    Get_ComponentWorkflowChildren,
    Get_ComponentWorkflowMetadata,
    Set_ComponentWorkflowMetadata,
    Subscribe_ComponentWorkflow,
    With_ComponentWorkflowComposition,
} from "../../src/framework/module_core/module_components/tools/workflow/ComponentWorkflowComposition";

class WorkflowRenderTestComponent extends ClComponentBase<any, any, any, any> {
    protected _COMPONENT_PATTERN = {
        prop_workflowChildName: {prop: "prop_workflowChildName", default: null},
    } as any;
    protected _COMPONENT_SCHEMA = {
        ROOT: {part: "root", props: []},
    } as any;
    protected _COMPONENT_METHODS = {} as any;
    protected _COMPONENT_TEMPLATES = {} as any;
    protected _COMPONENT_DEFINITION = {name: "workflowRenderTest", id: "workflow_render_test"};

    constructor(name: string, childName: string | null = null, private children: any[] = []) {
        super(name, null);
        this.renderComponent({prop_workflowChildName: childName}, {} as any);
    }

    override connectedCallback(): void {}

    override renderManagerComponent(): CoreReactive.App {
        return CoreReactive.App.div({children: this.children});
    }
}

describe("component workflow composition", () => {
    it("composes component workflows and dispatches from a named child to its closest parent node", () => {
        const page = CoreEvent.Step({});
        const layout = CoreEvent.Step({children: {showPopup: CoreEvent.Step({})}});
        const secondaryInput = CoreEvent.Step({children: {inputChange: CoreEvent.Step({})}});

        Attach_ComponentWorkflow(page, "layout", layout, {
            component: {name: "componentLayout", id: "component_layout"},
        });
        Attach_ComponentWorkflow(layout, "secondaryInput", secondaryInput, {
            component: {name: "componentInput", id: "component_input"},
        });

        expect(Get_ComponentWorkflowChildren(page).map(([name]) => name)).toEqual(["layout"]);
        const matches = CoreEvent.findWorkflowNodes(
            "secondaryInput",
            "layout",
            page,
        );
        expect(matches).toHaveLength(1);
        expect(matches[0].node.identity).toBe(layout.identity);

        const target = CoreEvent.getChild(matches[0].node, "showPopup");
        expect(target).not.toBeNull();
        let received = "";
        CoreEvent.App.registerEmit(target!, (request) => {
            received = String(request.payload.message);
            return {message: received};
        });

        const source = CoreEvent.getChild(secondaryInput, "inputChange")!;
        const response = CoreEvent.App.request(
            CoreEvent.requestMap([[target!, {message: "hello from input"}]]),
            source,
        ).get(target!);

        expect(received).toBe("hello from input");
        expect(response?.value).toEqual({message: "hello from input"});
        expect(response?.source?.identity).toBe(source.identity);

        const detached = Detach_ComponentWorkflow(layout, "secondaryInput", secondaryInput);
        expect(detached?.identity).toBe(secondaryInput.identity);
        expect(CoreEvent.findWorkflowNodes("layout", "layout", page)).toHaveLength(1);
        CoreEvent.dispose(page);
    });

    it("finds a target from a concrete source node and returns the owning workflow root", () => {
        const page = CoreEvent.Step({children: {setting: CoreEvent.Step({})}});
        const header = CoreEvent.Step({});
        Attach_ComponentWorkflow(page, "header", header);

        const [match] = CoreEvent.findWorkflowNodes(header, "setting");

        expect(match?.node.identity).toBe(CoreEvent.getChild(page, "setting")?.identity);
        expect(match?.root.identity).toBe(page.identity);
        CoreEvent.dispose(page);
    });

    it("allows callers to skip a closer component node that shares an event-step name", () => {
        const page = CoreEvent.Step({children: {setting: CoreEvent.Step({})}});
        const pageSettingComponent = CoreEvent.Step({});
        const header = CoreEvent.Step({});
        Attach_ComponentWorkflow(page, "setting", pageSettingComponent, {
            component: {name: "componentPageSetting", id: "component_page_setting"},
        });
        Attach_ComponentWorkflow(page, "header", header, {
            component: {name: "componentPageHeader", id: "component_page_header"},
        });

        const matches = CoreEvent.findWorkflowNodes(header, "setting");
        const eventMatch = matches.find(({node}) => Get_ComponentWorkflowMetadata(node)?.kind !== "component");

        expect(matches[0].node.identity).toBe(pageSettingComponent.identity);
        expect(eventMatch?.node.identity).toBe(CoreEvent.getChild(page, "setting")?.identity);
        CoreEvent.dispose(page);
    });

    it("automatically attaches a named child requested during its parent's render", () => {
        const parent = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        const childComponent = {
            get: (propName: string) => propName === "prop_workflowChildName" ? "primaryInput" : null,
            getComponentWorkflow: () => child,
        };

        With_ComponentWorkflowComposition((renderedChild, childName) => {
            const workflow = (renderedChild as typeof childComponent).getComponentWorkflow();
            Attach_ComponentWorkflow(parent, childName, workflow, {
                component: {name: "componentInput", id: "component_input"},
            });
        }, () => {
            expect(Attach_Current_ComponentWorkflowChild(childComponent)).toBe(true);
        });

        expect(Get_ComponentWorkflowChildren(parent).map(([name]) => name)).toEqual(["primaryInput"]);
        expect(Get_ComponentWorkflowChildren(parent)[0][1].identity).toBe(child.identity);
        CoreEvent.dispose(parent);
    });

    it("moves a legacy child link from a parent event step into the component branch", () => {
        const parent = CoreEvent.Step({children: {click: CoreEvent.Step({})}});
        const parentClick = CoreEvent.getChild(parent, "click")!;
        const child = CoreEvent.Step({});

        // ComponentButtonBase and similar legacy constructors used this shape.
        CoreEvent.SubEvent(parentClick, "button", child);
        Attach_ComponentWorkflow(parent, "button", child, {
            component: {name: "componentButton", id: "component_button"},
        });

        expect(CoreEvent.getChild(parentClick, "button")).toBeNull();
        expect(Get_ComponentWorkflowChildren(parent).map(([name]) => name)).toEqual(["button"]);
        expect(Get_ComponentWorkflowChildren(parent)[0][1].identity).toBe(child.identity);
        CoreEvent.dispose(parent);
    });

    it("still rejects a child workflow owned by an unrelated parent", () => {
        const parent = CoreEvent.Step({});
        const unrelatedParent = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        CoreEvent.SubEvent(unrelatedParent, "child", child);

        expect(() => Attach_ComponentWorkflow(parent, "child", child)).toThrow(
            "This workflow is already attached to another parent.",
        );

        CoreEvent.dispose(parent);
        CoreEvent.dispose(unrelatedParent);
    });

    it("moves a DOM-discovered child from an ancestor component into its nested owner", () => {
        const layout = CoreEvent.Step({});
        const border = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        Attach_ComponentWorkflow(layout, "border", border);
        Attach_ComponentWorkflow(layout, "input", child);

        Attach_ComponentWorkflow(border, "input", child);

        expect(Get_ComponentWorkflowChildren(layout).map(([name]) => name)).toEqual(["border"]);
        expect(Get_ComponentWorkflowChildren(border).map(([name]) => name)).toEqual(["input"]);
        expect(Get_ComponentWorkflowChildren(border)[0][1].identity).toBe(child.identity);
        CoreEvent.dispose(layout);
    });

    it("moves a child during nested rendering before the nested owner is attached", () => {
        const layout = CoreEvent.Step({});
        const border = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        Set_ComponentWorkflowMetadata(layout, {kind: "component", component: {name: "componentLayout", id: "component_layout"}});
        Set_ComponentWorkflowMetadata(border, {kind: "component", component: {name: "componentBorder", id: "component_border"}});
        Attach_ComponentWorkflow(layout, "input", child);

        With_ComponentWorkflowComposition(() => {}, () => {
            With_ComponentWorkflowComposition(
                () => {},
                () => Attach_ComponentWorkflow(border, "input", child),
                border,
            );
        }, layout);

        expect(Get_ComponentWorkflowChildren(layout)).toHaveLength(0);
        expect(Get_ComponentWorkflowChildren(border).map(([name]) => name)).toEqual(["input"]);
        CoreEvent.dispose(layout);
        CoreEvent.dispose(border);
    });

    it("preserves the full nested owner chain for children rendered reactively later", () => {
        const parent = CoreEvent.Step({});
        const nested = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        Set_ComponentWorkflowMetadata(parent, {kind: "component", component: {name: "componentMenuMore", id: "component_menu_more"}});
        Set_ComponentWorkflowMetadata(nested, {kind: "component", component: {name: "componentBorder", id: "component_border"}});
        Attach_ComponentWorkflow(parent, "child", child);

        let captured: ReturnType<typeof Capture_ComponentWorkflowComposition> = null;
        With_ComponentWorkflowComposition(() => {}, () => {
            With_ComponentWorkflowComposition(() => {}, () => {
                captured = Capture_ComponentWorkflowComposition();
            }, nested);
        }, parent);

        expect(captured).toHaveLength(2);
        With_ComponentWorkflowComposition(captured!, () => {
            Attach_ComponentWorkflow(nested, "child", child);
        });

        expect(Get_ComponentWorkflowChildren(parent)).toHaveLength(0);
        expect(Get_ComponentWorkflowChildren(nested).map(([name]) => name)).toEqual(["child"]);
        CoreEvent.dispose(parent);
        CoreEvent.dispose(nested);
    });

    it("moves a legacy event-step child into a nested component owner", () => {
        const layout = CoreEvent.Step({});
        const border = CoreEvent.Step({});
        const click = CoreEvent.Step({});
        const child = CoreEvent.Step({});
        Attach_ComponentWorkflow(layout, "border", border);
        CoreEvent.SubEvent(layout, "click", click);
        CoreEvent.SubEvent(click, "button", child);
        const layoutDefinition = {name: "componentLayout", id: "component_layout"};
        const borderDefinition = {name: "componentBorder", id: "component_border"};
        Set_ComponentWorkflowMetadata(layout, {kind: "component", component: layoutDefinition});
        Set_ComponentWorkflowMetadata(border, {kind: "component", component: borderDefinition});

        Attach_ComponentWorkflow(border, "button", child);

        expect(CoreEvent.getChild(click, "button")).toBeNull();
        expect(Get_ComponentWorkflowChildren(border).map(([name]) => name)).toEqual(["button"]);
        CoreEvent.dispose(layout);
    });

    it("notifies workflow subscribers about descendant attachment and detachment", () => {
        const page = CoreEvent.Step({});
        const layout = CoreEvent.Step({});
        const input = CoreEvent.Step({});
        Attach_ComponentWorkflow(page, "layout", layout);

        let changes = 0;
        const unsubscribe = Subscribe_ComponentWorkflow(page, () => changes++);

        Attach_ComponentWorkflow(layout, "primaryInput", input);
        expect(changes).toBe(1);

        expect(Detach_ComponentWorkflow(layout, "primaryInput", input)?.identity).toBe(input.identity);
        expect(changes).toBe(2);

        unsubscribe();
        Attach_ComponentWorkflow(layout, "secondaryInput", CoreEvent.Step({}));
        expect(changes).toBe(2);

        CoreEvent.dispose(page);
    });

    it("passes unkeyed children to the parent so it can generate a stable name", () => {
        const child = CoreEvent.Step({});
        const childComponent = {
            get: () => null,
            getComponentWorkflow: () => child,
        };
        let attachedName: string | undefined = "not-called";

        expect(With_ComponentWorkflowComposition((_component, childName) => {
            attachedName = childName;
        }, () => Attach_Current_ComponentWorkflowChild(childComponent))).toBe(true);
        expect(attachedName).toBeUndefined();
        expect((child as CoreEvent.ClStep).getParent()).toBeNull();
        CoreEvent.dispose(child);
    });

    it("automatically names same-type children composed through CoreReactive", () => {
        const firstChild = new WorkflowRenderTestComponent("input");
        const secondChild = new WorkflowRenderTestComponent("input");
        const parent = new WorkflowRenderTestComponent("layout", null, [firstChild, secondChild]);

        const children = Get_ComponentWorkflowChildren(parent.getComponentWorkflow());
        expect(children.map(([name]) => name)).toEqual(["workflowRenderTest", "workflowRenderTest2"]);
        expect(children.map(([, workflow]) => workflow.identity)).toEqual([
            firstChild.getComponentWorkflow().identity,
            secondChild.getComponentWorkflow().identity,
        ]);

        parent.getScope().dispose();
        firstChild.getScope().dispose();
        secondChild.getScope().dispose();
    });

    it("recovers workflow children from components already rendered inside a DOM wrapper", () => {
        const child = new WorkflowRenderTestComponent("input");
        const wrapper = CoreReactive.App.div({children: [child.getElement()]});
        const parent = new WorkflowRenderTestComponent("layout", null, [wrapper]);

        expect(Get_ComponentWorkflowChildren(parent.getComponentWorkflow()).map(([name]) => name))
            .toEqual(["workflowRenderTest"]);

        parent.getScope().dispose();
        child.getScope().dispose();
    });

    it("does not move a DOM-discovered component from an unrelated composition", () => {
        const child = new WorkflowRenderTestComponent("input");
        const originalParent = new WorkflowRenderTestComponent("layout", null, [child]);
        const wrapper = CoreReactive.App.div({children: [child.getElement()]});
        expect(() => new WorkflowRenderTestComponent("border", null, [wrapper])).toThrow(
            "This workflow is already attached to another parent.",
        );

        expect(Get_ComponentWorkflowChildren(originalParent.getComponentWorkflow()).map(([name]) => name))
            .toEqual(["workflowRenderTest"]);

        originalParent.getScope().dispose();
        child.getScope().dispose();
    });

    it("attaches a component inserted later through a reactive child", () => {
        const child = new WorkflowRenderTestComponent("input");
        const slot = new CoreObservable.App<any>(null);
        const parent = new WorkflowRenderTestComponent("layout", null, [slot]);

        expect(Get_ComponentWorkflowChildren(parent.getComponentWorkflow())).toHaveLength(0);
        slot.set(child);

        const children = Get_ComponentWorkflowChildren(parent.getComponentWorkflow());
        expect(children.map(([name]) => name)).toEqual(["workflowRenderTest"]);
        expect(children[0][1].identity).toBe(child.getComponentWorkflow().identity);

        parent.getScope().dispose();
        child.getScope().dispose();
    });
});
