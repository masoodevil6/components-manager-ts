
import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";


export function IconChangePassword(
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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ChangePassword"
    width="${size}" height="${size}" viewBox="0 0 356.97 361.52" fill="none">
    <title>Change Password</title>
<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.4"  d="M329.07,150.86l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56"/>
<path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.4" d="M172.12,189l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C138.61,201.07,159.19,201.45,172.12,189z"/>
<line fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.4" x1="188.52" y1="184.92" x2="251.18" y2="246.57"/>
<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.4" x1="207.72" y1="211.45" x2="189.71" y2="229.39"/>
<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" opacity="0.4" x1="233.64" y1="234.42" x2="215.63" y2="252.36"/>
<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M324.32,134.43l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56"/>
<path fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M175.72,177.88l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C142.22,189.96,162.8,190.34,175.72,177.88z"/>
<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="192.13" y1="173.8" x2="254.78" y2="235.45"/>
<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="211.33" y1="200.34" x2="193.32" y2="218.27"/>
<line fill="none" stroke="${primaryColor}" stroke-width="${strokeWidth}" x1="237.25" y1="223.31" x2="219.24" y2="241.24"/>
</svg>`;
}