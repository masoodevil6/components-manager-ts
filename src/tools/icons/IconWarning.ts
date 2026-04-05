import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconWarning(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Warning"
    width="${size}" height="${size}" viewBox="0 0 300 290" fill="none">
    <title>Warning</title>
<g id="Layer_2"  opacity="0.2">
	<path    fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M132.22,32.75L25.01,234.67c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L163.6,32.99C156.26,18.79,139.7,18.66,132.22,32.75z"/>
	<circle  fill="${primaryColor}" cx="146.74" cy="233.83" r="15"/>
	<path    fill="${primaryColor}" d="M239.6,30.67l5.81,8.74c1.24,1.86,0.97,4.14-0.57,4.93l-38.37,19.53c-1.36,0.69-3.24-0.03-4.33-1.67l0,0 c-1.08-1.63-1.03-3.62,0.11-4.62l32.56-28.27C236.13,28.16,238.36,28.79,239.6,30.67z"/>
	<path    fill="${primaryColor}" d="M275.91,45.98l6.54,9.85c1.39,2.1,0.66,4.95-1.58,6.17l-55.62,30.23c-1.97,1.07-4.42,0.48-5.65-1.37v0 c-1.22-1.83-0.83-4.3,0.9-5.71l49.08-40.08C271.57,43.45,274.51,43.87,275.91,45.98z"/>
	<path    fill="${primaryColor}" d="M266.21,98.05l3.85,5.25c0.82,1.12,0.54,2.67-0.6,3.36l-28.39,17c-1.01,0.6-2.33,0.31-3.05-0.67l0,0 c-0.72-0.98-0.61-2.32,0.26-3.1l24.53-22.25C263.8,96.73,265.38,96.93,266.21,98.05z"/>
	<path    fill="${primaryColor}" d="M50.63,30.67l-5.81,8.74c-1.24,1.86-0.97,4.14,0.57,4.93l38.37,19.53c1.36,0.69,3.24-0.03,4.33-1.67v0 c1.08-1.63,1.03-3.62-0.11-4.62L55.42,29.31C54.1,28.16,51.88,28.79,50.63,30.67z"/>
	<path    fill="${primaryColor}" d="M14.32,45.98l-6.54,9.85c-1.39,2.1-0.66,4.95,1.58,6.17l55.62,30.23c1.97,1.07,4.42,0.48,5.65-1.37l0,0 c1.22-1.83,0.83-4.3-0.9-5.71L20.65,45.07C18.66,43.45,15.72,43.87,14.32,45.98z"/>
	<path    fill="${primaryColor}" d="M24.02,98.05l-3.85,5.25c-0.82,1.12-0.54,2.67,0.6,3.36l28.39,17c1.01,0.6,2.33,0.31,3.05-0.67h0 c0.72-0.98,0.61-2.32-0.26-3.1L27.42,97.63C26.43,96.73,24.85,96.93,24.02,98.05z"/>
	<path    fill="${primaryColor}" d="M136.76,106.51h16.7c3.55,0,6.34,3.05,6.02,6.59L151.58,201c-0.28,3.12-2.89,5.51-6.02,5.51l0,0 c-3.11,0-5.71-2.35-6.02-5.45l-8.79-87.91C130.39,109.59,133.19,106.51,136.76,106.51z"/>
</g>
<g id="Layer_1">
	<path   fill="${secondaryColor}" opacity="0.6"   d="M135.97,24.45L28.76,226.37c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L167.36,24.68C160.01,10.48,143.45,10.36,135.97,24.45z"/>
	<path   fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"   d="M135.97,24.45L28.76,226.37c-8.54,16.08,0.67,37.59,16.09,37.59h211.93c14.81,0,23.73-20.54,15.68-36.1 L167.36,24.68C160.01,10.48,143.45,10.36,135.97,24.45z"/>
	<circle fill="${primaryColor}" cx="150.49" cy="225.52" r="15"/>
	<path   fill="${primaryColor}" d="M142.14,101.01h16.7c3.55,0,6.34,3.05,6.02,6.59l-7.91,87.91c-0.28,3.12-2.89,5.51-6.02,5.51h0 c-3.11,0-5.71-2.35-6.02-5.45l-8.79-87.91C135.77,104.1,138.57,101.01,142.14,101.01z"/>
	<path   fill="${primaryColor}" d="M243.35,22.37l5.81,8.74c1.24,1.86,0.97,4.14-0.57,4.93l-38.37,19.53c-1.36,0.69-3.24-0.03-4.33-1.67v0 c-1.08-1.63-1.03-3.62,0.11-4.62L238.57,21C239.88,19.86,242.11,20.49,243.35,22.37z"/>
	<path   fill="${primaryColor}" d="M279.66,37.68l6.54,9.85c1.39,2.1,0.66,4.95-1.58,6.17l-55.62,30.23c-1.97,1.07-4.42,0.48-5.65-1.37v0 c-1.22-1.83-0.83-4.3,0.9-5.71l49.08-40.08C275.32,35.15,278.26,35.57,279.66,37.68z"/>
	<path   fill="${primaryColor}" d="M269.96,89.75l3.85,5.25c0.82,1.12,0.54,2.67-0.6,3.36l-28.39,17c-1.01,0.6-2.33,0.31-3.05-0.67l0,0 c-0.72-0.98-0.61-2.32,0.26-3.1l24.53-22.25C267.56,88.43,269.13,88.62,269.96,89.75z"/>
	<path   fill="${primaryColor}" d="M54.38,22.37l-5.81,8.74c-1.24,1.86-0.97,4.14,0.57,4.93l38.37,19.53c1.36,0.69,3.24-0.03,4.33-1.67l0,0 c1.08-1.63,1.03-3.62-0.11-4.62L59.17,21C57.85,19.86,55.63,20.49,54.38,22.37z"/>
	<path   fill="${primaryColor}" d="M18.07,37.68l-6.54,9.85c-1.39,2.1-0.66,4.95,1.58,6.17l55.62,30.23c1.97,1.07,4.42,0.48,5.65-1.37v0 c1.22-1.83,0.83-4.3-0.9-5.71L24.4,36.77C22.42,35.15,19.48,35.57,18.07,37.68z"/>
	<path   fill="${primaryColor}" d="M27.78,89.75L23.92,95c-0.82,1.12-0.54,2.67,0.6,3.36l28.39,17c1.01,0.6,2.33,0.31,3.05-0.67l0,0 c0.72-0.98,0.61-2.32-0.26-3.1L31.17,89.33C30.18,88.43,28.6,88.62,27.78,89.75z"/>
</g>
</svg>` as IconString

}
