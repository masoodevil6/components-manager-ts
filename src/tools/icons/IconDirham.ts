import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconDirham(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeDerham"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Derham</title>
    
	<circle fill="${secondaryColor}" stroke="#000" stroke-width="${strokeWidth}"  cx="142.16" cy="137.34" r="126.5"/>
	<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.6"  cx="139.42" cy="137.88" r="99.62"/>
    <path fill="${primaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M162.12,79.76c-27.16-14.73-80.23-4.1-54.14,6.48c0,0,8.58,102.02,1.37,106.93c-7.21,4.91,22.47,7.56,42.91,1.4 C205.82,178.44,208.8,105.08,162.12,79.76z M154.14,179.21c-12.37,5.12-30.56,3.6-26.26-0.32c4.31-3.92-2.96-82.47-2.96-82.47 c-16.16-7.7,16.06-16.84,32.96-5.96C186.92,109.16,186.55,165.81,154.14,179.21z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M92.99,135.26l13.3-1.7h90.95l11.77-1.7c3.32,0,6.02-1.9,6.02-4.25v-0.09c0-2.35-2.7-4.25-6.02-4.25l-11.77,1.7 h-92.47l-11.77,1.7c-3.32,0-6.02,1.9-6.02,4.25v0.09C86.97,133.35,89.67,135.26,92.99,135.26z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M100.04,154.27l13.02-1.71h76.96l11.95-1.71c2.92,0,5.29-1.91,5.29-4.27v-0.09c0-2.36-2.37-4.27-5.29-4.27 l-9.27,1.71h-79.63l-13.02,1.71c-2.92,0-5.29,1.91-5.29,4.27V150C94.75,152.36,97.12,154.27,100.04,154.27z"/>

    <path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>
	
</svg>`as IconString
}
