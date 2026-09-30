import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputPasswordBase} from "./ComponentInputPasswordBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputPasswordStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentValidate from "../componentValidate";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputPassword extends ComponentInputPasswordBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _INPUT_ID = `component-input-password-${++ComponentInputPassword._INSTANCE_COUNT}`;
    private _INPUT_SIMPLE: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _CHILDREN: Child[] = [];
    private _VISIBLE = new CoreObservable.App(false);
    private _CURRENT_VALUE = new CoreObservable.App("");
    private _VALUE_UNSUBSCRIBE: (() => void) | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputPassword>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputPasswordStep());
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
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.ICON.part: return this.renderLeadingIcon(attrsDefault, data);
            case Schemas.INPUT.part: return this.renderInput(attrsDefault, data);
            case Schemas.VISIBILITY.part: return this.renderVisibilityIcon(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const style = CoreObservable.App.computed((bg: string, size: any) => ({
            display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: bg,
            borderRadius: UtilStyle.Css_BorderRadius(size),
        }), [data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm, sizeName], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, stylesBind: style, styles: {display: "flex", flexDirection: "row", alignItems: "stretch"}, children: [
            this.executeSchemaPart(Schemas.ICON.part, {}),
            this.executeSchemaPart(Schemas.INPUT.part, {}),
            this.executeSchemaPart(Schemas.VISIBILITY.part, {}),
        ]});
    }

    private renderLabel(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const shown = data?.prop_labelShow ?? bind.prop_labelShow;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const description = data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
        const labelStyle = data?.prop_labelStyle ?? bind.prop_labelStyle;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        return CoreObservable.App.conditionWhen([shown, title, description], (show, value, tip) => !!show && (!!value || !!tip), () => {
            const props: Record<string, any> = {};
            for (const key of Object.keys(ComponentLabelTrait.props)) props[key] = data?.[key] ?? bind[key];
            props.classList = ["d-block"];
            props.prop_labelFor = props.prop_labelFor ?? this._INPUT_ID;
            props.prop_labelStyle = labelStyle;
            props.styles = CoreObservable.App.computed((customStyles: Record<string, any>, size: any) => ({...customStyles, marginBlockEnd: UtilStyle.Css_Margin(size)}), [data?.styles ?? bind.styles, sizeName], this.getScope());
            const label = ComponentLabelTrait.createLabel(props, {CLICK: () => this.getInput()?.focus()});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private renderInput(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        this._VALUE_UNSUBSCRIBE?.();
        this._VALUE_UNSUBSCRIBE = null;
        if (CoreObservable.App.isObservable(value)) {
            this._CURRENT_VALUE.set(value.get() ?? "");
            this._VALUE_UNSUBSCRIBE = value.subscribe((next: string | null) => this._CURRENT_VALUE.set(next ?? ""), this.getScope());
        } else this._CURRENT_VALUE.set(value ?? "");
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const inputType = this._VISIBLE.map((visible) => visible ? "text" : "password", this.getScope());
        const inputStyles = data?.prop_inputStyles ?? bind.prop_inputStyles;
        const inputStylesWithSizing = CoreObservable.App.computed((custom: Record<string, string>, size: any) => ({fontSize: UtilStyle.Css_FontSize(size), padding: UtilStyle.Css_Padding(size), ...(custom ?? {})}), [inputStyles, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const inputFor = CoreObservable.App.computed((name: string | null, labelFor: string | null) => labelFor || (name ? `${name}[value]` : this._INPUT_ID), [data?.prop_name ?? bind.prop_name, data?.prop_labelFor ?? bind.prop_labelFor], this.getScope());
        const radius = CoreConfig.Settings.SizeName.observable().map((sizeName) => UtilStyle.Css_BorderRadius(sizeName), this.getScope());
        const radiusHas = CoreObservable.App.computed((value: string) => !!value && value !== "0px", [radius], this.getScope());
        const directionRtl = CoreConfig.Settings.DirectionRtl.observable();
        const icon = data?.prop_icon ?? bind.prop_icon;
        const hasIcon = CoreObservable.App.computed((value: any) => value != null, [icon], this.getScope());
        this._INPUT_SIMPLE = new ComponentInputSimple.Component({
            prop_inputName: data?.prop_name ?? bind.prop_name,
            prop_inputFor: inputFor as any,
            prop_inputValue: value as any,
            prop_inputDisable: disabled as any,
            prop_inputClass: (data?.prop_inputClass ?? bind.prop_inputClass) as any,
            prop_inputStyles: inputStylesWithSizing as any,
            prop_inputType: inputType as any,
            prop_inputPlaceholder: (data?.prop_placeholder ?? bind.prop_placeholder) as any,
            // The leading icon closes the input's inner edge; the visibility icon closes its outer edge.
            prop_inputBorderTopLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withLeadingIcon: boolean, hasRadius: boolean) => hasRadius && !isRtl && !withLeadingIcon, [directionRtl, hasIcon, radiusHas], this.getScope()) as any,
            prop_inputBorderBottomLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withLeadingIcon: boolean, hasRadius: boolean) => hasRadius && !isRtl && !withLeadingIcon, [directionRtl, hasIcon, radiusHas], this.getScope()) as any,
            prop_inputBorderTopRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withLeadingIcon: boolean, hasRadius: boolean) => hasRadius && !!isRtl && !withLeadingIcon, [directionRtl, hasIcon, radiusHas], this.getScope()) as any,
            prop_inputBorderBottomRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withLeadingIcon: boolean, hasRadius: boolean) => hasRadius && !!isRtl && !withLeadingIcon, [directionRtl, hasIcon, radiusHas], this.getScope()) as any,
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

    private renderLeadingIcon(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([icon], (value) => value != null, () => {
            const color = data?.prop_colorIcon ?? bind.prop_colorIcon;
            const iconSize = CoreConfig.Settings.SizeName.observable();
            const iconBoxSize = CoreObservable.App.computed((size) => UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any), [iconSize], this.getScope());
            const iconColor = CoreObservable.App.computed((value: string | null) => value || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [color], this.getScope());
            const child = new ComponentIcon.Component({prop_icon: UiIcons.CreateIcon(icon.get(), {size: iconSize, primaryColor: iconColor as any}), styles: CoreObservable.App.computed((box: string) => ({width: box, height: box, flex: "0 0 auto", textAlign: "center"}), [iconBoxSize], this.getScope()) as any, prop_structureStyles: {height: "100%"}, prop_iconClass: ["d-block"], prop_iconStyles: CoreObservable.App.computed((box: string) => ({cursor: "pointer", margin: "auto", width: box, height: box, lineHeight: box}), [iconBoxSize], this.getScope()) as any} as any, {CLICK: (event) => {event.preventDefault(); if (!disabled.get()) this.getInput()?.focus();}} as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private renderVisibilityIcon(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const disabled = data?.prop_isDisable ?? this._COMPONENT_PROPS_BIND.prop_isDisable;
        const visible = this._VISIBLE;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const boxSize = CoreObservable.App.computed((size: any) => UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any), [sizeName], this.getScope());
        const iconDefinition = visible.map((isVisible) => isVisible ? UiIcons.Src.StatusUnVisit.Definition : UiIcons.Src.StatusVisit.Definition, this.getScope());
        const iconDescriptor = UiIcons.CreateIcon(iconDefinition as any, {size: sizeName, primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)});
        const icon = new ComponentIcon.Component({
            prop_icon: iconDescriptor as any,
            prop_iconClass: ["d-flex", "align-items-center", "justify-content-center"],
            prop_iconStyles: {cursor: "pointer", height: "100%"},
            styles: CoreObservable.App.computed((box: string) => ({width: box, height: box, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center"}), [boxSize], this.getScope()) as any,
            prop_structureStyles: {width: "100%", height: "100%"},
        } as any, {CLICK: (event) => {event.preventDefault(); if (disabled.get()) return; visible.set(!visible.get()); this.executeMethod("TOGGLE_VISIBILITY", event);}} as any);
        this._CHILDREN.push(icon as any);
        return icon.getReactiveElement() as CoreReactive.App;
    }

    private renderValidate(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        return CoreObservable.App.conditionWhen([enabled, rules], (hasRules, list) => !!hasRules && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({
                prop_listRules: rules as any,
                prop_msgRules: (data?.prop_msgRules ?? bind.prop_msgRules) as any,
                prop_isAbsolute: (data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule) as any,
                prop_title: CoreObservable.App.computed((custom, label) => custom || label || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: this._CURRENT_VALUE as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement();
        }, () => null, this.getScope()) as any;
    }

    private getInput(): HTMLInputElement | null {
        const componentRoot = this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined;
        return componentRoot?.querySelector("input") ?? null;
    }
}
