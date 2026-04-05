
import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";


export function IconAccount(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account"
    width="${size}" height="${size}" viewBox="0 0 300 300" fill="none">
    <title>Account </title>
<circle fill="${secondaryColor}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle fill="none" stroke-width="${strokeWidth}" stroke="${primaryColor}"  cx="151.75" cy="150.25" r="140"/>
<path fill="${primaryColor}" d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${primaryColor}" cx="152.2" cy="109.52" rx="60" ry="55"/>
</svg>` as IconString;
}