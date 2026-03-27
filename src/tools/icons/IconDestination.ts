import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconDestination(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account Destination"
    width="${size}" height="${size}" viewBox="0 0 305 300" fill="none">
    <title>Account Destination</title>
<circle  fill="${secondaryColor}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle  fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="151.75" cy="150.25" r="140"/>
<path    fill="${primaryColor}" d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${primaryColor}" cx="152.2" cy="109.52" rx="60" ry="55"/>
<ellipse fill="${secondaryColor}" opacity="0.6" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<path    fill="#000" d="M144.98,196.56L144.98,196.56c2.04,0,3.7,1.65,3.7,3.7v54.83c0,2.04-1.65,3.7-3.7,3.7l0,0c-2.04,0-3.7-1.65-3.7-3.7v-54.83 C141.28,198.21,142.94,196.56,144.98,196.56z"/>
<path    fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M144.08,213.47c0.02,5.73-2.96,12.33,1.66,13.72c6.08,1.83,21.06-5.1,21.06-13.83 c0-12.19-17.63-14.86-21.06-13.83C141.03,200.95,144.06,207.76,144.08,213.47z"/>
<path    fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M144.08,242.41c0.02,5.49-2.96,11.83,1.66,13.16c6.08,1.76,21.06-4.9,21.06-13.27 c0-8.37-14.97-15.03-21.06-13.27C141.03,230.39,144.06,236.93,144.08,242.41z"/>
</svg>`;

}








