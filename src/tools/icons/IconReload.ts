import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconReload(
    options: IconOptions = {}
): string {

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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TypeCash"
    width="${size}" height="${size}" viewBox="0 0 275 275" fill="none">
    <title>Type Cash</title>
    
	<circle fill="${secondaryColor}" stroke="#000" stroke-width="${strokeWidth}" cx="137.33" cy="135.94" r="126.5"/>
	<circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.6"  cx="136.45" cy="136.07" r="99.62"/>
	<path fill="${secondaryColor}" stroke="#000" stroke-width="${strokeWidth}"  d="M168.44,145.92c-32.63-15.01-22.17-34.46-29.18-38.58c2.53-4.85,6.57-14.45,12.67-20.88 c33.86-35.77-11.51,1.49-23.21-14.06c-19.48-25.88-49.79-3.53-31.06,1.57c23.77,6.46,28.83,21.14,26.38,31.61	c-10.85,0.65-8.37,16.95-25.8,37.34c-38.41,44.92,7.43,68.67,29.86,68.92C185.43,212.46,214.23,166.99,168.44,145.92z"/>
	<line fill="none" stroke="#000" stroke-width="${strokeWidth}" x1="122.04" y1="105.22" x2="141.34" y2="106.22"/>

	<circle opacity="0.25" fill="#000" cx="135" cy="180" r="17.5"/>
	<circle opacity="0.25" fill="#000" cx="150" cy="155" r="10"/>
	<circle opacity="0.25" fill="#000" cx="120" cy="150" r="12.5"/>

	<path opacity="0.4" fill="#fff" d="M252.43,136.57c0-64.9-52.6-117.5-117.5-117.5c-5.57,0-11.05,0.4-16.42,1.15c-32.84,40.19-13.24,98.58,30.71,132.61c29.93,23.18,44.56,55.38,51.7,80.98C232,212.66,252.43,177,252.43,136.57z"/>
</svg>`;

}
