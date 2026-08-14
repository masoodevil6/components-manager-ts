import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

let _iconUid = 0;

export type IconWebCodeOptions = IconOptions & {
    code?: string
}

export function IconWebCode(
    options: IconWebCodeOptions = {}
): IconString {

    const code = options.code ?? "404"

    const size = (typeof options.size === 'number' ? options.size : 250) as number

    const strokeWidth = options.strokeWidth ?? 4

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.ERROR , COLORS_GRAD.GRADE_1) ;

    const uid = `wcode_${++_iconUid}`

    const digits = code.split("").slice(0, 3)
    const positions = [117, 350, 583]
    const dashArrays = [940, 735, 940]
    const delays = [0, 0.5, 1]
    const flickerDelays = [4, 4.5, 5]

    const bgDigits = digits.map((d, i) =>
        `<text x="${positions[i]}" y="195" font-size="200" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" fill="${primaryColor}" stroke="none">${d}</text>`
    ).join("\n            ")

    const animDigits = digits.map((d, i) => {
        const idx = i + 1
        const da = dashArrays[i]
        return `<text id="id${idx}_1" x="${positions[i]}" y="195" font-size="200" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}" filter="url(#glow_${uid})">${d}</text>`
    }).join("\n            ")

    const keyframesDraw = [1, 2, 3].map(i =>
        `@keyframes drawLine${i}_${uid} {\n            0%   { stroke-dashoffset: -${dashArrays[i - 1]}px; }\n            100% { stroke-dashoffset: 0px; }\n        }`
    ).join("\n        ")

    const keyframesFlicker = [1, 2, 3].map((i, idx) => {
        const patterns = [
            `0%   { stroke: ${secondaryColor}; }
            1%   { stroke: transparent; }
            3%   { stroke: transparent; }
            4%   { stroke: ${secondaryColor}; }
            6%   { stroke: ${secondaryColor}; }
            7%   { stroke: transparent; }
            13%  { stroke: transparent; }
            14%  { stroke: ${secondaryColor}; }
            100% { stroke: ${secondaryColor}; }`,
            `0%   { stroke: ${secondaryColor}; }
            50%  { stroke: ${secondaryColor}; }
            51%  { stroke: transparent; }
            61%  { stroke: transparent; }
            62%  { stroke: ${secondaryColor}; }
            100% { stroke: ${secondaryColor}; }`,
            `0%   { stroke: ${secondaryColor}; }
            1%   { stroke: transparent; }
            10%  { stroke: transparent; }
            11%  { stroke: ${secondaryColor}; }
            40%  { stroke: ${secondaryColor}; }
            41%  { stroke: transparent; }
            45%  { stroke: transparent; }
            46%  { stroke: ${secondaryColor}; }
            100% { stroke: ${secondaryColor}; }`
        ]
        return `@keyframes flicker${i}_${uid} {\n            ${patterns[idx]}\n        }`
    }).join("\n        ")

    const animStyles = [1, 2, 3].map((i, idx) =>
        `#${uid} #id${i}_1 {\n            stroke-dasharray: ${dashArrays[idx]}px;\n            stroke-dashoffset: -${dashArrays[idx]}px;\n            animation: drawLine${i}_${uid} 2.5s ease-in-out ${delays[idx]}s forwards, flicker${i}_${uid} 4s linear ${flickerDelays[idx]}s infinite;\n        }`
    ).join("\n        ")

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${code}"
    width="${size}" height="${size * 0.36}" viewBox="0 0 700 250" fill="none">
    <title>${code}</title>
    <defs>
        <filter id="glow_${uid}">
            <feGaussianBlur class="blur" result="coloredBlur" stdDeviation="4"></feGaussianBlur>
            <feMerge>
                <feMergeNode in="coloredBlur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
    </defs>
    <style>
        ${animStyles}
        ${keyframesDraw}
        ${keyframesFlicker}
    </style>
    <g id="${uid}">
        <g opacity="0.2">
            ${bgDigits}
        </g>
        <g>
            ${animDigits}
        </g>
    </g>
</svg>` as IconString

}
