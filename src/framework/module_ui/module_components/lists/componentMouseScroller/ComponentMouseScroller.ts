import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentMouseScrollerBase}    from "./ComponentMouseScrollerBase";
import {createMouseScrollerStep}       from "./Step";
import {Schemas}                       from "./Schemas";
import {MethodsConfigType}             from "./Methods";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as MouseScrollerPropsConfigType, MouseScrollerColorMode} from "./Props";
import {SidebarDirection}                                          from "../componentSidebar/Props";
import {PartAttrDefault}               from "@/core_components";
import {ComponentStructureTrait}   from "../../traits/componentStructureTrait";
// --------------------------------
import * as UiCategory             from "@/ui_categories";
import {ButtonAction} from "../componentButton/Props";


/**
 * ComponentMouseScroller â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ
 *
 * ÛŒÚ© scroller Ø¨Ø§ Ù‚Ø§Ø¨Ù„ÛŒØª zoomØŒ drag-to-panØŒ wheel-to-zoom Ùˆ sidebars.
 * Ø§Ø² ComponentBorder Ùˆ ComponentSidebar (Ø¨Ù‡â€ŒØ¹Ù†ÙˆØ§Ù† ÙØ±Ø²Ù†Ø¯) Ø§Ø³ØªÙØ§Ø¯Ù‡ Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   identity â€” { unique?, emit?, events? }
 */
export class ComponentMouseScroller extends ComponentMouseScrollerBase<ReturnType<typeof createMouseScrollerStep>>{

    private _SCROLL_IS_DOWN:    CoreObservable.App<boolean> = new CoreObservable.App(false);
    private _DEFAULT_OPACITY:   CoreObservable.App<any> | null = null;
    private _POINTER_CAPTURED:  boolean = false;
    private _START_CLIENT_X:    number = 0;
    private _START_CLIENT_Y:    number = 0;
    private _SCROLL_LEFT:       number = 0;
    private _SCROLL_TOP:        number = 0;
    private _DRAG_THRESHOLD:    number = 5;

    private _ELEMENT_CONTAINER: CoreReactive.App | null = null;
    private _ELEMENT_SCROLLER:  CoreReactive.App | null = null;
    private _ZOOM_ANIM_ID:      number | null = null;


    constructor(
        config?:  Partial<StructurePropsType & MouseScrollerPropsConfigType>,
        methods?: MethodsConfigType<ComponentMouseScroller>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createMouseScrollerStep();

        super("mouse-scroller", null, identity, step);

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
        if (this._ZOOM_ANIM_ID != null) {
            cancelAnimationFrame(this._ZOOM_ANIM_ID);
            this._ZOOM_ANIM_ID = null;
        }
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
       Ù„Ø§ÛŒÙ‡ Ø³Ø§Ø®ØªØ§Ø± Ø§Ø² Ø·Ø±ÛŒÙ‚ Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
       renderContentComponent ÙÙ‚Ø· Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.BORDER.part, {});
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
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
            case Schemas.BORDER.part:
                return this.renderBorder(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT.part:
                return this.renderBorderContent(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_VIEW.part:
                return this.renderBorderContentView(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_SIDEBAR.part:
                return this.renderBorderContentSidebar(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_SIDEBARTOP.part:
                return this.renderBorderContentSidebarTop(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_SIDEBARBOTTOM.part:
                return this.renderBorderContentSidebarBottom(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_POSITIONZOOM.part:
                return this.renderBorderContentPositionZoom(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.part:
                return this.renderBorderContentPositionZoomBorder(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS.part:
                return this.renderBorderContentTools(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT.part:
                return this.renderBorderContentToolsContent(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.part:
                return this.renderBorderContentToolsContentZooming(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.part:
                return this.renderBorderContentToolsContentZoomingIn(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.part:
                return this.renderBorderContentToolsContentZoomingRefresh(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.part:
                return this.renderBorderContentToolsContentZoomingOut(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.part:
                return this.renderBorderContentToolsContentColoring(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.part:
                return this.renderBorderContentToolsContentColoringLight(attrsDefault, data, extra);
            case Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.part:
                return this.renderBorderContentToolsContentColoringDark(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderBorder â€” Ø¨Ø®Ø´ Ø§ØµÙ„ÛŒ (Border wrapper)
    --------------------------------------------- */
    protected renderBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_toolsOpacity          = data?.["prop_toolsOpacity"]          ?? bind.prop_toolsOpacity;
        const prop_colorMode             = data?.["prop_colorMode"]             ?? bind.prop_colorMode;
        const prop_borderBackgroundColor_light = data?.["prop_borderBackgroundColor_light"] ?? bind.prop_borderBackgroundColor_light;
        const prop_borderBackgroundColor_dark  = data?.["prop_borderBackgroundColor_dark"]  ?? bind.prop_borderBackgroundColor_dark;
        const prop_borderWidth           = data?.["prop_borderWidth"]           ?? bind.prop_borderWidth;
        const prop_borderRadius          = data?.["prop_borderRadius"]          ?? bind.prop_borderRadius;
        const prop_borderColor           = data?.["prop_borderColor"]           ?? bind.prop_borderColor;

        const initOpacity = prop_toolsOpacity?.get() ?? 40;
        this._DEFAULT_OPACITY = new CoreObservable.App(initOpacity);

        const backgroundColor = CoreObservable.App.computed(
            (mode, bgLight, bgDark) => {
                return mode === MouseScrollerColorMode.DARK
                    ? (bgDark ?? UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_3))
                    : (bgLight ?? UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_5));
            },
            [prop_colorMode, prop_borderBackgroundColor_light, prop_borderBackgroundColor_dark],
            this.getScope(),
        );

        const borderInstance = UiCategory.UI.Contents.Border(
            {
                prop_contentSize:  UtilConst.Sizes.S as any,
                classList:         [] as any,
                styles: {
                    height:            UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                    overflow:          "hidden",
                    WebkitUserSelect:  "none",
                    MozUserSelect:     "none",
                    msUserSelect:      "none",
                    msOverflowStyle:   "none",
                    scrollbarWidth:    "none",
                } as any,
                prop_structureStyles: {
                    height: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                } as any,
                prop_borderClass:    ["p-0"] as any,
                prop_borderStyles:    CoreObservable.App.computed(
                    (width, radius, color) => {
                        const s: Record<string, string> = {
                            height: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT) as any,
                        };
                        if (width != null)  s["borderWidth"]   = typeof width === "number" ? `${width}px` : String(width);
                        if (radius != null) s["borderRadius"]  = typeof radius === "number" ? `${radius}px` : String(radius);
                        if (color != null)  s["borderColor"]   = String(color);
                        return s;
                    },
                    [prop_borderWidth, prop_borderRadius, prop_borderColor],
                    this.getScope(),
                ) as any,
                prop_contentBackgroundColor:  backgroundColor as any,
                prop_content: [
                    this.executeSchemaPart(Schemas.BORDER_CONTENT.part, {}),
                ],
            } as any,
            {} as any,
            {
                mouseenter: () => {
                    this._DEFAULT_OPACITY?.set(100);
                },
                mouseleave: () => {
                    const val = this._COMPONENT_PROPS_BIND.prop_toolsOpacity?.get();
                    this._DEFAULT_OPACITY?.set(val ?? 40);
                },
            } as any,
        );

        return borderInstance.getElement() as any;
    }


    /* ---------------------------------------------
       renderBorderContent â€” Ù…Ø­ØªÙˆØ§ÛŒ Ø¯Ø§Ø®Ù„ Border
    --------------------------------------------- */
    protected renderBorderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        this._ELEMENT_CONTAINER = CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            className: ["position-relative"],
            styles: {
                height:          UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                overflow:        "hidden",
                cursor:          "all-scroll",
                scrollBehavior:  "auto",
            },
            on: {
                mouseenter:    () => this._DEFAULT_OPACITY?.set(100),
                mouseleave:    () => {
                    const val = this._COMPONENT_PROPS_BIND.prop_toolsOpacity?.get();
                    this._DEFAULT_OPACITY?.set(val ?? 40);
                },
                wheel:        (e: any) => this.fn_scrollerWheel(e),
                pointerdown:  (e: any) => this.fn_scrollerMouseDown(e),
                pointermove:  (e: any) => this.fn_scrollerMouseMove(e),
                pointerup:    (e: any) => this.fn_scrollerMouseUp(e),
                pointerleave: (e: any) => this.fn_scrollerMouseLeave(e),
            },
            children: [
                CoreReactive.App.div({
                    className: ["ms-scroller-hidden"],
                    styles: {
                        width:    "100%",
                        height:   "100%",
                        overflow: "scroll",
                        scrollbarWidth:   "none",
                        msOverflowStyle: "none",
                    },
                    propsBind: {
                        scrollTop:  bind.prop_scrollTop  ?? new CoreObservable.App(0),
                        scrollLeft: bind.prop_scrollLeft ?? new CoreObservable.App(0),
                    } as any,
                    children: [
                        this.executeSchemaPart(Schemas.BORDER_CONTENT_VIEW.part, {}),
                    ],
                }),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_SIDEBARTOP.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_SIDEBARBOTTOM.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_SIDEBAR.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_POSITIONZOOM.part, {}),
            ],
        });

        return this._ELEMENT_CONTAINER;
    }


    /* ---------------------------------------------
       renderBorderContentView â€” Ù†Ø§Ø­ÛŒÙ‡ Ù‚Ø§Ø¨Ù„ zoom/scroll
    --------------------------------------------- */
    protected renderBorderContentView(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_content    = data?.["prop_content"]    ?? bind.prop_content;
        const prop_zoom       = data?.["prop_zoom"]       ?? bind.prop_zoom;
        const prop_scrollLeft = data?.["prop_scrollLeft"] ?? bind.prop_scrollLeft;
        const prop_scrollTop  = data?.["prop_scrollTop"]  ?? bind.prop_scrollTop;

        this._ELEMENT_SCROLLER = CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            styles: {
                width:          "100%",
                height:         "100%",
                zIndex:         "0",
                position:       "relative",
                transformOrigin: "0 0",
                // Keep wheel zoom smooth while preserving the pointer focal point.
                willChange:     "transform",
                overflow:       "unset",
                userSelect:     "none",
            },
            stylesBind: {
                transform: CoreObservable.App.computed(
                    (zoom) => `scale(${zoom})`,
                    [prop_zoom],
                    this.getScope(),
                ),
            },
            children: [
                CoreReactive.App.div({
                    children: [prop_content],
                }),
            ],
        });

        return this._ELEMENT_SCROLLER;
    }


    /* ---------------------------------------------
       renderBorderContentSidebar â€” sidebar (left/right)
    --------------------------------------------- */
    protected renderBorderContentSidebar(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sideBarsMargin    = data?.["prop_sideBarsMargin"]    ?? bind.prop_sideBarsMargin;
        const prop_sideBarHas        = data?.["prop_sideBarHas"]        ?? bind.prop_sideBarHas;
        const prop_sideBarWidth      = data?.["prop_sideBarWidth"]      ?? bind.prop_sideBarWidth;
        const prop_sideBarBtnOpenHas = data?.["prop_sideBarBtnOpenHas"] ?? bind.prop_sideBarBtnOpenHas;
        const prop_sideBarContent    = data?.["prop_sideBarContent"]    ?? bind.prop_sideBarContent;
        const prop_sideBarTopHas     = data?.["prop_sideBarTopHas"]     ?? bind.prop_sideBarTopHas;
        const prop_sideBarTopWidth   = data?.["prop_sideBarTopWidth"]   ?? bind.prop_sideBarTopWidth;
        const prop_sideBarBottomHas  = data?.["prop_sideBarBottomHas"]  ?? bind.prop_sideBarBottomHas;
        const prop_sideBarBottomWidth = data?.["prop_sideBarBottomWidth"] ?? bind.prop_sideBarBottomWidth;

        const sidebarInstance = UiCategory.UI.Contents.Sidebar(
            {
                classList: [] as any,
                styles: CoreObservable.App.computed(
                    (sidebarOpacity, isDown, sideBarWidth, sideBarBtnOpenHas, sideBarTopHas, sideBarTopWidth, sideBarBottomHas, sideBarBottomWidth, sideBarsMargin) => {
                        const height: string[] = ["100%"];
                        const top: string[] = [];
                        if (sideBarTopHas) {
                            height.push("-");
                            height.push(`${sideBarTopWidth}px`);
                            top.push(`${sideBarTopWidth}px`);
                        }
                        if (sideBarBottomHas) {
                            height.push("-");
                            height.push(`${sideBarBottomWidth}px`);
                        }
                        if (sideBarsMargin) {
                            height.push("-");
                            height.push(`${2 * sideBarsMargin}px`);
                            top.push("+");
                            top.push(`${sideBarsMargin}px`);
                        }
                        const btnExtra = sideBarBtnOpenHas ? 30 : 0;
                        return {
                            transition: "opacity 500ms",
                            opacity:   isDown ? "0" : (sidebarOpacity != null ? String(sidebarOpacity / 100) : "1"),
                            width:     `${sideBarWidth + btnExtra}px`,
                            height:    `calc(${height.join(" ")})`,
                            position:  "absolute",
                            top:       top.length ? `calc(${top.join(" ")})` : "0",
                        };
                    },
                    [
                        this._DEFAULT_OPACITY!,
                        this._SCROLL_IS_DOWN,
                        prop_sideBarWidth,
                        prop_sideBarBtnOpenHas,
                        prop_sideBarTopHas, prop_sideBarTopWidth,
                        prop_sideBarBottomHas, prop_sideBarBottomWidth,
                        prop_sideBarsMargin,
                    ],
                    this.getScope(),
                ) as any,

                prop_blurHas:           false as any,
                prop_sidebarBtnOpenHas: prop_sideBarBtnOpenHas as any,
                prop_sidebarIsOpen:     true as any,

                prop_show: CoreObservable.App.computed(
                    (sideBarHas) => sideBarHas,
                    [prop_sideBarHas],
                    this.getScope(),
                ) as any,

                prop_sidebarDirection: CoreObservable.App.computed(
                    (dir) => dir ? SidebarDirection.RTL : SidebarDirection.LTR,
                    [CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                ) as any,

                prop_sidebarWidth: CoreObservable.App.computed(
                    (sideBarWidth) => sideBarWidth || 0,
                    [prop_sideBarWidth],
                    this.getScope(),
                ) as any,

                prop_sidebarPositionStart: "0px" as any,
                prop_sidebarPositionEnd:   "0px" as any,
                prop_sidebarBorderRadius:  UtilConst.Sizes.M as any,
                prop_sidebarContent:        prop_sideBarContent as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [sidebarInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentSidebarTop â€” sidebar top
    --------------------------------------------- */
    protected renderBorderContentSidebarTop(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sideBarTopHas    = data?.["prop_sideBarTopHas"]    ?? bind.prop_sideBarTopHas;
        const prop_sideBarTopWidth  = data?.["prop_sideBarTopWidth"]  ?? bind.prop_sideBarTopWidth;
        const prop_sideBarTopContent = data?.["prop_sideBarTopContent"] ?? bind.prop_sideBarTopContent;

        const sidebarInstance = UiCategory.UI.Contents.Sidebar(
            {
                classList: [] as any,
                styles: CoreObservable.App.computed(
                    (sidebarOpacity, isDown, sideBarTopWidth) => ({
                        transition: "opacity 500ms",
                        opacity:   isDown ? "0" : (sidebarOpacity != null ? String(sidebarOpacity / 100) : "1"),
                        width:     "100%",
                        height:    `${sideBarTopWidth}px`,
                        position:  "absolute",
                        top:       "0px",
                    }),
                    [this._DEFAULT_OPACITY!, this._SCROLL_IS_DOWN, prop_sideBarTopWidth],
                    this.getScope(),
                ) as any,

                prop_show: CoreObservable.App.computed(
                    (sideBarTopHas) => sideBarTopHas,
                    [prop_sideBarTopHas],
                    this.getScope(),
                ) as any,

                prop_blurHas:           false as any,
                prop_sidebarBtnOpenHas: false as any,
                prop_sidebarIsOpen:     true as any,
                prop_sidebarDirection:  SidebarDirection.TTB as any,

                prop_sidebarWidth: CoreObservable.App.computed(
                    (sideBarTopWidth) => sideBarTopWidth || 0,
                    [prop_sideBarTopWidth],
                    this.getScope(),
                ) as any,

                prop_sidebarPositionStart: "0px" as any,
                prop_sidebarPositionEnd:   "0px" as any,
                prop_sidebarContent:        prop_sideBarTopContent as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [sidebarInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentSidebarBottom â€” sidebar bottom
    --------------------------------------------- */
    protected renderBorderContentSidebarBottom(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sideBarBottomHas    = data?.["prop_sideBarBottomHas"]    ?? bind.prop_sideBarBottomHas;
        const prop_sideBarBottomWidth  = data?.["prop_sideBarBottomWidth"]  ?? bind.prop_sideBarBottomWidth;
        const prop_sideBarBottomContent = data?.["prop_sideBarBottomContent"] ?? bind.prop_sideBarBottomContent;

        const sidebarInstance = UiCategory.UI.Contents.Sidebar(
            {
                classList: [] as any,
                styles: CoreObservable.App.computed(
                    (sidebarOpacity, isDown, sideBarBottomWidth) => ({
                        transition: "opacity 500ms",
                        opacity:   isDown ? "0" : (sidebarOpacity != null ? String(sidebarOpacity / 100) : "1"),
                        width:     "100%",
                        height:    `${sideBarBottomWidth}px`,
                        position:  "absolute",
                        bottom:    "0px",
                    }),
                    [this._DEFAULT_OPACITY!, this._SCROLL_IS_DOWN, prop_sideBarBottomWidth],
                    this.getScope(),
                ) as any,

                prop_show: CoreObservable.App.computed(
                    (sideBarBottomHas) => sideBarBottomHas,
                    [prop_sideBarBottomHas],
                    this.getScope(),
                ) as any,

                prop_blurHas:           false as any,
                prop_sidebarBtnOpenHas: false as any,
                prop_sidebarIsOpen:     true as any,
                prop_sidebarDirection:  SidebarDirection.BTT as any,

                prop_sidebarWidth: CoreObservable.App.computed(
                    (sideBarBottomWidth) => sideBarBottomWidth || 0,
                    [prop_sideBarBottomWidth],
                    this.getScope(),
                ) as any,

                prop_sidebarPositionStart: "0px" as any,
                prop_sidebarPositionEnd:   "0px" as any,
                prop_sidebarContent:        prop_sideBarBottomContent as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [sidebarInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentPositionZoom â€” zoom indicator
    --------------------------------------------- */
    protected renderBorderContentPositionZoom(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const zoomPositionSide = "50px";

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                position: "absolute",
                top: "45px",
                width: "50px",
                height: "30px",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools)),
                transition: "opacity 500ms",
            },
            stylesBind: {
                opacity: CoreObservable.App.computed(
                    (v, isDown) => isDown ? "0" : (v != null ? String(v / 100) : "1"),
                    [this._DEFAULT_OPACITY!, this._SCROLL_IS_DOWN],
                    this.getScope(),
                ),
                left: CoreObservable.App.computed(
                    (dir) => dir ? zoomPositionSide : null as any,
                    [CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                ),
                right: CoreObservable.App.computed(
                    (dir) => dir ? null as any : zoomPositionSide,
                    [CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                ),
            },
            children: [
                this.executeSchemaPart(Schemas.BORDER_CONTENT_POSITIONZOOM_BORDER.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderBorderContentPositionZoomBorder â€” zoom border
    --------------------------------------------- */
    protected renderBorderContentPositionZoomBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_zoom = data?.["prop_zoom"] ?? bind.prop_zoom;

        const borderInstance = UiCategory.UI.Contents.Border(
            {
                prop_borderClass: ["p-0"] as any,
                prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1) as any,
                prop_content: [
                    CoreReactive.App.b({
                        attrs: { ...attrsDefault },
                        className: ["text-center", "d-block", "text-white"],
                        children: CoreObservable.App.computed(
                            (zoom) => `${Number((zoom * 100).toFixed(0))}%`,
                            [prop_zoom],
                            this.getScope(),
                        ),
                    }),
                ] as any,
            } as any,
            {
                CLICK_BORDER: (event: any, dataArgs: any, componentArgs: any) => {
                    this.pr_setChangeValue(event);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [borderInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentTools â€” tools sidebar
    --------------------------------------------- */
    protected renderBorderContentTools(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_sideBarsMargin    = data?.["prop_sideBarsMargin"]    ?? bind.prop_sideBarsMargin;
        const prop_sideBarTopHas     = data?.["prop_sideBarTopHas"]     ?? bind.prop_sideBarTopHas;
        const prop_sideBarTopWidth   = data?.["prop_sideBarTopWidth"]   ?? bind.prop_sideBarTopWidth;
        const prop_sideBarBottomHas  = data?.["prop_sideBarBottomHas"]  ?? bind.prop_sideBarBottomHas;
        const prop_sideBarBottomWidth = data?.["prop_sideBarBottomWidth"] ?? bind.prop_sideBarBottomWidth;

        const sidebarInstance = UiCategory.UI.Contents.Sidebar(
            {
                classList: [] as any,
                styles: CoreObservable.App.computed(
                    (sidebarOpacity, isDown, dir, sideBarTopHas, sideBarTopWidth, sideBarBottomHas, sideBarBottomWidth, sideBarsMargin) => {
                        const height: string[] = ["100%"];
                        const top: string[] = [];
                        if (sideBarTopHas) {
                            height.push("-");
                            height.push(`${sideBarTopWidth}px`);
                            top.push(`${sideBarTopWidth}px`);
                        }
                        if (sideBarBottomHas) {
                            height.push("-");
                            height.push(`${sideBarBottomWidth}px`);
                        }
                        if (sideBarsMargin) {
                            height.push("-");
                            height.push(`${2 * sideBarsMargin}px`);
                            top.push("+");
                            top.push(`${sideBarsMargin}px`);
                        }
                        return {
                            transition: "opacity 500ms",
                            opacity:   isDown ? "0" : (sidebarOpacity != null ? String(sidebarOpacity / 100) : "1"),
                            width:     `${40 + 2 * sideBarsMargin}px`,
                            height:    `calc(${height.join(" ")})`,
                            position:  "absolute",
                            top:       top.length ? `calc(${top.join(" ")})` : "0",
                            [dir ? "left" : "right"]: "0px",
                        };
                    },
                    [
                        this._DEFAULT_OPACITY!,
                        this._SCROLL_IS_DOWN,
                        CoreConfig.Settings.DirectionRtl.observable(),
                        prop_sideBarTopHas, prop_sideBarTopWidth,
                        prop_sideBarBottomHas, prop_sideBarBottomWidth,
                        prop_sideBarsMargin,
                    ],
                    this.getScope(),
                ) as any,

                prop_blurHas:           false as any,
                prop_sidebarBtnOpenHas: false as any,
                prop_sidebarIsOpen:     true as any,
                prop_show: true as any,

                prop_sidebarDirection: CoreObservable.App.computed(
                    (dir) => dir ? SidebarDirection.LTR : SidebarDirection.RTL,
                    [CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                ) as any,

                prop_sidebarWidth:      40 as any,
                prop_sidebarMargin: CoreObservable.App.computed(
                    (sideBarsMargin) => sideBarsMargin ? `${sideBarsMargin}px` : "0px",
                    [prop_sideBarsMargin],
                    this.getScope(),
                ) as any,

                prop_sidebarPositionStart: "0px" as any,
                prop_sidebarPositionEnd:   "0px" as any,
                prop_sidebarBorderRadius:  UtilConst.Sizes.M as any,
                prop_sidebarContent: [
                    this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT.part, {}),
                ] as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [sidebarInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContent â€” tools content
    --------------------------------------------- */
    protected renderBorderContentToolsContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            className: ["p-1"],
            children: [
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING.part, {}),
                this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentZooming â€” zooming section
    --------------------------------------------- */
    protected renderBorderContentToolsContentZooming(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_toolsZoomHas = data?.["prop_toolsZoomHas"] ?? bind.prop_toolsZoomHas;

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            className: ["border-2", "border-bottom", "mb-2"],
            children: CoreObservable.App.conditionSwitch(
                prop_toolsZoomHas,
                {
                    true: () => CoreReactive.App.div({
                        children: [
                            this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_IN.part, {}),
                            this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_REFRESH.part, {}),
                            this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_ZOOMING_OUT.part, {}),
                        ],
                    }),
                    false: () => null,
                },
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentZoomingIn â€” zoom in icon
    --------------------------------------------- */
    protected renderBorderContentToolsContentZoomingIn(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                classList: ["mb-1", "d-block"] as any,
                styles: { cursor: "pointer" } as any,
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.FilesZoomIn.Definition, {
                    size: UtilConst.Sizes.M,
                    primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
                }),
            } as any,
            {
                CLICK: (event: any, dataArgs: any, componentArgs: any) => {
                    const scroller = this._ELEMENT_SCROLLER?.getElement();
                    const rect = scroller.getBoundingClientRect();
                    this.fn_scrollerScaleProgress(rect.left, rect.top, -100);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [iconInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentZoomingRefresh â€” zoom refresh icon
    --------------------------------------------- */
    protected renderBorderContentToolsContentZoomingRefresh(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                classList: ["mb-1", "d-block"] as any,
                styles: { cursor: "pointer" } as any,
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.FilesZoomRefresh.Definition, {
                    size: UtilConst.Sizes.M,
                    primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
                }),
            } as any,
            {
                CLICK: (event: any, dataArgs: any, componentArgs: any) => {
                    this.pr_setChangeValue(event);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [iconInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentZoomingOut â€” zoom out icon
    --------------------------------------------- */
    protected renderBorderContentToolsContentZoomingOut(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                classList: ["mb-1", "d-block"] as any,
                styles: { cursor: "pointer" } as any,
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.FilesZoomOut.Definition, {
                    size: UtilConst.Sizes.M,
                    primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
                }),
            } as any,
            {
                CLICK: (event: any, dataArgs: any, componentArgs: any) => {
                    const scroller = this._ELEMENT_SCROLLER?.getElement();
                    const rect = scroller.getBoundingClientRect();
                    this.fn_scrollerScaleProgress(rect.left, rect.top, 100);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [iconInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentColoring â€” coloring section
    --------------------------------------------- */
    protected renderBorderContentToolsContentColoring(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_toolsColorModeHas = data?.["prop_toolsColorModeHas"] ?? bind.prop_toolsColorModeHas;

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            className: ["border-2", "border-bottom", "mb-2"],
            children: CoreObservable.App.conditionSwitch(
                prop_toolsColorModeHas,
                {
                    true: () => CoreReactive.App.div({
                        children: [
                            this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_LIGHT.part, {}),
                            this.executeSchemaPart(Schemas.BORDER_CONTENT_TOOLS_CONTENT_COLORING_DARK.part, {}),
                        ],
                    }),
                    false: () => null,
                },
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentColoringLight â€” light mode icon
    --------------------------------------------- */
    protected renderBorderContentToolsContentColoringLight(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                classList: ["mb-1", "d-block"] as any,
                styles: { cursor: "pointer" } as any,
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.StatusSun.Definition, {
                    size: UtilConst.Sizes.M,
                    primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
                }),
            } as any,
            {
                CLICK: (event: any, dataArgs: any, componentArgs: any) => {
                    this.set("prop_colorMode", MouseScrollerColorMode.LIGHT);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [iconInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       renderBorderContentToolsContentColoringDark â€” dark mode icon
    --------------------------------------------- */
    protected renderBorderContentToolsContentColoringDark(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const iconInstance = UiCategory.UI.Simples.Icon(
            {
                classList: ["mb-1", "d-block"] as any,
                styles: { cursor: "pointer" } as any,
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.StatusMoon.Definition, {
                    size: UtilConst.Sizes.M,
                    primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
                }),
            } as any,
            {
                CLICK: (event: any, dataArgs: any, componentArgs: any) => {
                    this.set("prop_colorMode", MouseScrollerColorMode.DARK);
                },
            } as any,
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [iconInstance.getElement()],
        });
    }


    /* ---------------------------------------------
       Event Handlers â€” Mouse / Wheel
    --------------------------------------------- */
    private fn_scrollerMouseDown(event: any): void {
        if (event.target?.closest?.('component-sidebar')) return;
        this._SCROLL_IS_DOWN.set(true);
        this._POINTER_CAPTURED = false;
        this._START_CLIENT_X = event.clientX;
        this._START_CLIENT_Y = event.clientY;
        this._SCROLL_LEFT = this._COMPONENT_PROPS_BIND["prop_scrollLeft"]?.get() ?? 0;
        this._SCROLL_TOP  = this._COMPONENT_PROPS_BIND["prop_scrollTop"]?.get()  ?? 0;
    }

    private fn_scrollerMouseMove(event: any): void {
        if (!this._SCROLL_IS_DOWN.get()) return;
        const dx = event.clientX - this._START_CLIENT_X;
        const dy = event.clientY - this._START_CLIENT_Y;

        if (!this._POINTER_CAPTURED && (Math.abs(dx) > this._DRAG_THRESHOLD || Math.abs(dy) > this._DRAG_THRESHOLD)) {
            this._POINTER_CAPTURED = true;
            const el = this._ELEMENT_CONTAINER?.getElement();
            if (el && event.pointerId != null) {
                try { el.setPointerCapture(event.pointerId); } catch(e) {}
            }
        }

        if (this._POINTER_CAPTURED) {
            this._COMPONENT_PROPS_BIND["prop_scrollLeft"]?.set(this._SCROLL_LEFT - dx);
            this._COMPONENT_PROPS_BIND["prop_scrollTop"]?.set(this._SCROLL_TOP - dy);
        }
    }

    private fn_scrollerMouseLeave(event: any): void {
        this._SCROLL_IS_DOWN.set(false);
    }

    private fn_scrollerMouseUp(event: any): void {
        this._SCROLL_IS_DOWN.set(false);

        if (this._POINTER_CAPTURED) {
            this._POINTER_CAPTURED = false;
            const el = this._ELEMENT_CONTAINER?.getElement();
            if (el && event.pointerId != null) {
                try { el.releasePointerCapture(event.pointerId); } catch(e) {}
            }
        }
    }

    private fn_scrollerWheel(event: any): void {
        if (event.target?.closest?.('component-sidebar')) return;
        event.preventDefault();
        event.stopPropagation();
        this.fn_scrollerScaleProgress(event.clientX, event.clientY, event.deltaY, event);
    }

    private fn_scrollerScaleProgress(
        x: number,
        y: number,
        zoomStep: number | null = null,
        event?: any,
    ): void {

        const container = this._ELEMENT_CONTAINER?.getElement() as HTMLElement | undefined;
        const viewport = container?.querySelector<HTMLElement>(".ms-scroller-hidden")
            ?? event?.currentTarget?.querySelector?.(".ms-scroller-hidden")
            ?? container;
        const rect = viewport?.getBoundingClientRect();
        const mouseX = rect ? x - rect.left : 0;
        const mouseY = rect ? y - rect.top : 0;

        const bind = this._COMPONENT_PROPS_BIND;

        const scale       = bind["prop_zoom"]?.get()       ?? 1;
        const min         = bind?.["prop_zoomMin"]?.get()   ?? 0.4;
        const max         = bind?.["prop_zoomMax"]?.get()   ?? 3.0;
        const step        = bind?.["prop_zoomStep"]?.get()  ?? 1.0015;
        const scrollLeft  = viewport?.scrollLeft ?? bind?.["prop_scrollLeft"]?.get() ?? 0;
        const scrollTop   = viewport?.scrollTop  ?? bind?.["prop_scrollTop"]?.get()  ?? 0;

        let newScale = scale;
        if (zoomStep != null) {
            newScale = Math.min(Math.max(scale * Math.pow(step, -zoomStep), min), max);
            newScale = newScale > min ? newScale : min;
        }

        // Keep the content point under the pointer fixed throughout the animation.
        // Interpolating scroll offsets independently from zoom causes focal-point drift.
        const anchorContentX = (scrollLeft + mouseX) / scale;
        const anchorContentY = (scrollTop + mouseY) / scale;

        if (this._ZOOM_ANIM_ID != null) {
            cancelAnimationFrame(this._ZOOM_ANIM_ID);
            this._ZOOM_ANIM_ID = null;
        }

        const startTime = performance.now();
        const duration = 300;
        const easeOut = (progress: number): number => 1 - Math.pow(1 - progress, 3);
        const animate = (now: number): void => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = easeOut(progress);
            const currentZoom = scale + (newScale - scale) * eased;
            const requestedLeft = anchorContentX * currentZoom - mouseX;
            const requestedTop = anchorContentY * currentZoom - mouseY;
            bind["prop_zoom"]?.set(currentZoom);

            // Transformed content changes the scrollable extent. Clamp against the
            // viewport's current extent so the browser cannot silently snap to 0,0.
            let scrollLeftMin = 0;
            let scrollLeftMax = viewport ? Math.max(0, viewport.scrollWidth - viewport.clientWidth) : Number.POSITIVE_INFINITY;
            if (viewport && getComputedStyle(viewport).direction === "rtl") {
                scrollLeftMin = -scrollLeftMax;
                scrollLeftMax = 0;
            }
            const nextScrollLeft = Math.min(Math.max(requestedLeft, scrollLeftMin), scrollLeftMax);
            const nextScrollTop = Math.min(
                Math.max(requestedTop, 0),
                viewport ? Math.max(0, viewport.scrollHeight - viewport.clientHeight) : Number.POSITIVE_INFINITY,
            );

            bind["prop_scrollLeft"]?.set(nextScrollLeft);
            bind["prop_scrollTop"]?.set(nextScrollTop);

            if (progress < 1) {
                this._ZOOM_ANIM_ID = requestAnimationFrame(animate);
            } else {
                this._ZOOM_ANIM_ID = null;
            }
        };

        this._ZOOM_ANIM_ID = requestAnimationFrame(animate);
    }


    /* ---------------------------------------------
       pr_setChangeValue â€” helper for zoom border click
    --------------------------------------------- */
    private pr_setChangeValue(event: any): void {
        const bind = this._COMPONENT_PROPS_BIND;
        const zoom = bind["prop_zoom"];
        if (!zoom) return;

        if (this._ZOOM_ANIM_ID != null) {
            cancelAnimationFrame(this._ZOOM_ANIM_ID);
            this._ZOOM_ANIM_ID = null;
        }

        const startZoom = zoom.get();
        const startTime = performance.now();
        const duration = 300;
        const easeOut = (progress: number): number => 1 - Math.pow(1 - progress, 3);
        const animate = (now: number): void => {
            const progress = Math.min((now - startTime) / duration, 1);
            zoom.set(startZoom + (1 - startZoom) * easeOut(progress));

            if (progress < 1) {
                this._ZOOM_ANIM_ID = requestAnimationFrame(animate);
            } else {
                zoom.set(1);
                this._ZOOM_ANIM_ID = null;
            }
        };

        this._ZOOM_ANIM_ID = requestAnimationFrame(animate);
    }

}
