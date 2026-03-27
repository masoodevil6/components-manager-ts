import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconTypeCash2(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeCash"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Cash</title>
    
	<circle fill="${secondaryColor}" stroke="#000" stroke-width="${strokeWidth}" class="st0" cx="137.33" cy="135.94" r="126.5"/>
	<circle opacity="0.6" fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" cx="136.45" cy="136.07" r="99.62"/>
	<path fill="${primaryColor}" opacity="0.6"  d="M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z"/>
	<path fill="${primaryColor}" opacity="0.6" d="M208.02,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C213.06,164.05,212.34,157.76,208.02,154.32"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M64.99,120.71l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83c3.44-4.32,2.73-10.61-1.6-14.05l-96.6-76.89c-4.32-3.44-10.61-2.73-14.05,1.6L63.4,106.66C59.96,110.98,60.67,117.27,64.99,120.71z"/>
	<path fill="${secondaryColor}" stroke="#000" stroke-width="${strokeWidth}"  d="M81.84,123.59l74.18,58.62c2.24,1.78,4.88-2.55,9.31-2.92c4.13-0.34,8.08,4.41,9.74,2.33l20.58-25.4c1.72-2.16-5.1-6.81-5.89-11.36s4.45-8.98,2.29-10.7l-71.18-55.62c-2.23-1.78-5.87,3.82-10.29,4.45c-4.14,0.58-9.1-3.94-10.76-1.85l-19.58,23.4c-1.72,2.16,3.6,6.06,3.89,9.86C84.42,118.18,79.68,121.87,81.84,123.59z"/>
	<circle fill="#000"  cx="105.57" cy="106.07" r="6.35"/>
    <circle fill="#000"  cx="169.13" cy="156.25" r="6.35"/>
	<ellipse fill="none" stroke="#000" stroke-width="${strokeWidth}"  cx="137.05" cy="131.81" rx="22.23" ry="22.74"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}"  d="M142.27,132.04c0,0,7.92-2.25,4-8.2c-1.67-2.54-5.56-3.27-7.91-0.88c-2.29,2.33-3.46,4.56-1.2,8.08c1.98,3.09,2.14,2.91,2.28,5.44c0.25,4.42-3.65,6.57-6.81,5.31s-4.66-3.3-4.81-6.95c-0.18-4.42,4.02-5.04,4.02-5.04"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}"  x1="147.36" y1="119.05" x2="144.8" y2="122.39"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}" x1="129.85" y1="140.48" x2="127.29" y2="143.81"/>
	<path fill="none" stroke="#000" stroke-width="${strokeWidth}" d="M209.42,154.32c0,0-29.11,37.98-34.39,42.29c-5.28,4.31-11.38,3.03-16.44-1s-93.51-74.75-93.51-74.75c-3.44,4.32-4.73,13.61-0.4,17.05l96.6,76.89c4.32,3.44,10.61,2.73,14.05-1.6l35.69-44.83C214.46,164.05,213.74,157.76,209.42,154.32"/>
	<path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>

</svg>`;
}
