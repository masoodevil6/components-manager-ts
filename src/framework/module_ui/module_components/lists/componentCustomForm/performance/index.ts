import {ComponentCustomForm} from "../ComponentCustomForm";
import {CustomFormFieldType, CustomFormMode, type CustomFormGroup} from "../Props";
import type {ComponentScenario} from "../../../../../module_performance/core/ComponentScenario";

const sizes = [
    {value: 5, title: "Small (5 fields)"},
    {value: 10, title: "Medium (10 fields)"},
    {value: 20, title: "Large (20 fields)"},
] as const;

const createGroups = (fieldCount: number): CustomFormGroup[] => {
    const fieldsPerGroup = 5;
    const groups: CustomFormGroup[] = [];
    for (let start = 0; start < fieldCount; start += fieldsPerGroup) {
        const groupId = `group-${groups.length + 1}`;
        const fields = Array.from({length: Math.min(fieldsPerGroup, fieldCount - start)}, (_, index) => {
            const number = start + index + 1;
            return {
                id: `field-${number}`,
                name: `field${number}`,
                label: `Field ${number}`,
                type: CustomFormFieldType.INPUT,
                value: `Value ${number}`,
                placeholder: `Enter value ${number}`,
            };
        });
        groups.push({id: groupId, title: `Group ${groups.length + 1}`, columns: 2, fields});
    }
    return groups;
};

type Operation = "none" | "input-change" | "edit-to-run";

const createScenario = (id: string, title: string, mode: CustomFormMode, operation: Operation): ComponentScenario => ({
    id,
    componentId: "component_custom_form",
    title,
    sizeLabel: "fields",
    sizes,
    ...(operation === "input-change" ? {operationTitle: "Input change", operationDetail: "Dispatch one input event through the field component."} : {}),
    ...(operation === "edit-to-run" ? {operationTitle: "Edit → Run", operationDetail: "Rebuild the form after changing from editor mode to run mode."} : {}),
    inputNodesLabel: "Configured fields",
    visibleNodesLabel: "Rendered form controls",
    limitsDescription: "No component truncation limit",
    prepare(size) {
        if (!Number.isInteger(size) || !sizes.some((item) => item.value === size)) throw new Error("Choose 5, 10, or 20 form fields.");
        const groups = createGroups(size);
        const expectedMode = operation === "edit-to-run" ? CustomFormMode.RUN : mode;
        return {
            inputNodes: size,
            maxNodes: null,
            maxDepth: null,
            create() {
                let valueChanges = 0;
                const form = new ComponentCustomForm({
                    prop_customFormMode: mode,
                    prop_customFormGroups: groups,
                    prop_customFormFormOptions: {prop_runFetch: false},
                } as any, {
                    VALUE_CHANGE: () => { valueChanges++; },
                } as any);
                const element = form.getElement();
                return {
                    element,
                    run() {
                        if (operation === "input-change") {
                            const controls = element.querySelectorAll<HTMLInputElement>("input:not([type='hidden'])");
                            const input = controls[controls.length - 1];
                            if (!input) throw new Error("The form has no editable input.");
                            input.value = "Updated value";
                            input.dispatchEvent(new Event("input", {bubbles: true}));
                        } else if (operation === "edit-to-run") {
                            form.set("prop_customFormMode", CustomFormMode.RUN);
                        }
                    },
                    async waitForReady() {
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
                    },
                    validate() {
                        const controls = element.querySelectorAll("input:not([type='hidden'])");
                        if (controls.length < size) throw new Error(`Expected at least ${size} form controls, found ${controls.length}.`);
                        if (operation === "input-change" && valueChanges < 1) throw new Error("The input change did not reach the CustomForm callback.");
                        if (operation === "edit-to-run" && element.querySelector('[data-mode="EDIT"]')) throw new Error("The form remained in edit mode.");
                        if (expectedMode === CustomFormMode.RUN && !element.querySelector("form")) throw new Error("The run-mode form was not rendered.");
                    },
                    countVisibleNodes() { return element.querySelectorAll("input:not([type='hidden']), textarea, select").length; },
                    dispose() { form.dispose(); },
                };
            },
        };
    },
});

export const customFormPerformanceScenarios: ComponentScenario[] = [
    createScenario("custom-form-edit-render", "Edit mode · initial render", CustomFormMode.EDIT, "none"),
    createScenario("custom-form-run-render", "Run mode · initial render", CustomFormMode.RUN, "none"),
    createScenario("custom-form-input-change", "Run mode · edit one field", CustomFormMode.RUN, "input-change"),
    createScenario("custom-form-edit-to-run", "Edit mode · switch to run", CustomFormMode.EDIT, "edit-to-run"),
];
