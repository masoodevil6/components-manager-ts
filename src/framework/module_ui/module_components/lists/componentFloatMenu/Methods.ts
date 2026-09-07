import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Methods اختصاصی ComponentFloatMenu
 *
 * ComponentFloatMenu یک presentational component است — هیچ methodی ندارد.
 * نمایش (show/hide) توسط propها و internal state مدیریت می‌شود.
 */
export const Methods = {} as const;


/**
 * نوع methodهای ComponentFloatMenu — برای استفاده در TMethods (داخلی Component)
 */
export type MethodsType = ExtractMethodsType<typeof Methods>;


/**
 * Component Args type برای هر method
 */
export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;


/**
 * Data Args type برای هر method
 */
export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;


/**
 * نوع config methods برای مصرف‌کننده (Category callable)
 *
 * استفاده:
 *   UiCategory.UI.Positions.FloatMenu(
 *       { prop_selectorContent: "Click me", prop_floatContent: "Menu body" },
 *       {},
 *   );
 */
export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;
