import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconClearBroom(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="clear broom"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>clear broom</title>
  
    <path d="M15 2L9 14" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <path d="M8 14c-1 2-2 4-2 6h12c0-2-1-4-2-6H8z" stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}" stroke-linejoin="round"/>
    <path d="M7 20h10" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
}