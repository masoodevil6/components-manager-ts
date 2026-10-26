import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputDescriptionBase} from "./ComponentInputDescriptionBase";
import {PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputDescriptionStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputDescriptionSimple from "../componentInputDescriptionSimple";
import * as ComponentValidate from "../componentValidate";

type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputDescription extends ComponentInputDescriptionBase<ReturnType<typeof createInputDescriptionStep>>{
    private _DESCRIPTION_SIMPLE: InstanceType<typeof ComponentInputDescriptionSimple.Component> | null = null;
    private _CHILDREN: DisposableChild[] = [];
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputDescription>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputDescriptionStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CHILDREN.forEach((child) => {
            if (child.dispose) child.dispose();
            else child.disposeStep?.();
        });
        this._CHILDREN = [];
        this._DESCRIPTION_SIMPLE = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>, _extra?: any): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [
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
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.DESCRIPTION.part: return this.renderDescription(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const background = data?.["prop_backgroundColorForm"] ?? bind.prop_backgroundColorForm;
        const radius = data?.["prop_formBorderRadius"] ?? bind.prop_formBorderRadius;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const styles = CoreObservable.App.computed((color, size, radiusSize) => ({
            display: "block",
            width: "100%",
            minWidth: "0",
            backgroundColor: color,
            borderRadius: UtilStyle.Css_BorderRadius(radiusSize ?? size),
        }), [background, sizeName, radius], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: styles,
            children: [this.executeSchemaPart(Schemas.DESCRIPTION.part, {})],
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
            for (const propName of Object.keys(ComponentLabelTrait.props)) labelProps[propName] = data?.[propName] ?? bind[propName];
            labelProps.classList = ["d-block"];
            labelProps.styles = {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())};
            const label = ComponentLabelTrait.createLabel(labelProps, {
                CLICK: () => this.getTextareaElement()?.focus(),
            });
            this._CHILDREN.push(label as any);
            return label.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderDescription(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const child = new ComponentInputDescriptionSimple.Component({
            prop_inputName: data?.["prop_name"] ?? bind.prop_name,
            prop_inputValue: data?.["prop_value"] ?? bind.prop_value,
            prop_inputDisable: data?.["prop_isDisable"] ?? bind.prop_isDisable,
            prop_inputPlaceholder: data?.["prop_placeholder"] ?? bind.prop_placeholder,
            prop_inputRows: data?.["prop_rows"] ?? bind.prop_rows,
            prop_inputResize: data?.["prop_resize"] ?? bind.prop_resize,
            prop_inputClass: data?.["prop_inputClass"] ?? bind.prop_inputClass,
            prop_inputStyles: data?.["prop_inputStyles"] ?? bind.prop_inputStyles,
            prop_inputBorderColor: data?.["prop_inputBorderColor"] ?? bind.prop_inputBorderColor,
            prop_inputBorderColorFocus: data?.["prop_inputBorderColorFocus"] ?? bind.prop_inputBorderColorFocus,
            prop_inputBorderWidth: data?.["prop_inputBorderWidth"] ?? bind.prop_inputBorderWidth,
            prop_inputBorderRadius: data?.["prop_inputBorderRadius"] ?? bind.prop_inputBorderRadius,
            styles: {width: "100%", minWidth: "0"},
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _dataArgs, componentArgs) => {
                this.set("prop_value", componentArgs.VALUE);
                this.executeMethod("INPUT_CHANGE", event, {VALUE: componentArgs.VALUE});
            },
            INPUT_FOCUS: (event, _dataArgs, componentArgs) => this.executeMethod("INPUT_FOCUS", event, {VALUE: componentArgs.VALUE}),
            INPUT_BLUR: (event, _dataArgs, componentArgs) => this.executeMethod("INPUT_BLUR", event, {VALUE: componentArgs.VALUE}),
        } as any);
        this._DESCRIPTION_SIMPLE = child;
        this._CHILDREN.push(child as any);
        return child.getReactiveElement() as CoreReactive.App;
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

    private getTextareaElement(): HTMLTextAreaElement | null {
        return this._DESCRIPTION_SIMPLE?.getElement().querySelector("textarea") ?? null;
    }
}
