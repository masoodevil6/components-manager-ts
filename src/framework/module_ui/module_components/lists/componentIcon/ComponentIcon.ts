import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
// --------------------------------
import {ComponentIconBase}      from "./ComponentIconBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsType as IconPropsType}      from "./Props";


/**
 * ComponentIcon — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentIcon HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderIcon (محتوای اختصاصی ComponentIcon)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه (classList, prop_show, ...) + propهای اختصاصی (prop_icon, ...)
 *   methods — methodهای اختصاصی (CLICK, HOVER, BLUR)
 *   identity — { unique?, emit?, events? }
 */
export class ComponentIcon extends ComponentIconBase {

    constructor(
        config?:  Partial<StructurePropsType & IconPropsType>,
        methods?: MethodsConfigType<ComponentIcon>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        super("icon", null);

        // identity را manual set می‌کنیم (ClComponentBase constructor identity نمی‌گیرد)
        this._COMPONENT_UNIQUE = identity?.unique ?? null;
        this._COMPONENT_EMIT   = identity?.emit ?? null;

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       renderContentComponent — ساخت ComponentStructure
       با content = renderIcon (محتوای اختصاصی ComponentIcon)

       پیاده‌سازی از طریق ComponentStructureTrait —
       Trait مسئول ساخت ComponentStructure و forward propهای پایه است.
       Component فقط content اختصاصی خود را تعیین می‌کند.
    --------------------------------------------- */
    override renderContentComponent(): CoreReactive.App {
        return ComponentStructureTrait.renderContent(
            this,
            () => this.renderIcon(),
        );
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       partهای اختصاصی ComponentIcon را مدیریت می‌کند.
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {

        switch (partName) {
            case Schemas.ICON.part:
                // renderContentComponent یک ComponentStructure می‌سازد
                // با content = renderIcon — این یعنی prop_show / classList / etc.
                // از ComponentIcon به ComponentStructure forward می‌شوند.
                return this.renderContentComponent();
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderIcon — رندر Part ICON
       <i> با title + styles + class + event handlers + icon
    --------------------------------------------- */
    protected renderIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {

        const prop_icon       = data?.["prop_icon"]       ?? this._COMPONENT_PROPS_BIND.prop_icon;
        const prop_iconTitle  = data?.["prop_iconTitle"]  ?? this._COMPONENT_PROPS_BIND.prop_iconTitle;
        const prop_iconClass  = data?.["prop_iconClass"]  ?? this._COMPONENT_PROPS_BIND.prop_iconClass;
        const prop_iconStyles = data?.["prop_iconStyles"] ?? this._COMPONENT_PROPS_BIND.prop_iconStyles;

        return CoreReactive.App.i({
            attrs: {
                ...attrsDefault,
            },
            attrsBind: {
                title: prop_iconTitle,
            },
            stylesBind: prop_iconStyles,
            classBind: [
                prop_iconClass,
            ],
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
                mouseenter: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("HOVER", event, {});
                },
                mouseleave: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("BLUR", event, {});
                },
            },
            children: [
                prop_icon,
            ],
        });
    }

}
