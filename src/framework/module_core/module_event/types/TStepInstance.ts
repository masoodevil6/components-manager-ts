import type {TStepDefinition} from "./TStepDefinition";
///------------------------------

/**
 * شناسه عمومی Step — کمینه مشترک بین کلاس ClStep و Proxy تایپ‌شده factory
 * مصرف در Options.unique ،TRequestMapEntry ،TResponseMap و API های Dispatcher
 */
export type TStepRef = {
    readonly identity: symbol;
    readonly unique: string;
};

/**
 * یک child یا تعریف خام TStepDefinition است یا خودش Step ساخته‌شده (فراخوانی تو در تو CoreEvent.Step)
 * این helper تشخیص می‌دهد و از wrap دوبله جلوگیری می‌کند
 */
type ResolveChild<C> = C extends {readonly identity: symbol}
    ? C
    : C extends TStepDefinition
        ? TStepInstance<C>
        : never;

/**
 * نمونه تایپ‌شده یک Step در درخت — خروجی factory Step
 * دسترسی به children از طریق Proxy با type-safety کامل:
 * کلید ناموجود در کامپایل خطا می‌دهد (پیوست ب-۲ پلن)
 */
export type TStepInstance<TDef extends TStepDefinition = TStepDefinition> = TStepRef & {
    readonly [K in keyof NonNullable<TDef["children"]> & string]
        : NonNullable<TDef["children"]>[K] extends infer C
            ? C extends {readonly identity: symbol}
                ? C
                : C extends TStepDefinition
                    ? TStepInstance<C>
                    : never
            : never;
};