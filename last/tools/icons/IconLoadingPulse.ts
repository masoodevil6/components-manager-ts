import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconLoadingPulse(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="loading-pulse"
    width="${size}" height="${size}" viewBox="0 0 50 50" fill="none">
    <title>loading-pulse</title>
    <circle cx="25" cy="25" r="20" fill="none" stroke="${primaryColor}" stroke-width="3">
        <animate attributeName="r" values="20;8;20" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="25" cy="25" r="8" fill="${secondaryColor}">
        <animate attributeName="r" values="8;4;8" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
    </circle>
</svg>` as IconString
}
