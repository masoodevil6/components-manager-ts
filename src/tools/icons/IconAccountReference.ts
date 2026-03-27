import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";


export function IconAccountReference(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Account Refrence"
    width="${size}" height="${size}" viewBox="0 0 305 300" fill="none">
    <title>Account Refrence</title>
<circle  fill="${secondaryColor}" opacity="0.6" cx="151.75" cy="150.25" r="140"/>
<circle  fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  cx="151.75" cy="150.25" r="140"/>
<path    fill="${primaryColor}"  d="M190.81,157.38C179.72,164.09,166.46,168,152.2,168s-27.52-3.91-38.61-10.62c-34.32,11.1-60.76,36.55-69.89,68.09 c23.5,33.29,63.32,55.18,108.5,55.18s85-21.89,108.5-55.18C251.57,193.93,225.13,168.48,190.81,157.38z"/>
<ellipse fill="${primaryColor}"  cx="152.2" cy="109.52" rx="60" ry="55"/>
<ellipse fill="${secondaryColor}" opacity="0.6" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}" transform="matrix(0.982 -0.1891 0.1891 0.982 -40.0528 32.8657)"  cx="152.2" cy="226.32" rx="45.22" ry="45.22"/>
<path    fill="#000" d="M182.08,250.08l-7.55-14.41h2.63c1.26,0,1.9-1.42,1.01-2.25l-4.45-4.22c-0.27-0.25-0.63-0.4-1.01-0.4l-1.77,0l-19.35-36.93 c-0.48-0.91-1.84-0.88-2.27,0.06l-16.75,36.93l-1.61,0c-0.41,0-0.81,0.17-1.07,0.46l-3.83,4.16c-0.79,0.86-0.14,2.19,1.08,2.19h2.34 l-6.56,14.47c-0.36,0.8,0.24,1.7,1.15,1.7h9.21c0.5,0,0.96-0.29,1.15-0.73l6.87-15.44h21.82l8.24,15.51 c0.21,0.4,0.65,0.66,1.12,0.66h8.52C181.89,251.84,182.5,250.89,182.08,250.08z M144.31,228.85l4.35-9.78 c1.02-2.29,4.33-2.4,5.51-0.18l5.28,9.94L144.31,228.85z"/>
</svg>`;

}




