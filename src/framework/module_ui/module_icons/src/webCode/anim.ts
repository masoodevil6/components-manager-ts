import * as CoreReactive from "@/core_reactive";
/// --------------------
import {IIconRenderContext} from "../../basic/interface/IIconRenderContext";

///-------------------------------------------------------------------------------------------------
/// ابزار مشترک برای تولید لایه‌های انیمیشن‌دار آیکون‌های WebCode
/// (بازسازی دقیق رفتار نسخه قدیمی IconWebCode: Glow + Draw + Flicker)
///-------------------------------------------------------------------------------------------------

let _iconUid = 0;

/** الگوهای انیمیشن Flicker برای هر رقم (مطابق نسخه قدیمی) */
const FLICKER_PATTERNS: string[][] = [
    [
        "0%{stroke:var(--wcode-secondary)}",
        "1%{stroke:transparent}",
        "3%{stroke:transparent}",
        "4%{stroke:var(--wcode-secondary)}",
        "6%{stroke:var(--wcode-secondary)}",
        "7%{stroke:transparent}",
        "13%{stroke:transparent}",
        "14%{stroke:var(--wcode-secondary)}",
        "100%{stroke:var(--wcode-secondary)}"
    ],
    [
        "0%{stroke:var(--wcode-secondary)}",
        "50%{stroke:var(--wcode-secondary)}",
        "51%{stroke:transparent}",
        "61%{stroke:transparent}",
        "62%{stroke:var(--wcode-secondary)}",
        "100%{stroke:var(--wcode-secondary)}"
    ],
    [
        "0%{stroke:var(--wcode-secondary)}",
        "1%{stroke:transparent}",
        "10%{stroke:transparent}",
        "11%{stroke:var(--wcode-secondary)}",
        "40%{stroke:var(--wcode-secondary)}",
        "41%{stroke:transparent}",
        "45%{stroke:transparent}",
        "46%{stroke:var(--wcode-secondary)}",
        "100%{stroke:var(--wcode-secondary)}"
    ]
];

/** آرایه‌های dash و تأخیرها (مطابق نسخه قدیمی) */
const DASH_ARRAYS = [940, 735, 940];
const DRAW_DELAYS = [0, 0.5, 1];
const FLICKER_DELAYS = [4, 4.5, 5];

/** استخراج مقدار خام از TObservableValue (رشته یا Observable) */
function unwrap(value: any): string {
    if (value != null && typeof value === "object" && typeof value.get === "function") {
        return String(value.get());
    }
    return String(value ?? "");
}

export interface IWebCodeAnimOptions {
    /** کد سه رقمی مثل "401" */
    code: string;
    /** Context رندر آیکون */
    context: IIconRenderContext;
}

/**
 * تولید کامل لایه‌های آیکون WebCode شامل:
 * 1. تگ style حاوی keyframes های Draw و Flicker (با CSS Variable برای واکنش‌گرایی رنگ)
 * 2. فیلتر Glow (svgDefs + svgFilter + feGaussianBlur + feMerge)
 * 3. لایه Ghost (اعداد محو با رنگ اولیه)
 * 4. لایه Outline (اعداد stroke دار با فیلتر Glow و انیمیشن)
 */
export function buildWebCodeLayers(options: IWebCodeAnimOptions): CoreReactive.App[] {

    const {code, context} = options;

    const digits = code.split("").slice(0, 3);
    const positions = [117, 350, 583];

    const uid = `wcode_${++_iconUid}`;

    ///---------------------------------
    /// 1) CSS انیمیشن‌ها (Draw + Flicker)
    ///    رنگ ثانویه از طریق CSS Variable تزریق می‌شود
    ///---------------------------------
    const keyframesDraw = [1, 2, 3].map((i) => {
        const da = DASH_ARRAYS[i - 1];
        return `@keyframes drawLine${i}_${uid}{0%{stroke-dashoffset:-${da}px}100%{stroke-dashoffset:0px}}`;
    }).join("\n");

    const keyframesFlicker = [1, 2, 3].map((i) => {
        return `@keyframes flicker${i}_${uid}{${FLICKER_PATTERNS[i - 1].join("")}}`;
    }).join("\n");

    const animStyles = [1, 2, 3].map((i, idx) => {
        return `#${uid} #id${i}_1{stroke-dasharray:${DASH_ARRAYS[idx]}px;stroke-dashoffset:-${DASH_ARRAYS[idx]}px;animation:drawLine${i}_${uid} 2.5s ease-in-out ${DRAW_DELAYS[idx]}s forwards,flicker${i}_${uid} 4s linear ${FLICKER_DELAYS[idx]}s infinite}`;
    }).join("\n");

    const styleTag = CoreReactive.App.style({
        attrs: {id: `${uid}_style`},
        children: `
            #${uid}{--wcode-secondary:${unwrap(context.secondaryColor)};}
            ${animStyles}
            ${keyframesDraw}
            ${keyframesFlicker}
        `
    });

    ///---------------------------------
    /// 2) فیلتر Glow (دقیقاً مثل نسخه قدیمی)
    ///---------------------------------
    const glowFilter = CoreReactive.App.svgDefs({
        children: [
            CoreReactive.App.svgFilter({
                attrs: {id: `glow_${uid}`, x: "-50%", y: "-50%", width: "200%", height: "200%"},
                children: [
                    CoreReactive.App.svgFeGaussianBlur({
                        attrs: {result: "coloredBlur", stdDeviation: "4"}
                    }),
                    CoreReactive.App.svgFeMerge({
                        children: [
                            CoreReactive.App.svgFeMergeNode({attrs: {in: "coloredBlur"}}),
                            CoreReactive.App.svgFeMergeNode({attrs: {in: "SourceGraphic"}})
                        ]
                    })
                ]
            })
        ]
    });

    ///---------------------------------
    /// 3) لایه Ghost (اعداد محو - پر شده با رنگ اصلی)
    ///---------------------------------
    const ghostLayer = CoreReactive.App.svgG({
        //attrs: {opacity: "0.75"},
        children: digits.map((d, i) => CoreReactive.App.svgText({
            attrs: {
                x: String(positions[i]),
                y: "195",
                "font-size": "200",
                "font-weight": "bold",
                "font-family": "Arial, sans-serif",
                "text-anchor": "middle",
                stroke: "none"
            },
            attrsBind: {fill: context.primaryColor},
            children: d
        }))
    });

    ///---------------------------------
    /// 4) لایه Outline (اعداد با stroke و فیلتر Glow و انیمیشن)
    ///---------------------------------
    const outlineLayer = CoreReactive.App.svgG({
        attrs: {id: uid},
        children: digits.map((d, i) => CoreReactive.App.svgText({
            attrs: {
                id: `id${i + 1}_1`,
                x: String(positions[i]),
                y: "195",
                "font-size": "200",
                "font-weight": "bold",
                "font-family": "Arial, sans-serif",
                "text-anchor": "middle",
                fill: "none",
                filter: `url(#glow_${uid})`
            },
            attrsBind: {
                stroke:          context.secondaryColor,
                "stroke-width":  context.strokeWidth
            },
            children: d
        }))
    });

    return [styleTag, glowFilter, ghostLayer, outlineLayer];
}