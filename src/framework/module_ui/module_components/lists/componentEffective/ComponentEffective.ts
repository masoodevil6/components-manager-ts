import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import * as ComponentBorder from "../componentBorder";
import {ComponentEffectiveBase} from "./ComponentEffectiveBase";
import {Props as BorderProps} from "../componentBorder/Props";
import type {PropsConfigType} from "./Props";
import {EffectiveMode} from "./Props";
import {Schemas} from "./Schemas";
import type {MethodsConfigType} from "./Methods";
import {createEffectiveStep} from "./Step";

type EffectPhase = "visible" | "show-start" | "hiding" | "hidden";
type DisposableChild = {dispose?: () => void; disposeStep?: () => void};

const readValue = <T,>(value: T | CoreObservable.App<T> | null | undefined, fallback: T): T => {
    if (value instanceof CoreObservable.App) return value.get() as T;
    return (value ?? fallback) as T;
};

const durationValue = (value: unknown): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

const hiddenVisual = (mode: EffectiveMode): {opacity: string; transform: string} => {
    switch (mode) {
        case EffectiveMode.FADE:
            return {opacity: "0", transform: "none"};
        case EffectiveMode.SLIDE:
            return {opacity: "0", transform: "translateY(0.75rem)"};
        case EffectiveMode.SCALE:
            return {opacity: "0", transform: "scale(0.96)"};
        case EffectiveMode.NONE:
        default:
            return {opacity: "0", transform: "none"};
    }
};

export class ComponentEffective extends ComponentEffectiveBase<ReturnType<typeof createEffectiveStep>>{
    private _BORDER: ComponentBorder.Component | null = null;
    private readonly _CHILDREN: DisposableChild[] = [];
    private readonly _PRESENT: CoreObservable.App<boolean>;
    private readonly _PHASE: CoreObservable.App<EffectPhase>;
    private _TARGET_VISIBLE = true;
    private _HIDE_TIMER: ReturnType<typeof setTimeout> | null = null;
    private _CANCEL_FRAME: (() => void) | null = null;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentEffective>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createEffectiveStep());

        const initiallyVisible = readValue(config?.prop_isVisible, true);
        this._TARGET_VISIBLE = initiallyVisible;
        this._PRESENT = new CoreObservable.App(initiallyVisible);
        this._PHASE = new CoreObservable.App(initiallyVisible ? "visible" : "hidden");

        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);

        const visible = this._COMPONENT_PROPS_BIND.prop_isVisible;
        if (visible instanceof CoreObservable.App) {
            visible.subscribe((value: boolean) => this.setVisibility(!!value), this.getScope());
        }
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this.clearPendingTransitions();
        this._CHILDREN.forEach((child) => child.dispose ? child.dispose() : child.disposeStep?.());
        this._CHILDREN.length = 0;
        this._BORDER = null;
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
            case Schemas.BORDER.part:
                return this.renderBorder(attrsDefault);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrsDefault: PartAttrDefault): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const styles = CoreObservable.App.computed((
            present: boolean,
            phase: EffectPhase,
            showMode: EffectiveMode,
            hideMode: EffectiveMode,
            showDuration: number,
            hideDuration: number,
            easing: string,
            collapseSpaceWhenHidden: boolean,
        ) => {
            const mode = phase === "hiding" || phase === "hidden" ? hideMode : showMode;
            const visual = phase === "visible" ? {opacity: "1", transform: "none"} : hiddenVisual(mode);
            const duration = durationValue(phase === "hiding" ? hideDuration : showDuration);
            const animate = (phase === "visible" || phase === "hiding") && mode !== EffectiveMode.NONE && duration > 0;
            const isHidden = !present;
            const collapseHiddenSpace = isHidden && collapseSpaceWhenHidden;

            return {
                display: collapseHiddenSpace ? "none" : "block",
                visibility: isHidden && !collapseSpaceWhenHidden ? "hidden" : "visible",
                opacity: visual.opacity,
                transform: visual.transform,
                transformOrigin: "center",
                transition: animate ? `opacity ${duration}ms ${easing || "ease"}, transform ${duration}ms ${easing || "ease"}` : "none",
                pointerEvents: phase === "hiding" || phase === "hidden" ? "none" : "auto",
            };
        }, [
            this._PRESENT,
            this._PHASE,
            bind.prop_showMode,
            bind.prop_hideMode,
            bind.prop_showDuration,
            bind.prop_hideDuration,
            bind.prop_easing,
            bind.prop_collapseSpaceWhenHidden,
        ], this.getScope());

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            stylesBind: styles as any,
            children: [this.executeSchemaPart(Schemas.BORDER.part, {})],
        });
    }

    private renderBorder(attrsDefault: PartAttrDefault): CoreReactive.App {
        if (!this._BORDER) {
            const borderConfig: Record<string, unknown> = {};
            const bind = this._COMPONENT_PROPS_BIND as Record<string, unknown>;
            for (const propName of Object.keys(BorderProps)) borderConfig[propName] = bind[propName];

            this._BORDER = new ComponentBorder.Component(borderConfig as any);
            this._CHILDREN.push(this._BORDER);
        }

        return CoreReactive.App.section({
            attrs: {...attrsDefault},
            children: [this._BORDER.getReactiveElement() as CoreReactive.App],
        });
    }

    private setVisibility(visible: boolean): void {
        if (this._DISPOSED || this._TARGET_VISIBLE === visible) return;
        this._TARGET_VISIBLE = visible;
        this.clearPendingTransitions();

        const bind = this._COMPONENT_PROPS_BIND;
        if (visible) {
            this._PRESENT.set(true);
            const mode = readValue(bind.prop_showMode, EffectiveMode.NONE);
            const duration = durationValue(readValue(bind.prop_showDuration, 0));
            if (mode === EffectiveMode.NONE || duration === 0) {
                this._PHASE.set("visible");
                return;
            }

            this._PHASE.set("show-start");
            this.scheduleFrame(() => {
                if (!this._DISPOSED && this._TARGET_VISIBLE) this._PHASE.set("visible");
            });
            return;
        }

        if (!this._PRESENT.get()) {
            this._PHASE.set("hidden");
            return;
        }

        const mode = readValue(bind.prop_hideMode, EffectiveMode.NONE);
        const duration = durationValue(readValue(bind.prop_hideDuration, 0));
        if (mode === EffectiveMode.NONE || duration === 0) {
            this._PHASE.set("hidden");
            this._PRESENT.set(false);
            return;
        }

        this._PHASE.set("hiding");
        this._HIDE_TIMER = setTimeout(() => {
            this._HIDE_TIMER = null;
            if (this._DISPOSED || this._TARGET_VISIBLE) return;
            this._PHASE.set("hidden");
            this._PRESENT.set(false);
        }, duration);
    }

    private scheduleFrame(callback: () => void): void {
        if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
            const id = window.requestAnimationFrame(() => {
                this._CANCEL_FRAME = null;
                callback();
            });
            this._CANCEL_FRAME = () => window.cancelAnimationFrame(id);
            return;
        }

        const id = setTimeout(() => {
            this._CANCEL_FRAME = null;
            callback();
        }, 16);
        this._CANCEL_FRAME = () => clearTimeout(id);
    }

    private clearPendingTransitions(): void {
        if (this._HIDE_TIMER !== null) {
            clearTimeout(this._HIDE_TIMER);
            this._HIDE_TIMER = null;
        }
        this._CANCEL_FRAME?.();
        this._CANCEL_FRAME = null;
    }
}
