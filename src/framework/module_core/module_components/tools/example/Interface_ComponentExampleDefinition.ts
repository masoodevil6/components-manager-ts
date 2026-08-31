import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Component Example Definition — قرارداد یک Example برای Component
 *
 * Example یک Mock نیست — config واقعی Component است که توسط ExampleRenderer
 * به Component Runtime تبدیل می‌شود.
 *
 * هر Component می‌تواند چند Example داشته باشد (Basic, Submit, WithIcon, ...).
 * Example فقط data است (config + metadata) و خودش Component را render نمی‌کند.
 * این جداسازی باعث می‌شود:
 *   - Example قابل serialize شدن باشد (برای ذخیره در DB یا Registry)
 *   - ComponentManager بتواند بدون import کردن Component، Example را نمایش دهد
 *   - چند Example بدون کد تکراری امکان‌پذیر باشد
 *
 * @example
 *   export const BasicButtonExample: ComponentExampleDefinition = {
 *       id:          "button_basic",
 *       name:        "Basic Button",
 *       description: "Basic button example",
 *       config: {
 *           prop_btnTitle: "Submit",
 *           prop_type:     "submit",
 *       },
 *   };
 *
 * @example
 *   ExampleRenderer.render(ComponentButton, BasicButtonExample);
 */
export interface Interface_ComponentExampleDefinition {

    /** شناسه یکتای Example (مثلاً "button_basic") */
    id:          string;

    /** نام نمایشی Example (مثلاً "Basic Button") */
    name:        string;

    /** توضیحات اختیاری Example */
    description?: string;

    /**
     * Configuration واقعی Component
     * این همان object‌ای است که به renderComponent(config, ...) پاس می‌شود
     */
    config:      Record<string, any>;

    /**
     * Methodهای قابل فراخوانی Component
     * این همان object‌ای است که به renderComponent(..., methods, ...) پاس می‌شود
     */
    methods?:    Record<string, any>;

    /**
     * Eventهای Component
     * این همان object‌ای است که به renderComponent(..., ..., events, ...) پاس می‌شود
     */
    events?:     Record<string, any>;

    /**
     * Identity یکتای Instance (برای Workflow آینده)
     * فعلاً optional — تا زمانی که Core Identity API طراحی شود
     */
    unique?:     CoreEvent.TStepRef | null;

    /**
     * Emit Handler (برای Workflow آینده)
     * فعلاً optional — تا زمانی که Core Identity API طراحی شود
     */
    emit?:       CoreEvent.TEmitHandler | null;

}
