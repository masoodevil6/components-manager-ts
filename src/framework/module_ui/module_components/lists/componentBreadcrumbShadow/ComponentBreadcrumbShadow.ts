import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UtilShape from "@/util_shapes";
import * as UiIcons from "@/ui_icons";
import {Keys} from "../../../module_categories/languages";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import {ComponentBreadcrumbShadowBase} from "./ComponentBreadcrumbShadowBase";
import {Props, type BreadcrumbShadowItem, type PropsConfigType} from "./Props";
import {Methods, type MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createBreadcrumbShadowStep} from "./Step";

const asCss = (styles: Record<string, string>): string => Object.entries(styles)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value};`).join("");

const getBreadcrumbHeight = (sizeName: any): string => UtilStyle.Css_SizeCalc(
    UtilStyle.Css_Padding(sizeName) as any,
    UtilConst.Operation.ADD,
    UtilStyle.Css_Height(sizeName) as any,
    UtilConst.Operation.ADD,
    UtilStyle.Css_Padding(sizeName) as any,
);

export class ComponentBreadcrumbShadow extends ComponentBreadcrumbShadowBase<ReturnType<typeof createBreadcrumbShadowStep>>{
    private readonly _INSTANCE_CLASS = `component-breadcrumb-shadow-${this._COMPONENT_RANDOM_ID}`;
    private _ROOT_BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _BACK_ICON: InstanceType<typeof ComponentIcon.Component> | null = null;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentBreadcrumbShadow>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createBreadcrumbShadowStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this._ROOT_BORDER?.dispose();
        this._ROOT_BORDER = null;
        this._BACK_ICON = null;
        this.disposeStep();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        const sizeName = CoreObservable.App.computed(
            (override: any, configured: any) => override ?? configured,
            [this._COMPONENT_PROPS_BIND.prop_size, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const borderStyles = CoreObservable.App.computed((size: any) => ({
            display: "block",
            height: "auto",
            paddingTop: UtilStyle.Css_Padding(size),
            paddingBottom: UtilStyle.Css_Padding(size),
            border: "0",
            borderRadius: "0",
        }), [sizeName], this.getScope());
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const hasDivider = this._COMPONENT_PROPS_BIND.prop_hasDivider;
        const dividerColor = `1px solid ${UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)}`;
        const iconBoxStyles = CoreObservable.App.computed((size: any, directionRtl: boolean, showDivider: boolean) => {
            const dimension = getBreadcrumbHeight(size);
            return {
                width: dimension,
                height: dimension,
                flex: "0 0 auto",
                boxSizing: "border-box",
                borderLeft: showDivider && directionRtl ? dividerColor : "0px",
                borderRight: showDivider && !directionRtl ? dividerColor : "0px",
            };
        }, [sizeName, rtl, hasDivider], this.getScope());
        const backPrimaryColor = this._COMPONENT_PROPS_BIND.prop_backIconPrimaryColor;
        const backSecondaryColor = this._COMPONENT_PROPS_BIND.prop_backIconSecondaryColor;
        const backIcon = CoreObservable.App.computed(
            (directionRtl: boolean, primaryColor: string, secondaryColor: string) => UiIcons.CreateIcon(
                directionRtl ? UiIcons.Src.ArrowRight.Definition : UiIcons.Src.ArrowLeft.Definition,
                {primaryColor, secondaryColor},
            ),
            [rtl, backPrimaryColor, backSecondaryColor],
            this.getScope(),
        );
        this._BACK_ICON = new ComponentIcon.Component({
            prop_icon: backIcon as any,
            prop_iconTitle: CoreLanguage.App.translate(Keys.category.components.breadcrumb.backButtonLabel) as any,
            prop_iconStyles: {width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"},
            styles: iconBoxStyles,
            prop_structureStyles: {width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"},
        } as any, {
            CLICK: (event: Event) => this.executeMethod("BACK", event, {}),
        } as any);
        const backIconNode = CoreObservable.App.conditionWhen(
            [this._COMPONENT_PROPS_BIND.prop_hasBtnBack],
            (hasButton: boolean) => hasButton,
            () => this._BACK_ICON!.getReactiveElement(),
            () => null,
            this.getScope(),
        );
        const breadcrumbContent = CoreReactive.App.section({
            styles: {display: "flex", alignItems: "center", width: "100%"},
            children: [
                backIconNode as unknown as CoreReactive.App,
                this.executeSchemaPart(Schemas.BREADCRUMB.part, {}),
            ],
        });
        this._ROOT_BORDER = new ComponentBorder.Component({
            prop_content: breadcrumbContent,
            prop_width: "100%",
            prop_borderClass: [],
            prop_borderStyles: borderStyles,
            prop_borderTopHas: false,
            prop_borderRightHas: false,
            prop_borderBottomHas: false,
            prop_borderLeftHas: false,
            prop_contentBackgroundColor: this._COMPONENT_PROPS_BIND.prop_backgroundColorRoot,
        } as any, {
            CLICK_BORDER: () => {},
        } as any);
        return this._ROOT_BORDER.getReactiveElement() as unknown as CoreReactive.App;
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.BREADCRUMB.part: return this.renderBreadcrumb(attrsDefault, data);
            case Schemas.ROOT.part: return this.renderRoot(attrsDefault, data);
            case Schemas.TITLE.part: return this.renderTitle(attrsDefault, data);
            case Schemas.NAVIGATION.part: return this.renderNavigation(attrsDefault, data);
            case Schemas.NAVIGATION_ITEM.part: return this.renderNavigationItem(attrsDefault, data, extra);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderBreadcrumb(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const sizeOverride = data?.prop_size ?? this._COMPONENT_PROPS_BIND.prop_size;
        const size = CoreObservable.App.computed(
            (override: any, configured: any) => override ?? configured,
            [sizeOverride, CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const styles = CoreObservable.App.computed((sizeName: any) => ({
            flex: "1 1 auto",
            minWidth: "0",
            height: getBreadcrumbHeight(sizeName),
            paddingLeft: UtilStyle.Css_Padding(sizeName),
            paddingRight: UtilStyle.Css_Padding(sizeName),
        }), [size], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: styles,
            children: [this.executeSchemaPart(Schemas.ROOT.part, {})],
        });
    }

    private renderRoot(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const rootStyles = CoreObservable.App.computed(
            (directionRtl: boolean) => ({
                display: "flex", alignItems: "center", direction: directionRtl ? "rtl" : "ltr",
            }),
            [rtl],
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: {...attrs, class: this._INSTANCE_CLASS},
            stylesBind: rootStyles,
            children: [this.executeSchemaPart(Schemas.NAVIGATION.part, {}), this.executeSchemaPart(Schemas.TITLE.part, {})],
        });
    }

    private renderTitle(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const title = data?.prop_pageTitle ?? this._COMPONENT_PROPS_BIND.prop_pageTitle;
        const color = data?.prop_colorHeader ?? this._COMPONENT_PROPS_BIND.prop_colorHeader;
        const width = data?.prop_widthTitle ?? this._COMPONENT_PROPS_BIND.prop_widthTitle;
        const sizeOverride = data?.prop_size ?? this._COMPONENT_PROPS_BIND.prop_size;
        const items = data?.prop_pageNav ?? this._COMPONENT_PROPS_BIND.prop_pageNav;
        const size = CoreObservable.App.computed((override: any, configured: any) => override ?? configured, [sizeOverride, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const titleStyle = CoreObservable.App.computed(
            (textColor: string, titleWidth: string, sizeName: any, navItems: BreadcrumbShadowItem[]) => ({
                flex: "0 1 auto", width: titleWidth || "60%", minWidth: "0", boxSizing: "border-box",
                height: getBreadcrumbHeight(sizeName), lineHeight: getBreadcrumbHeight(sizeName),
                fontSize: UtilStyle.Css_FontSize(sizeName), paddingInline: UtilStyle.Css_Padding(sizeName),
                color: textColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                marginInlineStart: (navItems ?? []).length ? UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(sizeName) as any,
                ) : "0",
            }),
            [color, width, size, items], this.getScope(),
        );
        return CoreReactive.App.b({attrs: {...attrs}, stylesBind: titleStyle, children: [title]});
    }

    private renderNavigation(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const items = data?.prop_pageNav ?? this._COMPONENT_PROPS_BIND.prop_pageNav;
        const hideBelow = data?.prop_hideNavigationBelow ?? this._COMPONENT_PROPS_BIND.prop_hideNavigationBelow;
        const sizeOverride = data?.prop_size ?? this._COMPONENT_PROPS_BIND.prop_size;
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const size = CoreObservable.App.computed((override: any, configured: any) => override ?? configured, [sizeOverride, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const styleRules = CoreObservable.App.computed(
            (list: BreadcrumbShadowItem[], sizeName: any, directionRtl: boolean, breakpoint: number) => {
                const triangleHeight = getBreadcrumbHeight(sizeName);
                const beforeWidth = getBreadcrumbHeight(sizeName);
                const afterWidth = UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(sizeName) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(sizeName) as any,
                );
                const outerDirection = directionRtl ? "left" : "right";
                const triangleDirection = directionRtl ? "left" : "right";
                const rules = [
                    `@media (max-width:${Math.max(0, breakpoint)}px){.${this._INSTANCE_CLASS} [data-part-name='${Schemas.NAVIGATION.part}']{display:none!important;}}`,
                ];
                (list ?? []).forEach((_item, index) => {
                    const selector = `.${this._INSTANCE_CLASS} .${this._INSTANCE_CLASS}-nav-${index}`;
                    const outer = UtilShape.Css.Triangle({
                        direction: triangleDirection as any,
                        width: beforeWidth,
                        height: triangleHeight,
                        color: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
                        position: {top: "50%", [outerDirection]: `calc(0px - ${beforeWidth})`},
                    });
                    const inner = UtilShape.Css.Triangle({
                        direction: triangleDirection as any,
                        width: afterWidth,
                        height: triangleHeight,
                        color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                        position: {top: "50%", [outerDirection]: `calc(0px - ${afterWidth})`},
                    });
                    rules.push(`${selector}::before{${asCss({...outer, transform: "translateY(-50%)", zIndex: "0", pointerEvents: "none"})}}`);
                    rules.push(`${selector}::after{${asCss({...inner, transform: "translateY(-50%)", zIndex: "1", pointerEvents: "none"})}}`);
                });
                return rules.join("\n");
            }, [items, size, rtl, hideBelow], this.getScope(),
        );
        const styleNode = CoreReactive.App.style({children: [styleRules]});
        const navItems = CoreObservable.App.computed(
            (list: BreadcrumbShadowItem[]) => {
                return (list ?? []).filter((item) => !!item && typeof item.name === "string" && item.name.length > 0 && typeof item.title === "string").map((item, index) =>
                    this.executeSchemaPart(Schemas.NAVIGATION_ITEM.part, {item, index, count: list.length}));
            },
            [items], this.getScope(),
        );
        const navStyle = CoreObservable.App.computed(
            (directionRtl: boolean, sizeName: any) => ({
                // Keep the z-indexes used to overlap breadcrumb items inside the
                // navigation row. Without a local stacking context, those item
                // layers can escape the page header and cover higher page overlays.
                position: "relative", zIndex: "0",
                display: "flex", flex: "0 0 auto", alignItems: "stretch", direction: directionRtl ? "rtl" : "ltr",
                height: getBreadcrumbHeight(sizeName), fontSize: UtilStyle.Css_FontSize(sizeName),
            }), [rtl, size], this.getScope(),
        );
        return CoreObservable.App.conditionWhen([items], (list: BreadcrumbShadowItem[]) => (list ?? []).length > 0,
            () => CoreReactive.App.section({attrs: {...attrs}, stylesBind: navStyle, children: [styleNode, navItems as any]}),
            () => null, this.getScope()) as unknown as CoreReactive.App;
    }

    private renderNavigationItem(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: {item: BreadcrumbShadowItem; index: number; count: number}): CoreReactive.App {
        const item = extra?.item;
        const color = data?.prop_colorNav ?? this._COMPONENT_PROPS_BIND.prop_colorNav;
        const background = data?.prop_backgroundColorNav ?? this._COMPONENT_PROPS_BIND.prop_backgroundColorNav;
        const sizeOverride = data?.prop_size ?? this._COMPONENT_PROPS_BIND.prop_size;
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const size = CoreObservable.App.computed((override: any, configured: any) => override ?? configured, [sizeOverride, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const itemStyles = CoreObservable.App.computed(
            (textColor: string, bg: string, sizeName: any, directionRtl: boolean) => {
                const padding = UtilStyle.Css_Padding(sizeName);
                const doublePadding = UtilStyle.Css_SizeCalc(
                    padding as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                );
                const stageHeight = getBreadcrumbHeight(sizeName);
                const nonFirstLeadingPadding = UtilStyle.Css_SizeCalc(
                    padding as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(sizeName) as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                );
                const firstStage = (extra?.index ?? 0) === 0;
                return {
                    position: "relative", display: "block", flex: "0 0 auto", zIndex: String((extra?.count ?? 1) - (extra?.index ?? 0)),
                    height: stageHeight, lineHeight: stageHeight,
                    fontSize: UtilStyle.Css_FontSize(sizeName), color: textColor, backgroundColor: bg,
                    paddingLeft: directionRtl ? padding : firstStage ? doublePadding : nonFirstLeadingPadding,
                    paddingRight: directionRtl ? firstStage ? doublePadding : nonFirstLeadingPadding : padding,
                    whiteSpace: "nowrap", cursor: "pointer", boxSizing: "border-box",
                };
            }, [color, background, size, rtl], this.getScope(),
        );
        return CoreReactive.App.div({
            attrs: {...attrs, role: "button", tabindex: "0", "aria-label": item?.title},
            className: [`${this._INSTANCE_CLASS}-nav-${extra?.index ?? 0}`], stylesBind: itemStyles,
            on: {
                click: (event: Event) => item && this.executeMethod("SELECT_ITEM", event, {NAME: item.name, ITEM: item}),
                keydown: (event: KeyboardEvent) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    if (item) this.executeMethod("SELECT_ITEM", event, {NAME: item.name, ITEM: item});
                },
            },
            children: [item?.title ?? ""],
        });
    }
}
