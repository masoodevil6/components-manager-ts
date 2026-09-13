import type {
    ExtractMethodsType,
    ExtractMethodsComponentArgs,
    ExtractMethodsDataArgs,
    ExtractMethodsConfigType,
} from "../../tools/type/TypeHelpers";


/**
 * Methods اختصاصی ComponentTooltip (Plan 14.1.0)
 *
 * ComponentTooltip هیچ method اختصاصی ندارد — فقط نمایش tooltip بر اساس props.
 */
export const Methods = {
} as const;


export type MethodsType = ExtractMethodsType<typeof Methods>;

export type MethodsComponentArgs = ExtractMethodsComponentArgs<typeof Methods>;

export type MethodsDataArgs = ExtractMethodsDataArgs<typeof Methods>;

export type MethodsConfigType<
    TThis = any,
> = ExtractMethodsConfigType<typeof Methods, TThis>;
