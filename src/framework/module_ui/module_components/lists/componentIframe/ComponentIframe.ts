import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import {PartAttrDefault} from "@/core_components";
import {ComponentIframeBase} from "./ComponentIframeBase";
import {PropsConfigType, PropsType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";

export class ComponentIframe extends ComponentIframeBase {
    private _BORDER: InstanceType<typeof ComponentBorder.Component> | null = null;
    private _IFRAME_ELEMENT: HTMLIFrameElement | null = null;
    private _HEIGHT_AUTO: CoreObservable.App<any> | null = null;
    private _HEIGHT: CoreObservable.App<any> | null = null;
    private _WIDGET_HEIGHT: CoreObservable.App<any> | null = null;
    private _RESIZE_LISTENER: (() => void) | null = null;
    private _RESIZE_LISTENER_ATTACHED = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentIframe>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.removeResizeListener();
        this._BORDER?.dispose();
        this._BORDER = null;
        this._IFRAME_ELEMENT = null;
        this.getScope().dispose();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(
        partName: string,
        attrsDefault: PartAttrDefault,
        data: Record<string, CoreObservable.App<any>>,
        extra?: any,
    ): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.ROOT.part:
                return this.renderRoot(attrsDefault, data);
            case Schemas.BORDER.part:
                return this.renderBorder(data);
            case Schemas.BODY.part:
                return this.renderBody(attrsDefault, data);
            case Schemas.FRAME.part:
                return this.renderFrame(attrsDefault, data);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const widgetWidth = data.prop_widgetWidth ?? bind.prop_widgetWidth;
        const widgetHeight = data.prop_widgetHeight ?? bind.prop_widgetHeight;
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: CoreObservable.App.computed(
                (width: string | null, height: string | null) => ({width: width || "100%", ...(height ? {height} : {})}),
                [widgetWidth, widgetHeight],
                this.getScope(),
            ),
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
            prop_structureClass: (data.prop_componentBorderStructureClass ?? bind.prop_componentBorderStructureClass) as any,
            prop_structureStyles: CoreObservable.App.computed(
                (styles: Record<string, string>, height: string | null) => ({...(styles ?? {}), ...(height ? {height} : {})}),
                [data.prop_componentBorderStructureStyles ?? bind.prop_componentBorderStructureStyles, widgetHeight],
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
                (styles: Record<string, string>, height: string | null) => ({...(styles ?? {}), ...(height ? {height} : {})}),
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
        this._BORDER = child;
        return child.getReactiveElement() as CoreReactive.App;
    }

    private renderBody(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        this._HEIGHT_AUTO = data.prop_heightAuto ?? this._COMPONENT_PROPS_BIND.prop_heightAuto;
        this._HEIGHT = data.prop_height ?? this._COMPONENT_PROPS_BIND.prop_height;
        this._WIDGET_HEIGHT = data.prop_widgetHeight ?? this._COMPONENT_PROPS_BIND.prop_widgetHeight;
        this._HEIGHT_AUTO?.subscribe(() => this.syncHeightMode(), this.getScope());
        this._HEIGHT?.subscribe(() => this.applyHeight(), this.getScope());
        this._WIDGET_HEIGHT?.subscribe(() => this.syncHeightMode(), this.getScope());

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: CoreObservable.App.computed(
                (height: string | null) => ({width: "100%", ...(height ? {height: "100%"} : {})}),
                [this._WIDGET_HEIGHT],
                this.getScope(),
            ),
            children: [this.executeSchemaPart(Schemas.FRAME.part, {})],
        });
    }

    private renderFrame(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const iframeClass = data.prop_iframeClass ?? bind.prop_iframeClass;
        const iframeStyles = data.prop_iframeStyles ?? bind.prop_iframeStyles;
        const source = data.prop_url ?? bind.prop_url;
        const width = data.prop_width ?? bind.prop_width;
        const widgetWidth = data.prop_widgetWidth ?? bind.prop_widgetWidth;
        const widgetHeight = data.prop_widgetHeight ?? bind.prop_widgetHeight;
        const iframe = CoreReactive.App.create("iframe", {
            attrs: {id: `component-iframe-element-${this._COMPONENT_RANDOM_ID}`},
            attrsBind: {src: source, width} as any,
            stylesBind: CoreObservable.App.computed(
                (outerWidth: string | null, height: string | null) => ({
                    display: "block",
                    border: "0",
                    ...(outerWidth ? {width: "100%"} : {}),
                    ...(height ? {height: "100%"} : {}),
                }),
                [widgetWidth, widgetHeight],
                this.getScope(),
            ),
        });
        this._IFRAME_ELEMENT = iframe.getElement() as HTMLIFrameElement;

        this._RESIZE_LISTENER = () => this.applyAutoHeight();
        queueMicrotask(() => this.syncHeightMode());

        const styles = CoreObservable.App.computed(
            (custom: Record<string, string>) => ({width: "100%", ...(custom ?? {})}),
            [iframeStyles],
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            classBind: [iframeClass],
            stylesBind: styles,
            children: [iframe],
        });
    }

    private syncHeightMode(): void {
        if (this._DISPOSED || !this._IFRAME_ELEMENT) return;
        if (this.readValue<string | null>(this._WIDGET_HEIGHT)) {
            this.removeResizeListener();
            this._IFRAME_ELEMENT.removeAttribute("height");
            return;
        }
        if (this.readValue<boolean>(this._HEIGHT_AUTO)) {
            this.attachResizeListener();
            if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => this.applyAutoHeight());
            else this.applyAutoHeight();
            return;
        }

        this.removeResizeListener();
        this.applyHeight();
    }

    private attachResizeListener(): void {
        if (this._RESIZE_LISTENER_ATTACHED || !this._RESIZE_LISTENER || typeof window === "undefined") return;
        window.addEventListener("resize", this._RESIZE_LISTENER);
        this._RESIZE_LISTENER_ATTACHED = true;
    }

    private removeResizeListener(): void {
        if (!this._RESIZE_LISTENER_ATTACHED || !this._RESIZE_LISTENER || typeof window === "undefined") return;
        window.removeEventListener("resize", this._RESIZE_LISTENER);
        this._RESIZE_LISTENER_ATTACHED = false;
    }

    private applyHeight(): void {
        if (this.readValue<string | null>(this._WIDGET_HEIGHT)) return;
        if (this._DISPOSED || !this._IFRAME_ELEMENT || this.readValue<boolean>(this._HEIGHT_AUTO)) return;
        const height = this.readValue<string | number>(this._HEIGHT);
        if (height == null || height === "") this._IFRAME_ELEMENT.removeAttribute("height");
        else this._IFRAME_ELEMENT.setAttribute("height", String(height));
    }

    private applyAutoHeight(): void {
        if (this.readValue<string | null>(this._WIDGET_HEIGHT)) return;
        if (this._DISPOSED || !this._IFRAME_ELEMENT || !this.readValue<boolean>(this._HEIGHT_AUTO)) return;
        const top = this._IFRAME_ELEMENT.getBoundingClientRect().top;
        const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
        const height = Math.max(0, top > 0 ? Math.abs(viewportHeight - top) : viewportHeight);
        this._IFRAME_ELEMENT.setAttribute("height", String(height));
    }

    private readValue<T>(value: any): T {
        return (CoreObservable.App.isObservable(value) ? value.get() : value) as T;
    }
}
