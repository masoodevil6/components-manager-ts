import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconNumber(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Type"
    width="${size}" height="${size}" viewBox="0 0 73.77 69.22" fill="none">
    <title>number</title>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M13.29,28.04h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H13.29c-2.76,0-5,2.24-5,5v1.37 C8.29,25.8,10.53,28.04,13.29,28.04z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M8.29,53.56h54.42c2.76,0,5-2.24,5-5v-1.37c0-2.76-2.24-5-5-5H8.29c-2.76,0-5,2.24-5,5v1.37 C3.29,51.32,5.53,53.56,8.29,53.56z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M50.36,61.26L63.19,8.37c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L39.32,58.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C47.01,65.59,49.71,63.94,50.36,61.26z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M23.85,64.26l12.83-52.89c0.65-2.68-1-5.39-3.68-6.04l-1.33-0.32c-2.68-0.65-5.39,1-6.04,3.68L12.8,61.58 c-0.65,2.68,1,5.39,3.68,6.04l1.33,0.32C20.49,68.59,23.2,66.94,23.85,64.26z"/>
</svg>` as IconString
}