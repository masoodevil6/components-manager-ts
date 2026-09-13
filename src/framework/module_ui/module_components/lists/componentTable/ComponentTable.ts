import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
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
import * as UiCategory  from "@/ui_categories";
import * as UiIcons     from "@/ui_icons";


/**
 * ComponentTable — کلاس نهایی
 *
 * معماری Composition:
 *   ComponentTable HAS-A ComponentStructure (نه IS-A)
 *   ComponentStructure در renderContentComponent ساخته می‌شود
 *   و content آن = renderTable (محتوای اختصاصی ComponentTable)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (SELECT_COL, CLICK_OPTION_CARD)
 *   identity — { unique?, emit?, events? }
 */
export class ComponentTable extends ComponentTableBase {

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
       renderTable — رندر Part TABLE اصلی
    --------------------------------------------- */
    protected renderTable(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_tableClass      = data?.["prop_tableClass"]      ?? bind.prop_tableClass;
        const prop_tableStyles     = data?.["prop_tableStyles"]     ?? bind.prop_tableStyles;
        const prop_tableBordered   = data?.["prop_tableBordered"]   ?? bind.prop_tableBordered;
        const prop_tableStriped    = data?.["prop_tableStriped"]    ?? bind.prop_tableStriped;
        const prop_tableHover      = data?.["prop_tableHover"]      ?? bind.prop_tableHover;
        const prop_tableBorderless = data?.["prop_tableBorderless"] ?? bind.prop_tableBorderless;

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
            stylesBind: prop_tableStyles,
            children: [
                this.executeSchemaPart(Schemas.TABLE_HEADER.part, {}),
                this.executeSchemaPart(Schemas.TABLE_BODY.part, {}),
            ],
        });
    }


    /* ---------------------------------------------
       renderTableHeader — رندر Part TABLE_HEADER
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
        const prop_headerIconSize     = data?.["prop_headerIconSize"]     ?? bind.prop_headerIconSize;
        const prop_headerIconColor    = data?.["prop_headerIconColor"]    ?? bind.prop_headerIconColor;

        const headerCells = CoreObservable.App.computed(
            (order, header, hasColNumber, hasColSelector, itemHeadClass, iconSize, iconColor) => {
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
                    const iconHtml = icon != null ? (typeof icon === "function" ? icon(iconSize, iconColor) : icon) : null;
                    cells.push(CoreReactive.App.part("th", {
                        className: ["p-0", "text-center", "position-relative", ...(itemHeadClass || [])],
                        attrs: { scope: "col" },
                        styles: itemHeader.width != null ? { width: `${itemHeader.width}%` } : {},
                        children: [
                            itemHeader.content ?? "#",
                            iconHtml != null ? CoreReactive.App.span({ className: ["position-absolute"], children: [iconHtml] }) : null,
                        ],
                    }));
                }
                return cells;
            },
            [prop_order, prop_header, prop_hasColNumber, prop_hasColSelector, prop_tableItemHeadClass, prop_headerIconSize, prop_headerIconColor],
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
       renderTableBody — رندر Part TABLE_BODY
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
        const prop_hasColNumber       = data?.["prop_hasColNumber"]       ?? bind.prop_hasColNumber;
        const prop_rowOptions         = data?.["prop_rowOptions"]         ?? bind.prop_rowOptions;
        const prop_rowOptionsColor    = data?.["prop_rowOptionsColor"]    ?? bind.prop_rowOptionsColor;
        const prop_rowOptionsItemColor = data?.["prop_rowOptionsItemColor"] ?? bind.prop_rowOptionsItemColor;

        const bodyRows = CoreObservable.App.computed(
            (order, header, tableData, valueType, valueRow, valueCol, itemBodyClass, hasColNumber, rowOptions, rowOptionsColor, rowOptionsItemColor) => {
                if (!header || !Array.isArray(header)) return [];
                const orderedHeader = this.fn_getOrderedHeader(order, header);
                if (!tableData || !Array.isArray(tableData)) return [];
                const rows: any[] = [];
                for (let bodyIndex = 0; bodyIndex < tableData.length; bodyIndex++) {
                    const itemBody = tableData[bodyIndex];
                    const isRowSelected = valueRow === bodyIndex && (valueType === TableSelectedType.ROW || valueType === TableSelectedType.BOTH);
                    const cells: any[] = [];
                    if (hasColNumber) {
                        cells.push(CoreReactive.App.part("td", {
                            className: ["p-0", "text-center"],
                            children: [
                                CoreReactive.App.span({
                                    className: ["p-0", "text-center", ...(itemBodyClass || [])],
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
                            const content = typeof rawValue === "string" ? rawValue : (rawValue as any)?.content ?? "";
                            const isColSelected = valueRow === bodyIndex && valueCol === headerIndex && (valueType === TableSelectedType.COL || valueType === TableSelectedType.BOTH);
                            cells.push(CoreReactive.App.part("td", {
                                className: ["p-0", "text-center"],
                                children: [
                                    CoreReactive.App.span({
                                        className: ["p-0", "text-center", ...(itemBodyClass || []), isColSelected ? "selected_table_col" : ""],
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
                        if (hasColNumber && rowOptions && rowOptions.length > 0) {
                            cells.push(this.fn_renderRowOptions(itemBody, rowOptions, rowOptionsColor, rowOptionsItemColor));
                        }
                        rows.push(CoreReactive.App.part("tr", {
                            className: ["position-relative", isRowSelected ? "selected_table_row" : ""],
                            children: cells,
                        }));
                    }
                }
                return rows;
            },
            [prop_order, prop_header, prop_data, prop_valueType, prop_valueRow, prop_valueCol, prop_tableItemBodyClass, prop_hasColNumber, prop_rowOptions, prop_rowOptionsColor, prop_rowOptionsItemColor],
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
        rowOptions: TableRowOption[],
        rowOptionsColor: string,
        rowOptionsItemColor: string,
    ): CoreReactive.App {
        const optionElements = rowOptions.map(opt => {
            const iconHtml = typeof opt.html === "function" ? (opt.html as any)("M", rowOptionsItemColor) : opt.html;
            return CoreReactive.App.span({
                className: ["p-1", "cursor-pointer", "d-inline-block"],
                attrs: { ...opt.attrs },
                on: {
                    click: (event: Event) => {
                        this.fn_onclickOptionCard(event, opt.attrs.name ?? opt.attrs.id, opt.attrs.id);
                    },
                },
                children: [iconHtml],
            });
        });
        return CoreReactive.App.part("td", {
            className: ["p-0", "text-center", "position-relative"],
            styles: { color: rowOptionsColor || undefined },
            children: optionElements,
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


    /* ---------------------------------------------
       renderTableHeaderColSelector — رندر Part TABLE_HEADER_COL_SELECTOR
       Composition با ComponentInputListSelector برای انتخاب/مرتب‌سازی ستون‌ها
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

        return CoreObservable.App.conditionWhen(
            [prop_hasColSelector, prop_order, prop_header],
            (hasColSelector) => hasColSelector === true,
            () => {
                const columnsArr = CoreObservable.App.computed(
                    (order: string[], header: TableHeaderItem[]) => this.fn_onGetColumnsSelector(order, header),
                    [prop_order, prop_header],
                    this.getScope(),
                );

                const listSelector = UiCategory.UI.Inputs.InputListSelector(
                    {
                        classList: [],
                        styles: {},
                        prop_columns: columnsArr as any,
                        prop_showListSelected: false,
                        prop_icon: UiIcons.Src.InputSelectColumn.Definition as any,
                        prop_inputBackgroundColor: null,
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
       تبدیل prop_header + prop_order به ColumnItem[]
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
