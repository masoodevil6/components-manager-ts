import * as ComponentInput from "../../componentInput/runtime";
import {ComponentElementCreator} from "../ComponentElementCreator";
import {ElementCreatorMode} from "../Props";
import type {ComponentScenario} from "../../../../../module_performance/core/ComponentScenario";

const sizes = [
    {value: 1, title: "Single row (1)"},
    {value: 5, title: "Small (5 rows)"},
    {value: 20, title: "Large (20 rows)"},
] as const;

const createScenario = (
    id: string,
    title: string,
    mode: ElementCreatorMode.RENDER | ElementCreatorMode.EDIT,
    hoverFirstRow = false,
): ComponentScenario => ({
    id,
    componentId: "component_element_creator",
    title,
    sizeLabel: "rows",
    sizes,
    ...(hoverFirstRow ? {
        operationTitle: "Show row menu",
        operationDetail: "Hover the first editor row to create and reveal its options menu.",
    } : {}),
    inputNodesLabel: "ElementCreator rows",
    visibleNodesLabel: "Rendered input controls",
    limitsDescription: "No component truncation limit",
    prepare(size) {
        if (!Number.isInteger(size) || !sizes.some((item) => item.value === size)) {
            throw new Error("Choose 1, 5, or 20 ElementCreator rows.");
        }

        return {
            inputNodes: size,
            maxNodes: null,
            maxDepth: null,
            create() {
                const root = document.createElement("div");
                const creators = Array.from({length: size}, (_, index) => new ComponentElementCreator({
                    prop_mode: mode,
                    prop_component: ComponentInput.Component,
                    prop_componentProperties: {
                        prop_name: `element-creator-input-${index + 1}`,
                        prop_labelTitle: `Input ${index + 1}`,
                        prop_placeholder: `Value ${index + 1}`,
                        prop_value: `Value ${index + 1}`,
                    },
                } as any));
                for (const creator of creators) root.appendChild(creator.getElement());

                return {
                    element: root,
                    run() {
                        if (!hoverFirstRow) return;
                        const host = creators[0]?.getElement().querySelector<HTMLElement>("[data-part-name='part-element-creator-host']");
                        if (!host) throw new Error("The first editor row is unavailable.");
                        host.dispatchEvent(new MouseEvent("mouseenter"));
                    },
                    waitForReady() {
                        return Promise.all(creators
                            .map((creator) => (creator as any)._EDIT_RUNTIME_PROMISE as Promise<unknown> | null)
                            .filter((promise): promise is Promise<unknown> => promise !== null));
                    },
                    validate() {
                        const renderedInputs = root.querySelectorAll("input:not([type='hidden'])").length;
                        if (renderedInputs < size) throw new Error(`Expected ${size} rendered inputs, found ${renderedInputs}.`);
                        if (hoverFirstRow && !creators[0]?.getElement().querySelector("[data-part-name='part-menu-more']")) {
                            throw new Error("Hovering the first editor row did not reveal its options menu.");
                        }
                    },
                    countVisibleNodes() {
                        return root.querySelectorAll("input:not([type='hidden']), textarea, select").length;
                    },
                    dispose() {
                        for (const creator of creators) creator.dispose();
                    },
                };
            },
        };
    },
});

export const elementCreatorPerformanceScenarios: ComponentScenario[] = [
    createScenario("element-creator-render", "Render mode · initial render", ElementCreatorMode.RENDER),
    createScenario("element-creator-edit-render", "Edit mode · initial render", ElementCreatorMode.EDIT),
    createScenario("element-creator-edit-hover", "Edit mode · show row menu", ElementCreatorMode.EDIT, true),
];
