import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import * as UtilValidators from "@/util_validators";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputEmailBase} from "./ComponentInputEmailBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputEmailStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentValidate from "../componentValidate";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputEmail extends ComponentInputEmailBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _INPUT_ID = `component-input-email-${++ComponentInputEmail._INSTANCE_COUNT}`;
    private _INPUT_SIMPLE: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _CHILDREN: Child[] = [];
    private _CURRENT_VALUE = new CoreObservable.App("");
    private _VALUE_UNSUBSCRIBE: (() => void) | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputEmail>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputEmailStep());
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
            case Schemas.ICON.part: return this.renderIcon(data);
            case Schemas.INPUT.part: return this.renderInput(data);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const background = data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const radius = data?.prop_formBorderRadius ?? bind.prop_formBorderRadius;
        const style = CoreObservable.App.computed((bg: string, size: any) => ({
            display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: bg,
            borderRadius: UtilStyle.Css_BorderRadius(size),
        }), [background, radius ?? sizeName], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, stylesBind: style, children: [
            this.executeSchemaPart(Schemas.ICON.part, {}),
            this.executeSchemaPart(Schemas.INPUT.part, {}),
        ]});
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
            props.prop_labelFor = props.prop_labelFor ?? this._INPUT_ID;
            props.styles = CoreObservable.App.computed((customStyles: Record<string, any>, size: any) => ({...customStyles, marginBlockEnd: UtilStyle.Css_Margin(size)}), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const label = ComponentLabelTrait.createLabel(props, {CLICK: () => this.getInput()?.focus()});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private syncValue(value: any): void {
        this._VALUE_UNSUBSCRIBE?.();
        this._VALUE_UNSUBSCRIBE = null;
        if (CoreObservable.App.isObservable(value)) {
            this._CURRENT_VALUE.set(value.get() ?? "");
            this._VALUE_UNSUBSCRIBE = value.subscribe((next: string | null) => this._CURRENT_VALUE.set(next ?? ""), this.getScope());
        } else this._CURRENT_VALUE.set(value ?? "");
    }

    private renderInput(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        this.syncValue(value);
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const overrideIcon = data?.prop_icon ?? bind.prop_icon;
        const defaultIcon = data?.prop_iconEmail ?? bind.prop_iconEmail;
        const hasIcon = CoreObservable.App.computed((override: any, fallback: any) => (override ?? fallback) != null, [overrideIcon, defaultIcon], this.getScope());
        const inputStyles = data?.prop_inputStyles ?? bind.prop_inputStyles;
        const inputStylesWithSizing = CoreObservable.App.computed((custom: Record<string, string>, size: any) => ({fontSize: UtilStyle.Css_FontSize(size), padding: UtilStyle.Css_Padding(size), ...(custom ?? {})}), [inputStyles, sizeName], this.getScope());
        const name = data?.prop_name ?? bind.prop_name;
        const labelTitle = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const inputFor = CoreObservable.App.computed((fieldName: string | null, label: string | null) => fieldName && label ? `${fieldName}[value]` : this._INPUT_ID, [name, labelTitle], this.getScope());
        this._INPUT_SIMPLE = new ComponentInputSimple.Component({
            prop_inputName: name as any,
            prop_inputFor: inputFor as any,
            prop_inputValue: value as any,
            prop_inputDisable: (data?.prop_isDisable ?? bind.prop_isDisable) as any,
            prop_inputClass: (data?.prop_inputClass ?? bind.prop_inputClass) as any,
            prop_inputStyles: inputStylesWithSizing as any,
            prop_inputType: ComponentInputSimple.InputSimpleTypes.EMAIL as any,
            prop_inputPlaceholder: (data?.prop_placeholder ?? bind.prop_placeholder) as any,
            prop_inputBorderTopLeftRadiusHas: CoreObservable.App.computed((has: boolean, isRtl: boolean) => !has || !!isRtl, [hasIcon, rtl], this.getScope()) as any,
            prop_inputBorderBottomLeftRadiusHas: CoreObservable.App.computed((has: boolean, isRtl: boolean) => !has || !!isRtl, [hasIcon, rtl], this.getScope()) as any,
            prop_inputBorderTopRightRadiusHas: CoreObservable.App.computed((has: boolean, isRtl: boolean) => !has || !isRtl, [hasIcon, rtl], this.getScope()) as any,
            prop_inputBorderBottomRightRadiusHas: CoreObservable.App.computed((has: boolean, isRtl: boolean) => !has || !isRtl, [hasIcon, rtl], this.getScope()) as any,
            styles: {flex: "1 1 auto", minWidth: "0"},
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _args, componentArgs) => {
                const next = componentArgs.VALUE ?? "";
                this._CURRENT_VALUE.set(next);
                this.set("prop_value", next);
                this.executeMethod("INPUT_CHANGE", event, {VALUE: next});
            },
            INPUT_FOCUS: (event, _args, componentArgs) => this.executeMethod("INPUT_FOCUS", event, {VALUE: componentArgs.VALUE ?? ""}),
            INPUT_BLUR: (event, _args, componentArgs) => this.executeMethod("INPUT_BLUR", event, {VALUE: componentArgs.VALUE ?? ""}),
        } as any);
        this._CHILDREN.push(this._INPUT_SIMPLE as any);
        return this._INPUT_SIMPLE.getReactiveElement() as CoreReactive.App;
    }

    private renderIcon(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const overrideIcon = data?.prop_icon ?? bind.prop_icon;
        const defaultIcon = data?.prop_iconEmail ?? bind.prop_iconEmail;
        const selectedIcon = CoreObservable.App.computed((override: any, fallback: any) => override ?? fallback ?? null, [overrideIcon, defaultIcon], this.getScope());
        return CoreObservable.App.conditionWhen([selectedIcon], (icon) => icon != null, () => {
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const size = CoreObservable.App.computed((current) => UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(current) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(current) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(current) as any), [sizeName], this.getScope());
            const color = CoreObservable.App.computed((custom: string | null) => custom || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [data?.prop_colorIcon ?? bind.prop_colorIcon], this.getScope());
            const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
            const child = new ComponentIcon.Component({
                prop_icon: UiIcons.CreateIcon(selectedIcon, {size: sizeName, primaryColor: color as any}),
                styles: CoreObservable.App.computed((box: string) => ({width: box, height: box, flex: "0 0 auto", textAlign: "center"}), [size], this.getScope()) as any,
                prop_structureStyles: {height: "100%"},
                prop_iconClass: ["d-block"],
                prop_iconStyles: CoreObservable.App.computed((box: string) => ({cursor: "pointer", margin: "auto", width: box, height: box, lineHeight: box}), [size], this.getScope()) as any,
            } as any, {CLICK: (event) => {event.preventDefault(); if (!disabled.get()) this.getInput()?.focus();}} as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderValidate(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([enabled, rules, disabled], (hasRules, list, isDisabled) => !!hasRules && !isDisabled && Array.isArray(list) && list.length > 0, () => {
            const emailRule = new UtilValidators.validates.IsEmail(
                {En: "Email", Fa: "ایمیل"},
                {En: "Please enter a valid email address", Fa: "لطفاً یک نشانی ایمیل معتبر وارد کنید"},
            );
            const validator = new ComponentValidate.Component({
                prop_listRules: CoreObservable.App.computed((list: any[]) => {
                    const current = Array.isArray(list) ? list : [];
                    return current.some((rule) => rule instanceof UtilValidators.validates.IsEmail) ? current : [...current, emailRule];
                }, [rules], this.getScope()) as any,
                prop_msgRules: (data?.prop_msgRules ?? bind.prop_msgRules) as any,
                prop_isAbsolute: (data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule) as any,
                prop_title: CoreObservable.App.computed((custom: string | null, label: string | null) => custom || label || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: this._CURRENT_VALUE as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private getInput(): HTMLInputElement | null {
        const root = this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined;
        return root?.querySelector("input") ?? null;
    }
}
