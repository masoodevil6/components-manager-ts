import {Interface_ComponentExampleDefinition as ComponentExampleDefinition} from "./Interface_ComponentExampleDefinition";


/**
 * ExampleRenderer — ابزار عمومی برای تبدیل ComponentExampleDefinition به HTMLElement
 *
 * Example فقط data است (props + methods + identity) و خودش Component را render نمی‌کند.
 * این Renderer مسئول تبدیل است (قرارداد پلن 6.1):
 *
 *   ComponentExampleDefinition
 *           ↓
 *   new Component(props, methods, identity)
 *           ↓
 *   component.getElement()   ← Lazy Render (اولین دسترسی)
 *
 * identity شامل { unique, emit, events } است که در constructor Component set می‌شود.
 *
 * این Renderer هیچ اطلاعی از Component خاصی ندارد.
 * Component را به‌صورت constructor function دریافت می‌کند.
 *
 * @example
 *   ExampleRenderer.render(ComponentButton, BasicButtonExample);
 *   ExampleRenderer.render(ComponentCollapse, OpenCollapseExample);
 */
export const ExampleRenderer = {

    /**
     * ساخت و render یک Component از روی Example Definition
     *
    * @param ComponentConstructor - constructor کلاس Component
    *        (قرارداد پلن 6.1: constructor(props, methods, identity?))
    * @param example - Example Definition شامل props (config), methods, events, unique, emit
     * @returns HTMLElement نتیجه render
     */
    render(
        ComponentConstructor: ExampleRendererComponentConstructor,
        example: ComponentExampleDefinition,
    ): HTMLElement {

        const component = new ComponentConstructor(
            example.config,
            example.methods ?? {},
            {
                unique:  example.unique ?? null,
                emit:    example.emit ?? null,
                events:  example.events ?? null,
            },
        );

        return component.getElement();
    },

};


/**
 * Contract برای Component Constructor که با ExampleRenderer کار می‌کند
 *
* Component باید امضای سه‌آرگومانی پلن 6.1 را داشته باشد:
*   new Component(props, methods, identity?)
 *
 * که identity شامل { unique?, emit?, events? } است.
 *
 * و متد getElement() را داشته باشد که HTMLElement برمی‌گرداند.
 */
export interface ExampleRendererComponentConstructor {
    new(
        config:   Record<string, any>,
        methods:  Record<string, any>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ): ExampleRendererComponent;
}


/**
 * Contract برای Component Instance که توسط ExampleRenderer ساخته می‌شود
 */
export interface ExampleRendererComponent {
    getElement(): HTMLElement;
}
