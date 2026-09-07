import type {TStepDefinition} from "../types/TStepDefinition";
import type {TStepInstance}   from "../types/TStepInstance";
///------------------------------

/**
 * Step — واحد هویت در CoreEvent
 * identity: symbol یکتا (هویت واقعی — غیرقابل جعل و clone)
 * unique: مسیر خوانا فقط برای debug/logging (بخش ۲۹ پلن — string identity ممنوع)
 *
 * Plan 8.2.7 — کپسوله‌سازی ساختار داخلی:
 *   children از بیرون قابل mutate نیست — فقط از طریق addChild/removeChild.
 *   دسترسی read-only از طریق getChild.
 *   هیچ لایه‌ای مستقیماً children را دستکاری نمی‌کند.
 */
export class ClStep {

    readonly identity: symbol;
    readonly unique: string;

    /** ساختار داخلی — private، فقط از طریق API عمومی قابل دسترسی */
    private _children: Map<string, ClStep> = new Map();

    /** parent reference — برای قطع اتصال در disposal */
    private _parent: ClStep | null = null;
    private _parentKey: string | null = null;

    constructor(unique: string) {

        this.identity = Symbol(unique);
        this.unique   = unique;
    }

    /* ---------------------------------------------
       API عمومی — مدیریت children
    --------------------------------------------- */

    /** اتصال رسمی یک Child Step — تنها راه mutate ساختار */
    addChild(key: string, child: ClStep): void {
        child._parent = this;
        child._parentKey = key;
        this._children.set(key, child);
    }

    /** دسترسی read-only به child — undefined اگر وجود ندارد */
    getChild(key: string): ClStep | undefined {
        return this._children.get(key);
    }

    /** قطع اتصال یک child — برمی‌گرداند child را یا undefined */
    removeChild(key: string): ClStep | undefined {
        const child = this._children.get(key);
        if (child) {
            child._parent = null;
            child._parentKey = null;
            this._children.delete(key);
        }
        return child;
    }

    /** لیست همه children — read-only iterator */
    getChildEntries(): ReadonlyArray<readonly [string, ClStep]> {
        return Array.from(this._children.entries());
    }

    /** parent این step — برای disposal از پایین به بالا */
    getParent(): ClStep | null {
        return this._parent;
    }

    /** کلید این step در parent — برای قطع اتصال */
    getParentKey(): string | null {
        return this._parentKey;
    }

    /* ---------------------------------------------
       Disposal — پاک‌سازی بازگشتی درخت
    --------------------------------------------- */

    /**
     * جمع‌آوری همه نسل‌ها (بازگشتی) — شامل خود step نمی‌شود
     * مصرف: CoreEvent.dispose(step) برای پاک‌سازی کل subtree از رجیستری
     */
    getAllDescendants(): ClStep[] {
        const result: ClStep[] = [];
        for (const [, child] of this._children) {
            result.push(child);
            result.push(...child.getAllDescendants());
        }
        return result;
    }

    /** پاک‌سازی کل subtree — قطع اتصال همه children */
    clearChildren(): void {
        for (const [, child] of this._children) {
            child._parent = null;
            child._parentKey = null;
            child.clearChildren();
        }
        this._children.clear();
    }

    /* ---------------------------------------------
       factory درختی — ساخت کل زیردرخت از TStepDefinition
    --------------------------------------------- */

    /**
     * factory درختی — ساخت کل زیردرخت از TStepDefinition
     * خروجی Proxy تایپ‌شده است: دسترسی به child با type-safety (پیوست ب-۲)
     *
     * نکته: children از طریق addChild ساخته می‌شوند — نه mutate مستقیم
     *
     * نکته: اگر یک child قبلاً Step ساخته‌شده باشد (has identity)،
     * مستقیماً استفاده می‌شود — نه دوباره ساخته می‌شود.
     * (هماهنگ با ResolveChild در TStepInstance.ts)
     */
    static create<TDef extends TStepDefinition>(definition: TDef, path: string = ""): any {

        // اگر definition قبلاً یک Step است (Proxy با identity)، مستقیماً برگردان
        if (definition && typeof definition === "object" && "identity" in definition) {
            return definition;
        }

        const step = new ClStep(path);

        const children = ((definition as any).children ?? {}) as Record<string, any>;

        Object.keys(children).forEach((key) => {
            const childPath = path ? `${path}.${key}` : key;
            const childStep = ClStep.create(children[key], childPath);
            step.addChild(key, childStep);   // ← API عمومی، نه mutate مستقیم
        });

        // Proxy: دسترسی به child ناموجود در runtime خطای واضح می‌دهد — نه undefined خاموش (پیوست ب-۲)
        return new Proxy(step, {

            get(target: ClStep, prop: string | symbol) {

                // دسترسی به propretyهای خود ClStep (identity, unique, addChild, ...)
                if (prop in target || typeof prop === "symbol") {
                    return (target as any)[prop];
                }

                // دسترسی به child از طریق API عمومی
                const child = target.getChild(String(prop));
                if (child != null) {
                    return child;
                }

                throw new Error(
                    `[CoreEvent] Step "${target.unique}" کلید/فرزندی با نام "${String(prop)}" ندارد. ` +
                    `فرزندان موجود: [${target.getChildEntries().map(([k]) => k).join(", ") || "—"}]`
                );
            }
        });
    }
}
