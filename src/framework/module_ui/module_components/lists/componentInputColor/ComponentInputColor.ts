import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputColorBase} from "./ComponentInputColorBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {Keys} from "../../../module_categories/languages";
import {createInputColorStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentIcon from "../componentIcon";
import * as ComponentFloatMenu from "../componentFloatMenu";
import * as ComponentValidate from "../componentValidate";
import * as ComponentSelectCustomSimple from "../componentSelectCustomSimple";
import * as ComponentButton from "../componentButton";
import {ButtonAction, ButtonSemantic} from "../componentButton/Props";

type Child = {dispose?: () => void; disposeStep?: () => void};
type DragMode = "sl" | "hue" | "opacity" | null;

export class ComponentInputColor extends ComponentInputColorBase {
    private readonly _VALUE = new CoreObservable.App<string | null>(null);
    private readonly _EMPTY = new CoreObservable.App(true);
    private readonly _HUE = new CoreObservable.App(0);
    private readonly _SAT = new CoreObservable.App(100);
    private readonly _LIGHT = new CoreObservable.App(50);
    private readonly _ALPHA = new CoreObservable.App(1);
    private readonly _FORMAT = new CoreObservable.App("HEX");
    private readonly _FORMAT_PARTS = [0, 1, 2, 3].map(() => new CoreObservable.App(""));
    private readonly _RECENT_COLORS = new CoreObservable.App<string[]>([]);
    private readonly _IS_OPEN = new CoreObservable.App(false);
    private _OPENING_VALUE: string | null = null;
    private _OPENING_ALPHA = 1;
    private _PICKER_WAS_OPEN = false;
    private _PICKER_CONFIRMED = false;
    private readonly _CHILDREN: Child[] = [];
    private _FLOAT_MENU: InstanceType<typeof ComponentFloatMenu.Component> | null = null;
    private _UNSUBSCRIBE: Array<() => void> = [];
    private _INITIALIZED = false;
    private _DISPOSED = false;
    private _DRAG: DragMode = null;
    private _RECENT_COLOR_TIMER: number | null = null;
    private _SL_CANVAS: HTMLCanvasElement | null = null;
    private _HUE_CANVAS: HTMLCanvasElement | null = null;
    private _ALPHA_CANVAS: HTMLCanvasElement | null = null;
    private _SL_MARKER: HTMLElement | null = null;
    private _HUE_MARKER: HTMLElement | null = null;
    private _ALPHA_MARKER: HTMLElement | null = null;
    private readonly _MOVE = (event: PointerEvent) => this.movePointer(event);
    private readonly _UP = () => {
        this._DRAG = null;
    };

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputColor>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputColorStep());
        this._IS_OPEN.subscribe((isOpen) => {
            if (isOpen) {
                this._OPENING_VALUE = this._VALUE.get();
                this._OPENING_ALPHA = this._ALPHA.get();
                this._PICKER_WAS_OPEN = true;
                this._PICKER_CONFIRMED = false;
                requestAnimationFrame(() => this.drawAll());
            } else {
                this._DRAG = null;
                if (this._PICKER_WAS_OPEN && !this._PICKER_CONFIRMED) this.restorePickerSelection();
                this._PICKER_WAS_OPEN = false;
                this._PICKER_CONFIRMED = false;
            }
        }, this.getScope());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        if (this._RECENT_COLOR_TIMER !== null) window.clearTimeout(this._RECENT_COLOR_TIMER);
        this._UNSUBSCRIBE.forEach((unsubscribe) => unsubscribe());
        window.removeEventListener("pointermove", this._MOVE);
        window.removeEventListener("pointerup", this._UP);
        window.removeEventListener("pointercancel", this._UP);
        this._FLOAT_MENU?.dispose();
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [
            this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
            this.executeSchemaPart(Schemas.FORM.part, {}),
            this.executeSchemaPart(Schemas.VALIDATE.part, {}),
        ]});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.SWATCH.part: return this.renderSwatch(attrsDefault, data);
            case Schemas.TITLE.part: return this.renderTitle(attrsDefault, data);
            case Schemas.ICON_EMPTY.part: return this.renderEmptyIcon(attrsDefault, data);
            case Schemas.ICON_CLEAR.part: return this.renderClearIcon(attrsDefault, data);
            case Schemas.PICKER.part: return this.renderPicker(attrsDefault, data);
            case Schemas.SL_AREA.part: return this.renderSlArea(attrsDefault, data);
            case Schemas.HUE.part: return this.renderHue(attrsDefault, data);
            case Schemas.OPACITY.part: return this.renderOpacity(attrsDefault, data);
            case Schemas.INFO_HEX.part: return this.renderInfoHex(attrsDefault, data);
            case Schemas.INFO_OPACITY.part: return this.renderInfoOpacity(attrsDefault, data);
            case Schemas.INFO_FORMATS.part: return this.renderInfoFormats(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLabel(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const shown = data?.prop_labelShow ?? bind.prop_labelShow;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const description = data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
        return CoreObservable.App.conditionWhen([shown, title, description], (show, value, tip) => !!show && (!!value || !!tip), () => {
            const props: Record<string, any> = {};
            for (const key of Object.keys(ComponentLabelTrait.props)) props[key] = data?.[key] ?? bind[key];
            props.classList = ["d-block"];
            props.styles = CoreObservable.App.computed((custom: Record<string, string>, size: any) => ({
                ...(custom ?? {}),
                marginBlockEnd: UtilStyle.Css_Margin(size),
            }), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const child = ComponentLabelTrait.createLabel(props, {});
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        this.initialize(data);
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const panelWidth = data?.prop_optionWidth ?? bind.prop_optionWidth;
        const panelBackground = data?.prop_backgroundColorBody ?? bind.prop_backgroundColorBody;
        const panelColor = data?.prop_colorBody ?? bind.prop_colorBody;
        const panelStyles = data?.prop_optionStyles ?? bind.prop_optionStyles;
        const panelOuterWidth = CoreObservable.App.computed((width: number, size: any) => {
            const contentWidth = Math.max(1, Number(width) || 250);
            const padding = UtilStyle.Css_Padding(size);
            return `min(calc(${contentWidth}px + ${padding} + ${padding}), calc(100vw - 16px))`;
        }, [panelWidth, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const floatMenuLayoutStyles = {width: "100%", minWidth: "0", flex: "1 1 auto"};
        this._FLOAT_MENU = new ComponentFloatMenu.Component({
            classList: ["position-relative", "d-inline-block"],
            styles: floatMenuLayoutStyles,
            prop_structureStyles: {width: "100%", minWidth: "0"},
            prop_selectorContent: CoreReactive.App.section({
                className: ["d-flex", "align-items-center", "cursor-pointer"],
                on: {click: () => requestAnimationFrame(() => this.drawAll())},
                children: [this.executeSchemaPart(Schemas.SWATCH.part, {}), this.executeSchemaPart(Schemas.TITLE.part, {})],
            }),
            prop_selectorShowType: ComponentFloatMenu.ShowTypes.CLICK,
            prop_floatContent: this.executeSchemaPart(Schemas.PICKER.part, {}) as any,
            prop_floatDirectionType: ComponentFloatMenu.DirectionTypes.BOTTOM,
            prop_floatArrowWidth: 0,
            prop_floatDistance: 0,
            prop_floatWidth: panelOuterWidth,
            prop_floatMinWidth: panelOuterWidth,
            prop_floatBorderWidth: CoreConfig.Settings.SizeName.observable(),
            prop_floatBorderColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_floatBorderRadius: CoreConfig.Settings.SizeName.observable(),
            prop_floatBackground: panelBackground as any,
            prop_floatColor: panelColor as any,
            prop_floatShowControlWithSelf: false,
            prop_floatIsShow: this._IS_OPEN,
            prop_floatStyles: CoreObservable.App.computed((custom: Record<string, string>) => ({
                ...(custom ?? {}),
            }), [panelStyles], this.getScope()),
        } as any, {} as any);
        this._CHILDREN.push(this._FLOAT_MENU as any);
        const formStyles = CoreObservable.App.computed((isDisabled: boolean) => ({
            display: "flex",
            width: "100%",
            alignItems: "center",
            position: "relative",
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? "0.65" : "1",
        }), [disabled], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            className: ["d-flex", "align-items-center", "w-100"],
            stylesBind: formStyles,
            children: [this._FLOAT_MENU.getReactiveElement() as CoreReactive.App, this.executeSchemaPart(Schemas.ICON_CLEAR.part, {})],
        });
    }

    private renderSwatch(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const dimension = CoreObservable.App.computed((size: any) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ), [sizeName], this.getScope());
        const styles = CoreObservable.App.computed((empty: boolean, color: string, border: string, isDisabled: boolean, box: string, custom: Record<string, string>, size: any) => ({
            width: box,
            height: box,
            boxSizing: "border-box",
            border: UtilStyle.Css_BorderWidth(size) + " solid " + border,
            borderRadius: UtilStyle.Css_BorderRadius(size),
            backgroundColor: empty ? "transparent" : color,
            opacity: isDisabled ? "0.65" : "1",
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
            ...(custom ?? {}),
        }), [this._EMPTY, this.preview(), data?.prop_borderColor ?? bind.prop_borderColor, data?.prop_isDisable ?? bind.prop_isDisable, dimension, data?.prop_formStyles ?? bind.prop_formStyles, sizeName], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            className: ["position-relative", "cursor-pointer"],
            classBind: [data?.prop_formClass ?? bind.prop_formClass],
            stylesBind: styles,
            children: [this.executeSchemaPart(Schemas.ICON_EMPTY.part, {})],
        });
    }

    private renderTitle(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const show = data?.prop_showTitleFront ?? this._COMPONENT_PROPS_BIND.prop_showTitleFront;
        const color = CoreObservable.App.computed((format: string, value: string | null, empty: boolean, hue: number, sat: number, light: number, alpha: number) => {
            if (empty) return "";
            const [red, green, blue] = this.hslToRgb(hue, sat, light);
            const opacity = Number(alpha.toFixed(2));
            switch (format) {
                case "RGB": return `rgb(${red}, ${green}, ${blue})`;
                case "RGBA": return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
                case "HSL": return `hsl(${Math.round(hue)}, ${Math.round(sat)}%, ${Math.round(light)}%)`;
                case "HSLA": return `hsla(${Math.round(hue)}, ${Math.round(sat)}%, ${Math.round(light)}%, ${opacity})`;
                default: return value ?? "";
            }
        }, [this._FORMAT, this._VALUE, this._EMPTY, this._HUE, this._SAT, this._LIGHT, this._ALPHA], this.getScope());
        const lineHeight = CoreObservable.App.computed((size: any) => UtilStyle.Css_Height(size), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        return CoreObservable.App.conditionWhen([show], (visible) => !!visible, () => CoreReactive.App.section({
            attrs: {...attrs},
            className: ["mx-2", "text-truncate"],
            stylesBind: {lineHeight},
            children: [color],
        }), () => CoreReactive.App.section({attrs: {...attrs}}), this.getScope()) as any;
    }

    private renderEmptyIcon(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.conditionWhen([this._EMPTY], (empty) => !!empty, () => {
            const color = CoreObservable.App.computed((custom: string | null) => custom || UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1), [data?.prop_colorIconEmpty ?? bind.prop_colorIconEmpty], this.getScope());
            const icon = new ComponentIcon.Component({
                attrs: {...attrs},
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.InputColorEmpty.Definition, {size: CoreConfig.Settings.SizeName.observable() as any, primaryColor: color as any}),
                prop_iconStyles: {pointerEvents: "none"},
            } as any, {} as any);
            this._CHILDREN.push(icon as any);
            return icon.getReactiveElement() as CoreReactive.App;
        }, () => CoreReactive.App.section({attrs: {...attrs}}), this.getScope()) as any;
    }

    private renderClearIcon(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([disabled, this._EMPTY], (isDisabled, empty) => !isDisabled && !empty, () => {
            const color = CoreObservable.App.computed((custom: string | null) => custom || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [data?.prop_colorIconClear ?? bind.prop_colorIconClear], this.getScope());
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const iconBoxSize = CoreObservable.App.computed((size: any) => UtilStyle.Css_SizeCalc(
                UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                UtilStyle.Css_Padding(size) as any,
            ), [sizeName], this.getScope());
            const icon = new ComponentIcon.Component({
                attrs: {...attrs},
                classList: ["ms-2", "cursor-pointer"],
                styles: CoreObservable.App.computed((boxSize: string) => ({width: boxSize, height: boxSize, flex: "0 0 auto"}), [iconBoxSize], this.getScope()) as any,
                prop_structureStyles: {width: "100%", height: "100%"},
                prop_icon: UiIcons.CreateIcon(UiIcons.Src.FileClearBroom.Definition, {size: CoreConfig.Settings.SizeName.observable() as any, primaryColor: color as any}),
                prop_iconStyles: {cursor: "pointer"},
            } as any, {CLICK: (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                if (!disabled.get()) this.clearColor(event);
            }} as any);
            this._CHILDREN.push(icon as any);
            return icon.getReactiveElement() as CoreReactive.App;
        }, () => CoreReactive.App.section({attrs: {...attrs}}), this.getScope()) as any;
    }

    private renderPicker(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const width = CoreObservable.App.computed((v: number) => Math.max(1, Number(v) || 250) + "px", [data?.prop_optionWidth ?? this._COMPONENT_PROPS_BIND.prop_optionWidth], this.getScope());
        const styles = CoreObservable.App.computed((w: string, bg: string, fg: string, size: any) => ({
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            minWidth: "0",
            minHeight: "min-content",
            boxSizing: "border-box",
            padding: UtilStyle.Css_Padding(size),
            backgroundColor: bg,
            color: fg,
        }), [width, data?.prop_backgroundColorBody ?? this._COMPONENT_PROPS_BIND.prop_backgroundColorBody, data?.prop_colorBody ?? this._COMPONENT_PROPS_BIND.prop_colorBody, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const picker = CoreReactive.App.section({
            attrs: {...attrs},
            className: ["d-flex", "flex-column", "align-items-stretch", "w-100"],
            stylesBind: CoreObservable.App.computed((base: Record<string, string>) => ({...base, display: "flex", flexDirection: "column", alignItems: "stretch", width: "100%"}), [styles], this.getScope()),
            children: [
            CoreReactive.App.section({className: ["d-flex", "align-items-start", "gap-2"], children: [this.executeSchemaPart(Schemas.SL_AREA.part, {}), this.executeSchemaPart(Schemas.HUE.part, {})]}),
            CoreReactive.App.section({className: ["d-flex", "align-items-center", "w-100"], styles: {minWidth: "0", width: "100%"}, children: [
                this.executeSchemaPart(Schemas.OPACITY.part, {}),
            ]}),
            CoreReactive.App.section({className: ["d-flex", "align-items-center", "w-100"], styles: {minWidth: "0", width: "100%"}, children: [
            this.executeSchemaPart(Schemas.INFO_FORMATS.part, {}),
            ]}),
            this.renderRecentColors(),
            this.renderPickerFooter(),
        ]});
        requestAnimationFrame(() => this.drawAll());
        return picker;
    }

    private renderPickerFooter(): CoreReactive.App {
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const gap = CoreObservable.App.computed((size: any) => UtilStyle.Css_Margin(size), [sizeName], this.getScope());
        const confirm = new ComponentButton.Component({
            prop_btnType: ButtonAction.BUTTON,
            prop_btnSemantic: ButtonSemantic.PRIMARY,
            prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.inputColor.schemas.confirm) as any,
            styles: {width: "50%", flex: "1 1 0", minWidth: "0"},
            prop_btnStyles: {width: "100%"},
        } as any, {CLICK: (event: Event) => this.confirmPickerSelection(event)} as any);
        const cancel = new ComponentButton.Component({
            prop_btnType: ButtonAction.BUTTON,
            prop_btnSemantic: ButtonSemantic.BACK,
            prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.inputColor.schemas.cancel) as any,
            styles: {width: "50%", flex: "1 1 0", minWidth: "0"},
            prop_btnStyles: {width: "100%"},
        } as any, {CLICK: (event: Event) => this.cancelPickerSelection(event)} as any);
        this._CHILDREN.push(confirm as any, cancel as any);
        return CoreReactive.App.section({
            className: ["d-flex", "align-items-center", "w-100"],
            stylesBind: CoreObservable.App.computed((margin: string) => ({display: "flex", width: "100%", gap: margin, marginTop: margin}), [gap], this.getScope()),
            children: [confirm.getReactiveElement(), cancel.getReactiveElement()],
        });
    }

    private confirmPickerSelection(event: Event): void {
        const color = this._EMPTY.get() ? "" : this._VALUE.get() ?? "";
        const original = this._OPENING_VALUE ?? "";
        this._PICKER_CONFIRMED = true;
        this.set("prop_value", color || null);
        this.set("prop_colorSelected", color || null);
        if (color) this.rememberRecentColor(color);
        if (original !== color) this.executeMethod("CHANGE", event, {COLOR: color} as any);
        this._IS_OPEN.set(false);
    }

    private cancelPickerSelection(_event: Event): void {
        this.restorePickerSelection();
        this._PICKER_CONFIRMED = false;
        this._IS_OPEN.set(false);
    }

    private restorePickerSelection(): void {
        this.syncValue(this._OPENING_VALUE);
        this._ALPHA.set(this._OPENING_ALPHA);
        this.syncFormatParts();
        this.drawAll();
    }

    private renderRecentColors(): CoreReactive.App {
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const recentHeight = CoreObservable.App.computed((size: any) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ), [sizeName], this.getScope());
        const swatchHeight = CoreObservable.App.computed((size: any) => UtilStyle.Css_Height(size), [sizeName], this.getScope());
        const recentMarginTop = CoreObservable.App.computed((size: any) => UtilStyle.Css_Margin(size), [sizeName], this.getScope());
        const recentPaddingTop = CoreObservable.App.computed((size: any) => UtilStyle.Css_Padding(size), [sizeName], this.getScope());
        const recentLabel = CoreLanguage.App.translate(Keys.category.components.inputColor.schemas.recent);
        const recentColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        const recentBorder = CoreObservable.App.computed((size: any) => UtilStyle.Css_BorderWidth(size), [sizeName], this.getScope());
        const recentStyles = CoreObservable.App.computed((height: string, borderWidth: string, paddingTop: string, padding: string, rtl: boolean) => ({
            display: "flex",
            width: "100%",
            flex: "0 0 auto",
            alignItems: "center",
            boxSizing: "border-box",
            gap: "6px",
            minWidth: "0",
            height,
            minHeight: height,
            maxHeight: height,
            paddingTop,
            paddingRight: rtl ? "0" : padding,
            paddingLeft: rtl ? padding : "0",
            overflow: "hidden",
            color: recentColor,
            direction: rtl ? "rtl" : "ltr",
        }), [recentHeight, recentBorder, recentPaddingTop, CoreObservable.App.computed((size: any) => UtilStyle.Css_Padding(size), [sizeName], this.getScope()), directionRtl], this.getScope());
        const labelStyles = CoreObservable.App.computed((rtl: boolean) => ({fontSize: "0.72rem", width: "25%", flex: "0 0 25%", minWidth: "0", direction: rtl ? "rtl" : "ltr"}), [directionRtl], this.getScope());
        const themeFamilies = ["primary", "secondary", "error", "warning", "info", "success", "shadow", "dark", "shan"];
        const themeLabel = CoreLanguage.App.translate(Keys.category.components.inputColor.schemas.themeColors);
        const themeHeight = CoreObservable.App.computed((height: string) => `calc(${height} * 5 + 12px)`, [swatchHeight], this.getScope());
        const themeStyles = CoreObservable.App.computed((height: string, padding: string, rtl: boolean) => ({
            display: "flex",
            width: "100%",
            flex: "0 0 auto",
            alignItems: "center",
            boxSizing: "border-box",
            gap: "6px",
            minWidth: "0",
            height: "auto",
            minHeight: "0",
            maxHeight: "none",
            paddingRight: rtl ? "0" : padding,
            paddingLeft: rtl ? padding : "0",
            overflow: "visible",
            color: recentColor,
            direction: rtl ? "rtl" : "ltr",
        }), [themeHeight, CoreObservable.App.computed((size: any) => UtilStyle.Css_Padding(size), [sizeName], this.getScope()), directionRtl], this.getScope());
        const themeColumns = themeFamilies.map((family) => {
            const familyStyles = CoreObservable.App.computed((rtl: boolean) => ({
                display: "flex", flexDirection: "column", flex: "1 1 0", minWidth: "0", gap: "3px",
                alignItems: "stretch", direction: rtl ? "rtl" : "ltr",
            }), [directionRtl], this.getScope());
            const colors = [1, 2, 3, 4, 5].map((grade) => {
                const cssVariable = `--${family}Color${grade}`;
                const color = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim() || "transparent";
                const button = CoreReactive.App.button({
                    attrs: {type: "button", title: cssVariable, "aria-label": cssVariable},
                    styles: {
                        width: "100%", height: swatchHeight.get(), maxHeight: swatchHeight.get(), padding: "0",
                        flex: "0 0 auto", minWidth: "0", alignSelf: "stretch", boxSizing: "border-box", cursor: "pointer",
                        backgroundColor: `var(${cssVariable})`,
                        border: UtilStyle.Css_BorderWidth(sizeName.get()) + " solid " + UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                        borderRadius: UtilStyle.Css_BorderRadius(sizeName.get()),
                    },
                    on: {click: (event: Event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.selectRecentColor(color, event);
                    }},
                });
                sizeName.subscribe((size: any) => {
                    const height = UtilStyle.Css_Height(size);
                    const element = button.getElement();
                    element.style.height = height;
                    element.style.maxHeight = height;
                    element.style.border = UtilStyle.Css_BorderWidth(size) + " solid " + UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
                    element.style.borderRadius = UtilStyle.Css_BorderRadius(size);
                }, this.getScope());
                return button;
            });
            return CoreReactive.App.section({
                className: ["d-flex", "flex-column"],
                stylesBind: familyStyles,
                children: colors,
            });
        });
        const renderPaletteRow = (label: CoreObservable.App<string>, swatches: CoreReactive.App[]) => CoreReactive.App.section({
            className: ["d-flex", "align-items-center", "w-100"],
            stylesBind: recentStyles,
            children: [
                CoreReactive.App.b({stylesBind: labelStyles, children: [label]}),
                CoreReactive.App.section({
                    className: ["d-flex", "align-items-center"],
                    styles: {width: "75%", flex: "0 0 75%", minWidth: "0", display: "flex", gap: "4px", overflow: "hidden", boxSizing: "border-box"},
                    children: swatches,
                }),
            ],
        });
        const swatches = Array.from({length: 9}, (_, index) => {
            const button = CoreReactive.App.button({
                attrs: {type: "button", title: "Select recent color", "aria-label": "Select recent color"},
                styles: {
                    display: "none",
                    width: "100%",
                    height: swatchHeight.get(),
                    maxHeight: swatchHeight.get(),
                    padding: "0",
                    flex: "1 1 0",
                    alignSelf: "center",
                    boxSizing: "border-box",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: UtilStyle.Css_BorderWidth(sizeName.get()) + " solid " + UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                    borderRadius: UtilStyle.Css_BorderRadius(sizeName.get()),
                },
                on: {click: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.selectRecentColor(this._RECENT_COLORS.get()[index], event);
                }},
            });
            const element = button.getElement();
            const update = (colors: string[]) => {
                const value = colors[index] ?? "";
                element.style.display = value ? "block" : "none";
                element.style.backgroundColor = value || "transparent";
            };
            update(this._RECENT_COLORS.get());
            this._RECENT_COLORS.subscribe(update, this.getScope());
            sizeName.subscribe((size: any) => {
                const height = UtilStyle.Css_Height(size);
                element.style.height = height;
                element.style.maxHeight = height;
                element.style.border = UtilStyle.Css_BorderWidth(size) + " solid " + UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
                element.style.borderRadius = UtilStyle.Css_BorderRadius(size);
            }, this.getScope());
            return button;
        });
        const themePalette = CoreReactive.App.section({
            className: ["d-flex", "align-items-center", "w-100"],
            stylesBind: themeStyles,
            children: [
                CoreReactive.App.b({stylesBind: labelStyles, children: [themeLabel]}),
                CoreReactive.App.section({
                    className: ["d-flex", "align-items-center"],
                    styles: {width: "75%", flex: "0 0 75%", minWidth: "0", display: "flex", alignItems: "flex-start", gap: "4px", boxSizing: "border-box"},
                    children: themeColumns,
                }),
            ],
        });
        const recentPalette = renderPaletteRow(recentLabel, swatches);
        const paletteMarginTop = CoreObservable.App.computed((size: any) => UtilStyle.Css_Margin(size), [sizeName], this.getScope());
        return CoreReactive.App.section({
            className: ["d-flex", "flex-column", "w-100"],
            stylesBind: CoreObservable.App.computed((marginTop: string) => ({display: "flex", flexDirection: "column", width: "100%", gap: "4px", marginTop}), [paletteMarginTop], this.getScope()),
            children: [recentPalette, themePalette],
        });
    }

    private readRecentColors(): string[] {
        try {
            const stored = window.localStorage.getItem("component-manager:component-input-color:recent-colors:v1");
            if (!stored) return [];
            const values: unknown = JSON.parse(stored);
            if (!Array.isArray(values)) return [];
            return [...new Set(values.map((value) => this.normalizeHex(value)).filter((value): value is string => !!value))].slice(0, 9);
        } catch {
            return [];
        }
    }

    private rememberRecentColor(value: unknown): void {
        const color = this.normalizeHex(value);
        if (!color) return;
        if (this._RECENT_COLOR_TIMER !== null) {
            window.clearTimeout(this._RECENT_COLOR_TIMER);
            this._RECENT_COLOR_TIMER = null;
        }
        const colors = [color, ...this._RECENT_COLORS.get().filter((recent) => recent !== color)].slice(0, 9);
        this._RECENT_COLORS.set(colors);
        try {
            window.localStorage.setItem("component-manager:component-input-color:recent-colors:v1", JSON.stringify(colors));
        } catch {
            // Keep the in-memory recent list when browser storage is unavailable.
        }
    }

    private selectRecentColor(value: unknown, event: Event): void {
        const color = this.normalizeHex(value);
        if (!color) return;
        const [hue, sat, light] = this.hexToHsl(color);
        const previous = this._VALUE.get();
        this._HUE.set(hue);
        this._SAT.set(sat);
        this._LIGHT.set(light);
        this._ALPHA.set(1);
        this._VALUE.set(color);
        this._EMPTY.set(false);
        this.syncFormatParts();
        if (!this._IS_OPEN.get()) {
            this.set("prop_value", color);
            this.set("prop_colorSelected", color);
        }
        this.drawAll();
        if (!this._IS_OPEN.get()) {
            this.rememberRecentColor(color);
            if (previous !== color) this.executeMethod("CHANGE", event, {COLOR: color} as any);
        }
    }

    private renderSlArea(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const size = Math.max(80, Math.round(this.number(data?.prop_optionWidth ?? this._COMPONENT_PROPS_BIND.prop_optionWidth, 250) * 0.7));
        const height = Math.max(80, Math.round(this.number(data?.prop_optionWidth ?? this._COMPONENT_PROPS_BIND.prop_optionWidth, 250) * 0.7));
        const canvas = this.makeCanvas(size, height, "component-input-color-sl", "sl");
        const radius = CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_BorderRadius(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        canvas.style.borderRadius = radius.get();
        radius.subscribe((value) => { canvas.style.borderRadius = value; }, this.getScope());
        this._SL_CANVAS = canvas;
        const marker = document.createElement("div");
        marker.style.cssText = "position:absolute;width:18px;height:18px;border:2px solid white;border-radius:50%;box-shadow:0 0 2px #111;transform:translate(-50%,-50%);pointer-events:none;";
        this._SL_MARKER = marker;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        return CoreReactive.App.section({attrs: {...attrs}, styles: {position: "relative", width: `min(${size}px, calc(100% - 38px))`, height: height + "px", minWidth: "0", flex: "1 1 auto"}, stylesBind: this.getColorControlRadiusStyles(), children: [canvas, marker]});
    }

    private renderHue(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const height = Math.max(80, Math.round(this.number(data?.prop_optionWidth ?? this._COMPONENT_PROPS_BIND.prop_optionWidth, 250) * 0.7));
        const canvas = this.makeCanvas(20, height, "component-input-color-hue", "hue");
        const radius = CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_BorderRadius(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        canvas.style.borderRadius = radius.get();
        radius.subscribe((value) => { canvas.style.borderRadius = value; }, this.getScope());
        this._HUE_CANVAS = canvas;
        const marker = document.createElement("div");
        marker.style.cssText = "position:absolute;left:50%;width:28px;height:10px;border:2px solid white;border-radius:8px;box-shadow:0 0 2px #111;transform:translate(-50%,-50%);pointer-events:none;";
        this._HUE_MARKER = marker;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        return CoreReactive.App.section({attrs: {...attrs}, styles: {position: "relative", width: "30px", height: height + "px", flex: "0 0 30px"}, stylesBind: this.getColorControlRadiusStyles(), children: [canvas, marker]});
    }

    private renderOpacity(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const width = Math.max(80, Math.round(this.number(data?.prop_optionWidth ?? this._COMPONENT_PROPS_BIND.prop_optionWidth, 250)));
        const canvas = this.makeCanvas(width, 20, "component-input-color-opacity", "opacity");
        const radius = CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_BorderRadius(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        canvas.style.borderRadius = radius.get();
        radius.subscribe((value) => { canvas.style.borderRadius = value; }, this.getScope());
        this._ALPHA_CANVAS = canvas;
        const marker = document.createElement("div");
        marker.style.cssText = "position:absolute;top:50%;width:20px;height:20px;box-sizing:border-box;border:3px solid white;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,.5),0 1px 3px rgba(0,0,0,.3);transform:translate(-50%,-50%);pointer-events:none;transition:left 90ms ease-out,background-color 120ms ease-out;";
        this._ALPHA_MARKER = marker;
        canvas.style.width = "100%";
        canvas.style.height = "12px";
        canvas.style.position = "absolute";
        canvas.style.top = "50%";
        canvas.style.transform = "translateY(-50%)";
        return CoreReactive.App.section({attrs: {...attrs}, className: ["d-block", "w-100"], styles: {position: "relative", width: "100%", flex: "0 0 100%", height: "30px", minWidth: "0"}, stylesBind: this.getColorControlRadiusStyles(), children: [canvas, marker]});
    }

    private renderInfoHex(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const value = CoreObservable.App.computed((hex: string | null, empty: boolean) => empty ? "" : (hex ?? ""), [this._VALUE, this._EMPTY], this.getScope());
        const copy = () => {
            const hex = value.get();
            if (hex && navigator.clipboard) void navigator.clipboard.writeText(hex).catch(() => undefined);
        };
        return CoreReactive.App.section({attrs: {...attrs}, className: ["cursor-pointer"], stylesBind: {color: data?.prop_colorBody ?? this._COMPONENT_PROPS_BIND.prop_colorBody}, on: {click: copy}, children: [
            CoreReactive.App.b({children: ["Hex"]}),
            CoreReactive.App.div({children: [value]}),
        ]});
    }

    private renderInfoOpacity(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const value = CoreObservable.App.computed((alpha: number) => Math.round(alpha * 100) + "%", [this._ALPHA], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, stylesBind: {color: data?.prop_colorBody ?? this._COMPONENT_PROPS_BIND.prop_colorBody}, children: [
            CoreReactive.App.b({children: ["Opacity"]}),
            CoreReactive.App.div({children: [value]}),
        ]});
    }

    private renderInfoFormats(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const formats = ["HEX", "RGB", "RGBA", "HSL", "HSLA"];
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const isRtl = CoreConfig.Settings.DirectionRtl.observable();
        const selectLayoutStyles = CoreObservable.App.computed((rtl: boolean) => ({
            width: "35%",
            flex: "0 0 35%",
            order: rtl ? "0" : "1",
            minWidth: "0",
        }), [isRtl], this.getScope());
        const valueLayoutStyles = CoreObservable.App.computed((rtl: boolean) => ({
            width: "65%",
            flex: "0 0 65%",
            order: rtl ? "1" : "0",
            minWidth: "0",
            boxSizing: "border-box",
        }), [isRtl], this.getScope());
        const formatStyles = CoreObservable.App.computed((size: any) => ({
            borderRadius: "0",
            backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
            color: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        }), [sizeName], this.getScope());
        const formatSelect = new ComponentSelectCustomSimple.Component({
            styles: selectLayoutStyles as any,
            prop_selectValue: this._FORMAT as any,
            prop_selectPlaceholder: "HEX",
            prop_selectTypeShow: ComponentSelectCustomSimple.SelectTypeShow.JUST_NAME,
            prop_selectOptions: formats.map((format) => ({id: format, name: format, prefix: format})),
            prop_selectStyles: CoreObservable.App.computed((size: any, rtl: boolean) => ({
                fontSize: "0.68rem",
                fontWeight: "700",
                paddingTop: "0",
                paddingBottom: "0",
                paddingRight: rtl ? UtilStyle.Css_Padding(size) : "0",
                paddingLeft: rtl ? "0" : UtilStyle.Css_Padding(size),
                minHeight: "24px",
            }), [sizeName, isRtl], this.getScope()) as any,
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            SELECT_CHANGE: (_event, _dataArgs, componentArgs) => {
                this._FORMAT.set(String(componentArgs.VALUE));
                this.syncFormatParts();
            },
        } as any);
        this._CHILDREN.push(formatSelect as any);
        this.syncFormatParts();
        const inputStyles = CoreObservable.App.computed((size: any) => ({
            width: "100%", minWidth: "0", boxSizing: "border-box", fontFamily: "monospace", fontSize: "0.68rem", textAlign: "center",
            paddingRight: UtilStyle.Css_Padding(size), paddingLeft: UtilStyle.Css_Padding(size),
            borderWidth: UtilStyle.Css_BorderWidth(size), borderStyle: "solid",
            borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            borderRadius: UtilStyle.Css_BorderRadius(size),
            backgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            color: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        }), [sizeName], this.getScope());
        const fieldStyles = [
            CoreObservable.App.computed((format: string) => ({display: "block", width: format === "HEX" ? "100%" : "auto", flex: format === "HEX" ? "1 1 auto" : "1 1 0", minWidth: "0"}), [this._FORMAT], this.getScope()),
            ...[1, 2, 3].map((index) => CoreObservable.App.computed((format: string) => ({
                display: (format === "RGB" || format === "RGBA" || format === "HSL" || format === "HSLA") && index < (format.endsWith("A") ? 4 : 3) ? "block" : "none",
                width: "20%", flex: "1 1 0", minWidth: "0",
            }), [this._FORMAT], this.getScope())),
        ];
        const inputs = this._FORMAT_PARTS.map((part, index) => {
            return CoreReactive.App.input({
                attrs: {type: "text", inputmode: "decimal", autocomplete: "off", spellcheck: "false", "aria-label": `${this._FORMAT.get()} color channel ${index + 1}`},
                propsBind: {value: part},
                stylesBind: CoreObservable.App.computed((field: Record<string, string>, base: Record<string, string>) => ({...base, ...field}), [fieldStyles[index], inputStyles], this.getScope()),
                on: {
                    input: (event: Event) => this.applyFormatPart(index, (event.currentTarget as HTMLInputElement).value, event),
                    blur: () => {
                        this.syncFormatParts();
                    },
                },
            } as any);
        });
        const token = (visible: CoreObservable.App<string>, show: (format: string) => boolean = () => true) => CoreReactive.App.span({
            stylesBind: CoreObservable.App.computed((format: string) => ({display: show(format) ? "inline" : "none", fontFamily: "monospace", fontSize: "0.7rem", whiteSpace: "pre", flex: "0 0 auto"}), [this._FORMAT], this.getScope()),
            children: [visible],
        });
        const prefix = CoreObservable.App.computed((format: string) => format === "HEX" ? "#" : format.toLowerCase() + "(", [this._FORMAT], this.getScope());
        const separator1 = CoreObservable.App.computed(() => ", ", [this._FORMAT], this.getScope());
        const separator2 = CoreObservable.App.computed((format: string) => format.startsWith("H") ? "%, " : ", ", [this._FORMAT], this.getScope());
        const alphaSeparator = CoreObservable.App.computed((format: string) => format.endsWith("A") ? ", " : "", [this._FORMAT], this.getScope());
        const suffix = CoreObservable.App.computed((format: string) => format === "HEX" ? "" : (format.startsWith("H") ? "%)" : ")"), [this._FORMAT], this.getScope());
        const fieldRow = CoreReactive.App.section({
            className: ["d-flex", "align-items-center"],
            styles: {gap: "2px", width: "65%", minWidth: "0", order: "0", boxSizing: "border-box"},
            stylesBind: valueLayoutStyles,
            children: [token(prefix), inputs[0],
                token(separator1, (format) => format !== "HEX"), inputs[1],
                token(separator2, (format) => format !== "HEX"), inputs[2],
                token(CoreObservable.App.computed(() => "%", [this._FORMAT], this.getScope()), (format) => format.startsWith("H")),
                token(alphaSeparator, (format) => format.endsWith("A")), inputs[3], token(suffix, (format) => format !== "HEX")],
        });
        return CoreReactive.App.section({
            attrs: {...attrs},
            className: ["d-flex", "flex-row", "align-items-center", "w-100"],
            styles: {position: "relative", zIndex: "1", overflow: "visible", minWidth: "0", width: "100%", flex: "0 0 100%", boxSizing: "border-box", padding: "3px 6px", border: "1px solid rgba(127,127,127,.28)", borderRadius: "0", lineHeight: "1.2"},
            stylesBind: formatStyles,
            children: [formatSelect.getReactiveElement() as CoreReactive.App, fieldRow],
        });
    }

    private renderValidate(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([enabled, rules, disabled], (hasRules, list, isDisabled) => !!hasRules && !isDisabled && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({
                prop_listRules: rules as any,
                prop_msgRules: (data?.prop_msgRules ?? bind.prop_msgRules) as any,
                prop_isAbsolute: (data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule) as any,
                prop_title: CoreObservable.App.computed((custom: string | null, label: string | null) => custom || label || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: this._VALUE as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private initialize(data: Record<string, CoreObservable.App<any>>): void {
        if (this._INITIALIZED) return;
        this._INITIALIZED = true;
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        const alias = data?.prop_colorSelected ?? bind.prop_colorSelected;
        this._RECENT_COLORS.set(this.readRecentColors());
        this.syncValue(value.get() !== null ? value.get() : alias.get());
        const watch = (source: CoreObservable.App<any>, isAlias: boolean) => {
            if (!CoreObservable.App.isObservable(source)) return;
            this._UNSUBSCRIBE.push(source.subscribe((next: any) => {
                if (isAlias && value.get() !== null) return;
                this.syncValue(next);
            }, this.getScope()));
        };
        watch(value, false);
        watch(alias, true);
        window.addEventListener("pointermove", this._MOVE);
        window.addEventListener("pointerup", this._UP);
        window.addEventListener("pointercancel", this._UP);
    }

    private syncValue(value: unknown): void {
        const hex = this.normalizeHex(value);
        this._VALUE.set(hex);
        this._EMPTY.set(!hex);
        if (!hex) { this.syncFormatParts(); return; }
        const [h, s, l] = this.hexToHsl(hex);
        this._HUE.set(h);
        this._SAT.set(s);
        this._LIGHT.set(l);
        this.syncFormatParts();
        this.drawAll();
    }

    private clearColor(event: Event): void {
        this._VALUE.set("");
        this._EMPTY.set(true);
        this.syncFormatParts();
        this.set("prop_value", "");
        this.set("prop_colorSelected", "");
        this.executeMethod("CHANGE", event, {COLOR: ""} as any);
    }

    private commitHsl(event?: Event): void {
        const hex = this.hslToHex(this._HUE.get(), this._SAT.get(), this._LIGHT.get());
        if (hex === this._VALUE.get() && !this._EMPTY.get()) return;
        this._VALUE.set(hex);
        this._EMPTY.set(false);
        this.syncFormatParts();
        if (!this._IS_OPEN.get()) {
            this.set("prop_value", hex);
            this.set("prop_colorSelected", hex);
            this.scheduleRecentColor(hex);
            this.executeMethod("CHANGE", event ?? new Event("change"), {COLOR: hex} as any);
        }
    }

    private scheduleRecentColor(value: unknown): void {
        if (this._IS_OPEN.get()) return;
        if (this._RECENT_COLOR_TIMER !== null) window.clearTimeout(this._RECENT_COLOR_TIMER);
        this._RECENT_COLOR_TIMER = window.setTimeout(() => {
            this._RECENT_COLOR_TIMER = null;
            this.rememberRecentColor(value);
        }, 250);
    }

    private syncFormatParts(): void {
        if (this._EMPTY.get()) {
            this._FORMAT_PARTS.forEach((part) => part.set(""));
            return;
        }
        const format = this._FORMAT.get();
        const values = format === "HEX"
            ? [this.hslToHex(this._HUE.get(), this._SAT.get(), this._LIGHT.get()).slice(1), "", "", ""]
            : format.startsWith("H")
                ? [String(Math.round(this._HUE.get())), String(Math.round(this._SAT.get())), String(Math.round(this._LIGHT.get())), String(Number(this._ALPHA.get().toFixed(2)))]
                : [...this.hslToRgb(this._HUE.get(), this._SAT.get(), this._LIGHT.get()).map(String), String(Number(this._ALPHA.get().toFixed(2)))];
        this._FORMAT_PARTS.forEach((part, index) => part.set(values[index] ?? ""));
    }

    private applyFormatPart(index: number, rawValue: string, event: Event): void {
        this._FORMAT_PARTS[index].set(rawValue);
        const format = this._FORMAT.get();
        let source: string;
        if (format === "HEX") source = "#" + rawValue;
        else if (format.startsWith("H")) source = `${format.toLowerCase()}(${this._FORMAT_PARTS[0].get()}, ${this._FORMAT_PARTS[1].get()}%, ${this._FORMAT_PARTS[2].get()}%${format.endsWith("A") ? `, ${this._FORMAT_PARTS[3].get()}` : ""})`;
        else source = `${format.toLowerCase()}(${this._FORMAT_PARTS[0].get()}, ${this._FORMAT_PARTS[1].get()}, ${this._FORMAT_PARTS[2].get()}${format.endsWith("A") ? `, ${this._FORMAT_PARTS[3].get()}` : ""})`;
        const parsed = this.parseColorInput(source);
        if (!parsed) return;
        const previous = this._VALUE.get();
        this._HUE.set(parsed.hue);
        this._SAT.set(parsed.sat);
        this._LIGHT.set(parsed.light);
        this._ALPHA.set(parsed.alpha);
        this._VALUE.set(parsed.hex);
        this._EMPTY.set(false);
        this.syncFormatParts();
        if (!this._IS_OPEN.get()) {
            this.set("prop_value", parsed.hex);
            this.set("prop_colorSelected", parsed.hex);
            this.scheduleRecentColor(parsed.hex);
        }
        this.drawAll();
        if (!this._IS_OPEN.get() && previous !== parsed.hex) this.executeMethod("CHANGE", event, {COLOR: parsed.hex} as any);
    }

    private parseColorInput(text: string): {hex: string; hue: number; sat: number; light: number; alpha: number} | null {
        const hexText = text.startsWith("#") ? text.slice(1) : text;
        if (/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hexText)) {
            const hex = this.normalizeHex(text);
            if (!hex) return null;
            const [hue, sat, light] = this.hexToHsl(hex);
            return {hex, hue, sat, light, alpha: 1};
        }
        const match = text.match(/^(rgba?|hsla?)\((.*)\)$/i);
        if (!match) return null;
        const kind = match[1].toLowerCase();
        const parts = match[2].trim().split(/[\s,/]+/).filter(Boolean);
        const expectsHsl = kind.startsWith("hsl");
        if (parts.length !== (kind.endsWith("a") ? 4 : 3)) return null;
        const nums = parts.map((part) => Number.parseFloat(part));
        if (nums.some((number) => !Number.isFinite(number))) return null;
        let alpha = 1;
        if (parts.length === 4) {
            alpha = parts[3].endsWith("%") ? nums[3] / 100 : nums[3];
            if (alpha < 0 || alpha > 1) return null;
        }
        let hue: number, sat: number, light: number;
        if (expectsHsl) {
            if (!parts[1].endsWith("%") || !parts[2].endsWith("%") || nums[1] < 0 || nums[1] > 100 || nums[2] < 0 || nums[2] > 100) return null;
            hue = ((nums[0] % 360) + 360) % 360;
            sat = nums[1]; light = nums[2];
        } else {
            const channels = nums.slice(0, 3).map((number, index) => parts[index].endsWith("%") ? number * 2.55 : number);
            if (channels.some((number) => number < 0 || number > 255)) return null;
            [hue, sat, light] = this.rgbToHsl(channels[0], channels[1], channels[2]);
        }
        return {hex: this.hslToHex(hue, sat, light), hue, sat, light, alpha};
    }

    private rgbToHsl(red: number, green: number, blue: number): [number, number, number] {
        const r = red / 255, g = green / 255, b = blue / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
        let hue = 0, saturation = 0;
        const light = (max + min) / 2;
        if (delta) {
            saturation = delta / (1 - Math.abs(2 * light - 1));
            if (max === r) hue = ((g - b) / delta) % 6;
            else if (max === g) hue = (b - r) / delta + 2;
            else hue = (r - g) / delta + 4;
            hue *= 60;
            if (hue < 0) hue += 360;
        }
        return [hue, saturation * 100, light * 100];
    }

    private makeCanvas(width: number, height: number, name: string, mode: Exclude<DragMode, null>): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.className = name;
        canvas.width = width;
        canvas.height = height;
        canvas.style.display = "block";
        canvas.style.cursor = "crosshair";
        canvas.style.touchAction = "none";
        canvas.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            this._DRAG = mode;
            this.movePointer(event);
        });
        return canvas;
    }

    private movePointer(event: PointerEvent): void {
        if (!this._DRAG) return;
        const canvas = this._DRAG === "sl" ? this._SL_CANVAS : this._DRAG === "hue" ? this._HUE_CANVAS : this._ALPHA_CANVAS;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        if (this._DRAG === "sl") {
            this._SAT.set(x * 100);
            this._LIGHT.set((1 - y) * 100);
            this.markSl();
            this.drawOpacity();
            this.commitHsl(event);
        } else if (this._DRAG === "hue") {
            this._HUE.set(y * 360);
            this.markHue();
            this.drawSl();
            this.drawOpacity();
            this.commitHsl(event);
        } else {
            this._ALPHA.set(x);
            this.markAlpha();
            this.drawOpacity();
            this.syncFormatParts();
        }
    }

    private drawAll(): void {
        this.drawHue();
        this.drawSl();
        this.drawOpacity();
        this.markSl();
        this.markHue();
        this.markAlpha();
    }

    private drawHue(): void {
        const canvas = this._HUE_CANVAS;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        [0, 60, 120, 180, 240, 300, 360].forEach((h, i) => gradient.addColorStop(i / 6, "hsl(" + h + ",100%,50%)"));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    private drawSl(): void {
        const canvas = this._SL_CANVAS;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const image = ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const rgb = this.hslToRgb(this._HUE.get(), x / canvas.width * 100, 100 - y / canvas.height * 100);
                const index = (y * canvas.width + x) * 4;
                image.data[index] = rgb[0];
                image.data[index + 1] = rgb[1];
                image.data[index + 2] = rgb[2];
                image.data[index + 3] = 255;
            }
        }
        ctx.putImageData(image, 0, 0);
    }

    private drawOpacity(): void {
        const canvas = this._ALPHA_CANVAS;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const rgb = this.hslToRgb(this._HUE.get(), this._SAT.get(), this._LIGHT.get());
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "rgb(255,255,255)");
        gradient.addColorStop(1, "rgb(" + rgb.join(",") + ")");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    private markSl(): void {
        if (!this._SL_MARKER) return;
        this._SL_MARKER.style.left = this._SAT.get() + "%";
        this._SL_MARKER.style.top = (100 - this._LIGHT.get()) + "%";
    }

    private markHue(): void {
        if (this._HUE_MARKER) this._HUE_MARKER.style.top = (this._HUE.get() / 360 * 100) + "%";
    }

    private markAlpha(): void {
        if (!this._ALPHA_MARKER) return;
        const rgb = this.hslToRgb(this._HUE.get(), this._SAT.get(), this._LIGHT.get());
        this._ALPHA_MARKER.style.left = (this._ALPHA.get() * 100) + "%";
        this._ALPHA_MARKER.style.backgroundColor = "rgb(" + rgb.join(",") + ")";
    }

    private preview(): CoreObservable.App<string> {
        return CoreObservable.App.computed((empty: boolean, hue: number, sat: number, light: number, alpha: number) => {
            if (empty) return "transparent";
            const rgb = this.hslToRgb(hue, sat, light);
            return "rgba(" + rgb.join(",") + "," + alpha + ")";
        }, [this._EMPTY, this._HUE, this._SAT, this._LIGHT, this._ALPHA], this.getScope());
    }

    private getColorControlRadiusStyles(): CoreObservable.App<Record<string, string>> {
        return CoreObservable.App.computed((sizeName: any) => ({
            borderRadius: UtilStyle.Css_BorderRadius(sizeName),
        }), [CoreConfig.Settings.SizeName.observable()], this.getScope());
    }

    private normalizeHex(value: unknown): string | null {
        if (typeof value !== "string") return null;
        const text = value.trim();
        if (/^#[0-9a-f]{6}$/i.test(text)) return text.toLowerCase();
        if (/^#[0-9a-f]{3}$/i.test(text)) return "#" + text.slice(1).split("").map((c) => c + c).join("").toLowerCase();
        if (/^[0-9a-f]{6}$/i.test(text)) return "#" + text.toLowerCase();
        return null;
    }

    private hexToHsl(hex: string): [number, number, number] {
        const n = parseInt(hex.slice(1), 16);
        const r = ((n >> 16) & 255) / 255;
        const g = ((n >> 8) & 255) / 255;
        const b = (n & 255) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
            else if (max === g) h = (b - r) / d + 2;
            else h = (r - g) / d + 4;
            h *= 60;
        }
        return [h, s * 100, l * 100];
    }

    private hslToRgb(h: number, s: number, l: number): [number, number, number] {
        s /= 100;
        l /= 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }

    private hslToHex(h: number, s: number, l: number): string {
        return "#" + this.hslToRgb(h, s, l).map((c) => c.toString(16).padStart(2, "0")).join("");
    }

    private number(value: CoreObservable.App<any> | number, fallback: number): number {
        const raw = CoreObservable.App.isObservable(value) ? value.get() : value;
        const parsed = Number(raw);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    }
}
