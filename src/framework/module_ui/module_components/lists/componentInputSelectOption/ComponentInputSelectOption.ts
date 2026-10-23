import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UtilTools from "@/util_tools";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import {RegisterLabelRadiusOptionEditor} from "../componentLabel/Props";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentSelectCustomSimple from "../componentSelectCustomSimple";
import * as ComponentIcon from "../componentIcon";
import * as ComponentButton from "../componentButton";
import {ButtonAction} from "../componentButton/Props";
import {ComponentInputSelectOptionBase} from "./ComponentInputSelectOptionBase";
import {InputSelectOptionItem, InputSelectOptionValue, PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputSelectOptionStep} from "./Step";

type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputSelectOption extends ComponentInputSelectOptionBase {
    private readonly _CHILDREN: DisposableChild[] = [];
    private readonly _CURRENT_SELECTION = new CoreObservable.App<InputSelectOptionValue>(null);
    private _SELECT_CHILD: InstanceType<typeof ComponentSelectCustomSimple.Component> | null = null;
    private _SELECTION_SOURCE: any = null;
    private _SELECTION_UNSUBSCRIBE: (() => void) | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputSelectOption>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputSelectOptionStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._SELECTION_UNSUBSCRIBE?.();
        this._SELECTION_UNSUBSCRIBE = null;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this._SELECT_CHILD = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block", "w-100"], children: [
            this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
            this.executeSchemaPart(Schemas.FORM.part, {}),
        ]});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.SELECT.part: return this.renderSelect(attrsDefault, data);
            case Schemas.ICON.part: return this.renderIcon(attrsDefault, data);
            case Schemas.BUTTON.part: return this.renderButton(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLabel(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const show = data?.prop_labelShow ?? bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show, title], (isShown, labelTitle) => !!isShown && typeof labelTitle === "string" && labelTitle.trim().length > 0, () => {
            const labelProps: Record<string, any> = {};
            for (const propName of Object.keys(ComponentLabelTrait.props)) labelProps[propName] = data?.[propName] ?? bind[propName];
            labelProps.classList = ["d-block"];
            labelProps.styles = CoreObservable.App.computed((customStyles: Record<string, any>, sizeName: any) => ({
                ...(customStyles ?? {}),
                marginBlockEnd: UtilStyle.Css_Margin(sizeName),
            }), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const label = ComponentLabelTrait.createLabel(labelProps, {
                CLICK: () => (this._SELECT_CHILD?.getElement() as HTMLElement | undefined)?.querySelector<HTMLElement>("[role='combobox']")?.focus(),
            }, {unique: (this as any)._COMPONENT_STEP?.label?.click ?? undefined});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderForm(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const background = data?.prop_backgroundColorForm ?? bind.prop_backgroundColorForm;
        const radius = data?.prop_formBorderRadius ?? bind.prop_formBorderRadius;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const formStyles = CoreObservable.App.computed((bg, size) => ({
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            backgroundColor: bg,
            borderRadius: UtilStyle.Css_BorderRadius(size),
        }), [background, sizeName], this.getScope());
        const stylesWithRadius = CoreObservable.App.computed((styles, radiusSize) => ({...styles, borderRadius: UtilStyle.Css_BorderRadius(radiusSize)}), [formStyles, radius], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: stylesWithRadius,
            styles: {display: "flex", flexDirection: "row", alignItems: "stretch"},
            children: [
                this.executeSchemaPart(Schemas.ICON.part, {}),
                this.executeSchemaPart(Schemas.SELECT.part, {}),
                this.executeSchemaPart(Schemas.BUTTON.part, {}),
            ],
        });
    }

    private renderSelect(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const name = data?.prop_name ?? bind.prop_name;
        const selected = data?.prop_itemSelected ?? bind.prop_itemSelected;
        const options = data?.prop_options ?? bind.prop_options;
        const placeholder = data?.prop_placeholder ?? bind.prop_placeholder;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const classes = data?.prop_inputClass ?? bind.prop_inputClass;
        const styles = data?.prop_inputStyles ?? bind.prop_inputStyles;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const buttonEnabled = data?.prop_btnAddStatus ?? bind.prop_btnAddStatus;
        const buttonWidth = data?.prop_btnAddWidth ?? bind.prop_btnAddWidth;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const hasIcon = CoreObservable.App.computed((iconValue: any) => iconValue != null, [icon], this.getScope());
        const hasButton = CoreObservable.App.computed((isEnabled, isDisabled) => !!isEnabled && !isDisabled, [buttonEnabled, disabled], this.getScope());
        const controlWidth = CoreObservable.App.computed((size, iconValue, isEnabled, addWidth, isDisabled) => {
            const widthParts: any[] = ["100%"];
            if (iconValue != null) {
                const iconSpace = UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                    UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(size) as any,
                );
                widthParts.push(UtilConst.Operation.MINUS, `(${iconSpace.slice(5, -1)})` as any);
            }
            if (isEnabled && !isDisabled) widthParts.push(UtilConst.Operation.MINUS, UtilStyle.Css_SizeUnit(addWidth, UtilConst.Units.PEXEL) as any);
            return UtilStyle.Css_SizeCalc(...widthParts);
        }, [sizeName, icon, buttonEnabled, buttonWidth, disabled], this.getScope());
        this.syncSelection(selected);

        const selectOptions = CoreObservable.App.computed((items: InputSelectOptionItem[]) =>
            (Array.isArray(items) ? items : [])
                .filter((item) => item && item.id != null)
                .map((item) => ({id: item.id, name: item.name, prefix: ""})),
        [options], this.getScope());

        this._SELECT_CHILD = new ComponentSelectCustomSimple.Component({
            prop_selectName: name as any,
            prop_selectValue: this._CURRENT_SELECTION as any,
            prop_selectDisable: disabled as any,
            prop_selectPlaceholder: placeholder as any,
            prop_selectOptions: selectOptions as any,
            prop_selectTypeShow: ComponentSelectCustomSimple.SelectTypeShow.JUST_NAME,
            prop_selectClass: classes as any,
            prop_selectStyles: styles as any,
            prop_selectHeaderStylesEnabled: true,
            prop_selectBorderTopLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !isRtl) && !(withButton && !!isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_selectBorderBottomLeftRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !isRtl) && !(withButton && !!isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_selectBorderTopRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !!isRtl) && !(withButton && !isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_selectBorderBottomRightRadiusHas: CoreObservable.App.computed((isRtl: boolean, withIcon: boolean, withButton: boolean) => !(withIcon && !!isRtl) && !(withButton && !isRtl), [rtl, hasIcon, hasButton], this.getScope()) as any,
            prop_structureStyles: {width: "100%", minWidth: "0"},
        } as any, {
            SELECT_CHANGE: (event, _dataArgs, componentArgs) => {
                const rawValue = componentArgs?.VALUE;
                const option = this.getOptions().find((item) => this.sameId(item.id, rawValue)) ?? null;
                const value: InputSelectOptionValue = rawValue == null ? null : option?.id ?? rawValue;
                this._CURRENT_SELECTION.set(value);
                this.set("prop_itemSelected", value);
                this.executeMethod("SELECT_CHANGE", event as Event, {VALUE: value});
            },
        } as any);
        this._CHILDREN.push(this._SELECT_CHILD as any);
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["d-block"],
            stylesBind: CoreObservable.App.computed((width) => ({width, flex: "0 0 auto", minWidth: "0"}), [controlWidth], this.getScope()),
            children: [this._SELECT_CHILD.getReactiveElement() as CoreReactive.App],
        });
    }

    private renderIcon(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const icon = data?.prop_icon ?? bind.prop_icon;
        const color = data?.prop_colorIcon ?? bind.prop_colorIcon;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const iconBoxSize = CoreObservable.App.computed((size) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(size) as any,
        ), [sizeName], this.getScope());
        const iconColor = CoreObservable.App.computed((value) => value || UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [color], this.getScope());
        return CoreObservable.App.conditionWhen([icon], (source) => source != null, () => {
            const iconStyles = CoreObservable.App.computed((_size, resolvedColor) => ({
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
                    (this._SELECT_CHILD?.getElement() as HTMLElement | undefined)?.querySelector<HTMLElement>("[role='combobox']")?.focus();
                },
            } as any);
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderButton(_attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_btnAddStatus ?? bind.prop_btnAddStatus;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const title = data?.prop_btnAddTitle ?? bind.prop_btnAddTitle;
        const classes = data?.prop_btnAddClass ?? bind.prop_btnAddClass;
        const width = data?.prop_btnAddWidth ?? bind.prop_btnAddWidth;
        const semantic = data?.prop_btnColor ?? bind.prop_btnColor;
        const buttonClasses = CoreObservable.App.computed((customClasses) => [...(customClasses ?? []), "shadow-sm", "px-2"], [classes], this.getScope());
        return CoreObservable.App.conditionWhen([enabled, disabled], (isEnabled, isDisabled) => !!isEnabled && !isDisabled, () => {
            const button = new ComponentButton.Component({
                prop_btnTitle: title as any,
                prop_btnSemantic: semantic as any,
                prop_btnType: ButtonAction.BUTTON,
                prop_btnClass: buttonClasses as any,
                prop_btnBorderRadiusStartTop: "0px",
                prop_btnBorderRadiusStartBottom: "0px",
                styles: CoreObservable.App.computed((buttonWidth) => ({
                    width: `${buttonWidth}px`,
                    flex: "0 0 auto",
                    minWidth: "0",
                }), [width], this.getScope()) as any,
                prop_btnStyles: CoreObservable.App.computed((buttonWidth, size) => ({
                    width: `${buttonWidth}px`,
                    height: UtilStyle.Css_SizeCalc(
                        UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD,
                        UtilStyle.Css_Padding(size) as any,
                    ),
                }), [width, CoreConfig.Settings.SizeName.observable()], this.getScope()) as any,
            } as any, {
                CLICK: (event) => this.executeMethod("CLICK_BUTTON", event, {VALUE: this._CURRENT_SELECTION.get()}),
            } as any);
            this._CHILDREN.push(button as any);
            return button.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private syncSelection(source: any): void {
        if (source === this._SELECTION_SOURCE) return;
        this._SELECTION_UNSUBSCRIBE?.();
        this._SELECTION_UNSUBSCRIBE = null;
        this._SELECTION_SOURCE = source;
        if (CoreObservable.App.isObservable(source)) {
            this._CURRENT_SELECTION.set(source.get() ?? null);
            this._SELECTION_UNSUBSCRIBE = source.subscribe((value: InputSelectOptionValue) => this._CURRENT_SELECTION.set(value ?? null), this.getScope());
        } else this._CURRENT_SELECTION.set(source ?? null);
    }

    private sameId(left: InputSelectOptionValue, right: string | number): boolean {
        return left != null && String(left) === String(right);
    }

    private getOptions(): InputSelectOptionItem[] {
        const optionsSource = this.get("prop_options") as any;
        const options = CoreObservable.App.isObservable(optionsSource) ? optionsSource.get() : optionsSource;
        return Array.isArray(options) ? options : [];
    }
}

RegisterLabelRadiusOptionEditor(
    UtilTools.Render.ComponentRender.inputSelectOption(
        ComponentInputSelectOption as any,
        Object.values(UtilConst.Sizes),
    ),
);
