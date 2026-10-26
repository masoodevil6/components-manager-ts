import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as CoreEvent from "@/core_event";
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
import {
    Component as ComponentPageSettingClass,
    PAGE_SETTING_TRANSITION_MS,
    Props as PageSettingProps,
} from "../componentPageSetting";
import * as UiCategory from "@/ui_categories";
import * as ComponentJsonTree from "../componentJsonTree";
import type {JsonValue} from "../componentJsonTree/Types";

export class ComponentPage extends ComponentPageBase<ReturnType<typeof createPageStep>>{
    private readonly _INSTANCE_CLASS = `component-page-${this._COMPONENT_RANDOM_ID}`;
    private readonly _ASIDE_IS_OPEN = new CoreObservable.App(true);
    private readonly _PAGE_SETTING_IS_OPEN = new CoreObservable.App(false);
    private readonly _PAGE_SETTING_WIDTH = new CoreObservable.App<number | string>(PageSettingProps.prop_sidebarWidth.default);
    private _PAGE_SETTING: InstanceType<typeof ComponentPageSettingClass> | null = null;
    private _WORKFLOW_TREE: InstanceType<typeof ComponentJsonTree.Component> | null = null;

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
        this.registerSettingEndpoint();
        this.registerWorkflowEndpoint();
    }

    dispose(): void {
        this._WORKFLOW_TREE?.dispose();
        this._WORKFLOW_TREE = null;
        this._PAGE_SETTING?.dispose();
        this._PAGE_SETTING = null;
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
            case Schemas.SETTING.part:
                return this.renderSetting(attrsDefault, data?.prop_setting ?? this._COMPONENT_PROPS_BIND.prop_setting);
            case Schemas.CURRENT.part:
                return this.renderCurrentPage(attrsDefault);
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
        const rootStyles = CoreObservable.App.computed((isFullHeight: boolean) => ({
            display: "flex",
            flexDirection: "row",
            width: "100%",
            minWidth: "0",
            height: "auto",
            minHeight: isFullHeight ? UtilStyle.Css_SizeUnit(100, UtilConst.Units.VH) : "0px",
            boxSizing: "border-box",
            overflowX: "visible",
        }), [bind.prop_isFullHeight], this.getScope());
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
                this.executeSchemaPart(Schemas.SETTING.part, {}),
                this.executeSchemaPart(Schemas.CURRENT.part, {}),
            ],
        });
    }

    private renderCurrentPage(attrs: PartAttrDefault): CoreReactive.App {
        const pageStyles = CoreObservable.App.computed(
            (size: any, isSettingOpen: boolean, settingWidth: number | string) => {
                const sidebarWidth = typeof settingWidth === "number"
                    ? `${settingWidth}px`
                    : String(settingWidth || "320px");
                return {
                    display: "flex",
                    flexDirection: "column",
                    rowGap: UtilStyle.Css_Margin(size),
                    flex: "0 0 auto",
                    minWidth: "0",
                    minHeight: "0",
                    width: isSettingOpen ? `calc(100% - ${sidebarWidth})` : "100%",
                    boxSizing: "border-box",
                    transition: `width ${PAGE_SETTING_TRANSITION_MS}ms ease-in-out`,
                };
            },
            [
                CoreConfig.Settings.SizeName.observable(),
                this._PAGE_SETTING_IS_OPEN,
                this._PAGE_SETTING_WIDTH,
            ],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: pageStyles as any,
            children: [
                this.executeSchemaPart(Schemas.HEADER.part, {}),
                this.executeSchemaPart(Schemas.NAVIGATION.part, {}),
                this.executeSchemaPart(Schemas.BODY.part, {}),
                this.executeSchemaPart(Schemas.FOOTER.part, {}),
            ],
        });
    }

    private renderSetting(attrs: PartAttrDefault, content: CoreObservable.App<any>): CoreReactive.App {
        if (!this._PAGE_SETTING) {
            this._PAGE_SETTING = new ComponentPageSettingClass({
                prop_content: content,
                prop_sidebarIsOpen: this._PAGE_SETTING_IS_OPEN,
                prop_sidebarWidth: this._PAGE_SETTING_WIDTH,
                prop_sidebarHasOpenIcon: false,
            } as any);
        }

        return CoreReactive.App.section({
            attrs: {...attrs},
            styles: {
                flex: "0 0 auto",
                position: "sticky",
                top: "0px",
                alignSelf: "flex-start",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.page_setting)),
                height: UtilStyle.Css_SizeUnit(100, UtilConst.Units.VH),
                minWidth: "0",
                minHeight: "0",
                overflow: "visible",
            },
            children: [this._PAGE_SETTING.getElement()],
        });
    }

    private registerSettingEndpoint(): void {
        const settingStep = this._COMPONENT_STEP?.setting as CoreEvent.TStepRef | undefined;
        if (!settingStep) return;

        CoreEvent.App.registerEmit(settingStep, (request: CoreEvent.ClRequest) => {
            if (request.payload.close === true) {
                this._COMPONENT_PROPS_BIND.prop_setting.set(null);
                this._PAGE_SETTING_IS_OPEN.set(false);
                return {opened: false, closed: true};
            }
            if (!Object.prototype.hasOwnProperty.call(request.payload, "content")) {
                return {opened: false, closed: false};
            }

            this._COMPONENT_PROPS_BIND.prop_setting.set(request.payload.content);
            this._PAGE_SETTING_IS_OPEN.set(true);
            return {opened: true, closed: false};
        });
    }

    private registerWorkflowEndpoint(): void {
        const workflowStep = this._COMPONENT_STEP?.workflow as CoreEvent.TStepRef | undefined;
        if (!workflowStep) return;

        CoreEvent.App.registerEmit(workflowStep, () => {
            if (!this._COMPONENT_STEP) return {opened: false};

            const workflowRoot = this._COMPONENT_STEP.getParent() ?? this._COMPONENT_STEP;
            const steps = Object.fromEntries(
                workflowRoot.getChildEntries().map(([key, child]) => [key, this.serializeWorkflowStep(child, key)]),
            );
            const data = {
                workflow: {
                    root: workflowRoot.unique || "page",
                    steps,
                },
            } as JsonValue;

            this._WORKFLOW_TREE?.dispose();
            this._WORKFLOW_TREE = new ComponentJsonTree.Component({
                styles: {display: "flex", flexDirection: "column", width: "100%", height: "100vh", minHeight: "0", flex: "1 1 auto", boxSizing: "border-box"},
                prop_structureStyles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "0", flex: "1 1 auto", boxSizing: "border-box"},
                prop_data: data,
                prop_initialExpandDepth: 4,
                prop_treeHorizontalScroll: true,
                prop_treeFillHeight: true,
                prop_componentBorderElementStyles: {display: "flex", flexDirection: "column", width: "100%", minWidth: "0", height: "100%", minHeight: "0", flex: "1 1 auto"},
                prop_componentBorderStructureStyles: {display: "flex", flexDirection: "column", width: "100%", height: "100%", minHeight: "0", flex: "1 1 auto"},
                prop_componentBorderStyles: {display: "flex", flexDirection: "column", height: "100%", minHeight: "0", flex: "1 1 auto"},
            } as any);
            this._COMPONENT_PROPS_BIND.prop_setting.set(this._WORKFLOW_TREE.getElement());
            this._PAGE_SETTING_IS_OPEN.set(true);
            return {opened: true};
        });
    }

    private serializeWorkflowStep(step: CoreEvent.ClStep, key: string): JsonValue {
        const children = Object.fromEntries(
            step.getChildEntries().map(([childKey, child]) => [childKey, this.serializeWorkflowStep(child, childKey)]),
        );
        return {
            name: key,
            unique: step.unique,
            ...(Object.keys(children).length > 0 ? {steps: children} : {}),
        };
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
                styles: {
                    flex: "0 0 auto",
                    position: "relative",
                    minWidth: "0",
                    minHeight: "0",
                    ...(attrs["data-part-name"] === Schemas.SETTING.part ? {height: "100%"} : {}),
                    overflow: "visible",
                },
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
