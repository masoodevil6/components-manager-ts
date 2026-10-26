import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentCollapseBase}  from "./ComponentCollapseBase";
import {createCollapseStep}    from "./Step";
import {Schemas}               from "./Schemas";
import {MethodsConfigType}     from "./Methods";
import {PropsType}             from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon   from "../componentIcon";
import * as ComponentMenuMore from "../componentMenuMore";

const COLLAPSE_ARROW_SECTION_WIDTH = "calc(var(--paddingMedium) + var(--heightMedium) + var(--paddingMedium))";
const COLLAPSE_HEADER_CONTENT_WIDTH = "calc(100% - var(--paddingMedium) - var(--heightMedium) - var(--paddingMedium))";


/**
 * ComponentCollapse â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 15.1.0 â€” Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Ú©Ø§Ù…Ù„ Behavior Legacy)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentCollapse HAS-A ComponentBorder (Ù†Ù‡ IS-A)
 *   ComponentBorder Ø¯Ø± renderFormBorder Ø§Ø² Ø·Ø±ÛŒÙ‚ Ù…Ø³ØªÙ‚ÛŒÙ…
 *   new ComponentBorder.Component Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ â€” Ù†Ù‡ new Ù…Ø³ØªÙ‚ÛŒÙ….
 *   ComponentIcon Ø¯Ø± renderFormBorderContentIcon Ùˆ renderFormBorderContentArrow
 *   Ø§Ø² Ø·Ø±ÛŒÙ‚ Ù…Ø³ØªÙ‚ÛŒÙ… new ComponentIcon.Component Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CLICK)
 *   identity â€” { unique?, emit?, events? }
 *
 * Plan 9.1 â€” Step Ø¯Ø§Ø®Ù„ÛŒ Ø¯Ø± constructor Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯ (factory function).
 * Plan 11.2 â€” Ù„Ø§ÛŒÙ‡ <component-collapse> + <section> Ø§Ø² Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
 *
 * Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Behavior Ø§Ø² Legacy:
 *   - title Ù‚Ø§Ø¨Ù„â€ŒÚ©Ù„ÛŒÚ© â†’ CLICK method Ø±ÙˆÛŒ Border composition
 *   - arrow toggle â†’ prop_collapseBodyIsOpen mapList (arrow_up / arrow_down)
 *   - body show/hide â†’ prop_collapseBodyIsOpen mapBoolean ("show" / "d-none")
 *   - fontSize ÙˆØ§Ú©Ù†Ø´â€ŒÚ¯Ø±Ø§ â†’ computed Ø±ÙˆÛŒ CoreConfig.Settings.SizeName
 */
export class ComponentCollapse extends ComponentCollapseBase<ReturnType<typeof createCollapseStep>>{
    private _HEADER_MENU: ComponentMenuMore.Component | null = null;


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentCollapse>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createCollapseStep();

        super("collapse", null, identity, step);

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
        this._HEADER_MENU?.dispose();
        this._HEADER_MENU = null;
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
        return this.executeSchemaPart(Schemas.FORM.part, {});
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
            case Schemas.FORM.part:
                return this.renderForm(attrsDefault, data, extra);
            case Schemas.FORM_BORDER.part:
                return this.renderFormBorder(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT.part:
                return this.renderFormBorderContent(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_ICON.part:
                return this.renderFormBorderContentIcon(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_TITLE.part:
                return this.renderFormBorderContentTitle(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_MENU_MORE.part:
                return this.renderFormBorderContentMenuMore(attrsDefault, data, extra);
            case Schemas.FORM_BORDER_CONTENT_ARROW.part:
                return this.renderFormBorderContentArrow(attrsDefault, data, extra);
            case Schemas.FORM_BODY.part:
                return this.renderFormBody(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderForm â€” Ø±Ù†Ø¯Ø± Part FORM Ø§ØµÙ„ÛŒ
       Ø¸Ø±Ù Ø§ØµÙ„ÛŒ Ø´Ø§Ù…Ù„ FORM_BORDER + FORM_BODY
    --------------------------------------------- */
    protected renderForm(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(Schemas.FORM_BORDER.part, {}),
                this.executeSchemaPart(Schemas.FORM_BODY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorder â€” Ø±Ù†Ø¯Ø± Part FORM_BORDER
       Composition: new ComponentBorder.Component (Ù…Ø³ØªÙ‚ÛŒÙ…)
       + click â†’ toggle prop_collapseBodyIsOpen + executeMethod("CLICK")
    --------------------------------------------- */
    protected renderFormBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseBorderBackground  = data?.["prop_collapseBorderBackground"]  ?? bind.prop_collapseBorderBackground;
        const prop_collapseBorderClass        = data?.["prop_collapseBorderClass"]      ?? bind.prop_collapseBorderClass;
        const prop_collapseBorderStyles       = data?.["prop_collapseBorderStyles"]     ?? bind.prop_collapseBorderStyles;
        const prop_collapseBorderColor        = data?.["prop_collapseBorderColor"]      ?? bind.prop_collapseBorderColor;
        const prop_collapseBorderWidth        = data?.["prop_collapseBorderWidth"]      ?? bind.prop_collapseBorderWidth;
        const prop_collapseBorderRadius       = data?.["prop_collapseBorderRadius"]     ?? bind.prop_collapseBorderRadius;
        const prop_collapseBorderMinWidth     = data?.["prop_collapseBorderMinWidth"]   ?? bind.prop_collapseBorderMinWidth;
        const headerBorderStyles = CoreObservable.App.computed(
            (sizeName, customStyles) => ({
                lineHeight: UtilStyle.Css_Height(sizeName),
                padding: UtilStyle.Css_Padding(sizeName),
                ...(customStyles ?? {}),
            }),
            [CoreConfig.Settings.SizeName.observable(), prop_collapseBorderStyles],
            this.getScope(),
        );

        return new ComponentBorder.Component(
            {
                prop_borderClass:            prop_collapseBorderClass,
                prop_borderStyles:           headerBorderStyles,
                prop_content:                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT.part),
                prop_contentBackgroundColor:  prop_collapseBorderBackground,
                prop_borderColor:            prop_collapseBorderColor,
                prop_borderWidth:            prop_collapseBorderWidth as any,
                prop_borderRadius:           prop_collapseBorderRadius as any,
                prop_minWidth:               prop_collapseBorderMinWidth,
            } as any,
            {
                CLICK_BORDER: (event: Event) => {
                    const eventTarget = event.target;
                    const menuPartId = this.getPartId(Schemas.FORM_BORDER_CONTENT_MENU_MORE.part);
                    if (eventTarget instanceof Element) {
                        const menuPart = eventTarget.closest(`#${menuPartId}`);
                        const menuControl = eventTarget.closest("button, [role='menuitem']");
                        if (menuPart && menuControl && menuPart.contains(menuControl)) return;
                    }

                    const isOpen = this.get("prop_collapseBodyIsOpen") as boolean;
                    this.set("prop_collapseBodyIsOpen", !isOpen);
                    this.executeMethod("CLICK", event, {});
                },
            },
            {
                unique: (this as any)._COMPONENT_STEP?.click ?? undefined,
            },
        ).getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderFormBorderContent â€” Ø±Ù†Ø¯Ø± Part FORM_BORDER_CONTENT
       header [CONTENT(icon, title, MenuMore), arrow]
    --------------------------------------------- */
    protected renderFormBorderContent(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const icon = CoreReactive.App.section({
            styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                width: COLLAPSE_ARROW_SECTION_WIDTH,
                minWidth: COLLAPSE_ARROW_SECTION_WIDTH,
                flex: `0 0 ${COLLAPSE_ARROW_SECTION_WIDTH}`,
                flexShrink: "0",
            },
            children: [this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_ICON.part, {})],
        });

        const content = CoreReactive.App.section({
            className: ["d-flex", "align-items-center", "flex-grow-1", "min-w-0"],
            styles: {
                width: COLLAPSE_HEADER_CONTENT_WIDTH,
                minWidth: "0",
                flex: `0 0 ${COLLAPSE_HEADER_CONTENT_WIDTH}`,
                maxWidth: COLLAPSE_HEADER_CONTENT_WIDTH,
            },
            children: [
                icon,
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_TITLE.part, {}),
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_MENU_MORE.part, {}),
            ],
        });

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {position: "relative", display: "flex", alignItems: "center", flexWrap: "nowrap", cursor: "pointer", width: "100%"},
            className: ["p-0", "m-0", "min-w-0"],
            children: [
                content,
                this.executeSchemaPart(Schemas.FORM_BORDER_CONTENT_ARROW.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorderContentIcon â€” Ø±Ù†Ø¯Ø± Part FORM_BORDER_CONTENT_ICON
       Composition: new ComponentIcon.Component (Ù…Ø³ØªÙ‚ÛŒÙ…)
       Ø±Ù†Ø¯Ø± Ø´Ø±Ø·ÛŒ Ø¢ÛŒÚ©ÙˆÙ† Ø¨Ø§ conditionWhen
    --------------------------------------------- */
    protected renderFormBorderContentIcon(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseIcon       = data?.["prop_collapseIcon"]       ?? bind.prop_collapseIcon;
        const prop_collapseIconClass  = data?.["prop_collapseIconClass"]  ?? bind.prop_collapseIconClass;
        const prop_collapseIconStyles = data?.["prop_collapseIconStyles"] ?? bind.prop_collapseIconStyles;

        const iconStylesMerged = CoreObservable.App.computed(
            (styleMap) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
                margin: "0",
                maxWidth: "100%",
                ...(styleMap ?? {}),
            }),
            [prop_collapseIconStyles],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (iconSource, styles) => {
                if (iconSource == null) return this.renderEmptyContent(attrsDefault);
                return new ComponentIcon.Component({
                    prop_icon:       UiIcons.CreateIcon(iconSource as any, {
                        primaryColor:   UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                        secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    }),
                    prop_iconClass:  prop_collapseIconClass as any,
                    prop_iconStyles: styles,
                }, {}).getReactiveElement() as CoreReactive.App;
            },
            [prop_collapseIcon, iconStylesMerged],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderFormBorderContentMenuMore â€” header actions menu
    --------------------------------------------- */
    protected renderFormBorderContentMenuMore(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const menuItems = data?.["prop_collapseMenuItems"] ?? this._COMPONENT_PROPS_BIND.prop_collapseMenuItems;
        const titleWidth = data?.["prop_collapseTitleWidth"] ?? this._COMPONENT_PROPS_BIND.prop_collapseTitleWidth;
        const menuWidthStyles = CoreObservable.App.computed(
            (width: string) => {
                const remainingWidth = `calc(100% - ${width} - var(--paddingMedium) - var(--heightMedium) - var(--paddingMedium))`;
                return {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    boxSizing: "border-box",
                    width: remainingWidth,
                    minWidth: "0",
                    maxWidth: remainingWidth,
                    flex: `0 0 ${remainingWidth}`,
                };
            },
            [titleWidth],
            this.getScope(),
        );

        if (!this._HEADER_MENU) {
            this._HEADER_MENU = new ComponentMenuMore.Component({
                styles: {
                    display: "block",
                    width: "fit-content",
                    maxWidth: "100%",
                    minWidth: "0",
                    flex: "0 0 auto",
                    marginInlineStart: "auto",
                },
                prop_orientation: ComponentMenuMore.MenuMoreOrientation.HORIZONTAL,
                prop_isFullWidth: false,
                prop_menuBorder: false,
                prop_menuBackgroundColor: "transparent",
                prop_items: menuItems,
            } as any, {
                SELECT_ITEM: (event, dataArgs) => {
                    event.stopPropagation();
                    this.executeMethod("SELECT_MENU_ITEM", event, {ITEM: dataArgs?.ITEM} as any);
                },
            } as any);
        }

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["min-w-0"],
            stylesBind: menuWidthStyles as any,
            on: {click: (event: Event) => event.stopPropagation()},
            children: [this._HEADER_MENU.getReactiveElement() as CoreReactive.App],
        });
    }


    /* ---------------------------------------------
       renderFormBorderContentTitle â€” Ø±Ù†Ø¯Ø± Part FORM_BORDER_CONTENT_TITLE
       section.col + <b> + computed styles (fontSize, lineHeight, color)
    --------------------------------------------- */
    protected renderFormBorderContentTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseTitle       = data?.["prop_collapseTitle"]       ?? bind.prop_collapseTitle;
        const prop_collapseTitleWidth  = data?.["prop_collapseTitleWidth"]  ?? bind.prop_collapseTitleWidth;
        const prop_collapseTitleStyles = data?.["prop_collapseTitleStyles"] ?? bind.prop_collapseTitleStyles;
        const prop_collapseTitleClass  = data?.["prop_collapseTitleClass"]  ?? bind.prop_collapseTitleClass;
        const prop_collapseTitleColor  = data?.["prop_collapseTitleColor"]  ?? bind.prop_collapseTitleColor;

        const contentHeight   = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const contentFontSize = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const stylesMerged = CoreObservable.App.computed(
            (styleMap, color, h, fs, width) => ({
                lineHeight: h,
                fontSize:   fs,
                boxSizing:  "border-box",
                width,
                minWidth:   width,
                maxWidth:   width,
                flex:       `0 0 ${width}`,
                overflow:   "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                ...(styleMap ?? {}),
                ...(color != null ? { color } : {}),
            }),
            [prop_collapseTitleStyles, prop_collapseTitleColor, contentHeight, contentFontSize, prop_collapseTitleWidth],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: stylesMerged,
            classBind: [prop_collapseTitleClass as any],
            className: ["flex-grow-1"],
            children: [
                CoreReactive.App.b({
                    children: [prop_collapseTitle as any],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       renderFormBorderContentArrow â€” Ø±Ù†Ø¯Ø± Part FORM_BORDER_CONTENT_ARROW
       Composition: new ComponentIcon.Component (Ù…Ø³ØªÙ‚ÛŒÙ…)
       arrow up/down Ø¨Ø± Ø§Ø³Ø§Ø³ prop_collapseBodyIsOpen (mapList)
    --------------------------------------------- */
    protected renderFormBorderContentArrow(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseArrowClass  = data?.["prop_collapseArrowClass"]  ?? bind.prop_collapseArrowClass;
        const prop_collapseArrowStyles = data?.["prop_collapseArrowStyles"] ?? bind.prop_collapseArrowStyles;
        const prop_collapseBodyIsOpen  = data?.["prop_collapseBodyIsOpen"]  ?? bind.prop_collapseBodyIsOpen;

        const arrowIcon = CoreObservable.App.computed(
            (isOpen: boolean) => {
                const src = isOpen
                    ? UiIcons.Src.ArrowChevronUp.Definition
                    : UiIcons.Src.ArrowChevronDown.Definition;
                return UiIcons.CreateIcon(src, {
                    size: UtilConst.Sizes.L,
                    primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                });
            },
            [prop_collapseBodyIsOpen],
            this.getScope(),
        );

        const arrowPositionStyles = CoreObservable.App.computed(
            (styleMap: Record<string, string> | null) => ({
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                width: COLLAPSE_ARROW_SECTION_WIDTH,
                minWidth: COLLAPSE_ARROW_SECTION_WIDTH,
                flex: `0 0 ${COLLAPSE_ARROW_SECTION_WIDTH}`,
                margin: "0",
                flexShrink: "0",
                ...(styleMap ?? {}),
            }),
            [prop_collapseArrowStyles],
            this.getScope(),
        );

        return CoreObservable.App.computed(
            (icon: any, styles: any) => new ComponentIcon.Component({
                prop_icon:       icon,
                prop_iconClass:  prop_collapseArrowClass as any,
                prop_iconStyles: styles,
            }, {}).getReactiveElement() as CoreReactive.App,
            [arrowIcon, arrowPositionStyles],
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderFormBody â€” Ø±Ù†Ø¯Ø± Part FORM_BODY
       section.col + computed styles (fontSize, lineHeight, border)
       + show/hide Ø¨Ø§ mapBoolean(prop_collapseBodyIsOpen)
    --------------------------------------------- */
    protected renderFormBody(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_collapseBody            = data?.["prop_collapseBody"]            ?? bind.prop_collapseBody;
        const prop_collapseBodyStyles      = data?.["prop_collapseBodyStyles"]      ?? bind.prop_collapseBodyStyles;
        const prop_bodyBackgroundColor    = data?.["prop_bodyBackgroundColor"]    ?? bind.prop_bodyBackgroundColor;
        const prop_collapseBodyClass       = data?.["prop_collapseBodyClass"]       ?? bind.prop_collapseBodyClass;
        const prop_collapseBodyIsOpen      = data?.["prop_collapseBodyIsOpen"]      ?? bind.prop_collapseBodyIsOpen;
        const prop_collapseBodyBorderColor = data?.["prop_collapseBodyBorderColor"] ?? bind.prop_collapseBodyBorderColor;
        const prop_collapseBodyBorderWidth = data?.["prop_collapseBodyBorderWidth"] ?? bind.prop_collapseBodyBorderWidth;
        const prop_collapseBodyBorderRadius = data?.["prop_collapseBodyBorderRadius"] ?? bind.prop_collapseBodyBorderRadius;

        const contentHeight   = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const contentFontSize = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_FontSize(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const borderWidthComputed = CoreObservable.App.computed(
            (width: any, sizeName: UtilConst.Sizes) => {
                if (typeof width === "number") {
                    return `${width}px`;
                }
                return UtilStyle.Css_BorderWidth(sizeName);
            },
            [prop_collapseBodyBorderWidth, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const borderRadiusComputed = CoreObservable.App.computed(
            (radius: any) => {
                if (typeof radius === "string") {
                    return UtilStyle.Css_BorderRadius(radius as UtilConst.Sizes);
                } else if (typeof radius === "number") {
                    return `${radius}px`;
                }
                return null;
            },
            [prop_collapseBodyBorderRadius],
            this.getScope(),
        );

        const borderStyleComputed = CoreObservable.App.computed(
            (width: any) => {
                if (width != null) return "solid";
                return null;
            },
            [prop_collapseBodyBorderWidth],
            this.getScope(),
        );

        const bodyDisplay = CoreObservable.App.computed(
            (isOpen: boolean) => isOpen ? "show" : "d-none",
            [prop_collapseBodyIsOpen],
            this.getScope(),
        );

        const bodyStylesMerged = CoreObservable.App.computed(
            (styleMap, bodyBackgroundColor, borderColor, borderStyle, borderWidth, borderRadius, h, fs) => ({
                lineHeight:   h,
                fontSize:     fs,
                ...(styleMap ?? {}),
                backgroundColor: bodyBackgroundColor,
                borderColor,
                borderStyle,
                borderWidth,
                borderRadius,
            }),
            [prop_collapseBodyStyles, prop_bodyBackgroundColor, prop_collapseBodyBorderColor, borderStyleComputed, borderWidthComputed, borderRadiusComputed, contentHeight, contentFontSize],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: bodyStylesMerged,
            classBind: [bodyDisplay, prop_collapseBodyClass as any],
            className: ["col-12", "p-2"],
            children: [prop_collapseBody as any],
        });
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
