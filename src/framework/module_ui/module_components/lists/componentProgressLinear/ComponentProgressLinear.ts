import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import {ColorGrad, ColorMain} from "@/util_consts";
import type {PartAttrDefault} from "@/core_components";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentProgressLinearBase} from "./ComponentProgressLinearBase";
import {Schemas} from "./Schemas";
import type {PropsConfigType, ProgressStatus} from "./Props";
import type {MethodsConfigType} from "./Methods";

type ProgressValue = {value: number; min: number; max: number; percent: number} | null;

export class ComponentProgressLinear extends ComponentProgressLinearBase {
    private disposed = false;
    constructor(config?: Partial<Omit<StructurePropsType, "prop_show"> & {prop_show: CoreObservable.TObservableValue<boolean>} & PropsConfigType>, methods?: MethodsConfigType<ComponentProgressLinear>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }
    override getElement(): HTMLElement { return super.getElement() as HTMLElement; }
    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        this.getScope().dispose();
    }
    override renderContentComponent(): CoreReactive.App { return this.executeSchemaPart(Schemas.ROOT.part, {}); }
    override renderManagerComponent(part: string, attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (part) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrs, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrs, data);
            case Schemas.ROOT.part: return this.renderRoot(attrs, data);
            case Schemas.HEADER.part: return this.renderHeader(attrs);
            case Schemas.TRACK.part: return this.renderTrack(attrs);
            case Schemas.FILL.part: return this.renderFill(attrs);
            default: return super.renderManagerComponent(part, attrs, data, extra);
        }
    }
    private progress(): CoreObservable.App<ProgressValue> {
        const p = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.computed((value: number | null, min: number, max: number) => {
            if (value === null || !Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) return null;
            const bounded = Math.min(max, Math.max(min, value));
            return {value: bounded, min, max, percent: (bounded - min) / (max - min) * 100};
        }, [p.prop_value, p.prop_min, p.prop_max], this.getScope());
    }
    private renderRoot(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        return CoreReactive.App.section({
            attrs: {...attrs},
            classBind: [data.prop_progressClass ?? p.prop_progressClass],
            stylesBind: data.prop_progressStyles ?? p.prop_progressStyles,
            stylesCustom: `@keyframes progress-linear-ltr { from { transform: translateX(0); } to { transform: translateX(185%); } }
@keyframes progress-linear-rtl { from { transform: translateX(0); } to { transform: translateX(-185%); } }
@media (prefers-reduced-motion: reduce) { [data-progress-indeterminate="true"] { animation: none !important; } }`,
            children: [this.executeSchemaPart(Schemas.HEADER.part, {}), this.executeSchemaPart(Schemas.TRACK.part, {})],
        });
    }
    private renderHeader(attrs: PartAttrDefault): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        const percentage = CoreObservable.App.computed((progress: ProgressValue, show: boolean) => progress && show ? `${Math.round(progress.percent)}%` : "", [this.progress(), p.prop_showValue], this.getScope());
        return CoreReactive.App.div({
            attrs: {...attrs},
            styles: {display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--marginMedium)"},
            children: [
                CoreReactive.App.div({children: [CoreReactive.App.div({children: [p.prop_title]}), CoreReactive.App.div({attrs: {role: "status", "aria-live": "polite"}, children: [p.prop_statusText]})]}),
                CoreReactive.App.span({attrs: {"aria-hidden": "true"}, children: [percentage]}),
            ],
        });
    }
    private renderTrack(attrs: PartAttrDefault): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        const progress = this.progress();
        const value = CoreObservable.App.computed((v: ProgressValue) => v?.value ?? null, [progress], this.getScope());
        const min = CoreObservable.App.computed((v: ProgressValue) => v?.min ?? null, [progress], this.getScope());
        const max = CoreObservable.App.computed((v: ProgressValue) => v?.max ?? null, [progress], this.getScope());
        const name = CoreObservable.App.computed((title: string, fallback: string) => title?.trim() || fallback?.trim() || "Progress", [p.prop_title, p.prop_accessibleLabel], this.getScope());
        const styles = CoreObservable.App.computed((color: string | null, size: any) => ({position: "relative", overflow: "hidden", width: "100%", height: `calc(${UtilStyle.Css_Height(size)} / 5)`, borderRadius: UtilStyle.Css_BorderRadius(size), background: color || UtilStyle.Css_Color(ColorMain.SHAN, ColorGrad.GRADE_3)}), [p.prop_trackColor, CoreConfig.Settings.SizeName.observable()], this.getScope());
        return CoreReactive.App.div({attrs: {...attrs, role: "progressbar"}, attrsBind: {"aria-label": name, "aria-valuenow": value, "aria-valuemin": min, "aria-valuemax": max}, stylesBind: styles, children: [this.executeSchemaPart(Schemas.FILL.part, {})]});
    }
    private renderFill(attrs: PartAttrDefault): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        const progress = this.progress();
        const indeterminate = CoreObservable.App.computed((value: ProgressValue) => value === null ? "true" : null, [progress], this.getScope());
        const styles = CoreObservable.App.computed((value: ProgressValue, color: string | null, status: ProgressStatus, rtl: boolean) => ({
            position: "absolute", insetBlock: "0", insetInlineStart: "0", width: value ? `${value.percent}%` : status === "running" ? "35%" : "0%",
            background: color || UtilStyle.Css_Color(status === "error" ? ColorMain.ERROR : status === "success" ? ColorMain.SUCCESS : ColorMain.PRIMARY, ColorGrad.GRADE_1),
            borderRadius: "inherit", animation: value || status !== "running" ? "none" : `${rtl ? "progress-linear-rtl" : "progress-linear-ltr"} 1.4s ease-in-out infinite alternate`,
        }), [progress, p.prop_fillColor, p.prop_status, CoreConfig.Settings.DirectionRtl.observable()], this.getScope());
        return CoreReactive.App.div({attrs: {...attrs}, attrsBind: {"data-progress-indeterminate": indeterminate}, stylesBind: styles});
    }
}
