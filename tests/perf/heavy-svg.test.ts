import { describe, it, expect, beforeAll } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreReactive from "@/core_reactive";
import { benchmarkScaling, type ScalingReport } from "@/performance";
import { IconVariant, type IIconDefinition } from "@/ui_icons";
import { saveScalingChunk } from "./reportCollector";

// ─── Heavy Score — primitiveهای واقعی SVG ─────────────────

const SVG_PRIMITIVE_TAGS = new Set([
    "path", "line", "circle", "ellipse", "rect", "polygon",
    "polyline", "text", "g",
]);

function heavyScore(definition: IIconDefinition): number {
    const result = definition.render({
        sizeName: "md",
        primaryColor: "#000",
        secondaryColor: "#000",
        strokeWidth: 2,
        variant: IconVariant.DEFAULT,
    } as any);

    if (!Array.isArray(result)) return 0;

    return result.reduce((sum, el) => {
        const tag = (el as any)?.tagName ?? "";
        return sum + (SVG_PRIMITIVE_TAGS.has(tag) ? 1 : 0);
    }, 0);
}

// ─── Selection — deterministic با tie-breaker ──────────────

function selectHeavyDefinitions(): { def: IIconDefinition; name: string; score: number }[] {
    const all = Object.entries(UiIcons.Src).map(([name, item]) => ({
        name,
        def: (item as any).Definition as IIconDefinition,
    }));

    const scored = all.map(({ name, def }) => ({ name, def, score: heavyScore(def) }));

    const sorted = scored.sort((a, b) =>
        b.score - a.score ||
        a.name.localeCompare(b.name)
    );

    return sorted.slice(0, K).map(({ name, def, score }) => ({ def, name, score }));
}

// ─── Parameters ───────────────────────────────────────────

const K = 100;
const COUNTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const WARMUP = 3;
const ITERATIONS = 20;

let heavy: { def: IIconDefinition; name: string; score: number }[];

// ─── Render factories ─────────────────────────────────────

function heavySvgRenderFactoryUnique(heavy: { def: IIconDefinition; name: string; score: number }[]) {
    return (count: number) => () => {
        const children: any[] = [];
        for (let i = 0; i < count; i++) {
            children.push(UiIcons.CreateIcon(heavy[i % heavy.length].def));
        }
        CoreReactive.App.div({ className: ["row"], children });
    };
}

function heavySvgRenderFactoryRepeated(heavy: { def: IIconDefinition; name: string; score: number }[]) {
    // Use median-complexity definition for fair comparison with Unique cycle
    const same = heavy[Math.floor(heavy.length / 2)].def;
    return (count: number) => () => {
        const children: any[] = [];
        for (let i = 0; i < count; i++) {
            children.push(UiIcons.CreateIcon(same));
        }
        CoreReactive.App.div({ className: ["row"], children });
    };
}

// ─── Log helper ───────────────────────────────────────────

function logScalingReport(report: ScalingReport): void {
    console.log(`\n=== ${report.target} ===`);
    console.log("count | median  | p95     | max     | min");
    console.log("------|---------|---------|---------|---------");
    for (const p of report.series) {
        console.log(
            `${String(p.count).padStart(5)} | ` +
            `${p.benchmark.median.toFixed(2).padStart(7)} | ` +
            `${p.benchmark.p95.toFixed(2).padStart(7)} | ` +
            `${p.benchmark.max.toFixed(2).padStart(7)} | ` +
            `${p.benchmark.min.toFixed(2).padStart(7)}`
        );
    }
    console.log("\nSlopes (linear regression):");
    for (const s of report.slopes) {
        console.log(
            `  ${s.metric.padEnd(6)}: slope=${s.slope.toFixed(4)} ms/SVG | ` +
            `intercept=${s.intercept.toFixed(2)}ms | R²=${s.rSquared.toFixed(3)}`
        );
    }
}

// ─── Tests ────────────────────────────────────────────────

describe("Heavy SVG Creation Scaling", () => {

    beforeAll(() => {
        heavy = selectHeavyDefinitions();
    });

    it("Heavy SVG selection — deterministic", () => {
        expect(heavy.length).toBe(K);
        expect(heavy[0].score).toBeGreaterThan(0);

        const scores = heavy.map(h => h.score);
        for (let i = 1; i < scores.length; i++) {
            expect(scores[i - 1]).toBeGreaterThanOrEqual(scores[i]);
        }

        const names = heavy.map(h => h.name);
        const uniqueNames = new Set(names);
        expect(uniqueNames.size).toBe(names.length);

        const reRun = selectHeavyDefinitions();
        expect(reRun.map(d => d.name)).toEqual(names);

        const medianScore = heavy[Math.floor(heavy.length / 2)].score;
        const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
        console.log("\nSelection statistics:");
        console.log(`  K=${K}, heaviest score=${scores[0]}, median score=${medianScore}, avg score=${avgScore}`);
        console.log(`  Repeated scenario uses: ${heavy[Math.floor(heavy.length / 2)].name} (score=${medianScore})`);
        console.log("\nTop 10 heavy definitions (by primitive count):");
        for (let i = 0; i < Math.min(10, heavy.length); i++) {
            console.log(`  ${heavy[i].name.padEnd(30)} score=${scores[i]}`);
        }
    });

    it("Scenario A (Unique) — 0 to 100 heavy SVGs", () => {
        const report = benchmarkScaling(
            "heavy-svg-unique",
            COUNTS,
            heavySvgRenderFactoryUnique(heavy),
            { warmup: WARMUP, iterations: ITERATIONS },
        );

        logScalingReport(report);
        saveScalingChunk(report);

        for (const p of report.series) {
            expect(p.benchmark.median).toBeGreaterThanOrEqual(0);
        }
    });

    it("Scenario B (Repeated) — 0 to 100 heavy SVGs", () => {
        const report = benchmarkScaling(
            "heavy-svg-repeated",
            COUNTS,
            heavySvgRenderFactoryRepeated(heavy),
            { warmup: WARMUP, iterations: ITERATIONS },
        );

        logScalingReport(report);
        saveScalingChunk(report);

        for (const p of report.series) {
            expect(p.benchmark.median).toBeGreaterThanOrEqual(0);
        }
    });
});
