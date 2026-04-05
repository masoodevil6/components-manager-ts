import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconTag(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Title"
    width="${size}" height="${size}" viewBox="0 0 277 300" fill="none">
    <title>Title</title>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" fill="${secondaryColor}" d="M94.38,279.52l111.46-121.67l25.83-101.33c0,0-102.08,29.43-103.26,30.41L16.95,208.59 c-7.46,8.14-6.91,20.8,1.24,28.26l47.93,43.91C74.27,288.22,86.92,287.67,94.38,279.52z"/>
    <path fill="${primaryColor}" d="M66.13,199.07l41.81-45.64c1.7-1.85,1.57-4.73-0.28-6.42h0c-1.85-1.7-4.73-1.57-6.42,0.28l-41.81,45.64 c-1.7,1.85-1.57,4.73,0.28,6.42l0,0C61.56,201.05,64.44,200.92,66.13,199.07z"/>
    <path fill="${primaryColor}" d="M134.07,213.17l-45.64-41.81c-1.85-1.7-4.73-1.57-6.42,0.28h0c-1.7,1.85-1.57,4.73,0.28,6.42l45.64,41.81 c1.85,1.7,4.73,1.57,6.42-0.28h0C136.05,217.75,135.93,214.87,134.07,213.17z"/>
    <circle fill="${primaryColor}" cx="188.52" cy="99.03" r="12.5"/>
    <path stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M179.21,67.43c-12.1-45.11-0.09-44.43,30.26-53.62c42.13-12.77,46.69-7.12,54.32,38.78 c4.3,25.88-16.7,34.71-62.57,45.91"/>
</svg>` as IconString
}