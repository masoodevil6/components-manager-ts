import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconLock(
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
<svg class="icon-password lock" width="${size}" height="${size}" viewBox="0 0 24 24" 
     fill="none"aria-label="lock"xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <title>lock</title>
  <rect x="5" y="10" width="14" height="10" rx="2" stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}"/>
  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>
` as IconString
}