import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
// --------------------------------
import {ComponentBase}     from "@/core_components";
import type {
    ComponentPropConfig,
    ComponentSchemaConfig,
    ComponentMethodConfig,
    ComponentIdentity,
}                          from "@/core_components";


/**
 * ComponentButtonProps — Props اختصاصی ComponentButton (آرگومان اول)
 */
export type ComponentButtonProps = ComponentPropConfig & {

    /** btnTitle — متن دکمه (رشته یا Observable) */
    btnTitle?: string | CoreObservable.App<string>;

    /** type — نوع دکمه (button / submit / reset) */
    type?:     "button" | "submit" | "reset";

    /** variant — استایل بوت‌استرپ (primary / secondary / ...) */
    variant?:  string;

    /** Composition Point — محتوای داخل دکمه (مثلاً Icon) */
    content?:  () => CoreReactive.App | CoreReactive.App[] | null;

};


/**
 * ComponentButtonSchema — Schema اختصاصی (جنریک دوم — فقط Metadata)
 */
export type ComponentButtonSchema = ComponentSchemaConfig;


/**
 * ComponentButtonMethods — Methods اختصاصی (آرگومان دوم)
 */
export type ComponentButtonMethods = ComponentMethodConfig & {

    /** کال‌بک تغییر عنوان (اختیاری) */
    onTitleChange?: (title: string) => void;

};


/**
 * ComponentButton — Component دکمه (پلن 6.1 — قرارداد سه‌آرگومانی)
 *
 * مستقل و مستقیماً extends ComponentBase (از Core):
 *   - State:       observable داخلی (title)
 *   - Methods:     setTitle()
 *   - Rendering:   مستقیم با CoreReactive.App.button
 *   - Composition: content (برای Icon) یا btnTitle
 *
 * @example
 *   const button = new ComponentButton(
 *       {btnTitle: "Save", variant: "primary"},
 *       {},                                    // methods
 *       {events: {click: onClickHandler}},     // identity
 *   );
 *
 *   document.body.append(button.getElement()!);
 */
export class ComponentButton<
    TProp   extends ComponentButtonProps   = ComponentButtonProps,
    TSchema extends ComponentButtonSchema  = ComponentButtonSchema,
    TMethod extends ComponentButtonMethods = ComponentButtonMethods
> extends ComponentBase<TProp, TSchema, TMethod> {


    /* ---------------------------------------------
       State — observable داخلی title
       مقدار اولیه از props خوانده می‌شود؛
       اگر props observable باشد، مستقیم به آن متصل می‌شویم (one-way sync)
    --------------------------------------------- */
    protected readonly state = {

        /** عنوان فعلی دکمه */
        title: new CoreObservable.App<string>(""),

    };


    constructor(props: TProp, methods: TMethod, identity?: Partial<ComponentIdentity>) {
        super(props, methods, identity);

        // مقدار اولیه state از props
        const initial = this.prop("btnTitle");

        if (CoreObservable.App.isObservable(initial)) {
            initial.subscribe((value: string) => {
                this.state.title.set(value);
            });
        }
        else if (typeof initial === "string") {
            this.state.title.set(initial);
        }
    }


    /* ---------------------------------------------
       render — مستقیم با CoreReactive (بدون Schema)
    --------------------------------------------- */
    protected render(): CoreReactive.App {

        const variant =
            this.prop("variant") ?? "primary";

        const type =
            this.prop("type") ?? "button";

        return CoreReactive.App.button({
            attrs: {
                type: type,
            },
            className: [
                "btn",
                `btn-${variant}`,
            ],
            children: [
                ...this.renderContent(),
                this.state.title,
            ],
            on: (this._identity?.events ?? {}) as Record<string, any>,
        });
    }


    /* ---------------------------------------------
       renderContent — Composition Point (مثلاً Icon)
    --------------------------------------------- */
    protected renderContent(): CoreReactive.App[] {

        const content = this.prop("content");

        if (typeof content !== "function") {
            return [];
        }

        const result = (content as ComponentButtonProps["content"])();

        if (!result) {
            return [];
        }

        return Array.isArray(result)
            ? result
            : [result];
    }


    /* ---------------------------------------------
       Runtime Method — تغییر عنوان از بیرون
    --------------------------------------------- */
    setTitle(title: string): void {
        this.state.title.set(title);
    }


}