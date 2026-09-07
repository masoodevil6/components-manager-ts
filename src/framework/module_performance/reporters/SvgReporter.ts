import { PerformanceRegistry } from "../core/PerformanceRegistry";
import type { PerfReport, ScalingReport } from "../core/types";
import * as fs from "fs";
import * as path from "path";

/**
 * reportToSvg — تولید فایل SVG از نتایج PerformanceRegistry
 *
 * خروجی: یک فایل SVG با خطوط افقی برای median/p95/min/max هر target
 * + جدول metrics + وضعیت regression + (اختیاری) نمودار scaling
 */
export function reportToSvg(outputPath?: string, scalingReports?: ScalingReport[]): string {
    const reports = PerformanceRegistry.query();
    if (reports.length === 0 && (!scalingReports || scalingReports.length === 0)) return "";

    const filePath = outputPath ?? path.resolve(process.cwd(), "perf-report.svg");
    const svg = generateSvg(reports, scalingReports ?? []);
    fs.writeFileSync(filePath, svg, "utf-8");
    console.log(`\n📊 SVG report saved to: ${filePath}\n`);
    return filePath;
}

// ─────────────────────────────────────────────────────────────

const W         = 1300;
const PAD       = 40;
const LABEL_W   = 360;       // فضای نام target + لیبل metric
const CHART_X   = PAD + LABEL_W;
const VALUE_W   = 90;        // فضای عدد در سمت راست
const RATING_W  = 140;       // فضای پروگرس ریتیگ در سمت راست
const CHART_W   = W - CHART_X - PAD - VALUE_W - RATING_W;
const LINE_GAP  = 22;        // فاصله بین خطوط median/p95/max/min
const ROW_GAP   = 16;        // فاصله بین targetها

// ─── Rating scale (based on median ms) ─────────────────────

interface Rating {
    level: number;       // 0-4 (4 = excellent)
    label: string;
    color: string;
}

const RATINGS: Rating[] = [
    { level: 0, label: "very bad",  color: "#e85d75" },   // > 50ms
    { level: 1, label: "bad",       color: "#e8a838" },   // 5-50ms
    { level: 2, label: "good",      color: "#e8d838" },   // 1-5ms
    { level: 3, label: "very good", color: "#7ee87a" },   // 0.5-1ms
    { level: 4, label: "excellent", color: "#4ecca3" },   // < 0.5ms
];

function getRating(medianMs: number): Rating {
    if (medianMs < 0.5)  return RATINGS[4];
    if (medianMs < 1)    return RATINGS[3];
    if (medianMs < 5)    return RATINGS[2];
    if (medianMs < 50)   return RATINGS[1];
    return RATINGS[0];
}

function generateSvg(reports: PerfReport[], scalingReports: ScalingReport[]): string {
    const allValues = reports.flatMap(r => [r.benchmark.median, r.benchmark.p95, r.benchmark.max]);
    const maxVal = Math.max(...allValues, 1);
    const scale = CHART_W / maxVal;

    const pageReports = reports.filter(r => !r.target.includes("/"));
    const compReports = reports.filter(r => r.target.includes("/"));

    const sections: string[] = [];
    sections.push(drawHeader(reports.length));

    let y = 110;

    if (pageReports.length > 0) {
        sections.push(drawSectionTitle("Pages", y));
        y += 36;
        for (const r of pageReports) {
            const rowH = drawReportRow(r, y, scale);
            sections.push(rowH.svg);
            y = rowH.nextY + ROW_GAP;
        }
    }

    if (compReports.length > 0) {
        sections.push(drawSectionTitle("Components", y));
        y += 36;
        for (const r of compReports) {
            const rowH = drawReportRow(r, y, scale);
            sections.push(rowH.svg);
            y = rowH.nextY + ROW_GAP;
        }
    }

    if (scalingReports.length > 0) {
        sections.push(drawSectionTitle("Heavy SVG Creation Scaling", y));
        y += 36;
        const scalingH = drawScalingChart(scalingReports, y);
        sections.push(scalingH.svg);
        y = scalingH.nextY + 10;
        const summaryH = drawScalingSummary(scalingReports, y);
        sections.push(summaryH.svg);
        y = summaryH.nextY + ROW_GAP;
    }

    const totalH = y + 10;
    const gridLines = reports.length > 0 ? drawGridLines(scale, totalH) : "";

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${totalH}" font-family="monospace" style="background:#1a1a2e">
${gridLines}
${sections.join("\n")}
</svg>`;
}

function drawHeader(count: number): string {
    const now = new Date().toISOString().replace("T", " ").slice(0, 19);
    return `  <text x="${PAD}" y="35" fill="#e0e0e0" font-size="20" font-weight="bold">Performance Report</text>
  <text x="${PAD}" y="58" fill="#888" font-size="12">${now} — ${count} targets</text>
  <line x1="${PAD}" y1="75" x2="${W - PAD}" y2="75" stroke="#333" stroke-width="1"/>`;
}

function drawSectionTitle(title: string, y: number): string {
    return `  <text x="${PAD}" y="${y}" fill="#7ec8e3" font-size="16" font-weight="bold">${title}</text>
  <line x1="${PAD}" y1="${y + 8}" x2="${W - PAD}" y2="${y + 8}" stroke="#333" stroke-width="1"/>`;
}

function drawReportRow(r: PerfReport, y: number, scale: number): { svg: string; nextY: number } {
    const { benchmark: b, metrics, regression } = r;
    const parts: string[] = [];

    // Target name — در فضای لیبل، بالای خطوط
    parts.push(`  <text x="${PAD}" y="${y + 14}" fill="#e0e0e0" font-size="13" font-weight="bold">${escapeXml(r.target)}</text>`);

    // 4 خط افقی: median, p95, max, min
    const lines = [
        { label: "median", val: b.median, color: "#4ecca3" },
        { label: "p95",    val: b.p95,    color: "#e8a838" },
        { label: "max",    val: b.max,    color: "#e85d75" },
        { label: "min",    val: b.min,    color: "#6ba3e8" },
    ];

    let lineY = y + 26;
    for (const ln of lines) {
        const xEnd = CHART_X + Math.max(ln.val * scale, 3);

        // لیبل metric در سمت چپ، right-aligned قبل از شروع نمودار
        parts.push(`  <text x="${CHART_X - 8}" y="${lineY + 4}" fill="#888" font-size="10" text-anchor="end">${ln.label}</text>`);

        // خط افقی از محور به مقدار
        parts.push(`  <line x1="${CHART_X}" y1="${lineY}" x2="${xEnd}" y2="${lineY}" stroke="${ln.color}" stroke-width="2.5" opacity="0.9"/>`);

        // نقطه (دایره) در انتهای خط
        parts.push(`  <circle cx="${xEnd}" cy="${lineY}" r="4" fill="${ln.color}"/>`);

        // عدد در سمت راست خط
        parts.push(`  <text x="${xEnd + 8}" y="${lineY + 4}" fill="${ln.color}" font-size="11">${ln.val.toFixed(2)} ms</text>`);

        lineY += LINE_GAP;
    }

    // Metrics line — زیر خطوط، با فاصله
    const my = lineY + 6;
    const metricParts: string[] = [];
    for (const m of metrics) {
        if (m.status === "measured" && m.value !== undefined) {
            const valStr = m.unit === "MB" && m.value >= 0 ? `+${m.value.toFixed(2)}` : m.value.toFixed(2);
            metricParts.push(`${m.name}: ${valStr} ${m.unit}`);
        } else {
            metricParts.push(`${m.name}: ${m.status}`);
        }
    }
    if (metricParts.length > 0) {
        parts.push(`  <text x="${CHART_X}" y="${my}" fill="#666" font-size="10">${escapeXml(metricParts.join("  |  "))}</text>`);
    }

    // Rating progress bar — سمت راست، هم‌تراز با خطوط نمودار
    const rating    = getRating(b.median);
    const ratingX   = W - PAD - RATING_W + 10;
    const ratingY   = y + 26;       // هم‌تراز با خط median
    const segW      = 22;           // عرض هر сегمنت
    const segH      = 14;           // ارتفاع هر сегمنت
    const segGap    = 3;            // فاصله بین сегمنت‌ها

    for (let i = 0; i < 5; i++) {
        const sx = ratingX + i * (segW + segGap);
        const filled = i <= rating.level;
        const fill   = filled ? rating.color : "#2a2a3e";
        const opacity = filled ? 0.85 : 0.5;
        parts.push(`  <rect x="${sx}" y="${ratingY}" width="${segW}" height="${segH}" fill="${fill}" rx="2" opacity="${opacity}"/>`);
    }

    // لیبل ریتیگ زیر پروگرس
    parts.push(`  <text x="${ratingX}" y="${ratingY + segH + 14}" fill="${rating.color}" font-size="11" font-weight="bold">${rating.label}</text>`);

    // Regression info — زیر لیبل ریتیگ
    if (regression) {
        const regColor = regression.status === "PASS" ? "#4ecca3" : "#e85d75";
        const regText  = `${regression.status} ${regression.changePercent >= 0 ? "+" : ""}${regression.changePercent.toFixed(1)}%`;
        parts.push(`  <text x="${ratingX}" y="${ratingY + segH + 30}" fill="${regColor}" font-size="10">${regText}</text>`);
        parts.push(`  <text x="${ratingX}" y="${ratingY + segH + 44}" fill="#555" font-size="9">baseline: ${regression.baselineMs.toFixed(2)}ms</text>`);
    } else {
        parts.push(`  <text x="${ratingX}" y="${ratingY + segH + 30}" fill="#555" font-size="10">no baseline</text>`);
    }

    return { svg: parts.join("\n"), nextY: my + 4 };
}

function drawGridLines(scale: number, totalH: number): string {
    const lines: string[] = [];
    const step = niceStep(100 / scale);
    for (let v = 0; v <= 100 / scale + step; v += step) {
        const x = CHART_X + v * scale;
        if (x > W - PAD - VALUE_W - RATING_W) break;
        lines.push(`  <line x1="${x}" y1="80" x2="${x}" y2="${totalH - 10}" stroke="#252535" stroke-width="1"/>`);
        lines.push(`  <text x="${x + 3}" y="${totalH - 2}" fill="#555" font-size="10">${v.toFixed(0)}ms</text>`);
    }
    // محور عمودی (خط صفر)
    lines.push(`  <line x1="${CHART_X}" y1="80" x2="${CHART_X}" y2="${totalH - 10}" stroke="#444" stroke-width="1.5"/>`);
    return lines.join("\n");
}

function niceStep(raw: number): number {
    const pow = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / pow;
    if (n < 1.5) return pow;
    if (n < 3) return 2 * pow;
    if (n < 7) return 5 * pow;
    return 10 * pow;
}

// ─── Scaling Chart ────────────────────────────────────────

const SCALING_CHART_H = 200;
const SCALING_CHART_W = W - 2 * PAD;
const SCALING_CHART_X = PAD;

const SCALING_COLORS = {
    p95:    "#e8a838",
    max:    "#e85d75",
    median: "#4ecca3",
};

interface SeriesStyle {
    label:   string;
    metric:  "median" | "p95" | "max";
    color:   string;
    width:   number;
}

const SERIES_STYLES: SeriesStyle[] = [
    { label: "p95",    metric: "p95",    color: SCALING_COLORS.p95,    width: 2.5 },
    { label: "max",    metric: "max",    color: SCALING_COLORS.max,    width: 2   },
    { label: "median", metric: "median", color: SCALING_COLORS.median, width: 2   },
];

function drawScalingChart(reports: ScalingReport[], y: number): { svg: string; nextY: number } {
    const parts: string[] = [];

    const allCounts = reports.flatMap(r => r.series.map(p => p.count));
    const maxCount  = Math.max(...allCounts, 1);

    const allTimes = reports.flatMap(r =>
        r.series.flatMap(p => [p.benchmark.median, p.benchmark.p95, p.benchmark.max])
    );
    const maxTime = Math.max(...allTimes, 1) * 1.1;

    const chartTop = y + 10;
    const chartBottom = chartTop + SCALING_CHART_H;
    const chartLeft = SCALING_CHART_X + 50;
    const chartRight = SCALING_CHART_X + SCALING_CHART_W;
    const chartW = chartRight - chartLeft;

    const xScale = (count: number) => chartLeft + (count / maxCount) * chartW;
    const yScale = (time: number)  => chartTop + SCALING_CHART_H - (time / maxTime) * SCALING_CHART_H;

    // Y-axis grid lines + labels
    const yStep = niceStep(maxTime / 5);
    for (let v = 0; v <= maxTime; v += yStep) {
        const gy = yScale(v);
        parts.push(`  <line x1="${chartLeft}" y1="${gy}" x2="${chartRight}" y2="${gy}" stroke="#252535" stroke-width="1"/>`);
        parts.push(`  <text x="${chartLeft - 8}" y="${gy + 4}" fill="#555" font-size="10" text-anchor="end">${v.toFixed(0)}ms</text>`);
    }

    // X-axis labels
    const xStep = niceStep(maxCount / 5);
    for (let v = 0; v <= maxCount; v += xStep) {
        const gx = xScale(v);
        parts.push(`  <line x1="${gx}" y1="${chartTop}" x2="${gx}" y2="${chartBottom}" stroke="#252535" stroke-width="1"/>`);
        parts.push(`  <text x="${gx}" y="${chartBottom + 16}" fill="#555" font-size="10" text-anchor="middle">${v}</text>`);
    }

    // Axis lines
    parts.push(`  <line x1="${chartLeft}" y1="${chartTop}" x2="${chartLeft}" y2="${chartBottom}" stroke="#444" stroke-width="1.5"/>`);
    parts.push(`  <line x1="${chartLeft}" y1="${chartBottom}" x2="${chartRight}" y2="${chartBottom}" stroke="#444" stroke-width="1.5"/>`);

    // Axis titles
    parts.push(`  <text x="${chartLeft - 35}" y="${(chartTop + chartBottom) / 2}" fill="#888" font-size="11" text-anchor="middle" transform="rotate(-90 ${chartLeft - 35} ${(chartTop + chartBottom) / 2})">time (ms)</text>`);
    parts.push(`  <text x="${(chartLeft + chartRight) / 2}" y="${chartBottom + 32}" fill="#888" font-size="11" text-anchor="middle">count (SVG)</text>`);

    // Draw series for each report
    for (const report of reports) {
        const scenarioLabel = report.target.includes("unique") ? "A (Unique)" : "B (Repeated)";

        for (const style of SERIES_STYLES) {
            const points = report.series.map(p => ({
                x: xScale(p.count),
                y: yScale(p.benchmark[style.metric]),
                count: p.count,
                val:   p.benchmark[style.metric],
            }));

            // Polyline
            const pts = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
            parts.push(`  <polyline points="${pts}" fill="none" stroke="${style.color}" stroke-width="${style.width}" opacity="0.9"/>`);

            // Circles on each point
            for (const p of points) {
                parts.push(`  <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3" fill="${style.color}"/>`);
            }

            // Label on last point only (endpoint) — clamp inside chart
            const last = points[points.length - 1];
            if (last && last.count > 0) {
                const labelText = `${scenarioLabel} ${style.label}=${last.val.toFixed(1)}`;
                const labelW   = labelText.length * 4.5;
                const labelX   = Math.min(last.x + 8, chartRight - labelW);
                parts.push(`  <text x="${labelX}" y="${last.y + 3}" fill="${style.color}" font-size="9">${labelText}</text>`);
            }
        }
    }

    // Legend
    let legendX = chartLeft + 10;
    const legendY = chartTop - 6;
    for (const style of SERIES_STYLES) {
        parts.push(`  <line x1="${legendX}" y1="${legendY}" x2="${legendX + 20}" y2="${legendY}" stroke="${style.color}" stroke-width="${style.width}"/>`);
        parts.push(`  <text x="${legendX + 26}" y="${legendY + 4}" fill="#888" font-size="10">${style.label}</text>`);
        legendX += 80;
    }

    return { svg: parts.join("\n"), nextY: chartBottom + 40 };
}

function drawScalingSummary(reports: ScalingReport[], y: number): { svg: string; nextY: number } {
    const parts: string[] = [];
    let cy = y;

    const RATING_X    = W - PAD - RATING_W + 10;
    const SEG_W       = 22;
    const SEG_H       = 14;
    const SEG_GAP     = 3;

    for (const report of reports) {
        const scenarioLabel = report.target.includes("unique") ? "A (Unique)" : "B (Repeated)";
        const p95Slope = report.slopes.find(s => s.metric === "p95");
        const maxSlope = report.slopes.find(s => s.metric === "max");

        // p95@maxCount — worst-case scalability rating
        const lastPoint = report.series[report.series.length - 1];
        const p95AtMax  = lastPoint ? lastPoint.benchmark.p95 : 0;
        const rating    = getRating(p95AtMax);

        // Slope text lines
        if (p95Slope) {
            parts.push(`  <text x="${PAD}" y="${cy}" fill="#e8a838" font-size="11">${scenarioLabel}: p95 slope=${p95Slope.slope.toFixed(4)} ms/SVG, R²=${p95Slope.rSquared.toFixed(3)}</text>`);
            cy += 16;
        }
        if (maxSlope) {
            parts.push(`  <text x="${PAD}" y="${cy}" fill="#e85d75" font-size="11">${scenarioLabel}: max slope=${maxSlope.slope.toFixed(4)} ms/SVG, R²=${maxSlope.rSquared.toFixed(3)}</text>`);
            cy += 16;
        }

        // p95@max value
        parts.push(`  <text x="${PAD}" y="${cy}" fill="#888" font-size="11">${scenarioLabel}: p95@${lastPoint?.count ?? 0} = ${p95AtMax.toFixed(2)} ms</text>`);

        // Rating progress bar — same style as Pages/Components
        const ratingY = cy - 12;
        for (let i = 0; i < 5; i++) {
            const sx = RATING_X + i * (SEG_W + SEG_GAP);
            const filled  = i <= rating.level;
            const fill    = filled ? rating.color : "#2a2a3e";
            const opacity = filled ? 0.85 : 0.5;
            parts.push(`  <rect x="${sx}" y="${ratingY}" width="${SEG_W}" height="${SEG_H}" fill="${fill}" rx="2" opacity="${opacity}"/>`);
        }
        parts.push(`  <text x="${RATING_X}" y="${ratingY + SEG_H + 14}" fill="${rating.color}" font-size="11" font-weight="bold">${rating.label}</text>`);

        cy += 20;
    }

    return { svg: parts.join("\n"), nextY: cy };
}

function escapeXml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
