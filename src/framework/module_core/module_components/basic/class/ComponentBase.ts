import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
// --------------------------------
import type {ComponentPropConfig}   from "./ComponentPropConfig";
import type {ComponentSchemaConfig} from "./ComponentSchemaConfig";
import type {ComponentMethodConfig} from "./ComponentMethodConfig";
import type {ComponentIdentity}     from "./ComponentIdentity";


/**
 * ComponentBase — قرارداد واحد Base Componentها (پلن 6.1)
 *
 * مکان: Core — چون یک Contract سراسری است نه کلاس UI.
 * هر ماژول (UI و آینده) بدون چرخه وابستگی از آن ارث می‌برد.
 *
 * جنریک‌های سه‌گانه:
 *   TProp   → پارامترهای Component (آرگومان اول constructor)
 *   TSchema → سناریو و Scope هر بخش (Metadata — نقشی در Rendering ندارد)
 *   TMethod → کال‌بک‌ها و اکشن‌ها (آرگومان دوم constructor)
 *
 * constructor سه‌آرگومانی:
 *   ۱) props    — آبجکت propهای Component (ریشه TProp)
 *   ۲) methods  — آبجکت متدها و کال‌بک‌ها (ریشه TMethod)
 *   ۳) identity — بخش عمومی اتصال: {unique, emit, events}
 *      unique/emit → اتصال به جریان CoreEvent
 *      events      → متدهای DOM خود Component از سمت والد
 *
 * اصل معماری (ارث از پلن 5.11):
 *   Component خودش مسئول State، Methods و Rendering خودش است.
 *   Composition از طریق content / استفاده مستقیم Component دیگر.
 *   Schema فقط Metadata است.
 *
 * جریان Lifecycle:
 *   constructor(props, methods, identity?)
 *       → ذخیره props / methods / identity (بدون رندر)
 *   اولین دسترسی (getElement / mount):
 *       → render()  (پیاده‌سازی توسط فرزند — با CoreReactive.App)
 *       → mount (selector / append)
 *
 * نکته مهم (Lazy Render — حفظ‌شده از پلن 5.11):
 *   render() عمداً در constructor صدا زده نمی‌شود؛ چون class fieldهای
 *   کلاس فرزند (مثل this.state) بعد از بازگشت super() مقداردهی می‌شوند
 *   و اگر render در super اجرا شود، this.state هنوز undefined است.
 *   رندر با ensureRender() به اولین دسترسی منتقل شده است.
 *
 * @example
 *   class ComponentCollapse extends ComponentBase<
 *       CollapseProps, CollapseSchema, CollapseMethods
 *   > {
 *       protected readonly state = {open: new CoreObservable.App(false)};
 *       protected toggle() {this.state.open.set(!this.state.open.get())}
 *       protected render() {return CoreReactive.App.part("section", {...})}
 *   }
 */
export abstract class ComponentBase<
    TProp   extends ComponentPropConfig   = ComponentPropConfig,
    TSchema extends ComponentSchemaConfig = ComponentSchemaConfig,
    TMethod extends ComponentMethodConfig = ComponentMethodConfig
> {

    /* ---------------------------------------------
       props — آرگومان اول constructor
       فرزند با this.prop("...") / this.bindProp("...") دسترسی دارد
    --------------------------------------------- */
    protected readonly _props: TProp;

    /* ---------------------------------------------
       methods — آرگومان دوم constructor (API Business)
       فرزند با this.method("KEY") دسترسی type-safe دارد
    --------------------------------------------- */
    protected readonly _methods: Partial<TMethod>;

    /* ---------------------------------------------
       identity — آرگومان سوم constructor
       {unique, emit} → اتصال CoreEvent ، events → handlerهای DOM
    --------------------------------------------- */
    protected readonly _identity: Partial<ComponentIdentity>;

    /* ---------------------------------------------
       عنصر رندر شده اصلی
    --------------------------------------------- */
    protected _content: CoreReactive.App | null = null;

    /* ---------------------------------------------
       Scope برای dispose خودکار subscriptionها در render مجدد
    --------------------------------------------- */
    protected _renderScope: CoreObservable.Scope = new CoreObservable.Scope();


    constructor(
        props:    TProp,
        methods:  TMethod,
        identity?: Partial<ComponentIdentity>
    ) {
        this._props    = props   ?? ({} as TProp);
        this._methods  = methods ?? ({} as Partial<TMethod>);
        this._identity = identity ?? {};
    }


    /* ---------------------------------------------
       ensureRender — رندر تنبل (Lazy Render)

       render() عمداً در constructor فراخوانی نمی‌شود؛ زیرا class fieldهای
       کلاس فرزند (مثل this.state) پس از بازگشت super() مقداردهی می‌شوند.
       با این روش، اولین دسترسی به getElement/mount تضمین می‌کند که
       state فرزند کاملاً آماده است.
    --------------------------------------------- */
    protected ensureRender(): void {
        if (this._content) return;

        this._content = this.render();

        this._mount();
    }


    /* ---------------------------------------------
       render — هر Component پیاده‌سازی خودش را دارد
       (بدون Schema، بدون Router، بدون Handler)
    --------------------------------------------- */
    protected abstract render(): CoreReactive.App;


    /* ---------------------------------------------
       mount — نصب در DOM (در صورت وجود selector)
    --------------------------------------------- */
    protected _mount(): void {
        if (!this._content) return;

        const selector = this._props?.selector;
        if (!selector) return;

        const el = document.querySelector(selector);
        if (!el) return;

        const element = this.getElement();
        if (!element) return;

        if (this._props?.append) {
            el.append(element);
        }
        else {
            el.replaceChildren(element);
        }
    }


    /* ---------------------------------------------
       prop — دسترسی Type-safe به props
    --------------------------------------------- */
    protected prop<K extends keyof TProp>(key: K): TProp[K] {
        return this._props?.[key];
    }


    /* ---------------------------------------------
       bindProp — گرفتن نسخه Observable یک prop
       (اگر observable بود خودش، وگرنه یک App جدید)
    --------------------------------------------- */
    protected bindProp<K extends keyof TProp>(key: K): CoreObservable.App<any> {
        const value = this._props?.[key];

        if (CoreObservable.App.isObservable(value)) {
            return value;
        }

        return new CoreObservable.App(value);
    }


    /* ---------------------------------------------
       method — دسترسی Type-safe به methods (جدید — پلن 6.1)
    --------------------------------------------- */
    protected method<K extends keyof TMethod>(key: K): TMethod[K] | undefined {
        return this._methods?.[key];
    }


    /* ---------------------------------------------
       schema — دسترسی به Metadata سناریو (TSchema)
       فقط برای مستندسازی/Scope/مانیتورینگ — نقشی در Rendering ندارد
    --------------------------------------------- */
    protected getIdentity(): Partial<ComponentIdentity> {
        return this._identity;
    }


    /* ---------------------------------------------
       emitEvent — ارسال Event به والد (در صورت وجود emit handler)
    --------------------------------------------- */
    protected emitEvent(payload?: any): void {
        (this._identity?.emit as any)?.(payload ?? {});
    }


    /* ---------------------------------------------
       getElement — HTMLElement نهایی
       (اولین دسترسی → رندر تنبل انجام می‌شود)
    --------------------------------------------- */
    getElement(): HTMLElement | null {

        this.ensureRender();

        if (!this._content) return null;

        if (this._content && typeof (this._content as any).getElement === "function") {
            return (this._content as any).getElement();
        }

        return this._content as any;
    }


    /* ---------------------------------------------
       dispose — آزادسازی منابع (Scope)
    --------------------------------------------- */
    dispose(): void {
        this._renderScope.dispose();
    }


}