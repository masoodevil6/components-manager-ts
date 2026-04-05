import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconExcel(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 5

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="excel"
    width="${size}" height="${size}" viewBox="0 0 340 380" fill="none">
  <title>excel</title>
  <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M234.65,349.08h64.75c15.05,0,27.25-12.2,27.25-27.25v-266c0-15.05-12.2-27.25-27.25-27.25h-64.75V349.08z"/>
  <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M197.4,6.58l-174.75,22c-5.52,0-10,4.48-10,10v300.5c0,5.52,4.48,10,10,10l174.75,21 c15.05,0,27.25-12.2,27.25-27.25v-309C224.65,18.78,212.45,6.58,197.4,6.58z M162.52,146.8h-11.22l-29.45,61.75l30.75,65.64h9.92 v12.55H123.9V274.2h9.84l-21.41-45.69L90.55,274.2h6.85v12.55H58.79V274.2h12.84l31.33-65.71l-28.9-61.69H59.98v-12.55h38.61v12.55 h-5.68l19.55,41.74l19.91-41.74h-8.47v-12.55h38.61V146.8z"/>
</svg>` as IconString
}