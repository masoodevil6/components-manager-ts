import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UiIcons from "@/ui_icons";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentIcon from "../componentIcon";
import {ComponentCollapseLineBase} from "./ComponentCollapseLineBase";
import {createCollapseLineStep} from "./Step";
import {Schemas} from "./Schemas";
import {PropsConfigType} from "./Props";
import {MethodsConfigType} from "./Methods";

export class ComponentCollapseLine extends ComponentCollapseLineBase<ReturnType<typeof createCollapseLineStep>>{
    private _ARROW_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentCollapseLine>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createCollapseLineStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        const arrow = this._ARROW_ICON as any;
        arrow?.dispose?.();
        arrow?.disposeStep?.();
        arrow?.getScope?.().dispose();
        this._ARROW_ICON = null;
        this.getScope().dispose();
        this.disposeStep();
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
                return this.renderRoot(attrsDefault, data);
            case Schemas.DIVIDER.part:
                return this.renderDivider(attrsDefault, data);
            case Schemas.LINE_START.part:
                return this.renderLine(attrsDefault, data, true);
            case Schemas.LINE_END.part:
                return this.renderLine(attrsDefault, data, false);
            case Schemas.TITLE.part:
                return this.renderTitle(attrsDefault, data);
            case Schemas.TOGGLE.part:
                return this.renderToggle(attrsDefault, data);
            case Schemas.ARROW.part:
                return this.renderArrow(attrsDefault, data);
            case Schemas.BODY.part:
                return this.renderBody(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const lineClass = data?.["prop_collapseLineClass"] ?? bind.prop_collapseLineClass;
        const lineStyles = data?.["prop_collapseLineStyles"] ?? bind.prop_collapseLineStyles;
        const sizeName = CoreConfig.Settings.SizeName.observable();

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [lineClass as any],
            stylesBind: CoreObservable.App.computed(
                (styles: Record<string, string> | null, currentSizeName: any) => ({
                    width: "auto",
                    marginRight: UtilStyle.Css_Margin(currentSizeName),
                    marginLeft: UtilStyle.Css_Margin(currentSizeName),
                    ...(styles ?? {}),
                }),
                [lineStyles, sizeName],
                this.getScope(),
            ),
            children: [
                this.executeSchemaPart(Schemas.DIVIDER.part, {}),
                this.executeSchemaPart(Schemas.BODY.part, {}),
            ],
        });
    }

    private renderDivider(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const title = data?.["prop_collapseLineTitle"] ?? bind.prop_collapseLineTitle;
        const canCollapse = data?.["prop_collapseLineCanCollapse"] ?? bind.prop_collapseLineCanCollapse;
        const body = data?.["prop_collapseLineBody"] ?? bind.prop_collapseLineBody;
        const isCenter = data?.["prop_isCenter"] ?? bind.prop_isCenter;
        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const isInteractive = CoreObservable.App.computed(
            (enabled: boolean, content: unknown) => Boolean(enabled && content != null),
            [canCollapse, body],
            this.getScope(),
        );
        const gap = CoreObservable.App.computed(
            (text: string | null, interactive: boolean) => text?.trim() || interactive ? "0.75rem" : "0px",
            [title, isInteractive],
            this.getScope(),
        );

        return CoreReactive.App.div({
            attrs: {...attrsDefault},
            stylesBind: CoreObservable.App.computed(
                (currentGap: string, centered: boolean, rtl: boolean) => ({
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    gap: currentGap,
                    ...(centered ? {} : {direction: rtl ? "rtl" : "ltr"}),
                }),
                [gap, isCenter, directionRtl],
                this.getScope(),
            ),
            children: [
                this.executeSchemaPart(Schemas.LINE_START.part, {}),
                this.executeSchemaPart(Schemas.TITLE.part, {}),
                this.executeSchemaPart(Schemas.TOGGLE.part, {}),
                this.executeSchemaPart(Schemas.LINE_END.part, {}),
            ],
        });
    }

    private renderLine(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        isLineStart: boolean,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const color = data?.["prop_lineBackground"] ?? bind.prop_lineBackground;
        const thickness = data?.["prop_collapseLineThickness"] ?? bind.prop_collapseLineThickness;
        const isCenter = data?.["prop_isCenter"] ?? bind.prop_isCenter;
        const lineStyles = CoreObservable.App.computed(
            (lineColor: string | null, lineThickness: string | number, centered: boolean) => ({
                display: "block",
                flex: centered || !isLineStart ? "1 1 auto" : "0 0 0",
                minWidth: "0",
                height: typeof lineThickness === "number" ? `${lineThickness}px` : lineThickness,
                backgroundColor: lineColor ?? "transparent",
            }),
            [color, thickness, isCenter],
            this.getScope(),
        );

        return CoreReactive.App.span({
            attrs: {...attrsDefault, role: "separator", "aria-orientation": "horizontal"},
            stylesBind: lineStyles,
        });
    }

    private renderTitle(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const title = data?.["prop_collapseLineTitle"] ?? bind.prop_collapseLineTitle;
        const titleClass = data?.["prop_collapseLineTitleClass"] ?? bind.prop_collapseLineTitleClass;
        const titleStyles = data?.["prop_collapseLineTitleStyles"] ?? bind.prop_collapseLineTitleStyles;
        const canCollapse = data?.["prop_collapseLineCanCollapse"] ?? bind.prop_collapseLineCanCollapse;
        const body = data?.["prop_collapseLineBody"] ?? bind.prop_collapseLineBody;
        const isInteractive = CoreObservable.App.computed(
            (enabled: boolean, content: unknown) => Boolean(enabled && content != null),
            [canCollapse, body],
            this.getScope(),
        );
        const titleDisplay = CoreObservable.App.computed(
            (text: string | null, interactive: boolean) => text?.trim() && !interactive ? "inline-flex" : "none",
            [title, isInteractive],
            this.getScope(),
        );

        return CoreReactive.App.span({
            attrs: {...attrsDefault},
            attrsBind: {
                "aria-hidden": CoreObservable.App.computed((display: string) => String(display === "none"), [titleDisplay], this.getScope()),
            },
            classBind: [titleClass as any],
            stylesBind: CoreObservable.App.computed(
                (styles: Record<string, string> | null, display: string) => ({
                    ...(styles ?? {}),
                    display,
                    flex: "0 0 auto",
                    whiteSpace: "nowrap",
                }),
                [titleStyles, titleDisplay],
                this.getScope(),
            ),
            children: [title as any],
        });
    }

    private renderToggle(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const canCollapse = data?.["prop_collapseLineCanCollapse"] ?? bind.prop_collapseLineCanCollapse;
        const body = data?.["prop_collapseLineBody"] ?? bind.prop_collapseLineBody;
        const title = data?.["prop_collapseLineTitle"] ?? bind.prop_collapseLineTitle;
        const isOpen = data?.["prop_collapseLineBodyIsOpen"] ?? bind.prop_collapseLineBodyIsOpen;
        const titleClass = data?.["prop_collapseLineTitleClass"] ?? bind.prop_collapseLineTitleClass;
        const titleStyles = data?.["prop_collapseLineTitleStyles"] ?? bind.prop_collapseLineTitleStyles;
        const isInteractive = CoreObservable.App.computed(
            (enabled: boolean, content: unknown) => Boolean(enabled && content != null),
            [canCollapse, body],
            this.getScope(),
        );
        const display = CoreObservable.App.computed(
            (interactive: boolean) => interactive ? "inline-flex" : "none",
            [isInteractive],
            this.getScope(),
        );
        const ariaLabel = CoreObservable.App.computed(
            (text: string | null, fallback: string) => text?.trim() || fallback,
            [title, CoreLanguage.App.translate(Keys.category.components.collapseLine.texts.toggle)],
            this.getScope(),
        );
        const ariaExpanded = CoreObservable.App.computed(
            (open: boolean) => String(Boolean(open)),
            [isOpen],
            this.getScope(),
        );

        return CoreReactive.App.button({
            attrs: {...attrsDefault, type: "button"},
            attrsBind: {"aria-expanded": ariaExpanded, "aria-label": ariaLabel},
            classBind: [titleClass as any],
            stylesBind: CoreObservable.App.computed(
                (styles: Record<string, string> | null, currentDisplay: string) => ({
                    ...(styles ?? {}),
                    display: currentDisplay,
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "0",
                    padding: "0",
                    background: "transparent",
                    color: "inherit",
                    cursor: "pointer",
                    flex: "0 0 auto",
                    whiteSpace: "nowrap",
                }),
                [titleStyles, display],
                this.getScope(),
            ),
            unique: this._COMPONENT_STEP?.click,
            emit: () => ({value: Boolean(isOpen.get()), valid: true}),
            on: {
                click: (event: Event) => this.toggleBody(event),
            },
            children: [
                title as any,
                this.executeSchemaPart(Schemas.ARROW.part, {}),
            ],
        });
    }

    private renderArrow(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const isOpen = data?.["prop_collapseLineBodyIsOpen"] ?? bind.prop_collapseLineBodyIsOpen;
        const lineBackground = data?.["prop_lineBackground"] ?? bind.prop_lineBackground;
        const arrowClass = data?.["prop_collapseLineArrowClass"] ?? bind.prop_collapseLineArrowClass;
        const arrowStyles = data?.["prop_collapseLineArrowStyles"] ?? bind.prop_collapseLineArrowStyles;

        if (!this._ARROW_ICON) {
            const icon = CoreObservable.App.computed(
                (open: boolean, color: string | null) => UiIcons.CreateIcon(
                    open ? UiIcons.Src.ArrowChevronUp.Definition : UiIcons.Src.ArrowChevronDown.Definition,
                    {
                        primaryColor: color ?? "transparent",
                        secondaryColor: color ?? "transparent",
                    },
                ),
                [isOpen, lineBackground],
                this.getScope(),
            );
            this._ARROW_ICON = new ComponentIcon.Component({
                prop_icon: icon,
                prop_iconClass: arrowClass,
                prop_iconStyles: CoreObservable.App.computed(
                    (styles: Record<string, string> | null) => ({width: "1rem", height: "1rem", flexShrink: "0", ...(styles ?? {})}),
                    [arrowStyles],
                    this.getScope(),
                ),
            } as any, {});
        }

        return CoreReactive.App.span({
            attrs: {...attrsDefault, "aria-hidden": "true"},
            children: [this._ARROW_ICON.getReactiveElement() as CoreReactive.App],
        });
    }

    private renderBody(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const body = data?.["prop_collapseLineBody"] ?? bind.prop_collapseLineBody;
        const canCollapse = data?.["prop_collapseLineCanCollapse"] ?? bind.prop_collapseLineCanCollapse;
        const isOpen = data?.["prop_collapseLineBodyIsOpen"] ?? bind.prop_collapseLineBodyIsOpen;
        const bodyClass = data?.["prop_collapseLineBodyClass"] ?? bind.prop_collapseLineBodyClass;
        const bodyStyles = data?.["prop_collapseLineBodyStyles"] ?? bind.prop_collapseLineBodyStyles;
        const display = CoreObservable.App.computed(
            (content: unknown, collapsible: boolean, open: boolean) => {
                if (content == null) return "none";
                return !collapsible || open ? "block" : "none";
            },
            [body, canCollapse, isOpen],
            this.getScope(),
        );
        const styles = CoreObservable.App.computed(
            (custom: Record<string, string> | null, currentDisplay: string) => ({...(custom ?? {}), display: currentDisplay}),
            [bodyStyles, display],
            this.getScope(),
        );
        const content = CoreObservable.App.computed(
            (value: unknown) => this.normalizeContent(value),
            [body],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [bodyClass as any],
            stylesBind: styles,
            children: [content as any],
        });
    }

    private toggleBody(event: Event): void {
        const canCollapse = this.get("prop_collapseLineCanCollapse") as boolean;
        const body = this.get("prop_collapseLineBody");
        if (!canCollapse || body == null) return;

        const next = !Boolean(this.get("prop_collapseLineBodyIsOpen"));
        this.set("prop_collapseLineBodyIsOpen", next);
        this.executeMethod("CLICK", event, {});
    }

    private normalizeContent(content: any): any {
        if (content == null || content === false) return null;
        if (Array.isArray(content)) return content.map((item) => this.normalizeContent(item));
        if (typeof content === "string" || typeof content === "number") return String(content);
        if (typeof HTMLElement !== "undefined" && content instanceof HTMLElement) return content;
        if (content instanceof CoreReactive.App) return content;
        if (typeof content?.getReactiveElement === "function") return content.getReactiveElement();
        if (typeof content?.getElement === "function") return content.getElement();
        if (CoreObservable.App.isObservable(content)) {
            return content.map((value: any) => this.normalizeContent(value), this.getScope());
        }
        return null;
    }
}
