import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
// --------------------------------
import {ComponentTableBase}    from "./ComponentTableBase";
import {Schemas}              from "./Schemas";
import {MethodsType,
        MethodsConfigType}   from "./Methods";
import {TableSelectedType, Props,
        TableHeaderItem, TableDataRow, TableRowOption}  from "./Props";
import {PropsConfigType}      from "./Props";
import {createTableStep}      from "./Step";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import type {ColumnItem}       from "../componentInputListSelector/Props";
// --------------------------------
import {ComponentInputListSelector} from "../componentInputListSelector/ComponentInputListSelector";
import * as UiIcons     from "@/ui_icons";
import * as UtilConst   from "@/util_consts";
import * as UtilStyle   from "@/util_styles";


/**
 * ComponentTable â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentTable HAS-A ComponentStructure (Ù†Ù‡ IS-A)
 *   ComponentStructure Ø¯Ø± renderContentComponent Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = renderTable (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentTable)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (SELECT_COL, CLICK_OPTION_CARD)
 *   identity â€” { unique?, emit?, events? }
 */
export class ComponentTable extends ComponentTableBase<ReturnType<typeof createTableStep>>{

    constructor(
        config?:  Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentTable>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createTableStep();

        super("table", null, identity, step);

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
        return this.executeSchemaPart(Schemas.TABLE.part, {});
    }


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
            case Schemas.TABLE.part:
                return this.renderTable(attrsDefault, data, extra);
            case Schemas.TABLE_HEADER.part:
                return this.renderTableHeader(attrsDefault, data, extra);
            case Schemas.TABLE_BODY.part:
                return this.renderTableBody(attrsDefault, data, extra);
            case Schemas.TABLE_HEADER_COL_SELECTOR.part:
                return this.renderTableHeaderColSelector(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderTable â€” Ø±Ù†Ø¯Ø± Part TABLE Ø§ØµÙ„ÛŒ
    --------------------------------------------- */
    protected renderTable(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tableClass      = data?.["prop_tableClass"]      ?? bind.prop_tableClass;
        const prop_tableStyles     = data?.["prop_tableStyles"]     ?? bind.prop_tableStyles;
        const prop_header          = data?.["prop_header"]          ?? bind.prop_header;
        const prop_headerIconSize  = data?.["prop_headerIconSize"]  ?? bind.prop_headerIconSize;
        const prop_tableBordered   = data?.["prop_tableBordered"]   ?? bind.prop_tableBordered;
        const prop_tableStriped    = data?.["prop_tableStriped"]    ?? bind.prop_tableStriped;
        const prop_tableHover      = data?.["prop_tableHover"]      ?? bind.prop_tableHover;
        const prop_tableBorderless = data?.["prop_tableBorderless"] ?? bind.prop_tableBorderless;

        const tableStyles = CoreObservable.App.computed(
            (styles: Record<string, string>, header: TableHeaderItem[], iconSize: number) => {
                const hasHeaderIcon = Array.isArray(header) && header.some((item) => item?.icon != null);
                const safeIconSize = Number.isFinite(Number(iconSize)) ? Math.max(0, Number(iconSize)) : 20;
                return {
                    ...(styles ?? {}),
                    ...(hasHeaderIcon ? {marginTop: `${safeIconSize}px`} : {}),
                };
            },
            [prop_tableStyles, prop_header, prop_headerIconSize],
            this.getScope(),
        );

        const tableClasses = CoreObservable.App.computed(
            (tc, bordered, striped, hover, borderless) => {
                const result: string[] = [...(tc || [])];
                if (bordered) result.push("table-bordered");
                if (striped) result.push("table-striped");
                if (hover) result.push("table-hover");
                if (borderless) result.push("table-borderless");
                return result;
            },
            [prop_tableClass, prop_tableBordered, prop_tableStriped, prop_tableHover, prop_tableBorderless],
            this.getScope(),
        );

        return CoreReactive.App.part("table", {
            attrs: { ...attrsDefault },
            classBind: [tableClasses],
            stylesBind: tableStyles,
            children: [
                this.executeSchemaPart(Schemas.TABLE_HEADER.part, {}),
                this.executeSchemaPart(Schemas.TABLE_BODY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderTableHeader â€” Ø±Ù†Ø¯Ø± Part TABLE_HEADER
    --------------------------------------------- */
    protected renderTableHeader(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tableHeadClass     = data?.["prop_tableHeadClass"]     ?? bind.prop_tableHeadClass;
        const prop_tableHeadStyles    = data?.["prop_tableHeadStyles"]    ?? bind.prop_tableHeadStyles;
        const prop_order              = data?.["prop_order"]              ?? bind.prop_order;
        const prop_header             = data?.["prop_header"]             ?? bind.prop_header;
        const prop_hasColNumber       = data?.["prop_hasColNumber"]       ?? bind.prop_hasColNumber;
        const prop_hasColSelector     = data?.["prop_hasColSelector"]     ?? bind.prop_hasColSelector;
        const prop_tableItemHeadClass = data?.["prop_tableItemHeadClass"] ?? bind.prop_tableItemHeadClass;
        const prop_tableItemHeadStyles = data?.["prop_tableItemHeadStyles"] ?? bind.prop_tableItemHeadStyles;
        const prop_headerIconSize     = data?.["prop_headerIconSize"]     ?? bind.prop_headerIconSize;
        const prop_headerIconColor    = data?.["prop_headerIconColor"]    ?? bind.prop_headerIconColor;
        const headerIconBackgroundColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        const headerIconBorderColor = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
        const prop_rowOptions         = data?.["prop_rowOptions"]         ?? bind.prop_rowOptions;

        const headerCells = CoreObservable.App.computed(
            (order, header, hasColNumber, hasColSelector, itemHeadClass, itemHeadStyles, iconSize, iconColor, rowOptions) => {
                const cells: any[] = [];
                if (hasColNumber || hasColSelector) {
                    cells.push(CoreReactive.App.part("th", {
                        className: ["p-0", "text-center", "position-relative"],
                        attrs: { scope: "col" },
                        styles: { width: "40px" },
                        children: [
                            this.executeSchemaPart(Schemas.TABLE_HEADER_COL_SELECTOR.part, {}),
                        ],
                    }));
                }
                const orderedHeader = this.fn_getOrderedHeader(order, header);
                for (const itemHeader of orderedHeader) {
                    const icon = itemHeader.icon;
                    const safeIconSize = Number.isFinite(Number(iconSize)) ? Math.max(0, Number(iconSize)) : 20;
                    const iconHtml = icon == null
                        ? null
                        : typeof icon === "function"
                            ? icon(iconSize, iconColor)
                            : typeof icon === "object"
                                ? UiIcons.CreateIcon(icon, {size: iconSize, primaryColor: (iconColor || undefined) as any})
                                : icon;
                    cells.push(CoreReactive.App.part("th", {
                        className: [
                            ...(itemHeadStyles?.padding != null ? [] : ["p-0"]),
                            "text-center",
                            "position-relative",
                            ...(itemHeadClass || []),
                        ],
                        attrs: { scope: "col" },
                        styles: {
                            ...(itemHeadStyles ?? {}),
                            ...(itemHeader.width != null ? {width: `${itemHeader.width}%`} : {}),
                        },
                        children: [
                            itemHeader.content ?? "#",
                            iconHtml != null ? CoreReactive.App.span({
                                className: ["position-absolute", "d-flex", "align-items-center", "justify-content-center"],
                                styles: {
                                    left: "50%",
                                    top: `${-safeIconSize / 2}px`,
                                    transform: "translate(-50%, -50%)",
                                    width: `${safeIconSize + 10}px`,
                                    height: `${safeIconSize + 10}px`,
                                    backgroundColor: headerIconBackgroundColor,
                                    borderWidth: UtilStyle.Css_BorderWidth(UtilConst.Sizes.L),
                                    borderStyle: "solid",
                                    borderColor: headerIconBorderColor,
                                    borderRadius: "100%",
                                    boxSizing: "border-box",
                                    zIndex: "1",
                                },
                                children: [iconHtml],
                            }) : null,
                        ],
                    }));
                }
                if (Array.isArray(rowOptions) && rowOptions.length > 0) {
                    cells.push(CoreReactive.App.part("th", {
                        className: ["p-0", "text-center", "position-relative"],
                        attrs: {scope: "col", "aria-label": "Row actions"},
                        styles: {width: "0", padding: "0", border: "0"},
                    }));
                }
                return cells;
            },
            [prop_order, prop_header, prop_hasColNumber, prop_hasColSelector, prop_tableItemHeadClass, prop_tableItemHeadStyles, prop_headerIconSize, prop_headerIconColor, prop_rowOptions],
            this.getScope(),
        );

        return CoreReactive.App.part("thead", {
            attrs: { ...attrsDefault },
            classBind: [prop_tableHeadClass],
            stylesBind: prop_tableHeadStyles,
            children: [
                CoreReactive.App.part("tr", { children: headerCells as any }),
            ],
        });
    }


    /* ---------------------------------------------
       renderTableBody â€” Ø±Ù†Ø¯Ø± Part TABLE_BODY
    --------------------------------------------- */
    protected renderTableBody(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tableBodyClass     = data?.["prop_tableBodyClass"]     ?? bind.prop_tableBodyClass;
        const prop_tableBodyStyles    = data?.["prop_tableBodyStyles"]    ?? bind.prop_tableBodyStyles;
        const prop_order              = data?.["prop_order"]              ?? bind.prop_order;
        const prop_header             = data?.["prop_header"]             ?? bind.prop_header;
        const prop_data               = data?.["prop_data"]               ?? bind.prop_data;
        const prop_valueType          = data?.["prop_valueType"]          ?? bind.prop_valueType;
        const prop_valueRow           = data?.["prop_valueRow"]           ?? bind.prop_valueRow;
        const prop_valueCol           = data?.["prop_valueCol"]           ?? bind.prop_valueCol;
        const prop_tableItemBodyClass = data?.["prop_tableItemBodyClass"] ?? bind.prop_tableItemBodyClass;
        const prop_tableItemBodyStyles = data?.["prop_tableItemBodyStyles"] ?? bind.prop_tableItemBodyStyles;
        const prop_tableItemBodyHoverStyles = data?.["prop_tableItemBodyHoverStyles"] ?? bind.prop_tableItemBodyHoverStyles;
        const prop_hasColNumber       = data?.["prop_hasColNumber"]       ?? bind.prop_hasColNumber;
        const prop_rowOptions         = data?.["prop_rowOptions"]         ?? bind.prop_rowOptions;
        const prop_rowOptionsColor    = data?.["prop_rowOptionsColor"]    ?? bind.prop_rowOptionsColor;
        const prop_rowOptionsItemColor = data?.["prop_rowOptionsItemColor"] ?? bind.prop_rowOptionsItemColor;
        const prop_size               = data?.["prop_size"]               ?? bind.prop_size;
        const directionRtl            = CoreConfig.Settings.DirectionRtl.observable();

        const bodyRows = CoreObservable.App.computed(
            (order, header, tableData, valueType, valueRow, valueCol, itemBodyClass, itemBodyStyles, itemBodyHoverStyles, hasColNumber, rowOptions, rowOptionsColor, rowOptionsItemColor, size, isRtl) => {
                if (!header || !Array.isArray(header)) return [];
                const orderedHeader = this.fn_getOrderedHeader(order, header);
                if (!tableData || !Array.isArray(tableData)) return [];
                const rows: any[] = [];
                for (let bodyIndex = 0; bodyIndex < tableData.length; bodyIndex++) {
                    const itemBody = tableData[bodyIndex];
                    const isRowSelected = valueRow === bodyIndex && (valueType === TableSelectedType.ROW || valueType === TableSelectedType.BOTH);
                    const cells: any[] = [];
                    const isRowHovered = new CoreObservable.App(false);
                    if (hasColNumber) {
                        cells.push(CoreReactive.App.part("td", {
                            className: ["p-0", "text-center"],
                            children: [
                                CoreReactive.App.span({
                                    className: ["p-0", "text-center", ...(itemBodyClass || [])],
                                        stylesBind: CoreObservable.App.computed(
                                            (baseStyles: Record<string, string>, hoverStyles: Record<string, string>, isHovered: boolean) => ({
                                                display: "block",
                                                width: "100%",
                                                ...(baseStyles ?? {}),
                                                ...(isHovered ? (hoverStyles ?? {}) : {}),
                                            }),
                                            [itemBodyStyles, itemBodyHoverStyles, isRowHovered],
                                            this.getScope(),
                                        ) as any,
                                    children: [`${bodyIndex + 1}`],
                                }),
                            ],
                        }));
                    }
                    let hasRow = false;
                    for (let headerIndex = 0; headerIndex < orderedHeader.length; headerIndex++) {
                        const itemHeader = orderedHeader[headerIndex];
                        if (itemHeader && itemBody.hasOwnProperty(itemHeader.id)) {
                            hasRow = true;
                            const rawValue = itemBody[itemHeader.id];
                            const cellValue = typeof rawValue === "object" && rawValue !== null ? rawValue.content : rawValue;
                            const content = cellValue == null ? "" : String(cellValue);
                            const isColSelected = valueRow === bodyIndex && valueCol === headerIndex && (valueType === TableSelectedType.COL || valueType === TableSelectedType.BOTH);
                            cells.push(CoreReactive.App.part("td", {
                                className: ["p-0", "text-center"],
                                children: [
                                    CoreReactive.App.span({
                                        className: ["p-0", "text-center", ...(itemBodyClass || []), isColSelected ? "selected_table_col" : ""],
                                        stylesBind: CoreObservable.App.computed(
                                            (baseStyles: Record<string, string>, hoverStyles: Record<string, string>, isHovered: boolean) => ({
                                                display: "block",
                                                width: "100%",
                                                ...(baseStyles ?? {}),
                                                ...(isHovered ? (hoverStyles ?? {}) : {}),
                                            }),
                                            [itemBodyStyles, itemBodyHoverStyles, isRowHovered],
                                            this.getScope(),
                                        ) as any,
                                        on: {
                                            click: (event: Event) => {
                                                this.fn_onSelectCol(event, itemHeader.id, headerIndex, bodyIndex, content);
                                            },
                                        },
                                        children: [content],
                                    }),
                                ],
                            }));
                        }
                    }
                    if (hasRow) {
                        if (Array.isArray(rowOptions) && rowOptions.length > 0) {
                            cells.push(this.fn_renderRowOptions(itemBody, bodyIndex, rowOptions, rowOptionsColor, rowOptionsItemColor, size, isRowHovered, isRtl));
                        }
                        rows.push(CoreReactive.App.part("tr", {
                            className: ["position-relative", isRowSelected ? "selected_table_row" : ""],
                            on: {
                                mouseenter: () => isRowHovered.set(true),
                                mouseleave: () => isRowHovered.set(false),
                            },
                            children: cells,
                        }));
                    }
                }
                return rows;
            },
            [prop_order, prop_header, prop_data, prop_valueType, prop_valueRow, prop_valueCol, prop_tableItemBodyClass, prop_tableItemBodyStyles, prop_tableItemBodyHoverStyles, prop_hasColNumber, prop_rowOptions, prop_rowOptionsColor, prop_rowOptionsItemColor, prop_size, directionRtl],
            this.getScope(),
        );

        return CoreReactive.App.part("tbody", {
            attrs: { ...attrsDefault },
            classBind: [prop_tableBodyClass],
            stylesBind: prop_tableBodyStyles,
            children: bodyRows as any,
        });
    }


    /* ---------------------------------------------
       HELPER: Get ordered header
    --------------------------------------------- */
    private fn_getOrderedHeader(order: string[], header: TableHeaderItem[]): TableHeaderItem[] {
        if (!order || order.length === 0) return header || [];
        const headerMap = new Map<string, TableHeaderItem>();
        for (const h of (header || [])) headerMap.set(h.id, h);
        const result: TableHeaderItem[] = [];
        for (const id of order) {
            const h = headerMap.get(id);
            if (h) result.push(h);
        }
        return result;
    }


    /* ---------------------------------------------
       HELPER: Render row options
    --------------------------------------------- */
    private fn_renderRowOptions(
        itemBody: TableDataRow,
        rowIndex: number,
        rowOptions: TableRowOption[],
        rowOptionsColor: string,
        rowOptionsItemColor: string,
        size: UtilConst.Sizes,
        isRowHovered: CoreObservable.App<boolean>,
        directionRtl: boolean,
    ): CoreReactive.App {
        const panelBackground = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        const panelColor = rowOptionsColor || UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1);
        const optionBackground = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_3);
        const optionHoverBackground = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_2);
        const optionColor = rowOptionsItemColor || UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1);
        const panelStyles = CoreObservable.App.computed(
            (hovered: boolean, rtl: boolean, currentSize: UtilConst.Sizes) => ({
                position: "absolute",
                top: "50%",
                left: rtl ? "100%" : "auto",
                right: rtl ? "auto" : "100%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                gap: "var(--marginSmall)",
                padding: UtilStyle.Css_Padding(currentSize),
                borderRadius: UtilStyle.Css_BorderRadius(currentSize),
                backgroundColor: panelBackground,
                color: panelColor,
                opacity: hovered ? "1" : "0.45",
                transition: "opacity 180ms ease-in-out",
                whiteSpace: "nowrap",
                zIndex: "4",
            }),
            [isRowHovered, directionRtl, size],
            this.getScope(),
        );
        const arrowStyles = CoreObservable.App.computed(
            (hovered: boolean) => ({
                display: hovered ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                width: UtilStyle.Css_Height(size),
                height: UtilStyle.Css_Height(size),
                color: optionColor,
            }),
            [isRowHovered],
            this.getScope(),
        );
        const optionListStyles = CoreObservable.App.computed(
            (hovered: boolean) => ({
                display: hovered ? "flex" : "none",
                alignItems: "center",
                gap: "var(--marginSmall)",
                width: "max-content",
            }),
            [isRowHovered],
            this.getScope(),
        );

        const optionElements = rowOptions.map((opt) => {
            const isOptionHovered = new CoreObservable.App(false);
            const optionStyles = CoreObservable.App.computed(
                (hovered: boolean, currentSize: UtilConst.Sizes) => ({
                    width: `calc(${UtilStyle.Css_Height(currentSize)} + ${UtilStyle.Css_Padding(currentSize)} + ${UtilStyle.Css_Padding(currentSize)})`,
                    height: `calc(${UtilStyle.Css_Height(currentSize)} + ${UtilStyle.Css_Padding(currentSize)} + ${UtilStyle.Css_Padding(currentSize)})`,
                    flex: "0 0 auto",
                    padding: UtilStyle.Css_Padding(currentSize),
                    borderRadius: UtilStyle.Css_BorderRadius(currentSize),
                    boxSizing: "border-box",
                    backgroundColor: hovered ? optionHoverBackground : optionBackground,
                    color: optionColor,
                    transition: "background-color 180ms ease-in-out, color 180ms ease-in-out",
                }),
                [isOptionHovered, size],
                this.getScope(),
            );
            if ("valueKey" in opt) {
                const value = itemBody?.[opt.valueKey];
                const icon = opt.icon
                    ? UiIcons.CreateIcon(opt.icon, {size, primaryColor: optionColor as any})
                    : null;
                return CoreReactive.App.span({
                    className: ["cursor-pointer", "d-inline-flex", "align-items-center", "justify-content-center"],
                    attrs: {title: opt.title, "aria-label": opt.title, role: "button", tabindex: "0"},
                    stylesBind: optionStyles as any,
                    on: {
                        mouseenter: () => isOptionHovered.set(true),
                        mouseleave: () => isOptionHovered.set(false),
                        click: (event: Event) => this.fn_onClickActionOption(event, opt, itemBody, rowIndex, value),
                        keydown: (event: KeyboardEvent) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                this.fn_onClickActionOption(event, opt, itemBody, rowIndex, value);
                            }
                        },
                    },
                    children: [icon ?? opt.title],
                });
            }

            const iconHtml = typeof opt.html === "function" ? (opt.html as any)(size, optionColor) : opt.html;
            return CoreReactive.App.span({
                className: ["cursor-pointer", "d-inline-flex", "align-items-center", "justify-content-center"],
                attrs: {...opt.attrs},
                stylesBind: optionStyles as any,
                on: {
                    mouseenter: () => isOptionHovered.set(true),
                    mouseleave: () => isOptionHovered.set(false),
                    click: (event: Event) => {
                        this.fn_onclickOptionCard(event, opt.attrs.name ?? opt.attrs.id, opt.attrs.id);
                    },
                },
                children: [iconHtml],
            });
        });
        return CoreReactive.App.part("td", {
            className: ["p-0", "text-center", "position-relative"],
            styles: {width: "0", padding: "0", border: "0", zIndex: "4"},
            children: [
                CoreReactive.App.span({
                    className: ["d-inline-flex", "align-items-center"],
                    stylesBind: panelStyles as any,
                    children: [
                        CoreReactive.App.span({
                            className: ["align-items-center", "justify-content-center"],
                            stylesBind: arrowStyles as any,
                            children: [CoreObservable.App.computed(
                                (rtl: boolean) => UiIcons.CreateIcon(
                                    rtl ? UiIcons.Src.ArrowRight.Definition : UiIcons.Src.ArrowLeft.Definition,
                                    {size, primaryColor: optionColor as any},
                                ),
                                [directionRtl],
                                this.getScope(),
                            ) as any],
                        }),
                        CoreReactive.App.span({
                            className: ["align-items-center"],
                            stylesBind: optionListStyles as any,
                            children: optionElements,
                        }),
                    ],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       METHOD: on select col callback
    --------------------------------------------- */
    private fn_onSelectCol(event: Event, key: string, colIndex: number, rowIndex: number, value: string) {
        this.set("prop_valueRow", rowIndex);
        this.set("prop_valueCol", colIndex);
        this.executeMethod("SELECT_COL", event, { key, colIndex, rowIndex, value });
    }


    /* ---------------------------------------------
       METHOD: on click option card
    --------------------------------------------- */
    private fn_onclickOptionCard(event: Event, optionName: string, optionId: string) {
        this.executeMethod("CLICK_OPTION_CARD", event, { optionName, optionId });
    }

    private fn_onClickActionOption(
        event: Event,
        option: Extract<TableRowOption, {valueKey: string}>,
        row: TableDataRow,
        rowIndex: number,
        value: unknown,
    ) {
        this.executeMethod("CLICK_OPTION_CARD", event, {
            optionName: option.action,
            optionId: value == null ? "" : String(value),
            rowIndex,
            row,
            option,
            value,
        });
    }


    /* ---------------------------------------------
       renderTableHeaderColSelector â€” Ø±Ù†Ø¯Ø± Part TABLE_HEADER_COL_SELECTOR
       Composition Ø¨Ø§ ComponentInputListSelector Ø¨Ø±Ø§ÛŒ Ø§Ù†ØªØ®Ø§Ø¨/Ù…Ø±ØªØ¨â€ŒØ³Ø§Ø²ÛŒ Ø³ØªÙˆÙ†â€ŒÙ‡Ø§
    --------------------------------------------- */
    protected renderTableHeaderColSelector(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_hasColSelector = data?.["prop_hasColSelector"] ?? bind.prop_hasColSelector;
        const prop_doColSelector  = data?.["prop_doColSelector"]  ?? bind.prop_doColSelector;
        const prop_header         = data?.["prop_header"]         ?? bind.prop_header;
        const prop_order          = data?.["prop_order"]          ?? bind.prop_order;
        const prop_backgroundColorIconColumnSelector = data?.["prop_backgroundColorIconColumnSelector"] ?? bind.prop_backgroundColorIconColumnSelector;
        const prop_colorIconColumnSelector = data?.["prop_colorIconColumnSelector"] ?? bind.prop_colorIconColumnSelector;

        return CoreObservable.App.conditionWhen(
            [prop_hasColSelector, prop_order, prop_header, prop_backgroundColorIconColumnSelector, prop_colorIconColumnSelector],
            (hasColSelector) => hasColSelector === true,
            () => {
                const columnsArr = CoreObservable.App.computed(
                    (order: string[], header: TableHeaderItem[]) => this.fn_onGetColumnsSelector(order, header),
                    [prop_order, prop_header],
                    this.getScope(),
                );

                const listSelector = new ComponentInputListSelector(
                    {
                        classList: [],
                        styles: {},
                        prop_columns: columnsArr as any,
                        prop_showListSelected: false,
                        prop_icon: UiIcons.Src.InputSelectColumn.Definition as any,
                        prop_inputBackgroundColor: null,
                        prop_backgroundColorIcon: prop_backgroundColorIconColumnSelector,
                        prop_colorIcon: prop_colorIconColumnSelector,
                    } as any,
                    {
                        CLICK_ICON: (event: Event, dataArgs: any, componentArgs: any) => {},
                        CLICK_ACCEPT: (event: Event, dataArgs: any, componentArgs: any) => {
                            const cols = (componentArgs as any)?.COLUMNS as ColumnItem[] | undefined;
                            const newOrder = cols
                                ? cols.filter((c: ColumnItem) => c.selected).map((c: ColumnItem) => c.id as string)
                                : [];
                            const doColSelector = (prop_doColSelector as any)?.get?.() ?? prop_doColSelector;
                            if (doColSelector) {
                                this.set("prop_order", [...newOrder]);
                            }
                            this.fn_onCallbackColSelector(null, newOrder, true);
                        },
                        CLICK_REJECT: (event: Event, dataArgs: any, componentArgs: any) => {},
                        CALLBACK_COL_SELECTOR: (event: Event, dataArgs: any, componentArgs: any) => {},
                        DELETE_SELECTED_ITEM: (event: Event, dataArgs: any, componentArgs: any) => {},
                    } as any,
                );

                return listSelector.getReactiveElement();
            },
            () => {
                return this.renderEmptyContent(attrsDefault);
            },
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       HELPER: Get columns selector items
       ØªØ¨Ø¯ÛŒÙ„ prop_header + prop_order Ø¨Ù‡ ColumnItem[]
    --------------------------------------------- */
    private fn_onGetColumnsSelector(order: string[], header: TableHeaderItem[]): ColumnItem[] {
        if (!header) return [];
        const orderSet = new Set(order || []);
        return header.map(h => ({
            id:       h.id,
            title:    h.content ?? h.id,
            selected: orderSet.size === 0 || orderSet.has(h.id),
        }));
    }


    /* ---------------------------------------------
       METHOD: on callback col selector
    --------------------------------------------- */
    private fn_onCallbackColSelector(event: Event | null, order: string[], isComplete: boolean) {
        this.executeMethod("CALLBACK_COL_SELECTOR", event as Event, { order, isComplete });
    }

}
