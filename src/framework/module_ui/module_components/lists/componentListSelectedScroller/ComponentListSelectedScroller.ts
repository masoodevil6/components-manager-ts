import * as CoreObservable  from "@/core_observable";
import * as CoreReactive    from "@/core_reactive";
import * as CoreEvent       from "@/core_event";
import * as CoreComponents  from "@/core_components";
import * as CoreConfig      from "@/core_configs";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import * as UiIcons          from "@/ui_icons";
// --------------------------------
import {ComponentListSelectedScrollerBase}      from "./ComponentListSelectedScrollerBase";
import {Schemas}                                 from "./Schemas";
import {Props, ListTypes, type ListItemType, type PropsType} from "./Props";
import {createListSelectedScrollerStep}         from "./Step";
import {ComponentStructureTrait}                 from "../../traits/componentStructureTrait";
import {PartAttrDefault}                          from "@/core_components";
import type {PropsType as StructurePropsType}    from "../componentStructure/Props";
// --------------------------------
import type {MethodsConfigType}                   from "./Methods";
// --------------------------------
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon   from "../componentIcon";


/**
 * ComponentListSelectedScroller — اسکرولر لیست انتخاب‌شده
 *
 * معماری Composition:
 *   ComponentListSelectedScroller HAS-A ComponentBorder (برای هر آیتم لیست)
 *   ComponentListSelectedScroller HAS-A ComponentIcon (برای آیکون close)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (DELETE_ITEM)
 *   identity — { unique?, emit?, events? }
 */
export class ComponentListSelectedScroller extends ComponentListSelectedScrollerBase {

    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentListSelectedScroller>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createListSelectedScrollerStep();

        super("list-selected-scroller", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );
    }


    dispose(): void {
        this.disposeStep();
    }


    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.BORDER.part, {});
    }


    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Schema پایه ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema اختصاصی ---
            case Schemas.BORDER.part:
                return this.renderBorder(attrsDefault, data, extra);
            case Schemas.BORDER_LIST.part:
                return this.renderBorderList(attrsDefault, data, extra);
            case Schemas.BORDER_LIST_ITEM_BORDER.part:
                return this.renderListItemBorder(attrsDefault, data, extra);
            case Schemas.BORDER_LIST_ITEM_BORDER_TITLE.part:
                return this.renderListItemBorderTitle(attrsDefault, data, extra);
            case Schemas.BORDER_LIST_ITEM_BORDER_ICON_CLOSE.part:
                return this.renderListItemBorderIconClose(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderBorder — ظرف اصلی با ComponentBorder بیرونی
    --------------------------------------------- */
    protected renderBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_borderBackgroundColor = data?.["prop_borderBackgroundColor"] ?? bind.prop_borderBackgroundColor;
        const prop_borderColor           = data?.["prop_borderColor"]           ?? bind.prop_borderColor;
        const prop_borderClass           = data?.["prop_borderClass"]           ?? bind.prop_borderClass;
        const prop_borderStyles          = data?.["prop_borderStyles"]          ?? bind.prop_borderStyles;
        const prop_borderWidth           = data?.["prop_borderWidth"]           ?? bind.prop_borderWidth;
        const prop_borderRadius          = data?.["prop_borderRadius"]          ?? bind.prop_borderRadius;

        const border = new ComponentBorder.Component(
            {
                prop_content: this.executeSchemaPart(Schemas.BORDER_LIST.part, {}),
                prop_borderType: ComponentBorder.BorderTypes.SOLID,
                prop_borderWidth: prop_borderWidth as any,
                prop_borderRadius: prop_borderRadius as any,
                prop_borderColor: prop_borderColor as any,
                prop_contentBackgroundColor: prop_borderBackgroundColor as any,
                prop_borderClass: prop_borderClass as any,
                prop_borderStyles: prop_borderStyles as any,
            } as any,
            {} as any,
        );

        return border.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderBorderList — لیست اسکرول‌شونده آیتم‌ها
    --------------------------------------------- */
    protected renderBorderList(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_list                   = data?.["prop_list"]                   ?? bind.prop_list;
        const prop_value                   = data?.["prop_value"]                   ?? bind.prop_value;
        const prop_listMaxShow             = data?.["prop_listMaxShow"]             ?? bind.prop_listMaxShow;
        const prop_listType                = data?.["prop_listType"]                ?? bind.prop_listType;
        const prop_listFreezeSeparator     = data?.["prop_listFreezeSeparator"]     ?? bind.prop_listFreezeSeparator;

        const prop_listBorderBackgroundColor = data?.["prop_listBorderBackgroundColor"] ?? bind.prop_listBorderBackgroundColor;
        const prop_listBorderColor           = data?.["prop_listBorderColor"]           ?? bind.prop_listBorderColor;
        const prop_listBorderClass           = data?.["prop_listBorderClass"]           ?? bind.prop_listBorderClass;
        const prop_listBorderStyles          = data?.["prop_listBorderStyles"]          ?? bind.prop_listBorderStyles;
        const prop_listBorderWidth           = data?.["prop_listBorderWidth"]           ?? bind.prop_listBorderWidth;
        const prop_listBorderRadius          = data?.["prop_listBorderRadius"]          ?? bind.prop_listBorderRadius;

        const prop_listTitleColor    = data?.["prop_listTitleColor"]    ?? bind.prop_listTitleColor;
        const prop_listTitleClass    = data?.["prop_listTitleClass"]    ?? bind.prop_listTitleClass;
        const prop_listTitleStyles   = data?.["prop_listTitleStyles"]   ?? bind.prop_listTitleStyles;

        const prop_listIconCloseClass  = data?.["prop_listIconCloseClass"]  ?? bind.prop_listIconCloseClass;
        const prop_listIconCloseStyles = data?.["prop_listIconCloseStyles"] ?? bind.prop_listIconCloseStyles;

        const getTitleText = (title: any) => {
            if (title == null) return "";
            if (title instanceof CoreObservable.App) return title.get();
            return String(title);
        };

        const buildFreezeText = (list: any[], maxItems: any, separator: any) => {
            const max = (maxItems == null || maxItems === 0) ? null : maxItems;
            const visible = max ? list.slice(0, max) : list;
            const sep = separator ?? "/";
            const text = visible.map((it: any) => getTitleText(it?.title)).filter(Boolean).join(sep);
            if (max && list.length > max) {
                return text.length ? `${text}${sep}...` : "...";
            }
            return text;
        };

        const fireDelete = (id: string | number) => {
            this.executeMethod("DELETE_ITEM", new Event("delete"), { ID: id });

            const currentValue = this.get("prop_value") || [];
            const newValue = currentValue.filter((val: any) => val !== id);
            this.set("prop_value", newValue);
        };

        const getDisplayList = (fullList: any[], selectedIds: any[]) => {
            if (!Array.isArray(fullList) || !Array.isArray(selectedIds)) return fullList || [];
            return fullList.filter((item: any) => selectedIds.includes(item?.id));
        };

        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            stylesBind: prop_listBorderStyles as any,
            classBind: [prop_listBorderClass as any],
            children: CoreObservable.App.computed(
                (
                    list: any,
                    selectedIds: any,
                    maxItems: any,
                    type: any,
                    separator: any,
                    bgColor: any,
                    borderColor: any,
                    borderWidth: any,
                    borderRadius: any,
                    titleColor: any,
                    titleClass: any,
                    titleStyles: any,
                    iconCloseClass: any,
                    iconCloseStyles: any,
                ) => {

                    const safeList = Array.isArray(list) ? list : [];
                    const safeSelectedIds = Array.isArray(selectedIds) ? selectedIds : [];
                    const displayList = getDisplayList(safeList, safeSelectedIds);
                    const max = (maxItems == null || maxItems === 0) ? null : maxItems;

                    if (type === ListTypes.FREEZE) {
                        const freezeText = buildFreezeText(displayList, maxItems, separator);
                        const virtualItem = { id: "freeze", title: freezeText };
                        const titleEl = this.executeSchemaPart(
                            Schemas.BORDER_LIST_ITEM_BORDER_TITLE.part,
                            {
                                item: virtualItem,
                                data: {
                                    prop_listTitleColor: titleColor,
                                    prop_listTitleClass: titleClass,
                                    prop_listTitleStyles: titleStyles,
                                },
                            },
                        );
                        return [CoreReactive.App.span({
                            attrs: {
                                dir: CoreConfig.Settings.DirectionRtl.get() ? "rtl" : "ltr",
                            },
                            styles: { display: "inline-flex" },
                            children: [titleEl as any],
                        })];
                    }

                    const visible = max ? displayList.slice(0, max) : displayList;
                    const showDots = !!(max && displayList.length > max);

                    const rows: any[] = [];
                    for (let i = 0; i < visible.length; i++) {
                        const item = visible[i];
                        const itemId = item?.id;

                        const row = this.executeSchemaPart(
                            Schemas.BORDER_LIST_ITEM_BORDER.part,
                            { item, itemId, fireDelete },
                        );
                        rows.push(row);
                    }

                    if (showDots) {
                        rows.push(CoreReactive.App.div({
                            styles: {
                                whiteSpace: "nowrap",
                                userSelect: "none",
                            },
                            children: ["..."],
                        }));
                    }

                    const marginTop = CoreObservable.App.computed(
                        (sizeName: any) => UtilStyle.Css_Margin(sizeName),
                        [CoreConfig.Settings.SizeName.observable()],
                        this.getScope(),
                    );
                    const marginBottom = CoreObservable.App.computed(
                        (sizeName: any) => UtilStyle.Css_Margin(sizeName),
                        [CoreConfig.Settings.SizeName.observable()],
                        this.getScope(),
                    );

                    let isDragging = false;
                    let startX: number | null = null;
                    let startLeft: number | null = null;
                    let scrollEl: HTMLElement | null = null;

                    const onPointerDown = (e: PointerEvent) => {
                        const el = (e.currentTarget as HTMLElement) ?? null;
                        if (!el) return;
                        isDragging = true;
                        el.style.cursor = "grabbing";
                        el.style.scrollBehavior = "auto";
                        startX = e.clientX;
                        startLeft = el.scrollLeft;
                        scrollEl = el;

                        const onMove = (ev: PointerEvent) => {
                            if (!isDragging || !scrollEl || startX == null || startLeft == null) return;
                            const dx = ev.clientX - startX;
                            scrollEl.scrollLeft = startLeft - dx;
                        };
                        const onUp = () => {
                            isDragging = false;
                            if (scrollEl) {
                                scrollEl.style.cursor = "grab";
                                scrollEl.style.scrollBehavior = "smooth";
                            }
                            startX = null;
                            startLeft = null;
                            scrollEl = null;
                            document.removeEventListener("pointermove", onMove);
                            document.removeEventListener("pointerup", onUp);
                        };
                        document.addEventListener("pointermove", onMove);
                        document.addEventListener("pointerup", onUp);
                    };

                    return [CoreReactive.App.div({
                        styles: {
                            display:          "flex",
                            flexDirection:    "row",
                            gap:              "8px",
                            overflowX:        "auto",
                            overflowY:        "hidden",
                            cursor:           "grab",
                            scrollBehavior:   "auto",
                            scrollbarWidth:   "none",
                            msOverflowStyle:  "none",
                        },
                        stylesBind: {
                            marginTop,
                            marginBottom,
                        },
                        className: ["list-scroller-container"],
                        on: { pointerdown: onPointerDown },
                        children: rows,
                    })];
                },
                [
                    prop_list,
                    prop_value,
                    prop_listMaxShow,
                    prop_listType,
                    prop_listFreezeSeparator,
                    prop_listBorderBackgroundColor,
                    prop_listBorderColor,
                    prop_listBorderWidth,
                    prop_listBorderRadius,
                    prop_listTitleColor,
                    prop_listTitleClass,
                    prop_listTitleStyles,
                    prop_listIconCloseClass,
                    prop_listIconCloseStyles,
                ],
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderListItemBorder — یک آیتم لیست با ComponentBorder
    --------------------------------------------- */
    protected renderListItemBorder(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        if (extra?.item == null) {
            return this.renderEmptyContent(attrsDefault);
        }

        const bind = this._COMPONENT_PROPS_BIND;

        const item = extra.item;
        const itemId = item?.id;
        const fireDelete = extra.fireDelete;

        const prop_listBorderBackgroundColor = data?.["prop_listBorderBackgroundColor"] ?? bind.prop_listBorderBackgroundColor;
        const prop_listBorderColor           = data?.["prop_listBorderColor"]           ?? bind.prop_listBorderColor;
        const prop_listBorderClass           = data?.["prop_listBorderClass"]           ?? bind.prop_listBorderClass;
        const prop_listBorderStyles          = data?.["prop_listBorderStyles"]          ?? bind.prop_listBorderStyles;
        const prop_listBorderWidth           = data?.["prop_listBorderWidth"]           ?? bind.prop_listBorderWidth;
        const prop_listBorderRadius          = data?.["prop_listBorderRadius"]          ?? bind.prop_listBorderRadius;

        const borderClassComputed = CoreObservable.App.computed(
            (classNames: any) => [...(classNames ?? []), "w-100"],
            [prop_listBorderClass],
            this.getScope(),
        );

        const borderStylesComputed = CoreObservable.App.computed(
            (borderStyles: any) => ({
                userSelect:   "none",
                flexShrink:   0,
                minWidth:     "80px",
                maxWidth:     "200px",
                transition:   "transform 0.15s ease, box-shadow 0.15s ease",
                ...(borderStyles ?? {}),
            }),
            [prop_listBorderStyles],
            this.getScope(),
        );

        const itemHeight = CoreObservable.App.computed(
            (sizeName: any) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const border = new ComponentBorder.Component(
            {
                styles: { width: "auto", flexShrink: "0" },
                prop_borderType:              ComponentBorder.BorderTypes.SOLID,
                prop_borderWidth:             prop_listBorderWidth as any,
                prop_borderRadius:            prop_listBorderRadius as any,
                prop_borderColor:             prop_listBorderColor as any,
                prop_contentBackgroundColor:  prop_listBorderBackgroundColor as any,
                prop_contentBackgroundColor_hover: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
                prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                prop_borderClass:             borderClassComputed as any,
                prop_borderStyles:            borderStylesComputed as any,
                prop_content: CoreReactive.App.div({
                    styles: {
                        display:          "flex",
                        alignItems:       "center",
                        justifyContent:   "space-between",
                        gap:              "8px",
                        whiteSpace:       "nowrap",
                        padding:          "0px 4px",
                    },
                    stylesBind: {
                        height: itemHeight,
                    },
                    children: [
                        this.executeSchemaPart(
                            Schemas.BORDER_LIST_ITEM_BORDER_TITLE.part,
                            { item, data },
                        ),
                        (item?.canDelete === false)
                            ? null
                            : this.executeSchemaPart(
                                Schemas.BORDER_LIST_ITEM_BORDER_ICON_CLOSE.part,
                                { item, itemId, fireDelete, data },
                            ),
                    ].filter(Boolean),
                }),
            } as any,
            {} as any,
        );

        return border.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderListItemBorderTitle — عنوان آیتم
    --------------------------------------------- */
    protected renderListItemBorderTitle(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const item = extra?.item;
        const title = item?.title;

        const dataSource = data ?? extra?.data;
        const prop_listTitleClass  = dataSource?.["prop_listTitleClass"]  ?? bind.prop_listTitleClass;
        const prop_listTitleStyles = dataSource?.["prop_listTitleStyles"] ?? bind.prop_listTitleStyles;
        const titleHeight = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Height(sizeName),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );

        const getTitleText = (t: any) => {
            if (t == null) return "";
            if (t instanceof CoreObservable.App) return t.get();
            return String(t);
        };

        const titleText = getTitleText(title);

        return CoreReactive.App.b({
            attrs: { ...attrsDefault },
            classBind: [prop_listTitleClass as any],
            stylesBind: { height: titleHeight },
            children: CoreObservable.App.computed(
                (styles: any) => {
                    const computedStyles: Record<string, string> = {
                        whiteSpace:   "nowrap",
                        overflow:     "hidden",
                        textOverflow: "ellipsis",
                        ...(styles ?? {}),
                    };
                    return [CoreReactive.App.span({
                        styles: computedStyles,
                        children: [titleText],
                    })];
                },
                [prop_listTitleStyles],
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderListItemBorderIconClose — آیکون بستن آیتم
    --------------------------------------------- */
    protected renderListItemBorderIconClose(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const itemId = extra?.itemId;
        const fireDelete = extra?.fireDelete;

        const dataSource = data ?? extra?.data;
        const prop_listIconCloseClass  = dataSource?.["prop_listIconCloseClass"]  ?? bind.prop_listIconCloseClass;
        const prop_listIconCloseStyles = dataSource?.["prop_listIconCloseStyles"] ?? bind.prop_listIconCloseStyles;

        return CoreReactive.App.part("span", {
            attrs: { ...attrsDefault },
            children: CoreObservable.App.computed(
                (iconStyles: any) => {
                    const computedIconStyles: Record<string, string> = {
                        cursor: "pointer",
                        ...(iconStyles ?? {}),
                    };
                    const icon = new ComponentIcon.Component(
                        {
                            styles: { width: "auto", flexShrink: "0" },
                            prop_icon:       UiIcons.CreateIcon(UiIcons.Src.FileWindowClose.Definition, {
                                size: UtilConst.Sizes.S,
                                primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                            }),
                            prop_iconClass:  prop_listIconCloseClass as any,
                            prop_iconStyles: computedIconStyles as any,
                        } as any,
                        {
                            CLICK: (e: any) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (itemId != null && fireDelete) fireDelete(itemId);
                            },
                        } as any,
                    );
                    return [icon.getReactiveElement()];
                },
                [prop_listIconCloseStyles],
                this.getScope(),
            ),
        });
    }

}
