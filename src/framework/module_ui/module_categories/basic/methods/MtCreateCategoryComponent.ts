import * as CoreComponents           from "@/core_components";
// ------------------
import {TCategoryComponentTotality} from "../types/TCategoryComponentTotality";


/**
 * مشابه CreateCategoryIcon اما برای Components
 *
 * یک Definition کامپوننت را دریافت می‌کند و یک callable Totality برمی‌گرداند
 * که هم component را instantiate می‌کند و هم `.info` به Definition دسترسی می‌دهد
 *
 * نکته: callable برمی‌گرداند Component instance (نه HTMLElement)
 *   — consumer می‌تواند set/get/executeMethod را صدا بزند
 *   — برای افزودن به DOM: instance.getElement()
 *
 * نمونه:
 *   const Button = CreateCategoryComponent(ButtonDefinition, ComponentButtonClass);
 *   const btn = Button({ prop_btnTitle: "test" }, methods, { unique, emit, events });
 *   btn.set("prop_btnTitle", "new title");   // ← set روی instance
 *   btn.getElement();                         // ← HTMLElement برای DOM
 *   Button.info;                              // ← Definition
 *
 * @param definition      - TComponentDefinition (id, name, version, category?)
 * @param ComponentClass  - کلاس کامپوننت (constructor با امضای config, methods, identity?)
 *
 * Generic Parameters:
 *   TInstance — type instance کامپوننت (set/get/executeMethod/getElement)
 *   TConfig   — type config کامپوننت (propها) — از ComponentClass استخراج می‌شود
 *   TMethods  — type methods کامپوننت — از ComponentClass استخراج می‌شود
 */
export function MtCreateCategoryComponent<
    TInstance extends { getElement(): HTMLElement | any },
    TConfig  extends Record<string, any> = Record<string, any>,
    TMethods extends Record<string, any> = Record<string, any>,
>(
    definition:      CoreComponents.ComponentDefinition,
    ComponentClass:  new (
        config?:   Partial<TConfig>,
        methods?:  TMethods,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) => TInstance,
): TCategoryComponentTotality<TInstance, TConfig, TMethods> {

    const callable = (
        config?:   Partial<TConfig>,
        methods?:  TMethods,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ): TInstance => {
        const instance = new ComponentClass(config, methods, identity);
        return instance;
    };

    return Object.assign(
        callable,
        { info: definition }
    ) as TCategoryComponentTotality<TInstance, TConfig, TMethods>;
}
