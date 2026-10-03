import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputSizeBase} from "./ComponentInputSizeBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputSizeStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentButton from "../componentButton";
import * as ComponentValidate from "../componentValidate";
import {ButtonAction, ButtonSemantic} from "../componentButton/Props";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputSize extends ComponentInputSizeBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _INPUT_ID = `component-input-size-${++ComponentInputSize._INSTANCE_COUNT}`;
    private readonly _NUMBER_INPUT_CLASS = `component-input-size-number-${ComponentInputSize._INSTANCE_COUNT}`;
    private _INPUT_SIMPLE: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _CHILDREN: Child[] = [];
    private _CURRENT_VALUE = new CoreObservable.App<number | null>(null);
    private _SOURCE_VALUE: any = null;
    private _VALUE_UNSUBSCRIBE: (() => void) | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputSize>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputSizeStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._VALUE_UNSUBSCRIBE?.();
        this._VALUE_UNSUBSCRIBE = null;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN = [];
        this._INPUT_SIMPLE = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>, _extra?: any): CoreReactive.App {
        const numberInputStyles = CoreReactive.App.style({children: `.${this._NUMBER_INPUT_CLASS}[type="number"]::-webkit-inner-spin-button, .${this._NUMBER_INPUT_CLASS}[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; } .${this._NUMBER_INPUT_CLASS}[type="number"] { appearance: textfield; -moz-appearance: textfield; }`});
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [
            numberInputStyles,
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
            case Schemas.ICON.part: return this.renderIcon(data);
            case Schemas.INPUT.part: return this.renderInput(data);
            case Schemas.BUTTON_DECREMENT.part: return this.renderButton(data, false);
            case Schemas.BUTTON_INCREMENT.part: return this.renderButton(data, true);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const background = data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm;
        const radius = data?.prop_formBorderRadius ?? bind.prop_formBorderRadius;
        const formStyles = CoreObservable.App.computed((color: string, radiusSize: any) => ({
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            backgroundColor: color,
            borderRadius: UtilStyle.Css_BorderRadius(radiusSize),
        }), [background, radius ?? sizeName], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrs},
            stylesBind: formStyles,
            children: [
                this.executeSchemaPart(Schemas.ICON.part, {}),
                this.executeSchemaPart(Schemas.INPUT.part, {}),
                this.executeSchemaPart(Schemas.BUTTON_DECREMENT.part, {}),
                this.executeSchemaPart(Schemas.BUTTON_INCREMENT.part, {}),
            ],
        });
    }

    private renderLabel(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const show = data?.prop_labelShow ?? bind.prop_labelShow;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const description = data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
        return CoreObservable.App.conditionWhen([show, title, description], (enabled, value, tip) => !!enabled && (!!value || !!tip), () => {
            const props: Record<string, any> = {};
            for (const key of Object.keys(ComponentLabelTrait.props)) props[key] = data?.[key] ?? bind[key];
            props.classList = ["d-block"];
            props.prop_labelFor = props.prop_labelFor ?? this._INPUT_ID;
            props.styles = CoreObservable.App.computed((custom: Record<string, string>, size: any) => ({...custom, marginBlockEnd: UtilStyle.Css_Margin(size)}), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const label = ComponentLabelTrait.createLabel(props, {CLICK: () => this.getInput()?.focus()});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private syncValue(value: any): void {
        if (value === this._SOURCE_VALUE) return;
        this._SOURCE_VALUE = value;
        this._VALUE_UNSUBSCRIBE?.();
        this._VALUE_UNSUBSCRIBE = null;
        const readNumber = (current: any): number | null => current == null || current === "" || !Number.isFinite(Number(current)) ? null : Number(current);
        if (CoreObservable.App.isObservable(value)) {
            this._CURRENT_VALUE.set(readNumber(value.get()));
            this._VALUE_UNSUBSCRIBE = value.subscribe((next: any) => this._CURRENT_VALUE.set(readNumber(next)), this.getScope());
        } else this._CURRENT_VALUE.set(readNumber(value));
    }

    private renderInput(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        this.syncValue(value);
        const name = data?.prop_name ?? bind.prop_name;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const min = data?.prop_min ?? bind.prop_min;
        const max = data?.prop_max ?? bind.prop_max;
        const placeholder = data?.prop_placeholder ?? bind.prop_placeholder;
        const inputStyles = data?.prop_inputStyles ?? bind.prop_inputStyles;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const buttonsWidth = data?.prop_buttonsWidth ?? bind.prop_buttonsWidth;
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const hasIcon = CoreObservable.App.computed((source: any) => source != null, [icon], this.getScope());
        const boundsValid = CoreObservable.App.computed((minimum: number | null, maximum: number | null) => minimum == null || maximum == null || minimum <= maximum, [min, max], this.getScope());
        const width = CoreObservable.App.computed((size: any, withIcon: boolean, buttonWidth: number, isDisabled: boolean) => {
            const widthParts: any[] = ["100%"];
            widthParts.push(UtilConst.Operation.MINUS, UtilStyle.Css_SizeUnit((buttonWidth || 45) * 2, UtilConst.Units.PEXEL) as any);
            if (withIcon) {
                const iconBox = UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any);
                widthParts.push(UtilConst.Operation.MINUS, `(${iconBox.slice(5, -1)})` as any);
            }
            return UtilStyle.Css_SizeCalc(...widthParts);
        }, [CoreConfig.Settings.SizeName.observable(), hasIcon, buttonsWidth, disabled, boundsValid], this.getScope());
        const inputFor = CoreObservable.App.computed((fieldName: string | null, label: string | null) => fieldName && label ? `${fieldName}[value]` : this._INPUT_ID, [name, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope());
        const hasControls = CoreObservable.App.computed(() => true, [], this.getScope());
        const leftRadius = CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, controls: boolean) => !(withIcon && !isRtl) && !(controls && !!isRtl), [rtl, hasIcon, hasControls], this.getScope());
        const rightRadius = CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, controls: boolean) => !(withIcon && !!isRtl) && !(controls && !isRtl), [rtl, hasIcon, hasControls], this.getScope());
        const inputClasses = CoreObservable.App.computed((classes: string[] | null) => [...(classes ?? []), this._NUMBER_INPUT_CLASS], [data?.prop_inputClass ?? bind.prop_inputClass], this.getScope());
        this._INPUT_SIMPLE = new ComponentInputSimple.Component({
            prop_inputName: name as any,
            prop_inputFor: inputFor as any,
            prop_inputValue: CoreObservable.App.computed((current: number | null) => current == null ? null : String(current), [this._CURRENT_VALUE], this.getScope()) as any,
            prop_inputDisable: disabled as any,
            prop_inputClass: inputClasses as any,
            prop_inputStyles: inputStyles as any,
            prop_inputType: ComponentInputSimple.InputSimpleTypes.NUMBER,
            prop_inputPlaceholder: placeholder as any,
            prop_inputMin: min as any,
            prop_inputMax: max as any,
            prop_inputBorderTopLeftRadiusHas: leftRadius as any,
            prop_inputBorderBottomLeftRadiusHas: leftRadius as any,
            prop_inputBorderTopRightRadiusHas: rightRadius as any,
            prop_inputBorderBottomRightRadiusHas: rightRadius as any,
            styles: CoreObservable.App.computed((inputWidth: string) => ({width: inputWidth, flex: "1 1 auto", minWidth: "0"}), [width], this.getScope()) as any,
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _args, componentArgs) => {
                const raw = componentArgs.VALUE;
                const next = raw == null || raw === "" ? null : this.clamp(Number(raw), this.getBound(min), this.getBound(max));
                this.commitValue(next, event, min, max, false);
                this.executeMethod("INPUT_CHANGE", event, this.methodArgs(next, min, max));
            },
            INPUT_FOCUS: (event) => this.executeMethod("INPUT_FOCUS", event, this.methodArgs(this._CURRENT_VALUE.get(), min, max)),
            INPUT_BLUR: (event) => {
                const current = this._CURRENT_VALUE.get();
                const bounded = current == null ? null : this.clamp(current, this.getBound(min), this.getBound(max));
                this.commitValue(bounded, event, min, max, false);
                this.executeMethod("INPUT_BLUR", event, this.methodArgs(bounded, min, max));
            },
        } as any);
        this._CHILDREN.push(this._INPUT_SIMPLE as any);
        return this._INPUT_SIMPLE.getReactiveElement() as CoreReactive.App;
    }

    private renderIcon(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([icon], (source) => source != null, () => {
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const box = CoreObservable.App.computed((size: any) => UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any), [sizeName], this.getScope());
            const color = data?.prop_colorIcon ?? bind.prop_colorIcon;
            const colorValue = CoreObservable.App.computed((custom: string | null) => custom || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [color], this.getScope());
            const iconComponent = new ComponentIcon.Component({
                prop_icon: CoreObservable.App.computed((definition: any) => UiIcons.CreateIcon(definition, {size: sizeName, primaryColor: colorValue as any}), [icon], this.getScope()) as any,
                styles: CoreObservable.App.computed((value: string) => ({width: value, height: value, flex: "0 0 auto", textAlign: "center"}), [box], this.getScope()) as any,
                prop_structureStyles: {height: "100%"},
                prop_iconStyles: CoreObservable.App.computed((value: string) => ({cursor: "pointer", width: value, height: value, lineHeight: value, margin: "auto"}), [box], this.getScope()) as any,
            } as any, {CLICK: (event) => {event.preventDefault(); if (!disabled.get()) this.getInput()?.focus();}} as any);
            this._CHILDREN.push(iconComponent as any);
            return iconComponent.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private renderButton(data: Record<string, CoreObservable.App<any>>, increment: boolean): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const width = data?.prop_buttonsWidth ?? bind.prop_buttonsWidth;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const icon = data?.[increment ? "prop_iconIncrement" : "prop_iconDecrement"] ?? bind[increment ? "prop_iconIncrement" : "prop_iconDecrement"];
        const min = data?.prop_min ?? bind.prop_min;
        const max = data?.prop_max ?? bind.prop_max;
        const boundsValid = CoreObservable.App.computed((minimum: number | null, maximum: number | null) => minimum == null || maximum == null || minimum <= maximum, [min, max], this.getScope());
        const atLimit = CoreObservable.App.computed((value: number | null, minimum: number | null, maximum: number | null, valid: boolean) => valid && (increment ? maximum != null && value != null && value >= maximum : minimum != null && value != null && value <= minimum), [this._CURRENT_VALUE, min, max, boundsValid], this.getScope());
        const buttonDisabled = CoreObservable.App.computed((isDisabled: boolean, valid: boolean, atBound: boolean) => isDisabled || !valid || atBound, [disabled, boundsValid, atLimit], this.getScope());
        const button = new ComponentButton.Component({
            prop_btnType: ButtonAction.BUTTON,
            prop_btnSemantic: ButtonSemantic.PRIMARY,
            prop_btnTitle: "",
            prop_btnIcon: icon as any,
            prop_btnDisabled: buttonDisabled as any,
            prop_btnBorderRadiusStartTop: "0px",
            prop_btnBorderRadiusStartBottom: "0px",
            // The increment (add) button is at the logical end of the form:
            // right in LTR and left in RTL. Keep its outer corners at the
            // configured size radius; the decrement button stays square.
            prop_btnBorderRadiusEndTop: increment ? null : "0px",
            prop_btnBorderRadiusEndBottom: increment ? null : "0px",
            styles: CoreObservable.App.computed((buttonWidth: number) => ({
                width: UtilStyle.Css_SizeUnit(buttonWidth || 45, UtilConst.Units.PEXEL),
                flex: "0 0 auto",
            }), [width], this.getScope()),
            prop_btnStyles: CoreObservable.App.computed((buttonWidth: number, size: any) => ({
                width: UtilStyle.Css_SizeUnit(buttonWidth || 45, UtilConst.Units.PEXEL),
                height: UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any),
                padding: "0px",
            }), [width, sizeName]) as any,
        } as any, {CLICK: (event) => {
            if (disabled.get()) return;
            const minimum = this.getBound(min);
            const maximum = this.getBound(max);
            const current = this._CURRENT_VALUE.get();
            const base = current ?? minimum ?? 0;
            const next = this.clamp(base + (increment ? 1 : -1), minimum, maximum);
            if (next !== current) this.commitValue(next, event, minimum, maximum);
        }} as any);
        this._CHILDREN.push(button as any);
        return button.getReactiveElement() as CoreReactive.App;
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
                prop_value: CoreObservable.App.computed((value: number | null) => value == null ? "" : String(value), [this._CURRENT_VALUE], this.getScope()) as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private getBound(value: any): number | null {
        const current = CoreObservable.App.isObservable(value) ? value.get() : value;
        return current == null || current === "" || !Number.isFinite(Number(current)) ? null : Number(current);
    }

    private clamp(value: number, min: number | null, max: number | null): number {
        if (min != null && max != null && min > max) return value;
        if (min != null) value = Math.max(min, value);
        if (max != null) value = Math.min(max, value);
        return value;
    }

    private methodArgs(value: number | null, min: any, max: any): Record<string, number | null> {
        return {VALUE: value, MIN: this.getBound(min), MAX: this.getBound(max)};
    }

    private commitValue(value: number | null, event: Event, min: any, max: any, notify = true): void {
        this._CURRENT_VALUE.set(value);
        const source = this._SOURCE_VALUE;
        if (CoreObservable.App.isObservable(source)) source.set(value);
        else this.set("prop_value", value);
        if (notify) this.executeMethod("INPUT_CHANGE", event, this.methodArgs(value, min, max));
    }

    private getInput(): HTMLInputElement | null {
        return (this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined)?.querySelector("input") ?? null;
    }
}
