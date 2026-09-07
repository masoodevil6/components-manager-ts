import { describe, it, expect, beforeAll } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreReactive from "@/core_reactive";
import { IconVariant, type IIconDefinition } from "@/ui_icons";

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

function selectHeavy(): { def: IIconDefinition; name: string; score: number }[] {
    const all = Object.entries(UiIcons.Src).map(([name, item]) => ({
        name,
        def: (item as any).Definition as IIconDefinition,
    }));
    const scored = all.map(({ name, def }) => ({ name, def, score: heavyScore(def) }));
    return scored.sort((a, b) =>
        b.score - a.score || a.name.localeCompare(b.name)
    );
}

const ITERS = 30;
const WARMUP = 3;

function bench(fn: () => void, label: string): { median: number; p95: number; max: number } {
    for (let i = 0; i < WARMUP; i++) fn();
    const samples: number[] = [];
    for (let i = 0; i < ITERS; i++) {
        const s = performance.now();
        fn();
        samples.push(performance.now() - s);
    }
    samples.sort((a, b) => a - b);
    const median = samples[Math.floor(samples.length / 2)];
    const p95 = samples[Math.floor(samples.length * 0.95)];
    const max = samples[samples.length - 1];
    console.log(
        `${label.padEnd(45)} median=${median.toFixed(2)}ms  p95=${p95.toFixed(2)}ms  max=${max.toFixed(2)}ms`
    );
    return { median, p95, max };
}

describe("Diagnostic — Isolate Scaling Anomaly", () => {

    let heavy: ReturnType<typeof selectHeavy>;
    let heaviest: { def: IIconDefinition; name: string; score: number };
    let median: { def: IIconDefinition; name: string; score: number };
    let lightest: { def: IIconDefinition; name: string; score: number };

    beforeAll(() => {
        heavy = selectHeavy();
        heaviest = heavy[0];
        median = heavy[Math.floor(heavy.length / 2)];
        lightest = heavy[heavy.length - 1];

        console.log("\n=== Selection info ===");
        console.log(`heaviest: ${heaviest.name} score=${heaviest.score}`);
        console.log(`median:   ${median.name} score=${median.score}`);
        console.log(`lightest: ${lightest.name} score=${lightest.score}`);
        console.log(`heavy[1]: ${heavy[1].name} score=${heavy[1].score}`);
        console.log(`heavy[2]: ${heavy[2].name} score=${heavy[2].score}`);
    });

    const COUNT = 100;

    it("D1 — CreateIcon only (no div wrapper), heaviest ×100", () => {
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                UiIcons.CreateIcon(heaviest.def);
            }
        }, "D1 CreateIcon heaviest ×100 (no div)");
    });

    it("D2 — CreateIcon only (no div wrapper), median ×100", () => {
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                UiIcons.CreateIcon(median.def);
            }
        }, "D2 CreateIcon median ×100 (no div)");
    });

    it("D3 — CreateIcon only, heaviest ×100, with div wrapper", () => {
        bench(() => {
            const children: any[] = [];
            for (let i = 0; i < COUNT; i++) {
                children.push(UiIcons.CreateIcon(heaviest.def));
            }
            CoreReactive.App.div({ className: ["row"], children });
        }, "D3 CreateIcon heaviest ×100 + div");
    });

    it("D4 — CreateIcon only, median ×100, with div wrapper", () => {
        bench(() => {
            const children: any[] = [];
            for (let i = 0; i < COUNT; i++) {
                children.push(UiIcons.CreateIcon(median.def));
            }
            CoreReactive.App.div({ className: ["row"], children });
        }, "D4 CreateIcon median ×100 + div");
    });

    it("D5 — CreateIcon, unique cycle ×100, with div wrapper", () => {
        bench(() => {
            const children: any[] = [];
            for (let i = 0; i < COUNT; i++) {
                children.push(UiIcons.CreateIcon(heavy[i % heavy.length].def));
            }
            CoreReactive.App.div({ className: ["row"], children });
        }, "D5 CreateIcon unique-cycle ×100 + div");
    });

    it("D6 — CreateIcon, heaviest ×100, NO div, isolated (no accumulation)", () => {
        // Run in isolation — no prior CreateIcon calls for this definition
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                UiIcons.CreateIcon(heaviest.def);
            }
        }, "D6 CreateIcon heaviest ×100 (isolated, no div)");
    });

    it("D7 — cloneNode only (raw DOM, no CreateIcon), heaviest template ×100", () => {
        // Build the cached SVG once, then just cloneNode
        const cached = UiIcons.CreateIcon(heaviest.def);
        const cachedEl = (cached as any).element as SVGSVGElement;
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                cachedEl.cloneNode(true);
            }
        }, "D7 raw cloneNode ×100 (no ClReactiveElement)");
    });

    it("D8 — CoreReactive.App.svg wrapper only ×100 (no children)", () => {
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                CoreReactive.App.svg({
                    attrs: {
                        "xmlns": "http://www.w3.org/2000/svg",
                        "viewBox": "0 0 100 100",
                        "width": "24",
                        "height": "24",
                    },
                });
            }
        }, "D8 CoreReactive.App.svg wrapper ×100");
    });

    it("D9 — CoreReactive.App.div with 100 string children", () => {
        bench(() => {
            const children: any[] = [];
            for (let i = 0; i < COUNT; i++) {
                children.push("x");
            }
            CoreReactive.App.div({ className: ["row"], children });
        }, "D9 div + 100 string children");
    });

    it("D10 — CreateIcon heaviest ×10 (smaller scale)", () => {
        bench(() => {
            for (let i = 0; i < 10; i++) {
                UiIcons.CreateIcon(heaviest.def);
            }
        }, "D10 CreateIcon heaviest ×10");
    });

    it("D11 — CreateIcon heaviest ×50", () => {
        bench(() => {
            for (let i = 0; i < 50; i++) {
                UiIcons.CreateIcon(heaviest.def);
            }
        }, "D11 CreateIcon heaviest ×50");
    });

    it("D12 — CreateIcon median ×50", () => {
        bench(() => {
            for (let i = 0; i < 50; i++) {
                UiIcons.CreateIcon(median.def);
            }
        }, "D12 CreateIcon median ×50");
    });

    it("D13 — innerHTML serialization + set ×100 (heaviest)", () => {
        const cached = UiIcons.CreateIcon(heaviest.def);
        const cachedEl = (cached as any).element as SVGSVGElement;
        const cachedInnerHTML = cachedEl.innerHTML;
        const cachedAttrs: [string, string][] = Array.from(cachedEl.attributes).map(
            (a: Attr) => [a.name, a.value]
        );
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                for (const [k, v] of cachedAttrs) {
                    svg.setAttribute(k, v);
                }
                svg.innerHTML = cachedInnerHTML;
            }
        }, "D13 innerHTML set ×100 (heaviest)");
    });

    it("D14 — shallow cloneNode + innerHTML ×100 (heaviest)", () => {
        const cached = UiIcons.CreateIcon(heaviest.def);
        const cachedEl = (cached as any).element as SVGSVGElement;
        const cachedInnerHTML = cachedEl.innerHTML;
        bench(() => {
            for (let i = 0; i < COUNT; i++) {
                const cloned = cachedEl.cloneNode(false) as SVGSVGElement;
                cloned.innerHTML = cachedInnerHTML;
            }
        }, "D14 shallow clone + innerHTML ×100 (heaviest)");
    });
});
