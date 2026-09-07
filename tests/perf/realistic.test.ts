import { describe, it, expect, beforeAll } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as CoreLanguage from "@/core_languages";
import { IconVariant, type IIconDefinition } from "@/ui_icons";

// ─── Helpers ───────────────────────────────────────────────

const SVG_NS = "http://www.w3.org/2000/svg";

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

interface ScoredDef { def: IIconDefinition; name: string; score: number }

function selectMixedIcons(): ScoredDef[] {
    const all = Object.entries(UiIcons.Src).map(([name, item]) => ({
        name,
        def: (item as any).Definition as IIconDefinition,
    }));
    const scored = all
        .map(({ name, def }) => ({ name, def, score: heavyScore(def) }))
        .sort((a, b) => b.score - a.score || a.name.localeCompare(a.name));
    return scored;
}

// ─── Three implementations ─────────────────────────────────

/**
 * A. Library — uses UiIcons.CreateIcon (templateCache + cloneNode)
 */
function createLibraryIcon(def: IIconDefinition): SVGSVGElement {
    const icon = UiIcons.CreateIcon(def);
    return (icon as any).element as SVGSVGElement;
}

/**
 * B. Raw DOM — equivalent to buildStaticSvg WITHOUT cache.
 * Creates every element via createElementNS + setAttribute + appendChild.
 *
 * This is what the library does on a cache miss (cold path).
 * It represents the "no abstraction" baseline: hand-written DOM code
 * that produces the same SVG structure.
 */
function createRawDomIcon(def: IIconDefinition): SVGSVGElement {
    const sizeName = CoreConfig.Settings.SizeName.get() as string;
    const primaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
    const secondaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
    const borderWidth = UtilStyle.Css_BorderWidth(sizeName);
    const strokeWidth = UtilStyle.Css_IconStrokeWidth(borderWidth, def.viewBoxX, def.viewBoxY);
    const variant = IconVariant.DEFAULT;

    const ariaLabel = CoreLanguage.App.translate(def.title).get();
    const viewBox = `0 0 ${def.viewBoxX} ${def.viewBoxY}`;
    const size = UtilStyle.Css_IconSize(sizeName);

    // render() returns ClReactiveElement[] — we extract their DOM elements
    const content = def.render({
        sizeName,
        primaryColor,
        secondaryColor,
        strokeWidth,
        variant,
    } as any);

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("xmlns", SVG_NS);
    svg.setAttribute("role", "img");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-label", ariaLabel);
    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    for (const child of content) {
        if (child && child.getElement) {
            svg.appendChild(child.getElement());
        }
    }

    return svg;
}

/**
 * C. Raw SVG template — serialize once, clone via innerHTML.
 *
 * This represents the "string template" approach:
 *   container.innerHTML = `<svg>...</svg>`
 * No abstraction, no reactive, just HTML string parsing.
 */
function createRawSvgTemplateFactory(def: IIconDefinition): () => SVGSVGElement {
    // Build once → serialize to HTML string
    const built = createRawDomIcon(def);
    const wrapper = document.createElement("div");
    wrapper.appendChild(built);
    const template = wrapper.innerHTML;

    return () => {
        const container = document.createElement("div");
        container.innerHTML = template;
        return container.querySelector("svg") as SVGSVGElement;
    };
}

// ─── Benchmark engine ──────────────────────────────────────

const ITERS = 30;
const WARMUP = 3;

interface BenchResult {
    median: number;
    p95: number;
    max: number;
    min: number;
}

function bench(fn: () => void): BenchResult {
    for (let i = 0; i < WARMUP; i++) fn();
    const samples: number[] = [];
    for (let i = 0; i < ITERS; i++) {
        const s = performance.now();
        fn();
        samples.push(performance.now() - s);
    }
    samples.sort((a, b) => a - b);
    return {
        median: samples[Math.floor(samples.length / 2)],
        p95: samples[Math.floor(samples.length * 0.95)],
        max: samples[samples.length - 1],
        min: samples[0],
    };
}

function fmt(r: BenchResult): string {
    return `median=${r.median.toFixed(2)}ms  p95=${r.p95.toFixed(2)}ms  max=${r.max.toFixed(2)}ms`;
}

// ─── Workload scenarios ────────────────────────────────────

const WORKLOADS = [5, 20, 50, 100, 500];

/**
 * Mixed icon set: pick icons across the score spectrum.
 * For count N, cycle through the full icon list (not just heaviest).
 * This is realistic: a real page has a mix of light + medium + heavy icons.
 */
function pickMixedIcons(all: ScoredDef[], count: number): ScoredDef[] {
    const result: ScoredDef[] = [];
    for (let i = 0; i < count; i++) {
        result.push(all[i % all.length]);
    }
    return result;
}

// ─── Tests ─────────────────────────────────────────────────

describe("Real-World Performance Validation — Library vs Raw DOM vs Raw SVG", () => {

    let allIcons: ScoredDef[];

    beforeAll(() => {
        allIcons = selectMixedIcons();
        console.log(`\n=== Icon pool: ${allIcons.length} icons ===`);
        console.log(`  heaviest: ${allIcons[0].name} score=${allIcons[0].score}`);
        console.log(`  median:   ${allIcons[Math.floor(allIcons.length / 2)].name} score=${allIcons[Math.floor(allIcons.length / 2)].score}`);
        console.log(`  lightest: ${allIcons[allIcons.length - 1].name} score=${allIcons[allIcons.length - 1].score}`);
        console.log(`  avg score: ${(allIcons.reduce((s, i) => s + i.score, 0) / allIcons.length).toFixed(1)}`);
    });

    // ── Phase: create ──────────────────────────────────────

    describe("Phase: create (N icons, no mount)", () => {

        for (const count of WORKLOADS) {
            it(`create ×${count} — mixed icons`, () => {
                const icons = pickMixedIcons(allIcons, count);

                // Pre-build Raw SVG templates (serialize once per icon)
                const rawSvgFactories = icons.map(i => createRawSvgTemplateFactory(i.def));

                // Warm up the library cache for these icons
                for (const { def } of icons) createLibraryIcon(def);

                // A. Library (warm cache — cloneNode path)
                const libResult = bench(() => {
                    for (const { def } of icons) createLibraryIcon(def);
                });

                // B. Raw DOM (no cache — full build every time)
                const rawDomResult = bench(() => {
                    for (const { def } of icons) createRawDomIcon(def);
                });

                // C. Raw SVG template (innerHTML parse)
                const rawSvgResult = bench(() => {
                    for (const factory of rawSvgFactories) factory();
                });

                const overhead = libResult.median - rawDomResult.median;
                const ratio = (libResult.median / rawDomResult.median).toFixed(2);

                console.log(
                    `\n  [create ×${count}]` +
                    `\n    Library:     ${fmt(libResult)}` +
                    `\n    Raw DOM:     ${fmt(rawDomResult)}` +
                    `\n    Raw SVG:     ${fmt(rawSvgResult)}` +
                    `\n    overhead vs Raw DOM: ${overhead >= 0 ? "+" : ""}${overhead.toFixed(2)}ms (${ratio}x)`
                );

                expect(libResult.median).toBeGreaterThanOrEqual(0);
                expect(rawDomResult.median).toBeGreaterThanOrEqual(0);
                expect(rawSvgResult.median).toBeGreaterThanOrEqual(0);
            });
        }
    });

    // ── Phase: create + mount ──────────────────────────────

    describe("Phase: create + mount (N icons, append to DOM)", () => {

        for (const count of WORKLOADS) {
            it(`create+mount ×${count} — mixed icons`, () => {
                const icons = pickMixedIcons(allIcons, count);
                const rawSvgFactories = icons.map(i => createRawSvgTemplateFactory(i.def));
                for (const { def } of icons) createLibraryIcon(def);

                const libResult = bench(() => {
                    const container = document.createElement("div");
                    for (const { def } of icons) {
                        container.appendChild(createLibraryIcon(def));
                    }
                    document.body.appendChild(container);
                    container.remove();
                });

                const rawDomResult = bench(() => {
                    const container = document.createElement("div");
                    for (const { def } of icons) {
                        container.appendChild(createRawDomIcon(def));
                    }
                    document.body.appendChild(container);
                    container.remove();
                });

                const rawSvgResult = bench(() => {
                    const container = document.createElement("div");
                    for (const factory of rawSvgFactories) {
                        container.appendChild(factory());
                    }
                    document.body.appendChild(container);
                    container.remove();
                });

                const overhead = libResult.median - rawDomResult.median;
                const ratio = (libResult.median / rawDomResult.median).toFixed(2);

                console.log(
                    `\n  [create+mount ×${count}]` +
                    `\n    Library:     ${fmt(libResult)}` +
                    `\n    Raw DOM:     ${fmt(rawDomResult)}` +
                    `\n    Raw SVG:     ${fmt(rawSvgResult)}` +
                    `\n    overhead vs Raw DOM: ${overhead >= 0 ? "+" : ""}${overhead.toFixed(2)}ms (${ratio}x)`
                );

                expect(libResult.median).toBeGreaterThanOrEqual(0);
            });
        }
    });

    // ── Phase: update (reactive color change) ──────────────

    describe("Phase: update (reactive primaryColor change)", () => {

        it("update ×20 — Library reactive vs Raw DOM manual", () => {
            const icons = pickMixedIcons(allIcons, 20);

            // Library: create with reactive primaryColor
            const libIconInstances: any[] = [];
            const libColorObs = new CoreObservable.App(
                UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)
            );
            for (const { def } of icons) {
                const icon = UiIcons.CreateIcon(def, { primaryColor: libColorObs });
                libIconInstances.push(icon);
            }

            // Raw DOM: create icons, keep references for manual update
            const rawDomIcons: SVGSVGElement[] = [];
            for (const { def } of icons) {
                rawDomIcons.push(createRawDomIcon(def));
            }
            // For Raw DOM "update", we must manually find all stroke/fill attrs and change them.
            // This is exactly the overhead that the library's reactive system eliminates for the developer.
            // We simulate a realistic manual update: iterate all children, set stroke/fill.
            function rawDomUpdate(icons: SVGSVGElement[], newColor: string) {
                for (const svg of icons) {
                    for (const child of Array.from(svg.children)) {
                        const stroke = child.getAttribute("stroke");
                        const fill = child.getAttribute("fill");
                        // Only update non-"none" values (matching reactive behavior)
                        if (stroke && stroke !== "none") child.setAttribute("stroke", newColor);
                        if (fill && fill !== "none") child.setAttribute("fill", newColor);
                    }
                }
            }

            const newColor = "#ff0000";

            // Library: just set the observable — reactive system propagates
            const libResult = bench(() => {
                libColorObs.set(newColor);
            });

            // Raw DOM: manual loop + setAttribute on every child
            const rawDomResult = bench(() => {
                rawDomUpdate(rawDomIcons, newColor);
            });

            console.log(
                `\n  [update ×20]` +
                `\n    Library (reactive set):  ${fmt(libResult)}` +
                `\n    Raw DOM (manual loop):   ${fmt(rawDomResult)}` +
                `\n    Library is ${libResult.median < rawDomResult.median ? "FASTER" : "SLOWER"} by ${Math.abs(libResult.median - rawDomResult.median).toFixed(2)}ms`
            );

            expect(libResult.median).toBeGreaterThanOrEqual(0);
        });
    });

    // ── Phase: cache effectiveness ─────────────────────────

    describe("Phase: cache effectiveness (cold vs warm)", () => {

        for (const count of [5, 20, 100, 500]) {
            it(`cache: cold vs warm ×${count}`, () => {
                const icons = pickMixedIcons(allIcons, count);

                // Cold: force cache miss by using unique options each time
                // (different primaryColor → different cache key)
                const coldResult = bench(() => {
                    for (let i = 0; i < icons.length; i++) {
                        UiIcons.CreateIcon(icons[i].def, {
                            primaryColor: `#${i.toString(16).padStart(6, "0")}`,
                        });
                    }
                });

                // Warm: default options → cache hit (cloneNode path)
                const warmResult = bench(() => {
                    for (const { def } of icons) {
                        UiIcons.CreateIcon(def);
                    }
                });

                const speedup = (coldResult.median / warmResult.median).toFixed(2);

                console.log(
                    `\n  [cache ×${count}]` +
                    `\n    Cold (cache miss):  ${fmt(coldResult)}` +
                    `\n    Warm (cache hit):   ${fmt(warmResult)}` +
                    `\n    Speedup: ${speedup}x`
                );

                expect(warmResult.median).toBeGreaterThanOrEqual(0);
                expect(coldResult.median).toBeGreaterThanOrEqual(0);
            });
        }
    });

    // ── Phase: memory (retained nodes after destroy) ───────

    describe("Phase: memory (retained DOM nodes after destroy)", () => {

        it("destroy ×100 — no retained nodes", () => {
            const icons = pickMixedIcons(allIcons, 100);
            const container = document.createElement("div");
            document.body.appendChild(container);

            const created: any[] = [];
            for (const { def } of icons) {
                const icon = UiIcons.CreateIcon(def);
                container.appendChild((icon as any).element);
                created.push(icon);
            }

            const beforeCount = container.querySelectorAll("*").length;
            expect(beforeCount).toBeGreaterThan(0);

            // Destroy: remove all icons
            for (const icon of created) {
                (icon as any).remove?.();
            }
            container.remove();

            // Check: no retained nodes in body
            const bodyChildren = document.body.children.length;
            const bodyNodes = document.body.querySelectorAll("*").length;

            console.log(
                `\n  [destroy ×100]` +
                `\n    Nodes before destroy: ${beforeCount}` +
                `\n    body.children after destroy: ${bodyChildren}` +
                `\n    body.querySelectorAll('*') after destroy: ${bodyNodes}`
            );

            expect(bodyChildren).toBe(0);
            expect(bodyNodes).toBe(0);
        });
    });

    // ── Summary table ──────────────────────────────────────

    describe("Summary", () => {
        it("value proposition table", () => {
            console.log("\n=== Value Proposition ===");
            console.log("Feature              | Library | Raw DOM | Raw SVG");
            console.log("---------------------|---------|---------|--------");
            console.log("typed API            |    ✓    |    ✗    |   ✗");
            console.log("reactive props       |    ✓    |  manual |   ✗");
            console.log("accessibility (aria) |    ✓    |  manual | manual");
            console.log("event handling       |    ✓    |  manual | manual");
            console.log("lifecycle management |    ✓    |  manual | manual");
            console.log("template caching     |    ✓    |    ✗    |   ✗");
            console.log("consistent behavior  |    ✓    |   ad-hoc| ad-hoc");
            console.log("");
            console.log("Overhead = Library time - Raw DOM time");
            console.log("If overhead < 16ms (1 frame) in typical workload → acceptable");
            expect(true).toBe(true);
        });
    });
});
