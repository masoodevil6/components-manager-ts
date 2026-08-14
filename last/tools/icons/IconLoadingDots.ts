import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconLoadingDots(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="loading-dots"
    width="${size}" height="${size}" viewBox="0 0 50 50" fill="none">
    <title>loading-dots</title>
    <circle cx="12" cy="25" r="5" fill="${primaryColor}">
        <animate attributeName="r" values="5;3;5" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="25" cy="25" r="5" fill="${primaryColor}">
        <animate attributeName="r" values="5;3;5" dur="1.2s" begin="0.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="0.2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="38" cy="25" r="5" fill="${primaryColor}">
        <animate attributeName="r" values="5;3;5" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
    </circle>
</svg>` as IconString
}
