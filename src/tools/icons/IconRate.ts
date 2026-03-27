import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconRate(
    options: IconOptions = {}
): string {

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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rate"
    width="${size}" height="${size}" viewBox="0 0 290 270" fill="none">
    <title>Rate</title>
<path fill="${secondaryColor}" opacity="0.6"  d="M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"/>
<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M260.03,136.86c0-69.04-55.96-125-125-125s-125,55.96-125,125s55.96,125,125,125c45.02,0,84.48-23.8,106.49-59.5"/>
<polygon fill="${primaryColor}" points="223.52,114.32 258.34,176.86 288.94,114.32 "/>
<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  cx="107.39" cy="100.2" r="25"/>
<path fill="${primaryColor}" d="M87.68,209.33l6.11,3.77c2.35,1.45,5.43,0.72,6.88-1.63l84.79-137.48c1.45-2.35,0.72-5.43-1.63-6.88l-6.11-3.77c-2.35-1.45-5.43-0.72-6.88,1.63L86.05,202.45C84.6,204.8,85.33,207.88,87.68,209.33z"/>
<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  cx="164.87" cy="174.98" r="25"/>
</svg>`;

}
