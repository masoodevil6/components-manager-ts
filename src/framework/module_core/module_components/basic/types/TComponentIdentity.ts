import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Identity یک Component Instance
 *
 * شامل سه فیلد مربوط به Runtime Identity:
 *   unique — هویت یکتای Instance در درخت Workflow (CoreEvent.TStepRef)
 *   emit   — Request Handler متصل به المان (CoreEvent.TEmitHandler)
 *   events — Event handlerهای متصل به Component
 *
 * این Type به‌عنوان Generic Parameter چهارم ComponentStructure استفاده می‌شود.
 * فرزندها می‌توانند type اختصاصی داشته باشند (مثلاً ButtonIdentity).
 *
 * @example
 *   class ComponentButton extends ComponentStructure<
 *       ButtonPropsType,
 *       ButtonSchemasType,
 *       ButtonMethodsType,
 *       ButtonIdentity   // ← اختصاصی
 *   > { ... }
 *
 * @example
 *   const component = new ComponentButton(
 *       config,
 *       methods,
 *       {
 *           unique: stepRef,
 *           emit:   handler,
 *           events: { click: onClick },
 *       },
 *   );
 */
export interface ComponentIdentity {

    /** هویت یکتای Instance در درخت Workflow */
    unique: CoreEvent.TStepRef | null;

    /** Request Handler متصل به المان */
    emit:   CoreEvent.TEmitHandler | null;

    /** Event handlerهای متصل به Component */
    events: Record<string, any> | null;

}
