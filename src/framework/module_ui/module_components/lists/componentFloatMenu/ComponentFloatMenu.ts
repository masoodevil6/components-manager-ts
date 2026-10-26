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
 * ComponentFloatMenu â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 11.1 â€” Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Ú©Ø§Ù…Ù„ Behavior Legacy)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentFloatMenu HAS-A ComponentStructure (Ù†Ù‡ IS-A)
 *   ComponentStructure Ø¯Ø± renderContentComponent Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = renderSelector (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentFloatMenu)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (Ø®Ø§Ù„ÛŒ â€” presentational)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 11.1 â€” Behavior Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒâ€ŒØ´Ø¯Ù‡ Ø§Ø² Legacy:
 *   Û±. selector Ø¨Ø§ showType (HOVER ÛŒØ§ CLICK) â€” toggle/show/hide float panel
 *   Û². inline positioning â€” direction-based offsets (TOP/BOTTOM/LEFT/RIGHT)
 *   Û³. Composition Ø¨Ø§ UiCategory.UI.Contents.Border Ø¨Ø±Ø§ÛŒ float panel
 *   Û´. arrow direction mapping (TOPâ†’BOTTOM, BOTTOMâ†’TOP, LEFTâ†’RIGHT, RIGHTâ†’LEFT)
 *   Ûµ. RTL-aware positioning (left/right swap)
 *   Û¶. prop_floatShowControlWithSelf â€” Ú©Ù†ØªØ±Ù„ Ù†Ù…Ø§ÛŒØ´ Ø§Ø² prop_floatIsShow
 *   Û·. document click listener Ø¨Ø±Ø§ÛŒ click showType (close on outside click)
 */
export class ComponentFloatMenu extends ComponentFloatMenuBase<ReturnType<typeof createFloatMenuStep>>{

    /* ---------------------------------------------
       Internal State â€” visibility of float panel
       Ù†Ø´Ø§Ù†â€ŒÚ¯Ø± Ø¯Ø§Ø®Ù„ÛŒ Ù†Ù…Ø§ÛŒØ´/Ø¹Ø¯Ù… Ù†Ù…Ø§ÛŒØ´ float panel
    --------------------------------------------- */
    private _IS_SHOW: boolean = false;

    /**
     * Reference Ø¨Ù‡ Border instance Ø¨Ø±Ø§ÛŒ set prop_show
     * Ø¯Ø± legacy Ù…Ø¹Ø§Ø¯Ù„ _COMPONENT_POSITION Ø¨ÙˆØ¯
    */
    private _BORDER_INSTANCE: any = null;

    /**
     * Document click listener Ø¨Ø±Ø§ÛŒ close-on-outside-click
    */
    private _DOCUMENT_CLICK_HANDLER: ((event: MouseEvent) => void) | null = null;
    private _HOVER_HIDE_TIMEOUT: ReturnType<typeof setTimeout> | null = null;
    private _POSITION_FRAME: number | null = null;
    private _POSITION_RESIZE_HANDLER: (() => void) | null = null;
    private _POSITION_OBSERVER: ResizeObserver | null = null;
    private _POSITION_OBSERVED_POPUP: HTMLElement | null = null;
    private _PORTALLED_POPUP: HTMLElement | null = null;
    private _PORTAL_PLACEHOLDER: Comment | null = null;
    private _RELATED_TARGET_CONTAINS: ((target: EventTarget | null) => boolean) | null = null;
    private _SELECTOR_CLICK_HANDLER: ((event: Event) => void) | null = null;
    private _SELECTOR_CLICK_ROOT: HTMLElement | null = null;
    private _PORTAL_OFFSET_X = 0;
    private _PORTAL_OFFSET_Y = 0;
    private readonly _PORTAL_PLACEMENT = new CoreObservable.App<DirectionTypes | null>(null);


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
       Plan 8.2.7 â€” Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this._removeDocumentClickListener();
        this.clearHoverHideTimeout();
        if (this._POSITION_FRAME !== null) cancelAnimationFrame(this._POSITION_FRAME);
        this._POSITION_OBSERVER?.disconnect();
        this._POSITION_OBSERVER = null;
        this._POSITION_OBSERVED_POPUP = null;
        this._PORTALLED_POPUP?.remove();
        this._PORTAL_PLACEHOLDER?.remove();
        this._PORTALLED_POPUP = null;
        this._PORTAL_PLACEHOLDER = null;
        this._RELATED_TARGET_CONTAINS = null;
        if (this._SELECTOR_CLICK_HANDLER) {
            this._SELECTOR_CLICK_ROOT?.removeEventListener("click", this._SELECTOR_CLICK_HANDLER, true);
            this._SELECTOR_CLICK_HANDLER = null;
            this._SELECTOR_CLICK_ROOT = null;
        }
        if (this._POSITION_RESIZE_HANDLER) {
            window.removeEventListener("resize", this._POSITION_RESIZE_HANDLER);
            window.removeEventListener("scroll", this._POSITION_RESIZE_HANDLER, true);
            this._POSITION_RESIZE_HANDLER = null;
        }
        this.disposeStep();
    }

    setShow(show: boolean): void {
        this.clearHoverHideTimeout();
        this._IS_SHOW = show;
        this._COMPONENT_PROPS_BIND.prop_floatIsShow?.set?.(show);
        this._BORDER_INSTANCE?.set("prop_show", show);
        if (show && this._isPortalEnabled()) this.schedulePopupAdjustment();
        if (!show && this._PORTALLED_POPUP) this._PORTALLED_POPUP.style.visibility = "hidden";
        if (show && this._COMPONENT_PROPS_BIND.prop_selectorShowType?.get?.() === ShowTypes.CLICK) {
            this._addDocumentClickListener();
        } else {
            this._removeDocumentClickListener();
        }
    }

    containsTarget(target: EventTarget | null): boolean {
        return this._isInsideOwnMenu(target, this.getElement() as HTMLElement);
    }

    /** Treat related popups in a composite menu as part of the same hover region. */
    setRelatedTargetContains(predicate: ((target: EventTarget | null) => boolean) | null): void {
        this._RELATED_TARGET_CONTAINS = predicate;
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
       Ù„Ø§ÛŒÙ‡ Ø³Ø§Ø®ØªØ§Ø± Ø§Ø² Ø·Ø±ÛŒÙ‚ Schema Ù¾Ø§ÛŒÙ‡ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
       renderContentComponent ÙÙ‚Ø· Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.SELECTOR.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
       Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
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
       Static Lookup Maps â€” direction â†’ arrow type
    --------------------------------------------- */
    private static readonly _directionToArrow: Record<DirectionTypes, ArrowTypes> = {
        [DirectionTypes.TOP]:    ArrowTypes.BOTTOM,
        [DirectionTypes.BOTTOM]: ArrowTypes.TOP,
        [DirectionTypes.LEFT]:   ArrowTypes.RIGHT,
        [DirectionTypes.RIGHT]:  ArrowTypes.LEFT,
    };


    /* ---------------------------------------------
       renderSelector â€” Ø¨Ø®Ø´ trigger (selector)
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

        const handleSelectorClick = (event: Event) => {
            const target = event.target as Element | null;
            if (!target?.closest?.("[data-float-menu-trigger]")) return;
            if ((event.target as Element | null)?.closest?.('[aria-disabled="true"]')) return;
            if (prop_selectorShowType.get() !== ShowTypes.CLICK) return;
            // Click-controlled menus are rendered lazily, so the popup border
            // does not exist on the first click. Toggle the state first; rendering
            // then creates the border with the new state.
            this.setShow(!this._IS_SHOW);
            if (this._IS_SHOW) this.schedulePopupAdjustment();
        };
        const selectorTrigger = CoreReactive.App.part("span", {
            attrs: {"data-float-menu-trigger": ""},
            styles: {display: "contents", cursor: "pointer"},
            on: {
                mouseover: (event: MouseEvent) => {
                    this.clearHoverHideTimeout();
                    const selector = event.currentTarget as HTMLElement;
                    if (this._isInsideMenu(event.relatedTarget, selector)) return;
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
                    const menuRoot = this.getElement() as HTMLElement | null;
                    if (this._isInsideMenu(event.relatedTarget, menuRoot)) {
                        this.clearHoverHideTimeout();
                        return;
                    }
                    this.scheduleHoverHide(prop_selectorShowType, prop_floatShowControlWithSelf);
                },
            },
            children: [prop_selectorContent],
        });
        const selectorRoot = CoreReactive.App.part("section", {
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
            classBind: [prop_selectorClass],
            className: ["d-inline-block"],
            children: [
                selectorTrigger,
                this.executeSchemaPart(Schemas.SELECTOR_POSITION.part, {}),
            ],
        });
        if (this._SELECTOR_CLICK_HANDLER) {
            this._SELECTOR_CLICK_ROOT?.removeEventListener("click", this._SELECTOR_CLICK_HANDLER, true);
        }
        this._SELECTOR_CLICK_HANDLER = handleSelectorClick;
        this._SELECTOR_CLICK_ROOT = selectorRoot.getElement() as HTMLElement;
        this._SELECTOR_CLICK_ROOT.addEventListener("click", handleSelectorClick, true);

        return selectorRoot;
    }


    /* ---------------------------------------------
       renderSelectorPosition â€” Ø¨Ø®Ø´ positioning (inline)
       Ø¬Ø§ÛŒÚ¯Ø²ÛŒÙ† ComponentElementPosition Ø¨Ø§ inline styles
    --------------------------------------------- */
    protected renderSelectorPosition(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_floatDirectionType       = data?.["prop_floatDirectionType"]       ?? bind.prop_floatDirectionType;
        const prop_floatArrowWidth          = data?.["prop_floatArrowWidth"]          ?? bind.prop_floatArrowWidth;
        const prop_floatDistance            = data?.["prop_floatDistance"]            ?? bind.prop_floatDistance;
        const prop_floatPosition            = data?.["prop_floatPosition"]            ?? bind.prop_floatPosition;
        const prop_floatMinWidth            = data?.["prop_floatMinWidth"]            ?? bind.prop_floatMinWidth;
        const prop_floatStyles              = data?.["prop_floatStyles"]              ?? bind.prop_floatStyles;
        const prop_selectorShowType         = data?.["prop_selectorShowType"]         ?? bind.prop_selectorShowType;
        const prop_floatShowControlWithSelf = data?.["prop_floatShowControlWithSelf"] ?? bind.prop_floatShowControlWithSelf;
        const prop_floatIsShow              = data?.["prop_floatIsShow"]              ?? bind.prop_floatIsShow;
        const prop_floatUsePortal           = data?.["prop_floatUsePortal"]           ?? bind.prop_floatUsePortal;

        // Plan 11.1 fix â€” showObservable:
        //   floatShowControlWithSelf=true  â†’ returns floatIsShow (controlled by prop)
        //   floatShowControlWithSelf=false â†’ returns true (popup Ù‡Ù…ÛŒØ´Ù‡ Ø¯Ø± DOM)
        //     visibility ÙˆØ§Ù‚Ø¹ÛŒ Ø§Ø² Ø·Ø±ÛŒÙ‚ prop_show Ø±ÙˆÛŒ border Ú©Ù†ØªØ±Ù„ Ù…ÛŒâ€ŒØ´Ù‡
        //     (mouseenter/mouseleave/click handlers Ø±ÙˆÛŒ _BORDER_INSTANCE.set("prop_show", ...) ØµØ¯Ø§ Ù…ÛŒâ€ŒØ²Ù†Ù†Ø¯)
        //   Ù‚Ø¨Ù„Ø§Ù‹ false Ø¨Ø±Ù…ÛŒâ€ŒÚ¯Ø±Ø¯Ø§Ù†Ø¯ Ú©Ù‡ Ø¨Ø§Ø¹Ø« Ù…ÛŒâ€ŒØ´Ø¯ conditionWhen popup Ø±Ø§ Ø§ØµÙ„Ø§Ù‹ Ù†Ø³Ø§Ø²Ø¯
        //   Ùˆ _BORDER_INSTANCE null Ù…ÛŒâ€ŒØ´Ø¯ Ùˆ hover handlers Ø¨ÛŒâ€ŒØ§Ø«ÛŒØ± Ù…ÛŒâ€ŒØ´Ø¯Ù†Ø¯
        const showObservable = CoreObservable.App.computed(
            (floatShowControlWithSelf, floatIsShow, usePortal) => {
                // Keep portalled popup content mounted after its first render.
                // Recreating the subtree on each open/close can leave the menu's
                // trigger and popup references out of sync after item selection.
                if (usePortal) return true;
                if (floatShowControlWithSelf) {
                    return floatIsShow;
                }
                return true;
            },
            [prop_floatShowControlWithSelf, prop_floatIsShow, prop_floatUsePortal],
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
                    prop_floatDistance,
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
                        "z-index": `${UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR_POPUP)}`,
                    },
                    stylesBind: positionStyles as any,
                    on: {
                        mouseover: () => this.clearHoverHideTimeout(),
                        mouseout: (event: MouseEvent) => {
                            const menuRoot = this.getElement() as HTMLElement | null;
                            if (this._isInsideMenu(event.relatedTarget, menuRoot)) {
                                this.clearHoverHideTimeout();
                                return;
                            }
                            this.scheduleHoverHide(prop_selectorShowType, prop_floatShowControlWithSelf);
                        },
                    },
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
       renderSelectorPositionBorder â€” Ø¨Ø®Ø´ border (Composition)
       Composition Ø¨Ø§ UiCategory.UI.Contents.Border
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
        const prop_floatBorderPadding = data?.["prop_floatBorderPadding"] ?? bind.prop_floatBorderPadding;
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

        const floatBorderHas = CoreObservable.App.computed(
            (width: UtilConst.Sizes | number | null) => width != null && width !== 0,
            [prop_floatBorderWidth],
            this.getScope(),
        );
        const floatBorderRadiusHas = CoreObservable.App.computed(
            (radius: UtilConst.Sizes | number | null) => radius != null && radius !== 0,
            [prop_floatBorderRadius],
            this.getScope(),
        );

        const borderArrowType = CoreObservable.App.computed(
            (direction: DirectionTypes, placement: DirectionTypes | null) => {
                return ComponentFloatMenu._directionToArrow[placement ?? direction];
            },
            [prop_floatDirection, this._PORTAL_PLACEMENT],
            this.getScope(),
        );

        // Plan 11.1 fix â€” ÙˆÙ‚ØªÛŒ floatShowControlWithSelf=false (HOVER/CLICK mode):
        //   border Ø¨Ø§ prop_show:false Ø´Ø±ÙˆØ¹ Ù…ÛŒâ€ŒØ´Ù‡ (hidden)
        //   hover/click handlers Ø¨Ø§ _BORDER_INSTANCE.set("prop_show", true/false) Ø¢Ù† Ø±Ø§ toggle Ù…ÛŒâ€ŒÚ©Ù†Ù†Ø¯
        //   ÙˆÙ‚ØªÛŒ floatShowControlWithSelf=true: prop_show Ø§Ø² prop_floatIsShow Ú©Ù†ØªØ±Ù„ Ù…ÛŒâ€ŒØ´Ù‡
        const initialShow = prop_floatShowControlWithSelf
            ? (prop_floatIsShow?.get?.() ?? false)
            : false;

        const borderInstance = UiCategory.UI.Contents.Border(
            {
                prop_borderClass:             ["shadow-sm", "position-relative"],
                prop_borderStyles:            this.getStyleBorderPadding(prop_floatBorderWidth, prop_floatBorderRadius, prop_floatBorderPadding) as any,
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
                prop_borderTopHas:            floatBorderHas,
                prop_borderRightHas:          floatBorderHas,
                prop_borderBottomHas:         floatBorderHas,
                prop_borderLeftHas:           floatBorderHas,
                prop_borderTopLeftRadiusHas:  floatBorderRadiusHas,
                prop_borderTopRightRadiusHas: floatBorderRadiusHas,
                prop_borderBottomLeftRadiusHas: floatBorderRadiusHas,
                prop_borderBottomRightRadiusHas: floatBorderRadiusHas,
            } as any,
            {} as any,
        );

        this._BORDER_INSTANCE = borderInstance;

        return borderInstance.getReactiveElement();
    }


    /* ---------------------------------------------
       Document Click Listener â€” close on outside click
    --------------------------------------------- */
    private _addDocumentClickListener(): void {
        if (this._DOCUMENT_CLICK_HANDLER) return;

        this._DOCUMENT_CLICK_HANDLER = (event: MouseEvent) => {
            const el = this.getElement() as any;
            if (el && !this._isInsideMenu(event.target, el)) this.setShow(false);
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
        const usePortal = this._isPortalEnabled();
        if (usePortal && !this._IS_SHOW) return;

        if (this._PORTALLED_POPUP && !this._PORTALLED_POPUP.isConnected) {
            this._PORTALLED_POPUP = null;
            this._PORTAL_PLACEHOLDER = null;
        }

        const popup = this._PORTALLED_POPUP ?? root?.querySelector('[data-part-name="part-selector-position"]') as HTMLElement | null;
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
            if (usePortal && root) {
                this._POSITION_OBSERVER.observe(root);
                this.getVerticalClipAncestors(root).forEach((ancestor) => this._POSITION_OBSERVER?.observe(ancestor));
            }
            this._POSITION_OBSERVED_POPUP = popup;
        }

        const viewport = window.visualViewport;
        const leftEdge = Math.max(0, viewport?.offsetLeft ?? 0);
        const rightEdge = Math.min(window.innerWidth, leftEdge + (viewport?.width ?? window.innerWidth));
        const gap = 8;
        const rootRect = root?.getBoundingClientRect();
        const configuredDirection = this._COMPONENT_PROPS_BIND.prop_floatDirectionType?.get?.() as DirectionTypes | undefined;
        // `translate` is independent of the transform used for vertical placement.
        popup.style.translate = "0px 0px";
        const availableWidth = Math.max(0, rightEdge - leftEdge - gap * 2);

        popup.style.boxSizing = "border-box";
        popup.style.maxWidth = `${availableWidth}px`;
        const minWidthSource = this._COMPONENT_PROPS_BIND.prop_floatMinWidth?.get?.();
        const currentMinWidth = getComputedStyle(popup).minWidth;
        const percentageMinWidth = typeof minWidthSource === "string" ? minWidthSource.trim().match(/^(-?(?:\d+\.?\d*|\.\d+))%$/) : null;
        const pixelMinWidth = typeof minWidthSource === "string" ? minWidthSource.trim().match(/^(-?(?:\d+\.?\d*|\.\d+))px$/i) : null;
        const resolvedMinWidth = percentageMinWidth && rootRect
            ? rootRect.width * (parseFloat(percentageMinWidth[1]) / 100)
            : pixelMinWidth
                ? parseFloat(pixelMinWidth[1])
                : parseFloat(currentMinWidth) || 0;
        popup.style.minWidth = `${Math.min(Math.max(0, resolvedMinWidth), availableWidth)}px`;

        if (usePortal && root && rootRect) {
            const currentRect = popup.getBoundingClientRect();
            if (!this._PORTALLED_POPUP) {
                this._PORTAL_OFFSET_X = currentRect.left - rootRect.left;
                this._PORTAL_OFFSET_Y = currentRect.top - rootRect.top;
                this._PORTAL_PLACEHOLDER = document.createComment("float-menu-portal");
                popup.before(this._PORTAL_PLACEHOLDER);
                document.body.appendChild(popup);
                this._PORTALLED_POPUP = popup;
            }

            const floatWidth = this._COMPONENT_PROPS_BIND.prop_floatWidth?.get?.();
            const percentageWidth = typeof floatWidth === "string" ? floatWidth.trim().match(/^(-?(?:\d+\.?\d*|\.\d+))%$/) : null;
            const pixelWidth = typeof floatWidth === "string" ? floatWidth.trim().match(/^(-?(?:\d+\.?\d*|\.\d+))px$/i) : null;
            const portalWidth = percentageWidth
                ? rootRect.width * (parseFloat(percentageWidth[1]) / 100)
                : pixelWidth
                    ? parseFloat(pixelWidth[1])
                    : currentRect.width;

            popup.style.position = "fixed";
            // A portalled popup escapes its owner's stacking context. Keep it above
            // component headers that reserve SELECTOR_POPUP + 1 for their controls.
            const isInsidePageSetting = !!root?.closest("[data-component-page-setting-layer]");
            const popupZIndex = isInsidePageSetting
                ? UtilConst.ZIndex.page_setting + 2
                : UtilStyle.Css_ZIndex(UtilConst.ZIndex.SELECTOR_POPUP) + 2;
            popup.style.zIndex = `${popupZIndex}`;
            popup.style.left = `${rootRect.left + this._PORTAL_OFFSET_X}px`;
            popup.style.right = "auto";
            popup.style.bottom = "auto";
            popup.style.transform = "none";
            popup.style.margin = "0px";
            popup.style.width = `${Math.min(portalWidth, availableWidth)}px`;

            let effectiveDirection = configuredDirection;
            if (configuredDirection === DirectionTypes.TOP || configuredDirection === DirectionTypes.BOTTOM) {
                const bounds = this.getVerticalClipBounds(root);
                const popupHeight = Math.max(popup.getBoundingClientRect().height, popup.scrollHeight);
                const arrowWidth = Number(this._COMPONENT_PROPS_BIND.prop_floatArrowWidth?.get?.()) || 0;
                const distance = Number(this._COMPONENT_PROPS_BIND.prop_floatDistance?.get?.()) || 0;
                const offset = Math.max(0, arrowWidth + distance);
                const availableAbove = Math.max(0, rootRect.top - bounds.top);
                const availableBelow = Math.max(0, bounds.bottom - rootRect.bottom);
                const fitsAbove = popupHeight + offset <= availableAbove;
                const fitsBelow = popupHeight + offset <= availableBelow;

                if (configuredDirection === DirectionTypes.BOTTOM && !fitsBelow && (fitsAbove || availableAbove > availableBelow)) {
                    effectiveDirection = DirectionTypes.TOP;
                } else if (configuredDirection === DirectionTypes.TOP && !fitsAbove && (fitsBelow || availableBelow > availableAbove)) {
                    effectiveDirection = DirectionTypes.BOTTOM;
                }

                this._PORTAL_PLACEMENT.set(effectiveDirection === configuredDirection ? null : effectiveDirection);

                const top = effectiveDirection === DirectionTypes.TOP
                    ? rootRect.top - popupHeight - offset
                    : effectiveDirection === DirectionTypes.BOTTOM
                        ? rootRect.bottom + offset
                        : rootRect.top + this._PORTAL_OFFSET_Y;
                popup.style.top = `${top}px`;
            } else {
                this._PORTAL_PLACEMENT.set(null);
                popup.style.top = `${rootRect.top + this._PORTAL_OFFSET_Y}px`;
            }
        }

        const adjustedRect = popup.getBoundingClientRect();
        const overflowLeft = leftEdge + gap - adjustedRect.left;
        const overflowRight = adjustedRect.right - (rightEdge - gap);
        if (overflowLeft > 0) popup.style.translate = `${overflowLeft}px 0px`;
        else if (overflowRight > 0) popup.style.translate = `${-overflowRight}px 0px`;
        popup.style.visibility = "visible";
    }

    private _isPortalEnabled(): boolean {
        return this._COMPONENT_PROPS_BIND.prop_floatUsePortal?.get?.() === true;
    }

    private getVerticalClipAncestors(element: HTMLElement): HTMLElement[] {
        const ancestors: HTMLElement[] = [];
        let ancestor = element.parentElement;

        while (ancestor && ancestor !== document.body && ancestor !== document.documentElement) {
            const overflowY = getComputedStyle(ancestor).overflowY;
            if (["auto", "scroll", "overlay", "hidden", "clip"].includes(overflowY)) {
                ancestors.push(ancestor);
            }
            ancestor = ancestor.parentElement;
        }

        return ancestors;
    }

    private getVerticalClipBounds(element: HTMLElement): {top: number; bottom: number} {
        const viewport = window.visualViewport;
        let top = Math.max(0, viewport?.offsetTop ?? 0);
        let bottom = Math.min(window.innerHeight, top + (viewport?.height ?? window.innerHeight));

        for (const ancestor of this.getVerticalClipAncestors(element)) {
            if (ancestor.clientHeight <= 0) continue;
            const rect = ancestor.getBoundingClientRect();
            const clipTop = rect.top + ancestor.clientTop;
            top = Math.max(top, clipTop);
            bottom = Math.min(bottom, clipTop + ancestor.clientHeight);
        }

        return {top, bottom: Math.max(top, bottom)};
    }

    private _isInsideMenu(target: EventTarget | null, root?: Node | null): boolean {
        return this._isInsideOwnMenu(target, root) || this._RELATED_TARGET_CONTAINS?.(target) === true;
    }

    private _isInsideOwnMenu(target: EventTarget | null, root?: Node | null): boolean {
        if (!(target instanceof Node)) return false;
        return !!root?.contains(target) || !!this._PORTALLED_POPUP?.contains(target);
    }


    /// ---------------------
    //  Style Getters â€” private Ùˆ Ú©ÙˆÚ†Ú© (Ø§Ù„Ú¯ÙˆÛŒ componentButton)
    /// ---------------------

    /**
     * Ø§Ø±ØªÙØ§Ø¹ Ø®Ø· selector Ø¨Ø± Ø§Ø³Ø§Ø³ sizeName Ø³Ø±Ø§Ø³Ø±ÛŒ
    */
    private getStyleSelectorLineHeight() {
        return CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    /**
     * Ø§Ù†Ø¯Ø§Ø²Ù‡ ÙÙˆÙ†Øª selector Ø¨Ø± Ø§Ø³Ø§Ø³ sizeName Ø³Ø±Ø§Ø³Ø±ÛŒ
    */
    private getStyleSelectorFontSize() {
        return CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
    }

    /**
     * padding Ø¯Ø§Ø®Ù„ÛŒ border Ø¨Ø± Ø§Ø³Ø§Ø³ sizeName Ø³Ø±Ø§Ø³Ø±ÛŒ
    */
    private getStyleBorderPadding(prop_floatBorderWidth, prop_floatBorderRadius, prop_floatBorderPadding) {
        return CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes, borderWidth: UtilConst.Sizes | number | null, borderRadius: UtilConst.Sizes | number | null, hasPadding: boolean) => {
                const padding = hasPadding ? UtilStyle.Css_Margin(sizeName) : "0px";
                const width = borderWidth == null || borderWidth === 0
                    ? "0px"
                    : UtilStyle.Css_BorderWidth(borderWidth as any);
                const radius = borderRadius == null || borderRadius === 0
                    ? "0px"
                    : typeof borderRadius === "number"
                        ? UtilStyle.Css_SizeUnit(borderRadius, UtilConst.Units.PEXEL)
                        : UtilStyle.Css_BorderRadius(borderRadius);
                return {
                    padding,
                    "border-top-width": UtilStyle.Style_Important(width),
                    "border-right-width": UtilStyle.Style_Important(width),
                    "border-bottom-width": UtilStyle.Style_Important(width),
                    "border-left-width": UtilStyle.Style_Important(width),
                    "border-top-left-radius": radius,
                    "border-top-right-radius": radius,
                    "border-bottom-left-radius": radius,
                    "border-bottom-right-radius": radius,
                };
            },
            [CoreConfig.Settings.SizeName.observable(), prop_floatBorderWidth, prop_floatBorderRadius, prop_floatBorderPadding],
            this.getScope(),
        );
    }

    /**
     * Ù…Ø­Ø§Ø³Ø¨Ù‡ styleÙ‡Ø§ÛŒ position Ø¨Ø± Ø§Ø³Ø§Ø³ direction
     * inline positioning â€” Ø¬Ø§ÛŒÚ¯Ø²ÛŒÙ† ComponentElementPosition
    */
    private getStylePositionStyles(
        prop_floatDirection:  any,
        prop_floatArrowWidth: any,
        prop_floatDistance: any,
        prop_floatPosition:   any,
    ) {
        return CoreObservable.App.computed(
            (direction: DirectionTypes, arrowWidth: number, distance: number, position: string | null, dirRtl: boolean) => {
                const styles: Record<string, string> = {};
                const offset = UtilStyle.Css_SizeUnit(distance, UtilConst.Units.PEXEL);

                switch (direction) {
                    case DirectionTypes.TOP:
                        styles["bottom"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.ADD,
                            offset,
                        );
                        if (dirRtl) {
                            styles["left"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        } else {
                            styles["right"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : "0px";
                        }
                        break;

                    case DirectionTypes.BOTTOM:
                        styles["top"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.ADD,
                            offset,
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
                            UtilConst.Operation.ADD,
                            offset,
                        );
                        styles["top"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT);
                        styles["transform"] = "translate(0, -50%)";
                        break;

                    case DirectionTypes.RIGHT:
                        styles["left"] = UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_SizeUnit(arrowWidth, UtilConst.Units.PEXEL),
                            UtilConst.Operation.ADD,
                            offset,
                        );
                        styles["top"] = position ? UtilStyle.Css_SizeUnit(parseFloat(position), UtilConst.Units.PERCENT) : UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT);
                        styles["transform"] = "translate(0, -50%)";
                        break;
                }

                return styles;
            },
            [prop_floatDirection, prop_floatArrowWidth, prop_floatDistance, prop_floatPosition, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
    }

    private scheduleHoverHide(selectorShowType: CoreObservable.App<any>, floatShowControlWithSelf: CoreObservable.App<any>): void {
        this.clearHoverHideTimeout();
        if (selectorShowType?.get?.() !== ShowTypes.HOVER || floatShowControlWithSelf?.get?.() || !this._BORDER_INSTANCE) return;

        this._HOVER_HIDE_TIMEOUT = setTimeout(() => {
            this._HOVER_HIDE_TIMEOUT = null;
            this.setShow(false);
        }, 250);
    }

    private clearHoverHideTimeout(): void {
        if (this._HOVER_HIDE_TIMEOUT === null) return;
        clearTimeout(this._HOVER_HIDE_TIMEOUT);
        this._HOVER_HIDE_TIMEOUT = null;
    }

}
