// --------------------------------
import {Interface_ComponentMethod as MethodInterface }   from "../../tools/method/Interface_ComponentMethod";
import {Type_ComponentMethod      as MethodType }        from "../../tools/method/Type_ComponentMethod";


/**
 * Define_ComponentMethod
 *
 * یک کپی مستقل از methods می‌سازد — هر entry به‌صورت shallow clone شده
 * تا نمونه‌های مختلف Componentها destination مستقل داشته باشند.
 *
 * مشکل قبلی (Plan 8.2.5):
 *   `_COMPONENT_METHODS = DefineMethod({...Methods})` فقط یک shallow copy سطح بالا
 *   ایجاد می‌کرد، اما entryهای داخلی (CLICK, HOVER, ...) by reference به اشتراک
 *   گذاشته می‌شدند. وقتی #getReadyComponentMethods روی یک نمونه destination را set
 *   می‌کرد، همه نمونه‌ها تحت تاثیر قرار می‌گرفتند — آخرین نمونه همه را overwrite می‌کرد.
 *
 * راه‌حل: هر entry داخلی هم clone شود تا هر نمونه مستقل باشد.
 */
export function Define_ComponentMethod<TMethod , TPropTypes>(methods: { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> } ) : { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> } {
    const result = {} as { [K in MethodType<TMethod>]: MethodInterface<TPropTypes> };

    for (const key in methods) {
        result[key] = { ...methods[key] };
    }

    return result;
}
