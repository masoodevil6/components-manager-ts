import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconQrCode(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CrCode"
    width="${size}" height="${size}" viewBox="0 0 300 300" fill="none">
    <title>Cr Code</title>
<rect fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" x="27.31" y="26.78"  width="100" height="100"/>
<rect fill="${primaryColor}" x="58.5" y="57.97" width="37.62" height="37.62"/>
<rect fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" x="171.06" y="26.78" width="100" height="100"/>
<rect fill="${primaryColor}" x="202.25" y="57.97" width="37.62" height="37.62"/>
<rect fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" x="27.31" y="168.53" width="100" height="100"/>
<rect fill="${primaryColor}" x="165.5" y="240.47" width="37.62" height="37.62"/>
<rect fill="${primaryColor}" x="184.31" y="158.03" width="94.75" height="25"/>
<rect fill="${primaryColor}" x="203.25" y="166.03" width="37.62" height="56.03"/>
<rect fill="${primaryColor}" x="239.88" y="203.25" width="37.62" height="37.62"/>
<rect fill="${primaryColor}" x="221.06" y="259.28" width="56.44" height="18.81"/>
<rect fill="${primaryColor}" x="165.5" y="203.25" width="18.81" height="37.62"/>
<rect fill="${primaryColor}" x="58.5" y="200.4" width="37.62" height="37.62"/>
</svg>` as IconString
}
