import type {ComponentSchemaConfig} from "@/core_components";

export type ComponentStructureSchema = ComponentSchemaConfig;

/**
 * Schemas اختصاصی ComponentStructure
 *
 * این فایل فقط Metadata ساختاری است و نقشی در Rendering ندارد.
 */
export const Schemas = {

    /** بخش اصلی Structure */
    STRUCTURE: {
        part: "component-structure",
        name: "Structure",
        description: "لایه ساختاری عمومی با Composition Point",
    },

    /** بخش محتوا */
    CONTENT: {
        part: "structure-content",
        name: "Content",
        description: "محتوای قابل تزریق در داخل Structure",
    },

};