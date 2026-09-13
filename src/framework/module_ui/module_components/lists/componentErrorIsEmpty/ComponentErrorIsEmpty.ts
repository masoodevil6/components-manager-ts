import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as CoreLanguage   from "@/core_languages";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentErrorIsEmptyBase}  from "./ComponentErrorIsEmptyBase";
import {createErrorIsEmptyStep}    from "./Step";
import {Schemas}                   from "./Schemas";
import {MethodsConfigType}         from "./Methods";
import {PropsType}                 from "./Props";
import {PartAttrDefault}           from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as ErrorIsEmptyPropsConfigType} from "./Props";
import {Keys}                         from "../../../module_categories/languages";
// --------------------------------
import * as ComponentBorder  from "../componentBorder";
import * as ComponentIcon    from "../componentIcon";
import * as ComponentButton  from "../componentButton";
import {ButtonVariants, ButtonSemantic} from "../componentButton/Props";


/**
 * ComponentErrorIsEmpty — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentErrorIsEmpty HAS-A ComponentBorder (نه IS-A)
 *   ComponentBorder در renderBorder از طریق مستقیم
 *   new ComponentBorder.Component ساخته می‌شود.
 *   ComponentIcon در renderBorderContentIcon از طریق مستقیم ساخته می‌شود.
 *   ComponentButton در renderBorderContentBtn از طریق مستقیم ساخته می‌شود.
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (BTN_CLICK)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-error-is-empty> + <section> از Schema پایه رندر می‌شود.
 *
 * بازیابی Behavior از Legacy:
 *   - icon نمایش warning
 *   - title نمایش پیام خطا
 *   - button retry با BTN_CLICK method
 *   - fontSize واکنش‌گرا → computed روی CoreConfig.Settings.SizeName
 */
export class ComponentErrorIsEmpty extends ComponentErrorIsEmptyBase {

    constructor(
        config?:  Partial<StructurePropsType & ErrorIsEmptyPropsConfigType>,
        methods?: MethodsConfigType<ComponentErrorIsEmpty>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createErrorIsEmptyStep();

        super("error-is-empty", null, identity, step);

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
        return this.executeSchemaPart(Schemas.FORM.part, {});
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
            case Schemas.FORM.part:
                return this.renderForm(attrsDefault, data, extra);
            case Schemas.BORDER.part:
                return this.renderBorder(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT.part:
                return this.renderBorderContent(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_ICON.part:
                return this.renderBorderContentIcon(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TITLE.part:
                return this.renderBorderContentTitle(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_BTN.part:
                return this.renderBorderContentBtn(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderForm — رندر Part FORM اصلی
    --------------------------------------------- */
    protected renderForm(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(Schemas.BORDER.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderBorder — Composition: ComponentBorder
    --------------------------------------------- */
    protected renderBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_borderClass  = data?.["prop_borderClass"]  ?? bind.prop_borderClass;
        const prop_borderStyles = data?.["prop_borderStyles"] ?? bind.prop_borderStyles;
        const prop_borderColor  = data?.["prop_borderColor"]  ?? bind.prop_borderColor;

        return new ComponentBorder.Component(
            {
                prop_borderClass:    prop_borderClass,
                prop_borderStyles:   prop_borderStyles,
                prop_borderColor:    prop_borderColor,
                prop_content:        this.executeSchemaPart(Schemas.BORDER_CONTENT.part),
            } as any,
            {},
        ).getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderBorderContent — section + children [ICON, TITLE, BTN]
    --------------------------------------------- */
    protected renderBorderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: { textAlign: "center" },
            children: [
                this.executeSchemaPart(Schemas.BORDER_CONTENT_ICON.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TITLE.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_BTN.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderBorderContentIcon — Composition: ComponentIcon
    --------------------------------------------- */
    protected renderBorderContentIcon(
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
                        size:          80,
                        primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_1),
                        secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_4),
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
       renderBorderContentTitle — section + <b> + computed styles
    --------------------------------------------- */
    protected renderBorderContentTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_title       = data?.["prop_title"]       ?? bind.prop_title;
        const prop_titleColor  = data?.["prop_titleColor"]  ?? bind.prop_titleColor;
        const prop_titleClass  = data?.["prop_titleClass"]  ?? bind.prop_titleClass;
        const prop_titleStyles = data?.["prop_titleStyles"] ?? bind.prop_titleStyles;

        const contentFontSize = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const contentHeight = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes) => UtilStyle.Css_IconSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const stylesMerged = CoreObservable.App.computed(
            (styleMap, color, fs, h) => ({
                lineHeight: h,
                fontSize:   fs,
                ...(styleMap ?? {}),
                ...(color != null ? { color } : {}),
            }),
            [prop_titleStyles, prop_titleColor, contentFontSize, contentHeight],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: stylesMerged,
            classBind: [prop_titleClass as any],
            children: [
                CoreReactive.App.b({
                    children: [prop_title as any],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       renderBorderContentBtn — Composition: ComponentButton
       رندر شرطی بر اساس prop_btnHas
    --------------------------------------------- */
    protected renderBorderContentBtn(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_btnHas    = data?.["prop_btnHas"]    ?? bind.prop_btnHas;
        const prop_btnClass  = data?.["prop_btnClass"]  ?? bind.prop_btnClass;
        const prop_btnStyles = data?.["prop_btnStyles"] ?? bind.prop_btnStyles;
        const prop_btnTitle   = data?.["prop_btnTitle"]   ?? bind.prop_btnTitle;
        const prop_btnIcon    = data?.["prop_btnIcon"]    ?? bind.prop_btnIcon;

        const translatedTitle = CoreLanguage.App.translate(
            Keys.category.components.errorIsEmpty.texts.btnTitle,
        );

        const btnTitle = CoreObservable.App.computed(
            (title, translated) => title != null ? title : translated,
            [prop_btnTitle, translatedTitle],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (hasBtn: boolean) => {
                if (!hasBtn) return this.renderEmptyContent(attrsDefault);

                return new ComponentButton.Component(
                    {
                        classList:        ["mt-2", "mx-auto", "text-nowrap"],
                        prop_btnClass:    prop_btnClass as any,
                        prop_btnStyles:   prop_btnStyles as any,
                        prop_btnTitle:    btnTitle as any,
                        prop_btnIcon:     prop_btnIcon as any,
                        prop_btnWidth:    "fit-content",
                        prop_btnVariant:  ButtonVariants.SECONDARY,
                        prop_btnSemantic: ButtonSemantic.CANCEL,
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.executeMethod("BTN_CLICK", event, {});
                        },
                    } as any,
                    {
                        unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
                    },
                ).getReactiveElement() as CoreReactive.App;
            },
            [prop_btnHas],
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
