/**
 * ComponentMethodConfig — قرارداد آرگومان دوم constructor
 *
 * کال‌بک‌ها و اکشن‌های Business هر Component:
 *   - API قابل فراخوانی توسط مصرف‌کننده (صفحه/والد)
 *   - فرزند با this.method("KEY") به آن‌ها دسترسی type-safe دارد
 *
 * @example
 *   // تعریف توسط مصرف‌کننده:
 *   new ComponentCollapse(
 *       {prop_open: false},
 *       {onToggle: (open) => console.log(open)},   // ← TMethod
 *       {unique, emit, events: {click: handler}},
 *   )
 *
 * @see ComponentBase — آرگومان دوم constructor
 */
export type ComponentMethodConfig = {

    /** کلید متد → کال‌بک (امضا توسط جنریک TMethod فرزند تعیین می‌شود) */
    [key: string]: (...args: any[]) => any;

};