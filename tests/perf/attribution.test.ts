import { describe, it, expect } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import { IconVariant } from "@/ui_icons";

// Use a representative icon definition (userPhone — 6 svgPaths)
const definition = UiIcons.Src.UserPhone.Definition;
const ICON_COUNT = 100;
const WARMUP = 3;
const ITERATIONS = 20;

function median(arr: number[]): number {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function percentile(sorted: number[], p: number): number {
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
}

describe("Attribution — MtCreateIcon Stage Timing", () => {

    it("Level 1: Coarse Stage Attribution", () => {
        const stages = {
            scopeCreation: [] as number[],
            computedSetup: [] as number[],
            definitionRender: [] as number[],
            svgConstruction: [] as number[],
            totalMtCreateIcon: [] as number[],
        };

        // Warmup
        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                UiIcons.CreateIcon(definition);
            }
        }

        // Measured iterations
        for (let iter = 0; iter < ITERATIONS; iter++) {
            let tScope = 0, tComputed = 0, tRender = 0, tSvg = 0, tTotal = 0;

            for (let i = 0; i < ICON_COUNT; i++) {
                const t0 = performance.now();

                // Stage 1: Scope creation
                const tScopeStart = performance.now();
                const scope = new CoreObservable.Scope();
                tScope += performance.now() - tScopeStart;

                // Stage 2: Computed setup (replicate the 5 computed from MtCreateIcon)
                const tComputedStart = performance.now();
                const sizeName = CoreConfig.Settings.SizeName.observable();
                const primaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
                const secondaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

                const borderWidth = options_strokeWidth() ??
                    CoreObservable.App.computed(
                        (sizeName) => UtilStyle.Css_BorderWidth(sizeName),
                        [sizeName],
                        scope
                    );

                const strokeWidth = CoreObservable.App.computed(
                    (borderWidth, definition) => UtilStyle.Css_IconStrokeWidth(borderWidth, definition.viewBoxX, definition.viewBoxY),
                    [borderWidth, definition],
                    scope
                );

                const variant = IconVariant.DEFAULT;

                const content = CoreObservable.App.computed(
                    (definition) => {
                        return definition.render({
                            sizeName,
                            primaryColor,
                            secondaryColor,
                            strokeWidth,
                            variant,
                            scope
                        });
                    },
                    [definition, sizeName, primaryColor, secondaryColor, strokeWidth, variant],
                    scope
                );

                // Pre-compute the 4 attrsBind computed
                const ariaLabelComputed = CoreObservable.App.computed(
                    (definition) => CoreLanguage.App.translate(definition.title),
                    [definition],
                    scope
                );
                const viewBoxComputed = CoreObservable.App.computed(
                    (definition) => `0 0 ${definition.viewBoxX} ${definition.viewBoxY}`,
                    [definition],
                    scope
                );
                const widthComputed = CoreObservable.App.computed(
                    (value) => UtilStyle.Css_IconSize(value),
                    [sizeName],
                    scope
                );
                const heightComputed = CoreObservable.App.computed(
                    (value) => UtilStyle.Css_IconSize(value),
                    [sizeName],
                    scope
                );

                tComputed += performance.now() - tComputedStart;

                // Stage 3: definition.render() — call it directly (not through computed)
                const tRenderStart = performance.now();
                const renderResult = definition.render({
                    sizeName,
                    primaryColor,
                    secondaryColor,
                    strokeWidth,
                    variant,
                    scope
                });
                tRender += performance.now() - tRenderStart;

                // Stage 4: CoreReactive.App.svg() construction
                const tSvgStart = performance.now();
                const svg = CoreReactive.App.svg({
                    attrs: {
                        "xmlns": "http://www.w3.org/2000/svg",
                        "role": "img",
                        "fill": "none"
                    },
                    attrsBind: {
                        "aria-label": ariaLabelComputed,
                        "viewBox": viewBoxComputed,
                        width: widthComputed,
                        height: heightComputed,
                    },
                    children: content
                });
                tSvg += performance.now() - tSvgStart;

                tTotal += performance.now() - t0;
            }

            stages.scopeCreation.push(tScope / ICON_COUNT);
            stages.computedSetup.push(tComputed / ICON_COUNT);
            stages.definitionRender.push(tRender / ICON_COUNT);
            stages.svgConstruction.push(tSvg / ICON_COUNT);
            stages.totalMtCreateIcon.push(tTotal / ICON_COUNT);
        }

        const results = {
            scopeCreation: median(stages.scopeCreation),
            computedSetup: median(stages.computedSetup),
            definitionRender: median(stages.definitionRender),
            svgConstruction: median(stages.svgConstruction),
            totalMtCreateIcon: median(stages.totalMtCreateIcon),
        };

        const accounted = results.scopeCreation + results.computedSetup + results.definitionRender + results.svgConstruction;
        const overhead = results.totalMtCreateIcon - accounted;

        console.log("\n=== Level 1 Attribution (per icon, median) ===");
        console.log(`Stage                    | Time (ms) | % of total`);
        console.log(`-------------------------|-----------|----------`);
        console.log(`Scope creation           | ${results.scopeCreation.toFixed(4).padStart(9)} | ${((results.scopeCreation / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`Computed setup (9 comp)  | ${results.computedSetup.toFixed(4).padStart(9)} | ${((results.computedSetup / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`definition.render()      | ${results.definitionRender.toFixed(4).padStart(9)} | ${((results.definitionRender / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`svg() construction       | ${results.svgConstruction.toFixed(4).padStart(9)} | ${((results.svgConstruction / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`-------------------------|-----------|----------`);
        console.log(`Accounted                | ${accounted.toFixed(4).padStart(9)} | ${((accounted / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`Overhead (loop/timing)   | ${overhead.toFixed(4).padStart(9)} | ${((overhead / results.totalMtCreateIcon) * 100).toFixed(1).padStart(6)}%`);
        console.log(`Total per icon           | ${results.totalMtCreateIcon.toFixed(4).padStart(9)} | 100.0%`);
        console.log(`\nFor ${ICON_COUNT} icons: ~${(results.totalMtCreateIcon * ICON_COUNT).toFixed(2)}ms total`);

        expect(results.totalMtCreateIcon).toBeGreaterThan(0);
    });

    it("Level 1: Full MtCreateIcon vs Staged (overhead check)", () => {
        // Compare: direct MtCreateIcon calls vs our staged replication
        const directTimes: number[] = [];
        const stagedTimes: number[] = [];

        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                UiIcons.CreateIcon(definition);
            }
        }

        for (let iter = 0; iter < ITERATIONS; iter++) {
            // Direct
            const t0 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                UiIcons.CreateIcon(definition);
            }
            directTimes.push(performance.now() - t0);

            // Staged (same as above but without per-stage timing)
            const t1 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                const scope = new CoreObservable.Scope();
                const sizeName = CoreConfig.Settings.SizeName.observable();
                const primaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
                const secondaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
                const borderWidth = CoreObservable.App.computed(
                    (sizeName) => UtilStyle.Css_BorderWidth(sizeName),
                    [sizeName], scope
                );
                const strokeWidth = CoreObservable.App.computed(
                    (bw, def) => UtilStyle.Css_IconStrokeWidth(bw, def.viewBoxX, def.viewBoxY),
                    [borderWidth, definition], scope
                );
                const variant = IconVariant.DEFAULT;
                const content = CoreObservable.App.computed(
                    (def) => def.render({
                        sizeName, primaryColor, secondaryColor, strokeWidth, variant, scope
                    }),
                    [definition, sizeName, primaryColor, secondaryColor, strokeWidth, variant], scope
                );
                const ariaLabel = CoreObservable.App.computed(
                    (def) => CoreLanguage.App.translate(def.title), [definition], scope
                );
                const viewBox = CoreObservable.App.computed(
                    (def) => `0 0 ${def.viewBoxX} ${def.viewBoxY}`, [definition], scope
                );
                const width = CoreObservable.App.computed(
                    (v) => UtilStyle.Css_IconSize(v), [sizeName], scope
                );
                const height = CoreObservable.App.computed(
                    (v) => UtilStyle.Css_IconSize(v), [sizeName], scope
                );
                CoreReactive.App.svg({
                    attrs: { "xmlns": "http://www.w3.org/2000/svg", "role": "img", "fill": "none" },
                    attrsBind: { "aria-label": ariaLabel, "viewBox": viewBox, width, height },
                    children: content
                });
            }
            stagedTimes.push(performance.now() - t1);
        }

        const directMedian = median(directTimes);
        const stagedMedian = median(stagedTimes);

        console.log(`\n=== Overhead Check ===`);
        console.log(`Direct MtCreateIcon (${ICON_COUNT} icons): ${directMedian.toFixed(2)}ms`);
        console.log(`Staged replication   (${ICON_COUNT} icons): ${stagedMedian.toFixed(2)}ms`);
        console.log(`Ratio: ${(stagedMedian / directMedian).toFixed(2)}x`);

        expect(directMedian).toBeGreaterThan(0);
    });

    it("Level 1: definition.render() isolated cost", () => {
        // Measure just definition.render() without any reactive setup
        const renderTimes: number[] = [];
        const svgPathTimes: number[] = [];

        // Setup static context values (unwrapped)
        const sizeName = "md";
        const primaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);
        const secondaryColor = UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);
        const strokeWidth = 2;
        const variant = IconVariant.DEFAULT;

        // Warmup
        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                definition.render({
                    sizeName: sizeName as any,
                    primaryColor: primaryColor as any,
                    secondaryColor: secondaryColor as any,
                    strokeWidth: strokeWidth as any,
                    variant: variant as any,
                });
            }
        }

        for (let iter = 0; iter < ITERATIONS; iter++) {
            const t0 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                definition.render({
                    sizeName: sizeName as any,
                    primaryColor: primaryColor as any,
                    secondaryColor: secondaryColor as any,
                    strokeWidth: strokeWidth as any,
                    variant: variant as any,
                });
            }
            renderTimes.push(performance.now() - t0);
        }

        // Also measure just creating SVG elements without definition.render
        const svgOnlyTimes: number[] = [];
        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                CoreReactive.App.svgPath({
                    attrs: { d: "M0,0 L10,10" },
                    attrsBind: { fill: primaryColor }
                });
            }
        }

        for (let iter = 0; iter < ITERATIONS; iter++) {
            const t0 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                // Create 6 svgPaths (same as userPhone definition)
                for (let j = 0; j < 6; j++) {
                    CoreReactive.App.svgPath({
                        attrs: { d: "M0,0 L10,10" },
                        attrsBind: { fill: primaryColor }
                    });
                }
            }
            svgOnlyTimes.push(performance.now() - t0);
        }

        const renderMedian = median(renderTimes);
        const svgMedian = median(svgOnlyTimes);

        console.log(`\n=== definition.render() isolated ===`);
        console.log(`definition.render() (${ICON_COUNT}x, 6 paths each): ${renderMedian.toFixed(2)}ms`);
        console.log(`  → per icon: ${(renderMedian / ICON_COUNT).toFixed(4)}ms`);
        console.log(`6x svgPath() only (${ICON_COUNT}x): ${svgMedian.toFixed(2)}ms`);
        console.log(`  → per icon: ${(svgMedian / ICON_COUNT).toFixed(4)}ms`);
        console.log(`render() overhead beyond SVG creation: ${((renderMedian - svgMedian) / ICON_COUNT).toFixed(4)}ms/icon`);

        expect(renderMedian).toBeGreaterThan(0);
    });

    it("Level 1: ClReactiveElement constructor cost", () => {
        // Measure the cost of creating ClReactiveElement instances
        // This is the hidden cost: each svg/svgPath/svgCircle creates a ClReactiveElement
        // which sets up hover/focus/active observables and event listeners

        const svgTimes: number[] = [];
        const divTimes: number[] = [];

        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                CoreReactive.App.svg({});
                CoreReactive.App.div({});
            }
        }

        for (let iter = 0; iter < ITERATIONS; iter++) {
            const t0 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                CoreReactive.App.svg({});
            }
            svgTimes.push(performance.now() - t0);

            const t1 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                CoreReactive.App.div({});
            }
            divTimes.push(performance.now() - t1);
        }

        const svgMedian = median(svgTimes);
        const divMedian = median(divTimes);

        console.log(`\n=== ClReactiveElement constructor ===`);
        console.log(`svg() × ${ICON_COUNT}: ${svgMedian.toFixed(2)}ms → ${(svgMedian / ICON_COUNT).toFixed(4)}ms/element`);
        console.log(`div() × ${ICON_COUNT}: ${divMedian.toFixed(2)}ms → ${(divMedian / ICON_COUNT).toFixed(4)}ms/element`);

        // For a typical icon: 1 svg + 6 svgPath = 7 ClReactiveElement instances
        // Plus the svg wrapper itself
        const perIconElements = 7; // 1 svg + 6 paths (approximate for userPhone)
        const estimatedConstructorCost = (svgMedian / ICON_COUNT) * perIconElements;
        console.log(`\nEstimated constructor cost for ${perIconElements} elements/icon: ${estimatedConstructorCost.toFixed(4)}ms/icon`);

        expect(svgMedian).toBeGreaterThan(0);
    });

    it("Level 1: Computed() creation cost", () => {
        // Measure the cost of creating computed observables
        const computedTimes: number[] = [];
        const observableTimes: number[] = [];

        const dummyObs = new CoreObservable.App(1);

        for (let w = 0; w < WARMUP; w++) {
            for (let i = 0; i < ICON_COUNT; i++) {
                const scope = new CoreObservable.Scope();
                for (let j = 0; j < 9; j++) {
                    CoreObservable.App.computed(
                        (v) => v + 1,
                        [dummyObs],
                        scope
                    );
                }
            }
        }

        for (let iter = 0; iter < ITERATIONS; iter++) {
            const t0 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                const scope = new CoreObservable.Scope();
                for (let j = 0; j < 9; j++) {
                    CoreObservable.App.computed(
                        (v) => v + 1,
                        [dummyObs],
                        scope
                    );
                }
            }
            computedTimes.push(performance.now() - t0);

            const t1 = performance.now();
            for (let i = 0; i < ICON_COUNT; i++) {
                const scope = new CoreObservable.Scope();
                for (let j = 0; j < 9; j++) {
                    new CoreObservable.App(j);
                }
            }
            observableTimes.push(performance.now() - t1);
        }

        const computedMedian = median(computedTimes);
        const observableMedian = median(observableTimes);

        console.log(`\n=== Computed() creation ===`);
        console.log(`9× computed() + scope (${ICON_COUNT} icons): ${computedMedian.toFixed(2)}ms → ${(computedMedian / ICON_COUNT).toFixed(4)}ms/icon`);
        console.log(`9× new Observable() (${ICON_COUNT} icons): ${observableMedian.toFixed(2)}ms → ${(observableMedian / ICON_COUNT).toFixed(4)}ms/icon`);

        expect(computedMedian).toBeGreaterThan(0);
    });
});

function options_strokeWidth(): any { return undefined; }
