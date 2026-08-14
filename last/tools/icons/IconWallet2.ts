import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconWallet2(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size           = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth    = options.strokeWidth ?? 5

    const variant: IconVariant   = options.variant ?? 'default' ;

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="wallet"
    width="${size}" height="${size}" viewBox="0 0 197.43 203.49"  fill="none">
  <title>wallet</title>
    <path fill="none" opacity="0.4" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M142.99,159.38c-9.05,0-16.39-7.34-16.39-16.39s7.34-16.39,16.39-16.39h37.69v32.91L142.99,159.38z"/>
    <path fill="${primaryColor}" opacity="0.2" d="M152.66,81.2c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L119.6,13.62 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,80.95,152.66,81.2,152.66,81.2z"/>
    <path fill="${primaryColor}" opacity="0.2" d="M14.78,144v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
    <path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M14.78,144v27.75c0,11.05,8.95,20,20,20h129.77c11.05,0,20-8.95,20-20v-68.38c0-11.05-8.95-20-20-20H34.78 c-11.05,0-20,8.95-20,20v24.72"/>
    <line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="17.78" y1="105.35" x2="184.14" y2="105.35"/>
    <line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="17.78" y1="170.91" x2="184.14" y2="170.91"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M142.99,154.52c-9.05,0-16.39-7.34-16.39-16.39c0-9.05,7.34-16.39,16.39-16.39h37.69v32.91L142.99,154.52z"/>
    <circle fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  cx="149.91" cy="138.64" r="7.77"/>
    <path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M152.66,83.25c0,0,8.67-11.56,13-16.83c3.5-4.27,2.88-10.57-1.38-14.07L119.6,15.67 c-4.27-3.5-10.57-2.88-14.07,1.38c-18.15,22.11-36.3,44.21-54.45,66.32C84.94,83,152.66,83.25,152.66,83.25z"/>
    <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M133.5,83.26l10.6-12.38c0,0-5.99-5.32-6.23-9.29c-0.37-6,3.65-8.72,3.65-8.72l-19.4-14.96 c0,0-2.21,4.41-8.07,5.82c-6.34,1.52-11.19-1.95-11.87-2.44c0,0-21.74,25.57-35.11,41.86C90.9,81.95,133.5,83.26,133.5,83.26z"/>
    <path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}"  d="M92.71,78.8c0,6.49,5.26,4.75,11.75,4.75s11.75,1.74,11.75-4.75s-5.26-11.75-11.75-11.75 S92.71,72.31,92.71,78.8z"/>
</svg>` as IconString
}