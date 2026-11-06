import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import {ColorGrad, ColorMain} from "@/util_consts";
import type {PartAttrDefault} from "@/core_components";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys} from "../../../module_categories/languages";
import {ComponentChartMetricGaugeBase} from "./ComponentChartMetricGaugeBase";
import {ComponentTable} from "../componentTable/ComponentTable";
import {calculateGauge, type GaugeModel, type MetricBand} from "./Model";
import {Schemas} from "./Schemas";
import type {PropsConfigType} from "./Props";
import type {MethodsConfigType} from "./Methods";

export class ComponentChartMetricGauge extends ComponentChartMetricGaugeBase {
    private disposed = false;
    private legendTable: ComponentTable | null = null;
    constructor(config?: Partial<StructurePropsType & PropsConfigType>, methods?: MethodsConfigType<ComponentChartMetricGauge>, identity?: {unique?: any; emit?: any; events?: Record<string, any> | null}) {
        super(identity);
        this.renderComponent(config as any, methods as any, identity?.events ?? null);
    }
    override getElement(): HTMLElement { return super.getElement() as HTMLElement; }
    dispose(): void { if (!this.disposed) { this.disposed = true; this.legendTable?.dispose(); this.getScope().dispose(); } }
    override renderContentComponent(): CoreReactive.App { return this.executeSchemaPart(Schemas.ROOT.part, {}); }
    override renderManagerComponent(part: string, attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (part) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrs, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrs, data);
            case Schemas.ROOT.part: return this.renderRoot(attrs, data);
            case Schemas.CHART.part: return this.renderChart(attrs);
            default: return super.renderManagerComponent(part, attrs, data, extra);
        }
    }
    private model(): CoreObservable.App<GaugeModel> {
        const p = this._COMPONENT_PROPS_BIND;
        return CoreObservable.App.computed(calculateGauge, [p.prop_value, p.prop_min, p.prop_max, p.prop_bands], this.getScope());
    }
    private renderRoot(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        const k = Keys.category.components.charts.monitor.gauge;
        const model = this.model();
        const unavailable = CoreLanguage.App.translate(k.unavailable);
        const unclassified = CoreLanguage.App.translate(k.unclassified);
        const invalid = CoreLanguage.App.translate(k.invalid);
        const outside = CoreLanguage.App.translate(k.outside);
        const valueText = CoreObservable.App.computed((m: GaugeModel, unit: string, custom: string | null, fallback: string | null, missing: string) => m.value === null ? fallback || missing : custom ?? `${Number(m.value.toFixed(2))}${unit ? ` ${unit}` : ""}`, [model, p.prop_unit, p.prop_valueText, p.prop_unavailableText, unavailable], this.getScope());
        const assessment = CoreObservable.App.computed((m: GaugeModel, noCriteria: string, badConfig: string, outsideText: string) => m.kind === "unavailable" ? "" : m.kind === "invalid" ? badConfig : m.kind === "unconfigured" ? noCriteria : [m.band?.label || noCriteria, m.outside ? outsideText : ""].filter(Boolean).join(" · "), [model, unclassified, invalid, outside], this.getScope());
        const legendRows = CoreObservable.App.computed((m: GaugeModel, unit: string) => m.kind === "ready" ? m.bands.map((b) => ({status: b.label, range: `${b.from}–${b.to}${unit ? ` ${unit}` : ""}`})) : [], [model, p.prop_unit], this.getScope());
        const legendHeader = CoreObservable.App.computed((status: string, range: string) => [{id: "status", content: status}, {id: "range", content: range}], [CoreLanguage.App.translate(k.legendStatus), CoreLanguage.App.translate(k.legendRange)], this.getScope());
        const legendStyles = CoreObservable.App.computed((rows: unknown[]) => ({display: rows.length ? "block" : "none", overflowX: "auto"}), [legendRows], this.getScope());
        this.legendTable = new ComponentTable({prop_header: legendHeader, prop_order: ["status", "range"], prop_data: legendRows, prop_hasColNumber: false, prop_hasColSelector: false, prop_doColSelector: false, prop_tableClass: ["table", "table-sm", "mb-0"], prop_tableItemBodyStyles: {padding: "4px"}, prop_tableItemHeadStyles: {padding: "4px"}} as any);
        const scaleStart = CoreObservable.App.computed((m: GaugeModel, min: number | null, unit: string) => m.kind === "ready" ? `${min}${unit ? ` ${unit}` : ""}` : "", [model, p.prop_min, p.prop_unit], this.getScope());
        const scaleEnd = CoreObservable.App.computed((m: GaugeModel, max: number | null, unit: string) => m.kind === "ready" ? `${max}${unit ? ` ${unit}` : ""}` : "", [model, p.prop_max, p.prop_unit], this.getScope());
        return CoreReactive.App.section({attrs: {...attrs}, classBind: [data.prop_chartClass ?? p.prop_chartClass], stylesBind: data.prop_chartStyles ?? p.prop_chartStyles, children: [
            CoreReactive.App.div({className: ["d-flex", "justify-content-between", "gap-2", "align-items-start"], children: [CoreReactive.App.div({className: ["small", "text-muted"], children: [p.prop_title]}), CoreReactive.App.div({className: ["fw-semibold"], attrs: {"data-gauge-value": ""}, children: [valueText]})]}),
            CoreReactive.App.div({className: ["small", "mt-1"], attrs: {"data-gauge-assessment": ""}, children: [assessment]}),
            this.executeSchemaPart(Schemas.CHART.part, {}),
            CoreReactive.App.div({className: ["small", "text-muted", "d-flex", "justify-content-between"], styles: {direction: "ltr"}, children: [CoreReactive.App.span({children: [scaleStart]}), CoreReactive.App.span({children: [scaleEnd]})]}),
            CoreReactive.App.div({className: ["small", "mt-2"], attrs: {"data-gauge-legend": ""}, stylesBind: legendStyles, children: [this.legendTable.getElement()]}),
        ]});
    }
    private renderChart(attrs: PartAttrDefault): CoreReactive.App {
        const p = this._COMPONENT_PROPS_BIND;
        const svg = CoreReactive.App.svg({attrs: {...attrs, viewBox: "0 0 300 34", "aria-hidden": "true", focusable: "false"}, styles: {width: "100%", height: "34px", display: "block", direction: "ltr"}});
        const element = svg.getElement() as unknown as SVGSVGElement;
        const state = CoreObservable.App.computed((model: GaugeModel, min: number | null, max: number | null) => ({model, min, max}), [this.model(), p.prop_min, p.prop_max], this.getScope());
        const render = ({model, min, max}: {model: GaugeModel; min: number | null; max: number | null}) => {
            element.replaceChildren();
            if (model.kind !== "ready" || min === null || max === null) return;
            const make = (tag: string, attributes: Record<string, string>) => {
                const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
                Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
                element.appendChild(node);
            };
            const x = (v: number) => 5 + 290 * (v - min) / (max - min);
            make("rect", {x: "5", y: "14", width: "290", height: "8", rx: "4", fill: UtilStyle.Css_Color(ColorMain.SHAN, ColorGrad.GRADE_3)});
            model.bands.forEach((band: MetricBand) => make("rect", {x: String(x(band.from)), y: "14", width: String(x(band.to) - x(band.from)), height: "8", fill: band.color || UtilStyle.Css_Color(ColorMain.PRIMARY, ColorGrad.GRADE_1)}));
            if (model.position !== null) {
                const at = 5 + 290 * model.position;
                make("path", {d: `M ${at - 4} 2 L ${at + 4} 2 L ${at} 10 Z`, fill: "currentColor"});
                make("line", {x1: String(at), x2: String(at), y1: "10", y2: "27", stroke: "currentColor", "stroke-width": "2"});
            }
        };
        render(state.get());
        state.subscribe(render, this.getScope());
        return svg;
    }
}
