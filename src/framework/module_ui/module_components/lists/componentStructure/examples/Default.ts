import {ComponentExampleDefinition} from "@/core_components";


/**
 * Default Example برای ComponentStructure
 *
 * بر اساس پلن 6.1 (قرارداد سه‌آرگومانی):
 *   Example فقط Data است — props + methods + identity.
 *   رندر توسط ExampleRenderer انجام می‌شود:
 *     Example → new Component(props, methods, identity) → getElement()
 */
export const DefaultExample: ComponentExampleDefinition = {

    id:          "component_structure_example_default",

    name:        "Default Structure",

    description: "Default ComponentStructure example — pure data, rendered via ExampleRenderer",

    config: {
        classList:      [
            "p-2",
            "border",
        ],
        structureClass: ["bg-light", "rounded"],
        structureStyles: {},
    },

    methods: {},

};