import * as UiComponents             from "@/ui_components"


/**
 * مشابه TCategoryIconTotality اما برای Components
 *
 * یک callable که component را instantiate می‌کند
 * + `.info` که Definition کامپوننت را نگه می‌دارد
 *
 * نمونه استفاده:
 *   const Button = CreateCategoryComponent(ButtonDefinition, ComponentButtonClass);
 *   Button({ prop_btnTitle: "test" }, methods);   // ← callable → HTMLElement
 *   Button.info;                                   // ← Definition
 */
export type TCategoryComponentTotality =
    & ((
        config?:  Record<string, any>,
        methods?: Record<string, any>,
        events?:  Record<string, any>
    ) => HTMLElement)
    & {
        info: UiComponents.Basic.Types.ComponentDefinition
    }