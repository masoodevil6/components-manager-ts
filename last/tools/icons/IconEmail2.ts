import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconEmail2(
    options: IconOptions = {}
): IconString {

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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="email"
    width="${size}" height="${size}" viewBox="0 0 235 140" fill="none">
    <title>Email</title>
	<path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M229.65,127.15c0.31-1.21,0.5-2.47,0.5-3.78v-105c0-2.1-0.43-4.09-1.21-5.9L151.36,62L229.65,127.15z"/>
	<path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M117.15,67.37L223.93,6.23c-2.47-1.79-5.5-2.86-8.78-2.86h-196c-3.28,0-6.31,1.07-8.78,2.86L117.15,67.37z"/>
	<path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M5.62,11.92c-0.93,1.96-1.47,4.14-1.47,6.45v105c0,2.39,0.58,4.65,1.57,6.66l73.32-69.47L5.62,11.92z"/>
	<path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M137.81,69.84l-20.66,12.52L94.58,68.32l-83.61,67.61c2.35,1.54,5.16,2.44,8.18,2.44h196 c4.25,0,8.08-1.77,10.8-4.61L137.81,69.84z"/>
</svg>` as IconString
}