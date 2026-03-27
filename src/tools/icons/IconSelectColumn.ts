import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconSelectColumn(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="select column"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
  <title>select columns</title>
  <rect x="3"  y="4" width="4" height="16" rx="0.8" fill="${secondaryColor}" opacity="0.25" />
  <rect x="3"  y="4" width="4" height="16" rx="0.8" stroke-width="${strokeWidth}" stroke="${primaryColor}" fill="none"/>
  
  <rect x="10" y="3" width="4" height="18" rx="0.8" fill="${secondaryColor}" opacity="0.75"/>
  <rect x="10" y="3" width="4" height="18" rx="0.8" stroke-width="${strokeWidth}" stroke="${primaryColor}" fill="none"/>
  
  <rect x="17" y="4" width="4" height="16" rx="0.8" fill="${secondaryColor}" opacity="0.25" />
  <rect x="17" y="4" width="4" height="16" rx="0.8" stroke-width="${strokeWidth}" stroke="${primaryColor}" fill="none"/>
</svg>`;
}