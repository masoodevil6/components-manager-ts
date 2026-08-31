import * as UiComponents             from "@/ui_components";
// ------------------
import {TCategoryComponentTotality} from "../types/TCategoryComponentTotality";


/**
 * مشابه CreateCategoryIcon اما برای Components
 *
 * یک Definition کامپوننت را دریافت می‌کند و یک callable Totality برمی‌گرداند
 * که هم component را instantiate می‌کند و هم `.info` به Definition دسترسی می‌دهد
 *
 * نمونه:
 *   const Button = CreateCategoryComponent(ButtonDefinition, ComponentButtonClass);
 *   Button({ prop_btnTitle: "test" }, methods);   // ← HTMLElement
 *   Button.info;                                   // ← Definition
 *
 * @param definition      - TComponentDefinition (id, name, version, category?)
 * @param ComponentClass  - کلاس کامپوننت (constructor)
 */
export function MtCreateCategoryComponent(
    definition:      UiComponents.Basic.Types.ComponentDefinition,
    ComponentClass:  new (
        config?:  Record<string, any>,
        methods?: Record<string, any>,
        events?:  Record<string, any>
    ) => { getElement(): HTMLElement }
): TCategoryComponentTotality {

    const callable = (
        config?:  Record<string, any>,
        methods?: Record<string, any>,
        events?:  Record<string, any>
    ): HTMLElement => {
        const instance = new ComponentClass(config, methods, events);
        return instance.getElement();
    };

    return Object.assign(
        callable,
        { info: definition }
    ) as TCategoryComponentTotality;
}