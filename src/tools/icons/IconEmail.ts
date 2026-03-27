import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconEmail(
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
<svg class="icon-email outline" width="${size}" height="${size}" 
      viewBox="0 0 24 24" fill="none" aria-label="email" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">
  <title>Email</title>
  <rect x="2" y="5" width="20" height="14" rx="2" fop stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}"/>
  <path d="M3 7.5L12 13L21 7.5"  stroke="${primaryColor}"  stroke-width="${strokeWidth}"  stroke-linecap="round"  stroke-linejoin="round"/>
</svg>
`;
}