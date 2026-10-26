import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Component as ComponentStructureClass, type PropsType as StructurePropsType} from "../componentStructure";
import {Component as ComponentSidebarClass} from "../componentSidebar";
import {SidebarDirection} from "../componentSidebar/Props";
import {Props, type PropsType, type PropsConfigType} from "./Props";
import {Schemas, type SchemasType} from "./Schemas";
import {Definition} from "./Definition";
import {PAGE_SETTING_TRANSITION_MS} from "./Transition";

type ComponentPageSettingProps = StructurePropsType & PropsType;

export class ComponentPageSetting extends ComponentStructureClass<
    ComponentPageSettingProps & Record<string, any>,
    SchemasType,
    Record<string, any>
> {
    private _sidebar: InstanceType<typeof ComponentSidebarClass> | null = null;
    private _settingPanel: HTMLElement | null = null;
    private _ownerElement: HTMLElement | null = null;
    private _ownerObserver: MutationObserver | null = null;
    private _ownerWasConnected = false;
    private _disposed = false;

    protected _COMPONENT_DEFINITION = Definition;
    protected _COMPONENT_PATTERN = CoreComponents.DefineProp<ComponentPageSettingProps & Record<string, any>>({
        ...ComponentStructureTrait.props,
        ...Props,
    } as any);
    protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema<SchemasType, ComponentPageSettingProps & Record<string, any>>({
        ...ComponentStructureTrait.schemas,
        ...Schemas,
    } as any);
    protected _COMPONENT_METHODS = CoreComponents.DefineMethod<Record<string, any>, ComponentPageSettingProps & Record<string, any>>({} as any);

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: Record<string, any>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super("page-setting", null, identity as any);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._disposed) return;
        this._disposed = true;
        this._ownerObserver?.disconnect();
        this._ownerObserver = null;
        this._settingPanel?.remove();
        this._settingPanel = null;
        this._ownerElement?.remove();
        this._ownerElement = null;
        (super.getElement() as HTMLElement)?.remove();
        this._sidebar?.dispose();
        this._sidebar = null;
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.PAGE_SETTING.part, {});
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
            case Schemas.PAGE_SETTING.part:
                return this.renderPageSetting(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderPageSetting(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const propContent = data?.prop_content ?? bind.prop_content;
        const propContentScrollY = data?.prop_contentScrollY ?? bind.prop_contentScrollY;
        const propWidth = data?.prop_sidebarWidth ?? bind.prop_sidebarWidth;
        const propIsOpen = data?.prop_sidebarIsOpen ?? bind.prop_sidebarIsOpen;
        const propSidebarHasOpenIcon = data?.prop_sidebarHasOpenIcon ?? bind.prop_sidebarHasOpenIcon;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const scrollableContent = CoreReactive.App.div({
            attrs: {"data-part-name": "part-page-setting-scroll-content"},
            styles: {
                width: "100%",
                height: "100vh",
                maxHeight: "100vh",
                overflowY: "hidden",
                overflowX: "hidden",
                boxSizing: "border-box",
            },
            stylesBind: CoreObservable.App.computed((scrollY: boolean, size: UtilConst.Sizes) => ({
                overflowY: scrollY ? "auto" : "hidden",
                paddingLeft: UtilStyle.Css_Padding(size),
                paddingRight: UtilStyle.Css_Padding(size),
            }), [propContentScrollY, sizeName], this.getScope()),
            children: propContent == null ? [] : [propContent as any],
        });
        const sidebarDirection = CoreObservable.App.computed(
            (isRtl: boolean) => isRtl ? SidebarDirection.RTL : SidebarDirection.LTR,
            [CoreConfig.Settings.DirectionRtl.observable()],
            this.getScope(),
        );
        const propSidebarToggleHas = CoreObservable.App.computed(
            (hasOpenIcon: boolean, isOpen: boolean) => hasOpenIcon || isOpen,
            [propSidebarHasOpenIcon, propIsOpen],
            this.getScope(),
        );

        this._sidebar = new ComponentSidebarClass({
            prop_sidebarContent: scrollableContent,
            prop_sidebarWidth: propWidth,
            prop_sidebarIsOpen: propIsOpen,
            prop_sidebarDirection: sidebarDirection,
            // Keep the sidebar slide in sync with the page slot width animation.
            prop_sidebarDuration: PAGE_SETTING_TRANSITION_MS,
            prop_sidebarBtnOpenHas: propSidebarToggleHas,
            prop_blurHas: false,
            prop_structureStyles: {
                width: "0px",
                height: "100%",
                overflow: "visible",
            },
        } as any);

        const settingPanel = CoreReactive.App.section({
            attrs: {"data-part-name": "part-page-setting-panel"},
            stylesBind: CoreObservable.App.computed(
                (isOpen: boolean, width: number | string) => ({
                    position: "relative",
                    flex: "0 0 auto",
                    width: isOpen
                        ? (typeof width === "number" ? `${width}px` : String(width || "320px"))
                        : "0px",
                    minWidth: "0",
                    height: "100%",
                    minHeight: "0",
                    overflow: "visible",
                    boxSizing: "border-box",
                    zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.page_setting)),
                    transition: `width ${PAGE_SETTING_TRANSITION_MS}ms ease-in-out`,
                }),
                [propIsOpen, propWidth],
                this.getScope(),
            ),
            children: [this._sidebar.getReactiveElement()],
        });
        this._settingPanel = settingPanel.getElement() as HTMLElement;
        this._settingPanel.setAttribute("data-component-page-setting-panel", "");

        const ownerPlaceholder = CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {display: "none"},
        });
        this._ownerElement = ownerPlaceholder.getElement() as HTMLElement;
        this.observeOwnerLifecycle();
        return ownerPlaceholder;
    }

    private observeOwnerLifecycle(): void {
        if (!this._ownerElement) return;
        this._ownerWasConnected = this._ownerElement.isConnected;
        if (this._ownerWasConnected) this.mountSettingPanel();
        if (typeof MutationObserver === "undefined") {
            this.mountSettingPanel();
            return;
        }
        this._ownerObserver = new MutationObserver(() => {
            if (this._ownerElement?.isConnected) {
                this._ownerWasConnected = true;
                this.mountSettingPanel();
                return;
            }
            if (this._ownerWasConnected) this.dispose();
        });
        this._ownerObserver.observe(document.body, {childList: true, subtree: true});
    }

    private mountSettingPanel(): void {
        const owner = this._ownerElement;
        const panel = this._settingPanel;
        if (!owner || !panel || !owner.isConnected) return;

        const page = owner.closest("component-page") as HTMLElement | null;
        const settingArea = page?.querySelector('[data-part-name="part-page-setting"]') as HTMLElement | null;
        const ownerRoot = super.getElement() as HTMLElement;
        ownerRoot.style.display = "none";
        if (settingArea) {
            if (panel.parentElement !== settingArea) settingArea.appendChild(panel);
            return;
        }

        if (ownerRoot.parentElement && panel.parentElement !== ownerRoot.parentElement) {
            ownerRoot.after(panel);
        }
    }
}
