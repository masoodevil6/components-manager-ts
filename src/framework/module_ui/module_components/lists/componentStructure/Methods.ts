import type {ComponentMethodConfig} from "@/core_components";

export type ComponentStructureMethods = ComponentMethodConfig;

/**
 * Methods اختصاصی ComponentStructure
 *
 * کال‌بک‌ها و اکشن‌های ComponentStructure (آرگومان دوم constructor)
 */
export const Methods = {

    /** کال‌بک تغییر وضعیت نمایش (اختیاری) */
    onShowChange: {
        type: "function",
        description: "کال‌بک وقتی show/hide تغییر کند",
    },

};