import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputBase} from "./ComponentInputBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentButton from "../componentButton";
import * as ComponentValidate from "../componentValidate";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {ButtonAction} from "../componentButton/Props";

type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInput extends ComponentInputBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _NUMBER_INPUT_CLASS = `component-input-number-${++ComponentInput._INSTANCE_COUNT}`;
    private _INPUT_SIMPLE: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _CHILDREN: DisposableChild[] = [];
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInput>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CHILDREN.forEach((child) => {
            if (child.dispose) child.dispose();
            else child.disposeStep?.();
        });
        this._CHILDREN = [];
        this._INPUT_SIMPLE = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>, _extra?: any): CoreReactive.App {
        const numberInputStyles = CoreReactive.App.style({children: `.${this._NUMBER_INPUT_CLASS}[type="number"]::-webkit-inner-spin-button, .${this._NUMBER_INPUT_CLASS}[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; } .${this._NUMBER_INPUT_CLASS}[type="number"] { appearance: textfield; -moz-appearance: textfield; }`});
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [
                numberInputStyles,
                this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
                this.executeSchemaPart(Schemas.FORM.part, {}),
                this.executeSchemaPart(Schemas.VALIDATE.part, {}),
            ],
        });
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(attrsDefault, data);
            case Schemas.INPUT.part: return this.renderInput(attrsDefault, data);
            case Schemas.ICON.part: return this.renderIcon(attrsDefault, data);
            case Schemas.BUTTON.part: return this.renderButton(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const background = data?.["prop_backgroundColorForm"] ?? bind.prop_backgroundColorForm;
        const radius = data?.["prop_formBorderRadius"] ?? bind.prop_formBorderRadius;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const formStyles = CoreObservable.App.computed((bg, sizeName) => ({
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            backgroundColor: bg,
            borderRadius: UtilStyle.Css_BorderRadius(sizeName),
        }), [background, sizeName], this.getScope());
        const stylesWithRadius = CoreObservable.App.computed((styles, radiusSize) => ({...styles, borderRadius: UtilStyle.Css_BorderRadius(radiusSize)}), [formStyles, radius], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: stylesWithRadius,
            styles: {display: "flex", flexDirection: "row", alignItems: "stretch"},
            children: [
                this.executeSchemaPart(Schemas.ICON.part, {}),
                this.executeSchemaPart(Schemas.INPUT.part, {}),
                this.executeSchemaPart(Schemas.BUTTON.part, {}),
            ],
        });
    }

    private renderLabel(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const labelTitle = data?.["prop_labelTitle"] ?? bind.prop_labelTitle;
        const tooltipDescription = data?.["prop_labelTooltipDescription"] ?? bind.prop_labelTooltipDescription;
        const show = data?.["prop_labelShow"] ?? bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show, labelTitle, tooltipDescription], (isShown, title, description) =>
            !!isShown && ((title != null && title !== "") || (description != null && description !== "")), () => {
            const labelProps: Record<string, any> = {};
            for (const propName of Object.keys(ComponentLabelTrait.props)) {
                labelProps[propName] = data?.[propName] ?? bind[propName];
            }
            labelProps.prop_labelFor = labelProps.prop_labelFor ?? this.getInputElement()?.id ?? null;
            labelProps.classList = ["d-block"];
            labelProps.styles = {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())};
            const label = ComponentLabelTrait.createLabel(labelProps, {
                CLICK: () => (this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined)?.querySelector("input")?.focus(),
            });
            this._CHILDREN.push(label as any);
            return label.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderInput(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const name = data?.["prop_name"] ?? bind.prop_name;
        const label = data?.["prop_labelTitle"] ?? bind.prop_labelTitle;
        const value = data?.["prop_value"] ?? bind.prop_value;
        const disabled = data?.["prop_isDisable"] ?? bind.prop_isDisable;
        const inputClasses = data?.["prop_inputClass"] ?? bind.prop_inputClass;
        const styles = data?.["prop_inputStyles"] ?? bind.prop_inputStyles;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const type = data?.["prop_type"] ?? bind.prop_type;
        const placeholder = data?.["prop_placeholder"] ?? bind.prop_placeholder;
        const buttonEnabled = data?.["prop_btnAddStatus"] ?? bind.prop_btnAddStatus;
        const buttonWidth = data?.["prop_btnAddWidth"] ?? bind.prop_btnAddWidth;
        const icon = data?.["prop_icon"] ?? bind.prop_icon;
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const hasButton = CoreObservable.App.computed((isEnabled, isDisabled) => !!isEnabled && !isDisabled, [buttonEnabled, disabled], this.getScope());
        const hasIcon = CoreObservable.App.computed((iconValue: any) => iconValue != null, [icon], this.getScope());
        const classes = CoreObservable.App.computed((customClasses) => [...(customClasses ?? []), this._NUMBER_INPUT_CLASS], [inputClasses], this.getScope());
        const inputWidth = CoreObservable.App.computed((size, hasIcon, hasButton, addWidth, isDisabled) => {
            const widthParts: any[] = ["100%"];
            if (hasIcon != null) {
                const iconSpace = UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                );
                widthParts.push(UtilConst.Operation.MINUS, `(${iconSpace.slice(5, -1)})` as any);
            }
            if (hasButton && !isDisabled) {
                widthParts.push(UtilConst.Operation.MINUS, UtilStyle.Css_SizeUnit(addWidth, UtilConst.Units.PEXEL) as any);
            }
            return UtilStyle.Css_SizeCalc(...widthParts);
        }, [sizeName, icon, buttonEnabled, buttonWidth, disabled], this.getScope());
        // ComponentInputSimple owns the legacy [value] suffix for the rendered input name.
        const inputName = name;
        const inputFor = CoreObservable.App.computed((fieldName, labelValue) => fieldName && labelValue ? `${fieldName}[value]` : null, [name, label], this.getScope());
        this._INPUT_SIMPLE = new ComponentInputSimple.Component({
            prop_inputName: inputName as any,
            prop_inputFor: inputFor as any,
            prop_inputValue: value as any,
            prop_inputDisable: disabled as any,
            prop_inputClass: classes as any,
            prop_inputStyles: styles as any,
            prop_inputType: type as any,
            prop_inputPlaceholder: placeholder as any,
            prop_inputBorderTopLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !isRtl) && !(withButton && !!isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_inputBorderBottomLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !isRtl) && !(withButton && !!isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_inputBorderTopRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !!isRtl) && !(withButton && !isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_inputBorderBottomRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !!isRtl) && !(withButton && !isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            styles: CoreObservable.App.computed((width) => ({width, flex: "0 0 auto", minWidth: "0"}), [inputWidth], this.getScope()) as any,
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _dataArgs, componentArgs) => this.executeMethod("INPUT_CHANGE", event, {VALUE: componentArgs.VALUE}),
            INPUT_FOCUS: (event, _dataArgs, componentArgs) => this.executeMethod("INPUT_FOCUS", event, {VALUE: componentArgs.VALUE}),
            INPUT_BLUR: (event, _dataArgs, componentArgs) => this.executeMethod("INPUT_BLUR", event, {VALUE: componentArgs.VALUE}),
        } as any);
        this._CHILDREN.push(this._INPUT_SIMPLE as any);
        return this._INPUT_SIMPLE.getReactiveElement() as CoreReactive.App;
    }

    private renderIcon(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const icon = data?.["prop_icon"] ?? bind.prop_icon;
        const color = data?.["prop_colorIcon"] ?? bind.prop_colorIcon;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const iconBoxSize = CoreObservable.App.computed((size) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ), [sizeName], this.getScope());
        const iconColor = CoreObservable.App.computed((value) => value || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [color], this.getScope());
        return CoreObservable.App.conditionWhen([icon], (source) => source != null, () => {
            const iconStyles = CoreObservable.App.computed((sizeName, resolvedColor) => ({
                cursor: "pointer",
                margin: "auto",
                width: iconBoxSize.get(),
                height: iconBoxSize.get(),
                lineHeight: iconBoxSize.get(),
                color: resolvedColor,
            }), [sizeName, iconColor], this.getScope());
            const child = new ComponentIcon.Component({
                prop_icon: UiIcons.CreateIcon(icon.get(), {size: sizeName, primaryColor: iconColor as any}),
                styles: CoreObservable.App.computed((boxSize) => ({width: boxSize, height: boxSize, flex: "0 0 auto", textAlign: "center"}), [iconBoxSize], this.getScope()) as any,
                prop_structureStyles: {height: "100%"},
                prop_iconClass: ["d-block"],
                prop_iconStyles: iconStyles as any,
            } as any, {
                CLICK: (event) => {
                    event.preventDefault();
                    this.getInputElement()?.focus();
                },
            } as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderButton(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.["prop_btnAddStatus"] ?? bind.prop_btnAddStatus;
        const disabled = data?.["prop_isDisable"] ?? bind.prop_isDisable;
        const title = data?.["prop_btnAddTitle"] ?? bind.prop_btnAddTitle;
        const classes = data?.["prop_btnAddClass"] ?? bind.prop_btnAddClass;
        const width = data?.["prop_btnAddWidth"] ?? bind.prop_btnAddWidth;
        const semantic = data?.["prop_btnColor"] ?? bind.prop_btnColor;
        const buttonClasses = CoreObservable.App.computed((customClasses) => [...(customClasses ?? []), "shadow-sm", "px-2"], [classes], this.getScope());
        return CoreObservable.App.conditionWhen([enabled, disabled], (isEnabled, isDisabled) => !!isEnabled && !isDisabled, () => {
            const button = new ComponentButton.Component({
                prop_btnTitle: title as any,
                prop_btnSemantic: semantic as any,
                prop_btnType: ButtonAction.BUTTON,
                prop_btnClass: buttonClasses as any,
                prop_btnBorderRadiusStartTop: "0px",
                prop_btnBorderRadiusStartBottom: "0px",
                styles: {flex: "0 0 auto"},
                prop_btnStyles: CoreObservable.App.computed((buttonWidth, size) => ({
                    width: `${buttonWidth}px`,
                    height: UtilStyle.Css_SizeCalc(
                        UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Padding(size) as any,
                    ),
                }), [width, CoreConfig.Settings.SizeName.observable()], this.getScope()) as any,
            } as any, {
                CLICK: (event) => this.executeMethod("CLICK_BUTTON", event, {VALUE: bind.prop_value.get()}),
            } as any);
            this._CHILDREN.push(button as any);
            return button.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderValidate(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.["prop_hasRules"] ?? bind.prop_hasRules;
        const rules = data?.["prop_listRules"] ?? bind.prop_listRules;
        const title = data?.["prop_title"] ?? bind.prop_title;
        const absolute = data?.["prop_isAbsoluteRule"] ?? bind.prop_isAbsoluteRule;
        const messages = data?.["prop_msgRules"] ?? bind.prop_msgRules;
        const value = data?.["prop_value"] ?? bind.prop_value;
        return CoreObservable.App.conditionWhen([enabled, rules], (isEnabled, list) => !!isEnabled && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({
                prop_listRules: rules as any,
                prop_msgRules: messages as any,
                prop_isAbsolute: absolute as any,
                prop_title: CoreObservable.App.computed((customTitle, label) => customTitle || label || "", [title, data?.["prop_labelTitle"] ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: value as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private getInputElement(): HTMLInputElement | null {
        return (this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined)?.querySelector("input") ?? null;
    }
}
