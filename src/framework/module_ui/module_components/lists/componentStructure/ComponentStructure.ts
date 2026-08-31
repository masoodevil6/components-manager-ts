import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfigs    from "@/core_configs";
// --------------------------------
import {ComponentBase}     from "@/core_components";
import type {
    ComponentPropConfig,
    ComponentSchemaConfig,
    ComponentMethodConfig,
    ComponentIdentity,
}                          from "@/core_components";


/**
 * ComponentStructureProps — Props اختصاصی ComponentStructure (آرگومان اول)
 *
 * ترکیبی از گزینه‌های ساختاری + propهای اختصاصی + Composition Point
 *
 * @example
 *   new ComponentStructure(
 *       {
 *           classList:  ["p-2", "border"],
 *           structureClass: ["bg-light", "rounded"],
 *           content:    () => ReactiveApp.button({children: ["Toggle"]}),
 *       },
 *       methods,
 *       identity,
 *   );
 */
export type ComponentStructureProps = ComponentPropConfig & {

    /** structureClass — کلاس‌های Reactive لایه Structure */
    structureClass?:  string[] | CoreObservable.App<string[]>;

    /** structureStyles — استایل‌های Reactive لایه Structure */
    structureStyles?: Record<string, string> | CoreObservable.App<Record<string, string>>;

    /** Composition Point — محتوای داخل Structure */
    content?:         () => CoreReactive.App | CoreReactive.App[] | null;

};


/**
 * ComponentStructureSchema — Schema اختصاصی (جنریک دوم — فقط Metadata)
 */
export type ComponentStructureSchema = ComponentSchemaConfig & {

    /** Metadata بخش‌های Structure — برای Scope/مستندسازی */
    sections?: Record<string, any>;

};


/**
 * ComponentStructureMethods — Methods اختصاصی (آرگومان دوم)
 */
export type ComponentStructureMethods = ComponentMethodConfig & {

    /** کال‌بک تغییر وضعیت نمایش (اختیاری) */
    onShowChange?: (show: boolean) => void;

};


/**
 * ComponentStructure — Component عمومی برای ساخت یک Structure قابل استفاده
 *
 * بر اساس پلن 6.1 (قرارداد سه‌آرگومانی):
 *   - extends ComponentBase از Core (سه‌جنریکی)
 *   - constructor(props, methods, identity)
 *   - خودش State (prop observables) و Rendering خودش را دارد
 *   - content یک Composition Point است — نه Prop و نه Schema Handler
 *   - بدون SchemaHandler، بدون renderManagerComponent، بدون Routing
 *
 * @example
 *   const structure = new ComponentStructure(
 *       {classList: ["p-2", "border"], content: () => ReactiveApp.button({children: ["Toggle"]})},
 *       {},
 *       {events: {click: handler}},
 *   );
 *
 *   document.body.append(structure.getElement()!);
 */
export class ComponentStructure<
    TProp   extends ComponentStructureProps   = ComponentStructureProps,
    TSchema extends ComponentStructureSchema  = ComponentStructureSchema,
    TMethod extends ComponentStructureMethods = ComponentStructureMethods
> extends ComponentBase<TProp, TSchema, TMethod> {


    /* ---------------------------------------------
       State — observable های internal این Component
       (دسترسی protected برای فرزندهایی که گسترش می‌دهند)
    --------------------------------------------- */
    protected readonly state = {

        /** نمایش/عدم نمایش Structure */
        show: new CoreObservable.App<boolean>(true),

    };


    /* ---------------------------------------------
       render — ساخت مستقیم ReactiveElement بدون Schema
       لایه خارجی: <component-structure> با RTL + classList + styles
       لایه داخلی:  <section> با show/hide + structureClass + structureStyles
    --------------------------------------------- */
    protected render(): CoreReactive.App {

        const rtl =
            CoreConfigs.Settings.DirectionRtl.observable();

        const classList =
            this.bindProp("classList");

        const styles =
            this.bindProp("styles");

        const structureClass =
            this.bindProp("structureClass");

        const structureStyles =
            this.bindProp("structureStyles");

        return CoreReactive.App.component(
            "structure",
            {
                classBind: [
                    classList,
                ],
                stylesBind: {
                    direction: rtl.mapBoolean("rtl", "ltr"),
                    styles:    styles,
                },
                children: [
                    CoreReactive.App.part(
                        "section",
                        {
                            classBind: [
                                structureClass,
                                this.state.show.mapBoolean("show", "d-none"),
                            ],
                            stylesBind: {
                                structureStyles: structureStyles,
                            },
                            children: this.renderContent(),
                        }
                    ),
                ],
            }
        );
    }


    /* ---------------------------------------------
       renderContent — اجرای Composition Point
    --------------------------------------------- */
    protected renderContent(): CoreReactive.App[] {

        const content = this.prop("content");

        if (typeof content !== "function") {
            return [];
        }

        const result = (content as ComponentStructureProps["content"])();

        if (!result) {
            return [];
        }

        return Array.isArray(result)
            ? result
            : [result];
    }


    /* ---------------------------------------------
       show / hide — Runtime Methods (State API)
    --------------------------------------------- */
    show(): void {
        this.state.show.set(true);
    }

    hide(): void {
        this.state.show.set(false);
    }

    toggle(): void {
        this.state.show.set(!this.state.show.get());
    }


}