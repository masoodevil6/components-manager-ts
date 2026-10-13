import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilTools from "@/util_tools";
import * as UiIcons from "@/ui_icons";
import {PartAttrDefault} from "@/core_components";
import {ComponentWidgetBase} from "./ComponentWidgetBase";
import {PropsConfigType, WidgetFetchConfig} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {createWidgetStep} from "./Step";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import * as ComponentIcon from "../componentIcon";
import * as ComponentLoading from "../componentLoading";
import * as ComponentMessages from "../componentMessages";
import {MessageTypes} from "../componentMessages/Props";
import * as ComponentWebCode from "../componentWebCode";

type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

export class ComponentWidget extends ComponentWidgetBase {
    private readonly _IS_LOADING = new CoreObservable.App(false);
    private readonly _SHOW_404 = new CoreObservable.App(false);
    private readonly _MESSAGES = new CoreObservable.App<unknown[]>([]);
    private readonly _MESSAGE_TYPE = new CoreObservable.App(MessageTypes.CUSTOM);
    private readonly _CHILDREN: DisposableChild[] = [];
    private _REQUEST_ID = 0;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentWidget>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createWidgetStep());
        this.renderComponent(config as any, methods as any, identity?.events ?? null);

        queueMicrotask(() => {
            const fetchConfig = this.readValue<WidgetFetchConfig>(this._COMPONENT_PROPS_BIND.prop_fetch);
            if (!this._DISPOSED && typeof fetchConfig?.url === "string") void this.fetchWidget(new Event("widget-init"));
        });
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._REQUEST_ID++;
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [this.executeSchemaPart(Schemas.WIDGET.part, {})],
        });
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.WIDGET.part: return this.renderWidget(attrsDefault, data);
            case Schemas.BORDER.part: return this.renderBorder(data);
            case Schemas.BODY.part: return this.renderBody(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderWidget(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: {
                width: data.prop_widgetWidth ?? bind.prop_widgetWidth,
                height: data.prop_widgetHeight ?? bind.prop_widgetHeight,
            },
            children: [this.executeSchemaPart(Schemas.BORDER.part, {})],
        });
    }

    private renderBorder(data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const widgetWidth = data.prop_widgetWidth ?? bind.prop_widgetWidth;
        const widgetHeight = data.prop_widgetHeight ?? bind.prop_widgetHeight;
        const borderContent = this.executeSchemaPart(Schemas.BODY.part, {});
        const child = new ComponentBorder.Component({
            selector: (data.prop_componentBorderSelector ?? bind.prop_componentBorderSelector) as any,
            append: (data.prop_componentBorderAppend ?? bind.prop_componentBorderAppend) as any,
            classList: (data.prop_componentBorderClassList ?? bind.prop_componentBorderClassList) as any,
            styles: (data.prop_componentBorderElementStyles ?? bind.prop_componentBorderElementStyles) as any,
            prop_show: (data.prop_componentBorderShow ?? bind.prop_componentBorderShow) as any,
            prop_structureClass: CoreObservable.App.computed(
                (legacy: string[], configured: string[] | null) => configured ?? legacy,
                [data.prop_widgetClass ?? bind.prop_widgetClass, data.prop_componentBorderStructureClass ?? bind.prop_componentBorderStructureClass],
                this.getScope(),
            ) as any,
            prop_structureStyles: CoreObservable.App.computed(
                (legacy: Record<string, string>, configured: Record<string, string> | null, minHeight: string | null, height: string | null) => ({
                    ...(legacy ?? {}),
                    ...(configured ?? {}),
                    ...(height ? {height} : {}),
                    ...(minHeight ? {"min-height": minHeight} : {}),
                }),
                [data.prop_widgetStyles ?? bind.prop_widgetStyles, data.prop_componentBorderStructureStyles ?? bind.prop_componentBorderStructureStyles, data.prop_widgetMinHeight ?? bind.prop_widgetMinHeight, widgetHeight],
                this.getScope(),
            ) as any,
            prop_content: borderContent as any,
            prop_contentSize: (data.prop_componentBorderContentSize ?? bind.prop_componentBorderContentSize) as any,
            prop_contentColor: (data.prop_componentBorderContentColor ?? bind.prop_componentBorderContentColor) as any,
            prop_contentColor_hover: (data.prop_componentBorderContentColorHover ?? bind.prop_componentBorderContentColorHover) as any,
            prop_contentBackgroundColor: (data.prop_componentBorderContentBackgroundColor ?? bind.prop_componentBorderContentBackgroundColor) as any,
            prop_contentBackgroundColor_hover: (data.prop_componentBorderContentBackgroundColorHover ?? bind.prop_componentBorderContentBackgroundColorHover) as any,
            prop_borderColor: (data.prop_componentBorderColor ?? bind.prop_componentBorderColor) as any,
            prop_borderColor_hover: (data.prop_componentBorderColorHover ?? bind.prop_componentBorderColorHover) as any,
            prop_borderClass: (data.prop_componentBorderClass ?? bind.prop_componentBorderClass) as any,
            prop_borderStyles: CoreObservable.App.computed(
                (styles: Record<string, string>, height: string | null) => ({...(styles ?? {}), ...(height ? {height} : {}), position: "relative"}),
                [data.prop_componentBorderStyles ?? bind.prop_componentBorderStyles, widgetHeight],
                this.getScope(),
            ) as any,
            prop_borderType: (data.prop_componentBorderType ?? bind.prop_componentBorderType) as any,
            prop_borderOpacity: (data.prop_componentBorderOpacity ?? bind.prop_componentBorderOpacity) as any,
            prop_borderArrowType: (data.prop_componentBorderArrowType ?? bind.prop_componentBorderArrowType) as any,
            prop_borderArrowWidth: (data.prop_componentBorderArrowWidth ?? bind.prop_componentBorderArrowWidth) as any,
            prop_borderArrowPosition: (data.prop_componentBorderArrowPosition ?? bind.prop_componentBorderArrowPosition) as any,
            prop_minWidth: (data.prop_componentBorderMinWidth ?? bind.prop_componentBorderMinWidth) as any,
            prop_width: CoreObservable.App.computed(
                (width: string | null, borderWidth: string | null) => width ?? borderWidth,
                [widgetWidth, data.prop_componentBorderWidth ?? bind.prop_componentBorderWidth],
                this.getScope(),
            ) as any,
            prop_borderTopLeftRadiusHas: (data.prop_componentBorderTopLeftRadiusHas ?? bind.prop_componentBorderTopLeftRadiusHas) as any,
            prop_borderTopRightRadiusHas: (data.prop_componentBorderTopRightRadiusHas ?? bind.prop_componentBorderTopRightRadiusHas) as any,
            prop_borderBottomLeftRadiusHas: (data.prop_componentBorderBottomLeftRadiusHas ?? bind.prop_componentBorderBottomLeftRadiusHas) as any,
            prop_borderBottomRightRadiusHas: (data.prop_componentBorderBottomRightRadiusHas ?? bind.prop_componentBorderBottomRightRadiusHas) as any,
            prop_borderTopHas: (data.prop_componentBorderTopHas ?? bind.prop_componentBorderTopHas) as any,
            prop_borderRightHas: (data.prop_componentBorderRightHas ?? bind.prop_componentBorderRightHas) as any,
            prop_borderBottomHas: (data.prop_componentBorderBottomHas ?? bind.prop_componentBorderBottomHas) as any,
            prop_borderLeftHas: (data.prop_componentBorderLeftHas ?? bind.prop_componentBorderLeftHas) as any,
        } as any, {}, {});
        this._CHILDREN.push(child);
        return child.getReactiveElement() as CoreReactive.App;
    }

    private renderBody(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const content = data.prop_layoutContent ?? bind.prop_layoutContent;
        const moreShow = data.prop_btnMore_show ?? bind.prop_btnMore_show;
        const moreIcon = data.prop_btnMore_icon ?? bind.prop_btnMore_icon;
        const moreLink = data.prop_btnMore_link ?? bind.prop_btnMore_link;
        const moreVisible = CoreObservable.App.computed(
            (show: boolean, icon: UiIcons.IIconDefinition | null) => Boolean(show && icon),
            [moreShow, moreIcon],
            this.getScope(),
        );

        const messages = new ComponentMessages.Component({
            prop_messages: this._MESSAGES as any,
            prop_type: this._MESSAGE_TYPE as any,
        } as any);
        const loading = new ComponentLoading.Component({
            prop_show: this._IS_LOADING as any,
            prop_structureClass: ["position-absolute"],
            prop_structureStyles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"},
            styles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"},
        } as any);
        const webCode = new ComponentWebCode.Component({
            prop_show: this._SHOW_404 as any,
            prop_structureClass: ["position-absolute"],
            prop_structureStyles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%", overflow: "hidden"},
            styles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%"},
        } as any, {
            RETRY_CLICK: (event) => {
                const currentFetch = this.readValue<WidgetFetchConfig>(this._COMPONENT_PROPS_BIND.prop_fetch);
                this.executeMethod("RETRY_CLICK", event, {FETCH: currentFetch} as any);
                void this.fetchWidget(event);
            },
        } as any);
        const more = new ComponentIcon.Component({
            prop_icon: CoreObservable.App.computed(
                (definition: UiIcons.IIconDefinition | null, sizeName: any) => definition ? UiIcons.CreateIcon(definition, {size: sizeName}) : null,
                [moreIcon, CoreConfig.Settings.SizeName.observable()],
                this.getScope(),
            ) as any,
            prop_iconStyles: CoreObservable.App.computed(
                (link: string | null) => ({cursor: link ? "pointer" : "default", opacity: link ? "1" : "0.55"}),
                [moreLink],
                this.getScope(),
            ) as any,
            styles: {position: "absolute", insetInlineEnd: "0", top: "0", zIndex: "1"},
        } as any, {
            CLICK: (event) => {
                const link = this.readValue<string | null>(moreLink);
                if (!link) return;
                event.preventDefault();
                window.open(link, "_blank", "noopener,noreferrer");
            },
        } as any);

        this._CHILDREN.push(messages as any, loading as any, webCode as any, more as any);
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            styles: {position: "relative", width: "100%", height: "100%"},
            children: [
                messages.getReactiveElement(),
                this.normalizeContent(content),
                moreVisible.map((visible: boolean) => visible ? more.getReactiveElement() : null, this.getScope()) as any,
                webCode.getReactiveElement(),
                loading.getReactiveElement(),
            ],
        });
    }

    private normalizeContent(content: any): any {
        if (content == null || content === false) return null;
        if (Array.isArray(content)) return content.map((item) => this.normalizeContent(item));
        if (typeof content === "string" || typeof content === "number") return CoreReactive.App.span({props: {textContent: String(content)}});
        if (typeof HTMLElement !== "undefined" && content instanceof HTMLElement) return content;
        if (content instanceof CoreReactive.App) return content;
        if (typeof content?.getReactiveElement === "function") return content.getReactiveElement();
        if (typeof content?.getElement === "function") return content.getElement();
        if (CoreObservable.App.isObservable(content)) return content.map((value: any) => this.normalizeContent(value), this.getScope());
        return null;
    }

    private async fetchWidget(event: Event): Promise<void> {
        const config = this.readValue<WidgetFetchConfig>(this._COMPONENT_PROPS_BIND.prop_fetch);
        const url = typeof config?.url === "string" ? config.url.trim() : null;
        if (url === null || this._DISPOSED) return;

        const requestId = ++this._REQUEST_ID;
        const sourceData = config.data;
        const request = this.toFetchRequest(sourceData);
        this._SHOW_404.set(false);
        this.setMessages([], MessageTypes.CUSTOM);
        this.executeMethod("BEFORE_FETCH", event, {REQUEST_DATA: sourceData} as any);

        const promise = UtilTools.Fetch.Request(url, {
            request,
            method: config.method,
            contentType: config.contentType,
            onLoading: (loading) => {if (requestId === this._REQUEST_ID && !this._DISPOSED) this._IS_LOADING.set(loading);},
            onNotFound: () => {if (requestId === this._REQUEST_ID && !this._DISPOSED) this._SHOW_404.set(true);},
            onMessages: (messages, type) => {
                if (requestId !== this._REQUEST_ID || this._DISPOSED) return;
                const messageType = type === "success" ? MessageTypes.SUCCESS : type === "error" ? MessageTypes.ERROR : MessageTypes.WARNING;
                this.setMessages(messages, messageType);
            },
            onResponse: (resultExp, response, requestData) => {
                if (requestId !== this._REQUEST_ID || this._DISPOSED) return;
                this._SHOW_404.set(false);
                this.executeMethod("RESPONSE", event, {RESULT_EXP: resultExp, RESPONSE: response, REQUEST_DATA: requestData} as any);
            },
            onError: (error) => {
                if (requestId !== this._REQUEST_ID || this._DISPOSED) return;
                this.setMessages([error instanceof Error ? error.message : "The request failed."], MessageTypes.ERROR);
            },
        });
        this.executeMethod("GET_RESPONSE", event, {PROMISE: promise} as any);
        await promise;
    }

    private toFetchRequest(data: unknown): UtilTools.TFetchRequestData {
        if (data && typeof data === "object" && !Array.isArray(data)) {
            const source = data as Record<string, unknown>;
            const requestKeys = ["type", "data", "formData", "method", "contentType"];
            if (requestKeys.some((key) => key in source)) return source as UtilTools.TFetchRequestData;
        }
        return {data};
    }

    private setMessages(messages: unknown[], type: MessageTypes): void {
        this._MESSAGE_TYPE.set(type);
        this._MESSAGES.set(messages.map((message) => {
            if (typeof message === "string") return message;
            try {return JSON.stringify(message);} catch {return String(message);}
        }));
    }

    private readValue<T>(value: any): T {
        return (CoreObservable.App.isObservable(value) ? value.get() : value) as T;
    }
}
