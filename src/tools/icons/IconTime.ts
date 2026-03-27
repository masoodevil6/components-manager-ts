import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconTime(
    options: IconOptions = {}
): string {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 10

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Time"
    width="${size}" height="${size}" viewBox="0 0 313.01 346.36" fill="none">
    <title>Time </title>
<circle fill="${secondaryColor}" opacity="0.6" cx="158.07" cy="172.22" r="140"/>
<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="158.07" cy="172.22" r="140"/>
<path fill="${primaryColor}"  d="M156.57,172.22h3c2.76,0,5-2.24,5-5V51.72c0-2.76-2.24-5-5-5h-3c-2.76,0-5,2.24-5,5v115.5 C151.57,169.98,153.81,172.22,156.57,172.22z"/>
<path fill="${primaryColor}"  d="M217.64,251.33l2.4-1.8c2.21-1.65,2.66-4.79,1.01-7l-58.07-77.65c-1.65-2.21-4.79-2.66-7-1.01l-2.4,1.8 c-2.21,1.65-2.66,4.79-1.01,7l58.07,77.65C212.29,252.53,215.43,252.98,217.64,251.33z"/>
<path fill="${primaryColor}"  d="M127.07,35.45C119.06,18.52,101.83,6.8,81.85,6.8c-27.61,0-50,22.39-50,50c0,12.53,4.62,23.97,12.23,32.75 C63.91,62.51,93.19,42.85,127.07,35.45z"/>
<path fill="${primaryColor}"  d="M272.49,92.96c9.54-9.11,15.49-21.94,15.49-36.16c0-27.61-22.39-50-50-50c-20.45,0-38.02,12.28-45.77,29.86 C225.3,45.22,253.64,65.57,272.49,92.96z"/>
<path fill="${primaryColor}"  d="M218.87,296.44c-17.72,6.99-37.88,10.95-59.26,10.95s-41.54-3.96-59.26-10.95c-39.08,3.8-65.63,11.25-65.63,19.82 c0,12.43,55.91,22.51,124.89,22.51s124.89-10.08,124.89-22.51C284.49,307.7,257.94,300.25,218.87,296.44z"/>
</svg>`;

}








