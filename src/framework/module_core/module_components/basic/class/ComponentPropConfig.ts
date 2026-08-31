import * as CoreObservable from "@/core_observable";


/**
 * ComponentPropConfig — قرارداد آرگومان اول constructor
 *
 * propهای declarative هر Component:
 *   - گزینه‌های ساختاری عمومی (selector, append, classList, styles)
 *   - propهای اختصاصی هر Component (توسط جنریک TProp فرزند تعیین می‌شود)
 *
 * مقادیر می‌توانند static یا CoreObservable.App باشند (Reactive Binding).
 *
 * @see ComponentBase — آرگومان اول constructor
 */
export type ComponentPropConfig = {

    /** سلکتور DOM برای نصب خودکار المان (اختیاری) */
    selector?: string | null;

    /** نحوه نصب — true: append، false: replaceChildren (پیش‌فرض) */
    append?:   boolean;

    /** کلاس‌های CSS لایه خارجی (static یا Observable) */
    classList?: string[];

    /** استایل‌های inline لایه خارجی (static یا Observable) */
    styles?:   Record<string, string> | CoreObservable.App<Record<string, string>>;

    /** propهای اختصاصی Component — با extension index */
    [key: string]: any;

};