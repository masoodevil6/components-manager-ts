import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentSidebarBase}    from "./ComponentSidebarBase";
import {createSidebarStep}       from "./Step";
import {Schemas}                from "./Schemas";
import {MethodsConfigType}     from "./Methods";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as SidebarPropsConfigType, SidebarDirection} from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
// --------------------------------
import * as UiCategory             from "@/ui_categories";
import {ButtonAction} from "../componentButton/Props";


/**
 * ComponentSidebar — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentSidebar HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderSidebarContent (محتوای اختصاصی ComponentSidebar)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (TOGGLE)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 9.1 — Step داخلی در constructor ساخته می‌شود (factory function).
 * Plan 11.2 — لایه <component-sidebar> + <section> از Schema پایه رندر می‌شود.
 *
 * Positioning: inline styles (جایگزین ComponentElementPosition)
 */
export class ComponentSidebar extends ComponentSidebarBase {

    private _DEFAULT_OPACITY: CoreObservable.App<any> | null = null;

    constructor(
        config?:  Partial<StructurePropsType & SidebarPropsConfigType>,
        methods?: MethodsConfigType<ComponentSidebar>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createSidebarStep();

        super("sidebar", null, identity, step);

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
       لایه ساختار از طریق Schema پایه (COMPONENT + STRUCTURE) رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
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
            case Schemas.CONTENT.part:
                return this.renderContent(attrsDefault, data, extra);
            case Schemas.CONTENT_BLUR.part:
                return this.renderContentBlur(attrsDefault, data, extra);
            case Schemas.CONTENT_SIDEBAR.part:
                return this.renderContentSidebar(attrsDefault, data, extra);
            case Schemas.CONTENT_SIDEBAR_CONTENT.part:
                return this.renderContentSidebarContent(attrsDefault, data, extra);
            case Schemas.CONTENT_SIDEBAR_CONTENT_POSITION.part:
                return this.renderContentSidebarContentPosition(attrsDefault, data, extra);
            case Schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.part:
                return this.renderContentSidebarContentPositionButton(attrsDefault, data, extra);
            case Schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.part:
                return this.renderContentSidebarContentPositionButtonIcon(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderContent — بخش اصلی
    --------------------------------------------- */
    protected renderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            children: [
                this.executeSchemaPart(Schemas.CONTENT_BLUR.part, {}),
                this.executeSchemaPart(Schemas.CONTENT_SIDEBAR.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentBlur — پس‌زمینه blur
    --------------------------------------------- */
    protected renderContentBlur(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_blurBackground = data?.["prop_blurBackground"] ?? bind.prop_blurBackground;
        const prop_blurHas        = data?.["prop_blurHas"]        ?? bind.prop_blurHas;

        return CoreReactive.App.div({
            attrs: {
                ...attrsDefault,
            },
            styles: {
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_blur)),
            },
            stylesBind: {
                backgroundColor: prop_blurBackground,
                opacity: CoreObservable.App.computed(
                    (has) => has ? "0.2" : "0",
                    [prop_blurHas],
                    this.getScope(),
                ),
            },
        });
    }


    /* ---------------------------------------------
       renderContentSidebar — بخش sidebar (inline positioning)
    --------------------------------------------- */
    protected renderContentSidebar(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sidebarBackground   = data?.["prop_sidebarBackground"]   ?? bind.prop_sidebarBackground;
        const prop_sidebarBorderRadius = data?.["prop_sidebarBorderRadius"] ?? bind.prop_sidebarBorderRadius;
        const prop_sidebarWidth        = data?.["prop_sidebarWidth"]        ?? bind.prop_sidebarWidth;
        const prop_sidebarIsOpen       = data?.["prop_sidebarIsOpen"]       ?? bind.prop_sidebarIsOpen;
        const prop_sidebarDirection    = data?.["prop_sidebarDirection"]    ?? bind.prop_sidebarDirection;
        const prop_sidebarDuration     = data?.["prop_sidebarDuration"]     ?? bind.prop_sidebarDuration;
        const prop_sidebarPositionStart = data?.["prop_sidebarPositionStart"] ?? bind.prop_sidebarPositionStart;
        const prop_sidebarPositionEnd   = data?.["prop_sidebarPositionEnd"]   ?? bind.prop_sidebarPositionEnd;
        const prop_sidebarMargin        = data?.["prop_sidebarMargin"]        ?? bind.prop_sidebarMargin;
        const prop_sidebarOpacity       = data?.["prop_sidebarOpacity"]       ?? bind.prop_sidebarOpacity;

        this._DEFAULT_OPACITY = CoreObservable.App.computed(
            (v) => v,
            [prop_sidebarOpacity],
            this.getScope(),
        );

        const sidebarStyles = CoreObservable.App.computed(
            (direction, duration, borderRadius, margin, opacity, isOpen, width, posStart, posEnd) => {
                const styles: Record<string, string> = {
                    position: "absolute",
                    zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.popup)),
                    backgroundColor: prop_sidebarBackground?.get?.() ?? "",
                    transition: `opacity 500ms`,
                };

                // border radius
                if (margin != null) {
                    if (typeof borderRadius === "string" && UtilStyle.Css_BorderRadius(borderRadius as any)) {
                        styles["borderRadius"] = `var(--borderRadius${borderRadius})`;
                    } else if (typeof borderRadius === "number") {
                        styles["borderRadius"] = `${borderRadius}px`;
                    }
                } else {
                    switch (direction) {
                        case SidebarDirection.LTR:
                            if (typeof borderRadius === "string") {
                                styles["borderTopRightRadius"] = `var(--borderRadius${borderRadius})`;
                                styles["borderBottomRightRadius"] = `var(--borderRadius${borderRadius})`;
                            } else if (typeof borderRadius === "number") {
                                styles["borderTopRightRadius"] = `${borderRadius}px`;
                                styles["borderBottomRightRadius"] = `${borderRadius}px`;
                            }
                            break;
                        case SidebarDirection.TTB:
                            if (typeof borderRadius === "string") {
                                styles["borderBottomRightRadius"] = `var(--borderRadius${borderRadius})`;
                                styles["borderBottomLeftRadius"] = `var(--borderRadius${borderRadius})`;
                            } else if (typeof borderRadius === "number") {
                                styles["borderBottomRightRadius"] = `${borderRadius}px`;
                                styles["borderBottomLeftRadius"] = `${borderRadius}px`;
                            }
                            break;
                        case SidebarDirection.RTL:
                            if (typeof borderRadius === "string") {
                                styles["borderTopLeftRadius"] = `var(--borderRadius${borderRadius})`;
                                styles["borderBottomLeftRadius"] = `var(--borderRadius${borderRadius})`;
                            } else if (typeof borderRadius === "number") {
                                styles["borderTopLeftRadius"] = `${borderRadius}px`;
                                styles["borderBottomLeftRadius"] = `${borderRadius}px`;
                            }
                            break;
                        case SidebarDirection.BTT:
                            if (typeof borderRadius === "string") {
                                styles["borderTopLeftRadius"] = `var(--borderRadius${borderRadius})`;
                                styles["borderTopRightRadius"] = `var(--borderRadius${borderRadius})`;
                            } else if (typeof borderRadius === "number") {
                                styles["borderTopLeftRadius"] = `${borderRadius}px`;
                                styles["borderTopRightRadius"] = `${borderRadius}px`;
                            }
                            break;
                    }
                }

                // transition
                if (direction === SidebarDirection.LTR) {
                    styles["transition"] = `opacity 500ms, left ${duration}ms`;
                }
                if (direction === SidebarDirection.TTB) {
                    styles["transition"] = `opacity 500ms, top ${duration}ms`;
                    styles["height"] = "100%";
                }
                if (direction === SidebarDirection.RTL) {
                    styles["transition"] = `opacity 500ms, right ${duration}ms`;
                }
                if (direction === SidebarDirection.BTT) {
                    styles["transition"] = `opacity 500ms, bottom ${duration}ms`;
                    styles["height"] = "100%";
                }

                // opacity
                styles["opacity"] = opacity != null ? `${opacity}%` : "100%";

                // position based on direction and isOpen
                const marginVal = margin != null ? parseFloat(margin as string) || 0 : 0;

                if (direction === SidebarDirection.LTR) {
                    styles["left"] = isOpen ? `${marginVal}px` : `-${width}px`;
                    styles["top"] = posStart != null ? String(posStart) : "0";
                    styles["bottom"] = posEnd != null ? String(posEnd) : "0";
                    styles["width"] = `${width}px`;
                }
                if (direction === SidebarDirection.RTL) {
                    styles["right"] = isOpen ? `${marginVal}px` : `-${width}px`;
                    styles["top"] = posStart != null ? String(posStart) : "0";
                    styles["bottom"] = posEnd != null ? String(posEnd) : "0";
                    styles["width"] = `${width}px`;
                }
                if (direction === SidebarDirection.TTB) {
                    styles["top"] = isOpen ? `${marginVal}px` : `-${width}px`;
                    styles["left"] = posStart != null ? String(posStart) : "0";
                    styles["right"] = posEnd != null ? String(posEnd) : "0";
                    styles["height"] = `${width}px`;
                }
                if (direction === SidebarDirection.BTT) {
                    styles["bottom"] = isOpen ? `${marginVal}px` : `-${width}px`;
                    styles["left"] = posStart != null ? String(posStart) : "0";
                    styles["right"] = posEnd != null ? String(posEnd) : "0";
                    styles["height"] = `${width}px`;
                }

                return styles;
            },
            [prop_sidebarDirection, prop_sidebarDuration, prop_sidebarBorderRadius, prop_sidebarMargin, this._DEFAULT_OPACITY, prop_sidebarIsOpen, prop_sidebarWidth, prop_sidebarPositionStart, prop_sidebarPositionEnd],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            styles: {
                position: "absolute",
            },
            stylesBind: sidebarStyles as any,
            children: [
                this.executeSchemaPart(Schemas.CONTENT_SIDEBAR_CONTENT.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentSidebarContent — محتوای sidebar
    --------------------------------------------- */
    protected renderContentSidebarContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sidebarContent   = data?.["prop_sidebarContent"]   ?? bind.prop_sidebarContent;
        const prop_sidebarBtnOpenHas = data?.["prop_sidebarBtnOpenHas"] ?? bind.prop_sidebarBtnOpenHas;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            children: CoreObservable.App.conditionSwitch(
                prop_sidebarBtnOpenHas,
                {
                    true: () => CoreReactive.App.div({
                        children: [
                            prop_sidebarContent,
                            this.executeSchemaPart(Schemas.CONTENT_SIDEBAR_CONTENT_POSITION.part, {}),
                        ],
                    }),
                    false: () => CoreReactive.App.div({
                        children: [
                            prop_sidebarContent,
                        ],
                    }),
                },
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderContentSidebarContentPosition — دکمه toggle (inline positioning)
    --------------------------------------------- */
    protected renderContentSidebarContentPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sidebarBtnOpenSize = data?.["prop_sidebarBtnOpenSize"] ?? bind.prop_sidebarBtnOpenSize;
        const prop_sidebarDirection   = data?.["prop_sidebarDirection"]   ?? bind.prop_sidebarDirection;
        const prop_sidebarIsOpen      = data?.["prop_sidebarIsOpen"]      ?? bind.prop_sidebarIsOpen;

        const positionStyles = CoreObservable.App.computed(
            (btnSize, direction, isOpen) => {
                const styles: Record<string, string> = {
                    position: "absolute",
                    zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_btn)),
                };

                const size = `${btnSize}px`;

                if (direction === SidebarDirection.LTR) {
                    styles["right"] = isOpen
                        ? `calc(-${size} + ${btnSize / 4}px)`
                        : `-${size}`;
                    styles["top"] = "50%";
                    styles["transform"] = "translate(0, -50%)";
                    styles["width"] = size;
                    styles["height"] = size;
                } else if (direction === SidebarDirection.RTL) {
                    styles["left"] = isOpen
                        ? `calc(-${size} + ${btnSize / 4}px)`
                        : `-${size}`;
                    styles["top"] = "50%";
                    styles["transform"] = "translate(0, -50%)";
                    styles["width"] = size;
                    styles["height"] = size;
                } else if (direction === SidebarDirection.TTB) {
                    styles["bottom"] = isOpen
                        ? `calc(-${size} + ${btnSize / 4}px)`
                        : `-${size}`;
                    styles["left"] = "50%";
                    styles["transform"] = "translate(-50%, 0)";
                    styles["width"] = size;
                    styles["height"] = size;
                } else if (direction === SidebarDirection.BTT) {
                    styles["top"] = isOpen
                        ? `calc(-${size} + ${btnSize / 4}px)`
                        : `-${size}`;
                    styles["left"] = "50%";
                    styles["transform"] = "translate(-50%, 0)";
                    styles["width"] = size;
                    styles["height"] = size;
                }

                return styles;
            },
            [prop_sidebarBtnOpenSize, prop_sidebarDirection, prop_sidebarIsOpen],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            styles: {
                position: "absolute",
            },
            stylesBind: positionStyles as any,
            children: [
                this.executeSchemaPart(Schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderContentSidebarContentPositionButton — دکمه toggle
    --------------------------------------------- */
    protected renderContentSidebarContentPositionButton(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sidebarBtnOpenSize = data?.["prop_sidebarBtnOpenSize"] ?? bind.prop_sidebarBtnOpenSize;

        const buttonInstance = UiCategory.UI.Simples.Button(
            {
                classList: [],
                prop_btnStyles: {
                    padding: "0",
                },
                prop_btnWidth: CoreObservable.App.computed(
                    (size) => `${size}px`,
                    [prop_sidebarBtnOpenSize],
                    this.getScope(),
                ) as any,
                prop_btnHeight: CoreObservable.App.computed(
                    (size) => `${size}px`,
                    [prop_sidebarBtnOpenSize],
                    this.getScope(),
                ) as any,
                prop_btnType: ButtonAction.BUTTON,
                prop_btnTitle: this.executeSchemaPart(Schemas.CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON.part, {}),
            },
            {
                CLICK: (event: Event, dataArgs: any, componentArgs: any) => {
                    const isOpen = this.get("prop_sidebarIsOpen");
                    this.set("prop_sidebarIsOpen", !isOpen);
                },
            } as any,
        );

        return (buttonInstance as any).getReactiveElement
            ? (buttonInstance as any).getReactiveElement()
            : buttonInstance as any;
    }


    /* ---------------------------------------------
       renderContentSidebarContentPositionButtonIcon — آیکون دکمه toggle
    --------------------------------------------- */
    protected renderContentSidebarContentPositionButtonIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sidebarBtnOpenSize = data?.["prop_sidebarBtnOpenSize"] ?? bind.prop_sidebarBtnOpenSize;
        const prop_sidebarIsOpen     = data?.["prop_sidebarIsOpen"]     ?? bind.prop_sidebarIsOpen;
        const prop_sidebarDirection   = data?.["prop_sidebarDirection"]   ?? bind.prop_sidebarDirection;

        const iconColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

        const iconDefObservable = CoreObservable.App.computed(
            (isOpen, direction) => {
                let iconName: string;

                switch (direction) {
                    case SidebarDirection.TTB:
                        iconName = isOpen ? "arrowChevronUp" : "ArrowChevronDown";
                        break;
                    case SidebarDirection.RTL:
                        iconName = isOpen ? "ArrowChevronRight" : "ArrowChevronLeft";
                        break;
                    case SidebarDirection.BTT:
                        iconName = isOpen ? "ArrowChevronDown" : "ArrowChevronUp";
                        break;
                    case SidebarDirection.LTR:
                    default:
                        iconName = isOpen ? "ArrowChevronLeft" : "ArrowChevronRight";
                        break;
                }

                const iconModule = (UiIcons.Src as any)?.[iconName];
                return iconModule?.Definition ?? null;
            },
            [prop_sidebarIsOpen, prop_sidebarDirection],
            this.getScope(),
        );

        const iconSizeObservable = CoreObservable.App.computed(
            (btnSize) => Math.round(2 * btnSize / 3),
            [prop_sidebarBtnOpenSize],
            this.getScope(),
        );

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                prop_iconStyles: {
                    textAlign: "center",
                },
                prop_icon: UiIcons.CreateIcon(iconDefObservable as any, {
                    size:      iconSizeObservable as any,
                    primaryColor: iconColor,
                }),
            } as any,
            {} as any,
        );

        return (iconInstance as any).getReactiveElement
            ? (iconInstance as any).getReactiveElement()
            : iconInstance as any;
    }
}
