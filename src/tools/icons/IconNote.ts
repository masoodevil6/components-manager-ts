import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconNote(
    options: IconOptions = {}
): string {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 5

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note"
    width="${size}" height="${size}" viewBox="0 0 201 239" fill="none">
  <title>Note</title>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}" d="M171.38,228.02h-141c-11.05,0-20-8.95-20-20v-147c0-11.05,8.95-20,20-20h141c11.05,0,20,8.95,20,20v147 C191.38,219.07,182.42,228.02,171.38,228.02z"/>
    <circle fill="${primaryColor}" cx="48.59" cy="102.88" r="10"/>
    <path fill="${primaryColor}" d="M155.95,108.63H77.76c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C161.95,105.95,159.26,108.63,155.95,108.63z"/>
    <circle fill="${primaryColor}" cx="49.12" cy="135.28" r="10"/>
    <path fill="${primaryColor}" d="M156.48,141.03H78.29c-3.31,0-6-2.69-6-6v0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6v0 C162.48,138.35,159.79,141.03,156.48,141.03z"/>
    <circle fill="${primaryColor}" cx="47.7" cy="167.68" r="10"/>
    <path fill="${primaryColor}" d="M155.06,173.43H76.87c-3.31,0-6-2.69-6-6l0,0c0-3.31,2.69-6,6-6h78.19c3.31,0,6,2.69,6,6l0,0 C161.06,170.75,158.37,173.43,155.06,173.43z"/>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M55.33,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"/>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M103.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30s20,13.43,20,30"/>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M143.83,69.93c-11.05,0-20-13.43-20-30s8.95-30,20-30c11.05,0,20,13.43,20,30"/>
</svg>`;
}