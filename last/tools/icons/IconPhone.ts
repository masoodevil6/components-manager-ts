import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconPhone(
    options: IconOptions = {}
): IconString {

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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Phone"
    width="${size}" height="${size}" viewBox="0 0 155 187" fill="none">
    <title>Phone</title>
<g>
	<path fill="${primaryColor}"  d="M54.12,46.33c2.57-3.51,2.49-8.44-0.47-11.87L29.18,6.17c-3.45-3.98-9.47-4.42-13.45-0.98l-2.85,2.47 L54.12,46.33z"/>
	<path fill="${primaryColor}" d="M91.07,126.29l-0.93,0.32l16.06,54.21l3.37-1.17c4.98-1.73,7.61-7.16,5.89-12.13l-12.25-35.34 C101.48,127.2,96.04,124.56,91.07,126.29z"/>
	<path fill="${primaryColor}" d="M85.56,128.11c-12.29,2.02-28.23-9.24-37.88-27.72c-10.41-19.93-9.75-41.06,1.08-48.83 c-0.04-0.06-0.08-0.11-0.12-0.17l1.94-1.68L8.31,11.61l-1.55,1.34c-2.27,1.96-3.38,4.76-3.29,7.54 c-1.54,15.22,9.77,49.98,29.43,87.62c23.68,45.34,50.84,78.34,62.11,75.94c1.11,0.03,2.25-0.13,3.36-0.51l2.21-0.77L85.56,128.11z" />
</g>
<path fill="none" stroke-width="${strokeWidth}" stroke="${primaryColor}" d="M108.34,121.82c6.92-8.64,11.01-19.31,11.01-30.85c0-28.84-25.54-52.22-57.04-52.22"/>
<path fill="none" stroke-width="${strokeWidth}" stroke="${primaryColor}" d="M120.56,130.06c8.76-10.97,13.94-24.52,13.94-39.17c0-36.62-32.32-66.31-72.2-66.31"/>
<path fill="none" stroke-width="${strokeWidth}" stroke="${primaryColor}" d="M133.1,137.17c10.65-13.26,16.93-29.61,16.93-47.31c0-44.23-39.28-80.09-87.73-80.09"/>
</svg>` as IconString
}