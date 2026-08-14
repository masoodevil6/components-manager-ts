import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconTypeCash(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Reload"
    width="${size}" height="${size}" viewBox="0 0 320 325" fill="none">
    <title>Reload</title>
<path fill="${secondaryColor}" opacity="0.6" d="M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"/>
<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"/>
<polygon fill="${primaryColor}" points="42,217 49,302 122,234 "/>
</svg>` as IconString

}
