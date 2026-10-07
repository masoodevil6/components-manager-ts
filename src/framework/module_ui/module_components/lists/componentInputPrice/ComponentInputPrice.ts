import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputPriceBase} from "./ComponentInputPriceBase";
import {PropsConfigType, PriceValue, CalculatorItem, InformationItem} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputPriceStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentInput from "../componentInput";
import * as ComponentValidate from "../componentValidate";

type Disposable = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputPrice extends ComponentInputPriceBase {
    private _INPUT_COMPONENT: InstanceType<typeof ComponentInput.Component> | null = null;
    private readonly _DISPLAY_VALUE = new CoreObservable.App<string | null>(null);
    private readonly _NUMERIC_VALUE = new CoreObservable.App<number | null>(null);
    private readonly _FOCUSED = new CoreObservable.App(false);
    private readonly _CHILDREN: Disposable[] = [];
    private _SOURCE_VALUE: any = null;
    private _SOURCE_UNSUBSCRIBE: (() => void) | null = null;
    private _SYNCING_SOURCE = false;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputPrice>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputPriceStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._SOURCE_UNSUBSCRIBE?.();
        this._SOURCE_UNSUBSCRIBE = null;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this._INPUT_COMPONENT = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>, _extra?: any): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [
            this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
            this.executeSchemaPart(Schemas.FORM.part, {}),
            this.executeSchemaPart(Schemas.VALIDATE.part, {}),
            this.executeSchemaPart(Schemas.CALCULATOR.part, {}),
            this.executeSchemaPart(Schemas.INFORMATION.part, {}),
        ]});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrsDefault, data);
            case Schemas.CALCULATOR.part: return this.renderCalculator(attrsDefault, data);
            case Schemas.INFORMATION.part: return this.renderInformation(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLabel(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const description = data?.prop_labelTooltipDescription ?? bind.prop_labelTooltipDescription;
        const show = data?.prop_labelShow ?? bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show, title, description], (visible, label, tooltip) =>
            !!visible && ((label != null && label !== "") || (tooltip != null && tooltip !== "")), () => {
            const props: Record<string, any> = {};
            for (const name of Object.keys(ComponentLabelTrait.props)) props[name] = data?.[name] ?? bind[name];
            props.classList = ["d-block"];
            props.styles = {marginBlockEnd: UtilStyle.Css_Margin(CoreConfig.Settings.SizeName.get())};
            const child = ComponentLabelTrait.createLabel(props, {
                CLICK: () => this.getInputElement()?.focus(),
            });
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const source = data?.prop_value ?? bind.prop_value;
        this.connectValueSource(source);
        if (!this._INPUT_COMPONENT) {
            const inputConfig: Record<string, any> = {};
            const names = [
                "prop_name", "prop_isDisable", "prop_title", "prop_backgroundColorForm", "prop_formBorderRadius",
                "prop_colorIcon", "prop_inputClass", "prop_inputStyles", "prop_inputBorderColor", "prop_inputBorderColorFocus",
                "prop_inputBorderWidth", "prop_inputBorderRadius", "prop_type", "prop_placeholder", "prop_icon",
                "prop_btnAddStatus", "prop_btnAddWidth", "prop_btnAddTitle", "prop_btnAddClass", "prop_btnColor",
                "prop_isAbsoluteRule", "prop_listRules", "prop_msgRules",
            ];
            for (const name of names) inputConfig[name] = data?.[name] ?? bind[name];
            inputConfig.prop_value = this._DISPLAY_VALUE;
            inputConfig.prop_labelShow = false;
            inputConfig.prop_hasRules = false;
            this._INPUT_COMPONENT = new ComponentInput.Component(inputConfig as any, {
                INPUT_CHANGE: (event, _dataArgs, componentArgs) => this.handleInput(event, componentArgs.VALUE),
                INPUT_FOCUS: (event, _dataArgs, componentArgs) => this.handleFocus(event, componentArgs.VALUE),
                INPUT_BLUR: (event, _dataArgs, componentArgs) => this.handleBlur(event, componentArgs.VALUE),
                CLICK_BUTTON: (event) => this.executeMethod("CLICK_BUTTON", event, {VALUE: this.getPriceValue()}),
            } as any);
            this._CHILDREN.push(this._INPUT_COMPONENT as any);
        }
        return CoreReactive.App.section({attrs: {...attrs}, className: ["d-block", "w-100"], children: [this._INPUT_COMPONENT.getReactiveElement()]});
    }

    private renderValidate(_attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const title = data?.prop_title ?? bind.prop_title;
        const absolute = data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule;
        const messages = data?.prop_msgRules ?? bind.prop_msgRules;
        return CoreObservable.App.conditionWhen([enabled, rules], (isEnabled, list) => !!isEnabled && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({
                prop_listRules: rules as any,
                prop_msgRules: messages as any,
                prop_isAbsolute: absolute as any,
                prop_title: CoreObservable.App.computed((customTitle, label) => customTitle || label || "", [title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: this._DISPLAY_VALUE as any,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderCalculator(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const calculator = data?.prop_calculator ?? bind.prop_calculator;
        const color = data?.prop_calculatorColor ?? bind.prop_calculatorColor;
        return CoreObservable.App.conditionWhen([calculator, color, this._NUMERIC_VALUE], (items: CalculatorItem[] | null, textColor: string | null, amount: number | null) =>
            Array.isArray(items) && items.length > 0, () => {
            const items = calculator.get() as CalculatorItem[];
            const textColor = color.get() as string | null;
            const amount = this._NUMERIC_VALUE.get() ?? 0;
            return CoreReactive.App.section({attrs: {...attrs}, className: ["d-block", "w-100"], children: items.map((item) => {
                const result = (item.coefficient ?? 1) * amount;
                return CoreReactive.App.section({className: ["d-flex", "align-items-center"], styles: {
                    lineHeight: UtilStyle.Css_Height(CoreConfig.Settings.SizeName.get()),
                    fontSize: UtilStyle.Css_FontSize(CoreConfig.Settings.SizeName.get()),
                }, children: [
                    `${item.title ?? ""}: `,
                    CoreReactive.App.b({attrs: {"data-calc-name": item.name}, styles: {color: textColor ?? ""}, children: [formatPrice(result)]}),
                    CoreReactive.App.b({children: [item.extension ?? ""]}),
                ]});
            })});
        }, () => null, this.getScope()) as any;
    }

    private renderInformation(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const information = data?.prop_information ?? bind.prop_information;
        return CoreObservable.App.conditionWhen([information, this._FOCUSED], (items: InformationItem[] | null, focused: boolean) =>
            !!focused && Array.isArray(items) && items.length > 0, () => {
            const items = information.get() as InformationItem[];
            return CoreReactive.App.section({attrs: {...attrs}, className: ["d-flex", "flex-wrap", "w-100"], children: items.map((item) => {
                const sizeName = CoreConfig.Settings.SizeName.get();
                return CoreReactive.App.section({className: ["d-block", "mb-1"], styles: {backgroundColor: item.value_backgroundColor ?? ""}, children: [
                    CoreReactive.App.section({className: ["text-center", "p-0", "m-0"], styles: {height: UtilStyle.Css_Height(sizeName), fontSize: UtilStyle.Css_FontSize(sizeName), backgroundColor: item.title_backgroundColor ?? "", color: item.title_color ?? ""}, children: [item.title]}),
                    CoreReactive.App.section({className: ["p-0", "m-0", "text-center"], styles: {height: UtilStyle.Css_Height(sizeName), fontSize: UtilStyle.Css_FontSize(sizeName), color: item.value_color ?? ""}, children: [item.value ?? "---"]}),
                ]});
            })});
        }, () => null, this.getScope()) as any;
    }

    private connectValueSource(source: any): void {
        if (source === this._SOURCE_VALUE) return;
        this._SOURCE_UNSUBSCRIBE?.();
        this._SOURCE_UNSUBSCRIBE = null;
        this._SOURCE_VALUE = source;
        const current = CoreObservable.App.isObservable(source) ? source.get() : source;
        this.setDisplayValue(current, false);
        if (CoreObservable.App.isObservable(source)) {
            this._SOURCE_UNSUBSCRIBE = source.subscribe((value: unknown) => {
                if (!this._SYNCING_SOURCE) this.setDisplayValue(value, false);
            }, this.getScope());
        }
    }

    private setDisplayValue(value: unknown, updateSource: boolean): void {
        const display = formatPrice(value);
        this._DISPLAY_VALUE.set(display);
        this._NUMERIC_VALUE.set(parsePrice(display));
        if (updateSource && CoreObservable.App.isObservable(this._SOURCE_VALUE)) {
            this._SYNCING_SOURCE = true;
            this._SOURCE_VALUE.set(display);
            this._SYNCING_SOURCE = false;
        }
    }

    private handleInput(event: Event, value: string | null): void {
        const input = event.currentTarget as HTMLInputElement;
        const caret = input.selectionStart ?? input.value.length;
        const digitsBeforeCaret = (input.value.slice(0, caret).match(/\d/g) ?? []).length;
        const formatted = formatPrice(value);
        input.value = formatted;
        this.setDisplayValue(formatted, true);
        requestAnimationFrame(() => input.setSelectionRange(caretAfterDigits(formatted, digitsBeforeCaret), caretAfterDigits(formatted, digitsBeforeCaret)));
        this.executeMethod("INPUT", event, {VALUE: this.getPriceValue(formatted)});
    }

    private handleFocus(event: Event, value: string | null): void {
        this._FOCUSED.set(true);
        const formatted = formatPrice(value);
        this.setDisplayValue(formatted, true);
        this.executeMethod("FOCUS", event, {VALUE: this.getPriceValue(formatted)});
    }

    private handleBlur(event: Event, value: string | null): void {
        this._FOCUSED.set(false);
        const formatted = formatPrice(value ?? "");
        this.setDisplayValue(formatted, true);
        this.executeMethod("BLUR", event, {VALUE: this.getPriceValue(formatted)});
    }

    private getPriceValue(value?: string | null): PriceValue {
        const amount = parsePrice(value === undefined ? this._DISPLAY_VALUE.get() : value);
        const calculator = this._COMPONENT_PROPS_BIND.prop_calculator.get() as CalculatorItem[] | null;
        const calcs: Record<string, number> = {};
        if (Array.isArray(calculator)) {
            for (const item of calculator) {
                if (item?.name) calcs[item.name] = (item.coefficient ?? 1) * (amount ?? 0);
            }
        }
        return {value: amount, calcs};
    }

    private getInputElement(): HTMLInputElement | null {
        return (this._INPUT_COMPONENT?.getElement() as HTMLElement | undefined)?.querySelector("input") ?? null;
    }
}

function parsePrice(value: unknown): number | null {
    if (value == null || value === "") return null;
    let text = String(value).trim().replace(/[\s\u00a0]/g, "");
    if (!text) return null;
    if (text.includes(",") && text.includes(".")) text = text.replace(/,/g, "");
    else if (text.includes(",")) {
        const parts = text.split(",");
        const last = parts[parts.length - 1];
        text = last.length > 0 && last.length <= 2 ? `${parts.slice(0, -1).join("")}.${last}` : parts.join("");
    }
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : null;
}

function formatPrice(value: unknown): string {
    if (value == null || value === "") return "";
    const source = String(value).trim().replace(/[\s\u00a0]/g, "");
    if (!source) return "";

    const decimalSeparator = source.includes(".") ? "." : source.includes(",") && /,\d{1,2}$/.test(source) ? "," : null;
    const [integerPart, ...fractionParts] = decimalSeparator ? source.split(decimalSeparator) : [source];
    const integerDigits = integerPart.replace(/\D/g, "");
    if (!integerDigits && !fractionParts.length) return source.startsWith("-") ? "-" : "";
    const groupedInteger = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const fraction = fractionParts.join("").replace(/\D/g, "");
    const negative = source.startsWith("-") ? "-" : "";
    if (!decimalSeparator) return `${negative}${groupedInteger}`;
    return `${negative}${groupedInteger}.${fraction}`;
}

function caretAfterDigits(value: string, digitCount: number): number {
    if (digitCount <= 0) return 0;
    let seen = 0;
    for (let index = 0; index < value.length; index++) {
        if (/\d/.test(value[index])) seen++;
        if (seen >= digitCount) return index + 1;
    }
    return value.length;
}
