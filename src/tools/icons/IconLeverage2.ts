import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconLeverage2(
    options: IconOptions = {}
): string {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 2

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Leverage"
    width="${size}" height="${size}" viewBox="0 0 340 260" fill="none">
    <title>Leverage</title>
	<path fill="${primaryColor}" d="M148.86,61.23c-0.75-2.67-0.92-5.37-0.6-7.96L26.86,87.22c-2.66,0.74-4.21,3.5-3.47,6.16l1.53,5.45 c0.74,2.66,3.5,4.21,6.16,3.47l121.4-33.95C150.86,66.3,149.61,63.9,148.86,61.23z"/>
	<path fill="${primaryColor}" d="M305.78,9.21l-121.4,33.95c1.62,2.05,2.87,4.45,3.62,7.12c0.75,2.67,0.92,5.37,0.6,7.96L310,24.3 c2.66-0.74,4.21-3.5,3.47-6.16l-1.53-5.45C311.2,10.02,308.44,8.47,305.78,9.21z"/>
	<path fill="${primaryColor}" d="M176.83,193.83V74.94c-2.36,0.89-4.91,1.4-7.58,1.4s-5.22-0.51-7.58-1.4v118.89c0,16.57-13.43,30-30,30h-10.62 c-11.05,0-20,8.95-20,20v0.72h137.94v-0.72c0-11.05-8.95-20-20-20h-12.16C190.26,223.83,176.83,210.4,176.83,193.83z"/>
	<path fill="${primaryColor}" d="M243.87,253.95H90.99c-1.1,0-2-0.9-2-2v-2.39c0-1.1,0.9-2,2-2h152.88c1.1,0,2,0.9,2,2v2.39 C245.87,253.05,244.98,253.95,243.87,253.95z"/>
	<path fill="${primaryColor}" d="M188.73,4.81h-40.61c-2.76,0-5,2.24-5,5v3.43h7.95c5.52,0,10,4.48,10,10v14.04c2.45-0.92,5.1-1.43,7.88-1.43 c2.38,0,4.68,0.38,6.83,1.06V23.24c0-5.52,4.48-10,10-10h7.95V9.81C193.73,7.05,191.5,4.81,188.73,4.81z"/>
	<rect fill="${secondaryColor}" x="18.2" y="90.62" transform="matrix(0.8577 0.5141 -0.5141 0.8577 63.6904 7.2347)" width="1.14" height="56.16"/>
	<rect fill="${secondaryColor}" x="47.89" y="89.88" transform="matrix(0.835 -0.5502 0.5502 0.835 -57.1768 46.2013)" width="1.14" height="57.14"/>
	<path fill="${primaryColor}" d="M4.07,143.72c0,16.8,13.62,30.41,30.41,30.41s30.41-13.62,30.41-30.41c0-0.65-0.04-2.09-0.04-2.09L3.85,142.1 C3.85,142.1,4.07,143.07,4.07,143.72z"/>
	<rect fill="${secondaryColor}" x="290.02" y="12.17" transform="matrix(0.8577 0.5141 -0.5141 0.8577 62.0311 -143.6599)" width="1.14" height="56.16"/>
	<rect fill="${secondaryColor}" x="319.71" y="11.44" transform="matrix(0.835 -0.5502 0.5502 0.835 30.8218 182.8121)" width="1.14" height="57.14"/>
	<path fill="${primaryColor}" d="M275.89,65.27c0,16.8,13.62,30.41,30.41,30.41c16.8,0,30.41-13.62,30.41-30.41c0-0.65-0.04-2.09-0.04-2.09 l-61.01,0.47C275.67,63.65,275.89,64.62,275.89,65.27z"/>
	<circle fill="${secondaryColor}" cx="32.66" cy="93.91" r="3.98"/>
	<circle fill="${secondaryColor}" cx="304.81" cy="16.53" r="3.98"/>
	<path fill="${primaryColor}" d="M168.43,40.76c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15s15-6.72,15-15 C183.43,47.47,176.72,40.76,168.43,40.76z M168.43,60.92c-2.85,0-5.16-2.31-5.16-5.16c0-2.85,2.31-5.16,5.16-5.16 s5.16,2.31,5.16,5.16C173.59,58.61,171.28,60.92,168.43,60.92z"/>
</svg>`;
}