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
 * ComponentWebCode â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentWebCode HAS-A ComponentIcon + ComponentButton (Ù†Ù‡ IS-A)
 *   ComponentIcon Ø¯Ø± renderContentBlurPositionIcon Ø§Ø² Ø·Ø±ÛŒÙ‚ Ù…Ø³ØªÙ‚ÛŒÙ… Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *   ComponentButton Ø¯Ø± renderContentBlurPositionRetry Ø§Ø² Ø·Ø±ÛŒÙ‚ Ù…Ø³ØªÙ‚ÛŒÙ… Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (RETRY_CLICK)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 9.1 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ (factory function).
 * Plan 11.2 â€” Ù„Ø§ÛŒÙ‡ <component-web-code> + <section> Ø§Ø² Schema Ù¾Ø§ÛŒÙ‡ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Behavior Ø§Ø² Legacy:
 *   - icon Ù†Ù…Ø§ÛŒØ´ web code (Ù…Ø«Ù„Ø§Ù‹ 404)
 *   - blur background Ø¨Ø§ Ø±Ù†Ú¯ Ù‚Ø§Ø¨Ù„ ØªÙ†Ø¸ÛŒÙ…
 *   - retry button Ø¨Ø§ RETRY_CLICK method
 *   - position center Ø¨Ø§ absolute + transform
 */
export class ComponentWebCode extends ComponentWebCodeBase<ReturnType<typeof createWebCodeStep>>{

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
       Plan 9.1 â€” Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CONTENT.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
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
       renderContent â€” Ø±Ù†Ø¯Ø± Part CONTENT Ø§ØµÙ„ÛŒ
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
                height:     UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                minWidth:   "0",
                minHeight:  "0",
                boxSizing:  "border-box",
                overflow:   "hidden",
                position:   "relative",
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlur â€” blur background layer
       Legacy: template_render_content_blur (ComponentElementPosition FIX)
       Ø¬Ø§ÛŒÚ¯Ø²ÛŒÙ† Ø¨Ø§ inline absolute positioning
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
                height:         UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                minWidth:       "0",
                minHeight:      "0",
                boxSizing:      "border-box",
                overflow:       "hidden",
                display:        "flex",
                justifyContent:  "center",
                alignItems:      "center",
                position:       "absolute",
                inset:          "0",
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
       renderContentBlurPosition â€” centered position wrapper
       Legacy: template_render_content_blur_position (ComponentElementPosition ABSOLUTE)
       Ø¬Ø§ÛŒÚ¯Ø²ÛŒÙ† Ø¨Ø§ inline absolute + transform centering
    --------------------------------------------- */
    protected renderContentBlurPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                justifyContent:"center",
                width:         UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                height:        UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                minWidth:      "0",
                minHeight:     "0",
                boxSizing:     "border-box",
                overflow:      "hidden",
                zIndex:        String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_blur)),
                textAlign:     "center",
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR_POSITION_ICON.part, {}),
                this.executeSchemaPart(Schemas.CONTENT_BLUR_POSITION_RETRY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlurPositionIcon â€” Composition: ComponentIcon
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

                const icon = UiIcons.CreateIcon(iconSource as any, {size: 250});
                const svg = icon.getElement() as unknown as SVGSVGElement | null;
                if (svg?.tagName.toLowerCase() === "svg") {
                    Object.assign(svg.style, {
                        display: "block",
                        width: "100%",
                        height: "100%",
                        maxWidth: "250px",
                        maxHeight: "250px",
                        minWidth: "0",
                        minHeight: "0",
                        flex: "0 1 auto",
                    });
                }

                const responsiveIconStyles = CoreObservable.App.computed(
                    (styles: Record<string, string> | null) => ({
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        minHeight: "0",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        ...(styles ?? {}),
                    }),
                    [prop_iconStyles],
                    this.getScope(),
                );

                return new ComponentIcon.Component({
                    styles:          {
                        display: "flex",
                        flex: "1 1 auto",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        minHeight: "0",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    },
                    prop_structureStyles: {
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        minWidth: "0",
                        minHeight: "0",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                    },
                    prop_icon:       icon,
                    prop_iconClass:  prop_iconClass as any,
                    prop_iconStyles: responsiveIconStyles as any,
                }, {}).getReactiveElement() as CoreReactive.App;
            },
            [prop_icon],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderContentBlurPositionRetry â€” Composition: ComponentButton
       Ø±Ù†Ø¯Ø± Ø´Ø±Ø·ÛŒ Ø¨Ø± Ø§Ø³Ø§Ø³ prop_btnRetryHas
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
        const prop_hasBtnClose   = data?.["prop_hasBtnClose"]   ?? bind.prop_hasBtnClose;

        const translatedTitle = CoreLanguage.App.translate(
            Keys.category.components.errorIsEmpty.texts.btnTitle,
        );

        const btnTitle = CoreObservable.App.computed(
            (title, translated) => title != null ? title : translated,
            [prop_btnRetryTitle, translatedTitle],
            this.getScope(),
        );
        const btnStyles = CoreObservable.App.computed(
            (sizeName) => ({
                marginBottom: UtilStyle.Css_Margin(sizeName),
            }),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const actionGap = CoreObservable.App.computed(
            (styles: Record<string, string>) => styles.marginBottom,
            [btnStyles],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (hasRetry: boolean, hasClose: boolean, gap: string) => {
                if (!hasRetry && !hasClose) return this.renderEmptyContent(attrsDefault);

                const buttons: CoreReactive.App[] = [];
                if (hasRetry) {
                    buttons.push(new ComponentButton.Component(
                        {
                            classList:        ["text-nowrap"],
                            styles:           { display: "inline-flex", width: "auto" },
                            prop_structureStyles: { display: "inline-flex", width: "auto" },
                            prop_btnClass:    prop_btnRetryClass as any,
                            prop_btnStyles:   btnStyles as any,
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
                    ).getReactiveElement() as CoreReactive.App);
                }

                if (hasClose) {
                    buttons.push(new ComponentButton.Component(
                        {
                            classList: ["text-nowrap"],
                            styles: {display: "inline-flex", width: "auto"},
                            prop_structureStyles: {display: "inline-flex", width: "auto"},
                            prop_btnTitle: "",
                            prop_btnIcon: UiIcons.Src.FileWindowClose.Definition,
                            prop_btnVariant: ButtonVariants.ICON,
                            prop_btnSemantic: ButtonSemantic.CANCEL,
                            prop_btnType: ButtonAction.BUTTON,
                            prop_btnStyles: btnStyles as any,
                        } as any,
                        {
                            CLICK: () => this._COMPONENT_PROPS_BIND.prop_show.set(false),
                        } as any,
                    ).getReactiveElement() as CoreReactive.App);
                }

                return CoreReactive.App.section({
                    attrs: {...attrsDefault},
                    styles: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap,
                    },
                    children: buttons,
                });
            },
            [prop_btnRetryHas, prop_hasBtnClose, actionGap],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderEmptyContent â€” fallback Ø®Ø§Ù„ÛŒ
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}
