import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconDelete(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="delete"
     width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <title>delete</title>
  <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"  d="M9 3h6l1 2h4v2H4V5h4l1-2z" />
  <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linejoin="round"  d="M6 7h12l-1 13H7L6 7z"/>
  <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" d="M10 10v8M14 10v8"/>
</svg>` as IconString;

}