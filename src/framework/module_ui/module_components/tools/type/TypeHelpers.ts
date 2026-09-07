import type {TObservableValue} from "@/core_observable";
// --------------------------------


/** استخراج نوع Props از Definition
 *
 *  برای هر prop، نوع `default` را استخراج می‌کند.
 *
 *  Contract موردنیاز: فیلد `default` — حداقلی، مستقل از Interface_ComponentProp */
export type ExtractPropsType<
    TProps extends Record<string, { default: any }>
> = {
    [K in keyof TProps]: TProps[K]["default"]
};

/** استخراج نوع PropsConfig از Definition
 *
 *  برای هر prop، `TObservableValue<T>` را تولید می‌کند.
 *  مستقیماً از `default` type استفاده می‌کند — نه پارامتر Generic.
 *
 *  Contract موردنیاز: فیلد `default` — حداقلی، مستقل از Interface_ComponentProp */
export type ExtractPropsConfigType<
    TProps extends Record<string, { default: any }>
> = {
    [K in keyof TProps]: TObservableValue<TProps[K]["default"]>
};

/** استخراج نوع Schemas از Definition
 *
 *  برای هر schema، نوع `part` را استخراج می‌کند.
 *
 *  Contract موردنیاز: فیلد `part` — حداقلی، مستقل از Interface_ComponentSchema */
export type ExtractSchemasType<
    TSchemas extends Record<string, { part: any }>
> = {
    [K in keyof TSchemas]: TSchemas[K]["part"]
};

/** استخراج نوع Methods از Definition
 *
 *  برای هر method، callback signature استاندارد تولید می‌کند.
 *
 *  Contract موردنیاز: فیلد `name` — حداقلی.
 *  Note: `any` در پارامترها یک بدهی فنی شناخته‌شده است (Plan مستقل Type Safety). */
export type ExtractMethodsType<
    TMethods extends Record<string, { name: string }>
> = {
    [K in keyof TMethods]: (event: Event, dataArgs: any, componentArgs: any) => void
};

/** استخراج Component Args برای هر method
 *
 *  اگر method فیلد `args` داشته باشد → استخراج type از default
 *  اگر method فیلد `args` نداشته باشد → {} (آبجکت خالی)
 *
 *  Contract موردنیاز: `args` optional — مدیریت شرطی
 *
 *  Technical Debt: Record<string, any> constraint — Accepted.
 *  Refactor مستقل Type Safety در Plan جداگانه. */
export type ExtractMethodsComponentArgs<
    TMethods extends Record<string, any>
> = {
    [K in keyof TMethods]:
        TMethods[K]["args"] extends Record<string, any>
            ? {
                [ArgKey in keyof TMethods[K]["args"]]:
                    TMethods[K]["args"][ArgKey] extends { default: infer T }
                        ? T
                        : any;
            }
            : {};
};

/** استخراج Data Args برای هر method
 *
 *  Contract موردنیاز: `dataArgs` اجباری است.
 *
 *  اگر method فیلد `dataArgs` نداشته باشد،
 *  TMethods constraint را satisfy نمی‌کند و compile error رخ می‌دهد. */
export type ExtractMethodsDataArgs<
    TMethods extends Record<string, { dataArgs: any }>
> = {
    [K in keyof TMethods]: TMethods[K]["dataArgs"];
};

/** نوع config methods برای مصرف‌کننده (Category callable)
 *
 *  Constraint با ExtractMethodsDataArgs هماهنگ است:
 *  هر دو `dataArgs` را اجباری می‌دانند. */
export type ExtractMethodsConfigType<
    TMethods extends Record<string, {
        name: string;
        dataArgs: any;
    }>,
    TThis = any,
> = {
    [K in keyof TMethods]?: (
        this: TThis,
        event: Event,
        dataArgs: ExtractMethodsDataArgs<TMethods>[K] | null,
        componentArgs: ExtractMethodsComponentArgs<TMethods>[K] | null,
    ) => void;
};
