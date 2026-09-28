import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiIcons from "@/ui_icons";
import * as UiCategory from "@/ui_categories";
import * as CoreLanguage from "@/core_languages";
import {PartAttrDefault} from "@/core_components";
import {ComponentSelectCustomSimpleBase} from "./ComponentSelectCustomSimpleBase";
import {PropsConfigType, SelectCustomSimpleOption, SelectTypeShow} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createSelectCustomSimpleStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {Keys} from "../../../module_categories/languages";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentInputSimple from "../componentInputSimple";
import * as ComponentRecyclerView from "../componentRecyclerView";

export class ComponentSelectCustomSimple extends ComponentSelectCustomSimpleBase {
    private readonly _IS_OPEN = new CoreObservable.App(false);
    private readonly _SEARCH = new CoreObservable.App("");
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _ICON: InstanceType<typeof ComponentIcon.Component> | null = null;
    private _SEARCH_INPUT: InstanceType<typeof ComponentInputSimple.Component> | null = null;
    private _OPTIONS_LIST: InstanceType<typeof ComponentRecyclerView.Component> | null = null;
    private _FLOAT_MENU: InstanceType<typeof import("../componentFloatMenu").Component> | null = null;
    private _DOCUMENT_LISTENER: ((event: MouseEvent | KeyboardEvent) => void) | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentSelectCustomSimple>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super("select-custom-simple", identity, createSelectCustomSimpleStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._removeDocumentListener();
        this._OPTIONS_LIST?.dispose();
        this._SEARCH_INPUT?.dispose();
        this._FLOAT_MENU?.dispose();
        this._BORDER?.dispose();
        this._ICON?.disposeStep?.();
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
            case Schemas.FORM_VALUE.part: return this.renderFormValue(attrsDefault, data);
            case Schemas.SELECT.part: return this.renderSelect(attrsDefault, data);
            case Schemas.SELECT_HEADER.part: return this.renderHeader(attrsDefault, data);
            case Schemas.SELECT_HEADER_TEXT.part: return this.renderHeaderText(attrsDefault, data);
            case Schemas.SELECT_HEADER_ICON.part: return this.renderHeaderIcon(attrsDefault, data);
            case Schemas.SELECT_BODY.part: return this.renderBody(attrsDefault, data);
            case Schemas.SELECT_SEARCH.part: return this.renderSearch(attrsDefault, data);
            case Schemas.SELECT_OPTIONS.part: return this.renderOptions(attrsDefault, data);
            case Schemas.SELECT_OPTION.part: return this.renderOption(attrsDefault, data, extra);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block"], children: [this.executeSchemaPart(Schemas.FORM_VALUE.part, {}), this.executeSchemaPart(Schemas.SELECT.part, {})]});
    }

    private renderFormValue(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const name = data?.["prop_selectName"] ?? bind.prop_selectName;
        const value = data?.["prop_selectValue"] ?? bind.prop_selectValue;
        const disabled = data?.["prop_selectDisable"] ?? bind.prop_selectDisable;
        return CoreObservable.App.conditionWhen([name, disabled], (fieldName, isDisabled) => !!fieldName && !isDisabled,
            () => CoreReactive.App.input({attrs: {...attrsDefault, type: "hidden"}, attrsBind: {name, value: CoreObservable.App.computed((selected) => selected == null ? "" : String(selected), [value], this.getScope())}}),
            () => CoreReactive.App.section({attrs: {...attrsDefault}}), this.getScope()) as unknown as CoreReactive.App;
    }

    private renderSelect(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.["prop_selectDisable"] ?? bind.prop_selectDisable;
        const body = this.executeSchemaPart(Schemas.SELECT_BODY.part, {});
        this._FLOAT_MENU = UiCategory.UI.Positions.FloatMenu({
            classList: ["position-relative", "d-block", "w-100"],
            prop_selectorClass: ["d-block", "w-100"],
            prop_selectorContent: this.executeSchemaPart(Schemas.SELECT_HEADER.part, {}),
            prop_selectorShowType: "click" as any,
            prop_floatContent: body,
            prop_floatDirectionType: "bottom" as any,
            prop_floatWidth: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
            prop_floatMinWidth: UtilStyle.Css_SizeUnit(100, UtilConst.Units.PERCENT),
            prop_floatArrowWidth: 0,
            prop_floatDistance: 0,
            prop_floatBorderWidth: UtilConst.Sizes.S,
            prop_floatBorderColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_floatBorderRadius: UtilConst.Sizes.S,
            prop_floatBackground: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
            prop_floatShowControlWithSelf: true,
            prop_floatIsShow: this._IS_OPEN,
            prop_floatStyles: {display: "block"},
        } as any, {});
        const root = CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block", "w-100"], children: [this._FLOAT_MENU.getReactiveElement()]});
        return root;
    }

    private renderHeader(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const disabled = data?.["prop_selectDisable"] ?? bind.prop_selectDisable;
        const classList = data?.["prop_selectClass"] ?? bind.prop_selectClass;
        const styles = data?.["prop_selectStyles"] ?? bind.prop_selectStyles;
        const props: Record<string, any> = {
            prop_contentSize: CoreConfig.Settings.SizeName.observable() as any,
            prop_borderClass: ["position-relative", "d-flex", "align-items-center", "w-100", ...((classList.get?.() ?? classList) as string[])],
            prop_content: [this.executeSchemaPart(Schemas.SELECT_HEADER_TEXT.part, {}), this.executeSchemaPart(Schemas.SELECT_HEADER_ICON.part, {})],
            prop_contentBackgroundColor: CoreObservable.App.computed((isDisabled) => isDisabled ? UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5) : UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), [disabled], this.getScope()),
            prop_borderColor: CoreObservable.App.computed((isOpen) => isOpen ? UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1) : UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), [this._IS_OPEN], this.getScope()),
            prop_borderColor_hover: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
            prop_borderStyles: styles,
        };
        const radiusMap: Array<[string, string]> = [["prop_selectBorderTopLeftRadiusHas", "prop_borderTopLeftRadiusHas"], ["prop_selectBorderTopRightRadiusHas", "prop_borderTopRightRadiusHas"], ["prop_selectBorderBottomLeftRadiusHas", "prop_borderBottomLeftRadiusHas"], ["prop_selectBorderBottomRightRadiusHas", "prop_borderBottomRightRadiusHas"], ["prop_selectBorderTopHas", "prop_borderTopHas"], ["prop_selectBorderRightHas", "prop_borderRightHas"], ["prop_selectBorderBottomHas", "prop_borderBottomHas"], ["prop_selectBorderLeftHas", "prop_borderLeftHas"]];
        for (const [source, target] of radiusMap) props[target] = data?.[source] ?? bind[source];
        this._BORDER = new ComponentBorder.Component(props as any);
        const headerStyles = CoreObservable.App.computed((size, isRtl) => ({
            minHeight: UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(size) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(size) as any),
            lineHeight: UtilStyle.Css_Height(size),
            fontSize: UtilStyle.Css_FontSize(size),
            direction: isRtl ? "rtl" : "ltr",
            paddingInlineStart: UtilStyle.Css_Padding(size),
            paddingInlineEnd: UtilStyle.Css_Padding(size),
        }), [CoreConfig.Settings.SizeName.observable(), CoreConfig.Settings.DirectionRtl.observable()], this.getScope());
        return CoreReactive.App.section({
            attrs: {...attrsDefault, role: "combobox", tabindex: "0", "aria-haspopup": "listbox"},
            attrsBind: {"aria-expanded": CoreObservable.App.computed((open) => String(open), [this._IS_OPEN], this.getScope())},
            className: ["d-block", "w-100"],
            stylesBind: headerStyles,
            on: {
                click: (event: Event) => this.toggleMenu(event, disabled),
                keydown: (event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") this.toggleMenu(event, disabled);
                },
            },
            children: [this._BORDER.getReactiveElement()],
        });
    }

    private renderHeaderText(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const value = data?.["prop_selectValue"] ?? bind.prop_selectValue;
        const options = data?.["prop_selectOptions"] ?? bind.prop_selectOptions;
        const placeholder = data?.["prop_selectPlaceholder"] ?? bind.prop_selectPlaceholder;
        const type = data?.["prop_selectTypeShow"] ?? bind.prop_selectTypeShow;
        const text = CoreObservable.App.computed((selected, list, emptyText, displayType) => {
            const option = Array.isArray(list) ? list.find((item: SelectCustomSimpleOption) => String(item.id) === String(selected)) : null;
            if (!option) return emptyText ?? "";
            const name = String(option.name ?? "---");
            const prefix = String(option.prefix ?? "");
            if (displayType === SelectTypeShow.JUST_NAME) return name;
            if (displayType === SelectTypeShow.JUST_PREFIX) return prefix;
            return prefix ? `${prefix} | ${name}` : name;
        }, [value, options, placeholder, type], this.getScope());
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["flex-grow-1", "text-truncate"], styles: {minWidth: "0"}, children: [text]});
    }

    private renderHeaderIcon(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const icon = CoreObservable.App.computed((open) => UiIcons.CreateIcon(open ? UiIcons.Src.ArrowChevronUp.Definition : UiIcons.Src.ArrowChevronDown.Definition), [this._IS_OPEN], this.getScope());
        this._ICON = new ComponentIcon.Component({prop_icon: icon as any, prop_iconClass: ["d-block", "text-center"], prop_iconStyles: {cursor: "pointer"}});
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["ms-2", "flex-shrink-0"], children: [this._ICON.getReactiveElement()]});
    }

    private renderBody(attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-flex", "flex-column", "p-2", "w-100"], children: [this.executeSchemaPart(Schemas.SELECT_SEARCH.part, {}), this.executeSchemaPart(Schemas.SELECT_OPTIONS.part, {})]});
    }

    private renderSearch(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const disabled = data?.["prop_selectDisable"] ?? this._COMPONENT_PROPS_BIND.prop_selectDisable;
        const searchPlaceholder = CoreLanguage.App.translate(Keys.category.components.selectCustomSimple.texts.searchPlaceholder);
        this._SEARCH_INPUT = UiCategory.UI.Simples.InputSimple({prop_inputDisable: disabled, prop_inputValue: this._SEARCH, prop_inputPlaceholder: searchPlaceholder as any, prop_inputClass: ["form-control"]} as any, {
            INPUT_CHANGE: (_event, _dataArgs, componentArgs) => {
                const query = String(componentArgs?.VALUE ?? "");
                this._SEARCH.set(query);
                this.executeMethod("SELECT_SEARCH", _event as Event, {VALUE: query} as any);
            },
        });
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block", "w-100", "mb-2"], children: [this._SEARCH_INPUT.getReactiveElement()]});
    }

    private renderOptions(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const options = data?.["prop_selectOptions"] ?? bind.prop_selectOptions;
        const safeOptions = CoreObservable.App.computed((items) => Array.isArray(items) ? items : [], [options], this.getScope());
        const components = CoreObservable.App.for(safeOptions, (option: SelectCustomSimpleOption, _index: number, context: any) => {
            if (!option || option.id == null) return CoreReactive.App.section({children: []});
            const query = String(context?.search ?? "").trim().toLocaleLowerCase();
            const matches = `${option.name ?? ""} ${option.prefix ?? ""}`.toLocaleLowerCase().includes(query);
            return matches ? this.executeSchemaPart(Schemas.SELECT_OPTION.part, {option}) : CoreReactive.App.section({children: []});
        }, {search: this._SEARCH}, {}, this.getScope());
        this._OPTIONS_LIST = UiCategory.UI.Contents.RecyclerView({prop_formDirection: "vertical", prop_formComponents: components as any, prop_formStyles: {width: "100%"}});
        return CoreReactive.App.section({attrs: {...attrsDefault}, className: ["d-block", "w-100", "overflow-auto"], styles: {maxHeight: "16rem"}, children: [this._OPTIONS_LIST.getReactiveElement()]});
    }

    private renderOption(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        const option = extra?.option as SelectCustomSimpleOption | undefined;
        if (!option) return CoreReactive.App.section({attrs: {...attrsDefault}});
        const selected = data?.["prop_selectValue"] ?? this._COMPONENT_PROPS_BIND.prop_selectValue;
        const isSelected = CoreObservable.App.computed((current) => String(current) === String(option.id), [selected], this.getScope());
        return CoreReactive.App.section({attrs: {...attrsDefault, role: "option"}, attrsBind: {"aria-selected": CoreObservable.App.computed((active) => String(active), [isSelected], this.getScope())}, className: ["d-flex", "align-items-center", "gap-2", "w-100", "p-2", "cursor-pointer"],
            styles: {borderBottom: `${UtilStyle.Css_BorderWidth(UtilConst.Sizes.S)} solid ${UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)}`},
            stylesBind: {
                backgroundColor: CoreObservable.App.computed((active) => UtilStyle.Css_Color(active ? UtilConst.ColorMain.PRIMARY : UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), [isSelected], this.getScope()),
                color: CoreObservable.App.computed((active) => UtilStyle.Css_Color(active ? UtilConst.ColorMain.SHAN : UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1), [isSelected], this.getScope()),
            },
            on: {
                mouseenter: (event: MouseEvent) => { const el = event.currentTarget as HTMLElement; el.style.backgroundColor = UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_4); el.style.color = UtilStyle.Css_Color(UtilConst.ColorMain.WARNING, UtilConst.ColorGrad.GRADE_1); },
                mouseleave: (event: MouseEvent) => { const el = event.currentTarget as HTMLElement; el.style.backgroundColor = UtilStyle.Css_Color(isSelected.get() ? UtilConst.ColorMain.PRIMARY : UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1); el.style.color = UtilStyle.Css_Color(isSelected.get() ? UtilConst.ColorMain.SHAN : UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1); },
                click: (event: Event) => {
                    if (this._COMPONENT_PROPS_BIND.prop_selectDisable.get()) return;
                    this.set("prop_selectValue", option.id);
                    this._IS_OPEN.set(false);
                    this._removeDocumentListener();
                    this.executeMethod("SELECT_CHANGE", event, {VALUE: option.id} as any);
                    this.executeMethod("SELECT_CLOSE", event, {VALUE: option.id} as any);
                },
            }, children: [CoreReactive.App.span({styles: {width: "40px", flex: "0 0 40px"}, children: [String(option.prefix ?? "")]}), CoreReactive.App.b({className: ["text-truncate"], styles: {minWidth: "0"}, children: [String(option.name ?? "---")]})]});
    }

    private _addDocumentListener(): void {
        this._removeDocumentListener();
        this._DOCUMENT_LISTENER = (event: any) => {
            const root = this.getElement() as HTMLElement;
            if (event instanceof KeyboardEvent && event.key === "Escape") { this.closeMenu(event); return; }
            if (event instanceof MouseEvent && !root.contains(event.target as Node)) this.closeMenu(event);
        };
        document.addEventListener("click", this._DOCUMENT_LISTENER as EventListener, true);
        document.addEventListener("keydown", this._DOCUMENT_LISTENER as EventListener, true);
    }

    private _removeDocumentListener(): void {
        if (!this._DOCUMENT_LISTENER) return;
        document.removeEventListener("click", this._DOCUMENT_LISTENER as EventListener, true);
        document.removeEventListener("keydown", this._DOCUMENT_LISTENER as EventListener, true);
        this._DOCUMENT_LISTENER = null;
    }

    private closeMenu(event: Event): void {
        if (!this._IS_OPEN.get()) return;
        this._IS_OPEN.set(false);
        this._removeDocumentListener();
        this.executeMethod("SELECT_CLOSE", event, {VALUE: this._COMPONENT_PROPS_BIND.prop_selectValue.get()} as any);
    }

    private toggleMenu(event: Event, disabled: CoreObservable.App<boolean>): void {
        event.preventDefault();
        if (disabled.get() || this._DISPOSED) return;
        if (this._IS_OPEN.get()) this.closeMenu(event);
        else {
            this._IS_OPEN.set(true);
            this._SEARCH.set("");
            this.executeMethod("SELECT_OPEN", event, {VALUE: this._COMPONENT_PROPS_BIND.prop_selectValue.get()} as any);
            this._addDocumentListener();
        }
    }
}

