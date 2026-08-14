import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconCurrency2(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Currency"
    width="${size}" height="${size}" viewBox="0 0 208 240" fill="none">
    <title>Currency</title>
<ellipse fill="${primaryColor}" cx="103.22" cy="140.06" rx="91.05" ry="94.89"/>
<circle fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="103.66" cy="132.09" r="91.05"/>
<ellipse fill="${primaryColor}"  cx="103.65" cy="112.68" rx="91.05" ry="98.01"/>
<circle fill="${secondaryColor}"  stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="104.09" cy="101.59" r="91.05"/>
<circle fill="${primaryColor}"  cx="103.5" cy="101.59" r="74.88"/>
<path fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}"  d="M119.1,90.85c0,0,17.1-25.38-7.27-30.78c-10.39-2.3-22.95,5.47-24.14,17.38c-1.17,11.62,0.57,20.18,14.85,23.53 c12.52,2.93,12.54,2.08,18.66,8.17c10.67,10.61,4.57,25.77-7.13,30.39s-20.51,3.18-29.13-5.72c-10.46-10.8-0.09-22.8-0.09-22.8"/>
<line fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}"  x1="106.09" y1="45.2" x2="106.44" y2="60.04"/>
<line fill="none" stroke="${secondaryColor}" stroke-width="${strokeWidth}"  x1="103.3" y1="143.15" x2="103.65" y2="157.99"/>

</svg>` as IconString;

}
