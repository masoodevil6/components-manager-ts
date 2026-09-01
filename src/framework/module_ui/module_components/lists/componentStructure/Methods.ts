// --------------------------------


/**
 * کلیدهای methodهای پایه ComponentStructure
 *
 * ComponentStructure در حالت پایه method اختصاصی ندارد.
 * کامپوننت‌های فرزند methodهای خود را اضافه می‌کنند.
 *
 * در ساختار قدیمی: ComponentButtonConfigs.methods = { CLICK: { name: "fn_onClickButton", ... } }
 * در ساختار جدید: فرزند در Methods خود کلیدهای اختصاصی تعریف می‌کند
 */
export const Methods = {
    // خالی — کامپوننت‌های فرزند methodهای خود را اضافه می‌کنند
} as const;


/**
 * نوع methodهای پایه — برای استفاده در TMethods کامپوننت‌های فرزند
 *
 * @example
 *   import {MethodsType} from "@/ui_components/lists/componentStructure/Methods"
 *   class ComponentButton extends ComponentStructure<..., ..., ..., MethodsType>
 */
export type MethodsType = {
    [K in keyof typeof Methods]: (event: Event, dataArgs: any, componentArgs: any) => void
};
