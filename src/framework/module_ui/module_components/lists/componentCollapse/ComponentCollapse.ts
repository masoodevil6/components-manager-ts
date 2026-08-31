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
 * ComponentCollapseProps — Props اختصاصی ComponentCollapse (آرگومان اول)
 */
export type ComponentCollapseProps = ComponentPropConfig & {

    /** open — وضعیت اولیه باز بودن (رشته یا Observable) */
    open?:        boolean | CoreObservable.App<boolean>;

    /** headerTitle — عنوان بخش هدر */
    headerTitle?: string;

    /** Composition Point — محتوای بدنه Collapse */
    content?:     () => CoreReactive.App | CoreReactive.App[] | null;

};


/**
 * ComponentCollapseSchema — Schema اختصاصی (جنریک دوم — فقط Metadata)
 */
export type ComponentCollapseSchema = ComponentSchemaConfig;


/**
 * ComponentCollapseMethods — Methods اختصاصی (آرگومان دوم)
 */
export type ComponentCollapseMethods = ComponentMethodConfig & {

    /** کال‌بک تغییر وضعیت باز/بسته */
    onToggle?: (open: boolean) => void;

    /** کال‌بک باز شدن */
    onOpen?:   () => void;

    /** کال‌بک بسته شدن */
    onClose?:  () => void;

};


/**
 * ComponentCollapse — Component آکاردئونی (پلن 6.1 — قرارداد سه‌آرگومانی)
 *
 * این Component برای اثبات معماری State ساخته شده:
 *
 *   State       →  this.state.open (CoreObservable.App)
 *   Method      →  toggle() / open() / close()  (Runtime API)
 *   Methods     →  onToggle / onOpen / onClose   (آرگومان دوم)
 *   Rendering   →  مستقیم با CoreReactive (بدون Schema/Handler)
 *   Composition →  content (بدنه) — مصرف‌کننده می‌تواند دکمه Toggle
 *                  را با collapse.toggle() به State وصل کند
 *
 * معیار موفقیت پلن (بخش 18):
 *
 *   const collapse = new ComponentCollapse(
 *       {content: () => ReactiveApp.button({
 *           children: ["Toggle"],
 *           on: {click: () => collapse.toggle()},
 *       })},
 *       {},
 *   );
 */
export class ComponentCollapse<
    TProp   extends ComponentCollapseProps   = ComponentCollapseProps,
    TSchema extends ComponentCollapseSchema  = ComponentCollapseSchema,
    TMethod extends ComponentCollapseMethods = ComponentCollapseMethods
> extends ComponentBase<TProp, TSchema, TMethod> {


    /* ---------------------------------------------
       State — وضعیت باز/بسته
    --------------------------------------------- */
    protected readonly state = {

        /** باز بودن Collapse */
        open: new CoreObservable.App<boolean>(false),

    };


    constructor(props: TProp, methods: TMethod, identity?: Partial<ComponentIdentity>) {
        super(props, methods, identity);

        // مقدار اولیه از props
        const initial = this.prop("open");

        if (CoreObservable.App.isObservable(initial)) {
            initial.subscribe((value: boolean) => {
                this.state.open.set(value);
            });
        }
        else if (typeof initial === "boolean") {
            this.state.open.set(initial);
        }
    }


    /* ---------------------------------------------
       render — header + body
       body با state.open نمایش/مخفی می‌شود (Reactive)
    --------------------------------------------- */
    protected render(): CoreReactive.App {

        const headerTitle =
            this.prop("headerTitle") ?? "Collapse";

        const classList =
            this.bindProp("classList");

        return CoreReactive.App.part(
            "section",
            {
                classBind: [
                    classList,
                ],
                className: [
                    "collapse-component",
                ],
                children: [
                    // ---- Header ----
                    CoreReactive.App.part(
                        "header",
                        {
                            className: [
                                "collapse-header",
                                "p-2",
                                "bg-light",
                                "border",
                            ],
                            on: {
                                click: () => this.toggle(),
                            },
                            children: [
                                headerTitle,
                            ],
                        }
                    ),
                    // ---- Body ----
                    CoreReactive.App.part(
                        "section",
                        {
                            className: [
                                "collapse-body",
                                "p-2",
                                "border",
                                "border-top-0",
                            ],
                            classBind: [
                                this.state.open.mapBoolean("show", "d-none"),
                            ],
                            children: this.renderContent(),
                        }
                    ),
                ],
            }
        );
    }


    /* ---------------------------------------------
       renderContent — Composition Point (بدنه)
    --------------------------------------------- */
    protected renderContent(): CoreReactive.App[] {

        const content = this.prop("content");

        if (typeof content !== "function") {
            return [];
        }

        const result = (content as ComponentCollapseProps["content"])();

        if (!result) {
            return [];
        }

        return Array.isArray(result)
            ? result
            : [result];
    }


    /* ---------------------------------------------
       Runtime Methods — State API
       public تا مصرف‌کننده بتواند collapse.toggle() صدا بزند
       (مطابق معیار موفقیت پلن — بخش 18)
    --------------------------------------------- */
    toggle(): void {
        this.state.open.set(!this.state.open.get());

        // اطلاع بهmethods (آرگومان دوم)
        const onToggle = this.method("onToggle");
        if (typeof onToggle === "function") {
            onToggle(this.state.open.get());
        }
    }

    open(): void {
        this.state.open.set(true);

        const onOpen = this.method("onOpen");
        if (typeof onOpen === "function") {
            onOpen();
        }
    }

    close(): void {
        this.state.open.set(false);

        const onClose = this.method("onClose");
        if (typeof onClose === "function") {
            onClose();
        }
    }

    isOpen(): boolean {
        return this.state.open.get();
    }


}