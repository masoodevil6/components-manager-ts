import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilTools from "@/util_tools";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import {PartAttrDefault} from "@/core_components";
import {ComponentFormBase} from "./ComponentFormBase";
import {PropsConfigType, SubmitButtonConfig} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createFormStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentButton from "../componentButton";
import {ButtonAction, ButtonSemantic} from "../componentButton/Props";
import * as ComponentMessages from "../componentMessages";
import {MessageTypes} from "../componentMessages/Props";
import * as ComponentLoading from "../componentLoading";
import * as ComponentWebCode from "../componentWebCode";

type Child = {dispose?: () => void; disposeStep?: () => void};
type ResponsePayload = {resultExp: unknown; response: unknown};

export class ComponentForm extends ComponentFormBase {
    private static _INSTANCE_COUNT = 0;
    private readonly _FORM_ID = `component-form-native-${++ComponentForm._INSTANCE_COUNT}`;
    private readonly _IS_LOADING = new CoreObservable.App(false);
    private readonly _SHOW_404 = new CoreObservable.App(false);
    private readonly _MESSAGES = new CoreObservable.App<any[]>([]);
    private readonly _MESSAGE_TYPE = new CoreObservable.App(MessageTypes.CUSTOM);
    private readonly _CHILDREN: Child[] = [];
    private _DISPOSED = false;

    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentForm>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity, createFormStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({attrs: {...attrsDefault}, children: [this.executeSchemaPart(Schemas.FORM.part, {})]});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault);
            case Schemas.BORDER.part: return this.renderBorder(data);
            case Schemas.BODY.part: return this.renderBody(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [this.executeSchemaPart(Schemas.BORDER.part, {})],
        });
    }

    private renderBorder(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const oldStructureClass = data?.prop_borderClass ?? bind.prop_borderClass;
        const newStructureClass = data?.prop_componentBorderStructureClass ?? bind.prop_componentBorderStructureClass;
        const oldBorderStyles = data?.prop_borderStyles ?? bind.prop_borderStyles;
        const borderContent = this.executeSchemaPart(Schemas.BODY.part, {});
        const child = new ComponentBorder.Component({
            selector: (data?.prop_componentBorderSelector ?? bind.prop_componentBorderSelector) as any,
            append: (data?.prop_componentBorderAppend ?? bind.prop_componentBorderAppend) as any,
            classList: (data?.prop_componentBorderClassList ?? bind.prop_componentBorderClassList) as any,
            styles: (data?.prop_componentBorderElementStyles ?? bind.prop_componentBorderElementStyles) as any,
            prop_show: (data?.prop_componentBorderShow ?? bind.prop_componentBorderShow) as any,
            prop_structureClass: CoreObservable.App.computed((legacy: string[], custom: string[] | null) => custom ?? legacy, [oldStructureClass, newStructureClass], this.getScope()) as any,
            prop_structureStyles: (data?.prop_componentBorderStructureStyles ?? bind.prop_componentBorderStructureStyles) as any,
            prop_content: borderContent as any,
            prop_contentSize: (data?.prop_componentBorderContentSize ?? bind.prop_componentBorderContentSize) as any,
            prop_contentColor: (data?.prop_componentBorderContentColor ?? bind.prop_componentBorderContentColor) as any,
            prop_contentColor_hover: (data?.prop_componentBorderContentColorHover ?? bind.prop_componentBorderContentColorHover) as any,
            prop_contentBackgroundColor: (data?.prop_componentBorderContentBackgroundColor ?? bind.prop_componentBorderContentBackgroundColor) as any,
            prop_contentBackgroundColor_hover: (data?.prop_componentBorderContentBackgroundColorHover ?? bind.prop_componentBorderContentBackgroundColorHover) as any,
            prop_borderColor: (data?.prop_componentBorderColor ?? bind.prop_componentBorderColor) as any,
            prop_borderColor_hover: (data?.prop_componentBorderColorHover ?? bind.prop_componentBorderColorHover) as any,
            prop_borderClass: (data?.prop_componentBorderClass ?? bind.prop_componentBorderClass) as any,
            prop_borderStyles: CoreObservable.App.computed(
                (legacy: Record<string, string>, custom: Record<string, string>, sizeName: any) => ({
                    padding: UtilStyle.Css_Padding(sizeName),
                    ...(legacy ?? {}),
                    ...(custom ?? {}),
                    position: "relative",
                }),
                [oldBorderStyles, data?.prop_componentBorderStyles ?? bind.prop_componentBorderStyles, CoreConfig.Settings.SizeName.observable()],
                this.getScope(),
            ) as any,
            prop_borderType: (data?.prop_componentBorderType ?? bind.prop_componentBorderType) as any,
            prop_borderOpacity: (data?.prop_componentBorderOpacity ?? bind.prop_componentBorderOpacity) as any,
            prop_borderArrowType: (data?.prop_componentBorderArrowType ?? bind.prop_componentBorderArrowType) as any,
            prop_borderArrowWidth: (data?.prop_componentBorderArrowWidth ?? bind.prop_componentBorderArrowWidth) as any,
            prop_borderArrowPosition: (data?.prop_componentBorderArrowPosition ?? bind.prop_componentBorderArrowPosition) as any,
            prop_minWidth: (data?.prop_componentBorderMinWidth ?? bind.prop_componentBorderMinWidth) as any,
            prop_width: (data?.prop_componentBorderWidth ?? bind.prop_componentBorderWidth) as any,
            prop_borderTopLeftRadiusHas: (data?.prop_componentBorderTopLeftRadiusHas ?? bind.prop_componentBorderTopLeftRadiusHas) as any,
            prop_borderTopRightRadiusHas: (data?.prop_componentBorderTopRightRadiusHas ?? bind.prop_componentBorderTopRightRadiusHas) as any,
            prop_borderBottomLeftRadiusHas: (data?.prop_componentBorderBottomLeftRadiusHas ?? bind.prop_componentBorderBottomLeftRadiusHas) as any,
            prop_borderBottomRightRadiusHas: (data?.prop_componentBorderBottomRightRadiusHas ?? bind.prop_componentBorderBottomRightRadiusHas) as any,
            prop_borderTopHas: (data?.prop_componentBorderTopHas ?? bind.prop_componentBorderTopHas) as any,
            prop_borderRightHas: (data?.prop_componentBorderRightHas ?? bind.prop_componentBorderRightHas) as any,
            prop_borderBottomHas: (data?.prop_componentBorderBottomHas ?? bind.prop_componentBorderBottomHas) as any,
            prop_borderLeftHas: (data?.prop_componentBorderLeftHas ?? bind.prop_componentBorderLeftHas) as any,
        } as any, {}, {});
        this._CHILDREN.push(child as any);
        return child.getReactiveElement() as CoreReactive.App;
    }

    private renderBody(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const formClass = data?.prop_formClass ?? bind.prop_formClass;
        const formStyles = data?.prop_formStyles ?? bind.prop_formStyles;
        const formMinHeight = data?.prop_formsMinHeight ?? bind.prop_formsMinHeight;
        const submitWrapperClass = data?.prop_btnformClass ?? bind.prop_btnformClass;
        const submitWrapperStyles = CoreObservable.App.computed(
            (styles: Record<string, string>, directionRtl: boolean, sizeName: any) => ({
                ...(styles ?? {}),
                textAlign: directionRtl ? "left" : "right",
                marginTop: UtilStyle.Css_Margin(sizeName),
            }),
            [data?.prop_btnformStyles ?? bind.prop_btnformStyles, CoreConfig.Settings.DirectionRtl.observable(), CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const formContent = data?.prop_forms ?? bind.prop_forms;
        const submitConfig = this.readValue<SubmitButtonConfig>(data?.prop_btnSubmit ?? bind.prop_btnSubmit) ?? {};

        const nativeForm = CoreReactive.App.form({
            attrs: {id: this._FORM_ID, class: "row"},
            stylesBind: CoreObservable.App.computed((minHeight: string | null) => minHeight ? {minHeight} : {}, [formMinHeight], this.getScope()),
            children: [this.normalizeContent(formContent)],
            on: {submit: (event: Event) => {event.preventDefault(); void this.submit(event);}},
        });

        const messages = new ComponentMessages.Component({
            prop_messages: this._MESSAGES as any,
            prop_type: this._MESSAGE_TYPE as any,
        } as any);
        const loading = new ComponentLoading.Component({
            prop_show: this._IS_LOADING as any,
            prop_structureClass: ["position-absolute"],
            prop_structureStyles: {
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
            },
        } as any);
        const webCode = new ComponentWebCode.Component({
            prop_show: this._SHOW_404 as any,
            prop_background: UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_4),
            prop_structureClass: ["position-absolute"],
            prop_structureStyles: {
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            },
        } as any, {
            RETRY_CLICK: (event) => {
                this._SHOW_404.set(false);
                void this.submit(event);
            },
        } as any);
        const button = new ComponentButton.Component({
            prop_btnTitle: submitConfig.prop_title || "Submit",
            prop_btnClass: submitConfig.prop_btnClass ?? [],
            prop_btnStyles: submitConfig.prop_btnStyles ?? {},
            prop_btnType: ButtonAction.SUBMIT,
            prop_btnSemantic: ButtonSemantic.SUBMIT,
            prop_btnBackgroundColor: (data?.prop_btnSubmitBackground ?? bind.prop_btnSubmitBackground) as any,
            prop_btnBackgroundColor_hover: (data?.prop_btnSubmitBackgroundHover ?? bind.prop_btnSubmitBackgroundHover) as any,
            prop_btnTitleColor: (data?.prop_btnSubmitColor ?? bind.prop_btnSubmitColor) as any,
        } as any, {CLICK: (event) => {event.preventDefault(); void this.submit(event);}} as any);

        this._CHILDREN.push(messages as any, button as any, loading as any, webCode as any);
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [formClass],
            stylesBind: formStyles,
            children: [
                nativeForm,
                messages.getReactiveElement(),
                CoreReactive.App.section({classBind: [submitWrapperClass], stylesBind: submitWrapperStyles, children: [button.getReactiveElement()]}),
                webCode.getReactiveElement(),
                loading.getReactiveElement(),
            ],
        });
    }

    private normalizeContent(content: any): any {
        if (content == null || content === false) return null;
        if (Array.isArray(content)) return content.map((item) => this.normalizeContent(item));
        if (typeof content === "string" || typeof content === "number") {
            // Legacy HTML strings are deliberately not parsed as markup.
            return CoreReactive.App.span({props: {textContent: String(content)}});
        }
        if (content instanceof HTMLElement || content instanceof CoreReactive.App) return content;
        if (typeof content?.getReactiveElement === "function") return content.getReactiveElement();
        if (typeof content?.getElement === "function") return content.getElement();
        if (CoreObservable.App.isObservable(content)) return content.map((value: any) => this.normalizeContent(value), this.getScope());
        return null;
    }

    private async submit(event: Event): Promise<void> {
        const url = this.readValue<string>(this._COMPONENT_PROPS_BIND.prop_url) ?? "";
        const form = this.getFormElement();
        const extraData = this.readValue(this._COMPONENT_PROPS_BIND.prop_data);
        const validationErrors = this.collectValidationErrors(form);
        this._SHOW_404.set(false);
        if (validationErrors.length) {
            this.setMessages(validationErrors, MessageTypes.ERROR);
            return;
        }

        this.setMessages([], MessageTypes.CUSTOM);
        const shouldFetch = this.readValue<boolean>(this._COMPONENT_PROPS_BIND.prop_runFetch) !== false;
        if (!shouldFetch) {
            this.executeMethod("SUBMIT", event, {URL: url, FORM: form, EXTRA_DATA: extraData} as any);
            return;
        }
        if (!url.trim()) {
            this.setMessages(["A request URL is required when automatic submission is enabled."], MessageTypes.ERROR);
            return;
        }

        this._IS_LOADING.set(true);
        try {
            const request = this.sendRequest(url, form, extraData, event);
            this.executeMethod("GET_RESPONSE", event, {PROMISE: request} as any);
            await request;
        } finally {
            this._IS_LOADING.set(false);
        }
    }

    private async sendRequest(url: string, form: HTMLFormElement | null, extraData: unknown, event: Event): Promise<ResponsePayload | null> {
        this._SHOW_404.set(false);
        const result = await UtilTools.Fetch.Request(url, {
            method: "POST",
            formData: form,
            data: extraData,
            onLoading: (loading) => this._IS_LOADING.set(loading),
            onNotFound: () => this._SHOW_404.set(true),
            onMessages: (messages, type) => this.setMessages(
                messages,
                type === "success" ? MessageTypes.SUCCESS : type === "error" ? MessageTypes.ERROR : MessageTypes.WARNING,
            ),
            onResponse: (resultExp, response) => this.executeMethod("RESPONSE", event, {RESULT_EXP: resultExp, RESPONSE: response} as any),
            onError: (error) => this.setMessages([error instanceof Error ? error.message : "The request failed."], MessageTypes.ERROR),
        });
        return result ? {resultExp: result.resultExp, response: result.response} : null;
    }

    private collectValidationErrors(form: HTMLFormElement | null): string[] {
        // ComponentValidate can render its JSON marker beside the native form
        // within a composed input component. Search both the native form and
        // this ComponentForm root so composed validators are not missed.
        const root = this.getElement() as HTMLElement | null;
        const validatorNodes = new Set<Element>();
        for (const container of [form, root]) {
            container?.querySelectorAll("script.component-validate").forEach((node) => validatorNodes.add(node));
        }

        const groupedErrors = new Map<string, string[]>();
        const stopAtFirst = this.readValue<boolean>(this._COMPONENT_PROPS_BIND.prop_showErrorStepper) !== false;
        for (const node of validatorNodes) {
            let validator: any;
            const serialized = node.textContent?.trim() || node.innerHTML?.trim() || "";
            try { validator = JSON.parse(serialized); } catch { continue; }
            if (!validator) continue;
            const validationMessages = Array.isArray(validator.validates)
                ? validator.validates
                : validator.validates && typeof validator.validates === "object"
                    ? Object.values(validator.validates)
                    : [];
            const nonEmptyMessages = validationMessages.filter((message: unknown) => message != null && String(message).trim() !== "");
            if (nonEmptyMessages.length === 0) continue;
            const parameter = typeof validator.title === "string" && validator.title.trim()
                ? validator.title.trim()
                : "Parameter";
            const messages = groupedErrors.get(parameter) ?? [];
            messages.push(...nonEmptyMessages.map((message: unknown) => String(message)));
            groupedErrors.set(parameter, messages);
            if (stopAtFirst) break;
        }
        return Array.from(groupedErrors, ([parameter, messages]) =>
            `${parameter}:\n${messages.map((message) => `  • ${message}`).join("\n")}`,
        );
    }

    private setMessages(messages: unknown[], type: MessageTypes): void {
        this._MESSAGE_TYPE.set(type);
        this._MESSAGES.set(messages.map((message) => ({id: `${Date.now()}-${Math.random()}`, text: this.escapeHtml(typeof message === "string" ? message : JSON.stringify(message))})));
    }

    private escapeHtml(value: string): string {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    private getFormElement(): HTMLFormElement | null {
        const root = this.getElement() as HTMLElement | null;
        return (root?.querySelector(`#${this._FORM_ID}`) ?? document.getElementById(this._FORM_ID)) as HTMLFormElement | null;
    }

    private readValue<T>(value: any): T {
        return (CoreObservable.App.isObservable(value) ? value.get() : value) as T;
    }
}
