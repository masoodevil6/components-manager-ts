import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconLoadingOrbit(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="loading-orbit"
    width="${size}" height="${size}" viewBox="0 0 50 50" fill="none">
    <title>loading-orbit</title>
    <circle cx="25" cy="25" r="6" fill="${primaryColor}"/>
    <g>
        <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite"/>
        <ellipse cx="25" cy="25" rx="18" ry="8" fill="none" stroke="${secondaryColor}" stroke-width="2.5" opacity="0.6"/>
        <circle cx="43" cy="25" r="3.5" fill="${secondaryColor}"/>
    </g>
    <g>
        <animateTransform attributeName="transform" type="rotate" from="360 25 25" to="0 25 25" dur="1.5s" repeatCount="indefinite"/>
        <ellipse cx="25" cy="25" rx="18" ry="8" fill="none" stroke="${primaryColor}" stroke-width="2.5" opacity="0.4" transform="rotate(60 25 25)"/>
        <circle cx="43" cy="25" r="3" fill="${primaryColor}" transform="rotate(60 25 25)"/>
    </g>
</svg>` as IconString
}
