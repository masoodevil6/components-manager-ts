import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconEdit(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="edit"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>edit</title>
  <path d="M3 17.25V21h3.75L17.81 9.94a1 1 0 0 0 0-1.41L15.47 6.19a1 1 0 0 0-1.41 0L3 17.25z" fill="${secondaryColor}"  stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
  <path d="M14.06 7.02l2.92 2.92"   stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>` as IconString

}