import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilStyle      from "@/util_styles";
import * as UtilConst      from "@/util_consts";
import * as UiIcons        from "@/ui_icons";
// --------------------------------
import {ComponentInputListSelectorBase}    from "./ComponentInputListSelectorBase";
import {Schemas}                           from "./Schemas";
import {Props, type ColumnItem, type PropsType} from "./Props";
import {createInputListSelectorStep}      from "./Step";
import {ComponentStructureTrait}           from "../../traits/componentStructureTrait";
import {PartAttrDefault}                    from "@/core_components";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
// --------------------------------
import type {MethodsConfigType}             from "./Methods";
// --------------------------------
import * as ComponentBorder               from "../componentBorder";
import * as ComponentIcon                  from "../componentIcon";
import * as ComponentLabel                 from "../componentLabel";
import * as ComponentPositionMenu          from "../componentPositionMenu";
import * as ComponentInputAgreementCheckBox from "../componentInputAgreementCheckBox";
import * as ComponentListSelectedScroller   from "../componentListSelectedScroller";


/**
 * ComponentInputListSelector — انتخاب‌گر لیست با منوی شناور
 *
 * معماری Composition:
 *   ComponentInputListSelector HAS-A ComponentPositionMenu (منوی شناور با selector + body)
 *   ComponentInputListSelector HAS-A ComponentInputAgreementCheckBox (چک‌باکس‌های انتخاب ستون)
 *   ComponentInputListSelector HAS-A ComponentListSelectedScroller (اسکرولر آیتم‌های انتخاب‌شده)
 *   ComponentInputListSelector HAS-A ComponentBorder (ظرف اصلی)
 *   ComponentInputListSelector HAS-A ComponentIcon (آیکون انتخاب‌گر)
 *
 * Constructor امضا: (config, methods, identity?)
 *   config  — شامل propهای پایه + propهای اختصاصی
 *   methods — methodهای اختصاصی (CLICK_ICON, CLICK_ACCEPT, CLICK_REJECT, CALLBACK_COL_SELECTOR, DELETE_SELECTED_ITEM)
 *   identity — { unique?, emit?, events? }
 */
export class ComponentInputListSelector extends ComponentInputListSelectorBase {

    private var_columns: CoreObservable.App<ColumnItem[]>;
    private var_tempOrder: CoreObservable.App<(string | number)[]>;
    private var_showPopup: CoreObservable.App<boolean>;
    private _checkBoxInstance: ComponentInputAgreementCheckBox.Component | null = null;
    private _columnsBackup: ColumnItem[] = [];


    constructor(
        config?:  Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentInputListSelector>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createInputListSelectorStep();

        super("input-list-selector", null, identity, step);

        const rawColumns = (config as any)?.["prop_columns"] ?? [];
        const initialColumns: ColumnItem[] = CoreObservable.App.isObservable(rawColumns)
            ? rawColumns.get()
            : Array.isArray(rawColumns) ? rawColumns : [];

        this.var_columns  = new CoreObservable.App<ColumnItem[]>([...initialColumns]);
        this.var_tempOrder = new CoreObservable.App<(string | number)[]>([]);
        this.var_showPopup = new CoreObservable.App<boolean>(false);

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
        return this.executeSchemaPart(Schemas.MAIN.part, {});
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
            case Schemas.MAIN.part:
                return this.renderMain(attrsDefault, data, extra);
            case Schemas.MAIN_LABEL.part:
                return this.renderLabel(attrsDefault, data, extra);
            case Schemas.MAIN_FORM_FLOAT_MENU.part:
                return this.renderFormFloatMenu(attrsDefault, data, extra);
            case Schemas.MAIN_FORM_FLOAT_MENU_ICON_LIST.part:
                return this.renderFormFloatMenuIconList(attrsDefault, data, extra);
            case Schemas.MAIN_FORM_FLOAT_MENU_CHECK_BOXES.part:
                return this.renderFormFloatMenuCheckBoxes(attrsDefault, data, extra);
            case Schemas.MAIN_FORM_LIST_SELECTED.part:
                return this.renderFormListSelected(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderMain — ظرف اصلی با ComponentBorder
    --------------------------------------------- */
    protected renderMain(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_inputBackgroundColor = data?.["prop_inputBackgroundColor"] ?? bind.prop_inputBackgroundColor;

        const border = new ComponentBorder.Component(
            {
                prop_borderClass: [],
                styles: {},
                prop_content: CoreReactive.App.div({
                    styles: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    children: [
                        this.executeSchemaPart(Schemas.MAIN_FORM_FLOAT_MENU.part, {}),
                        this.executeSchemaPart(Schemas.MAIN_FORM_LIST_SELECTED.part, {}),
                    ],
                }),
                prop_borderColor: null,
                prop_contentBackgroundColor: prop_inputBackgroundColor as any,
            } as any,
            {} as any,
        );

        return CoreReactive.App.part("div", {
            attrs: { ...attrsDefault },
            children: [
                this.executeSchemaPart(Schemas.MAIN_LABEL.part, {}),
                border.getReactiveElement() as CoreReactive.App,
            ],
        });
    }


    /* ---------------------------------------------
       renderLabel — برچسب کامپوننت
    --------------------------------------------- */
    protected renderLabel(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_labelShow              = data?.["prop_labelShow"]              ?? bind.prop_labelShow;
        const prop_labelTitle             = data?.["prop_labelTitle"]             ?? bind.prop_labelTitle;
        const prop_labelTooltipDescription = data?.["prop_labelTooltipDescription"] ?? bind.prop_labelTooltipDescription;

        return CoreObservable.App.conditionWhen(
            [prop_labelShow, prop_labelTooltipDescription],
            (show, desc) => !!show && desc != null,
            () => {
                const label = new ComponentLabel.Component(
                    {
                        classList: [],
                        styles: CoreObservable.App.computed((sizeName: any) => ({marginBlockEnd: UtilStyle.Css_Margin(sizeName)}), [CoreConfig.Settings.SizeName.observable()], this.getScope()),
                        prop_labelTitle: prop_labelTitle as any,
                        prop_labelTooltipDescription: prop_labelTooltipDescription as any,
                        prop_labelShow: true,
                    } as any,
                    {} as any,
                );
                return label.getReactiveElement() as CoreReactive.App;
            },
            () => this.renderEmptyContent(attrsDefault),
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       renderFormFloatMenu — منوی شناور با ComponentPositionMenu
    --------------------------------------------- */
    protected renderFormFloatMenu(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_menuBackgroundColor = data?.["prop_menuBackgroundColor"] ?? bind.prop_menuBackgroundColor;
        const prop_menuBorderColor     = data?.["prop_menuBorderColor"]     ?? bind.prop_menuBorderColor;
        const prop_widthBody           = data?.["prop_widthBody"]           ?? bind.prop_widthBody;
        const prop_heightBody          = data?.["prop_heightBody"]          ?? bind.prop_heightBody;

        const positionMenu = new ComponentPositionMenu.Component(
            {
                classList: [],
                styles: CoreObservable.App.computed(
                    (sizeName: any, _dir: boolean) => {
                        const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
                        return {
                            width:  UtilStyle.Css_SizeUnit(iconSize, UtilConst.Units.PEXEL),
                            height: UtilStyle.Css_SizeUnit(iconSize, UtilConst.Units.PEXEL),
                        };
                    },
                    [CoreConfig.Settings.SizeName.observable(), CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                ),
                prop_structureClass: ["w-100", "h-100"],
                prop_menuBackgroundColor: prop_menuBackgroundColor as any,
                prop_menuBorderColor: prop_menuBorderColor as any,
                prop_menuSelector: this.executeSchemaPart(Schemas.MAIN_FORM_FLOAT_MENU_ICON_LIST.part, {}),
                prop_menuBody: this.executeSchemaPart(Schemas.MAIN_FORM_FLOAT_MENU_CHECK_BOXES.part, {}),
                prop_menuBodyWidth: prop_widthBody ?? "300px",
                prop_menuBodyHeight: prop_heightBody ?? "300px",
            } as any,
            {
                CLICK_OPEN: (event: Event) => {
                    event.preventDefault();
                    this.fn_onClickIcon(event);
                },
                CLICK_ACCEPT: (event: Event) => {
                    event.preventDefault();
                    this.fn_onClickAccept(event);
                    return true;
                },
                CLICK_REJECT: (event: Event) => {
                    event.preventDefault();
                    this.fn_onClickReject(event);
                },
            } as any,
        );

        return CoreReactive.App.part("div", {
            attrs: { ...attrsDefault },
            className: ["position-relative"],
            styles: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            },
            stylesBind: {
                width: CoreObservable.App.computed(
                    (sizeName: any) => {
                        return UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_Padding(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_Height(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_Padding(sizeName) as any,
                        );
                    },
                    [CoreConfig.Settings.SizeName.observable()],
                    this.getScope(),
                ),
                height: CoreObservable.App.computed(
                    (sizeName: any) => {
                        return UtilStyle.Css_SizeCalc(
                            UtilStyle.Css_BorderWidth(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_Padding(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_Height(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_Padding(sizeName) as any,
                            UtilConst.Operation.ADD,
                            UtilStyle.Css_BorderWidth(sizeName) as any,
                        );
                    },
                    [CoreConfig.Settings.SizeName.observable()],
                    this.getScope(),
                ),
            },
            children: [positionMenu.getReactiveElement()],
        });
    }


    /* ---------------------------------------------
       renderFormFloatMenuIconList — آیکون انتخاب‌گر
    --------------------------------------------- */
    protected renderFormFloatMenuIconList(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_icon               = data?.["prop_icon"]               ?? bind.prop_icon;
        const prop_backgroundColorIcon = data?.["prop_backgroundColorIcon"] ?? bind.prop_backgroundColorIcon;
        const prop_colorIcon          = data?.["prop_colorIcon"]          ?? bind.prop_colorIcon;

        const styles: Record<string, any> = {
            cursor: "pointer",
        };
        if (prop_backgroundColorIcon) {
            styles["background-color"] = String(prop_backgroundColorIcon);
        }

        const iconStyles: Record<string, any> = {};
        if (prop_colorIcon) {
            iconStyles["color"] = String(prop_colorIcon);
        }

        const iconValue = (prop_icon as any)?.get?.() ?? prop_icon;
        const iconInstance = iconValue
            ? UiIcons.CreateIcon(iconValue as any)
            : null;

        const icon = new ComponentIcon.Component(
            {
                classList: ["position-relative", "d-block", "w-100", "h-100"],
                prop_structureClass: ["d-block", "w-100", "h-100"],
                styles: styles,
                prop_iconClass: [],
                prop_iconStyles: iconStyles,
                prop_icon: iconInstance as any,
            } as any,
            {
                CLICK: (event: Event) => {
                    this.fn_onClickIcon(event);
                },
            } as any,
        );

        return icon.getReactiveElement() as CoreReactive.App;
    }


    /* ---------------------------------------------
       renderFormFloatMenuCheckBoxes — چک‌باکس‌های انتخاب ستون
    --------------------------------------------- */
    protected renderFormFloatMenuCheckBoxes(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_titleAll  = data?.["prop_titleAll"]  ?? bind.prop_titleAll;
        const prop_heightItems = data?.["prop_heightItems"] ?? bind.prop_heightItems;
        const prop_heightBody = data?.["prop_heightBody"] ?? bind.prop_heightBody;
        const prop_draggable = data?.["prop_draggable"] ?? bind.prop_draggable;

        return CoreReactive.App.part("div", {
            attrs: { ...attrsDefault },
            styles: {
                height: "100%",
            },
            children: CoreObservable.App.computed(
                (columns) => {
                    const checkBoxList = columns.map((col: ColumnItem) => ({
                        id: col.id,
                        title: col.title,
                    }));
                    const selectedIds = columns
                        .filter((c: ColumnItem) => c.selected)
                        .map((c: ColumnItem) => c.id);
                    const orderIds = selectedIds.slice();

                    const heightItems = prop_heightItems?.get?.() ?? 45;
                    const heightBody  = prop_heightBody?.get?.() ?? "300px";
                    const maxHeight = UtilStyle.Css_SizeCalc(
                        heightBody,
                        UtilConst.Operation.MINUS,
                        UtilStyle.Css_SizeUnit(heightItems + 20, UtilConst.Units.PEXEL) as any,
                    );

                    const checkBox = new ComponentInputAgreementCheckBox.Component(
                        {
                            prop_name: "input-list-selector-checkboxes",
                            prop_labelShow: false,
                            prop_checkBoxOrderStatus: prop_draggable ?? true,
                            prop_checkBoxList: checkBoxList,
                            prop_value: selectedIds,
                            prop_checkBoxOrder: orderIds,
                            prop_checkBoxAllTitle: prop_titleAll ?? "Select All",
                            prop_maxHeightItems: maxHeight,
                        } as any,
                        {
                            CLICK_ALL: (event: Event, _dataArgs: any, componentArgs: any) => {
                                event.stopPropagation();
                                const currentValue = componentArgs?.VALUE;
                                const list = componentArgs?.LIST;
                                if (Array.isArray(currentValue) && Array.isArray(list)) {
                                    const newOrder = list
                                        .filter((item: any) => currentValue.includes(item.id))
                                        .map((item: any) => item.id);
                                    this.var_tempOrder.set(newOrder);
                                }
                            },
                            CLICK_ITEM: (event: Event, _dataArgs: any, componentArgs: any) => {
                                event.stopPropagation();
                                const currentValue = componentArgs?.VALUE;
                                const list = componentArgs?.LIST;
                                if (Array.isArray(currentValue) && Array.isArray(list)) {
                                    const newOrder = list
                                        .filter((item: any) => currentValue.includes(item.id))
                                        .map((item: any) => item.id);
                                    this.var_tempOrder.set(newOrder);
                                }
                            },
                        } as any,
                    );
                    this._checkBoxInstance = checkBox;
                    return [checkBox.getReactiveElement()];
                },
                [this.var_columns],
                this.getScope(),
            ),
        });
    }


    /* ---------------------------------------------
       renderFormListSelected — اسکرولر آیتم‌های انتخاب‌شده
    --------------------------------------------- */
    protected renderFormListSelected(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;
        const prop_showListSelected = data?.["prop_showListSelected"] ?? bind.prop_showListSelected;

        return CoreObservable.App.conditionWhen(
            [prop_showListSelected],
            (statusShowListScroller) => !!statusShowListScroller,
            () => {
                return CoreReactive.App.part("div", {
                    attrs: { ...attrsDefault },
                    className: ["p-0", "m-0"],
                    styles: {
                        flex: "1",
                        minWidth: "0",
                    },
                    children: CoreObservable.App.computed(
                        (columns) => {
                            const selectedList = columns
                                .filter((c: ColumnItem) => c.selected)
                                .map((c: ColumnItem) => ({
                                    id: c.id,
                                    title: c.title,
                                    canDelete: true,
                                }));

                            const selectedIds = columns
                                .filter((c: ColumnItem) => c.selected)
                                .map((c: ColumnItem) => c.id);
                            const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
                            const directionLtr = directionRtl.map((isRtl: boolean) => !isRtl, this.getScope());

                            const scroller = new ComponentListSelectedScroller.Component(
                                {
                                    classList: [],
                                    styles: {},
                                    prop_borderColor: UtilStyle.Css_Color(
                                        UtilConst.ColorMain.PRIMARY,
                                        UtilConst.ColorGrad.GRADE_1,
                                    ),
                                    prop_list: selectedList,
                                    prop_value: selectedIds,
                                    prop_borderTopLeftRadiusHas: directionRtl,
                                    prop_borderBottomLeftRadiusHas: directionRtl,
                                    prop_borderTopRightRadiusHas: directionLtr,
                                    prop_borderBottomRightRadiusHas: directionLtr,
                                } as any,
                                {
                                    DELETE_ITEM: (event: Event, dataArgs: any) => {
                                        this.fn_onDeleteSelectedItem(event, dataArgs);
                                    },
                                } as any,
                            );

                            return [scroller.getReactiveElement()];
                        },
                        [this.var_columns],
                        this.getScope(),
                    ),
                });
            },
            () => this.renderEmptyContent(attrsDefault),
            this.getScope(),
        ) as any;
    }


    /* ---------------------------------------------
       FUNCTIONs — منطق اختصاصی
    --------------------------------------------- */

    private fn_onClickIcon(event: any) {
        const currentShow = this.var_showPopup.get();
        this.var_showPopup.set(!currentShow);

        if (!currentShow) {
            const columns = this.var_columns.get();
            const selectedIds = columns.filter(c => c.selected).map(c => c.id);
            this.var_tempOrder.set([...selectedIds]);
            this._columnsBackup = columns.map(c => ({ ...c }));
        }

        this.executeMethod("CLICK_ICON", event, {});
    }

    private fn_onClickAccept(event: any) {
        let tempOrder = this.var_tempOrder.get();

        if (this._checkBoxInstance) {
            const cbValue = this._checkBoxInstance.get("prop_value");
            const cbOrder = this._checkBoxInstance.get("prop_checkBoxOrder");
            if (Array.isArray(cbValue)) {
                const valueSet = new Set(cbValue);
                const orderSet = new Set(cbOrder);
                tempOrder = (Array.isArray(cbOrder) ? cbOrder : []).filter(
                    (id: string | number) => valueSet.has(id),
                );
                cbValue.forEach((id: string | number) => {
                    if (!orderSet.has(id)) tempOrder.push(id);
                });
            }
        }

        const columns = this.var_columns.get();
        const colMap = new Map(columns.map(c => [c.id, c]));
        const selectedSet = new Set(tempOrder);
        const orderedSelected: ColumnItem[] = tempOrder
            .map((id: string | number) => {
                const col = colMap.get(id);
                if (col) return { ...col, selected: true };
                return null;
            })
            .filter(Boolean) as ColumnItem[];
        const rest: ColumnItem[] = columns
            .filter(c => !selectedSet.has(c.id))
            .map(c => ({ ...c, selected: false }));
        const newColumns: ColumnItem[] = [...orderedSelected, ...rest];

        this.var_columns.set(newColumns);
        this.set("prop_columns", newColumns);

        this.executeMethod("CLICK_ACCEPT", event, {});
        this.executeMethod("CALLBACK_COL_SELECTOR", event, {});

        this.var_tempOrder.set([]);
        this.var_showPopup.set(false);
    }

    private fn_onClickReject(event: any) {
        if (this._columnsBackup.length > 0) {
            const restored = this._columnsBackup.map(c => ({ ...c }));
            this.var_columns.set(restored);
            this.set("prop_columns", restored);
        }
        this.var_tempOrder.set([]);
        this.var_showPopup.set(false);

        this.executeMethod("CLICK_REJECT", event, {});
    }

    private fn_onDeleteSelectedItem(event: any, dataArgs: any) {
        const itemId = dataArgs?.ID;
        const columns = this.var_columns.get();

        const newColumns: ColumnItem[] = columns.map(col => {
            if (col.id === itemId) {
                return { ...col, selected: false };
            }
            return col;
        });

        this.var_columns.set(newColumns);
        this.set("prop_columns", newColumns);

        this.executeMethod("DELETE_SELECTED_ITEM", event, {});
    }

}
