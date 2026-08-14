import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconMenu(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 2

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="menu"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>menu</title>
    <line x1="3" y1="6" x2="21" y2="6" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="3" y1="12" x2="21" y2="12" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="3" y1="18" x2="21" y2="18" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>` as IconString
}
