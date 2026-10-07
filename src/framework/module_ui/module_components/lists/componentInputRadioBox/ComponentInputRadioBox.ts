import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputRadioBoxBase} from "./ComponentInputRadioBoxBase";
import {PropsConfigType, RadioBoxDirection, RadioOptionItem} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputRadioBoxStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentValidate from "../componentValidate";
import * as ComponentElementPosition from "../componentElementPosition";
import * as ComponentRecyclerView from "../componentRecyclerView";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputRadioBox extends ComponentInputRadioBoxBase {
    private readonly _CHILDREN: Child[] = [];
    private readonly _OPTION_CHILDREN: Child[] = [];
    private _VALIDATE_CHILD: Child | null = null;
    private _CURRENT_SELECTION = new CoreObservable.App<string | number | null>(null);
    private _SELECTION_SOURCE: any = null;
    private _SELECTION_UNSUBSCRIBE: (() => void) | null = null;
    private _INITIAL_CALLBACK_FIRED = false;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputRadioBox>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputRadioBoxStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._SELECTION_UNSUBSCRIBE?.();
        this._SELECTION_UNSUBSCRIBE = null;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this.releaseOptionChildren();
        if (this._VALIDATE_CHILD?.dispose) this._VALIDATE_CHILD.dispose();
        else this._VALIDATE_CHILD?.disposeStep?.();
        this._VALIDATE_CHILD = null;
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
            case Schemas.OPTIONS.part: return this.renderOptions(attrsDefault, data);
            case Schemas.OPTION.part: return this.renderOption(attrsDefault, extra);
            case Schemas.OPTION_CONTROL.part: return this.renderOptionControl(attrsDefault, extra);
            case Schemas.OPTION_ICON.part: return this.renderOptionIcon(attrsDefault, extra);
            case Schemas.OPTION_TITLE.part: return this.renderOptionTitle(attrsDefault, extra);
            case Schemas.OPTION_BODY.part: return this.renderOptionBody(attrsDefault, extra);
            case Schemas.SHARED_BODY.part: return this.renderSharedBody(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderLabel(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const title = data?.prop_labelTitle ?? bind.prop_labelTitle;
        const show = data?.prop_labelShow ?? bind.prop_labelShow;
        return CoreObservable.App.conditionWhen([show, title], (isShown: boolean, value: string | null) =>
            !!isShown && typeof value === "string" && value.trim().length > 0, () => {
            const labelProps: Record<string, any> = {};
            for (const name of Object.keys(ComponentLabelTrait.props)) labelProps[name] = data?.[name] ?? bind[name];
            const label = ComponentLabelTrait.createLabel(labelProps, {}, {unique: (this as any)._COMPONENT_STEP?.label?.click ?? undefined});
            this._CHILDREN.push(label as any);
            return label.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const options = data?.prop_options ?? bind.prop_options;
        const direction = data?.prop_direction ?? bind.prop_direction;
        const selected = data?.prop_itemSelected ?? bind.prop_itemSelected;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        this.syncSelection(selected);
        if (!this._INITIAL_CALLBACK_FIRED && bind.prop_firstCallback.get()) {
            this._INITIAL_CALLBACK_FIRED = true;
            queueMicrotask(() => {
                const initialValue = this._CURRENT_SELECTION.get();
                const list = options.get() as RadioOptionItem[];
                const index = Array.isArray(list) ? list.findIndex((item) => this.sameId(item.id, initialValue)) : -1;
                if (!this._DISPOSED && !disabled.get() && initialValue != null && index >= 0) {
                    this.executeMethod("SELECT_ITEM", new Event("change"), {ITEM_ID: initialValue, ITEM_INDEX: index});
                }
            });
        }
        return CoreReactive.App.section({attrs: {...attrs}, className: ["d-block", "w-100"], children: [
            this.executeSchemaPart(Schemas.OPTIONS.part, {}),
            this.executeSchemaPart(Schemas.SHARED_BODY.part, {}),
        ]});
    }

    private renderOptions(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const options = data?.prop_options ?? bind.prop_options;
        const direction = data?.prop_direction ?? bind.prop_direction;
        const optionElements = CoreObservable.App.computed((list: RadioOptionItem[]) => {
            this.releaseOptionChildren();
            return (Array.isArray(list) ? list : []).map((option, index) => this.executeSchemaPart(Schemas.OPTION.part, {option, index}));
        }, [options], this.getScope());
        const optionList = new ComponentRecyclerView.Component({
            prop_formComponents: optionElements as any,
            prop_formDirection: CoreObservable.App.computed((dir: RadioBoxDirection) => dir === RadioBoxDirection.HORIZONTAL ? "horizontal" : "vertical", [direction], this.getScope()) as any,
            prop_formClass: ["w-100", "gap-2"],
        } as any);
        this._CHILDREN.push(optionList as any);
        return CoreReactive.App.section({attrs: {...attrs}, className: ["w-100"], children: [optionList.getReactiveElement() as CoreReactive.App]});
    }

    private renderOption(attrs: PartAttrDefault, extra: {option?: RadioOptionItem; index?: number}): CoreReactive.App {
        const option = extra?.option;
        if (!option) return CoreReactive.App.section({attrs: {...attrs}, children: []});
        const selected = CoreObservable.App.computed((value: string | number | null) => this.sameId(value, option.id), [this._CURRENT_SELECTION], this.getScope());
        const disabled = this._COMPONENT_PROPS_BIND.prop_isDisable;
        const body = CoreObservable.App.conditionWhen([selected, this._COMPONENT_PROPS_BIND.prop_direction], (isSelected, dir) =>
            dir === RadioBoxDirection.VERTICAL && !!isSelected && option.body != null,
        () => this.executeSchemaPart(Schemas.OPTION_BODY.part, {option}), () => null, this.getScope()) as any;
        const direction = this._COMPONENT_PROPS_BIND.prop_direction;
        const horizontal = CoreObservable.App.computed((dir: RadioBoxDirection) => dir === RadioBoxDirection.HORIZONTAL, [direction], this.getScope());
        const heading = CoreReactive.App.section({className: ["d-flex", "align-items-center", "w-100"], children: [
            this.executeSchemaPart(Schemas.OPTION_CONTROL.part, {option, selected, disabled, index: extra.index}),
            this.executeSchemaPart(Schemas.OPTION_TITLE.part, {option, selected, disabled, index: extra.index}),
        ]});
        const layoutClasses = CoreObservable.App.computed((isHorizontal: boolean) =>
            isHorizontal ? ["flex-row", "align-items-center"] : ["flex-column", "align-items-stretch"],
        [horizontal], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, className: ["d-flex", "w-100"], classBind: [layoutClasses as any], styles: {cursor: "pointer"}, children: [
            heading,
            body as CoreReactive.App,
        ], on: {click: (event: Event) => this.selectItem(event, option, extra.index ?? 0)}});
    }

    private renderOptionControl(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const selected = extra.selected as CoreObservable.App<boolean>;
        const disabled = extra.disabled as CoreObservable.App<boolean>;
        const bind = this._COMPONENT_PROPS_BIND;
        const size = this.getControlSize();
        const borderColor = CoreObservable.App.computed(
            (value: boolean, isDisable: boolean, selectedColor: any, unselectedColor: any, disabledColor: any) => isDisable ? disabledColor : (value ? selectedColor : unselectedColor),
            [selected, disabled, bind.prop_borderIconColor_selected, bind.prop_borderIconColor_unSelected, bind.prop_borderIconColor_disable], this.getScope(),
        );
        const backgroundColor = CoreObservable.App.computed(
            (value: boolean, isDisable: boolean, selectedColor: any, unselectedColor: any, disabledColor: any) => isDisable ? disabledColor : (value ? selectedColor : unselectedColor),
            [selected, disabled, bind.prop_borderIconBackground_selected, bind.prop_borderIconBackground_unSelected, bind.prop_borderIconBackground_disable], this.getScope(),
        );
        const borderStyles = CoreObservable.App.computed((baseStyles: Record<string, any>, width: any) => {
            const widthValue = typeof width === "number" ? UtilStyle.Css_SizeUnit(width, UtilConst.Units.PEXEL) : UtilStyle.Css_BorderWidth(width);
            return {
                ...(baseStyles ?? {}), width: "100%", height: "100%", transition: "150ms ease",
                boxShadow: "#00000047 0px 0px 5px, inset 0 2px 4px #0000004d",
                "border-top-width": UtilStyle.Style_Important(widthValue), "border-right-width": UtilStyle.Style_Important(widthValue),
                "border-bottom-width": UtilStyle.Style_Important(widthValue), "border-left-width": UtilStyle.Style_Important(widthValue),
                "border-radius": "100%",
            };
        }, [bind.prop_borderIconStyles, bind.prop_borderIconWidth], this.getScope());
        const icon = this.renderOptionIcon(attrs, extra);
        const rtl = CoreConfig.Settings.DirectionRtl.observable();
        const margin = CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_Margin(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        const containerStyles = CoreObservable.App.computed((isRtl: boolean, sideMargin: any, sizeName: any) => ({
            width: "auto", float: isRtl ? "right" : "left", marginLeft: sideMargin, marginRight: sideMargin, marginTop: UtilStyle.Css_Margin(sizeName),
        }), [rtl, margin, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const border = new ComponentBorder.Component({
            styles: containerStyles as any,
            prop_structureClass: ["position-relative"],
            prop_structureStyles: CoreObservable.App.computed((controlSize: any) => ({position: "relative", cursor: "pointer", display: "block", width: controlSize, height: controlSize}), [size], this.getScope()),
            prop_content: icon,
            prop_borderClass: bind.prop_borderIconClass,
            prop_borderStyles: borderStyles,
            prop_borderOpacity: bind.prop_borderIconOpacity,
            prop_borderColor: borderColor,
            prop_contentBackgroundColor: backgroundColor,
        } as any, {CLICK_BORDER: (event: Event) => {event.preventDefault(); event.stopPropagation(); this.selectItem(event, extra.option, extra.index ?? 0);}} as any);
        this._OPTION_CHILDREN.push(border as any);
        const element = border.getElement() as HTMLElement;
        element.setAttribute("data-part-name", attrs["data-part-name"] ?? Schemas.OPTION_CONTROL.part);
        if (attrs.id) element.id = attrs.id;
        return element as any as CoreReactive.App;
    }

    private renderOptionIcon(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const selected = extra?.selected as CoreObservable.App<boolean>;
        const iconSize = this.getRadioGlyphSize();
        const icon = CoreObservable.App.computed((isSelected: boolean, custom: any, size: any) => {
            if (!isSelected) return null;
            const iconInstance = custom ?? UiIcons.CreateIcon(UiIcons.Src.ShapeCircle.Definition, {size, primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)});
            const svg = (iconInstance as any)?.getElement?.() as SVGSVGElement | undefined;
            if (svg) {
                svg.style.position = "absolute";
                svg.style.left = "50%";
                svg.style.top = "50%";
                svg.style.transform = "translate(-50%, -50%)";
            }
            return iconInstance;
        }, [selected, this._COMPONENT_PROPS_BIND.prop_icon, iconSize], this.getScope());
        const iconStyles = CoreObservable.App.computed((styles: Record<string, any>, size: any) => ({
            ...(styles ?? {}),
            outline: "none",
            display: "block",
            position: "relative",
            width: UtilStyle.Css_IconSize(size),
            height: UtilStyle.Css_IconSize(size),
        }), [this._COMPONENT_PROPS_BIND.prop_iconStyles, CoreConfig.Settings.SizeName.observable()], this.getScope());
        const child = new ComponentIcon.Component({
            prop_structureClass: ["w-100"],
            prop_structureStyles: {width: "100%", height: "100%"},
            prop_icon: icon as any, prop_iconClass: this._COMPONENT_PROPS_BIND.prop_iconClass, prop_iconStyles: iconStyles as any,
        } as any);
        this._OPTION_CHILDREN.push(child as any);
        const position = new ComponentElementPosition.Component({
            prop_positionClass: ["d-block"],
            prop_positionStyles: {width: "100%", height: "100%"},
            prop_positionType: "relative" as any,
            prop_content: child.getReactiveElement(),
        } as any);
        this._OPTION_CHILDREN.push(position as any);
        const element = position.getElement() as HTMLElement;
        element.setAttribute("data-part-name", attrs["data-part-name"] ?? Schemas.OPTION_ICON.part);
        if (attrs.id) element.id = attrs.id;
        return element as any as CoreReactive.App;
    }

    private renderOptionTitle(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const option = extra.option as RadioOptionItem;
        const selected = extra.selected as CoreObservable.App<boolean>;
        const disabled = extra.disabled as CoreObservable.App<boolean>;
        const bind = this._COMPONENT_PROPS_BIND;
        const titleStyles = CoreObservable.App.computed((sizeName: any, isRtl: boolean, customStyles: Record<string, any>) => ({
            ...(customStyles ?? {}),
            height: UtilStyle.Css_Height(sizeName),
            lineHeight: UtilStyle.Css_SizeCalc(
                UtilStyle.Css_IconSize(sizeName) as any,
                UtilConst.Operation.ADD,
                UtilStyle.Css_Padding(sizeName) as any,
                UtilConst.Operation.ADD,
                UtilStyle.Css_Padding(sizeName) as any,
            ),
            marginTop: UtilStyle.Css_Margin(sizeName),
            marginBottom: UtilStyle.Css_Margin(sizeName),
            marginLeft: isRtl ? null : UtilStyle.Css_Margin(sizeName),
            marginRight: isRtl ? UtilStyle.Css_Margin(sizeName) : null,
            color: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        }), [CoreConfig.Settings.SizeName.observable(), CoreConfig.Settings.DirectionRtl.observable(), bind.prop_titleStyles], this.getScope());
        return CoreReactive.App.b({attrs: {...attrs}, classBind: [bind.prop_titleShow.mapBoolean("", "d-none"), bind.prop_titleClass], stylesBind: titleStyles, children: [option.name], on: {click: (event: Event) => {event.stopPropagation(); this.selectItem(event, option, extra.index ?? 0);}}});
    }

    private renderOptionBody(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const borderMargins = CoreObservable.App.computed((isRtl: boolean, sizeName: any) => {
            const margin = UtilStyle.Css_Margin(sizeName);
            return {
                width: "100%",
                marginTop: margin,
                marginLeft: isRtl ? null : margin,
                marginRight: isRtl ? margin : null,
            };
        }, [CoreConfig.Settings.DirectionRtl.observable(), CoreConfig.Settings.SizeName.observable()], this.getScope());
        const content = CoreReactive.App.section({
            className: ["w-100"],
            stylesBind: {
                padding: CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_Padding(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope()),
            },
            children: [this.bodyElement(extra?.option?.body)],
        });
        const border = new ComponentBorder.Component({
            styles: borderMargins as any,
            prop_width: "100%",
            prop_borderClass: ["w-100"],
            prop_content: content,
        } as any);
        this._OPTION_CHILDREN.push(border as any);
        const element = border.getElement() as HTMLElement;
        if (attrs["data-part-name"]) element.setAttribute("data-part-name", attrs["data-part-name"]);
        if (attrs.id) element.id = attrs.id;
        return element as any as CoreReactive.App;
    }

    private renderSharedBody(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const selected = data?.prop_itemSelected ?? bind.prop_itemSelected;
        const options = data?.prop_options ?? bind.prop_options;
        const direction = data?.prop_direction ?? bind.prop_direction;
        const body = CoreObservable.App.computed((value: string | number | null, list: RadioOptionItem[], dir: RadioBoxDirection) => {
            if (dir !== RadioBoxDirection.HORIZONTAL) return null;
            const option = (Array.isArray(list) ? list : []).find((item) => this.sameId(item.id, value));
            return this.bodyElement(option?.body);
        }, [selected, options, direction], this.getScope());
        const display = CoreObservable.App.computed((value: string | number | null, list: RadioOptionItem[], dir: RadioBoxDirection) => {
            if (dir !== RadioBoxDirection.HORIZONTAL) return "none";
            const option = (Array.isArray(list) ? list : []).find((item) => this.sameId(item.id, value));
            return option?.body == null ? "none" : "block";
        }, [selected, options, direction], this.getScope());
        const sharedStyles = CoreObservable.App.computed((isRtl: boolean, sizeName: any, displayValue: string) => {
            const margin = UtilStyle.Css_Margin(sizeName);
            return {
                width: "100%",
                display: displayValue,
                marginTop: margin,
                marginLeft: isRtl ? null : margin,
                marginRight: isRtl ? margin : null,
            };
        }, [CoreConfig.Settings.DirectionRtl.observable(), CoreConfig.Settings.SizeName.observable(), display], this.getScope());
        const content = CoreReactive.App.section({
            className: ["w-100"],
            stylesBind: {
                padding: CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_Padding(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope()),
            },
            children: [body],
        });
        const border = new ComponentBorder.Component({
            styles: sharedStyles as any,
            prop_width: "100%",
            prop_borderClass: ["w-100"],
            prop_content: content,
        } as any);
        this._OPTION_CHILDREN.push(border as any);
        const element = border.getElement() as HTMLElement;
        if (attrs["data-part-name"]) element.setAttribute("data-part-name", attrs["data-part-name"]);
        if (attrs.id) element.id = attrs.id;
        return element as any as CoreReactive.App;
    }

    private renderValidate(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([rules, disabled], (list: any[], isDisabled: boolean) => Array.isArray(list) && list.length > 0 && !isDisabled,
            () => {
                const child = new ComponentValidate.Component({prop_listRules: rules as any, prop_msgRules: (data?.prop_msgRules ?? bind.prop_msgRules) as any,
                    prop_isAbsolute: (data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule) as any,
                    prop_title: CoreObservable.App.computed((title: string, label: string) => title || label || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any,
                    prop_value: this._CURRENT_SELECTION as any, prop_referenceComponent: this} as any);
                if (this._VALIDATE_CHILD?.dispose) this._VALIDATE_CHILD.dispose();
                else this._VALIDATE_CHILD?.disposeStep?.();
                this._VALIDATE_CHILD = child as any;
                const element = child.getElement() as HTMLElement;
                element.setAttribute("data-part-name", attrs["data-part-name"] ?? Schemas.VALIDATE.part);
                if (attrs.id) element.id = attrs.id;
                return element as any as CoreReactive.App;
            }, () => null, this.getScope()) as any;
    }

    private selectItem(event: Event, option: RadioOptionItem, index: number): void {
        if (this.get("prop_isDisable")) return;
        this.set("prop_itemSelected", option.id);
        this._CURRENT_SELECTION.set(option.id);
        this.executeMethod("SELECT_ITEM", event, {ITEM_ID: option.id, ITEM_INDEX: index});
    }

    private syncSelection(source: any): void {
        if (source === this._SELECTION_SOURCE) return;
        this._SELECTION_UNSUBSCRIBE?.();
        this._SELECTION_UNSUBSCRIBE = null;
        this._SELECTION_SOURCE = source;
        if (CoreObservable.App.isObservable(source)) {
            this._CURRENT_SELECTION.set(source.get() ?? null);
            this._SELECTION_UNSUBSCRIBE = source.subscribe((value: any) => this._CURRENT_SELECTION.set(value ?? null), this.getScope());
        } else this._CURRENT_SELECTION.set(source ?? null);
    }

    private bodyElement(body: any): any {
        if (body == null || typeof body === "string" || typeof body === "number") return body ?? "";
        if (body instanceof Node) return body as any;
        if (body instanceof CoreReactive.App) return body.getElement();
        if (CoreObservable.App.isObservable(body)) return this.bodyElement(body.get());
        if (typeof body.getReactiveElement === "function") return body.getReactiveElement();
        if (typeof body.getElement === "function") return body.getElement();
        return "";
    }

    private getControlSize(): CoreObservable.App<any> {
        return CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_SizeCalc(
            UtilStyle.Css_IconSize(sizeName) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(sizeName) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(sizeName) as any,
            UtilConst.Operation.DIV,
            "2" as any,
        ), [CoreConfig.Settings.SizeName.observable()], this.getScope());
    }

    private getRadioGlyphSize(): CoreObservable.App<any> {
        return CoreObservable.App.computed((sizeName: any) => UtilStyle.Css_SizeCalc(
            "(" as any,
            UtilStyle.Css_IconSize(sizeName) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(sizeName) as any,
            UtilConst.Operation.ADD,
            UtilStyle.Css_Padding(sizeName) as any,
            ")" as any,
            UtilConst.Operation.DIV,
            "2" as any,
        ), [CoreConfig.Settings.SizeName.observable()], this.getScope());
    }

    private releaseOptionChildren(): void {
        this._OPTION_CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._OPTION_CHILDREN.length = 0;
    }

    private sameId(left: any, right: any): boolean { return left != null && right != null && left === right; }
}
