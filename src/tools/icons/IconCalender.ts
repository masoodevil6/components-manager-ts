import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconCalender(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="calendar"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>calendar</title>
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" fill="var(--secondaryColor1)"/>
  <line x1="16" y1="2" x2="16" y2="6"  stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
  <line x1="8" y1="2" x2="8" y2="6"  stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
  <line x1="3" y1="10" x2="21" y2="10"  stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>`;
}