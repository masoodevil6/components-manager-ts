import type {ComponentSchemaConfig} from "@/core_components";

export type ComponentCollapseSchema = ComponentSchemaConfig;

/**
 * Schemas اختصاصی ComponentCollapse
 */
export const Schemas = {

    /** بخش اصلی Collapse */
    COLLAPSE: {
        part: "component-collapse",
        name: "Collapse",
        description: "آکاردئون باز/بسته شونده با State",
    },

    /** بخش هدر */
    HEADER: {
        part: "collapse-header",
        name: "Header",
        description: "هدر قابل کلیک برای Toggle",
    },

    /** بخش بدنه */
    BODY: {
        part: "collapse-body",
        name: "Body",
        description: "محتوای بدنه نمایش/مخفی شونده",
    },

};