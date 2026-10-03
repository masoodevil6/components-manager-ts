import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreEvent from "@/core_event";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputSimpleBase} from "./ComponentInputSimpleBase";
import {PropsConfigType, InputSimpleTypes} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputSimpleStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";

export class ComponentInputSimple extends ComponentInputSimpleBase {
    private readonly _FOCUSED = new CoreObservable.App(false);
    private _INPUT: HTMLInputElement | null = null;
    private _CLEAR_ICON: (InstanceType<typeof ComponentIcon.Component> & {disposeStep?: () => void}) | null = null;
    private _ROOT_CLICK_LISTENER: ((event: Event) => void) | null = null;
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputSimple>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super("input-simple", identity, createInputSimpleStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
        this._ROOT_CLICK_LISTENER = (event: Event) => {
            const target = event.target;
            if (!(target instanceof Element) || !target.closest(".component-input-simple-clear")) return;
            this.clearInput(event, this._COMPONENT_PROPS_BIND.prop_inputDisable);
        };
        (this.getElement() as HTMLElement).addEventListener("click", this._ROOT_CLICK_LISTENER, true);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CLEAR_ICON?.disposeStep?.();
        if (this._ROOT_CLICK_LISTENER) (this.getElement() as HTMLElement).removeEventListener("click", this._ROOT_CLICK_LISTENER, true);
        this._BORDER?.dispose();
        this._CLEAR_ICON = null;
        this._ROOT_CLICK_LISTENER = null;
        this._BORDER = null;
        this._INPUT = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(_attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>, _extra?: any): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM.part, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.INPUT.part: return this.renderInput(attrsDefault, data);
            case Schemas.CLEAR_ICON.part: return this.renderClearIcon(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.["prop_inputDisable"] ?? bind.prop_inputDisable;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const borderProps: Record<string, any> = {
            prop_contentSize: UtilConst.Sizes.M,
            prop_borderClass: ["position-relative", "d-block"],
            prop_content: [this.executeSchemaPart(Schemas.INPUT.part, {}), this.executeSchemaPart(Schemas.CLEAR_ICON.part, {})],
            prop_borderStyles: CoreObservable.App.computed((size) => ({
                height: UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any,
                ),
            }), [sizeName], this.getScope()),
            prop_borderColor: CoreObservable.App.computed((focused) => focused ? UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1) : UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [this._FOCUSED], this.getScope()),
            prop_contentBackgroundColor: CoreObservable.App.computed((isDisabled) => isDisabled ? UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5) : UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), [disabled], this.getScope()),
        };
        const mapping: Array<[string, string]> = [
            ["prop_inputBorderTopLeftRadiusHas", "prop_borderTopLeftRadiusHas"], ["prop_inputBorderTopRightRadiusHas", "prop_borderTopRightRadiusHas"],
            ["prop_inputBorderBottomLeftRadiusHas", "prop_borderBottomLeftRadiusHas"], ["prop_inputBorderBottomRightRadiusHas", "prop_borderBottomRightRadiusHas"],
            ["prop_inputBorderTopHas", "prop_borderTopHas"], ["prop_inputBorderRightHas", "prop_borderRightHas"], ["prop_inputBorderBottomHas", "prop_borderBottomHas"], ["prop_inputBorderLeftHas", "prop_borderLeftHas"],
        ];
        for (const [inputProp, borderProp] of mapping) borderProps[borderProp] = data?.[inputProp] ?? bind[inputProp];
        this._BORDER = new ComponentBorder.Component(borderProps as any);
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block"], children: [this._BORDER.getReactiveElement()]});
    }

    private renderInput(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const name = data?.["prop_inputName"] ?? bind.prop_inputName;
        const disabled = data?.["prop_inputDisable"] ?? bind.prop_inputDisable;
        const value = data?.["prop_inputValue"] ?? bind.prop_inputValue;
        const classes = data?.["prop_inputClass"] ?? bind.prop_inputClass;
        const styles = data?.["prop_inputStyles"] ?? bind.prop_inputStyles;
        const type = data?.["prop_inputType"] ?? bind.prop_inputType;
        const placeholder = data?.["prop_inputPlaceholder"] ?? bind.prop_inputPlaceholder;
        const inputFor = data?.["prop_inputFor"] ?? bind.prop_inputFor;
        const min = data?.["prop_inputMin"] ?? bind.prop_inputMin;
        const max = data?.["prop_inputMax"] ?? bind.prop_inputMax;
        const sizing = CoreObservable.App.computed((sizeName) => ({
            fontSize: UtilStyle.Css_FontSize(sizeName), padding: UtilStyle.Css_Padding(sizeName),
        }), [CoreConfig.Settings.SizeName.observable()], this.getScope());

        const input = CoreReactive.App.input({
            attrs: {...attrsDefault},
            attrsBind: {
                name: CoreObservable.App.computed((fieldName) => fieldName == null ? null : `${fieldName}[value]`, [name], this.getScope()),
                type: CoreObservable.App.computed((inputType) => inputType === InputSimpleTypes.STRING ? "text" : inputType ?? "text", [type], this.getScope()),
                placeholder,
                min,
                max,
                for: inputFor,
                disabled: CoreObservable.App.computed((status) => status ? "disabled" : null, [disabled], this.getScope()),
            },
            propsBind: {value: CoreObservable.App.computed((currentValue) => currentValue ?? "", [value], this.getScope())},
            className: ["d-block"], classBind: [classes],
            styles: {border: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", outline: "none", boxShadow: "none", boxSizing: "border-box"},
            stylesBind: CoreObservable.App.computed((baseStyles, customStyles) => ({...baseStyles, ...customStyles}), [sizing, styles], this.getScope()),
            on: {
                input: (event: Event) => {
                    const inputElement = event.currentTarget as HTMLInputElement;
                    const nextValue = inputElement.value === "" ? null : inputElement.value;
                    this.set("prop_inputValue", nextValue);
                    this.executeMethod("INPUT_CHANGE", event, {VALUE: nextValue});
                },
                focus: (event: Event) => {
                    this._FOCUSED.set(true);
                    this.executeMethod("INPUT_FOCUS", event, {VALUE: (event.currentTarget as HTMLInputElement).value || null});
                },
                blur: (event: Event) => {
                    this._FOCUSED.set(false);
                    this.executeMethod("INPUT_BLUR", event, {VALUE: (event.currentTarget as HTMLInputElement).value || null});
                },
            },
        });
        this._INPUT = input.getElement() as HTMLInputElement;
        return input;
    }

    private renderClearIcon(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const disabled = data?.["prop_inputDisable"] ?? this._COMPONENT_PROPS_BIND.prop_inputDisable;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const iconSize = CoreObservable.App.computed((size) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_BorderWidth(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any,
            UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any,
            UtilConst.Operation.ADD, UtilStyle.Css_BorderWidth(size) as any,
        ), [sizeName], this.getScope());
        const clearSvg = UiIcons.CreateIcon(UiIcons.Src.CalcCross.Definition);
        clearSvg.getElement().style.height = "calc(var(--borderWidthMedium) + var(--paddingMedium) + var(--paddingMedium) + var(--heightMedium) + var(--borderWidthMedium))";
        this._CLEAR_ICON = new ComponentIcon.Component({
            prop_structureStyles: {height: "100%"},
            prop_icon: clearSvg,
            prop_iconClass: ["d-block", "text-center", "h-100"],
            prop_iconStyles: {cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%"},
        }) as any;
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["component-input-simple-clear"],
            styles: {position: "absolute", insetInlineEnd: "0", top: "50%", transform: "translateY(-50%)", zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.tools_btn)), cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"},
            stylesBind: {
                width: iconSize,
                height: iconSize,
                display: CoreObservable.App.computed((isDisabled) => isDisabled ? "none" : "block", [disabled], this.getScope()),
            },
            children: [this._CLEAR_ICON.getReactiveElement()],
        });
    }

    private clearInput(event: Event, disabled: CoreObservable.App<boolean>): void {
        if (this._DISPOSED || disabled.get()) return;
        if (this._INPUT) this._INPUT.value = "";
        this.set("prop_inputValue", null);
        this.executeMethod("INPUT_CHANGE", event, {VALUE: null});
    }
}
