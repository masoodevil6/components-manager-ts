import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconTitle(
    options: IconOptions = {}
): IconString {


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
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Title"
    width="${size}" height="${size}" viewBox="0 0 230 280" fill="none">
    <title>Title</title>
      <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M83,37.5H50V24c0-8.28-6.72-15-15-15h-7c-8.28,0-15,6.72-15,15v64c0,8.28,6.72,15,15,15h7c8.28,0,15-6.72,15-15 V74.5h33c8.28,0,15-6.72,15-15v-7C98,44.22,91.28,37.5,83,37.5z"/>
      <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M164.21,74.99l33-0.31l0.13,13.5c0.08,8.28,6.86,14.94,15.14,14.86l7-0.07c8.28-0.08,14.94-6.86,14.86-15.14 l-0.61-64c-0.08-8.28-6.86-14.94-15.14-14.86l-7,0.07c-8.28,0.08-14.94,6.86-14.86,15.14l0.13,13.5l-33,0.31 c-8.28,0.08-14.94,6.86-14.86,15.14l0.07,7C149.15,68.41,155.92,75.07,164.21,74.99z"/>
      <path fill="${secondaryColor}" stroke="${primaryColor}" stroke-width="${strokeWidth}" d="M178.32,225H143V29.97c0-8.28-6.72-15-15-15h-10c-8.28,0-15,6.72-15,15V225H67.68c-8.28,0-15,6.72-15,15v10 c0,8.28,6.72,15,15,15H118h10h50.32c8.28,0,15-6.72,15-15v-10C193.32,231.72,186.61,225,178.32,225z"/>
</svg>` as IconString
}