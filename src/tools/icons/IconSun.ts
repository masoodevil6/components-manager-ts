import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconSun(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 2

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="sun"
    width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
    <title>sun</title>
    <circle cx="12" cy="12" r="5" stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="12" y1="1" x2="12" y2="3" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="${primaryColor}" stroke-width="${strokeWidth}" stroke-linecap="round"/>
</svg>` as IconString
}
