import * as CoreEvent from "@/core_event";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentTableResponsibleBase} from "./ComponentTableResponsibleBase";
import {PropsConfigType, TableResponsibleHeaderItem, TableResponsibleRowOption, TableResponsibleViewMode} from "./Props";
import {MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createTableResponsibleStep} from "./Step";
import * as ComponentTable from "../componentTable/runtime";
import * as ComponentCardRowInfo from "../componentCardRowInfo/runtime";
import * as ComponentRecyclerView from "../componentRecyclerView/runtime";
import type {CardRowInfoRow} from "../componentCardRowInfo/Props";
import type {MenuMoreItem} from "../componentMenuMore/Props";
import type {TableDataRow, TableHeaderItem} from "../componentTable/Props";

type ActiveViewMode = TableResponsibleViewMode.TABLE | TableResponsibleViewMode.CARDS;
type CardContext = {row: TableDataRow; rowIndex: number; options: TableResponsibleRowOption[]};

/** Recycler specialization that reconciles reactive component rows with its workflow children. */
class WorkflowManagedRecyclerView extends ComponentRecyclerView.Component {
    protected override renderComponents(
        attrsDefault?: PartAttrDefault,
        data?: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        const source = data?.prop_formComponents ?? this._COMPONENT_PROPS_BIND.prop_formComponents;
        const managedComponents = CoreObservable.App.computed(
            (items: any[]) => {
                const activeNames = this.beginWorkflowChildComposition();
                try {
                    return (Array.isArray(items) ? items : []).map((item) =>
                        item && typeof item.getComponentWorkflow === "function"
                            ? this.renderWorkflowChild(item)
                            : item,
                    );
                } finally {
                    this.endWorkflowChildComposition(activeNames);
                }
            },
            [source],
            this.getScope(),
        );
        return super.renderComponents(attrsDefault, {...data, prop_formComponents: managedComponents}, extra);
    }
}

export class ComponentTableResponsible extends ComponentTableResponsibleBase<ReturnType<typeof createTableResponsibleStep>> {
    private _TABLE: ComponentTable.Component | null = null;
    private _RECYCLER_VIEW: ComponentRecyclerView.Component | null = null;
    private _CARD_COMPONENTS = new Map<string, ComponentCardRowInfo.Component>();
    private _CARD_CONTEXTS = new Map<string, CardContext>();
    private _CARD_COMPONENTS_BIND: CoreObservable.App<any[]> | null = null;
    private _CARD_BORDER_STYLES: CoreObservable.App<Record<string, string>> | null = null;
    private _LAST_ACTIVE_MODE: ActiveViewMode | null = null;
    private readonly _VIEWPORT_WIDTH = new CoreObservable.App<number>(1024);
    private readonly _RESIZE_HANDLER = () => {
        if (typeof window !== "undefined") this._VIEWPORT_WIDTH.set(window.innerWidth);
    };

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentTableResponsible>,
        identity?: {unique?: CoreEvent.TStepRef | null; emit?: CoreEvent.TEmitHandler | null; events?: Record<string, any> | null},
    ) {
        super(createTableResponsibleStep(), identity);
        if (typeof window !== "undefined") {
            this._VIEWPORT_WIDTH.set(window.innerWidth);
            window.addEventListener("resize", this._RESIZE_HANDLER, {passive: true});
        }
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (typeof window !== "undefined") window.removeEventListener("resize", this._RESIZE_HANDLER);
        this.clearWorkflowChildSlot("table");
        this.clearWorkflowChildSlot("cards");
        this.disposeCardComponents();
        this._TABLE = null;
        this._RECYCLER_VIEW = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CONTENT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        if (partName === ComponentStructureTrait.schemas.COMPONENT.part) {
            return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
        }
        if (partName === ComponentStructureTrait.schemas.STRUCTURE.part) {
            return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
        }
        if (partName === Schemas.CONTENT.part) return this.renderContent(attrsDefault, data);
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }

    private renderContent(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const viewMode = data.prop_viewMode ?? bind.prop_viewMode;
        const mobileBreakpoint = data.prop_mobileBreakpoint ?? bind.prop_mobileBreakpoint;
        const activeMode = CoreObservable.App.computed(
            (mode: TableResponsibleViewMode, breakpoint: number | null, viewportWidth: number) => {
                if (mode === TableResponsibleViewMode.TABLE || mode === TableResponsibleViewMode.CARDS) return mode;
                const minTableWidth = Number.isFinite(breakpoint) && Number(breakpoint) > 0 ? Number(breakpoint) : 768;
                return viewportWidth >= minTableWidth ? TableResponsibleViewMode.TABLE : TableResponsibleViewMode.CARDS;
            },
            [viewMode, mobileBreakpoint, this._VIEWPORT_WIDTH],
            this.getScope(),
        );
        const view = CoreObservable.App.conditionWhen(
            [activeMode],
            (mode: ActiveViewMode) => mode === TableResponsibleViewMode.TABLE,
            () => this.renderTableView(),
            () => this.renderCardView(),
            this.getScope(),
        ) as any;

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [data.prop_formClass ?? bind.prop_formClass],
            stylesBind: data.prop_formStyles ?? bind.prop_formStyles,
            children: [view],
        });
    }

    private renderTableView(): CoreReactive.App {
        this.activateView(TableResponsibleViewMode.TABLE);
        this.clearWorkflowChildSlot("cards");
        this._RECYCLER_VIEW = null;
        this.disposeCardComponents();

        if (!this._TABLE) {
            const bind = this._COMPONENT_PROPS_BIND;
            this._TABLE = new ComponentTable.Component({
                prop_workflowChildName: "table",
                prop_size: bind.prop_size,
                prop_order: bind.prop_order,
                prop_header: CoreObservable.App.computed(
                    (header: TableResponsibleHeaderItem[]): TableHeaderItem[] => (Array.isArray(header) ? header : []).map((item) => ({
                        id: item.id,
                        content: item.content,
                        icon: item.icon ?? undefined,
                        width: item.width,
                    })),
                    [bind.prop_header],
                    this.getScope(),
                ) as any,
                prop_data: bind.prop_data,
                prop_hasColSelector: bind.prop_doColSelector,
                prop_doColSelector: bind.prop_doColSelector,
                prop_headerIconSize: bind.prop_headerIconSize,
                prop_backgroundColorIconColumnSelector: bind.prop_columnSelectorBackgroundColor,
                prop_colorIconColumnSelector: bind.prop_columnSelectorColor,
                prop_rowOptions: bind.prop_rowOptions,
                prop_tableItemHeadStyles: this.createHeaderStyles(),
                prop_tableItemBodyStyles: this.createBodyStyles(),
                prop_tableItemBodyHoverStyles: this.createHoverStyles(),
            } as any, {
                CLICK_OPTION_CARD: (event: Event, args: any) => this.handleTableOption(event, args),
                CALLBACK_COL_SELECTOR: (event: Event, args: any) => this.handleColumnSelector(event, args),
            } as any);
        }
        return this.renderWorkflowSlot(this._TABLE, "table") as any;
    }

    private renderCardView(): CoreReactive.App {
        this.activateView(TableResponsibleViewMode.CARDS);
        this.clearWorkflowChildSlot("table");
        this._TABLE = null;

        if (!this._RECYCLER_VIEW) {
            const bind = this._COMPONENT_PROPS_BIND;
            this._CARD_BORDER_STYLES = CoreObservable.App.computed(
                (size: UtilConst.Sizes) => ({
                    display: "flow-root",
                    minWidth: "0",
                    paddingLeft: UtilStyle.Css_Padding(size),
                    paddingRight: UtilStyle.Css_Padding(size),
                    paddingBottom: UtilStyle.Css_Padding(size),
                }),
                [bind.prop_size],
                this.getScope(),
            );
            this._CARD_COMPONENTS_BIND = CoreObservable.App.computed(
                (header: TableResponsibleHeaderItem[], order: string[], rows: TableDataRow[], rowKey: string | null,
                    options: TableResponsibleRowOption[], iconColor: string, iconSize: number) =>
                    this.buildCards(header, order, rows, rowKey, options, iconColor, iconSize),
                [bind.prop_header, bind.prop_order, bind.prop_data, bind.prop_rowKey, bind.prop_rowOptions, bind.prop_cardIconColor, bind.prop_headerIconSize],
                this.getScope(),
            );
            this._RECYCLER_VIEW = new WorkflowManagedRecyclerView({
                prop_workflowChildName: "cards",
                prop_formComponents: this._CARD_COMPONENTS_BIND,
                prop_formDirection: "vertical",
                prop_formClass: bind.prop_formClass,
                prop_formStyles: CoreObservable.App.computed(
                    (styles: Record<string, string>, size: UtilConst.Sizes) => ({
                        display: "flex",
                        flexDirection: "column",
                        gap: UtilStyle.Css_Margin(size),
                        minWidth: "0",
                        ...(styles ?? {}),
                    }),
                    [bind.prop_formStyles, bind.prop_size],
                    this.getScope(),
                ) as any,
            } as any);
        }
        return this.renderWorkflowSlot(this._RECYCLER_VIEW, "cards") as any;
    }

    private buildCards(
        header: TableResponsibleHeaderItem[],
        order: string[],
        rows: TableDataRow[],
        rowKey: string | null,
        options: TableResponsibleRowOption[],
        iconColor: string,
        iconSize: number,
    ): ComponentCardRowInfo.Component[] {
        const orderedHeader = this.getOrderedHeader(order, header);
        const seenNames = new Map<string, number>();
        const activeNames = new Set<string>();
        const cards: ComponentCardRowInfo.Component[] = [];

        (Array.isArray(rows) ? rows : []).forEach((row, rowIndex) => {
            const keyValue = rowKey && row[rowKey] != null ? String(row[rowKey]) : `index-${rowIndex}`;
            const duplicateCount = seenNames.get(keyValue) ?? 0;
            seenNames.set(keyValue, duplicateCount + 1);
            const childName = `row-${encodeURIComponent(keyValue)}${duplicateCount ? `-${duplicateCount + 1}` : ""}`;
            activeNames.add(childName);

            const cardRows: CardRowInfoRow[] = orderedHeader
                .filter((item) => item.inCards === true && Object.prototype.hasOwnProperty.call(row, item.id))
                .map((item) => ({
                    id: item.id,
                    icon: item.icon ?? null,
                    iconColor: iconColor || null,
                    iconSize,
                    title: item.content ?? item.id,
                    content: String(this.unwrapCellValue(row[item.id])),
                }));
            this._CARD_CONTEXTS.set(childName, {row, rowIndex, options: Array.isArray(options) ? options : []});

            let card = this._CARD_COMPONENTS.get(childName);
            if (!card) {
                card = new ComponentCardRowInfo.Component({
                    prop_workflowChildName: childName,
                    prop_rows: cardRows,
                    prop_options: this.toMenuItems(options, row),
                    prop_borderStyles: this._CARD_BORDER_STYLES,
                } as any, {
                    SELECT_OPTION: (event: Event, args: any) => this.handleCardOption(childName, event, args?.ITEM),
                } as any);
                this._CARD_COMPONENTS.set(childName, card);
            } else {
                card.set("prop_rows", cardRows as any);
                card.set("prop_options", this.toMenuItems(options, row) as any);
                card.set("prop_borderStyles", this._CARD_BORDER_STYLES as any);
            }
            cards.push(card);
        });

        for (const name of this._CARD_CONTEXTS.keys()) {
            if (!activeNames.has(name)) this._CARD_CONTEXTS.delete(name);
        }
        for (const name of this._CARD_COMPONENTS.keys()) {
            if (!activeNames.has(name)) this._CARD_COMPONENTS.delete(name);
        }
        return cards;
    }

    private getOrderedHeader(order: string[], header: TableResponsibleHeaderItem[]): TableResponsibleHeaderItem[] {
        const validHeader = Array.isArray(header) ? header : [];
        if (!Array.isArray(order) || order.length === 0) return validHeader;
        const lookup = new Map(validHeader.map((item) => [item.id, item]));
        return order.map((id) => lookup.get(id)).filter((item): item is TableResponsibleHeaderItem => !!item);
    }

    private unwrapCellValue(value: TableDataRow[string]): string | number {
        const cell = value && typeof value === "object" ? value.content : value;
        if (cell == null) return "";
        return typeof cell === "number" ? cell : String(cell);
    }

    private toMenuItems(options: TableResponsibleRowOption[], row: TableDataRow): MenuMoreItem[] {
        return (Array.isArray(options) ? options : []).map((option) => ({
            id: Object.prototype.hasOwnProperty.call(row, option.valueKey)
                ? String(this.unwrapCellValue(row[option.valueKey]))
                : "",
            title: option.title,
            ariaLabel: option.title,
            icon: option.icon ?? null,
            action: option.action,
        }));
    }

    private handleTableOption(event: Event, args: any): void {
        if (!args?.row || !args?.option?.valueKey) return;
        const hasValue = Object.prototype.hasOwnProperty.call(args.row, args.option.valueKey);
        this.executeMethod("CLICK_ROW_OPTION", event, {
            rowIndex: args.rowIndex,
            row: args.row,
            option: args.option,
            value: hasValue ? this.unwrapCellValue(args.row[args.option.valueKey]) : undefined,
        });
    }

    private handleCardOption(childName: string, event: Event, selectedItem: MenuMoreItem | undefined): void {
        if (!selectedItem) return;
        const context = this._CARD_CONTEXTS.get(childName);
        if (!context) return;
        const option = context.options.find((item) => item.action === selectedItem.action
            && Object.prototype.hasOwnProperty.call(context.row, item.valueKey)
            && String(this.unwrapCellValue(context.row[item.valueKey])) === selectedItem.id);
        if (!option) return;
        const hasValue = Object.prototype.hasOwnProperty.call(context.row, option.valueKey);
        this.executeMethod("CLICK_ROW_OPTION", event, {
            rowIndex: context.rowIndex,
            row: context.row,
            option,
            value: hasValue ? this.unwrapCellValue(context.row[option.valueKey]) : undefined,
        });
    }

    private handleColumnSelector(event: Event, args: any): void {
        const order = Array.isArray(args?.order) ? [...args.order] : [];
        this.set("prop_order", order as any);
        this.executeMethod("CALLBACK_COL_SELECTOR", event, {
            order,
            isComplete: args?.isComplete === true,
        });
    }

    private activateView(mode: ActiveViewMode): void {
        if (this._LAST_ACTIVE_MODE === mode) return;
        this._LAST_ACTIVE_MODE = mode;
        const event = typeof Event !== "undefined" ? new Event("change") : null;
        this.executeMethod("CHANGE_VIEW_MODE", event as any, {viewMode: mode});
    }

    private disposeCardComponents(): void {
        for (const card of this._CARD_COMPONENTS.values()) card.dispose();
        this._CARD_COMPONENTS.clear();
        this._CARD_CONTEXTS.clear();
        this._CARD_COMPONENTS_BIND = null;
        this._CARD_BORDER_STYLES = null;
    }

    private createHeaderStyles(): CoreObservable.App<Record<string, string>> {
        const bind = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.computed(
            (background: string, color: string) => ({
                ...(background ? {backgroundColor: background} : {}),
                ...(color ? {color} : {}),
                padding: `${UtilStyle.Css_Padding(UtilConst.Sizes.XL)} 0`,
                borderRadius: UtilStyle.Css_BorderRadius(UtilConst.Sizes.XL),
                borderWidth: UtilStyle.Css_BorderWidth(UtilConst.Sizes.M),
                borderStyle: "solid",
                borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            }),
            [bind.prop_headerBackgroundColor, bind.prop_headerColor],
            this.getScope(),
        );
    }

    private createBodyStyles(): CoreObservable.App<Record<string, string>> {
        const bind = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.computed(
            (background: string, color: string) => ({
                display: "block",
                width: "100%",
                minHeight: UtilStyle.Css_Height(UtilConst.Sizes.XXL),
                borderRadius: UtilStyle.Css_BorderRadius(UtilConst.Sizes.XL),
                borderWidth: UtilStyle.Css_BorderWidth(UtilConst.Sizes.M),
                borderStyle: "solid",
                borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                ...(background ? {backgroundColor: background} : {}),
                ...(color ? {color} : {}),
            }),
            [bind.prop_bodyBackgroundColor, bind.prop_bodyColor],
            this.getScope(),
        );
    }

    private createHoverStyles(): CoreObservable.App<Record<string, string>> {
        const bind = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.computed(
            (background: string, color: string) => ({
                ...(background ? {backgroundColor: background} : {}),
                ...(color ? {color} : {}),
            }),
            [bind.prop_bodyHoverBackgroundColor, bind.prop_bodyHoverColor],
            this.getScope(),
        );
    }
}
