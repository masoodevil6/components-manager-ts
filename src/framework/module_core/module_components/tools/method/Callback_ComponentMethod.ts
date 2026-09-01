

/**
 * Callback Type برای Component Method
 *
 * @param TComponentArgs — type مربوط به componentArgs (propهای مرتبط)
 * @param TDataArgs      — type مربوط به dataArgs (runtime data)
 * @param TThis          — type مربوط به this (Component instance) — default: any
 *
 * نکته: `this: TThis` فقط در function callback کار می‌کند، نه arrow function.
 * Arrow function با `.call()` نمی‌تواند `this` را تغییر دهد.
 */
export type Callback_ComponentMethod<
    TComponentArgs,
    TDataArgs,
    TThis = any
> = (
    this: TThis,
    event:            Event,
    dataArgs:         TDataArgs | null,
    componentArgs:    TComponentArgs | null,
) => void;
