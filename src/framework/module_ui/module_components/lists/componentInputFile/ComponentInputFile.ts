import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import {ComponentInputFileBase} from "./ComponentInputFileBase";
import {PropsConfigType, FileItemError} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createInputFileStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentLabelTrait} from "../../traits/componentLabelTrait";
import * as ComponentIcon from "../componentIcon";
import * as ComponentBorder from "../componentBorder";
import * as ComponentRecyclerView from "../componentRecyclerView";
import * as ComponentWindowConfirm from "../componentWindowConfirm";
import * as ComponentValidate from "../componentValidate";

type Child = {dispose?: () => void; disposeStep?: () => void};

export class ComponentInputFile extends ComponentInputFileBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _INPUT_ID = 'component-input-file-' + (++ComponentInputFile._INSTANCE_COUNT);
    private readonly _VALID_FILES = new CoreObservable.App<File[]>([]);
    private readonly _INVALID_FILES = new CoreObservable.App<FileItemError[]>([]);
    private readonly _DRAGGING = new CoreObservable.App(false);
    private readonly _CHILDREN: Child[] = [];
    private readonly _ROW_CHILDREN: Child[] = [];
    private _WINDOW_CONFIRM: InstanceType<typeof ComponentWindowConfirm.Component> | null = null;
    private _WINDOW_CONFIRM_ELEMENT: HTMLElement | null = null;
    private _PENDING_DELETE: File | null = null;
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentInputFile>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createInputFileStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._ROW_CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._ROW_CHILDREN.length = 0;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this._WINDOW_CONFIRM_ELEMENT?.remove();
        this._WINDOW_CONFIRM_ELEMENT = null;
        this._WINDOW_CONFIRM = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [
            this.executeSchemaPart(ComponentLabelTrait.schemas.LABEL.part, {}),
            this.executeSchemaPart(Schemas.FORM.part, {}),
            this.executeSchemaPart(Schemas.DELETE_CONFIRM.part, {}),
            this.executeSchemaPart(Schemas.VALIDATE.part, {}),
        ]});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case ComponentLabelTrait.schemas.LABEL.part: return this.renderLabel(data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.VALUE.part: return this.renderValue(data);
            case Schemas.DROP_ZONE.part: return this.renderDropZone(attrsDefault, data);
            case Schemas.DROP_ZONE_TEXT.part: return this.renderDropZoneText(attrsDefault, data);
            case Schemas.FILES.part: return this.renderFiles(attrsDefault);
            case Schemas.FILE_ITEM.part: return this.renderFileItem(attrsDefault, extra);
            case Schemas.FILE_ITEM_INVALID.part: return this.renderInvalidItem(attrsDefault, extra);
            case Schemas.DELETE_CONFIRM.part: return this.renderDeleteConfirm(attrsDefault, data);
            case Schemas.VALIDATE.part: return this.renderValidate(data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
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
            props.prop_labelFor = this._INPUT_ID;
            props.styles = CoreObservable.App.computed((custom: Record<string, string>, size: any) => ({...(custom ?? {}), marginBlockEnd: UtilStyle.Css_Margin(size)}), [data?.styles ?? bind.styles, CoreConfig.Settings.SizeName.observable()], this.getScope());
            const child = ComponentLabelTrait.createLabel(props, {CLICK: () => this.getInput()?.click()});
            this._CHILDREN.push(child as any);
            return child.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private renderForm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const gap = CoreObservable.App.computed((size: any) => UtilStyle.Css_Margin(size), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, stylesBind: CoreObservable.App.computed((value: string) => ({display: "flex", flexDirection: "column", width: "100%", gap: value}), [gap], this.getScope()), children: [
            this.executeSchemaPart(Schemas.VALUE.part, {}),
            this.executeSchemaPart(Schemas.DROP_ZONE.part, {}),
            CoreObservable.App.conditionWhen([data?.prop_showListFiles ?? this._COMPONENT_PROPS_BIND.prop_showListFiles], (show) => !!show, () => this.executeSchemaPart(Schemas.FILES.part, {}), () => null, this.getScope()) as any,
        ]});
    }

    private renderValue(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const accept = data?.prop_accept ?? bind.prop_accept;
        const count = data?.prop_maxCount ?? bind.prop_maxCount;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        const acceptValue = CoreObservable.App.computed((value: string) => !value || value === "*" ? null : value, [accept], this.getScope());
        const multiple = CoreObservable.App.computed((value: number | null) => value == null || value > 1, [count], this.getScope());
        return CoreReactive.App.input({attrs: {id: this._INPUT_ID, type: "file"}, attrsBind: {
            name: data?.prop_name ?? bind.prop_name,
            accept: acceptValue,
            multiple,
            disabled,
            "aria-label": data?.prop_labelTitle ?? bind.prop_labelTitle,
        } as any, styles: {position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", border: "0", pointerEvents: "none"}, on: {
            change: (event: Event) => this.processFiles(Array.from((event.currentTarget as HTMLInputElement).files ?? []), event),
        }} as any) as CoreReactive.App;
    }

    private renderDropZone(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const disabled = data?.prop_isDisable ?? this._COMPONENT_PROPS_BIND.prop_isDisable;
        const borderColor = data?.prop_borderColor ?? this._COMPONENT_PROPS_BIND.prop_borderColor;
        const hoverColor = data?.prop_borderColorHover ?? this._COMPONENT_PROPS_BIND.prop_borderColorHover;
        const height = data?.prop_borderHeight ?? this._COMPONENT_PROPS_BIND.prop_borderHeight;
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const style = CoreObservable.App.computed((isDisabled: boolean, dragging: boolean, normal: string, hover: string, zoneHeight: string, size: any) => ({
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", 
            border: UtilStyle.Css_BorderWidth(size) + " dashed " + (dragging ? hover : normal),
            borderRadius: UtilStyle.Css_BorderRadius(size),
            height: zoneHeight,
            color: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_3),
            cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? "0.6" : "1", transition: "border-color 160ms ease, background-color 160ms ease",
            backgroundColor: dragging ? UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3) : "transparent",
        }), [disabled, this._DRAGGING, borderColor, hoverColor, height, sizeName], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs, role: "button", tabIndex: "0"}, attrsBind: {"aria-disabled": disabled} as any, stylesBind: style, on: {
            click: (event: Event) => {event.preventDefault(); if (!disabled.get()) this.getInput()?.click();},
            keydown: (event: KeyboardEvent) => {if (!disabled.get() && (event.key === "Enter" || event.key === " ")) {event.preventDefault(); this.getInput()?.click();}},
            dragenter: (event: DragEvent) => {event.preventDefault(); if (!disabled.get()) this._DRAGGING.set(true);},
            dragover: (event: DragEvent) => {event.preventDefault(); if (!disabled.get()) this._DRAGGING.set(true);},
            dragleave: (event: DragEvent) => {event.preventDefault(); this._DRAGGING.set(false);},
            drop: (event: DragEvent) => {event.preventDefault(); this._DRAGGING.set(false); if (!disabled.get()) this.processFiles(Array.from(event.dataTransfer?.files ?? []), event);},
        }, children: [this.executeSchemaPart(Schemas.DROP_ZONE_TEXT.part, {})]});
    }

    private renderDropZoneText(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const text = data?.prop_text ?? this._COMPONENT_PROPS_BIND.prop_text;
        const textColor = data?.prop_textColor ?? this._COMPONENT_PROPS_BIND.prop_textColor;
        const fallback = CoreLanguage.App.translate(Keys.category.components.inputFile.texts.dropHint);
        const display = CoreObservable.App.computed((custom: string, translated: string) => custom || translated, [text, fallback], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, styles: {padding: UtilStyle.Css_Padding(CoreConfig.Settings.SizeName.get()), color: textColor as any, textAlign: "center", pointerEvents: "none", position: "relative", zIndex: "2"}, children: [display as any]});
    }

    private renderFiles(attrs: PartAttrDefault): CoreReactive.App {
        const rows = CoreObservable.App.computed((valid: File[], invalid: FileItemError[]) => {
            this._ROW_CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
            this._ROW_CHILDREN.length = 0;
            return [
                ...(valid ?? []).map((file) => this.executeSchemaPart(Schemas.FILE_ITEM.part, file)),
                ...(invalid ?? []).map((item) => this.executeSchemaPart(Schemas.FILE_ITEM_INVALID.part, item)),
            ];
        }, [this._VALID_FILES, this._INVALID_FILES], this.getScope());
        const list = new ComponentRecyclerView.Component({
            prop_formDirection: "vertical",
            prop_formComponents: rows as any,
            prop_formClass: ["d-flex", "flex-column"],
            prop_formStyles: {width: "100%"},
        } as any);
        this._CHILDREN.push(list as any);
        return CoreReactive.App.section({attrs: {...attrs}, styles: {width: "100%"}, children: [list.getReactiveElement() as any]});
    }

    private renderFileItem(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const file = extra as File | undefined;
        if (!file) return CoreReactive.App.section({attrs: {...attrs}, children: []});
        const bind = this._COMPONENT_PROPS_BIND;
        const sizeName = CoreConfig.Settings.SizeName.get();
        const iconBoxStyles = CoreObservable.App.computed((size: any) => {
            const iconBoxSize = "calc(" + UtilStyle.Css_Padding(size) + " + " + UtilStyle.Css_Height(size) + " + " + UtilStyle.Css_Padding(size) + ")";
            return {
                display: "block", width: iconBoxSize, direction: "ltr", height: iconBoxSize,
                flex: "0 0 auto", textAlign: "center", opacity: "1",
            };
        }, [CoreConfig.Settings.SizeName.observable()], this.getScope());
        const removeIconStyles = CoreObservable.App.computed((size: any) => {
            const iconBoxSize = "calc(" + UtilStyle.Css_Padding(size) + " + " + UtilStyle.Css_Height(size) + " + " + UtilStyle.Css_Padding(size) + ")";
            return {
                display: "block", width: iconBoxSize, direction: "ltr", height: iconBoxSize,
                flex: "0 0 " + iconBoxSize, textAlign: "center", opacity: "1",
                cursor: "pointer", margin: "auto", lineHeight: iconBoxSize,
                transition: "background-color 160ms ease",
            };
        }, [CoreConfig.Settings.SizeName.observable()], this.getScope());
        const remove = new ComponentIcon.Component({
            styles: removeIconStyles as any,
            prop_icon: UiIcons.CreateIcon(UiIcons.Src.FilesDelete.Definition, {
                size: CoreConfig.Settings.SizeName.observable(),
                primaryColor: bind.prop_color_itemFile_icons,
                secondaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            }),
            prop_iconStyles: removeIconStyles as any,
        } as any, {CLICK: (event) => {event.preventDefault(); this.requestDelete(file);}} as any);
        this._ROW_CHILDREN.push(remove as any);
        const icon = new ComponentIcon.Component({
            styles: iconBoxStyles as any,
            prop_icon: UiIcons.CreateIcon(UiIcons.Src.FileAttachment.Definition, {size: CoreConfig.Settings.SizeName.observable(), primaryColor: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)}),
            prop_iconStyles: iconBoxStyles as any,
        } as any);
        this._ROW_CHILDREN.push(icon as any);
        const extension = file.name.includes(".") ? file.name.split(".").pop()!.toUpperCase() : "FILE";
        const makeChipStyles = (backgroundColor: string, borderColor: string) => ({
            display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap",
            paddingInline: UtilStyle.Css_Padding(sizeName), paddingBlock: "2px",
            backgroundColor, border: UtilStyle.Css_BorderWidth(sizeName) + " solid " + borderColor,
            borderRadius: UtilStyle.Css_BorderRadius(sizeName),
        });
        const content = CoreReactive.App.section({styles: {
            display: "flex", alignItems: "center", gap: UtilStyle.Css_Margin(sizeName),
            padding: UtilStyle.Css_Padding(sizeName), color: bind.prop_color_itemFile as any,
        }, children: [
            icon.getReactiveElement() as CoreReactive.App,
            CoreReactive.App.b({styles: {fontWeight: "600", flex: "1 1 auto", minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)}, attrs: {title: file.name}, children: [file.name]}),
            CoreReactive.App.b({styles: {...makeChipStyles(UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)), border: "none", width: "5rem", minWidth: "5rem", flex: "0 0 5rem", boxSizing: "border-box"}, children: [CoreObservable.App.computed((unit: string) => (file.size / 1024).toFixed(1) + " " + unit, [CoreLanguage.App.translate(Keys.category.components.inputFile.texts.fileSizeUnit)], this.getScope()) as any]}),
            CoreReactive.App.b({styles: {...makeChipStyles(UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1)), border: "none", color: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), width: "5rem", minWidth: "5rem", flex: "0 0 5rem", boxSizing: "border-box"}, attrs: {title: file.type || extension}, children: [extension]}),
            remove.getReactiveElement() as CoreReactive.App,
        ]});
        const border = new ComponentBorder.Component({
            prop_borderClass: ["position-relative", "w-100"],
            prop_borderStyles: {display: "block", padding: UtilStyle.Css_Padding(sizeName), transition: "background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease", boxShadow: "0 1px 3px rgba(0,0,0,.08)"},
            prop_content: content as any,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_contentColor: bind.prop_color_itemFile as any,
            prop_borderColor: null,
            prop_borderTopHas: false,
            prop_borderRightHas: false,
            prop_borderBottomHas: false,
            prop_borderLeftHas: false,
        } as any);
        this._ROW_CHILDREN.push(border as any);
        return CoreReactive.App.section({attrs: {...attrs}, styles: {
            width: "100%", marginBlockStart: UtilStyle.Css_Margin(sizeName), marginBlockEnd: UtilStyle.Css_Margin(sizeName),
        }, children: [border.getReactiveElement() as any]});
    }

    private renderInvalidItem(attrs: PartAttrDefault, extra: any): CoreReactive.App {
        const item = extra as FileItemError | undefined;
        if (!item?.file) return CoreReactive.App.section({attrs: {...attrs}, children: []});
        const sizeName = CoreConfig.Settings.SizeName.get();
        const content = CoreReactive.App.section({styles: {display: "flex", flexDirection: "column", gap: "4px", padding: UtilStyle.Css_Padding(sizeName)}, children: [
            CoreReactive.App.section({styles: {fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}, attrs: {title: item.file.name}, children: [item.file.name]}),
            ...item.errors.map((error) => CoreReactive.App.section({styles: {fontSize: "0.9em"}, children: ["• ", error]})),
        ]});
        const border = new ComponentBorder.Component({
            prop_borderClass: ["position-relative", "w-100"],
            prop_borderStyles: {display: "block", padding: "0"},
            prop_content: content as any,
            prop_contentBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
            prop_contentColor: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_5),
            prop_borderColor: UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_3),
        } as any);
        this._ROW_CHILDREN.push(border as any);
        return CoreReactive.App.section({attrs: {...attrs}, styles: {width: "100%"}, children: [border.getReactiveElement() as any]});
    }

    private renderDeleteConfirm(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        if (!this._WINDOW_CONFIRM) {
            const question = CoreLanguage.App.translate(Keys.category.components.inputFile.texts.deleteQuestion);
            this._WINDOW_CONFIRM = new ComponentWindowConfirm.Component({
                prop_title: CoreLanguage.App.translate(Keys.category.components.inputFile.texts.deleteTitle) as any,
                prop_message: CoreObservable.App.computed((custom: string, fallback: string) => custom || fallback, [data?.prop_deleteBody ?? bind.prop_deleteBody, question], this.getScope()) as any,
                prop_acceptText: CoreObservable.App.computed((custom: string) => custom || CoreLanguage.App.translate(Keys.category.components.inputFile.texts.accept).get(), [data?.prop_deleteBtnAccept ?? bind.prop_deleteBtnAccept], this.getScope()) as any,
                prop_cancelText: CoreObservable.App.computed((custom: string) => custom || CoreLanguage.App.translate(Keys.category.components.inputFile.texts.cancel).get(), [data?.prop_deleteBtnCancel ?? bind.prop_deleteBtnCancel], this.getScope()) as any,
            } as any, {
                CONFIRM: (event) => this.confirmDelete(event),
                CANCEL: () => {this._PENDING_DELETE = null;},
            } as any);
            this._WINDOW_CONFIRM_ELEMENT = this._WINDOW_CONFIRM.getElement() as HTMLElement;
            document.body.appendChild(this._WINDOW_CONFIRM_ELEMENT);
            this._WINDOW_CONFIRM.call_close();
            this._CHILDREN.push(this._WINDOW_CONFIRM as any);
        }
        // Keep the confirmation window at document level so its configured popup z-index
        // is not trapped inside an ancestor stacking context.
        return CoreReactive.App.section({attrs: {...attrs}, styles: {display: "none"}});
    }

    private renderValidate(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const enabled = data?.prop_hasRules ?? bind.prop_hasRules;
        const rules = data?.prop_listRules ?? bind.prop_listRules;
        const disabled = data?.prop_isDisable ?? bind.prop_isDisable;
        return CoreObservable.App.conditionWhen([enabled, rules, disabled], (hasRules, list, isDisabled) => !!hasRules && !isDisabled && Array.isArray(list) && list.length > 0, () => {
            const validator = new ComponentValidate.Component({prop_listRules: rules as any, prop_msgRules: (data?.prop_msgRules ?? bind.prop_msgRules) as any, prop_isAbsolute: (data?.prop_isAbsoluteRule ?? bind.prop_isAbsoluteRule) as any, prop_title: CoreObservable.App.computed((custom: string | null, title: string | null) => custom || title || "", [data?.prop_title ?? bind.prop_title, data?.prop_labelTitle ?? bind.prop_labelTitle], this.getScope()) as any, prop_value: this._VALID_FILES as any, prop_referenceComponent: this} as any);
            this._CHILDREN.push(validator as any);
            return validator.getReactiveElement() as CoreReactive.App;
        }, () => null, this.getScope()) as any;
    }

    private processFiles(files: File[], event: Event): void {
        const maxSize = this._COMPONENT_PROPS_BIND.prop_maxSize.get();
        const maxCount = this._COMPONENT_PROPS_BIND.prop_maxCount.get();
        const accept = this._COMPONENT_PROPS_BIND.prop_accept.get() || "*";
        const valid: File[] = [];
        const invalid: FileItemError[] = [];
        const maxBytes = maxSize == null ? null : Math.max(0, Number(maxSize) * 1000);
        const readableMaxSize = maxBytes == null ? "" : (maxBytes / 1024).toFixed(2);
        for (const file of files) {
            const errors: string[] = [];
            if (maxBytes != null && file.size > maxBytes) errors.push(this.template(this.valueOf(this._COMPONENT_PROPS_BIND.prop_textValidateSize.get()), CoreLanguage.App.translate(Keys.category.components.inputFile.texts.validateSize).get()).replace(/{{fileMaxSize}}/g, readableMaxSize));
            if (!this.accepts(file, accept)) errors.push(this.template(this.valueOf(this._COMPONENT_PROPS_BIND.prop_textValidateAccept.get()), CoreLanguage.App.translate(Keys.category.components.inputFile.texts.validateAccept).get()).replace(/{{fileAccept}}/g, accept));
            if (errors.length) invalid.push({file, errors});
            else if (maxCount == null || valid.length < Math.max(0, maxCount)) valid.push(file);
        }
        this._VALID_FILES.set(valid);
        this._INVALID_FILES.set(invalid);
        this.writeNativeFiles(valid);
        this.executeMethod("CHANGE_FILES", event, {FILES: valid, VALID_FILES: valid, INVALID_FILES: invalid});
    }

    private valueOf(value: any): string {return CoreObservable.App.isObservable(value) ? value.get() ?? "" : value ?? "";}
    private template(value: string | null | undefined, fallback: string): string {return value || fallback;}
    private accepts(file: File, accept: string): boolean {
        if (!accept || accept.trim() === "*") return true;
        return accept.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean).some((rule) => {
            if (rule.startsWith(".")) return file.name.toLowerCase().endsWith(rule);
            if (rule.endsWith("/*")) return file.type.toLowerCase().startsWith(rule.slice(0, -1));
            return file.type.toLowerCase() === rule;
        });
    }

    private requestDelete(file: File): void {
        this._PENDING_DELETE = file;
        this._WINDOW_CONFIRM?.call_open();
    }

    private confirmDelete(event: Event): void {
        const target = this._PENDING_DELETE;
        if (!target) return;
        this._PENDING_DELETE = null;
        const remaining = this._VALID_FILES.get().filter((file) => file !== target);
        this._VALID_FILES.set(remaining);
        this.writeNativeFiles(remaining);
        this.executeMethod("CHANGE_FILES", event, {FILES: remaining, VALID_FILES: remaining, INVALID_FILES: this._INVALID_FILES.get()});
        this.executeMethod("DELETE_FILE", event, {FILE_NAME: target.name});
    }

    private getInput(): HTMLInputElement | null {return document.getElementById(this._INPUT_ID) as HTMLInputElement | null;}
    private writeNativeFiles(files: File[]): void {
        const input = this.getInput();
        if (!input || typeof DataTransfer === "undefined") return;
        try {const transfer = new DataTransfer(); files.forEach((file) => transfer.items.add(file)); input.files = transfer.files;} catch { /* FileList assignment is unsupported in some browsers. */ }
    }
}
