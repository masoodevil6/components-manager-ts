import type {ComponentMethodConfig} from "@/core_components";

export type ComponentCollapseMethods = ComponentMethodConfig;

/**
 * Methods اختصاصی ComponentCollapse
 */
export const Methods = {

    /** کال‌بک تغییر وضعیت باز/بسته */
    onToggle: {
        type: "function",
        description: "کال‌بک وقتی وضعیت باز/بسته تغییر کند",
    },

    /** کال‌بک باز شدن */
    onOpen: {
        type: "function",
        description: "کال‌بک وقتی باز شود",
    },

    /** کال‌بک بسته شدن */
    onClose: {
        type: "function",
        description: "کال‌بک وقتی بسته شود",
    },

};