import * as UtilBrands from "@/util_brands";
// --------------------------------


/**
 * Component Example — Factory Function برای نمایش یک Component
 *
 * Example فقط metadata + render callable است.
 * render() مستقیم HTMLElement برمی‌گرداند — بدون نیاز به ExampleRenderer یا Component Constructor.
 *
 * Example به Component وابسته است (چون render() آن Component را می‌سازد).
 * این وابستگی عمدی است — Example بدون Component معنی ندارد.
 *
 * @example
 *   export const DefaultExample: ComponentExample = {
 *       id:          "icon_default",
 *       name:        Keys.category.components.icon.examples.default.name,
 *       description: Keys.category.components.icon.examples.default.description,
 *
 *       render: () => UiCategory.UI.Simples.Icon(
 *           {
 *               prop_icon:      UiIcons.CreateIcon(UiIcons.Src.ArrowUp.Definition, { size: 24 }),
 *               prop_iconTitle: "Arrow Up",
 *           },
 *           {},
 *       ).getElement(),
 *   };
 *
 *   // استفاده:
 *   const el = DefaultExample.render();   // → HTMLElement
 *   document.body.appendChild(el);
 */
export interface Interface_ComponentExample {

    /** شناسه یکتای Example (مثلاً "icon_default") */
    id:          string;

    /** کلید ترجمه برای نام نمایشی Example */
    name:        UtilBrands.TranslationKey;

    /** کلید ترجمه برای توضیحات Example */
    description?: UtilBrands.TranslationKey;

    /**
     * Factory Function — ساخت و render Component
     *
     * مستقیم HTMLElement برمی‌گرداند.
     * هر بار صدا زده شدن، یک Instance جدید می‌سازد.
     *
     * @returns HTMLElement نتیجه render
     */
    render:      () => HTMLElement;

}
