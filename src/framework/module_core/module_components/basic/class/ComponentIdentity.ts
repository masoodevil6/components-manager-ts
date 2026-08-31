import type * as CoreEvent from "@/core_event";


/**
 * ComponentIdentity — قرارداد آرگومان سوم constructor (بخش عمومی اتصال)
 *
 * سه فیلد:
 *   unique — هویت یکتای Instance در درخت Workflow (اتصال به جریان CoreEvent)
 *   emit   — Request Handler (CoreEvent) برای ارسال Response به والد
 *   events — handlerهای DOM/Event خود Component از سمت والد
 *            (تزریق مستقیم به on: {} در render)
 *
 * تفکیک با آرگومان دوم (methods):
 *   methods        → API Business کامپوننت (this.method("KEY") داخل فرزند)
 *   identity.events → handlerهای DOM (on: {...} در render)
 *
 * @see ComponentBase — آرگومان سوم constructor
 */
export interface ComponentIdentity {

    /** هویت یکتای Instance در درخت Workflow */
    unique?: CoreEvent.TStepRef | null;

    /** Request Handler متصل به المان */
    emit?:   CoreEvent.TEmitHandler | null;

    /** Event handlerهای DOM خود Component (از سمت والد) */
    events?: Record<string, any> | null;

}