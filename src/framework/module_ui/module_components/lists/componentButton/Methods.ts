import type {ComponentMethodConfig} from "@/core_components";

export type ComponentButtonMethods = ComponentMethodConfig;

/**
 * Methods اختصاصی ComponentButton
 */
export const Methods = {

    /** کال‌بک تغییر عنوان */
    onTitleChange: {
        type: "function",
        description: "کال‌بک وقتی عنوان دکمه تغییر کند",
    },

};