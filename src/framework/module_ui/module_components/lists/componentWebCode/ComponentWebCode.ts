import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as CoreLanguage   from "@/core_languages";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentWebCodeBase}  from "./ComponentWebCodeBase";
import {createWebCodeStep}     from "./Step";
import {Schemas}               from "./Schemas";
import {MethodsConfigType}    from "./Methods";
import {PropsType}             from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as WebCodePropsConfigType} from "./Props";
// --------------------------------
import * as ComponentIcon    from "../componentIcon";
import * as ComponentButton  from "../componentButton";
import {ButtonVariants, ButtonSemantic, ButtonAction} from "../componentButton/Props";
import {Keys}                         from "../../../module_categories/languages";


/**
 * ComponentWebCode — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentWebCode HAS-A ComponentIcon + ComponentButton (نه IS-A)
 *   ComponentIcon در renderContentBlurPositionIcon از طریق مستقیم ساخته می‌شود.
 *   ComponentButton در renderContentBlurPositionRetry از طریق مستقیم ساخته می‌شود.
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (RETRY_CLICK)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-web-code> + <section> از Schema پایه رندر می‌شود.
 *
 * بازیابی Behavior از Legacy:
 *   - icon نمایش web code (مثلاً 404)
 *   - blur background با رنگ قابل تنظیم
 *   - retry button با RETRY_CLICK method
 *   - position center با absolute + transform
 */
export class ComponentWebCode extends ComponentWebCodeBase {

    constructor(
        config?:  Partial<StructurePropsType & WebCodePropsConfigType>,
        methods?: MethodsConfigType<ComponentWebCode>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createWebCodeStep();

        super("web-code", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 9.1 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CONTENT.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.CONTENT.part:
                return this.renderContent(attrsDefault, data, extra);
            case Schemas.CONTENT_BLUR.part:
                return this.renderContentBlur(attrsDefault, data, extra);
            case Schemas.CONTENT_BLUR_POSITION.part:
                return this.renderContentBlurPosition(attrsDefault, data, extra);
            case Schemas.CONTENT_BLUR_POSITION_ICON.part:
                return this.renderContentBlurPositionIcon(attrsDefault, data, extra);
            case Schemas.CONTENT_BLUR_POSITION_RETRY.part:
                return this.renderContentBlurPositionRetry(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderContent — رندر Part CONTENT اصلی
    --------------------------------------------- */
    protected renderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                width:      UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                minHeight:  "300px",
                position:   "relative",
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlur — blur background layer
       Legacy: template_render_content_blur (ComponentElementPosition FIX)
       جایگزین با inline absolute positioning
    --------------------------------------------- */
    protected renderContentBlur(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_background = data?.["prop_background"] ?? bind.prop_background;

        const bgColor = CoreObservable.App.computed(
            (bg) => bg,
            [prop_background],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                width:          UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                minHeight:      "300px",
                display:        "flex",
                justifyContent:  "center",
                alignItems:      "center",
                position:       "absolute",
                top:            "0",
                left:           "0",
                zIndex:         String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.blur_popup)),
            },
            stylesBind: {
                backgroundColor: bgColor,
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR_POSITION.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlurPosition — centered position wrapper
       Legacy: template_render_content_blur_position (ComponentElementPosition ABSOLUTE)
       جایگزین با inline absolute + transform centering
    --------------------------------------------- */
    protected renderContentBlurPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                display:    "flex",
                flexDirection: "column",
                alignItems:  "center",
                zIndex:     String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_blur)),
                textAlign:  "center",
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR_POSITION_ICON.part, {}),
                this.executeSchemaPart(Schemas.CONTENT_BLUR_POSITION_RETRY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlurPositionIcon — Composition: ComponentIcon
    --------------------------------------------- */
    protected renderContentBlurPositionIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_icon       = data?.["prop_icon"]       ?? bind.prop_icon;
        const prop_iconClass  = data?.["prop_iconClass"]  ?? bind.prop_iconClass;
        const prop_iconStyles = data?.["prop_iconStyles"] ?? bind.prop_iconStyles;

        return CoreObservable.App.computed(
            (iconSource) => {
                if (iconSource == null) return this.renderEmptyContent(attrsDefault);

                return new ComponentIcon.Component({
                    prop_icon:       UiIcons.CreateIcon(iconSource as any, {
                        size:          250,
                    }),
                    prop_iconClass:  prop_iconClass as any,
                    prop_iconStyles: prop_iconStyles as any,
                }, {}).getReactiveElement() as CoreReactive.App;
            },
            [prop_icon],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderContentBlurPositionRetry — Composition: ComponentButton
       رندر شرطی بر اساس prop_btnRetryHas
    --------------------------------------------- */
    protected renderContentBlurPositionRetry(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnRetryHas   = data?.["prop_btnRetryHas"]   ?? bind.prop_btnRetryHas;
        const prop_btnRetryTitle = data?.["prop_btnRetryTitle"] ?? bind.prop_btnRetryTitle;
        const prop_btnRetryClass = data?.["prop_btnRetryClass"] ?? bind.prop_btnRetryClass;
        const prop_btnRetryIcon  = data?.["prop_btnRetryIcon"]  ?? bind.prop_btnRetryIcon;

        const translatedTitle = CoreLanguage.App.translate(
            Keys.category.components.errorIsEmpty.texts.btnTitle,
        );

        const btnTitle = CoreObservable.App.computed(
            (title, translated) => title != null ? title : translated,
            [prop_btnRetryTitle, translatedTitle],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (hasBtn: boolean) => {
                if (!hasBtn) return this.renderEmptyContent(attrsDefault);

                return new ComponentButton.Component(
                    {
                        classList:        ["mt-2", "text-nowrap"],
                        styles:           { display: "inline-flex", width: "auto" },
                        prop_structureStyles: { display: "inline-flex", width: "auto" },
                        prop_btnClass:    prop_btnRetryClass as any,
                        prop_btnTitle:    btnTitle as any,
                        prop_btnIcon:     prop_btnRetryIcon as any,
                        prop_btnVariant:  ButtonVariants.SECONDARY,
                        prop_btnSemantic: ButtonSemantic.CANCEL,
                        prop_btnType:     ButtonAction.BUTTON,
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.executeMethod("RETRY_CLICK", event, {});
                        },
                    } as any,
                    {
                        unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
                    },
                ).getReactiveElement() as CoreReactive.App;
            },
            [prop_btnRetryHas],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderEmptyContent — fallback خالی
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}
