import type {TStepDefinition} from "../types/TStepDefinition";
import type {TStepInstance}   from "../types/TStepInstance";
///------------------------------

/**
 * Step — واحد هویت در CoreEvent
 * identity: symbol یکتا (هویت واقعی — غیرقابل جعل و clone)
 * unique: مسیر خوانا فقط برای debug/logging (بخش ۲۹ پلن — string identity ممنوع)
 */
export class ClStep {

    readonly identity: symbol;
    readonly unique: string;
    readonly children: Record<string, ClStep> = {};

    constructor(unique: string) {

        this.identity = Symbol(unique);
        this.unique   = unique;
    }

    /**
     * factory درختی — ساخت کل زیردرخت از TStepDefinition
     * خروجی Proxy تایپ‌شده است: دسترسی به child با type-safety (پیوست ب-۲)
     */
    static create<TDef extends TStepDefinition>(definition: TDef, path: string = ""): any {

        const step = new ClStep(path);

        const children = (definition.children ?? {}) as Record<string, any>;

        Object.keys(children).forEach((key) => {
            step.children[key] = ClStep.create(children[key], path ? `${path}.${key}` : key);
        });

        // Proxy: دسترسی به child ناموجود در runtime خطای واضح می‌دهد — نه undefined خاموش (پیوست ب-۲)
        return new Proxy(step, {

            get(target: any, prop: string | symbol) {

                if (prop in target || typeof prop === "symbol") {
                    return target[prop];
                }

                if (target.children[prop] != null) {
                    return target.children[prop];
                }

                throw new Error(
                    `[CoreEvent] Step "${target.unique}" کلید/فرزندی با نام "${String(prop)}" ندارد. ` +
                    `فرزندان موجود: [${Object.keys(target.children).join(", ") || "—"}]`
                );
            }
        });
    }
}