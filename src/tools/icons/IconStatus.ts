import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconStatus(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Status"
    width="${size}" height="${size}" viewBox="0 0 270 250" fill="none">
    <title>Status</title>
<path fill="${primaryColor}" d="M244.4,58.43L140.73,180.41l-5.21,6.13c-3.58,4.21-9.89,4.72-14.1,1.14l-10.17-8.64L74.3,147.63 c-4.21-3.58-4.72-9.89-1.14-14.1l5.21-6.13c3.58-4.21,9.89-4.72,14.1-1.14l29.34,24.94L222.67,32.5C200.47,12.31,170.97,0,138.59,0 c-69.04,0-125,55.96-125,125s55.96,125,125,125s125-55.96,125-125C263.59,100.53,256.55,77.71,244.4,58.43z"/>
<path fill="${secondaryColor}" opacity="0.6" d="M256.72,28.29l-10.17-8.64c-4.21-3.58-10.52-3.06-14.1,1.14L121.62,151.2l-29.34-24.94 c-4.21-3.58-10.52-3.06-14.1,1.14l-5.21,6.13c-3.58,4.21-3.06,10.52,1.14,14.1l36.96,31.41l10.17,8.64 c4.21,3.58,10.52,3.06,14.1-1.14l5.21-6.13l117.3-138.02C261.44,38.18,260.92,31.87,256.72,28.29z"/>
<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M256.72,28.29l-10.17-8.64c-4.21-3.58-10.52-3.06-14.1,1.14L121.62,151.2l-29.34-24.94 c-4.21-3.58-10.52-3.06-14.1,1.14l-5.21,6.13c-3.58,4.21-3.06,10.52,1.14,14.1l36.96,31.41l10.17,8.64 c4.21,3.58,10.52,3.06,14.1-1.14l5.21-6.13l117.3-138.02C261.44,38.18,260.92,31.87,256.72,28.29z"/>
</svg>` as IconString

}
