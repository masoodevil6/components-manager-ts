import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilShape from "@/util_shapes";
import * as UtilStyle from "@/util_styles";
import {PartAttrDefault} from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ComponentBreadcrumbWithArrowBase} from "./ComponentBreadcrumbWithArrowBase";
import {Props, type BreadcrumbArrowItem, type PropsConfigType} from "./Props";
import {Methods, type MethodsConfigType} from "./Methods";
import {Schemas} from "./Schemas";
import {createBreadcrumbWithArrowStep} from "./Step";
import type {TSvgPoint} from "@/util_shapes";

type Layout = {mobile: boolean; width: number; height: number; count: number; stepX: number; margin: number; rtl: boolean; sizeName: any};

export class ComponentBreadcrumbWithArrow extends ComponentBreadcrumbWithArrowBase<ReturnType<typeof createBreadcrumbWithArrowStep>>{
    private readonly _INSTANCE_CLASS = "component-breadcrumb-with-arrow-" + this._COMPONENT_RANDOM_ID;
    private readonly _CONTAINER_WIDTH = new CoreObservable.App<number>(768);
    private _RESIZE_OBSERVER: ResizeObserver | null = null;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentBreadcrumbWithArrow>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        super(identity, createBreadcrumbWithArrowStep());
        this.renderComponent({...config, styles: {width: "100%", display: "block", ...config?.styles}} as any, methods as any, identity?.events ?? null);
        if (typeof ResizeObserver !== "undefined") {
            this._RESIZE_OBSERVER = new ResizeObserver((entries) => {
                const width = entries[0]?.contentRect.width ?? 0;
                if (width > 0) this._CONTAINER_WIDTH.set(width);
            });
            this._RESIZE_OBSERVER.observe(this.getElement());
        }
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._RESIZE_OBSERVER?.disconnect();
        this._RESIZE_OBSERVER = null;
        this.disposeStep();
        this.getScope().dispose();
    }

    override getElement(): HTMLElement {
        return super.getElement() as HTMLElement;
    }

    override renderContentComponent(): CoreReactive.App {
        return this.executeSchemaPart(Schemas.ROOT.part, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part: return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part: return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.ROOT.part: return this.renderRoot(attrsDefault);
            case Schemas.SVG.part: return this.renderSvg(attrsDefault, data);
            case Schemas.STEP.part: return this.renderStep(attrsDefault, data, extra);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderRoot(attrs: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrs, class: this._INSTANCE_CLASS},
            styles: {width: "100%", overflowX: "auto", overflowY: "hidden"},
            children: [this.executeSchemaPart(Schemas.SVG.part, {})],
        });
    }

    private renderSvg(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const prop = (name: keyof typeof Props) => data?.[name as string] ?? (bind as any)[name];
        const items = prop("prop_breadcrumbs");
        const selected = prop("prop_stepSelected");
        const side = prop("prop_side");
        const length = prop("prop_length");
        const gap = prop("prop_gap");
        const height = prop("prop_height");
        const marginPercent = prop("prop_marginMinPerent");
        const isRtl = CoreConfig.Settings.DirectionRtl.observable();
        const sizeName = CoreConfig.Settings.SizeName.observable();
        const layout = CoreObservable.App.computed(
            (width: number, steps: Array<BreadcrumbArrowItem | null>, sideValue: number, lengthValue: number, gapValue: number, heightValue: number, margin: number, rtl: boolean, size: any): Layout => {
                const count = steps?.length ?? 0;
                const safeWidth = Math.max(1, width || 768);
                const mobile = safeWidth < 768;
                const safeSide = Math.max(0, sideValue || 0);
                const safeLength = Math.max(1, lengthValue || 1);
                const safeHeight = Math.max(1, heightValue || 1);
                const safeGap = Math.max(0, gapValue || 0);
                const safeMargin = Math.min(40, Math.max(0, margin || 0)) / 100;
                const stepX = safeLength + 2 * safeSide + safeGap;
                const mobileHeight = 100;
                // Leave room for the drop shadow below the desktop step polygons.
                const desktopHeight = safeHeight * 2.5 + 6;
                const contentWidth = mobile
                    ? safeWidth
                    : Math.max(safeWidth, count ? count * (safeLength + 2 * safeSide) + Math.max(0, count - 1) * safeGap : safeWidth);
                return {mobile, width: contentWidth, height: mobile ? mobileHeight : desktopHeight, count, stepX, margin: safeWidth * safeMargin, rtl, sizeName: size};
            },
            [this._CONTAINER_WIDTH, items, side, length, gap, height, marginPercent, isRtl, sizeName],
            this.getScope(),
        );
        const viewBox = CoreObservable.App.computed((value: Layout) => "0 0 " + value.width + " " + value.height, [layout], this.getScope());
        const widthStyle = CoreObservable.App.computed((value: Layout) => value.width + "px", [layout], this.getScope());
        const heightStyle = CoreObservable.App.computed((value: Layout) => value.height + "px", [layout], this.getScope());
        const nodes = CoreObservable.App.computed(
            (value: Layout, list: Array<BreadcrumbArrowItem | null>) => {
                if (!value.mobile || value.count < 2) return (list ?? []).map((item, index) =>
                    this.executeSchemaPart(Schemas.STEP.part, {item, index, layout: value}),
                );
                const start = value.margin;
                const end = value.width - value.margin;
                const first = value.rtl ? end : start;
                const last = value.rtl ? start : end;
                const line = CoreReactive.App.svgLine({
                    attrs: {x1: String(first), y1: "55", x2: String(last), y2: "55", stroke: "#9aa0a6", "stroke-width": "3"},
                });
                return [line, ...(list ?? []).map((item, index) => this.executeSchemaPart(Schemas.STEP.part, {item, index, layout: value}))];
            },
            [layout, items],
            this.getScope(),
        );
        return CoreReactive.App.svg({
            attrs: {...attrs, role: "list", viewBox: "0 0 768 100", preserveAspectRatio: "xMinYMin meet"},
            attrsBind: {viewBox},
            styles: {display: "block", maxWidth: "none"},
            stylesBind: {width: widthStyle, height: heightStyle},
            children: [nodes as any],
        });
    }

    private renderStep(attrs: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: {item: BreadcrumbArrowItem | null; index: number; layout: Layout}): CoreReactive.App {
        const item = extra?.item ?? null;
        const index = extra?.index ?? 0;
        const layout = extra?.layout ?? {mobile: true, width: 768, height: 100, count: 0, stepX: 1, margin: 0, rtl: false, sizeName: undefined};
        const bind = this._COMPONENT_PROPS_BIND;
        const selected = data?.prop_stepSelected ?? bind.prop_stepSelected;
        const inactiveBg = data?.prop_unactiveBreadcrumb ?? bind.prop_unactiveBreadcrumb;
        const inactiveText = data?.prop_colorUnactive ?? bind.prop_colorUnactive;
        const activeBg = data?.prop_activeBreadcrumb ?? bind.prop_activeBreadcrumb;
        const activeText = data?.prop_colorActive ?? bind.prop_colorActive;
        const shadow = data?.prop_colorShadow ?? bind.prop_colorShadow;
        const isActive = (step: number) => index <= step;
        const commonAttrs = {
            ...attrs, id: String(attrs.id ?? "") + "-" + index, role: "button", tabindex: "0", "aria-label": item?.title ?? "",
        };
        const ariaCurrent = CoreObservable.App.computed(
            (step: number) => index === step ? "step" : "false",
            [selected],
            this.getScope(),
        );
        if (layout.mobile) {
            const start = layout.margin;
            const end = layout.width - layout.margin;
            const fraction = layout.count <= 1 ? 0.5 : index / (layout.count - 1);
            const x = layout.rtl ? end - fraction * (end - start) : start + fraction * (end - start);
            const y = 55;
            const circleFill = CoreObservable.App.computed(
                (step: number, inactive: string, activeColor: string) => isActive(step) ? activeColor : inactive,
                [selected, inactiveBg, activeBg],
                this.getScope(),
            );
            const circle = CoreReactive.App.svgCircle({
                attrs: {cx: String(x), cy: String(y), r: "16"},
                attrsBind: {fill: circleFill, stroke: circleFill, "stroke-width": "2"},
                stylesBind: {filter: CoreObservable.App.computed((color: string) => "drop-shadow(0px 1px 2px " + color + ")", [shadow], this.getScope())},
            });
            const labelColor = CoreObservable.App.computed(
                (step: number, activeColor: string, idleColor: string) => isActive(step) ? idleColor : activeColor,
                [selected, activeText, inactiveText],
                this.getScope(),
            );
            const label = CoreReactive.App.svgText({
                attrs: {x: String(x), y: "22", "text-anchor": "middle", "font-size": "12"},
                attrsBind: {fill: labelColor},
                children: [item?.title ?? ""],
            });
            const marker = CoreObservable.App.computed((step: number, activeColor: string, idleColor: string) => {
                if (isActive(step)) {
                    return CoreReactive.App.svgPath({attrs: {d: "M" + (x - 6) + " " + (y - 1) + "l4 4 8-9", fill: "none", stroke: idleColor, "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round"}});
                }
                return CoreReactive.App.svgText({attrs: {x: String(x), y: String(y + 4), "text-anchor": "middle", "font-size": "12", fill: idleColor}, children: [String(index + 1)]});
            }, [selected, activeText, inactiveText], this.getScope());
            return CoreReactive.App.svgG({
                attrs: commonAttrs,
                attrsBind: {"aria-current": ariaCurrent},
                on: {
                    mousedown: (event: MouseEvent) => event.preventDefault(),
                    click: (event: Event) => this.executeMethod("SELECT_BREADCRUMB", event, {ITEM: item}),
                    keydown: (event: KeyboardEvent) => this.activateByKeyboard(event, item),
                },
                styles: {cursor: item ? "pointer" : "default"},
                children: [label, circle, marker as any],
            });
        }
        const side = Math.max(0, Number(data?.prop_side?.get() ?? bind.prop_side.get()));
        const length = Math.max(1, Number(data?.prop_length?.get() ?? bind.prop_length.get()));
        const gap = Math.max(0, Number(data?.prop_gap?.get() ?? bind.prop_gap.get()));
        const height = Math.max(1, Number(data?.prop_height?.get() ?? bind.prop_height.get()) * 2.5);
        const x = layout.rtl ? layout.width - (index + 1) * (length + 2 * side + gap) : index * (length + 2 * side + gap);
        const stepWidth = length + 2 * side;
        const isFirst = index === 0;
        const isLast = index === layout.count - 1;
        let points: TSvgPoint[];
        if (layout.rtl) {
            if (isFirst && isLast) {
                points = [{x: 0, y: 0}, {x: stepWidth, y: 0}, {x: stepWidth, y: height}, {x: 0, y: height}];
            } else if (isFirst) {
                // RTL starts on the right: keep that outer edge flat, with a left-facing join.
                points = [{x: stepWidth, y: 0}, {x: side, y: 0}, {x: 0, y: height / 2}, {x: side, y: height}, {x: stepWidth, y: height}];
            } else if (isLast) {
                // RTL ends on the left: keep the left outer edge flat.
                points = [{x: stepWidth, y: 0}, {x: 0, y: 0}, {x: 0, y: height}, {x: stepWidth, y: height}, {x: length + side, y: height / 2}];
            } else {
                points = [{x: stepWidth, y: 0}, {x: side, y: 0}, {x: 0, y: height / 2}, {x: side, y: height}, {x: stepWidth, y: height}, {x: length + side, y: height / 2}];
            }
        } else if (isFirst && isLast) {
            points = [{x: 0, y: 0}, {x: stepWidth, y: 0}, {x: stepWidth, y: height}, {x: 0, y: height}];
        } else if (isFirst) {
            // LTR starts on the left: keep that outer edge flat, with a right-facing join.
            points = [{x: 0, y: 0}, {x: length + side, y: 0}, {x: stepWidth, y: height / 2}, {x: length + side, y: height}, {x: 0, y: height}];
        } else if (isLast) {
            // LTR ends on the right: keep the right outer edge flat.
            points = [{x: 0, y: 0}, {x: stepWidth, y: 0}, {x: stepWidth, y: height}, {x: 0, y: height}, {x: side, y: height / 2}];
        } else {
            points = [{x: 0, y: 0}, {x: length + side, y: 0}, {x: stepWidth, y: height / 2}, {x: length + side, y: height}, {x: 0, y: height}, {x: side, y: height / 2}];
        }
        const highlight = this.createLowerHalfPolygon(points, height);
        const active = CoreObservable.App.computed((step: number) => isActive(step), [selected], this.getScope());
        const fill = CoreObservable.App.computed((on: boolean, a: string, b: string) => on ? b : a, [active, inactiveBg, activeBg], this.getScope());
        const shineFill = CoreObservable.App.computed(
            (step: number) => isActive(step)
                ? UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_3)
                : UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            [selected],
            this.getScope(),
        );
        const textColor = CoreObservable.App.computed((on: boolean, activeColor: string, idleColor: string) => on ? idleColor : activeColor, [active, activeText, inactiveText], this.getScope());
        // Position the label from the triangle edge, using the configured system margin.
        const labelMargin = this.resolveSvgLength(UtilStyle.Css_Margin(layout.sizeName));
        const labelX = layout.rtl
            ? stepWidth - (height + labelMargin)
            : height + labelMargin;
        const translated = points.map((point) => UtilShape.Svg.PointOffset(point, x, 0));
        const connectorElements: any[] = [];
        if (!isLast && layout.count > 1 && side > 0) {
            const connectorGap = Math.min(side, gap);
            const connectorWidth = 2 * side - connectorGap;
            const connectorPoints: TSvgPoint[] = layout.rtl
                ? [
                    {x: side, y: 0}, {x: connectorWidth, y: 0}, {x: side - connectorGap, y: height / 2},
                    {x: connectorWidth, y: height}, {x: side, y: height}, {x: 0, y: height / 2},
                ]
                : [
                    {x: side - connectorGap, y: 0}, {x: 0, y: 0}, {x: side, y: height / 2},
                    {x: 0, y: height}, {x: side - connectorGap, y: height}, {x: connectorWidth, y: height / 2},
                ];
            const connectorX = layout.rtl
                ? x - side - connectorGap
                : x + stepWidth - (side - connectorGap);
            const translatedConnector = connectorPoints.map((point) => UtilShape.Svg.PointOffset(point, connectorX, 0));
            const connectorShadow = CoreObservable.App.computed(
                (color: string) => "drop-shadow(1px 2px 2px " + color + ")",
                [shadow],
                this.getScope(),
            );
            connectorElements.push(
                CoreReactive.App.svgPolygon({
                    attrs: {points: UtilShape.Svg.PolygonPointsToString(translatedConnector)},
                    attrsBind: {fill},
                    stylesBind: {filter: connectorShadow},
                }),
                CoreReactive.App.svgPolygon({
                    attrs: {points: UtilShape.Svg.PolygonPointsToString(this.createLowerHalfPolygon(connectorPoints, height).map((point) => UtilShape.Svg.PointOffset(point, connectorX, 0))), opacity: "0.6"},
                    attrsBind: {fill: shineFill},
                }),
            );
        }
        const polygon = CoreReactive.App.svgPolygon({
            attrs: {points: UtilShape.Svg.PolygonPointsToString(translated)},
            attrsBind: {fill},
            stylesBind: {filter: CoreObservable.App.computed((color: string) => "drop-shadow(1px 2px 2px " + color + ")", [shadow], this.getScope())},
        });
        const shine = CoreReactive.App.svgPolygon({
            attrs: {points: UtilShape.Svg.PolygonPointsToString(highlight.map((point) => UtilShape.Svg.PointOffset(point, x, 0))), opacity: "0.6"},
            attrsBind: {fill: shineFill},
        });
        const label = CoreReactive.App.svgText({
            attrs: {x: String(labelX), y: String(height / 2 + 5), "text-anchor": "middle", "font-size": "14", "font-weight": "600"},
            attrsBind: {fill: textColor},
            children: [item?.title ?? ""],
        });
        const positionedLabel = CoreReactive.App.svgG({
            attrs: {transform: `translate(${x} 0)`},
            children: [label],
        });
        const markerX = x + (layout.rtl ? side + length * 0.22 : side + length * 0.78);
        const markerY = height / 2;
        const markerRadius = Math.max(5, Math.min(height / 2, 14));
        const pendingMarkerColor = UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1);
        const marker = CoreObservable.App.computed((step: number, activeColor: string, idleColor: string) => {
            if (isActive(step)) {
                return [
                    CoreReactive.App.svgCircle({attrs: {cx: String(markerX), cy: String(markerY), r: String(markerRadius), fill: "none", stroke: idleColor, "stroke-width": "2"}}),
                    CoreReactive.App.svgPath({attrs: {d: "M" + (markerX - 5) + " " + markerY + "l3 3 6-7", fill: "none", stroke: idleColor, "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round"}}),
                ];
            }
            return [
                CoreReactive.App.svgCircle({attrs: {cx: String(markerX), cy: String(markerY), r: String(markerRadius), fill: "none", stroke: pendingMarkerColor, "stroke-width": "2"}}),
                CoreReactive.App.svgText({attrs: {x: String(markerX), y: String(markerY + 5), "text-anchor": "middle", "font-size": "14", fill: activeColor}, children: [String(index + 1)]}),
            ];
        }, [selected, activeText, inactiveText], this.getScope());
        return CoreReactive.App.svgG({
            attrs: commonAttrs,
            attrsBind: {"aria-current": ariaCurrent},
            on: {
                mousedown: (event: MouseEvent) => event.preventDefault(),
                click: (event: Event) => this.executeMethod("SELECT_BREADCRUMB", event, {ITEM: item}),
                keydown: (event: KeyboardEvent) => this.activateByKeyboard(event, item),
            },
            styles: {cursor: item ? "pointer" : "default"},
            children: [...connectorElements, polygon, shine, positionedLabel, marker as any],
        });
    }

    private activateByKeyboard(event: KeyboardEvent, item: BreadcrumbArrowItem | null): void {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        this.executeMethod("SELECT_BREADCRUMB", event, {ITEM: item});
    }

    private resolveSvgLength(cssLength: string): number {
        const variableName = cssLength.match(/^var\((--[\w-]+)\)$/)?.[1];
        if (!variableName || typeof document === "undefined" || typeof getComputedStyle === "undefined") return 0;
        const rootValue = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
        const bodyValue = rootValue || (document.body ? getComputedStyle(document.body).getPropertyValue(variableName).trim() : "");
        const numericValue = Number.parseFloat(bodyValue);
        return Number.isFinite(numericValue) ? numericValue : 0;
    }

    private createLowerHalfPolygon(points: TSvgPoint[], height: number): TSvgPoint[] {
        const boundaryY = height / 2;
        const clipped: TSvgPoint[] = [];
        for (let index = 0; index < points.length; index++) {
            const start = points[index];
            const end = points[(index + 1) % points.length];
            const startInside = start.y >= boundaryY;
            const endInside = end.y >= boundaryY;
            const intersection = (): TSvgPoint => {
                const ratio = (boundaryY - start.y) / (end.y - start.y);
                return {x: start.x + (end.x - start.x) * ratio, y: boundaryY};
            };

            if (startInside && endInside) {
                clipped.push(end);
            } else if (startInside && !endInside) {
                clipped.push(intersection());
            } else if (!startInside && endInside) {
                clipped.push(intersection(), end);
            }
        }

        const unique = clipped.filter((point, index) => {
            const previous = clipped[index - 1];
            return !previous || Math.abs(point.x - previous.x) > 0.001 || Math.abs(point.y - previous.y) > 0.001;
        });
        if (unique.length > 1) {
            const first = unique[0];
            const last = unique[unique.length - 1];
            if (Math.abs(first.x - last.x) <= 0.001 && Math.abs(first.y - last.y) <= 0.001) unique.pop();
        }
        return unique;
    }
}
