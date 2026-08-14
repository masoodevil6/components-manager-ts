import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconLoadingBars(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="loading-bars"
    width="${size}" height="${size}" viewBox="0 0 50 50" fill="none">
    <title>loading-bars</title>
    <rect x="8" y="10" width="6" height="30" rx="3" fill="${primaryColor}">
        <animate attributeName="height" values="30;10;30" dur="1s" repeatCount="indefinite"/>
        <animate attributeName="y" values="10;20;10" dur="1s" repeatCount="indefinite"/>
    </rect>
    <rect x="18" y="10" width="6" height="30" rx="3" fill="${primaryColor}">
        <animate attributeName="height" values="30;10;30" dur="1s" begin="0.15s" repeatCount="indefinite"/>
        <animate attributeName="y" values="10;20;10" dur="1s" begin="0.15s" repeatCount="indefinite"/>
    </rect>
    <rect x="28" y="10" width="6" height="30" rx="3" fill="${primaryColor}">
        <animate attributeName="height" values="30;10;30" dur="1s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="y" values="10;20;10" dur="1s" begin="0.3s" repeatCount="indefinite"/>
    </rect>
    <rect x="38" y="10" width="6" height="30" rx="3" fill="${primaryColor}">
        <animate attributeName="height" values="30;10;30" dur="1s" begin="0.45s" repeatCount="indefinite"/>
        <animate attributeName="y" values="10;20;10" dur="1s" begin="0.45s" repeatCount="indefinite"/>
    </rect>
</svg>` as IconString
}
