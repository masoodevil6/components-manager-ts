import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentIconBase}      from "./ComponentIconBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as IconPropsConfigType} from "./Props";
import {createIconStep}                   from "./Step";


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
 *
* هر prop در config می‌تواند مقدار خام یا Observable باشد (PropsConfigType) —
* معماری renderComponent هر دو را می‌پذیرد (if Observable → store directly).
* این امکان Component والد (مثل ComponentButton) را می‌دهد propها را به‌صورت
* Observable از _COMPONENT_PROPS_BIND خودش به‌طور reactive forward کند.
*
 * Plan 8.2.7 — Step داخلی در constructor ساخته می‌شود (نه در render cycle).
 *   هر Instance Step خودش را دارد (createIconStep factory) — identity یکتا،
 *   تداخل در registerEmit رفع شد.
 *   Base در constructor از طریق CoreEvent.SubEvent آن را به Parent Step متصل می‌کند.
 *
 * Plan 9.1 — Event Scope Ownership:
 *   هر ComponentIcon مالک Step Instance خودش است.
 *   disposal فقط Event resources متعلق به همین Component را آزاد می‌کند.
 *
 * Plan 8.2.10 — renderContentComponent از Trait استفاده می‌کند:
 *   ComponentStructureTrait.renderContent(this, () => this.renderIcon())
 *   Trait نام کامپوننت را از this._COMPONENT_NAME می‌خواند و به
 *   ComponentStructure.create(componentName, ...) پاس می‌دهد.
 *   خروجی: <component-icon><section>...</section></component-icon>
 */
 export class ComponentIcon extends ComponentIconBase {

  constructor(
     config?:  Partial<StructurePropsType & IconPropsConfigType>,
      methods?: MethodsConfigType<ComponentIcon>,
      identity?: {
          unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createIconStep();
        super("icon", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }



    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ICON.part);
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra:        any,
    ): CoreReactive.App {
        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.ICON.part:
                return this.renderIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    protected renderIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
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
            unique: this._COMPONENT_STEP?.click,
            emit: (request) => {
                return { value: prop_icon.get(), valid: true };
            },
            on: {
                click: (event: Event) => {
                    event.preventDefault();
                    this.executeMethod("CLICK", event, {});
                },
                // hover/blur: DOM → Method API (بدون Event Engine routing)
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
