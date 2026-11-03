import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentCardRowInfoBase} from "./ComponentCardRowInfoBase";
import {CardRowInfoRow, PropsType, PropsConfigType} from "./Props";
import {MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createCardRowInfoStep} from "./Step";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentMenuMore from "../componentMenuMore";

export class ComponentCardRowInfo extends ComponentCardRowInfoBase<ReturnType<typeof createCardRowInfoStep>> {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _OPTIONS_MENU: InstanceType<typeof ComponentMenuMore.Component> | null = null;
    private readonly _HOVERED = new CoreObservable.App(false);
    private _DISPOSED = false;
    private _ROW_ICONS: InstanceType<typeof ComponentIcon.Component>[] = [];

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCardRowInfo>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(createCardRowInfoStep(), identity);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.disposeRowIcons();
        this.clearWorkflowChildSlot("optionsMenu");
        this.clearWorkflowChildSlot("border");
        this._OPTIONS_MENU?.dispose();
        this._BORDER?.dispose();
        this._OPTIONS_MENU = null;
        this._BORDER = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.CARD.part, {});
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
        if (partName === Schemas.CARD.part) return this.renderCard(attrsDefault, data);
        return super.renderManagerComponent(partName, attrsDefault, data, extra);
    }

    private renderCard(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const rows = data.prop_rows ?? bind.prop_rows;
        const options = data.prop_options ?? bind.prop_options;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const rowContent = this.renderRows(rows);
        const menuWrapperStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes, opacityPercent: number, hovered: boolean) => {
                const initialOpacity = Number.isFinite(opacityPercent)
                    ? Math.min(100, Math.max(0, opacityPercent)) / 100
                    : 0.45;
                return {
                    position: "absolute",
                    insetBlockStart: UtilStyle.Css_Padding(size),
                    insetInlineEnd: UtilStyle.Css_Padding(size),
                    margin: UtilStyle.Css_Margin(size),
                    borderRadius: UtilStyle.Css_BorderRadius(size),
                    width: "fit-content",
                    zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.basic)),
                    opacity: hovered ? "1" : String(initialOpacity),
                    transition: "opacity 160ms ease-in-out",
                    maxWidth: "calc(100% - var(--paddingMedium) - var(--paddingMedium))",
                };
            },
            [sizeName, data.prop_optionsOpacity ?? bind.prop_optionsOpacity, this._HOVERED],
            this.getScope(),
        );
        const contentPaddingTop = CoreObservable.App.computed(
            (items: ComponentMenuMore.MenuMoreEntry[], size: UtilConst.Sizes) => {
                if (!Array.isArray(items) || items.length === 0) return "0px";
                return UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Margin(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Margin(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                );
            },
            [options, sizeName],
            this.getScope(),
        );
        const menu = CoreObservable.App.conditionWhen(
            [options],
            (items: ComponentMenuMore.MenuMoreEntry[]) => Array.isArray(items) && items.length > 0,
            () => this.renderOptionsMenu(options, menuWrapperStyles),
            () => {
                this.clearWorkflowChildSlot("optionsMenu");
                this._OPTIONS_MENU?.dispose();
                this._OPTIONS_MENU = null;
                return null;
            },
            this.getScope(),
        ) as any;

        if (!this._BORDER) {
            this._BORDER = new ComponentBorder.Component({
                prop_workflowChildName: "border",
                prop_content: rowContent,
                prop_width: "100%",
                prop_borderClass: data.prop_borderClass ?? bind.prop_borderClass,
                prop_borderStyles: CoreObservable.App.computed(
                    (styles: Record<string, string>, paddingTop: string, size: UtilConst.Sizes) => {
                        const margin = UtilStyle.Css_Margin(size);
                        return {
                            position: "relative",
                            overflow: "visible",
                            minWidth: "0",
                            margin,
                            width: UtilStyle.Css_SizeCalc(
                                "100%" as any,
                                UtilConst.Operation.MINUS,
                                margin as any,
                                UtilConst.Operation.MINUS,
                                margin as any,
                            ),
                            paddingTop,
                            ...(styles ?? {}),
                        };
                    },
                    [data.prop_borderStyles ?? bind.prop_borderStyles, contentPaddingTop, sizeName],
                    this.getScope(),
                ) as any,
            } as any);
        }

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["w-100", "h-100", "position-relative"],
            styles: {minWidth: "0", overflow: "visible"},
            on: {
                mouseenter: () => this._HOVERED.set(true),
                mouseleave: () => this._HOVERED.set(false),
            },
            children: [this.renderWorkflowSlot(this._BORDER, "border") as any, menu],
        });
    }

    private renderOptionsMenu(
        options: CoreObservable.App<any>,
        wrapperStyles: CoreObservable.App<Record<string, string>>,
    ): CoreReactive.App {
        if (!this._OPTIONS_MENU) {
            this._OPTIONS_MENU = new ComponentMenuMore.Component({
                prop_workflowChildName: "optionsMenu",
                styles: {display: "block", width: "fit-content", maxWidth: "100%"},
                prop_orientation: ComponentMenuMore.MenuMoreOrientation.HORIZONTAL,
                prop_direction: ComponentMenuMore.MenuMoreDirection.AUTO,
                prop_isFullWidth: false,
                prop_menuBorder: false,
                prop_menuBorderRadius: CoreConfig.Settings.SizeName.observable(),
                prop_menuBackgroundColor: this._COMPONENT_PROPS_BIND.prop_menuBackgroundColor,
                prop_itemBackgroundColorHover: this._COMPONENT_PROPS_BIND.prop_itemBackgroundColorHover,
                prop_items: options,
            } as any, {
                SELECT_ITEM: (event, dataArgs) => {
                    if (dataArgs?.ITEM) this.executeMethod("SELECT_OPTION", event, {ITEM: dataArgs.ITEM});
                },
            } as any);
        }
        return CoreReactive.App.div({
            attrs: {"data-part-name": "part-card-row-info-menu-wrapper"},
            stylesBind: wrapperStyles as any,
            children: [this.renderWorkflowSlot(this._OPTIONS_MENU, "optionsMenu") as any],
        });
    }

    private disposeRowIcons(): void {
        for (const icon of this._ROW_ICONS) {
            icon.getScope().dispose();
            icon.disposeStep();
        }
        this._ROW_ICONS = [];
    }

    private renderRows(rows: CoreObservable.App<CardRowInfoRow[]>): CoreReactive.App {
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const iconBoxStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => {
                const iconSize = UtilStyle.Css_IconSize(size);
                return {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "0 0 auto",
                    width: iconSize,
                    height: iconSize,
                    marginInlineEnd: UtilStyle.Css_Margin(size),
                };
            },
            [sizeName],
            this.getScope(),
        );
        const titleStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes, width: string) => ({
                width,
                flex: "0 0 auto",
                lineHeight: UtilStyle.Css_Height(size),
                marginInlineEnd: UtilStyle.Css_Margin(size),
                overflowWrap: "anywhere",
            }),
            [sizeName, this._COMPONENT_PROPS_BIND.prop_titleWidth],
            this.getScope(),
        );
        const contentStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => ({
                flex: "1 1 0%", minWidth: "0", overflowWrap: "anywhere",
                lineHeight: UtilStyle.Css_Height(size),
            }),
            [sizeName],
            this.getScope(),
        );
        const rowsStyles = CoreObservable.App.computed(
            (size: UtilConst.Sizes) => {
                const margin = UtilStyle.Css_Margin(size);
                return {
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--marginMedium)",
                    margin,
                    width: UtilStyle.Css_SizeCalc(
                        "100%" as any,
                        UtilConst.Operation.MINUS,
                        margin as any,
                        UtilConst.Operation.MINUS,
                        margin as any,
                    ),
                    minWidth: "0",
                };
            },
            [sizeName],
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: {"data-part-name": "part-card-row-info-rows"},
            stylesBind: rowsStyles as any,
            children: CoreObservable.App.computed(
                (items: CardRowInfoRow[]) => {
                    this.disposeRowIcons();
                    const validItems = (Array.isArray(items) ? items : [])
                    .filter((row) => row
                        && (typeof row.id === "string" || typeof row.id === "number")
                        && typeof row.content === "string")
                    return validItems.map((row, index) => {
                        const isLast = index === validItems.length - 1;
                        const icon = row.icon ? new ComponentIcon.Component({
                            prop_icon: UiIcons.CreateIcon(row.icon, {size: row.iconSize ?? sizeName, primaryColor: (row.iconColor || undefined) as any}),
                        }) : null;
                        if (icon) this._ROW_ICONS.push(icon);
                        const rowItemStyles = CoreObservable.App.computed(
                            (size: UtilConst.Sizes) => ({
                                display: "flex",
                                alignItems: "center",
                                minWidth: "0",
                                paddingBottom: UtilStyle.Css_Padding(size),
                                borderBottomColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5),
                                borderBottomWidth: isLast ? "0px" : UtilStyle.Css_BorderWidth(size),
                                borderBottomStyle: isLast ? "none" : "solid",
                            }),
                            [sizeName],
                            this.getScope(),
                        );
                        return CoreReactive.App.div({
                            attrs: {
                                "data-part-name": "part-card-row-info-rows-item",
                                "data-row-id": String(row.id),
                            },
                            stylesBind: rowItemStyles as any,
                            children: [
                                CoreReactive.App.span({
                                    attrs: {"aria-hidden": "true", "data-part-name": "part-card-row-info-row-icon"},
                                    stylesBind: iconBoxStyles as any,
                                    children: icon ? [icon.getElement()] : [],
                                }),
                                CoreReactive.App.b({
                                    attrs: {"data-part-name": "part-card-row-info-row-title"},
                                    stylesBind: titleStyles as any,
                                    props: {textContent: row.title ?? ""},
                                }),
                                CoreReactive.App.span({
                                    attrs: {"data-part-name": "part-card-row-info-row-content"},
                                    stylesBind: contentStyles as any,
                                    props: {textContent: row.content ?? ""},
                                }),
                            ],
                        });
                    });
                },
                [rows],
                this.getScope(),
            ) as any,
        });
    }

}
