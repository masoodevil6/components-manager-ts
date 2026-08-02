import {
    ComponentBase,
    defineComponentMethods,
    defineComponentPatterns,
    defineComponentSchema,
    defineComponentTemplate,
    GOG_ExtractName,
    GOG_ExtractNameValue,
    GOG_SetValue,
    ComponentCallBackType,
} from "../../core/ComponentBase";
import {ReactiveElement} from "../../core/ReactiveElement";
import {Language} from "../../core/Language";
import {Observable} from "../../core/Observable";
import {SIZES, SizesType} from "../../utils/ToolsConsts";
import {
    GOG_ComponentBasicConfigs_Component_keys,
    GOG_ComponentBasicConfigs_Component_parts,
    GOG_ComponentBasicConfigs_Component_Pattern,
    GOG_ComponentBasicConfigs_Component_Schema,
    GOG_ComponentBasicConfigs_Component_Structure_keys,
    GOG_ComponentBasicConfigs_Component_Structure_parts,
    GOG_ComponentBasicConfigs_Component_Structure_Pattern,
    GOG_ComponentBasicConfigs_Component_Structure_Schema,
    GOG_ComponentBasicConfigs_partDoseNotBody,
    GOG_ComponentBasicProps_Component,
    GOG_ComponentBasicProps_Component_Structure,
} from "../../core/component/SetupComponent";
import {ComponentAttrsDefault} from "../../core/component/ConnectorComponent";
import {
    ComponentInputListSelector,
    ComponentInputListSelectorPropsType,
    ComponentInputListSelectorMethodsType,
    ColumnItem,
} from "./ComponentInputListSelector";

// PROPS
export const ComponentTableProps = {
    ...GOG_ComponentBasicProps_Component,
    ...GOG_ComponentBasicProps_Component_Structure,
    prop_size: "prop_size", prop_hasColNumber: "prop_hasColNumber",
    prop_hasColSelector: "prop_hasColSelector", prop_doColSelector: "prop_doColSelector",
    prop_tableClass: "prop_tableClass", prop_tableStyles: "prop_tableStyles",
    prop_tableType: "prop_tableType", prop_tableBordered: "prop_tableBordered",
    prop_tableStriped: "prop_tableStriped", prop_tableHover: "prop_tableHover",
    prop_tableBorderless: "prop_tableBorderless",
    prop_tableHeadClass: "prop_tableHeadClass", prop_tableHeadStyles: "prop_tableHeadStyles",
    prop_tableItemHeadClass: "prop_tableItemHeadClass", prop_tableItemHeadStyles: "prop_tableItemHeadStyles",
    prop_order: "prop_order", prop_header: "prop_header",
    prop_headerIconSize: "prop_headerIconSize", prop_headerIconBackgroundColor: "prop_headerIconBackgroundColor",
    prop_headerIconBorderColor: "prop_headerIconBorderColor", prop_headerIconColor: "prop_headerIconColor",
    prop_tableBodyClass: "prop_tableBodyClass", prop_tableBodyStyles: "prop_tableBodyStyles",
    prop_tableItemBodyClass: "prop_tableItemBodyClass", prop_tableItemBodyStyles: "prop_tableItemBodyStyles",
    prop_tableItemBodyHoverStyles: "prop_tableItemBodyHoverStyles",
    prop_data: "prop_data", prop_valueType: "prop_valueType",
    prop_valueRow: "prop_valueRow", prop_valueCol: "prop_valueCol",
    prop_valueRow_backgroundColor: "prop_valueRow_backgroundColor",
    prop_valueCol_backgroundColor: "prop_valueCol_backgroundColor",
    prop_valueCol_textColor: "prop_valueCol_textColor",
    prop_rowOptions: "prop_rowOptions", prop_rowOptionsBackgroundColor: "prop_rowOptionsBackgroundColor",
    prop_rowOptionsColor: "prop_rowOptionsColor", prop_rowOptionsItemBackgroundColor: "prop_rowOptionsItemBackgroundColor",
    prop_rowOptionsItemColor: "prop_rowOptionsItemColor",
    prop_rowOptionsItemHoverBackgroundColor: "prop_rowOptionsItemHoverBackgroundColor",
    prop_rowOptionsItemHoverColor: "prop_rowOptionsItemHoverColor",
    prop_rowOptionsOpacity: "prop_rowOptionsOpacity",
    prop_backgroundColorIconColumnSelector: "prop_backgroundColorIconColumnSelector",
    prop_colorIconColumnSelector: "prop_colorIconColumnSelector",
} as const;

// TYPES
export type TableHeaderItem = { id: string; content?: string; icon?: string | ((size: number, color?: string) => string); width?: number };
export type TableDataRow = Record<string, string | { content: string }>;
export type TableRowOption = { html: string | ((size: SizesType, color?: string) => string); attrs: { id: string; name?: string; title?: string } };

// CONFIGS
const ComponentTableConfigs = {
    keys: {
        ...GOG_ComponentBasicConfigs_Component_keys,
        ...GOG_ComponentBasicConfigs_Component_Structure_keys,
        [ComponentTableProps.prop_size]: { name: ComponentTableProps.prop_size, value: GOG_SetValue<SizesType>(SIZES.M) },
        [ComponentTableProps.prop_hasColNumber]: { name: ComponentTableProps.prop_hasColNumber, value: GOG_SetValue<boolean>(true) },
        [ComponentTableProps.prop_hasColSelector]: { name: ComponentTableProps.prop_hasColSelector, value: GOG_SetValue<boolean>(true) },
        [ComponentTableProps.prop_doColSelector]: { name: ComponentTableProps.prop_doColSelector, value: GOG_SetValue<boolean>(true) },
        [ComponentTableProps.prop_tableClass]: { name: ComponentTableProps.prop_tableClass, value: GOG_SetValue<string[]>(["table"]) },
        [ComponentTableProps.prop_tableStyles]: { name: ComponentTableProps.prop_tableStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_tableType]: { name: ComponentTableProps.prop_tableType, value: GOG_SetValue<number>(0) },
        [ComponentTableProps.prop_tableBordered]: { name: ComponentTableProps.prop_tableBordered, value: GOG_SetValue<number>(0) },
        [ComponentTableProps.prop_tableStriped]: { name: ComponentTableProps.prop_tableStriped, value: GOG_SetValue<boolean>(false) },
        [ComponentTableProps.prop_tableHover]: { name: ComponentTableProps.prop_tableHover, value: GOG_SetValue<boolean>(false) },
        [ComponentTableProps.prop_tableBorderless]: { name: ComponentTableProps.prop_tableBorderless, value: GOG_SetValue<boolean>(false) },
        [ComponentTableProps.prop_tableHeadClass]: { name: ComponentTableProps.prop_tableHeadClass, value: GOG_SetValue<string[]>([]) },
        [ComponentTableProps.prop_tableHeadStyles]: { name: ComponentTableProps.prop_tableHeadStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_tableItemHeadClass]: { name: ComponentTableProps.prop_tableItemHeadClass, value: GOG_SetValue<string[]>([]) },
        [ComponentTableProps.prop_tableItemHeadStyles]: { name: ComponentTableProps.prop_tableItemHeadStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_order]: { name: ComponentTableProps.prop_order, value: GOG_SetValue<string[]>([]) },
        [ComponentTableProps.prop_header]: { name: ComponentTableProps.prop_header, value: GOG_SetValue<TableHeaderItem[]>([]) },
        [ComponentTableProps.prop_headerIconSize]: { name: ComponentTableProps.prop_headerIconSize, value: GOG_SetValue<number>(20) },
        [ComponentTableProps.prop_headerIconBackgroundColor]: { name: ComponentTableProps.prop_headerIconBackgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_headerIconBorderColor]: { name: ComponentTableProps.prop_headerIconBorderColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_headerIconColor]: { name: ComponentTableProps.prop_headerIconColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_tableBodyClass]: { name: ComponentTableProps.prop_tableBodyClass, value: GOG_SetValue<string[]>([]) },
        [ComponentTableProps.prop_tableBodyStyles]: { name: ComponentTableProps.prop_tableBodyStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_tableItemBodyClass]: { name: ComponentTableProps.prop_tableItemBodyClass, value: GOG_SetValue<string[]>([]) },
        [ComponentTableProps.prop_tableItemBodyStyles]: { name: ComponentTableProps.prop_tableItemBodyStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_tableItemBodyHoverStyles]: { name: ComponentTableProps.prop_tableItemBodyHoverStyles, value: GOG_SetValue<Record<string, string>>({}) },
        [ComponentTableProps.prop_data]: { name: ComponentTableProps.prop_data, value: GOG_SetValue<TableDataRow[]>([]) },
        [ComponentTableProps.prop_valueType]: { name: ComponentTableProps.prop_valueType, value: GOG_SetValue<number>(0) },
        [ComponentTableProps.prop_valueRow]: { name: ComponentTableProps.prop_valueRow, value: GOG_SetValue<number | null>(null) },
        [ComponentTableProps.prop_valueCol]: { name: ComponentTableProps.prop_valueCol, value: GOG_SetValue<number | null>(null) },
        [ComponentTableProps.prop_valueRow_backgroundColor]: { name: ComponentTableProps.prop_valueRow_backgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_valueCol_backgroundColor]: { name: ComponentTableProps.prop_valueCol_backgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_valueCol_textColor]: { name: ComponentTableProps.prop_valueCol_textColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptions]: { name: ComponentTableProps.prop_rowOptions, value: GOG_SetValue<TableRowOption[]>([]) },
        [ComponentTableProps.prop_rowOptionsBackgroundColor]: { name: ComponentTableProps.prop_rowOptionsBackgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsColor]: { name: ComponentTableProps.prop_rowOptionsColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsItemBackgroundColor]: { name: ComponentTableProps.prop_rowOptionsItemBackgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsItemColor]: { name: ComponentTableProps.prop_rowOptionsItemColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsItemHoverBackgroundColor]: { name: ComponentTableProps.prop_rowOptionsItemHoverBackgroundColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsItemHoverColor]: { name: ComponentTableProps.prop_rowOptionsItemHoverColor, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_rowOptionsOpacity]: { name: ComponentTableProps.prop_rowOptionsOpacity, value: GOG_SetValue<number>(45) },
        [ComponentTableProps.prop_backgroundColorIconColumnSelector]: { name: ComponentTableProps.prop_backgroundColorIconColumnSelector, value: GOG_SetValue<string>("") },
        [ComponentTableProps.prop_colorIconColumnSelector]: { name: ComponentTableProps.prop_colorIconColumnSelector, value: GOG_SetValue<string>("") },
    },
    schemas: {
        ...GOG_ComponentBasicConfigs_Component_parts,
        ...GOG_ComponentBasicConfigs_Component_Structure_parts,
        Main: { name: "part-main" },
        Main_Table: { name: "part-main-table" },
        Main_Table_Header: { name: "part-main-table-header" },
        Main_Table_Body: { name: "part-main-table-body" },
        Main_Table_Footer: { name: "part-main-table-footer" },
        Main_Table_Header_ColSelector: { name: "part-main-table-header-colSelector" },
    },
    templates: {},
    methods: {
        SELECT_COL: { name: "fn_onSelectCol", dataArgs: {}, componentArgs: { KEY: { name: "KEY" }, COL_INDEX: { name: "COL_INDEX" }, ROW_INDEX: { name: "ROW_INDEX" }, VALUE: { name: "VALUE" } } },
        CLICK_OPTION_CARD: { name: "fn_onclickOptionCard", dataArgs: {}, componentArgs: { OPTION_NAME: { name: "OPTION_NAME" }, OPTION_ID: { name: "OPTION_ID" } } },
        CALLBACK_COL_SELECTOR: { name: "fn_onCallbackColSelector", dataArgs: {}, componentArgs: { ORDER: { name: "ORDER" }, IS_COMPLETE: { name: "IS_COMPLETE" } } },
    },
} as const;

const C = ComponentTableConfigs;

// TYPE EXTRACTIONS
export type ComponentTablePropsType = GOG_ExtractNameValue<typeof C.keys>;
export type ComponentTableSchemaType = GOG_ExtractName<typeof C.schemas>;
export type ComponentTableTemplatesType = GOG_ExtractName<typeof C.templates>;

export type ComponentTable_Methods_SELECT_COL_ComponentArgs = GOG_ExtractName<typeof C.methods.SELECT_COL.componentArgs>;
export type ComponentTable_Methods_SELECT_COL_DataArgs = GOG_ExtractNameValue<typeof C.methods.SELECT_COL.dataArgs>;
export type ComponentTable_Methods_CLICK_OPTION_CARD_ComponentArgs = GOG_ExtractName<typeof C.methods.CLICK_OPTION_CARD.componentArgs>;
export type ComponentTable_Methods_CLICK_OPTION_CARD_DataArgs = GOG_ExtractNameValue<typeof C.methods.CLICK_OPTION_CARD.dataArgs>;
export type ComponentTable_Methods_CALLBACK_COL_SELECTOR_ComponentArgs = GOG_ExtractName<typeof C.methods.CALLBACK_COL_SELECTOR.componentArgs>;
export type ComponentTable_Methods_CALLBACK_COL_SELECTOR_DataArgs = GOG_ExtractNameValue<typeof C.methods.CALLBACK_COL_SELECTOR.dataArgs>;

export type ComponentTableMethodsType = {
    [C.methods.SELECT_COL.name]: ComponentCallBackType<ComponentTable_Methods_SELECT_COL_ComponentArgs, ComponentTable_Methods_SELECT_COL_DataArgs>;
    [C.methods.CLICK_OPTION_CARD.name]: ComponentCallBackType<ComponentTable_Methods_CLICK_OPTION_CARD_ComponentArgs, ComponentTable_Methods_CLICK_OPTION_CARD_DataArgs>;
    [C.methods.CALLBACK_COL_SELECTOR.name]: ComponentCallBackType<ComponentTable_Methods_CALLBACK_COL_SELECTOR_ComponentArgs, ComponentTable_Methods_CALLBACK_COL_SELECTOR_DataArgs>;
};

function pat(name: string, def: any) {
    return { prop: name, default: def, title: Language.translate(`components.table.props.${name}.title`), description: Language.translate(`components.table.props.${name}.description`) };
}

// BASE CLASS
export abstract class ComponentTableBase extends ComponentBase<
    ComponentTablePropsType, ComponentTableSchemaType, ComponentTableTemplatesType, ComponentTableMethodsType
> {
    static readonly TYPE_SELECTED_NONE = 0;
    static readonly TYPE_SELECTED_ROW = 1;
    static readonly TYPE_SELECTED_COL = 2;
    static readonly TYPE_SELECTED_BOTH = 3;

    _COMPONENT_PATTERN = defineComponentPatterns<ComponentTablePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Pattern(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Pattern(this),
        [C.keys.prop_size.name]: pat(C.keys.prop_size.name, C.keys.prop_size.value),
        [C.keys.prop_hasColNumber.name]: pat(C.keys.prop_hasColNumber.name, C.keys.prop_hasColNumber.value),
        [C.keys.prop_hasColSelector.name]: pat(C.keys.prop_hasColSelector.name, C.keys.prop_hasColSelector.value),
        [C.keys.prop_doColSelector.name]: pat(C.keys.prop_doColSelector.name, C.keys.prop_doColSelector.value),
        [C.keys.prop_tableClass.name]: pat(C.keys.prop_tableClass.name, C.keys.prop_tableClass.value),
        [C.keys.prop_tableStyles.name]: pat(C.keys.prop_tableStyles.name, C.keys.prop_tableStyles.value),
        [C.keys.prop_tableType.name]: pat(C.keys.prop_tableType.name, C.keys.prop_tableType.value),
        [C.keys.prop_tableBordered.name]: pat(C.keys.prop_tableBordered.name, C.keys.prop_tableBordered.value),
        [C.keys.prop_tableStriped.name]: pat(C.keys.prop_tableStriped.name, C.keys.prop_tableStriped.value),
        [C.keys.prop_tableHover.name]: pat(C.keys.prop_tableHover.name, C.keys.prop_tableHover.value),
        [C.keys.prop_tableBorderless.name]: pat(C.keys.prop_tableBorderless.name, C.keys.prop_tableBorderless.value),
        [C.keys.prop_tableHeadClass.name]: pat(C.keys.prop_tableHeadClass.name, C.keys.prop_tableHeadClass.value),
        [C.keys.prop_tableHeadStyles.name]: pat(C.keys.prop_tableHeadStyles.name, C.keys.prop_tableHeadStyles.value),
        [C.keys.prop_tableItemHeadClass.name]: pat(C.keys.prop_tableItemHeadClass.name, C.keys.prop_tableItemHeadClass.value),
        [C.keys.prop_tableItemHeadStyles.name]: pat(C.keys.prop_tableItemHeadStyles.name, C.keys.prop_tableItemHeadStyles.value),
        [C.keys.prop_order.name]: pat(C.keys.prop_order.name, C.keys.prop_order.value),
        [C.keys.prop_header.name]: pat(C.keys.prop_header.name, C.keys.prop_header.value),
        [C.keys.prop_headerIconSize.name]: pat(C.keys.prop_headerIconSize.name, C.keys.prop_headerIconSize.value),
        [C.keys.prop_headerIconBackgroundColor.name]: pat(C.keys.prop_headerIconBackgroundColor.name, C.keys.prop_headerIconBackgroundColor.value),
        [C.keys.prop_headerIconBorderColor.name]: pat(C.keys.prop_headerIconBorderColor.name, C.keys.prop_headerIconBorderColor.value),
        [C.keys.prop_headerIconColor.name]: pat(C.keys.prop_headerIconColor.name, C.keys.prop_headerIconColor.value),
        [C.keys.prop_tableBodyClass.name]: pat(C.keys.prop_tableBodyClass.name, C.keys.prop_tableBodyClass.value),
        [C.keys.prop_tableBodyStyles.name]: pat(C.keys.prop_tableBodyStyles.name, C.keys.prop_tableBodyStyles.value),
        [C.keys.prop_tableItemBodyClass.name]: pat(C.keys.prop_tableItemBodyClass.name, C.keys.prop_tableItemBodyClass.value),
        [C.keys.prop_tableItemBodyStyles.name]: pat(C.keys.prop_tableItemBodyStyles.name, C.keys.prop_tableItemBodyStyles.value),
        [C.keys.prop_tableItemBodyHoverStyles.name]: pat(C.keys.prop_tableItemBodyHoverStyles.name, C.keys.prop_tableItemBodyHoverStyles.value),
        [C.keys.prop_data.name]: pat(C.keys.prop_data.name, C.keys.prop_data.value),
        [C.keys.prop_valueType.name]: pat(C.keys.prop_valueType.name, C.keys.prop_valueType.value),
        [C.keys.prop_valueRow.name]: pat(C.keys.prop_valueRow.name, C.keys.prop_valueRow.value),
        [C.keys.prop_valueCol.name]: pat(C.keys.prop_valueCol.name, C.keys.prop_valueCol.value),
        [C.keys.prop_valueRow_backgroundColor.name]: pat(C.keys.prop_valueRow_backgroundColor.name, C.keys.prop_valueRow_backgroundColor.value),
        [C.keys.prop_valueCol_backgroundColor.name]: pat(C.keys.prop_valueCol_backgroundColor.name, C.keys.prop_valueCol_backgroundColor.value),
        [C.keys.prop_valueCol_textColor.name]: pat(C.keys.prop_valueCol_textColor.name, C.keys.prop_valueCol_textColor.value),
        [C.keys.prop_rowOptions.name]: pat(C.keys.prop_rowOptions.name, C.keys.prop_rowOptions.value),
        [C.keys.prop_rowOptionsBackgroundColor.name]: pat(C.keys.prop_rowOptionsBackgroundColor.name, C.keys.prop_rowOptionsBackgroundColor.value),
        [C.keys.prop_rowOptionsColor.name]: pat(C.keys.prop_rowOptionsColor.name, C.keys.prop_rowOptionsColor.value),
        [C.keys.prop_rowOptionsItemBackgroundColor.name]: pat(C.keys.prop_rowOptionsItemBackgroundColor.name, C.keys.prop_rowOptionsItemBackgroundColor.value),
        [C.keys.prop_rowOptionsItemColor.name]: pat(C.keys.prop_rowOptionsItemColor.name, C.keys.prop_rowOptionsItemColor.value),
        [C.keys.prop_rowOptionsItemHoverBackgroundColor.name]: pat(C.keys.prop_rowOptionsItemHoverBackgroundColor.name, C.keys.prop_rowOptionsItemHoverBackgroundColor.value),
        [C.keys.prop_rowOptionsItemHoverColor.name]: pat(C.keys.prop_rowOptionsItemHoverColor.name, C.keys.prop_rowOptionsItemHoverColor.value),
        [C.keys.prop_rowOptionsOpacity.name]: pat(C.keys.prop_rowOptionsOpacity.name, C.keys.prop_rowOptionsOpacity.value),
        [C.keys.prop_backgroundColorIconColumnSelector.name]: pat(C.keys.prop_backgroundColorIconColumnSelector.name, C.keys.prop_backgroundColorIconColumnSelector.value),
        [C.keys.prop_colorIconColumnSelector.name]: pat(C.keys.prop_colorIconColumnSelector.name, C.keys.prop_colorIconColumnSelector.value),
    });

    _COMPONENT_SCHEMA = defineComponentSchema<ComponentTableSchemaType, ComponentTablePropsType>({
        ...GOG_ComponentBasicConfigs_Component_Schema(this),
        ...GOG_ComponentBasicConfigs_Component_Structure_Schema(this),
        Main: { part: C.schemas.Main.name, props: Object.values(this._COMPONENT_PATTERN).filter(Boolean) as any },
        Main_Table: { part: C.schemas.Main_Table.name, props: [
            this._COMPONENT_PATTERN[C.keys.prop_tableClass.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableStyles.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableType.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableBordered.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableStriped.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableHover.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableBorderless.name]!,
        ]},
        Main_Table_Header: { part: C.schemas.Main_Table_Header.name, props: [
            this._COMPONENT_PATTERN[C.keys.prop_tableHeadClass.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableHeadStyles.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableItemHeadClass.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableItemHeadStyles.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_order.name]!, this._COMPONENT_PATTERN[C.keys.prop_header.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_size.name]!, this._COMPONENT_PATTERN[C.keys.prop_hasColSelector.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_hasColNumber.name]!, this._COMPONENT_PATTERN[C.keys.prop_headerIconSize.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_headerIconColor.name]!, this._COMPONENT_PATTERN[C.keys.prop_headerIconBackgroundColor.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_headerIconBorderColor.name]!,
        ]},
        Main_Table_Body: { part: C.schemas.Main_Table_Body.name, props: [
            this._COMPONENT_PATTERN[C.keys.prop_tableBodyClass.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableBodyStyles.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableItemBodyClass.name]!, this._COMPONENT_PATTERN[C.keys.prop_tableItemBodyStyles.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_tableItemBodyHoverStyles.name]!, this._COMPONENT_PATTERN[C.keys.prop_order.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_header.name]!, this._COMPONENT_PATTERN[C.keys.prop_data.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_valueType.name]!, this._COMPONENT_PATTERN[C.keys.prop_valueRow.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_valueCol.name]!, this._COMPONENT_PATTERN[C.keys.prop_valueRow_backgroundColor.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_valueCol_backgroundColor.name]!, this._COMPONENT_PATTERN[C.keys.prop_valueCol_textColor.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_size.name]!, this._COMPONENT_PATTERN[C.keys.prop_hasColNumber.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_rowOptions.name]!, this._COMPONENT_PATTERN[C.keys.prop_rowOptionsBackgroundColor.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_rowOptionsColor.name]!, this._COMPONENT_PATTERN[C.keys.prop_rowOptionsOpacity.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_rowOptionsItemBackgroundColor.name]!, this._COMPONENT_PATTERN[C.keys.prop_rowOptionsItemColor.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_rowOptionsItemHoverBackgroundColor.name]!, this._COMPONENT_PATTERN[C.keys.prop_rowOptionsItemHoverColor.name]!,
        ]},
        Main_Table_Footer: { part: C.schemas.Main_Table_Footer.name, props: [ this._COMPONENT_PATTERN[C.keys.prop_size.name]! ]},
        Main_Table_Header_ColSelector: { part: C.schemas.Main_Table_Header_ColSelector.name, props: [
            this._COMPONENT_PATTERN[C.keys.prop_hasColSelector.name]!, this._COMPONENT_PATTERN[C.keys.prop_doColSelector.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_header.name]!, this._COMPONENT_PATTERN[C.keys.prop_order.name]!,
            this._COMPONENT_PATTERN[C.keys.prop_backgroundColorIconColumnSelector.name]!, this._COMPONENT_PATTERN[C.keys.prop_colorIconColumnSelector.name]!,
        ]},
    });

    _COMPONENT_TEMPLATES = defineComponentTemplate<ComponentTableTemplatesType, ComponentTablePropsType>({});

    _COMPONENT_METHODS = defineComponentMethods<ComponentTableMethodsType, ComponentTablePropsType>({
        [C.methods.SELECT_COL.name]: { title: Language.translate("components.table.methods.fn_onSelectCol.title"), description: Language.translate("components.table.methods.fn_onSelectCol.description"), args: {
            [C.methods.SELECT_COL.componentArgs.KEY.name]: this._COMPONENT_PATTERN[C.keys.prop_order.name]!,
            [C.methods.SELECT_COL.componentArgs.COL_INDEX.name]: this._COMPONENT_PATTERN[C.keys.prop_valueCol.name]!,
            [C.methods.SELECT_COL.componentArgs.ROW_INDEX.name]: this._COMPONENT_PATTERN[C.keys.prop_valueRow.name]!,
            [C.methods.SELECT_COL.componentArgs.VALUE.name]: this._COMPONENT_PATTERN[C.keys.prop_data.name]!,
        }},
        [C.methods.CLICK_OPTION_CARD.name]: { title: Language.translate("components.table.methods.fn_onclickOptionCard.title"), description: Language.translate("components.table.methods.fn_onclickOptionCard.description"), args: {
            [C.methods.CLICK_OPTION_CARD.componentArgs.OPTION_NAME.name]: this._COMPONENT_PATTERN[C.keys.prop_rowOptions.name]!,
            [C.methods.CLICK_OPTION_CARD.componentArgs.OPTION_ID.name]: this._COMPONENT_PATTERN[C.keys.prop_data.name]!,
        }},
        [C.methods.CALLBACK_COL_SELECTOR.name]: { title: Language.translate("components.table.methods.fn_onCallbackColSelector.title"), description: Language.translate("components.table.methods.fn_onCallbackColSelector.description"), args: {
            [C.methods.CALLBACK_COL_SELECTOR.componentArgs.ORDER.name]: this._COMPONENT_PATTERN[C.keys.prop_order.name]!,
            [C.methods.CALLBACK_COL_SELECTOR.componentArgs.IS_COMPLETE.name]: this._COMPONENT_PATTERN[C.keys.prop_order.name]!,
        }},
    });

    static override renderExampleComponent(): HTMLElement {
        return new ComponentTable(
            {
                classList: ["col-md-6", "col-12", "border", "p-2"],
                styles: {},
                prop_header: [{ id: "col1", content: "Column 1" }, { id: "col2", content: "Column 2" }, { id: "col3", content: "Column 3" }],
                prop_order: ["col1", "col2", "col3"],
                prop_data: [
                    { col1: "R1C1", col2: "R1C2", col3: "R1C3" },
                    { col1: "R2C1", col2: "R2C2", col3: "R2C3" },
                ],
                prop_hasColNumber: true, prop_hasColSelector: true, prop_doColSelector: true,
            } as any as ComponentTablePropsType,
            {
                fn_onSelectCol: (e, d, c) => console.log("[Table] col selected", c),
                fn_onclickOptionCard: (e, d, c) => console.log("[Table] option clicked", c),
                fn_onCallbackColSelector: (e, d, c) => console.log("[Table] col selector callback", c),
            } as any as ComponentTableMethodsType
        ).getReactiveElement() as any;
    }
}


// ====================================================
// CONCRETE CLASS
// ====================================================
export class ComponentTable extends ComponentTableBase {

    constructor(
        config: ComponentTablePropsType,
        methods: ComponentTableMethodsType,
        events = null
    ) {
        super("table", null);

        super.renderComponent(config, methods, events);
    }

    // ---------------------------------------------
    // RENDER: Content + Manager
    // ---------------------------------------------
    override renderContentComponent() {
        return this.executeSchemaPart(C.schemas.Main.name);
    }

    override renderManagerComponent(partName, attrsDefault, data, extra): ReactiveElement {
        switch (partName) {
            case C.schemas.Main.name:
                return this.template_render_main(attrsDefault, data, extra);
            case C.schemas.Main_Table.name:
                return this.template_render_table(attrsDefault, data, extra);
            case C.schemas.Main_Table_Header.name:
                return this.template_render_table_header(attrsDefault, data, extra);
            case C.schemas.Main_Table_Body.name:
                return this.template_render_table_body(attrsDefault, data, extra);
            case C.schemas.Main_Table_Footer.name:
                return this.template_render_table_footer(attrsDefault, data, extra);
            case C.schemas.Main_Table_Header_ColSelector.name:
                return this.template_render_table_header_colSelector(attrsDefault, data, extra);
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Main
    // ---------------------------------------------
    private template_render_main(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            return ReactiveElement.part("div", {
                attrs: { ...attrsDefault },
                children: [
                    this.executeSchemaPart(C.schemas.Main_Table.name),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Table
    // ---------------------------------------------
    private template_render_table(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_tableClass =      data[C.keys.prop_tableClass.name];
            const prop_tableStyles =     data[C.keys.prop_tableStyles.name];
            const prop_tableBordered =   data[C.keys.prop_tableBordered.name];
            const prop_tableStriped =    data[C.keys.prop_tableStriped.name];
            const prop_tableHover =      data[C.keys.prop_tableHover.name];
            const prop_tableBorderless = data[C.keys.prop_tableBorderless.name];

            const tableClasses = Observable.computed(
                (tc, bordered, striped, hover, borderless) => {
                    const result: string[] = [...(tc || [])];
                    if (bordered) result.push("table-bordered");
                    if (striped) result.push("table-striped");
                    if (hover) result.push("table-hover");
                    if (borderless) result.push("table-borderless");
                    return result;
                },
                [prop_tableClass, prop_tableBordered, prop_tableStriped, prop_tableHover, prop_tableBorderless],
                this.getScope()
            );

            return ReactiveElement.part("table", {
                attrs: { ...attrsDefault },
                classBind: [tableClasses],
                stylesBind: prop_tableStyles,
                children: [
                    this.executeSchemaPart(C.schemas.Main_Table_Header.name),
                    this.executeSchemaPart(C.schemas.Main_Table_Body.name),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Table Header
    // ---------------------------------------------
    private template_render_table_header(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_tableHeadClass =     data[C.keys.prop_tableHeadClass.name];
            const prop_tableHeadStyles =    data[C.keys.prop_tableHeadStyles.name];
            const prop_order =              data[C.keys.prop_order.name];
            const prop_header =             data[C.keys.prop_header.name];
            const prop_hasColSelector =     data[C.keys.prop_hasColSelector.name];
            const prop_hasColNumber =       data[C.keys.prop_hasColNumber.name];
            const prop_tableItemHeadClass = data[C.keys.prop_tableItemHeadClass.name];
            const prop_headerIconSize =     data[C.keys.prop_headerIconSize.name];
            const prop_headerIconColor =    data[C.keys.prop_headerIconColor.name];

            const headerCells = Observable.computed(
                (order, header, hasColSelector, hasColNumber, itemHeadClass, iconSize, iconColor) => {
                    const cells: ReactiveElement[] = [];
                    if (hasColNumber || hasColSelector) {
                        cells.push(ReactiveElement.part("th", {
                            className: ["p-0", "text-center", "position-relative"],
                            attrs: { scope: "col" },
                            styles: { width: "40px" },
                            children: [this.executeSchemaPart(C.schemas.Main_Table_Header_ColSelector.name)],
                        }));
                    }
                    const orderedHeader = this.fn_getOrderedHeader(order, header);
                    for (const itemHeader of orderedHeader) {
                        const icon = itemHeader.icon;
                        const iconHtml = icon != null ? (typeof icon === "function" ? icon(iconSize, iconColor) : icon) : null;
                        cells.push(ReactiveElement.part("th", {
                            className: ["p-0", "text-center", "position-relative", ...(itemHeadClass || [])],
                            attrs: { scope: "col" },
                            styles: itemHeader.width != null ? { width: `${itemHeader.width}%` } : {},
                            children: [
                                itemHeader.content ?? "#",
                                iconHtml != null ? ReactiveElement.span({ className: ["position-absolute"], children: [iconHtml] }) : null,
                            ],
                        }));
                    }
                    return cells;
                },
                [prop_order, prop_header, prop_hasColSelector, prop_hasColNumber, prop_tableItemHeadClass, prop_headerIconSize, prop_headerIconColor],
                this.getScope()
            );

            return ReactiveElement.part("thead", {
                attrs: { ...attrsDefault },
                classBind: [prop_tableHeadClass],
                stylesBind: prop_tableHeadStyles,
                children: [ReactiveElement.part("tr", { children: headerCells })],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Table Header ColSelector
    // ---------------------------------------------
    private template_render_table_header_colSelector(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_hasColSelector = data[C.keys.prop_hasColSelector.name];
            const prop_doColSelector =  data[C.keys.prop_doColSelector.name];
            const prop_header =         data[C.keys.prop_header.name];
            const prop_order =          data[C.keys.prop_order.name];

            return ReactiveElement.span({
                attrs: { ...attrsDefault },
                children: [
                    Observable.conditionWhen(
                        [prop_hasColSelector, prop_order, prop_header],
                        (hasColSelector) => hasColSelector,
                        () => {
                            const columnsArr = Observable.computed(
                                (order, header) => this.fn_onGetColumnsSelector(order, header),
                                [prop_order, prop_header],
                                this.getScope()
                            );
                            return new ComponentInputListSelector(
                                {
                                    classList: [],
                                    styles: {},
                                    prop_columns: columnsArr,
                                    prop_showListSelected: false,
                                } as any as ComponentInputListSelectorPropsType,
                                {
                                    fn_onClickIcon: (event, dataArgs, componentArgs) => {},
                                    fn_onClickAccept: (event, dataArgs, componentArgs) => {
                                        const cols = (componentArgs as any)?.COLUMNS;
                                        const newOrder = cols ? cols.filter((c: ColumnItem) => c.selected).map((c: ColumnItem) => c.id as string) : [];
                                        if (prop_doColSelector) {
                                            this.fn_renderDataTable(newOrder);
                                        }
                                        this.fn_onCallbackColSelector(null, newOrder, true);
                                    },
                                    fn_onClickReject: (event, dataArgs, componentArgs) => {},
                                    fn_onCallbackColSelector: (event, dataArgs, componentArgs) => {},
                                    fn_onDeleteSelectedItem: (event, dataArgs, componentArgs) => {},
                                } as any as ComponentInputListSelectorMethodsType
                            ).getReactiveElement();
                        },
                        null,
                        this.getScope()
                    ),
                ],
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Table Body
    // ---------------------------------------------
    private template_render_table_body(attrsDefault, data, extra): ReactiveElement {
        if (data != null) {
            const prop_tableBodyClass =      data[C.keys.prop_tableBodyClass.name];
            const prop_tableBodyStyles =     data[C.keys.prop_tableBodyStyles.name];
            const prop_order =               data[C.keys.prop_order.name];
            const prop_header =              data[C.keys.prop_header.name];
            const prop_data =                data[C.keys.prop_data.name];
            const prop_valueType =           data[C.keys.prop_valueType.name];
            const prop_valueRow =            data[C.keys.prop_valueRow.name];
            const prop_valueCol =            data[C.keys.prop_valueCol.name];
            const prop_tableItemBodyClass =  data[C.keys.prop_tableItemBodyClass.name];
            const prop_hasColNumber =        data[C.keys.prop_hasColNumber.name];
            const prop_size =                data[C.keys.prop_size.name];
            const prop_rowOptions =          data[C.keys.prop_rowOptions.name];
            const prop_rowOptionsColor =     data[C.keys.prop_rowOptionsColor.name];
            const prop_rowOptionsItemColor = data[C.keys.prop_rowOptionsItemColor.name];

            const bodyRows = Observable.computed(
                (order, header, tableData, valueType, valueRow, valueCol, itemBodyClass, hasColNumber, size, rowOptions, rowOptionsColor, rowOptionsItemColor) => {
                    if (!header || !Array.isArray(header)) return [];
                    const orderedHeader = this.fn_getOrderedHeader(order, header);
                    if (!tableData || !Array.isArray(tableData)) return [];
                    const rows: ReactiveElement[] = [];
                    for (let bodyIndex = 0; bodyIndex < tableData.length; bodyIndex++) {
                        const itemBody = tableData[bodyIndex];
                        const isRowSelected = valueRow === bodyIndex && (valueType === ComponentTableBase.TYPE_SELECTED_ROW || valueType === ComponentTableBase.TYPE_SELECTED_BOTH);
                        const cells: ReactiveElement[] = [];
                        if (hasColNumber) {
                            cells.push(ReactiveElement.part("td", {
                                className: ["p-0", "text-center"],
                                children: [ReactiveElement.span({ className: ["p-0", "text-center", ...(itemBodyClass || [])], children: [`${bodyIndex + 1}`] })],
                            }));
                        }
                        let hasRow = false;
                        for (let headerIndex = 0; headerIndex < orderedHeader.length; headerIndex++) {
                            const itemHeader = orderedHeader[headerIndex];
                            if (itemHeader && itemBody.hasOwnProperty(itemHeader.id)) {
                                hasRow = true;
                                const rawValue = itemBody[itemHeader.id];
                                const content = typeof rawValue === "string" ? rawValue : (rawValue as any)?.content ?? "";
                                const isColSelected = valueRow === bodyIndex && valueCol === headerIndex && (valueType === ComponentTableBase.TYPE_SELECTED_COL || valueType === ComponentTableBase.TYPE_SELECTED_BOTH);
                                cells.push(ReactiveElement.part("td", {
                                    className: ["p-0", "text-center"],
                                    children: [ReactiveElement.span({
                                        className: ["p-0", "text-center", ...(itemBodyClass || []), isColSelected ? "selected_table_col" : ""],
                                        on: { click: (event: Event) => { this.fn_onSelectCol(event, itemHeader.id, headerIndex, bodyIndex, content); } },
                                        children: [content],
                                    })],
                                }));
                            }
                        }
                        if (hasRow) {
                            if (hasColNumber && rowOptions && rowOptions.length > 0) {
                                cells.push(this.fn_renderRowOptions(itemBody, rowOptions, size, rowOptionsColor, rowOptionsItemColor));
                            }
                            rows.push(ReactiveElement.part("tr", {
                                className: ["position-relative", isRowSelected ? "selected_table_row" : ""],
                                children: cells,
                            }));
                        }
                    }
                    return rows;
                },
                [prop_order, prop_header, prop_data, prop_valueType, prop_valueRow, prop_valueCol, prop_tableItemBodyClass, prop_hasColNumber, prop_size, prop_rowOptions, prop_rowOptionsColor, prop_rowOptionsItemColor],
                this.getScope()
            );

            return ReactiveElement.part("tbody", {
                attrs: { ...attrsDefault },
                classBind: [prop_tableBodyClass],
                stylesBind: prop_tableBodyStyles,
                children: bodyRows,
            });
        }
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // TEMPLATE: Table Footer
    // ---------------------------------------------
    private template_render_table_footer(attrsDefault, data, extra): ReactiveElement {
        return GOG_ComponentBasicConfigs_partDoseNotBody(attrsDefault);
    }

    // ---------------------------------------------
    // HELPER: Get ordered header
    // ---------------------------------------------
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

    // ---------------------------------------------
    // HELPER: Get columns selector items
    // ---------------------------------------------
    private fn_onGetColumnsSelector(order: string[], header: TableHeaderItem[]): ColumnItem[] {
        if (!header) return [];
        const orderSet = new Set(order || []);
        return header.map(h => ({
            id: h.id,
            title: h.content ?? h.id,
            selected: orderSet.size === 0 || orderSet.has(h.id),
        }));
    }

    // ---------------------------------------------
    // HELPER: Render row options
    // ---------------------------------------------
    private fn_renderRowOptions(itemBody: TableDataRow, rowOptions: TableRowOption[], size: SizesType, rowOptionsColor: string, rowOptionsItemColor: string): ReactiveElement {
        const optionElements = rowOptions.map(opt => {
            const iconHtml = typeof opt.html === "function" ? opt.html(size, rowOptionsItemColor) : opt.html;
            return ReactiveElement.span({
                className: ["p-1", "cursor-pointer", "d-inline-block"],
                attrs: { ...opt.attrs },
                on: { click: (event: Event) => { this.fn_onclickOptionCard(event, opt.attrs.name ?? opt.attrs.id, opt.attrs.id); } },
                children: [iconHtml],
            });
        });
        return ReactiveElement.part("td", {
            className: ["p-0", "text-center", "position-relative"],
            styles: { color: rowOptionsColor || undefined },
            children: optionElements,
        });
    }

    // ---------------------------------------------
    // METHOD: Re-render data with new order
    // ---------------------------------------------
    private fn_renderDataTable(order: string[]) {
        this.set(C.keys.prop_order.name, [...order]);
    }

    // ---------------------------------------------
    // METHOD: on select col callback
    // ---------------------------------------------
    private fn_onSelectCol(event: Event, key: string, colIndex: number, rowIndex: number, value: string) {
        this.set(C.keys.prop_valueRow.name, rowIndex);
        this.set(C.keys.prop_valueCol.name, colIndex);
        this.executeMethod(C.methods.SELECT_COL.name, event, { key, colIndex, rowIndex, value });
    }

    // ---------------------------------------------
    // METHOD: on click option card
    // ---------------------------------------------
    private fn_onclickOptionCard(event: Event, optionName: string, optionId: string) {
        this.executeMethod(C.methods.CLICK_OPTION_CARD.name, event, { optionName, optionId });
    }

    // ---------------------------------------------
    // METHOD: on callback col selector
    // ---------------------------------------------
    private fn_onCallbackColSelector(event: Event | null, order: string[], isComplete: boolean) {
        this.executeMethod(C.methods.CALLBACK_COL_SELECTOR.name, event as Event, { order, isComplete });
    }
}
