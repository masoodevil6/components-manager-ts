import {Props as IconProps} from "./Props";
// --------------------------------


/**
 * Methods اختصاصی ComponentIcon
 *
 * Methods قرارداد API قابل فراخوانی توسط مصرف‌کننده است.
 * Component داخلی از this.executeMethod("CLICK", event, params) استفاده می‌کند.
 *
 * سه مسئولیت:
 *   1. تعریف semantic method keys (CLICK, HOVER, BLUR) — Public API
 *   2. نگهداری runtime method name (fn_onClickIcon, ...) — implementation
 *   3. تعریف metadata مربوط به Component/Data Args — source of truth
 *
 * Plan 8.1.4:
 *   - semantic keys متعلق به Public API هستند
 *   - runtime name متعلق به implementation است
 *   - args و dataArgs در اینجا تعریف می‌شوند و type‌ها از آنجا استخراج می‌شوند
 */
export const Methods = {

    CLICK: {
        name:        "fn_onClickIcon",
        description: "Callback when icon is clicked",

        args: {
            ICON: IconProps.prop_icon,
        },

        dataArgs: {} as const,
    },

    HOVER: {
        name:        "fn_onHoverIcon",
        description: "Callback when mouse enters icon",

        args: {
            ICON: IconProps.prop_icon,
        },

        dataArgs: {} as const,
    },

    BLUR: {
        name:        "fn_onBlurIcon",
        description: "Callback when mouse leaves icon",

        args: {
            ICON: IconProps.prop_icon,
        },

        dataArgs: {} as const,
    },

} as const;


/**
 * نوع methodهای ComponentIcon — برای استفاده در TMethods (داخلی Component)
 */
export type MethodsType = {
    [K in keyof typeof Methods]: (event: Event, dataArgs: any, componentArgs: any) => void
};


/**
 * Component Args type برای هر method
 * از args (prop reference) استخراج می‌شود
 *
 * مثال: MethodsComponentArgs["CLICK"] = { ICON: IconsType | null }
 */
export type MethodsComponentArgs = {
    [K in keyof typeof Methods]: {
        [ArgKey in keyof typeof Methods[K]["args"]]:
            typeof Methods[K]["args"][ArgKey] extends {
                default: infer T
            }
                ? T
                : any;
    };
};


/**
 * Data Args type برای هر method
 * از dataArgs تعریف‌شده در Methods استخراج می‌شود
 *
 * مثال: MethodsDataArgs["CLICK"] = {}
 */
export type MethodsDataArgs = {
    [K in keyof typeof Methods]: typeof Methods[K]["dataArgs"];
};


/**
 * نوع config methods برای مصرف‌کننده (Category callable)
 *
 * کلیدهای Public (semantic) از keyof typeof Methods استخراج می‌شوند.
 * هر method callback با type‌های کامل برای autocomplete:
 *   - event: Event
 *   - dataArgs: MethodsDataArgs[K] | null
 *   - componentArgs: MethodsComponentArgs[K] | null
 *   - this: TThis (Component instance)
 *
 * استفاده:
 *   UiCategory.UI.Simples.Icon(
 *       { prop_icon: ... },
 *       {
 *           CLICK: function(event, dataArgs, componentArgs) {
 *               // autocomplete:
 *               //   componentArgs?.ICON  ← IconsType | null
 *               //   dataArgs             ← {}
 *               //   this                 ← ComponentIcon (fn.call(this, ...))
 *           },
 *       },
 *       { unique, emit, events },
 *   );
 *
 * نکته: برای استفاده از `this` به‌عنوان Component instance، از `function` استفاده شود.
 * Arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.
 */
export type MethodsConfigType<
    TThis = any,
> = {
    [K in keyof typeof Methods]?: (
        this: TThis,
        event: Event,
        dataArgs: MethodsDataArgs[K] | null,
        componentArgs: MethodsComponentArgs[K] | null,
    ) => void;
};
