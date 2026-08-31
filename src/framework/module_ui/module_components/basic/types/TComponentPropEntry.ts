import * as UtilBrands     from "@/util_brands";
// --------------------------------


/**
 * نوع هر entry در الگوی Props کامپوننت
 *
 * هر prop در Props.ts این ساختار را دارد:
 *   prop         — کلید prop (string)
 *   default      — مقدار پیش‌فرض
 *   name         — کلید ترجمه برای نام نمایشی prop
 *   description  — کلید ترجمه برای توضیحات prop
 *
 * توسعه‌پذیر: فرزند می‌تواند فیلدهای بیشتری اضافه کند
 * (مثل hasMultiTemplate, value, ...) بدون تغییر در این type
 *
 * @example
 *   const Props = {
 *       selector: {
 *           prop:    "selector",
 *           default: null,
 *           name:        Keys.category.components.basic.props.selector.name,
 *           description: Keys.category.components.basic.props.selector.description,
 *       } satisfies TComponentPropEntry<string | null>,
 *   }
 */
export type TComponentPropEntry<TDefaultValue = any> = {
    prop:              string;
    default:           TDefaultValue;
    name?:             UtilBrands.TranslationKey;
    description?:      UtilBrands.TranslationKey;
    hasMultiTemplate?: boolean;
    value?:            null;
};
