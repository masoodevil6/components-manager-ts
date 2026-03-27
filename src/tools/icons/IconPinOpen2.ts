import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconPinOpen2(
    options: IconOptions = {}
): string {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 2

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Note"
    width="${size}" height="${size}" viewBox="0 0 201 239" fill="none">
    <title>pin open</title>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" class="st0" d="M94.26,23.64l58.45,36.66c2.34,1.47,5.43,0.76,6.89-1.58l3.72-5.93c1.47-2.34,0.76-5.43-1.58-6.89L103.3,9.24c-2.34-1.47-5.43-0.76-6.89,1.58l-3.72,5.93C91.22,19.09,91.92,22.17,94.26,23.64z"/>
    <rect fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" x="82.98" y="42.85" transform="matrix(0.8471 0.5314 -0.5314 0.8471 50.5191 -47.9085)"  width="51.1" height="42"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M45.9,105.35l51.33,32.2c7.02,4.4,16.28,2.28,20.68-4.74l6.38-10.17c4.4-7.02,2.28-16.28-4.74-20.68 l-51.33-32.2c-7.02-4.4-16.28-2.28-20.68,4.74l-6.38,10.17C36.76,91.69,38.88,100.95,45.9,105.35z"/>
    <polyline fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="4" points="33.6,162.7 18.83,185.43 13.43,215.82 38.68,197.88 79.85,132.65 60,120.2 41.66,149.04 "/>
    <path fill="${primaryColor}" d="M136.08,47.57l17.74,11.12c1.87,1.17,4.34,0.61,5.51-1.26l2.76-4.4c1.17-1.87,0.61-4.34-1.26-5.51l-17.74-11.12 L136.08,47.57z"/>
    <path fill=${primaryColor} d="M100.19,81.29l17.54,11c0.94,0.59,2.17,0.3,2.76-0.63l18.36-29.27c0.59-0.94,0.3-2.17-0.63-2.76l-17.54-11L100.19,81.29z"/>
    <path fill="${primaryColor}" d="M83.19,126.75l17.57,11.02c4.68,2.93,10.85,1.52,13.79-3.16l9.4-14.99c3.23-5.15,1.67-11.94-3.47-15.16l-16.73-10.49L83.19,126.75z"/>
    <polygon fill="${primaryColor}" points="21.91,205.13 68.29,131.28 73.99,134.49 35.68,195.88 "/>
</svg>`;
}