import * as CoreComponents from "@/core_components";
import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentButton from "../componentButton";
import * as ComponentFloatMenu from "../componentFloatMenu";
import * as ComponentIcon from "../componentIcon";
import {Definition} from "./Definition";
import {MenuMoreDirection, MenuMoreOrientation, Props, type MenuMoreEntry, type MenuMoreGroup, type MenuMoreItem, type PropsType, type PropsConfigType} from "./Props";
import {Schemas, type SchemasType} from "./Schemas";
import {Methods, type MethodsType, type MethodsConfigType} from "./Methods";

const MENU_ITEM_HEIGHT = "calc(var(--paddingMedium) + var(--heightMedium) + var(--paddingMedium))";

export class ComponentMenuMore extends CoreComponents.App<PropsType & Record<string, any>, SchemasType, any, MethodsType> {
    protected _COMPONENT_DEFINITION = Definition;
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<PropsType & Record<string, any>>({...ComponentStructureTrait.props, ...Props} as any);
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, PropsType & Record<string, any>>({...ComponentStructureTrait.schemas, ...Schemas} as any);
    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<MethodsType, PropsType & Record<string, any>>({...Methods} as any);

    private _ROOT_BORDER: ComponentBorder.Component | null = null;
    private _FLOAT_MENUS: ComponentFloatMenu.Component[] = [];
    private _HOVER_FLOAT_MENUS: ComponentFloatMenu.Component[] = [];
    private _BUTTONS: ComponentButton.Component[] = [];
    private _ICONS: ComponentIcon.Component[] = [];
    private _HOVER_HIDE_TIMEOUT: ReturnType<typeof setTimeout> | null = null;
    private _ITEM_HOVER_TIMEOUTS = new Set<ReturnType<typeof setTimeout>>();

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentMenuMore>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super("menuMore", null);
        this.renderComponent(config as any, methods as any, identity?.events ?? null, identity?.unique, identity?.emit);
    }

    dispose(): void {
        this.clearHoverHideTimeout();
        this.disposeTreeChildren();
        this._ROOT_BORDER?.dispose();
        this._ROOT_BORDER = null;
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    containsTarget(target: EventTarget | null): boolean {
        if (!(target instanceof Node)) return false;
        return this.getElement().contains(target) || this._FLOAT_MENUS.some((menu) => menu.containsTarget(target));
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(partName: string, attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        if (partName === ComponentStructureTrait.schemas.COMPONENT.part) return ComponentStructureTrait.renderComponentSchema(this, attrs, data);
        if (partName === ComponentStructureTrait.schemas.STRUCTURE.part) return ComponentStructureTrait.renderStructureSchema(this, attrs, data);
        if (partName === Schemas.ROOT.part) return this.renderRoot(attrs, data);
        return super.renderManagerComponent(partName, attrs, data, extra);
    }

    private renderRoot(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        this.disposeTreeChildren();
        this._ROOT_BORDER?.dispose();

        const items = data.prop_items ?? this._COMPONENT_PROPS_BIND.prop_items;
        const orientation = data.prop_orientation ?? this._COMPONENT_PROPS_BIND.prop_orientation;
        const fullWidth = data.prop_isFullWidth ?? this._COMPONENT_PROPS_BIND.prop_isFullWidth;
        const direction = data.prop_direction ?? this._COMPONENT_PROPS_BIND.prop_direction;
        const directionRtl = data.prop_directionRtl ?? this._COMPONENT_PROPS_BIND.prop_directionRtl;
        const menuBackgroundColor = data.prop_menuBackgroundColor ?? this._COMPONENT_PROPS_BIND.prop_menuBackgroundColor;
        const menuBorderRadius = data.prop_menuBorderRadius ?? this._COMPONENT_PROPS_BIND.prop_menuBorderRadius;
        const menuBorderWidth = data.prop_menuBorderWidth ?? this._COMPONENT_PROPS_BIND.prop_menuBorderWidth;
        const menuBorder = data.prop_menuBorder ?? this._COMPONENT_PROPS_BIND.prop_menuBorder;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const menuWidth = CoreObservable.App.computed(
            (layout: MenuMoreOrientation, useFullWidth: boolean) => layout === MenuMoreOrientation.VERTICAL && useFullWidth ? "100%" : "fit-content",
            [orientation, fullWidth],
            this.getScope(),
        );
        const menuBorderRadiusHas = CoreObservable.App.computed(
            (radius: UtilConst.Sizes | null) => radius != null,
            [menuBorderRadius],
            this.getScope(),
        );
        const rootBorderStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes, showBorder: boolean, width: UtilConst.Sizes | null, radius: UtilConst.Sizes | null, resolvedMenuWidth: string) => {
                const resolvedWidth = showBorder ? UtilStyle.Css_BorderWidth(width ?? size) : "0px";
                const resolvedRadius = radius != null ? UtilStyle.Css_BorderRadius(radius) : "0px";
                return {
                    display: "flow-root",
                    width: resolvedMenuWidth,
                    maxWidth: "100%",
                    "border-top-width": UtilStyle.Style_Important(resolvedWidth),
                    "border-right-width": UtilStyle.Style_Important(resolvedWidth),
                    "border-bottom-width": UtilStyle.Style_Important(resolvedWidth),
                    "border-left-width": UtilStyle.Style_Important(resolvedWidth),
                    "border-top-left-radius": resolvedRadius,
                    "border-top-right-radius": resolvedRadius,
                    "border-bottom-left-radius": resolvedRadius,
                    "border-bottom-right-radius": resolvedRadius,
                };
            },
            [sizeName, menuBorder, menuBorderWidth, menuBorderRadius, menuWidth],
            this.getScope(),
        );
        const rtl = CoreObservable.App.computed(
            (override: boolean | null, systemDirectionRtl: boolean) => override ?? systemDirectionRtl,
            [directionRtl, CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
        const resolvedDirection = CoreObservable.App.computed((layout: MenuMoreOrientation, value: MenuMoreDirection, isRtl: boolean) => {
            if (layout === MenuMoreOrientation.HORIZONTAL) {
                if (value === MenuMoreDirection.LTR || value === MenuMoreDirection.RTL) return value;
                return isRtl ? MenuMoreDirection.RTL : MenuMoreDirection.LTR;
            }
            if (value === MenuMoreDirection.TOP_TO_BOTTOM || value === MenuMoreDirection.BOTTOM_TO_TOP) return value;
            return MenuMoreDirection.TOP_TO_BOTTOM;
        }, [orientation, direction, rtl], this.getScope());

        const layoutStyles = CoreObservable.App.computed((layout: MenuMoreOrientation, resolved: MenuMoreDirection, useFullWidth: boolean, isRtl: boolean) => ({
            display: "flex",
            direction: isRtl ? "rtl" : "ltr",
            flexDirection: layout === MenuMoreOrientation.HORIZONTAL
                ? ((resolved === MenuMoreDirection.RTL) === isRtl ? "row" : "row-reverse")
                : (resolved === MenuMoreDirection.BOTTOM_TO_TOP ? "column-reverse" : "column"),
            alignItems: layout === MenuMoreOrientation.HORIZONTAL ? "center" : (useFullWidth ? "stretch" : "flex-start"),
            flexWrap: "nowrap",
            width: layout === MenuMoreOrientation.VERTICAL && useFullWidth ? "100%" : "fit-content",
            maxWidth: "100%",
        }), [orientation, resolvedDirection, fullWidth, rtl], this.getScope());

        const rootContent = CoreObservable.App.computed((list: MenuMoreItem[]) => {
            this.disposeTreeChildren();
            return CoreReactive.App.section({
                attrs: {role: "menubar"},
                stylesBind: layoutStyles as any,
                children: this.renderMenuEntries(list ?? [], 1, {orientation, fullWidth, direction: resolvedDirection, rtl}),
            });
        }, [items], this.getScope());

        this._ROOT_BORDER = new ComponentBorder.Component({
            prop_content: rootContent,
            prop_width: menuWidth,
            prop_borderClass: [],
            prop_borderStyles: rootBorderStyles as any,
            prop_contentBackgroundColor: menuBackgroundColor,
            prop_borderTopHas: menuBorder,
            prop_borderRightHas: menuBorder,
            prop_borderBottomHas: menuBorder,
            prop_borderLeftHas: menuBorder,
            prop_borderTopLeftRadiusHas: menuBorderRadiusHas,
            prop_borderTopRightRadiusHas: menuBorderRadiusHas,
            prop_borderBottomLeftRadiusHas: menuBorderRadiusHas,
            prop_borderBottomRightRadiusHas: menuBorderRadiusHas,
        } as any, {CLICK_BORDER: () => {}} as any);

        const rootStyles = CoreObservable.App.computed(
            (width: string) => ({display: "block", width, maxWidth: "100%"}),
            [menuWidth],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: rootStyles as any,
            on: {
                mouseenter: () => this.clearHoverHideTimeout(),
                mouseleave: (event: MouseEvent) => {
                    const root = event.currentTarget as HTMLElement;
                    const relatedTarget = event.relatedTarget;
                    const pointerRemainsInMenu = relatedTarget instanceof Node && (
                        root.contains(relatedTarget) || this.containsTarget(relatedTarget)
                    );
                    if (pointerRemainsInMenu) {
                        this.clearHoverHideTimeout();
                        return;
                    }
                    this.clearHoverHideTimeout();
                    this._HOVER_HIDE_TIMEOUT = setTimeout(() => {
                        this._HOVER_HIDE_TIMEOUT = null;
                        this._HOVER_FLOAT_MENUS.forEach((menu) => menu.setShow(false));
                    }, 250);
                },
            },
            children: [this._ROOT_BORDER.getReactiveElement()],
        });
    }

    /** Render entries and mark the final group at each menu level so it has no separator. */
    private renderMenuEntries(
        entries: MenuMoreEntry[],
        level: number,
        layout: {orientation: CoreObservable.App<MenuMoreOrientation>; fullWidth: CoreObservable.App<boolean>; direction: CoreObservable.App<MenuMoreDirection>; rtl: CoreObservable.App<boolean>},
    ): CoreReactive.App[] {
        return entries.map((entry, index) => {
            const isLastGroup = this.isMenuGroup(entry) && !entries.slice(index + 1).some((next) => this.isMenuGroup(next));
            return this.renderTreeItem(entry, level, layout, isLastGroup);
        });
    }

    private renderTreeItem(
        item: MenuMoreEntry | undefined,
        level: number,
        layout: {orientation: CoreObservable.App<MenuMoreOrientation>; fullWidth: CoreObservable.App<boolean>; direction: CoreObservable.App<MenuMoreDirection>; rtl: CoreObservable.App<boolean>},
        isLastGroup = false,
    ): CoreReactive.App {
        if (!item) return CoreReactive.App.section({});
        if (this.isMenuGroup(item)) return this.renderGroup(item, level, layout, isLastGroup);
        if (item.separator) {
            const separatorStyles = CoreObservable.App.computed((orientation: MenuMoreOrientation) => orientation === MenuMoreOrientation.HORIZONTAL
                ? {width: "1px", alignSelf: "stretch", marginInline: "var(--marginSmall)", backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_2)}
                : {height: "1px", marginBlock: "var(--marginSmall)", backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_2)}, [layout.orientation], this.getScope());
            return CoreReactive.App.part("div", {attrs: {role: "separator"}, stylesBind: separatorStyles as any});
        }

        const hasChildren = !!item.children?.length;
        // renderOption owns the ComponentFloatMenu wrapper for items with children.
        // Wrapping it again here produced two float menus for each submenu level.
        return this.renderOption(item, level, hasChildren, layout);
    }

    private renderGroup(
        group: MenuMoreGroup,
        level: number,
        layout: {orientation: CoreObservable.App<MenuMoreOrientation>; fullWidth: CoreObservable.App<boolean>; direction: CoreObservable.App<MenuMoreDirection>; rtl: CoreObservable.App<boolean>},
        isLastGroup: boolean,
    ): CoreReactive.App {
        const horizontalRootGroup = CoreObservable.App.computed(
            (orientation: MenuMoreOrientation) => level === 1 && orientation === MenuMoreOrientation.HORIZONTAL,
            [layout.orientation],
            this.getScope(),
        );
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const groupStyles = CoreObservable.App.computed(
            (isHorizontal: boolean, direction: MenuMoreDirection, size: any, useFullWidth: boolean, isRtl: boolean) => {
                const styles: Record<string, string> = {
                    display: "flex",
                    direction: isRtl ? "rtl" : "ltr",
                    flexDirection: isHorizontal
                        ? ((direction === MenuMoreDirection.RTL) === isRtl ? "row" : "row-reverse")
                        : "column",
                    alignItems: isHorizontal ? "center" : "stretch",
                    flexWrap: "nowrap",
                    width: isHorizontal || !useFullWidth ? "fit-content" : "100%",
                    maxWidth: "100%",
                    boxSizing: "border-box",
                };

                if (group.border !== false && !isLastGroup) {
                    const border = `${UtilStyle.Css_BorderWidth(size)} solid ${UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)}`;
                    if (isHorizontal) {
                        if (direction === MenuMoreDirection.RTL) {
                            styles.borderLeft = border;
                        } else {
                            styles.borderRight = border;
                        }
                    } else if (direction === MenuMoreDirection.BOTTOM_TO_TOP) {
                        styles.borderTop = border;
                    } else {
                        styles.borderBottom = border;
                    }
                }
                return styles;
            },
            [horizontalRootGroup, layout.direction, sizeName, layout.fullWidth, layout.rtl],
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: {role: "group", "data-menu-group-id": group.id},
            stylesBind: groupStyles as any,
            children: this.renderMenuEntries(group.items, level, layout),
        });
    }

    private isMenuGroup(entry: MenuMoreEntry): entry is MenuMoreGroup {
        return "type" in entry && entry.type === "group";
    }

    private renderOption(
        item: MenuMoreItem,
        level: number,
        hasChildren: boolean,
        layout: {orientation: CoreObservable.App<MenuMoreOrientation>; fullWidth: CoreObservable.App<boolean>; direction: CoreObservable.App<MenuMoreDirection>; rtl: CoreObservable.App<boolean>},
    ): CoreReactive.App {
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const verticalItemLayout = CoreObservable.App.computed(
            (orientation: MenuMoreOrientation) => level > 1 || orientation === MenuMoreOrientation.VERTICAL,
            [layout.orientation],
            this.getScope(),
        );
        const iconFrameSize = CoreObservable.App.computed((size) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(size) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Height(size) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ), [sizeName], this.getScope());
        const iconFrameStyles = CoreObservable.App.computed(
            (isVertical: boolean, frame: string) => ({
                height: MENU_ITEM_HEIGHT,
                ...(isVertical
                    ? {width: frame, flex: `0 0 ${frame}`}
                    : {}),
            }),
            [verticalItemLayout, iconFrameSize],
            this.getScope(),
        );
        const buttonComponentStyles = CoreObservable.App.computed((isVertical: boolean, useFullWidth: boolean) => isVertical && useFullWidth
            ? {display: "block", width: "100%", height: MENU_ITEM_HEIGHT, flex: "1 1 0%", minWidth: "0"}
            : {display: "inline-block", width: "auto", height: MENU_ITEM_HEIGHT, flex: "0 0 auto", minWidth: "0"},
        [verticalItemLayout, layout.fullWidth], this.getScope());
        const buttonStructureStyles = CoreObservable.App.computed((isVertical: boolean, useFullWidth: boolean) => isVertical && useFullWidth
            ? {display: "block", width: "100%", height: MENU_ITEM_HEIGHT}
            : {display: "inline-flex", width: "auto", height: MENU_ITEM_HEIGHT, maxWidth: "100%"},
        [verticalItemLayout, layout.fullWidth], this.getScope());
        const buttonStyles = CoreObservable.App.computed((size, isVertical: boolean, useFullWidth: boolean, isRtl: boolean) => ({
            display: "inline-flex",
            direction: isRtl ? "rtl" : "ltr",
            flex: isVertical && useFullWidth ? "1 1 0%" : "0 0 auto",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: UtilStyle.Css_Margin(size),
            boxSizing: "border-box",
            height: MENU_ITEM_HEIGHT,
            lineHeight: UtilStyle.Css_Height(size),
            width: "auto",
            minWidth: "0",
            maxWidth: "100%",
            textAlign: "start",
            whiteSpace: "nowrap",
            border: "0",
            borderRadius: "0",
            color: item.disabled ? UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_3) : UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            padding: UtilStyle.Css_Padding(size),
            cursor: item.disabled ? "default" : "pointer",
            opacity: item.disabled ? "0.55" : "1",
        }), [sizeName, verticalItemLayout, layout.fullWidth, layout.rtl], this.getScope());
        const titleStyles = CoreObservable.App.computed((size, isVertical: boolean, frame: string) => ({
            order: item.icon ? "1" : "0",
            padding: "0",
            lineHeight: UtilStyle.Css_Height(size),
            fontSize: UtilStyle.Css_FontSize(size),
            flex: isVertical ? "1 1 auto" : "0 1 auto",
            minWidth: "0",
            maxWidth: "100%",
            marginInlineStart: isVertical && !item.icon
                ? UtilStyle.Css_SizeCalc(frame as any, UtilConst.Operation.ADD, UtilStyle.Css_Margin(size) as any)
                : "0px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        }), [sizeName, verticalItemLayout, iconFrameSize], this.getScope());
        const button = new ComponentButton.Component({
            prop_btnTitle: item.title ?? "",
            prop_btnIcon: item.icon ? this.createColoredIconDefinition(item.icon) : null,
            prop_btnVariant: "ghost" as any,
            prop_btnSemantic: "custom" as any,
            prop_btnDisabled: !!item.disabled,
            prop_btnTitleColor: item.disabled
                ? UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_3)
                : UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            prop_btnBackgroundColor: "transparent",
            styles: buttonComponentStyles as any,
            prop_structureStyles: buttonStructureStyles as any,
            prop_btnStyles: buttonStyles as any,
            prop_btnTitleStyles: titleStyles as any,
            prop_btnIconStyles: iconFrameStyles as any,
        } as any, {
            CLICK: (event: Event) => {
                event.stopPropagation();
                if (item.disabled || hasChildren) return;
                this.executeMethod("SELECT_ITEM", event, {ITEM: item});
                this._FLOAT_MENUS.forEach((menu) => menu.setShow(false));
            },
        } as any);
        this._BUTTONS.push(button);

        const buttonRoot = button.getElement() as HTMLElement;
        const buttonElement = buttonRoot.querySelector('[data-part-name="part-button"]') as HTMLButtonElement | null;
        buttonElement?.setAttribute("role", "menuitem");
        if (hasChildren) buttonElement?.setAttribute("aria-haspopup", "menu");

        const itemHovered = new CoreObservable.App<boolean>(false);
        let itemHoverTimeout: ReturnType<typeof setTimeout> | null = null;
        const clearItemHoverTimeout = () => {
            if (itemHoverTimeout === null) return;
            clearTimeout(itemHoverTimeout);
            this._ITEM_HOVER_TIMEOUTS.delete(itemHoverTimeout);
            itemHoverTimeout = null;
        };
        const scheduleItemHoverReset = () => {
            clearItemHoverTimeout();
            const timeout = setTimeout(() => {
                this._ITEM_HOVER_TIMEOUTS.delete(timeout);
                if (itemHoverTimeout === timeout) itemHoverTimeout = null;
                itemHovered.set(false);
            }, 250);
            itemHoverTimeout = timeout;
            this._ITEM_HOVER_TIMEOUTS.add(timeout);
        };
        const itemPaddingStyles = CoreObservable.App.computed(
            (isVertical: boolean, direction: MenuMoreDirection, size: UtilConst.Sizes) => {
                const padding = UtilStyle.Css_Padding(size);
                if (isVertical) {
                    return level === 1 && direction === MenuMoreDirection.BOTTOM_TO_TOP
                        ? {paddingBottom: padding}
                        : {paddingTop: padding};
                }
                return direction === MenuMoreDirection.RTL
                    ? {paddingRight: padding}
                    : {paddingLeft: padding};
            },
            [verticalItemLayout, layout.direction, sizeName],
            this.getScope(),
        );
        const rowStyles = CoreObservable.App.computed(
            (isVertical: boolean, hovered: boolean, hoverColor: string, itemPadding: Record<string, string>, useFullWidth: boolean, isRtl: boolean) => ({
                display: "flex",
                direction: isRtl ? "rtl" : "ltr",
                alignItems: "center",
                width: isVertical && useFullWidth ? "100%" : "fit-content",
                minWidth: isVertical ? "10rem" : "0",
                height: MENU_ITEM_HEIGHT,
                boxSizing: "border-box",
                backgroundColor: !item.disabled && hovered ? hoverColor : "transparent",
                transition: "background-color 160ms ease",
                ...itemPadding,
            }),
            [verticalItemLayout, itemHovered, this._COMPONENT_PROPS_BIND.prop_itemBackgroundColorHover, itemPaddingStyles, layout.fullWidth, layout.rtl],
            this.getScope(),
        );
        const openOnClick = item.openOn === "click";
        let itemFloatMenu: ComponentFloatMenu.Component | null = null;
        const trigger = CoreReactive.App.section({
            attrs: {role: "none"},
            stylesBind: rowStyles as any,
            on: {
                mouseenter: () => {
                    clearItemHoverTimeout();
                    if (!item.disabled) {
                        itemHovered.set(true);
                        // Open from the actual menu row as well as FloatMenu's
                        // selector handler. This keeps hover submenus reliable
                        // when direction overrides change the trigger's layout.
                        if (hasChildren && !openOnClick) itemFloatMenu?.setShow(true);
                    }
                },
                mouseleave: () => {
                    if (hasChildren) scheduleItemHoverReset();
                    else itemHovered.set(false);
                },
            },
            children: [
                button.getReactiveElement(),
                this.createSubmenuIndicator(level, layout, hasChildren, verticalItemLayout),
            ],
        });
        if (!hasChildren) return trigger;

        const bodyStyles = CoreObservable.App.computed((isRtl: boolean) => ({
            display: "flex",
            flexDirection: "column",
            minWidth: "10rem",
            direction: isRtl ? "rtl" : "ltr",
        }), [layout.rtl], this.getScope());
        const body = CoreReactive.App.section({
            attrs: {role: "menu"},
            stylesBind: bodyStyles as any,
            on: {
                mouseenter: () => {
                    clearItemHoverTimeout();
                    if (!item.disabled) {
                        itemHovered.set(true);
                        if (!openOnClick) itemFloatMenu?.setShow(true);
                    }
                },
                mouseleave: () => scheduleItemHoverReset(),
            },
            children: this.renderMenuEntries(item.children!, level + 1, layout),
        });
        const floatDirection = CoreObservable.App.computed((orientation: MenuMoreOrientation, direction: MenuMoreDirection, isRtl: boolean) => {
            if (level === 1 && orientation === MenuMoreOrientation.HORIZONTAL) return ComponentFloatMenu.DirectionTypes.BOTTOM;
            // Submenus open toward the inline end, using the resolved layout direction for the side axis.
            const opensLeft = direction === MenuMoreDirection.RTL || ((direction === MenuMoreDirection.TOP_TO_BOTTOM || direction === MenuMoreDirection.BOTTOM_TO_TOP) && isRtl);
            return opensLeft ? ComponentFloatMenu.DirectionTypes.LEFT : ComponentFloatMenu.DirectionTypes.RIGHT;
        }, [layout.orientation, layout.direction, layout.rtl], this.getScope());
        const floatStyles = CoreObservable.App.computed(
            (direction: ComponentFloatMenu.DirectionTypes, isRtl: boolean) => direction === ComponentFloatMenu.DirectionTypes.BOTTOM
                ? {
                    top: "100%",
                    bottom: "auto",
                    left: isRtl ? "auto" : "0px",
                    right: isRtl ? "0px" : "auto",
                    transform: "none",
                    marginTop: "0px",
                }
                : {
                    top: "0px",
                    bottom: "auto",
                    transform: "none",
                    marginTop: "0px",
                },
            [floatDirection, layout.rtl],
            this.getScope(),
        );
        const horizontalRootItem = CoreObservable.App.computed(
            (orientation: MenuMoreOrientation) => level === 1 && orientation === MenuMoreOrientation.HORIZONTAL,
            [layout.orientation],
            this.getScope(),
        );
        const floatComponentStyles = CoreObservable.App.computed((isHorizontalRoot: boolean, useFullWidth: boolean) => isHorizontalRoot || !useFullWidth
            ? {display: "inline-block", width: "auto", height: MENU_ITEM_HEIGHT, flex: "0 0 auto"}
            : {display: "block", width: "100%", height: MENU_ITEM_HEIGHT},
        [horizontalRootItem, layout.fullWidth], this.getScope());
        const floatStructureStyles = CoreObservable.App.computed((isHorizontalRoot: boolean, useFullWidth: boolean) => isHorizontalRoot || !useFullWidth
            ? {display: "inline-block", width: "auto", height: MENU_ITEM_HEIGHT}
            : {display: "block", width: "100%", height: MENU_ITEM_HEIGHT},
        [horizontalRootItem, layout.fullWidth], this.getScope());
        const floatMenu = new ComponentFloatMenu.Component({
            classList: ["position-relative", "d-inline-block"],
            styles: floatComponentStyles as any,
            prop_structureStyles: floatStructureStyles as any,
            prop_selectorContent: trigger,
            prop_selectorClass: ["d-inline-block"],
            prop_selectorStyles: {height: MENU_ITEM_HEIGHT, position: "relative"},
            prop_selectorShowType: openOnClick ? ComponentFloatMenu.ShowTypes.CLICK : ComponentFloatMenu.ShowTypes.HOVER,
            prop_floatContent: body,
            prop_floatBorderPadding: false,
            prop_floatDirectionType: floatDirection as any,
            prop_floatArrowWidth: 0,
            prop_floatDistance: 0,
            prop_floatWidth: "max-content",
            prop_floatMinWidth: "10rem",
            prop_floatUsePortal: true,
            ...this.getFloatMenuBorderConfig(),
            prop_floatStyles: floatStyles,
            prop_floatShowControlWithSelf: openOnClick,
        } as any);
        itemFloatMenu = floatMenu;
        this._FLOAT_MENUS.push(floatMenu);
        floatMenu.setRelatedTargetContains((target) => this.containsTarget(target));
        if (!openOnClick) this._HOVER_FLOAT_MENUS.push(floatMenu);
        return floatMenu.getReactiveElement();
    }

    private createIcon(icon: UiIcons.TIconInstance): ComponentIcon.Component {
        const component = new ComponentIcon.Component({prop_icon: icon} as any);
        this._ICONS.push(component);
        return component;
    }

    private getFloatMenuBorderConfig(): Record<string, CoreObservable.App<any>> {
        const border = this._COMPONENT_PROPS_BIND.prop_menuBorder;
        const configuredWidth = this._COMPONENT_PROPS_BIND.prop_menuBorderWidth;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const borderWidth = CoreObservable.App.computed(
            (isEnabled: boolean, width: UtilConst.Sizes | null, size: UtilConst.Sizes) =>
                isEnabled ? (width ?? size) : null,
            [border, configuredWidth, sizeName],
            this.getScope(),
        );
        const borderColor = CoreObservable.App.computed(
            (isEnabled: boolean) => isEnabled
                ? UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1)
                : null,
            [border],
            this.getScope(),
        );

        return {
            prop_floatBackground: this._COMPONENT_PROPS_BIND.prop_menuBackgroundColor,
            prop_floatBorderWidth: borderWidth,
            prop_floatBorderColor: borderColor,
            prop_floatBorderRadius: this._COMPONENT_PROPS_BIND.prop_menuBorderRadius,
        };
    }

    private createColoredIconDefinition(definition: UiIcons.IIconDefinition): UiIcons.IIconDefinition {
        const primaryColor = this._COMPONENT_PROPS_BIND.prop_menuIconColor;
        const secondaryColor = CoreObservable.App.computed(
            (customColor: string | null, menuColor: string) => customColor ?? menuColor,
            [this._COMPONENT_PROPS_BIND.prop_menuIconSecondaryColor, this._COMPONENT_PROPS_BIND.prop_menuBackgroundColor],
            this.getScope(),
        );
        return {
            ...definition,
            render: (context) => definition.render({
                ...context,
                primaryColor,
                secondaryColor,
            }),
        };
    }

    private createSubmenuIndicator(
        level: number,
        layout: {orientation: CoreObservable.App<MenuMoreOrientation>; fullWidth: CoreObservable.App<boolean>; direction: CoreObservable.App<MenuMoreDirection>; rtl: CoreObservable.App<boolean>},
        visible: boolean,
        verticalItemLayout: CoreObservable.App<boolean>,
    ): CoreReactive.App {
        const definition = CoreObservable.App.computed(
            (orientation: MenuMoreOrientation, direction: MenuMoreDirection, isRtl: boolean) => {
                if (level === 1 && orientation === MenuMoreOrientation.HORIZONTAL) return UiIcons.Src.ArrowChevronDown.Definition;
                const opensLeft = direction === MenuMoreDirection.RTL ||
                    ((direction === MenuMoreDirection.TOP_TO_BOTTOM || direction === MenuMoreDirection.BOTTOM_TO_TOP) && isRtl);
                return opensLeft ? UiIcons.Src.ArrowChevronLeft.Definition : UiIcons.Src.ArrowChevronRight.Definition;
            },
            [layout.orientation, layout.direction, layout.rtl],
            this.getScope(),
        );
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const icon = UiIcons.CreateIcon(definition as any, {
            size: sizeName,
            primaryColor: this._COMPONENT_PROPS_BIND.prop_menuIconColor,
            secondaryColor: CoreObservable.App.computed(
                (customColor: string | null, menuColor: string) => customColor ?? menuColor,
                [this._COMPONENT_PROPS_BIND.prop_menuIconSecondaryColor, this._COMPONENT_PROPS_BIND.prop_menuBackgroundColor],
                this.getScope(),
            ),
            scope: this.getScope(),
        });
        const iconBoxStyles = CoreObservable.App.computed((size, isVertical: boolean) => {
            const width = isVertical
                ? UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                )
                : UtilStyle.Css_IconSize(size);
            return {
                display: visible || isVertical ? "inline-flex" : "none",
                width,
                height: MENU_ITEM_HEIGHT,
                flex: `0 0 ${width}`,
                alignItems: "center",
                justifyContent: "center",
                marginInlineStart: visible || isVertical ? "auto" : "0px",
                opacity: visible ? "1" : "0",
            };
        }, [sizeName, verticalItemLayout], this.getScope());
        const component = new ComponentIcon.Component({
            prop_icon: icon,
            styles: iconBoxStyles as any,
            prop_structureStyles: {display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"},
            prop_iconClass: ["d-flex", "align-items-center", "justify-content-center"],
            prop_iconStyles: {display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"},
        } as any);
        if (!visible) (component.getElement() as HTMLElement).setAttribute("aria-hidden", "true");
        this._ICONS.push(component);
        return component.getReactiveElement();
    }

    private disposeTreeChildren(): void {
        this.clearHoverHideTimeout();
        this._ITEM_HOVER_TIMEOUTS.forEach((timeout) => clearTimeout(timeout));
        this._ITEM_HOVER_TIMEOUTS.clear();
        this._FLOAT_MENUS.forEach((menu) => menu.dispose());
        this._BUTTONS.forEach((button) => button.dispose());
        this._ICONS.forEach((icon) => {icon.disposeStep(); icon.getScope().dispose();});
        this._FLOAT_MENUS = [];
        this._HOVER_FLOAT_MENUS = [];
        this._BUTTONS = [];
        this._ICONS = [];
    }

    private clearHoverHideTimeout(): void {
        if (this._HOVER_HIDE_TIMEOUT === null) return;
        clearTimeout(this._HOVER_HIDE_TIMEOUT);
        this._HOVER_HIDE_TIMEOUT = null;
    }
}
