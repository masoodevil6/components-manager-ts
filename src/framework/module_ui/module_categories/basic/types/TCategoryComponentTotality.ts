import * as CoreComponents           from "@/core_components"


/**
 * مشابه TCategoryIconTotality اما برای Components
 *
 * یک callable که component را instantiate می‌کند
 * + `.info` که Definition کامپوننت را نگه می‌دارد
 *
 * نکته: callable برمی‌گرداند Component instance (نه HTMLElement)
 *   — consumer می‌تواند set/get/executeMethod را صدا بزند
 *   — برای افزودن به DOM: instance.getElement()
 *
 * نمونه استفاده:
 *   const Button = CreateCategoryComponent(ButtonDefinition, ComponentButtonClass);
 *   const btn = Button({ prop_btnTitle: "test" }, methods, { unique, emit, events });
 *   btn.set("prop_btnTitle", "new title");   // ← set روی instance
 *   btn.getElement();                         // ← HTMLElement برای DOM
 *   Button.info;                              // ← Definition
 *
 * Generic Parameters:
 *   TInstance — type instance کامپوننت (set/get/executeMethod/getElement)
 *   TConfig   — type config کامپوننت (propها)
 *   TMethods  — type methods کامپوننت
 */
export type TCategoryComponentTotality<
    TInstance,
    TConfig  extends Record<string, any> = Record<string, any>,
    TMethods extends Record<string, any> = Record<string, any>,
> =
    & ((
        config?:   Partial<TConfig>,
        methods?:  TMethods,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) => TInstance)
    & {
        info: CoreComponents.ComponentDefinition
    }
