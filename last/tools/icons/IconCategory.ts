
import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";


export function IconCategory(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 10

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Category"
    width="${size}" height="${size}" viewBox="0 0 379 344" fill="none">
    <title>category</title>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M280.32,131.68c8.11-8.11,8.05-21.32-0.14-29.51l-75.85-74.85c-8.19-8.19-21.4-8.25-29.51-0.14l-75.13,75.13 c-8.11,8.11-8.05,21.32,0.14,29.51L280.32,131.68z"/>
    <circle fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="286.36" cy="246.5" r="75"/>
    <path fill="${secondaryColor}"  stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M38.64,321.5h110c11.05,0,20-8.95,20-20v-110c0-11.05-8.95-20-20-20h-110c-11.05,0-20,8.95-20,20v110 C18.64,312.55,27.6,321.5,38.64,321.5z"/>
</svg>` as IconString;
}