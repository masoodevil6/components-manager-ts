export type MetricBand = {id: string; label: string; from: number; to: number; color?: string};
export type GaugeModel = {kind: "unavailable" | "unconfigured" | "invalid" | "ready"; value: number | null; position: number | null; outside: boolean; band: MetricBand | null; bands: MetricBand[]};

export function calculateGauge(value: number | null, min: number | null, max: number | null, bands: MetricBand[]): GaugeModel {
    const base: GaugeModel = {kind: "unavailable", value: Number.isFinite(value) && value !== null ? value : null, position: null, outside: false, band: null, bands: []};
    if (base.value === null) return base;
    if (min === null && max === null && Array.isArray(bands) && bands.length === 0) return {...base, kind: "unconfigured"};
    if (typeof min !== "number" || typeof max !== "number" || !Number.isFinite(min) || !Number.isFinite(max) || min >= max || !Array.isArray(bands)) return {...base, kind: "invalid"};
    const ids = new Set<string>();
    let previousEnd = min;
    for (const band of bands) {
        if (!band || typeof band.id !== "string" || !band.id.trim() || ids.has(band.id) || typeof band.label !== "string" || !band.label.trim() || !Number.isFinite(band.from) || !Number.isFinite(band.to) || band.from < min || band.to > max || band.from >= band.to || band.from < previousEnd) return {...base, kind: "invalid"};
        ids.add(band.id);
        previousEnd = band.to;
    }
    const v = base.value;
    const match = bands.find((band, i) => v >= band.from && (v < band.to || (i === bands.length - 1 && v === band.to))) ?? null;
    return {...base, kind: "ready", position: Math.max(0, Math.min(1, (v - min) / (max - min))), outside: v < min || v > max, band: match, bands};
}
