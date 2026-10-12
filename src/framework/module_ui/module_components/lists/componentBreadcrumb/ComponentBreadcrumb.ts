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
import * as ComponentButton from "../componentButton";
import {ButtonSemantic, ButtonVariants} from "../componentButton/Props";
import {ComponentBreadcrumbBase} from "./ComponentBreadcrumbBase";
import {Props, type BreadcrumbItem, type PropsType, type PropsConfigType} from "./Props";
import {Methods, type MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createBreadcrumbStep} from "./Step";

const asCss = (style: Record<string, string>): string => Object.entries(style)
    .map(([name, value]) => `${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value};`)
    .join("");

export class ComponentBreadcrumb extends ComponentBreadcrumbBase {
    private _BACK_BUTTON: InstanceType<typeof ComponentButton.Component> | null = null;
    private readonly _INSTANCE_CLASS = `component-breadcrumb-${this._COMPONENT_RANDOM_ID}`;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentBreadcrumb>,
        identity?: {
            unique?: any;
            emit?: any;
            events?: Record<string, any> | null;
        },
    ) {
        super(identity, createBreadcrumbStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this._BACK_BUTTON?.dispose();
        this._BACK_BUTTON = null;
        this.disposeStep();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.SCROLLER.part, {});
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
            case Schemas.SCROLLER.part:
                return this.renderScroller(attrsDefault);
            case Schemas.BACK_BUTTON.part:
                return this.renderBackButton(attrsDefault, data);
            case Schemas.BREADCRUMBS.part:
                return this.renderBreadcrumbs(attrsDefault, data);
            case Schemas.BREADCRUMB_ITEM.part:
                return this.renderBreadcrumbItem(attrsDefault, data, extra);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderScroller(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: [this._INSTANCE_CLASS, "w-100", "position-relative"],
            children: [
                this.executeSchemaPart(Schemas.BACK_BUTTON.part, {}),
                this.executeSchemaPart(Schemas.BREADCRUMBS.part, {}),
            ],
        });
    }

    private renderBackButton(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const showButton = data?.["prop_showBtn"] ?? this._COMPONENT_PROPS_BIND.prop_showBtn;
        return CoreObservable.App.conditionWhen(
            [showButton],
            (show: boolean) => show,
            () => {
                this._BACK_BUTTON?.dispose();
                const isRtl = CoreConfig.Settings.DirectionRtl.observable();
                const icon = CoreObservable.App.computed(
                    (rtl: boolean) => rtl ? UiIcons.Src.ArrowRight.Definition : UiIcons.Src.ArrowLeft.Definition,
                    [isRtl],
                    this.getScope(),
                );
                const sizeName = CoreConfig.Settings.SizeName.observable();
                const buttonSize = CoreObservable.App.computed(
                    (size: any) => UtilStyle.Css_SizeCalc(
                        UtilStyle.Css_Padding(size) as any,
                        UtilConst.Operation.ADD,
                        UtilStyle.Css_Height(size) as any,
                        UtilConst.Operation.ADD,
                        UtilStyle.Css_Padding(size) as any,
                    ),
                    [sizeName],
                    this.getScope(),
                );
                this._BACK_BUTTON = new ComponentButton.Component({
                    prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.breadcrumb.backButtonLabel) as any,
                    prop_btnTitleStyles: {display: "none"},
                    prop_btnVariant: ButtonVariants.ICON,
                    prop_btnSemantic: ButtonSemantic.BACK,
                    prop_btnIcon: icon as any,
                    prop_btnWidth: buttonSize as any,
                    prop_btnHeight: buttonSize as any,
                    prop_btnStyles: {
                        position: "absolute",
                        insetInlineStart: "0",
                        top: "0",
                        border: "0",
                        zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_btn)),
                    },
                } as any, {
                    CLICK: (event: Event) => this.executeMethod("BACK", event, {
                        STEP_SELECTED: this._COMPONENT_PROPS_BIND.prop_stepSelected.get(),
                    }),
                } as any);
                return this._BACK_BUTTON.getReactiveElement() as unknown as CoreReactive.App;
            },
            () => null,
            this.getScope(),
        ) as unknown as CoreReactive.App;
    }

    private renderBreadcrumbs(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const breadcrumbs = data?.["prop_breadcrumbs"] ?? bind.prop_breadcrumbs;
        const selected = data?.["prop_stepSelected"] ?? bind.prop_stepSelected;
        const inactiveBackground = data?.["prop_unactiveBreadcrumb"] ?? bind.prop_unactiveBreadcrumb;
        const inactiveColor = data?.["prop_colorUnactive"] ?? bind.prop_colorUnactive;
        const activeBackground = data?.["prop_activeBreadcrumb"] ?? bind.prop_activeBreadcrumb;
        const activeColor = data?.["prop_colorActive"] ?? bind.prop_colorActive;
        const showBackButton = data?.["prop_showBtn"] ?? bind.prop_showBtn;
        const isRtl = CoreConfig.Settings.DirectionRtl.observable();
        const sizeName = CoreConfig.Settings.SizeName.observable();

        const triangleRules = CoreObservable.App.computed(
            (items: Array<BreadcrumbItem | null>, step: string | number | null, inactive: string, active: string, rtl: boolean, size: any) =>
                this.createTriangleRules(items ?? [], step, inactive, active, rtl, size),
            [breadcrumbs, selected, inactiveBackground, activeBackground, isRtl, sizeName],
            this.getScope(),
        );
        const styleElement = CoreReactive.App.style({children: [triangleRules]});
        const itemElements = CoreObservable.App.computed(
            (items: Array<BreadcrumbItem | null>) => (items ?? []).map((item, index, list) =>
                this.executeSchemaPart(Schemas.BREADCRUMB_ITEM.part, {item, index, length: list.length}),
            ),
            [breadcrumbs],
            this.getScope(),
        );
        const itemsPosition = CoreObservable.App.computed(
            (showButton: boolean, size: any, rtl: boolean) => {
                if (!showButton) return {width: "100%", marginLeft: "0", marginRight: "0", direction: rtl ? "rtl" : "ltr"};
                const padding = UtilStyle.Css_Padding(size);
                const buttonHeight = UtilStyle.Css_Height(size);
                const gap = UtilStyle.Css_Margin(size);
                const offset = UtilStyle.Css_SizeCalc(
                    padding as any,
                    UtilConst.Operation.ADD,
                    buttonHeight as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                    UtilConst.Operation.ADD,
                    gap as any,
                );
                return {
                    width: UtilStyle.Css_SizeCalc("100%" as any, UtilConst.Operation.MINUS, offset as any),
                    marginLeft: rtl ? "0" : offset,
                    marginRight: rtl ? offset : "0",
                    direction: rtl ? "rtl" : "ltr",
                };
            },
            [showBackButton, sizeName, isRtl],
            this.getScope(),
        );

        return CoreReactive.App.section({
            attrs: {...attrsDefault, id: `${this._INSTANCE_CLASS}-items`, role: "list"},
            className: ["d-flex", "w-100"],
            styles: {overflowX: "auto", overflowY: "hidden", whiteSpace: "nowrap", alignItems: "stretch"},
            stylesBind: itemsPosition,
            children: [styleElement, itemElements as any],
        });
    }

    private renderBreadcrumbItem(
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: {item: BreadcrumbItem | null; index: number; length: number},
    ): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const item = extra?.item ?? null;
        const index = extra?.index ?? 0;
        const length = extra?.length ?? 0;
        const selected = data?.["prop_stepSelected"] ?? bind.prop_stepSelected;
        const inactiveBackground = data?.["prop_unactiveBreadcrumb"] ?? bind.prop_unactiveBreadcrumb;
        const inactiveColor = data?.["prop_colorUnactive"] ?? bind.prop_colorUnactive;
        const activeBackground = data?.["prop_activeBreadcrumb"] ?? bind.prop_activeBreadcrumb;
        const activeColor = data?.["prop_colorActive"] ?? bind.prop_colorActive;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const isRtl = CoreConfig.Settings.DirectionRtl.observable();

        const itemStyles = CoreObservable.App.computed(
            (step: string | number | null, inactiveBg: string, inactiveText: string, activeBg: string, activeText: string, size: any, rtl: boolean) => {
                const padding = UtilStyle.Css_Padding(size);
                const itemHeight = UtilStyle.Css_SizeCalc(
                    padding as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                    UtilConst.Operation.ADD,
                    padding as any,
                );
                // Leave room for the preceding chevron on every step after the first.
                const leadingPadding = index === 0 ? padding : itemHeight;
                const radius = UtilStyle.Css_BorderRadius(size);
                const borderRadius = index === 0
                    ? (rtl ? `0 ${radius} ${radius} 0` : `${radius} 0 0 ${radius}`)
                    : index === length - 1
                        ? (rtl ? `${radius} 0 0 ${radius}` : `0 ${radius} ${radius} 0`)
                        : "0";
                return {
                    appearance: "none",
                    position: "relative",
                    display: "block",
                    flex: "0 0 auto",
                    boxSizing: "border-box",
                    overflow: "visible",
                    border: "0",
                    borderRadius,
                    height: itemHeight,
                    lineHeight: itemHeight,
                    paddingLeft: rtl ? padding : leadingPadding,
                    paddingRight: rtl ? leadingPadding : padding,
                    margin: "0",
                    font: "inherit",
                    whiteSpace: "nowrap",
                    cursor: item ? "pointer" : "default",
                    zIndex: String(length - index + 1),
                    backgroundColor: step === item?.id ? activeBg : inactiveBg,
                    color: step === item?.id ? activeText : inactiveText,
                };
            },
            [selected, inactiveBackground, inactiveColor, activeBackground, activeColor, sizeName, isRtl],
            this.getScope(),
        );

        return CoreReactive.App.button({
            attrs: {...attrsDefault, type: "button", role: "listitem"},
            attrsBind: {
                "aria-current": CoreObservable.App.computed(
                    (step: string | number | null) => step === item?.id ? "step" : "false",
                    [selected],
                    this.getScope(),
                ),
            },
            className: [`${this._INSTANCE_CLASS}-item`, `${this._INSTANCE_CLASS}-item-${index}`],
            stylesBind: itemStyles,
            on: {
                click: (event: Event) => this.executeMethod("SELECT_BREADCRUMB", event, {ITEM: item}),
            },
            children: [CoreReactive.App.span({styles: {position: "relative", zIndex: "2"}, children: [item?.title || "---"]})],
        });
    }

    private createTriangleRules(
        items: Array<BreadcrumbItem | null>,
        selected: string | number | null,
        inactiveBackground: string,
        activeBackground: string,
        isRtl: boolean,
        sizeName: any,
    ): string {
        const width = UtilStyle.Css_Height(sizeName);
        const height = UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(sizeName) as any,
            UtilConst.Operation.ADD,
            width as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(sizeName) as any,
        );
        const spacer = UtilStyle.Css_BorderWidth(sizeName);
        const direction = isRtl ? "left" : "right";
        const side = isRtl ? "left" : "right";
        const listSelector = `#${this._INSTANCE_CLASS}-items`;
        const rules: string[] = [];

        items.forEach((item, index) => {
            if (index >= items.length - 1) return;
            const background = selected === item?.id ? activeBackground : inactiveBackground;
            const after = UtilShape.Css_Triangle({
                direction,
                width,
                height,
                color: background,
                position: {top: "0", [side]: `calc(0px - ${width})`},
            });
            const before = UtilShape.Css_Triangle({
                direction,
                width,
                height,
                color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                position: {top: "0", [side]: `calc(0px - ${width} - ${spacer})`},
            });
            const selector = `${listSelector} .${this._INSTANCE_CLASS}-item-${index}`;
            rules.push(`${selector}::before{${asCss({...before, zIndex: "0", pointerEvents: "none"})}}`);
            rules.push(`${selector}::after{${asCss({...after, zIndex: "1", pointerEvents: "none"})}}`);
        });
        return rules.join("\n");
    }
}
