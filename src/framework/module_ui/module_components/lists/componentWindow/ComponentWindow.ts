import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentWindowBase}    from "./ComponentWindowBase";
import {createWindowStep}       from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}     from "./Methods";
import {PropsType}             from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as WindowPropsConfigType} from "./Props";
// --------------------------------
import * as ComponentButton  from "../componentButton";
import {ButtonSemantic, ButtonVariants, ButtonAction} from "../componentButton/Props";


/**
 * ComponentWindow — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentWindow HAS-A ComponentButton (نه IS-A)
 *   ComponentButton در renderWindowHeaderIconClose/Resize و renderWindowFooter ساخته می‌شود.
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLOSE, OPEN, RESIZE, ACCEPT, CANCEL, ...)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-window> + <section> از Schema پایه رندر می‌شود.
 */
export class ComponentWindow extends ComponentWindowBase {

    private _IS_FULL_SIZE: boolean = false;
    private _RESIZE_ANIM_ID: number | null = null;
    private _CLOSE_TIMEOUT_ID: number | null = null;
    private static _ANIM_CSS_INJECTED = false;


    constructor(
        config?:  Partial<StructurePropsType & WindowPropsConfigType>,
        methods?: MethodsConfigType<ComponentWindow>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createWindowStep();

        super("window", null, identity, step);

        ComponentWindow.injectAnimationCss();

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
        return this.executeSchemaPart(Schemas.WINDOW_STRUCTURE.part, {});
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
            case Schemas.WINDOW_STRUCTURE.part:
                return this.renderStructure(attrsDefault, data, extra);
            case Schemas.BLUR.part:
                return this.renderBlur(attrsDefault, data, extra);
            case Schemas.WINDOW.part:
                return this.renderWindow(attrsDefault, data, extra);
            case Schemas.WINDOW_HEADER.part:
                return this.renderWindowHeader(attrsDefault, data, extra);
            case Schemas.WINDOW_HEADER_TITLE.part:
                return this.renderWindowHeaderTitle(attrsDefault, data, extra);
            case Schemas.WINDOW_HEADER_ICONS.part:
                return this.renderWindowHeaderIcons(attrsDefault, data, extra);
            case Schemas.WINDOW_HEADER_ICONS_CLOSE.part:
                return this.renderWindowHeaderIconClose(attrsDefault, data, extra);
            case Schemas.WINDOW_HEADER_ICONS_RESIZE.part:
                return this.renderWindowHeaderIconResize(attrsDefault, data, extra);
            case Schemas.WINDOW_BODY.part:
                return this.renderWindowBody(attrsDefault, data, extra);
            case Schemas.WINDOW_FOOTER.part:
                return this.renderWindowFooter(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderStructure — Part WINDOW_STRUCTURE
    --------------------------------------------- */
    protected renderStructure(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_isVisible = data?.["prop_isVisible"] ?? bind.prop_isVisible;

        return CoreObservable.App.computed(
            (isVisible: boolean) => {
                if (!isVisible) {
                    return CoreReactive.App.section({
                        attrs: { ...attrsDefault },
                        className: ["d-none"],
                    });
                }
                return CoreReactive.App.section({
                    attrs: {
                        ...attrsDefault,
                        "id": `component-window-structure-${this._COMPONENT_RANDOM_ID}`,
                    },
                    children: [
                        this.executeSchemaPart(Schemas.BLUR.part, {}),
                    ],
                });
            },
            [prop_isVisible],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderBlur — Part BLUR (overlay)
    --------------------------------------------- */
    protected renderBlur(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_blurBackgroundColor = data?.["prop_blurBackgroundColor"] ?? bind.prop_blurBackgroundColor;
        const prop_closeOnOverlay = data?.["prop_closeOnOverlay"] ?? bind.prop_closeOnOverlay;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-blur-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["position-fixed", "w-100", "h-100"],
            styles: {
                top: "0",
                left: "0",
                zIndex: `${UtilStyle.Css_ZIndex(UtilConst.ZIndex.blur_popup)}`,
            },
            stylesBind: {
                backgroundColor: prop_blurBackgroundColor,
            },
            on: {
                click: (event: Event) => {
                    const closeOnOverlay = prop_closeOnOverlay instanceof CoreObservable.App
                        ? prop_closeOnOverlay.get()
                        : prop_closeOnOverlay;
                    if (closeOnOverlay) {
                        this.fn_onClickCloseWindow(event);
                    }
                },
            },
            children: [
                this.executeSchemaPart(Schemas.WINDOW.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderWindow — Part WINDOW
    --------------------------------------------- */
    protected renderWindow(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_windowBackgroundColor = data?.["prop_windowBackgroundColor"] ?? bind.prop_windowBackgroundColor;
        const prop_windowWidth = data?.["prop_windowWidth"] ?? bind.prop_windowWidth;
        const prop_windowHeight = data?.["prop_windowHeight"] ?? bind.prop_windowHeight;
        const prop_windowRound = data?.["prop_windowRound"] ?? bind.prop_windowRound;

        const width = prop_windowWidth instanceof CoreObservable.App ? prop_windowWidth.get() : prop_windowWidth;
        const height = prop_windowHeight instanceof CoreObservable.App ? prop_windowHeight.get() : prop_windowHeight;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["position-absolute", "shadow"],
            styles: {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${width}px`,
                height: `${height}px`,
                maxHeight: "calc(100vh - 30%) !important",
                zIndex: `${UtilStyle.Css_ZIndex(UtilConst.ZIndex.popup)}`,
            },
            stylesBind: {
                backgroundColor: prop_windowBackgroundColor,
                borderRadius: prop_windowRound,
            },
            on: {
                click: (event: Event) => {
                    event.stopImmediatePropagation();
                    this.executeMethod("CLICK_WINDOW", event, {});
                },
            },
            children: [
                this.executeSchemaPart(Schemas.WINDOW_HEADER.part, {}),
                this.executeSchemaPart(Schemas.WINDOW_BODY.part, {}),
                this.executeSchemaPart(Schemas.WINDOW_FOOTER.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderWindowHeader — Part WINDOW_HEADER
    --------------------------------------------- */
    protected renderWindowHeader(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_headerBackgroundColor = data?.["prop_headerBackgroundColor"] ?? bind.prop_headerBackgroundColor;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-header-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["border-bottom", "row", "p-0", "m-0"],
            styles: {
                height: "35px",
                overflow: "hidden",
                borderTopLeftRadius: "inherit",
                borderTopRightRadius: "inherit",
            },
            stylesBind: {
                backgroundColor: prop_headerBackgroundColor,
            },
            children: [
                this.executeSchemaPart(Schemas.WINDOW_HEADER_TITLE.part, {}),
                this.executeSchemaPart(Schemas.WINDOW_HEADER_ICONS.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderWindowHeaderTitle — Part WINDOW_HEADER_TITLE
    --------------------------------------------- */
    protected renderWindowHeaderTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_header = data?.["prop_header"] ?? bind.prop_header;
        const prop_title = data?.["prop_title"] ?? bind.prop_title;
        const prop_headerTitleColor = data?.["prop_headerTitleColor"] ?? bind.prop_headerTitleColor;

        const headerValue = prop_header instanceof CoreObservable.App ? prop_header.get() : prop_header;
        const titleValue = prop_title instanceof CoreObservable.App ? prop_title.get() : prop_title;

        const displayTitle = headerValue ?? titleValue ?? "";

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-header-title-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["col-8"],
            styles: {
                lineHeight: "35px",
            },
            stylesBind: {
                color: prop_headerTitleColor,
            },
            children: [
                CoreReactive.App.b({ children: [displayTitle] }),
            ],
        });
    }


    /* ---------------------------------------------
       renderWindowHeaderIcons — Part WINDOW_HEADER_ICONS
    --------------------------------------------- */
    protected renderWindowHeaderIcons(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-header-icons-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["col-4", "d-flex", "align-items-center", "justify-content-end", "gap-2", "px-1"],
            styles: {
                height: "35px",
            },
            children: [
                this.executeSchemaPart(Schemas.WINDOW_HEADER_ICONS_RESIZE.part, {}),
                this.executeSchemaPart(Schemas.WINDOW_HEADER_ICONS_CLOSE.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderWindowHeaderIconClose — Part WINDOW_HEADER_ICONS_CLOSE
    --------------------------------------------- */
    protected renderWindowHeaderIconClose(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_showBtnClose = data?.["prop_showBtnClose"] ?? bind.prop_showBtnClose;

        return CoreObservable.App.computed(
            (showBtnClose: boolean) => {
                if (!showBtnClose) {
                    return CoreReactive.App.section({ attrs: { ...attrsDefault } });
                }

                return new ComponentButton.Component(
                    {
                        classList: ["d-flex", "align-items-center", "justify-content-center"],
                        styles: { display: "inline-flex", width: "auto" },
                        prop_structureClass: ["d-flex", "align-items-center", "justify-content-center"],
                        prop_structureStyles: { display: "inline-flex", width: "auto" },
                        prop_btnClass: [],
                        prop_btnStyles: {
                            width: "30px",
                            height: "30px",
                            padding: "0",
                            gap: "0",
                        },
                        prop_btnIcon: UiIcons.Src.FileWindowClose.Definition,
                        prop_btnVariant: ButtonVariants.SECONDARY,
                        prop_btnSemantic: ButtonSemantic.BACK,
                        prop_btnType: ButtonAction.BUTTON,
                        prop_btnBorderRadius: UtilConst.Sizes.M,
                        prop_btnBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                        prop_btnTitleColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.fn_onClickCloseWindow(event);
                        },
                    } as any,
                    {
                        unique: (this as any)._COMPONENT_STEP?.close ?? undefined,
                    },
                ).getReactiveElement() as CoreReactive.App;
            },
            [prop_showBtnClose],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderWindowHeaderIconResize — Part WINDOW_HEADER_ICONS_RESIZE
    --------------------------------------------- */
    protected renderWindowHeaderIconResize(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_showBtnResize = data?.["prop_showBtnResize"] ?? bind.prop_showBtnResize;

        return CoreObservable.App.computed(
            (showBtnResize: boolean) => {
                if (!showBtnResize) {
                    return CoreReactive.App.section({ attrs: { ...attrsDefault } });
                }

                return new ComponentButton.Component(
                    {
                        classList: ["d-flex", "align-items-center", "justify-content-center"],
                        styles: { display: "inline-flex", width: "auto" },
                        prop_structureClass: ["d-flex", "align-items-center", "justify-content-center"],
                        prop_structureStyles: { display: "inline-flex", width: "auto" },
                        prop_btnClass: [],
                        prop_btnStyles: {
                            width: "30px",
                            height: "30px",
                            padding: "0",
                            gap: "0",
                        },
                        prop_btnIcon: UiIcons.Src.FileWindowResizeMax.Definition,
                        prop_btnVariant: ButtonVariants.SECONDARY,
                        prop_btnSemantic: ButtonSemantic.BACK,
                        prop_btnType: ButtonAction.BUTTON,
                        prop_btnBorderRadius: UtilConst.Sizes.M,
                        prop_btnBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                        prop_btnTitleColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.fn_onClickResizeWindow(event);
                        },
                    } as any,
                    {
                        unique: (this as any)._COMPONENT_STEP?.resize ?? undefined,
                    },
                ).getReactiveElement() as CoreReactive.App;
            },
            [prop_showBtnResize],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderWindowBody — Part WINDOW_BODY
    --------------------------------------------- */
    protected renderWindowBody(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_body = data?.["prop_body"] ?? bind.prop_body;
        const prop_content = data?.["prop_content"] ?? bind.prop_content;

        const bodyValue = prop_body instanceof CoreObservable.App ? prop_body.get() : prop_body;
        const contentValue = prop_content instanceof CoreObservable.App ? prop_content.get() : prop_content;

        const displayContent = bodyValue ?? contentValue ?? "";

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-body-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["overflow-auto", "px-2"],
            styles: {
                height: "calc(100% - 90px)",
            },
            children: [
                displayContent,
            ],
        });
    }


    /* ---------------------------------------------
       renderWindowFooter — Part WINDOW_FOOTER
    --------------------------------------------- */
    protected renderWindowFooter(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_footer = data?.["prop_footer"] ?? bind.prop_footer;
        const prop_acceptText = data?.["prop_acceptText"] ?? bind.prop_acceptText;
        const prop_cancelText = data?.["prop_cancelText"] ?? bind.prop_cancelText;
        const prop_showCancel = data?.["prop_showCancel"] ?? bind.prop_showCancel;
        const prop_showAccept = data?.["prop_showAccept"] ?? bind.prop_showAccept;

        const footerValue = prop_footer instanceof CoreObservable.App ? prop_footer.get() : prop_footer;
        const acceptTextValue = prop_acceptText instanceof CoreObservable.App ? prop_acceptText.get() : prop_acceptText;
        const cancelTextValue = prop_cancelText instanceof CoreObservable.App ? prop_cancelText.get() : prop_cancelText;
        const showCancelValue = prop_showCancel instanceof CoreObservable.App ? prop_showCancel.get() : prop_showCancel;
        const showAcceptValue = prop_showAccept instanceof CoreObservable.App ? prop_showAccept.get() : prop_showAccept;

        if (footerValue != null) {
            return CoreReactive.App.section({
                attrs: {
                    ...attrsDefault,
                    "id": `component-window-window-footer-${this._COMPONENT_RANDOM_ID}`,
                },
                className: ["border-top"],
                styles: {
                    height: "55px",
                },
                children: [
                    footerValue,
                ],
            });
        }

        const footerChildren: (CoreReactive.App | string)[] = [];

        if (showCancelValue) {
            footerChildren.push(
                new ComponentButton.Component(
                    {
                        classList: [],
                        styles: { display: "inline-flex", width: "auto" },
                        prop_structureStyles: { display: "inline-flex", width: "auto" },
                        prop_btnClass: [],
                        prop_btnStyles: {
                            padding: "6px 14px",
                            fontSize: "12px",
                        },
                        prop_btnTitle: cancelTextValue ?? "Cancel",
                        prop_btnIcon: UiIcons.Src.StatusIsFalse.Definition,
                        prop_btnVariant: ButtonVariants.SECONDARY,
                        prop_btnSemantic: ButtonSemantic.CANCEL,
                        prop_btnType: ButtonAction.BUTTON,
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.executeMethod("CANCEL", event, {});
                            this.fn_onClickCloseWindow(event);
                        },
                    } as any,
                ).getReactiveElement() as CoreReactive.App,
            );
        }

        if (showAcceptValue) {
            footerChildren.push(
                new ComponentButton.Component(
                    {
                        classList: [],
                        styles: { display: "inline-flex", width: "auto" },
                        prop_structureStyles: { display: "inline-flex", width: "auto" },
                        prop_btnClass: [],
                        prop_btnStyles: {
                            padding: "6px 14px",
                            fontSize: "12px",
                        },
                        prop_btnTitle: acceptTextValue ?? "Confirm",
                        prop_btnIcon: UiIcons.Src.StatusIsTrue.Definition,
                        prop_btnVariant: ButtonVariants.PRIMARY,
                        prop_btnSemantic: ButtonSemantic.SUBMIT,
                        prop_btnType: ButtonAction.BUTTON,
                    } as any,
                    {
                        CLICK: (event: Event) => {
                            this.executeMethod("ACCEPT", event, {});
                            this.fn_onClickCloseWindow(event);
                        },
                    } as any,
                ).getReactiveElement() as CoreReactive.App,
            );
        }

        if (footerChildren.length === 0) {
            return CoreReactive.App.section({ attrs: { ...attrsDefault } });
        }

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-window-window-footer-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["border-top", "d-flex", "align-items-center", "justify-content-end", "gap-2", "px-3"],
            styles: {
                height: "55px",
            },
            children: footerChildren,
        });
    }


    /* ---------------------------------------------
       FUNCTIONs
    --------------------------------------------- */
    private fn_onGetStructureElement(): HTMLElement | null {
        return document.querySelector(`#component-window-structure-${this._COMPONENT_RANDOM_ID}`);
    }

    private fn_onGetWindowElement(): HTMLElement | null {
        return document.querySelector(`#component-window-window-${this._COMPONENT_RANDOM_ID}`);
    }

    private fn_onGetBlurElement(): HTMLElement | null {
        return document.querySelector(`#component-window-blur-${this._COMPONENT_RANDOM_ID}`);
    }

    private fn_setUnvisableWindow(): void {
        const el = this.fn_onGetStructureElement();
        if (el) el.classList.add("d-none");
    }

    private fn_onRemoveClass(): void {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        elWindow.classList.remove(`window-full-size-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-real-size-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-visable-animation-${this._COMPONENT_RANDOM_ID}`);
        elWindow.classList.remove(`window-unvisable-animation-${this._COMPONENT_RANDOM_ID}`);
    }


    private fn_resetWindowStyles(): void {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_width = bind.prop_windowWidth;
        const prop_height = bind.prop_windowHeight;
        const width = (prop_width instanceof CoreObservable.App ? prop_width.get() : prop_width) || 700;
        const height = (prop_height instanceof CoreObservable.App ? prop_height.get() : prop_height) || 400;

        elWindow.style.width = `${width}px`;
        elWindow.style.height = `${height}px`;
        elWindow.style.top = "50%";
        elWindow.style.left = "50%";
        elWindow.style.transform = "translate(-50%, -50%)";
    }

    private static injectAnimationCss(): void {
        if (ComponentWindow._ANIM_CSS_INJECTED) return;
        ComponentWindow._ANIM_CSS_INJECTED = true;

        const css = `
            @keyframes componentWindowFadeIn {
                from { opacity: 0; }
                to   { opacity: 1; }
            }
            @keyframes componentWindowScaleIn {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
                to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes componentWindowScaleOut {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to   { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
            }
            @keyframes componentWindowFadeOut {
                from { opacity: 1; }
                to   { opacity: 0; }
            }
            .component-window-anim-fade-in {
                animation: componentWindowFadeIn 200ms ease-out forwards;
            }
            .component-window-anim-fade-out {
                animation: componentWindowFadeOut 200ms ease-in forwards;
            }
            .component-window-anim-scale-in {
                animation: componentWindowScaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .component-window-anim-scale-out {
                animation: componentWindowScaleOut 200ms ease-in forwards;
            }
        `;
        const style = document.createElement('style');
        style.setAttribute('data-component-window-anim', '');
        style.textContent = css;
        document.head.appendChild(style);
    }

    private fn_onClickOpenWindow = (event?: Event): void => {
        this.fn_onRemoveClass();

        if (this._CLOSE_TIMEOUT_ID !== null) {
            clearTimeout(this._CLOSE_TIMEOUT_ID);
            this._CLOSE_TIMEOUT_ID = null;
        }

        const el = this.fn_onGetStructureElement();
        if (el) {
            el.classList.remove("d-none");
            el.classList.add("component-window-anim-fade-in");
        }

        const elWindow = this.fn_onGetWindowElement();
        if (elWindow) {
            elWindow.classList.add(`component-window-anim-scale-in`);
            elWindow.addEventListener('animationend', function handler() {
                elWindow.classList.remove(`component-window-anim-scale-in`);
                elWindow.removeEventListener('animationend', handler);
            });
        }

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_isFullSize = bind.prop_isFullSize;
        const isFullSize = prop_isFullSize instanceof CoreObservable.App ? prop_isFullSize.get() : prop_isFullSize;

        if (isFullSize) {
            this._IS_FULL_SIZE = false;
            this.fn_onClickResizeWindow(null);
        } else {
            this.fn_resetWindowStyles();
            this._IS_FULL_SIZE = false;
        }

        if (event) {
            this.executeMethod("OPEN", event, {});
        }
    };

    private fn_onClickCloseWindow = (event?: Event): void => {
        this.fn_onRemoveClass();

        const elWindow = this.fn_onGetWindowElement();
        if (elWindow) elWindow.classList.add(`component-window-anim-scale-out`);

        const elBlur = this.fn_onGetBlurElement();
        if (elBlur) elBlur.classList.add(`component-window-anim-fade-out`);

        this._CLOSE_TIMEOUT_ID = window.setTimeout(() => {
            const el = this.fn_onGetStructureElement();
            if (el) el.classList.add("d-none");
            if (elWindow) elWindow.classList.remove(`component-window-anim-scale-out`);
            if (elBlur) elBlur.classList.remove(`component-window-anim-fade-out`);
            this.fn_resetWindowStyles();
            this._CLOSE_TIMEOUT_ID = null;
        }, 200);

        this._IS_FULL_SIZE = false;

        if (event) {
            this.executeMethod("CLOSE", event, {});
        }
    };

    private fn_onClickResizeWindow = (event?: Event): void => {
        const elWindow = this.fn_onGetWindowElement();
        if (!elWindow) return;

        if (this._RESIZE_ANIM_ID !== null) {
            cancelAnimationFrame(this._RESIZE_ANIM_ID);
            this._RESIZE_ANIM_ID = null;
        }

        const duration = 300;
        const startTime = performance.now();

        const rect = elWindow.getBoundingClientRect();
        const blurEl = document.querySelector(`#component-window-blur-${this._COMPONENT_RANDOM_ID}`) as HTMLElement | null;
        const blurRect = blurEl ? blurEl.getBoundingClientRect() : { left: 0, top: 0 };

        const startWidth = rect.width;
        const startHeight = rect.height;
        const startTop = rect.top - blurRect.top;
        const startLeft = rect.left - blurRect.left;

        const vw = blurEl ? blurEl.offsetWidth : window.innerWidth;
        const vh = blurEl ? blurEl.offsetHeight : window.innerHeight;

        let targetWidth: number, targetHeight: number, targetTop: number, targetLeft: number;

        if (this._IS_FULL_SIZE) {
            const bind = this._COMPONENT_PROPS_BIND;
            const prop_width = bind.prop_windowWidth;
            const prop_height = bind.prop_windowHeight;
            targetWidth = (prop_width instanceof CoreObservable.App ? prop_width.get() : prop_width) || 700;
            targetHeight = (prop_height instanceof CoreObservable.App ? prop_height.get() : prop_height) || 400;
            targetTop = (vh - targetHeight) / 2;
            targetLeft = (vw - targetWidth) / 2;
            this._IS_FULL_SIZE = false;
        } else {
            targetWidth = vw * 0.95;
            targetHeight = vh * 0.95;
            targetTop = vh * 0.025;
            targetLeft = vw * 0.025;
            this._IS_FULL_SIZE = true;
        }

        elWindow.style.transform = "none";

        const easeInOut = (t: number): number => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        };

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);

            const currentWidth = startWidth + (targetWidth - startWidth) * eased;
            const currentHeight = startHeight + (targetHeight - startHeight) * eased;
            const currentTop = startTop + (targetTop - startTop) * eased;
            const currentLeft = startLeft + (targetLeft - startLeft) * eased;

            elWindow.style.width = `${currentWidth}px`;
            elWindow.style.height = `${currentHeight}px`;
            elWindow.style.top = `${currentTop}px`;
            elWindow.style.left = `${currentLeft}px`;

            if (progress < 1) {
                this._RESIZE_ANIM_ID = requestAnimationFrame(animate);
            } else {
                this._RESIZE_ANIM_ID = null;
                if (!this._IS_FULL_SIZE) {
                    elWindow.style.transform = "translate(-50%, -50%)";
                    elWindow.style.top = "50%";
                    elWindow.style.left = "50%";
                }
            }
        };

        this._RESIZE_ANIM_ID = requestAnimationFrame(animate);

        if (event) {
            this.executeMethod("RESIZE", event, {});
        }
    };

    private fn_onClickMinimizeWindow = (event?: Event): void => {
        if (event) {
            this.executeMethod("MINIMIZE", event, {});
        }
    };


    /* ---------------------------------------------
       PUBLIC API
    --------------------------------------------- */
    call_close(event?: Event): void {
        this.fn_onClickCloseWindow(event);
    }

    call_open(event?: Event): void {
        this.fn_onClickOpenWindow(event);
    }

    call_resize(event?: Event): void {
        this.fn_onClickResizeWindow(event);
    }

    call_minimize(event?: Event): void {
        this.fn_onClickMinimizeWindow(event);
    }


    /* ---------------------------------------------
       STATIC METHODS (Dialog)
    --------------------------------------------- */
    static confirm(
        message: string,
        onAccept?: (event?: Event) => void,
        onCancel?: (event?: Event) => void,
        options?: Partial<StructurePropsType & WindowPropsConfigType>,
    ): ComponentWindow {
        const popup = new ComponentWindow(
            {
                prop_title: "Confirm",
                prop_content: message,
                prop_acceptText: "Confirm",
                prop_cancelText: "Cancel",
                prop_showCancel: true,
                prop_showAccept: true,
                prop_closeOnOverlay: true,
                prop_isVisible: true,
                ...options,
            } as any,
            {
                ACCEPT: (event: Event) => {
                    if (typeof onAccept === "function") onAccept(event);
                },
                CANCEL: (event: Event) => {
                    if (typeof onCancel === "function") onCancel(event);
                },
            } as any,
        );

        document.body.appendChild(popup.getElement() as HTMLElement);
        popup.call_open();
        return popup;
    }

    static alert(
        message: string,
        onClose?: (event?: Event) => void,
        options?: Partial<StructurePropsType & WindowPropsConfigType>,
    ): ComponentWindow {
        const popup = new ComponentWindow(
            {
                prop_title: "Alert",
                prop_content: message,
                prop_showCancel: false,
                prop_acceptText: "OK",
                prop_showAccept: true,
                prop_closeOnOverlay: true,
                prop_isVisible: true,
                ...options,
            } as any,
            {
                ACCEPT: (event: Event) => {
                    if (typeof onClose === "function") onClose(event);
                },
            } as any,
        );

        document.body.appendChild(popup.getElement() as HTMLElement);
        popup.call_open();
        return popup;
    }

}
