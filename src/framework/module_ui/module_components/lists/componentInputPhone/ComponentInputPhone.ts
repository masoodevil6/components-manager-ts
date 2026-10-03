import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputPhoneBase} from "./ComponentInputPhoneBase";
import {PropsConfigType, PhoneOption} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputPhoneStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentSelectCustomSimple from "../componentSelectCustomSimple";
import * as ComponentValidate from "../componentValidate";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputPhone extends ComponentInputPhoneBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _INPUT_ID = `component-input-phone-${++ComponentInputPhone._INSTANCE_COUNT}`;
    private _INPUT_SIMPLE: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _CHILDREN: Child[] = [];
    private _CURRENT_VALUE = new CoreObservable.App("");
    private _VALUE_UNSUBSCRIBE: (() => void) | null = null;
    private _SOURCE_VALUE: any = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputPhone>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputPhoneStep());
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
            case Schemas.COUNTRY_SELECT.part: return this.renderCountrySelect(data);
            case Schemas.CITY_SELECT.part: return this.renderCitySelect(data);
            case Schemas.INPUT.part: return this.renderInput(data);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const style = CoreObservable.App.computed((bg: string, radius: any, size: any) => ({
            display: "flex", flexDirection: "row", alignItems: "stretch", backgroundColor: bg,
            borderRadius: UtilStyle.Css_BorderRadius(radius ?? size),
        }), [data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm, data?.prop_formBorderRadius ?? bind.prop_formBorderRadius, sizeName], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, stylesBind: style, children: [
            this.executeSchemaPart(Schemas.ICON.part, {}),
            this.executeSchemaPart(Schemas.COUNTRY_SELECT.part, {}),
            this.executeSchemaPart(Schemas.CITY_SELECT.part, {}),
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
            props.styles = CoreObservable.App.computed((custom: Record<string, any>, size: any) => ({...(custom ?? {}), marginBlockEnd: UtilStyle.Css_Margin(size)}), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const child = ComponentLabelTrait.createLabel(props, {CLICK: () => this.getInput()?.focus()});
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private mapOptions(options: PhoneOption[] | null | undefined): Array<{id: string | number; name: string | number; prefix: string | number}> {
        return Array.isArray(options) ? options.map(({id, name, code}) => ({id, name, prefix: code})) : [];
    }

    private renderCountrySelect(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const visible = data?.prop_countryHas ?? bind.prop_countryHas;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const options = CoreObservable.App.computed((list: PhoneOption[]) => this.mapOptions(list), [data?.prop_countryOptions ?? bind.prop_countryOptions], this.getScope());
        return CoreObservable.App.conditionWhen([visible], (show) => !!show, () => {
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const rtl = CoreConfig.Settings.DirectionRtl.observable();
            const hasIcon = CoreObservable.App.computed((icon: any) => icon != null, [bind.prop_icon], this.getScope());
            const width = data?.prop_countryWidth ?? bind.prop_countryWidth;
            const selectName = CoreObservable.App.computed((name: string | null) => name ? `${name}[country]` : null, [data?.prop_name ?? bind.prop_name], this.getScope());
            const select = new ComponentSelectCustomSimple.Component({
                prop_selectName: selectName as any,
                prop_selectValue: (data?.prop_countryValue ?? bind.prop_countryValue) as any,
                prop_selectDisable: CoreObservable.App.computed((isDisabled: boolean, list: Array<any>) => !!isDisabled || !Array.isArray(list) || list.length === 0, [disabled, options], this.getScope()) as any,
                prop_selectOptions: options as any,
                prop_selectTypeShow: ComponentSelectCustomSimple.SelectTypeShow.JUST_PREFIX,
                prop_selectBorderTopLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean) => !isRtl && !withIcon, [rtl, hasIcon], this.getScope()),
                prop_selectBorderBottomLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean) => !isRtl && !withIcon, [rtl, hasIcon], this.getScope()),
                prop_selectBorderTopRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean) => !!isRtl && !withIcon, [rtl, hasIcon], this.getScope()),
                prop_selectBorderBottomRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean) => !!isRtl && !withIcon, [rtl, hasIcon], this.getScope()),
                prop_selectBorderRightHas: CoreObservable.App.computed((isRtl: boolean) => !!isRtl, [rtl], this.getScope()),
                prop_selectBorderLeftHas: CoreObservable.App.computed((isRtl: boolean) => !isRtl, [rtl], this.getScope()),
                prop_selectStyles: CoreObservable.App.computed((w: number, size: any) => ({width: `${w}px`, minWidth: `${w}px`, lineHeight: UtilStyle.Css_Height(size), padding: "0px"}), [width, sizeName], this.getScope()),
                styles: CoreObservable.App.computed((w: number) => ({width: `${w}px`, flex: "0 0 auto"}), [width], this.getScope()) as any,
            } as any, {
                SELECT_CHANGE: (event, _args, childArgs) => this.changeCountry(event, childArgs.VALUE),
            } as any);
            this._CHILDREN.push(select as any);
            return select.getReactiveElement() as CoreReactive.App;
        }, () => CoreReactive.App.section({children: []}), this.getScope()) as any;
    }

    private renderCitySelect(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const visible = data?.prop_cityHas ?? bind.prop_cityHas;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const countryVisible = data?.prop_countryHas ?? bind.prop_countryHas;
        const country = data?.prop_countryValue ?? bind.prop_countryValue;
        const cityOptions = data?.prop_cityOptions ?? bind.prop_cityOptions;
        const options = CoreObservable.App.computed((list: PhoneOption[], countryId: string | number | null, hasCountry: boolean) =>
            this.mapOptions((list ?? []).filter((item) => !hasCountry || String(item.countryId) === String(countryId))),
        [cityOptions, country, countryVisible], this.getScope());
        return CoreObservable.App.conditionWhen([visible], (show) => !!show, () => {
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const rtl = CoreConfig.Settings.DirectionRtl.observable();
            const hasIcon = CoreObservable.App.computed((icon: any) => icon != null, [bind.prop_icon], this.getScope());
            const width = data?.prop_cityWidth ?? bind.prop_cityWidth;
            const selectName = CoreObservable.App.computed((name: string | null) => name ? `${name}[city]` : null, [data?.prop_name ?? bind.prop_name], this.getScope());
            const select = new ComponentSelectCustomSimple.Component({
                prop_selectName: selectName as any,
                prop_selectValue: (data?.prop_cityValue ?? bind.prop_cityValue) as any,
                prop_selectDisable: CoreObservable.App.computed((isDisabled: boolean, countryId: string | number | null, hasCountry: boolean, list: Array<any>) => !!isDisabled || (hasCountry && !this.hasSelection(countryId)) || !Array.isArray(list) || list.length === 0, [disabled, country, countryVisible, options], this.getScope()) as any,
                prop_selectOptions: options as any,
                prop_selectTypeShow: ComponentSelectCustomSimple.SelectTypeShow.JUST_PREFIX,
                prop_selectBorderTopLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, hasCountry: boolean, withIcon: boolean) => !isRtl && !hasCountry && withIcon, [rtl, countryVisible, hasIcon], this.getScope()),
                prop_selectBorderBottomLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, hasCountry: boolean, withIcon: boolean) => !isRtl && !hasCountry && withIcon, [rtl, countryVisible, hasIcon], this.getScope()),
                prop_selectBorderTopRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, hasCountry: boolean, withIcon: boolean) => !!isRtl && !hasCountry && withIcon, [rtl, countryVisible, hasIcon], this.getScope()),
                prop_selectBorderBottomRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, hasCountry: boolean, withIcon: boolean) => !!isRtl && !hasCountry && withIcon, [rtl, countryVisible, hasIcon], this.getScope()),
                prop_selectBorderLeftHas: CoreObservable.App.computed((isRtl: boolean) => !isRtl, [rtl], this.getScope()),
                prop_selectBorderRightHas: CoreObservable.App.computed((isRtl: boolean) => !!isRtl, [rtl], this.getScope()),
                prop_selectStyles: CoreObservable.App.computed((w: number, size: any) => ({width: `${w}px`, minWidth: `${w}px`, lineHeight: UtilStyle.Css_Height(size), padding: "0px"}), [width, sizeName], this.getScope()),
                styles: CoreObservable.App.computed((w: number) => ({width: `${w}px`, flex: "0 0 auto"}), [width], this.getScope()) as any,
            } as any, {
                SELECT_CHANGE: (event, _args, childArgs) => this.changeCity(event, childArgs.VALUE),
            } as any);
            this._CHILDREN.push(select as any);
            return select.getReactiveElement() as CoreReactive.App;
        }, () => CoreReactive.App.section({children: []}), this.getScope()) as any;
    }

    private renderInput(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.prop_value ?? bind.prop_value;
        this.syncValue(value);
        const name = data?.prop_name ?? bind.prop_name;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const countryVisible = data?.prop_countryHas ?? bind.prop_countryHas;
        const cityVisible = data?.prop_cityHas ?? bind.prop_cityHas;
        const countryValue = data?.prop_countryValue ?? bind.prop_countryValue;
        const cityValue = data?.prop_cityValue ?? bind.prop_cityValue;
        const countryOptions = data?.prop_countryOptions ?? bind.prop_countryOptions;
        const cityOptions = data?.prop_cityOptions ?? bind.prop_cityOptions;
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const hasIcon = CoreObservable.App.computed((icon: any) => icon != null, [data?.prop_icon ?? bind.prop_icon], this.getScope());
        const hasLeadingElement = CoreObservable.App.computed((withIcon: boolean, countryHas: boolean, cityHas: boolean) => withIcon || !!countryHas || !!cityHas, [hasIcon, countryVisible, cityVisible], this.getScope());
        const radiusLeft = CoreObservable.App.computed((isRtl: boolean, hasElement: boolean) => isRtl || !hasElement, [rtl, hasLeadingElement], this.getScope());
        const radiusRight = CoreObservable.App.computed((isRtl: boolean, hasElement: boolean) => !isRtl || !hasElement, [rtl, hasLeadingElement], this.getScope());
        const inputDisabled = CoreObservable.App.computed((isDisabled: boolean, hasCountry: boolean, selectedCountry: any, countries: PhoneOption[], hasCity: boolean, selectedCity: any, cities: PhoneOption[]) =>
            !!isDisabled || (!!hasCountry && !this.hasOption(countries, selectedCountry)) || (!!hasCity && !this.hasOption(cities?.filter((item) => !hasCountry || String(item.countryId) === String(selectedCountry)), selectedCity)),
        [disabled, countryVisible, countryValue, countryOptions, cityVisible, cityValue, cityOptions], this.getScope());
        this._INPUT_SIMPLE = new ComponentInputSimple.Component({
            prop_inputName: name as any,
            prop_inputValue: this._CURRENT_VALUE as any,
            prop_inputDisable: inputDisabled as any,
            prop_inputClass: (data?.prop_inputClass ?? bind.prop_inputClass) as any,
            prop_inputStyles: (data?.prop_inputStyles ?? bind.prop_inputStyles) as any,
            prop_inputType: ComponentInputSimple.InputSimpleTypes.TEL as any,
            prop_inputPlaceholder: (data?.prop_placeholder ?? bind.prop_placeholder) as any,
            prop_inputBorderTopLeftRadiusHas: radiusLeft as any,
            prop_inputBorderBottomLeftRadiusHas: radiusLeft as any,
            prop_inputBorderTopRightRadiusHas: radiusRight as any,
            prop_inputBorderBottomRightRadiusHas: radiusRight as any,
            styles: {flex: "1 1 auto", minWidth: "0"},
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            INPUT_CHANGE: (event, _args, childArgs) => {
                const next = childArgs.VALUE == null ? "" : String(childArgs.VALUE);
                this._CURRENT_VALUE.set(next);
                this.set("prop_value", next);
                this.executeMethod("INPUT_CHANGE", event, this.methodArgs(next));
            },
            INPUT_FOCUS: (event) => this.executeMethod("INPUT_FOCUS", event, this.methodArgs(this._CURRENT_VALUE.get())),
            INPUT_BLUR: (event) => this.executeMethod("INPUT_BLUR", event, this.methodArgs(this._CURRENT_VALUE.get())),
        } as any);
        const inputElement = this.getInput();
        if (inputElement) inputElement.id = this._INPUT_ID;
        this._CHILDREN.push(this._INPUT_SIMPLE as any);
        return this._INPUT_SIMPLE.getReactiveElement() as CoreReactive.App;
    }

    private renderIcon(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([icon], (source) => source != null, () => {
            const sizeName = CoreConfig.Settings.SizeName.observable();
            const size = CoreObservable.App.computed((current) => UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(current) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(current) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(current) as any), [sizeName], this.getScope());
            const color = CoreObservable.App.computed((custom: string | null) => custom || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [data?.prop_colorIcon ?? bind.prop_colorIcon], this.getScope());
            const child = new ComponentIcon.Component({
                prop_icon: UiIcons.CreateIcon(icon, {size: sizeName, primaryColor: color as any}),
                styles: CoreObservable.App.computed((box: string) => ({width: box, height: box, flex: "0 0 auto", textAlign: "center"}), [size], this.getScope()) as any,
                prop_structureStyles: {height: "100%"},
                prop_iconClass: ["d-block"],
                prop_iconStyles: CoreObservable.App.computed((box: string) => ({cursor: "pointer", margin: "auto", width: box, height: box, lineHeight: box}), [size], this.getScope()) as any,
            } as any, {CLICK: (event) => {event.preventDefault(); if (!disabled.get()) this.getInput()?.focus();}} as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => CoreReactive.App.section({children: []}), this.getScope()) as any;
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
                prop_title: CoreObservable.App.computed((custom: string | null, title: string | null) => custom || title || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                prop_value: this._CURRENT_VALUE as any,
                prop_referenceComponent: this,
            } as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private syncValue(value: any): void {
        if (value === this._SOURCE_VALUE) return;
        this._VALUE_UNSUBSCRIBE?.();
        this._VALUE_UNSUBSCRIBE = null;
        this._SOURCE_VALUE = value;
        if (CoreObservable.App.isObservable(value)) {
            this._CURRENT_VALUE.set(value.get() == null ? "" : String(value.get()));
            this._VALUE_UNSUBSCRIBE = value.subscribe((next: string | null) => this._CURRENT_VALUE.set(next == null ? "" : String(next)), this.getScope());
        } else this._CURRENT_VALUE.set(value == null ? "" : String(value));
    }

    private changeCountry(event: Event, country: string | number | null): void {
        this.set("prop_countryValue", country);
        this.set("prop_cityValue", null);
        this.set("prop_value", "");
        this._CURRENT_VALUE.set("");
        this.executeMethod("SELECT_COUNTRY_CHANGE", event, this.methodArgs(""));
    }

    private changeCity(event: Event, city: string | number | null): void {
        this.set("prop_cityValue", city);
        this.set("prop_value", "");
        this._CURRENT_VALUE.set("");
        this.executeMethod("SELECT_CITY_CHANGE", event, this.methodArgs(""));
    }

    private methodArgs(value: string): Record<string, any> {
        return {COUNTRY: this._COMPONENT_PROPS_BIND.prop_countryValue.get(), CITY: this._COMPONENT_PROPS_BIND.prop_cityValue.get(), VALUE: value};
    }

    private hasSelection(value: unknown): boolean {
        return value != null && value !== "";
    }

    private hasOption(options: PhoneOption[] | null | undefined, value: unknown): boolean {
        return this.hasSelection(value) && Array.isArray(options) && options.some((option) => String(option.id) === String(value));
    }

    private getInput(): HTMLInputElement | null {
        const root = this._INPUT_SIMPLE?.getElement() as HTMLElement | undefined;
        return root?.querySelector("input") ?? null;
    }
}
