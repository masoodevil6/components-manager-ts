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
        this.disposeStep();
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

        return CoreReactive.App.part("section", {
            attrs: {
                ...attrsDefault,
            },
            styles: {
                cursor: "pointer",
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
                "d-block", "w-100", "h-100",
            ],
            on: {
                click: (event: Event) => {
                    CoreObservable.App.computed(
                        (selectorTypeShow, floatShowControlWithSelf) => {
                            if (!floatShowControlWithSelf) {
                                if (selectorTypeShow === ShowTypes.CLICK && this._BORDER_INSTANCE) {
                                    this._IS_SHOW = !this._IS_SHOW;
                                    this._BORDER_INSTANCE.set("prop_show", this._IS_SHOW);
                                    if (this._IS_SHOW) {
                                        this._addDocumentClickListener();
                                    } else {
                                        this._removeDocumentClickListener();
                                    }
                                }
                            }
                        },
                        [prop_selectorShowType, prop_floatShowControlWithSelf],
                        this.getScope(),
                    );
                },
                mouseenter: (event: Event) => {
                    CoreObservable.App.computed(
                        (selectorTypeShow, floatShowControlWithSelf) => {
                            if (!floatShowControlWithSelf && selectorTypeShow === ShowTypes.HOVER && this._BORDER_INSTANCE) {
                                this._BORDER_INSTANCE.set("prop_show", true);
                            }
                        },
                        [prop_selectorShowType, prop_floatShowControlWithSelf],
                        this.getScope(),
                    );
                },
                mouseleave: (event: Event) => {
                    CoreObservable.App.computed(
                        (selectorTypeShow, floatShowControlWithSelf) => {
                            if (!floatShowControlWithSelf && selectorTypeShow === ShowTypes.HOVER && this._BORDER_INSTANCE) {
                                this._BORDER_INSTANCE.set("prop_show", false);
                            }
                        },
                        [prop_selectorShowType, prop_floatShowControlWithSelf],
                        this.getScope(),
                    );
                },
            },
            children: [
                prop_selectorContent,
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
        const prop_floatShowControlWithSelf = data?.["prop_floatShowControlWithSelf"] ?? bind.prop_floatShowControlWithSelf;
        const prop_floatIsShow              = data?.["prop_floatIsShow"]              ?? bind.prop_floatIsShow;

        const showObservable = CoreObservable.App.computed(
            (floatShowControlWithSelf, floatIsShow) => {
                if (floatShowControlWithSelf) {
                    return floatIsShow;
                }
                return false;
            },
            [prop_floatShowControlWithSelf, prop_floatIsShow],
            this.getScope(),
        );

        const positionStyles = this.getStylePositionStyles(
            prop_floatDirectionType,
            prop_floatArrowWidth,
            prop_floatPosition,
        );

        return CoreObservable.App.conditionWhen(
            [showObservable],
            (isShow) => isShow === true,
            () => {
                return CoreReactive.App.part("div", {
                    attrs: {
                        ...attrsDefault,
                    },
                    styles: {
                        position: "absolute",
                        display:  "block",
                        "min-width": "350px",
                        "z-index": `${UtilStyle.Css_ZIndex(UtilConst.ZIndex.notify)}`,
                    },
                    stylesBind: positionStyles as any,
                    children: [
                        this.executeSchemaPart(Schemas.SELECTOR_POSITION_BORDER.part, {}),
                    ],
                });
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

        const borderArrowType = CoreObservable.App.computed(
            (direction: DirectionTypes) => {
                return ComponentFloatMenu._directionToArrow[direction];
            },
            [prop_floatDirection],
            this.getScope(),
        );

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
                const padding = UtilStyle.Css_Padding(sizeName);
                return {
                    paddingLeft:  padding,
                    paddingRight: padding,
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
                            styles["right"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        } else {
                            styles["left"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        }
                        break;

                    case DirectionTypes.BOTTOM:
                        styles["top"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(20, UtilConst.Units.PEXEL),
                        );
                        if (dirRtl) {
                            styles["right"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        } else {
                            styles["left"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
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
