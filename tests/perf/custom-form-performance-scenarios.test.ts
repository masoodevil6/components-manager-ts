// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import {runComponentScenario} from "../../src/framework/module_performance/core/ComponentScenario";
import {ComponentCustomForm} from "../../src/framework/module_ui/module_components/lists/componentCustomForm/ComponentCustomForm";
import {CustomFormFieldType, CustomFormMode} from "../../src/framework/module_ui/module_components/lists/componentCustomForm/Props";
import {customFormPerformanceScenarios} from "../../src/framework/module_ui/module_components/lists/componentCustomForm/performance";

afterEach(() => {
    vi.restoreAllMocks();
    document.body.replaceChildren();
    document.getElementById("component-loading-styles")?.remove();
});

async function waitForEditControls(form: ComponentCustomForm): Promise<void> {
    const layoutCreatorRuntime = (form as any)._LAYOUT_CREATOR_RUNTIME_PROMISE as Promise<unknown> | null;
    if (layoutCreatorRuntime) await layoutCreatorRuntime;
    const layouts = ((form as any)._DYNAMIC_CHILDREN ?? [])
        .filter((child: any) => Array.isArray(child?._COLUMN_CREATORS));
    const creators = layouts.flatMap((layout: any) => [
        layout._MAIN_ELEMENT_CREATOR,
        ...(layout._COLUMN_CREATORS ?? []),
    ]).filter(Boolean);
    await Promise.all(creators
        .map((creator: any) => creator._EDIT_RUNTIME_PROMISE)
        .filter((promise: unknown): promise is Promise<unknown> => Boolean(promise)));
}

describe("CustomForm performance scenarios", () => {
    it("does not load editor layout support in run mode", () => {
        const loadLayoutCreatorRuntime = vi.spyOn(ComponentCustomForm.prototype as any, "loadLayoutCreatorRuntime");
        const form = new ComponentCustomForm({
            prop_customFormMode: CustomFormMode.RUN,
            prop_customFormGroups: [{
                id: "run-group",
                title: "Run group",
                fields: [{id: "name", name: "name", label: "Name", type: CustomFormFieldType.INPUT}],
            }],
        } as any);

        try {
            const element = form.getElement();
            expect(loadLayoutCreatorRuntime).not.toHaveBeenCalled();
            expect((form as any)._LAYOUT_CREATOR_RUNTIME_PROMISE).toBeNull();
            expect(element.querySelector('input[name="name"]')).not.toBeNull();
            expect(element.querySelector("[data-layout-creator-loading]")).toBeNull();
        } finally {
            form.dispose();
        }
    });

    it("loads optional field controls in run mode only when a form needs them", async () => {
        const loadFieldRuntime = vi.spyOn(ComponentCustomForm.prototype as any, "loadFieldRuntime");
        const form = new ComponentCustomForm({
            prop_customFormMode: CustomFormMode.RUN,
            prop_customFormGroups: [{
                id: "run-group",
                title: "Run group",
                fields: [{id: "about", name: "about", label: "About", type: CustomFormFieldType.TEXTAREA}],
            }],
        } as any);

        try {
            expect(loadFieldRuntime).toHaveBeenCalledOnce();
            await (form as any)._FIELD_RUNTIME_PROMISE;
            expect((form as any)._FIELD_RUNTIME).not.toBeNull();
            expect(form.getElement().querySelector("textarea")).not.toBeNull();
            expect(form.getElement().querySelector("[data-field-runtime-loading]")).toBeNull();
        } finally {
            form.dispose();
        }
    });

    it("loads the group-delete confirmation only when deletion is requested", async () => {
        const form = new ComponentCustomForm({
            prop_customFormMode: CustomFormMode.EDIT,
            prop_customFormGroups: [{id: "group", title: "Group", fields: []}],
        } as any);

        try {
            expect((form as any)._DELETE_CONFIRM).toBeNull();
            (form as any).confirmRemoveGroup("group", new Event("click"));
            const loading = (form as any)._DELETE_CONFIRM_LOADING as Promise<void>;
            expect(loading).toBeInstanceOf(Promise);
            await loading;
            expect((form as any)._DELETE_CONFIRM).not.toBeNull();
            expect((form as any)._DELETE_CONFIRM_ELEMENT).not.toBeNull();
        } finally {
            form.dispose();
        }
    });

    it("loads the group settings dialog only when it is requested", async () => {
        const form = new ComponentCustomForm({
            prop_customFormMode: CustomFormMode.EDIT,
            prop_customFormGroups: [],
        } as any);

        try {
            expect((form as any)._GROUP_SETTINGS_WINDOWS.size).toBe(0);
            (form as any).openGroupSettingsWindow(null, new Event("click"));
            expect((form as any)._GROUP_SETTINGS_WINDOW_LOADS.has("new-group")).toBe(true);

            for (let attempt = 0; attempt < 100 && (form as any)._GROUP_SETTINGS_WINDOW_LOADS.has("new-group"); attempt++) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }

            expect((form as any)._GROUP_SETTINGS_WINDOW_LOADS.has("new-group")).toBe(false);
            expect((form as any)._GROUP_SETTINGS_WINDOWS.has("new-group")).toBe(true);
            expect(document.body.childElementCount).toBeGreaterThan(0);
        } finally {
            form.dispose();
        }
    });

    it("creates edit controls from lightweight templates for each supported field type", async () => {
        const loadLayoutCreatorRuntime = vi.spyOn(ComponentCustomForm.prototype as any, "loadLayoutCreatorRuntime");
        const options = [{label: "First", value: "first"}, {label: "Second", value: "second"}];
        const form = new ComponentCustomForm({
            prop_customFormMode: CustomFormMode.EDIT,
            prop_customFormGroups: [{
                id: "mixed",
                title: "Mixed fields",
                fields: [
                    {id: "name", name: "name", label: "Name", type: CustomFormFieldType.INPUT},
                    {id: "about", name: "about", label: "About", type: CustomFormFieldType.TEXTAREA},
                    {id: "active", name: "active", label: "Active", type: CustomFormFieldType.CHECKBOX},
                    {id: "contact", name: "contact", label: "Contact", type: CustomFormFieldType.RADIO, options},
                    {id: "topic", name: "topic", label: "Topic", type: CustomFormFieldType.SELECT, options},
                ],
            }],
        } as any);
        const root = form.getElement();
        document.body.appendChild(root);
        await waitForEditControls(form);

        expect(loadLayoutCreatorRuntime).toHaveBeenCalled();
        expect((form as any)._LAYOUT_CREATOR_RUNTIME).not.toBeNull();
        const text = root.textContent ?? "";
        expect((root.querySelector('input[name="custom-form-group-title-mixed"]') as HTMLInputElement)?.value).toBe("Mixed fields");
        expect(text.includes("Name")).toBe(true);
        expect(text.includes("About")).toBe(true);
        expect(text.includes("Active")).toBe(true);
        expect(text.includes("First")).toBe(true);
        expect(text.includes("Second")).toBe(true);
        expect(root.querySelector("textarea")).not.toBeNull();
        form.dispose();
    });

    it.each(customFormPerformanceScenarios)("runs and cleans up $id", async (scenario) => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const progress: number[] = [];

        try {
            const result = await runComponentScenario(scenario, host, 5, 2, (done) => progress.push(done));
            expect(progress).toEqual([1, 2]);
            expect(result).toMatchObject({scenarioId: scenario.id, iterations: 2, inputNodes: 5, maxNodes: null, maxDepth: null, truncated: null});
            expect(result.visibleNodes).toBeGreaterThanOrEqual(5);
            expect(result.domElements).toBeGreaterThan(result.visibleNodes ?? 0);
            expect(result.createP95Ms).toBeGreaterThanOrEqual(result.createMedianMs);
            expect(document.querySelectorAll("#component-loading-styles")).toHaveLength(1);
            expect(host.childElementCount).toBe(0);
        } finally {
            host.remove();
        }
    });
});
