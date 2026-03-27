import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconInputAcl(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="input acl"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>input acl</title>
 
  <rect x="3" y="5" width="18" height="14" rx="3" ry="3" fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="1.5"/>
  <path d="M9 10l3 3 3-3" stroke="${primaryColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="17" cy="15" r="2" stroke="${primaryColor}" stroke-width="1.3"/>
  <line x1="18.5" y1="16.5" x2="20" y2="18" stroke="${primaryColor}" stroke-width="1.3" stroke-linecap="round"/>
</svg>`;
}