import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentLoading from "../componentLoading";
import {ComponentEffectChangeBase} from "./ComponentEffectChangeBase";
import {EffectChangeDirection, EffectChangeMode, type EffectChangeContent, type PropsConfigType} from "./Props";
import {Schemas} from "./Schemas";
import type {MethodsConfigType} from "./Methods";
import {createEffectChangeStep} from "./Step";

type DisposableContent = {dispose?: () => void; disposeStep?: () => void};

const normalizeDuration = (value: unknown): number => {
    const duration = Number(value);
    return Number.isFinite(duration) ? Math.max(0, duration) : 0;
};

export class ComponentEffectChange extends ComponentEffectChangeBase {
    private _CONTENT_HOST: HTMLElement | null = null;
    private _CURRENT_LAYER: HTMLElement | null = null;
    private _CURRENT_VALUE: EffectChangeContent = null;
    private _EXIT_LAYER: HTMLElement | null = null;
    private _EXIT_VALUE: EffectChangeContent = null;
    private _LOADING: InstanceType<typeof ComponentLoading.Component> | null = null;
    private _TRANSITION_TIMER: ReturnType<typeof setTimeout> | null = null;
    private readonly _FRAME_CANCELLERS = new Set<() => void>();
    private _GENERATION = 0;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentEffectChange>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createEffectChangeStep());
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);

        this.setInitialContent(this._COMPONENT_PROPS_BIND.prop_content.get() as EffectChangeContent);
        this._COMPONENT_PROPS_BIND.prop_content.subscribe((content: EffectChangeContent) => this.changeContent(content), this.getScope());
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.cancelPendingTransition();
        this.disposeContent(this._CURRENT_VALUE);
        if (this._EXIT_VALUE !== this._CURRENT_VALUE) this.disposeContent(this._EXIT_VALUE);
        this._LOADING?.dispose();
        this._LOADING = null;
        this._CURRENT_VALUE = null;
        this._EXIT_VALUE = null;
        this._CONTENT_HOST = null;
        this._CURRENT_LAYER = null;
        this._EXIT_LAYER = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(_attrsDefault: PartAttrDefault, _data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
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
                return this.renderRoot(attrsDefault);
            case Schemas.CONTENT.part:
                return this.renderContentSlot(attrsDefault);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["w-100"],
            children: [this.executeSchemaPart(Schemas.CONTENT.part, {}) as any],
        });
    }

    private renderContentSlot(attrsDefault: PartAttrDefault): CoreReactive.App {
        const mode = this._COMPONENT_PROPS_BIND.prop_mode;
        const showLoading = CoreObservable.App.computed(
            (currentMode: EffectChangeMode) => currentMode === EffectChangeMode.LOADING,
            [mode],
            this.getScope(),
        );
        this._LOADING = new ComponentLoading.Component({
            prop_show: showLoading as any,
            classList: ["position-absolute"],
            // This visual loading layer can overlap interactive content even when hidden.
            // Let pointer events pass through it so content below remains clickable.
            styles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%", zIndex: "1000", pointerEvents: "none"},
            prop_structureClass: ["position-absolute"],
            prop_structureStyles: {position: "absolute", left: "0", top: "0", width: "100%", height: "100%", zIndex: "1000", pointerEvents: "none"},
        } as any);
        const slot = CoreReactive.App.section({
            attrs: {...attrsDefault},
            className: ["w-100"],
            stylesBind: CoreObservable.App.computed(
                (currentMode: EffectChangeMode) => currentMode === EffectChangeMode.LOADING ? {minHeight: "80px"} : {},
                [mode],
                this.getScope(),
            ),
            styles: {
                position: "relative",
                width: "100%",
                overflow: "hidden",
                boxSizing: "border-box",
            },
            children: [this._LOADING.getReactiveElement()],
        });
        this._CONTENT_HOST = slot.getElement();
        return slot;
    }

    private setInitialContent(value: EffectChangeContent): void {
        this._CURRENT_VALUE = value ?? null;
        const node = this.toNode(value);
        if (!node || !this._CONTENT_HOST) return;

        const layer = this.createLayer(node);
        this._CONTENT_HOST.appendChild(layer);
        this._CURRENT_LAYER = layer;
    }

    private changeContent(value: EffectChangeContent): void {
        if (this._DISPOSED) return;
        const nextValue = value ?? null;
        const nextNode = this.toNode(nextValue);
        if (nextValue === this._CURRENT_VALUE || (nextNode && nextNode === this._CURRENT_LAYER?.firstChild)) return;

        this.cancelPendingTransition();
        const host = this._CONTENT_HOST;
        if (!host) return;

        const previousValue = this._CURRENT_VALUE;
        const previousLayer = this._CURRENT_LAYER;
        const previousHeight = previousLayer?.getBoundingClientRect().height ?? host.getBoundingClientRect().height;
        const nextLayer = nextNode ? this.createLayer(nextNode) : null;
        const mode = this._COMPONENT_PROPS_BIND.prop_mode.get() as EffectChangeMode;
        const duration = normalizeDuration(this._COMPONENT_PROPS_BIND.prop_duration.get());
        const easing = String(this._COMPONENT_PROPS_BIND.prop_easing.get() || "ease-in-out");
        const direction = this._COMPONENT_PROPS_BIND.prop_changeDirection.get() as EffectChangeDirection;

        if (nextLayer) host.appendChild(nextLayer);
        const nextHeight = nextLayer?.getBoundingClientRect().height ?? 0;
        this._CURRENT_VALUE = nextValue;
        this._CURRENT_LAYER = nextLayer;

        if (!previousLayer && !nextLayer) {
            this.disposeContent(previousValue);
            return;
        }

        if (mode === EffectChangeMode.NONE || mode === EffectChangeMode.LOADING || duration === 0 || this.shouldReduceMotion()) {
            previousLayer?.remove();
            if (nextLayer) this.normalizeLayer(nextLayer);
            this.clearHostTransition(host);
            this.disposeContent(previousValue);
            return;
        }

        const token = ++this._GENERATION;
        this._EXIT_VALUE = previousValue;
        this._EXIT_LAYER = previousLayer;
        if (previousLayer) this.prepareLayer(previousLayer);
        if (nextLayer) {
            this.prepareLayer(nextLayer);
            this.setEnterVisual(nextLayer, mode, direction);
        }

        host.style.height = `${Math.max(0, previousHeight)}px`;
        host.style.transition = "none";
        // Force the initial layer positions to be committed before animating.
        void host.offsetHeight;

        this.scheduleFrame(() => this.scheduleFrame(() => {
            if (this._DISPOSED || token !== this._GENERATION) return;
            const transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;
            if (previousLayer) {
                previousLayer.style.transition = transition;
                this.setExitVisual(previousLayer, mode, direction);
            }
            if (nextLayer) {
                nextLayer.style.transition = transition;
                nextLayer.style.opacity = "1";
                nextLayer.style.transform = "none";
            }
            host.style.transition = `height ${duration}ms ${easing}`;
            host.style.height = `${Math.max(0, nextHeight)}px`;
            this._TRANSITION_TIMER = setTimeout(() => this.finishTransition(token, previousValue, nextValue, direction), duration + 40);
            this.executeMethod("TRANSITION_START", new Event("transitionstart"), {
                PREVIOUS_CONTENT: previousValue,
                CONTENT: nextValue,
                DIRECTION: direction,
            });
        }));
    }

    private finishTransition(
        token: number,
        previousValue: EffectChangeContent,
        nextValue: EffectChangeContent,
        direction: EffectChangeDirection,
    ): void {
        if (this._DISPOSED || token !== this._GENERATION) return;
        this._TRANSITION_TIMER = null;
        this._EXIT_LAYER?.remove();
        this._EXIT_LAYER = null;
        this._EXIT_VALUE = null;
        if (this._CURRENT_LAYER) this.normalizeLayer(this._CURRENT_LAYER);
        if (this._CONTENT_HOST) this.clearHostTransition(this._CONTENT_HOST);
        this.disposeContent(previousValue);
        this.executeMethod("TRANSITION_END", new Event("transitionend"), {
            PREVIOUS_CONTENT: previousValue,
            CONTENT: nextValue,
            DIRECTION: direction,
        });
    }

    private toNode(value: EffectChangeContent): Node | null {
        if (value == null) return null;
        if (typeof value === "string") return document.createTextNode(value);
        if (value instanceof CoreObservable.App) return this.toNode(value.get() as EffectChangeContent);
        if (value instanceof CoreReactive.App) return value.getElement();
        if (typeof value === "object" && "nodeType" in value) return value as Node;
        if (typeof value === "object" && "getElement" in value && typeof value.getElement === "function") return value.getElement();
        return null;
    }

    private createLayer(node: Node): HTMLElement {
        const layer = document.createElement("div");
        layer.setAttribute("data-effect-change-layer", "true");
        layer.style.width = "100%";
        layer.style.boxSizing = "border-box";
        layer.appendChild(node);
        return layer;
    }

    private prepareLayer(layer: HTMLElement): void {
        layer.style.position = "absolute";
        layer.style.top = "0";
        layer.style.left = "0";
        layer.style.right = "0";
        layer.style.width = "100%";
        layer.style.boxSizing = "border-box";
        layer.style.willChange = "opacity, transform";
    }

    private normalizeLayer(layer: HTMLElement): void {
        layer.style.position = "relative";
        layer.style.top = "";
        layer.style.left = "";
        layer.style.right = "";
        layer.style.width = "100%";
        layer.style.opacity = "1";
        layer.style.transform = "none";
        layer.style.transition = "none";
        layer.style.willChange = "";
    }

    private setEnterVisual(layer: HTMLElement, mode: EffectChangeMode, direction: EffectChangeDirection): void {
        switch (mode) {
            case EffectChangeMode.FADE:
                layer.style.opacity = "0";
                layer.style.transform = "none";
                break;
            case EffectChangeMode.SLIDE: {
                const isRtl = CoreConfig.Settings.DirectionRtl.observable().get();
                const forwardSign = isRtl ? -1 : 1;
                const sign = direction === EffectChangeDirection.FORWARD ? forwardSign : -forwardSign;
                layer.style.opacity = "0";
                layer.style.transform = `translateX(${sign * 100}%)`;
                break;
            }
            case EffectChangeMode.SCALE:
                layer.style.opacity = "0";
                layer.style.transform = "scale(0.96)";
                break;
            default:
                layer.style.opacity = "1";
                layer.style.transform = "none";
        }
    }

    private setExitVisual(layer: HTMLElement, mode: EffectChangeMode, direction: EffectChangeDirection): void {
        switch (mode) {
            case EffectChangeMode.FADE:
                layer.style.opacity = "0";
                break;
            case EffectChangeMode.SLIDE: {
                const isRtl = CoreConfig.Settings.DirectionRtl.observable().get();
                const forwardSign = isRtl ? -1 : 1;
                const sign = direction === EffectChangeDirection.FORWARD ? -forwardSign : forwardSign;
                layer.style.opacity = "0";
                layer.style.transform = `translateX(${sign * 100}%)`;
                break;
            }
            case EffectChangeMode.SCALE:
                layer.style.opacity = "0";
                layer.style.transform = "scale(0.96)";
                break;
            default:
                layer.style.opacity = "0";
        }
    }

    private shouldReduceMotion(): boolean {
        if (!this._COMPONENT_PROPS_BIND.prop_respectReducedMotion.get()) return false;
        return typeof window !== "undefined" && typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    private scheduleFrame(callback: () => void): void {
        if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
            let frameId = 0;
            const cancel = () => window.cancelAnimationFrame(frameId);
            frameId = window.requestAnimationFrame(() => {
                this._FRAME_CANCELLERS.delete(cancel);
                callback();
            });
            this._FRAME_CANCELLERS.add(cancel);
            return;
        }

        let timerId: ReturnType<typeof setTimeout>;
        const cancel = () => clearTimeout(timerId);
        timerId = setTimeout(() => {
            this._FRAME_CANCELLERS.delete(cancel);
            callback();
        }, 16);
        this._FRAME_CANCELLERS.add(cancel);
    }

    private cancelPendingTransition(): void {
        this._GENERATION++;
        if (this._TRANSITION_TIMER !== null) {
            clearTimeout(this._TRANSITION_TIMER);
            this._TRANSITION_TIMER = null;
        }
        this._FRAME_CANCELLERS.forEach((cancel) => cancel());
        this._FRAME_CANCELLERS.clear();

        this._EXIT_LAYER?.remove();
        if (this._EXIT_VALUE !== this._CURRENT_VALUE) this.disposeContent(this._EXIT_VALUE);
        this._EXIT_LAYER = null;
        this._EXIT_VALUE = null;
        if (this._CURRENT_LAYER) this.normalizeLayer(this._CURRENT_LAYER);
        if (this._CONTENT_HOST) this.clearHostTransition(this._CONTENT_HOST);
    }

    private clearHostTransition(host: HTMLElement): void {
        host.style.transition = "none";
        host.style.height = "";
    }

    private disposeContent(value: EffectChangeContent): void {
        if (!value || typeof value !== "object") return;
        const child = value as unknown as DisposableContent;
        if (typeof child.dispose === "function") child.dispose();
        else child.disposeStep?.();
    }
}
