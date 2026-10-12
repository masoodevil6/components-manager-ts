import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentPageBase} from "./ComponentPageBase";
import {Props, type PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createPageStep} from "./Step";
import {SidebarDirection} from "../componentSidebar/Props";
import * as UiCategory from "@/ui_categories";

export class ComponentPage extends ComponentPageBase {
    private readonly _INSTANCE_CLASS = `component-page-${this._COMPONENT_RANDOM_ID}`;
    private readonly _ASIDE_IS_OPEN = new CoreObservable.App(true);

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentPage>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createPageStep());
        const backgroundColor = config?.prop_contentBackgroundColor ??
            new CoreObservable.App(Props.prop_contentBackgroundColor.default);
        const structureStyles = CoreObservable.App.computed(
            (styles: Record<string, any>, backgroundColor: string) => ({
                ...(styles ?? {}),
                backgroundColor,
            }),
            [
                config?.prop_structureStyles ?? {},
                backgroundColor,
            ],
            this.getScope(),
        );
        this.renderComponent({...config, prop_contentBackgroundColor: backgroundColor, prop_structureStyles: structureStyles} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this.disposeStep();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.ROOT.part:
                return this.renderRoot(attrsDefault);
            case Schemas.HEADER.part:
                return this.renderSlot(attrsDefault, data?.prop_header ?? this._COMPONENT_PROPS_BIND.prop_header);
            case Schemas.NAVIGATION.part:
                return this.renderSlot(attrsDefault, data?.prop_navigation ?? this._COMPONENT_PROPS_BIND.prop_navigation, false, true);
            case Schemas.BODY.part:
                return this.renderBody(attrsDefault);
            case Schemas.CONTENT.part:
                return this.renderSlot(attrsDefault, data?.prop_content ?? this._COMPONENT_PROPS_BIND.prop_content, true, true);
            case Schemas.ASIDE.part:
                return this.renderAside(
                    attrsDefault,
                    data?.prop_aside ?? this._COMPONENT_PROPS_BIND.prop_aside,
                );
            case Schemas.FOOTER.part:
                return this.renderSlot(attrsDefault, data?.prop_footer ?? this._COMPONENT_PROPS_BIND.prop_footer);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrs: PartAttrDefault): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const rootStyles = CoreObservable.App.computed((size: any, isFullHeight: boolean) => ({
            display: "flex",
            flexDirection: "column",
            rowGap: UtilStyle.Css_Margin(size),
            width: "100%",
            minWidth: "0",
            minHeight: isFullHeight ? UtilStyle.Css_SizeUnit(100, UtilConst.Units.VH) : "0px",
            boxSizing: "border-box",
            overflowX: "clip",
        }), [CoreConfig.Settings.SizeName.observable(), bind.prop_isFullHeight], this.getScope());
        const responsiveStyles = `@media (max-width: 767.98px) {
            .${this._INSTANCE_CLASS} [data-part-name="${Schemas.BODY.part}"] {
                grid-template-columns: minmax(0, 1fr) !important;
            }
        }`;

        return CoreReactive.App.section({
            attrs: {...attrs},
            className: [this._INSTANCE_CLASS],
            stylesBind: rootStyles as any,
            children: [
                CoreReactive.App.style({children: [responsiveStyles]}),
                this.executeSchemaPart(Schemas.HEADER.part, {}),
                this.executeSchemaPart(Schemas.NAVIGATION.part, {}),
                this.executeSchemaPart(Schemas.BODY.part, {}),
                this.executeSchemaPart(Schemas.FOOTER.part, {}),
            ],
        });
    }

    private renderBody(attrs: PartAttrDefault): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const bodyStyles = CoreObservable.App.computed(
            (aside: any, asideWidth: string, size: any, isAsideOpen: boolean) => ({
                display: "grid",
                position: "relative",
                gridTemplateColumns: this.hasSlot(aside) && isAsideOpen
                    ? `minmax(0, 1fr) minmax(0, ${asideWidth || UtilStyle.Css_SizeUnit(25, UtilConst.Units.PERCENT)})`
                    : "minmax(0, 1fr)",
                columnGap: this.hasSlot(aside) && isAsideOpen ? UtilStyle.Css_Margin(size) : "0px",
                flex: "1 1 auto",
                minWidth: "0",
                minHeight: "0",
                width: "100%",
            }),
            [bind.prop_aside, bind.prop_asideWidth, CoreConfig.Settings.SizeName.observable(), this._ASIDE_IS_OPEN],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: bodyStyles as any,
            children: [
                this.executeSchemaPart(Schemas.CONTENT.part, {}),
                this.executeSchemaPart(Schemas.ASIDE.part, {}),
            ],
        });
    }

    private renderSlot(
        attrs: PartAttrDefault,
        slot: any,
        alwaysRender = false,
        withSizePadding = false,
    ): CoreReactive.App {
        const slotStyles = withSizePadding
            ? CoreObservable.App.computed(
                (sizeName: any) => ({minWidth: "0", padding: UtilStyle.Css_Padding(sizeName)}),
                [CoreConfig.Settings.SizeName.observable()],
                this.getScope(),
            )
            : {minWidth: "0"};

        return CoreObservable.App.conditionWhen(
            [slot],
            (value: any) => alwaysRender || this.hasSlot(value),
            () => CoreReactive.App.section({
                attrs: {...attrs},
                stylesBind: slotStyles as any,
                children: [slot ?? ""],
            }),
            () => null,
            this.getScope(),
        ) as any;
    }

    private renderAside(
        attrs: PartAttrDefault,
        content: any,
    ): CoreReactive.App {
        return CoreObservable.App.conditionWhen(
            [content],
            (value: any) => this.hasSlot(value),
            () => {
                const direction = CoreObservable.App.computed(
                    (directionRtl: boolean) => directionRtl ? SidebarDirection.LTR : SidebarDirection.RTL,
                    [CoreConfig.Settings.DirectionRtl.observable()],
                    this.getScope(),
                );
                const asideStyles = CoreObservable.App.computed(
                    (isOpen: boolean, directionRtl: boolean, asideWidth: string) => ({
                        position: isOpen ? "relative" : "absolute",
                        top: isOpen ? "auto" : "0px",
                        left: !isOpen && directionRtl ? "0px" : "auto",
                        right: !isOpen && !directionRtl ? "0px" : "auto",
                        width: isOpen ? "auto" : asideWidth || UtilStyle.Css_SizeUnit(25, UtilConst.Units.PERCENT),
                        minWidth: "0",
                        height: "100%",
                        minHeight: "240px",
                    }),
                    [this._ASIDE_IS_OPEN, CoreConfig.Settings.DirectionRtl.observable(), this._COMPONENT_PROPS_BIND.prop_asideWidth],
                    this.getScope(),
                );
                const sidebar = UiCategory.UI.Contents.Sidebar({
                    prop_sidebarContent: content,
                    prop_sidebarDirection: direction,
                    prop_sidebarWidth: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
                    prop_sidebarIsOpen: this._ASIDE_IS_OPEN,
                    prop_sidebarBtnOpenHas: true,
                    prop_blurHas: false,
                    styles: {height: "100%"},
                    prop_structureStyles: {
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        minHeight: "240px",
                        overflow: "visible",
                    },
                } as any, {} as any);
                const sidebarElement = (sidebar as any).getReactiveElement?.() ?? sidebar.getElement();

                return CoreReactive.App.section({
                    attrs: {...attrs},
                    stylesBind: asideStyles as any,
                    children: [sidebarElement],
                });
            },
            () => null,
            this.getScope(),
        ) as any;
    }

    private hasSlot(value: any): boolean {
        const resolved = value instanceof CoreObservable.App ? value.get() : value;
        return resolved != null && (typeof resolved !== "string" || resolved.trim().length > 0);
    }
}
