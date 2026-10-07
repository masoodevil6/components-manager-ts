import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentElementPosition from "../componentElementPosition";

type ObservableValue = CoreObservable.App<any>;

export interface CheckBoxControlOptions {
    value: ObservableValue;
    isDisable: ObservableValue;
    borderIconClass: ObservableValue;
    borderIconStyles: ObservableValue;
    borderIconColorSelected: ObservableValue;
    borderIconColorUnSelected: ObservableValue;
    borderIconColorDisable: ObservableValue;
    borderIconWidth: ObservableValue;
    borderIconRadius: ObservableValue;
    borderIconOpacity: ObservableValue;
    borderIconBackgroundSelected: ObservableValue;
    borderIconBackgroundUnSelected: ObservableValue;
    borderIconBackgroundDisable: ObservableValue;
    icon: ObservableValue;
    iconClass: ObservableValue;
    iconStyles: ObservableValue;
    scope: any;
    onClick: (event: Event) => void;
    unique?: any;
    containerStyles?: ObservableValue | Record<string, any>;
    structureStyles?: ObservableValue | Record<string, any>;
}

/** Shared checkbox-like control used by CheckBox and RadioBox. */
export function createCheckBoxControl(options: CheckBoxControlOptions): CoreReactive.App {
    const scope = options.scope;
    const borderSize = CoreObservable.App.computed((sizeName: any) => {
        const iconSize = UtilStyle.Css_IconSize(sizeName) as any;
        const padding = UtilStyle.Css_Padding(sizeName) as any;
        return UtilStyle.Css_SizeCalc(iconSize, UtilConst.Operation.ADD, padding, UtilConst.Operation.ADD, padding);
    }, [CoreConfig.Settings.SizeName.observable()], scope);

    const borderColor = CoreObservable.App.computed(
        (value: any, disabled: boolean, selected: any, unselected: any, disabledColor: any) => disabled ? disabledColor : (value ? selected : unselected),
        [options.value, options.isDisable, options.borderIconColorSelected, options.borderIconColorUnSelected, options.borderIconColorDisable], scope,
    );
    const backgroundColor = CoreObservable.App.computed(
        (value: any, disabled: boolean, selected: any, unselected: any, disabledColor: any) => disabled ? disabledColor : (value ? selected : unselected),
        [options.value, options.isDisable, options.borderIconBackgroundSelected, options.borderIconBackgroundUnSelected, options.borderIconBackgroundDisable], scope,
    );
    const borderStyles = CoreObservable.App.computed((base: Record<string, any>, width: any, radius: any) => {
        const toCss = (value: any, convert: (size: any) => any) => typeof value === "number" ? UtilStyle.Css_SizeUnit(value, UtilConst.Units.PEXEL) : convert(value);
        const borderWidth = toCss(width, UtilStyle.Css_BorderWidth);
        const borderRadius = toCss(radius, UtilStyle.Css_BorderRadius);
        return {
            ...(base ?? {}),
            width: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
            height: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
            transition: "150ms ease",
            boxShadow: "#00000047 0px 0px 5px, inset 0 2px 4px #0000004d",
            "border-top-width": UtilStyle.Style_Important(borderWidth),
            "border-right-width": UtilStyle.Style_Important(borderWidth),
            "border-bottom-width": UtilStyle.Style_Important(borderWidth),
            "border-left-width": UtilStyle.Style_Important(borderWidth),
            "border-top-left-radius": UtilStyle.Style_Important(borderRadius),
            "border-top-right-radius": UtilStyle.Style_Important(borderRadius),
            "border-bottom-left-radius": UtilStyle.Style_Important(borderRadius),
            "border-bottom-right-radius": UtilStyle.Style_Important(borderRadius),
        };
    }, [options.borderIconStyles, options.borderIconWidth, options.borderIconRadius], scope);

    const iconInstance = CoreObservable.App.computed((value: any, icon: any) => {
        if (!value) return null;
        return icon ?? UiIcons.CreateIcon(UiIcons.Src.StatusIsTrue.Definition, {
            size: 25,
            primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        });
    }, [options.value, options.icon], scope);

    const icon = new ComponentIcon.Component({
        prop_structureClass: ["position-absolute"],
        prop_structureStyles: CoreObservable.App.computed((padding: any) => ({
            top: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
            left: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
            transform: UtilStyle.Css_Transform(UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT), UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT)),
            padding,
        }), [CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_Padding(sizeName), [CoreConfig.Settings.SizeName.observable()], scope)], scope),
        prop_icon: iconInstance as any,
        prop_iconClass: options.iconClass,
        prop_iconStyles: options.iconStyles,
    } as any);

    const position = new ComponentElementPosition.Component({
        prop_positionClass: ["d-block"],
        prop_positionStyles: {width: "100%", height: "100%"},
        prop_positionTop: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
        prop_positionLeft: UtilStyle.Css_SizeUnit(50, UtilConst.Units.PERCENT),
        prop_positionTranslate: UtilStyle.Css_Transform(UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT), UtilStyle.Css_SizeUnit(-50, UtilConst.Units.PERCENT)),
        prop_positionHeight: null,
        prop_content: icon.getReactiveElement(),
    } as any);

    const rtl = CoreConfig.Settings.DirectionRtl.observable();
    const margin = CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_Margin(sizeName), [CoreConfig.Settings.SizeName.observable()], scope);
    const containerStyles = options.containerStyles ?? CoreObservable.App.computed((isRtl: boolean, sideMargin: any, sizeName: any) => ({
        width: "auto",
        float: isRtl ? "right" : "left",
        marginLeft: sideMargin,
        marginRight: sideMargin,
        marginTop: UtilStyle.Css_Margin(sizeName),
    }), [rtl, margin, CoreConfig.Settings.SizeName.observable()], scope);
    const structureStyles = options.structureStyles ?? CoreObservable.App.computed((size: any) => ({cursor: "pointer", display: "block", width: size, height: size}), [borderSize], scope);

    return new ComponentBorder.Component({
        styles: containerStyles as any,
        prop_structureClass: ["position-relative"],
        prop_structureStyles: structureStyles as any,
        prop_content: position.getReactiveElement(),
        prop_borderClass: options.borderIconClass,
        prop_borderStyles: borderStyles,
        prop_borderOpacity: options.borderIconOpacity,
        prop_borderColor: borderColor,
        prop_contentBackgroundColor: backgroundColor,
    } as any, {CLICK_BORDER: (event: Event) => {event.preventDefault(); options.onClick(event);}} as any, options.unique ? {unique: options.unique} : undefined).getReactiveElement() as CoreReactive.App;
}
