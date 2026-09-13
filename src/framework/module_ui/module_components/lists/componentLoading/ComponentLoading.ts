import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentLoadingBase}  from "./ComponentLoadingBase";
import {Schemas}                from "./Schemas";
import {MethodsType,
        MethodsConfigType}      from "./Methods";
import {LoadingType, Props}     from "./Props";
import {PartAttrDefault}        from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as LoadingPropsConfigType} from "./Props";
import {createLoadingStep}               from "./Step";
// --------------------------------
import * as ComponentIcon from "../componentIcon";


/**
 * ComponentLoading — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentLoading HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderLoading (محتوای اختصاصی ComponentLoading)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی (prop_type, prop_icon, ...)
 *   methods — methodهای اختصاصی (CANCEL)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 8.2.7 — Step داخلی در constructor ساخته می‌شود (نه در render cycle).
 * Plan 11.2 — لایه <component-loading> + <section> از Schema پایه رندر می‌شود.
 *
 * بازیابی Behavior از Legacy:
 *   - انیمیشن لودینگ دایره‌ای (CSS ring یا آیکون سفارشی)
 *   - دکمه لغو با تاخیر نمایش
 *   - background shadow برای overlay
 */
export class ComponentLoading extends ComponentLoadingBase {

    /**
     * Timer ID برای cancel button delay
     */
    private _cancelTimerId: ReturnType<typeof setTimeout> | null = null;


    constructor(
        config?:  Partial<StructurePropsType & LoadingPropsConfigType>,
        methods?: MethodsConfigType<ComponentLoading>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createLoadingStep();

        super("loading", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );

        this.fn_injectStyles();
    }


    /* ---------------------------------------------
       Plan 9.1 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        if (this._cancelTimerId !== null) {
            clearTimeout(this._cancelTimerId);
            this._cancelTimerId = null;
        }
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.LOADING.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent — Routing
       Plan 11.2 — COMPONENT + STRUCTURE از Trait، بقیه اختصاصی
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.LOADING.part:
                return this.renderLoading(attrsDefault, data, extra);
            case Schemas.CANCEL_BTN.part:
                return this.renderCancelBtn(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderLoading — رندر Part LOADING اصلی
    --------------------------------------------- */
    protected renderLoading(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_type              = data?.["prop_type"]              ?? bind.prop_type;
        const prop_icon              = data?.["prop_icon"]              ?? bind.prop_icon;
        const prop_loadingWidth      = data?.["prop_loadingWidth"]      ?? bind.prop_loadingWidth;
        const prop_loadingHeight     = data?.["prop_loadingHeight"]     ?? bind.prop_loadingHeight;
        const prop_backgroundLoading = data?.["prop_backgroundLoading"] ?? bind.prop_backgroundLoading;
        const prop_backgroundShadow  = data?.["prop_backgroundShadow"]  ?? bind.prop_backgroundShadow;

        const typeValue = prop_type instanceof CoreObservable.App ? prop_type.get() : prop_type;
        const iconValue = prop_icon instanceof CoreObservable.App ? prop_icon.get() : prop_icon;
        const widthValue = (prop_loadingWidth instanceof CoreObservable.App ? prop_loadingWidth.get() : prop_loadingWidth) ?? 80;
        const heightValue = (prop_loadingHeight instanceof CoreObservable.App ? prop_loadingHeight.get() : prop_loadingHeight) ?? 80;
        const bgLoadingValue = (prop_backgroundLoading instanceof CoreObservable.App ? prop_backgroundLoading.get() : prop_backgroundLoading) ?? "";
        const bgShadowValue = (prop_backgroundShadow instanceof CoreObservable.App ? prop_backgroundShadow.get() : prop_backgroundShadow) ?? "";

        if (typeValue === LoadingType.CIRCLE) {
            const ringSize = widthValue;
            const ringHeight = heightValue;
            const animName = `lds-ring-${(this as any)._COMPONENT_RANDOM_ID ?? "default"}`;

            const loadingChildren: any[] = [];

            if (iconValue != null) {
                loadingChildren.push(
                    new ComponentIcon.Component({
                        prop_icon: UiIcons.CreateIcon(iconValue as any, {
                            size: Math.min(ringSize, ringHeight),
                            primaryColor: bgLoadingValue,
                        }),
                    }, {}).getElement(),
                );
            } else {
                const divSize = widthValue - 16;
                const divHeight = heightValue - 16;

                loadingChildren.push(
                    CoreReactive.App.div({
                        className: ["position-relative"],
                        styles: {
                            display: "inline-block",
                            width: `${ringSize}px`,
                            height: `${ringHeight}px`,
                            color: bgLoadingValue,
                            zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_blur)),
                        },
                        children: [
                            CoreReactive.App.div({
                                styles: {
                                    boxSizing: "border-box",
                                    display: "block",
                                    position: "absolute",
                                    width: `${divSize}px`,
                                    height: `${divHeight}px`,
                                    margin: "8px",
                                    border: "8px solid currentColor",
                                    borderRadius: "50%",
                                    animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                    borderColor: "currentColor transparent transparent transparent",
                                    animationDelay: "-0.45s",
                                },
                            }),
                            CoreReactive.App.div({
                                styles: {
                                    boxSizing: "border-box",
                                    display: "block",
                                    position: "absolute",
                                    width: `${divSize}px`,
                                    height: `${divHeight}px`,
                                    margin: "8px",
                                    border: "8px solid currentColor",
                                    borderRadius: "50%",
                                    animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                    borderColor: "currentColor transparent transparent transparent",
                                    animationDelay: "-0.3s",
                                },
                            }),
                            CoreReactive.App.div({
                                styles: {
                                    boxSizing: "border-box",
                                    display: "block",
                                    position: "absolute",
                                    width: `${divSize}px`,
                                    height: `${divHeight}px`,
                                    margin: "8px",
                                    border: "8px solid currentColor",
                                    borderRadius: "50%",
                                    animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                    borderColor: "currentColor transparent transparent transparent",
                                    animationDelay: "-0.15s",
                                },
                            }),
                            CoreReactive.App.div({
                                styles: {
                                    boxSizing: "border-box",
                                    display: "block",
                                    position: "absolute",
                                    width: `${divSize}px`,
                                    height: `${divHeight}px`,
                                    margin: "8px",
                                    border: "8px solid currentColor",
                                    borderRadius: "50%",
                                    animation: `${animName} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
                                    borderColor: "currentColor transparent transparent transparent",
                                },
                            }),
                        ],
                    }),
                );
            }

            return CoreReactive.App.section({
                attrs: { ...attrsDefault },
                className: ["position-absolute", "w-100", "h-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "gap-2"],
                styles: {
                    left: "0",
                    top: "0",
                    zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools)),
                    backgroundColor: bgShadowValue,
                },
                children: [
                    CoreReactive.App.div({
                        className: ["d-flex", "align-items-center", "justify-content-center"],
                        children: loadingChildren,
                    }),
                    this.executeSchemaPart(Schemas.CANCEL_BTN.part, {}),
                ],
            });
        }

        return this.renderEmptyContent(attrsDefault);
    }


    /* ---------------------------------------------
       renderCancelBtn — رندر Part CANCEL_BTN
    --------------------------------------------- */
    protected renderCancelBtn(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_showCancel  = data?.["prop_showCancel"]  ?? bind.prop_showCancel;
        const prop_cancelDelay = data?.["prop_cancelDelay"] ?? bind.prop_cancelDelay;

        const showCancelValue = prop_showCancel instanceof CoreObservable.App ? prop_showCancel.get() : prop_showCancel;
        const cancelDelayValue = prop_cancelDelay instanceof CoreObservable.App ? prop_cancelDelay.get() : prop_cancelDelay;

        if (!showCancelValue) {
            return this.renderEmptyContent(attrsDefault);
        }

        const delay = cancelDelayValue ?? 2000;
        const cancelBtnId = `component-loading-cancel-${(this as any)._COMPONENT_RANDOM_ID ?? "default"}`;

        if (this._cancelTimerId !== null) {
            clearTimeout(this._cancelTimerId);
        }

        this._cancelTimerId = setTimeout(() => {
            const el = document.getElementById(cancelBtnId);
            if (el) {
                el.classList.remove("d-none");
                el.style.opacity = "1";
            }
        }, delay);

        const closeIcon = UiIcons.CreateIcon(UiIcons.Src.FileWindowClose.Definition, {
            size: UtilConst.Sizes.S,
            primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        });

        return CoreReactive.App.div({
            attrs: {
                ...attrsDefault,
                "id": cancelBtnId,
            },
            className: ["d-none", "cursor-pointer"],
            styles: {
                opacity: "0",
                transition: "opacity 0.3s ease",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_blur)),
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
            },
            children: [closeIcon],
            on: {
                click: (event: Event) => {
                    this.fn_onCancelLoading(event);
                },
            },
        });
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


    /* ---------------------------------------------
       fn_injectStyles — inject CSS keyframes for ring animation
    --------------------------------------------- */
    private fn_injectStyles(): void {
        const styleId = `component-loading-styles-${(this as any)._COMPONENT_RANDOM_ID ?? "default"}`;
        if (document.getElementById(styleId)) return;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            @keyframes lds-ring-${(this as any)._COMPONENT_RANDOM_ID ?? "default"} {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }


    /* ---------------------------------------------
       fn_onCancelLoading — cancel handler
    --------------------------------------------- */
    private fn_onCancelLoading = (event?: Event): void => {
        this.set("prop_show", false);
        if (event) {
            this.executeMethod("CANCEL", event, {});
        }
    };

}
