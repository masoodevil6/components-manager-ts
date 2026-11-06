import {ComponentJsonTree} from "../ComponentJsonTree";
import type {ComponentScenario} from "../../../../../module_performance/core/ComponentScenario";

const createScenario = (id: string, title: string, search: boolean): ComponentScenario => ({
    id, title, componentId: "component_json_tree",
    prepare(size) {
        if (!Number.isInteger(size) || size < 1 || size > 5000) throw new Error("Dataset size must be between 1 and 5000.");
        const data = {items: Array.from({length: size}, (_, i) => ({name: `item-${i}`, value: i}))};
        const maxNodes = 2000, maxDepth = 32;
        return {inputNodes: 2 + size * 3, maxNodes, maxDepth, create() {
            const tree = new ComponentJsonTree({prop_data: data, prop_initialExpandDepth: 2, prop_maxNodes: maxNodes, prop_maxDepth: maxDepth} as any);
            const element = tree.getElement() as HTMLElement;
            return {
                element,
                run() {
                    if (!search) return;
                    const input = element.querySelector('input[type="search"]') as HTMLInputElement | null;
                    if (!input) throw new Error("Search input is unavailable.");
                    input.value = "item-42";
                    input.dispatchEvent(new Event("input", {bubbles: true}));
                },
                validate() {
                    if (!element.querySelector('[data-part-name="part-json-tree-node"]')) throw new Error("The tree did not render.");
                    if (search && !element.textContent?.includes("item-42")) throw new Error("The expected search result was not rendered.");
                },
                countVisibleNodes() { return element.querySelectorAll('[data-part-name="part-json-tree-node"]').length; },
                isTruncated() { return !!element.querySelector('[data-part-name="part-json-tree-truncated"], [data-part-name="part-json-tree-depth-limit"]'); },
                dispose() { tree.dispose(); },
            };
        }};
    },
});

export const jsonTreePerformanceScenarios: ComponentScenario[] = [
    createScenario("json-tree-initial", "Initial render", false),
    createScenario("json-tree-search", "Search for item-42", true),
];
