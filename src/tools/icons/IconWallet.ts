import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";

export function IconWallet(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet"
    width="${size}" height="${size}" viewBox="0 0 346 244"  fill="none">
  <title>wallet</title>
    <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M229.73,181.71c-15.74,0-28.5-12.76-28.5-28.5v-4c0-15.74,12.76-28.5,28.5-28.5h41.5V82.65 c0-13.25-10.75-24-24-24h-207c-13.25,0-24,10.75-24,24v132c0,13.25,10.75,24,24,24h207c13.25,0,24-10.75,24-24v-32.94H229.73z"/>
    <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M225.21,54.36l-21.09-37.72c-5.1-9.8-17.17-13.61-26.97-8.52l-88.9,46.22L225.21,54.36z"/>
    <path fill="${primaryColor}" stroke="${secondaryColor}" stroke-width="${strokeWidth}" d="M295.98,125.21h-67.8c-11.05,0-20,8.95-20,20v10.88c0,11.05,8.95,20,20,20h67.8c5.52,0,10-4.48,10-10v-30.88 C305.98,129.69,301.5,125.21,295.98,125.21z M234.65,169.23c-10.26,0-18.58-8.32-18.58-18.58s8.32-18.58,18.58-18.58 s18.58,8.32,18.58,18.58S244.91,169.23,234.65,169.23z"/>
</svg>`;
}