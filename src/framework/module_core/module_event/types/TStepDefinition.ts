import type {ClRequest}  from "../class/ClRequest";
import type {ClResponse} from "../class/ClResponse";
///------------------------------

/**
 * تعریف اعلانی یک Step
 * الگوی مصرف: CoreEvent.Step({ request , response , children })
 * children می‌تواند هم تعریف خام باشد و هم Step ساخته‌شده (فراخوانی تو در تو CoreEvent.Step)
 */
export type TStepDefinition = {
    request?: ClRequest;
    response?: ClResponse;
    children?: Record<string, TStepDefinition | {readonly identity: symbol; readonly unique: string}>;
};