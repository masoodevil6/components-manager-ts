import type {IconOptions, IconVariant} from './index'
import {ToolsCss} from "../../utils/ToolsCss";
import {AppConfig} from "../../core/AppConfig";
import {Observable} from "../../core/Observable";
import {Color, COLORS_GRAD, COLORS_MAIN} from "../../utils/ToolsConsts";
import {IconString} from "./index";

export function IconClip(
    options: IconOptions = {}
): IconString {

    const sizeName = options.size ?? AppConfig.observable("sizeName")

    const size = ToolsCss.getIconSize(sizeName, sizeName)

    const strokeWidth = options.strokeWidth ?? 4

    const variant: IconVariant = options.variant ?? 'default'

    const primaryColor   = (options.primaryColor instanceof Observable ? options.primaryColor?.get?.() : options.primaryColor) ?? Color(COLORS_MAIN.PRIMARY , COLORS_GRAD.GRADE_1) ;

    const secondaryColor = (options.secondaryColor instanceof Observable ? options.secondaryColor?.get?.() : options.secondaryColor) ??  Color(COLORS_MAIN.SECONDARY , COLORS_GRAD.GRADE_1) ;

    /*if (variant === 'small') {
        return ``
    }*/

    return `
<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clip"
    width="${size}" height="${size}" viewBox="0 0 490 420" fill="none">
    <title>clip</title>
     <path fill="${primaryColor}" d="M65.41,248.8L344.66,48.46c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L48.51,225.23 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C54.67,250.99,60.92,252.02,65.41,248.8z"/>
     <path fill="none" stroke="${primaryColor}" stroke-width="30"  d="M191.18,420.73c-40.97,29.39-103.8,11.92-140.35-39.02s-32.96-116.06,8.01-145.45"/>
     <path fill="${primaryColor}" d="M198.03,433.66l131.5-94.34c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3l-131.5,94.34 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C187.3,435.85,193.54,436.88,198.03,433.66z"/>
     <path fill="${primaryColor}" d="M420.27,142.52L150.11,336.33c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31c3.22,4.49,9.47,5.52,13.95,2.3l270.16-193.81 c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31C431.01,140.33,424.76,139.3,420.27,142.52z"/>
     <path fill="none" stroke="${primaryColor}" stroke-width="30"  d="M336.87,36.51c36.51-26.19,85.59-20.28,109.61,13.21s13.9,81.87-22.61,108.07"/>
     <path fill="none" stroke="${primaryColor}" stroke-width="30"  d="M155.22,350.51c-12.87,9.23-32.62,3.73-44.11-12.28c-11.49-16.02-10.37-36.48,2.5-45.72"/>
     <path fill="${primaryColor}" d="M125.41,301.9l216.85-155.57c4.49-3.22,5.52-9.47,2.3-13.95l-5.25-7.31c-3.22-4.49-9.47-5.52-13.95-2.3L108.51,278.33 c-4.49,3.22-5.52,9.47-2.3,13.95l5.25,7.31C114.68,304.09,120.93,305.12,125.41,301.9z"/>
</svg>` as IconString;
}