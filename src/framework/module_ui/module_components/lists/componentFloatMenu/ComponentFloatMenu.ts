import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
// --------------------------------
import {ComponentFloatMenuBase}    from "./ComponentFloatMenuBase";
import {createFloatMenuStep}       from "./Step";
import {Schemas}                   from "./Schemas";
import {MethodsConfigType}         from "./Methods";
import {
    DirectionTypes,
    ShowTypes,
    Props,
} from "./Props";
import {PropsType}                 from "./Props";
import {PartAttrDefault}           from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as UiCategory             from "@/ui_categories";
import {ArrowTypes}                from "../componentBorder/Props";


/**
 * ComponentFloatMenu — کلاس نهایی (Plan 11.1 — بازیابی کامل Behavior Legacy)
 *
 * معماری Composition:
 *   ComponentFloatMenu HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderSelector (محتوای اختصاصی ComponentFloatMenu)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (خالی — presentational)
 *   identity — { unique?, emit?, events? }
 *
 * Plan 11.1 — Behavior بازیابی‌شده از Legacy:
 *   ۱. selector با showType (HOVER یا CLICK) — toggle/show/hide float panel
 *   ۲. inline positioning — direction-based offsets (TOP/BOTTOM/LEFT/RIGHT)
 *   ۳. Composition با UiCategory.UI.Contents.Border برای float panel
 *   ۴. arrow direction mapping (TOP→BOTTOM, BOTTOM→TOP, LEFT→RIGHT, RIGHT→LEFT)
 *   ۵. RTL-aware positioning (left/right swap)
 *   ۶. prop_floatShowControlWithSelf — کنترل نمایش از prop_floatIsShow
 *   ۷. document click listener برای click showType (close on outside click)
 */
export class ComponentFloatMenu extends ComponentFloatMenuBase {

    /* ---------------------------------------------
       Internal State — visibility of float panel
       نشان‌گر داخلی نمایش/عدم نمایش float panel
    --------------------------------------------- */
    private _IS_SHOW: boolean = false;

    /**
     * Reference به Border instance برای set prop_show
     * در legacy معادل _COMPONENT_POSITION بود
    */
    private _BORDER_INSTANCE: any = null;

    /**
     * Document click listener برای close-on-outside-click
    */
    private _DOCUMENT_CLICK_HANDLER: ((event: MouseEvent) => void) | null = null;
    private _POSITION_FRAME: number | null = null;
    private _POSITION_RESIZE_HANDLER: (() => void) | null = null;
    private _POSITION_OBSERVER: ResizeObserver | null = null;
    private _POSITION_OBSERVED_POPUP: HTMLElement | null = null;


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentFloatMenu>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createFloatMenuStep();

        super("floatMenu", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    /* ---------------------------------------------
       Plan 8.2.7 — Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this._removeDocumentClickListener();
        if (this._POSITION_FRAME !== null) cancelAnimationFrame(this._POSITION_FRAME);
        this._POSITION_OBSERVER?.disconnect();
        this._POSITION_OBSERVER = null;
        this._POSITION_OBSERVED_POPUP = null;
        if (this._POSITION_RESIZE_HANDLER) {
            window.removeEventListener("resize", this._POSITION_RESIZE_HANDLER);
            window.removeEventListener("scroll", this._POSITION_RESIZE_HANDLER, true);
            this._POSITION_RESIZE_HANDLER = null;
        }
        this.disposeStep();
    }

    setShow(show: boolean): void {
        this._IS_SHOW = show;
        this._COMPONENT_PROPS_BIND.prop_floatIsShow?.set?.(show);
        this._BORDER_INSTANCE?.set("prop_show", show);
        if (show) this._addDocumentClickListener();
        else this._removeDocumentClickListener();
    }


    /* ---------------------------------------------
       Plan 11.2 — renderContentComponent
       لایه ساختار از طریق Schema پایه رندر می‌شود.
       renderContentComponent فقط محتوای اختصاصی را رندر می‌کند.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.SELECTOR.part, {});
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
            case Schemas.SELECTOR.part:
                return this.renderSelector(attrsDefault, data, extra);
            case Schemas.SELECTOR_POSITION.part:
                return this.renderSelectorPosition(attrsDefault, data, extra);
            case Schemas.SELECTOR_POSITION_BORDER.part:
                return this.renderSelectorPositionBorder(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       Static Lookup Maps — direction → arrow type
    --------------------------------------------- */
    private static readonly _directionToArrow: Record<DirectionTypes, ArrowTypes> = {
        [DirectionTypes.TOP]:    ArrowTypes.BOTTOM,
        [DirectionTypes.BOTTOM]: ArrowTypes.TOP,
        [DirectionTypes.LEFT]:   ArrowTypes.RIGHT,
        [DirectionTypes.RIGHT]:  ArrowTypes.LEFT,
    };


    /* ---------------------------------------------
       renderSelector — بخش trigger (selector)
    --------------------------------------------- */
    protected renderSelector(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_selectorContent           = data?.["prop_selectorContent"]           ?? bind.prop_selectorContent;
        const prop_selectorClass             = data?.["prop_selectorClass"]             ?? bind.prop_selectorClass;
        const prop_selectorStyles            = data?.["prop_selectorStyles"]            ?? bind.prop_selectorStyles;
        const prop_selectorShowType          = data?.["prop_selectorShowType"]          ?? bind.prop_selectorShowType;
        const prop_floatShowControlWithSelf  = data?.["prop_floatShowControlWithSelf"]  ?? bind.prop_floatShowControlWithSelf;
        const prop_floatIsShow               = data?.["prop_floatIsShow"]               ?? bind.prop_floatIsShow;

        const handleSelectorClick = (event: Event) => {
            if ((event.target as Element | null)?.closest?.('[aria-disabled="true"]')) return;
            CoreObservable.App.computed(
                (selectorTypeShow, floatShowControlWithSelf) => {
                    if (selectorTypeShow !== ShowTypes.CLICK || !this._BORDER_INSTANCE) return;
                    this._IS_SHOW = !this._IS_SHOW;
                    prop_floatIsShow?.set?.(this._IS_SHOW);
                    this._BORDER_INSTANCE.set("prop_show", this._IS_SHOW);
                    if (this._IS_SHOW) this.schedulePopupAdjustment();
                    if (this._IS_SHOW) this._addDocumentClickListener();
                    else this._removeDocumentClickListener();
                },
                [prop_selectorShowType, prop_floatShowControlWithSelf],
                this.getScope(),
            );
        };
        const selectorTrigger = CoreReactive.App.part("span", {
            styles: {display: "contents", cursor: "pointer"},
            on: {
                mouseover: (event: MouseEvent) => {
                    const selector = event.currentTarget as HTMLElement;
                    if (event.relatedTarget instanceof Node && selector.contains(event.relatedTarget)) return;
                    CoreObservable.App.computed(
                        (selectorTypeShow, floatShowControlWithSelf) => {
                            if (!floatShowControlWithSelf && selectorTypeShow === ShowTypes.HOVER && this._BORDER_INSTANCE) {
                                this._BORDER_INSTANCE.set("prop_show", true);
                                this.schedulePopupAdjustment();
                            }
                        },
                        [prop_selectorShowType, prop_floatShowControlWithSelf],
                        this.getScope(),
                    );
                },
                mouseout: (event: MouseEvent) => {
                    const selector = event.currentTarget as HTMLElement;
                    if (event.relatedTarget instanceof Node && selector.contains(event.relatedTarget)) return;
                    CoreObservable.App.computed(
                        (selectorTypeShow, floatShowControlWithSelf) => {
                            if (!floatShowControlWithSelf && selectorTypeShow === ShowTypes.HOVER && this._BORDER_INSTANCE) this._BORDER_INSTANCE.set("prop_show", false);
                        },
                        [prop_selectorShowType, prop_floatShowControlWithSelf],
                        this.getScope(),
                    );
                },
            },
            children: [prop_selectorContent],
        });
        selectorTrigger.getElement().addEventListener("click", handleSelectorClick, true);

        return CoreReactive.App.part("section", {
            attrs: {
                ...attrsDefault,
            },
            styles: {
                outline: "none",
            },
            stylesBind: {
                lineHeight: this.getStyleSelectorLineHeight(),
                fontSize:   this.getStyleSelectorFontSize(),
                prop_selectorStyles,
            } as any,
            classBind: [
                prop_selectorClass,
            ],
            className: [
                "d-inline-block",
            ],
            children: [
                selectorTrigger,
                this.executeSchemaPart(Schemas.SELECTOR_POSITION.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderSelectorPosition — بخش positioning (inline)
       جایگزین ComponentElementPosition با inline styles
    --------------------------------------------- */
    protected renderSelectorPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_floatDirectionType       = data?.["prop_floatDirectionType"]       ?? bind.prop_floatDirectionType;
        const prop_floatArrowWidth          = data?.["prop_floatArrowWidth"]          ?? bind.prop_floatArrowWidth;
        const prop_floatPosition            = data?.["prop_floatPosition"]            ?? bind.prop_floatPosition;
        const prop_floatMinWidth            = data?.["prop_floatMinWidth"]            ?? bind.prop_floatMinWidth;
        const prop_floatStyles              = data?.["prop_floatStyles"]              ?? bind.prop_floatStyles;
        const prop_floatShowControlWithSelf = data?.["prop_floatShowControlWithSelf"] ?? bind.prop_floatShowControlWithSelf;
        const prop_floatIsShow              = data?.["prop_floatIsShow"]              ?? bind.prop_floatIsShow;

        // Plan 11.1 fix — showObservable:
        //   floatShowControlWithSelf=true  → returns floatIsShow (controlled by prop)
        //   floatShowControlWithSelf=false → returns true (popup همیشه در DOM)
        //     visibility واقعی از طریق prop_show روی border کنترل می‌شه
        //     (mouseenter/mouseleave/click handlers روی _BORDER_INSTANCE.set("prop_show", ...) صدا می‌زنند)
        //   قبلاً false برمی‌گرداند که باعث می‌شد conditionWhen popup را اصلاً نسازد
        //   و _BORDER_INSTANCE null می‌شد و hover handlers بی‌اثیر می‌شدند
        const showObservable = CoreObservable.App.computed(
            (floatShowControlWithSelf, floatIsShow) => {
                if (floatShowControlWithSelf) {
                    return floatIsShow;
                }
                return true;
            },
            [prop_floatShowControlWithSelf, prop_floatIsShow],
            this.getScope(),
        );

        const positionStyles = CoreObservable.App.computed(
            (positionStyles, minWidth, customStyles) => ({
                ...positionStyles,
                "min-width": minWidth ?? "350px",
                ...(customStyles ?? {}),
            }),
            [
                this.getStylePositionStyles(
                    prop_floatDirectionType,
                    prop_floatArrowWidth,
                    prop_floatPosition,
                ),
                prop_floatMinWidth,
                prop_floatStyles,
            ],
            this.getScope(),
        );

        if (!this._POSITION_RESIZE_HANDLER) {
            this._POSITION_RESIZE_HANDLER = () => this.schedulePopupAdjustment();
            window.addEventListener("resize", this._POSITION_RESIZE_HANDLER);
            window.addEventListener("scroll", this._POSITION_RESIZE_HANDLER, true);
        }

        return CoreObservable.App.conditionWhen(
            [showObservable],
            (isShow) => isShow === true,
            () => {
                const popup = CoreReactive.App.part("div", {
                    attrs: {
                        ...attrsDefault,
                    },
                    styles: {
                        position: "absolute",
                        display:  "block",
                        visibility: "hidden",
                        "z-index": `${UtilStyle.Css_ZIndex(UtilConst.ZIndex.notify)}`,
                    },
                    stylesBind: positionStyles as any,
                    children: [
                        this.executeSchemaPart(Schemas.SELECTOR_POSITION_BORDER.part, {}),
                    ],
                });
                this.schedulePopupAdjustment();
                return popup;
            },
            () => {
                return this.renderEmptyContent(attrsDefault);
            },
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderSelectorPositionBorder — بخش border (Composition)
       Composition با UiCategory.UI.Contents.Border
    --------------------------------------------- */
    protected renderSelectorPositionBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_floatClass        = data?.["prop_floatClass"]        ?? bind.prop_floatClass;
        const prop_floatStyles       = data?.["prop_floatStyles"]       ?? bind.prop_floatStyles;
        const prop_floatContent      = data?.["prop_floatContent"]      ?? bind.prop_floatContent;
        const prop_floatDirection    = data?.["prop_floatDirectionType"] ?? bind.prop_floatDirectionType;
        const prop_floatArrowWidth   = data?.["prop_floatArrowWidth"]   ?? bind.prop_floatArrowWidth;
        const prop_floatBorderWidth  = data?.["prop_floatBorderWidth"]  ?? bind.prop_floatBorderWidth;
        const prop_floatBorderColor  = data?.["prop_floatBorderColor"]  ?? bind.prop_floatBorderColor;
        const prop_floatBorderRadius = data?.["prop_floatBorderRadius"] ?? bind.prop_floatBorderRadius;
        const prop_floatWidth        = data?.["prop_floatWidth"]        ?? bind.prop_floatWidth;
        const prop_floatMinWidth     = data?.["prop_floatMinWidth"]     ?? bind.prop_floatMinWidth;
        const prop_floatArrowPosition = data?.["prop_floatArrowPosition"] ?? bind.prop_floatArrowPosition;
        const prop_floatBackground   = data?.["prop_floatBackground"]   ?? bind.prop_floatBackground;
        const prop_floatColor        = data?.["prop_floatColor"]        ?? bind.prop_floatColor;
        const prop_floatShowControlWithSelf = data?.["prop_floatShowControlWithSelf"] ?? bind.prop_floatShowControlWithSelf;
        const prop_floatIsShow       = data?.["prop_floatIsShow"]              ?? bind.prop_floatIsShow;

        const borderArrowType = CoreObservable.App.computed(
            (direction: DirectionTypes) => {
                return ComponentFloatMenu._directionToArrow[direction];
            },
            [prop_floatDirection],
            this.getScope(),
        );

        // Plan 11.1 fix — وقتی floatShowControlWithSelf=false (HOVER/CLICK mode):
        //   border با prop_show:false شروع می‌شه (hidden)
        //   hover/click handlers با _BORDER_INSTANCE.set("prop_show", true/false) آن را toggle می‌کنند
        //   وقتی floatShowControlWithSelf=true: prop_show از prop_floatIsShow کنترل می‌شه
        const initialShow = prop_floatShowControlWithSelf
            ? (prop_floatIsShow?.get?.() ?? false)
            : false;

        const borderInstance = UiCategory.UI.Contents.Border(
            {
                prop_borderClass:             ["shadow-sm", "position-relative"],
                prop_borderStyles:            this.getStyleBorderPadding() as any,
                prop_borderArrowType:         borderArrowType as any,
                prop_borderArrowPosition:     prop_floatArrowPosition,
                prop_borderArrowWidth:        prop_floatArrowWidth,
                prop_content:                 prop_floatContent,
                prop_borderRadius:            prop_floatBorderRadius,
                prop_borderWidth:             prop_floatBorderWidth,
                prop_width:                   prop_floatWidth,
                prop_minWidth:                prop_floatMinWidth,
                prop_contentBackgroundColor:  prop_floatBackground,
                prop_borderColor:             prop_floatBorderColor,
                prop_contentColor:            prop_floatColor,
                prop_show:                    initialShow,
            } as any,
            {} as any,
        );

        this._BORDER_INSTANCE = borderInstance;

        return borderInstance.getReactiveElement();
    }


    /* ---------------------------------------------
       Document Click Listener — close on outside click
    --------------------------------------------- */
    private _addDocumentClickListener(): void {
        if (this._DOCUMENT_CLICK_HANDLER) return;

        this._DOCUMENT_CLICK_HANDLER = (event: MouseEvent) => {
            const el = this.getElement() as any;
            if (el && !el.contains(event.target as Node)) {
                if (this._BORDER_INSTANCE) {
                    this._IS_SHOW = false;
                    this._COMPONENT_PROPS_BIND.prop_floatIsShow?.set?.(false);
                    this._BORDER_INSTANCE.set("prop_show", false);
                }
                this._removeDocumentClickListener();
            }
        };

        document.addEventListener("click", this._DOCUMENT_CLICK_HANDLER);
    }

    private _removeDocumentClickListener(): void {
        if (this._DOCUMENT_CLICK_HANDLER) {
            document.removeEventListener("click", this._DOCUMENT_CLICK_HANDLER);
            this._DOCUMENT_CLICK_HANDLER = null;
        }
    }

    private schedulePopupAdjustment(): void {
        if (this._POSITION_FRAME !== null) cancelAnimationFrame(this._POSITION_FRAME);
        this._POSITION_FRAME = requestAnimationFrame(() => {
            this._POSITION_FRAME = requestAnimationFrame(() => {
                this._POSITION_FRAME = null;
                this.adjustPopupToViewport();
            });
        });
    }

    /** Keep the popup inside the visual viewport after it is laid out. */
    private adjustPopupToViewport(): void {
        const root = this.getElement() as HTMLElement | null;
        const popup = root?.querySelector('[data-part-name="part-selector-position"]') as HTMLElement | null;
        if (!popup || !popup.isConnected) {
            // The reactive tree can schedule its first frame before the DOM commit.
            // Keep the popup hidden and retry so it never flashes at the unadjusted position.
            this.schedulePopupAdjustment();
            return;
        }

        if (this._POSITION_OBSERVED_POPUP !== popup && typeof ResizeObserver !== "undefined") {
            this._POSITION_OBSERVER?.disconnect();
            this._POSITION_OBSERVER = new ResizeObserver(() => this.schedulePopupAdjustment());
            this._POSITION_OBSERVER.observe(popup);
            const border = popup.querySelector('[data-part-name="part-border"]');
            if (border) this._POSITION_OBSERVER.observe(border);
            this._POSITION_OBSERVED_POPUP = popup;
        }

        const viewport = window.visualViewport;
        const leftEdge = Math.max(0, viewport?.offsetLeft ?? 0);
        const rightEdge = Math.min(window.innerWidth, leftEdge + (viewport?.width ?? window.innerWidth));
        const gap = 8;
        // `translate` is independent of the transform used for vertical placement.
        popup.style.translate = "0px 0px";
        const availableWidth = Math.max(0, rightEdge - leftEdge - gap * 2);

        popup.style.boxSizing = "border-box";
        popup.style.maxWidth = `${availableWidth}px`;
        const currentMinWidth = parseFloat(getComputedStyle(popup).minWidth) || 0;
        popup.style.minWidth = `${Math.min(currentMinWidth, availableWidth)}px`;

        const adjustedRect = popup.getBoundingClientRect();
        const overflowLeft = leftEdge + gap - adjustedRect.left;
        const overflowRight = adjustedRect.right - (rightEdge - gap);
        if (overflowLeft > 0) popup.style.translate = `${overflowLeft}px 0px`;
        else if (overflowRight > 0) popup.style.translate = `${-overflowRight}px 0px`;
        popup.style.visibility = "visible";
    }


    /// ---------------------
    //  Style Getters — private و کوچک (الگوی componentButton)
    /// ---------------------

    /**
     * ارتفاع خط selector بر اساس sizeName سراسری
    */
    private getStyleSelectorLineHeight() {
        return CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    /**
     * اندازه فونت selector بر اساس sizeName سراسری
    */
    private getStyleSelectorFontSize() {
        return CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    /**
     * padding داخلی border بر اساس sizeName سراسری
    */
    private getStyleBorderPadding() {
        return CoreObservable.App.computed(
            (sizeName: any) => {
                const margin = UtilStyle.Css_Margin(sizeName);
                return {
                    padding: margin,
                };
            },
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    /**
     * محاسبه styleهای position بر اساس direction
     * inline positioning — جایگزین ComponentElementPosition
    */
    private getStylePositionStyles(
        prop_floatDirection:  any,
        prop_floatArrowWidth: any,
        prop_floatPosition:   any,
    ) {
        return CoreObservable.App.computed(
            (direction: DirectionTypes, arrowWidth: number, position: string | null, dirRtl: boolean) => {
                const styles: Record<string, string> = {};

                switch (direction) {
                    case DirectionTypes.TOP:
                        styles["bottom"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.MINUS,
                            UtilStyle.Css_SizeUnit(10, UtilConst.Units.PEXEL),
                        );
                        if (dirRtl) {
                            styles["left"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        } else {
                            styles["right"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        }
                        break;

                    case DirectionTypes.BOTTOM:
                        styles["top"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(20, UtilConst.Units.PEXEL),
                        );
                        if (dirRtl) {
                            styles["left"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        } else {
                            styles["right"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        }
                        break;

                    case DirectionTypes.LEFT:
                        styles["right"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                        );
                        styles["top"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT);
                        styles["transform"] = "translate(0, -50%)";
                        break;

                    case DirectionTypes.RIGHT:
                        styles["left"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                        );
                        styles["top"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT);
                        styles["transform"] = "translate(0, -50%)";
                        break;
                }

                return styles;
            },
            [prop_floatDirection, prop_floatArrowWidth, prop_floatPosition, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

}
