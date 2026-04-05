import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconPinOpen(
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
<svg xmlns="http://www.w3.org/2000/svg" aria-label="pin open"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <title>pin open</title>
  <path d="M16 3v4l2 2-4 4 2 2v4H8v-4l2-2-4-4 2-2V3h8z" stroke="${primaryColor}" fill="${secondaryColor}"/>
  <line x1="4" y1="20" x2="20" y2="4"  stroke="${primaryColor}"/>
</svg>` as IconString
}